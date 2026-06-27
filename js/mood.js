// Hier holen wir das HTML-Element, in dem später der Tipp angezeigt wird.
const currentTip = document.querySelector("#currentTip");

// Hier holen wir alle Mood-Buttons aus dem HTML
const moodButtons = document.querySelectorAll(".mood-button");

// Hier holen wir die Stellen, die sich ändern sollen
const selectedMoodImage = document.querySelector("#selectedMoodImage");
const selectedMoodName = document.querySelector("#selectedMoodName");
const selectedMoodText = document.querySelector("#selectedMoodText");

// Texte passend zu jedem Mood
const moodTexts = {
    "Wütend": "Es ist okay, wütend zu sein. Atme kurz durch.",
    "Traurig": "Traurige Tage gehören dazu. Sei lieb zu dir.",
    "Müde": "Vielleicht brauchst du heute etwas mehr Ruhe.",
    "Neutral": "Ein ruhiger Tag ist auch vollkommen okay.",
    "Gut": "Schön, dass es dir heute gut geht.",
    "Hervorragend": "Schön, dass es dir heute so gut geht.",
    "Ängstlich": "Du musst heute nicht alles kontrollieren. Ein Schritt nach dem anderen.",
};

// Tipps passend zu jedem Mood
const moodTips = {
    "Wütend": "Atme 5-mal tief durch und mache einen kurzen Spaziergang.",
    "Traurig": "Ruf eine Person an, die dir wichtig ist.",
    "Ängstlich": "Konzentriere dich auf Dinge, die du gerade kontrollieren kannst.",
    "Müde": "Gönn dir eine Pause und trinke ausreichend Wasser.",
    "Neutral": "Nutze den Tag für etwas, das dir Freude macht.",
    "Gut": "Halte fest, was heute besonders gut gelaufen ist.",
    "Hervorragend": "Genieße den Moment und teile deine gute Stimmung."
};

//Jeder Stimmung wird eine eigene Hintergrundfarbe zugeordnet.
const moodColors = {
    "Wütend": "#ffe1e1",
    "Traurig": "#dfefff",
    "Ängstlich": "#e8ddff",
    "Müde": "#eee4ff",
    "Neutral": "#f0f0f0",
    "Hervorragend": "#fff4c7",
    "Gut": "#e1f7df"
};

// MoodCards sind dünkler
const moodCardColors = {
    "Wütend": "#ffd6d6",
    "Traurig": "#cfe8ff",
    "Ängstlich": "#dccbff",
    "Müde": "#d3d8ff",
    "Neutral": "#e2e2e2",
    "Hervorragend": "#ffe899",
    "Gut": "#cfeec8"
};

// Statistik-Card ist kräftiger
const moodStatsColors = {
    "Wütend": "#ffc6c6",
    "Traurig": "#bddfff",
    "Ängstlich": "#cfbcff",
    "Müde": "#c0c7ff",
    "Neutral": "#d8d8d8",
    "Hervorragend": "#ffe27a",
    "Gut": "#bee7b6"
};

// Kräftige Akzentfarben für Buttons, Slider und aktive Elemente
const moodAccentColors = {
    "Wütend": "#E96A6A",
    "Traurig": "#5EA9E8",
    "Ängstlich": "#8E6BE8",
    "Müde": "#6E7CE8",
    "Neutral": "#8F8F8F",
    "Hervorragend": "#F4C430",
    "Gut": "#67B977"
};

// Detailseite der Moods mit konkreten Tipps
const moodTipDetails = {
    "Wütend": [
        "Nimm dir kurz Abstand von der Situation.",
        "Atme langsam ein und aus.",
        "Schreib auf, was dich gerade stört."
    ],
    "Traurig": [
        "Erlaube dir, traurig zu sein.",
        "Sprich mit einer vertrauten Person.",
        "Mach etwas Kleines, das dir gut tut."
    ],
    "Ängstlich": [
        "Konzentriere dich auf deinen Atem.",
        "Schreibe drei Dinge auf, die gerade sicher sind.",
        "Mach einen kleinen Schritt nach dem anderen."
    ],
    "Müde": [
        "Plane eine kurze Pause.",
        "Trinke ein Glas Wasser.",
        "Reduziere deine To-do-Liste."
    ],
    "Neutral": [
        "Nimm kurz wahr, wie dein Tag läuft.",
        "Mach etwas Ruhiges für dich.",
        "Setze dir ein kleines Ziel."
    ],
    "Gut": [
        "Halte fest, was heute gut war.",
        "Teile deine gute Stimmung.",
        "Mach bewusst weiter mit dem, was dir gut tut."
    ],
    "Hervorragend": [
        "Genieße den Moment bewusst.",
        "Nutze deine Energie für etwas Schönes.",
        "Speichere dir diesen positiven Moment ab."
    ]
};

// Speichert den aktuell ausgewählten Mood.
let currentMood = selectedMoodName.textContent;

// Diese Funktion wird ausgeführt, wenn ein Mood angeklickt wird
function selectMood(button) {
    const mood = button.dataset.mood;
    const color = button.dataset.color;

    // Großen Mood-Namen ändern
    selectedMoodName.textContent = mood;

    // Erklärungstext und Tipptext ändern
    selectedMoodText.textContent = moodTexts[mood];
    currentMood = mood;
    showMoodTipCards();

    // Großes Bild ändern
    selectedMoodImage.src = "images/" + mood + ".png";
    selectedMoodImage.alt = mood;

    // Alte aktive Markierung entfernen
    moodButtons.forEach(function (moodButton) {
        moodButton.classList.remove("active");
    });

    // Neuen Button aktiv markieren
    button.classList.add("active");

    // Alte Hintergrundfarben entfernen
    document.body.className = "";

    // Neue Hintergrundfarbe setzen
    document.body.classList.add("mood-" + color);

    // kräftige Akzentfarbe für Buttons und Slider an den aktuellen Mood anpassen
    document.documentElement.style.setProperty(
        "--accent-color",
        moodAccentColors[mood]
    );
}

// Für jeden Button sagen wir:
// Wenn er angeklickt wird, soll selectMood ausgeführt werden
moodButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        selectMood(button);
    });
});

