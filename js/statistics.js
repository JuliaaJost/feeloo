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

    // Zählt, wie oft jeder Mood gespeichert wurde.
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