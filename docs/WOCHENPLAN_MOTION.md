# Wochenplaner, Datenprüfung & Motion-Layer

## Neu: Wochenplan & automatische Einkaufsliste (`kulinarik-wochenplan.html`)
- 7 Tageskarten (Mo–So); je Tag Gerichte über einen Such-Picker hinzufügen (Suche über Name/Land/Zutat + Gang-Filter, nutzt die Rezept-DB).
- Einkaufsliste entsteht automatisch: alle Zutaten der geplanten Gerichte werden zusammengerechnet
  (gleiche Zutat + Einheit wird summiert; g→kg / ml→l ab 1000), skaliert auf den Portions-Stepper.
- Abhakbar, „Einkaufsliste kopieren", „Plan leeren"; alles in `localStorage` (`heiben-kulinarik-wochenplan`).
- Einstiege: Button „+ Zum Wochenplan" (mit Tagwahl) auf jeder Rezept-Detailseite, Link in der
  Rezepte-Übersicht (Filterleiste) und auf der Kulinarik-Landing unter dem Karten-Teaser. In Sitemap aufgenommen.

## Datenprüfung (Redundanz-Audit der 159 Rezepte)
Ergebnis: **sauber** — keine doppelten IDs, keine Slug-Kollisionen, keine Namens-Duplikate,
keine fehlenden Pflichtfelder, kein zutaten/zutatenS-Mismatch, keine Text-Duplikate
(kurzinfo/geschichte/persoenlich), Karte ↔ DB deckungsgleich (51 Länder beidseitig).

## Motion-Layer (alle 27 Seiten)
Dezente Scroll-Reveals im Stil großer Produkt-Websites: Sektionen und Karten gleiten beim
Scrollen sanft ein (cubic-bezier(.16,1,.3,1), ~0.9 s, gestaffelt bis 12 Karten je Raster),
Smooth-Scrolling für Ankerlinks, Markenfarbe für Textauswahl.
Robustheit: `prefers-reduced-motion` wird respektiert (alles sofort sichtbar); ein Sicherheitsnetz
macht nach 3 s garantiert alle Inhalte sichtbar — ohne JavaScript wird gar nicht erst ausgeblendet.

## Neu: Rezept-Würfel / Kühlschrank-Bingo (`kulinarik-rezeptwuerfel.html`)
- **Multiple-Choice statt Freitext:** 55 Zutaten-Chips in 7 Kategorien (Gemüse, Fleisch, Fisch,
  Milchprodukte & Eier, Sättigung, Obst, Vorrat) — abgeleitet aus den tatsächlich in der DB
  vorkommenden Zutaten (wortbasiertes Keyword-Matching über `zutatenS`, >99% Abdeckung).
- **Vorratsschrank:** Öl, Butter, Mehl, Zucker, Essig/Senf, Brühe, Zwiebeln, Knoblauch, Zitrone,
  Tomatenmark gelten als vorhanden und sind einzeln abwählbar; Gewürze & Kräuter blockieren nie.
- **Würfel-Logik:** Aus allen vollständig umsetzbaren Rezepten wählt ein Hash aus Datum+Stunde+
  Auswahl deterministisch ein Gericht („Ihr Gericht") — gleiche Stunde, gleicher Vorschlag;
  „Neu würfeln" liefert echten Zufall. Gang-Filter (Standard: Hauptgerichte).
- **Ausblick:** „Außerdem sofort machbar" (alle weiteren vollen Treffer) und „Fast — es fehlt nur"
  (max. 2 fehlende Zutaten, als klickbare Chips: antippen = zur Auswahl hinzufügen).
- Auswahl bleibt in `localStorage` (`heiben-kulinarik-vorrat`). Verlinkt aus Übersicht, Landing
  und Wochenplan; in der Sitemap.

- **Würfel ↔ Wochenplan:** Direkt am gewürfelten Gericht „+ Wochenplan" mit Tagwahl (Mo–So) — das Gericht landet sofort im Wochenplaner und damit auf der Einkaufsliste.

## Neu: Merkliste & Druckansichten
- **Merkliste (♥):** Herz-Button auf jeder Rezept-Detailseite und auf allen Karten der
  Rezept-Übersicht (bleibt auch nach Filterwechseln erhalten). In der Übersicht filtert
  „♥ Gemerkte (n)" auf die Merkliste; das Konto-Profil zeigt die gemerkten Rezepte mit
  Direktlinks. Gespeichert browserlokal (`heiben-kulinarik-favs`, mit Namens-Snapshot,
  damit das Profil ohne Rezept-DB anzeigen kann).
- **Drucken / als PDF sichern:** „⎙ Drucken"-Knopf auf der Rezept-Detailseite (saubere
  Kochkarte: ohne Navigation/Buttons/Paywall-Karte, leerer Bild-Platzhalter ausgeblendet,
  Fußzeile mit Quelle) und im Wochenplaner (Wochenraster kompakt zweispaltig + Einkaufsliste
  mit Abhak-Kästchen). Funktioniert über den Browser-Druckdialog, also auch als PDF-Export.

