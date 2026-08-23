#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Sagt den Seitenkopf der Weltunterseiten an (Remake v3, Welle 21).

    python3 tools/bewegung_weltseiten.py [--pruefen] [datei ...]

Bisher war Bewegung auf diesen Seiten Zufall: 17 von 42 luden hb-motion.js und
liefen auf dem eingefrorenen Bestandspfad (er rät: section, footer, alles unter
[class*="grid"]), 25 hatten gar keine. Kein einziges data-hb-motion im Markup.

Diese Welle sagt den Seitenkopf an — Rückweg, Kapitälchen, Titel, Vorspann —,
auf allen 42 gleich. Was der Bestandspfad heute schon bewegt, bleibt unberührt:

  - Seiten MIT hb-motion.js behalten ihn. Der Ansagepfad kommt daneben;
    hb-motion.js überspringt angesagte Elemente im Bestandspfad ohnehin.
  - Seiten OHNE hb-motion.js bekommen data-hb-regie="ansage". Damit läuft
    dort NUR die Ansage — der Bestandspfad würde sonst plötzlich Raster
    bewegen, die nie bewegt wurden, und clientseitig erzeugte Kacheln
    blieben bis zum Sicherheitsnetz unsichtbar.

Angesagt wird ausschliesslich statisches Markup. Was ein Skript später baut,
bekommt kein data-hb-motion (sonst wartet es auf einen Beobachter, den es
nicht mehr gibt).
"""
import json, re, sys
from pathlib import Path

WURZEL = Path(__file__).resolve().parent.parent
WEB = WURZEL / 'web'
WELTEN = ('reisen', 'wohnen', 'immobilien', 'studio', 'kulinarik')

# (Suchmuster, Rolle, Stufe) — in dieser Reihenfolge tritt der Kopf ein.
KOPF = [
    (re.compile(r'<a\s+class="ws-weg"'),                      'ein', 0),
    (re.compile(r'<(?:div|p|span)\s+class="[^"]*\beyebrow\b'), 'auf', 1),
    (re.compile(r'<h1\b'),                                     'auf', 2),
    (re.compile(r'<p\s+class="[^"]*\blede\b'),                 'auf', 3),
]


def seiten_liste():
    reg = json.loads((WURZEL / 'tools' / 'seiten.json').read_text(encoding='utf-8'))['seiten']
    return [d for d, m in reg.items()
            if m.get('welt') in WELTEN and m.get('typ') != 'welt' and (WEB / d).exists()]


def skriptfrei(text):
    """Bereiche innerhalb von <script>/<style> — dort wird nichts angesagt."""
    return [(m.start(), m.end()) for m in
            re.finditer(r'<(script|style)\b.*?</\1>', text, re.S)]


def ansagen(datei, pruefen):
    p = WEB / datei
    s0 = s = p.read_text(encoding='utf-8')
    if 'data-hb-motion' in s:
        return None, None                      # schon angesagt, nichts zu tun

    hat_motion = 'hb-motion.js' in s
    gesetzt = []

    for muster, rolle, stufe in KOPF:
        verboten = skriptfrei(s)
        koerper = s.index('<body')
        treffer = None
        for m in muster.finditer(s, koerper):
            if any(a <= m.start() < b for a, b in verboten):
                continue                        # steht in einer Zeichenkette
            treffer = m
            break                               # nur das erste Vorkommen: der Kopf
        if not treffer:
            continue
        ende = treffer.end()
        s = (s[:ende] + f' data-hb-motion="{rolle}" data-hb-stufe="{stufe}"' + s[ende:])
        gesetzt.append(rolle)

    if not gesetzt:
        # Kein Fehler: manche Seiten bauen ihren Kopf komplett im Skript
        # (kulinarik-rezept.html hat 318 Zeichen statisches Markup im body).
        # Angesagt wird nur, was schon dasteht — was ein Skript nachliefert,
        # bekommt kein data-hb-motion und bleibt darum sichtbar.
        return 'übersprungen: Kopf entsteht im Skript', None

    # Bestandspfad nur dort abschalten, wo es ihn nicht gibt.
    if not hat_motion and 'data-hb-regie=' not in s:
        s, n = re.subn(r'(<body\b[^>]*?)(\s*>)', r'\1 data-hb-regie="ansage"\2', s, count=1)
        if n != 1:
            return None, f'{datei}: <body> nicht gefunden'

    if s == s0:
        return None, None
    if not pruefen:
        p.write_text(s, encoding='utf-8')
    return (f'{len(gesetzt)} angesagt'
            + ('  · Bestandspfad bleibt' if hat_motion else '  · nur Ansage')), None


def main():
    pruefen = '--pruefen' in sys.argv
    ziele = [a for a in sys.argv[1:] if not a.startswith('--')] or seiten_liste()
    fehler = geaendert = 0
    for d in ziele:
        bericht, fehl = ansagen(d, pruefen)
        if fehl:
            fehler += 1
            print(f'  ✗ {fehl}')
        elif bericht:
            geaendert += 1
            print(f'  ✓ {d:<38}{bericht}')
    print(f'\n{geaendert} Seiten angesagt, {fehler} Fehler'
          + ('  (nur geprüft)' if pruefen else ''))
    return 1 if fehler else 0


if __name__ == '__main__':
    sys.exit(main())
