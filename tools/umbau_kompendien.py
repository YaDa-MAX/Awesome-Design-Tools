#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Hebt die Kompendien auf die zentrale Gestalt (Remake v3, Welle 19).

    python3 tools/umbau_kompendien.py [--pruefen] [datei ...]

Dieselbe Methode wie tools/umbau_weltseiten.py, andere Seitengruppe:
  1. body bekommt data-hb-seite="kompendium"
  2. hb-kompendium.css wird VOR den eigenen <style>-Block gehängt
  3. Kit-Regeln, die wortgleich auf ≥6 der 9 Seiten lagen, fallen weg
  4. Kit-Variablen mit Hex-Wert verlassen :root — die Werte kommen aus der
     Token-Ebene, gesetzt am body

Das Kit liegt eingefroren in tools/kompendium-kit.json: nach dem ersten Lauf
gäbe es die Kopien nicht mehr zu zählen (in W17 gelernt).
"""
import json, re, sys
from pathlib import Path

WURZEL = Path(__file__).resolve().parent.parent
WEB = WURZEL / 'web'
KIT_DATEI = WURZEL / 'tools' / 'kompendium-kit.json'
KIT_VARS = ('--bg', '--bg2', '--paper', '--ink', '--ink2', '--rule', '--terra',
            '--ochre', '--moss', '--burg', '--aub', '--good')

# bloecke/kanon aus dem Schwesterwerkzeug, damit beide dieselbe Zerlegung nutzen
sys.path.insert(0, str(WURZEL / 'tools'))
from umbau_weltseiten import bloecke, kanon  # noqa: E402


def laden():
    if not KIT_DATEI.exists():
        sys.exit(f'Fehlt: {KIT_DATEI.relative_to(WURZEL)}')
    roh = json.loads(KIT_DATEI.read_text(encoding='utf-8'))
    return roh['seiten'], {s: set(v) for s, v in roh['kit'].items()}


def umbauen(datei, kit, pruefen):
    p = WEB / datei
    s0 = s = p.read_text(encoding='utf-8')
    bericht = []

    if 'data-hb-seite=' not in s:
        s, n = re.subn(r'(<body\b[^>]*?)(\s*>)', r'\1 data-hb-seite="kompendium"\2', s, count=1)
        if n != 1:
            return None, f'{datei}: <body> nicht gefunden'
        bericht.append('body markiert')

    if 'hb-kompendium.css' not in s:
        link = '<link rel="stylesheet" href="hb-kompendium.css">'
        m = re.search(r'[ \t]*<style\b', s)
        if m:
            s = s[:m.start()] + '  ' + link + '\n' + s[m.start():]
        else:
            s = s.replace('</head>', '  ' + link + '\n</head>', 1)
        bericht.append('css eingehängt')

    weg = 0

    def saeubern(m):
        nonlocal weg
        rein = re.sub(r'/\*.*?\*/', '', m.group(2), flags=re.S)
        raus = [(a, b) for sel, dek, a, b in bloecke(rein)
                if sel in kit and kanon(dek) in kit[sel]]
        for a, b in sorted(raus, reverse=True):
            rein = rein[:a] + rein[b:]
            weg += 1
        return m.group(1) + re.sub(r'\n{3,}', '\n\n', rein) + m.group(3)

    s = re.sub(r'(<style[^>]*>)(.*?)(</style>)', saeubern, s, flags=re.S)
    if weg:
        bericht.append(f'{weg} Kit-Regeln entfernt')

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
    alle, kit = laden()
    ziele = [a for a in sys.argv[1:] if not a.startswith('--')] or alle
    print(f'Kit: {len(kit)} Selektoren zentral übernommen\n')
    fehler = geaendert = 0
    for d in ziele:
        bericht, fehl = umbauen(d, kit, pruefen)
        if fehl:
            fehler += 1
            print(f'  ✗ {fehl}')
        elif bericht:
            geaendert += 1
            print(f'  ✓ {d:<24}{" · ".join(bericht)}')
    print(f'\n{geaendert} Seiten umgebaut, {fehler} Fehler'
          + ('  (nur geprüft)' if pruefen else ''))
    return 1 if fehler else 0


if __name__ == '__main__':
    sys.exit(main())
