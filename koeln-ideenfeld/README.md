# Kölner Ideenfeld

Marktlücken-Sondierung für den Wirtschaftsraum Köln und ein ausgearbeitetes
Betriebskonzept aus dieser Liste.

## Dateien

| Datei | Inhalt |
|---|---|
| `koelner-marktluecken.html` | 48 Geschäftsideen in zehn Feldern, gewichtet nach Nachfrage-Härte. Je Idee: Begründung, Köln-Bezug, Einstiegshürde und ein Prüftest. Filterbar, mit Kurzliste der sieben aussichtsreichsten |
| `visiograf-betriebskonzept.html` | Betriebskonzept VISIOGRAF — Drohnen-Dachbefundung als Nebenerwerb ohne Personal. 14 Kapitel mit drei Diagrammen und einer Schnittmengen-Grafik |
| `visiograf-website.html` | Landingpage als Scroll-Erzählung in drei Akten — Warum, Wie, Was. Danach Prinzipien, Befundblatt, Leistungskatalog, Zielgruppen, Ablauf und Anfrageformular |

## Dramaturgie der Website — goldener Kreis nach Simon Sinek

Die Seite folgt Warum → Wie → Was, die Akte sind sichtbar als `01 — Warum`, `02 — Wie`,
`03 — Was` beschriftet, und eine mitlaufende Kapitelleiste zeigt den Stand an.

**Das Warum ist ein Glaubenssatz, keine Problemschilderung** — das ist der Unterschied,
auf den es bei Sinek ankommt: *„Wir glauben, dass niemand über ein Gebäude entscheiden
sollte, das er nicht gesehen hat."* Wie und Was folgen daraus, nicht umgekehrt.

**Ein einziges Objekt trägt die Erzählung: das Gebäude.**

| Akt | Inhalt | Bewegung |
|---|---|---|
| I — Warum | Vom Boden sehen Sie die Traufe, den Rest schätzen Sie | Dach kippt per 3D-Rotation aus der Straßenansicht (78°) in die Draufsicht (0°); Höhenanzeige zählt 0 → 28 m, Bodendunst löst sich, Rasterpapier blendet ein |
| II — Wie | Sichtbare Fundstellen, nicht einsehbare Flächen, dann das Wärmebild von Dach **und** Fassade | Nadeln erscheinen einzeln; ein Scan fährt quer über das Dach und legt die Thermalschicht frei; Überblendung zur Fassade, Scan von oben nach unten; Wärmebrücken werden mit gemessenem ΔT beschriftet |
| III — Was | Befundblatt, Leistungen, Preise, Anfrage | Ruhige Einblendungen beim Hereinscrollen |

### Thermografie-Darstellung

Falschfarben in einer Ironbow-Rampe (`#16224E → #3B1E6E → #A32A72 → #E85A2A → #F4A93B →
#FFF0B8`); der Markenakzent liegt genau in der Mitte dieser Rampe. Harte Rechtecke werden
per `filter: blur(7px)` zu einem plausiblen Wärmefeld verschliffen und auf die
Gebäudekontur beschnitten. Die Thermalfarben sind **absolut, nicht themenabhängig** — ein
Wärmebild sieht in Hell und Dunkel gleich aus.

Dargestellte Wärmebrücken, fachlich korrekt von außen betrachtet (**warm = Wärme entweicht**):

| Fläche | Befund | ΔT |
|---|---|---|
| Dach | Gaubenanschluss | +4,8 K |
| Dach | Firstanschluss | +3,1 K |
| Dach | Sparrenfeld ungedämmt | +5,6 K |
| Fassade | Rollladenkästen | +6,2 K |
| Fassade | auskragende Balkonplatte | +7,4 K |
| Fassade | Geschossdecken-Auflager | +3,9 K |

Eine Temperaturskala erklärt die Farbkodierung, und jeder Befund ist zusätzlich beschriftet —
die Farbe trägt nie allein die Information. Das gemessene ΔT bleibt innerhalb der
Abgrenzung: eine Messung ist Dokumentation, die Bewertung macht der Energieberater.

