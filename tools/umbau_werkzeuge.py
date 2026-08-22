#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Hebt die Werkzeug- und Wissensseiten auf die zentrale Gestalt (v3, Welle 20).

    python3 tools/umbau_werkzeuge.py [--pruefen] [datei ...]

Dieselbe Methode wie umbau_weltseiten.py und umbau_kompendien.py:
  1. body bekommt data-hb-seite="werkzeug" (+ data-hb-mass, wenn nicht "normal")
  2. hb-werkzeug.css wird VOR den eigenen <style>-Block gehängt
  3. Kit-Regeln fallen weg — wortgleiche wie abgedriftete
  4. Kit-Variablen mit Hex-Wert verlassen :root

Drift wird an der Handschrift erkannt, nicht am Wortlaut: dieselbe Regel mit
anderer Nachkommastelle ist kein eigenes Design. Wo eine Seite wirklich etwas
anderes will — ein festgeheftetes Ergebnisfeld etwa —, bleibt sie stehen.
"""
import json, re, sys
from pathlib import Path

WURZEL = Path(__file__).resolve().parent.parent
WEB = WURZEL / 'web'
KIT_DATEI = WURZEL / 'tools' / 'werkzeug-kit.json'
KIT_VARS = ('--bg', '--bg2', '--paper', '--ink', '--ink2', '--rule', '--terra',
            '--ochre', '--moss', '--burg', '--aub', '--good')

sys.path.insert(0, str(WURZEL / 'tools'))
from umbau_weltseiten import bloecke, kanon  # noqa: E402

DRIFT = {
    # Satzspiegel: identisch bis auf die max-width, die zwischen 680 und 940
    # gewachsen ist. Die Breite wird zur Rolle, die Regel entfällt.
    '.wrap': lambda d: re.fullmatch(r'max-width:\d+px;margin:0auto;padding:[^;]+;?', d) is not None,
    'h1': lambda d: "font-family:'Fraunces'" in d and 'font-size:clamp(' in d,
    'h1 em': lambda d: 'font-style:italic' in d,
    '.lead': lambda d: 'color:var(--ink2)' in d and 'max-width:' in d,
    '.eyebrow': lambda d: "font-family:'JetBrainsMono'" in d and 'text-transform:uppercase' in d,
    '.foot': lambda d: "font-family:'JetBrainsMono'" in d and 'text-transform:uppercase' in d,
    # Das Ergebnisfeld: die dunkle Fassung ohne eigene Absicht. Wer klebt
    # (position:sticky), sagt damit etwas Eigenes und bleibt unangetastet.
    '.result': lambda d: ('background:var(--ink)' in d and 'color:var(--bg)' in d
                          and 'position:sticky' not in d),
    '.verdict': lambda d: 'color:#e8e0d0' in d,
    '.card': lambda d: 'background:var(--paper)' in d and 'border:1pxsolidvar(--rule)' in d,
    '.chart-card': lambda d: 'background:var(--paper)' in d and 'border-radius:' in d,
    'canvas': lambda d: 'width:100%' in d and 'display:block' in d,
    '.field input:focus': lambda d: 'border-color:var(--terra)' in d,
}


def laden():
    if not KIT_DATEI.exists():
        sys.exit(f'Fehlt: {KIT_DATEI.relative_to(WURZEL)}')
    roh = json.loads(KIT_DATEI.read_text(encoding='utf-8'))
    return roh['seiten'], {s: set(v) for s, v in roh['kit'].items()}, roh['mass']


def umbauen(datei, kit, mass, pruefen):
    p = WEB / datei
    s0 = s = p.read_text(encoding='utf-8')
    bericht = []

    if 'data-hb-seite=' not in s:
        marke = ' data-hb-seite="werkzeug"'
        rolle = mass.get(datei, 'normal')
        if rolle != 'normal':
            marke += f' data-hb-mass="{rolle}"'
        s, n = re.subn(r'(<body\b[^>]*?)(\s*>)', r'\1' + marke + r'\2', s, count=1)
        if n != 1:
            return None, f'{datei}: <body> nicht gefunden'
        bericht.append('body markiert' + ('' if rolle == 'normal' else f' ({rolle})'))

    if 'hb-werkzeug.css' not in s:
        link = '<link rel="stylesheet" href="hb-werkzeug.css">'
        m = re.search(r'[ \t]*<style\b', s)
        if m:
            s = s[:m.start()] + '  ' + link + '\n' + s[m.start():]
        else:
            s = s.replace('</head>', '  ' + link + '\n</head>', 1)
        bericht.append('css eingehängt')

    weg = drift = 0

    def saeubern(m):
        nonlocal weg, drift
        rein = re.sub(r'/\*.*?\*/', '', m.group(2), flags=re.S)
        raus = []
        for sel, dek, a, b in bloecke(rein):
            k = kanon(dek)
            if sel in kit and k in kit[sel]:
                raus.append((a, b)); weg += 1
            elif sel in DRIFT and DRIFT[sel](k):
                raus.append((a, b)); drift += 1
        for a, b in sorted(raus, reverse=True):
            rein = rein[:a] + rein[b:]
        return m.group(1) + re.sub(r'\n{3,}', '\n\n', rein) + m.group(3)

    s = re.sub(r'(<style[^>]*>)(.*?)(</style>)', saeubern, s, flags=re.S)
    if weg or drift:
        bericht.append(f'{weg} Kit + {drift} Drift entfernt')

    def root(m):
        neu = re.sub(r'(?:' + '|'.join(map(re.escape, KIT_VARS)) + r')\s*:\s*#[0-9a-fA-F]{3,8}\s*;?',
                     '', m.group(2))
        return m.group(1) + neu + m.group(3) if neu.strip(' ;\n\t') else ''

    vorher = s
    s = re.sub(r'(:root\s*\{)([^{}]*)(\})', root, s)
    if s != vorher:
        bericht.append(':root entschlackt')

    if s == s0:
        return None, None
    if not pruefen:
        p.write_text(s, encoding='utf-8')
    return bericht, None


def main():
    pruefen = '--pruefen' in sys.argv
    alle, kit, mass = laden()
    ziele = [a for a in sys.argv[1:] if not a.startswith('--')] or alle
    print(f'Kit: {len(kit)} Selektoren · Drift: {len(DRIFT)} Handschriften\n')
    fehler = geaendert = 0
    for d in ziele:
        bericht, fehl = umbauen(d, kit, mass, pruefen)
        if fehl:
            fehler += 1; print(f'  ✗ {fehl}')
        elif bericht:
            geaendert += 1; print(f'  ✓ {d:<28}{" · ".join(bericht)}')
    print(f'\n{geaendert} Seiten umgebaut, {fehler} Fehler'
          + ('  (nur geprüft)' if pruefen else ''))
    return 1 if fehler else 0


if __name__ == '__main__':
    sys.exit(main())
