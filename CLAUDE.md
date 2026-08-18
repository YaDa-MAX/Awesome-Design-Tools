# CLAUDE.md — HeiBen Kit (Remake-Weiterarbeit)

## Projekt
Fiktive Kölner Familienholding **HeiBen** („Heimat leben", GmbH i. G., GF immer Yakin Benkhaouda
& Katharina Hein) mit **fünf Welten**: Reisen `#a97a1d` · Wohnen `#4a5c39` · Immobilien `#792d29`
· Studio `#1f1c17` · Kulinarik `#6b3951` (kanonisch: `web/heiben-firmierungen.js`).
Statisches HTML/JS/CSS-**PWA ohne Build-Schritt**, offline-fähig, localStorage. Web-Root: `web/`
(101 Seiten). Blaupause: `REMAKE-KONZEPT.md`. Fortlaufendes Log & Detailwissen: `_WEITERARBEIT.md`
(IMMER lesen, IMMER fortschreiben).

## Arbeitsweise (bindend)
- Deutsch mit echten Umlauten/ß. Terse: liefern statt erklären. **Ein Deliverable pro Auftrag.**
- Keine Screenshots ungefragt. Bugs als Soll/Ist melden. Perfektionsanspruch: 0 PageErrors.
- Nichts „nebenbei" umbauen; stabile Verträge (unten) nie brechen.

## Pflicht-Workflow nach JEDER Änderung unter web/
1. Service-Worker-Version bumpen: `web/service-worker.js`, Muster `heiben-v20260622-NNNN`
   (aktuell **-2991**, nächste -2992). Neue Standalone-Seiten NICHT precachen; neue *gemeinsame*
   Dateien (CSS/JS) dagegen IMMER in `PRECACHE` aufnehmen, sonst bricht Offline.
2. `_WEITERARBEIT.md`: alte Versionsnummern ersetzen + neuen Abschnitt anhängen (Guard gegen Doppel).
3. Nach Datenänderungen (`web/*-daten.js`, Begriffskarten): `cd web && node ../tools/gen_kennzahlen.js`.
4. **Neue Seite oder geänderter Titel/Beschreibung**: Eintrag in `tools/seiten.json` pflegen, dann
   `cd web && node ../tools/gen_kopf.js` — erzeugt Kopfblock, `sitemap.xml` und `robots.txt` neu.

## Architektur-Regeln (Remake-Fundament, W1–W7 abgeschlossen)
- `web/heiben-design.css`: **ausschließlich `.hb-`-Klassen, nie Element-Selektoren** (Kollisionsschutz).
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
  auf noindex. Nächste Welle: **V3-W3 Offline & Ladelast** (Precache generieren,
  Datenmodule teilen, `mein-heiben` von 909 KB auf < 120 KB).
- `web/startseite-neu.html` = **Freigabe-Entwurf v2.2** (nicht verlinkt, nicht precached):
  Scrollytelling mit 5 CSS-3D-Objekten (Koffer/Haus/Tür/Glühbirne/Kochtopf), Lebenslinien-Regie
  (ein→pin→aus, globale Lerp-Glättung SY mit Teleport-Snap), Bewegungsprofile je Objekt (MOTION),
  bewiesene Dach-Geometrie. **Bei Freigabe**: als neue `index.html` übernehmen — SEO/JSON-LD,
  `heiben-legal.js`- und PWA-Snippets der alten index übernehmen, Alt-index als
  `startseite-klassisch.html` sichern, interne Verlinkung prüfen.
- Backlog: Ende von `_WEITERARBEIT.md` (u. a. gen_tagesdosis_daten.py neu schreiben bei nächster
  Kartencharge, Kompendium-Stationen-Autohaken, Behördengänge-Kompendium, Brutto-Netto-Rechner).
