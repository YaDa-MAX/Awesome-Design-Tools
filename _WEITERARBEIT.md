# HeiBen — Weiterarbeit (Übergabe an neuen Chat)

> **Lies mich zuerst.** Diese Datei reist mit dem Kit und ersetzt das Gedächtnis vergangener Chats.
> Bestätige nach dem Lesen kurz: Firma, GF-Namen, CI, Modulkarte, Workflow — dann loslegen.

---

## 0) Sofort beim Start (neuer Chat)
Das Kit kommt als Upload. Entpacken und orientieren:
```bash
cd /home/claude
[ -f heiben_kit/web/reisen-planer.html ] && echo "schon da" || unzip -q /mnt/user-data/uploads/heiben_kit.zip -d /home/claude
ls heiben_kit/web | head; cat heiben_kit/_WEITERARBEIT.md
```
**Kit neu zippen** (nach Änderungen, vor present_files):
```bash
cd /home/claude && rm -f /mnt/user-data/outputs/heiben_kit.zip && \
zip -qr /mnt/user-data/outputs/heiben_kit.zip heiben_kit \
 -x "*/.DS_Store" "*/app/www/*" "*/app/node_modules/*" "*/mock/node_modules/*" "*/contract/node_modules/*"
```

## 1) Unverrückbare Konventionen (NIE abweichen)
- **Fiktives** Kölner Familienunternehmen „HeiBen". Sprache **Deutsch**, mobil, knapp.
- **Familie NIE erfinden:** GF sind **Yakin Benkhaouda** & **Katharina Hein** (beide Geschäftsführer). Sonst keine Personen erfinden.
- Claim **„Heimat leben"**. Rechtsform **GmbH i. G.** (in Gründung) — Platzhalter, keine echten Register-/Bank-/Steuerdaten.
- **Rezepte/Kulinarik: kein Schwein.**
- **Alles lokal/Demo:** Standalone-HTML, CSS inline, `localStorage`, PWA, Vendor lokal. Keine echten Partner-/Zahlungs-/Behördensysteme; schema-konformer Mock genügt.

## 2) CI-Tokens
Papier `#f3eee5` · bg-soft `#ebe3d4` · Tinte `#1f1c17` · Tinte-weich `#524a3e` · Linie `#d8cdb7` · Terracotta `#c2533a`.
Welten: Reisen `#d29939` · Wohnen/Moss `#4a5c39` · Immobilien `#792d29` · Studio `#1f1c17` · Kulinarik `#6b3951`.
Fonts: **Fraunces** (Serif/Headlines), **Manrope** (Sans/Body), **JetBrains Mono** (Labels/Maße).

## 3) Kit-Struktur & Modulkarte (`heiben_kit/web/`)
- **Planer:** `reisen-/wohnen-/kulinarik-/immobilien-planer.html` (gleiche Architektur, Welt-Farbe). Wohnen-Planer = 58 Produkte/11 Kategorien + 3D-Raumansicht + **2D-Grundriss-Ansicht** (`heiben-plan2d.js`, dritte Ansicht neben 3D/Moodboard).
- **Dashboards:** `welt-cockpit.html?welt=…`, `holding-dashboard.html`.
- **Studio/Lebenswissen:** `studio-lebenswissen-bibliothek.html` (Karten aus `lebenswissen-daten.js` → `window.LW_DATA`), `…-artikel.html?id=…`, `…-redaktion.html`. Interaktiver Artikel: `studio-einrichtungstheorie.html`.
- **JS-Module:** `heiben-firmierungen.js` (`HEIBEN_FIRMA(w)`), `heiben-angebot.js` (`HeiBenLedger`, localStorage `heiben-ledger`), `heiben-pdf.js` (jsPDF: beleg/expose/rechnung/storno/programm/mahnung), `heiben-room3d.js` (Three.js r128 Raum), `heiben-plan2d.js` (2D-Grundriss-Editor; `getRoom()`, `onRoom(rm)`→`{outline,doors,windows,bb}`; Öffnungen mit `type`: `tuer`/`fenster`/`fenstertuer`/`bodentief`), `heiben-legal.js` (Consent), Analytics `window.HeiBenTrack.ev(name,props)`.
- **Vendor lokal:** `vendor/three/three.min.js`+`OrbitControls.js`, `vendor/jspdf/jspdf.umd.min.js`, `vendor/leaflet/*`.
- **Service-Worker:** `service-worker.js` — bei JEDER Dateiänderung `CACHE='heiben-vYYYYMMDD-N'` **hochzählen** und neue Dateien ins Precache aufnehmen. (Aktuell: `heiben-v20260622-2989`.)

## 4) Tool-/Umgebungs-Eigenheiten (sonst Zeitverlust)
1. Hintergrundprozesse überleben einen Tool-Aufruf **nicht**.
2. `create_file` scheitert, wenn Datei existiert → erst `rm -f`.
3. **Inline-JS-Syntaxcheck** (matcht den letzten attributlosen `<script>`):
   `node -e "var h=require('fs').readFileSync('FILE','utf8');var m=h.match(/<script>([\s\S]*?)<\/script>/g);new Function(m[m.length-1].replace(/<\/?script>/g,''))"`
4. `pip` braucht `--break-system-packages`.
5. **Playwright**: `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`. Consent weg:
   `document.querySelector('[aria-label="Hinweis zur Datenspeicherung"]').remove()`. Output filtern: `grep -vE "waiting|scrolling|retrying|locator|element is|^\s*-"`.
6. **WebGL headless:** `chromium.launch(args=['--enable-unsafe-swiftshader','--use-gl=angle','--use-angle=swiftshader','--ignore-gpu-blocklist'])` + `device_scale_factor=2`. Shadow-Map **2048** (4096 zu langsam unter SwiftShader).
7. **Screenshots bei Canvas/WebGL:** room3d rendert bedarfsgesteuert (stoppt im Ruhezustand) → `locator.screenshot()` ist stabil. Lange Seite: erst `scroll_into_view_if_needed()`, dann `locator(sel).screenshot(timeout=15000)`.
8. **Deterministische Plan-Interaktion im Test:** Transform nachrechnen — `s=min((W-90)/bbW,(H-86)/bbD); ox=30+(W-90-bbW*s)/2; oy=30+(H-86-bbD*s)/2; px=ox+(x-x0)*s; py=oy+(z-z0)*s` (PAD=30, BOT=26, LEFTM=30). Modul-Interna nicht aus `page.evaluate` lesbar → DOM/`#dims`/Screenshot prüfen.
9. Persistent ist nur `/mnt/user-data/outputs/`. Uploads read-only unter `/mnt/user-data/uploads/`.

## 5) Aktueller Stand (erledigt, browser-verifiziert)
- Vier Planer, Firmierungs-Registry, Ledger+Belege, jsPDF-Modul, Welt-Cockpit, Holding-Dashboard, Lebenswissen (Reader/Bibliothek/Redaktion).
- Wohnen-3D-Raum (`heiben-room3d.js`): Materialtexturen (Holztöne/Samt/Muster), schwebende Preise, 3D↔Grundriss, Rotation+Skalierung je Objekt.
- **Grundriss-Editor v3 (`heiben-plan2d.js`):** verschieben, **drehen** (Griff + Taste R), **Größe ändern** (Resize-Griff), Bemaßung m/cm, Abstände zu Wänden/Nachbarn, **engster Durchgang**, **L-/versetzte Räume** (Polygon), **mehrere Türen/Fenster** an Wand verschiebbar (Snap 5 cm), **Maßband**, **freie Raummaße** (B/T-Eingabe). Lampen-Footprint kategorie-bewusst korrigiert.
- **Wohnen-Planer ↔ Grundriss (Runde 1):** 2D-Editor als 3. Ansicht eingebunden; Möbel des aktiven Raums werden aus `masse` (gespiegelt zu `room3d.dims`) als Footprints platziert (Auto-Layout, persistente `room.layout`), editierbare Raummaße B/T (`room.geo`), Tür/Fenster-Defaults. **Raum-Overlay:** Fläche, Stück·Pos., Netto (nur Firma), Gesamt, €/m², Stellflächen-%. **„Grundriss → Beleg"** erzeugt raum-scoped Angebot über `HeiBenAngebot.dokument`+Ledger (idempotent via `room.belegRef`). Browser-verifiziert: 0 PageErrors.
- **Content-Kampagne Lebenswissen-Vertiefungen (läuft, Charge 1):** Auftrag: ALLE 94 Vertiefungen prüfen, inhaltlich ausbauen, Fehler beheben, wo sinnvoll Rechner/Tools ergänzen — **erst danach** neue Artikel nach gleichem Muster. Befund-Messung: `PREM_DETAIL`-Bodies Ø 231 Wörter (Spanne 119–366) → für bezahlte Deep-Dives zu dünn. Stil-Vokabular: `<h5>`-Abschnitte, `<p>`, `<table class="ptable">`. Ausbau-Methode: Python `set_body()` ersetzt den `h:`-Backtick-Body gezielt (Bodies dürfen keine Backticks/`${` enthalten). **Charge 1 erledigt (6):** arbeitsvertrag (119→320 W), versicherungen (122→246, + neues Tool **burente**), umzug (122→248), kuendigung (145→221), nebenkosten (150→220), schufa (156→219) — je mit neuen Datentabellen (Fristen, Zeugnis-Code, umlagefähig/nicht, Schufa-Mythen & Löschfristen, Deckungssummen). Browser-verifiziert (Probemonat-Unlock): Ausbau sichtbar, gebundene Tools rechnen, 0 PageErrors. **Charge 2 (6):** behoerden 155→269, selbststaendig 152→251 (+Tool **stundensatz**), heirat 158→243 (+Tool **ehesplitting**, echter ESt-Grundtarif), abschluesse 143→231, privatbildung 138→236, erstewohnung 159→237. **Charge 3 (6, Finanzen/Recht):** gehalt 276, budget 246, notgroschen 208, steuern 243, schulden 245, vertraege 257 (alle hatten schon Tools — reiner Tiefen-Ausbau mit Rechenbeispielen/Tabellen). Neue Tools gesamt in der Kampagne: burente, stundensatz, ehesplitting. Gesamt-Median Bodies jetzt ~258 W (von 227). **Charge 4 (10):** pflegeang (+Tool **pflege**), haushalt, bewerbung, vorsorge, ehrenamt, etf, kind, trennung (+neues Tool **kindesunterhalt**, Düsseldorfer Tabelle Richtwert), neuorientierung, hauskauf — je +1 Tiefen-Abschnitt/Tabelle. Neue Tools gesamt: burente, stundensatz, ehesplitting, kindesunterhalt (+ vorhandenes pflege gebunden). **Charge 5 (10):** ausb_studium, studienfin, erziehung (+Tool taschengeld), vorstellung, weiterbildung, partnerschaft, ruhestand, krankenvers (+Tool krankengeld), bestattung (+neues Tool **bestatt**), hobbys — je +1 Abschnitt/Tabelle. Neue Tools gesamt: burente, stundensatz, ehesplitting, kindesunterhalt, bestatt (+ pflege/krankengeld/taschengeld/studienbudget/rentenstart vorhandene gebunden). **Charge 6 (10):** vorsorgeunt, vollmachten, pflegegrad, fitness, testament, reisen, zaehne, trauer, verkehr, kindgesundheit — je +1 Abschnitt/Tabelle (Gesundheitsthemen bewusst ohne präzise Kalorien-/Dosierungsangaben; vorhandene Tools pflege/energie/erbe/reise/zahnzuschuss/bussgeld/kkg bleiben gebunden). **Charge 7 (10):** erziehungsstile, medikamente, patientenrechte, lernen, ruecken, aufstieg (+neues Tool **aufstiegsbafoeg**), fernstudium, auswandernrente, entwicklung, garten — diese waren bereits umfangreich (250–270 W), daher je +1 gezielte Lücken-Ergänzung. **Charge 8 (10):** notfall, digitalbalance, strafverfahren, wohnenalter (+neues Tool **wohnumbau**), chronisch, weg, auslandszeit, sucht (behutsam: Angehörigen-Hilfe), einbruchschutz, konflikt — alle bereits sehr lang, daher je +1 gezielte Lücke. **Charge 9 (10):** sozialleistungen, einschulung, kita, sanierung (+neues Tool **sanierung**), gesundaltern, anwalt, kreativ, haftung, nebenjob, sprachen — alle bereits sehr lang, je +1 gezielte Lücke. **Charge 10 (10):** einrichten, datenschutz, haustiere, auszeit, weihnachtsmann, teilzeit (Artikel jetzt an Teilzeit-Rechner gebunden), grosseltern, soziales, demenz (+Pflege-Tool), sportverein — die längsten der Sammlung, je +1 kurze Lücke. **Charge 11 — Abschluss (6):** mental (+ Angehörigen-Hilfe, Krisennummern bleiben), kindernaehrung (+ „Süßes/Getränke ohne Drama“, keine Mengenangaben), nachbarschaft, abzocke, wg, kindersparen (+ Kindersparplan-Rechner gebunden). **KAMPAGNE KOMPLETT: 94/94 Vertiefungen überarbeitet.** Endstand: Body-Median 302 W (Start 227), 47 Bodies ≥300 W, 46/94 Artikel mit interaktivem Tool (Start 31), Tool-Registry 42 (Start 32; neu: burente, stundensatz, ehesplitting, kindesunterhalt, bestatt, aufstiegsbafoeg, wohnumbau, sanierung u. a.). Methode dokumentiert: append_body() für Bodies, Tool-Bindung im Post-Assignment-Block nach window.LW_DATA. **NÄCHSTE PHASE laut Auftrag:** neue Artikel nach gleichem Muster anlegen (LW_DATA.ARTIKEL-Record + PREM_DETAIL[id]={h,tool?}); sensible Themen weiterhin mit der etablierten Sorgfalt. Es verbleiben 6: 4 reguläre (nächste Charge) + sensibel: mental, kindernaehrung (mit besonderer Sorgfalt, ohne präzise Diät-/Krisendetails). Verbleibend 14 (ohne sensibel) + sensibel: mental, kindernaehrung. Verbleibend 24 (ohne sensibel) + sensibel: mental, kindernaehrung. Hinweis: ab hier sind die verbleibenden Bodies überwiegend schon ~250+ W; Kampagne ist v. a. Review/Feinschliff + Tools. Sensibel offen: mental, kindernaehrung. Sensibel & gezielt später: mental, kindernaehrung. Offen: restliche 88 (Gesundheitsthemen mit Sorgfalt: keine präzisen Diät-/Kalorienvorgaben, mentale Gesundheit unterstützend). Tool-Bindung via Post-Assignment-Block am Ende von lebenswissen-daten.js.
- **Interaktive Vertiefungen (Lebenswissen):** Lebenswissen-Artikel binden über `PREM_DETAIL[id].tool` einen Rechner aus der `TOOLS`-Registry (`lebenswissen-tools.js`); 31 waren gebunden, ~63 reine Prosa. Drei neue Tools ergänzt — `verzug` (Verzugszinsen § 288 BGB), `teilzeit` (Brutto/Netto/Stundenlohn), `wgmiete` (faire WG-Mietteilung nach m²) — und an `vertraege`/`teilzeit`/`wg` gebunden (Anbindung als Post-Assignment nach dem `window.LW_DATA`-Export, ohne die großen Template-Literale anzufassen). **Bugfix:** `nettoSchaetzung()` war nirgends definiert (von `netto`/`alg`/`sabbatical` genutzt → hätten beim Ausführen geworfen) — jetzt zentral als grobe Stkl-I-Schätzung (±10 %) definiert. Browser-verifiziert: Tools rechnen/reaktiv, Bindungen erkannt, Live-Rendering im Artikel nach Probemonat-Unlock, 0 PageErrors. Muster für weitere: Tool in Registry + `PREM_DETAIL[id].tool` setzen.
- **Kundenstamm + KPIs (Runde 4):** `HeiBenLedger.kpis()` additiv geschärft: `volumenMonat`, `kunden` (distinct), `avgBuchung`, `conversion` (gebucht/(angebote+gebucht)), `pipeline` (=angebotVolumen) — Bestandsfelder bleiben, `welt-cockpit` unberührt. Neuer Mock-Store **`HeiBenKunden`** (localStorage `heiben-kunden`): `all/get/upsert/remove/clear` + `derive(ledger)` (Kontakte gemerged mit aus dem Ledger abgeleiteter Aktivität: Vorgänge, Volumen, Welten, letzte, gebucht; Join über Name case-insensitive; auch kontakt-nur-Kunden ohne Ledger). Holding-Dashboard: 6 schärfere KPI-Kacheln + Kundenstamm-Panel (Anlegen/Ergänzen, persistent, Tabelle nach Volumen). Browser-verifiziert: KPI-Mathematik (3.290/1.740/2.320/60%/1.097/4), Ableitung über 2 Welten, Persistenz über Reload, 0 PageErrors.
- **Kulinarik-Sortiment (Runde 3, Slice 2):** `kulinarik-planner.html` von 20 → **45** Gerichte; zwei neue Kategorien **Fingerfood** (`#c2533a`, Empfang/Canapés) und **Beilage** (`#7d5260`) in `KATLABEL`/`KATCOL`/`KATORDER` + zwei Chips. Schema unverändert `{id,t,kat,netto,preis,alg[],partner,book,todo,desc}`; **kein Schwein** (vegetarisch/vegan/Fisch/Rind/Lamm). `SECCOL` ist raum-indexiert (nicht kat) → unverändert. Verteilung: Fingerfood 5 · Vorspeise 7 · Hauptgang 10 · Beilage 4 · Dessert 7 · Getränk 7 · Service 5. Browser-verifiziert: 45 in Palette, Chip-Filter exakt, neue Gerichte in Menükarte mit Preis, Allergen-Aggregation („Fisch") greift, 0 PageErrors.
- **Reisen-Sortiment (Runde 3, Slice 1):** `reisen-planer.html` von 34 → **59** Positionen ausgebaut; zwei neue Kategorien **Erlebnis** (`#7d5260`) und **Genuss** (`#1f7a64`, kein Schwein) in `TYPLABEL`/`TYPCOL` + zwei Filter-Chips (Chips sind hartkodiert, nicht aus TYPLABEL generiert — daran denken). Schema unverändert `{id,t,ort,typ,lat,lng,h,netto,preis,partner,book,route?,todo,desc,stadt?}`. Verteilung: Wandern 12 · Rad 10 · Rundreise 20 · Übernachtung 8 · Erlebnis 5 · Genuss 4. Browser-verifiziert: 59 in Palette, Chip-Filter exakt, 59 Map-Marker (neue Kategorien rendern), neue Items in Tag + Anfahrt + Plan-Pins, 0 PageErrors. Beleg-Flow (Quote→`printAngebot`) unverändert.
- **Öffnungstypen:** Öffnungen tragen `type` — **Tür** (Bogen), **Fenster** (Linie), **Fenstertür** (Bogen+Glaslinie, Chip „FT", liegt in `doors[]` → Tür-frei-Check greift), **bodentiefes Fenster** (breites Glasband+Endkappen, Chip „BT", in `windows[]`). `setRoom` reicht `type` durch; Eckenwechsel erhält Typ. Studio-Tools: „+ Fenstertür", „+ Bodentief" (`addOpening(kind,type)`; Default-Breiten 0,9/1,0/1,0/1,4 m). Browser-verifiziert: 4 Typen distinkt gerendert, FT-Eckwechsel behält Typ, 0 PageErrors. room3d modelliert Wände/Öffnungen nicht → Unterschied lebt im 2D-Plan.
- **plan2d Runde 2:** (a) **Öffnungen wechseln beim Ziehen um Ecken** die Wand (Projektion auf BB-Perimeter, breitenbewusst geclamped). (b) **Einzelne Wände ziehbar** → freie Maße auch für L-/versetzte Formen: Kante greifen, perpendikulär verschieben (beide Eckpunkte), `validOutline`-Schutz (Fläche≥1,2 m², Kanten≥0,25 m, BB≥1,2 m) gegen Kollaps/Selbstschnitt; Items werden nachgeclamped. Wand-Griffe je Wandmitte als Affordance; `onRoom` liefert `outline`. Studio-Artikel persistiert `outline` (Maße/Fläche/Checks live). Hinweis: Öffnungspositionen bleiben BB-relativ; Transform re-zentriert beim Schrumpfen (Wandzug „überzieht" optisch, Live-Maß führt). Browser-verifiziert: Eckenwechsel bottom→right, L-Wand 13,6→11,3 m², Schutz hält, 0 PageErrors.
- Interaktiver Artikel `studio-einrichtungstheorie.html`: 5 Szenarien (Wohn-/Schlaf-/Arbeit/Essen/Kinder), Theorie-Checkliste inkl. Tür-frei-Prüfung.

## 6) Backlog / nächste Schritte (Vorschläge)
- ✓ **erledigt (Runde 2):** Öffnungen um Ecken wechseln + einzelne Wände ziehen (freie Maße L/versetzt). Offen evtl.: Öffnungen an die echte Polygon-Kante (statt BB) binden; Wandzug ohne Re-Zentrierung (festes Scale beim Drag).
- Runde 4 ✓: Kundenstamm (HeiBenKunden, Mock-Persistenz) + Cockpit-KPIs aus Ledger geschärft.
- Runde 3: Reisen 34→59 ✓, Kulinarik 20→45 ✓, interaktive Lebenswissen-Vertiefungen +3 Tools ✓ (Muster steht für weitere Artikel/Welten).
- ✓ **erledigt (Runde 1):** Grundriss → Wohnen-Planer (Möbel platzieren, Flächen-/Stückkosten-Overlay, raum-scoped Beleg). Offen evtl.: pro Stück statt pro Position platzieren; Überlappungs-/Belegungs-Warnung.
- Reisen-/Kulinarik-Sortiment analog zum Wohnen-Planer ausbauen; weitere interaktive Studio-Artikel je Welt.
- Kundenstamm/Backend-Persistenz (weiterhin Mock), Cockpit-KPIs aus Ledger schärfen.
- **Bewusst NICHT** erneut anbieten, wenn schon abgelehnt: PDF/Bild-Export des Grundrisses (zuletzt abgelehnt — erst auf Nachfrage).

## 7) Definition of Done (jede Runde)
JS-Syntaxcheck grün → Service-Worker-Cache gebumpt → Playwright-Test (WebGL-Args) **0 PAGEERRORS** + relevante Szenarien bestehen → Screenshot(s) nach `/mnt/user-data/outputs/` → Kit gezippt → `present_files` → kurze deutsche Zusammenfassung + nächste Vorschläge.


## NEUE ARTIKEL — Charge A (5)
SW heiben-v20260622-2989. 5 neue interaktive Lebenswissen-Artikel im selben System (ARTIKEL-Record + PREM_DETAIL[id]={h,tool}, ~300-W-Body mit ptable, je eigener Rechner inline gebunden):
- **inflation** (finanzen) → Tool `inflation` (Kaufkraft-Schwund + noetige Realrendite)
- **dispo** (finanzen) → Tool `dispokredit` (Dispo-Jahreszins vs. Umschuldung)
- **homeoffice** (beruf) → Tool `homeoffice` (Pauschale 6 €/Tag, max 210, + Fahrtersparnis)
- **solar** (wohnen) → Tool `solar` (Balkonkraftwerk Ersparnis/Amortisation)
- **schlaf** (gesundheit, sicher) → Tool `schlaf` (Zubettgeh-Zeit aus Aufwachzeit, 90-Min-Zyklen)
ARTIKEL gesamt jetzt 100 (95 + 5). Tool-Registry 47. Alle DoD-verifiziert, 0 PageErrors. Einfuegemuster: Records nach `const ARTIKEL = [`, Bodies nach `const PREM_DETAIL = {`, Tools vor TOOLS-`};`. Bei „Weiter" weitere neue Artikel nach gleichem Muster; sensible Themen mit etablierter Sorgfalt.

## NEUE ARTIKEL — Charge C (10) + Umlaut-Fix A/B
SW heiben-v20260622-2989.
- Umlaut-Fix abgeschlossen: alle 15 Artikel aus Charge A+B von ASCII-Umschrift (fuer/groesste/ue) auf korrekte Umlaute (ä/ö/ü/ß) umgestellt — konsistent mit dem restlichen Magazin.
- Charge C = 10 weitere interaktive Artikel (Records nach `const ARTIKEL = [`, Bodies nach `const PREM_DETAIL = {`, je ~300-W-Body mit ptable + eigenem Inline-Tool):
  - etfsparplan (finanzen)→`etfsparplan` · skonto (finanzen)→`skonto` · hausrat (wohnen)→`hausrat` · bu (recht)→`bu` · quadratmeter (wohnen)→`quadratmeter` · heizen (wohnen)→`heizkosten` · dienstreise (beruf)→`reisekosten` · mietminderung (recht)→`mietminderung` · ratenkredit (finanzen)→`kreditrate` · eauto (wohnen)→`eauto`
- WICHTIG (gelernt): vor neuen ids IMMER Kollision prüfen. „notgroschen" existierte bereits (Artikel+Tool) → ersetzt durch „skonto". Sensible Themen (bu, mietminderung) mit Haftungs-Hinweis „keine Versicherungs-/Rechtsberatung".
- Stand gesamt: ARTIKEL 120, Tool-Registry 67. Alle DoD-verifiziert, 0 PageErrors, 0 ASCII-Reste.

## NEUE ARTIKEL — Charge D (5, ausführlich)
SW heiben-v20260622-2989. 5 sehr gründliche Artikel (je 5 <h5>-Abschnitte + Tabelle, ~250–310 W, eigener Inline-Rechner):
- mietenkaufen (wohnen)→`mietenkaufen` (Mieten-vs-Kaufen, „verbrannte" Wohnkosten + Tilgung/Restschuld/EK-Ertrag, Monats-Loop im go())
- erbschaftsteuer (recht)→`erbschaftsteuer` (Freibeträge je Verwandtschaft + Steuerklasse I/II/III-Tarif, 10-Jahres-Schenkung, Familienheim)
- abfindung (beruf)→`abfindung` (Faustformel Faktor×Brutto×Jahre, Fünftelregelung, Sperrzeit, 3-Wochen-Klagefrist)
- fluggastrechte (freizeit)→`fluggastrechte` (EU 261: 250/400/600 € nach Distanz, außergewöhnliche Umstände, Betreuung)
- krankengeld (gesundheit)→`krankengeldschaetzer` (70 % brutto / max 90 % netto, 78 Wochen, Sozialabgaben-Abzug)
- KOLLISIONEN gelernt/behandelt: Tool `krankengeld` existierte bereits (Basis, unreferenziert) → mein Tool als `krankengeldschaetzer` umbenannt. Basis-Tool unangetastet. (Ebenso vorher: `alg`-Tool/`kuendigung`-Artikel existieren → andere Themen gewählt.)
- Stand gesamt: ARTIKEL 125, Tool-Registry 72. DoD ok, 0 PageErrors, 0 ASCII-Reste. Sensible Themen mit „keine Rechts-/Steuer-/Finanzberatung"-Hinweisen.

## CHARGE E ZURÜCKGEZOGEN
SW heiben-v20260622-2989. Die drei Standalone-Dateien (Haushaltsbuch, Vermögens-Tracker, Finanzcockpit.xlsx) wurden auf Nutzer-Feedback wieder entfernt: Commodity-Tools ohne Zahlungsbereitschaft. Lehre: Standalone-Deliverables nur, wenn sie einen klaren, schwer kostenlos auffindbaren Mehrwert bieten (opinionierte Entscheidung + konkrete Zahl/Empfehlung), nicht als generischer Tracker/Template.

## DREI PREMIUM-KERNARTIKEL (Charge F) — ausgebaut "bis ultimo"
SW heiben-v20260622-2989. Drei eigenständige, interaktive HTML-Erlebnisse (CI-Look, inline, localStorage-Autosave, Live-Recompute, Canvas-Charts ohne Libs, headless 0 PageErrors):
- web/jobwechsel.html — "Lohnt sich der Jobwechsel?" Zwei Jobs (Brutto, Bonus, Urlaub, Std, AG-Vorsorge, Pendel-km, Bürotage) + gemeinsame Annahmen → Netto-Netto/Monat (grobe Brutto-Netto-Schätzung, Pendlerpauschale ab 21. km, HO-Pauschale, Pendelkosten), Pendelzeit als Lebenszeit, Stundenlohn inkl. Pendeln, opinioniertes Urteil + Δ-Tabelle + Vergleichsbalken. localStorage heiben_job_v1.
- web/steuererklaerung.html — "Deine erste Steuererklärung". Modus Berufseinsteiger (HEBEL: unterjähriger Einstieg = einbehaltene LSt − tatsächlich geschuldet; + Werbungskosten über 1230 €, Spenden, Handwerker 20 %) und Studierende (Master/Zweitausbildung → Verlustvortrag + künftige Ersparnis ~28 %; Erststudium → Sonderausgaben/Nebenjob-LSt). Sticky-Ergebnis mit großer Zahl. localStorage heiben_steuer_v1.
- web/zinseszins.html — "50 € im Monat ab 20". Slider Sparrate/Startalter/Rendite (+Presets), Inflations-Toggle (Kaufkraft real), animierter Hero-Zähler, Meilensteine 40/50/60/67, "Kosten des Wartens" (5 J. / pro Jahr), Latte-Faktor, Canvas-Flächenchart Kapital vs. Eingezahlt. localStorage heiben_zins_v1.
- Lehren: deutsche Anführungszeichen NIE in JS-Doublequote-Strings (ASCII " beendet String) → curly „ " oder umformulieren; text-transform:uppercase verfälscht Playwright-inner_text-Asserts (case-insensitiv prüfen). Alle Brutto-Netto/Steuer-Rechnungen mit Disclaimer "keine Steuer-/Finanzberatung".

## PREMIUM-KERNARTIKEL WELLE 2 (Charge G)
SW heiben-v20260622-2989. Drei weitere eigenständige interaktive Erlebnisse (CI-Look, inline, localStorage, Live-Recompute, Canvas, headless 0 PageErrors):
- web/schuldenfrei.html — "Schuldenfrei werden: Schneeball vs. Lawine". Mehrere Schulden (Name/Restschuld/Zins/Mindestrate, add/remove), Monatsbudget, Strategie-Toggle. Monats-Simulation (Zins, Mindestraten, Extra nach Strategie, Roll-over), Vergleich beider Strategien (Dauer + Zinsen), Schuldenfrei-Datum, Restschuld-Kurve. localStorage heiben_debt_v1.
- web/finanzcheck.html — "Finanz-Gesundheitscheck". 7 gewichtete Fragen (Notgroschen/Sparquote/Schulden/Überblick/Haftpflicht/BU/Vorsorge, Summe 100), animierter Score, Dimensions-Balken, priorisierte "nächste 3 Schritte" aus den größten Lücken. localStorage heiben_check_v1.
- web/sparziel.html — "Sparziel-Planer". Ziel + Modus (Bis-Datum → benötigt/Monat, oder feste Rate → Fertig-Datum), Einzahlungs-Log (add/delete, Quick-Buttons), Fortschritts-Ring (Canvas, animiert), Im-Plan/Hinter-Plan-Status, Meilensteine 25/50/75/100 %. localStorage heiben_sparziel_v1 (zum Wiederkommen).
- Gesamt Standalone-Premium-Tools jetzt 6 (jobwechsel, steuererklaerung, zinseszins, schuldenfrei, finanzcheck, sparziel).

## PREMIUM-KERNARTIKEL WELLE 3 (Charge H)
SW heiben-v20260622-2989. Drei weitere eigenständige interaktive Erlebnisse (CI, inline, localStorage, Live-Recompute, Canvas, headless 0 PageErrors):
- web/finanzielle-freiheit.html — "Wann bist du finanziell frei?" (4-%-Regel). Slider Ausgaben/Vermögen/Sparrate/Rendite/Entnahme/Alter; FU-Zahl = Jahresausgaben×(100/Entnahme), Monats-Sim bis Ziel → Alter der Freiheit, passives Einkommen, Sparquoten-Hebel (+100€ → X früher), Wachstumschart vs Ziel-Linie. localStorage heiben_fire_v1.
- web/studium-ausbildung.html — "Studium oder Ausbildung?" Lebensverdienst-Vergleich (Netto kumuliert 18→67, nettoJahr-Helper), Break-even-Alter, Differenz bis 67, zwei kumulierte Kurven mit Crossover-Punkt, ehrliches/ausgewogenes Urteil. localStorage heiben_studium_v1.
- web/erste-wohnung.html — "Die erste eigene Wohnung". Einmalbedarf (Kaution 3× Kaltmiete + Möbel/Umzug/Makler) + laufende Kosten/Monat (inkl. Rundfunk 18,36 €), Wohnkostenquote-Gauge (30/40 % Schwellen) mit Verdict, frei verfügbar, Spar-Brücke (Monate bis Einzug), Aufschlüsselungs-Tabellen. localStorage heiben_wohnung_v1.
- Gesamt Standalone-Premium-Tools jetzt 9 (jobwechsel, steuererklaerung, zinseszins, schuldenfrei, finanzcheck, sparziel, finanzielle-freiheit, studium-ausbildung, erste-wohnung).

## PREMIUM-KERNARTIKEL WELLE 4 (Charge I)
SW heiben-v20260622-2989. Drei weitere eigenständige interaktive Tools (CI, inline, localStorage, headless 0 PageErrors):
- web/gehaltsverhandlung.html — "Was bist du wert + was kostet Schweigen?" Forderung (%) + Wachstum/Alter → realistische Zielforderung UND der Kern: Lebenswert einer Erhöhung (neue Basis, kompoundiert bis 67), Zwei-Kurven-Chart (mit/ohne) mit Differenzfläche, 3 Verhandlungsregeln. localStorage heiben_gehalt_v1.
- web/konsumcheck.html — "Der wahre Preis deines Konsums". Modus Abos (editierbare Liste → Monat/Jahr/10 J. + angelegt 30 J. + Balken je Abo) und Einmalkauf (Preis ÷ Netto-Stundenlohn = Arbeitsstunden/-tage + Opportunität 10/30 J., wertfreies Reframe). localStorage heiben_konsum_v1.
- web/versicherungscheck.html — "Welche Versicherung brauchst du wirklich?" 8 Ja/Nein-Situationsfragen → Regel-Engine ordnet Policen in Unverzichtbar/Sinnvoll/Überflüssig mit Begründung (Haftpflicht/KV immer; BU bei Einkommen; Kfz bei Auto; Risikoleben bei Familie; Hausrat/Auslandskranken/Tierhalter/Wohngebäude/Rechtsschutz situativ; Handy/Brille/Sterbegeld etc. überflüssig). localStorage heiben_vers_v1.
- Gesamt Standalone-Premium-Tools jetzt 12 (Welle 1: jobwechsel/steuererklaerung/zinseszins; W2: schuldenfrei/finanzcheck/sparziel; W3: finanzielle-freiheit/studium-ausbildung/erste-wohnung; W4: gehaltsverhandlung/konsumcheck/versicherungscheck).

## PREMIUM-KERNARTIKEL WELLE 5 (Charge J) — über mehrere Welten
SW heiben-v20260622-2989. Drei eigenständige interaktive Tools in drei HeiBen-Welten (CI, inline, localStorage, headless 0 PageErrors):
- web/reisebudget.html (Reisen) — Eckdaten (Ziel/Tage/Personen) + Kostenposten (Anreise, Unterkunft €/Nacht, Essen €/Tag·Person, Transport, Puffer %, Sparrate) + editierbare Aktivitäten-Liste → Gesamtbudget, pro Person, pro Tag, Monate bis reisefertig, Kategorien-Balkenchart + Anteils-Tabelle. Ochre-Akzent. localStorage heiben_reise_v1.
- web/immobilienbudget.html (Immobilien) — EK + leistbare Rate + Sollzins + Anfangstilgung + Kaufnebenkosten% (+ optional Netto) → Darlehen_max = rate×1200/(zins+tilgung), maxKaufpreis = (Darlehen_max+EK)/(1+nk%); großer "bis X €", Kompositions-Balken (Darlehen/EK/NK), Restschuld nach 10 J., Belastungsquote, Hinweis Nebenkosten verloren. Aubergine-Akzent. localStorage heiben_immo_v1.
- web/stromfresser.html (Wohnen) — Strompreis ct/kWh + editierbare Geräte-Liste (Watt, Std./Tag) → kWh/Jahr=W/1000×h×365, €/Jahr je Gerät, nach Kosten sortierter horizontaler Balkenchart, Verdict größter Fresser + Tipp (Standby/alte Geräte). Defaults Kühlschrank/Gefriertruhe/Waschmaschine/Trockner/TV/Gaming-PC/Standby/Beleuchtung. Moss-Akzent. localStorage heiben_strom_v1.
- Gesamt Standalone-Premium-Tools jetzt 15 (W1 jobwechsel/steuererklaerung/zinseszins; W2 schuldenfrei/finanzcheck/sparziel; W3 finanzielle-freiheit/studium-ausbildung/erste-wohnung; W4 gehaltsverhandlung/konsumcheck/versicherungscheck; W5 reisebudget/immobilienbudget/stromfresser).
- Offene Kandidaten-Ideen für Folge-Wellen: Auto kaufen-vs-leasen-vs-finanzieren (3-Wege-Vollkosten), Selbst-kochen-vs-bestellen (Kulinarik, behavioral).

## VERKNÜPFUNG DER 15 STANDALONE-TOOLS IN DIE ARTIKEL (Charge K)
SW heiben-v20260622-2989. Problem war: alle 15 großen Standalone-Rechner (web/*.html) existierten, waren aber NIRGENDWO verlinkt — nur per direkter URL erreichbar.
Fix in web/studio-lebenswissen-artikel.html (IIFE #lwa-page): Map STANDALONE { artikelId -> {f:datei,t:titel,d:teaser} } + Funktion bigTool() rendert einen sichtbaren CTA „Interaktiver Rechner" (Kategorie-Akzent, var(--kc)) direkt nach freiHTML(), vor der Vertiefung. render() = freiHTML()+bigTool()+vertiefung()+buecher()+notes. CTA ist frei sichtbar (nicht hinter Paywall), da die Standalone-Tools eigenständige freie Seiten sind.
21 Artikel verweisen jetzt auf die 15 Tools (mehrere Artikel pro Tool erlaubt):
 steuern->steuererklaerung; etfsparplan+kindersparen->zinseszins; vorsorge+etf->finanzielle-freiheit; schulden+dispo->schuldenfrei; budget->finanzcheck; notgroschen->sparziel; ausb_studium->studium-ausbildung; erstewohnung->erste-wohnung; gehalt->gehaltsverhandlung; handyvertrag->konsumcheck; versicherungen->versicherungscheck; reisen->reisebudget; hauskauf+mietenkaufen->immobilienbudget; stromtarif+nebenkosten->stromfresser; neuorientierung+pendeln->jobwechsel.
Headless verifiziert: zugeordnete Artikel zeigen CTA mit korrektem href, nicht zugeordnete (trauer/haustiere) zeigen keinen; 0 PageErrors. Die kleinen In-App-Widgets (PREM_DETAIL.tool via LW_TOOLS.renderTool, premium) bleiben unverändert daneben bestehen.
Offen/optional: zusätzlicher Tools-Hub auf studio-lebenswissen.html oder -bibliothek (Kartenübersicht aller 15) für noch mehr Auffindbarkeit — noch nicht umgesetzt.

## 10 NEUE LEBENSWISSEN-ARTIKEL + VERTIEFUNGEN (Charge L)
SW heiben-v20260622-2989. ARTIKEL 125 -> 135, PREM_DETAIL 124 -> 134. Eingefuegt via new_articles_10.py (Records nach `const ARTIKEL = [\n`, Bodies nach `const PREM_DETAIL = {\n`). Alle ohne in-app `tool` (reine Vertiefungs-Prosa, je 4x h5 + 4x p + 1 ptable, ~175-230 sichtbare Woerter). Headless verifiziert: Bibliothek 135/135, freier Teil + Teaser + valides Vertiefungs-HTML, 0 PageErrors.
Neue IDs/Kategorien:
 [recht] gebrauchtkauf — Gebraucht kaufen & verkaufen: sicher handeln (Gewaehrleistungsausschluss privat, Betrugsmaschen, Uebergabebeleg)
 [recht] gewaehrleistung — Reklamation: Gewaehrleistung vs Garantie, Beweislastumkehr nach 12 Monaten, Nacherfuellung
 [finanzen] kreditkarte — Charge/Debit/Revolving, DCC-Falle im Ausland, Bargeldabhebung
 [finanzen] mahnung — Mahnung/Inkasso/Mahnbescheid: Eskalationsstufen, gedeckelte Inkassokosten, 2-Wochen-Frist
 [finanzen] kapitalertraege — Abgeltungsteuer, Sparerpauschbetrag 1000/2000, Freistellungsauftrag, Vorabpauschale, Guenstigerpruefung
 [recht] vertragkuendigen — Kuendigungsbutton (seit 2022), max. 1 Monat Verlaengerung, Sonderkuendigungsrecht
 [recht] digitalnachlass — Online-Konten vererbbar, Vollmacht ueber den Tod hinaus, Passwortmanager statt Testament
 [freizeit] radverkehr — Verkehrsregeln/Promille fuers Rad, Diebstahlschutz, Hausrat-Fahrradklausel/Nachtzeitklausel
 [familie] taschengeld — Lerngeld ohne Gegenleistung, Orientierungswerte, Taschengeldparagraf, Uebergang zum Budgetgeld
 [finanzen] buergschaft — Ausfall- vs selbstschuldnerische Buergschaft, Mithaftung im Gemeinschaftskredit, Sittenwidrigkeit
Alle mit Disclaimer (Keine Rechts-/Steuer-/Finanzberatung). Keine ID-Kollision (vorab geprueft). Bibliothek/Artikel lesen ARTIKEL dynamisch -> automatisch sichtbar.
Optional offen: globaler suche-index.js evtl. noch ohne die 10 neuen (separat gepflegt); Lebenswissen-eigene Anzeige funktioniert.

## SUCHINDEX KOMPLETT NEU + 10 WEITERE ARTIKEL (Charge M)
SW heiben-v20260622-2989. ARTIKEL 135 -> 145, PREM_DETAIL 134 -> 144 (via new_articles_10b.py).
Neue IDs: [beruf] lohnabrechnung, arbeitszeugnis, kleinunternehmer; [finanzen] werbungskosten, steuerbescheid, rentenpunkte; [familie] paarfinanzen; [gesundheit] krankschreibung; [wohnen] mieterhoehung; [recht] erbeausschlagen. Je 4 Abschnitte + ptable + Disclaimer. Kollisionsfrei, headless ok.
SUCHINDEX (web/suche-index.js) war veraltet: kannte weder die ~31 Rechner-Artikel (mietenkaufen, erbschaftsteuer, abfindung, dispo, stromtarif, handyvertrag, ...) noch die 20 neuen. Jetzt komplett neu generiert aus LW_DATA.ARTIKEL: window.HEIBEN_SUCHE = nonLW(183, unveraendert) + lebenswissen(145, ALLE Artikel) = 328 Eintraege. LW-Eintrag = {t:'lebenswissen', u:'studio-lebenswissen-artikel.html?id='+id, h:titel, s:KATS[k].n, x:kurz}. Hub-Seite studio-lebenswissen.html: Count "94 Wegweiser" -> "145 Wegweiser".
Regeneriert per Node (require lebenswissen-daten.js + suche-index.js unter global.window, JSON.stringify, Header-Kommentar Zeile 1 erhalten). Bei kuenftigen Artikel-Aenderungen Index identisch neu erzeugen.
Headless verifiziert: suche.html laedt 145 LW-Eintraege; Suche nach Arbeitszeugnis/Mieterhoehung (neu) und Stromtarif (zuvor fehlend) liefert Treffer; 0 PageErrors.
Gesamt Lebenswissen-Artikel jetzt 145; Standalone-Premium-Tools weiterhin 15 (in 21 Artikeln verlinkt).

## NEUER THEMENBEREICH "Digitales Leben" + STANDING INDEX-SKRIPT (Charge N)
SW heiben-v20260622-2989. ARTIKEL 145 -> 155, PREM_DETAIL 144 -> 154 (new_articles_10c.py).
NEUE KATEGORIE k="digital", n="Digitales Leben", Farbe #17A2B8 (Cyan). Eingetragen in: KATS (lebenswissen-daten.js, nach recht), KF-Map in studio-lebenswissen-artikel.html UND studio-lebenswissen.html ("digital":"#17A2B8"), Redaktions-Palette studio-lebenswissen-redaktion.html (CSS --digital + KCOL). Hub/Bibliothek iterieren KATS dynamisch -> Chip erscheint automatisch. Kategorien jetzt 10.
10 digital-Artikel: passwoerter, kialltag, sozialemedien, fakenews, digitalerfussabdruck, clouddaten, onlinedating, smarthome, kinderdigital, wlansicherheit. Je 4 h5 + ptable + Disclaimer.
INDEX: ab jetzt IMMER per Standing-Skript build-suche-index.js (im Kit-Root) erzeugen: `node build-suche-index.js`. Es behaelt nonLW (183) unveraendert, baut Lebenswissen frisch aus ALLEN Artikeln, aktualisiert Hub-Wegweiser-Zahl. Aktuell: 338 Eintraege (183 + 155). Kategorienliste im Hub-Text um "Digitales Leben" ergaenzt (Seite + Index).
Headless verifiziert: Bibliothek 155 + Chip "Digitales Leben"; Artikel ?id=passwoerter rendert (Titel, 4 Checklistenpunkte, Kat-Farbe #17A2B8); Suche nach Passwoerter/Smart Home trifft; 0 PageErrors.
WORKFLOW kuenftig ("immer so machen"): Artikel via Insert-Skript -> node build-suche-index.js -> SW bump -> zip -> present.

## NEUER THEMENBEREICH "Büro & Software" (Charge O)
SW heiben-v20260622-2989. ARTIKEL 155 -> 165, PREM_DETAIL 164 (new_articles_10d.py).
NEUE KATEGORIE k="buero", n="Büro & Software", Farbe #8E44AD (Amethyst). Eingetragen in: KATS (nach digital), KF-Map in studio-lebenswissen-artikel.html UND studio-lebenswissen.html ("buero":"#8E44AD"), Redaktions-Palette (CSS --buero + KCOL). Kategorien jetzt 11.
10 buero-Artikel (Office-Lifehacks + Theorie/Leitfaden): excelgrundlagen, excelfunktionen, pivottabellen, exceldiagramme, wordvorlagen, worddokumente, praesentationen, mailorganisation, tastenkuerzel, dateiorganisation. Je 4 h5 + ptable + Praxis-Schluss (kein Disclaimer noetig, Software-Thema).
Index per `node build-suche-index.js` neu: 348 Eintraege (183 + 165). Kategorienliste im Hub-Text um "Büro & Software" ergaenzt (Seiten + Index).
Headless ok: Bibliothek 165 + Chip; ?id=excelgrundlagen rendert (Titel, 4 Checks, Farbe #8E44AD); Suche Pivot/Tastenkuerzel/Formatvorlagen trifft; 0 PageErrors.
Kategorien-Stand (11): bildung, beruf, finanzen, wohnen, familie, gesundheit, recht, digital, buero, freizeit, alter.

## ZWEI INTERAKTIVE ABFRAGE-TOOLS (Charge P) — Trainer + Quiz
SW heiben-v20260622-2989. KEINE Artikeldaten geaendert -> Suchindex bleibt 165/338 gueltig (kein Rebuild noetig).
Zwei neue Standalone-Premium-Tools (web/, Muster wie die 15 bestehenden: inline CSS+JS, CI-Tokens, localStorage, keine Libs):
1) web/tastentrainer.html (heiben_tasten_v1): Tastenkuerzel-Trainer. Faengt ECHTE keydown ab (canon: Modifier alphabetisch alt,ctrl,meta,shift + key), vergleicht mit win/mac-Akzeptanzlisten. 3 Kategorien (Universell / Text & Format / Office & Excel, ~21 Shortcuts). Windows<->Mac-Umschaltung (Strg<->⌘, Symbol-Labels). Serie + Bestserie + Trefferquote + Liga-Band. preventDefault unterbindet Save/Find/Print/Select-Side-Effects. BEWUSST nur sicher abfangbare Kombis (kein Strg+W/T/N, kein Alt+Tab — die fängt Browser/OS ab).
2) web/wissensquiz.html (heiben_quiz_v1): Lebenswissen-Quiz. BANK 42 Fragen (je 6: finanzen/recht/beruf/wohnen/gesundheit/digital/buero) + "Alles gemischt". Multiple-Choice, Antwortpositionen werden gemischt (nicht immer A!), Erklaerung je Antwort, Canvas-Score-Ring (no libs), Verdict-Band, Bestwert pro Kategorie. Liest ?kat= zur Vorauswahl.
VERLINKT in STANDALONE-Map (studio-lebenswissen-artikel.html): tastenkuerzel->tastentrainer; und Quiz kategorienweise in je 1 toollosen Artikel: excelgrundlagen?kat=buero, passwoerter?kat=digital, gebrauchtkauf?kat=recht, kapitalertraege?kat=finanzen, arbeitszeugnis?kat=beruf, krankschreibung?kat=gesundheit, mieterhoehung?kat=wohnen. (bigTool nutzt entry.f als href; ?kat= bleibt erhalten.)
Headless verifiziert: Trainer faengt Strg+C, zaehlt attempts, Kategorie/OS-Umschaltung; Quiz ?kat=buero rendert, 4 Optionen, durchklickbar bis Ring+Band, Bestwert gespeichert, richtige Position variiert; CTAs mit korrekten hrefs, unmapped Artikel ohne CTA; 0 PageErrors. Standalone-Tools jetzt 17.

## ZWEI WEITERE INTERAKTIVE TOOLS (Charge Q) — Speedrun + Wahr/Falsch
SW heiben-v20260622-2989. KEINE Artikeldaten geaendert -> Suchindex bleibt gueltig (kein Rebuild). Standalone-Tools jetzt 19.
1) web/shortcut-speedrun.html (heiben_speedrun_v1): 60-Sekunden-Arcade. Gleiche Key-Capture-Logik wie der Trainer (canon + win/mac-Akzeptanzlisten, ~21 sicher abfangbare Kuerzel). Start-Button -> Timer (setInterval 100ms, drainender Balken), echte Tasten druecken, +1 je richtig, Serie/Best-Serie, bei falsch kurzer "Richtig waere"-Hinweis. Verdict-Baender nach Score. localStorage best + bestStreak. ?t=SEK (5..180) override fuer Dauer (Default 60; dient auch Tests). Windows/Mac-Toggle (gesperrt waehrend Lauf).
2) web/wahr-oder-falsch.html (heiben_wof_v1): Mythen-Check. BANK 30 Aussagen (ausgewogen wahr/Mythos) aus finanzen/recht/beruf/wohnen/gesundheit/digital/buero. Zwei Buttons Stimmt/Mythos, Sofort-Reveal (richtig/falsch + Erklaerung), Serie + 🔥-Anzeige ab 3, Runde=12 (shuffle), Canvas-Score-Ring, "Taeuschungs-Resistenz"-Band, localStorage best + bestStreak.
VERLINKUNG: STANDALONE-Map (studio-lebenswissen-artikel.html): fakenews -> wahr-oder-falsch.html (thematisch). Querlinks: tastentrainer.html -> shortcut-speedrun.html (neue xlink-Zeile vor .foot); shortcut-speedrun -> tastentrainer; wahr-oder-falsch -> wissensquiz; (quiz/trainer aus Charge P unveraendert). Vier Tools bilden Cluster Shortcuts(Trainer+Speedrun) / Wissen(Quiz+Wahr-Falsch).
Headless verifiziert: Speedrun ?t=5 startet, zaehlt, Timer laeuft ab -> Ergebnis+Band+best gespeichert; W/F 12er-Runde durchklickbar -> Ring+Band+best, wahr/falsch-Positionen gemischt; alle CTAs/Querlinks korrekt; 0 PageErrors.
HINWEIS Tools & Precache: die jetzt 19 Standalone-Tools sind bewusst NICHT in der SW-PRECACHE-Liste (Laufzeit-Fetch) — konsistent mit den 15 Altbestaenden. Nach Tool-Aenderung nur SW-Version bumpen.

## BEGRIFFSKARTEN-TRAINER (Charge R) — Flashcards Allgemein- + nuetzliches Wissen
SW heiben-v20260622-2989. KEINE Artikeldaten geaendert -> Suchindex unveraendert gueltig. Standalone-Tools jetzt 20.
web/begriffskarten.html (heiben_karten_v1): 3D-Flip-Karten (CSS rotateY, .scene min-height 280px, .card3d absolute, front/back .face mit backface-visibility). Karte antippen = umdrehen; nach Flip erscheinen Buttons Nochmal/Gewusst. "Gewusst" => Karte wird PERSISTENT als mastered markiert (localStorage st.mastered[id]) und faellt aus dem Stapel; "Nochmal" => ans Ende. Stapel leer => Abschluss-Screen "Stapel geschafft!" mit "Diese Karten neu ueben" (loescht mastery der Kategorie) / "Andere Kategorie". Persistenz ueber Sessions verifiziert (nach Reload: voll gemeisterte Kategorie zeigt "Schon alles gekonnt"). Panel: gemeistert X/Y + Fortschrittsbalken + Serie. Lifetime st.gewusst + st.bestStreak. ?kat= Vorauswahl. Karten-IDs stabil via BANK-Index (c.id="k"+i) -> BANK-Reihenfolge NICHT umsortieren, sonst verschiebt sich mastery.
BANK 64 Karten, 7 Kategorien + "Alles gemischt": geo, natur, gesch, kultur, koerper (Allgemeinwissen) + geld, alltag (nuetzliches Wissen). d/t als Template-Literals (Backticks) wegen vieler curly Quotes/Sonderzeichen (CO2-Index, °C etc.) — kein ${ darin.
VERLINKUNG: Querlinks ergaenzt — wissensquiz.html -> begriffskarten.html (neue xlink-Zeile vor .foot), begriffskarten -> wissensquiz. Tool ist Allgemeinwissen-lastig -> bewusst NICHT in STANDALONE-Map eines Artikels (kein passender Lebenswissen-Artikel); erreichbar ueber den Wissens-Cluster (Quiz/W-F sind artikelverlinkt). Tool-Cluster jetzt: Shortcuts (Trainer+Speedrun), Wissen (Quiz+Wahr/Falsch+Begriffskarten).
Headless verifiziert: ?kat=geld, Flip zeigt rate+Erklaerung, "Gewusst" persistiert, Stapel-Leeren -> Abschluss, Reload-Persistenz, Quiz->Karten-Link; 0 PageErrors.

## BEGRIFFSKARTEN ERWEITERT (Charge S) — 57 -> 128 Karten, +5 Kategorien
SW heiben-v20260622-2989. KEINE Artikeldaten -> Suchindex unveraendert. begriffskarten.html jetzt 128 Karten, 12 Inhaltskategorien + "Alles gemischt" (13 Chips).
WICHTIG (Persistenz): neue Karten wurden ANS ENDE der BANK angehaengt (nicht eingefuegt), damit die per BANK-Index vergebenen IDs (c.id="k"+i) der Altkarten stabil bleiben und gemerkte mastery nicht verrutscht. Bei kuenftigen Erweiterungen IMMER hinten anhaengen.
NEUE KATEGORIEN (KATLBL + KATORDER ergaenzt): tech "Technik & Internet", staat "Politik & Staat", mathe "Mathe & Logik", ersthilfe "Erste Hilfe", redewendung "Redewendungen". Bestehende 7 Kategorien je auf ~13 erweitert.
Kartenzahl je Kategorie: geo13, natur14, gesch13, kultur13, koerper13, geld13, alltag13, tech8, staat7, mathe7, ersthilfe7, redewendung7. Alle t/d als Template-Literals (Backticks), kein ${.
Inhalte zeitlos (Definitionen, Daten, Naturgesetze, Idiome). ersthilfe bewusst nur sichere Public-Safety-Fakten (Notruf 112/110, stabile Seitenlage, Druckverband, Verbrennung kuehlen) ohne riskante Technik-Details.
Headless verifiziert: 128 Karten, 13 Chips, neue Kategorien waehlbar + Flip zeigt Erklaerung+rate, "Gewusst" persistiert; 0 PageErrors. Standalone-Tools weiterhin 20 (nur begriffskarten erweitert).

## BEGRIFFSKARTEN +200 (Charge T) — 128 -> 328 Karten, +14 Kategorien
SW heiben-v20260622-2989. KEINE Artikeldaten -> Suchindex unveraendert. Helper: new_cards_charge_t.py (im Kit-Root, vom Zip via "*/new_articles_10*.py"-Muster NICHT erfasst -> bei Bedarf separat ausschliessen; ist aber harmlos, reine Quelle).
begriffskarten.html jetzt 328 Karten, 26 Inhaltskategorien + "Alles gemischt" (27 Chips). Wieder strikt ANS ENDE der BANK angehaengt (IDs c.id="k"+i stabil -> mastery bleibt erhalten). KATLBL + KATORDER um 14 neue erweitert.
NEUE KATEGORIEN: weltraum (Weltraum & Astronomie), tiere (Tierwelt), essen (Essen & Kueche), sport, musik, chemie, physik, umwelt (Umwelt & Klima), verkehr (Verkehr & Auto), wetter (Wetter & Natur), psychologie, religion (Religionen & Feste), kunst (Kunst & Architektur), wirtschaft. Bestehende 12 je um 3-4 aufgestockt.
Verteilung: geo17 natur17 gesch16 kultur16 koerper16 geld17 alltag17 tech11 staat10 mathe10 ersthilfe10 redewendung10 weltraum13 tiere14 essen12 sport12 musik12 chemie12 physik12 umwelt12 verkehr12 wetter10 psychologie10 religion10 kunst10 wirtschaft10.
Inhalte zeitlos; ersthilfe weiter nur sichere Public-Safety-Fakten; essen ohne Diaet-/Kalorienzahlen (nur Kuechen-/Garfakten). Alle t/d Template-Literals (Backticks), Skript prueft auf Backtick/${.
Headless verifiziert: 27 Chips, Stichprobe weltraum/tiere/essen/sport/chemie/verkehr/religion/wirtschaft -> Flip+rate+Erklaerung, ?kat=tiere, Gewusst persistiert; 0 PageErrors. Standalone-Tools weiterhin 20.

## BEGRIFFSKARTEN +200 (Charge U) — 328 -> 528 Karten, +10 Kategorien
SW heiben-v20260622-2989. KEINE Artikeldaten -> Suchindex unveraendert. Helper: new_cards_charge_u.py (Kit-Root; vom Zip ausgeschlossen).
begriffskarten.html jetzt 528 Karten, 36 Inhaltskategorien + "Alles gemischt" (37 Chips). Wieder strikt ANS ENDE der BANK angehaengt -> IDs k0..k527 stabil/eindeutig, mastery bleibt erhalten. KATLBL + KATORDER um 10 neue erweitert.
NEUE KATEGORIEN: philosophie (Philosophie & Denken), erfindungen (Erfindungen & Entdeckungen), mythologie (Mythologie & Sagen), botanik (Pflanzen & Garten), sprache (Sprachen & Woerter), computer (Computer & Code), recht (Recht & Alltag), medizin (Gesundheit & Medizin), erde (Erde & Geologie), kommunikation (Medien & Kommunikation). Bestehende 26 je um 2-4 aufgestockt.
Inhalte zeitlos; medizin nur Gesundheits-Literacy (keine Dosierungen/Diagnosen), ersthilfe weiter sichere Public-Safety-Fakten. Skript prueft Backtick/${. Alle t/d Template-Literals.
Headless verifiziert: 37 Chips, Stichprobe philosophie/erfindungen/mythologie/botanik/computer/recht/medizin/erde/kommunikation/sprache -> Flip+rate+Erklaerung, ?kat=erfindungen, Gewusst persistiert; IDs eindeutig (k0..k527); 0 PageErrors. Standalone-Tools weiterhin 20.
HINWEIS: Chip-Leiste ist mit 37 Kategorien sehr lang -> bei weiterem Wachstum Filter/Suchzeile im Tool sinnvoll (dem Nutzer angeboten).

## BEGRIFFSKARTEN: INFO-OVERLAY "Mehr zum Thema" (Charge V)
SW heiben-v20260622-2989. KEINE Artikeldaten -> Suchindex unveraendert. Standalone-Tools weiterhin 20.
NEUES FEATURE in begriffskarten.html: Info-"i"-Button unter der Karte; Overlay/Popover mit ausfuehrlicher Erlaeuterung zum Thema. Oeffnet per HOVER (CSS :hover/:focus-within) UND per TAP (JS .open-Toggle am #info) -> mobil-tauglich. Tap ausserhalb schliesst (document click, #ibtn nutzt stopPropagation). Info-Button liegt AUSSERHALB von #card -> kein versehentlicher Flip. Info-Icon ist nur sichtbar, wenn fuer den Begriff ein Text existiert (sonst .hidden) -> keine leeren Popovers.
DATENMODELL: neues Lookup-Objekt `var EXT = {...}` (Zeile direkt nach `var KEY`), gekeyt per BEGRIFF (c.t), Werte als JSON-String (sichere Escapes, ensure_ascii=False, einzeilig). showCard() setzt #popt=EXT[c.t] und blendet #info ein/aus.
BUILD/PFLEGE: Texte werden per Skript gemerged (new_ext_charge_v.py im Kit-Root, vom Zip ausgeschlossen). Skript: AUTHORED={Begriff:Text}, liest bestehende EXT-Zeile, json.loads -> update -> json.dumps zurueck (idempotent, additiv). Karten-Begriffe werden per Regex \{k:"(..)",t:`([^`]*)`,d: aus dem File gelesen (NICHT Python-eval, JS-Template-Literals!). Skript prueft: keine AUTHORED-Tippfehler (Key ohne Karte) und Vollabdeckung der Zielkategorien.
WELLE 1 (Charge V): 94 Erlaeuterungen fuer den praktischen Cluster KOMPLETT: geld(21), recht(13), medizin(14), ersthilfe(10... inkl. Sonnenstich/Verbandskasten =12), alltag(20), verkehr(14). Inhalte je 2-3 Saetze, sachlich, sicher (ersthilfe/medizin ohne riskante Details/Dosierungen).
OFFEN: die ~434 Allgemeinwissen-Karten haben noch KEIN EXT (Icon dort ausgeblendet). Weitere Wellen einfach per neuem AUTHORED-Block + Skript nachziehen (Begriffe via `node -e` aus dem File dumpen, dann Texte schreiben). Reihenfolge-/ID-unabhaengig, da per Begriff gekeyt.
Headless verifiziert: Icon-Sichtbarkeit, Hover-Popover (display block), Tap-Toggle (+258-Zeichen-Text), Tap-ausserhalb schliesst, kein Flip-Nebeneffekt, unbedeckte Kategorie zeigt kein Icon; 0 PageErrors.

## BEGRIFFSKARTEN INFO-TEXTE WELLE 2 (Charge W)
SW heiben-v20260622-2989. KEINE Artikeldaten. Helper new_ext_charge_w.py (Kit-Root, vom Zip ausgeschlossen).
+118 Erlaeuterungen (EXT jetzt 212/528). Voll abgedeckt nun 13 Kategorien: alltag, botanik, erde, ersthilfe, geld, geo, koerper, medizin, natur, recht, tiere, verkehr, weltraum.
Welle 2 = Natur-&-Welt-Cluster: geo(20), natur(20), koerper(20), erde(13), weltraum(15), tiere(17), botanik(13). Inhalte zeitlos/sachlich. Mechanik unveraendert (EXT per Begriff, Skript merged additiv).
NOCH OFFEN (~316 Karten, Icon dort ausgeblendet): gesch, kultur, tech, staat, mathe, redewendung, essen, sport, musik, chemie, physik, umwelt, wetter, psychologie, religion, kunst, wirtschaft, philosophie, erfindungen, mythologie, sprache, computer, kommunikation. Naechste Wellen per gleichem Muster: `node -e` Begriffe einer Kategoriegruppe dumpen -> AUTHORED schreiben -> new_ext_charge_X.py.
Headless verifiziert: tiere/weltraum/koerper Icon+Text, kultur (unbedeckt) Icon versteckt; 0 PageErrors.

## BEGRIFFSKARTEN INFO-TEXTE WELLE 3 (Charge X)
SW heiben-v20260622-2989. KEINE Artikeldaten. Helper new_ext_charge_x.py (Kit-Root, vom Zip ausgeschlossen).
+115 Erlaeuterungen (EXT jetzt 327/528). Welle 3 = Wissen-&-Gesellschaft-Cluster: gesch(19), kultur(19), staat(13), wirtschaft(12), philosophie(14), religion(12), kommunikation(13), sprache(13).
Voll abgedeckt nun 21 Kategorien: alltag, botanik, erde, ersthilfe, geld, geo, gesch, koerper, kommunikation, kultur, medizin, natur, philosophie, recht, religion, sprache, staat, tiere, verkehr, weltraum, wirtschaft.
NOCH OFFEN (15 Kategorien, ~201 Karten, Icon dort ausgeblendet): chemie, computer, erfindungen, essen, kunst, mathe, musik, mythologie, physik, psychologie, redewendung, sport, tech, umwelt, wetter. Naechste Welle gleiches Muster.
Headless verifiziert: philosophie/gesch/religion Icon+Text, chemie (unbedeckt) Icon versteckt; 0 PageErrors.

## BEGRIFFSKARTEN INFO-TEXTE WELLE 4 — KOMPLETT (Charge Y)
SW heiben-v20260622-2989. KEINE Artikeldaten. Helper new_ext_charge_y.py (Kit-Root, vom Zip ausgeschlossen).
+201 Erlaeuterungen -> EXT jetzt 528/528. ALLE 36 KATEGORIEN VOLL ABGEDECKT, jede Karte hat ein Info-"i".
Welle 4 = restliche 15 Kategorien: chemie(14), physik(14), mathe(13), tech(13), computer(14), erfindungen(14), mythologie(13), kunst(12), musik(14), sport(15), essen(14), umwelt(14), wetter(12), psychologie(12), redewendung(13). Sonderzeichen in Keys (H₂O, CO₂, 7 × 8, redewendung-Phrasen mit Curly-Quotes) ok dank JSON-Keying.
STATUS Info-Overlay-Feature: ABGESCHLOSSEN. Falls neue Karten ergaenzt werden, einfach neuen AUTHORED-Block + new_ext_charge_Z.py nach gleichem Muster (Begriffe via node-dump, EXT additiv gemergt, headless verifizieren, SW bump).
Headless verifiziert: alle 15 Wellen-4-Kategorien Icon+Text, Sonderzeichen-Keys vorhanden; 0 PageErrors.

## NEUES TOOL: mieten-oder-kaufen.html (SW -2945)
Eigenstaendiges Premium-Tool Nr. 21 (Haus-Schema wie immobilienbudget.html, inline CSS/JS, localStorage heiben_mietkauf_v1).
Rechnet Mieten vs. Kaufen als VERMOEGEN ueber N Jahre durch: monatliche Simulation (Annuitaet, Restschuld, Instandhaltung, Wertsteigerung) gegen "mieten + Differenz anlegen". Liefert Verdikt (wer liegt vorn, um wieviel), SVG-Liniendiagramm beider Vermoegenskurven, Kipp-Punkt (erstes Jahr, ab dem Kaufen >= Mieten), Mini-Stats, Engpass-Warnung wenn EK < Nebenkosten.
WIRING: STANDALONE.mietenkaufen in studio-lebenswissen-artikel.html (~Z.930) zeigt jetzt auf mieten-oder-kaufen.html statt immobilienbudget.html (hauskauf bleibt auf immobilienbudget).
DASHBOARD-VORBEREITUNG: Tool schreibt Ergebnis nach localStorage-Key "heiben_results" -> {mietkauf:{t,v,u,ts}}. Konvention fuer kommendes Mein-HeiBen-Dashboard: jedes Tool legt {toolId:{t:Titel,v:Wert,u:url,ts}} dort ab.
Headless verifiziert: rendert, reaktiv auf Eingaben, Sensitivitaet ueber alle Hebel plausibel (hohe Miete/niedriger Zins/hohe Wertsteig -> Kaufen; hohe Anlagerendite -> Mieten), Artikel-Link korrekt, 0 PageErrors.

NAECHSTE GEPLANTE FEATURES (vom Nutzer gewaehlt 1,2,3,6 — 6 erledigt): (2) Lernpfade durch die 165 Artikel, (3) Tagesdosis Streak, (1) Mein-HeiBen-Dashboard (bündelt alles + heiben_results).

## NEUES FEATURE: lernpfade.html (SW -2946) — Feature 2/4 der Auswahl 1,2,3,6
Kuratierte Lernpfade durch die 165 Artikel. Standalone-Seite, laedt lebenswissen-daten.js (Titel live aus ARTIKEL via MAP, bleibt in sync). 8 Pfade: erste-wohnung, erstes-gehalt, berufseinstieg, steuer, schuldenfrei, familie, digital-sicher, vorsorge-alter (je 5-6 echte Artikel-IDs, alle gegen ARTIKEL verifiziert).
Accordion-Karten mit Fortschrittsbalken + Pill (x/N), Schritt-Checkboxen, Abschluss-Verdikt bei 100%, Pfad-Reset.
FORTSCHRITT: localStorage "heiben-lernpfad" = {articleId:true/false}. Gelesene Artikel werden AUTO-angehakt (Lese-Set aus "heiben-verlauf" geparst); explizites true/false ueberschreibt. isDone(id)=state===true?true:state===false?false:verlaufSet.has(id).
DASHBOARD: schreibt heiben_results.lernpfade={t,v:"x/8 Pfade · n Artikel",u,ts}.
HUB-WIRING: studio-lebenswissen.html hat nach </header> ein Lernpfade-CTA-Banner (Link lernpfade.html).
Headless verifiziert: 8 Pfade rendern, alle Titel aufgeloest (keine Roh-IDs), Auto-Anhaken aus Verlauf, Vollabschluss->done+Verdikt, Dashboard-Write, Hub-Banner da; 0 PageErrors.

OFFEN aus Auswahl: (3) Tagesdosis Streak, (1) Mein-HeiBen-Dashboard (liest heiben_results + Karten/Artikel-Fortschritt).

## NEUES FEATURE: tagesdosis.html (SW -2947) — Feature 3/4 der Auswahl 1,2,3,6
Tägliches Ritual: Begriff des Tages (mit Antwort + EXT-Text "Mehr zum Thema") + Mini-Frage (Zuordnung Antwort->Frage, 4 Optionen) + Streak.
DATENQUELLE: web/tagesdosis-daten.js — AUTO-GENERIERT aus begriffskarten.html via gen_tagesdosis_daten.py (Kit-Root, vom Zip ausgeschlossen). Enthaelt TD_BANK (528) + TD_EXT (528). Bei Kartenaenderung: python3 gen_tagesdosis_daten.py erneut laufen lassen. tagesdosis-daten.js SELBST gehoert INS Zip (Runtime-Fetch).
DETERMINISTIK: Tagesauswahl per FNV-Hash(datum) -> idxA (Begriff), idxB (Frage), Distraktoren + Mischen ebenfalls datums-seeded -> stabil ueber Reloads, gleicher Inhalt fuer alle an einem Tag.
STREAK: localStorage "heiben-tagesdosis" {last,streak,best,total}. Vollzug zaehlt 1x/Tag (last===heute blockt Doppelzaehlung); last===gestern -> +1; sonst Reset auf 1; best/total fortlaufend. Korrektheit beeinflusst Streak NICHT (Habit-Foerderung), richtige Antwort wird aber markiert.
VERZAHNUNG: Begriff verlinkt in begriffskarten.html?kat=<k>; Footer verlinkt lernpfade + begriffskarten. begriffskarten.html-Footer hat jetzt Tagesdosis-Link.
DASHBOARD: schreibt heiben_results.tagesdosis={t,v:"<streak> Tage Serie · <total> gesamt",u,ts}.
Headless verifiziert: Aufdecken+EXT+deep-Link, Mini-Frage genau 1 correct, Done-Box, Streak 0->1, Reload kein Doppelzaehlen, gestern->+1, Luecke->Reset(1) best bleibt; Begriffskarten weiter fehlerfrei; 0 PageErrors.

ZIP-EXCLUDE ergaenzt: */gen_tagesdosis_daten.py
OFFEN aus Auswahl: (1) Mein-HeiBen-Dashboard — liest heiben_results (mietkauf, lernpfade, tagesdosis) + Karten-Mastery (heiben_karten_v1) + Lese-Verlauf; wird die zentrale Startseite/Front-Tür und bindet Tagesdosis prominent ein.

## NEUES FEATURE: mein-heiben.html (SW -2948) — Feature 4/4 KOMPLETT (Auswahl 1,2,3,6 erledigt)
Persoenliches Dashboard / Front-Tuer. Laedt tagesdosis-daten.js (TD_BANK -> Kartenzahl 528), lebenswissen-daten.js (Artikel-Titel fuer Verlauf), lernpfade-daten.js (PFADE fuer Live-Pfadfortschritt).
LIEST LIVE (kein Tool-Besuch noetig): heiben_karten_v1 (mastered{}/gewusst/bestStreak), heiben-tagesdosis (streak/best/total/last), heiben-lernpfad + heiben-verlauf (isDone-Logik wie lernpfade.html -> Pfade & Artikel), heiben_results (gespeicherte Tool-Ergebnisse).
ELEMENTE: Begruessung nach Tageszeit; Hero mit SVG-Fortschrittsring "Dein Stand" (overall = Mittel aus Karten%/Pfad-Artikel%/Tagesdosis[total/30]); Tagesdosis-Banner (offen=Verlauf-Gradient-CTA / erledigt=gruen); 3 Saeulen (Begriffskarten kMast/528, Lernpfade pfDone/8, Tagesdosis streak) mit Bars+Meta; "Weiter wo du warst" (Verlauf, top 5); "Gespeicherte Ergebnisse" (heiben_results ohne Saeulen-Dubletten lernpfade/tagesdosis -> aktuell mietkauf); Werkzeug-Grid (8 Links).
REFACTOR: PFADE aus lernpfade.html -> web/lernpfade-daten.js ausgelagert (gemeinsame Quelle, lernpfade.html laedt es jetzt via <script src>). lernpfade-daten.js gehoert INS Zip.
WIRING: Mein-HeiBen-Links in Footer von tagesdosis/lernpfade/begriffskarten + ★-Link auf studio-lebenswissen.html unter dem Lernpfade-Banner.
DATEN-KONVENTION heiben_results (von Tools gepflegt) {toolId:{t,v,u,ts}} ist jetzt etabliert; kuenftige Tools koennen dort schreiben und erscheinen automatisch unter "Gespeicherte Ergebnisse".
Headless verifiziert: leer=0% (Banner offen, Sektionen versteckt, 3 Saeulen, 8 Tools); befuellt=33% mit korrekten Live-Zahlen (100/528, 1/8 Pfade, 6/43 Artikel inkl. Auto-Zaehlung gelesener, Serie 5, Banner erledigt, Verlauf 2, Ergebnisse nur mietkauf); alle Cross-Links aufloesen; 0 PageErrors.

STATUS: Alle 4 gewaehlten Features (1 Dashboard, 2 Lernpfade, 3 Tagesdosis, 6 Mieten/kaufen) abgeschlossen.

## MEIN HEIBEN ALS STARTSEITEN-PANEL BEI ANMELDUNG (SW -2949)
index.html zeigt jetzt fuer ANGEMELDETE Nutzer (HeiBenKonto.current() != null) ein kompaktes "Mein HeiBen"-Panel direkt unter dem Hero; abgemeldet bleibt es leer (kein Eingriff in Marketing-Hero).
NEU: web/heiben-stand.js — gemeinsames Modul window.HeibenStand {compute(), panelHTML(name), mount(containerId)}. compute() liest dieselben localStorage-Quellen wie das Dashboard (heiben_karten_v1, heiben-tagesdosis, heiben-lernpfad+heiben-verlauf, optional window.TD_BANK fuer Kartenzahl / window.PFADE fuer Pfade). Kartenzahl-Fallback CARD_TOTAL_FALLBACK=528 (falls TD_BANK nicht geladen). Liefert overall%, kMast/kTot, pfDone/pfTot, artDone/artTot, streak/best/total, doneToday.
index.html-WIRING: Container <div id="meinHeibenPanel"></div> nach </header>; nach heiben-konto.js geladen: lernpfade-daten.js + heiben-stand.js + Init HeibenStand.mount('meinHeibenPanel'). Panel = dunkles Band mit SVG-Ring, Begruessung nach Tageszeit + Vorname, Zeile (Begriffe/Pfade/Serie), Tagesdosis-Chip (erledigt gruen / offen ochre-Link auf tagesdosis.html) und Button "Mein HeiBen öffnen" -> mein-heiben.html. Inline-Styles nutzen Design-Tokens (--maxw etc.), keine Stylesheet-Aenderung.
SW PRECACHE ergaenzt: lernpfade-daten.js, heiben-stand.js (beide sind nun Kern-Abhaengigkeiten von index.html -> offlinefaehig).
Headless verifiziert: abgemeldet Panel leer (HeibenStand+PFADE geladen); angemeldet (Admin-Seed u-admin) Panel mit Name "HeiBen Admin", Ring 21%, "60 von 528 · 1/8 Pfade · 4-Tage-Serie", Tagesdosis-Chip, Dashboard-Link; 0 PageErrors.
HINWEIS: heiben-stand.js CARD_TOTAL_FALLBACK (528) bei Kartenzahl-Aenderung mitziehen (oder TD_BANK auf index laden).

## NEUES FEATURE: ABZEICHEN/ERFOLGE (SW -2950) — Vorschlag-Set 1,2,3 -> 1/3
NEU web/heiben-erfolge.js: window.HeibenErfolge {BADGES, evaluate(ctx), sectionHTML(ctx,opts)}.
12 Abzeichen in 4 Gruppen: karten (5/50/halbe/alle), serie (3/7/30 Tage + 50 Tagesdosen gesamt), pfade (1/4/alle), tools (1 Geld-Werkzeug genutzt).
ctx = {kMast,kTot,best,tdTotal,pfDone,pfTot,resultCount}. WICHTIG: best = TAGESDOSIS-Serie (heiben-tagesdosis.best), NICHT die Karten-Session-Serie (ks.bestStreak). resultCount = heiben_results-Keys ohne lernpfade/tagesdosis.
Freischaltung persistiert in localStorage "heiben-erfolge" {id:ts}; "NEU"-Marke wenn Freischaltung <7 Tage her. evaluate() vergibt ts beim ersten Erfüllen.
DASHBOARD (mein-heiben.html): neue Sektion #erfolgeSec nach den Säulen; lädt heiben-erfolge.js; baut ctx aus vorhandenen Vars (best:td.best korrigiert) und rendert HeibenErfolge.sectionHTML (erspielte Medaillen + bis zu 3 "Als Nächstes" mit Fortschrittsbalken).
KONTO (konto.html): lädt lernpfade-daten.js+heiben-stand.js+heiben-erfolge.js; neues IIFE #konto-erfolge fügt (Muster wie konto-favs, via #koOut + MutationObserver) eine "Meine Abzeichen (x/12)"-Karte vor dem Abmelden-Button ein, ctx via HeibenStand.compute()+resultCount; Link -> mein-heiben.html.
SW PRECACHE ergaenzt: heiben-erfolge.js (heiben-stand.js + lernpfade-daten.js bereits drin).
Headless verifiziert: Dashboard leer=0/12 (mit "Als Nächstes"), befuellt 5-6/12 mit NEU + Fortschrittsbalken, persistiert; Konto-Karte mit Medaillen+Link; td.best-Logik (best=7 -> streak3+streak7); 0 PageErrors.

OFFEN aus Set 1,2,3: (2) Wochenrueckblick "Deine Woche bei HeiBen" (Wochen-Baseline-Snapshot, Deltas), (3) Spaced-Repetition fuer Begriffskarten (Leitner-Boxen, additive st.sr in heiben_karten_v1, Faellig-Modus + Due-Counter; greift in begriffskarten.html ein -> sorgfaeltig).

## NEUES FEATURE: WOCHENRUECKBLICK (SW -2951) — Vorschlag-Set 1,2,3 -> 2/3
NEU web/heiben-rueckblick.js: window.HeibenRueckblick {computeWeek(), cardHTML()}. Nur von mein-heiben.html genutzt (Runtime-Fetch, NICHT precached -> kein PRECACHE-Eintrag noetig).
MECHANIK ohne Zeitstempel: Speicher localStorage "heiben-wochen" = {weekKey(=Montag-Datum), baseline:{kMast,tdTotal,artDone,pfDone}, last:{deltas}|null, baselineTs}. Beim ersten Besuch einer Woche wird baseline = aktueller kumulierter Stand gesetzt (Deltas starten 0). Bei Wochenwechsel (weekKey != Montag-heute): last = aktuell - alte baseline (Zuwachs der beendeten Woche), neue baseline = aktuell. Deltas = aktuell - baseline, geclamped >=0.
metricsNow() liest heiben_karten_v1 (kMast), heiben-tagesdosis (total+streak), heiben-lernpfad+heiben-verlauf+window.PFADE (pfDone/artDone). Karten-Serie NICHT relevant; streak = aktuelle Tagesdosis-Serie.
DASHBOARD: Sektion #wocheSec nach dem Hero/Tagesdosis-Banner, vor den Saeulen. Karte "Deine Woche" mit Wochen-Range-Label (Mo–So), adaptiver Zusammenfassung, Zuwachs-Chips (+Begriffe/+Tagesdosen/+Pfad-Artikel/+Pfade, nur >0), aktueller Serie und "Letzte Woche"-Vergleichszeile.
Headless verifiziert: frische Woche (Baseline, alles 0, "noch nichts"); Zuwaechse in derselben Woche -> Chips +7/+3/+5/+1; Wochenwechsel -> this-week reset auf 0, last korrekt befuellt, neue baseline = aktuell; 0 PageErrors.

OFFEN aus Set 1,2,3: (3) Spaced-Repetition fuer Begriffskarten (Leitner-Boxen, additive st.sr in heiben_karten_v1, Faellig-Modus + Due-Counter in begriffskarten.html — groesster/riskantester Eingriff, sorgfaeltig + index-id-Schema unangetastet lassen).

## NEUES FEATURE: SPACED REPETITION (Begriffskarten) (SW -2952) — Set 1,2,3 -> 3/3 KOMPLETT
ADDITIV in begriffskarten.html, KEIN Eingriff ins Index-/Mastered-Schema. SR-Daten in heiben_karten_v1.sr = {cardId:{box,due}} (rueckwaertskompatibel: bestehende Leser ignorieren st.sr; Dashboard liest weiter mastered-Count).
LEITNER: SR_IV=[_,1,3,7,16,35] Tage fuer Box 1..5. srSchedule(id,known): known -> box=min(box+1,5), due=now+IV*Tag; "Nochmal" -> box=1, due=now (sofort wieder faellig). rate() ruft srSchedule in BEIDEN Zweigen + save().
FAELLIG-MODUS: virtuelle Kategorie "faellig". dueAll()=Karten mit sr.due<=now. buildCats() stellt "Fällig heute"-Chip mit Zaehler voran (ochre). startKat("faellig") baut Pile aus dueAll() (gemischt ueber alle Kategorien), dueTotal gesetzt. panel() + finish() haben faellig-Zweige (eigene Texte; finish zeigt KEIN "neu ueben" -> kein versehentliches mastered-Reset). catCards("faellig")=dueAll(). catLabel() Helper. ?kat=faellig Deep-Link erlaubt. startKat() blendet jetzt #scene sicher ein (deckt auch "Andere Kategorie"-Pfad ab).
DASHBOARD (mein-heiben.html): dueN aus ks.sr (due<=now). Begriffskarten-Saeule verlinkt bei dueN>0 auf begriffskarten.html?kat=faellig, meta zeigt "· N fällig", CTA "N fällig wiederholen →"; sonst normal "Öffnen →".
Headless verifiziert: JS-Syntax ok; normaler Modus Flip+Gewusst -> mastered+sr{box1,due-Zukunft}; Fällig-Chip-Zaehler korrekt (2 von 3, 1 in Zukunft); Fällig-Modus Panel + "Alles wiederholt!" + Box-Promotion k0 1->2; Deep-Link 0 faellig -> "Nichts fällig"; Dashboard-Saeule href/meta/CTA; Begriffskarten-Regression ok; 0 PageErrors.

STATUS: Vorschlag-Set 1 (Abzeichen), 2 (Wochenrueckblick), 3 (Spaced Repetition) alle abgeschlossen.

## FEINSCHLIFF (SW -2953)
- heiben-stand.js: compute() liefert jetzt dueN (faellige Wiederholungen aus ks.sr, due<=now); totes `var n` entfernt. panelHTML() zeigt bei dueN>0 einen Chip "N Karten fällig →" (Link begriffskarten.html?kat=faellig) neben dem Tagesdosis-Chip (beide in flex-wrap-Reihe). -> Startseiten-Panel (angemeldet) bewirbt jetzt auch faellige Karten.
- begriffskarten.html: Lead-Copy erklaert die Wiederholung ("Was sitzt, kommt seltener wieder; ... Tippe oben auf Fällig heute ..."). Fällig-Chip wird bei 0 faelligen dezent gedimmt (opacity:.5), bleibt klickbar.
- mieten-oder-kaufen.html: Footer bekommt Mein-HeiBen-Querverweis (color:var(--aub)) — Konsistenz mit den anderen Tools.
Headless verifiziert: Index-Panel zeigt Fällig-Chip nur bei dueN>0 (sonst nur Tagesdosis-Chip); BK-Lead + Dim-Logik (0 gedimmt, >0 normal); MoK-Footerlink; 0 PageErrors. Keine neuen Dateien -> nur SW-Bump.

## FEINSCHLIFF: TASTATUR + FOKUS (Begriffskarten) (SW -2954)
begriffskarten.html: Tastatursteuerung via document keydown — Leertaste/Enter = umdrehen (flip), Pfeil-rechts = Gewusst (rate true), Pfeil-links = Nochmal (rate false), "i" = Info-Popover (nur wenn EXT vorhanden). Guards: nur wenn #game sichtbar UND #scene sichtbar (Karte aktiv); isBtn-Check (Space/Enter werden NICHT abgefangen, wenn ein BUTTON fokussiert ist -> kein Doppel-Trigger), Pfeile wirken immer.
#card ist jetzt tastatur-fokussierbar (tabindex=0, role=button, aria-label). Neue CSS :focus-visible-Outlines (ochre) fuer .cats/.rate/.row-Buttons, .ibtn und .card3d. Neue Tastenlegende .keyhint ("Leertaste umdrehen · ← Nochmal · Gewusst →") nur auf Desktop sichtbar (@media hover:hover and pointer:fine), liegt in #game nach #rate.
Headless verifiziert: Leertaste->flip+rate; Pfeil-rechts->mastered+sr+naechste Karte; Pfeil-links->Nochmal (mastered unveraendert, rate wieder versteckt); "i"->Info offen; Maus-Klick dreht weiterhin; 0 PageErrors. Keine neuen Dateien -> nur SW-Bump.

OFFEN (Bedienungs-/Konsistenz-Runde, optional): einheitliche Footer-Querverweise (Mein HeiBen) ueber ALLE Standalone-Tools (bisher nur einige); ggf. Tastatursteuerung auch fuer wissensquiz/tagesdosis.

## FEINSCHLIFF: EINHEITLICHE FOOTER-QUERVERWEISE (SW -2955)
In 19 Standalone-Tools fehlte der "Mein HeiBen"-Footerlink; jetzt ergaenzt -> ALLE 24 Tools mit CI-Footer ("HeiBen GmbH i. G.") verlinken konsistent zurueck auf mein-heiben.html.
Geaendert: erste-wohnung, finanzcheck, finanzielle-freiheit, gehaltsverhandlung, immobilienbudget, jobwechsel, konsumcheck, reisebudget, schuldenfrei, shortcut-speedrun, sparziel, steuererklaerung, stromfresser, studium-ausbildung, tastentrainer, versicherungscheck, wahr-oder-falsch, wissensquiz, zinseszins.
EINFUEGUNG: in der <p class="foot">-Zeile direkt nach dem Claim — Muster `Heimat leben" · ` -> `... · <a href="mein-heiben.html" style="color:var(--aub)">Mein HeiBen</a> · `. WICHTIG: schliessende Anfuehrung im Footer ist ASCII " (0x22), oeffnende ist typografisch „ (U+201E); --aub ist in allen Tools definiert. Idempotent (nur wenn mein-heiben.html in der foot-Zeile fehlt). Bereits vorhanden: begriffskarten, lernpfade, mieten-oder-kaufen, tagesdosis.
Stichprobe headless (finanzcheck, wissensquiz, zinseszins, tastentrainer, versicherungscheck, immobilienbudget): Link rendert mit Text "Mein HeiBen", 0 PageErrors. Standalone-Tools nicht precached -> nur SW-Bump.

OFFEN (optional): Tastatursteuerung auch fuer wissensquiz/wahr-oder-falsch (analog Begriffskarten).

## FEINSCHLIFF: TASTATUR + FOKUS fuer QUIZ-TOOLS (SW -2956)
wissensquiz.html + wahr-oder-falsch.html bekommen Tastatursteuerung analog Begriffskarten (document keydown, Top-Level — NICHT in renderQ/render, sonst Mehrfach-Listener).
wissensquiz: Zahlen 1-9 bzw. Buchstaben a-i -> Antwortoption waehlen (nur solange !answered, n<opts.length); Enter/Leertaste -> advance (nur wenn answered; isBtn-Guard gegen Doppel-Trigger). Guards: #game sichtbar UND #qbox.innerHTML vorhanden.
wahr-oder-falsch: ArrowLeft/1/w -> choose(1)=Stimmt; ArrowRight/2/f -> choose(0)=Mythos (nur !answered); Enter/Leertaste -> advance (answered, isBtn-Guard). Guard: #game sichtbar.
Beide: neue CSS :focus-visible-Outlines (ochre) fuer Optionen/Choices/.next/.cats/.again/.row; neue .keyhint-Legende nur Desktop (@media hover:hover and pointer:fine) im #game ("1–4 Antwort · Enter weiter" bzw. "← Stimmt · → Mythos · Enter weiter").
Headless verifiziert: JS-Syntax ok; wissensquiz "1" markiert Option + #next + Enter->naechste Frage + Maus-Klick ok; wahr-oder-falsch ←/→ decken auf + #next + Enter->naechste; 0 PageErrors. Standalone-Tools nicht precached -> nur SW-Bump.

Bedienungs-Runde damit weitgehend rund: Tastatur in begriffskarten + wissensquiz + wahr-oder-falsch; einheitliche Footer-Querverweise ueberall.

## NEUES TOOL: KÖLN-HEIMAT-QUIZ (SW -2957)
NEU web/koeln-quiz.html — eigenstaendiges Quiz "Wie kölsch bist du?" zum Claim "Heimat leben". 17 Fakt-Fragen (Dom, Karneval, Kölsch/Köbes/Stange, Halve Hahn, schäl Sick, FC/Hennes, Wappen, 4711, Colonia/Agrippina, Imi, Hohenzollernbruecke, Dreigestirn, Kluengel, Einwohnerrang), pro Runde 12 zufaellig gezogen, OPTIONEN je Frage gemischt (curCorrect-Tracking). Aufdeckung richtig/falsch + Erklaerung, Kölschometer-Ergebnis (SVG-Ring %, score/12) mit 5 Dialekt-Verdikten (Imi -> Zojereiste -> Halver Kölsche -> Kölsche Jung/Mädche -> "Dem Dom sing Hätzblättche"). Tastatursteuerung (1-4/a-d waehlen, Enter weiter) + .keyhint (Desktop) + :focus-visible, analog Quiz-Tools. Kleines Dom-Zwillingsturm-SVG im Header.
SPEICHER: localStorage heiben_koeln_v1 = {best, plays}. Schreibt BEWUSST NICHT nach heiben_results (sonst wuerde das Geld-Werkzeug-Abzeichen "tool1" faelschlich triggern) — konsistent mit wissensquiz/wahr-oder-falsch.
WICHTIG/LEKTION: q- und why-Felder in BACKTICKS (wie begriffskarten-BANK), weil die Texte deutsche Anfuehrungen mit GERADEM Schluss-" enthalten, das doppelt-gequotete JS-Strings sprengt. Optionen bleiben doppelt-gequotet (keine Inneren Quotes).
WIRING: index.html #koeln-Sektion -> CTA-Link "Wie kölsch bist du? -> Heimat-Quiz" (color:--terracotta) nach dem Heimspiel-Absatz. koeln-quiz -> xlink auf wissensquiz + Ergebnis-Button "Zum Wissensquiz". Footer hat Mein-HeiBen-Link.
Headless verifiziert: JS ok; 12 Fragen/4 Optionen; Falsch markiert .wrong+zeigt .correct+why "daneben"; Voll-richtig -> 100% "Dem Dom sing Hätzblättche", Bestwert {best:12,plays:1}; Nochmal neue Runde; Maus+Tastatur; index-CTA rendert; 0 PageErrors. Standalone -> nicht precached, nur SW-Bump.

## KÖLN-QUIZ: 18 NEUE FRAGEN (SW -2958)
koeln-quiz.html BANK von 17 auf 35 Fragen erweitert (ROUND bleibt 12 -> mehr Replay-Varianz). Neu: Kölsch-Konvention 1986, 12 romanische Kirchen, Karnevalsbeginn 11.11. 11:11, Rosenmontag(szug), Bützje, Tünnes&Schäl/Hänneschen, Farina/Eau de Cologne 1709, Adenauer OB Köln, Deutz rechtsrheinisch, Veedel, Podolski (WM 2014/FC-Idol), Erzrivale Gladbach, RheinEnergieStadion Müngersdorf, Dreikönigsschrein, Dom überstand WK2, Kranhäuser Rheinauhafen, Rheinseilbahn (erste über einen Fluss in D), Kölsches Grundgesetz ("Et hätt noch emmer jot jejange").
FORMAT-REGEL eingehalten: q/why in BACKTICKS (deutsche Anfuehrungen mit geradem Schluss-" sonst Stringbruch); Optionen doppelt-gequotet OHNE innere Quotes (Phrasen ohne typografische Anfuehrung, z.B. "Drei kranförmige Hochhäuser").
Headless verifiziert: JS ok; window.BANK.length=35; 0 defekte Eintraege (q/o/a/why vollstaendig); voller 12er-Durchlauf -> 100% "Dem Dom sing Hätzblättche"; 0 PageErrors. Standalone -> nur SW-Bump.

## KÖLN-QUIZ: 20 EXPERTENFRAGEN (SW -2959)
koeln-quiz.html BANK von 35 auf 55 Fragen (ROUND bleibt 12). Neue Experten-Ebene: Rainald von Dassel (Reliquien 1164), Konrad von Hochstaden (Grundstein 1248), "Decke Pitter" (größte freischwingende Glocke), Westfassade = größte Kirchenfassade der Welt, Dom-Fertig-Volksglaube, Dionysos-Mosaik, Praetorium unterm Rathaus, Heinzelmännchen/Erbsen, Karneval-Festkomitee 1823, Rote Funken (Stadtsoldaten-Parodie), 12 Stadttore, Uni 1388, St. Gereon Dekagon, Albertus Magnus, Klosterfrau Melissengeist, Ford-Werk Niehl 1930, Warsteiner=KEIN Kölsch (Trick), WDR-Sitz, Nubbel-Verbrennung, Kölsch=ripuarisch.
Format wie gehabt: q/why BACKTICKS, Optionen doppelt-gequotet ohne innere Quotes.
Headless verifiziert: JS ok; window.BANK.length=55; 0 defekte Eintraege (inkl. a<o.length-Check); 0 doppelte Fragen; voller 12er-Durchlauf 100%; 0 PageErrors. Standalone -> nur SW-Bump.

## REBRANDING TEIL A+B — LIVE AUSGEROLLT (SW -2960)
STRATEGIE (Teil A, dokumentiert auf web/marke.html): Name "HeiBen" BLEIBT (Hein+Benkhaouda; Binnen-B in Terrakotta = Markenzeichen "Bruecke zwischen den Familien"). Claim "Heimat leben" BLEIBT (Alternativen dokumentiert/verworfen: "Wissen wohnt hier." / "Heimat ist ein Verb." — letzteres lebt als Sekundaerzeile im index-Footer weiter). Persoenlichkeit: geerdet, warmherzig, verlaesslich, neugierig, koelsches Augenzwinkern.
PALETTE NEU (globaler Hex-Rollout, 94 Dateien, 747 Ersetzungen): --terra #c2533a -> #b04a31 (WCAG: 5,34:1 Papier / 4,70:1 Sand — Alt scheiterte auf Sand 3,96); --ochre #d29939 -> ALTGOLD #a97a1d (3,76:1 Papier statt 2,47; 4,44:1 auf Tinte). rgba-Tupel mit ersetzt: 194,83,58->176,74,49 (44x), 210,153,57->169,122,29 (4x). Alle anderen Toennungen unveraendert. AUSGENOMMEN: three.min.js, assets/GLTFLoader.js. REGEL (marke.html): Altgold NIE fuer Fliesstext, nur Labels/grosse Typo/Grafik.
NEUES SIGNET "Giebel ueber dem Strom" (Dach=Heimat + Rheinwelle in Terra): assets/favicon.svg NEU (precached, index-<head> als svg-icon vor png-Fallback); ALLE PNG-Icons neu gerendert via PIL-Generator (gleiche Dateinamen: favicon-32/192/512, maskable-192/512 mit 22% Safe-Zone-Pad, apple-touch-icon 180, icon-source-1024) — Motiv: Tinte-Grund, Papier-Giebel, Terra-Welle. hero-*.png und monogram-*.png (ungenutzt) NICHT angefasst.
INDEX: Nav-Lockup = Signet-SVG (inline, 64x54 viewBox) VOR bestehender Wortmarke in <a class="brand"> (.brand svg{height:30px} greift); Wortmarken-tspans via Hex-Rollout automatisch auf #b04a31; Footer-brand-block: neuer Link "Markenhandbuch ->" (marke.html) unter "Unsere Geschichte".
NEU web/marke.html — lebendes Markenhandbuch (nicht precached, Runtime): Teil A (Markenkern/Name/Claim/Persoenlichkeit/Tonalitaet Do-Dont), Logo-System (4 Varianten inkl. dunkel+mono, Konstruktions-/Schutzraum-Regel), 12 Farb-Swatches mit Kontrastwerten + Aenderungsbegruendung, Typo-Skala, Komponenten-Board (Buttons/Pills/Medaille/Quiz-Option/Ring/dunkles Band), Co-Branding/White-Label-Regel (Partnerfarben nur in Akzent-Slots; Partner-Theme = ein :root-Block).
VERIFIZIERT headless: computed --terra/#b04a31 + --ochre/#a97a1d auf finanzcheck/begriffskarten/koeln-quiz/mein-heiben; index Nav 2 SVGs, tspan #b04a31, favicon.svg-Link, marke-Link, Login-Panel + Ring-Stroke neu; marke.html 7 Sektionen/12 Swatches/4 Logoboxen; alle 6 Icon-Assets HTTP 200; Regression ueber 12 weitere Seiten; JS-Syntax aller Kern-Module; GESAMT 0 PageErrors.
OFFEN: Teil C (B2B-Review/Geschaeftsmodell-Anpassung) noch nicht beauftragt umgesetzt.

## REBRANDING TEIL C — GESCHAEFTSMODELL-REVIEW (SW -2961) — Rebranding A/B/C damit KOMPLETT
NEU web/strategie.html — interne Review-Seite im neuen CI (nicht precached, Runtime): C1 Ist-Bewertung (zahlt heute: niemand; 3 schwaechste Annahmen benannt: Reichweite!=Qualitaet, Praevention zahlt nicht, 5 Welten=5 Baustellen; staerkste Assets: lokal=DSGVO-USP, Token-Theming=White-Label-faehig, Engagement-Metriken, Heimat-Glaubwuerdigkeit). C2 Kuerzungen: 5 Welten -> 2 Saeulen (Wissen&Werkzeuge + Immobilien; Reisen/Kulinarik nur noch redaktioneller Stoff), B2C-Plus EINGEFROREN (Preisanker, kein Vertrieb), native Apps VERSCHOBEN bis 1. B2B-Referenz. C3 vier B2B-Wege mit Zielkunde/Nutzen/Preis/Aufwand/Risiko: A White-Label Genossenschaften/Regionalbanken (7.500 Setup + 690/Monat je Marke), B Mitarbeiter-Benefit Mittelstand (2 EUR/MA/Monat, min 99), C Makler-/Bautraeger-Suite (149/Monat + 490 Setup), D Kommune/Bildungstraeger "Ankommen in Koeln" (Projekte 3-15k) + Wirkung/Aufwand-Matrix (CSS-Dots). C4 EMPFEHLUNG (dunkles Verdikt-Band): Weg A zuerst, Zielmarkt Wohnungsgenossenschaften+Genossenschaftsbanken Rheinland (Claim woertlich, DSGVO-Kriterium, Theming=Stunden, Familien-/Genossenschafts-DNA); 90-Tage-Plan in 3 Phasen (1-30 Demo-Mandant "Rheinwohnen eG"+25er-Liste+10 Gespraeche; 31-60 zwei Piloten Setup-erlassen gegen Fallstudie; 61-90 erste zahlende Jahreslizenz+Referenz) mit KPI-Zeile. C5 Konsistenz-Check: A/B bestaetigt, einzige Ergaenzung B2B-Descriptor "HeiBen · Wissen fuer Zuhause".
WIRING: index-Footer brand-block neuer Link "Geschäftsmodell ->" unter Markenhandbuch; marke.html-Footer verlinkt strategie.html.
Headless verifiziert: strategie.html 5 Sektionen/4 Wege/4 Matrix-Punkte/1 Verdikt/3 Phasen; Links auf index+marke; 0 PageErrors.

## NEUE SEITE: WHITE-LABEL-DEMO "RHEINWOHNEN EG" (SW -2962) — 90-Tage-Plan Phase 1
NEU web/partner-demo.html (Standalone, nicht precached): lebender Verkaufsbeweis fuer Weg A. Drei-Wege-Umschalter: HeiBen (Standard) / Rheinwohnen eG (Petrol #1f6f6b + Label #5d7a2f, beide AA-geprueft) / "Ihre Farbe" via <input type=color>. apply() setzt --terra/--ochre auf documentElement.style (Seite nutzt ueberall var()); bei Custom wird der Label-Ton via HSL abgeleitet (deriveLabel: s*0.9, l*0.72 min 0.16).
BAUSTEINE: Co-Branding-Lockup nach Markenhandbuch (HeiBen-Signet+Wortmarke links FIX in Markenfarben, Trennlinie, rechts Partner-Logo-Slot: gestrichelter "Ihr Logo"-Platzhalter bzw. generiertes Partner-Signet Haus-Piktogramm in Partnerfarbe); Komponenten-Board live eingefaerbt (Akzent-Button, Pill, Link, Fortschrittsring); dunkles Dashboard-Band mit Titel-Wechsel ("Mein Rheinwohnen-Stand"); LIVE-:root-CODEBLOCK (#code, aktualisiert je Theme — "Ein Theme ist ein Block"); AA-KONTRAST-BADGE (#aa): WCAG-Ratio Primaer-auf-Papier in JS berechnet, gruen >=4.5 sonst Burgund-Warnung "zu hell fuer Text"; Preiszeile Weg A + Links strategie/marke.
WIRING: strategie.html Phase-1-Absatz -> "Zur lebenden Demo ->"; marke.html Co-Branding-Karte -> "Lebende Demo Rheinwohnen eG ->"; Demo-Footer verlinkt strategie+marke+index.
Headless verifiziert: Start HeiBen 5,3:1 AA+Platzhalter; Rheinwohnen --terra #1f6f6b, Logo+Name, Band-Titel, Codeblock-Hex, 5,8:1 AA; Custom #14508c -> Label #133a60, Badge ok; Warnfall #ffd28a -> badge warn "ZU HELL FUER TEXT"; Ruecksprung HeiBen sauber; Links auf strategie+marke; JS-Syntax; 0 PageErrors.

## NEUES WISSENSGEBIET: PFLANZEN-KOMPENDIUM (SW -2963)
Eigenes datengetriebenes Gebiet (wie Kulinarik), BERUEHRT NICHT die Artikel-Suche/lebenswissen.
NEU web/pflanzen-daten.js: window.PFLANZEN (42 Pflanzen) + PFL_KAT/PFL_ENV/PFL_ZW Labels. Schema je Pflanze: {id,n,lat,kat,env[],zw[],licht,wasser,boden,temp,feuchte,duenger,aussaat,ernte,pflege,deko,begleiter,fehler,tipp,giftig,schwer1-3}. ALLE Textwerte in BACKTICKS (robust). Abdeckung: env garten28/gewaechshaus14/indoor25, zweck anbau27/deko26; kat gemuese/kraut/obst/zier/zimmer/sukkulente/gruen/orchidee. Inhalt: Gemuese (Tomate/Gurke/Paprika/Zucchini/Moehre/Radieschen/Salat/Buschbohne/RoteBete/Kartoffel/Gruenkohl/Aubergine), Kraeuter (Basilikum/Petersilie/Schnittlauch/Rosmarin/Thymian/Minze/Lavendel/Kraeuterfenster), Obst (Erdbeere/Himbeere/Zitrus/Physalis), Zier (Rose/Hortensie/Tulpe+Narzisse/Sonnenblume/Geranie), Zimmer (Monstera/Efeutute/Bogenhanf/ZZ/Gruenlilie/Einblatt/Geigenfeige/Kentia/Orchidee), Sukkulenten (Aloe/Echeverie/Kaktus), plus Anzucht&Jungpflanzen.
NEU web/pflanzen.html (Standalone, nicht precached, laedt pflanzen-daten.js): filterbares Kompendium. Sticky Controls: Chips env (Alle/Garten/Gewaechshaus/Indoor) + zweck (Alle/Anbau/Deko) + kat-<select> + Suchfeld (n/lat/kat). Grid aus Karten; Klick -> Steckbrief-Panel (#detail) oben mit Badges (env/zweck/kat/Schwierigkeit/Giftwarnung), Fakten-<dl> (nur gefuellte Felder) und hervorgehobenem HeiBen-Tipp; Schliessen-Button; scrollt in Sicht. :focus-visible ueberall. isGiftig() blendet Warnung nur bei echter Giftigkeit ein. Blatt-SVG im H1, Footer Mein-HeiBen-Link.
WIRING: studio-lebenswissen.html Wissens-Hub -> neues Banner "Pflanzenwissen" direkt unter dem Lernpfade-Banner (bg-deep-Karte, gleicher Stil).
Headless verifiziert: daten+ui JS ok; 42 Pflanzen, 0 defekt, 0 dup-id, alle kat bekannt; Start 42/42; Filter Indoor+Deko=19; Suche monstera=1; Detail 11 Faktenzeilen+Tipp; schliessbar; Hub-Link; 0 PageErrors.
HINWEIS: erweiterbar — weitere Pflanzen einfach als Objekt an PFLANZEN anhaengen (Backticks!). Kandidaten fuer Ausbau: Kuebel-Obst, Wasserpflanzen, Zwiebelblumen, Balkon-Gemuese, Zimmerpflanzen-Vertiefung.

## PFLANZEN-KOMPENDIUM: +42 (jetzt 84) (SW -2964)
pflanzen-daten.js von 42 auf 84 Pflanzen verdoppelt (window.PFLANZEN). Neue 42: Gemuese(13) spinat/mangold/zwiebel/knoblauch/lauch/kohlrabi/brokkoli/erbse/stangenbohne/kuerbis/feldsalat/rucola; Kraeuter(7) salbei/oregano/dill/koriander/zitronenmelisse/estragon/kapuzinerkresse; Obst(8) johannisbeere/heidelbeere/apfel/brombeere/rhabarber/feige/weinrebe/stachelbeere; Zier(8) dahlie/clematis/buchsbaum/hosta/fuchsie/tagetes/pfingstrose/ziergras; Zimmer/Gruen(6) philodendron/gummibaum/drachenbaum(gruen)/calathea/pilea; Sukkulenten(2) geldbaum/weihnachtskaktus. Alle Backticks, gleiches Schema/Tiefe.
Verteilung jetzt: kat gemuese25/kraut15/obst12/zier12/zimmer11/gruen2/orchidee1/sukkulente5; env garten62/gewaechshaus17/indoor36; zweck anbau55/deko48. Giftig-Flags & haustierfreundlich (calathea/pilea/gruenlilie/kentia/weihnachtskaktus) gepflegt.
Headless verifiziert: daten JS ok; 84 Pflanzen, 0 defekt (inkl. licht/wasser/tipp-Pflichtcheck), 0 dup-id, alle kat/env/zw gueltig; UI Start 84/84, Indoor-Filter, Suche+Detail, 0 PageErrors. UI/pflanzen.html unveraendert (rein datengetrieben).

## PFLANZEN: KATEGORIEN VERVOLLSTAENDIGT + NEUE KATEGORIE BAEUME & STRAEUCHER (SW -2965)
pflanzen-daten.js von 84 auf 139 Pflanzen. PFL_KAT um baum:"Bäume & Sträucher" erweitert (UI kat-<select> nimmt sie automatisch auf).
CHARGE 1 (+32, bestehende Kategorien aufgefuellt): Gemuese +8 (blumenkohl,weisskohl,rosenkohl,sellerie,fenchel,pastinake,zuckermais,melone); Kraeuter +6 (bohnenkraut,kerbel,liebstoeckel,kamille,kresse,baerlauch); Obst +5 (kiwi,aronia,sanddorn,preiselbeere,jostabeere); Zier +5 (sonnenhut,rittersporn,stiefmuetterchen,storchschnabel,astilbe); Zimmer +4 (zimmerfarn,zimmerefeu,bromelie,dieffenbachie); Gruen +2 (yucca,areca); Sukkulenten +2 (haworthia,hauswurz).
CHARGE 2 (+23, NEUE kat "baum"): Obst-/Nussbaeume (kirsche,birne,pflaume,walnuss,haselnuss,quitte), Zierbaeume (ahorn,birke,magnolie,zierkirsche), Zier-/Heckenstraeucher (flieder,forsythie,kornelkirsche,kirschlorbeer,liguster,eibe,rhododendron,buddleja,hibiskus,hamamelis,felsenbirne,hartriegel,spierstrauch).
Verteilung: gemuese33/kraut21/obst17/zier18/zimmer15/gruen4/orchidee1/sukkulente7/baum23. env garten~112/gewaechshaus/indoor; giftige Gehoelze klar gewarnt (eibe,kirschlorbeer,rhododendron,liguster-Beeren,flieder); oekologische Hinweise (Forsythie insektenarm -> Kornelkirsche-Alternative; Kirschlorbeer -> Eibe).
Alle Backticks, gleiches Schema/Tiefe; UI/pflanzen.html unveraendert (rein datengetrieben, PFL_KAT-Label reicht).
Headless verifiziert: daten JS ok; 139 Pflanzen, 0 defekt (licht/wasser/tipp-Pflicht), 0 dup, alle kat/env/zw gueltig; Filter zeigt "Bäume & Sträucher" (23), Detail+Badge+Suche(walnuss) ok; 0 PageErrors.
OFFEN/optional: orchidee weiterhin nur 1 Eintrag (Nische) — bei Bedarf Cymbidium/Dendrobium ergaenzen.

## PFLANZEN: ORCHIDEEN KOMPLETT + SAISON-INTELLIGENZ (SW -2966)
DATEN (pflanzen-daten.js, jetzt 144): Orchideen von 1 auf 6 — cymbidium (Kaeltereiz Herbst), dendrobium (kuehl-trockene Winterruhe sonst Kindel), frauenschuh (nie austrocknen, Nordfenster), oncidium (Pseudobulben-Barometer), vanda (substratlos, schwer 3). Alle mit feuchte-Feld.
SAISON-FEATURE (pflanzen.html): Neue Filterzeile "Saison · <Monat>" mit Chips "Jetzt säen & pflanzen (N)" / "Jetzt ernten (N)" (Zaehler live fuer aktuellen Monat). monthsFrom(text)-Parser leitet Monats-Sets aus aussaat/ernte-Freitext ab: volle Monatsnamen + Abkuerzungen (Jan./Feb./Mrz./Apr./Jun./Jul./Aug./Sep./Sept./Okt./Nov./Dez. mit Punkt), Bereiche via "–"/"-"/"—" oder wenn Zwischentext auf "bis" endet (fill mit Jahres-Wrap), Jahreszeiten (\bFruehjahr/Fruehling 3-5, Fruehsommer 6, Sommer 6-8, Spaetsommer 8-9, Herbst 9-11, Winter 12-2; \b verhindert Treffer in Sommerhimbeeren/Herbsthimbeeren), "ganzjaehrig" = alle. Vorberechnung p._sa/p._er beim Laden; window.PFL_DEBUG={monthsFrom,CUR} fuer Tests. match() um saison erweitert; Steckbrief-Badges "Jetzt säen/pflanzen" (good) / "Jetzt ernten" (ochre) wenn aktueller Monat enthalten.
Abdeckung (ehrlich): 111 Eintraege mit aussaat-Text, 68 mit erkennbaren Monaten; 80 ernte-Texte, 52 geparst — Rest sind bewusst monatslose Texte (Stauden "Als Pflanze", Zimmerpflanzen). Bekannte milde Grenze: "ab X"-Formulierungen ergeben nur X (z.B. Kartoffel "ab Juni" -> Juli fehlt).
WIRING: mein-heiben.html Werkzeug-Grid + {u:"pflanzen.html",n:"Pflanzenwissen",d:"Anbau & Deko — Garten bis Indoor"} (jetzt 9 Werkzeuge).
Headless verifiziert (Juli): Parser-Stichproben (Feb.–Maerz+Mai / Mai bis Juli->5,6,7 / Sept.–Nov. / ganzjaehrig=12 / Nov+Winter / Juni/Juli+Aug–Okt) alle korrekt; Chips "SAISON · JULI", saeen 19 / ernten 21; Zucchini in ernten, Feldsalat NICHT in saeen; Tomate-Detail zeigt JETZT ERNTEN (kein Saeen-Badge); Orchideen-Filter 6; Werkzeug-Link; JS beide ok; 0 PageErrors.

## PFLANZEN: "MEIN GARTEN" MERKLISTE (SW -2967)
pflanzen.html: persoenliche Merkliste. SPEICHER localStorage heiben_pflanzen_v1={merk:{id:1}}. BEWUSST KEIN heiben_results-Eintrag (wuerde wie beim Koeln-Quiz das tool1-Geldwerkzeug-Abzeichen faelschlich triggern).
UI: Stern-Button auf jeder Karte (absolut oben rechts, stopPropagation — oeffnet NICHT das Detail; aria-label wechselt) + "★ Gemerkt / ☆ Merken"-Knopf im Steckbrief-Kopf (curDetailId-Sync, Text+Farbe live). Chip "★ Mein Garten (N)" in der Art&Suche-Zeile toggelt state.mein (eigener Toggle, KEIN data-f-Gruppenchip); match() filtert auf MERK. Leere Merkliste bei aktivem Filter -> eigener Empty-Text ("Noch nichts gemerkt — tippe das ☆ ...").
GARTEN-HINWEIS #gartenHint (gestrichelte Ochre-Karte ueber dem Grid, nur bei aktivem Mein-Garten mit Eintraegen): "Im <Monat> in deinem Garten: X zum Säen/Pflanzen · Y zum Ernten" — nutzt die Saison-Sets (_sa/_er) NUR ueber die gemerkten Pflanzen.
WICHTIGER REFAKTOR: .pc von <button> zu <div tabindex=0 role=button> (kein verschachtelter Button); Klick + Enter/Leertaste oeffnen Detail; Fokus-Stile erhalten; .n bekommt padding-right fuer den Stern.
Headless verifiziert: Chip 0->1 via Stern (Detail bleibt zu, Stern .on); Detail-Knopf toggelt beidseitig inkl. Chip; 2 gemerkte -> Mein-Garten-Ansicht 2 Karten + Hinweis "Im Juli ... 1 zum Säen/Pflanzen · 1 zum Ernten" (Radieschen saet, Tomate erntet — korrekt); Reload persistiert (2); Enter oeffnet Detail; Empty-Sondertext; ui JS ok; 0 PageErrors.

## BEGRIFFSKARTEN-CHARGE "GARTEN & PFLANZEN" (SW -2968) — "Beides" Teil 2
Bestehende Kategorie botanik ("Pflanzen & Garten") von 13 auf 29 Karten erweitert (KEINE neue Kategorie). 16 Praxiskarten NUR ans BANK-Ende angehaengt (Index-IDs stabil: k0..k527 unveraendert, neu k528..k543): Ausgeizen, Eisheiligen, Mischkultur, Lichtkeimer, Starkzehrer, Staunaesse, Anhaeufeln, Pikieren, Vergeilen, Fruchtfolge, Winterruhe(Kuebel), Spalier, Abhaerten, Moorbeet, winterhart, Basilikum-von-oben-ernten. Bewusst KEINE Dubletten zu vorhandenen botanik-Karten (Gruenduengung/Humus/Welken schon vorhanden). Karten {k:"botanik",t:`Frage?`,d:`kurz`} in Backticks; je ein EXT-Langtext (2-3 Saetze) einzeilig vor schliessender }; von EXT (Z111) angehaengt, Key EXAKT = card.t inkl. deutscher Anfuehrungen/Fragezeichen. 544/544 EXT-Abdeckung, 0 Waisen, 0 Dubletten.
GENERATOR: python3 gen_tagesdosis_daten.py neu ausgefuehrt -> web/tagesdosis-daten.js TD_BANK=544, TD_EXT=544, botanik 29.
ZAHL-UPDATES 528->544: heiben-stand.js CARD_TOTAL_FALLBACK; heiben-erfolge.js 2x c.kTot||544; konto.html kTot:544; mein-heiben.html BANK.length||544 + "544 Begriffe zum Lernen"; strategie.html "544 Begriffskarten"; partner-demo.html + marke.html "60 von 544 Begriffen". (Base64-Bild-Treffer in index/familie/studio/studio-magazin BEWUSST nicht angefasst.)
Headless verifiziert: BANK 544 / botanik 29 / Label "Pflanzen & Garten" / k0 stabil / Moorbeet-EXT vorhanden; TD_BANK+TD_EXT 544; mein-heiben zeigt 544; begriffskarten+tagesdosis+mein-heiben+konto je 0 PageErrors.
OFFEN: "Beides" Teil 1 (Mein-Garten -> Dashboard/Startseiten-Panel mit Abzeichen-Ausnahme) noch NICHT umgesetzt. Plan steht: pflanzen.html syncResults() schreibt heiben_results.pflanzen (nur >0, loeschen bei 0) in toggleMerk+Load; resultCount-Filter in mein-heiben.html UND konto.html um &&k!=="pflanzen" erweitern; heiben-stand.js compute() liest heiben_pflanzen_v1->gartenN, panelHTML Statistikzeile bedingt "+ N Pflanzen im Garten".

## MEIN GARTEN -> DASHBOARD + PANEL (SW -2969) — "Beides" damit KOMPLETT
TEIL 1 umgesetzt wie geplant:
pflanzen.html: neue syncResults() nach saveMerk() — schreibt heiben_results.pflanzen={t:"Mein Garten",v:"N Pflanze(n) gemerkt" (Singular/Plural!),u:"pflanzen.html",ts} NUR bei Aenderung (v-Mismatch-Check, ts bleibt sonst stabil); bei n=0 wird der Key GELOESCHT. Aufrufe: in toggleMerk (nach saveMerk) + einmal beim Laden (heilt Alt-Merklisten).
ABZEICHEN-AUSNAHME: resultCount-Filter um pflanzen erweitert in mein-heiben.html Z~236 (&&k!=="pflanzen") UND konto.html Z~895 (&&k!=='pflanzen', single quotes!). Ergebnis-ANZEIGE (mein-heiben Z~222) bewusst NICHT gefiltert -> "Mein Garten"-Karte erscheint unter Gespeicherte Ergebnisse und verlinkt pflanzen.html.
heiben-stand.js: compute() liest heiben_pflanzen_v1.merk -> gartenN (im Return); panelHTML-Statistikzeile bedingt erweitert: "... X-Tage-Serie · N Pflanze(n) im Garten" nur bei N>0, mit Singular/Plural.
E2E verifiziert: (A) Merken 1->"1 Pflanze gemerkt", 2->"2 Pflanzen gemerkt", zurueck->Singular, 0->Key geloescht; (B) mein-heiben zeigt res-Karte "Mein Garten" (href pflanzen.html, v-Text) und heiben-erfolge enthaelt tool1 NICHT bei nur-pflanzen, WOHL nach zusaetzlichem mietkauf-Ergebnis; (C) index-Panel (eingeloggt) zeigt "3 Pflanzen im Garten", Singular "1 Pflanze im Garten", ohne Merkliste KEIN Segment; node --check heiben-stand.js + pflanzen-UI ok; 0 PageErrors ueber alle Szenarien.

## NEUES KOMPENDIUM: SELBERMACHEN — HAUSHALT & KLEINE REPARATUREN (SW -2970)
KONTEXT: Container wurde zwischen zwei Turns ZURUECKGESETZT; Arbeitsbaum aus /mnt/user-data/outputs/heiben_kit.zip (Stand -2969) wiederhergestellt (cd /home/claude && unzip). ACHTUNG: gen_tagesdosis_daten.py war vom Zip ausgeschlossen und ist damit VERLOREN — vor der naechsten Begriffskarten-Charge neu schreiben (liest BANK+EXT aus begriffskarten.html, schreibt web/tagesdosis-daten.js mit TD_BANK/TD_EXT; Format siehe tagesdosis-daten.js Kopf). Playwright/Browsers sind Teil des Images (/opt/pw-browsers) und ueberleben Resets.
THEMENWAHL (begruendet): "Selbermachen — kleine Reparaturen & Haushaltspflege" = woertlich "Wissen fuer Zuhause", Gegenstueck zum Pflanzen-Kompendium (drinnen statt draussen) und DIREKT vertriebsrelevant fuer Weg A (Wohnungsgenossenschaften: Mieterwissen Abfluss/Schimmel/Heizung/Rauchmelder/Wasserschaden inkl. konsequenter "Vermieter melden"-Hinweise).
NEU web/haushalt-daten.js: window.HAUSHALT (31) + HH_KAT (7: bad6 kueche5 waende7 strom2 heizung4 wasch3 sicherheit4) + HH_ZW {rep,pflege,vorb}. Schema {id,n,kat,zw[],zeit:`Label`,zeitMin:Zahl,schwer1-3,kosten,werkzeug,material,schritte:[3-5 Backtick-Strings],fehler,sicherheit(opt,8x),profi(opt,13x),tipp}; alles Backticks. Sicherheitslinien bewusst hart: Chlor nie mischen, zweipoliger Spannungsprüfer (Phasenpruefer reicht NICHT), Flusensieb erst Wasser ablassen, nie Messer ans Eis, Haupthahn HEUTE suchen, Netzbetreiber statt 112.
NEU web/haushalt.html (NICHT precached, laedt haushalt-daten.js): pflanzen-Muster. Wozu-Chips (data-f="zw"), Quick-Toggle #quickChip "Unter 15 Minuten (18)" (zeitMin<=15, KEIN data-f), #kat-Select (7 Bereiche), Suche (n+kat+werkzeug+material). Karten als div tabindex=0 role=button (Enter/Space), Meta kat·zeit·schwer + rotes ⚠ bei sicherheit. Steckbrief: Badges (kat/zw/zeit/schwer/kosten), dl Werkzeug/Material (nur wenn gefuellt), "So geht's" als <ol class=steps>, Boxen: Haeufiger Fehler (terra-Label), Sicherheit (.box.sich burg, konditional), "Profi oder Vermieter?" (.box.profi aub, konditional), HeiBen-Tipp (gestrichelt ochre). Footer Mein-HeiBen+Start.
WIRING: studio-lebenswissen.html bg-deep-Banner "Selbermachen" direkt unter Pflanzenwissen-Banner (Anker: dessen `</a>` + mein-heiben-Zentrierzeile); mein-heiben.html Werkzeug-Grid + {u:"haushalt.html",n:"Selbermachen",...} nach pflanzen-Zeile (jetzt 10 Werkzeuge).
Headless verifiziert: Daten 31/0 defekt/0 dup, kat+zw gueltig, alle schritte>=3; UI 31/31, Reparieren 17, Quick 18, Bad 6, Suche "duebel" 2; Duebel-Detail 5 Schritte + Sich- + Profibox + Tipp; Symbole ohne Boxen (0/0); Enter oeffnet; Hub-Banner 1, Werkzeug-Link 1; ui-JS ok; 0 PageErrors.
OPTIONAL naechste Chargen: Fahrrad/Keller/Balkon-Aufgaben, "Umzugs-Checkliste" als eigener zw, Verknuepfung einzelner Aufgaben mit passenden Lebenswissen-Artikeln.

## NEUES KOMPENDIUM: LEBENSMITTEL-WISSEN "Kann ich das noch essen?" (SW -2971)
THEMENWAHL: schliesst Alltagsluecke zwischen Pflanzen (Anbau) und Selbermachen (Wohnung); universeller Nutzen + Weg-A-Mitgliedermehrwert (Anti-Food-Waste).
NEU web/lebensmittel-daten.js: window.LEBENSMITTEL (37) + LM_KAT (6: obst8 gemuese9 milch5 fleisch4 vorrat7 reste4) + LM_ORT (kuehl/raum/dunkel/gefrier). Schema {id,n,kat,ort,kuehlfalle(opt true),haltbar,mhd(opt),lagern,frisch,einfrieren(opt),trennen(opt),rest(opt),warn(opt),tipp}; alles Backticks. Verteilung Merkmale: 12 kuehlfalle, 9 mhd, 8 warn, 14 einfrieren, 9 trennen(Ethylen), 13 rest. Sicherheits-Warnungen fachlich: Solanin(Kartoffel), rohe Eier/Salmonellen, Hack, Bacillus cereus(Reis schnell kuehlen/1 Tag), Bombage(Konserven), Honig<1 Jahr(Botulismus), Gefluegel-Tauwasser.
NEU web/lebensmittel.html (NICHT precached, laedt lebensmittel-daten.js): pflanzen/haushalt-Muster. Ort-Chips (data-f="ort": alle/kuehl/raum/dunkel), Kuehlfalle-Toggle #fallChip "Kühlschrank-Irrtum (12)" (KEIN data-f), #kat-Select (6), Suche (n+kat). Karten div tabindex=0 role=button (Enter/Space), Meta kat·ort + rotes "❄ Irrtum". Steckbrief: Badges (ort/kat/[Irrtum]), feste Sektionen Haltbarkeit/So lagern/Frisch-oder-hin (frisch=gruen), konditionale Boxen mhd(ochre)/warn(burg)/trennen(moss)/einfrieren(aub)/rest(good), HeiBen-Tipp gestrichelt. Footer Mein-HeiBen+Start.
WIRING: studio-lebenswissen.html bg-deep-Banner "Kann ich das noch essen?" unter Selbermachen-Banner (Anker gleiche `</a>`+mein-heiben-Zeile); mein-heiben.html Werkzeug-Grid + {u:"lebensmittel.html",...} nach haushalt-Zeile (jetzt 11 Werkzeuge).
Headless verifiziert: Daten 37/0 defekt/0 dup, kat+ort gueltig; UI 37/37, Kühlschrank 19, Irrtum 12, Vorrat 7, Suche avocado 1; Avocado-Detail 3 Sektionen+Irrtum-Badge+Trenn-+Restbox; Eier mhd+warn; Milch ohne Warnbox(0); Enter oeffnet; Hub-Banner 1, Werkzeug-Link 1; ui-JS ok; 0 PageErrors.
ERINNERUNG (offen seit -2970): gen_tagesdosis_daten.py fehlt weiterhin (Container-Reset); vor naechster Begriffskarten-Charge neu schreiben.

## NEUES KOMPENDIUM: PAPIERKRAM "Ordnung im Papierkram" (SW -2972)
THEMENWAHL: loest Backlog-Idee "Dokumenten-Checklisten" ein; zurueck zur Finanz-DNA; null Haftungsrisiko; Weg-A-Mehrwert (Mieter-Papierkram). Deckt via frist-Feld auch Teile der Backlog-Idee "Vertrags-Radar" ab.
NEU web/papierkram-daten.js: window.PAPIERKRAM (31) + PK_KAT (6: geld7 wohnen5 vertraege5 versicherung4 arbeit4 familie6) + PK_TYP (lebenslang11/jahre12/laufend8). Schema {id,n,kat,typ,dauer:`Klartext`,warum,ablage,digital,entsorgen(opt,8x),frist(opt,9x),warn(opt,5x),tipp}; alles Backticks. Rechtsangaben konservativ ("in der Regel/meist"): §14b-2-Jahre-Pflicht Handwerker (+5J Bauwerks-Gewaehrleistung, nie bar wegen Steuerbonus), 12-Monats-Einwendung Nebenkosten, 6-Monats-Verjaehrung Vermieteransprueche (implizit), TK-Vertraege monatlich/1 Monat nach Mindestlaufzeit, Faire-Verbrauchervertraege-Monatskuendigung (fitness/abo), Grundversorgung 2 Wochen + Sonderkuendigung Preiserhoehung, Kfz-Stichtag 30.11., Vorsorgeregister, Testament amtliche Verwahrung. Warnboxen: handwerker(Pflicht/Bussgeld), kfz(Brief NIE im Auto), rente(Kontenklaerung), vorsorge(Auffindbarkeit), testament(NICHT Bankschliessfach). Herzstueck-Eintrag: notfallordner.
NEU web/papierkram.html (NICHT precached): Serien-Muster. Typ-Chips (data-f="typ"), Frist-Toggle #fristChip "Frist beachten (9)", #kat-Select, Suche (n+kat). Karten mit ⏰-Marker; Steckbrief: Badges typ(aub)/kat/[⏰Frist terra], 4 feste Sektionen (Wie lange [dauer in <b> terra] / Warum es zaehlt / Ablage / Digital oder Original?), konditionale Boxen frist(ochre)/warn(burg)/entsorgen(.box.weg moss "Richtig entsorgen"), HeiBen-Tipp. Schredder-Mantra in lead + entsorgen-Feldern.
WIRING: studio-lebenswissen.html Banner unter Lebensmittel-Banner (gleicher Anker); mein-heiben.html Werkzeug-Grid nach lebensmittel-Zeile (jetzt 12 Werkzeuge).
Headless verifiziert: Daten 31/0/0, kat+typ gueltig; UI 31/31, Lebenslang 11, Frist 9, Familie 6, Suche testament 1; Testament 4 Sektionen+Warn ohne Frist; Handy Frist ohne Warn; Kontoauszuege Entsorgen-Box; Enter oeffnet; Hub 1, Werkzeug 1; ui-JS ok; 0 PageErrors.
SERIE "Wissen fuer Zuhause" jetzt 4 Kompendien: pflanzen(144), haushalt(31), lebensmittel(37), papierkram(31). ERINNERUNG: gen_tagesdosis_daten.py fehlt weiterhin.

## NEUES KOMPENDIUM: SICHER IM NETZ (SW -2973)
THEMENWAHL: verlaengert den Identitaets-/Schredder-Schutz aus Papierkram ins Digitale; Betrugsschutz = Geldschutz (HeiBen-DNA); Weg A: Senioren in Genossenschaften = Hauptzielgruppe von Schockanruf/Phishing — Genossenschaft verschenkt Schutzwissen.
NEU web/digital-daten.js: window.DIGITAL (32) + DS_KAT (6: betrug9 konto5 zugang5 geraete5 daten4 familie4) + DS_TYP (masche10/schutz22). Schema {id,n,kat,typ,senior(opt,9x),kurz,lage,erkennen,schutz:[3-5 Schritte],notfall(opt,12x),tipp}; alles Backticks. Fachliche Anker: 116 116 (+49 aus Ausland, KUNO), 8-Wochen-Lastschrift (13 Monate ohne Mandat), Bank fragt NIE nach TAN/PIN + TAN=Unterschrift-Lesen, Polizei will nie Geld/keine Kaution/110 selbst waehlen, Microsoft ruft nie an/keine Fernwartung/keine Gutscheinkarten, Kleinanzeigen: Geld-Empfaenger gibt nie Kartendaten ein + PayPal Freunde-Falle, Quishing Aufkleber fuehlen, Passwoerter: Laenge>Komplexitaet+Manager+kein Zwangswechsel (BSI-Linie)+Mail-Konto=wichtigstes, 2FA App>SMS+Backup-Codes in Notfallordner, Leak-Check HPI/HaveIBeenPwned, SIM-PIN anlassen, Router WPA2/3+Gastnetz+WPS aus, oeffentl. WLAN: eigener Hotspot fuer Banking, Backup 3-2-1+Platte abstecken (Ransomware)+Restore-Test, Spam: nie Abbestellen klicken, Drittanbietersperre, Handy: IMEI *#06#, Kinder: Begleiten+angstfreie Meldekultur, Senioren: 3 Schutzsaetze+Codewort, App-Loeschen kuendigt kein Abo, digitaler Nachlass: Google Inaktivitaet/Apple+FB Nachlasskontakt+Querverweis Notfallordner (papierkram).
NEU web/digital.html (NICHT precached): Serien-Muster. Typ-Chips (Alles/Betrugsmaschen/Grundschutz, data-f="typ"), Familien-Toggle #famChip "Mit den Eltern besprechen (9)" (senior-Flag), #kat-Select, Suche (n+kat+kurz). Steckbrief: sub=kurz, Badges typ (masche=terra/schutz=moss)+kat+fam(aub), Sektionen Worum es geht / Warnzeichen (.sec.warnz terra) / So schuetzt du dich als <ol>, Box .notfall (burg "Wenn es passiert ist"), HeiBen-Tipp.
WIRING: studio-lebenswissen.html Banner unter Papierkram-Banner (gleicher Anker); mein-heiben.html Werkzeug-Grid nach papierkram-Zeile (jetzt 13 Werkzeuge).
Headless verifiziert: Daten 32/0/0, kat+typ gueltig, alle schutz>=3; UI 32/32, Maschen 10, Familie 9, Betrug-Kat 9, Suche phishing 2; Schockanruf 4 Schritte+Notfall+Fam-Badge+Typ "Betrugsmasche"; Backup ohne Notfall + Grundschutz-Badge; Enter oeffnet; Hub 1, Werkzeug 1; ui-JS ok; 0 PageErrors.
SERIE "Wissen fuer Zuhause" jetzt 5 Kompendien: pflanzen(144), haushalt(31), lebensmittel(37), papierkram(31), digital(32). Naechster Kandidat (vorgemerkt): Erste Hilfe im Haushalt (Standard-Erste-Hilfe-Kanon, konsequente 112-Boxen, Disclaimer "ersetzt keinen Kurs"). ERINNERUNG: gen_tagesdosis_daten.py fehlt weiterhin.

## NEUES KOMPENDIUM: ERSTE HILFE (SW -2974)
THEMENWAHL (war vorgemerkt): Familien-Kompendium, Fortsetzung der Sicherheits-Eintraege aus Selbermachen. Strikt am etablierten Erste-Hilfe-Kanon (DRK/Leitlinien-Niveau), BEWUSST ohne Medikamenten-Dosierungen; sichtbarer Disclaimer "ersetzt keinen Kurs" + Mythen-Abbau ("Bloss nicht"-Sektion).
NEU web/erstehilfe-daten.js: window.ERSTEHILFE (30) + EH_KAT (6: notfall6 wunden5 hitze4 gift4 alltag6 vorsorge5) + EH_TYP (akut26/vorsorge4). Schema {id,n,kat,typ,kind(opt,14x),kurz,sofort:[3-6 Schritte],nicht:`Bloss-nicht`,notruf(bei akut Pflicht,27x),kindbes(opt,14x),tipp}; alles Backticks. Inhalt: 112-Ablauf, stabile Seitenlage, HDM 100-120/5-6cm/Stayin-Alive+AED, Heimlich 5+5, Druckverband/Fremdkoerper drin lassen, Krampf (kein Loeffel), Blutung, Wunden, Nasenbluten (Kopf VOR), Zahn (H-Milch/Zahnrettungsbox), Verbrennung (handwarm, KEINE Butter/Eis/Mehl), Sonnenstich vs Hitzschlag, Unterkuehlung (kein Alkohol/Rubbeln), Strom (erst Strom-weg), Gift (KEIN Erbrechen, Giftnotruf), Veraetzung (spuelen, nicht neutralisieren), Insektenstich/Anaphylaxie (Autoinjektor+immer 112), PECH, Kopfsturz (Schlafen erlaubt aber weckbar; 48h Warnzeichen), Bruch (nicht einrenken), Auge (nicht reiben), Zecke (hautnah, kein Oel), Blase (Haut drauflassen), Fieber/Fieberkrampf (kein ASS Kinder), Hausapotheke, kindersicher (Knopfzelle=Notfall!), Notfallpass/ICE, EH-Kurs auffrischen. Mehrere Querverweise auf Notfallordner (papierkram) + Kartensperrung 116 116 / Giftnotruf.
NEU web/erstehilfe.html (NICHT precached): Serien-Muster + Disclaimer-Box (burg, gestrichelt) unter lead. Typ-Chips (Alles/Akut handeln/Vorbereitet sein), Kind-Toggle #kidChip "Kind-Besonderheiten (14)", #kat-Select, Suche (n+kat+kurz). Steckbrief: sub=kurz, Badges typ(akut=terra/vorsorge=moss)+kat+kid(aub), Sektion "So hilfst du" <ol>, "Bloss nicht" (.sec.warnz terra), Boxen .notruf(burg "Notruf & Arzt")/.kid(aub "Bei Kindern"), HeiBen-Tipp.
WIRING: studio-lebenswissen.html Banner unter Sicher-im-Netz (gleicher Anker); mein-heiben.html Werkzeug-Grid nach digital-Zeile (jetzt 14 Werkzeuge).
Headless verifiziert: Daten 30/0/0, kat+typ gueltig, akut->notruf Pflicht erfuellt; UI 30/30, Disclaimer sichtbar, Akut 26, Kind 14, Notfall 6, Suche zecke 1; Verschlucken 5 Schritte+Notruf+Kind-Box+Badge "Akut handeln"; EH-Kurs ohne Notruf-Box + Vorsorge-Badge; Enter oeffnet; Hub 1, Werkzeug 1; ui-JS ok; 0 PageErrors.
SERIE "Wissen fuer Zuhause" jetzt 6 Kompendien: pflanzen(144), haushalt(31), lebensmittel(37), papierkram(31), digital(32), erstehilfe(30). Naechste Kandidaten (Ideen): Finanz-Grundwissen-Kompendium (Konto/Steuer/Vorsorge-Begriffe), Auto & Mobilitaet (Panne/Wartung/Bussgeld), Behoerdengaenge (Ummeldung/Ausweis/Elterngeld). ERINNERUNG: gen_tagesdosis_daten.py fehlt weiterhin (vor naechster Begriffskarten-Charge neu schreiben).

## NEUES KOMPENDIUM: RUND UMS AUTO (SW -2975)
THEMENWAHL (war vorgemerkt): letzte grosse Alltagsluecke; Finanz-DNA (Auto = zweitgroesster Haushaltsposten nach Miete -> Kostenwahrheit); Weg-A-Mehrwert.
NEU web/auto-daten.js: window.AUTO (31) + AU_KAT (6: panne6 reifen5 motor6 licht4 pflege4 kosten6) + AU_TYP (panne7/wartung9/kosten... eigentlich typ-Verteilung panne8 wartung? — kat!=typ). Schema {id,n,kat,typ,selbst(opt,16x),kurz,lage,schritte:[3-6],fehler,werkstatt(opt,11x),warn(opt,11x),tipp}; alles Backticks. BEWUSST ohne markenspezifische Anleitungen ("Bordbuch schlaegt Faustregel"). Fachliche Anker: Pannen-Reihenfolge Warnblinker-Weste-raus-Leitplanke-Dreieck-Hilfe, Warndreieck-Abstaende, Starthilfe rot Plus/schwarz Masse (nie Minuspol leere Batt), Reifenpanne/Radwechsel ueber Kreuz+Drehmoment, Unfall (kein Schuldanerkenntnis, Europ. Unfallbericht, Unfallflucht=Straftat), O-bis-O + Alpine-Symbol (M+S allein reicht nicht), Reifendruck kalt/1-Euro-Profil/1,6mm, DOT-Alter 6-8-10J, Oelstand MIN-MAX/rote vs gelbe Lampe, Kuehlwasser (Deckel nie heiss oeffnen/Heizung als Nothelfer), Bremsen=Werkstatt+Warnzeichen, Warnleuchten Ampel-Logik (rot=Stopp, gelb blinkend Motorkontroll=Werkstatt), Gluehbirne (Kolben nicht anfassen, LED/Xenon=Werkstatt), Batterie 4-6J/Kurzstrecke/Anlernen, Waschen nur Anlage (Einfahrt verboten), Scheiben frei (Guckloch=Bussgeld, kein heisses Wasser, Warmlaufen verboten), Kosten (Wertverlust groesster Posten, kosten/km), Gebrauchtkauf (Papiere/Rost/kalter Motor/Probefahrt), Werkstattrechnung (KVA/freie Werkstatt/Rueckruf-Satz), TUEV-Vorcheck, Spritsparen, Winterreifen situativ, Einlagern, Zahnriemen-Intervall, Klimaservice, Auto-Sicherung tauschen (gleiche Ampere!), Steinschlag (Teilkasko), Kfz-Versicherung/SF-Klasse (Kleinschaden selbst zahlen, Stichtag 30.11. -> Querverweis papierkram), Falschtanken (NICHT starten, abpumpen). Querverweise: Sicher-im-Netz (Gebrauchtwagen-Betrug), Papierkram (30.11.), Erste Hilfe (Unfall).
NEU web/auto.html (NICHT precached): Serien-Muster. Typ-Chips (Alles/Panne/Wartung/Kosten), DIY-Toggle #diyChip "Selbst machbar (16)", #kat-Select, Suche (n+kat+kurz). Steckbrief: sub=kurz, Badges typ (panne=terra/wartung=moss/kosten=ochre)+kat+diy(aub), Sektionen Worum es geht / So gehst du vor <ol>, Boxen .fehler(ochre "Haeufiger Fehler" IMMER)/.warn(burg "Sicherheit" opt)/.werk(moss "In die Werkstatt, wenn" opt), HeiBen-Tipp.
WIRING: studio-lebenswissen.html Banner unter Erste-Hilfe (gleicher Anker); mein-heiben.html Werkzeug-Grid nach erstehilfe-Zeile (jetzt 15 Werkzeuge).
Headless verifiziert: Daten 31/0/0, kat+typ gueltig, schritte>=3; UI 31/31, Panne-Typ 8, DIY 16, Reifen-Kat 5, Suche starthilfe 1; Starthilfe alle 3 Box-Typen+DIY-Badge+Typ "Panne"; Kostenrechnung ohne warn/werk/DIY + Kosten-Badge; Enter oeffnet; Hub 1, Werkzeug 1; ui-JS ok; 0 PageErrors.
SERIE "Wissen fuer Zuhause" jetzt 7 Kompendien: pflanzen(144), haushalt(31), lebensmittel(37), papierkram(31), digital(32), erstehilfe(30), auto(31). Naechste Ideen: Finanz-Grundwissen (Konto/Steuer/Vorsorge-Begriffe), Behoerdengaenge (Ummeldung/Ausweis/Elterngeld), ODER die 7 Kompendien vernetzen (Uebersichts-/Landingpage "Wissen fuer Zuhause" mit Suche ueber alle). ERINNERUNG: gen_tagesdosis_daten.py fehlt weiterhin.

## NEUES KOMPENDIUM: FINANZ-GRUNDWISSEN & EIGENTUM (SW -2976) — Teil A des Dreier-Auftrags
USER-AUFTRAG (compound): (A) Finanz-Kompendium ERLEDIGT -> (B) alle 8 Kompendien VERNETZEN (gemeinsame Uebersicht + Suche ueber alle) -> (C) die Saeulen als LERNPFADE integrieren. B und C stehen als naechste Deliverables an.
HINWEIS: Waehrend des Tasks wurde ein Tool-Batch ABGEBROCHEN (Duplikat-Aufrufe); Zustandspruefung ergab: nichts beschaedigt, Banner nur 1x. Muster fuer die Zukunft: nach Abbruechen IMMER erst Zustand pruefen (Dateien da? grep -c Banner? SW-Version?).
NEU web/finanzen-daten.js: window.FINANZEN (34) + FG_KAT (6: konto5 sparen5 steuern6 vorsorge6 invest5 wohnen7) + FG_TYP (basis13/planen14/schutz7). Schema {id,n,kat,typ,kurz,lage,punkte:[3-6],fehler,merk(opt,8x Faustregel),warn(opt,5x),tipp}; alles Backticks. KONSERVATIV: Steuerzahlen mit "aktuell/rund + pruefen" (Pauschbetrag ~1.230, Sparerpauschbetrag 1.000/2.000, Abgeltung 25%+Soli, Einlagensicherung 100k, Kaufnebenkosten 10-15%, Grunderwerbst. 3,5-6,5% je Land). Kern-Inhalte: Basiskonto-Anspruch, Dispo=teuerster Kredit+Schuldnerberatung, 50-30-20, SCHUFA-Datenkopie+Konditionsanfrage, P-Konto, Notgroschen 3-6 Monate VOR Investieren, 72er-Regel, Inflation, Tagesgeld/Einlagensicherung, Pay-yourself-first, Steuererklaerung 4J rueckwirkend/ELSTER, Steuerklassen (aendern nur WANN + Elterngeld-Effekt!), Werbungskosten/Pendlerpauschale, Freistellungsauftrag, Kindergeld/Guenstigerpruefung, Renteninfo LESEN+Versorgungsluecke, 3 Schichten, bAV 15% AG-Zuschuss+Nachteile ehrlich, Versichern-was-ruiniert (Haftpflicht+BU zuerst), BU frueh, unnoetige Policen, Risiko=Rendite, Streuung/Klumpen, ETF/TER, Zeit>Timing/Cost-Average, Mieten-oder-Kaufen (Querverweis mieten-oder-kaufen.html-Werkzeug!), Kaufnebenkosten, Eigenkapital ~NK+20%, Zins/Tilgung/Sollzinsbindung (1%-Falle), Grundbuch/Grundschuld/Loeschung (Querverweis papierkram), WEG/Hausgeld/Protokolle lesen, Wohngeld/KfW VOR Auftrag, finanzabzocke (BaFin-Warnliste, Querverweis digital).
NEU web/finanzen.html (NICHT precached): Serien-Muster + Disclaimer-Box (burg: keine Steuer-/Rechts-/Anlageberatung, keine Produktempfehlung). Typ-Chips (Alles/Grundlagen/Planen & Entscheiden/Fallen & Schutz), Merkzahl-Toggle #merkChip "Mit Merkzahl (8)", #kat-Select, Suche (n+kat+kurz). Steckbrief: sub=kurz, Badges typ (basis=moss/planen=aub/schutz=terra)+kat, Sektionen Worum es geht / Das Wichtigste (<ul class=plist>), Boxen .merk (moss, .mv in Fraunces "Faustregel") / .fehler (ochre, immer) / .warn (burg, opt), HeiBen-Tipp.
WIRING: studio-lebenswissen.html Banner unter Auto-Banner (1x verifiziert); mein-heiben.html Werkzeug-Grid nach auto-Zeile (jetzt 16 Werkzeuge).
Headless verifiziert: Daten 34/0/0; UI 34/34, Disclaimer sichtbar, Grundlagen 13, Merkzahl 8, Wohnen 7, Suche notgroschen 5; Notgroschen-Detail 4 Punkte+Merk-+Fehler-Box ohne Warn + Badge "Planen & Entscheiden"; Risiko&Rendite Warn ohne Merk + Basis-Badge; Enter oeffnet; Hub 1, Werkzeug 1 (16 gesamt); ui-JS ok; 0 PageErrors.
SERIE jetzt 8 Kompendien / >370 Steckbriefe: pflanzen144 haushalt31 lebensmittel37 papierkram31 digital32 erstehilfe30 auto31 finanzen34.
NAECHSTE DELIVERABLES (beauftragt): (B) wissen.html — gemeinsame Uebersichtsseite mit Volltextsuche UEBER ALLE 8 Kompendien (alle *-daten.js laden, aggregieren, filtern nach Kompendium, Treffer verlinken auf jeweilige Seite; Wiring: Hub-Banner oben + Werkzeug-Grid + ggf. index). (C) Lernpfade: die 8 Saeulen ins bestehende Lernpfade-System (lernpfade-daten.js, Muster siehe frueheres Transkript) integrieren. ERINNERUNG: gen_tagesdosis_daten.py fehlt weiterhin.

## VERNETZUNG: wissen.html — EINE SUCHE UEBER ALLE 8 KOMPENDIEN (SW -2977) — Teil B des Dreier-Auftrags
NEU web/wissen.html (NICHT precached): laedt alle 8 *-daten.js (keine Namenskollisionen der window-Globals). KOMP-Registry (key/label/url/farbe/arr/kat/desc je Kompendium, Farbcodes: pflanzen #6f8f4e, haushalt #b04a31, lebensmittel #a97a1d, papierkram #6b3951, digital #4a5c39, erstehilfe #792d29, auto #524a3e, finanzen #1f1c17). VOLLTEXT generisch: hayOf() sammelt ALLE String-Felder + String-Arrays jedes Eintrags + kat-Label -> ALL (370 Records {k,label,url,farbe,id,n,sub(kurz||lat||kat),katLabel,hay}). Suche: Woerter AND-verknuepft. STARTANSICHT ohne Query+Alle: 8 Kompendien-Kacheln (a.kt, border-left in Kompendiumfarbe, Count+desc). Treffer: a.pc-Karten mit href=url#id, sub 2-zeilig geklemmt, Meta Label·kat. LIMIT 60 + #more "…und N weitere". Chips dynamisch erzeugt (Alle + 8 mit Zaehlern). ?q=... belegt Suche vor (fuer spaetere Verlinkungen).
DEEP-LINKS: ALLE 8 Kompendien-Seiten gepatcht — vor letztem </script> Snippet "Deep-Link aus wissen.html" (location.hash -> showDetail(id), try/catch); Guard-String fuer Idempotenz. FOOTER aller 8 Seiten: "Alle Kompendien"-Link vor Startseite-Link eingefuegt (Ersetzung von '<a href="index.html">Zur Startseite</a>').
WIRING: studio-lebenswissen.html — wissen-Banner als KOPF des Kompendien-Stapels VOR dem Pflanzen-Banner (Eyebrow "Uebersicht · Acht Kompendien, eine Suche", Rahmen ochre statt rule als Hervorhebung; Anker war die pflanzen-Banner-Startzeile). mein-heiben.html — wissen-Zeile VOR pflanzen-Zeile im Werkzeug-Grid (jetzt 17 Werkzeuge).
Headless verifiziert: ui-JS ok; Start 8 Kacheln + "370 Steckbriefe"; Suche "kuehlschrank" 32 Treffer aus 4 Kompendien (Selbermachen/Lebensmittel/Erste Hilfe/Finanzen), "112" 23 aus 3; Chip Finanzen leer 34; Chip Pflanzen leer: 60 angezeigt + more "…und 84 weitere"; Klick auf Honig-Treffer navigiert zu lebensmittel.html#honig UND Detail offen; Deep-Links haushalt#sicherung / pflanzen#tomate / finanzen#etf oeffnen korrekt; ?q=zecke 2 Treffer; Hub-Banner 1; Werkzeug 1 (17 gesamt); 0 PageErrors (inkl. der deep-verlinkten Seiten).
NAECHSTES DELIVERABLE (beauftragt, Teil C): die 8 Saeulen als LERNPFADE ins bestehende Lernpfade-System integrieren (web/lernpfade-daten.js + lernpfade.html existieren; VOR Umsetzung Struktur der bestehenden lernpfade-daten.js lesen und Muster spiegeln; Idee: je Kompendium 1 Pfad mit kuratierten Stationen, Stationen als Deep-Links seite.html#id nutzbar). ERINNERUNG: gen_tagesdosis_daten.py fehlt weiterhin.

## LERNPFADE: DIE ACHT SAEULEN ALS PFADE (SW -2978) — Teil C, Dreier-Auftrag KOMPLETT
(Hinweis: erneut ein abgebrochener Tool-Batch vor diesem Schritt — war rein lesend, Zustandspruefung ok.)
ERWEITERUNG lernpfade.html (6 chirurgische Edits, abwaertskompatibel):
1) Step-Tupel jetzt [id,note,url?,titel?]: title=s[3]||MAP-Titel||id; href=s[2]||Artikel-Link; .sopen-Label s[2]?"Oeffnen":"Lesen"; .snum p.saeule?"Station":"Schritt".
2) Pfadfarbe: var kc=p.kc||bisherige MAP-Logik (Hex-Override je Saeulen-Pfad).
3) paint(): vor erstem Pfad mit saeule:true ein <div class=divi>"Die acht Saeulen: Wissen fuer Zuhause"; CSS .divi (mono, ochre, border-top) vor .path-Regel.
4) Summary-Label "Artikel erledigt"->"Stationen erledigt"; writeDash v-String "... Pfade · N Stationen"; Lead ergaenzt (Kompendium-Stationen selbst abhaken, Hinweis auf Saeulen-Pfade).
DATEN lernpfade-daten.js: 8 Pfade angehaengt (vor finalem ];), ids s8-<komp>, saeule:true, kc=Kompendiumfarbe (wie wissen.html-Map), je 6 kuratierte Stationen als 4-Tupel; uid-Schema "k8-<komp>-<eintragsId>" (kollisionsfrei zu Artikel-Ids — wichtig: "notgroschen","etf" etc. existieren als Artikel-Step-Ids!); urls = Deep-Links seite.html#id; Titel EXAKT aus den n-Feldern der Daten gezogen. Kuratierung: pflanzen tomate/radieschen/basilikum/schnittlauch/erdbeere/monstera; haushalt sicherung/abfluss/entlueften/lueften/rauchmelder/wasserschaden; lebensmittel milch/eier/tomaten/brot/restekochen/einfrieren; papierkram kassenbon/garantie/kontoauszuege/policen/vorsorge/notfallordner; digital passwoerter/zweifaktor/datenleck/whatsapptrick/schockanruf/senioren; erstehilfe notruf112/bewusstlos/reanimation/verschlucken/verbrennung/hausapotheke; auto panne/warndreieck/starthilfe/reifenpanne/warnleuchten/falschtanken; finanzen haushaltsbuch/notgroschen/zinseszins/streuung/versicherungscheck/mietekaufen.
GESAMT jetzt 16 Pfade / 91 Stationen. mein-heiben.html+konto.html rechnen dynamisch ueber PFADE (keine Literale angefasst); statische Mock-Baender marke.html/partner-demo.html ("1/8 Pfade") BEWUSST belassen (Dummy-Staende).
Headless verifiziert: Parse 16/8 Saeulen, alle 4-Tupel+kc, 0 k8-Kollisionen; UI 16 Pfade, Divider an Pos 9; Summary "0/16 · 0/91 Stationen"; s8-auto: Station-Label, Oeffnen-Button, Link auto.html#starthilfe, Farbe #524a3e; klassischer Pfad unveraendert (Schritt/Lesen/Artikel-Link); Toggle k8-auto-panne -> Pill 1/6 + heiben_results.lernpfade "0/16 Pfade · 1 Stationen" + persistiert nach Reload; Reset -> 0/6; mein-heiben zeigt /16; 0 PageErrors auf lernpfade+mein-heiben+konto.
DREIER-AUFTRAG DAMIT KOMPLETT: (A) finanzen-Kompendium -2976, (B) wissen.html-Vernetzung+Deep-Links -2977, (C) Saeulen-Lernpfade -2978. Backlog-Ideen: Behoerdengaenge-Kompendium; Kompendium-Stationen automatisch abhaken (Deep-Link-Besuch in localStorage vermerken und in isDone einbeziehen); Mock-Baender an neue Zahlen anpassen. ERINNERUNG: gen_tagesdosis_daten.py fehlt weiterhin.

## PIVOT: FULL REMAKE (Blaupause, kein SW-Bump — nur Konzeptdatei)
USER-AUFTRAG: "Ueberarbeite Design komplett mit /mcp-builder. Full Remake of whole Business. Clear Structure of Content and Business modell." + "Los".
KLARSTELLUNG an User kommuniziert: /mcp-builder baut MCP-SERVER (KI-Tool-Schnittstellen), kein Design-Tool; strategisch als G3-Produkt "Wissens-API" eingeplant (Welle 7, optional).
NEU: REMAKE-KONZEPT.md (Kit-Root) = verbindliche Blaupause. Kernentscheidungen:
- GESCHAEFTSMODELL 3 Saeulen: G1 Wissen (frei, Vertrauen: Kompendien/Artikel/Lernpfade/Tagesdosis), G2 Werkzeuge&Konto (Freemium-Bindung), G3 Partner (B2B-Erloes: White-Label-Lizenz je Kompendium, Studio, Wissens-API/MCP). Grundsaetze: Wissen frei+werbefrei, Sponsoring nur je ganzes Kompendium gekennzeichnet.
- SITEMAP 4+1: Start | WISSEN (Hub=wissen.html ausgebaut: Suche/Kompendien/Artikel/Lernpfade/Tagesdosis) | WERKZEUGE (werkzeuge.html NEU) | MEIN HEIBEN (Dashboard entrümpelt) | UNTERNEHMEN (unternehmen.html NEU, konsolidiert marke, partner-demo). studio-lebenswissen verliert Banner-Stapel -> Artikel-Katalog. Deep-Links bleiben gueltig.
- DESIGN-SYSTEM "HeiBen Fundament": Marken-DNA (Palette/Fonts/Eyebrow) BLEIBT; NEU web/heiben-design.css (Tokens+.hb-Komponenten, additiv mit Aliassen) + web/heiben-nav.js (gemeinsame Kopfnav, body data-hb-bereich, progressive enhancement).
- 7 WELLEN je 1 Deliverable+Playwright: W1 design.css+nav.js+Pilot(wissen+finanzen) | W2 index-Remake | W3 Hubs (wissen-Ausbau, werkzeuge NEU, studio verschlankt) | W4 unternehmen NEU+marke/partner-demo+Mock-Baender echte Zahlen | W5 Rollout alle Seiten | W6 QS-Sweep | W7 optional MCP-Server (mcp-builder-Prozess: TS/stdio, Tools wissen_suche/steckbrief_lesen/kompendium_liste/lernpfad_status, 10 Evals).
- STABIL: alle *-daten.js, localStorage-Keys, Deep-Link-Vertraege, SW-Schema, Fiktions-Fakten.
NAECHSTER SCHRITT bei "Weiter": WELLE 1.

## REMAKE-BLAUPAUSE v2 (Fuenf-Welten-Fassung) — ersetzt v1
USER-KORREKTUR: die FUENF WELTEN inkludieren (Reisen/Wohnen/Immobilien/Studio/Kulinarik, je eigene GmbH i.G., kanonisch in web/heiben-firmierungen.js mit Farben+Steuerlogik; darueber Holding mit holding-dashboard.html, welt-cockpit.html, heiben-angebot.js/heiben-pdf.js). v1 hatte nur die Studio-Brille.
INVENTAR-ENTSCHEID: alle 5 Welten substanzhaltig (Reisen 4 Seiten ~3.3k Z., Wohnen 4+Manufaktur ~14.3k inkl. plan2d/room3d, Immobilien 5 ~3.2k, Studio 9 ~8.1k + Wissens-Oekosystem, Kulinarik 12 ~12k) -> ALLE BEHALTEN+UEBERARBEITEN, KEINE ersetzen. Statt Ersatz NEUES QUERSCHNITTSPRODUKT "HeiBen Zuhause-Ordner" (digitaler Notfall-/Familienordner; baut auf papierkram-Kompendium notfallordner + Konto + heiben-pdf.js; MVP in Welle 5; erstes echtes G2-Produkt).
SITEMAP v2: Start | 5 Welten (Werkzeuge wohnen IN ihren Welten — kein separater Werkzeuge-Hub mehr, Aenderung ggue. v1) | Studio enthaelt Wissens-Hub | Mein HeiBen (echtes Dashboard + zuhause-ordner) | Unternehmen/Holding (unternehmen.html EXISTIERT bereits — v1-Fehler korrigiert). CROSS-VERZAHNUNG Kompendien<->Welten: lebensmittel<->kulinarik, haushalt/pflanzen<->wohnen, finanzen(eigentum)/papierkram<->immobilien, auto/erstehilfe<->reisen; Umsetzung als dezente "Aus der HeiBen-Welt"-Boxen.
NAV v2: heiben-nav.js zeigt 5 Welten (Punkt in Weltfarbe aus Firmierungs-Registry) + Wissen + Mein HeiBen; body data-hb-welt.
WELLEN v2 (8): W1 Fundament css+nav Pilot(wissen+finanzen+kulinarik) | W2 index | W3 Studio/Wissens-Hub | W4 Kulinarik+Wohnen+Bruecken | W5 Immobilien+Reisen+Bruecken+zuhause-ordner.html MVP | W6 Holding/Unternehmen+Cockpit-Abdeckung+Mock-Baender | W7 Rest+QS-Sweep | W8 optional MCP-Wissens-API.
STABIL zusaetzlich: heiben-firmierungen.js, Welt-Speicher der Planer, ?welt=-Vertraege.
NAECHSTER SCHRITT bei "Weiter": WELLE 1.

## REMAKE WELLE 1: FUNDAMENT (SW -2979)
NEU web/heiben-design.css: :root-Tokens (Grundpalette --hb-*, Weltfarben --hb-w-reisen #a97a1d/-wohnen #4a5c39/-immobilien #792d29/-studio #1f1c17/-kulinarik #6b3951 aus Firmierungs-Registry, Typo-Stacks, Radius) + Komponenten NUR als .hb-Klassen (KEINE Element-Selektoren -> null Interferenz mit Bestands-Styles): .hb-nav-Familie, .hb-eyebrow/.hb-h1/.hb-lead/.hb-disclaimer/.hb-divi, .hb-chip/.hb-btn, .hb-grid/.hb-card(.hb-welt-card mit --wf-Border), .hb-box(+fehler/warn/merk/werk/kid/welt)/.hb-tip/.hb-badge, .hb-foot. Diese Klassen sind die Zielformen fuer die Migration ab W3+.
NEU web/heiben-nav.js: selbst-injizierender Header (Guard gegen Doppelung), Wortmarke+Claim, 5 Welten-Links mit .hb-dot in Weltfarbe (window.HEIBEN_FIRMA falls geladen, sonst Fallback-Map) + Trenner + Wissen + Mein HeiBen; aktive Markierung via <body data-hb-welt="...">; Burger <=860px mit aria-expanded; progressive enhancement (ohne JS Footer-Links). Einbau je Seite: link heiben-design.css + script defer heiben-nav.js vor </head> + body-Attribut.
PILOT (3 Seiten gepatcht, python mit assert count==1): wissen.html + finanzen.html (beide data-hb-welt="wissen") + kulinarik.html (data-hb-welt="kulinarik", class theme-kulinarik erhalten).
TEST-LEKTION: goto auf gleicher Seite mit nur-Hash (#etf) loest KEINEN load aus -> Deep-Link-Handler laeuft nicht; im Test nach goto(#...) ein reload() anhaengen. War Test-Artefakt, keine Regression.
Headless verifiziert: Nav 1x/7 Links/5 Punkte auf allen 3 Piloten; aktiv wissen/wissen/kulinarik; Kulinarik-Punkt rgb(107,57,81); Suche 112->23; MerkChip 8; finanzen#etf oeffnet Detail; Burger mobil (hidden->shown, aria true); 0 PageErrors.
SW: neue Dateien NICHT im Precache (Politik unveraendert), nur Versions-Bump.
NAECHSTER SCHRITT bei "Weiter": WELLE 2 = index.html-Remake (fuenf Welten prominent, Wissens-Einstieg, Kennzahlen dynamisch aus Daten, Nav+Tokens).

## REMAKE WELLE 2: INDEX-REMAKE (SW -2980)
index.html chirurgisch ueberarbeitet (768 Z.):
1) HEAD: link heiben-design.css + script heiben-kennzahlen.js (ohne defer, vor Kennzahlen-Renderer noetig) + style#wissen-band-css (.wissen-band/.kz-row/.kz/.wz-grid/.wz-card, Muster wie tools-band).
2) NAV-ENTSCHEID: index behaelt BEWUSST seinen eigenen Hero-Header (heiben-nav.js NICHT injiziert; Begruendung: Schaufenster-Design + hb-mobile-js klont nav .links ins Mobilmenue -> Doppel-Header vermeiden, neue Links erscheinen im Mobilmenue automatisch). Nav-Links angeglichen: li kulinarik.html ERSETZT durch li wissen.html "Wissen" + li mein-heiben.html "Mein HeiBen" (Kulinarik bleibt via Welten-Karte+Werkzeug-Band erreichbar). Alle inneren Seiten bekommen hb-nav (Rollout W3-W7).
3) HERO-FIX: lede nannte nur 4 Welten -> "Reisen, Wohnen, Immobilien, Kulinarik und ein eigenes Studio."
4) NEUE SEKTION #wissen (zwischen #haeuser und Werkzeug-Band): Eyebrow "HeiBen Studio · Wissen fuer Zuhause", h2 "Wissen, das im Alltag traegt.", #kzRow (per script#wissen-kz-js aus window.HEIBEN_KZ gerendert) + 4 .wz-card: wissen.html/lernpfade.html/begriffskarten.html/studio-lebenswissen.html.
NEU web/heiben-kennzahlen.js: GENERIERT via tools/gen_kennzahlen.js (NEU, liegt IM Kit -> ueberlebt Zip/Reset; Aufruf: cd web && node ../tools/gen_kennzahlen.js). Werte: welten 5, kompendien 8, steckbriefe 370, lernpfade 16, stationen 91, karten 544, artikel 165 (= LW_DATA.ARTIKEL.length; LW_DATA={KATS,PHASEN(9),SITS(16),ARTIKEL(165),PREM_DETAIL,BUECHER}; PFADE-Stationsfeld heisst "steps"). NACH JEDER DATENAENDERUNG Generator neu laufen lassen.
Verifiziert: 5 Welt-Karten, lede nennt Kulinarik, Nav Wissen+Mein HeiBen (2x = Desktop+Mobilmenue-Klon, by design), #kzRow 6 Kennzahlen korrekt, 4 wz-Karten-Links existieren, tools-band unveraendert (4 Karten), 0 PageErrors. Hinweis: naive new-Function-Pruefung meldet 1 "Fehler" = script type application/ld+json (JSON, kein JS) -> ignorieren.
NAECHSTER SCHRITT bei "Weiter": WELLE 3 = Studio-Ausbau (wissen.html als Studio-Wissens-Hub mit Sektionen, studio.html ueberarbeiten, studio-lebenswissen verschlanken: Katalog statt Banner-Stapel; hb-nav-Rollout auf diese Seiten).

## REMAKE WELLE 3: STUDIO-AUSBAU + NAV-ROLLOUT WISSEN/STUDIO (SW -2981)
ROLLOUT (18 Seiten, python-Patcher mit asserts): data-hb-welt="wissen": pflanzen/haushalt/lebensmittel/papierkram/digital/erstehilfe/auto/lernpfade/begriffskarten. data-hb-welt="studio": studio/studio-magazin/studio-artikel/studio-redaktion/studio-einrichtungstheorie/studio-lebenswissen/-artikel/-bibliothek/-redaktion. Je Seite: link heiben-design.css + script defer heiben-nav.js vor </head> + body-Attribut.
ALT-NAV-ERSATZ-MUSTER (WICHTIG fuer W4-W7): Seiten mit eigener globaler Alt-Nav (<nav> mit brand-SVG + ul.links + cta): assert count('<nav>')==1 -> Block <nav>...</nav> ERSETZEN durch Kommentar + script id="hb-mobile-js" MIT ENTFERNEN (hat KEINEN !links-Guard -> wuerde auf hb-Leiste crashen; hb-nav bringt eigenen Burger). In W3 auf 5 Seiten angewendet: studio, studio-magazin, studio-artikel, studio-lebenswissen, studio-lebenswissen-artikel.
HEIBEN-NAV GEHAERTET: heiben-nav.js baut jetzt div role="banner" (.hb-nav) + div role="navigation" (.hb-links) statt header/nav-ELEMENTEN. Grund: Bestandsseiten stylen nav{}/nav .wrap{}/nav a{} als Element-Selektoren -> haetten die neue Leiste getroffen. Mit divs ist die Leiste IMMUN gegen alle Element-Selektoren; Styling rein ueber .hb-Klassen. Nach Umbau: document.querySelectorAll('nav').length==0 auf studio.html.
WISSEN.HTML HUB-AUSBAU: Eyebrow -> "HeiBen Studio · Wissen fuer Zuhause"; nach #grid neues <div id="studioRow"> (.hb-divi "Mehr aus dem HeiBen Studio" + 4 .hb-card: lernpfade/begriffskarten/studio-lebenswissen/studio.html); render()-Hook nach 'more.style.display="none"; emptyEl.style.display="none";': studioRow sichtbar nur in Startansicht (!state.q && state.k==="alle").
STUDIO-LEBENSWISSEN VERSCHLANKT: Banner-Stapel (10 Voll-Banner: lernpfade+wissen+8 Kompendien, ex-Z.775-854) -> 1 Kopf-Banner (wissen.html, Original-Wortlaut) + Katalog-Grid (repeat(auto-fill,minmax(190px,1fr))) mit 9 Mini-Karten (Kicker "Schritt fuer Schritt"/"Kompendium", dunkle Optik var(--bg-deep)/var(--ochre) wie Bestand). Anker: Start '  <a href="lernpfade.html" style="display:flex...' bis vor mein-heiben-Zeile.
Headless verifiziert: studio hb-nav 1x/0 nav-Elemente/aktiv studio/kein Alt-Burger; lebenswissen Kopf-Banner + 9 Karten; wissen Row-Toggle (Start sichtbar, 112->23 Treffer + Row weg, Reset zurueck); haushalt 31 Karten aktiv wissen; lernpfade 16 Pfade; magazin/artikel/lw-artikel/redaktion/begriffskarten/pflanzen geladen; 0 PageErrors, 0 Console-Errors.
NAECHSTER SCHRITT bei "Weiter": WELLE 4 = Kulinarik + Wohnen: Nav/Tokens-Rollout auf alle Seiten beider Welten (kulinarik.html hat hb-nav seit W1; 11 weitere kulinarik-*, wohnen.html + 3 wohnen-*, manufaktur + manufaktur-gestalten; je Seite Alt-Nav-Check nach W3-Muster) + KOMPENDIEN-BRUECKEN (dezente "Aus der HeiBen-Welt"-Boxen: kulinarik<->lebensmittel, wohnen<->haushalt/pflanzen).

## REMAKE WELLE 4: KULINARIK + WOHNEN + BRUECKEN (SW -2982)
ROLLOUT (18 Seiten): data-hb-welt="kulinarik": kulinarik + kulinarik-app/-export/-heute/-kochbuch/-mealplanner/-planner/-redaktion/-rezept/-rezepte/-rezeptwuerfel/-wochenplan. data-hb-welt="wohnen": wohnen/wohnen-anfrage/wohnen-konfigurator/wohnen-planer/manufaktur/manufaktur-gestalten.
ALT-NAV RAUS (W3-Muster, 9 Seiten): kulinarik, kulinarik-rezept/-rezepte/-rezeptwuerfel/-wochenplan, wohnen, wohnen-anfrage, manufaktur, manufaktur-gestalten (je <nav>-Block + script#hb-mobile-js entfernt). WICHTIG: kulinarik.html fuhr seit W1-Pilot DOPPELT (hb-nav + Alt-Nav) — jetzt behoben; Lehre: beim Pilotieren kuenftig immer Alt-Nav mitpruefen.
BRUECKEN "Aus der HeiBen-Welt" (5 Stueck, .hb-box.welt mit --wf=Zielfarbe):
- kulinarik.html -> lebensmittel.html (ochre #a97a1d), vor <footer
- wohnen.html -> haushalt.html + pflanzen.html (ochre), vor <footer
- lebensmittel.html -> kulinarik-rezepte/-wochenplan/-rezeptwuerfel (aubergine #6b3951), vor <p class="foot"> (Kompendien haben KEIN <footer>-Element!)
- haushalt.html -> wohnen.html (moss #4a5c39), vor p.foot
- pflanzen.html -> wohnen.html (moss), vor p.foot
Guard je Seite: assert 'Aus der HeiBen-Welt' not in s (nie doppelt einsetzen).
Headless verifiziert (21 Seiten): kulinarik hb-nav 1x/0 nav-Elemente/aktiv/Bruecke; rezepte aktiv+318 Karten-Elemente; wohnen aktiv/0 nav/Bruecke; alle kulinarik-* + wohnen-* + manufaktur-* geladen; lebensmittel 3 Bruecken-Links + 37 Karten; haushalt/pflanzen -> wohnen.html; 0 PageErrors, 0 Console-Errors.
NAECHSTER SCHRITT bei "Weiter": WELLE 5 = Immobilien + Reisen (Rollout nach Muster: immobilien/-anfrage/-angebote/-planner/immobilienbudget -> "immobilien"; reisen/-anfrage/-kuratiert/-planer -> "reisen"; je Alt-Nav-Check) + BRUECKEN (immobilien<->finanzen mietekaufen/kaufnebenkosten + papierkram; reisen<->auto panne + erstehilfe) + NEU zuhause-ordner.html (MVP: gefuehrtes Anlegen nach papierkram/notfallordner-Checkliste, Fortschritt localStorage, Druck-Export via heiben-pdf.js falls passend, verlinkt aus mein-heiben).

## REMAKE WELLE 5: IMMOBILIEN + REISEN + ZUHAUSE-ORDNER (SW -2983)
ROLLOUT (9 Seiten): data-hb-welt="immobilien": immobilien/-anfrage/-angebote/-planner/immobilienbudget. data-hb-welt="reisen": reisen/-anfrage/-kuratiert/-planer. Alt-Nav+mobile-js raus (W3-Muster): immobilien, immobilien-anfrage, reisen, reisen-anfrage.
BRUECKEN (6 neue, Summe jetzt 11): immobilien.html -> finanzen#mietekaufen + finanzen#kaufnebenkosten + papierkram (ochre, vor <footer) | reisen.html -> auto + erstehilfe (ochre, vor <footer) | finanzen.html -> immobilien + immobilienbudget (burg #792d29, vor p.foot) | papierkram.html -> zuhause-ordner.html (ink #1f1c17, PRODUKT-Bruecke) | auto.html -> reisen + reisen-planer (#a97a1d) | erstehilfe.html -> reisen (#a97a1d).
NEU web/zuhause-ordner.html (MVP, ~230 Z., data-hb-welt="konto"): gefuehrter Notfall-/Familienordner. 7 Register (Vorsorge&Vollmachten burg / Dokumente&Identitaet / Finanzen&Vertraege ochre / Wohnen&Immobilie moss / Gesundheit&Familie terra / Digitales Erbe aub / Unterwegs&Reisen) mit zusammen 27 Checklisten-Punkten, teils mit Steckbrief-Deep-Links (papierkram#vorsorge/#policen/#kontoauszuege, finanzen#girokonto/#versicherungscheck/#grundbuch, erstehilfe#notfalldaten/#hausapotheke, digital#passwoerter/#zweifaktor). Sticky Fortschritt (#gesamt + Balken + je Register x/n), Buttons Drucken (window.print + @media print: Nav/Buttons/Links weg, Register page-break-inside avoid) und Reset (confirm). NEUER STABILER localStorage-KEY: heiben_ordner_v1 (JSON {itemId:true}) — Item-Ids stabil halten (vv-*, di-*, fv-*, wi-*, gf-*, dg-*, ur-*). Rechtsberatungs-Hinweisbox. NICHT im SW-Precache.
mein-heiben.html: Werkzeug-Grid +1 Eintrag {u:zuhause-ordner.html} VOR wissen-Zeile (jetzt 18 Werkzeuge).
Headless verifiziert: Ordner 7 Register/27 Punkte, 3 Klicks -> 3/27 + R1 2/4 + Balken 11%, Reload persistiert, Reset 0/27; immobilien aktiv/0 nav/3 Bruecken-Links; reisen aktiv/2 Links; alle 9 Rollout-Seiten geladen; papierkram-Bruecke -> zuhause-ordner; mein-heiben zeigt Ordner; 0 PageErrors, 0 Console-Errors.
DAMIT SIND ALLE 5 WELTEN + WISSEN/STUDIO AUF DEM FUNDAMENT (hb-nav ueberall ausser index by design).
NAECHSTER SCHRITT bei "Weiter": WELLE 6 = Holding & Unternehmen: unternehmen/familie/marke/strategie/partner-demo/holding-dashboard/welt-cockpit/schaufenster konsistent machen (Rollout data-hb-welt="holding", Alt-Nav-Check je Seite), Cockpit-Abdeckung aller Welten pruefen (welt-cockpit ?welt= bisher evtl. nur reisen), statische Mock-Baender durch echte Zahlen ersetzen (marke.html:~204 + partner-demo.html:~104 "1/8 Pfade" -> 16 Pfade/370 Steckbriefe, Quelle HEIBEN_KZ), familie.html "Vier Welten"-Stat pruefen -> fuenf.

## REMAKE WELLE 6: HOLDING & UNTERNEHMEN (SW -2984)
ROLLOUT (8 Seiten, alle data-hb-welt="holding" -> KEIN Nav-Punkt aktiv, gewollt): unternehmen/familie/schaufenster (mit Alt-Nav+mobile-js-Entfernung nach W3-Muster) + marke/strategie/partner-demo/holding-dashboard/welt-cockpit (ohne Alt-Nav).
COCKPIT-ABDECKUNG GEPRUEFT — BEREITS VOLLSTAENDIG: welt-cockpit.html Z.87 var WELTEN=window.HEIBEN_WELTEN||[reisen,wohnen,kulinarik,immobilien,studio]; rendert 5 .wchip-Weltchips; holding-dashboard baut Cockpit-Karten dynamisch fuer alle 5 Welten (+ statischer Beispiel-Link ?welt=reisen im Leer-Zustand Z.127, bewusst belassen). KEINE Aenderung noetig.
MOCK-BAENDER ENTSCHEID: Baender in marke.html + partner-demo.html sind bewusste PERSONA-Mocks ("Dein HeiBen-Stand", partner-demo themed den Titel via #bandTitle um) -> Persona-Zahlen behalten, aber NENNER aus echten Kennzahlen: "1/8 Pfade" -> "3 von 16 Pfaden" via id="hbKzBand" + heiben-kennzahlen.js im Head + Mini-Script vor </body> (rendert '60 von '+k.karten+' Begriffen · 3 von '+k.lernpfade+' Pfaden · 4-Tage-Serie'; folgt kuenftigen Regenerierungen automatisch).
familie.html Z.804: Stat "Vier Welten unter einem gemeinsamen Dach" -> "Fuenf".
Headless verifiziert: unternehmen hb-nav 1x/0 nav/kein aktiver Punkt; familie Fuenf; beide Baender "60 von 544 Begriffen · 3 von 16 Pfaden · 4-Tage-Serie", partner-#bandTitle intakt; dashboard verlinkt alle 5 Cockpits; cockpit?welt=kulinarik 5 Chips aktiv Kulinarik, studio+immobilien-Cockpits geladen; strategie/schaufenster ok; 0 PageErrors, 0 Console-Errors.
NAECHSTER SCHRITT bei "Weiter": WELLE 7 = ROLLOUT REST + QS-SWEEP: (1) Inventar `grep -L heiben-design.css web/*.html` -> alle Restseiten zuordnen (mein-heiben + konto + konto-verwaltung -> "konto"; koeln-quiz -> "holding"; finanzielle-freiheit -> "wissen"; Legal agb/datenschutz/impressum/widerruf/404 -> "holding"; je Alt-Nav-Check W3-Muster), (2) tools/gen_kennzahlen.js frisch laufen lassen, (3) QS-SWEEP ueber die KOMPLETTE Sitemap: alle Seiten headless laden (0 PE), Stichproben (wissen-Suche, Lernpfad-Toggle, Ordner-Persistenz, Cockpit, ein Rezept), Linkcheck der 11 Bruecken, Abschlussprotokoll in Handover. Danach W8 optional (MCP Wissens-API via /mcp-builder-Prozess).

## REMAKE WELLE 7: ROLLOUT REST + QS-SWEEP — ABSCHLUSS (SW -2985)
ROLLOUT (43 Restseiten, damit 100/100 auf dem Fundament):
- "konto": mein-heiben, mein-abo + konto, konto-verwaltung (Alt-Nav raus)
- "wissen": erste-wohnung, finanzcheck, finanzielle-freiheit, gehaltsverhandlung, jobwechsel, konsumcheck, mieten-oder-kaufen, schuldenfrei, sparziel, steuererklaerung, stromfresser, studium-ausbildung, versicherungscheck, zinseszins, tagesdosis, wissensquiz, wahr-oder-falsch, tastentrainer, shortcut-speedrun + suche (Alt-Nav raus)
- "reisen": reisebudget | "wohnen": manufaktur-galerie + manufaktur-bestellungen/-kalkulation/-maschinencode (Alt-Nav raus)
- "holding": 404, api, anfragenverwaltung, bestellverwaltung, heiben-automation, heiben-wachstum, koeln-quiz, schaufenster-redaktion + agb, datenschutz, impressum, widerruf, rechtliches, schaufenster-detail (Alt-Nav raus)
Insgesamt in W7 12 Alt-Navs + hb-mobile-js entfernt. tools/gen_kennzahlen.js frisch gelaufen: Werte unveraendert stabil (5/8/370/16/91/544/165).

### QS-ABSCHLUSSPROTOKOLL (headless, Chromium)
- SWEEP: ALLE 100 HTML-Seiten geladen -> 0 Seiten mit PageErrors oder Console-Errors.
- STICHPROBEN: wissen-Suche "112" -> 23 Treffer | lernpfade 16 Pfade | zuhause-ordner Haken persistiert nach Reload + Reset auf 0/27 | welt-cockpit?welt=wohnen 5 Chips, aktiv Wohnen | kulinarik-rezepte 318 Karten-Elemente | index #kzRow 6 Kennzahlen | mein-heiben aktiv "konto".
- BRUECKEN: 11 Seiten mit "Aus der HeiBen-Welt", alle href-Ziele existieren.

### STATUS REMAKE v2: WELLEN 1-7 ABGESCHLOSSEN
Fundament (heiben-design.css nur .hb-Klassen + heiben-nav.js div/ARIA, immun gegen Element-Selektoren) liegt unter ALLEN 100 Seiten; index.html behaelt bewusst den eigenen Hero-Header (dokumentierte Ausnahme, W2). Alle 5 Welten + Wissen/Studio + Holding + Konto/Rest umgestellt; 11 Kompendien<->Welten-Bruecken; neues G2-Produkt zuhause-ordner.html (localStorage heiben_ordner_v1 STABIL halten); Kennzahlen generiert via tools/gen_kennzahlen.js (nach jeder Datenaenderung laufen lassen).
OFFEN/OPTIONAL: W8 = MCP "Wissens-API" nach /mcp-builder-Prozess (TS/stdio, Tools wissen_suche/steckbrief_lesen/kompendium_liste/lernpfad_status, 10 Evals). Backlog unveraendert: gen_tagesdosis_daten.py bei naechster Kartencharge neu schreiben; Kompendium-Stationen-Autohaken; Behoerdengaenge-Kompendium; Brutto-Netto-Rechner.

## STARTSEITEN-ENTWURF ZUR FREIGABE (SW -2986) + MCP GESTRICHEN
MCP/WELLE 8 GESTRICHEN (User: Missverstaendnis) — Wissens-API entfaellt ersatzlos aus dem Plan.
NEU web/startseite-neu.html (~560 Z., NICHT verlinkt, NICHT precached): FREIGABE-ENTWURF der neuen Homepage im Produktpraesentations-Stil. Bei Freigabe: Inhalte nach index.html ueberfuehren (SEO/JSON-LD/heiben-legal/PWA-Snippets von index uebernehmen!) oder index ersetzen + Alt-index als startseite-klassisch.html sichern.
AUFBAU: Fixe Glas-Leiste (blur, erscheint ab 0.72vh, Anker zu den 5 Welten) | Hero (Wort-fuer-Wort-Blend-in via .w-Spans, 3 schwebende Farb-Orbs, Scroll-Cue) | Manifest (3 Reveal-Zeilen) | FUENF KAPITEL je 300vh mit Sticky-Buehne (dunkel #16130f->#1d1913, .glowbg-Ebene opacity=var(--g)*.28 in Weltfarbe) | Kennzahlen-Band (Count-up aus HEIBEN_KZ, ease-out cubic) | 3 Finale-Karten (mein-heiben/zuhause-ordner/unternehmen) | Foot. Fixer Badge "Entwurf zur Freigabe" -> index.html.
SIGNATUR — 5 CSS-3D-OBJEKTE (ohne Bibliothek, JS-Werkstatt shade/face/box/cylinder/wrap, preserve-3d, perspective 1300px): Koffer #a97a1d (Griff faehrt aus: data-griff translateY -18*m, Anhaenger data-tag ab m>.6) | Haus #4a5c39 (Dach data-dach schwebt von -120px ein, Fenster data-fenster leuchten ab m>.75) | Tuer #792d29 (data-tuer rotateY -78*m mit Lichtschein data-glow) | Gluehbirne (3 gekreuzte radial-gradient-Scheiben + Zylindersockel; geht an: brightness 1+m*.5 + drop-shadow + data-halo) | Kochtopf #6b3951 (18-Segment-Zylinder, Deckel data-deckel hebt/kippt/verschiebt, 3 .steam-Schwaden ab m>.5).
SCROLL-REGIE: rAF-Loop, p=clamp((scrollY-top)/(hoehe-vh)); Rotation -24+p*300+idle(nur sichtbar), Scale 0.62->1.12->Exit-Shrink, Opacity-Rampen; --m=smooth(.34,.72,p) treibt Morphs; .ph data-at 0.08/0.34/0.60 fuer fliessendes Aufdecken; --g Buehnen-Glow. HAERTUNGEN: try/catch um frameBody + 1s-Watchdog (rAF-Neustart falls >800ms still) + measure() zusaetzlich auf load UND document.fonts.ready (Font-Swap verschiebt Offsets!). REDUCED MOTION: komplette Statik-Variante (Kapitel auto-Hoehe, alles sichtbar, keine Regie).
TEST-LEKTIONEN (WICHTIG fuer kuenftige Scroll-Regie-Tests): (1) html scroll-behavior:smooth animiert auch programmatisches scrollTo -> im Test IMMER behavior:'instant'. (2) Headless-Software-Rendering: nach grossen Scroll-Spruengen sporadische rAF-Starvation (>300ms) -> Zustand hinkt nach; DETERMINISTISCHER SYNC: nach scrollTo auf ZWEI requestAnimationFrame-Ticks warten (Promise-Kette), erst dann lesen. Damit 12/12 Oszillationslaeufe exakt.
Headless verifiziert: 9 Hero-Wort-Spans; 3D-Flaechen 33/16/34/20/65; alle 5 Morphs (Griff -16px, Fenster an, Tuer -78deg, brightness 1.5, Deckel -66px, Dampf an); Phasen 3/3; Leiste ab 0.72vh; Count-up exakt 5/8/370/16/544; 0 PageErrors, 0 Console-Errors.
NAECHSTER SCHRITT: FREIGABE DES USERS abwarten. Bei Freigabe: Uebernahme in index.html (Plan oben); bei Aenderungswuenschen: Objekte/Farben/Texte in startseite-neu.html anpassen.

## STARTSEITE V2: PASSENDE BEWEGUNG + FARBE + GLAETTUNG (SW -2987)
User-Feedback zum Entwurf: Stil stimmt; farbenfroher, sauberer, 3D nicht immer gegeben, Bewegung nicht immer passend. Umsetzung in startseite-neu.html (558 Z.):
BEWEGUNGSPROFILE je Objekt (MOTION-Map, statt Einheits-300-Grad-Drehung): koffer r-30..206+Idle-Schwingen+Bob | haus r-40..32 (architektonischer Schwenk) | tuer r-24..-6 (BLEIBT FRONTAL; Tuerblatt oeffnet separat -80deg via smooth(.3,.8)) | birne r-14..12 + PENDEL am neuen Kabel (.cord, data-pend rotateZ sin, transformOrigin 0/-172px, Amplitude waechst mit m) | topf r-34..26 + Koecheln (simmer-Jitter*m). Rotationen geeast (smooth 0..1).
GLAETTUNG: Lerp c.sp += d*0.14 mit TELEPORT-SNAP (|d|>0.35 -> sofort; wichtig fuer Anker-Spruenge UND deterministische Tests). Alle Visuals aus sp, .ph-Phasen aus rohem p.
3D-FIX HAUS: Dachflaechen-Winkel MATHEMATISCH BEWIESEN (rotateX +/-asin(D/(2L)), L=sqrt((D/2)^2+R^2)=80.62, phi=43.99deg; node-Matrixprobe: beide Firstkanten exakt [0,-58,0]). Dach-Settle-Ziel translateY(-14px) (Wandoberkante), Giebel-clip-Dreiecke vorn/hinten.
FARBE: .glowbg kraeftiger (opacity g*.42, Parallaxe translate3d+scale via JS) + NEUE .glowbg2 je Buehne (Zweitfarbe --wc2: reisen/immobilien #e8c46a, wohnen #a6c184, wissen #fff0c4, kulinarik #d98fb4; Gegen-Parallaxe) + 6 .spark-Farbpartikel je Buehne (JS-injiziert, sparkfloat alternate, opacity an --g gekoppelt) + Vignette .stage::after (clean Look) + hellere Objekt-Basisfarben (koffer #b8871f, haus #4f6a3d, dach #8a3a30, topf #7d4260) + Fenster/Klinke-Leuchten (box-shadow) + waermere Birnen-/Tuer-Glows. Reduced Motion: .spark ohne Animation, Objekte statisch bei halbem r1.
Headless verifiziert: 30 Partikel/5 Glow2/1 Kabel; koffer rotY 187; haus 24.5 + Dach -14px + Fensterglow; tuer obj -7.9 (frontal) + Blatt -80; Birne Pendel + brightness 1.5; Deckel -68/+32; Glow-Parallaxe aktiv; Oszillation 12/12 (rAF-Sync); 0 PageErrors.
STATUS: Entwurf v2 zur erneuten Sichtung durch den User. Bei Freigabe: Uebernahme in index.html (SEO/JSON-LD/heiben-legal/PWA von Alt-index uebernehmen, Alt-index ggf. als startseite-klassisch.html sichern).

## STARTSEITE: HAUSDACH-KORREKTUR (SW -2988)
User meldete: Dach falsch berechnet. URSACHE GEFUNDEN: Die GIEBEL-Dreiecke sassen an Vorder-/Rueckseite (X-Y-Ebene bei z=+-D/2) — dort kommen aber die SCHRAEGEN herunter; die Giebel gehoeren an die STIRNSEITEN (+-X). Fehlerbild: Dreieck ragt durch die Dachflaeche, Seiten offen. (Lektion: der fruehere Mathe-Beweis prüfte NUR die Schraegen — Beweise muessen ALLE Bauteile abdecken.)
FIX in startseite-neu.html, Haus-Builder: Giebel jetzt face(D,R, translateY(-R/2) rotateY(+-90deg) translateZ(W/2)) mit clip-Dreieck; NEU Firstbalken box(W+24,6,10) auf translateY(-R). VOLLSTAENDIGER Mathe-Beweis (node, CSS-Matrizen): Schraege First [0,-58,0] + Traufe [0,0,56] + Giebelspitze [80,-58,0] + Giebelfuesse [80,0,+-56] — alle 6 Punkte EXAKT auf Soll.
BROWSER-VALIDIERUNG (Lektion: 0-Groessen-GRUPPEN liefern keine projizierten Kind-Rects -> immer FLAECHEN (.f mit width) messen): projizierte Union Dach 258..359 / Wand 318..457 -> Dach beginnt ueber Wand, 41px Traufueberlappung (anliegend), Dachbreite 228 >= Wand 210 (Ueberstaende). Regression: Tuer -80deg, Birne brightness 1.5, Deckel-Hub, Oszillation 8/8, 0 PageErrors.
STATUS: Entwurf v2.1 zur Sichtung. Bei Freigabe: Uebernahme in index.html (Plan siehe oben).

## STARTSEITE: FLIESSENDE EIN-/AUSFAHRT JE OBJEKT (SW -2989)
User meldete: Animationen starten/enden "in 2D", stockend. URSACHE: Sticky-Klassiker — vor dem Anpinnen und nach dem Loesen schob sich die Buehne als eingefrorenes Standbild durchs Bild (Objekt starr bei r0/Endpose, Opacity erst ab Pin), erst dann sprang die Regie an.
FIX in startseite-neu.html — DURCHGEHENDE LEBENSLINIE je Kapitel: drei Phasen ein (Buehne gleitet herein, (SY-(top-vh))/vh) -> p (gepinnt) -> aus ((SY-(top+len))/vh), getrieben von EINER globalen Scroll-Glaettung SY (Lerp 0.14, Teleport-Snap ab 0.6*vh — ersetzt die per-Kapitel-sp-Glaettung). Objekt waehrend Einfahrt: bereits sichtbar (op=smooth(.12,.7,ein)), steigt aus +72px, dreht aus r0-pre an; waehrend Ausfahrt: dreht ueber r1+post hinaus weiter, entschwebt -96px, blendet auf ~0.27 Rest. Scale-Huellkurve (.8+.2*eEin)*(1-.18*eAus). MOTION-Profile um pre/post ergaenzt (koffer 64/52, haus 26/22, tuer 12/10, birne 10/8, topf 30/26 — frontale Objekte drehen nur minimal an). Glow --g und Parallaxe par jetzt ueber die Gesamtspanne (top-vh .. top+len+vh). Morphe (--m) und Textphasen bleiben an der Pin-Phase (m aus p, .ph aus rohem praw).
Headless verifiziert (haus): Einfahrt op .725/ty +36/rot -53; PIN-GRENZE (+-4px, via Snap-Doppelsprung deterministisch): Delta-rot 0.00 Grad, Delta-op 0.000 — mathematisch nahtlos; Ausfahrt op .734/ty -48/rot +43. Regression: tuer -80, birne 1.5, deckel, Oszillation 8/8, 0 PageErrors.
TEST-NOTIZ: kleine Scroll-Deltas (<0.6vh) konvergieren wegen Lerp langsam — fuer deterministische Grenz-Messungen erst gross wegspringen (Snap), dann gross zur Zielposition springen (Snap).
STATUS: Entwurf v2.2 zur Sichtung; bei Freigabe Uebernahme in index.html (Plan oben).

## CLAUDE.MD FUER CLAUDE CODE ANGELEGT (nach Container-Reset aus Zip -2989 restauriert)
Projekt-Root enthaelt jetzt CLAUDE.md (wird von Claude Code automatisch gelesen): Arbeitsweise, Pflicht-Workflow (SW-Bump/Handover/Kennzahlen), Architektur-Regeln, stabile Vertraege, Test-Muster inkl. aller Lektionen, Status inkl. startseite-neu-Freigabestand. Bei Regel-Aenderungen CLAUDE.md mitpflegen. Uebergabe-Paket: /mnt/user-data/outputs/heiben_remake_claudecode.zip.
## KIT NACH GIT UEBERNOMMEN (Repo YaDa-MAX/Awesome-Design-Tools, Branch claude/heiben-claude-md-bdj8ho)
Der komplette Kit-Bestand aus dem Uebergabe-Zip liegt jetzt versioniert im Repo-ROOT (nicht in einem
Unterordner) — damit stimmen alle Pfade aus CLAUDE.md unveraendert: web/, tools/gen_kennzahlen.js,
_WEITERARBEIT.md, REMAKE-KONZEPT.md. Uebernommen: web/ (101 HTML + assets/ + vendor/), docs/ (22 MD),
app/, assets/, brand/, contract/, data/, exporte/, mock/, print/, tools/, vorlagen/,
build-suche-index.js, build_standalone.py, UEBERGABE-NAECHSTER-CHAT.md. mock/__pycache__ verworfen und
via .gitignore ausgeschlossen. KEINE inhaltliche Aenderung an web/ -> SW bleibt korrekt bei
heiben-v20260622-2989 (kein Bump, weil kein Asset veraendert wurde).
ALTBESTAND DES REPOS bleibt vorerst liegen (README.md, index.js, package.json, Media/,
Awesome-Design-*.md, docs/ mit js|css|assets|modules|server.js|index-*.html der Fremd-Vorlage) —
keine Dateinamen-Kollision mit dem Kit ausser CLAUDE.md (= Kit-Fassung). Aufraeumen erst auf Ansage.
IMPORT-VERIFIKATION (headless Chromium, python3 -m http.server 8180, Noise-Filter wie in CLAUDE.md):
alle 101 Seiten inkl. startseite-neu.html geladen -> 0 Seiten mit Befund, 0 PageErrors,
0 Console-Errors. Struktur-Gegenprobe: 11 Bruecken-Seiten, heiben-kennzahlen.js 5/8/370/16/91/544/165,
`grep -L heiben-design.css web/*.html` -> nur startseite-neu.html (erwartet, Standalone-Entwurf).
NAECHSTER SCHRITT: User-Ziel "Remake des gesamten". W1-W7 sind laut Protokoll fertig; offen sind
Freigabe/Uebernahme von startseite-neu.html v2.2 als index.html und der Backlog (gen_tagesdosis_daten.py,
Kompendium-Stationen-Autohaken, Behoerdengaenge-Kompendium, Brutto-Netto-Rechner). Scope-Klaerung
mit dem User vor Beginn.

## REMAKE V3 — BLAUPAUSE + SUBSTANZ-AUDIT (keine web/-Aenderung, SW bleibt -2989)
User-Auftrag: "Neue Remake Runde ueber alles bestehende". Erstes Deliverable = Blaupause, gestuetzt
auf ein GEMESSENES Audit statt auf Annahmen. Neu: REMAKE-KONZEPT-V3.md (Arbeitsplan, ersetzt v2 als
Plan; REMAKE-KONZEPT.md bleibt als Historie) + tools/audit_v3.py (reproduzierbares Messinstrument,
Aufruf `cd web && python3 ../tools/audit_v3.py`, 8 Abschnitte, dient als Fortschrittsbeleg je Welle).
LEITSATZ V3: v2 hat den RAHMEN vereinheitlicht (Nav/Design auf 100 Seiten), v3 vereinheitlicht, WAS
IM RAHMEN STEHT.
AUDIT-BEFUNDE (Ist bei SW -2989, 101 Seiten):
- GEWICHT: 6.204 KB HTML (O 61 KB/Seite); inline style 33,1% / inline script 38,5% / base64 19,3%.
  1.874 KB liegen BYTE-IDENTISCH mehrfach (46-KB-CSS-Block in 29 Seiten = faktisch styles.css,
  3-KB-JS in 42, 5-KB-JS in 25); mit base64 zusammen 3.069 KB = 49,5% des HTML vermeidbar.
  index.html besteht zu 88% aus base64-Bildern, die als assets/hero-*.png schon existieren.
- KOPF: design.css 100/101, nav 99/101, ABER description 52, og 35, theme-color 42, SW-Reg 42,
  manifest 41, heiben-legal.js 29, JSON-LD 2, canonical 0. -> PWA laeuft auf <50% der Seiten,
  Disclaimer-Schicht auf 29.
- AUFFINDBARKEIT: 0 kaputte Links, aber 21 VERWAISTE Seiten (14 davon Rechner/Werkzeuge). Suchindex
  348 Eintraege auf nur 18 Zielseiten (indexiert Inhalte, keine Seiten) -> 83 Seiten unauffindbar.
  v2 §2.1 "Werkzeuge wohnen in ihrer Welt" ist NICHT umgesetzt (Nav ja, Verlinkung nein).
- OFFLINE: 62/101 precached; NICHT dabei alle 8 Kompendien, wissen.html, lernpfade, begriffskarten,
  tagesdosis, mein-heiben, zuhause-ordner -> Offline bricht genau am Wissenskern.
- SPEICHER: 88 distinkte localStorage-Schluessel in ZWEI Schemata (59x heiben-..., 29x heiben_..._v1),
  kein Register, kein Export/Import; mein-heiben liest 5 davon -> die "Klammer" klammert nicht.
- KANON: heiben-firmierungen.js nur auf 7/101 Seiten eingebunden, Weltfarben ~1.050x hart kodiert.
- GEWICHTUNG: wissen 31 / holding 22 / kulinarik 12 / wohnen 10 / studio 9 / immobilien 5 / konto 5 /
  reisen 5 -> die fuenf OPERATIVEN Welten stellen nur 41% des Bestands. 11 Backoffice-Seiten.
- LADELAST: mein-heiben 909 KB (laedt lebenswissen-daten 649K + tagesdosis-daten 206K komplett),
  wohnen-konfigurator 798 KB, index 450 KB, wissen 356 KB — startseite-neu 34 KB (Massstab!).
PLAN: E1 gen_kopf.js+seiten.json | E2 Entdoppelung (styles.css verlinken statt inlinen) | E3 base64
raus | E4 heiben-speicher.js (Register+Export/Import, Schluesselnamen UNVERAENDERT) | E5 Weltfarben
nur noch aus der Registry | E6 heiben-werkzeuge.js + Seiten-Index in der Suche | E7 Precache
generiert + Datenmodul-Kurzfassungen. Wellen V3-W1..W7 mit je einem verifizierten Deliverable;
W1-W3 ausdruecklich UNSICHTBAR (kein sichtbares Ergebnis darf sich aendern). Ziel nach W1-W3:
HTML 6,2 -> ~3,0 MB, Kopf 101/101, Offline 101/101, mein-heiben <120 KB.
OFFEN — 3 Entscheidungen vor W1 (siehe REMAKE-KONZEPT-V3.md §6): (1) Reihenfolge Substanz-zuerst vs.
Startseite-vorziehen, (2) Backoffice-Schicht behalten+rahmen oder aus der Sitemap nehmen,
(3) Repo-Altbestand der Fork-Vorlage Awesome-Design-Tools entfernen?

## REMAKE V3 · WELLE 1: ENTDOPPELUNG + BILDER ALS DATEIEN (SW -2990)
User-Entscheide vorab: (1) Substanz zuerst, Startseite zuletzt; (2) Backoffice-Seiten behalten und
als interner Bereich rahmen (-> V3-W6); (3) vom Fork-Altbestand nur README.md ersetzen.
NEU tools/entdoppeln.py (Pruef-/Anwendungslauf, Mapping-Tabelle md5-Praefix -> Zieldatei; nur was
dort steht, wird angefasst). AUSGELAGERT aus dem Markup, WORTGLEICH:
- styles.css (46,9K) — Leitfassung fuer 29 Seiten. WICHTIG: styles.css war ein TOTES File (von 0
  Seiten verlinkt, build_standalone.py inlined es); die lebenden Kopien lagen inline und waren in
  DREI Fassungen auseinandergedriftet. Unterschiede exakt: .cross-grid.quad repeat(4) vs repeat(5)
  und die Regel .cross-card.kulinarik. BEIDE Selektoren kommen im Markup NUR in familie.html vor,
  und familie.html trug bereits die Leitfassung -> Zusammenfuehrung ergebnisgleich fuer jede Seite.
  styles.css traegt jetzt die Leitfassung, damit build_standalone.py weiter stimmt.
- hb-bestand-redaktion.css (37,9K x2), hb-bestand-statisch.css (12,4K x6), hb-weltmosaik.css (2,8K x8),
  hb-menue.css (1,5K x34), hb-motion.css (0,6K x42)
- hb-kulinarik-core.js (21,6K x5), hb-schaufenster-core.js (12,5K x3), hb-magazin-core.js (11,5K x3),
  hb-anfrage-core.js (11,5K x3), hb-anfrage-app.js (9,5K x3), hb-suche-nav.js (5,0K x25),
  hb-pwa.js (3,6K x42), hb-motion.js (1,3K x37)
  (mehrere trugen den Kommentar "eingebunden aus _src/...-core.js" — die Auslagerung stellt den
  urspruenglichen Zustand wieder her; ein _src/ existiert im Kit nicht mehr.)
BILDER: alle 20 base64-Vorkommen (1.195 KB) durch assets/-Dateien ersetzt — jede war md5-identisch
mit einer bereits vorhandenen Datei (wordmark-*, hero-light). Einziger Rest: ein 0-KB-webp-Pruefpixel
in wohnen-konfigurator.html (kein Asset, bleibt).
SERVICE-WORKER: 16 Eintraege ergaenzt (die 13 neuen Dateien + styles.css + heiben-design.css +
heiben-nav.js — die drei letzten waren NIE precached, d.h. das Fundament fehlte offline schon vorher).
Precache jetzt 127 Eintraege, alle Dateien existieren. Version -2989 -> -2990.
ERGEBNIS: HTML 6.204 KB -> 2.901 KB (-53,2%), O 61 -> 29 KB/Seite. base64 19,3% -> 0%. Restliche
byte-identische Redundanz 28 KB (1,0%). 42 von 101 Seiten veraendert, 31.040 Zeilen entfernt.
VERIFIKATION (Vorher-Stand via `git archive HEAD web` auf Port 8181, Nachher auf 8180):
- LAYOUT-FINGERABDRUCK je Seite (jedes sichtbare Element: Tag/Klasse/x/y/Breite/Hoehe + color,
  background, font-size/weight, display, grid-template-columns, border-top-color), 42/42 geaenderte
  Seiten: 41 exakt identisch. index.html zeigte 6 Elemente mit 0,5px Y-Versatz.
- DIAGNOSE index.html: der Nachher-Stand wich AUCH VON SICH SELBST ab (Kontrolllauf 8180 vs 8180),
  Vorher jittert 431,76/431,99, Nachher 431,99/432,25 — kein Vorgaenger und kein Vorfahr aendert die
  Hoehe. Gegenprobe MIT `document.fonts.ready` + 1,5s + 2 rAF: Vorher 430,250 / Nachher 430,250 in je
  6 Laeufen, exakt gleich. -> Schrift-Swap-Timing des Messverfahrens, KEINE Layoutaenderung.
  LEKTION fuer kuenftige Vorher/Nachher-Messungen: immer auf document.fonts.ready warten, sonst
  misst man den Font-Swap statt des Layouts.
- node --check ueber alle 13 neuen JS-Dateien: fehlerfrei.
- SWEEP: alle 101 Seiten -> 0 PageErrors, 0 Console-Errors.
AUSSERDEM: README.md durch eine HeiBen-Fassung ersetzt (Fork-Herkunft und Vorlagen-Dateien darin
benannt); CLAUDE.md fortgeschrieben (SW -2990/naechste -2991, Regel "gemeinsame Dateien IMMER
precachen", Regel "nie wieder inlinen, Bilder nie als base64", Status v3).
NEBENBEFUNDE fuer spaetere Wellen (NICHT angefasst): (a) nur noch 4 Seiten haben ueberhaupt ein
<nav>-Element, hb-suche-nav.js haengt aber an `document.querySelector('nav')` -> auf ~21 der 25
Seiten wirkungslos; (b) hb-bestand-statisch.css (12,4K) und hb-bestand-redaktion.css (37,9K) sind
aeltere Teilfassungen desselben Stylesheets — Zusammenfuehrung erst nach Sichtpruefung, NICHT
blind; (c) inline-JS ist jetzt 63,5% des HTML (1.841 KB), Spitzenreiter wohnen-konfigurator.html
mit 752 KB in EINER Seite.
NAECHSTER SCHRITT bei "Weiter": V3-W2 KOPF-GENERATOR — tools/seiten.json (Welt/Titel/Description/Typ
je Seite) + tools/gen_kopf.js schreibt einen normierten Kopfblock zwischen <!-- hb:kopf --> Marker:
description/canonical/og/twitter/theme-color in Weltfarbe/manifest/Favicons/heiben-design.css/
heiben-nav.js/heiben-legal.js/SW-Registrierung/JSON-LD. Ziel: Audit-Abschnitt 2 auf 101/101.

## REMAKE V3 · WELLE 2: KOPF-GENERATOR (SW -2991)
NEU tools/seiten.json (Registry: 101 Seiten mit welt/typ/titel/beschreibung, index.html mit "nav":false)
und tools/gen_kopf.js. Der Generator besitzt AUSSCHLIESSLICH layoutfreie Metadaten und schreibt sie
zwischen <!-- hb:kopf --> und <!-- /hb:kopf --> direkt hinter <head>: charset, viewport, title,
description, canonical, robots(noindex fuer intern), theme-color, Favicons, Manifest, App-Meta,
og/twitter, JSON-LD. Er FASST NICHT AN: Schriften (die Fraunces-Achsen unterscheiden sich je Seite —
Vereinheitlichung wuerde das Schriftbild aendern!), Stylesheets, <style>-Bloecke, sonstige Skripte.
Vorhandene Einbindungen werden nie verschoben, fehlende nur ergaenzt (89 Seiten).
49 BESCHREIBUNGEN NEU GESCHRIEBEN — aus dem echten Einstiegstext der Seite, nicht aus dem Titel
abgeleitet (105-149 Zeichen). Titel waren auf allen 101 Seiten vorhanden.
TYPISIERUNG (steuert Sitemap-Prioritaet, noindex und spaeter das Werkzeug-Register in W4):
weltseite 30 · werkzeug 21 · intern 11 · holding 9 · kompendium 8 · legal 6 · wissen 5 · welt 5 ·
konto 4 · start 1 · standalone 1 (startseite-neu.html wird komplett ausgelassen).
SITEMAP + ROBOTS folgen derselben Registry: sitemap.xml 18 -> 88 URLs (alles ausser intern,
standalone, 404), robots.txt Disallow 7 -> 11 Eintraege; dieselben 11 Seiten tragen jetzt
<meta name="robots" content="noindex, nofollow">.
GEFUNDENER FEHLER (behoben): Titel wurden roh aus dem HTML in die Registry uebernommen und dann
erneut escaped -> "&amp;amp;" auf 8 Seiten. Registry entschluesselt, und gen_kopf.js entschluesselt
jetzt IMMER vor dem Kodieren (Registry-Text ist Klartext, nicht HTML).
AUDIT-INSTRUMENT NACHGEZOGEN: audit_v3.py liest jetzt tools/seiten.json und kennt die bewussten
Ausnahmen; SW-Registrierung wird ueber "serviceWorker" ODER "hb-pwa.js" erkannt (seit W1 extern) —
sonst meldet das Instrument dauerhaft falsche Luecken.
ERGEBNIS Audit-Abschnitt 2 (ohne den Standalone-Entwurf): description/og/canonical/theme-color/
manifest/heiben-design.css/heiben-legal.js/SW-Registrierung je 100/100, heiben-nav.js 99/99 (ohne
index.html), JSON-LD 89/89 (ohne die 11 internen), noindex 11/11. Vorher: manifest 41, SW-Reg 42,
heiben-legal.js 29, canonical 0.
PREIS: HTML 2.901 -> 3.068 KB (+167 KB = ~1,7 KB Kopf je Seite). Bewusst — vollstaendige Metadaten
statt halber PWA.
BEABSICHTIGTE SICHTBARE AENDERUNG (die einzige): heiben-legal.js lief bisher auf 29 Seiten, jetzt auf
100 -> die Hinweisleiste zur lokalen Speicherung erscheint nun auf jeder Seite (einmalig, per
localStorage heiben-consent quittiert). Ebenso hb-pwa.js 42 -> 100 (Installhinweis, heiben-pwa-dismiss).
VERIFIKATION (W1-Stand via git archive auf 8181 gegen W2 auf 8180, Leisten per localStorage
vorquittiert, Messung nach document.fonts.ready + 2 rAF):
- Layout-Fingerabdruck aller 100 Seiten: 97 exakt identisch. Die 3 Abweichungen (begriffskarten,
  koeln-quiz, wissensquiz) zeigen dieselbe Abweichung im KONTROLLLAUF vorher-gegen-vorher —
  Zufallsinhalt (zufaellige Karte, gemischte Antworten), gleiche Position, nur andere Textbreite.
  -> W2 ist auf 100/100 Seiten layoutneutral.
- Beabsichtigte Wirkung stichprobenartig belegt: auto/sparziel/wissen vorher ohne Leiste, ohne
  hb-pwa, ohne description/canonical/manifest — nachher alles vorhanden.
- 89 JSON-LD-Bloecke, alle valides JSON. Keine doppelten Einbindungen (Mehrfachtreffer bei
  heiben-nav.js/heiben-legal.js sind Kommentare bzw. sichtbarer Text in unternehmen.html).
- SWEEP: alle 101 Seiten -> 0 PageErrors, 0 Console-Errors.
NAECHSTER SCHRITT: siehe folgender Abschnitt (Design-Auftrag des Users).

## REMAKE V3 · WELLE 3: DESIGNGRUNDSTRUKTUR + BEWEGUNGSGRAMMATIK (SW -2992)
User-Auftrag: "Designe neu und ueberdenke gesamte Designgrundstruktur und Aufbau aller Animationen
und Darstellungen." Wellenplan entsprechend umgestellt (Design vorgezogen, Offline/Ladelast jetzt W4).
AUDIT DER GESTALTUNGSEBENE (152 Stilquellen, neu als Abschnitt 9 in tools/audit_v3.py):
104 Hex-Farben + 98 rgb/rgba · 160 font-size-Werte · 24 Radien · 37 Schatten · 47 transitions ·
4 Easings · 13 keyframes · 87 Custom Properties in 834 Deklarationen (--bg/--ink/--rule je 67x neu
definiert, weil praktisch jede Seite ihren eigenen :root-Block mitbringt) · prefers-reduced-motion
in 4 von 152 Quellen beachtet. Befund: keine Geschmacksfrage, sondern fehlende Grammatik.
NEU heiben-design.css (115 -> 387 Zeilen, 21 KB), VIER EBENEN:
 1 TOKENS als ROLLEN — Flaeche (grund/grund-2/papier/tief), Schrift (text/leise/zart/invers),
   Linie (zart/normal/stark), Akzent+Signal, 5 Weltfarben, Schriftskala mit NEUN Stufen
   (mikro..display, die grossen per clamp()), Zeilen/Sperrung/Mass, Raum als 4-px-Raster
   (raum-1..10), Form (rund-s..xl+voll), Hoehe (4 Stufen, WARM getoent rgba(31,28,23,..), nie
   neutrales Schwarz), BEWEGUNG (5 Dauern, 4 Kurven, 3 Wege, Stufung), Ebenen (z-*).
 2 WELTZUWEISUNG — [data-hb-welt] setzt --hb-welt (+ --hb-welt-zart / --hb-welt-linie via
   color-mix). Damit steht die Weltfarbe EINMAL im System statt ~1.050-mal als Hex in den Seiten.
   Der Rollout auf die Bestandsseiten ist W6, das Fundament steht ab jetzt.
 3 BESTAND v2 — die W1-Bauteile ZEICHEN FUER ZEICHEN unveraendert; ihre Tokens (--hb-bg, --hb-ink,
   --hb-rule, --hb-terra ...) zeigen jetzt per var() auf die Rollen. Gleiche Werte, eine Quelle.
 4 BAUSTEINE v3 — Geruest (satz/spalte/abschnitt/stapel/linie-quer), Schrift (augenbraue/display/
   titel/titel-2/titel-3/vorspann/fliess/beischrift), Raster, Flaeche (+hebt/welt/zart), Weltkachel
   (Farbkante waechst beim Zeigen), Taste (3 Auspraegungen), Marke+Punkt, Wert+Band, Notiz
   (4 Toene ueber --hb-welt-Umschreibung), Steckbrief-Zeile, Feld, Buehne (dunkel, schreibt die
   Rollen fuer ihren Teilbaum um -> KEINE zweite Palette noetig), einheitlicher Fokusring.
BEWEGUNG NEU GEFASST (hb-motion.css 12 -> 71 Zeilen, hb-motion.js 24 -> 118 Zeilen):
 - VOKABULAR in Tokens: zeit-sofort/kurz/mittel/lang/szene = 90/180/320/620/900 ms;
   ease-standard/ein/aus/betont; weg-klein/mittel/gross = 10/26/56 px; stufe 70 ms.
   GLUECKSFALL: die Altwerte (.9s, cubic-bezier(.16,1,.3,1), 26px) SIND exakt zeit-szene +
   ease-ein + weg-mittel -> der Bestandspfad laesst sich in Tokens ausdruecken, ohne dass sich
   irgendetwas aendert.
 - ANSAGE STATT RATEVERFAHREN: data-hb-motion="auf|ein|skala|seite|seite-rechts|linie" im Markup.
   Bisher wurde per Element- und SUBSTRING-Treffer geraten ([class*="grid"]) — genau die
   Kollisionsanfaelligkeit, die im CSS seit jeher verboten ist. Stufung aus der Geschwisterfolge
   (oder data-hb-stufe), Zusatzflaggen data-hb-betont / data-hb-ruhig.
 - ZWEI PFADE, EIN BEOBACHTER: Bestandspfad eingefroren; <body data-hb-regie="ansage"> schaltet ihn
   ab, damit neue Seiten nur zeigen, was sie ansagen.
 - BEWEGUNGSRUHE ist eine EINSTELLUNG, kein Ausstieg: die Token-Dauern und -Wege gehen auf null,
   Gestalt und Inhalt bleiben. Zusaetzlich wird die Einstellung zur LAUFZEIT nachgezogen
   (matchMedia change). Bisher stieg das Skript komplett aus.
NEU web/designsystem.html (349 Z., 22 KB, verlinkt aus marke.html, precached, typ "holding"):
lebender Styleguide mit Weltschalter (ein Attribut am body faerbt die ganze Seite um), Farbrollen,
Schriftskala, Raum/Form/Hoehe, dem kompletten Bewegungsvokabular als Tabelle, den fuenf Rollen als
Live-Vorfuehrung mit Wiederholen-Knopf, allen Bausteinen und dem Regelwerk.
DREI FEHLER WAEHREND DER WELLE GEFUNDEN UND BEHOBEN:
 1. NAMENSKOLLISION: mein Weltschalter nutzte data-welt — das gehoert heiben-nav.js (Weltlinks).
    Der Testklick landete auf der Navigation und navigierte nach kulinarik.html. Umbenannt auf
    data-ds-welt; Regel in CLAUDE.md aufgenommen.
 2. SICHERHEITSNETZ: meine erste Fassung setzte nach 3 s auch 'hb-done' — das haette laufende
    Animationen mittendrin abgeschnitten. Getrennt in alleZeigen() (sofort sichtbar, fuer
    Bewegungsruhe) und netzAuffangen() (nur Eintritt ausloesen).
 3. STARTZEITPUNKT: erste Fassung wartete auf DOMContentLoaded. Der Bestand bindet die Datei am
    ENDE des <body> ein und setzt die Reveal-Klassen noch waehrend des Parsens — spaeteres Setzen
    kann den Inhalt kurz aufblitzen lassen. Jetzt: sofort starten, bei DOMContentLoaded nachtragen;
    start() ist ueber data-hb-erfasst idempotent.
VERIFIKATION (W2-Stand via git archive auf 8181 gegen W3 auf 8180, Messung nach fonts.ready + 2 rAF):
 - Layout-Fingerabdruck aller 100 Bestandsseiten: 97 identisch. Dieselben 3 Seiten wie in W2
   (begriffskarten, koeln-quiz, wissensquiz) mit derselben Signatur — nur Textbreite, Position und
   Hoehe gleich = Zufallsinhalt, in W2 bereits per Kontrolllauf vorher-gegen-vorher bewiesen.
 - designsystem.html: Bestandspfad 0 (Regie=ansage greift), 21 angesagte Elemente, 21 eingetreten,
   0 unsichtbar, Stufung 0/70/140 ms bei Geschwistern; Weltwechsel faerbt Kante und Augenbraue
   korrekt (kulinarik #6b3951, reisen #a97a1d, wohnen #4a5c39, holding #1f1c17); 0 PageErrors.
 - Audit-Abschnitt 9 neu: misst Fragmentierung, Fundament-Tokens, Bewegungsruhe-Abdeckung und die
   Verbreitung des Ansagepfads. --hb-* jetzt 99 Rollen in 126 Deklarationen (statt verstreuter Werte).
MARKEN-DNA UNVERAENDERT: dieselbe warme Palette, dieselben Schriften, dieselben Weltfarben. Neu ist
die Ordnung, nicht der Ausdruck. Die Nicht-Ziel-Zeile "kein neues Design-System" in
REMAKE-KONZEPT-V3.md wurde entsprechend mit Nachtrag korrigiert statt still gelassen.
NAECHSTER SCHRITT bei "Weiter": V3-W4 OFFLINE & LADELAST — Precache aus dem Dateibestand generieren
(tools/gen_sw.js), grosse Datenmodule (lebenswissen 649K, kulinarik 519K, tagesdosis 206K) fuer
Uebersichtszwecke durch generierte Kurzfassungen ersetzen, mein-heiben von 909 KB auf < 120 KB.

## REMAKE V3 · WELLE 4: OFFLINE & LADELAST (SW -2994)
NEU tools/gen_sw.js — erzeugt die PRECACHE-Liste aus dem Dateibestand und zaehlt die Cache-Version
hoch. GRUNDSATZ: der Precache sichert den KALTSTART, nicht den ganzen Bestand. Der fetch-Handler
macht ohnehin stale-while-revalidate, legt also jede abgerufene Datei beim ersten Gebrauch ab.
Vorab: alle Seiten ausser Standalone (aus tools/seiten.json) + jede referenzierte Datei bis 150 KB
+ Manifest. Draussen: vendor/ und Einzeldateien > 150 KB (10 Dateien, 4.762 KB — u. a.
swagger-ui-bundle 1.491 KB fuer die interne api.html).
ERGEBNIS: 62/101 -> 101/101 Seiten precached, 157 Eintraege, 4.372 KB Kaltstart-Huelle.
MEIN-HEIBEN 909 -> 75 KB (-92%), NACHGEWIESEN OHNE FUNKTIONSVERLUST:
- tagesdosis-daten.js (207 KB) wurde NUR fuer BANK.length geladen — eine Zahl. TD_BANK.length ist
  exakt 544 = HEIBEN_KZ.karten; ersetzt durch heiben-kennzahlen.js (264 B), das ohnehin generiert
  wird und bei jeder Kartencharge automatisch mitwaechst.
- lebenswissen-daten.js (650 KB) wurde geladen, um AMAP (id -> Artikel) zu bauen — AMAP wird im
  ganzen Dashboard NIE gelesen (grep: 1 Treffer, die Zuweisung selbst). Ersatzlos entfernt.
- Gegenprobe mit gesetztem Lernstand: "14%" / "4 von 544 Begriffen gemeistert · 0 Pfad-Artikel
  gelesen · 4-Tage-Serie" / 32 Bedienelemente / 1.866 Zeichen Text — vorher wie nachher IDENTISCH;
  Unterressourcen 913 -> 57 KB.
THREE.JS ENTDOPPELT: three.min.js lag DREIMAL byte-identisch im Repo (Wurzel, vendor/three/,
assets/) = 1.767 KB. Kanon ist vendor/three/three.min.js; manufaktur-gestalten.html darauf
umgestellt, die beiden anderen Kopien geloescht (-1.178 KB). THREE r128 laedt vorher wie nachher,
1 Canvas, 0 PageErrors.
ECHTER OFFLINE-TEST (SW installieren, dann context.setOffline(true), dann navigieren):
13/13 Proben erreichbar mit vollem Inhalt — index, wissen, mein-heiben, lebensmittel, auto,
finanzen, papierkram, lernpfade, zuhause-ordner, begriffskarten, kulinarik, reisen, designsystem.
Vorher waren genau diese Wissensseiten NICHT precached.
GEPRUEFT UND VERWORFEN (ehrlich statt kosmetisch):
- "2.598 KB tote Datenlast" war ein FEHLALARM meiner ersten Heuristik: sie durchsuchte nur das
  Seiten-Markup, nicht die eingebundenen gemeinsamen Skripte. kulinarik-daten.js wird sehr wohl
  von hb-kulinarik-core.js benutzt. Nach Einbeziehung der verlinkten Skripte: 0 KB tote Last.
  LEKTION: Nutzungsanalyse IMMER ueber die gesamte Skript-Huelle einer Seite, nie nur ueber das
  Markup.
- wissen.html (378 KB) laedt alle acht Kompendien-Module ZU RECHT: die Volltextsuche baut ein
  "hay"-Feld aus allen String-Feldern. Ein generierter Index waere mit 334 KB GENAUSO GROSS
  (gemessen) — kein Gewinn ohne echten invertierten Index oder Nachladen. Nicht angefasst.
GEFUNDENER FEHLER IM GENERATOR (behoben): (1) manifest.webmanifest stand doppelt in der Liste
(einmal als <link rel="manifest"> gefunden, einmal fest angehaengt) -> Cache hatte 157 statt 158
Eintraege; jetzt ueber Set entdoppelt. (2) Der Versions-Bump wurde auf das Teilstueck NACH dem
PRECACHE-Block angewandt, die Version steht aber am Dateianfang -> griff nie; jetzt auf den
zusammengesetzten Text. (3) Zwei "fehlende Referenzen" waren JS-Vorlagen aus Inline-Skripten
("' + M.esc(a.cover) + '") -> Filter auf Anfuehrungszeichen/Klammern.
NOTIERT, NICHT ANGEFASST: assets/GLTFLoader.js (96 KB) wird von KEINER Seite per src eingebunden —
wohnen-konfigurator.html traegt den Loader inline. Kandidat fuers Aufraeumen, aber moeglicherweise
die Quelle der inlinen Kopie; Entscheid dem User ueberlassen.
PFLICHT-WORKFLOW GEAENDERT: Schritt 1 ist jetzt `cd web && node ../tools/gen_sw.js` statt
Hand-Bump. Precache und Cache-Version kommen beide aus dem Generator.
NAECHSTER SCHRITT bei "Weiter": V3-W5 AUFFINDBARKEIT — heiben-werkzeuge.js (Register der 21
Rechner/Werkzeuge mit Welt und Kurzbeschreibung), gerendert in den Welt-Seiten und in wissen.html;
Seiten-Index in build-suche-index.js ergaenzen (Suche trifft heute 18 von 102 Seiten); Ziel
0 verwaiste Seiten.

## REMAKE V3 · WELLE 5: AUFFINDBARKEIT (SW -2995)
AUSGANGSLAGE: 22 verwaiste Seiten (21 davon Rechner/Werkzeuge), Suchindex traf nur 18 von 102
Seiten, und die Suchseite selbst war ueber KEINEN Markup-Link erreichbar.
ERST GEPRUEFT, DANN GEBAUT: suche.html galt in W0 nicht als Waise, jetzt schon — kein zerstoerter
Link, sondern eine Messwirkung: bis W1 stand der Suche-Injektor INLINE in 25 Seiten, sein
JS-String a.href="suche.html" wurde vom Audit als Markup-Link gezaehlt. Seit der Auslagerung nach
hb-suche-nav.js sieht das Audit ihn nicht mehr. Der Link war also nie echt.
WERKZEUG-REGISTER:
- tools/seiten.json: die 21 typ="werkzeug"-Eintraege tragen jetzt eine "gruppe" — Geld & Vorsorge (8),
  Wohnen & Immobilien (4), Beruf & Bildung (3), Unterwegs (1), Ueben & Spielen (5).
- tools/gen_kopf.js erzeugt daraus web/heiben-werkzeuge.js (dieselbe Registry, die schon Kopf,
  sitemap und robots speist). Neues Werkzeug = ein Eintrag, sonst nichts.
- NEU web/hb-werkzeuge.js rendert in jeden Behaelter <div data-hb-werkzeuge="alle|<welt>|<gruppe>">,
  gebaut ausschliesslich aus den Bausteinen von W3 (.hb-kachel/.hb-raster/.hb-augenbraue).
- Eingesetzt: wissen.html (alle 21, nach Gruppen), reisen.html und immobilien.html (ihr je eines).
  Jede Kachel traegt data-hb-welt -> sie faerbt sich selbst in der Farbe ihrer Welt.
FALLE, DIE ICH DABEI VERMIEDEN HABE: die Kacheln entstehen ERST BEIM RENDERN, also nach dem Start
von hb-motion.js. Mit data-hb-motion haette der Beobachter sie nie erfasst und sie waeren bis zum
3-Sekunden-Sicherheitsnetz unsichtbar geblieben. Client-erzeugter Inhalt tritt jetzt statisch auf;
Regel in CLAUDE.md aufgenommen.
SUCHE:
- heiben-nav.js: "Suche" als eigener Punkt zwischen Wissen und Mein HeiBen. Bisher haing die Suche
  an hb-suche-nav.js, das ein <nav>-Element voraussetzt — das haben nur noch 4 von 102 Seiten, die
  Suche war also auf 96 Seiten unerreichbar. hb-suche-nav.js bleibt unangetastet (Bestand).
- build-suche-index.js erzeugt die t="seite"-Eintraege jetzt aus tools/seiten.json statt sie nur
  fortzuschreiben: 14 -> 89 Seiten (ohne standalone, ohne die 11 internen, ohne 404).
  Index 348 -> 423 Eintraege. Belegt: "sparziel" -> sparziel.html, "kompendium" -> alle 8,
  "designsystem" -> designsystem.html; vorher fand die Suche keine davon.
DREI RESTWAISEN OHNE WERKZEUG-CHARAKTER bekamen ein Zuhause: kulinarik-kochbuch.html (Zeile in
kulinarik.html), studio-einrichtungstheorie.html (neben "Zum Nachschlagewerk" in studio.html),
rechtliches.html (Legal-Zeile in impressum.html).
AUDIT NACHGEZOGEN (dritte Welle in Folge, in der das Messinstrument der Architektur folgen musste):
Abschnitt 3 zaehlte nur Markup-Links — Navigation und Register erzeugen ihre Wege aber zur Laufzeit.
Das Audit liest jetzt zusaetzlich die Ziele aus heiben-nav.js und heiben-werkzeuge.js (letzteres nur,
wenn ueberhaupt ein Behaelter existiert) und weist sie als "zur Laufzeit erzeugte Wege" aus.
ERGEBNIS: Waisen 22 -> 2, naemlich 404.html (Fehlerseite, gewollt) und startseite-neu.html
(Standalone-Entwurf, gewollt). Suchindex 18 -> 89 Zielseiten; die verbleibenden 13 sind die
11 internen Seiten + 404 + Entwurf.
VERIFIKATION:
- Browser: wissen.html 21 Kacheln in 5 Gruppen, alle sichtbar, Weltfarbe #b04a31; reisen.html
  1 Kachel #a97a1d; immobilien.html 1 Kachel #792d29; "Suche" in der Nav auf allen dreien;
  Stichprobe der Registerziele liefert 200 mit korrekten Titeln. 0 PageErrors.
- NAV-DELTA GEMESSEN statt behauptet: auf 8 unveraenderten Seiten Nav-Links 7 -> 8, Nav-HOEHE
  UNVERAENDERT 52,5px, und jedes Element AUSSERHALB der Navigation exakt an derselben Stelle.
  Der Eingriff bleibt also auf die Navigationszeile begrenzt.
- Responsiv: 390 / 768 / 1280 px -> Nav 57/57/52 px, Register 1/2/3 Spalten, kein horizontaler
  Ueberlauf.
- Sweep ueber alle 102 Seiten: 0 PageErrors, 0 Console-Errors.
OFFEN/NOTIERT: suche.html traegt data-hb-welt="wissen", der Nav-Punkt "Wissen" bleibt dort also
aktiv statt "Suche" — stimmig, weil die Suche zur Wissenswelt gehoert; keine Aenderung.
hb-suche-nav.js ist auf 21 der 25 einbindenden Seiten wirkungslos (kein <nav>), bleibt aber
eingefroren; Abbau erst, wenn die 4 Restseiten ihre Alt-Nav verlieren.
NAECHSTER SCHRITT bei "Weiter": V3-W6 SPEICHER-VERTRAG & FARBKANON — heiben-speicher.js (Register
aller 88 Schluessel, Lese-/Schreibhelfer, Export/Import als JSON, reset je Welt; Schluesselnamen
bleiben UNVERAENDERT), mein-heiben als echtes Cockpit ueber alle Welten, und die ~1.050 hart
kodierten Weltfarben auf var(--hb-welt) umstellen.

## REMAKE V3 · WELLE 6: SPEICHER-VERTRAG & FARBKANON (SW -2997)
NEU web/heiben-speicher.js (246 Z., 9 KB, precached): der Vertrag ueber alles, was lokal bleibt.
GRUNDSAETZE, die den Aufbau bestimmt haben:
- Die 88 Schluesselnamen werden nur BESCHRIEBEN, niemals umbenannt — sie sind stabiler Vertrag.
  Bestehende Seiten schreiben weiter direkt in localStorage; das Modul zwingt niemanden zu etwas.
- AUFZAEHLUNG kommt aus dem ECHTEN Speicher, nicht aus dem Register. Sonst gingen zur Laufzeit
  gebildete Schluessel (heiben-immo-…, heiben-kuli-…) verloren. Das Register ordnet nur zu.
- Fuer neue Schluessel greifen zuerst Praefixregeln, dann das Register, sonst "sonstige" — ein
  kuenftiger Schluessel landet also meist ohne Pflege richtig (im Test: heiben-kuli-neuer-… -> kulinarik).
- IMPORT FUEHRT ZUSAMMEN (Standard): vorhandene Eintraege werden NICHT still ueberschrieben.
API: welt() · schluessel() · uebersicht() · lesen/schreiben/entfernen · exportieren() · alsDatei()
· importieren(text,{ersetzen}) · zuruecksetzen(welt|'alle') · groesse().
REGISTER ZWEIMAL GEBAUT — der erste Wurf war falsch: er ordnete nach JEDEM Vorkommen zu, wodurch
mein-heiben.html (das gar NICHTS schreibt, nur liest) 21 Schluessel an sich zog. Gegenprobe ergab
"heiben-lernpfad -> konto" statt "wissen". Neu gebaut nach der Regel BESITZER = WER SCHREIBT
(setItem oder Konstantendefinition); 11 Zuordnungen korrigiert (lernpfad/karten/results ->
wissen, kulinarik-favs -> kulinarik, lw-favs -> studio …). Zwei echt weltuebergreifende Schluessel
per ausdruecklichem Entscheid: heiben-verlauf -> wissen (dort ausgewertet), heiben-app-onboarding
-> holding. Verteilung jetzt: wissen 25 · kulinarik 15 · holding 13 · konto 13 · wohnen 10 ·
studio 5 · reisen 4 · immobilien 3.
MEIN HEIBEN wird zur echten Klammer: neuer Abschnitt "Dein Stand — alles auf diesem Geraet" mit
Kacheln je Welt (Anzahl + Groesse, in der jeweiligen Weltfarbe), Sichern als JSON, Einlesen per
Dateiwahl, Zuruecksetzen mit Rueckfrage. Gebaut aus den Bausteinen von W3.
VERIFIKATION — VOLLSTAENDIGER DURCHLAUF IM BROWSER:
Stand ueber 6 Welten angelegt (10 Schluessel, 408 B) -> Uebersicht zeigt 6 Kacheln korrekt ->
Export 595 B, marke/fassung stimmen -> zuruecksetzen('alle') loescht 10, danach 0 -> Import
10/10 uebernommen, Werte inkl. des dynamischen Schluessels unveraendert -> zweiter Import mit
geaendertem Bestand: 0 uebernommen, 10 uebersprungen, der lokale Wert BLEIBT (Zusammenfuehren
greift) -> Muell-JSON und fremdes Paket liefern lesbare deutsche Fehlermeldungen. 0 PageErrors.
mein-heiben gegen den Vorstand: Werte identisch (14%, "4 von 544 Begriffen …"), Delta ist genau
der neue Abschnitt (+3 Bedienelemente, +364 Zeichen, +9 KB).
FARBKANON — ZAHL DER BLAUPAUSE KORRIGIERT: dort stand "~1.050 hart kodierte Weltfarben". Nachgemessen
ist das irrefuehrend. Die 1.050 enthalten das Designsystem selbst (dort gehoeren sie hin), Verweise
einer Welt auf eine ANDERE (dort ist der Hex richtig) und vor allem #1f1c17, das meist SCHRIFTFARBE
ist, nicht "Studios Weltfarbe". Prueft man nur, wo eine Seite ihre EIGENE Weltfarbe nennt: 59.
Davon liegen 29 in JavaScript (Canvas-/Array-Farben, wo var() wertlos waere), 14 in :root-Bloecken
(dort ist --hb-welt NICHT definiert, weil es am <body> haengt) und 1 im Markup. SICHER ersetzbar:
15 — umgestellt auf var(--hb-welt) in 9 Seiten. Fingerabdruck-Vergleich dieser 9 Seiten: 9/9
IDENTISCH. Die uebrigen sind dokumentierte Ausnahmen, keine offene Schuld.
LEKTION: Eine grosse Zahl im Konzept ist keine Messung. Vor jedem Massen-Ersetzen zaehlen, was
davon SEMANTISCH dasselbe meint.
NAECHSTER SCHRITT bei "Weiter": V3-W7 WELT-BALANCE & BACKOFFICE-RAHMUNG — Reisen und Immobilien
(je 5 Seiten) auf Augenhoehe bringen, die 11 internen Seiten sichtbar als interner Bereich rahmen
(User-Entscheid aus der Blaupause), Cockpit-Abdeckung pruefen.

## REMAKE V3 · WELLE 7: BACKOFFICE-RAHMUNG & WELT-STRUKTUR (SW -2998)
BEFUND VORAB: von den 11 internen Seiten kennzeichneten sich VIER gar nicht als intern
(anfragenverwaltung, bestellverwaltung, kulinarik-export, api nur beilaeufig), die uebrigen taten
es jede anders ("Redaktion", "Backoffice") im Fliesstext. Kein gemeinsamer Rahmen, kein Einstieg.
ACHTUNG MESSFALLE: mein erster Test meldete "10 von 11 kennzeichnen sich selbst" — er fand aber die
META-BESCHREIBUNG aus W2 ("Interner Bereich: …"), nicht sichtbare Rahmung. Erst die Pruefung auf
den BODY-Text ohne Kopfblock zeigte die echte Lage.
RAHMUNG (generiert, nicht von Hand):
- tools/gen_kopf.js erzeugt zusaetzlich web/heiben-bereiche.js mit ZWEI Listen aus derselben
  Registry: die internen Seiten und die Seiten je Welt.
- PFLICHT-Mechanismus um BEDINGTE Eintraege erweitert (nurWenn): heiben-bereiche.js und
  hb-bereiche.js kommen NUR auf interne Seiten und auf Seiten mit passendem Behaelter — nicht auf
  alle 102.
- NEU web/hb-bereiche.js: haengt auf internen Seiten ein Band direkt unter die Navigation
  ("Interner Bereich · Backoffice der HeiBen Holding — nicht Teil des oeffentlichen Auftritts"),
  rendert die Uebersicht in <div data-hb-intern> und die Weltseiten in
  <div data-hb-weltseiten="<welt>">. Bandstil in heiben-design.css, nur neue .hb-intern-*-Klassen.
- holding-dashboard.html bekommt den Abschnitt "Interne Bereiche" mit allen 11 — sie liegen nicht
  mehr lose in der Sitemap, sondern haben einen Einstieg.
- Damit ist typ:"intern" in seiten.json der EINZIGE Schalter: Band, noindex, Fehlen in Sitemap und
  Suche sowie Auftauchen in der Uebersicht folgen automatisch.
WELT-STRUKTUR: reisen.html und immobilien.html zeigen jetzt ihren eigenen Weltbestand
(data-hb-weltseiten) — 4 bzw. 4 weitere Seiten.
WELT-BALANCE — WAS ICH BEWUSST NICHT GETAN HABE: Der Auftrag lautete "Reisen/Immobilien auf
Augenhoehe". Gemessen fehlt dort SUBSTANZ, nicht Struktur: Kulinarik 12 Seiten/439 KB, Wohnen
10/1.014 KB, Studio 9/196 KB gegen Reisen 5/124 KB und Immobilien 5/92 KB. Bruecken sind
vollstaendig und beidseitig (v2 §2.2 erfuellt), Werkzeuge sitzen richtig, das Cockpit deckt alle
fuenf Welten ab. Was fehlt, sind INHALTE — und neue Seiten fuer eine Fiktion zu erfinden ist eine
inhaltliche Entscheidung des Auftraggebers, keine Umbauarbeit. Ich habe die Struktur geliefert und
die Luecke benannt statt sie mit erfundenen Seiten zu kaschieren. Blaupause §1.7a nachgetragen.
VORSCHLAEGE FUER DEN USER (falls Inhalte gewuenscht):
- REISEN: reisen-ziele.html (Ziel-Steckbriefe im Kompendien-Muster, speist die Suche),
  reisen-packliste.html (Werkzeug, Muster wie zuhause-ordner), reisen-rueckblick.html (Kundenreisen
  als Schaufenster-Eintraege).
- IMMOBILIEN: immobilien-nebenkosten.html (Werkzeug: Kaufnebenkosten je Bundesland),
  immobilien-objekt.html (Objekt-Detailseite analog schaufenster-detail),
  immobilien-vermieten.html (Leitfaden, Bruecke zu papierkram).
Jede neue Seite braucht nur einen Eintrag in tools/seiten.json — Kopf, Sitemap, Suche, Precache und
ggf. Werkzeug-Register folgen automatisch.
VERIFIKATION:
- Band sichtbar auf 11/11 internen Seiten, jeweils direkt unter der Navigation, 0 PageErrors.
- KEIN Band auf oeffentlichen Seiten (reisen, wissen, index, holding-dashboard geprueft).
- holding-dashboard zeigt 11 interne Bereiche; reisen.html 4 Weltseiten + 1 Werkzeug;
  wissen.html unveraendert 21 Werkzeuge.
- heiben-design.css wurde erweitert -> Gegenprobe auf 8 unveraenderten Seiten (auto, kulinarik,
  wohnen, studio, mein-heiben, agb, konto, lernpfade): 8/8 Fingerabdruck IDENTISCH.
- Sweep ueber alle 102 Seiten: 0 PageErrors, 0 Console-Errors.
NAECHSTER SCHRITT bei "Weiter": V3-W8 STARTSEITE + GESAMT-QS — startseite-neu.html v2.2 braucht die
FREIGABE des Users; bei Freigabe Uebernahme als index.html (SEO/JSON-LD kommen jetzt aus
gen_kopf.js, Alt-index als startseite-klassisch.html sichern, seiten.json pflegen), danach
Abschluss-Sweep und Gesamt-Audit ueber die komplette Sitemap.

## REMAKE V3 · WELLE 8 (TEIL 1): GESAMT-QS (SW -2998, keine Inhaltsaenderung)
Die Startseiten-Uebernahme ist BEWUSST NICHT erfolgt: in diesem Handover steht die Auflage
"FREIGABE DES USERS abwarten", und ein "Weiter" beantwortet nicht die Frage, ob index.html ersetzt
werden soll. Erst QS, Freigabe getrennt eingeholt.
AUDIT-INSTRUMENT ZUM VIERTEN MAL NACHGEZOGEN: Abschnitt 5 behauptete weiterhin "kein zentrales
Register" — seit W6 falsch. Er misst jetzt die ABDECKUNG des Registers (88 Eintraege, 87 im Bestand
gefunden, 0 unregistriert) und ob Export/Import/Zuruecksetzen vorhanden sind; ausserdem, ob
mein-heiben ueber das Modul liest statt Schluessel einzeln zu nennen. Zusaetzlich Fehlmessung
behoben: "heiben-stand-" wurde als 89. Schluessel gezaehlt, ist aber das Praefix des
Export-Dateinamens (89 -> 87 echte Schluessel).
AUDIT-STAND NACH SIEBEN WELLEN (cd web && python3 ../tools/audit_v3.py):
1 GEWICHT     HTML 6.204 -> 3.100 KB (O 61 -> 30 KB/Seite), base64 19,3% -> 0%,
              byte-identische Redundanz 1.874 -> 28 KB (30,2% -> 0,9%)
2 KOPF        description/og/canonical/theme-color/manifest/design.css/legal.js/SW je 101/101,
              nav 100/100 (ohne index), JSON-LD 90/90 (ohne intern), noindex 11/11 — alles OK
3 AUFFINDBAR  0 kaputte Links · Waisen 22 -> 2 (404 + Standalone-Entwurf, beide gewollt) ·
              Suchindex 348 -> 423 Eintraege auf 18 -> 89 Zielseiten
4 OFFLINE     precached 62/101 -> 101/102 (ohne Standalone-Entwurf)
5 SPEICHER    87 Schluessel, Register deckt sie vollstaendig, Export/Import/Reset vorhanden
6 KANON       Weltfarben-Zaehlung als irrefuehrend entlarvt und in der Blaupause korrigiert
7 GEWICHTUNG  unveraendert schief (operative Welten 40%) — Inhaltsentscheidung, siehe W7
8 LADELAST    mein-heiben 909 -> 89 KB · index 450 -> 117 KB · wissen 356 -> 387 KB (Suche braucht
              die Daten, gemessen und begruendet)
9 DESIGN      Token-Ebene + Bewegungsgrammatik stehen; --hb-* 99 Rollen in 126 Deklarationen
QS-PROTOKOLL (headless, 15 Pruefungen, alle bestanden):
- DEEP-LINKS: #id oeffnet Steckbrief (lebensmittel.html#eier -> "Eier") · ?q=tomate -> 17 Treffer ·
  ?welt=kulinarik -> 5 Weltchips · ?id=reisen -> Lebenswissen-Artikel geladen.
  KORREKTUR AM TEST, NICHT AM CODE: der erste Lauf meldete #id als Fehler, weil ich auf ein Element
  MIT dieser id geprueft hatte. Der Vertrag lautet aber "Steckbrief wird geoeffnet" — die Seite
  ruft showDetail(hash) und rendert nach #detail. Test berichtigt, Vertrag intakt.
- PERSISTENZ: Zuhause-Ordner haelt Haken ueber Reload · Speicher-Uebersicht rendert Weltkacheln.
- REGISTER: 21 Werkzeuge in wissen · 11 interne Bereiche im Holding-Dashboard · Band auf interner Seite.
- RESPONSIV 390 px: index, wissen, kulinarik, mein-heiben, designsystem, reisen — 0 px Querlauf.
- OFFLINE (SW installiert, Netz aus): 13/13 Proben mit vollem Inhalt erreichbar.
- BRUECKEN: 11 Seiten, 0 kaputte Ziele.
- SWEEP: alle 102 Seiten, 0 PageErrors, 0 Console-Errors.
OFFEN (bewusst, mit Begruendung):
1. STARTSEITE: startseite-neu.html v2.2 wartet auf Freigabe. Bei Freigabe ist die Uebernahme
   heute einfacher als im alten Plan notiert: SEO/JSON-LD/Legal/PWA kommen aus gen_kopf.js, es
   genuegt Datei tauschen + tools/seiten.json pflegen + gen_kopf.js + gen_sw.js.
2. WELT-BALANCE Reisen/Immobilien: Inhaltsentscheidung, Vorschlaege in W7 hinterlegt.
3. inline-JS 1.884 KB (60,8% des HTML), davon 764 KB allein in wohnen-konfigurator.html —
   die letzte grosse Entdopplungsreserve, aber seitenspezifischer Code, keine Kopie.
4. assets/GLTFLoader.js (96 KB) von keiner Seite per src eingebunden.
5. hb-suche-nav.js auf 21 von 25 einbindenden Seiten wirkungslos (kein <nav>).

---

## STARTSEITE V3 — „EIN STRICH, FUENF WELTEN" (SW -2999)

AUFTRAG: „Die gesamte Startseite ist ja unveraendert. Alle Designs und alle Animationen
vollkommen ueberdenken. Das ist alles bereits mitgebracht worden als inspo."
Also: startseite-neu.html ist ab jetzt Inspiration, nicht Grundlage. Neue Datei
`web/startseite-v3.html` (typ: standalone, nicht verlinkt, nicht precached, noindex).
Die alte Fassung bleibt unangetastet daneben liegen.

WAS BLEIBT (Marken-DNA, bindend):
- Weltfarben kanonisch: Reisen #a97a1d · Wohnen #4a5c39 · Immobilien #792d29 · Studio #1f1c17
  · Kulinarik #6b3951. Auf dunklem Grund tritt jede Welt in einer abgeleiteten LICHTFASSUNG auf
  (--l-*), die Grundfarbe bleibt der Kanon. Studio ist die Tinte selbst — als Licht erscheint sie
  als Sand #d8cdb7, wie im Bestand.
- Schriften: Fraunces / Manrope / JetBrains Mono. Keine vierte Schrift.
- Fiktions-Fakten, Texte und Kennzahlen aus dem Bestand uebernommen (heiben-kennzahlen.js).

WAS NEU IST:
1. GRUND. Die Seite steht nicht mehr auf warmem Leinen, sondern auf der Marken-Tinte #1f1c17.
   Der Grund TOENT sich beim Scrollen in die jeweilige Welt (13 % Weltfarbe in Tinte, gelerpt).
2. LEITMOTIV. Statt fuenf getrennter CSS-3D-Objekte traegt EINE nie abreissende Linie die Seite:
   Weg (Reisen) -> Dach (Wohnen) -> Tuerbogen (Immobilien) -> Gluehbirne (Studio) -> Topf
   (Kulinarik). Umgesetzt als offene Polygonzuege in einem 100x100-Feld, per Bogenlaenge auf
   je 168 Punkte umgetastet und punktweise gelerpt — dadurch morpht jede Form sauber in die
   naechste. Haltekurve: die Form steht still, solange der Text gelesen wird, und wechselt in
   den letzten 34 % des Kapitels.
3. TYPOGRAFIE. Fuenf Verben in Grossformat — aufbrechen · bleiben · ankommen · verstehen ·
   teilen — aus dem eigenen Bestandstext abgeleitet ("Wege, die sich wie Ankommen anfuehlen",
   "Raeume, die bleiben duerfen"). Fraunces variabel mit den Achsen opsz/SOFT/WONK.
4. BEWEGUNGSGRAMMATIK. Neu und schmal: Maskenaufzug (clip-path) statt Blur-Translate,
   Ouvertuere (gestaffelter Einzug + einmaliges Selbstzeichnen der Linie ueber pathLength),
   Strich-Morph, Grundtoenung, Zaehler, ruhige Zeigerparallaxe. Alles Sichtbare haengt an
   EINEM rAF-Takt mit Sperre; Farb- und Formberechnung nur bei Aenderung > 0,0015.
5. LEITWERK. Fester Index am linken Rand (vertikale Beschriftung, Weltpunkt, Fortschrittsfaden),
   mobil ersetzt durch ein 2-px-Fortschrittsband unter der Kopfleiste.

GELERNTE FALLE (wichtig fuer kuenftige Bewegungsarbeit):
Chromium rechnet das EIGENE clip-path eines Elements in die IntersectionObserver-Quote ein.
Ein Maskenaufzug, der bei inset(0 0 102% 0) startet, meldet damit ewig 0 % und wird nie
ausgeloest — im ersten Lauf blieben 42 von 42 Bauteilen unsichtbar. Loesung und Regel:
BEOBACHTET WIRD DER BLOCK, AUFGEZOGEN WERDEN SEINE KINDER. Regie sagt WANN, Vokabel sagt WAS.
Bei Bewegungsruhe wird gar nicht erst am Scrollen aufgehaengt (alle Bloecke sofort sichtbar).

PRUEFUNG (headless Chromium, tools-Skript im Scratchpad, 25 Pruefungen, alle bestanden):
- Schriften: Fraunces/Manrope/JetBrains Mono geladen (Achsen-URL greift).
- Strich: gezeichnet, 5 unterscheidbare Formen ueber den Scrollweg, Weltfarbe und Grundtoenung
  wandern in je 5 Werten, Leitwerk markiert die richtige Welt, Faden fuellt auf 92 %.
- Aufzuege: 0 offen nach Durchlauf; Zaehler 5/8/370/16/544 aus heiben-kennzahlen.js.
- 390 px: scrollWidth 390, kein Element ragt heraus, Fortschrittsband arbeitet.
- Bewegungsruhe: Dauern 0 ms, kein Zeichnen-Effekt, keine Parallaxe, Inhalt vollstaendig sichtbar.
- 0 PageErrors, 0 Console-Errors in allen drei Kontexten.
GEOMETRIE ZUSAETZLICH MIT DEM AUGE GEPRUEFT: die fuenf Endformen wurden gerendert und
nachgebessert — der Topf woelbte sich zuerst nach OBEN (Bogen im falschen Winkelbereich) und
war danach kantig (zu wenige Stuetzpunkte); jetzt Ellipsenboden mit 30 Punkten.

OFFEN: Freigabe. Bei „uebernehmen" gilt derselbe kurze Weg wie fuer v2.2 — index.html als
startseite-klassisch.html sichern, startseite-v3.html als index.html, seiten.json auf
typ:"start"/welt:"holding"/"nav":false umstellen, gen_kopf.js + gen_sw.js laufen lassen.
Der Kopfblock fehlt der Entwurfsdatei bewusst (standalone wird uebersprungen) und wird beim
Wechsel vom Generator gesetzt.

### NACHSCHAERFUNG (SW -3000): erkennbar und knapp

RUECKMELDUNG DES USERS: „Besser aber noch nicht wirklich erkennbar. Die Maße an Text dazwischen
ist auch erschlagend. Catchier und verstaendlicher gestalten."

1. ERKENNBARKEIT. Ein offener Strich liest sich nicht als Gegenstand. Die Hauptlinie ist jetzt
   eine GESCHLOSSENE SILHOUETTE (Koffer -> Haus -> Tuer -> Gluehbirne -> Topf, umlaufend
   gezeichnet, Rueckweg zum Startpunkt), Strichstaerke 1,6 -> 2,0. Dazu je Welt eine
   DETAILZEICHNUNG als eigene SVG-Gruppe: Griff/Band/Schloesser · Tuer/Fenster/Schornstein ·
   Tuerblatt/Knauf/Schwelle · Faden/Gewinde/Strahlen · Deckel/Henkel/Dampf.
   REGEL: Details gehoeren zur GESETZTEN Form. Ihre Deckkraft ist 1 - |wert - index| * 2,8 —
   waehrend des Morphs sind sie weg, sonst wuerden zwei Gegenstaende ineinanderlaufen.
   Der Morph selbst bleibt unveraendert (Umtastung auf 168 Punkte, punktweiser Lerp).
   Die Reisen-Form ist vom abstrakten „Weg" zum Koffer gewechselt — erkennbar schlaegt poetisch.
2. TEXTMASSE. Kapitel von fuenf auf vier kurze Zeilen: Weltname GROSS (Fraunces 600, Weltfarbe),
   Verb kursiv als Echo, EIN Satz, drei Marken, ein Weg. Der grosse Wortlaut ist jetzt der
   WELTNAME, nicht mehr das Verb — verstaendlich vor poetisch. Gemessen: 340-360 -> 127-146
   Zeichen je Kapitel. Manifest 3 -> 2 Zeilen, Ouvertuere-Vorspann 3 -> 1 Zeile,
   Zaehlband-Ueberschrift halbiert, Finale-Karten auf je einen Halbsatz.
3. MOBIL. Die Marke steht ueber dem Text statt dahinter (Deckkraft 0,3), kein Uebersprechen mehr.

PRUEFUNG: 29/29 (vier neue: Detail erscheint / Detail weicht beim Morph / Weltnamen gesetzt /
Kapiteltext knapp). 0 PageErrors, 390 px ohne Querlauf, Bewegungsruhe unveraendert vollstaendig.
Die fuenf Marken wurden gerendert und einzeln geprueft; der Topfdeckel lag zuerst genau auf dem
Rand (sah aus wie EIN dicker Strich) und wurde um 3 Einheiten angehoben.

### MARKE STATT MANIFEST (SW -3001)

RUECKMELDUNG: „Der Part mit ‚wir haben nicht Unternehmen fuer sie gebaut…' kann weg. Frisst
Platz. Aktuell startet es mit dem Koffer. Entweder erst ab Reisen reinanimieren oder zuvor noch
eine Symbolik fuer HeiBen mit den fuenf Farbstrichen als Netz oder Globus oder so."

1. MANIFEST ERSATZLOS ENTFERNT — Abschnitt und CSS. Der Kopf uebergibt jetzt direkt an Reisen.
2. HEIBEN-MARKE IM KOPF: ein Globus aus GENAU FUENF Strichen, je einer in einer Weltfarbe —
   Huelle (Studio-Sand), Aequator (Immobilien), schmaler Meridian (Wohnen), breiter Meridian
   (Kulinarik), Wendekreis (Reisen). Er zeichnet sich beim Laden Strich fuer Strich
   (pathLength=1 + gestaffelte stroke-dashoffset-Uebergaenge, 280–1120 ms).
3. UEBERGABE: die Marke tritt ab, waehrend der erste Gegenstand uebernimmt — Kreuzblende plus
   14 % Verkleinerung, gesteuert von derselben Vorlauf-Zahl (stufe((vorlauf-0,34)/0,5)).
   Der Koffer erscheint damit erst kurz vor Reisen, nicht mehr sofort im Kopf.
4. HOLDING-TON: solange keine Welt spricht, ist --wf Sand; die Weltfarbe wird ueber denselben
   Uebergang eingemischt. Dadurch traegt der Kopf keine Reisen-Farbe mehr.
TECHNISCHE NOTIZ: die Farb- und Formberechnung stand hinter einer Aenderungssperre auf `wert`.
Da im Kopf nur der Uebergang laeuft (wert bleibt 0), musste die Sperre den Uebergang mitfuehren,
sonst waere die Kreuzblende nach dem ersten Bild eingefroren.

PRUEFUNG: 34/34 (fuenf neue: Marke aus 5 Strichen · im Kopf steht die Marke, kein Gegenstand ·
Marke fertig gezeichnet · Manifest entfernt · Uebergabe vollzogen). 0 PageErrors.

### KORREKTUR (SW -3002): Topf entwirrt, Kopftext entmetaphert

RUECKMELDUNG: „Beim Kochtopf scheinen die Linien durcheinander. Das wording am Start gefaellt
mir nicht. Verbunden ueber einen Strich ist schlecht."

1. KOCHTOPF. Vier Fehler in der Detailzeichnung, alle behoben:
   - Der Deckel war ein GERADER Strich 3 Einheiten ueber der Randlinie — zwei Parallelen, die
     wie ein Doppelstrich lasen. Jetzt eine KUPPEL, die auf dem Rand aufsitzt (Bogen von
     18,42 nach 82,42).
   - Der Knauf war ein Kreis NEBEN seinem Stiel (Bogenstart 3,5 Einheiten rechts der Mitte).
     Jetzt ein zentrierter Kreis auf dem Kuppelscheitel, ohne Stiel.
   - Die Henkel waren freistehende Stummel mit Abstand zur Wand. Jetzt Ohren, die an der
     geneigten Wand ansetzen und dort wieder enden (Wandposition ausgerechnet, nicht geraten).
   - Der Dampf bestand aus drei Halbbogen, die wie Klammern aussahen. Jetzt zwei S-Kringel.
2. KOPFTEXT. Die Zeile „Ein Strich verbindet sie" beschrieb die Gestaltung statt das
   Unternehmen — Design-Metapher, kein Kundennutzen. Neu:
   H1 „Fuenf Unternehmen. Ein Zuhause." · Vorspann „Reisen, Wohnen, Immobilien, Studio und
   Kulinarik — gefuehrt von einer Koelner Familie."
   Das hervorgehobene Wort im H1 nimmt jetzt --wf (im Kopf Sand, Holding-Ton) statt fest die
   Reisen-Farbe.
MERKE: Detailzeichnungen gehoeren gerendert und angesehen, nicht nur gezaehlt — alle vier
Fehler waren in den Pruefungen unsichtbar (die Gruppe war ja korrekt eingeblendet).

PRUEFUNG: 34/34, 0 PageErrors. Topf einzeln gerendert und gegengelesen.

### KOPFTEXT, MENUE, TOPF ENDGUELTIG (SW -3003)

RUECKMELDUNG: Kopftext vorgegeben („Fuenf Unternehmen. Ein Zuhause." / „Weil Heimat zu leben
nicht nur ein Gefuehl sondern eine Lebensweise ist." / CTA „Erfahren sie mehr"), Topflinien
ueberschneiden sich immer noch, Frage nach einem Burger-Menue.

1. KOPF. Text uebernommen (Komma vor „sondern" und Hoeflichkeits-„Sie" gesetzt). Neu eine
   Handlungsaufforderung `.tat` — gefuellte Pille in --wf mit Tinte-Schrift, damit sie sich
   von der umrandeten „Mein HeiBen"-Taste in der Leiste abhebt. Ziel: unternehmen.html.
2. TOPF — die eigentliche Ursache gefunden. Nicht die Details lagen falsch, sondern die
   SILHOUETTE: sie war oben GESCHLOSSEN (Randlinie von 84,42 zurueck nach 16,42) und die
   Deckelkuppel lag darueber — zwei Linien fuer EINE Kante. Jetzt ist die Silhouette oben
   OFFEN (Wand -> Boden -> Wand, Schluss), und der DECKEL schliesst sie, indem er genau die
   beiden Wandkanten verbindet. Eine durchgehende Kontur, keine Ueberschneidung.
   REGEL: eine Kante wird von genau einem Pfad gezeichnet. Nach derselben Regel ist bei der
   TUER die Schwelle entfallen — sie lag exakt auf der Bodenlinie der Silhouette.
3. MENUE. Antwort auf die Frage: auf der Startseite JA, aber nur schmal (<= 900 px) — am
   Schreibtisch traegt das Leitwerk die Welten, dort waere ein Burger doppelt. Das Feld zeigt
   die fuenf Welten mit Farbe und Verb plus Mein HeiBen / Zuhause-Ordner / Unternehmen.
   Esc schliesst, der Hintergrund wird gesperrt, ein Klick auf einen Weltlink schliesst und
   springt. Die Kopfleiste steht schmal IMMER (ohne Leitwerk gaebe es sonst gar keinen
   Zugang) und liegt mit z-index 59 ueber dem Feld, damit die Taste zum X wird.
   NICHT angefasst: die Navigation der Weltseiten. Die kommt aus `heiben-nav.js` und
   betrifft 100 Seiten — eigener Auftrag, nicht nebenbei.
GEFUNDENER FEHLER (haette die ganze Seite lahmgelegt): `.menue{display:flex}` schlaegt das
`hidden`-Attribut, weil eine Klassenregel spezifischer ist als die UA-Regel `[hidden]`.
Das unsichtbare Feld lag damit ueber der gesamten Seite und schluckte JEDEN Klick — auf jeder
Breite. Behoben mit `.menue[hidden]{display:none}`. Aufgefallen ist es nur, weil die Pruefung
klickt statt nur zu messen.

PRUEFUNG: 43/43 (neun neue: Menuetaste mobil · oeffnet · fuenf Welten · Hintergrund gesperrt ·
schliesst und raeumt auf · Sprung in die Welt · Titel · Vorspann · CTA). 0 PageErrors.

---

## REMAKE V3 · WELLE 9: NAVIGATION DER WELTSEITEN (SW -3004)

AUFTRAG: „Nav Auftrag zu eigenen Weltseiten durchfuehren. Ebenso Design ueberarbeiten."
Also die gemeinsame Navigation auf allen 100 Seiten mit hb-nav — Bauteil UND Gestaltung.

AUSGANGSLAGE: eine helle Leiste mit Marke links, fuenf Weltlinks, Trennstrich, Wissen/Suche/
Mein HeiBen; unter 860 px klappte ein „☰" dieselben acht Links untereinander auf. Kein Zugang
zu dem, was eine Welt eigentlich enthaelt — die Unterseiten standen nur in den Fussleisten.

WAS JETZT STEHT
1. LEISTE (heiben-design.css, nur .hb-Klassen, nur Tokens):
   - Die Leiste traegt die WELTFARBE als 2-px-Kante. Sie kommt aus der Token-Ebene
     (--hb-welt ueber data-hb-welt am body), nicht aus JavaScript — kein Hex im Bauteil.
   - Aktiver Weltlink: Tinte statt Grau, Unterstrich in der Weltfarbe, Punkt mit Hof.
   - „Mein HeiBen" ist eine umrandete Pille in der Weltfarbe (mono, gesperrt) und damit als
     Zugang erkennbar, statt als achter Link in einer Reihe zu verschwinden.
   - Zwei-Strich-Taste statt „☰"; sie dreht sich beim Oeffnen zum Kreuz.
   - Unter 900 px verschwinden die Kurzwege, unter 420 px auch die Pille.
2. WELTMENUE (neu): Vollbild auf Marken-Tinte, auf JEDER Breite erreichbar.
   Fuenf Spalten — Weltname in der Lichtfassung der Weltfarbe, Verb kursiv darunter
   (aufbrechen · bleiben · ankommen · verstehen · teilen, dieselben wie auf startseite-v3),
   darunter die UNTERSEITEN DIESER WELT. Die aktuelle Welt ist abgesetzt, die aktuelle Seite
   fett in Weltfarbe. Im Fuss sechs Wege, die zu keiner Welt gehoeren.
   Schmal klappt jede Welt zu, die aktuelle bleibt offen — sonst stuenden vierzig Zeilen
   untereinander. Esc schliesst, der Hintergrund wird gesperrt, der Tabulator bleibt im Feld,
   der Fokus kehrt zur Taste zurueck.
3. QUELLE: `web/heiben-menue.js`, generiert von gen_kopf.js aus derselben Registry (2,3 KB) und
   als Pflichtdatei auf jeder Seite mit Navigation. Bewusst NICHT heiben-bereiche.js verwendet:
   das traegt die Beschreibungen mit und waere mit 11,4 KB fuenfmal so gross.
   TITELPUTZ im Generator (`kurz()`): die Spalte sagt schon, welche Welt gemeint ist, also faellt
   weg, was der Titel nur wiederholt — Markenzusatz am Ende, vorangestelltes Weltwort,
   Untertitel nach dem Gedankenstrich. „intern" bleibt stehen, das sagt etwas.
   Beispiele: „Reisen · Kuratierte Reisen" -> „Kuratierte Reisen" · „Rezept-Wuerfel — Was der
   Kuehlschrank hergibt | HeiBen Kulinarik" -> „Rezept-Wuerfel" · „Lebenswissen — Das
   Nachschlagewerk | HeiBen Studio" -> „Das Nachschlagewerk".

VERTRAEGE GEHALTEN (alle geprueft, nicht behauptet):
   div[role=banner] + div[role=navigation], keine header/nav-Elemente · .hb-nav bleibt erstes
   Kind des body, das Band der internen Seiten sitzt weiter direkt darunter · data-welt gehoert
   weiterhin dieser Datei · Weltfarben kanonisch.
   Das Menue haengt am ENDE des body, nicht in .hb-nav — sonst waere hb-bereiche.js das Band
   in das Menue gerutscht.

FALLEN, DIE ES ZU LOESEN GALT
- REIHENFOLGE: gen_kopf haengt fehlende Pflichtdateien ans Kopfende, also hinter heiben-nav.js.
  Beide mit defer, heiben-nav.js laeuft zuerst — window.HEIBEN_MENUE gibt es da noch nicht.
  Loesung: das Feld wird ERST BEIM ERSTEN OEFFNEN gebaut. Fehlt die Liste, zeigt es die fuenf
  Welten ohne Unterseiten.
- Z-INDEX: heiben-legal.js setzt die Consent-Leiste auf 9999. Das Menue stand auf 80 und hatte
  die Leiste quer im Bild. Jetzt 10000.
- `.hb-menue{display:flex}` haette wie auf der Startseite das hidden-Attribut geschlagen;
  `.hb-menue[hidden]{display:none}` steht von Anfang an drin.

PRUEFUNG
- 30/30 gezielte Pruefungen (Vertraege, aktive Welt, Menue oeffnet/schliesst, Fokus, Sperre,
  aktuelle Seite markiert, internes Band, schmal: Kurzwege aus, Aufklapper).
- RUNDLAUF 103 Seiten breit: 0 PageErrors.
- RUNDLAUF 103 Seiten schmal (390 px): 0 PageErrors einzeln nachgeprueft.

BEFUNDE, NICHT VON MIR VERURSACHT UND NICHT NEBENBEI GEAENDERT
1. QUERLAUF bei 390 px auf 7 Seiten: kulinarik-export 890 · unternehmen 660 · kulinarik-
   mealplanner 511 · widerruf 478 · reisen-planer 422 (Leaflet-Kacheln) · kulinarik-redaktion
   402 · studio-lebenswissen-redaktion 395. Nachgemessen: die Navigation ist auf jeder dieser
   Seiten exakt 390 px breit, KEIN einziges ueberstehendes Element gehoert ihr. Das ist
   Seiteninhalt (Tabellen, Werkzeuge, Karten) und eine eigene Aufgabe.
2. REGISTRY-WIDERSPRUCH: drei Manufaktur-Seiten heissen im Titel „— intern", stehen aber als
   typ:"weltseite" in tools/seiten.json (manufaktur-bestellungen, manufaktur-kalkulation,
   manufaktur-maschinencode). Dadurch stehen sie in der Sitemap, tragen kein Band und
   erscheinen jetzt auch im Weltmenue. Entweder sind sie intern — dann drei Zeilen in
   seiten.json auf typ:"intern" und neu erzeugen (Sitemap 89 -> 86, interne Seiten 11 -> 14) —
   oder der Titelzusatz gehoert weg. Das ist eine Inhaltsentscheidung, keine Umbauarbeit.
3. studio-lebenswissen-artikel.html bringt eine eigene alte Menuetaste (#hbBurger aus
   hb-menue.css) mit und zeigt damit zwei Menueknoepfe. Bestand, war schon vor dieser Welle so.

### WELLE 9, TEIL 2: AUFGERAEUMT (SW -3005)

AUFTRAG: „Raeume auch." — die drei Befunde aus Teil 1 abarbeiten.

BEFUND 3 WAR FALSCH, KORRIGIERT STATT „REPARIERT".
Ich hatte behauptet, studio-lebenswissen-artikel.html zeige zwei Menueknoepfe. Nachgemessen:
die Seite hat GENAU EINEN (den der Navigation). Die Ids #hbBurger/#hbMobileMenu kommen dort nur
in einer Druckregel vor; der erzeugende Code liegt in index.html — und die hat bewusst keine
hb-nav (nav:false) und braucht ihre eigene Taste. Ursache meines Irrtums: ich hatte
`grep -l ... | head -1` genommen und damit die Zeilen von index.html gelesen, aber der zweiten
Datei zugeschrieben. Nichts zu reparieren.
(Was stimmt: hb-menue.css haengt auf 34 Seiten, aber nur index.html erzeugt die Ids dazu. Die
Datei traegt allerdings auch eine LEBENDE Regel — `.hero.wrap{padding:…}` — also ist sie nicht
einfach entfernbar. Eigene Aufgabe, hier nicht angefasst.)

BEFUND 2 — REGISTRY-WIDERSPRUCH, BEHOBEN.
manufaktur-bestellungen / -kalkulation / -maschinencode standen als typ:"weltseite", hiessen im
Titel aber „— intern". Jetzt typ:"intern", Titel auf die Konvention der uebrigen internen Seiten
gebracht („HeiBen Manufaktur — Auftragsverwaltung/Kalkulation/Maschinencode-Datenbank").
Folgen, alle nachgeprueft: Band direkt unter der Leiste (3/3) · noindex,nofollow (3/3) ·
robots.txt 11 -> 14 Disallow · sitemap.xml 89 -> 86 URLs · interne Seiten 11 -> 14 ·
Weltmenue Spalte Wohnen 10 -> 7 Eintraege, die drei stehen dort nicht mehr.

BEFUND 1 — QUERLAUF AUF 7 SEITEN, BEHOBEN. Jede Ursache gemessen, keine pauschale Regel.
MESSFEHLER VORWEG: die erste Diagnose verglich rechte Kanten mit innerWidth — und das war
bereits mitgewachsen (890 statt 390). Chrome weitet auf schmalen Geraeten den Viewport, wenn der
Inhalt ueberlaeuft; danach greifen Media Queries an der falschen Breite und Layouts klappen
wieder auf. Richtig ist der Vergleich mit document.body.clientWidth.
- kulinarik-export 890 px: die Auswahlliste ist eine Flex-Zeile, deren Titel-span nicht unter
  seine Min-Content-Breite schrumpfen konnte (min-width:0 gesetzt). Der Rest ist die A4-Vorschau
  mit echten 794 px — die DARF nicht schrumpfen, sie scrollt jetzt in ihrer Buehne.
- unternehmen 660 px: breite Kennzahlen-Tabelle ohne Behaelter -> in .u-scroll gefasst.
- kulinarik-mealplanner 511 px: vier feste Rasterspalten plus Eingabefelder ohne Deckel ->
  Felder auf width:100%/min-width:0, Raster klappt bei 720 und 520 px.
- widerruf 478 px: die Unterstrich-Linien im Musterformular sind EIN unteilbares Wort ->
  overflow-wrap:anywhere auf dem Block.
- reisen-planer 422 px: Rasterkinder ohne min-width:0 hielten ihre Min-Content-Breite;
  Tageszeile bricht jetzt um.
- kulinarik-redaktion 402 px: feste Flex-Kopfzeile -> bricht unter 600 px um.
- studio-lebenswissen-redaktion 395 px: Werkzeugfelder brachten Eigenbreite mit -> gedeckelt.

PRUEFUNG NACH DEM AUFRAEUMEN
- 31/31 gezielte Navigationspruefungen (neu: die drei internen Seiten fehlen im Menue).
- Rundlauf 103 Seiten bei 390 px: 0 PageErrors, QUERLAUF 0 (vorher 7).
- Rundlauf 103 Seiten bei 1280 px: 0 PageErrors, 0 Querlauf.
- Die drei umgestellten Seiten einzeln: Band, noindex, Titel, 0 PageErrors.
UMGEBUNGSHINWEIS: einzelne Seiten brauchen im Sandkasten ~13 s bis „load", weil die
Google-Fonts-Anfrage ins Leere laeuft (requestfailed nach 15 s). Kein Seitenfehler — unter
paralleler Last liefen dieselben Seiten in den 30-s-Timeout und wurden einzeln nachgeprueft.

### WELLE 9, TEIL 3: hb-menue.css entwirrt (SW -3006)

AUSGANGSLAGE: hb-menue.css hing an 34 Seiten, aber nur index.html erzeugt die Ids
(#hbBurger/#hbMobileMenu) und besitzt ein .hero.wrap. Die Datei war damit auf 33 Seiten
Verdacht auf Totlast — aber eben nur Verdacht: sie traegt neben den Menue-Regeln auch
`.hero.wrap{padding…}` samt einer !important-Variante unter 780 px. Blind entfernen waere
genau das „nebenbei umbauen", das hier nicht passieren darf.

GEMESSEN STATT GERATEN — A/B IM SELBEN DOKUMENT
Je Seite und Breite (1280 und 390 px): Fingerabdruck jedes sichtbaren Elements (Tag, Klasse,
Position, Groesse, Polsterung, Anzeige, Farben, Schriftgroesse), dann `sheet.disabled = true`
fuer genau dieses Stylesheet, Reflow, zweiter Fingerabdruck. Unterschied = Wirkung.
ERGEBNIS: 68 Messungen, 66 OHNE JEDEN UNTERSCHIED. Die zwei mit Wirkung waren index.html
selbst (dort aendert sich die Navigationshoehe 121,5 -> 148 px breit bzw. 121,5 -> 227 px schmal,
weil das eigene Menue seine Gestaltung verliert).

MESSFEHLER, DER FAST ZU EINEM FALSCHEN BEFUND GEFUEHRT HAETTE
Der erste Lauf meldete auf zehn Seiten Abweichungen von 0,5 bis 19 px — alle vertikal, alle an
Elementen mit den Klassen `hb-rv hb-go`. Das sind die Einblend-Klassen der Bewegungsregie: die
Seite bewegte sich noch, waehrend ich zweimal gemessen habe. Mit `reducedMotion:'reduce'`
(die Token-Ebene setzt dann alle Dauern auf 1 ms) blieben null Abweichungen uebrig.
MERKE: Layout-Vergleiche IMMER in Bewegungsruhe, sonst misst man die Animation.

UMBAU: Einbindung auf 33 Seiten entfernt, index.html behaelt sie.
BEWEIS VON AUSSEN (nicht nur im Dokument): alte Fassung aus einem git-worktree auf Port 8181,
neue auf 8180, beide mit Bewegungsruhe und abgeklemmten Google Fonts, Fingerabdruck-Vergleich
ueber alle 33 Seiten: 33/33 IDENTISCH bei 1280 px UND bei 390 px.
index.html einzeln nachgeprueft: Burger sichtbar, oeffnet auf Klick, .hero.wrap-Polsterung
24 px, Stylesheet geladen, 0 PageErrors, kein Querlauf — auf beiden Breiten.
Der Dateikopf von hb-menue.css erklaert jetzt, wofuer sie da ist und was jemand vorweisen muss,
der sie wieder irgendwo einbindet.

STAND NACH DEM UMBAU
- 33 Seiten laden eine Stylesheet-Anfrage weniger; hb-menue.css (2,3 KB) bleibt precached,
  weil index.html sie braucht.
- Rundlauf 103 Seiten bei 390 px: 0 PageErrors, 0 Querlauf.
- Rundlauf 103 Seiten bei 1280 px: 0 PageErrors, 0 Querlauf.
- 31/31 Navigationspruefungen.
NEBENBEFUND BESTAETIGT: mit abgeklemmten Google Fonts laufen die Rundlaeufe um ein Vielfaches
schneller — die 13 s je Seite waren tatsaechlich nur die ins Leere laufende Font-Anfrage des
Sandkastens, kein Seitenproblem.

### WELLE 9, TEIL 4: RESTLICHE TOTLAST (SW -3007)

Bestandsaufnahme aller nicht-HTML-Dateien unter web/: welche wird von keiner Datei genannt?
Ergebnis: 6 Dateien, 227 KB. Jede einzeln nachgesehen — und eine davon drehte die Aufgabe um.

1. assets/GLTFLoader.js (94 KB) — NICHT geloescht, sondern IN BETRIEB GENOMMEN.
   wohnen-konfigurator.html trug denselben Loader INLINE (Zeile 308 ff., „GLTFLoader r128 (MIT)").
   Zeichenvergleich nach Normalisierung des Leerraums: Block und Datei sind identisch, einziger
   Unterschied waren die 28 Zeichen des Lizenzkommentars. Also Block raus, <script src> rein.
   DER LIZENZHINWEIS IST MITGEZOGEN: er steht jetzt im Kopf von assets/GLTFLoader.js. Ihn beim
   Auslagern zu verlieren waere der eigentliche Fehler gewesen.
   wohnen-konfigurator.html 765 -> 671 KB · inline-JS im Bestand 1.884 -> 1.801 KB ·
   die Datei ist jetzt precached und wird einmal statt in jeder Seitenkopie geladen.
   NACHGEWIESEN, dass es wirklich laeuft (Layoutgleichheit allein beweist das nicht):
   alt und neu geladen, beide THREE.GLTFLoader === 'function', beide instanziierbar,
   0 PageErrors; neu haengt an einem <script src>, alt an keinem.

2. hb-suche-nav.js — Einbindung auf 24 von 25 Seiten entfernt.
   Die erste Anweisung der Datei lautet `var nav=document.querySelector('nav'); if(!nav) return;`.
   Ein <nav>-Element hat von den 25 einbindenden Seiten nur index.html. Auf den anderen 24 lief
   das Skript also seit v3-W1 in die Ruecksprungzeile. Die Suche selbst fehlt dort nicht: seit
   v3-W5 steht sie als Kurzweg in der Navigationsleiste und seit heute zusaetzlich im Weltmenue.
   BEWEIS: alte Fassung (git-worktree, Port 8181) gegen neue (8180), Bewegungsruhe, Fonts
   abgeklemmt, Fingerabdruck jedes sichtbaren Elements ueber alle betroffenen Seiten —
   25/25 IDENTISCH bei 1280 px UND bei 390 px (die 24 plus wohnen-konfigurator).

3. NICHT ANGERUEHRT, weil es keine Aufraeumarbeit, sondern eine Inhaltsentscheidung ist:
   assets/hero-dark.png (75 KB), assets/monogram-dark.png (25 KB), assets/monogram-light.png
   (23 KB). Git-Geschichte nachgesehen: diese drei wurden von KEINER Seite je referenziert,
   auch nicht im urspruenglichen Import — sie standen nur in der handgepflegten Precache-Liste,
   die der Generator in W4 zurecht fallen liess. Sie kosten zur Laufzeit NULL (nicht precached,
   nie abgerufen), im Verzeichnis 123 KB. Es ist Markenmaterial (ein Monogramm!), das sich aus
   Code nicht wiederherstellen laesst — das loescht der User oder niemand.
   assets/icon-source-1024.png (9 KB) bleibt bewusst: das ist die Vorlage, aus der favicon-192/
   -512 und maskable-192/-512 stammen. Eine Quelldatei, kein Ballast.
   assets/rezepte/README.txt (0,7 KB) bleibt: Notiz zum Bilderordner.

PRUEFUNG NACH DEM TEIL
- 25/25 Seiten unveraendert (Fingerabdruck, beide Breiten).
- GLTFLoader in alt und neu gleich funktionsfaehig.
- Rundlauf 103 Seiten bei 390 px: 0 PageErrors, 0 Querlauf.
- Rundlauf 103 Seiten bei 1280 px: 0 PageErrors, 0 Querlauf.
- 31/31 Navigationspruefungen.

STAND DER WELLE 9 INSGESAMT
Navigation neu (Leiste + Weltmenue auf 100 Seiten) · Registry berichtigt (3 Seiten intern,
Sitemap 89 -> 86) · Querlauf 7 -> 0 Seiten · hb-menue.css 34 -> 1 Seite · hb-suche-nav.js
25 -> 1 Seite · GLTFLoader aus dem Inline-Code in die vorhandene Datei.
OFFEN UND NUR VOM USER ZU ENTSCHEIDEN: Uebernahme von startseite-v3.html als index.html ·
Welt-Balance Reisen/Immobilien · die drei nie benutzten Bilddateien.

---

## REMAKE V3 · WELLE 10: DIE STARTSEITE IST UEBERNOMMEN (SW -3008)

FREIGABE: „Genehmigt." — damit endet das Warten aus W8. startseite-v3.html ist ab jetzt
index.html. Die bisherige Startseite liegt als startseite-klassisch.html daneben.

DER TAUSCH
- `git mv index.html startseite-klassisch.html` · `git mv startseite-v3.html index.html`.
- Aus der Datei geflogen: Entwurfs-Plakette (Markup + CSS), `<meta robots noindex>`,
  die handgeschriebene Beschreibung. Kopf-Metadaten gehoeren ab jetzt gen_kopf.js.
- Das Weltmenue der Startseite steht jetzt auf z-index 10000: heiben-legal.js setzt die
  Consent-Leiste auf 9999, sonst laege sie quer im Menue. (Dieselbe Falle wie in W9.)
- Registry: index.html behaelt typ:"start", welt:"holding", "nav": false — sie bringt
  Leitwerk, Kopfleiste und Menue selbst mit. Beschreibung an den neuen Text angepasst
  („Fuenf Unternehmen, ein Zuhause…"), der alte Satz beschrieb eine Seite, die es nicht
  mehr gibt. startseite-klassisch.html als typ:"standalone" eingetragen.

ZWEI NEUE FELDER IN DER REGISTRY, WEIL DIE STARTSEITE DUNKEL IST
gen_kopf.js schrieb theme-color fest auf #f3eee5 und og:image fest auf hero-light.png.
Auf einer Seite in Marken-Tinte ergibt beides eine helle Browserleiste und ein helles
Vorschaubild. Jetzt darf jeder Eintrag `farbe` und `bild` setzen, Vorgabe bleibt hell.
Die Startseite nimmt `#1f1c17` und `assets/hero-dark.png`.
NEBENEFFEKT: hero-dark.png war eine der drei nie referenzierten Bilddateien aus W9 Teil 4 —
es ist die HeiBen-Wortmarke FUER DUNKLEN GRUND und damit genau das richtige Vorschaubild.
Aus Totlast wurde ein Bauteil. Zwei Dateien (monogram-dark/-light) bleiben unbenutzt liegen.

WAS SICH AN DER SEITE SELBST GEAENDERT HAT — GEMESSEN
Alte startseite-v3.html (git-worktree, Port 8181) gegen die neue index.html (8180),
Bewegungsruhe, Fonts abgeklemmt, Fingerabdruck jedes sichtbaren Elements:
@1280 172 -> 175 Elemente, 1 abweichend · @390 161 -> 164 Elemente, 1 abweichend.
Die eine Abweichung ist die verschwundene Entwurfs-Plakette, die drei zusaetzlichen
Elemente sind die Consent-Leiste aus heiben-legal.js. Nichts sonst hat sich bewegt.

PRUEFUNG
- 49/49 Startseiten-Pruefungen (Schriften, Globus, Uebergabe, Strich-Morph in 5 Formen,
  Detailzeichnung, Weltfarbe und Grundtoenung, Leitwerk, Zaehler aus heiben-kennzahlen.js,
  Menue mit Sperre und Sprung, Kopftext, 390 px ohne Querlauf, Bewegungsruhe vollstaendig)
  — dazu neu: JSON-LD/Manifest/Canonical vorhanden, Browserleiste #1f1c17, Vorschaubild
  hero-dark, kein noindex mehr, Pflichtdateien eingebunden, keine fremde Navigation.
- OFFLINE 13/13 Seiten mit Inhalt, index.html eingeschlossen (SW aktiv, Netz gekappt).
- Rundlauf 103 Seiten bei 390 px und bei 1280 px: je 0 PageErrors, 0 Querlauf.
- 31/31 Navigationspruefungen unveraendert.
- Precache 164 -> 160 Eintraege, 4447 -> 4339 KB. Was herausfiel, war ausschliesslich
  Zubehoer der alten Startseite: hero-light.png, wordmark-kulinarik.png, hb-menue.css,
  hb-suche-nav.js — die haengen jetzt an startseite-klassisch.html, und die ist standalone.

STAND
- Waisen: 3 und alle gewollt — 404.html, startseite-neu.html (Inspiration),
  startseite-klassisch.html (Archiv).
- Sitemap 86 URLs, robots 14 Disallow, 14 interne Seiten.
OFFEN UND NUR VOM USER ZU ENTSCHEIDEN:
1. Welt-Balance Reisen (5 Seiten) und Immobilien (5) gegenueber Kulinarik (10) und Wohnen (7).
   Vorschlaege liegen seit W7 bereit.
2. assets/monogram-dark.png und assets/monogram-light.png — nie referenziertes Markenmaterial.
   hero-dark.png ist mit dieser Welle in Betrieb gegangen.

---

## REMAKE V3 · WELLE 11: WELT-BALANCE (SW -3009)

AUFTRAG: „Leg los mit der Balance." Reisen und Immobilien standen bei je 5 Seiten, Kulinarik
bei 10. Umgesetzt sind genau die sechs Vorschlaege, die seit W7 hinterlegt waren.

NEU — REISEN (5 -> 8 Seiten)
- reisen-ziele.html · 12 Ziel-Steckbriefe zwischen Bergischem Land und Schottland. Je Ziel:
  Anreise ab Koeln, beste Zeit, Dauer, Budget, ein Absatz Text, „warum wir es vorschlagen" —
  und ausdruecklich „wofuer es nicht taugt". Zwei Filterbaender (Entfernung, Charakter).
  DEEP-LINK nach dem Kompendien-Vertrag: #id oeffnet den Steckbrief, Schliessen raeumt den
  Hash wieder ab (history.replaceState, damit der Zurueck-Knopf nicht verstopft).
- reisen-packliste.html · Werkzeug (Gruppe „Unterwegs"). Grundstock plus Zuschlaege nach Art
  der Reise, Dauer, Jahreszeit und Begleitung; Haken, eigene Punkte und geloeschte Punkte
  bleiben in heiben-reise-packliste. Druckstil raeumt Bedienelemente weg.
- reisen-rueckblick.html · sechs begleitete Reisen mit Stimme der Reisenden UND der Zeile
  „was wir geaendert haben". Ein Rueckblick ohne die Fehler waere Werbung, keine Auskunft.

NEU — IMMOBILIEN (5 -> 8 Seiten)
- immobilien-nebenkosten.html · Werkzeug (Gruppe „Wohnen & Immobilien"). Grunderwerbsteuer je
  Bundesland (16 Saetze als Datenzeile, Stand 2026 und als solcher ausgewiesen), Notar/Grundbuch,
  Provision, dazu Umzug und Kueche. Zeigt Anteil am Kaufpreis, Gesamtsumme und ob das
  Eigenkapital die Nebenkosten traegt — der Punkt, an dem Finanzierungen scheitern.
  Gegengerechnet: 400.000 € in NRW = 46.280 € (11,57 %), in Bayern 34.280 €.
- immobilien-objekt.html · Steckbrief je Objekt ueber ?id= — Eckdaten, Lage, Merkmale, drei
  weitere Objekte, Merkzettel (heiben-immo-merk). Unbekannte Kennung zeigt keinen Fehler,
  sondern den Weg zurueck zu den Angeboten.
- immobilien-vermieten.html · Leitfaden in neun Schritten mit einer Beispielrechnung, die
  MINUS ergibt (−995 € im ersten Jahr) und erklaert, warum das der Normalfall ist. Bruecken zu
  papierkram, steuererklaerung und mieten-oder-kaufen.

EINE ARCHITEKTURSACHE NEBENBEI
immobilien-angebote.html trug den Objektbestand inline. Die Objektseite braucht dieselben
Daten — also liegen sie jetzt als web/immobilien-daten.js vor (Konvention *-daten.js: nur ans
Ende erweitern, id-Felder stabil, weil sie in Deep-Links und im Merkzettel stehen). Die Liste
wurde auf die Datei umgestellt und um den Link zur Objektseite ergaenzt; die Objekte haben
Detailfelder bekommen (Baujahr, Etage, Hausgeld, Provision, Bezugsfrei, Text, Lage, Haken).

KEINE VERTRAGSAENDERUNG NOETIG
Die drei neuen Speicherschluessel greifen in die vorhandenen Praefixregeln aus
heiben-speicher.js: heiben-reise-packliste -> reisen, heiben-immo-merk und
heiben-immo-nebenkosten -> immobilien. Nachgerechnet, nicht angenommen.
Verlinkung ebenfalls automatisch: reisen.html und immobilien.html tragen
data-hb-weltseiten, die neuen Seiten erscheinen dort nach gen_kopf.js von selbst.

PRUEFUNG
- 29/29 gezielte Pruefungen der neuen Seiten: Kopf/Navigation/Welt auf allen sechs, Deep-Link
  #mosel, Filter 6 von 12, Packliste 5 Gruppen / 30 Punkte, Haken ueberlebt den Neuladen,
  Auswahl aendert die Liste, Speicherschluessel nach Praefixregel, ?id= laedt das Objekt,
  Quadratmeterpreis 5.143 €, Merkzettel, Leerfall, NRW- und Bayern-Rechnung, 16 Bundeslaender,
  Angebote aus der Datei, Uebersicht auf beiden Weltseiten, schmal ohne Querlauf.
- Rundlauf 109 Seiten bei 390 px und 1280 px: je 0 PageErrors, 0 Querlauf.
- 31/31 Navigationspruefungen, 49/49 Startseiten-Pruefungen, offline 13/13.
- Sitemap 86 -> 92 URLs · Werkzeuge 21 -> 23 · Suchindex 426 Eintraege (92 Seiten)
  · Precache 160 -> 167 Eintraege.

STAND DER WELTEN: Reisen 8 · Wohnen 7 · Immobilien 8 · Studio 7 · Kulinarik 10.
OFFEN UND NUR VOM USER ZU ENTSCHEIDEN: assets/monogram-dark.png und monogram-light.png —
nie referenziertes Markenmaterial, zur Laufzeit kostenlos.

### WELLE 12: DAS MONOGRAMM IN BETRIEB (SW -3011)

AUFTRAG: „Beide Dateien." — die letzten zwei nie referenzierten Bilder.
GELESEN ALS: in Betrieb nehmen, nicht loeschen. Der Blick auf die Dateien gab den Ausschlag:
monogram-light.png ist das HB in Tinte und Terrakotta (fuer die hellen Seiten),
monogram-dark.png dasselbe Zeichen in Leinen und Ocker (fuer die Tinte-Gruende). Ein Paar,
das genau auf die zwei Gruende passt, die der Auftritt seit W10 hat. Waere „loeschen" gemeint
gewesen, ist das ein Befehl entfernt — die Dateien liegen unveraendert im Verzeichnis.

WO SIE JETZT STEHEN
- Gemeinsame Navigation (heiben-design.css): `.hb-brand::before` traegt das Zeichen vor der
  Wortmarke — als HINTERGRUNDBILD, damit `.hb-menue .hb-brand::before` im dunklen Weltmenue
  einfach die andere Fassung einsetzt. Dekoration, also kein alt-Text: den Namen sagt die
  Wortmarke daneben.
- Startseite: das Leitwerk zeigt statt der Buchstaben „HB" das Zeichen (30 px), Kopfleiste und
  mobiles Menue tragen es vor der Wortmarke, beide in der dunklen Fassung.
- Leistenhoehe unveraendert bei 61 px (das Zeichen ist in em bemessen und haengt an der Schrift).

DABEI EINEN ECHTEN FEHLER IM WERKZEUG GEFUNDEN
gen_sw.js sammelte Referenzen nur aus `<script src>`, `<link href>` und `<img src>` im HTML.
Was ein Stylesheet per `url()` holt, kannte es nicht — monogram-light.png war nach dem Einbau
prompt NICHT im Precache und haette offline gefehlt (monogram-dark.png dagegen schon, weil die
Startseite ihr CSS inline im Dokument haelt). Der Generator liest jetzt in einer zweiten Runde
alle referenzierten .css-Dateien UND jeden inline-`<style>`-Block auf `url()` ab.
Ergebnis: 167 -> 169 Eintraege; genau die zwei Monogramme kamen dazu, sonst fehlte nichts —
die Luecke hat also nur hier zugebissen, war aber eine echte.

PRUEFUNG
- Zeichen sichtbar und richtig zugeordnet: helle Leiste -> monogram-light, Weltmenue ->
  monogram-dark, Leitwerk der Startseite -> monogram-dark (514×383 geladen), Kopfleiste ebenso.
- OFFLINE gegengeprueft (Netz gekappt, SW aktiv): beide Monogramme abrufbar, 13/13 Seiten.
- Rundlauf 109 Seiten bei 390 px und 1280 px: je 0 PageErrors, 0 Querlauf.
- 31/31 Navigation · 49/49 Startseite · 29/29 Welt-Balance.

DAMIT IST DIE LISTE DER TOTLAST LEER: alle sechs unreferenzierten Dateien aus W9 sind geklaert —
GLTFLoader.js ausgelagert und in Betrieb, hero-dark.png als Vorschaubild der Startseite,
monogram-light/-dark in der Navigation, icon-source-1024.png bleibt als Vorlage der Favicons,
rezepte/README.txt als Notiz.

---

## REMAKE V3 · WELLE 13: DIE FUENF WELTSEITEN (SW -3014)

AUFTRAG: „Pruefe das Design der jeweiligen Welten. Gestalte es analog zur Startseite."

BEFUND VORHER: die fuenf Weltseiten (typ "welt") standen auf hellem Leinen, jede mit einem
eigenen Rumpf, gestaltet ueber die gemeinsame styles.css (die aber 29 Seiten traegt — dort
etwas zu aendern haette weit mehr getroffen als die fuenf). Inhaltlich derselbe Aufbau:
Kopf, vier Angebotskarten, ein Argumente- oder Zahlenblock, Abschluss.

WAS JETZT STEHT — DIESELBE SPRACHE WIE DIE STARTSEITE
- Grund: Marken-Tinte, getoent mit 13 % der Weltfarbe. Studio ist die Tinte selbst und bleibt
  ungetoent, sonst stuende die Seite ohne Ton da.
- Kopf: Weltname gross in Fraunces (Lichtfassung der Weltfarbe), das Verb kursiv darunter —
  aufbrechen · bleiben · ankommen · verstehen · teilen, dieselben fuenf wie auf der Startseite.
  Daneben das ZEICHEN der Welt: Koffer, Haus, Tuer, Gluehbirne, Topf. Es zeichnet sich beim
  Laden selbst, erst die Silhouette, dann die Detailstriche.
- Baender: Angebotskarten als Fugenraster auf Tinte, Argumente mit Ziffer, Zahlenband.
- Bestand dieser Welt: `data-hb-weltseiten` und `data-hb-werkzeuge` wie gehabt — die
  Bauteile des Design-Systems werden in `.w-dunkel` fuer den dunklen Grund eingekleidet,
  das System selbst bleibt unberuehrt (die 100 hellen Seiten aendern sich nicht).
- Die gemeinsame Leiste bekommt ueber `data-hb-grund="tief"` am body eine dunkle Fassung samt
  dunklem Monogramm — sonst laege eine helle Kante quer ueber jeder Weltseite.
- theme-color je Welt in tools/seiten.json (das Feld aus W10), damit die Browserleiste nicht
  hell ueber einer dunklen Seite steht.

EINE QUELLE FUER DIE ZEICHEN
Die Geometrie lag nur in index.html. Sie liegt jetzt in `web/heiben-marken.js` (Form als
Polygonzug, Detailpfade, kanonische Farbe, Lichtfassung, Verb) und wird von BEIDEN Seiten
benutzt: die Startseite tastet die Formen um und morpht zwischen ihnen, die Weltseite zeichnet
eine davon. 1.348 Zeichen Geometrie und das Detail-Markup sind aus index.html verschwunden;
die Startseiten-Pruefung blieb dabei bei 49/49.

KULINARIK: DIE LAENDERKARTE BLEIBT
Die Karte (51 Laender, eigenes Bauteil mit style#kmapt-style und kmapt-logic) ist unveraendert
uebernommen und liegt jetzt als HELLES BLATT auf dem dunklen Tisch — Papierunterlage,
abgerundet, Ueberschrift und Vorspann in den Farben der Weltseite. Das Bauteil selbst wurde
nicht angefasst.

ZWEI PRUEFUNGEN WAREN VERALTET, NICHT DER CODE
- „Leiste traegt die Weltfarbe" verglich gegen den festen Hex der Welt. Auf dunklem Grund
  traegt die Leiste die LICHTFASSUNG. Die Pruefung rechnet den erwarteten Wert jetzt selbst
  aus, statt eine Farbe zu behaupten.
- „Menue oeffnet" mass nach starren 420 ms. Die Weltseiten zeichnen beim Laden ihr Zeichen,
  dadurch startet die Blende spaeter. Die Pruefung wartet jetzt auf den ZUSTAND (Deckkraft
  ueber 0,95), nicht auf die Uhr.

PRUEFUNG
- Fuenf Seiten einzeln: Grund getoent, Weltname, Zeichen mit Detailstrichen (4/5/2/6/6),
  vier Karten, Weltseiten-Uebersicht (6-9 Kacheln), Werkzeuge wo vorhanden, 0 PageErrors.
- Bewegungsruhe: alles sofort sichtbar, kein Zeichnen-Effekt, Details voll deckend.
- Schmal 390 px: kein Querlauf, Zeichen da, Leiste dunkel — auf allen fuenf.
- Rundlauf 109 Seiten bei 390 px und 1280 px: je 0 PageErrors, 0 Querlauf.
- 31/31 Navigation · 49/49 Startseite · 29/29 Welt-Balance · offline 13/13.

---

## REMAKE V3 · WELLE 14: DER LINKGRAPH (SW -3016)

AUFTRAG: „Baue alle Verknuepfungen von Startseite zu Unterseiten und von Unterseiten zu
entsprechenden."

GEMESSEN, BEVOR GEBAUT WURDE — UND ZWEIMAL, WEIL DIE ERSTE MESSUNG LOG
Der statische Graph (Links im HTML) sah dramatisch aus: nur 77 von 107 oeffentlichen Seiten
von index.html erreichbar, 18 ohne eingehenden Link. Das war ein MESSFEHLER: Weltmenue und
Werkzeug-Register entstehen erst im Browser. Im echten Graphen (Seiten geladen, Menue
geoeffnet, dann alle a[href] eingesammelt) waren es 102 von 107 — die Lage war viel besser
als der Text im HTML.
ECHTE LUECKEN, die dann uebrig blieben:
1. Die Startseite verlinkte nur 10 Seiten direkt. Die drei Marken je Kapitel („Reiseziele",
   „Reise-Planer", „Anfrage" …) waren <span> — Beschriftung, kein Weg.
2. Vier Holding-Seiten (strategie, marke, designsystem, partner-demo) bildeten einen
   geschlossenen Ring: sie verlinkten nur einander, aus dem erreichbaren Auftritt zeigte
   nichts hinein.
3. Von einer Unterseite zu ihren Geschwistern fuehrte der Weg NUR ueber das Weltmenue —
   man musste es erst oeffnen.

WAS GEBAUT WURDE
1. STARTSEITE: die 15 Kapitel-Marken sind jetzt echte Links auf die Kernseite der jeweiligen
   Welt (reisen-ziele, reisen-planer, reisen-anfrage · manufaktur, wohnen-konfigurator,
   wohnen-planer · immobilien-angebote, immobilienbudget, immobilien-anfrage · suche,
   lernpfade, tagesdosis · kulinarik-rezepte, kulinarik-wochenplan, kulinarik-rezeptwuerfel).
   Dazu eine knappe Wege-Zeile im Zaehlband: Wissen, Suche, Lernpfade, Begriffskarten,
   Schaufenster, Familie. Direkte Ziele der Startseite: 10 -> 28.
2. NACHBARN (neues Bauteil): `<div data-hb-nachbarn></div>` rendert „Weiter in HeiBen <Welt>" —
   alle Geschwister der Welt plus Rueckweg zur Weltseite. Quelle ist heiben-menue.js, also
   dieselbe generierte Liste wie das Weltmenue; gen_kopf.js haengt hb-nachbarn.js automatisch
   an, sobald der Behaelter im Markup steht. Gesetzt auf 35 Unterseiten der fuenf Welten.
   Auf dunklem Grund kleidet hb-welt.css dasselbe Bauteil um.
3. HOLDING-RING: unternehmen.html verlinkt die vier Seiten jetzt in einem eigenen Abschnitt
   („Wie wir arbeiten — nachlesbar").

ERGEBNIS, NACHGEMESSEN
- von index.html erreichbar: 102 -> 106 von 107. Die eine Ausnahme ist 404.html — eine
  Fehlerseite gehoert nicht verlinkt, das ist kein Mangel.
- ohne eingehenden Link: weiterhin nur 404.html.
- direkt von der Startseite: 10 -> 28 Seiten.
- Nachbarn stichprobenhaft: reisen-ziele 7 · kulinarik-rezepte 9 · immobilien-objekt 7 ·
  wohnen-planer 6 · studio-magazin 6 — jeweils ohne die eigene Seite und mit Rueckweg.

PRUEFUNG: 13/13 gezielt (Nachbarn auf fuenf Seiten, Startseiten-Marken, Wege-Zeile) ·
Rundlauf 109 Seiten bei 390 px und 1280 px je 0 PageErrors und 0 Querlauf ·
31/31 Navigation · 49/49 Startseite · 29/29 Welt-Balance · offline 13/13.

### WELLE 15: JE WELT EIN EIGENES BAUTEIL (SW -3018)

AUFTRAG: „Weitere passende Designelemente je Welt einbauen."

HALTUNG: Die fuenf Weltseiten teilen seit W13 Grund, Schrift und Bewegung. Was fehlte, war
das Eigene. Regel fuer diese Welle: EIN Bauteil je Welt, und es muss aus dem MATERIAL der
Welt kommen und etwas Wahres zeigen — kein Muster, das ueberall haette stehen koennen.

REISEN · das Etappenband (.w-route)
Eine Reise ist eine Folge von Etappen — der Ablauf einer Buchung auch. Vier Stationen auf
einer gepunkteten Linie mit Ring-Marken und Tagesangaben: „Sie schreiben uns · Tag 0",
„Wir schlagen vor · Tag 1–3", „Wir schleifen gemeinsam · Tag 4–10", „Sie reisen · ab Tag X".
Der Abschnitt sagt damit erstmals, WIE lange etwas dauert.

WOHNEN · die Bemaszung (.w-mass) und das Planraster
Innenarchitektur beginnt beim Maß. Der Trenner ueber den Leistungskarten ist eine Bemaßungs-
linie mit Endmarken und der Angabe in der Mitte („Vom ersten Maß bis zum letzten Stueck").
Hinter dem Haus-Zeichen liegt ein feines Planraster (34 px).
NACHGEBESSERT: die Endmarken waren zuerst mit box-shadow gebaut und kaum zu sehen; jetzt
tragen die Pseudo-Elemente die Linie als Hintergrund-Gradient und die Marke als Rahmenkante.

IMMOBILIEN · Eckwinkel und Pruefzeile
Jede Angebotskarte bekommt die Eckwinkel einer Planzeichnung (oben links, unten rechts).
Darunter steht in Mono, was vor der Aufnahme geprueft wurde: Grundbuch, Teilungserklaerung,
Protokolle der letzten drei Jahre, Energieausweis. Vertrauen wird gezeigt, nicht behauptet.

STUDIO · Satzspiegel
Ein Magazin erkennt man am Satz: Der Vorspann bekommt ein Initial in Fraunces (::first-letter,
opsz 144, WONK 1), daneben steht eine Randnotiz „Aus der Redaktion" an einer Spaltenlinie.

KULINARIK · die Zutatenzeile (.w-zutaten)
Ein Rezept listet Zutat und Menge, verbunden durch eine Punktreihe. Genau so steht jetzt da,
was in dieser Kueche immer im Haus ist — zehn Zeilen von „Olivenoel, gutes · 1 l" bis
„Butter, gesalzen · immer".

PRUEFUNG
- Fuenf Bauteile einzeln gerendert und angesehen (nicht nur gezaehlt).
- Schmal 390 px: alle fuenf sichtbar und im Rahmen (rechte Kante 371 von 390).
- Bewegungsruhe: alle fuenf sofort da, keine offenen Aufzuege.
- Rundlauf 109 Seiten bei 390 px und 1280 px: je 0 PageErrors, 0 Querlauf.
- 31/31 Navigation · 49/49 Startseite · 29/29 Welt-Balance · offline 13/13 ·
  Linkgraph unveraendert 106/107.

WIEDER EINE PRUEFUNG, DIE AUF DIE UHR SAH
Die erste Messung meldete das Immobilien-Bauteil als unsichtbar. Nachgesehen: es hat 480 ms
Verzoegerung und 320 ms Blende, die Probe schaute nach 700 ms. Der Code war richtig, die
Pruefung falsch — sie wartet jetzt auf die Deckkraft statt auf einen Zeitpunkt. Das ist
dieselbe Falle wie in W13; sie steht damit zum zweiten Mal im Protokoll.

---

### WELLE 16: BILDPLAN FÜR 159 REZEPTSEITEN (SW -3019)

**Auftrag (Teil B):** „Gib mir die Planung für die Fülle aller rezeptseiten mit Bildern
anhand ki bildgenerator und reimport via Claude. Konzept und Durchführung. Liste und
prompting sowie reimport Struktur."

**Ausgangslage gemessen:** 159 Rezepte in `web/kulinarik-daten.js`, davon **0 mit Bild**.
51 Länder, 8 Gänge. Die Kopplung an die Seite war schon da und ist die ganze Schnittstelle:

```js
// kulinarik-rezepte.html:244 und kulinarik-rezept.html:538
function coverSrc(rid) { return 'assets/rezepte/' + rid + '.jpg'; }
```

Datei liegt → Bild erscheint. Datei fehlt → Platzhalter. Keine Codeänderung nötig.
Die vorhandene `_dateiliste.csv` trug 159 Schablonen-Prompts von 260–310 Zeichen,
alle derselbe Satz mit ausgetauschtem Namen — für einen Bildgenerator wertlos.

**Geliefert**

| Datei | Was |
|---|---|
| `tools/gen_bildprompts.py` | erzeugt Liste, Prompts, Chargen aus den Rezeptdaten |
| `tools/import_rezeptbilder.py` | prüft und übernimmt Bilder, meldet den Stand |
| `BILDPLAN.md` | Konzept, Durchführung, Chargen, QS, Aufwand |
| `web/assets/rezepte/_dateiliste.csv` | 159 Zeilen mit echtem Prompt |
| `web/assets/rezepte/_prompts.jsonl` | dieselbe Liste maschinenlesbar |
| `web/assets/rezepte/chargen/charge-01…08.md` | 8 Portionen à 20 zum Abarbeiten |

**Prompt-Bau — vier Teile, drei halten zusammen, einer trennt**

- ANKER (in allen 159 wortgleich): Fensterlicht von links, 50 mm bei f/4, gedeckte warme
  Palette, ehrlich statt hochglanz, Querformat 3:2, Negativliste
- GANG (8 Varianten): Kamerawinkel + Gefäß — Suppe von oben in tiefer Schale,
  Hauptgericht schräg 45°, Gebäck flach von der Seite
- REGION (12 Varianten): Untergrund + zwei Requisiten — Messingtablett auf Zementfliesen,
  dunkelgrün gestrichenes Holz, unbehandelte Terrakotta
- GERICHT (159 Varianten): **2–3 echte Hauptzutaten aus dem Zutatenfeld** plus
  Serviervorschlag aus `servier`

Der Punkt ist der letzte Teil. Ein Generator, der nur „Šaltibarščiai" liest, malt
irgendetwas; einer, der „kalte rote Bete, Kefir, Salatgurke" liest, malt das Gericht.

Gemessen: **159 verschiedene Prompts**, keiner doppelt, 841–1115 Zeichen, Median 966
(vorher: 159 × derselbe Satz).

**Gelernt: Datenlesen über eine Brücke.** `kulinarik-daten.js` ist 532 KB — zu groß für
argv. Der Generator schreibt eine Wegwerf-Node-Datei, die `global.window={}` setzt, die
Datendatei evaluiert und JSON auf stdout schreibt; Python liest das und löscht die Datei
im `finally`.

**Gelernt: deutsche Fälle im Prompt.** Erste Fassung schrieb „hauptgericht aus
Vereinigtes Königreich". Gang jetzt groß, Satzanfänge groß, Ländertabelle `LAND_FALL`
für die mit Artikel („aus dem Vereinigten Königreich", „aus der Türkei", „aus den
Niederlanden"). Ebenso „serviert in/auf X" → tiefe Gefäße bekommen „in", flache „auf".

**Befund, nicht behoben: 38 verstümmelte IDs.** Beim Anlegen der Daten gingen alle
Sonderzeichen außer Umlauten/ß verloren:

| Rezept | ID und damit Dateiname |
|---|---|
| Tiramisù | `tiramis` |
| Ćevapi | `evapi` |
| Bœuf bourguignon | `b-uf-bourguignon` |
| Svíčková na smetaně | `sv-kov-na-smetan` |

Soll wäre `tiramisu`. Ist bleibt `tiramis` — `id`-Felder sind ein stabiler Vertrag,
an ihnen hängen `kulinarik-rezept.html?id=…`, die Merklisten im localStorage und der
Suchindex. Alle 159 IDs sind eindeutig, es kollidiert nichts. Die Dateiliste führt die
ID überall mit, damit niemand einen Namen abtippt.

**Import-Werkzeug — was es prüft, bevor es ablegt**

| Prüfung | Grenze |
|---|---|
| Name in der Liste | exakt oder eindeutig zuzuordnen (Akzente, Groß/klein, „ (2)"-Anhängsel) |
| Dateityp | JPG — die Seite lädt `.jpg` |
| Breite | ≥ 1200 px |
| Seitenverhältnis | 3:2 ± 6 % |
| Größe | ≤ 400 KB abgewiesen, > 300 KB Hinweis |

Maße kommen aus dem Dateikopf (JPEG-SOF, PNG-IHDR, WebP-VP8/VP8L/VP8X) — in dieser
Umgebung gibt es weder PIL noch ImageMagick noch cwebp. Das Werkzeug rechnet darum
bewusst **nichts** um: es prüft, meldet und lässt liegen. Umbenennen nur mit
`--umbenennen`; still umzutaufen fällt erst auf, wenn zwei Rezepte dasselbe Bild tragen.

Standbericht jederzeit ohne Ordner:

```
$ python3 tools/import_rezeptbilder.py
Stand: 0/159 Rezeptbilder liegen bereit (0 %)
  Charge 01:  20 offen — chakhchoukha, chorba-frik-algerische-lammsuppe, … +16
```

**Precache-Entscheidung:** Die Bilder gehen **nicht** hinein. `gen_sw.js` nimmt nur, was
aus HTML und CSS referenziert wird; `coverSrc()` bildet den Pfad zur Laufzeit. Sie landen
über stale-while-revalidate im Cache, sobald sie einmal gezeigt wurden. 159 × 250 KB im
Precache wären 40 MB beim ersten Aufruf.

**Offen aus demselben Auftrag (Teil A):** Struktur und Design der Weltunterseiten.
Audit liegt vor: von 47 Weltseiten sind nur **5 auf v3** (die fünf Welteinstiege),
**18 auf dem alten `styles.css`**, **24 mit eigenem Inline-Design**. 63.190 Zeichen
Fließtext, Median 1.056. Spitzen: `immobilien-vermieten` 4.946 Zeichen,
`studio-einrichtungstheorie` 2.937, `kulinarik-mealplanner` 2.122 bei 28 Schaltern und
34 Feldern; Schalterzahlen bis 68 (`reisen-planer`), 66 (`wohnen-planer`),
55 (`wohnen-konfigurator`), 54 (`kulinarik-planner`).

---

### WELLE 17: DIE 42 WELTUNTERSEITEN AUF DEN NEUEN STIL (SW -3020)

**Auftrag:** „Bringe alles auf neuen Style. Nächste Welle."

**Ausgangslage gemessen.** 47 Weltseiten: nur die **5 Welteinstiege** standen auf v3
(`hb-welt.css`), **5 auf dem alten `styles.css`**, **37 mit eigenem Inline-Design**
zwischen 2 und 16 KB. 64.054 Zeichen Fließtext.

Der Blick in die 37 Inline-Blöcke zeigte kein Design, sondern **ein kopiertes Kit**:
`:root`, `body`, `.wrap`, `.topbar`, `.wm`, `.back`, `.eyebrow`, `h1`, `.lede`, `.btn`,
`.chip`, `.field`, `.card`, `.note`, `footer` — auf 20 bis 26 Seiten wortgleich. Damit war
der Hebel klar: nicht 37 Seiten einzeln neu gestalten, sondern das Kit einmal zentral
und in der neuen Sprache neu schreiben.

**Der sichtbarste Befund: 21 Seiten trugen zwei Kopfzeilen.** Die gemeinsame Navigation
aus `heiben-nav.js` UND eine eigene `.topbar` mit Wortmarke und Zurück-Link darunter.
Dazu vier Seiten mit einem Wortmarken-Bild im Hero und eine Werkzeugleiste mit einer
dritten Wortmarke — **26 doppelte Markenzeichen** auf 42 Seiten.

**Geliefert**

| Datei | Was |
|---|---|
| `web/hb-weltseite.css` | die helle Schwester von `hb-welt.css`: Weltunterseiten-Gestalt auf Papier, 12,3 KB |
| `tools/umbau_weltseiten.py` | baut die Seiten um, wiederholbar, mit Trockenlauf |
| `tools/weltseiten-kit.json` | die eingefrorenen Kit-Fassungen samt Basis-Commit |

`hb-weltseite.css` ist vollständig auf `[data-hb-seite="welt"]` am body geschoben. Die
Klassennamen aus dem alten Kit bleiben — so blieb das Markup unangetastet —, der Scope
hält sie von den übrigen 65 Seiten fern. `heiben-design.css` und seine `.hb-`-Regel sind
unberührt. **Kein Hex im Bauteil:** 0 Hex-Werte in der Datei, alles kommt aus `--hb-welt`
und der Token-Ebene.

**Der eine Trick, der 42 Seiten auf einmal umfärbt.** Die Seiten sind voll von
`var(--accent)`, `var(--rule)`, `var(--ink-soft)`. Statt tausend Vorkommen zu ersetzen,
bekommen die alten Namen am body neue Herkunft:

```css
body[data-hb-seite="welt"]{
  --accent:var(--hb-welt);  --accent-d:var(--ws-welt-tief);
  --bg:var(--hb-grund);     --ink:var(--hb-text);  --rule:var(--hb-linie);
}
```

Ein Ort, 42 Seiten. Die Hex-Werte in den `:root`-Blöcken der Seiten sind entfallen —
der body gewinnt für alles darunter.

**Was zentral wurde**

| Schritt | Zahl |
|---|---|
| Seiten umgebaut | 42 / 42 |
| doppelte Kopfzeilen entfernt | 21 |
| doppelte Wortmarken zusätzlich (Hero-Bild, Werkzeugleiste) | 5 |
| Rückwege `.ws-weg` | **42 / 42**, kein totes Ziel |
| Seiten als `data-hb-dichte="werkzeug"` | 6 |
| Inline-CSS | 238 KB → **192 KB**, zentral 12,3 KB dafür → netto 34 KB weniger |

**Drift statt Eigenheit.** Nach dem ersten Durchgang setzten noch 16 Seiten `h1` selbst,
19 `.lede`, 13 `.btn`. Der Blick darauf: **überall dieselbe Handschrift mit anderer
Nachkommastelle** — Fraunces 340 mit anderem `clamp`, `color:var(--ink-soft)` mit
`max-width` zwischen 56ch und 70ch, derselbe Mono-Versalien-Knopf mit anderem `display`.
Kein eigenes Design, sondern dieselbe Kopie nach Jahren Nachbearbeitung. Der Umbau
erkennt sie jetzt an der Handschrift (`DRIFT` in `umbau_weltseiten.py`), nicht am
Wortlaut. Danach: `h1`, `.eyebrow`, `.lede`, `.wrap`, `.chip` auf **0** eigenen Fassungen.

Genau **eine** echte Absicht steckte in der Drift: Planer und Redaktionen hatten ihre
Überschrift bewusst kleiner gesetzt (`clamp(1.6rem,4.2vw,2.4rem)`), weil ein 3,6-rem-Titel
über 40 Schaltern alles erschlägt. Die steht jetzt als Rolle da — `data-hb-dichte="werkzeug"`
auf sechs Seiten — statt sechsmal als Wert.

**Zwei Fallen, beide vom Messen gefangen, nicht vom Nachdenken**

1. *Das Regex-Muster fraß die halbe Seite.* `<div class="topbar">.*?</a>\s*</div>` sieht
   sicher aus. Trägt die Leiste ZWEI Rückweg-Links, passt es beim ersten `</a>` nicht,
   läuft weiter und findet ein `</a></div>` weit unten im Text. Auf
   `studio-einrichtungstheorie` verschwanden so **2.784 Zeichen**, auf
   `studio-lebenswissen-bibliothek` 432. Gefunden hat es der PageError-Sweep (die
   gelöschten Blöcke nahmen Elemente mit, an denen Skripte hingen), bestätigt ein
   Textlängen-Vergleich gegen HEAD über alle 42 Seiten. **Ersetzt durch Klammerzählung**
   über `<div>`/`</div>`. Regel: HTML-Blöcke nie mit `.*?` abgrenzen.
2. *Die Einfügung landete im JavaScript-String.* Der Rückweg auf `kulinarik-rezept.html`
   wurde vor das erste `<h1` gesetzt — und das stand in einer Skript-Zeichenkette
   (`'<h1>' + K.esc(r.name) + '</h1>' +`). Ergebnis: `SyntaxError: Unexpected token '<'`.
   Die Seite baut ihren Rückweg selbst; richtig war, ihn dort umzubenennen. Danach
   Prüfung über alle 42 Seiten, ob eine `.ws-weg`-Einfügung in `<script>`/`<style>` liegt.
   Auch `studio-artikel` traf es anders: der Anker war die erste `.eyebrow` — und die
   stand in einem `display:none`-Abschnitt. Gefunden vom Sichtbarkeits-Test.

**Nicht idempotent — und warum das eine Datei nötig machte.** Der erste Entwurf erhob das
Kit zur Laufzeit („welche Regel steht wortgleich auf ≥ 6 Seiten"). Nach dem ersten Lauf
gibt es die Kopien nicht mehr zu zählen, die Schwelle wird nie wieder erreicht, ein zweiter
Lauf tut nichts. Aufgefallen beim Nacharbeiten der zwei beschädigten Seiten: dieselbe
Datei, plötzlich 0 statt 6 entfernte Regeln. Das Kit liegt seither in
`tools/weltseiten-kit.json` samt Basis-Commit.

**Nachweis**

| Prüfung | Ergebnis |
|---|---|
| PageErrors über alle 47 Weltseiten | **0 / 47** |
| Seiten mit vollständigem neuen Stil (Grund, `--accent` = Weltfarbe, Rückweg sichtbar, keine zweite Kopfzeile, Fraunces-Titel, kein waagerechter Überlauf) | **42 / 42** |
| Textverlust gegen HEAD (> 40 Zeichen) | keine Seite |
| tote Rückweg-Ziele | keine |
| Hex-Werte in `hb-weltseite.css` | keine |

**Was bewusst stehen blieb.** 10 Seiten setzen `.note` weiter selbst — und das zu Recht:
die Klasse trägt dort **zwei Bedeutungen**. Im Kit ist sie das Mono-Kapitälchen, auf
sieben Seiten ein normal großer Fließtext-Hinweis. Der Namenskonflikt ist echt, das
Umbenennen wäre eine eigene Welle. Ebenso stehen `footer` (7), `body` (6, in
`@media`-Blöcken), `.btn` (4), `.disc` (4) noch lokal — geprüft, echte Abweichungen.

Die vier Wortmarken-Bilder `assets/wordmark-{reisen,wohnen,immobilien,studio}.png` fielen
aus dem Precache, weil sie niemand mehr referenziert. Die Dateien bleiben liegen:
`startseite-klassisch.html` (Archiv, standalone) braucht sie noch.

**Offen:** Bewegung. 17 der 42 Seiten binden `hb-motion.js` ein, **keine** setzt
`data-hb-regie="ansage"` — alle laufen also auf dem eingefrorenen Bestandspfad. Eine
eigene Welle wert, mit der dokumentierten IntersectionObserver-Falle im Blick.
Ebenso offen: die Textfülle (`immobilien-vermieten` 4.953 Zeichen,
`studio-einrichtungstheorie` 2.964) — Struktur, nicht Stil.

---

### WELLE 18: EIN FUSS FÜR ALLE SEITEN (SW -3021)

**Auftrag:** „Eigene Wellen gegen Redundanz starten wie vorgeschlagen."

**Erst gemessen, wo die Redundanz wirklich liegt.** Vier Hypothesen geprüft, drei
verworfen:

| Vermutung | Befund |
|---|---|
| doppeltes Inline-JS | 8 Funktionen auf ≥3 Seiten — **5 KB**, zu klein |
| doppelter Fließtext | **1 Absatz** auf ≥4 Seiten. Die Inhalte sind echt verschieden |
| doppeltes Markup | **der Fußbereich**, 33-mal kopiert → diese Welle |
| doppeltes CSS außerhalb der Welten | 62 Seiten, 295 KB, zweites Kit → Welle 19 |

Dass der Fließtext **nicht** redundant ist, war das wertvollste Nein: es hätte eine
Welle Textkürzung gerechtfertigt, die nichts gebracht hätte.

**Der Fußbereich lag 33-mal im Markup** — in drei Fassungen, die sich in Leerzeichen
und zwei fehlenden Links unterschieden, je ~2,15 KB. Gleichzeitig endeten die Seiten auf
drei verschiedene Arten: `<footer>` (53), `<p class="foot">` (46), gar nichts (10).

**Der eigentliche Befund war kein Redundanz-, sondern ein Rechtsproblem:
67 von 109 Seiten trugen keinen einzigen Rechts-Link.** Kein Impressum, kein Datenschutz.
`rechtliches.html` war überhaupt nur aus dem Fuß von `impressum.html` erreichbar.

**Geliefert**

| Datei | Was |
|---|---|
| `web/hb-fuss.js` | baut den Fuß, 5,9 KB |
| `web/hb-fuss.css` | Gestalt, 0 Hex und 0 rgba im Bauteil |
| `tools/umbau_fuss.py` | entfernt die Kopien, schaltet eigene Abschlüsse ab |
| `tools/gen_kopf.js` | hängt beide an — neue Seite bekommt den Fuß von allein |

Gebaut wird ein `div[role="contentinfo"]`, **nie ein `<footer>`-Element** — aus demselben
Grund wie bei `heiben-nav.js`: `styles.css` stylt `footer{}` als Element-Selektor
(dunkler Grund, eigenes Raster) und würde den neuen Fuß auf 29 Seiten überschreiben.

**Ergebnis**

| | vorher | nachher |
|---|---|---|
| Seiten mit gemeinsamem Fuß | 0 | **106** (+3 bewusst abgeschaltet, 0 ohne) |
| Seiten ohne Rechts-Link | 67 | **0** |
| kopierte Fußbereiche | 33 | 0 |
| HTML gesamt | 3.108 KB | **3.038 KB** (zentral 10,4 KB → netto 59 KB weniger) |

Abgeschaltet über `data-hb-fuss="aus"` am body: `index.html` (bringt seinen knappen
Abschluss selbst mit) und die zwei archivierten Standalone-Startseiten.

**Falle: an den body anhängen setzt einen Block-Container voraus.** `404.html` zentriert
seinen Inhalt mit `display:flex` — der Fuß wurde dort zum Element **neben** dem Inhalt,
208 px schmal statt 1.100, und schob die Seite 112 px über den rechten Rand. Gefunden
vom Überlauf-Test im Sweep, isoliert durch Entfernen des Fußes im laufenden Dokument
(1392 → 1280 px). `hb-fuss.js` misst jetzt `getComputedStyle(document.body).display`
und passt sich ein: bei Flex `flex:0 0 100%` plus `flex-wrap:wrap`, bei Grid
`grid-column:1/-1`. Regel: **nie annehmen, dass der body ein Block ist.**

**Zweite Falle, eigene Nachlässigkeit:** die zwei Zusatzlinks der Welten-Spalte
(„↳ Das Magazin", „↳ Unsere Arbeit") bekamen einen Weltfarb-Punkt, weil die Prüfung
`if (weltfarbe && e[2])` auch bei `e[2] === 'leise'` zutrifft — `var(--hb-w-leise)`
existiert nicht, der Punkt blieb farblos. Auf 64 Seiten gemeldet vom Test „5 Weltpunkte
erwartet". Ohne die Zählung wäre es niemandem aufgefallen und trotzdem falsch gewesen.

**Nachweis**

| Prüfung | Ergebnis |
|---|---|
| PageErrors über alle 109 Seiten | **0 / 109** |
| Fuß vorhanden, ≥ 120 px hoch, genau 5 Weltpunkte, Impressum + Datenschutz verlinkt, kein waagerechter Überlauf | **109 / 109** |
| verbliebene große `<footer>` | 1 (`startseite-klassisch.html`, Archiv) |
| Wert-Literale in `hb-fuss.css` | keine |

**Nächste Front (Welle 19): das zweite Kit.** 62 Nicht-Weltseiten tragen 295 KB
Inline-CSS. Darin steckt die **Kompendium-Maschinerie** — `.controls`, `.dcard`,
`.dhead`, `.pc`, `.badges`, `#q`, `#detail` — **8- bis 17-fach wortgleich kopiert**,
auf den acht Kompendien (`auto`, `digital`, `erstehilfe`, `finanzen`, `haushalt`,
`lebensmittel`, `papierkram`, `pflanzen`) plus `wissen.html`. 37 KB auf neun Seiten,
40 KB insgesamt vermeidbar. Methode wie in W17: Kit einfrieren, zentrale Datei,
Drift an der Handschrift erkennen.

---

### WELLE 19: DIE KOMPENDIEN AUF EINE GESTALT (SW -3022)

**Zweite Front derselben Welle gegen Redundanz.** Nach dem Fuß (W18) das zweite kopierte
Kit: die acht Kompendien (`auto`, `digital`, `erstehilfe`, `finanzen`, `haushalt`,
`lebensmittel`, `papierkram`, `pflanzen`) und der Wissens-Hub `wissen.html` trugen
dieselbe Maschinerie **neunmal** im eigenen `<style>` — Filterleiste, Steckbriefkarte,
Marken, Trefferzähler, Leermeldung.

Gemessen vor dem Umbau: 136 verschiedene Selektoren auf neun Seiten, davon
**40 wortgleich auf mindestens sechs** — 44 KB Inline-CSS, davon 26 KB reine Kopie.

**Geliefert**

| Datei | Was |
|---|---|
| `web/hb-kompendium.css` | die gemeinsame Gestalt, 8,5 KB, 0 Wert-Literale |
| `tools/umbau_kompendien.py` | baut die neun Seiten um, wiederholbar, `--pruefen` |
| `tools/kompendium-kit.json` | die eingefrorenen Kit-Fassungen samt Basis-Commit |

Alles auf `[data-hb-seite="kompendium"]` am body — dieselbe Bauweise wie
`hb-weltseite.css` in W17. Die alten Kit-Namen (`--terra`, `--ochre`, `--rule`, `--paper`)
zeigen dort auf die Token-Ebene, damit die verbliebenen seiteneigenen Regeln mitfärben.
Das Werkzeug teilt sich `bloecke()` und `kanon()` mit `umbau_weltseiten.py`, damit beide
CSS gleich zerlegen.

| | vorher | nachher |
|---|---|---|
| Inline-CSS auf den neun Seiten | 45 KB | **10 KB** |
| zentral dafür | — | 8,5 KB |
| netto | | **26 KB weniger** |
| Fließtext | 6.019 Zeichen | 6.019 (Δ 0) |

**Nachweis**

| Prüfung | Ergebnis |
|---|---|
| PageErrors über alle 109 Seiten | **0 / 109** |
| Kompendien mit gerenderten Steckbriefen, geöffneter Karte, formatiertem Suchfeld, Lesebreite 900 px, kein Überlauf | **9 / 9** |
| Fließtextverlust | keiner |

**Prüfung, die sich selbst irrte:** Der erste Lauf meldete `wissen.html` als „keine Treffer
gerendert". Die Seite ist aber der Hub, nicht das Kompendium — sie zeigt acht `.kt`-Kacheln
statt `.pc`-Steckbriefe. Nachgemessen: 8 Kacheln, 9 Filtermarken, Suchfeld, alles formatiert,
0 PageErrors. Der Test hatte das Falsche erwartet, nicht die Seite das Falsche getan.

**Stand der Entdoppelung nach W17–W19**

| Gruppe | Inline-CSS |
|---|---|
| 42 Weltunterseiten (W17) | 238 → 192 KB |
| Fußbereich, 33 Kopien (W18) | HTML 3.108 → 3.038 KB |
| 9 Kompendien (W19) | 45 → 10 KB |

**Nächste Front (Welle 20).** 53 Seiten mit 250 KB Inline-CSS bleiben, **21 KB davon noch
≥6-fach wortgleich**. Schwerpunkt: die **19 Werkzeugseiten** (Rechner) plus Holding, Konto
und Legal. Wiederkehrend darin: `:root`, `body`, `*`, `h1`, `h1 em`, `.eyebrow`, `.lead`,
`.foot`, `.result .eyebrow`. Dazu **totes CSS**: `.wms-lockup` und `.wms-lockup svg` stehen
noch auf 17 Seiten im Stylesheet und auf **keiner** im Markup — in W17 nur für die
Weltseiten entfernt.
