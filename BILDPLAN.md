# BILDPLAN — 159 Rezeptbilder

Wie aus 159 Rezepten ohne Bild 159 Rezepte mit Bild werden: was erzeugt wird, womit,
in welcher Reihenfolge und wie das Ergebnis zurück in die Seite kommt.

---

## 1. Ausgangslage

| | |
|---|---|
| Rezepte in `web/kulinarik-daten.js` | **159** |
| davon mit Bild | **0** |
| Länder | 51 |
| Gänge | 8 (Vorspeise, Hauptgericht, Suppe, Beilage, Salat, Dessert, Gebäck, Getränk) |

Die Seiten sind vorbereitet. `kulinarik-rezepte.html` und `kulinarik-rezept.html`
bilden den Dateinamen selbst:

```js
function coverSrc(rid) { return 'assets/rezepte/' + rid + '.jpg'; }
```

Liegt die Datei, erscheint das Bild. Liegt sie nicht, bleibt der Platzhalter stehen.
**Es ist keine Codeänderung nötig — nur Dateien ablegen.** Das ist die ganze Kopplung,
und sie bestimmt alles Weitere: der Dateiname ist die Rezept-ID, nichts anderes.

### Die ID ist gesetzt, auch wo sie hässlich ist

38 der 159 IDs haben bei ihrer Entstehung Sonderzeichen verloren:

| Rezept | ID und damit Dateiname |
|---|---|
| Tiramisù | `tiramis.jpg` |
| Ćevapi | `evapi.jpg` |
| Bœuf bourguignon | `b-uf-bourguignon.jpg` |
| Svíčková na smetaně | `sv-kov-na-smetan.jpg` |

Das wird **nicht** repariert. `id`-Felder sind ein stabiler Vertrag (CLAUDE.md): an ihnen
hängen die Deep-Links `kulinarik-rezept.html?id=…`, die Merklisten im localStorage und
der Suchindex. Ein sauberer Name wäre einen Tag lang schöner und danach ein toter Link.
Die Dateiliste führt darum immer die ID mit — abgetippt wird nie.

---

## 2. Konzept: ein Bild, das nicht nach Stock aussieht

Alle 159 Bilder sollen wie **eine Serie** wirken und trotzdem 159 verschiedene Gerichte
zeigen. Dafür ist jeder Prompt aus vier Teilen gebaut — drei davon halten zusammen,
einer trennt.

```
┌─ ANKER ────────── in jedem der 159 Prompts wortgleich
│  Fensterlicht von links · 50 mm bei f/4 · gedeckte warme Palette
│  ehrlich statt hochglanz · Querformat 3:2 · Negativliste
├─ GANG ─────────── 8 Varianten
│  Kamerawinkel + Gefäß: Suppe von oben in tiefer Schale,
│  Hauptgericht schräg von 45°, Gebäck flach von der Seite …
├─ REGION ───────── 12 Varianten
│  Untergrund + zwei Requisiten: Messingtablett auf Zementfliesen (Maghreb),
│  dunkelgrün gestrichenes Holz (Britische Inseln), Terrakotta (Südeuropa) …
└─ GERICHT ──────── 159 Varianten
   2–3 echte Hauptzutaten aus dem Datensatz + Serviervorschlag
```

Der Anker macht die Serie, das Gericht macht den Unterschied. Gang und Region liegen
dazwischen und sorgen dafür, dass eine Suppe nicht aussieht wie ein Kuchen und ein
maghrebinisches Gericht nicht wie ein skandinavisches.

**Die Zutaten kommen aus den Daten, nicht aus dem Namen.** Ein Bildgenerator, der nur
„Šaltibarščiai" liest, malt irgendetwas. Einer, der „kalte rote Bete, Kefir,
Salatgurke" liest, malt das Gericht. Darum liest der Generator das Zutatenfeld jedes
Rezepts und nennt die Hauptzutaten im Klartext.

### Negativliste

In jedem Prompt, weil jeder Bildgenerator sonst genau das tut:

> kein Text, keine Schrift, keine Buchstaben, kein Logo, kein Wasserzeichen,
> keine Hände, keine Menschen, kein Besteck in Bewegung, keine Collage,
> kein Rahmen, kein Rand

Schrift im Bild ist der häufigste Ausschuss und in einer mehrsprachigen Rezeptsammlung
zusätzlich peinlich: der Generator erfindet Buchstaben, die aussehen wie Kyrillisch.

---

## 3. Die Liste

`tools/gen_bildprompts.py` liest `web/kulinarik-daten.js` und schreibt drei Dinge:

