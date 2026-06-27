// Einstiegspunkt der Feeloo-App.
// Service Worker registrieren.
if ("serviceWorker" in navigator) {

    navigator.serviceWorker.register("js/sw.js")

        .then(function () {
            console.log("Service Worker registriert");
        })

        .catch(function (error) {
            console.log(error);
        });
}