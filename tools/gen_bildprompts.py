# -*- coding: utf-8 -*-
"""HeiBen Kulinarik — Bildprompts für die 159 Rezepte erzeugen.

    cd web && python3 ../tools/gen_bildprompts.py

WARUM DIESES WERKZEUG
Die bisherige _dateiliste.csv trug für jedes Rezept denselben Satz, in den nur Name,
Land und Gang eingesetzt waren. 159 Bilder daraus sehen aus wie 159 Varianten
desselben Bildes — gleicher Winkel, gleicher Tisch, gleiches Licht. Genau das ist bei
einer Rezeptsammlung tödlich: Die Übersicht wird zur Tapete.

DIE REGEL HIER
Ein Prompt besteht aus vier Teilen:
  1. ANKER    — in JEDEM Prompt wortgleich. Er hält die 159 Bilder als Serie zusammen:
                Licht, Objektiv, Palette, Verbote. Wer ihn ändert, ändert die Serie.
  2. GANG     — Kamerawinkel und Gefäß folgen dem, was auf dem Teller liegt. Eine Suppe
                fotografiert man nicht wie ein Blech Gebäck.
  3. REGION   — Untergrund und Beiwerk kommen aus der Küche, nicht aus dem Katalog.
                Maghreb bekommt Messing und Ton, Skandinavien helles Holz und Leinen.
  4. GERICHT  — zwei bis drei echte Hauptzutaten aus dem Rezept, dazu der Serviervorschlag.
                Das ist der Teil, den kein zweites Rezept hat.

AUSGABE (alles unter web/assets/rezepte/)
  _dateiliste.csv   Dateiname, ID, Rezept, Land, Kontinent, Gang, Art, Prompt
  _prompts.jsonl    dieselbe Liste zeilenweise als JSON, für Stapelverarbeitung
  chargen/*.md      acht Chargen à 20 Rezepte zum Abarbeiten, mit Fortschrittshaken
"""
import json, csv, re, pathlib, subprocess, sys, textwrap

WEB = pathlib.Path('.') if pathlib.Path('kulinarik-daten.js').exists() else pathlib.Path('web')
ZIEL = WEB / 'assets' / 'rezepte'
CHARGEN_GROESSE = 20

# ---------------------------------------------------------------- 1. ANKER --
# Wortgleich in jedem Prompt. Er ist der Grund, warum die Sammlung als eine Serie
# liest und nicht als 159 Einzelbilder. Änderungen hier betreffen ALLE Bilder.
ANKER_LICHT = ('natürliches Fensterlicht von links, weiche Schatten, kein Blitz, '
               'kein Studioglanz')
ANKER_OPTIK = ('wie mit 50-mm-Objektiv bei Blende f/4 fotografiert, Hintergrund leicht '
               'unscharf, Gericht scharf')
ANKER_FARBE = ('gedeckte warme Palette aus Leinen, Sand und Ton, keine grellen Farben, '
               'kein Weißabgleich ins Kalte')
ANKER_HALTUNG = ('ehrlich und appetitlich statt hochglanzpoliert, so wie es zu Hause auf '
                 'den Tisch kommt, keine Perfektion')
NEGATIV = ('kein Text, keine Schrift, keine Buchstaben, kein Logo, kein Wasserzeichen, '
           'keine Hände, keine Menschen, kein Besteck in Bewegung, keine Collage, '
           'kein Rahmen, kein Rand')
FORMAT = 'Querformat 3:2, Gericht mittig mit Luft nach allen Seiten'

