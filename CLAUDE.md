# CLAUDE.md — HeiBen Kit (Remake-Weiterarbeit)

## Projekt
Fiktive Kölner Familienholding **HeiBen** („Heimat leben", GmbH i. G., GF immer Yakin Benkhaouda
& Katharina Hein) mit **fünf Welten**: Reisen `#a97a1d` · Wohnen `#4a5c39` · Immobilien `#792d29`
· Studio `#1f1c17` · Kulinarik `#6b3951` (kanonisch: `web/heiben-firmierungen.js`).
Statisches HTML/JS/CSS-**PWA ohne Build-Schritt**, offline-fähig, localStorage. Web-Root: `web/`
(102 Seiten). Blaupause: `REMAKE-KONZEPT.md`. Fortlaufendes Log & Detailwissen: `_WEITERARBEIT.md`
(IMMER lesen, IMMER fortschreiben).

## Arbeitsweise (bindend)
- Deutsch mit echten Umlauten/ß. Terse: liefern statt erklären. **Ein Deliverable pro Auftrag.**
- Keine Screenshots ungefragt. Bugs als Soll/Ist melden. Perfektionsanspruch: 0 PageErrors.
- Nichts „nebenbei" umbauen; stabile Verträge (unten) nie brechen.

## Pflicht-Workflow nach JEDER Änderung unter web/
1. **Precache + Service-Worker-Version**: `cd web && node ../tools/gen_sw.js` — erzeugt die
   `PRECACHE`-Liste aus dem Dateibestand UND zählt die Cache-Version hoch (aktuell **-3008**).
   Nie von Hand pflegen. Standalone-Seiten (`typ` in `tools/seiten.json`) bleiben automatisch
   draußen; `vendor/` und Dateien > 150 KB kommen zur Laufzeit in den Cache (der fetch-Handler
   macht stale-while-revalidate). Wer nur die Version braucht, bumpt trotzdem über den Generator.
2. `_WEITERARBEIT.md`: alte Versionsnummern ersetzen + neuen Abschnitt anhängen (Guard gegen Doppel).
3. Nach Datenänderungen (`web/*-daten.js`, Begriffskarten): `cd web && node ../tools/gen_kennzahlen.js`.
4. **Neue Seite oder geänderter Titel/Beschreibung**: Eintrag in `tools/seiten.json` pflegen, dann
   `cd web && node ../tools/gen_kopf.js` — erzeugt Kopfblock, `sitemap.xml`, `robots.txt`,
   `heiben-werkzeuge.js`, `heiben-bereiche.js` und `heiben-menue.js` neu. Optionale Felder je
   Eintrag: `gruppe` (Werkzeuge), `nav:false` (Seite bringt eigene Navigation mit), `farbe`
   (theme-color, Vorgabe `#f3eee5`), `bild` (Vorschaubild beim Teilen, Vorgabe `hero-light.png`).

## Architektur-Regeln (Remake-Fundament, W1–W7 abgeschlossen)
- `web/heiben-design.css`: **ausschließlich `.hb-`-Klassen, nie Element-Selektoren** (Kollisionsschutz).
- **Designgrundstruktur (seit v3-W3)**: `heiben-design.css` hat vier Ebenen — Tokens (Farbe,
  Schrift, Raum, Form, Höhe, **Bewegung**), Weltzuweisung über `[data-hb-welt]`, den unveränderten
  Bestand aus W1, neue Bausteine. **Kein Bauteil nennt je einen Wert, nur eine Rolle**
  (`var(--hb-welt)` statt Hex, `var(--hb-zeit-kurz)` statt `180ms`). Vorführung: `designsystem.html`.
