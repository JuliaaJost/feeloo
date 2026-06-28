# Feeloo

**LV Mobile Web Apps – Sommersemester 2026**
**Chiara Brandstetter, Julia Jost**

## Projektbeschreibung

Feeloo ist eine Progressive Web App (PWA), mit der Nutzer:innen ihre tägliche Stimmung festhalten können. Der aktuelle Mood kann entweder manuell über Mood-Balls ausgewählt oder mithilfe eines KI-Scans über die Kamera erkannt werden.

Zusätzlich können Informationen wie Energielevel, Stresslevel, Schlafqualität und persönliche Notizen gespeichert werden. Die gespeicherten Daten werden anschließend im Kalender, in der Statistik und im Bereich „Infos & Tipps“ wiederverwendet.

Für die KI-gestützte Stimmungserkennung wird Amazon AWS Rekognition verwendet. Die Kommunikation mit AWS erfolgt über ein lokales Node.js-Backend, damit sensible Zugangsdaten nicht im Frontend gespeichert werden müssen.

---

## Projektstruktur

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

## Aufbau der Anwendung

Die Anwendung ist in mehrere JavaScript-Dateien aufgeteilt. Dadurch bleibt der Code übersichtlich und die einzelnen Funktionen sind klar voneinander getrennt.

| Datei             | Beschreibung                                                                  |
| ----------------- | ----------------------------------------------------------------------------- |
| **app.js**        | Registriert den Service Worker und bereitet die App als PWA vor.              |
| **mood.js**       | Verwaltet Mood-Auswahl, Mood-Texte, Farben, Bilder und Tipps.                 |
| **navigation.js** | Steuert die Navigation zwischen Heute, Kalender, Infos & Tipps und Statistik. |
| **calendar.js**   | Erstellt die Kalenderansicht und zeigt gespeicherte Mood-Einträge pro Tag an. |
| **tips.js**       | Erstellt stimmungsabhängige Tipp-Karten und Detailansichten.                  |
| **statistics.js** | Berechnet Statistiken aus den gespeicherten Mood-Einträgen.                   |
| **storage.js**    | Speichert Mood-Einträge im LocalStorage des Browsers.                         |
| **scanner.js**    | Steuert Kamera, KI-Scanner und Kommunikation mit dem Backend.                 |
| **sw.js**         | Service Worker für Caching und PWA-Funktionalität.                            |

---

## Frontend

Das Frontend besteht aus HTML, CSS und JavaScript. Die Datei `index.html` bildet die Grundlage der Anwendung und enthält die verschiedenen Bereiche wie „Heute“, „Kalender“, „Infos & Tipps“ sowie „Statistik“.

Das Styling der Anwendung befindet sich in `css/style.css`. Dort werden unter anderem Farben, Schriftarten, Navigation, Mood-Balls, Karten, Kalender und der KI-Scanner gestaltet.

Feeloo wurde als Single-Page-Anwendung umgesetzt. Alle Bereiche befinden sich innerhalb derselben HTML-Datei und werden mithilfe von JavaScript ein- bzw. ausgeblendet. Dadurch ist kein Seitenwechsel erforderlich und die Bedienung ähnelt einer nativen App.

---

## Speicherung der Daten

Die Mood-Einträge werden lokal im Browser gespeichert. Dafür wird `localStorage` verwendet.

Gespeichert werden:

* Datum
* ausgewählter Mood
* Energielevel
* Stresslevel
* Schlafqualität
* persönliche Notiz

Die gespeicherten Einträge werden danach in mehreren Bereichen verwendet:

* im Kalender für die Tagesansicht
* in der Statistik für Durchschnittswerte und Mood-Verteilung
* im Bereich Infos & Tipps für den passenden Tipp des Tages

---
## Backend

Das Backend befindet sich im Ordner `backend`.

Es wurde mit Node.js und Express umgesetzt und übernimmt folgende Aufgaben:

- Bereitstellung der Frontend-Dateien
- Entgegennahme des Kamerabildes
- Kommunikation mit Amazon AWS Rekognition
- Zuordnung der erkannten Emotion zu einem Feeloo-Mood
- Rückgabe der erkannten Stimmung an das Frontend

