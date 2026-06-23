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
    showCalendarGrid();
    showStats();


    // Rückmeldung anzeigen
    alert("Dein Mood wurde gespeichert");
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

// Liste für alle Mood-Tipp-Karten holen
const moodTipsList = document.querySelector("#moodTipsList");

// Diese Funktion baut die Übersicht auf der Tipps-Seite
function showMoodTipCards() {

    moodTipsList.innerHTML = "";

    // Der aktuell ausgewählte Mood soll oben stehen.
    const sortedMoods = Object.keys(moodTips).sort(function (a, b) {
        if (a === currentMood) return -1;
        if (b === currentMood) return 1;
        return 0;
    });

    sortedMoods.forEach(function (mood) {

        const card = document.createElement("div");
        card.classList.add("mood-tip-item");
        const title = mood === currentMood
            ? "Tipp des Tages"
            : "Wenn du " + mood.toLowerCase() + " bist";
        if (mood === currentMood) {
            card.classList.add("focused-tip");
            card.style.backgroundColor = moodCardColors[mood];
        }

        card.innerHTML = `
            <img src="images/${mood}.png" alt="${mood}">
            <div>
                <h4>${title}</h4>
                ${
                     mood === currentMood
                    ? `<p class="current-mood-label">${mood}</p>`
                    : ""
                }
                <p>${moodTips[mood]}</p>
            </div>
        `;
// Öffnet die Detailseite des ausgewählten Moods.
        card.addEventListener("click", function () {
            showTipDetail(mood);
        });

        moodTipsList.appendChild(card);
    });
}

showMoodTipCards();

// Statistik-Bereich aus dem HTML holen
const statsContent = document.querySelector("#statsContent");

// Diese Funktion berechnet einfache Werte aus allen gespeicherten Einträgen
function showStats() {

    const entries = JSON.parse(localStorage.getItem("feelooEntries")) || [];

    if (entries.length === 0) {
        statsContent.innerHTML = "<p>Noch keine Statistik vorhanden.</p>";
        return;
    }

    const totalEntries = entries.length;

    const averageEnergy = (
        entries.reduce(function (sum, entry) {
            return sum + Number(entry.energy);
        }, 0) / totalEntries
    ).toFixed(1);

    const averageStress = (
        entries.reduce(function (sum, entry) {
            return sum + Number(entry.stress);
        }, 0) / totalEntries
    ).toFixed(1);

    const moodCount = {};

    entries.forEach(function (entry) {
        moodCount[entry.mood] = (moodCount[entry.mood] || 0) + 1;
    });

    const mostUsedMood = Object.keys(moodCount).sort(function (a, b) {
        return moodCount[b] - moodCount[a];
    })[0];
    // Für die Statistik verwenden wir dieselben Mood-Bilder wie im Today-Screen.
    const moodImage = "images/" + mostUsedMood + ".png";

    // Die Statistik-Seite bekommt die Farbe des häufigsten Moods.
    const statsPage = document.querySelector("#statsPage");
    statsPage.style.backgroundColor = moodColors[mostUsedMood];

    statsContent.innerHTML = `
        <div class="stats-summary-card" style="background-color: ${moodStatsColors[mostUsedMood]}">
            <img class="summary-mood-image" src="${moodImage}" alt="${mostUsedMood}">
            <div>
                <h3>Diese Woche war überwiegend ${mostUsedMood.toLowerCase()}.</h3>
                <p>Du hast an ${totalEntries} Tagen deinen Mood gespeichert.</p>
            </div>
        </div>
    
        <div class="stat-card">
            <strong>📅 ${totalEntries}</strong>
            <p>Getrackte Tage</p>
        </div>
    
        <div class="stat-card" style="background-color: ${moodStatsColors[mostUsedMood]}">
            <strong>
                <img class="small-stat-image" src="${moodImage}" alt="${mostUsedMood}">
                ${mostUsedMood}
            </strong>
            <p>Häufigster Mood</p>
        </div>
    
        <div class="stat-card">
            <strong>⚡ ${averageEnergy}/10</strong>
            <p>Ø Energielevel</p>
        </div>
    
        <div class="stat-card">
            <strong>💗 ${averageStress}/10</strong>
            <p>Ø Stresslevel</p>
        </div>
    `;

    // Bereich für die Mood-Verteilung erzeugen.
    const distributionCard = document.createElement("div");

    distributionCard.classList.add("distribution-card");

    distributionCard.innerHTML = `
        <h3>Mood-Verteilung</h3>
    `;

    statsContent.appendChild(distributionCard);

    // Für jeden gespeicherten Mood einen Balken erzeugen.
    Object.keys(moodCount).forEach(function (mood) {

        const percentage = Math.round(
            moodCount[mood] / totalEntries * 100
        );

        const row = document.createElement("div");

        row.classList.add("distribution-row");

        row.innerHTML = `
        <span>${mood}</span>

        <div class="distribution-bar">

            <div
                class="distribution-fill"
                style="width: ${percentage}%">
            </div>

        </div>

        <span>${percentage}%</span>
    `;

        distributionCard.appendChild(row);

    });

    // Wochen-Impuls passend zum häufigsten Mood.
    const weeklyTips = {
        "Wütend": "Diese Woche war viel Anspannung dabei. Plane bewusst kleine Pausen ein.",
        "Traurig": "Diese Woche wirkte emotional schwer. Sei besonders freundlich zu dir.",
        "Ängstlich": "Diese Woche war von Unsicherheit geprägt. Konzentriere dich auf kleine sichere Schritte.",
        "Müde": "Diese Woche zeigt viel Erschöpfung. Achte auf Ruhe, Schlaf und Pausen.",
        "Neutral": "Diese Woche war eher ruhig und stabil. Das ist auch wertvoll.",
        "Gut": "Diese Woche war überwiegend positiv. Nimm dir kurz Zeit, das bewusst wahrzunehmen.",
        "Hervorragend": "Diese Woche war sehr positiv. Genieße diese Energie und nimm sie mit."
    };

        const impulseCard = document.createElement("div");

        impulseCard.classList.add("impulse-card");

        impulseCard.innerHTML = `
        <h3>Wochen-Impuls</h3>
        <p>${weeklyTips[mostUsedMood]}</p>
    `;

        statsContent.appendChild(impulseCard);
}

