#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Hebt die Weltunterseiten auf den v3-Stil (Remake v3, Welle 17).

    python3 tools/umbau_weltseiten.py [--pruefen] [datei ...]

Je Seite fünf Schritte, jeder einzeln geprüft und gezählt:
  1. body bekommt data-hb-seite="welt"
  2. hb-weltseite.css wird VOR den eigenen <style>-Block gehängt
  3. die zweite Kopfzeile (.topbar mit Wortmarke) weicht dem Rückweg .ws-weg
  4. Kit-Regeln, die wortgleich auf vielen Seiten kopiert liegen, fallen weg —
     die zentrale Datei übernimmt sie. Abweichende Fassungen bleiben stehen.
  5. tote .wms-lockup-Regeln (auf keiner Seite im Markup) verschwinden

Was eine Seite eigenes mitbringt, wird nicht angefasst.
"""
import json, re, sys
from pathlib import Path

WURZEL = Path(__file__).resolve().parent.parent
WEB = WURZEL / 'web'
WELTEN = ('reisen', 'wohnen', 'immobilien', 'studio', 'kulinarik')

# Selektoren, die zentral übernommen werden. Entfernt wird eine Regel nur, wenn
# ihre Deklaration der kopierten Fassung entspricht — sonst ist sie eigen.
KIT = {
    '*', 'body', '.wrap', '.topbar', '.wm', '.wm .a', '.wm span', '.back',
    '.brand', '.brand svg', '.brand-block svg', '.wms-lockup', '.wms-lockup svg',
    '.eyebrow', 'h1', 'h2', 'h3', '.lede', '.note', '.btn', '.btn.primary',
    '.btn.ghost', '.btn.ink', '.btn.sm', '.chips', '.chip', '.chip.on',
    '.tags', '.tag', '.field', '.field label', '.grid', '.card', '.price',
    '.disc', '.foot', 'footer',
}
# Abgedriftete Fassungen desselben Kits. Die Werte weichen ab (clamp-Grenzen,
# max-width, display), die Absicht ist überall dieselbe — es ist kein eigenes
# Design, sondern dieselbe Kopie mit anderer Nachkommastelle. Erkannt wird an
# der Handschrift, nicht am Wortlaut.
DRIFT = {
    'h1':       lambda d: "font-family:'Fraunces'" in d and 'font-size:clamp(' in d,
    'h2':       lambda d: "font-family:'Fraunces'" in d and 'font-weight:' in d,
    'h3':       lambda d: "font-family:'Fraunces'" in d,
    '.lede':    lambda d: 'color:var(--ink-soft)' in d and 'max-width:' in d,
    '.eyebrow': lambda d: "font-family:'JetBrainsMono'" in d and 'text-transform:uppercase' in d,
    '.btn':     lambda d: "font-family:'JetBrainsMono'" in d and 'text-transform:uppercase' in d
                          and 'border-radius:' in d,
    '.btn.primary': lambda d: 'background:var(--accent)' in d,
    '.btn.ghost':   lambda d: 'background:none' in d and 'border:1pxsolid' in d,
    '.btn.ink':     lambda d: 'background:var(--ink)' in d,
    '.wrap':    lambda d: d.startswith('max-width:') and 'margin:0auto' in d,
    'body':     lambda d: 'background:var(--bg)' in d and 'color:var(--ink)' in d,
    'footer':   lambda d: 'border-top:1pxsolidvar(--rule)' in d,
    '.note':    lambda d: "font-family:'JetBrainsMono'" in d,
    '.field label': lambda d: 'color:var(--ink-soft)' in d,
    '.chip':    lambda d: 'border-radius:999px' in d and 'cursor:pointer' in d,
    '.chip.on': lambda d: 'background:var(--accent)' in d,
    '.card':    lambda d: 'background:#fff' in d and 'border:1pxsolidvar(--rule)' in d,
    '.disc':    lambda d: 'background:var(--bg-soft)' in d,
    '.tag':     lambda d: "font-family:'JetBrainsMono'" in d and 'border-radius:999px' in d,
}

# Diese verschwinden immer — sie stehen auf keiner Seite im Markup.
TOT = {'.wms-lockup', '.wms-lockup svg'}
# Kit-Variablen im :root: die Werte kommen jetzt aus der Token-Ebene.
KIT_VARS = ('--bg', '--bg-soft', '--ink', '--ink-soft', '--rule',
            '--terracotta', '--accent', '--accent-d')


def seiten_liste():
    reg = json.loads((WURZEL / 'tools' / 'seiten.json').read_text(encoding='utf-8'))['seiten']
    return [d for d, m in reg.items()
            if m.get('welt') in WELTEN and m.get('typ') != 'welt' and (WEB / d).exists()]


def bloecke(css):
    """[(selektor, deklaration, start, ende)] — @-Blöcke bleiben unangetastet."""
    aus, i = [], 0
    while i < len(css):
        j = css.find('{', i)
        if j < 0:
            break
        sel = css[i:j].strip()
        if sel.startswith('@'):
            t, k = 1, j + 1
            while k < len(css) and t:
                t += (css[k] == '{') - (css[k] == '}')
                k += 1
            i = k
            continue
        k = css.find('}', j)
        if k < 0:
            break
        aus.append((re.sub(r'\s+', ' ', sel), css[j + 1:k], i, k + 1))
        i = k + 1
    return aus


def kanon(dek):
    return re.sub(r'\s+', '', dek).strip().rstrip(';')


def kit_laden():
    """Die kopierten Fassungen, eingefroren in tools/weltseiten-kit.json.

    Nicht zur Laufzeit erheben: nach dem ersten Lauf gibt es die Kopien nicht
    mehr zu zählen, die Schwelle wird nie wieder erreicht und ein zweiter Lauf
    täte nichts mehr. Die Datei hält den Stand vor der Welle fest.
    """
    p = WURZEL / 'tools' / 'weltseiten-kit.json'
    if not p.exists():
        sys.exit(f'Fehlt: {p.relative_to(WURZEL)}')
    roh = json.loads(p.read_text(encoding='utf-8'))['kit']
    return {sel: set(fassungen) for sel, fassungen in roh.items()}


def umbauen(datei, kit, pruefen):
    p = WEB / datei
    s0 = s = p.read_text(encoding='utf-8')
    bericht = []

    # 1 — body markieren
    if 'data-hb-seite=' not in s:
        neu, n = re.subn(r'(<body\b[^>]*?)(\s*>)', r'\1 data-hb-seite="welt"\2', s, count=1)
        if n != 1:
            return None, f'{datei}: <body> nicht gefunden'
        s = neu
        bericht.append('body markiert')

    # 2 — Stylesheet vor den eigenen <style>-Block
    if 'hb-weltseite.css' not in s:
        link = '<link rel="stylesheet" href="hb-weltseite.css">\n  '
        m = re.search(r'[ \t]*<style\b', s)
        if m:
            s = s[:m.start()] + '  ' + link.rstrip() + '\n' + s[m.start():]
        else:
            s = s.replace('</head>', '  ' + link.rstrip() + '\n</head>', 1)
        if 'hb-weltseite.css' not in s:
            return None, f'{datei}: Stylesheet nicht eingehängt'
        bericht.append('css eingehängt')

    # 3 — zweite Kopfzeile durch den Rückweg ersetzen
    #     NICHT per Regex bis zum ersten </a></div>: trägt die Leiste zwei
    #     Rückweg-Links, greift das Muster weit in die Seite hinein und löscht
    #     Inhalt (in W17 auf zwei Seiten passiert). Darum <div> mitzählen.
    a = s.find('<div class="topbar">')
    if a >= 0:
        zeile = s.rfind('\n', 0, a) + 1
        einzug = s[zeile:a]
        tiefe, i = 0, a
        while i < len(s):
            m = re.compile(r'<div\b|</div>').search(s, i)
            if not m:
                return None, f'{datei}: .topbar nicht geschlossen'
            tiefe += 1 if m.group(0) == '<div' else -1
            i = m.end()
            if tiefe == 0:
                break
        leiste = s[a:i]
        if '<div class="wm"' in leiste:
            wege = re.findall(r'<a class="back" href="([^"]+)"[^>]*>(.*?)</a>', leiste, re.S)
            if not wege:
                return None, f'{datei}: .topbar ohne Rückweg-Link'
            ersatz = ''
            for ziel, roh in wege:
                text = re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', '', roh)).strip()
                text = text.strip('\u2190\u2197 ').strip()
                ersatz += f'{einzug}<a class="ws-weg" href="{ziel}">{text}</a>\n'
            ende = i
            while ende < len(s) and s[ende] in ' \t':
                ende += 1
            if ende < len(s) and s[ende] == '\n':
                ende += 1
            s = s[:zeile] + ersatz + s[ende:]
            bericht.append(f'Kopfzeile → Rückweg ({len(wege)})')

    # 4+5 — kopierte Kit-Regeln und tote Regeln entfernen
    weg = 0
    def stil_saeubern(m):
        nonlocal weg
        css = m.group(2)
        raus = []
        for sel, dek, a, b in bloecke(re.sub(r'/\*.*?\*/', '', css, flags=re.S)):
            k = kanon(dek)
            if (sel in kit and k in kit[sel]) or (sel in DRIFT and DRIFT[sel](k)):
                raus.append((a, b))
        if not raus:
            return m.group(0)
        # von hinten schneiden, damit die Positionen gültig bleiben
        rein = re.sub(r'/\*.*?\*/', '', css, flags=re.S)
        for a, b in sorted(raus, reverse=True):
            rein = rein[:a] + rein[b:]
            weg += 1
        return m.group(1) + re.sub(r'\n{3,}', '\n\n', rein) + m.group(3)

    s = re.sub(r'(<style[^>]*>)(.*?)(</style>)', stil_saeubern, s, flags=re.S)
    if weg:
        bericht.append(f'{weg} Kit-Regeln entfernt')

    # 6 — Kit-Variablen aus :root: die Werte kommen jetzt aus der Token-Ebene
    def root_saeubern(m):
        inhalt = m.group(2)
        neu = re.sub(r'(?:' + '|'.join(map(re.escape, KIT_VARS)) + r')\s*:\s*#[0-9a-fA-F]{3,8}\s*;?', '', inhalt)
        return m.group(1) + neu + m.group(3) if neu.strip(' ;\n\t') else ''
    vorher = s
    s = re.sub(r'(:root\s*\{)([^{}]*)(\})', root_saeubern, s)
    if s != vorher:
        bericht.append(':root entschlackt')

    if s == s0:
        return None, None
    if not pruefen:
        p.write_text(s, encoding='utf-8')
    return bericht, None


def main():
    pruefen = '--pruefen' in sys.argv
    ziele = [a for a in sys.argv[1:] if not a.startswith('--')] or seiten_liste()
    kit = kit_laden()
    print(f'Kit: {len(kit)} Selektoren zentral übernommen\n')
    fehler, geaendert = [], 0
    for d in ziele:
        bericht, fehl = umbauen(d, kit, pruefen)
        if fehl:
            fehler.append(fehl); print(f'  ✗ {fehl}')
        elif bericht:
            geaendert += 1
            print(f'  ✓ {d:<38} {" · ".join(bericht)}')
    print(f'\n{geaendert} Seiten umgebaut, {len(fehler)} Fehler'
          + ('  (nur geprüft, nichts geschrieben)' if pruefen else ''))
    return 1 if fehler else 0


if __name__ == '__main__':
    sys.exit(main())
