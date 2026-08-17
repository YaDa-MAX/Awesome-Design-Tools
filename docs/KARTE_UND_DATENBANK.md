# Interaktive Länderkarte & verdrahtete Rezeptdatenbank

Zwei Erweiterungen am fünften Haus (Kulinarik), beide bereits eingebaut und geprüft.

## 1) Die Rezeptdatenbank ist mit der Website verdrahtet

Die Website startet jetzt mit **159 Rezepten** als Werkseinstellung: Ihre **6 Familienrezepte**
(zuerst) plus **153 Länderrezepte** aus **51 Küchen** (44 europäische Länder + 7 nordafrikanische,
je drei Gerichte). Übersicht, Filter, Suche, Rezeptseite und Redaktion greifen alle darauf zu.

Der gesamte Bestand liegt in einer einzigen Datei: **`web/kulinarik-daten.js`**.
**Wichtig:** Diese Datei muss neben den `kulinarik-*.html`-Seiten liegen und mit ausgeliefert
werden — genau wie die Bilder. Fehlt sie, fallen die Seiten auf die sechs Familienrezepte zurück.

Pflege bleibt wie gewohnt über die **Redaktion**. Zwei Hinweise:
- Wer die Seite früher schon geöffnet hat, trägt die alten sechs Rezepte noch im Browser. Einmal
  in der Redaktion unter „Sichern und Laden“ auf **„Zurücksetzen“** — dann ist der volle Bestand da.
- Die Gang-Auswahl wurde um **„Suppe“** und **„Getränk“** ergänzt (die Datenbank nutzt beides).

## 2) Interaktive Karte auf der Rezept-Übersicht

Auf `kulinarik-rezepte.html` steht über Suche und Filter eine **anklickbare Karte** von Europa und
Nordafrika — als bildhafte Alternative zur Länderauswahl.

- **Land antippen** → ein Fenster (Overlay) zeigt die Gerichte dieses Landes.
- **Auf ein Gericht tippen** → öffnet das vollständige Rezept.
- **Daneben klicken, „×“ oder Esc-Taste** → schließt das Fenster, zurück zur Karte.
- **Sehr kleine Länder** (Andorra, Liechtenstein, Malta, Monaco, San Marino, Vatikanstadt) sind
  zusätzlich über die Knopfreihe **„Kleine Länder“** unter der Karte erreichbar.
- Westsahara ist als umstrittenes Gebiet schraffiert dargestellt und als sahrauische Küche geführt.

Die Karte ist eine eigene, vereinfachte Vektorzeichnung (aus gemeinfreien Natural-Earth-Geodaten,
Public Domain) und vollständig in die Seite eingebettet — keine externen Karten-Dienste, kein Tracking.

## Technische Notiz (für die Person, die die Website betreut)

Die Änderungen wurden direkt in den fertigen Standalone-Seiten vorgenommen (der `_src/`-Ordner war
nicht Teil des Pakets). Wird später aus `_src/` neu gebaut, müssen portiert werden:
1. in `kulinarik-core.js`: die Gang-Liste (+ „Suppe“, „Getränk“) und ein Vorrang für
   `window.HEIBEN_KULINARIK_SEED` an der Stelle, wo `SEED` verwendet wird;
2. in jeder Seite: `<script src="kulinarik-daten.js"></script>` vor dem Kern-Skript;
3. in `kulinarik-rezepte.html`: der Karten-Block (Stil, Abschnitt `kmap-section`, Skript mit
   eingebetteten Kartendaten `KMAP_DATA`).

## Nachtrag: Karten-Teaser auf der Kulinarik-Startseite

Die Startseite `kulinarik.html` zeigt jetzt eine kompakte Vorschau-Karte. Ein Klick auf
ein Land führt direkt zur großen Karte auf `kulinarik-rezepte.html` und **öffnet dort
sofort die Gerichte dieses Landes** (über den Adresszusatz `?land=Landesname`). Die
Vorschau-Karte ist absichtlich leicht gehalten (kein Rezept-Datensatz auf der Startseite) —
die Rezepte selbst lädt erst die große Karte.

## Nachtrag: Zubereitungszeit & Portionen-Rechner

**Zeiten.** Jedes Rezept hat jetzt Vorbereitungs- und Kochzeit; die Rezeptseite zeigt
„Vorbereitung", „Kochzeit" und „Zeit gesamt". Für die sechs Familienrezepte sind es Ihre
echten Angaben. Für die 153 Länderrezepte sind es **Schätzwerte** (aus Zutaten- und
Schrittzahl sowie Garmethode abgeleitet), klar gekennzeichnet mit dem Hinweis
„Zeitangaben sind Schätzwerte". Sie lassen sich jederzeit in der Redaktion korrigieren.

**Portionen mit automatischer Mengen-Anpassung.** Auf der Rezeptseite steht über den Zutaten
ein Regler „Portionen − Zahl +". Wird er verändert, **rechnen sich alle Mengen sofort um**
(z. B. 800 g → 1200 g bei 6 statt 4 Portionen). Mengen ohne Zahl („Salz", „Olivenöl nach
Geschmack") bleiben unverändert. Auf der Rezept-Übersicht gibt es denselben Regler als
Voreinstellung „für alle Rezepte" — einmal gewählt, öffnet jedes Rezept gleich in der
gewünschten Portionszahl. Steht er auf „Grundrezept", nutzt jedes Rezept seine eigene Basis.

Hintergrund: Die Mengen liegen dafür strukturiert in `kulinarik-daten.js` (Feld `zutatenS`),
zusätzlich zur bisherigen Textfassung. Die gemerkte Portionszahl teilen sich die Seiten am
besten in der gehosteten Fassung (gemeinsamer Speicher des Browsers).

## Nachtrag: Rezeptbilder einsetzen

Bildvorgaben für die Bild-KI: JPG (Qualität ~80, < 300 KB), 3:2 quer, 1600 × 1067 px
(bis 1920 × 1280), Gericht mittig mit Rand, kein Text/Logo im Bild. Dasselbe Bild dient als
großer Aufmacher und als Kachel (Zuschnitt 21:9 / 16:9 / 4:3 — daher mittig halten).

Ablauf: pro Rezept genau eine Datei, benannt nach der Rezept-ID (`<id>.jpg`), abgelegt in
`web/assets/rezepte/`. Die vollständige Zuordnung (Dateiname, Rezept, Land, Gang, plus ein
fertiger Prompt-Vorschlag je Gericht) steht in `web/assets/rezepte/_dateiliste.csv`.

Die Bilder sind per Konvention verdrahtet: Liegt eine passend benannte Datei im Ordner,
erscheint sie automatisch — auf Übersicht und Rezeptseite. Fehlt sie, bleibt der Platzhalter.
Es ist keine Code-Änderung und kein Eintrag in der Redaktion nötig.
