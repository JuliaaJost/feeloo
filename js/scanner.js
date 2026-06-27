/*
    Elemente des KI-Scanners.
*/
const scannerModal =
    document.querySelector("#scannerModal");
const openScannerButton =
    document.querySelector("#openScannerButton");
const closeScannerButton =
    document.querySelector("#closeScannerButton");
const scannerVideo =
    document.querySelector("#scannerVideo");
const scannerStatus =
    document.querySelector("#scannerStatus");
const acceptMoodButton =
    document.querySelector("#acceptMoodButton");

/*
    Adresse unseres Backends.
*/
const aiBackendUrl =
    "http://localhost:3000/analyze-face";

/*
    Speichert den von der KI erkannten Mood.
*/
let aiSuggestedMood = "Gut";

/*
    Stoppt die Kamera,
    falls aktuell ein Kamerastream aktiv ist.
*/
function stopScannerCamera() {
    if (scannerVideo.srcObject) {
        scannerVideo.srcObject
            .getTracks()
            .forEach(function (track) {
                track.stop();
            });
        scannerVideo.srcObject = null;
    }
}

/*
    Kamera starten.

    Falls keine Kamera vorhanden ist oder der Zugriff
    verweigert wird, bleibt die App trotzdem benutzbar.
*/
async function startScanner() {
    scannerModal.classList.remove("hidden");
    scannerStatus.textContent =
        "Kamera wird gestartet...";
    acceptMoodButton.classList.add("hidden");
    try {
        const stream =
            await navigator.mediaDevices.getUserMedia({
                video: true
            });
        scannerVideo.srcObject = stream;
        scannerStatus.textContent =
            "Gesicht wird analysiert...";
        setTimeout(function () {
            const imageData =
                captureCurrentFrame();
            analyzeMoodWithAI(imageData);
        }, 3000);
    }
    catch (error) {
        scannerStatus.textContent =
            "Kamera ist auf diesem Gerät nicht verfügbar.";
        console.log("Kamera-Fehler:", error);
    }
}

/*
    Scanner öffnen.
*/
openScannerButton.addEventListener(
    "click",
    function () {
        startScanner();
    }
);

/*
    Scanner schließen.
*/
closeScannerButton.addEventListener(
    "click",
    function () {
        scannerModal.classList.add("hidden");
        stopScannerCamera();
        scannerStatus.textContent =
            "Kamera wird gestartet...";
        acceptMoodButton.classList.add("hidden");
    }
);

/*
    Vorschlag übernehmen.

    Es wird derselbe Code verwendet,
    als hätte die Nutzerin selbst
    einen Mood ausgewählt.
*/
acceptMoodButton.addEventListener(
    "click",
    function () {
        const suggestedButton =
            document.querySelector(
                `.mood-button[data-mood="${aiSuggestedMood}"]`
            );
        if (suggestedButton) {
            selectMood(suggestedButton);
        }
        scannerModal.classList.add("hidden");
        stopScannerCamera();
    }
);

/*
    Nimmt ein Bild
    aus dem aktuellen Kamerastream auf.
*/
function captureCurrentFrame() {
    const canvas =
        document.createElement("canvas");
    const context =
        canvas.getContext("2d");
    canvas.width =
        scannerVideo.videoWidth;
    canvas.height =
        scannerVideo.videoHeight;
    context.drawImage(
        scannerVideo,
        0,
        0,
        canvas.width,
        canvas.height
    );
    return canvas.toDataURL("image/jpeg");
}

/*
    Sendet das Kamerabild
    an unser Backend.
*/
async function analyzeMoodWithAI(imageData) {
    try {
        scannerStatus.textContent =
            "KI analysiert dein Gesicht...";

        const response =
            await fetch(aiBackendUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    image: imageData
                })
            });
        const result =
            await response.json();
        if (result.error) {
            scannerStatus.textContent =
                "Analyse fehlgeschlagen.";
            return;
        }

        aiSuggestedMood =
            result.mood;
        scannerStatus.textContent =
            "Mood erkannt: " + result.mood;
        acceptMoodButton.classList.remove("hidden");
        console.log(result);
    }

    catch (error) {

        scannerStatus.textContent =
            "Backend ist nicht erreichbar.";

        console.log(error);
    }
}