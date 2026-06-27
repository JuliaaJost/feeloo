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