showStats();


// Service Worker registrieren
if ("serviceWorker" in navigator) {

    navigator.serviceWorker.register("js/sw.js")

        .then(function () {
            console.log("Service Worker registriert");
        })

        .catch(function (error) {
            console.log(error);
        });
}

/*
    Kalender-Raster aus echten gespeicherten Mood-Einträgen.

    Die Daten kommen aus dem LocalStorage.
    Dadurch zeigt der Kalender nicht mehr Demo-Daten,
    sondern die Einträge, die Nutzer:innen wirklich speichern.
*/
const calendarGrid = document.querySelector("#calendarGrid");

// Detailbereich für einen angeklickten Kalendertag.
const calendarDetail = document.querySelector("#calendarDetail");

/*
    Überschrift des Kalenders.
    Diese wird automatisch auf den aktuellen Monat gesetzt.
*/
const calendarMonthTitle =
    document.querySelector("#calendarMonthTitle");

// Buttons zum Wechseln zwischen den Monaten.
const prevMonthButton =
    document.querySelector("#prevMonth");

const nextMonthButton =
    document.querySelector("#nextMonth");

/*
    Summary-Card unter dem Kalender.
    Hier zeigen wir den heutigen oder letzten Mood an.
*/
const calendarSummary =
    document.querySelector("#calendarSummary");

/*
    Kleine Karte für den neuesten gespeicherten Mood-Eintrag.
*/
const calendarLatestEntry =
    document.querySelector("#calendarLatestEntry");

/*
    Dieser Wert merkt sich,
    welcher Monat gerade angezeigt wird.
*/
let visibleCalendarDate = new Date();

/*
    Kleine Reflexionstexte passend zur Stimmung.
*/
const moodReflections = {
    "Wütend": {
        title: "Nimm dir einen Moment.",
        text: "Heute war einiges herausfordernd. Manchmal hilft es, kurz durchzuatmen und loszulassen."
    },

    "Traurig": {
        title: "Sei freundlich zu dir.",
        text: "Nicht jeder Tag muss perfekt sein. Es ist okay, Gefühle zuzulassen."
    },

    "Ängstlich": {
        title: "Ein Schritt nach dem anderen.",
        text: "Du musst nicht alles auf einmal schaffen. Kleine Schritte reichen völlig aus."
    },

    "Müde": {
        title: "Zeit zum Auftanken.",
        text: "Dein Körper und dein Kopf dürfen auch einmal eine Pause machen."
    },

    "Neutral": {
        title: "Ein ruhiger Tag.",
        text: "Auch unspektakuläre Tage gehören dazu und haben ihren Wert."
    },

    "Gut": {
        title: "Das lief gut.",
        text: "Versuche festzuhalten, was heute positiv war."
    },

    "Hervorragend": {
        title: "Genieße den Moment.",
        text: "Heute scheint ein guter Tag gewesen zu sein. Nimm dieses Gefühl bewusst wahr."
    }
};