- **Bewegung (seit v3-W3)**: `data-hb-motion="auf|ein|skala|seite|linie"` sagt WAS, `hb-motion.js`
  sagt WANN; Stufung aus der Geschwisterfolge oder `data-hb-stufe`. Neue Seiten setzen
  `<body data-hb-regie="ansage">` — das schaltet den **eingefrorenen** Bestandspfad
  (`section`/`footer`/`[class*="grid"]` → `.hb-rv`) ab. Bewegungsruhe wird in der Token-Ebene
  beantwortet (Dauern/Wege auf 0), nie durch Ausstieg. `hb-motion.js` startet SOFORT (nicht erst
  bei DOMContentLoaded), sonst blitzt der Inhalt auf.
- Gemeinsame Bestands-Stile/Skripte liegen seit v3-W1 als Dateien vor (`styles.css` = Leitfassung
  auf 29 Seiten, `hb-menue.css`, `hb-motion.css/.js`, `hb-pwa.js`, `hb-suche-nav.js`,
  `hb-*-core.js` …). **Nie wieder inlinen** — `build_standalone.py` ist die einzige Ausnahme
  (erzeugt bewusst eigenständige Einzelseiten). Bilder immer aus `assets/`, nie als base64.
- `web/heiben-nav.js`: baut `div role="banner"`/`div role="navigation"` — **niemals `header`/`nav`-Elemente**
  (Bestand stylt `nav{}` als Element-Selektor). Einbau je Seite: `<link heiben-design.css>` +
  `<script heiben-nav.js defer>` vor `</head>` + `<body data-hb-welt="reisen|wohnen|immobilien|studio|kulinarik|wissen|konto|holding">`.
  **Weltmenü (seit v3-W9)**: dieselbe Datei baut zusätzlich ein Vollbild-Menü mit den fünf Welten
  und deren Unterseiten. Quelle ist `web/heiben-menue.js` (generiert aus `tools/seiten.json`,
  Pflichtdatei auf jeder Seite mit Navigation). Das Feld entsteht **erst beim ersten Öffnen** —
  `heiben-menue.js` hängt hinter `heiben-nav.js`, beide `defer`, die Liste gibt es beim Ausführen
  also noch nicht. Die Weltfarbe der Leiste kommt aus `--hb-welt` (Token-Ebene), nicht aus JS.
- **Dokumentkopf ist generiert** (seit v3-W2): der Block zwischen `<!-- hb:kopf -->` und
  `<!-- /hb:kopf -->` gehört `tools/gen_kopf.js` — nie von Hand ändern, sondern `tools/seiten.json`
  pflegen und neu erzeugen. Der Generator fasst Schriften, Stylesheets und `<style>` NICHT an
  (deren Reihenfolge entscheidet über das Aussehen) und verschiebt vorhandene Einbindungen nie.
- `index.html` bewusst OHNE hb-nav (`"nav": false` in `tools/seiten.json`): die Startseite bringt
  Leitwerk, Kopfleiste und Weltmenü selbst mit, weil sie als einzige Seite auf Marken-Tinte steht
  und ihre Regie an einem eigenen rAF-Takt hängt.
- Alt-Nav-Ablösung: `assert count('<nav>')==1` → Block ersetzen + `script#hb-mobile-js` mit entfernen.
- Brücken-Boxen „Aus der HeiBen-Welt" (`.hb-box.welt`, `--wf`=Zielfarbe): vor Einbau Guard
  `'Aus der HeiBen-Welt' not in s`; Kompendien haben **kein** `<footer>` → Anker `<p class="foot"`.

## Stabile Verträge (nie brechen)
- localStorage: **88 Schlüssel, Namen unveränderlich** — beschrieben in `web/heiben-speicher.js`
  (Register Schlüssel → Welt, Präfixregeln für neue, `exportieren`/`importieren`/`zuruecksetzen`).
  Das Modul BESCHREIBT nur; Seiten schreiben weiter direkt in `localStorage`. Aufgezählt wird der
  echte Speicher, nie das Register — sonst gehen zur Laufzeit gebildete Schlüssel verloren.
  Import führt standardmäßig ZUSAMMEN, überschreibt also nichts still.
  Kernschlüssel: `heiben-lernpfad`, `heiben-verlauf`, `heiben_results`, `heiben_pflanzen_v1`,
  `heiben_ordner_v1` (+ Welt-Speicher der Planer/Konfiguratoren).
