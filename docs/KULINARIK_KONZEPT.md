# HeiBen Kulinarik — Konzeptdokument

**Eine skalierbare Rezeptplattform mit Kochbuch-Export, eingebettet in das HeiBen-Markenhaus.**
Fassung 1.0 · Entscheidungsreif, nicht nur richtungsweisend.

---

## 0. Ausgangslage und Positionierung

HeiBen Kulinarik ist das fünfte Haus der Familie. Anders als ein beliebiger Rezeptblog hat es eine inhaltliche Klammer, die zugleich Marke und Filter ist: **Küche ohne Schweinefleisch**, getragen von zwei Herkünften — der maghrebinischen (algerischen) Küche Yakins und der norddeutschen Küche Katharinas. Diese Klammer ist strategisch wertvoll, weil sie das Angebot von der breiten Masse der Rezeptseiten abgrenzt und eine klar umrissene, unterversorgte Zielgruppe anspricht (schweinefrei essende Haushalte, ohne dass „vegetarisch" der einzige Weg dorthin ist).

Das vorliegende Dokument beschreibt die Architektur vom heutigen MVP (statische, selbst pflegbare Seiten) bis zur ausgebauten Plattform (Datenbank, Konten, Bezahlung, automatischer Kochbuch-Export). Der heute ausgelieferte Stand ist bewusst die kleinste tragfähige Stufe; jede spätere Stufe ist hier so vorgezeichnet, dass sie ohne Bruch erreichbar ist.

---

## 1. Systemarchitektur

**Heutiger Stand (MVP, ausgeliefert).** Vier statische Seiten teilen einen gemeinsamen Daten- und Logikkern (`kulinarik-core.js`): eine Haus-Landingpage, eine Rezeptübersicht mit Suche und kombinierbaren Filtern, eine Rezept-Detailvorlage und ein internes Redaktionswerkzeug mit Live-Vorschau. Die Daten liegen im Browser des Redakteurs; Sicherung und Veröffentlichung laufen über eine exportierbare Datendatei. Diese Architektur braucht keinen Server, ist sofort lauffähig und folgt exakt dem Muster der Geschwister-Häuser (Magazin, Schaufenster) — ein Kern, eine Vorlage, ein Werkzeug.

**Zielarchitektur (V1/V2).** Drei entkoppelte Schichten:

1. **Inhalts-/Datenschicht** — eine relationale Datenbank (PostgreSQL) als alleinige Wahrheitsquelle, vorgelagert ein Headless-CMS für die Redaktion.
2. **Auslieferungsschicht** — ein Web-Frontend, das öffentliche Seiten serverseitig rendert (Geschwindigkeit, Suchmaschinen) und Bilder über ein CDN bezieht.
3. **Export-/Dienstschicht** — ein eigener Dienst, der aus denselben Daten druckfähige Kochbuchseiten erzeugt (PDF/PNG/JPEG), ausgelagert in Hintergrundjobs.

Der entscheidende Architekturgrundsatz lautet: **eine Datenquelle, viele Ausgaben.** Web-Ansicht, Redaktions-Vorschau und Kochbuchseite entstehen aus demselben Rezeptobjekt. Genau dieses Prinzip ist im MVP bereits verwirklicht (die Render-Logik im Kern speist Übersicht, Detail und Vorschau) und wird in der Zielarchitektur nur auf eine Datenbank und einen Export-Renderer gehoben.

---

## 2. Datenmodell

**Heutiges Rezeptobjekt** (im MVP als Feldsatz, in V1 als Tabellen). Pflichtfelder: Name, Titelbild, Zutatenliste, Zubereitung, Hinweise, Herkunftsland, Kategorien (Gang), Tags. Zusatzfelder: Kurzinfo, Geschichte/Herkunft, persönliche Note, Serviervorschlag, Schwierigkeitsgrad, Vorbereitungszeit, Kochzeit, Portionen. Markenspezifisch und zentral: das Feld **Alternative** — die Erklärung, womit ein sonst schweinehaltiger Klassiker ersetzt wird und warum das geschmacklich trägt. Dieses Feld ist der inhaltliche Kern des Hauses und steuert sichtbar den Schweinefrei-Kasten der Rezeptansicht.

**Relationales Schema (V1), skalierbar von 100 auf 10.000+ Rezepte:**

- `recipes` (Stammdaten, Status, Zeitstempel, Schwierigkeit, Zeiten, Portionen)
- `recipe_translations` (Sprache, Name, Kurzinfo, Geschichte … — Mehrsprachigkeit als eigene Tabelle, nicht als Spalten)
- `ingredients` und `recipe_ingredients` (Menge, Einheit, Zutat — strukturiert, damit Portionsskalierung und Einkaufslisten möglich werden)
- `steps` (geordnete Zubereitungsschritte, optional mit Zeit/Bild)
- `categories`, `tags`, `countries`, `continents` plus n:m-Verknüpfungstabellen
- `media` (Bildverwaltung: Original plus abgeleitete Größen, Alt-Text, Bildrechte)
- `recipe_versions` (Versionierung: jede Veröffentlichung als unveränderliche Fassung, damit ein gedrucktes Kochbuch reproduzierbar bleibt)

**SEO** ist im Schema verankert: stabiler, sprechender Bezeichner pro Rezept (im MVP bereits umgesetzt — die Kennung bleibt beim Umbenennen stabil, geteilte Links bleiben gültig), Felder für Meta-Beschreibung und strukturierte Daten (Recipe-Schema mit Zutaten, Zeiten, Bild), saubere Sprach-Auszeichnung.

**Skalierungsnachweis im Schema:** Filtern nach Land/Gang/Art/Zeit ist über indizierte Spalten und Verknüpfungstabellen auch bei 10.000+ Rezepten schnell; die strukturierten Zutaten erlauben Portionsskalierung und Einkaufslisten ohne Textparsing; Versionierung trennt „aktuell sichtbar" von „so gedruckt".

---

## 3. UX-Konzept

**Startseite/Übersicht.** Ein prominentes Suchfeld, darunter drei kombinierbare Filterreihen (Land, Gang, Art) und eine Trefferzahl. Die Filter sind additiv: „Algerien + Hauptgericht" oder „Deutschland + Lamm" grenzen gemeinsam ein. Die Adresszeile trägt den Filterzustand (`?land=…&gang=…`), sodass ein gefilterter Blick verlinkbar ist — dieselbe Mechanik, mit der die Rezeptansicht auf „Weitere Rezepte aus <Land>" verweist. Im MVP ist all das bereits umgesetzt.

**Rezeptansicht.** Reihenfolge bewusst: Plaketten (schweinefrei, Land, Gang), Titel, kursiver Anriss, großes Bild, Kerndaten-Box, dann — falls vorhanden — der Schweinefrei-Alternativkasten, danach Zutaten und Zubereitung zweispaltig, anschließend Hinweise, Serviervorschlag, Geschichte und persönliche Note, Tags und ein Verweis auf weitere Rezepte. Der Alternativkasten erscheint nur, wenn das Feld gefüllt ist, und hebt damit genau die Rezepte hervor, die den Markenkern tragen.

**Redaktion.** Formularartig mit Live-Vorschau: links eingeben, rechts sofort das spätere Ergebnis sehen. Mehrfachauswahl für „Art", Auswahllisten für Gang und Schwierigkeit, zeilenbasierte Eingabe für Zutaten und Schritte. Entwurf/Veröffentlicht, Duplizieren, Löschen, Sichern/Laden.

**Responsives Verhalten.** Desktop: dreispaltiges Kartenraster, zweispaltige Rezeptansicht. Tablet: zwei Spalten, Filter umbrechend. Mobil: eine Spalte, Zutaten und Zubereitung untereinander, Filter als scrollbare Knopfreihen. Diese Bruchpunkte sind im ausgelieferten Stylesheet bereits angelegt.

---

## 4. Designsystem

Kulinarik erbt das HeiBen-Designsystem und ergänzt es um eine eigene Akzentfarbe. **Farben:** Pergament-Flächen (#f3eee5 / #ebe3d4), Tinte (#1f1c17) als Grundton, **Aubergine (#6b3951)** als Hausakzent — kulinarisch konnotiert und klar unterscheidbar von den vier bestehenden Hausfarben. Der Akzent wird über eine einzige Theme-Klasse gesetzt, sodass Karten, aktive Filter, Schrittnummern und der Alternativkasten automatisch in der Hausfarbe erscheinen. **Typografie:** Fraunces (Serifen-Display) für Titel, Manrope (serifenlos) für Fließtext, JetBrains Mono für Etiketten — identisch zum Rest des Hauses, mit stillem Rückfall auf Systemschriften ohne Internetverbindung. **Bausteine:** Karten mit Bildfläche und Herkunfts-Chip, Filterknöpfe mit Aktiv-Zustand, nummerierte Zubereitungsschritte als Kreise, Tag-Chips, der Alternativkasten mit Akzentbalken. Für den Druck ist eine eigene Stilebene hinterlegt, die Navigation und Fußzeile ausblendet und das Rezept als ruhige Kochbuchseite zeigt.

---

## 5. Exportarchitektur (Kochbuch)

**Ziel:** Aus jedem Rezept automatisch eine druckfähige Buchseite — schlicht, hochwertig, zeitlos. Elemente: großes Foto, Titel, Kurzinfo, Zutaten, Zubereitung, ein Hinweis.

**Heute.** Die Rezeptansicht trägt bereits eine Druck-Stilebene; eine einzelne Seite lässt sich über die Druckfunktion des Browsers als PDF sichern. Das ist die Stufe-0-Lösung ohne zusätzlichen Dienst.

**Ausbau (V1/V2).** Ein serverseitiger Render-Dienst öffnet die Rezeptseite in einem Headless-Browser und erzeugt daraus die Exportdateien. Einzel-Export pro Knopfdruck als **PDF, PNG oder JPEG**; Sammel-Export als ein zusammengeführtes **Kochbuch-PDF** oder als **ZIP** mit Einzeldateien. Lange Läufe (ganzes Kochbuch) laufen als Hintergrundjob mit Fortschrittsanzeige.

**Fotobuch-Kompatibilität.** Empfohlenes Standardformat: **A4 Hochformat, 210 × 297 mm, 300 dpi, randlos** mit umlaufender Beschnittzugabe (i. d. R. + 3 mm je Seite) und Sicherheitsabstand für Text zum Rand. Dieses Format passt zu den gängigen Anbietern (CEWE, Pixum, Saal Digital) und ist der beste Kompromiss aus Verbreitung, Kosten und Anmutung.

*Alternativen, abgewogen:* Quadratisch (z. B. 210 × 210 mm) wirkt modern und ist bei Foodfotografie beliebt, ist aber teurer und bei manchen Anbietern nur in Premiumlinien verfügbar. Großformat (A4 quer oder größer) gibt dem Foto Bühne, erhöht aber Druckkosten und Gewicht und erschwert das Lesen am Küchentisch. Kleinformat (A5) ist günstig und handlich, drückt aber Bild und Schrift; für ein hochwertiges Kochbuch nicht empfohlen. **Entscheidung:** A4 Hochformat als Standard, quadratisch als optionale Premium-Variante.

---

## 6. Monetarisierungsstrategie

Bewertet nach Aufwand (A), Skalierbarkeit (S) und Umsatzpotenzial (U), je niedrig/mittel/hoch.

1. **Premium-Mitgliedschaft** (Abo für erweiterte Funktionen) — A mittel, S hoch, U hoch. *Tragende Säule.*
2. **Werbefreie Version** (Teil des Premium-Modells statt eigener Werbevermarktung) — A niedrig, S hoch, U mittel.
3. **Exklusive Rezepte** (Familienrezepte nur für Mitglieder) — A niedrig, S hoch, U mittel. Passt exakt zum Markenkern.
4. **Länderpakete** (kuratierte Sammlungen, z. B. „Algerien", „Norddeutschland") — A mittel, S hoch, U mittel.
5. **Saisonale Kochbücher** (Print-on-Demand über den Export) — A mittel, S mittel, U hoch. *Differenzierend.*
6. **KI-Menüplanung** (Wochenmenü aus Filtern/Vorräten) — A hoch, S hoch, U mittel.
7. **Einkaufslisten** (aus strukturierten Zutaten, mengenskaliert) — A mittel, S hoch, U mittel. Setzt das strukturierte Zutatenmodell voraus.
8. **Wochenpläne** (kuratierte Pläne, auch schweinefrei-/halal-fokussiert) — A mittel, S hoch, U mittel.
9. **Rezeptsammlungen als Geschenk** (personalisiertes Kochbuch als physisches Produkt) — A mittel, S mittel, U hoch. Höchste Marge je Einheit.
10. **White-Label-Lösung** (die Plattform als Produkt für Hotels/Gastronomie — naheliegend, da die Familie aus dem Hotelfach kommt) — A hoch, S mittel, U hoch. *Langfristige Option mit Synergie zu HeiBen Reisen/Wohnen.*

**Empfohlene Reihenfolge:** zuerst Premium + werbefrei + exklusive Rezepte (geringer Aufwand, sofort markenstimmig), dann Print-Kochbücher und Geschenksammlungen (nutzen den Export, hohe Marge), später KI-Menüplanung und White-Label.

---

## 7. Skalierungsstrategie

- **Inhalt:** Das Schema trägt von 100 auf 10.000+ Rezepte ohne Umbau; Filter laufen über indizierte Felder und Verknüpfungstabellen.
- **Auslieferung:** Statisch/serverseitig gerenderte Seiten plus CDN für Bilder; Lesezugriffe lassen sich nahezu beliebig zwischenspeichern.
- **Bilder:** Originale getrennt von abgeleiteten Größen speichern; pro Ansicht die passende Größe ausliefern (Karten klein, Hero groß, Druck 300 dpi).
- **Export:** Rechenintensive Läufe in Hintergrundjobs, horizontal skalierbar; ein fertiges Kochbuch wird einmal erzeugt und zwischengespeichert.
- **Mehrsprachigkeit:** Übersetzungen als Tabelle, nicht als Spalten — neue Sprachen ohne Schemaänderung.
- **Redaktion:** Das heutige Werkzeug skaliert für eine kleine Redaktion; bei wachsendem Team Wechsel auf das Headless-CMS mit Rollen und Freigaben.

---

## 8. Tech-Stack-Empfehlung (begründet)

- **Frontend: Next.js.** Serverseitiges Rendern für Tempo und Suchmaschinen, großes Ökosystem, eignet sich sowohl für öffentliche Seiten als auch für den Redaktionsbereich. Nuxt wäre bei einem Vue-Team gleichwertig; reines React ohne Rendering-Schicht verschenkt SEO-Vorteile.
- **Backend/Datenbank: PostgreSQL, betrieben über Supabase.** Echte relationale Integrität (wichtig für das Rezept-/Zutaten-/Versionsmodell), dazu fertige Authentifizierung, Rechte auf Zeilenebene und Datei-Ablage. Firebase (dokumentenorientiert) passt schlechter zum relationalen Bedarf.
- **Speicher/Bilder: Cloudflare R2.** Kostengünstig (keine Gebühren für ausgehenden Verkehr), S3-kompatibel, nah am CDN. AWS S3 ist gleichwertig in der Reife, bei viel Bildauslieferung aber teurer.
- **Export: Playwright.** Headless-Browser zum Rendern der echten Rezeptseite in PDF/PNG/JPEG — dieselbe Darstellung wie im Web, kein zweites Layout. Puppeteer ist vergleichbar; reine PDF-Bibliotheken zwängen zu einem getrennten Layout und brechen das Prinzip „eine Quelle, viele Ausgaben".
- **CMS: Sanity oder Directus.** Sanity bei stark strukturierten Inhalten und Vorschau-Bedarf; Directus, wenn das CMS direkt auf der eigenen PostgreSQL sitzen soll. Strapi ist eine valide Alternative, Directus liegt durch die direkte Postgres-Nähe vorn.

---

## 9. Roadmap

**MVP (ausgeliefert).** Vier statische Seiten, gemeinsamer Kern, Suche und kombinierbare Filter, Rezeptansicht mit Schweinefrei-Alternativkasten, internes Redaktionswerkzeug mit Live-Vorschau, Sichern/Laden, sechs schweinefreie Beispielrezepte aus beiden Familienküchen, Druckansicht je Rezept, vollständige Einbindung als fünftes Haus (Navigation, Fußzeile, Startseite, Familienseite).

**Version 1.** PostgreSQL/Supabase als Datenquelle, Headless-CMS für die Redaktion, serverseitiges Rendern, CDN-Bilder mit abgeleiteten Größen, strukturierte Zutaten (Portionsskalierung, Einkaufslisten), Export-Dienst für Einzel-PDF/PNG/JPEG, SEO mit strukturierten Daten.

**Version 2.** Nutzerkonten und Premium-Abo, exklusive Rezepte, Sammel-Export als Kochbuch-PDF und ZIP, Print-on-Demand-Anbindung im A4-Standard, Mehrsprachigkeit, KI-Menüplanung und Wochenpläne, perspektivisch White-Label für Gastgewerbe.

---

### Anschluss an die übrigen Häuser

Kulinarik steht nicht für sich: Die Reisen nach Nordafrika (HeiBen Reisen) und die Rezepte aus demselben Kulturraum verstärken sich; ein White-Label-Kochbuch wäre ein Produkt, das Reisen, Wohnen und Kulinarik verbindet. Der schweinefreie Fokus ist dabei kein Marketing-Etikett, sondern in der Familienbiografie verankert — und genau das macht ihn glaubwürdig.
