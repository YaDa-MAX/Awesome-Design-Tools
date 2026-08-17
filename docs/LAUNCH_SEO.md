# Launch-Schicht: Auffindbarkeit, Teilen & Politur (gesamte Website)

Neben Kulinarik wurde die für einen Live-Gang wichtigste „unsichtbare" Schicht ergänzt —
über alle 25 Seiten hinweg, vollständig eingebettet, ohne externe Dienste.

## Was neu ist
- **Teilen-Vorschau (Open Graph + Twitter Cards)** auf allen öffentlichen Seiten: Wird ein
  HeiBen-Link in WhatsApp, LinkedIn, Slack o. ä. geteilt, erscheinen Titel, Beschreibung und
  Vorschaubild statt eines nackten Links.
- **Theme-Color & Web-App-Manifest** (`manifest.webmanifest`, Icons 192/512): Die Seite wirkt
  auf dem Handy wie eine App (installierbar), die Adressleiste nimmt die Markenfarbe an.
- **Strukturierte Daten (schema.org):**
  - Startseite: `Organization` mit den fünf Häusern → bessere Darstellung in der Suche.
  - Jede Rezeptseite: `Recipe` mit Zeiten, Portionen, Zutaten und Schritten → Voraussetzung für
    Googles Rezept-Rich-Results (Bild, Zeit, Schritte direkt im Suchergebnis).
- **`sitemap.xml` & `robots.txt`:** Suchmaschinen finden alle öffentlichen Seiten; interne
  Verwaltungsseiten (Redaktion, Export, Anfragen-/Bestellverwaltung) sind auf „noindex" gesetzt
  und ausgeschlossen.
- **`404.html`:** eine markenkonforme „Seite nicht gefunden" mit Weg zurück und Haus-Links.
- **Korrektur Startseite:** Titel/Beschreibung sprachen noch von „vier Häusern" ohne Kulinarik —
  jetzt „fünf Häuser" inklusive Kulinarik.

## Ein einziger Handgriff beim Live-Gang
In **`robots.txt`** und **`sitemap.xml`** steht als Platzhalter `https://www.heiben.de`.
Dort die echte Domain eintragen. Sonst ist nichts zu tun. (Die Teilen-Vorschaubilder nutzen
relative Pfade und funktionieren auf den meisten Plattformen sofort; für maximale Kompatibilität
kann man die `og:image`/`twitter:image`-Pfade später auf die volle Domain umstellen.)

## Hinweis zu den Rezept-Rich-Results
Damit Google die Rezept-Karte mit Bild zeigt, sollte je Rezept ein Foto unter
`assets/rezepte/<id>.jpg` liegen (siehe Rezeptbilder-Hinweis). Ohne Bild bleibt das Schema gültig,
nur die Bildkachel im Suchergebnis entfällt.