Das Backend dient gleichzeitig als Schnittstelle zwischen Frontend und Amazon AWS Rekognition. Dadurch verbleiben die AWS-Zugangsdaten ausschließlich im Backend und müssen nicht im Frontend gespeichert werden.

Die Zugangsdaten werden über eine lokale `.env`-Datei geladen. Diese Datei wird aus Sicherheitsgründen nicht in das öffentliche Git-Repository hochgeladen.

---

Die benötigten Pakete stehen in der Datei `package.json`.

---

## Backend starten

Im ersten Terminal in den Backend-Ordner wechseln:

```powershell
cd backend
```

Danach den Server starten:

```powershell
node server.js
```

Nach erfolgreichem Start erscheint folgende Ausgabe:

```text
Feeloo Backend läuft auf Port 3000
```

Das Backend läuft dann lokal auf Port 3000.

---

## LocalTunnel starten

Damit das lokal laufende Backend auch vom Smartphone erreichbar ist, wird LocalTunnel verwendet.

Dafür wird ein zweites Terminal geöffnet und folgender Befehl ausgeführt:

```powershell
npx localtunnel --port 3000
```

Beim ersten Start muss die Installation von LocalTunnel bestätigt werden.

Danach wird eine öffentliche HTTPS-Adresse erzeugt, zum Beispiel:

```text
https://deep-coats-yawn.loca.lt
```

Diese Adresse ist nur ein Beispiel. LocalTunnel erzeugt bei jedem Start eine neue URL.

---

## App öffnen

Feeloo kann auf unterschiedliche Arten verwendet werden. Welche Variante genutzt wird, hängt davon ab, ob die KI-Funktion verwendet werden soll und ob die App am Laptop oder Smartphone geöffnet wird.

---

### Variante 1 – Laptop ohne KI

Die App wird direkt über die MAD-Adresse geöffnet:

```text
https://mad.kwmhgb.at/brandstetter/feeloo/index.html
```

Für diese Variante wird kein Backend benötigt.

Folgende Funktionen funktionieren ohne Backend:

* Mood auswählen
* Mood speichern
* Kalender verwenden
* Tipps anzeigen
* Statistik anzeigen
* App als PWA testen

---

### Variante 2 – Laptop mit KI

Die App wird über die MAD-Adresse geöffnet:

```text
https://mad.kwmhgb.at/brandstetter/feeloo/index.html
```

Zusätzlich muss das Backend lokal gestartet werden:

```powershell
cd backend
node server.js
```

Das Backend läuft anschließend auf:

```text
http://localhost:3000
```

Dadurch kann die KI-Funktion am Laptop verwendet werden, solange das Backend aktiv ist.

---

### Variante 3 – Smartphone ohne KI

Die App kann am Smartphone direkt über die MAD-Adresse geöffnet werden:

```text
https://mad.kwmhgb.at/brandstetter/feeloo/index.html
```

Für diese Variante werden weder Backend noch LocalTunnel benötigt.

Die App kann am Smartphone außerdem auf dem Homescreen gespeichert werden und wirkt dadurch wie eine installierte App.

---

### Variante 4 – Smartphone mit KI

Für die KI-Funktion am Smartphone muss zuerst am Laptop das Backend gestartet werden:

```powershell
cd backend
node server.js
```

Danach wird in einem zweiten Terminal LocalTunnel gestartet:

```powershell
npx localtunnel --port 3000
```

LocalTunnel erzeugt danach eine öffentliche HTTPS-Adresse, zum Beispiel:

```text
https://deep-coats-yawn.loca.lt
```

Diese LocalTunnel-Adresse wird anschließend am Smartphone geöffnet.

Der Grund dafür ist, dass ein Smartphone nicht direkt auf `localhost:3000` des Laptops zugreifen kann. `localhost` meint immer das jeweilige Gerät selbst. Am Smartphone würde `localhost` also auf das Smartphone zeigen und nicht auf den Laptop.

