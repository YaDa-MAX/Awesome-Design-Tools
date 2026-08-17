# HeiBen Manufaktur — der Shop (3D-Druck)

Eigener Verkaufs-Strang als **Shop in der Navigation** (kein sechstes Haus). Im Shop selbst
heißt es „HeiBen Manufaktur". Datei: `web/manufaktur.html`.

## Aufbau
- **Kassenschlager: Persönliches Design** — Konfigurator mit fünf Anwendungen:
  Höhenrelief Heimatort (Ort/Ausschnitt/Gravur), Gebäude/Architektur-Prototyp (Maßstab),
  Personalisierte Figur (Stil/Foto), Geschenk/Koordinaten-Objekt (Variante/Ort/Datum),
  Eigenes Modell (STL/3MF-Upload/Füllung). Dazu Größe, Material (PLA, PETG, Holz-PLA,
  Bronze-PLA, Detail-Resin), Veredelung, Tempo (Standard/Express) und Menge. **Live-Preis**
  rechnet sofort (Basis nach Größe + Material-/Veredelungs-/Tempo-Zuschlag × Menge).
- **Katalog (Listenartikel)** — 14 fertige Produkte in 6 Kategorien (Wohnen, Geschenke,
  Kulinarik, Architektur, Figuren, Ersatzteile), je mit Haus-Zuordnung (Farb-Badge),
  Material, Lieferzeit, Preis und „In den Korb". Kategorie-Filter-Chips.
- **Warenkorb** (Schublade) mit Mengen-Steuerung, Summe und **Demo-Kasse**: Name/E-Mail/
  Adresse → Bestellung mit Nummer (M-XXXXXX). Felder werden bei Anmeldung vorbefüllt.

## Anbindung
- **Konto:** `HeiBenKonto.shopOrder/shopOrders/shopOrderList/shopOrderSetStatus`. Bestellungen
  liegen lokal (`heiben-shop-orders`), werden dem Konto zugeordnet (oder als Gast geführt).
  Profil zeigt „Meine Bestellungen aus der Manufaktur". Admin kann Status setzen.
- **Warenkorb-Speicher:** `heiben-shop-warenkorb` (lokal).
- **Navigation:** „Shop"-Link in der Hauptnavigation aller Seiten (das Mobil-Menü übernimmt
  ihn automatisch) und im Footer.
- Erbt automatisch Header-Suche, Burger-Menü, Logo, Motion und Konto-Widget.

## Häuser-Verknüpfung
Produkte tragen ein Haus-Badge und speisen sich aus den Häusern: Wohnen (Accessoires,
Ersatzteile), Immobilien (Modelle, Übergabe-Miniaturen, Koordinaten-Schild), Kulinarik
(lebensmittelechte Formen, an die 51 Länderküchen anschließbar), Studio (Design/Figuren),
Reisen (Souvenir-Anhänger). Gestalterische Heimat im Studio, Verkauf zentral im Shop.

## Ehrlicher Demo-Hinweis
Prototyp ohne echte Zahlung: Dateien (Plan/Foto/STL) und Bezahlung werden nach Eingang per
E-Mail abgewickelt. Für den Live-Betrieb: Zahlungsanbieter, Datei-Upload-Speicher und
verbindliche Preis-/Volumenkalkulation (z. B. aus STL-Volumen) ergänzen.

E2E-getestet: Konfigurator-Preislogik (39 € → 127 €), Warenkorb, Katalogfilter, Demo-Kasse
mit Bestellnummer, Profil-Anzeige, Shop in Navigation. 0 Konsolenfehler.

## Ausbau: Alltags-Gadgets & Shop-Funktionen
**Katalog auf 37 Artikel erweitert** — massentauglich und schnell druckbar, in 11 Kategorien:
Sets, Schreibtisch (Handy-/Tablet-Ständer, Kopfhörer-Halter, Stifteköcher, Kabelclips,
Kabel-Tray, Buchstützen), Alltag (Türstopper, Schlüsselbrett, Haken, Schubladen-Organizer,
Brillenhalter, Fernbedienungs-Ablage), Küche (Kochbuch-Halter, Flaschenverschluss,
Magnet-Gewürzhalter, Eierbecher, Ausstecher, Schokoform), Garten (Pflanztopf, Kräuterschilder,
Schlauchhalter), Kinder (Nachtlicht, Würfelturm, Türschild), Wohnen, Geschenke, Architektur,
Ersatzteile. Zwei **Bündel-Sets** („Schreibtisch", „Erste Wohnung") für höheren Warenkorbwert.