| Datei | Wofür |
|---|---|
| `web/assets/rezepte/_dateiliste.csv` | Eine Zeile je Rezept: `dateiname, id, rezept, land, kontinent, gang, art, prompt` — die Arbeitsliste, in jeder Tabelle zu öffnen |
| `web/assets/rezepte/_prompts.jsonl` | Dasselbe zeilenweise als JSON — für Skripte und API-Aufrufe |
| `web/assets/rezepte/chargen/charge-01…08.md` | 8 Portionen à 20 zum Abarbeiten, Prompt in einem Codeblock zum Kopieren |

Gemessen über alle 159: **159 verschiedene Prompts**, keiner doppelt, Länge 841 bis
1115 Zeichen, Median 966.

Neu erzeugen, wenn Rezepte dazukommen:

```bash
cd web && python3 ../tools/gen_bildprompts.py
```

Das Skript überschreibt nur die drei Artefakte, nie ein Bild.

---

## 4. Durchführung: acht Chargen

Die Chargen sind nach Land sortiert, nicht nach Zufall. Wer zwanzig Bilder derselben
Region hintereinander erzeugt, sieht sofort, wenn eines aus der Reihe fällt.

| Charge | Länder |
|---|---|
| 01 | Algerien, Libyen, Marokko, Mauretanien, Tunesien, Westsahara |
| 02 | Westsahara, Ägypten, Albanien, Andorra, Belarus, Belgien, Bosnien und Herzegowina |
| 03 | Bulgarien, Deutschland, Dänemark, Estland, Finnland, Frankreich |
| 04 | Griechenland, Irland, Island, Italien, Kosovo, Kroatien, Lettland |
| 05 | Lettland, Liechtenstein, Litauen, Luxemburg, Malta, Moldau, Monaco, Montenegro |
| 06 | Montenegro, Niederlande, Nordmazedonien, Norwegen, Polen, Portugal, Rumänien |
| 07 | San Marino, Schweden, Schweiz, Serbien, Slowakei, Slowenien, Spanien |
| 08 | Spanien, Tschechien, Ukraine, Ungarn, Vatikanstadt, Vereinigtes Königreich, Österreich (19 Stück) |

Sortiert ist nach Kontinent, dann Land, dann Gang — darum steht Afrika vorn und ein
Land kann über eine Chargengrenze reichen.

**Ablauf je Charge**

1. `web/assets/rezepte/chargen/charge-NN.md` öffnen
2. Die 20 Prompts nacheinander im Bildgenerator ausführen
3. Ergebnisse als `<id>.jpg` in einen beliebigen Sammelordner legen —
   der Dateiname steht über jedem Prompt
4. Prüfen, ohne etwas abzulegen:
   ```bash
   python3 tools/import_rezeptbilder.py ~/downloads/charge-01 --pruefen
   ```
5. Übernehmen:
   ```bash
   python3 tools/import_rezeptbilder.py ~/downloads/charge-01
   ```
6. Nach der letzten Charge einmal: `cd web && node ../tools/gen_sw.js`

Der Zwischenschritt mit `--pruefen` kostet zehn Sekunden und erspart es, 20 falsch
benannte Dateien wieder aus dem Zielordner zu klauben.

### Reihenfolge, wenn nicht alles auf einmal geht

159 Bilder auf einmal sind viel. Die Sammlung sieht aber schon nach der ersten Charge
besser aus als vorher, weil `kulinarik-rezepte.html` Bild und Platzhalter nebeneinander
verträgt. Die Übersicht zeigt die Rezepte in der Reihenfolge des Datensatzes, die
Chargen sind nach Land gebündelt — die Liste füllt sich also nicht von oben, sondern in
Sprüngen. Das ist der bewusste Tausch: gebündelt erzeugt man vergleichbare Bilder, und
Vergleichbarkeit ist bei einer Serie mehr wert als ein ordentlich wachsender Balken.
Wer die Filter der Übersicht nutzt, sieht ohnehin nach Land.

---

## 5. Reimport-Struktur

```
Bildgenerator
     │  <id>.jpg  (3:2, ≥1200 px breit)
     ▼
Sammelordner  ──►  tools/import_rezeptbilder.py  ──►  web/assets/rezepte/<id>.jpg
                          │                                      │
                          │  prüft Name gegen _dateiliste.csv    │
                          │  liest Maße aus dem Dateikopf        ▼
                          │  prüft Seitenverhältnis + Größe   coverSrc() findet sie
                          └─ meldet Stand: n von 159             ohne Codeänderung
```