# ------------------------------------------------------- 2. GANG: Kamera ----
# Was auf dem Teller liegt, bestimmt, von wo man es ansieht.
GANG = {
    'Suppe':        ('leichte Schrägsicht von 30 Grad', 'tiefer Steingutteller',
                     'der Dampf gerade noch sichtbar'),
    'Vorspeise':    ('Aufsicht von 90 Grad', 'kleiner flacher Teller',
                     'viel freie Fläche um den Teller'),
    'Hauptgericht': ('Schrägsicht von 45 Grad', 'flache Servierplatte oder große Schale',
                     'eine Portion angerichtet, der Rest angedeutet im Hintergrund'),
    'Beilage':      ('Schrägsicht von 45 Grad', 'kleine Schüssel',
                     'als Teil eines größeren Tisches angedeutet'),
    'Dessert':      ('fast auf Augenhöhe, 20 Grad', 'Kuchenteller oder Glasschale',
                     'die Schichten oder die Kruste sichtbar'),
    'Frühstück':    ('Schrägsicht von 45 Grad', 'Frühstücksbrett oder Teller',
                     'Morgenlicht, ein Tuch beiläufig danebengelegt'),
    'Snack':        ('Aufsicht von 90 Grad', 'Holzbrett oder Papier',
                     'mehrere Stücke locker verteilt'),
    'Getränk':      ('auf Augenhöhe', 'einfaches Glas oder Tasse',
                     'ein zweites Glas angeschnitten im Hintergrund'),
}
GANG_STANDARD = ('Schrägsicht von 45 Grad', 'schlichter Teller', 'ruhig angerichtet')

# ----------------------------------------------- 3. REGION: Tisch & Beiwerk --
# Länder werden zu Küchenräumen gebündelt. Der Untergrund erzählt die Herkunft,
# ohne dass eine Flagge im Bild liegen müsste.
REGION_LAENDER = {
    'maghreb':   ['Algerien', 'Marokko', 'Tunesien', 'Libyen', 'Ägypten'],
    'levante':   ['Türkei', 'Zypern', 'Israel', 'Libanon'],
    'suedeuropa':['Italien', 'Spanien', 'Portugal', 'Griechenland', 'Malta', 'San Marino',
                  'Vatikanstadt', 'Andorra', 'Monaco'],
    'balkan':    ['Albanien', 'Serbien', 'Kroatien', 'Bosnien und Herzegowina', 'Montenegro',
                  'Nordmazedonien', 'Slowenien', 'Bulgarien', 'Rumänien', 'Kosovo'],
    'osteuropa': ['Polen', 'Ukraine', 'Belarus', 'Russland', 'Litauen', 'Lettland', 'Estland',
                  'Moldau', 'Slowakei', 'Tschechien', 'Ungarn'],
    'nordeuropa':['Schweden', 'Norwegen', 'Dänemark', 'Finnland', 'Island', 'Färöer'],
    'inseln':    ['Vereinigtes Königreich', 'Irland', 'Großbritannien', 'Schottland'],
    'westeuropa':['Frankreich', 'Belgien', 'Niederlande', 'Luxemburg'],
    'mitte':     ['Deutschland', 'Österreich', 'Schweiz', 'Liechtenstein'],
}
REGION = {
    'maghreb':   ('gehämmertes Messingtablett auf gemusterten Zementfliesen',
                  'eine Tajine-Schale und ein Bund frische Minze am Rand'),
    'levante':   ('Steinplatte mit feiner Maserung',
                  'ein kleiner Kupferkessel und Sesamkörner am Rand'),
    'suedeuropa':('unbehandelter Terrakotta-Untergrund',
                  'ein Olivenholzbrett und ein Zweig Rosmarin am Rand'),
    'balkan':    ('abgenutztes dunkles Holz',
                  'ein emaillierter Krug und getrocknete Paprika am Rand'),
    'osteuropa': ('dunkler Holztisch mit sichtbaren Gebrauchsspuren',
                  'eine emaillierte Schüssel und ein Leinentuch mit Kreuzstichkante'),
    'nordeuropa':('helles, fast weißes Holz',
                  'grobes Leinen und ein schlichtes Steingutgefäß am Rand'),
    'inseln':    ('dunkelgrün gestrichenes Holz',
                  'eine gusseiserne Pfanne und eine Tasse starker Tee am Rand'),
    'westeuropa':('heller Marmor mit grauer Ader',
                  'ein Kupfertopf und ein gefaltetes Leinentuch am Rand'),
    'mitte':     ('geöltes Eichenholz',
                  'ein Steingutkrug und ein karierter Tuchzipfel am Rand'),
}
REGION_STANDARD = ('schlichter Holztisch in Sandton', 'ein Leinentuch am Rand')

