/* HeiBen Immobilien — Objektbestand.
   Quelle für immobilien-angebote.html (Liste) und immobilien-objekt.html (Steckbrief).
   Bis Remake v3, Welle 11 stand dieses Feld inline in immobilien-angebote.html; die
   Objektseite braucht dieselben Daten, also liegen sie jetzt als Datei vor.

   REGEL wie bei allen *-daten.js: nur ans Ende erweitern, id-Felder bleiben stabil —
   sie stehen in Deep-Links (immobilien-objekt.html?id=…) und im Merkzettel im
   localStorage (heiben-immo-merk). */
window.HEIBEN_IMMOBILIEN = [
  {
    id: 'ehrenfeld-altbau', typ: 'Wohnung', t: '3-Zimmer-Altbau mit Stuck',
    lage: 'Köln', ort: 'Köln-Ehrenfeld', zi: 3, m2: 82, preis: 420000, stat: 'frei',
    feat: ['Altbau 1908, saniert', 'Echtholzdielen', 'Balkon nach Süden', 'EG-Keller'],
    energie: 'Energieklasse D',
    baujahr: 1908, etage: '2. OG von 4', hausgeld: 285, provision: 'provisionsfrei für Käufer',
    frei: 'nach Absprache, frühestens 3 Monate',
    text: 'Ein Altbau, dem man ansieht, dass er gepflegt wurde: 3,20 m Deckenhöhe, Stuck in '
        + 'Wohn- und Schlafzimmer, Dielen abgeschliffen statt überdeckt. Die Wohnung liegt zur '
        + 'ruhigen Hofseite, der Balkon nach Süden trägt einen Tisch für vier.',
    lageText: 'Ehrenfeld zwischen Venloer Straße und Grüngürtel. Bäcker, Wochenmarkt und '
        + 'Kita unter fünf Minuten zu Fuß, KVB-Haltestelle 300 m.',
    haken: ['Bad ist von 1998 — funktionstüchtig, aber der nächste Posten',
            'Kein Aufzug', 'Stellplatz nur über die Warteliste der Hausgemeinschaft']
  },
  {
    id: 'suelz-reihenhaus', typ: 'Haus', t: 'Reihenhaus mit Garten',
    lage: 'Köln', ort: 'Köln-Sülz', zi: 5, m2: 140, preis: 720000, stat: 'frei',
    feat: ['5 Zimmer auf 3 Ebenen', 'Garten 120 m²', 'Garage', '2022 modernisiert'],
    energie: 'Energieklasse C',
    baujahr: 1964, etage: '3 Ebenen', hausgeld: 0, provision: '3,57 % inkl. MwSt.',
    frei: 'sofort',
    text: 'Ein Haus für eine Familie, die bleiben will: unten Küche und Wohnraum, in der Mitte '
        + 'drei Zimmer, oben ein ausgebautes Dach mit Blick über die Dächer. 2022 kamen neue '
        + 'Fenster, Dämmung und eine Gastherme dazu.',
    lageText: 'Sülz am Rand des Grüngürtels. Grundschule und Gymnasium fußläufig, '
        + 'die Linie 18 bringt einen in zwölf Minuten zum Neumarkt.',
    haken: ['Reihenmittelhaus — die Nachbarn hört man', 'Garage ist schmal (kein SUV)',
            'Garten liegt nach Norden, Sonne erst am Nachmittag']
  },
  {
    id: 'innenstadt-penthouse', typ: 'Wohnung', t: 'Penthouse mit Dachterrasse',
    lage: 'Köln', ort: 'Köln-Innenstadt', zi: 3, m2: 110, preis: 890000, stat: 'res',
    feat: ['Dachterrasse 40 m²', 'Aufzug', 'Tiefgarage', 'Domblick'],
    energie: 'Energieklasse B',
    baujahr: 2016, etage: '6. OG von 6', hausgeld: 480, provision: 'provisionsfrei für Käufer',
    frei: 'reserviert — Besichtigung auf Warteliste',
    text: 'Die Terrasse ist der eigentliche Raum: 40 m² nach Westen, abends steht die Sonne '
        + 'über dem Dom. Innen offener Grundriss, bodentiefe Fenster, Fußbodenheizung.',
    lageText: 'Zwischen Neumarkt und Rathaus. Alles zu Fuß — was gleichzeitig heißt: '
        + 'am Wochenende ist die Stadt vor der Tür laut.',
    haken: ['Aktuell reserviert', 'Hausgeld hoch (Aufzug, Tiefgarage, Dachpflege)',
            'Kein Keller, dafür Abstellraum in der Tiefgarage']
  },
  {
    id: 'bergisch-dhh', typ: 'Haus', t: 'Doppelhaushälfte im Grünen',
    lage: 'Umland', ort: 'Bergisch Gladbach', zi: 5, m2: 155, preis: 650000, stat: 'frei',
    feat: ['Grundstück 320 m²', 'Wärmepumpe', 'Carport', 'ruhige Lage'],
    energie: 'Energieklasse A',
    baujahr: 2019, etage: '2 Ebenen + Keller', hausgeld: 0, provision: 'provisionsfrei für Käufer',
    frei: 'ab dem 1. des Folgemonats',
    text: 'Neubau ohne Neubau-Sterilität: Klinker, Holzfenster, ein Grundriss, der mit der '
        + 'Familie mitwächst. Die Wärmepumpe läuft mit der PV-Anlage auf dem Dach.',
    lageText: 'Bergisch Gladbach-Refrath, Sackgasse, letzte Reihe vor dem Feld. '
        + 'S-Bahn in acht Minuten zu Fuß, Köln-Hbf in 25 Minuten.',
    haken: ['Nicht mehr Köln — Zweitwagen ist realistisch',
            'Grundstück ist kein Park', 'Zwei Ebenen ohne Aufzug']
  },
  {
    id: 'nippes-zwei', typ: 'Wohnung', t: 'Helle 2-Zimmer-Wohnung',
    lage: 'Köln', ort: 'Köln-Nippes', zi: 2, m2: 58, preis: 295000, stat: 'frei',
    feat: ['ideal für Singles/Paare', 'Einbauküche', 'Balkon', 'top angebunden'],
    energie: 'Energieklasse C',
    baujahr: 1978, etage: '3. OG von 5', hausgeld: 210, provision: 'provisionsfrei für Käufer',
    frei: 'sofort',
    text: 'Die erste eigene Wohnung, die auch die zweite sein darf: 58 m² ohne verlorene Ecken, '
        + 'Einbauküche bleibt, Balkon nach Osten für den Morgenkaffee.',
    lageText: 'Nippes an der Neusser Straße. Wochenmarkt am Wilhelmplatz, '
        + 'zwei Linien vor der Tür, Hbf in elf Minuten.',
    haken: ['70er-Jahre-Bau — Trittschall ist Thema', 'Aufzug endet im 4. OG',
            'Rücklage der Gemeinschaft ist dünn (Protokoll liegt bei uns aus)']
  },
  {
    id: 'deutz-gewerbe', typ: 'Gewerbe', t: 'Ladenlokal in Lauflage',
    lage: 'Köln', ort: 'Köln-Deutz', zi: 2, m2: 95, preis: 380000, stat: 'frei',
    feat: ['Schaufensterfront', 'Teeküche + WC', 'flexible Nutzung', 'hohe Frequenz'],
    energie: 'Energieausweis liegt vor',
    baujahr: 1992, etage: 'EG', hausgeld: 340, provision: '3,57 % inkl. MwSt.',
    frei: 'sofort',
    text: 'Sechs Meter Schaufenster an einer Straße, auf der Leute tatsächlich gehen. '
        + 'Hinten Teeküche, WC und ein Lagerraum, der auch als Büro taugt.',
    lageText: 'Deutz zwischen Bahnhof und Messe. Frequenz an Werktagen hoch, '
        + 'am Wochenende ruhiger als in der Innenstadt.',
    haken: ['Gastronomie nur mit Auflagen (kein Abluftkamin)',
            'Keine eigenen Stellplätze', 'Teilungserklärung vor Kauf lesen']
  }
];
