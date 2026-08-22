#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Entfernt CSS-Regeln für Klassen, die auf der Seite gar nicht vorkommen.

    python3 tools/totes_css.py [--pruefen] [--nur klasse,klasse]

Geprüft wird je Seite und je Klasse: steht sie im Markup (ausserhalb von
<script>/<style>), oder baut ein Skript sie zur Laufzeit? Nur wenn beides
verneint ist, fällt die Regel.

Anlass: Welle 18 hat den kopierten Fussbereich von 33 Seiten entfernt. Die
Regeln für .brand-block, .brand und .wms-lockup blieben dabei stehen und
beschreiben seither Markup, das es nicht mehr gibt.
"""
import re, sys
from pathlib import Path

WURZEL = Path(__file__).resolve().parent.parent
WEB = WURZEL / 'web'
sys.path.insert(0, str(WURZEL / 'tools'))
from umbau_weltseiten import bloecke  # noqa: E402

VERDAECHTIG = ['brand', 'brand-block', 'wms-lockup']


def genutzt(text, klasse):
    """Kommt die Klasse im Markup vor — oder erzeugt ein Skript sie?"""
    markup = re.sub(r'<(script|style)\b.*?</\1>', '', text, flags=re.S)
    if re.search(r'class="[^"]*\b' + re.escape(klasse) + r'\b', markup):
        return True
    # Skripte bauen Klassen als Zeichenkette: className='brand', class=\"brand\"
    for js in re.findall(r'<script(?![^>]*\bsrc=)[^>]*>(.*?)</script>', text, re.S):
        if re.search(r'[\'"\\]' + re.escape(klasse) + r'[\'"\\ ]', js):
            return True
    return False


def main():
    pruefen = '--pruefen' in sys.argv
    nur = None
    for i, a in enumerate(sys.argv):
        if a == '--nur' and i + 1 < len(sys.argv):
            nur = sys.argv[i + 1].split(',')
    klassen = nur or VERDAECHTIG

    gesamt_regeln = gesamt_zeichen = 0
    for p in sorted(WEB.glob('*.html')):
        s0 = s = p.read_text(encoding='utf-8')
        tot = [k for k in klassen if not genutzt(s, k)]
        if not tot:
            continue
        weg = []

        def saeubern(m):
            rein = re.sub(r'/\*.*?\*/', '', m.group(2), flags=re.S)
            raus = []
            for sel, dek, a, b in bloecke(rein):
                # nur Regeln, die AUSSCHLIESSLICH tote Klassen ansprechen
                teile = [t.strip() for t in sel.split(',')]
                if teile and all(any(re.search(r'\.' + re.escape(k) + r'\b', t) for k in tot)
                                 for t in teile):
                    raus.append((a, b, sel, b - a))
            for a, b, sel, n in sorted(raus, reverse=True):
                rein = rein[:a] + rein[b:]
                weg.append((sel, n))
            return m.group(1) + re.sub(r'\n{3,}', '\n\n', rein) + m.group(3)

        s = re.sub(r'(<style[^>]*>)(.*?)(</style>)', saeubern, s, flags=re.S)
        # Ohne entfernte Regel bleibt die Datei unberuehrt: das Einebnen der
        # Leerzeilen allein ist kein Grund, eine Seite anzufassen.
        if not weg or s == s0:
            continue
        gesamt_regeln += len(weg)
        gesamt_zeichen += sum(n for _, n in weg)
        print(f'  ✓ {p.name:<36}{len(weg)} tote Regeln ({sum(n for _, n in weg)} Z): '
              + ', '.join(sel for sel, _ in weg[:3]) + ('…' if len(weg) > 3 else ''))
        if not pruefen:
            p.write_text(s, encoding='utf-8')

    print(f'\n{gesamt_regeln} tote Regeln entfernt, {gesamt_zeichen // 1024} KB'
          + ('  (nur geprüft)' if pruefen else ''))


if __name__ == '__main__':
    main()
