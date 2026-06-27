/*
    Backend für Feeloo

    Dieses Backend nimmt ein Kamerabild vom Frontend entgegen
    und sendet es an Amazon Rekognition.

    Wichtig:
    Die AWS-Zugangsdaten stehen NICHT im Frontend,
    sondern sicher in der .env Datei.
*/

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const {
    RekognitionClient,
    DetectFacesCommand
} = require("@aws-sdk/client-rekognition");

const app = express();
app.use(function (request, response, next) {
    console.log("Anfrage:", request.method, request.url);
    next();
});


app.use(cors());

app.use(express.json({
    limit: "10mb"
}));

// Liefert die Frontend-Dateien direkt über das Backend aus.
// Dadurch können Handy und Computer dieselbe URL verwenden.
app.use(express.static(path.join(__dirname, "..")));

// Test-Endpunkt: Damit kann man prüfen, ob das Backend erreichbar ist.
app.get("/health", function (request, response) {
    response.json({
        status: "ok",
        message: "Feeloo Backend ist erreichbar."
    });
});

const rekognitionClient = new RekognitionClient({
    region: process.env.AWS_REGION
});

/*
    Wandelt das Base64-Bild aus dem Frontend
    in echte Bilddaten für Amazon Rekognition um.
*/
function base64ToBuffer(base64Image) {

    const base64Data =
        base64Image.replace(/^data:image\/\w+;base64,/, "");

    return Buffer.from(base64Data, "base64");
}

/*
    Ordnet Amazon-Emotionen euren Feeloo-Moods zu.
*/
function mapEmotionToMood(emotionType) {

    const moodMap = {
        HAPPY: "Hervorragend",
        SAD: "Traurig",
        ANGRY: "Wütend",
        FEAR: "Ängstlich",
        CALM: "Neutral",
        CONFUSED: "Neutral",
        DISGUSTED: "Wütend",
        SURPRISED: "Gut"
    };

    return moodMap[emotionType] || "Neutral";
}

/*
    API-Endpunkt für die Gesichtsanalyse.
*/
app.post("/analyze-face", async function (request, response) {

    try {
        const imageData = request.body.image;

        if (!imageData) {
            return response.status(400).json({
                error: "Kein Bild erhalten."
            });
        }

        const imageBuffer =
            base64ToBuffer(imageData);

        const command =
            new DetectFacesCommand({
                Image: {
                    Bytes: imageBuffer
                },
                Attributes: ["ALL"]
            });

        const result =
            await rekognitionClient.send(command);

        if (
            !result.FaceDetails ||
            result.FaceDetails.length === 0
        ) {
            return response.json({
                mood: "Neutral",
                message: "Kein Gesicht erkannt."
            });
        }

        const emotions =
            result.FaceDetails[0].Emotions || [];

        const strongestEmotion =
            emotions.sort(function (a, b) {
                return b.Confidence - a.Confidence;
            })[0];

        const mood =
            mapEmotionToMood(strongestEmotion.Type);

        response.json({
            mood: mood,
            emotion: strongestEmotion.Type,
            confidence: strongestEmotion.Confidence
        });

    } catch (error) {
        console.log(error);

        response.status(500).json({
            error: "Fehler bei der Analyse."
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", function () {
    console.log("Feeloo Backend läuft auf Port " + PORT);
});