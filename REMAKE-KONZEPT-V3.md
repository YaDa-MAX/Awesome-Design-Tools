# HeiBen Remake — Blaupause v3 · Substanz-Fassung
Stand: SW `heiben-v20260622-2989` · 101 Seiten · Messgrundlage `tools/audit_v3.py`
Auftrag: „Neue Remake-Runde über alles bestehende."
Verhältnis zu v2: **v3 ist der neue Arbeitsplan**, `REMAKE-KONZEPT.md` (v2) bleibt als Historie
liegen — die dort getroffenen Struktur- und Geschäftsmodell-Entscheide gelten unverändert weiter.

---

## 0. Was v2 geleistet hat — und wo es aufgehört hat

v2 war ein **Oberflächen-Remake**: `heiben-design.css` + `heiben-nav.js` unter allen 100 Seiten,
fünf Welten kanonisch, 11 Kompendien-Brücken, neues G2-Produkt `zuhause-ordner.html`, QS mit
0 PageErrors. Das steht und wird nicht angefasst.

v2 hat den **Rahmen** vereinheitlicht. Nicht angefasst wurden: der Dokumentkopf, das Innenleben
der Seiten, die Auffindbarkeit, die Datenschicht, das Auslieferungsgewicht und die Gewichtung der
fünf Welten gegeneinander. Genau dort liegt v3.

**Leitsatz v3: v2 hat den Rahmen vereinheitlicht — v3 vereinheitlicht, was im Rahmen steht.**

---

## 1. Audit des Ist-Standes (gemessen, nicht geschätzt)

Alle Zahlen reproduzierbar: `cd web && python3 ../tools/audit_v3.py`.

### 1.1 Gewicht & Redundanz — der größte Einzelbefund

| Kennzahl | Ist |
|---|---|
| HTML gesamt | **6.204 KB** über 101 Seiten (Ø 61 KB/Seite) |
| davon inline `<style>` | 2.052 KB (33,1 %) |
| davon inline `<script>` | 2.391 KB (38,5 %) |
| davon base64-Bilder im Markup | 1.195 KB (19,3 %) |
| **byte-identische Blöcke mehrfach abgelegt** | **1.874 KB (30,2 %)** |
| **vermeidbar gesamt (Duplikate + base64)** | **3.069 KB — 49,5 % des HTML** |

Konkret: ein **46-KB-CSS-Block liegt in 29 Seiten** (11 + 11 + 7) byte-identisch — das ist
praktisch `styles.css` (47 KB), das daneben schon als Datei existiert und verlinkt werden könnte.
Ein 3-KB-JS-Block liegt in 42 Seiten, ein 5-KB-Block in 25. Die Wortmarke liegt als 70-KB-base64
in sechs Seiten, obwohl `assets/wordmark-*.png` existiert. `index.html` besteht zu 88 % (356 KB)
aus base64-Bildern, die als `assets/hero-*.png` bereits auf der Platte liegen.

Das ist kein Stilproblem: jede Änderung an diesem CSS muss heute an 29 Stellen nachgezogen werden.

### 1.2 Dokumentkopf — v2 hat ihn nie erreicht

| Merkmal | vorhanden |
|---|---|
| `heiben-design.css` | 100 / 101 |
| `heiben-nav.js` | 99 / 101 |
| `<meta description>` | 52 / 101 |
| `og:*` | 35 / 101 |
| Service-Worker-Registrierung | **42 / 101** |
| `rel="manifest"` | **41 / 101** |
| `theme-color` | 42 / 101 |
| `heiben-legal.js` (Disclaimer-Kultur!) | **29 / 101** |
| JSON-LD | 2 / 101 |
| `rel="canonical"` | **0 / 101** |

Folge: Die PWA ist auf **weniger als der Hälfte** der Seiten überhaupt eine PWA. Die
Disclaimer-Schicht — laut Grundsätzen tragend — läuft auf 29 Seiten. Für Suchmaschinen ist die
Hälfte des Bestands beschreibungslos.

### 1.3 Auffindbarkeit — die Werkzeuge sind da, aber unsichtbar