# Mengenangaben, Zubereitungshinweise und Klammern raus — übrig bleibt die Zutat.
MENGE = re.compile(r'^\s*(?:ca\.\s*)?[\d¼½¾/,.\-–\s]*\s*'
                   r'(?:g|kg|ml|l|EL|TL|Prise|Prisen|Stück|Stk|Bund|Zehen?|Dose|Dosen|'
                   r'Packung|Packungen|Blatt|Blätter|Scheiben?|Zweige?|cm|Msp)?\.?\s*',
                   re.I)
KLAMMER = re.compile(r'\([^)]*\)')

def zutat_kurz(z):
    s = KLAMMER.sub('', z)
    s = MENGE.sub('', s, count=1)
    s = s.split(',')[0].strip(' .;')
    return s

def region_von(land):
    for schluessel, laender in REGION_LAENDER.items():
        if land in laender:
            return schluessel
    return None

def hauptzutaten(r, wieviel=3):
    """Die ersten Zutaten sind im Bestand durchgehend die tragenden — Fleisch, Getreide,
       Gemüse — Gewürze stehen hinten. Wir nehmen die ersten und werfen raus, was man
       auf einem Foto ohnehin nicht sieht."""
    UNSICHTBAR = ('salz', 'pfeffer', 'wasser', 'öl', 'zucker', 'mehl', 'hefe', 'backpulver',
                  'brühe', 'essig', 'butterschmalz', 'speisestärke')
    raus = []
    for z in r.get('zutaten', []):
        k = zutat_kurz(z)
        if not k or len(k) < 3:
            continue
        if any(u in k.lower() for u in UNSICHTBAR):
            continue
        if k.lower() in (x.lower() for x in raus):
            continue
        raus.append(k)
        if len(raus) >= wieviel:
            break
    return raus

# Länder mit Artikel brauchen einen anderen Fall — „aus Vereinigtes Königreich" ist
# kein Deutsch. Alles, was hier nicht steht, laeuft mit blossem „aus <Land>".
LAND_FALL = {
    'Vereinigtes Königreich': 'dem Vereinigten Königreich',
    'Türkei': 'der Türkei', 'Schweiz': 'der Schweiz', 'Ukraine': 'der Ukraine',
    'Slowakei': 'der Slowakei', 'Tschechien': 'Tschechien', 'Niederlande': 'den Niederlanden',
    'Färöer': 'von den Färöern', 'Vatikanstadt': 'der Vatikanstadt',
    'Bosnien und Herzegowina': 'Bosnien und Herzegowina', 'Moldau': 'der Republik Moldau',
}
def aus_land(land):
    return 'aus ' + LAND_FALL.get(land, land) if not LAND_FALL.get(land, '').startswith('von') \
        else LAND_FALL[land]

def servier_kurz(r):
    s = (r.get('servier') or '').strip()
    if not s:
        return ''
    s = re.split(r'[.;]', s)[0].strip()
    return s if 8 <= len(s) <= 90 else ''

def gross(t):
    return t[:1].upper() + t[1:]

def gefaess_praep(g):
    """„serviert in/auf X" liest sich wie ein Formular. Tiefe Gefaesse bekommen „in",
       flache „auf"."""
    return ('in ' if any(w in g for w in ('teller', 'Schale', 'Schüssel', 'Glas', 'Tasse'))
            else 'auf ') + g

def prompt_bauen(r):
    winkel, gefaess, regie = GANG.get(r.get('gang', ''), GANG_STANDARD)
    tisch, beiwerk = REGION.get(region_von(r.get('land', '')) or '', REGION_STANDARD)
    zut = hauptzutaten(r)
    erkennbar = ''
    if zut:
        erkennbar = 'Im Bild klar erkennbar: ' + ', '.join(zut) + '. '
    servier = servier_kurz(r)
    servier_teil = f'Angerichtet wie beschrieben: {servier}. ' if servier else ''

    return (
        f'Food-Fotografie: {r["name"]}, {r.get("gang","Gericht")} {aus_land(r["land"])}. '
        f'{erkennbar}{servier_teil}'
        f'{gross(winkel)}, serviert {gefaess_praep(gefaess)}, {regie}. '
        f'Untergrund: {tisch}; {beiwerk}. '
        f'{gross(ANKER_LICHT)}. {gross(ANKER_OPTIK)}. {gross(ANKER_FARBE)}. {gross(ANKER_HALTUNG)}. '
        f'{FORMAT}. '
        f'NICHT: {NEGATIV}.'
    )