Durch LocalTunnel werden die Anfragen vom Smartphone an das lokal laufende Backend am Laptop weitergeleitet. Dadurch kann die Kameraaufnahme an das Backend gesendet, von Amazon AWS Rekognition analysiert und wieder an die App zurückgegeben werden.

---

## Ablauf der KI-Funktion

Der KI-Scan läuft in folgenden Schritten ab:

1. Die Nutzerin oder der Nutzer startet den Mood-Scan.
2. Die Kamera wird geöffnet.
3. Nach wenigen Sekunden wird automatisch ein Bild aufgenommen.
4. Das Bild wird an das Backend gesendet.
5. Das Backend sendet das Bild an Amazon AWS Rekognition.
6. AWS Rekognition erkennt eine Emotion.
7. Die erkannte Emotion wird einem Feeloo-Mood zugeordnet.
8. Die App zeigt den vorgeschlagenen Mood an.
9. Der Vorschlag kann übernommen oder manuell geändert werden.

Die KI ersetzt also nicht die eigene Einschätzung, sondern unterstützt nur bei der Mood-Auswahl.

---

## Zuordnung der Emotionen

AWS Rekognition gibt Emotionen wie `HAPPY`, `SAD`, `ANGRY`, `FEAR`, `CALM` oder `SURPRISED` zurück.

Diese Emotionen werden im Backend den Feeloo-Moods zugeordnet.

Beispiele:

| AWS Emotion | Feeloo Mood  |
| ----------- | ------------ |
| HAPPY       | Hervorragend |
| SAD         | Traurig      |
| ANGRY       | Wütend       |
| FEAR        | Ängstlich    |
| CALM        | Neutral      |
| SURPRISED   | Gut          |

Falls keine passende Emotion erkannt wird, wird standardmäßig `Neutral` verwendet.

---

## Progressive Web App

Feeloo wurde als Progressive Web App umgesetzt.

Folgende Bestandteile wurden implementiert:

* Web App Manifest (`manifest.webmanifest`)
* Service Worker (`js/sw.js`)
* eigenes App-Icon
* Standalone-Modus
* responsives Layout
* Speicherung auf dem Homescreen

Im Manifest sind unter anderem App-Name, Start-URL, Farben, Darstellungsmodus und App-Icon definiert.

Durch den Eintrag

```text
"display": "standalone"
```

kann die App nach dem Speichern auf dem Homescreen wie eine eigenständige App wirken.

---

## Verwendete Technologien

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Node.js
* Express

### Externe Dienste und APIs

* Amazon AWS Rekognition
* LocalTunnel
* Font Awesome
* Google Fonts

### Browser-Funktionen

* LocalStorage
* MediaDevices API
* Service Worker
* Web App Manifest

---

## Sicherheit

Die AWS-Zugangsdaten werden nicht im Frontend gespeichert.

Sie befinden sich lokal in der Datei:

```text
backend/.env
```

Diese Datei darf nicht in das öffentliche Git-Repository hochgeladen werden.

In der `.gitignore` sollten daher unter anderem folgende Einträge vorhanden sein:

```text
backend/.env
backend/node_modules/
.idea/
```

---

## Hinweise zur Nutzung

Die normale App funktioniert ohne Backend.

Für die KI-Funktion muss das Backend aktiv sein.

Für die KI-Funktion am Smartphone muss zusätzlich LocalTunnel aktiv sein.

Sobald Backend oder LocalTunnel geschlossen werden, funktionieren Mood-Auswahl, Kalender, Tipps und Statistik weiterhin. Nur die KI-Analyse ist dann nicht verfügbar.

Für eine dauerhafte Produktivversion müsste das Backend auf einem dauerhaft erreichbaren Server oder Cloud-Dienst gehostet werden. Dann wäre keine wechselnde LocalTunnel-Adresse mehr notwendig.

---

## GitHub

Das Projekt wurde gemeinsam über GitHub entwickelt und versioniert.

Repository:

```text
https://github.com/JuliaaJost/feeloo
```

Während der Entwicklung wurden Änderungen regelmäßig synchronisiert, getestet und dokumentiert.
