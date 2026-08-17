# HeiBen Remake — Blaupause v2 · Fünf-Welten-Fassung
Stand: SW heiben-v20260622-2978 · ersetzt v1 vollständig.
Auftrag: „Full Remake of whole Business. Clear Structure of Content and Business modell."
+ Korrektur: „Vergiss nicht die anderen Welten. Waren mal fünf. Inkludieren, ggf. überarbeiten
oder ersetzen durch neues Produkt."

---

## 0. Korrektur gegenüber v1

v1 betrachtete nur den Studio-Ausschnitt (Wissen/Werkzeuge). Tatsächlich ist HeiBen eine
**Familienholding aus fünf operativen Welten**, jede als eigene GmbH i. G. mit Firmierung,
Farbe, Leistungsbild und Steuerlogik (kanonisch in `web/heiben-firmierungen.js`), darüber die
**HeiBen Holding GmbH i. G.** (Claim „Heimat leben", GF Benkhaouda/Hein) mit Holding-Dashboard,
Welt-Cockpit und Angebots-/Belegsystem (`heiben-angebot.js`, `heiben-pdf.js`).

**Substanz-Inventar (Ist):**

| Welt | Firmierung · Farbe | Seiten | Umfang | Kern-Interaktion |
|---|---|---|---|---|
| Reisen | HeiBen Reisen GmbH · `#a97a1d` | 4 | ~3.300 Z. | Kuratiert, Planer, Anfrage (Margenbesteuerung § 25) |
| Wohnen | HeiBen Wohnen GmbH · `#4a5c39` | 4 + Manufaktur | ~14.300 Z. | Konfigurator, Planer, 2D-Plan/3D-Raum (`heiben-plan2d/room3d.js`) |
| Immobilien | HeiBen Immobilien GmbH | 5 | ~3.200 Z. | Angebote, Planner, Budget, Anfrage |
| Studio | HeiBen Studio GmbH | 9 + Wissens-Ökosystem | ~8.100 Z. + Kompendien | Magazin, Redaktion, Lebenswissen, **8 Kompendien / 370 Steckbriefe, 16 Lernpfade, 544 Begriffskarten, Wissens-Suche** |
| Kulinarik | HeiBen Kulinarik GmbH · `#6b3951` | 12 | ~12.000 Z. | App, Kochbuch, Mealplanner, Wochenplan, Rezeptwürfel, Export |

**Dispositions-Entscheid:** Jede Welt ist substanzhaltig und interaktiv → **alle fünf behalten
und überarbeiten, keine ersetzen.** Statt eines Ersatzes kommt **ein neues Querschnittsprodukt**
(§ 1.3), das die Welten verbindet und die bislang leere Monetarisierungs-Schicht G2 konkret macht.

---

## 1. Geschäftsmodell — die klare Struktur

### 1.1 Aufbau: Ein Dach, fünf Welten, zwei Klammern

```
HeiBen Holding GmbH i. G. — „Heimat leben"
│  Marke, Beteiligungen, Holding-Dashboard, Angebots-/Belegsystem je Firmierung
│
├── WELT Reisen      — Reise & Hospitality (B2C-Erlebnis, Marge)
├── WELT Wohnen      — Einrichtung & Manufaktur (B2C/B2B-Projekte, Werkleistung)
├── WELT Immobilien  — Bestand & Vermittlung; Showroom/Flächen für Schwester-Welten
├── WELT Studio      — Content & Wissen (Reichweite; B2B-Lizenzgeschäft)
└── WELT Kulinarik   — Catering & Bewirtung; Rezept-Plattform als Reichweite
     Klammer 1: STUDIO-WISSEN = Content-Marketing für ALLE Welten (§ 2.2)
     Klammer 2: MEIN HEIBEN/KONTO = ein Kundenkonto über alle Welten
```

### 1.2 Erlöslogik je Welt

| Welt | Erlös heute (Fiktion) | Digitale Rolle im Kit |
|---|---|---|
| Reisen | Reiseleistungen (Marge) | Erlebnis-Schaufenster + Anfrage-Funnel |
| Wohnen | Einrichtung/Werkleistungen | Konfigurator & Planer als Vertriebswerkzeug |
| Immobilien | Vermietung/Vermittlung; interner Kreislauf (Flächen für Schwestern) | Angebote + Budget-/Planner-Funnel |
| Studio | **B2B-Lizenz** der Kompendien & Lernpfade (partner-demo!), Content-Produktion, später Wissens-API | Wissens-Hub = Vertrauens- & SEO-Maschine für alle |
| Kulinarik | Catering/Bewirtung | Rezept-Plattform als Reichweite + Anfrage-Funnel |

**Grundsätze (unverändert):** Wissen frei & werbefrei · keine Produktwerbung in Steckbriefen ·
Sponsoring nur je ganzes Kompendium, gekennzeichnet · Disclaimer-Kultur bleibt · Buchung/Faktura
je Welt in eigener Firmierung (so bereits im Angebotssystem angelegt).

### 1.3 NEU statt Ersatz: das Querschnittsprodukt „HeiBen Zuhause-Ordner"

Der digitale Familien-/Notfallordner als erstes echtes **G2-Produkt** (Freemium → Premium):
- baut auf Vorhandenem: Papierkram-Kompendium (Herzstück „Notfallordner"), Konto,
  PDF-Modul `heiben-pdf.js` — kein Neuland, sondern Veredelung;
- Funktion: geführtes Anlegen (Checklisten aus dem Kompendium), Fortschritt in Mein HeiBen,
  Druck-/PDF-Export „Ordner-Rücken & Register";
- verbindet Welten: Immobilien (Unterlagen), Wohnen (Inventar), Kulinarik (Vorrats-/Allergieliste),
  Studio (Wissen), Reisen (Reisedokumente-Register);
- Einführung in **Welle 5** als MVP (eine Seite + Export), Premium-Ausbau später.

### 1.4 /mcp-builder — Einordnung (unverändert aus v1)

`/mcp-builder` erzeugt **MCP-Server** (KI-Tool-Schnittstellen), kein Design. Als
**„HeiBen Wissens-API"** ist es ein Studio-Lizenzprodukt: Tools `wissen_suche`,
`steckbrief_lesen`, `kompendium_liste`, `lernpfad_status` machen die 370 Steckbriefe für
Partner-KIs nutzbar. → **Welle 8**, optional.

---

## 2. Content-Architektur — Sitemap v2

### 2.1 Struktur

```
Start (index.html — Remake: die fünf Welten + Wissens-Einstieg + Kennzahlen)
│
├── REISEN       reisen.html · -kuratiert · -planer · -anfrage
├── WOHNEN       wohnen.html · -konfigurator · -planer · -anfrage · manufaktur(-gestalten)
├── IMMOBILIEN   immobilien.html · -angebote · -planner · immobilienbudget · -anfrage
├── STUDIO       studio.html · studio-magazin · Redaktionen
│   └── WISSEN-HUB (wissen.html, ausgebaut): Suche über alles · 8 Kompendien ·
│       Lebenswissen-Artikel (studio-lebenswissen verschlankt: Katalog statt Banner-Stapel) ·
│       Lernpfade · Tagesdosis/Begriffskarten
├── KULINARIK    kulinarik.html · rezepte · rezept · wochenplan · mealplanner · rezeptwuerfel ·
│                kochbuch · heute · app · export · redaktion
│
├── MEIN HEIBEN  mein-heiben.html (echtes Dashboard) · konto · konto-verwaltung ·
│                NEU (W5): zuhause-ordner.html
└── UNTERNEHMEN/HOLDING  unternehmen · familie · marke · strategie · schaufenster ·
                 holding-dashboard · welt-cockpit · partner-demo · Legal (agb/datenschutz/…)
```

Änderung ggü. v1: **kein separater Werkzeuge-Hub** — Werkzeuge wohnen in ihrer Welt
(Konfigurator→Wohnen, Wochenplan→Kulinarik, Budget→Immobilien, Rechner→Studio-Wissen).
Mein HeiBen verweist personalisiert („deine zuletzt genutzten Werkzeuge") statt als Sammelgrid.

### 2.2 Cross-Verzahnung Welten ↔ Kompendien (der eigentliche Remake-Gewinn)

| Kompendium | speist Welt | Beispiel-Brücke |
|---|---|---|
| Lebensmittel | Kulinarik | Steckbrief „Reste" ↔ Rezeptwürfel/Wochenplan |
| Haushalt, Pflanzen | Wohnen | „Richtig lüften" ↔ Einrichtungstheorie; Pflanzen ↔ Raumplaner |
| Finanzen (Eigentum), Papierkram | Immobilien | Mieten-oder-Kaufen + Kaufnebenkosten ↔ Budget-Planner |
| Auto, Erste Hilfe | Reisen | Pannen-/Notfallwissen ↔ Reise-Planer („unterwegs") |
| alle | Studio | Absender & Lizenzgeber (partner-demo) |

Umsetzung: dezente „Aus der HeiBen-Welt"-Boxen in Steckbriefen/Welt-Seiten, beidseitig, sparsam.

---

## 3. Design-System „HeiBen Fundament" (wie v1, Nav angepasst)

- **`web/heiben-design.css`**: Tokens (Palette inkl. der fünf Weltfarben aus der
  Firmierungs-Registry!), Typo-Skala, `.hb-*`-Komponenten; additiv mit Aliassen.
- **`web/heiben-nav.js`**: EINE Kopfnavigation überall — Wortmarke · **fünf Welten**
  (Punkt in Weltfarbe) · Wissen · Mein HeiBen; Unternehmen/Legal im Footer;
  `<body data-hb-welt="kulinarik">` steuert aktive Markierung; ohne JS bleiben Footer-Links.
- Marken-DNA (Fraunces/Manrope/JetBrains, warme Palette, Eyebrow, Steckbrief-Muster) bleibt.

---

## 4. Wellenplan v2 — 8 Wellen, je ein verifiziertes Deliverable

| Welle | Inhalt | Verifikation |
|---|---|---|
| **W1** | `heiben-design.css` + `heiben-nav.js`; Pilot: `wissen.html` + `finanzen.html` + `kulinarik.html` (eine Welt-Seite!) | Nav/aktive Welt korrekt, Altfunktionen unverändert, 0 PE |
| **W2** | `index.html`-Remake: fünf Welten, Wissens-Einstieg, Kennzahlen dynamisch | Links vollständig, 0 PE |
| **W3** | Studio-Ausbau: Wissens-Hub-Sektionen, `studio.html`, `studio-lebenswissen` verschlankt | alle Bestandsziele erreichbar, 0 PE |
| **W4** | Kulinarik + Wohnen: Nav/Tokens-Rollout + Kompendien-Brücken (§ 2.2) | Sweep beider Welten, 0 PE |
| **W5** | Immobilien + Reisen: Rollout + Brücken; **NEU `zuhause-ordner.html` (MVP)** | Sweep + Ordner-Funktionstest, 0 PE |
| **W6** | Holding & Unternehmen: unternehmen/familie/marke/strategie/partner-demo/holding-dashboard konsistent; Cockpit-Abdeckung aller Welten prüfen; Mock-Bänder → echte Zahlen | Zahlen-Grep + 0 PE |
| **W7** | Rollout Rest (Konto, Legal, 404, Quiz …) + QS-Sweep über die komplette Sitemap | Abschlussprotokoll, 0 PE überall |
| **W8** | *(Option)* Wissens-MCP-Server nach `/mcp-builder`-Prozess (TS/stdio + 10 Evals) | MCP Inspector + Eval-Suite |

## 5. Stabilitätsgarantien

Unangetastet bleiben: alle `*-daten.js` · `heiben-firmierungen.js` (Firmierungen, Farben,
Steuerlogik) · localStorage-Verträge (`heiben-lernpfad`, `heiben-verlauf`, `heiben_results`,
Welt-Speicher der Planer/Konfiguratoren) · Deep-Link-Verträge (`#id`, `?id=`, `?q=`, `?welt=`)
· SW-Versionsschema · Fiktions-Fakten (GmbH i. G., Benkhaouda/Hein, „Heimat leben", Köln).
