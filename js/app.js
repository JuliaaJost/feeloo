// Hier holen wir alle Mood-Buttons aus dem HTML
const moodButtons = document.querySelectorAll(".mood-button");

// Hier holen wir die Stellen, die sich ändern sollen
const selectedMoodImage = document.querySelector("#selectedMoodImage");
const selectedMoodName = document.querySelector("#selectedMoodName");
const selectedMoodText = document.querySelector("#selectedMoodText");

// Texte passend zu jedem Mood
const moodTexts = {
    "Wuetend": "Es ist okay, wütend zu sein. Atme kurz durch.",
    "Traurig": "Traurige Tage gehören dazu. Sei lieb zu dir.",
    "Muede": "Vielleicht brauchst du heute etwas mehr Ruhe.",
    "Neutral": "Ein ruhiger Tag ist auch vollkommen okay.",
    "Gut": "Schön, dass es dir heute gut geht.",
    "Hervorragend": "Schön, dass es dir heute so gut geht.",
    "Ängstlich": "Du musst heute nicht alles kontrollieren. Ein Schritt nach dem anderen.",
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

// Speichern-Button aus dem HTML holen
const saveButton = document.querySelector("#saveButton");

// Diese Variable merkt sich den aktuell ausgewählten Mood
let currentMood = selectedMoodName.textContent;

// currentMood immer aktualisieren, wenn ein Mood gewählt wird
moodButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        currentMood = button.dataset.mood;
    });
});

// Wenn auf "Mood speichern" geklickt wird
saveButton.addEventListener("click", function () {

    // Heutiges Datum erzeugen
    const today = new Date().toISOString().split("T")[0];

    // Werte aus den Formularfeldern holen
    const energy = document.querySelector("#energy").value;
    const stress = document.querySelector("#stress").value;
    const sleep = document.querySelector("#sleep").value;
    const note = document.querySelector("#note").value;

    // Ein Objekt mit allen Mood-Daten erstellen
    const moodEntry = {
        date: today,
        mood: currentMood,
        energy: energy,
        stress: stress,
        sleep: sleep,
        note: note
    };

    // Bestehende Einträge aus dem LocalStorage holen
    let entries = JSON.parse(localStorage.getItem("feelooEntries")) || [];

    // Prüfen, ob es für heute schon einen Eintrag gibt
    entries = entries.filter(function (entry) {
        return entry.date !== today;
    });

    // Neuen Eintrag hinzufügen
    entries.push(moodEntry);

    // Alle Einträge wieder speichern
    localStorage.setItem("feelooEntries", JSON.stringify(entries));
    showCalendarEntries();

    // Rückmeldung anzeigen
    alert("Dein Mood wurde gespeichert 🌿");
});

// Kalender-Container aus dem HTML holen
const calendarEntries = document.querySelector("#calendarEntries");

// Diese Funktion zeigt alle gespeicherten Mood-Einträge an
function showCalendarEntries() {

    // Einträge aus dem LocalStorage holen
    const entries = JSON.parse(localStorage.getItem("feelooEntries")) || [];

    // Wenn keine Einträge vorhanden sind
    if (entries.length === 0) {
        calendarEntries.innerHTML = "<p>Noch keine Einträge vorhanden.</p>";
        return;
    }

    // Kalender zuerst leeren
    calendarEntries.innerHTML = "";

    // Jeden Eintrag als Karte anzeigen
    entries.forEach(function (entry) {
        const entryCard = document.createElement("div");
        entryCard.classList.add("calendar-entry");

        entryCard.innerHTML = `
            <h3>${entry.date}</h3>
            <p><strong>Mood:</strong> ${entry.mood}</p>
            <p><strong>Energie:</strong> ${entry.energy}/10</p>
            <p><strong>Stress:</strong> ${entry.stress}/10</p>
            <p><strong>Schlaf:</strong> ${entry.sleep}/10</p>
            <p><strong>Notiz:</strong> ${entry.note || "Keine Notiz"}</p>
        `;

        calendarEntries.appendChild(entryCard);
    });
}

// Beim Laden der App direkt Kalender aktualisieren
showCalendarEntries();

// Alle Navigationsbuttons holen
const navButtons = document.querySelectorAll(".nav-button");

// Alle Seiten holen
const pages = document.querySelectorAll(".page");

// Diese Funktion zeigt eine Seite und versteckt die anderen
function showPage(pageName) {

    pages.forEach(function (page) {
        page.classList.add("hidden");
    });
    document.querySelector("#" + pageName + "Page").classList.remove("hidden");
    navButtons.forEach(function (button) {
        button.classList.remove("active");
    });
    document.querySelector('[data-page="' + pageName + '"]').classList.add("active");
}

// Klickfunktion für jeden Navigationsbutton
navButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        showPage(button.dataset.page);
    });
});