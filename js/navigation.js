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