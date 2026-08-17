# HeiBen Kulinarik — Übergabe für den nächsten Chat

Stand: 05.06.2026. Sprache Deutsch, Concise Mode (knappe Prosa, volle Artefakt-Qualität).
Familie/Marke NIE erfinden. Fiktive Kölner Unternehmensfamilie „HeiBen": Yakin Benkhaouda
(m, 26, Vater aus Boukadir/Algerien) & Katharina Hein (w, 31), Hotelleitung, 1 Sohn.
Fünf Häuser: Reisen, Wohnen, Immobilien, Studio, **Kulinarik**.

---

## 1. Was fertig ist (nicht erneut bauen)

- **Web-Kit** unter `heiben_kit/web/` (25 Seiten, standalone: CSS inline, Assets base64,
  Google-Fonts-Link bleibt). Bau: `python3 build_standalone.py <name>`. Designsystem in `web/styles.css`
  (nach Änderung `cp styles.css _src/styles.css`). Akzent Kulinarik = Aubergine #6d3a52.
- **Office-Vorlagen** in `web/vorlagen/`: Lead-Tracker.xlsx, Angebot.docx, Expose.pptx, CSV-Brücke
  in anfragenverwaltung.html, Anleitung.md. Alle validiert.
- **Kulinarik-System** (5. Haus): Landing, Übersicht+Filter, Detail, Redaktion (intern), Export (intern).
  Ton „schweinefrei" entschärft: Website betont es nicht mehr; Abwandlungs-Hinweis nur bei Schwein-Originalen.
- **Rezeptdatenbank (Prompt 2) — KOMPLETT:** 153 Rezepte / 51 Länder (44 Europa + 7 Nordafrika),
  je Land 3 traditionelle, schweinefreie Gerichte. Import-fähiges generisches JSON.
  - Dateien in `heiben_kit/data/`: `rezepte-europa-batch-01..08.json`, `rezepte-batch-09..11.json`,
    `rezepte-alle.json` (alle 153), `rezepte-zusammenfassung.json`.
  - 17 Gerichte mit Feld `substitution` (nur wo Original Schwein enthält). Bilder durchweg Platzhalter
    (`{"image_type":"placeholder","placeholder_text":"Bild folgt"}`) — KEINE erfundenen Lizenzangaben.
- **Rezept-PDFs** in `heiben_kit/exporte/`:
  - `HeiBen-Rezepte-DE-DZ-Vorschau.pdf` (Vorschau Deutschland+Algerien, 7 Seiten).
  - `HeiBen-Rezepte-Gesamt.pdf` (FINAL, 157 Seiten: Titel + 3 Seiten Inhaltsverzeichnis mit Seitenzahlen
    + 153 Rezepte, ein Rezept pro A4-Seite).

## 2. Aktuelles PDF-Design (FREIGEGEBEN)

Generator: `heiben_kit/tools/build_full_recipe_pdf.py` (Quelle = `data/rezepte-alle.json`).
Render-Methode: HTML → Playwright/Chromium `pg.pdf(width=210mm,height=297mm,print_background,margin=0)`.
WICHTIG: `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers` setzen; Google-Fonts laden offline NICHT →
lokale Schriften nutzen.

- **Layout je Rezept (oben→unten):** Kopf (Eyebrow Land·Kontinent·Kategorie, Titel, kursive Kurzbeschreibung)
  → zweispaltig **links Zubereitung | rechts Zutaten** (Zutaten in Karte) → **Foto-Platzhalter** (40 mm,
  gestrichelt) → **Tipps** mit leuchtender Glühbirne 💡 → ggf. **„Unsere Abwandlung"** → **Herkunft
  (auf ~50 % gekürzt, an Satzgrenze) ganz unten** → Fußzeile mit Tags + „Land · Seite n".
- **Farbpalette „Beere & Salbei", grün-dominant** (Design-Tokens im Generator):
  GREEN `#4F7A36` (primär: Titel, Schritt-Nummern, Labels, Mengen, Tag-Rahmen),
  GREEN_DK `#436A2E`, BERRY `#B23E63` (sekundär/Akzent: Eyebrow, Trennlinien, Abwandlungskasten),
  BG `#FAF6EF`, CARD/IMG `#E8EEDF`, INK `#2B2A26`, SOFT `#5F5F54`, TIPBG `#EFE9DD`, SUBBG `#F4E4EA`, RULE `#D9D2C2`.