- Deep-Links: `#id` (Kompendien-Steckbriefe), `?id=`, `?q=` (wissen.html), `?welt=` (welt-cockpit).
- Attribut-Namensraum: `data-welt` gehört `heiben-nav.js` (Weltlinks) — für eigene Schalter NIE
  wiederverwenden, sonst fängt die Navigation den Klick ab (in W3 passiert).
- **Interner Bereich (seit v3-W7)**: `typ:"intern"` in `tools/seiten.json` genügt — `gen_kopf.js`
  hängt `heiben-bereiche.js` + `hb-bereiche.js` an, das Band („Interner Bereich") erscheint
  automatisch unter der Navigation, die Seite steht auf `noindex`, fehlt in Sitemap und Suche und
  taucht in der Übersicht auf `holding-dashboard.html` auf. Behälter: `data-hb-intern`,
  `data-hb-weltseiten="<welt>"`.
- **Werkzeug-Register (seit v3-W5)**: `web/heiben-werkzeuge.js` wird aus `tools/seiten.json`
  erzeugt (`typ:"werkzeug"` + `gruppe`); `hb-werkzeuge.js` rendert es in jeden Behälter
  `<div data-hb-werkzeuge="alle|<welt>|<gruppe>">`. Neues Werkzeug = Eintrag in `seiten.json`,
  sonst nichts. Client-erzeugte Kacheln tragen **kein** `data-hb-motion` (sie entstehen nach
  `hb-motion.js` und blieben sonst bis zum Sicherheitsnetz unsichtbar).
- Daten-Arrays (`*-daten.js`) nur ans Ende erweitern, `id`-Felder stabil. `PFADE` ist `var` (script-scope).
- Fiktions-Fakten: GmbH i. G., Benkhaouda/Hein, „Heimat leben", Köln.

## Testen (Playwright headless, Chromium)
- Server: `cd web && python3 -m http.server 8180 &`. Browser-Args:
  `--enable-unsafe-swiftshader --use-gl=angle --use-angle=swiftshader --ignore-gpu-blocklist`.
- pageerror + console-error sammeln; Noise-Filter: `fonts.g`, `403`, `Failed to load resource`,
  `favicon`, `manifest`. Ziel überall: **0 PageErrors**.
- Gelernte Fallen: Hash-`goto` auf gleicher Seite löst keinen load aus → `reload()` anhängen.
  Programmatisches Scrollen mit `behavior:'instant'` (Seite hat scroll-behavior:smooth).
  Nach Scroll **zwei `requestAnimationFrame`-Ticks** abwarten (rAF-Starvation unter SwiftShader).
  Lerp-Regie (startseite-neu): kleine Deltas konvergieren langsam → für Grenzmessungen
  Doppelsprung (erst weit weg, dann groß aufs Ziel = Snap). 3D-Geometrie an `.f`-Flächen
  (mit width) messen — 0-Größen-Gruppen liefern keine projizierten Kind-Rects.

## Status & Nächstes
- Remake-Wellen 1–7 fertig: 100/100 Seiten auf dem Fundament, 11 Brücken, QS-Protokoll in
  `_WEITERARBEIT.md`. MCP/W8 **gestrichen**.
- **Remake v3 läuft** (Blaupause `REMAKE-KONZEPT-V3.md`, Messinstrument `tools/audit_v3.py`).
  V3-W1 fertig: Entdoppelung + Bilder als Dateien, HTML 6,2 → 2,9 MB, bewiesen unsichtbar.
  V3-W2 fertig: Kopf-Generator, Dokumentkopf 100/100, Sitemap 18 → 88 URLs, 11 interne Seiten
  auf noindex.
  V3-W3 fertig: Designgrundstruktur + Bewegungsgrammatik neu gefasst, `designsystem.html` als
  lebender Styleguide; Marken-DNA unverändert, Bestand layoutneutral.
  V3-W4 fertig: `tools/gen_sw.js` (Precache generiert, 101/101), `mein-heiben` 909 → 75 KB,
  Offline-Test 13/13 Seiten, three.min.js von drei Kopien auf eine (`vendor/three/`).
  V3-W5 fertig: Werkzeug-Register (21 Werkzeuge, 5 Gruppen) in Wissen/Reisen/Immobilien, Suche in
  der Navigation, Suchindex 18 → 89 Zielseiten; Waisen 22 → 2 (404 + Standalone-Entwurf).
  V3-W6 fertig: `heiben-speicher.js` (88 Schlüssel im Register, Export/Import/Reset), Speicher-
  Abschnitt in `mein-heiben`; Farbkanon geprüft — nur 15 der vermeintlich ~1.050 Vorkommen waren
  echt ersetzbar, umgestellt.
  V3-W7 fertig: Backoffice-Rahmung (11/11 Seiten mit einheitlichem Band + Übersicht im
  Holding-Dashboard), Weltseiten-Übersicht für Reisen und Immobilien. **Offen und bewusst nicht
  erfunden**: die inhaltliche Augenhöhe von Reisen (5 Seiten/124 KB) und Immobilien (5/92 KB)
  gegenüber Kulinarik (12/439 KB) — das ist eine Inhaltsentscheidung des Users, keine Umbauarbeit.
  V3-W8 Teil 1 fertig: **Gesamt-QS** — 15/15 Prüfungen bestanden (Deep-Links, Persistenz,
  Register, Responsiv), Offline 13/13, 11 Brücken ohne kaputte Ziele, Sweep 102/102 ohne
  PageErrors. Protokoll in `_WEITERARBEIT.md`.
  **Offen: Übernahme von `startseite-neu.html` als `index.html` — wartet auf die Freigabe des
  Users.** Bei Freigabe genügt: Datei tauschen, `tools/seiten.json` pflegen, `gen_kopf.js` und
  `gen_sw.js` laufen lassen (SEO/JSON-LD/Legal/PWA kommen jetzt aus dem Generator).
- **Startseite übernommen (v3-W10)**: `index.html` ist „Ein Strich, fünf Welten" — Grund auf
  Marken-Tinte, im Kopf ein Globus aus fünf farbigen Strichen, der beim Eintritt in Reisen an den
  Koffer übergibt; danach morpht eine nie abreißende Linie Koffer → Haus → Tür → Glühbirne → Topf.
  Hauptlinie ist eine geschlossene Silhouette, Detailstriche blenden nur ein, wenn die Form steht.
  Je Kapitel vier kurze Zeilen: Weltname groß, Verb kursiv, ein Satz, ein Weg. Maskenaufzug statt
  Blur-Translate, ein rAF-Takt. `"nav": false`, `farbe: #1f1c17`, `bild: assets/hero-dark.png`.
  Fallen dokumentiert in `_WEITERARBEIT.md` (IntersectionObserver + eigenes `clip-path`;
  Klassenregel schlägt `hidden`; Änderungssperre muss den Übergang mitführen).
- `web/startseite-klassisch.html` = **die Startseite bis W10**, archiviert (standalone, nicht
  verlinkt, nicht precached). Sie ist die einzige Seite, die `hb-menue.css` und `hb-suche-nav.js`
  noch braucht.
- `web/startseite-neu.html` = **Vorgänger-Entwurf v2.2, nur noch Inspiration** (standalone):
  Scrollytelling mit 5 CSS-3D-Objekten, Lebenslinien-Regie, bewiesene Dach-Geometrie.
- Backlog: Ende von `_WEITERARBEIT.md` (u. a. gen_tagesdosis_daten.py neu schreiben bei nächster
  Kartencharge, Kompendium-Stationen-Autohaken, Behördengänge-Kompendium, Brutto-Netto-Rechner).