**Neue Shop-Funktionen:**
- **Katalogsuche** (Live, durchsucht Name/Beschreibung/Material/Kategorie).
- **Sortierung**: Beliebt · Preis aufsteigend/absteigend · Schnellste Fertigung.
- **Farbauswahl pro Artikel** (7 Filament-Farben als Swatches) — die gewählte Farbe wandert
  in den Warenkorb-Eintrag.
- **Badges**: „Bestseller" und „schnell gedruckt" (Druckzeit ≤ 3 h) für Impuls-Orientierung.
- **Merkliste (♥)** je Artikel mit Filter „♥ Merkliste (n)" (lokal: `heiben-shop-merkliste`).
- **Trefferzähler** und Leerzustand bei Suche.
E2E-getestet: 38 Karten, 11 Bestseller-/20 Schnell-Badges, Suche „kabel" → 5 Treffer,
Preissortierung, Kategorie-Filter, Farbe im Warenkorb-Detail, Merkliste-Filter. 0 Fehler.

## Backoffice-Kalkulation (intern)
Seite `web/manufaktur-kalkulation.html` (noindex, nur für Team via `HeiBenKonto.hasRole(['admin','redaktion'])`),
verlinkt aus dem Admin-Hub `konto-verwaltung.html`. Spiegelt das Excel-Modell als Live-Tool:
- **Editierbare Annahmen** (Maschine, Arbeit, Material-€/kg-Tabelle, Zuschläge & Ziel) — lokal
  gespeichert (`heiben-kalk-annahmen`), „Auf Standard zurücksetzen" inklusive.
- **Neuprodukt-Rechner:** Material/Gewicht/Druckzeit/Komplexität/Charge → Kostenaufbau,
  empfohlener VK (auf 0,50 gerundet), DB-Marge und **Margenstabilität** mit vier Stress-Szenarien
  (Filament +20 %, Druckzeit +50 %, Ausschuss ×2, Charge halbiert).
- **Katalog live:** alle 38 Produkte werden bei jeder Annahmen-Änderung neu gerechnet
  (Selbstkosten, empf. VK, Shop-Marge, Stabilitäts-Pill); Ø-Marge und „unter Kosten"-Zähler.
Formel identisch zur xlsx; E2E-geprüft (Standard-Neuprodukt 19,50 € / DB-Marge 51,6 %,
Annahmen-Änderung wirkt sofort, Persistenz nach Reload, Reset, Gate für Nicht-Team). 0 Fehler.