## Neu: Site-weite Suche & „Meine Küche"
- **Suche (`suche.html`):** Ein Feld für alles — 159 Rezepte, Magazin-Geschichten, Schaufenster-
  Fundstücke und alle Seiten. Live-Suche mit Ranking (Titel > Untertitel > Text), Gruppierung,
  Treffer-Hervorhebung, teilbarer URL (`?q=`) und ODER-Fallback, wenn die strenge UND-Suche leer
  ausgeht. Der Index (`suche-index.js`, ~64 KB) wird zur Build-Zeit erzeugt; Rezepte sind ohne
  Zubereitungsschritte indiziert (kein Plus-Leak). „⌕ Suche"-Link in der Navigation aller
  öffentlichen Seiten; in der Sitemap.
- **„Meine Küche" (Rezept-Detailseite):** Sterne-Bewertung (1–5), „Heute gekocht ✓" mit Verlauf
  (n× gekocht, zuletzt am …) und Autosave-Notizfeld — privat im Browser
  (`heiben-kulinarik-notizen`). Die eigene Notiz und Bewertung erscheinen mit auf der
  gedruckten Kochkarte.

## Neu: Mobile-Pass (alle 25 Seiten mit Navigation)
Audit bei 375 px über 14 Kernseiten ergab: kein horizontaler Overflow, keine Fehler — aber
zwei echte Mängel, beide behoben:
- **Mobiles Menü fehlte komplett:** Das CSS versteckte `nav .links` unter 780 px ersatzlos.
  Jetzt erscheint ein Burger-Button (☰/✕, mit aria-expanded), der die Hauptnavigation als
  vollbreite Liste unter der Nav ausklappt; Klick auf einen Eintrag schließt das Menü.
  Desktop bleibt unverändert (Burger versteckt, Links sichtbar — getestet).
- **Startseiten-Hero klebte randlos links:** Padding-Fix für `.hero.wrap` unter 780 px.
Verifiziert auf Start-, Wochenplan-, Lebenswissen- und Konto-Seite (Burger sichtbar,
6 Menü-Links, Navigation über das Menü funktioniert), 0 Konsolen-Fehler.

## Neu: Werkzeug-Band & Menü-Ausbau
- **Werkzeug-Band auf der Startseite** (nach den fünf Häusern): fünf Karten verlinken
  prominent auf Suche, Wochenplan & Einkaufsliste, Rezept-Würfel, Rezepte & Länderkarte
  und Lebenswissen — mit Haus-Label, einem Satz Nutzenversprechen und Handlungs-Link.
- **Burger-Menü jetzt auch auf Desktop** (alle 25 Seiten): Neben der normalen Navigation
  öffnet ☰ ein rechtsbündiges Panel (320 px) mit zwei Sektionen — „Navigation"
  (Seiten-Links) und „Werkzeuge" (Suche, Wochenplan, Würfel, Rezepte, Lebenswissen,
  Mein Konto). Mobil erscheint dasselbe Menü vollbreit. Schließen per ✕, Klick außerhalb,
  Escape oder Link-Klick; aria-expanded gepflegt. Hero-Padding-Fix gilt nun auf allen Größen.

## Update: Suche als permanentes Header-Element
Die Suche ist kein Werkzeug-Eintrag mehr (aus Band und Burger-Menü entfernt), sondern auf
allen 23 öffentlichen Seiten **immer im Header**: ein abgerundetes Pill-Eingabefeld mit
Lupe und vergrautem „Suche"-Placeholder. Beim Tippen erscheinen **Live-Vorschläge**
(Top-7 mit Quelle-Label + „Alle Ergebnisse (n) →"; der 85-KB-Suchindex lädt erst beim
ersten Fokus). Klick auf einen Vorschlag führt direkt zur Seite; **Enter** öffnet die
Ergebnisseite `suche.html?q=…`. Schließen per Klick außerhalb oder Escape. Mobil nutzt das
Dropdown die volle Breite; verifiziert auf Desktop und 375 px (0 Overflow, 0 Fehler).