- **0 kaputte interne Links** (sauber).
- **21 verwaiste Seiten** ohne einen einzigen eingehenden Link im Markup — darunter **14 Rechner
  und Werkzeuge** (`finanzcheck`, `sparziel`, `schuldenfrei`, `zinseszins`, `steuererklaerung`,
  `versicherungscheck`, `stromfresser`, `konsumcheck`, `mieten-oder-kaufen`, `reisebudget`,
  `erste-wohnung`, `gehaltsverhandlung`, `jobwechsel`, `studium-ausbildung`) sowie
  `kulinarik-kochbuch`, `studio-einrichtungstheorie`, `wahr-oder-falsch`, `rechtliches`.
- Der **Suchindex** enthält 348 Einträge, zielt aber nur auf **18 Seiten** — er indexiert Inhalte
  (Rezepte, Steckbriefe, Artikel), **keine Seiten**. 83 Seiten sind über die Suche nicht findbar,
  darunter alle Welt-Startseiten und alle Werkzeuge.

v2 §2.1 hatte entschieden: „Werkzeuge wohnen in ihrer Welt." Umgesetzt ist das nicht — die
Werkzeuge haben in W7 die Navigation bekommen, aber niemand verweist auf sie.

### 1.4 Offline-Versprechen — bricht genau am Wissenskern

**62 / 101 Seiten precached.** Nicht precached sind u. a. **alle acht Kompendien**
(`auto`, `digital`, `erstehilfe`, `finanzen`, `haushalt`, `lebensmittel`, `papierkram`,
`pflanzen`), dazu `wissen.html` (der Hub!), `lernpfade`, `begriffskarten`, `tagesdosis`,
`mein-heiben` (das Dashboard!) und `zuhause-ordner` (das G2-Produkt). Offline funktionieren heute
vor allem Legal- und Verwaltungsseiten.

### 1.5 Datenschicht — 88 Schlüssel, kein Register

| | |
|---|---|
| distinkte `localStorage`-Schlüssel | **88** |
| Schema `heiben-…` | 59 |
| Schema `heiben_…_v1` | 29 |
| davon in CLAUDE.md als Vertrag benannt | 5 |
| davon von `mein-heiben.html` gelesen | **5** |

Zwei konkurrierende Namensschemata, keine zentrale Stelle, kein Export/Import. „Mein HeiBen" ist
laut v2 die **Klammer über alle Welten** — liest aber 5 von 88 Schlüsseln. Die Klammer klammert nicht.

### 1.6 Kanon vs. Praxis — die Registry wird kaum benutzt

`heiben-firmierungen.js` ist die kanonische Quelle für Firmierungen, Weltfarben und Steuerlogik —
eingebunden auf **7 von 101 Seiten**. Die fünf Weltfarben stehen stattdessen **~1.050-mal hart
kodiert** in ~100 Dateien. Eine Farbkorrektur ist damit heute ein Massen-Suchen-und-Ersetzen statt
einer Änderung an einer Stelle.

### 1.7 Gewichtung der Welten — das Haus steht schief

| Bereich | Seiten | Anteil |
|---|---|---|
| wissen | 31 | 31 % |
| holding | 22 | 22 % |
| kulinarik | 12 | 12 % |
| wohnen | 10 | 10 % |
| studio | 9 | 9 % |
| immobilien / konto / reisen | je 5 | je 5 % |

Die **fünf operativen Welten stellen zusammen 41 %** des Bestands; Wissen + Holding stellen 53 %.
Reisen und Immobilien — zwei von fünf Geschäftsfeldern — haben je fünf Seiten. Dazu kommen
**11 Backoffice-Seiten** (Redaktionen, Verwaltungen, `api`, `heiben-automation`,
`heiben-wachstum`), deren Publikum in der Fiktion ungeklärt ist.

### 1.8 Ladelast der Einstiegsseiten

| Seite | statische Nutzlast |
|---|---|
| `mein-heiben.html` | **909 KB** (lädt `lebenswissen-daten.js` 649 K + `tagesdosis-daten.js` 206 K komplett) |
| `wohnen-konfigurator.html` | 798 KB (773 K inline-JS in einer Datei) |
| `index.html` | 450 KB (405 K, davon 356 K base64) |
| `wissen.html` | 356 KB (lädt alle acht Kompendien-Datenmodule) |
| `startseite-neu.html` | **34 KB** |

Der Freigabe-Entwurf der neuen Startseite ist **13-mal leichter** als die heutige `index.html` —
bei mehr Inszenierung. Das ist der Maßstab für den Rest.

---

## 2. Zielbild v3

Drei Ziele, in dieser Reihenfolge:

1. **Substrat vereinheitlichen.** Was auf jeder Seite gleich ist, steht künftig an *einer* Stelle:
   Dokumentkopf, gemeinsames CSS, gemeinsame Skripte, Bilder als Dateien, Weltfarben aus der Registry.
2. **Auffindbarkeit herstellen.** Kein Werkzeug ohne Zuhause, keine Seite außerhalb der Suche.
3. **Geschäftsmodell schärfen.** Die fünf Welten tragen die Fiktion — nicht das Backoffice.
   Reisen und Immobilien auf Augenhöhe bringen; „Mein HeiBen" zur echten Klammer machen.

**Nicht-Ziele (ausdrücklich):** kein Framework, kein Build-Schritt zur Laufzeit, kein neues
Design-System, keine Neuerfindung der fünf Welten, keine Änderung an den Fiktions-Fakten.
Werkzeuge unter `tools/` sind Pflegewerkzeuge (wie `gen_kennzahlen.js`), kein Build.

---

## 3. Architektur-Entscheide (E1–E7)

**E1 — Kopf-Generator statt Handarbeit.** Neu `tools/gen_kopf.js`: schreibt in jede Seite einen
normierten Kopfblock zwischen zwei Markern (`<!-- hb:kopf -->` … `<!-- /hb:kopf -->`) — Charset,
Viewport, Titel, Description, canonical, og/twitter, theme-color in Weltfarbe, Manifest,
Favicons, `heiben-design.css`, `heiben-nav.js`, `heiben-legal.js`, SW-Registrierung, JSON-LD je
Welt aus `heiben-firmierungen.js`. Quelle je Seite: eine Registry `tools/seiten.json` (Welt,
Titel, Description, Typ). Idempotent, wiederholbar, kein Laufzeit-Build. Meta-Tags bleiben im
HTML — JS-injizierte Metadaten sind für Crawler wertlos.

**E2 — Entdoppelung.** Die drei 46-KB-CSS-Blöcke werden durch `<link href="styles.css">` ersetzt
(Datei existiert bereits, identischer Inhalt → kein optisches Risiko). Die mehrfach abgelegten
JS-Blöcke wandern in `heiben-shell.js` (Kopfzeile/Consent/PWA-Hinweis) bzw. bestehende Module.
Erwartete Wirkung: **−1,8 MB HTML** ohne eine einzige Verhaltensänderung.

**E3 — Bilder sind Dateien.** base64-`<img>` → `<img src="assets/…">` mit `width`/`height` und
`loading="lazy"`. Die Dateien liegen bereits im Precache. Erwartete Wirkung: **−1,2 MB HTML**,
`index.html` von 405 K auf ~50 K.

**E4 — Ein Speicher-Vertrag.** Neu `heiben-speicher.js`: Register aller Schlüssel (Name, Welt,
Version, Zweck), Lese-/Schreib-Helfer, `export()`/`import()` als JSON-Datei, `reset(welt)`.
Bestehende Schlüsselnamen bleiben **unverändert** (Vertrag!) — das Register beschreibt sie, es
benennt sie nicht um. Darauf aufbauend liest `mein-heiben.html` alle Welten statt fünf Schlüssel.

**E5 — Farbe nur noch aus der Registry.** `heiben-design.css` definiert `--hb-welt-*` aus den
Werten von `heiben-firmierungen.js`; hart kodierte Hex-Werte in `heiben-*`-Dateien und in den
Welt-Seiten werden auf die Variablen umgestellt. Bestandsseiten mit eigenem Inline-CSS werden
dabei *nicht* umgeschrieben — sie erben über E2 automatisch.

**E6 — Zwei Register für Auffindbarkeit.** (a) `web/heiben-werkzeuge.js`: alle Rechner/Werkzeuge
mit Welt, Kurzbeschreibung, Ziel — gerendert in der jeweiligen Welt-Seite und in `wissen.html`.
(b) `build-suche-index.js` erweitern um einen **Seiten-Index** (Titel + Description je Seite aus
`tools/seiten.json`), sodass die Suche Seiten *und* Inhalte findet.

**E7 — Offline vollständig.** Precache-Liste aus dem Dateibestand generieren (`tools/gen_sw.js`),
Standalone-Entwürfe per Ausschlussliste außen vor. Große Datenmodule (`lebenswissen-daten.js`
649 K, `tagesdosis-daten.js` 206 K, `kulinarik-daten.js` 519 K) werden für Dashboard-Zwecke durch
generierte Kurzfassungen ersetzt (`*-index.js`, nur Titel/ID/Teaser), Volldaten erst auf der
Detailseite.