## Selbst gestalten — Kunden-Eigendesign in 3D (neue Technik)
Seiten: `web/manufaktur-gestalten.html` + Engine `web/manufaktur-gestalten.js`.
Verlinkt aus dem Shop-Konfigurator und im Footer („Selbst gestalten").

**Technik (bewusst neu gedacht):** statt Auswahl-Formular ein **clientseitiger parametrischer
3D-Generator**. Eine eigene Geometrie-Engine baut das Mesh (Triangle-Soup) für drei Vorlagen:
- **Schild/Relief** – Grundplatte + Höhen-Relief aus dem Kundentext (und optional Bild/Logo),
  über Canvas-Luminanz gesampelt (font-frei, beliebige Schrift/Bilder, zugleich Basis fürs
  „Höhenrelief Heimatort").
- **Box/Behälter** – parametrischer Hohlkörper (Maße, Wand-/Bodenstärke).
- **Vase/Becher** – Polygon-Lathe mit Verdrehung, Wandstärke.

**Vorschau:** three.js (CDN) mit manueller Orbit-Steuerung; ohne WebGL/Netz greift ein
Fallback — Preis und Export funktionieren unabhängig davon.

**Live-Preis = Serie-Modell + Eigendesign-Aufschläge.** Die Engine rechnet deterministisch
Volumen → Gewicht → Druckzeit und nutzt dieselben Admin-Annahmen (`heiben-kalk-annahmen`)
plus die Hebel `heiben-kalk-eigendesign`: Prüf-/Kontrollzeit (Copyright & Machbarkeit),
Fehldruck-Aufschlag (Prozentpunkte), Handarbeits-Zuschlag (%), Zielmarge ≥ Serie,
Mindestpreis, Druck-Durchsatz. Dadurch ist sichergestellt, dass ein Eigendesign sich
**mindestens so gut rechnet wie Serie** (DB-Marge wird angezeigt und gegen das Serienziel geprüft).
Diese Hebel sind im Backoffice (`manufaktur-kalkulation.html`, Karte „Eigendesign-Aufschläge")
editierbar und werden lokal gespeichert.

**Maschinenanweisung-Export:** „Als STL" (vollständiges Mesh – universeller Produktions-Handoff)
und „Als Maschinenanweisung (G-code)" – ein eigener Mini-Slicer extrudiert den Footprint mit
Perimetern + Rectilinear-Infill, materialabhängigen Temperaturen, auf Druckbettmitte; klar als
**unvalidierter Entwurf** gekennzeichnet (finale Freigabe von Hand).

**Bestellung:** „In den Warenkorb" legt das Unikat mit Live-Preis und dem Hinweis
„Eigendesign – manuelle Prüfung (Copyright/Machbarkeit)" in `heiben-shop-warenkorb`.

E2E-geprüft: Engine baut alle 3 Typen, Parameter wirken live (Breite 100→160 mm: 93→96 €),
DB-Marge 60 % ≥ Serie (40 %), STL- und G-code-Export erzeugen Dateien, Warenkorb-Flag gesetzt,
Admin-Hebel wirken aufs Live-Beispiel und sind persistent. 0 Konsolenfehler.

## Maschinencode-Datenbank (effiziente Lösung)
Statt große G-code-Dateien je Artikel zu speichern, ist je Standardartikel ein
**Fertigungsrezept** hinterlegt: Geometrie-Typ + Parameter + Slicing-Profil.
- Datei: `web/manufaktur-rezepte.js` (window.HeiBenRezepte) — 38 Artikel.
  - **parametrisch** (14): relief/box/vase → STL und G-code werden on demand aus dem Rezept
    erzeugt (`HeiBenGestalten.gcodeRecipe/stlRecipe`). Der „Vase-Modus" (Infill 0, 2 Perimeter)
    druckt Wände statt Vollkörper.
  - **extern/CAD-STL** (24): komplexe Teile (Figuren, Modell, Ständer …) verweisen auf eine
    hinterlegte CAD/STL-Datei; der Maschinencode entsteht im kontrollierten Slicer mit dem
    gespeicherten Profil.
- Backoffice `web/manufaktur-maschinencode.html` (intern, noindex, Team-Gate), verlinkt im
  Admin-Hub: Tabelle aller Artikel mit Typ/Status, **editierbarem Profil** (Material,
  Schichthöhe, Infill, Perimeter — gespeichert in `heiben-mc-profile`), Buttons
  **G-code erzeugen ↓ / STL ↓** (parametrisch) bzw. CAD-Verweis (extern). „Alle parametrischen
  erzeugen" misst die Gesamtgröße — Beleg für die Effizienz: ~11 MB G-code on demand vs.
  ~6 KB Rezept-Ablage.

**Personalisierbare Standardartikel** (Koordinaten-Schild, Türschild, Anhänger,
Kräuterschild, Stadtrelief, Länderküchen-Ausstecher, Figur, Miniatur, Ersatzteil): das Rezept
trägt ein `perso`-Schema. Im Shop öffnet „In den Korb" ein Eingabe-Modal; die Eingaben
(Text/Ort/Name) wandern als „Personalisiert: …" in den Warenkorb-Eintrag. Der Maschinencode
wird daraus aus Rezept + Eingabe erzeugt (parametrisch direkt als G-code, extern als Vorgabe
für die CAD/STL). Die Shop-Warenkorb-Logik ist dafür als `window.HeiBenShopCart` offengelegt.

E2E-geprüft: 38 DB-Zeilen, 14 G-code/STL-Generierungen (Vase, Box, Koord-perso …), Profil-
Persistenz, Größen-Summary, Shop-Perso-Modal schreibt Eingaben in den Warenkorb, Nicht-Perso
unverändert. 0 Konsolenfehler.

## Auftragsverwaltung (Bestellung → Maschinencode)
Seite `web/manufaktur-bestellungen.html` (intern, noindex, Team-Gate), verlinkt im Admin-Hub.
Schließt den Kreis: liest alle Bestellungen (`HeiBenKonto.shopOrderList`), zeigt je Auftrag
Kunde, Datum, Summe und einen **Status** (eingegangen · in Prüfung · in Produktion · versandt ·
storniert; gespeichert via `shopOrderSetStatus`). Je Position wird die Maschinencode-Quelle
automatisch erkannt und der Code direkt erzeugt:
- **Standard** → aus Rezept: G-code ↓ / STL ↓ (`HeiBenGestalten.gcodeRecipe/stlRecipe`).
- **Personalisiert** → Rezept + gespeicherte Eingaben (`item.perso`) fließen in den Code ein.
- **Eigendesign** → aus den am Auftrag gespeicherten Parametern (`item.design`) reproduzierbar
  (`gcodeDesign/stlDesign`) — auch ohne erneutes Gestalten.
- **Extern/CAD** → Verweis auf hinterlegte CAD/STL + Profil (im kontrollierten Slicer fertigen).
Dazu „Alle erzeugbaren G-codes dieses Auftrags ↓" als Produktionspaket.

Damit das reproduzierbar ist, tragen die Warenkorb-Einträge jetzt strukturierte Daten:
personalisierte Artikel ein `perso`-Objekt + `artikel`-Id, Eigendesigns ein `design`-Objekt
(Typ + Parameter + Material/Infill, JSON-fähig ohne Bild).

E2E-geprüft: Auftrag mit 4 Positionen (Standard/Perso/Eigendesign/extern) korrekt klassifiziert,
G-code/STL je Quelle erzeugt, Paket-Button (3 erzeugbare), Statuswechsel persistent. 0 Fehler.

## Geometrisch exakte G-codes (echter Mesh-Slicer)
Der G-code entsteht jetzt nicht mehr aus dem rechteckigen Hüllkörper, sondern aus echtem
**Mesh-Slicing** (in `manufaktur-gestalten.js`, `meshGcode`): Dreieck-Ebene-Schnitt je Schicht
→ Konturen stitchen → Perimeter (konturtreuer Inward-Offset, Innen/Außen via Even-Odd) →
konturgeclipptes Rectilinear-Infill mit Boden-/Deckel-Solidschichten. Douglas-Peucker glättet
verrauschte Konturen.
Damit sind die Codes geometrisch korrekt:
- **Box/Behälter** wird hohl (Außen- und Innenkontur), mit massivem Boden.
- **Vase/Topf/Becher** folgt Radius-Verjüngung und Twist (statt rechteckigem Rohr), Wände hohl.
- **Relief/Schild** ist unten die volle Platte, oben erscheinen die Text-/Bildkonturen.
`gcodeRecipe`/`gcodeDesign` nutzen den Slicer; STL bleibt der exakte High-Res-Handoff,
der G-code ist der (geometrisch faithful) Entwurf vor manueller Freigabe.
Dateigrößen: flache/eckige Artikel klein (Box ~200 KB, Schild ~0,5 MB); hohe Rundkörper
inhärent größer (Vase 150 mm ~6–7 MB — entspricht realer Schichtzahl), Generierung <1 s.
Reliefs werden für den G-code etwas gröber gesliced (STL bleibt hochaufgelöst).
E2E-geprüft: Box 2 Konturen (hohl), Vase rund & verjüngt (Ø 80→89 mm), Relief oben 13
Textkonturen vs. unten 1 Platte; Gestalter/Auftragsverwaltung/Maschinencode-DB fehlerfrei.

## Offline-Fähigkeit (Service-Worker)
Die Manufaktur ist jetzt offline-fähig: `web/service-worker.js` precacht zusätzlich
`manufaktur.html`, `manufaktur-gestalten.html`, `manufaktur-gestalten.js`,
`manufaktur-rezepte.js` sowie die internen Seiten `manufaktur-kalkulation.html`,
`manufaktur-maschinencode.html`, `manufaktur-bestellungen.html` (Precache jetzt 64 Dateien,
Cache-Version `heiben-v20260616-1640` hochgezogen → Clients aktualisieren automatisch).
Offline laufen Shop, Gestalter (Preis-Engine, STL/G-code-Export, Warenkorb), Kalkulation,
Maschinencode-DB und Auftragsverwaltung vollständig clientseitig. Die 3D-Vorschau nutzt eine **lokal gebündelte** three.js (r128, MIT) — `web/three.min.js`, ebenfalls
im Precache. Damit rendert die Vorschau auch offline; es bleibt keine externe Abhängigkeit. Der
WebGL-Fallback greift nur noch ohne GPU-Unterstützung.
E2E-geprüft (Playwright, Offline-Modus): Precache vollständig, SW kontrolliert die Seite,
Gestalter rechnet offline (93 €), Shop zeigt 38 Karten, Fallback aktiv, 0 Fehler.