/*
    Öffnet die Detailansicht für einen gespeicherten Kalendertag.
    Die Ansicht ist ähnlich aufgebaut wie im Mockup:
    Mood-Ball oben, darunter Mood-Card und Antwort-Cards.
*/
function showDayDetail(entry) {

    document.querySelector(".calendar-card").classList.add("hidden");
    calendarSummary.classList.add("hidden");
    calendarLatestEntry.classList.add("hidden");
    calendarDetail.classList.remove("hidden");

    calendarDetail.innerHTML = `
        <div class="calendar-detail-window">

            <button id="backToCalendar" class="calendar-back-button">
                 ‹
            </button>

            <p class="calendar-detail-date">${entry.date}</p>

            <img
                class="calendar-detail-big-image"
                src="images/${entry.mood}.png"
                alt="${entry.mood}">

            <div class="detail-mood-card">
                <span>Dein Mood</span>
                <strong>${entry.mood}</strong>
            </div>

            <div class="detail-question-card">
                <span>Wie ist dein Energielevel?</span>
                <strong>${entry.energy}/10</strong>
            </div>

            <div class="detail-question-card">
                <span>Wie hoch ist dein Stresslevel?</span>
                <strong>${entry.stress}/10</strong>
            </div>

            <div class="detail-question-card">
                <span>Wie war dein Schlaf?</span>
                <strong>${entry.sleep}/10</strong>
            </div>

            <div class="detail-question-card">
                <span>Deine Notiz</span>
                <p>${entry.note || "Keine Notiz"}</p>
            </div>

            <div class="detail-impulse-card" style="background-color: ${moodColors[entry.mood]}">
                <strong>${moodReflections[entry.mood].title}</strong>
                <p>${moodReflections[entry.mood].text}</p>
            </div>

        </div>
    `;

    document.querySelector("#backToCalendar").addEventListener("click", function () {
        calendarDetail.classList.add("hidden");
        document.querySelector(".calendar-card").classList.remove("hidden");
        calendarSummary.classList.remove("hidden");
        calendarLatestEntry.classList.remove("hidden");
    });
}

/*
    Diese Funktion baut den Kalender für den aktuellen Monat.

    Jeder Tag wird als Kreis angezeigt.
    Gespeicherte Tage werden farbig markiert.
*/

function showCalendarGrid() {

    /*
    Jahr und Monat des aktuell
    angezeigten Kalenders holen.
    */
    const year =
        visibleCalendarDate.getFullYear();

    const month =
        visibleCalendarDate.getMonth();

    //Monatsname für die Überschrift erzeugen.
    const monthName =
        visibleCalendarDate.toLocaleDateString(
            "de-DE",
            {
                month: "long",
                year: "numeric"
            }
        );

    calendarMonthTitle.textContent = monthName;

    calendarGrid.innerHTML = "";

    // Alle gespeicherten Mood-Einträge laden.
    const entries =
        JSON.parse(localStorage.getItem("feelooEntries")) || [];

    // Anzahl Tage des aktuellen Monats berechnen.
    const daysInMonth =
        new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {

        // Datum im selben Format erzeugen wie im LocalStorage.
        const date =
            year + "-" +
            String(month + 1).padStart(2, "0") + "-" +
            String(day).padStart(2, "0");

        const entry = entries.find(function (item) {
            return item.date === date;
        });

        const dayElement =
            document.createElement("button");

        dayElement.classList.add("calendar-day");

        dayElement.textContent = day;

        /*
            Prüft, ob dieser Kalendertag
            dem heutigen Datum entspricht.

            Falls ja, bekommt der Tag
            einen grünen Rahmen.
        */
        const today = new Date();

        if (
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        ) {
            dayElement.classList.add("today");
        }

        if (entry) {

            // Mood-Farbe setzen
            dayElement.style.backgroundColor =
                moodColors[entry.mood];

            // Optisch hervorheben.
            dayElement.classList.add(
                "calendar-day-active"
            );

            // Detailansicht öffnen.
            dayElement.addEventListener(
                "click",
                function () {
                    showDayDetail(entry);
                }
            );
        }

        calendarGrid.appendChild(dayElement);
    }

    // Nach dem Aufbau des Kalenders wird die Zusammenfassung aktualisiert.
    showCalendarSummary(entries);

}

