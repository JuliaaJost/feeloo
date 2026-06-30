/*
    Service Worker für Feeloo

    Er speichert wichtige Dateien,
    damit die App später auch ohne
    Internet teilweise funktioniert.
*/

const CACHE_NAME = "feeloo-v2";

// Dateien, die für die Offline-Nutzung im Cache gespeichert werden.
const FILES_TO_CACHE = [
    "/",
    "/index.html",
    "/css/style.css",
    "/js/app.js",
    "/js/calendar.js",
    "/js/mood.js",
    "/manifest.webmanifest",

    "/images/App-Icon.png",
    "/images/Gut.png",
    "/images/Hervorragend.png",
    "/images/Müde.png",
    "/images/Neutral.png",
    "/images/Traurig.png",
    "/images/Wütend.png",
    "/images/Ängstlich.png"
];

// Beim Installieren speichern wir die Dateien
self.addEventListener("install", function (event) {

    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(FILES_TO_CACHE);
        })
    );
});

// Wenn eine Datei angefragt wird, versuchen wir zuerst den Cache.
self.addEventListener("fetch", function (event) {

    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});