Die Bühne ist ein Dreizeilen-Raster — Aussage oben, Objekt in der Mitte, Fußzeile unten —
damit Text und Zeichnung nicht um dieselbe Fläche kämpfen. Bei
`prefers-reduced-motion: reduce` fällt die Seite in eine statische Flex-Spalte mit korrekter
Lesereihenfolge; Dach und Fassade stehen dann untereinander, alle Befunde im Endzustand.

**Entschieden:** Die Thermografie war ursprünglich für das zweite Geschäftsjahr geplant,
trägt auf der Website aber das gesamte Kapitel „Wie". Sie ist deshalb ins erste Jahr
vorgezogen und die Fünf-Jahres-Rechnung entsprechend neu aufgestellt worden — siehe
[Thermografie ab Jahr 1](#thermografie-ab-jahr-1). Die Verfügbarkeitshinweise sind aus der
Preisliste entfernt; dort stehen jetzt die echten Saisongrenzen.

## Zum Namen

Ursprünglich NADIR, umbenannt in **VISIOGRAF**. Die Endung «-graf» heißt aufzeichnen, nicht
bewerten — sie trägt damit die Kernabgrenzung des Geschäfts. Das Bildzeichen ist eine
Passermarke, das schwarz-weiße Schachbrett-Ziel, das bei Drohnenvermessung am Boden liegt.

Verworfen wurde *KeyVisio / KV*: Das Kürzel KV ist im Versicherungs- und Gesundheitsumfeld —
also genau in der Zielgruppe — mit *Krankenversicherung* und *Kassenärztliche Vereinigung*
doppelt belegt. Unabhängig vom gewählten Namen ist «Visio» eine eingetragene Microsoft-Marke;
**vor einer Markenanmeldung ist eine Recherche bei DPMA und EUIPO erforderlich.**

Rechtsform ist **Einzelunternehmen** — eine GbR setzt mindestens zwei Gesellschafter voraus
und ist mit dem Ein-Personen-Konzept nicht vereinbar. Die Website spricht in neutraler
Wir-Form, was zulässig ist und die Rechtsform nicht falsch darstellt.

Alle drei Dateien sind als Artifact-Seiten geschrieben (ohne `<html>`/`<head>`/`<body>`-Gerüst)
und werden beim Veröffentlichen eingebettet. Zum lokalen Öffnen genügt ein minimaler Wrapper.

## Redlichkeit der Marktlücken-Liste

Es wurde **keine Wettbewerbszählung erhoben.** Die Einstufungen sind aus Standortmerkmalen
abgeleitete Einschätzungen, keine Messungen. Deshalb trägt jede Idee einen konkreten Test,
mit dem sich in etwa zwanzig Minuten prüfen lässt, ob das Feld wirklich frei ist.

Nachfrage-Härte in drei Stufen: gesetzlich erzwungen (10 Ideen), struktureller Treiber (25),
zyklisch oder Nische (13).

## VISIOGRAF — Eckdaten

Drohnen-Dokumentation von Dächern, Fassaden und Photovoltaikanlagen für Sachverständige,
Hausverwaltungen und Handwerksbetriebe. Ein Mensch, zwei Geräte, keine Mitarbeiter.

| Kennzahl | Wert |
|---|---|
| Startkapital | 11.600 € (8.000 € Eigenkapital, 3.600 € Mikrokredit) |
| Gewinnschwelle Jahr 1 | 20 Aufträge |
| Plan Jahr 1 | 28 Aufträge, 11.704 € Umsatz, 3.268 € Ergebnis |
| Zielzustand ab Jahr 4 | 72 Aufträge, 6,5 h je Woche |
| Ergebnis Jahr 5 | 26.168 € bei 335 eigenen Arbeitsstunden |
| Ertrag je eigener Stunde | 15 € (J1) → 78 € (J5) |
| Amortisation Startkapital | rund 16 Monate |

**Die tragende Abgrenzung:** VISIOGRAF erstellt Dokumentation, keine Gutachten — keine
Schadensursache, keine Schadenhöhe, keine Standsicherheit. Ein gemessenes ΔT ist eine
Tatsache; was daraus folgt, entscheidet der Sachverständige oder Energieberater. Das senkt
die Haftung, macht den Einstieg ohne Sachverständigenqualifikation möglich und verkürzt
jeden Auftrag von Stunden auf neunzig Minuten Schreibtischarbeit.

**Der Engpass** ist nicht die Nachfrage, sondern die Schnittmenge aus fliegbarem Wetter
(≈ 230 Tage), freier Zeit neben dem Hauptjob (≈ 130 Tage) und einem terminlich verfügbaren
Kunden — rund 85 nutzbare Termintage im Jahr. Daraus folgt der bewusste Mengendeckel bei
72 Aufträgen; Wachstum danach nur über Preis, Produktmix, Bündelung und Automatisierung
der Berichtserstellung.

### Thermografie ab Jahr 1

Ursprünglich war die Wärmebildtechnik für das zweite Geschäftsjahr geplant. Sie ist
vorgezogen worden — eine Drohne mit Doppelsensor ersetzt beide Anschaffungen des alten
Plans.

| | visueller Einstieg | Thermografie ab Jahr 1 |
|---|---|---|
| Startkapital | 4.100 € | 11.600 € |
| Ergebnis Jahr 1 | 5.655 € | 3.268 € |
| Ertrag je Stunde Jahr 1 | 32 € | 15 € |
| Ergebnis Jahr 5 | 22.194 € | 26.168 € |
| Kumuliert 5 Jahre | 79.772 € | **89.780 €** |
| Mengendeckel | 62 Aufträge | 72 Aufträge |

Netto sind nur rund **3.300 € mehr Kapital** gebunden, weil die Investition des zweiten
Jahres entfällt. Der Gewinn über fünf Jahre beträgt rund **10.000 €**, bezahlt mit einem
schwachen ersten Jahr.

Zwei Gründe, warum es trotzdem aufgeht:

- **Gegenläufige Saisons.** Gebäudethermografie braucht Kälte und Dunkelheit
  (Oktober–März), Photovoltaik-Modulprüfung braucht Einstrahlung ≥ 600 W/m²
  (April–September). Zusammen füllen sie das Jahr, statt sich zu drängeln.
- **Frühe Morgen statt Samstage.** Gebäudewärmebilder entstehen zwischen 6:30 und 8:00 Uhr,
  vor dem Hauptjob. Diese Termine kosten keinen Samstag — deshalb steigt der Kapazitätsdeckel
  von 62 auf 72 Aufträge.

Nicht durchgerechnet, aber prüfenswert: im ersten Jahr eine Thermaldrohne tageweise mieten
(grob 200 € je Einsatztag) und erst kaufen, wenn die Nachfrage belegt ist. Das hielte das
Startkapital bei rund 6.000 € und das erste Jahr stark, kostet aber Flexibilität in der
knappen kalten Saison.

## Design-Systeme

Die Seiten haben eigene Identitäten und teilen nur die Bau-Disziplin.

- **Kölner Marktlücken** — kühler Steingrund `#EDEEEF`, Kölnrot als *sequenzielle* Rampe
  (`#F6DFE2 → #C8102E`) für die Nachfrage-Härte; Form kodiert zusätzlich zur Farbe
  (gefüllt / getönt / umrandet). Bricolage Grotesque, Newsreader, JetBrains Mono.
- **VISIOGRAF** — Kartenpapier `#EEF0EF`, ein einziger Akzent in Luftfahrtkarten-Magenta
  (`#A32A72` hell / `#C4569A` dunkel); alle Diagramme sind einreihig, deshalb wird keine
  kategoriale Palette gebraucht. Familjen Grotesk, Public Sans, Roboto Mono.

Alle Seiten sind hell und dunkel geprüft, Diagrammfarben gegen Helligkeitsband, Chroma,
Farbfehlsichtigkeits-Abstand und Kontrast validiert.

## Hinweis

Beides sind Konzepte. Alle Zahlen sind kalkulierte Planwerte, keine Ist-Daten. Die Angaben
zum Luftrecht im Betriebskonzept sind Orientierung und ersetzen keine Prüfung des aktuellen Stands
beim Luftfahrt-Bundesamt und der Flugsicherung. Die Methodenhinweise am Fuß beider Seiten
nennen die Annahmen und ihre Grenzen. Der Name ist vor einer Anmeldung markenrechtlich zu prüfen.
