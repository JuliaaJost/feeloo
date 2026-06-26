
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