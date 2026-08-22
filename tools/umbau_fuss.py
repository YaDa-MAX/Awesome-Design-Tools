#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Löst die kopierten Fußbereiche durch den gemeinsamen ab (Remake v3, Welle 18).

    python3 tools/umbau_fuss.py [--pruefen] [datei ...]

Entfernt die von Hand kopierte <footer>-Fassung (drei Varianten, wortgleich bis
auf Leerzeichen) und markiert Seiten, die ihren eigenen Abschluss behalten.
Eingehängt wird hb-fuss.js/.css von tools/gen_kopf.js — hier wird nur geräumt.

Kleine, seiteneigene <footer> (eine Zeile Stand/Hinweis) bleiben stehen: sie
sagen etwas über DIESE Seite. Der gemeinsame Fuß tritt darunter.
"""
import json, re, sys
from pathlib import Path

WURZEL = Path(__file__).resolve().parent.parent
WEB = WURZEL / 'web'
# Ab dieser Länge ist es der kopierte Konzern-Fuß und nicht der Seitenabschluss.
GROSS = 1500
# Diese bringen ihren Abschluss bewusst selbst mit.
EIGEN = {'index.html', 'startseite-klassisch.html', 'startseite-neu.html'}


def footer_block(text):
    """(start, ende) des ersten <footer>…</footer> ausserhalb von script/style."""
    verboten = [(m.start(), m.end()) for m in
                re.finditer(r'<(script|style)\b.*?</\1>', text, re.S)]
    for m in re.finditer(r'<footer\b', text):
        if any(a <= m.start() < b for a, b in verboten):
            continue
        tiefe, i = 0, m.start()
        for m2 in re.finditer(r'<footer\b|</footer>', text[m.start():]):
            tiefe += 1 if not m2.group(0).startswith('</') else -1
            if tiefe == 0:
                return m.start(), m.start() + m2.end()
        return None
    return None


def main():
    pruefen = '--pruefen' in sys.argv
    reg = json.loads((WURZEL / 'tools' / 'seiten.json').read_text(encoding='utf-8'))['seiten']
    ziele = [a for a in sys.argv[1:] if not a.startswith('--')] or list(reg)

    weg = behalten = markiert = 0
    for datei in ziele:
        p = WEB / datei
        if not p.exists():
            continue
        s0 = s = p.read_text(encoding='utf-8')

        if datei in EIGEN:
            if 'data-hb-fuss=' not in s:
                s, n = re.subn(r'(<body\b[^>]*?)(\s*>)', r'\1 data-hb-fuss="aus"\2', s, count=1)
                if n == 1:
                    markiert += 1
                    print(f'  · {datei:<38} eigener Abschluss, Fuß abgeschaltet')
        else:
            b = footer_block(s)
            if b and (b[1] - b[0]) >= GROSS:
                anfang = s.rfind('\n', 0, b[0]) + 1
                ende = b[1]
                while ende < len(s) and s[ende] in ' \t':
                    ende += 1
                if ende < len(s) and s[ende] == '\n':
                    ende += 1
                s = s[:anfang] + s[ende:]
                weg += 1
                print(f'  ✓ {datei:<38} kopierter Fuß entfernt ({b[1]-b[0]} Zeichen)')
            elif b:
                behalten += 1

        if s != s0 and not pruefen:
            p.write_text(s, encoding='utf-8')

    print(f'\n{weg} kopierte Fußbereiche entfernt · {behalten} seiteneigene behalten'
          f' · {markiert} Seiten abgeschaltet'
          + ('  (nur geprüft)' if pruefen else ''))


if __name__ == '__main__':
    main()
