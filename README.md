# Feeloo

**LV Mobile Web Apps – Sommersemester 2026**

## Projektbeschreibung

Feeloo ist eine Progressive Web App (PWA), mit der Benutzer:innen ihre tägliche Stimmung festhalten können. Der aktuelle Mood kann entweder manuell ausgewählt oder mithilfe einer KI über die Smartphone-Kamera erkannt werden. Zusätzlich können Informationen wie Energielevel, Stresslevel, Schlafqualität und persönliche Notizen gespeichert werden.

Für die automatische Stimmungserkennung wird Amazon AWS Rekognition verwendet. Die Kommunikation mit AWS erfolgt über ein lokales Backend, damit die Zugangsdaten nicht im Frontend gespeichert werden müssen.

---

# Projektstruktur

```text
Feeloo/
│
├── backend/
│   ├── node_modules/
│   ├── .env
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── css/
│   └── style.css
│
├── images/
│   ├── App-Icon.png
│   ├── Hervorragend.png
│   ├── Gut.png
│   ├── Neutral.png
│   ├── Müde.png
│   ├── Traurig.png
│   ├── Ängstlich.png
│   └── Wütend.png
│
├── js/
│   ├── app.js
│   ├── calendar.js
│   ├── mood.js
│   ├── navigation.js
│   ├── scanner.js
│   ├── statistics.js
│   ├── storage.js
│   ├── sw.js
│   └── tips.js
│
├── .gitignore
├── index.html
├── manifest.webmanifest
└── README.md
```

---

# Aufbau der Anwendung

Die Anwendung ist in mehrere JavaScript-Dateien aufgeteilt. Dadurch bleibt der Code übersichtlich und die einzelnen Funktionen sind klar voneinander getrennt.

| Datei             | Beschreibung                                                              |
| ----------------- | ------------------------------------------------------------------------- |
| **app.js**        | Registriert den Service Worker und initialisiert die PWA.                 |
| **mood.js**       | Verwaltet die Mood-Auswahl, Texte, Farben und Mood-Bilder.                |
| **navigation.js** | Steuert die Navigation zwischen den einzelnen Bereichen der App.          |
| **calendar.js**   | Erstellt den Kalender und zeigt gespeicherte Mood-Einträge an.            |
| **tips.js**       | Zeigt stimmungsabhängige Tipps und Detailinformationen an.                |
| **statistics.js** | Berechnet Statistiken aus den gespeicherten Mood-Einträgen.               |
| **storage.js**    | Speichert und lädt alle Daten über den Local Storage.                     |
| **scanner.js**    | Steuert den KI-Scanner, die Kamera und die Kommunikation mit dem Backend. |
| **sw.js**         | Service Worker der Progressive Web App.                                   |

---

# Backend

Das Backend befindet sich im Ordner backend.

Es wurde mit Node.js und Express umgesetzt und übernimmt folgende Aufgaben:

* Bereitstellung der Frontend-Dateien
* Entgegennahme des Kamerabildes
* Kommunikation mit Amazon AWS Rekognition
* Rückgabe der erkannten Stimmung an das Frontend

Die AWS-Zugangsdaten werden über eine lokale `.env` Datei geladen und befinden sich nicht im öffentlichen Repository.

---

# Anwendung starten

## Backend starten

Im ersten Terminal in den Backend-Ordner wechseln:

```powershell
cd backend
```

Anschließend den Server starten:

```powershell
node server.js
```

Nach erfolgreichem Start erscheint folgende Ausgabe:

```text
Feeloo Backend läuft auf Port 3000
```

---

## LocalTunnel starten

Damit das lokal laufende Backend auch vom Smartphone erreichbar ist, wird LocalTunnel verwendet.

Dafür ein zweites Terminal öffnen und folgenden Befehl ausführen:

```powershell
npx localtunnel --port 3000
```

Beim ersten Start muss die Installation von LocalTunnel bestätigt werden.

Danach wird eine öffentliche HTTPS-Adresse erzeugt, zum Beispiel:

```text
https://deep-coats-yawn.loca.lt
```

Da diese Adresse bei jedem Neustart neu erstellt wird, muss sie gegebenenfalls angepasst werden.

---

# App öffnen

Es gibt zwei Möglichkeiten, die Anwendung zu starten.

## Server-Version

Die Web-App ist über den MAD-Server erreichbar:

```text
https://mad.kwmhgb.at/brandstetter/feeloo/index.html
```

Diese Version eignet sich zum Verwenden der App ohne lokal gestartetes Backend.

## KI-Version

Für die Nutzung der KI-Funktion wird die durch LocalTunnel erzeugte URL verwendet.

Beispiel:

```text
https://deep-coats-yawn.loca.lt
```

Über diese Adresse werden sowohl das Frontend als auch das lokale Backend bereitgestellt. Dadurch kann die Kameraaufnahme direkt an das Backend gesendet und anschließend von Amazon AWS Rekognition analysiert werden.

---

# Ablauf der KI-Funktion

Der KI-Scan läuft in folgenden Schritten ab:

1. Die Kamera des Smartphones wird geöffnet.
2. Nach wenigen Sekunden wird automatisch ein Bild aufgenommen.
3. Das Bild wird an das lokale Backend gesendet.
4. Das Backend übermittelt das Bild an Amazon AWS Rekognition.
5. Die erkannte Emotion wird einem Feeloo-Mood zugeordnet.
6. Der vorgeschlagene Mood kann anschließend übernommen werden.

---

# Progressive Web App

Feeloo wurde als Progressive Web App umgesetzt.

Folgende Bestandteile wurden implementiert:

* Web App Manifest (`manifest.webmanifest`)
* Service Worker (`js/sw.js`)
* eigenes App-Icon
* Standalone-Modus
* responsives Layout

Dadurch kann die Anwendung direkt auf dem Smartphone installiert und wie eine native App verwendet werden.

---

# Verwendete Technologien

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Node.js
* Express

### Weitere Technologien

* Amazon AWS Rekognition
* LocalTunnel
* Local Storage
* MediaDevices API
* Service Worker
* Web App Manifest

---

# Hinweise

Die Datei `.env` enthält die AWS-Zugangsdaten und wird aus Sicherheitsgründen nicht in das öffentliche Git-Repository hochgeladen.

Damit die KI-Funktion funktioniert, müssen das Backend und LocalTunnel während der Nutzung aktiv sein.

---

# GitHub

Das Projekt wurde gemeinsam über GitHub entwickelt und versioniert.

Während der Entwicklung wurden Änderungen regelmäßig synchronisiert, getestet und dokumentiert.