---

## 4. Wellenplan v3 — je eine Welle, je ein verifiziertes Deliverable

| Welle | Inhalt | Verifikation |
|---|---|---|
| **V3-W1** | **E2 + E3: Entdoppelung & Bilder.** Reine Substanz-Operation, kein sichtbarer Unterschied. | `audit_v3.py`: HTML < 3,3 MB · visueller Vorher/Nachher-Abgleich auf 6 Leitseiten · 0 PE |
| **V3-W2** | **E1: Kopf-Generator** + `tools/seiten.json` für alle 101 Seiten. | Audit §2: alle Merkmale 101/101 · Manifest/SW auf jeder Seite · 0 PE |
| **V3-W3** | **E7: Offline & Ladelast.** Precache generiert, Datenmodule geteilt. | Audit §4: 100/100 precached · `mein-heiben` < 120 KB · Offline-Test (Netz aus, 10 Seiten) |
| **V3-W4** | **E6: Auffindbarkeit.** Werkzeug-Register in die Welten, Seiten-Index in die Suche. | Audit §3: 0 Waisen · Suche findet jede Seite über ihren Titel · 0 PE |
| **V3-W5** | **E4 + E5: Speicher-Vertrag & Farbkanon.** `mein-heiben` wird echtes Cockpit über alle Welten, mit Export/Import. | Audit §5/§6 · Persistenz-Test je Welt · Export→Reset→Import stellt Stand her · 0 PE |
| **V3-W6** | **Welt-Balance.** Reisen und Immobilien auf Augenhöhe (Substanz, nicht Seitenzahl); Entscheid über die 11 Backoffice-Seiten (§ 6, Frage 2). | Audit §7 · Brücken-Check · 0 PE |
| **V3-W7** | **Startseite + Gesamt-QS.** Übernahme `startseite-neu.html` → `index.html` nach dem in `_WEITERARBEIT.md` festgehaltenen Plan; Abschluss-Sweep über die komplette Sitemap. | Volles Audit · 101/101 Seiten 0 PE/0 Console-Errors · Abschlussprotokoll |

Pro Welle gilt der Pflicht-Workflow aus CLAUDE.md: SW-Version bumpen, `_WEITERARBEIT.md`
fortschreiben, nach Datenänderungen `gen_kennzahlen.js` laufen lassen.

**Erwartete Gesamtwirkung nach W1–W3:** HTML von 6,2 MB auf ~3,0 MB, Dokumentkopf 101/101,
Offline 101/101, `mein-heiben` von 909 KB auf < 120 KB.

---

## 5. Stabilitätsgarantien (gelten in jeder Welle)

Unangetastet bleiben: alle `*-daten.js` (nur ans Ende erweitern, `id` stabil) ·
`heiben-firmierungen.js` als Kanon · **alle 88 localStorage-Schlüsselnamen** · Deep-Link-Verträge
`#id`, `?id=`, `?q=`, `?welt=` · SW-Versionsschema · Fiktions-Fakten (GmbH i. G.,
Benkhaouda/Hein, „Heimat leben", Köln) · die 11 Kompendien-Brücken · `.hb-`-Regel in
`heiben-design.css` und die `div role=…`-Regel in `heiben-nav.js`.

Zusätzlich für v3: **keine Welle darf das sichtbare Ergebnis einer Seite verändern, außer die
Welle hat genau das zum Ziel.** W1–W3 sind ausdrücklich unsichtbar.

---

## 6. Entscheidungen, die vor W1 zu treffen sind

1. **Reihenfolge.** Vorschlag: Substanz zuerst (W1–W3), Startseite zuletzt (W7) — dann übernimmt
   die neue `index.html` bereits das saubere Substrat. Alternative: Startseite vorziehen, weil sie
   freigabereif ist.
2. **Backoffice-Schicht.** Die 11 Redaktions-/Verwaltungsseiten: als Teil der Fiktion behalten und
   sichtbar als „interner Bereich" rahmen — oder aus der öffentlichen Sitemap nehmen?
3. **Repo-Altbestand.** `README.md`, `index.js`, `package.json`, `Media/`, `Awesome-Design-*.md`
   und `docs/{js,css,assets,modules,server.js,index-*.html}` stammen aus der Fork-Vorlage
   *Awesome-Design-Tools* und haben mit HeiBen nichts zu tun. Entfernen?