# ------------------------------------------------------------- Datenquelle --
def rezepte_laden():
    """Die Datenkarte ist ein halbes Megabyte — als Kommandozeilenargument sprengt sie
       die Argumentgrenze. Also liest ein winziges Node-Skript die Datei selbst."""
    brueck = ZIEL.parent.parent / '.rezepte-lesen.js'
    brueck.write_text(
        "global.window={};"
        "eval(require('fs').readFileSync('kulinarik-daten.js','utf8'));"
        "process.stdout.write(JSON.stringify(window.HEIBEN_KULINARIK_SEED.entries));",
        encoding='utf-8')
    try:
        roh = subprocess.run(['node', str(brueck.name)], cwd=str(WEB),
                             capture_output=True, text=True, check=True).stdout
    finally:
        brueck.unlink(missing_ok=True)
    return json.loads(roh)

def main():
    rezepte = rezepte_laden()
    rezepte.sort(key=lambda r: (r.get('kontinent', ''), r.get('land', ''), r.get('name', '')))
    ZIEL.mkdir(parents=True, exist_ok=True)
    (ZIEL / 'chargen').mkdir(exist_ok=True)

    zeilen = []
    for r in rezepte:
        zeilen.append({
            'dateiname': r['id'] + '.jpg',
            'id': r['id'],
            'rezept': r['name'],
            'land': r.get('land', ''),
            'kontinent': r.get('kontinent', ''),
            'gang': r.get('gang', ''),
            'art': ', '.join(r.get('art', []) if isinstance(r.get('art'), list) else [r.get('art', '')]),
            'prompt': prompt_bauen(r),
        })

    with (ZIEL / '_dateiliste.csv').open('w', encoding='utf-8-sig', newline='') as f:
        w = csv.DictWriter(f, fieldnames=list(zeilen[0].keys()))
        w.writeheader()
        w.writerows(zeilen)

    with (ZIEL / '_prompts.jsonl').open('w', encoding='utf-8') as f:
        for z in zeilen:
            f.write(json.dumps(z, ensure_ascii=False) + '\n')

    # Chargen: 20 Rezepte je Datei, nach Region sortiert — wer eine Charge am Stück
    # erzeugt, bekommt Bilder, die auch nebeneinander zusammenpassen.
    for c in range((len(zeilen) + CHARGEN_GROESSE - 1) // CHARGEN_GROESSE):
        teil = zeilen[c * CHARGEN_GROESSE:(c + 1) * CHARGEN_GROESSE]
        pfad = ZIEL / 'chargen' / f'charge-{c+1:02d}.md'
        t = [f'# Charge {c+1:02d} · {len(teil)} Rezepte',
             '',
             f'Länder: {", ".join(sorted({x["land"] for x in teil}))}',
             '',
             'Nach dem Erzeugen: Dateien als `<id>.jpg` ablegen und',
             '`python3 tools/import_rezeptbilder.py <ordner>` laufen lassen.',
             '']
        for i, x in enumerate(teil, 1):
            t += [f'## {i:02d}. {x["rezept"]}',
                  f'`{x["dateiname"]}` — {x["land"]} · {x["gang"]}',
                  '',
                  '```text',
                  textwrap.fill(x['prompt'], 96),
                  '```',
                  '',
                  '- [ ] erzeugt   - [ ] geprüft   - [ ] importiert',
                  '']
        pfad.write_text('\n'.join(t), encoding='utf-8')

    laengen = [len(z['prompt']) for z in zeilen]
    eigen = len({z['prompt'] for z in zeilen})
    print(f'Rezepte: {len(zeilen)}')
    print(f'Prompts: {eigen} verschiedene ({eigen*100//len(zeilen)} % eigenständig)')
    print(f'Länge: min {min(laengen)} · Median {sorted(laengen)[len(laengen)//2]} · max {max(laengen)}')
    print(f'Chargen: {(len(zeilen)+CHARGEN_GROESSE-1)//CHARGEN_GROESSE} Dateien à {CHARGEN_GROESSE}')
    print(f'Geschrieben: {ZIEL}/_dateiliste.csv, _prompts.jsonl, chargen/')

if __name__ == '__main__':
    main()
