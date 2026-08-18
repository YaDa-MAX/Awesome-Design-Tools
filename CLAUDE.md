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
   `PRECACHE`-Liste aus dem Dateibestand UND zählt die Cache-Version hoch (aktuell **-2995**).
   Nie von Hand pflegen. Standalone-Seiten (`typ` in `tools/seiten.json`) bleiben automatisch
   draußen; `vendor/` und Dateien > 150 KB kommen zur Laufzeit in den Cache (der fetch-Handler
   macht stale-while-revalidate). Wer nur die Version braucht, bumpt trotzdem über den Generator.
2. `_WEITERARBEIT.md`: alte Versionsnummern ersetzen + neuen Abschnitt anhängen (Guard gegen Doppel).
3. Nach Datenänderungen (`web/*-daten.js`, Begriffskarten): `cd web && node ../tools/gen_kennzahlen.js`.
4. **Neue Seite oder geänderter Titel/Beschreibung**: Eintrag in `tools/seiten.json` pflegen, dann
   `cd web && node ../tools/gen_kopf.js` — erzeugt Kopfblock, `sitemap.xml` und `robots.txt` neu.

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
- **Dokumentkopf ist generiert** (seit v3-W2): der Block zwischen `<!-- hb:kopf -->` und
  `<!-- /hb:kopf -->` gehört `tools/gen_kopf.js` — nie von Hand ändern, sondern `tools/seiten.json`
  pflegen und neu erzeugen. Der Generator fasst Schriften, Stylesheets und `<style>` NICHT an
  (deren Reihenfolge entscheidet über das Aussehen) und verschiebt vorhandene Einbindungen nie.
- `index.html` bewusst OHNE hb-nav (eigener Hero-Header, dokumentierte Ausnahme;
  in `tools/seiten.json` als `"nav": false` hinterlegt).
- Alt-Nav-Ablösung: `assert count('<nav>')==1` → Block ersetzen + `script#hb-mobile-js` mit entfernen.
- Brücken-Boxen „Aus der HeiBen-Welt" (`.hb-box.welt`, `--wf`=Zielfarbe): vor Einbau Guard
  `'Aus der HeiBen-Welt' not in s`; Kompendien haben **kein** `<footer>` → Anker `<p class="foot"`.

## Stabile Verträge (nie brechen)
- localStorage: `heiben-lernpfad`, `heiben-verlauf`, `heiben_results`, `heiben_pflanzen_v1`,
  `heiben_ordner_v1` (+ Welt-Speicher der Planer/Konfiguratoren).
- Deep-Links: `#id` (Kompendien-Steckbriefe), `?id=`, `?q=` (wissen.html), `?welt=` (welt-cockpit).
- Attribut-Namensraum: `data-welt` gehört `heiben-nav.js` (Weltlinks) — für eigene Schalter NIE
  wiederverwenden, sonst fängt die Navigation den Klick ab (in W3 passiert).
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
  Nächste Welle: **V3-W6 Speicher-Vertrag & Farbkanon** (`heiben-speicher.js` mit Register und
  Export/Import, ~1.050 hart kodierte Weltfarben auf `var(--hb-welt)`).
- `web/startseite-neu.html` = **Freigabe-Entwurf v2.2** (nicht verlinkt, nicht precached):
  Scrollytelling mit 5 CSS-3D-Objekten (Koffer/Haus/Tür/Glühbirne/Kochtopf), Lebenslinien-Regie
  (ein→pin→aus, globale Lerp-Glättung SY mit Teleport-Snap), Bewegungsprofile je Objekt (MOTION),
  bewiesene Dach-Geometrie. **Bei Freigabe**: als neue `index.html` übernehmen — SEO/JSON-LD,
  `heiben-legal.js`- und PWA-Snippets der alten index übernehmen, Alt-index als
  `startseite-klassisch.html` sichern, interne Verlinkung prüfen.
- Backlog: Ende von `_WEITERARBEIT.md` (u. a. gen_tagesdosis_daten.py neu schreiben bei nächster
  Kartencharge, Kompendium-Stationen-Autohaken, Behördengänge-Kompendium, Brutto-Netto-Rechner).
