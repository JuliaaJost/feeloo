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
    "Hervorragend": "Schön, dass es dir heute so gut geht."
};

// Diese Funktion wird ausgeführt, wenn ein Mood angeklickt wird
function selectMood(button) {
    const mood = button.dataset.mood;
    const color = button.dataset.color;

    // Großen Mood-Namen ändern
    selectedMoodName.textContent = mood;

    // Erklärungstext ändern
    selectedMoodText.textContent = moodTexts[mood];

    // Großes Bild ändern
    selectedMoodImage.src = "images/" + mood + ".jpg";
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
}

// Für jeden Button sagen wir:
// Wenn er angeklickt wird, soll selectMood ausgeführt werden
moodButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        selectMood(button);
    });
});