- **Typografie:** Lora (Display/Überschriften) + Carlito (Fließtext). Beide lokal vorhanden.
- **Inhaltsverzeichnis:** zweispaltig nach Ländern gruppiert (Europa alphabetisch, dann Nordafrika),
  Punktführung, Seitenzahl je Rezept. Seitenzahlen via Zwei-Pass-Verfahren exakt (erst TOC-Seiten messen,
  dann echte Nummern = 1 Cover + n_toc + Index).
- Verifiziert: exaktes A4, ein Rezept pro Seite, nichts abgeschnitten (auch dichteste Seiten:
  Cepelinai mit Abwandlung, Bazin), TOC-Seitenzahlen == echte Rezeptseiten.

## 3. 💡 Umsetzungsideen für den nächsten Chat (NOCH OFFEN — Vorschläge, nicht umgesetzt)

> Diese Punkte sind Ideen/Backlog. Vor Umsetzung jeweils mit dem Nutzer abstimmen.

- 💡 **Echte Fotos** statt Platzhalter: Lizenz-/Quellenklärung, dann ins PDF (Foto-Block) und in die Website
  einbinden. Feld `image` im JSON ist dafür vorbereitet (placeholder → echte URL/Datei).
- 💡 **Ländertrennblätter** vor jedem Land im Gesamt-PDF (Halbseiten-Intro mit Landname, Flagge optional,
  Kurztext). Wirkt sich auf Seitenzählung/TOC aus → Zwei-Pass anpassen.
- 💡 **Zusätzliche Register:** Index nach Gang/Kategorie (Vorspeise/Hauptgericht/Dessert/Suppe),
  nach Hauptzutat, sowie Diät-Register (vegetarisch/vegan). Daten dafür liegen in `categories`/`tags`.
- 💡 **DB → Website verdrahten:** die 153 DB-Rezepte in den Site-Datenstamm (`kulinarik-core.js` /
  localStorage→memStore) importieren, damit Übersicht/Filter/Detail sie zeigen. Schema-Mapping
  generisch (DB) ↔ Site-Datenmodell nötig.
- 💡 **Diät-/Saison-Badges** im PDF (kleine Plaketten „vegetarisch/vegan" aus `tags`/`categories`).
- 💡 **Portionsskalierung & Nährwerte** (optionales Feld; Mengen sind strukturiert in `ingredients`).
- 💡 **QR-Code je Rezept** auf die zugehörige Webseite (Detailseite ?id=).
- 💡 **Druckerei-/Print-Version:** 3 mm Beschnitt (Bleed), Schnittmarken, CMYK-Profil; ggf. Hardcover-Cover
  mit dezenter Textur/Muster statt Vollfläche.
- 💡 **Mehrsprachigkeit** (DE/EN/FR) der Rezepttexte; JSON um Sprachvarianten erweitern.
- 💡 **Grün-Intensität als konfigurierbares Token** (heller/kräftiger) + Dark-/High-Contrast-Variante
  für Barrierearmut.
- 💡 **TOC-Varianten:** zusätzlich nach Kontinent gruppiert oder Daumenregister am Seitenrand.

## 4. Wichtige Konventionen / Validierung

- Validator-Glob für DB: beide Muster `data/rezepte-europa-batch-*.json` UND `data/rezepte-batch-*.json`.
  Prüft je Land genau 3 Gerichte, Pflichtfelder, History 100–300 Wörter, ≥10 Tags, globale
  Duplikatfreiheit der `recipe_name`, Bild = placeholder.
- History im PDF wird zur Laufzeit halbiert (Funktion `halve_history`, nächste Satzgrenze ~50 %) —
  das DB-JSON bleibt unverändert (volle Geschichte).
- Westsahara als umstrittenes Gebiet gekennzeichnet (sahrauisch); Vatikanstadt als römisch-italienisch
  (keine eigenständige Nationalküche).
- Hilfsskripte/Render-Temp (`_full_render.html`, `_toc_probe.pdf`) sind Wegwerf-Dateien.

## 5. Lieferpaket

`/mnt/user-data/outputs/heiben_kit_aktualisiert.zip` (Gesamtkit inkl. `exporte/` und `tools/`).
Einzeln in Outputs außerdem: `HeiBen-Rezepte-Gesamt.pdf`, `HeiBen-Rezepte-DE-DZ-Vorschau.pdf`,
alle `rezepte-*.json`, sowie die drei Farb-Beispiele `Beispiel-A/B/C-*.pdf` (Vergleich; Auswahl war C grün-dominant).