/*
    Zeigt unter dem Kalender eine Monatszusammenfassung
    und zusätzlich den neuesten Mood-Eintrag.
*/
function showCalendarSummary(entries) {

    if (entries.length === 0) {
        calendarSummary.innerHTML = `
            <div class="calendar-summary-card">
                <p>Noch kein Mood gespeichert.</p>
            </div>
        `;

        calendarLatestEntry.innerHTML = "";
        return;
    }

    const latestEntry = entries[entries.length - 1];

    /*
        Häufigsten Mood berechnen.
    */
    const monthMoodCount = {};

    entries.forEach(function (entry) {
        monthMoodCount[entry.mood] =
            (monthMoodCount[entry.mood] || 0) + 1;
    });

    const mostUsedMoodInMonth =
        Object.keys(monthMoodCount).sort(function (a, b) {
            return monthMoodCount[b] - monthMoodCount[a];
        })[0];

    const mostUsedMoodAmount =
        monthMoodCount[mostUsedMoodInMonth];

    /*
        Durchschnittswerte berechnen.
    */
    const averageEnergy = (
        entries.reduce(function (sum, entry) {
            return sum + Number(entry.energy);
        }, 0) / entries.length
    ).toFixed(1);

    const averageStress = (
        entries.reduce(function (sum, entry) {
            return sum + Number(entry.stress);
        }, 0) / entries.length
    ).toFixed(1);

    const averageSleep = (
        entries.reduce(function (sum, entry) {
            return sum + Number(entry.sleep);
        }, 0) / entries.length
    ).toFixed(1);

    calendarSummary.innerHTML = `
        <div class="calendar-summary-card"
             style="background-color: ${moodColors[mostUsedMoodInMonth]}">

            <img
                class="calendar-summary-image"
                src="images/${mostUsedMoodInMonth}.png"
                alt="${mostUsedMoodInMonth}">

            <div class="calendar-summary-text">
                <p class="summary-small-text">Zusammenfassung</p>

                <h3>Dein häufigster Mood diesen Monat</h3>

                <h2>${mostUsedMoodInMonth}</h2>

                <p>Du hast diesen Mood an ${mostUsedMoodAmount} Tag(en) getrackt.</p>

                <div class="month-stats">
                    <p>⚡ Ø Energie: ${averageEnergy}</p>
                    <p>💖 Ø Stress: ${averageStress}</p>
                    <p>😴 Ø Schlaf: ${averageSleep}</p>
                </div>
            </div>

        </div>
    `;

    calendarLatestEntry.innerHTML = `
        <div class="calendar-latest-card">

            <div>
                <p class="summary-small-text">
                    ${latestEntry.date} · ${latestEntry.mood}
                </p>

                <p>Energielevel: ${latestEntry.energy}/10</p>

                <p>Notiz ansehen</p>
            </div>

            <img
                class="calendar-latest-image"
                src="images/${latestEntry.mood}.png"
                alt="${latestEntry.mood}">

        </div>
    `;

    document
        .querySelector(".calendar-summary-card")
        .addEventListener("click", function () {
            showDayDetail(latestEntry);
        });

    document
        .querySelector(".calendar-latest-card")
        .addEventListener("click", function () {
            showDayDetail(latestEntry);
        });
}


// Kalender beim Laden der App anzeigen.
showCalendarGrid();

/*
    Einen Monat zurück wechseln.
*/
prevMonthButton.addEventListener(
    "click",
    function () {

        visibleCalendarDate.setMonth(
            visibleCalendarDate.getMonth() - 1
        );

        calendarDetail.classList.add("hidden");

        showCalendarGrid();
    }
);

/*
    Einen Monat vor wechseln.
*/
nextMonthButton.addEventListener(
    "click",
    function () {

        visibleCalendarDate.setMonth(
            visibleCalendarDate.getMonth() + 1
        );

        calendarDetail.classList.add("hidden");

        showCalendarGrid();
    }
);

//  Hier holen wir die Elemente der Tipp-Detailseite aus dem HTML.
const tipDetail = document.querySelector("#tipDetail");
const backToTips = document.querySelector("#backToTips");
const tipDetailImage = document.querySelector("#tipDetailImage");
const tipDetailTitle = document.querySelector("#tipDetailTitle");
const tipDetailText = document.querySelector("#tipDetailText");
const tipDetailActions = document.querySelector("#tipDetailActions");

// Erstellt für jeden Mood eine Karte auf der Infos & Tipps Seite.
function showTipDetail(mood) {
    tipDetail.style.backgroundColor = moodColors[mood];
    moodTipsList.classList.add("hidden");
    tipDetail.classList.remove("hidden");

    tipDetailImage.src = "images/" + mood + ".png";
    tipDetailImage.alt = mood;

    tipDetailTitle.textContent = "Wenn du " + mood.toLowerCase() + " bist";
    tipDetailText.textContent = moodTips[mood];

    tipDetailActions.innerHTML = "";

    // Alle gespeicherten Empfehlungen des gewählten Moods anzeigen.
    moodTipDetails[mood].forEach(function (action) {
        const actionBox = document.createElement("div");
        actionBox.classList.add("tip-action");
        actionBox.textContent = action;
        tipDetailActions.appendChild(actionBox);
    });
}

backToTips.addEventListener("click", function () {
    tipDetail.classList.add("hidden");
    moodTipsList.classList.remove("hidden");
});