**Was das Werkzeug prüft, bevor es etwas ablegt**

| Prüfung | Grenze | Bei Verstoß |
|---|---|---|
| Name in der Liste | exakt oder eindeutig zuzuordnen | abgewiesen, mit Vorschlag |
| Dateityp | JPG | abgewiesen (die Seite lädt `.jpg`) |
| Breite | ≥ 1200 px | abgewiesen |
| Seitenverhältnis | 3:2 ± 6 % | abgewiesen |
| Dateigröße | ≤ 400 KB | abgewiesen |
| | > 300 KB | Hinweis, wird übernommen |

Bekommt der Generator „chakhchoukha (2).jpg" oder „Chakhchoukha.JPG" heraus, erkennt
das Werkzeug das Rezept trotzdem und nennt den richtigen Namen. Umbenennen tut es erst
mit `--umbenennen` — stillschweigend Dateien umzutaufen ist die Art von Hilfsbereitschaft,
die man erst bemerkt, wenn zwei Rezepte dasselbe Bild tragen.

**Bewusste Grenze:** das Werkzeug rechnet nichts um. In dieser Umgebung gibt es weder
PIL noch ImageMagick noch cwebp. Es prüft und meldet; skalieren und komprimieren
passiert vorher, im Bildgenerator oder von Hand. Ein Werkzeug, das behauptet zu
konvertieren und es nicht kann, ist schlimmer als keines.

**Standbericht** — jederzeit, auch ohne Ordner:

```bash
$ python3 tools/import_rezeptbilder.py

Stand: 40/159 Rezeptbilder liegen bereit (25 %)
  Charge 03:  20 offen — banitsa, shopska-salata, tarator, … +16
  Charge 04:  20 offen — baklava, horiatiki-salata, moussaka, … +16
```

---

## 6. Qualitätssicherung

**Am Bild** (beim Sichten der Charge, vor dem Import)

- Zeigt es das Gericht oder nur etwas in der Farbe des Gerichts?
- Ist Schrift hineingeraten? → verwerfen, nicht retuschieren
- Passt es neben die Nachbarbilder derselben Charge?

**An der Seite** (nach jeder Charge)

```bash
cd web && python3 -m http.server 8180 &
# kulinarik-rezepte.html öffnen: Bilder und Platzhalter dürfen sich mischen,
# ohne dass die Kachelhöhe springt
```

**Am Bestand** (nach der letzten Charge)

```bash
python3 tools/import_rezeptbilder.py        # muss 159/159 melden
cd web && node ../tools/gen_sw.js           # Precache + Version
```

Die Bilder gehen **nicht** in den Precache: `gen_sw.js` nimmt nur, was aus HTML und CSS
referenziert wird, und `coverSrc()` bildet den Pfad zur Laufzeit. Sie landen über den
stale-while-revalidate-Zweig des fetch-Handlers im Cache, sobald sie einmal gezeigt
wurden. Das ist gewollt: 159 × 250 KB im Precache wären 40 MB beim ersten Aufruf.

---

## 7. Aufwand

| | |
|---|---|
| Bilder | 159 |
| Chargen | 8 à 20 (letzte 19) |
| Erzeugung je Bild | ~10–20 s bei den gängigen Generatoren |
| Sichten und Nachziehen | erfahrungsgemäß 10–15 % Ausschuss → ~20 Wiederholungen |
| Import je Charge | Sekunden |
| Zielgröße gesamt | 159 × ~250 KB ≈ **40 MB** in `web/assets/rezepte/` |

40 MB ist für ein Git-Repository spürbar. Wenn das stört, ist der Hebel die
Kompression vor dem Import (JPEG Qualität 78–82 bei 1600 px bringt ~180 KB), nicht ein
kleineres Format — die Kachel wird auf breiten Bildschirmen 800 px breit dargestellt.

---

## 8. Dateien dieser Planung

| Datei | Rolle |
|---|---|
| `tools/gen_bildprompts.py` | erzeugt Liste, Prompts und Chargen aus den Rezeptdaten |
| `tools/import_rezeptbilder.py` | prüft und übernimmt erzeugte Bilder, meldet den Stand |
| `web/assets/rezepte/_dateiliste.csv` | die Arbeitsliste |
| `web/assets/rezepte/_prompts.jsonl` | dieselbe Liste maschinenlesbar |
| `web/assets/rezepte/chargen/*.md` | 8 Portionen zum Abarbeiten |
| `web/assets/rezepte/README.txt` | die Kurzfassung im Zielordner |
