#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Nimmt erzeugte Rezeptbilder aus einem Ablageordner an.

    python3 tools/import_rezeptbilder.py <ordner> [--pruefen] [--umbenennen]

Prueft jede Datei gegen die Liste aus tools/gen_bildprompts.py (Name, Format,
Aufloesung, Groesse), legt sie unter web/assets/rezepte/ ab und meldet den Stand.
Ohne Ordner laeuft nur der Stand-Bericht ueber das, was schon liegt.

Bewusst ohne Bildbibliothek: PIL, ImageMagick und cwebp fehlen in dieser
Umgebung. Die Masse werden darum direkt aus dem Dateikopf gelesen; das Werkzeug
rechnet nichts um, es sagt was nicht passt und laesst die Datei liegen.
"""
import csv, os, shutil, struct, sys, unicodedata
from pathlib import Path

WURZEL = Path(__file__).resolve().parent.parent
ZIEL   = WURZEL / 'web' / 'assets' / 'rezepte'
LISTE  = ZIEL / '_dateiliste.csv'

SOLL_SEITE   = 3 / 2      # Querformat 3:2
SEITE_TOL    = 0.06       # +/- 6 % — 1600x1067 ist selbst schon 1,4995
MIN_BREITE   = 1200
MAX_BYTES    = 400 * 1024
WARN_BYTES   = 300 * 1024
ENDUNGEN     = ('.jpg', '.jpeg', '.png', '.webp')


# ---------------------------------------------------------------- Masse lesen

def masse(pfad):
    """(breite, hoehe, typ) aus dem Dateikopf oder (None, None, typ)."""
    with open(pfad, 'rb') as f:
        kopf = f.read(32)

        if kopf[:8] == b'\x89PNG\r\n\x1a\n':
            b, h = struct.unpack('>II', kopf[16:24])
            return b, h, 'png'

        if kopf[:4] == b'RIFF' and kopf[8:12] == b'WEBP':
            marke = kopf[12:16]
            if marke == b'VP8 ':
                return struct.unpack('<HH', kopf[26:30])[0] & 0x3FFF, \
                       struct.unpack('<HH', kopf[26:30])[1] & 0x3FFF, 'webp'
            if marke == b'VP8L':
                bits = struct.unpack('<I', kopf[21:25])[0]
                return (bits & 0x3FFF) + 1, ((bits >> 14) & 0x3FFF) + 1, 'webp'
            if marke == b'VP8X':
                roh = kopf[24:30]
                b = roh[0] | roh[1] << 8 | roh[2] << 16
                h = roh[3] | roh[4] << 8 | roh[5] << 16
                return b + 1, h + 1, 'webp'
            return None, None, 'webp'

        if kopf[:2] == b'\xff\xd8':
            f.seek(2)
            while True:
                byte = f.read(1)
                while byte and byte != b'\xff':      # Fuellbytes ueberspringen
                    byte = f.read(1)
                if not byte:
                    return None, None, 'jpg'
                marke = f.read(1)
                while marke == b'\xff':
                    marke = f.read(1)
                if not marke:
                    return None, None, 'jpg'
                m = marke[0]
                # SOF0..SOF15 tragen die Masse; DHT/JPG/DAC sehen gleich aus, sind es aber nicht
                if 0xC0 <= m <= 0xCF and m not in (0xC4, 0xC8, 0xCC):
                    f.read(3)                        # Laenge + Genauigkeit
                    h, b = struct.unpack('>HH', f.read(4))
                    return b, h, 'jpg'
                laenge = struct.unpack('>H', f.read(2))[0]
                f.seek(laenge - 2, os.SEEK_CUR)

    return None, None, pfad.suffix.lstrip('.').lower()


# --------------------------------------------------------------- Namensabgleich

def schluessel(name):
    """Vergleichsform: ohne Endung, ohne Akzente, nur Kleinbuchstaben und Ziffern."""
    stamm = Path(name).stem.lower()
    for trenner in ('_', ' ', '.'):
        stamm = stamm.replace(trenner, '-')
    stamm = unicodedata.normalize('NFKD', stamm)
    stamm = ''.join(z for z in stamm if not unicodedata.combining(z))
    return ''.join(z for z in stamm if z.isalnum())


def naechster(kandidat, bekannte):
    """Bester Treffer unter den erwarteten IDs — oder None, wenn es keiner ist."""
    k = schluessel(kandidat)
    if not k:
        return None
    treffer = [i for i in bekannte if schluessel(i) == k]
    if treffer:
        return treffer[0]
    # Generatoren haengen gern etwas an ("chakhchoukha-1", "chakhchoukha (2)")
    lang = sorted((i for i in bekannte if k.startswith(schluessel(i))
                   or schluessel(i).startswith(k)),
                  key=lambda i: -len(schluessel(i)))
    if lang and len(schluessel(lang[0])) >= 6:
        return lang[0]
    return None


# ------------------------------------------------------------------- Bericht

def erwartet_lesen():
    if not LISTE.exists():
        sys.exit(f'Fehlt: {LISTE.relative_to(WURZEL)} — erst tools/gen_bildprompts.py laufen lassen.')
    with open(LISTE, encoding='utf-8-sig', newline='') as f:
        return {z['id']: z for z in csv.DictReader(f)}


def stand(erwartet):
    da   = {i for i in erwartet if (ZIEL / f'{i}.jpg').exists()}
    fehlt = [i for i in erwartet if i not in da]
    n, g = len(da), len(erwartet)
    print(f'\nStand: {n}/{g} Rezeptbilder liegen bereit ({n * 100 // g if g else 0} %)')
    if fehlt:
        # nach Charge gruppiert melden, damit klar ist, was als naechstes dran ist
        offen = {}
        for i, nr in ((i, idx) for idx, i in enumerate(erwartet)):
            if i in fehlt:
                offen.setdefault(nr // 20 + 1, []).append(i)
        for charge in sorted(offen):
            liste = offen[charge]
            zeige = ', '.join(liste[:4]) + (f' … +{len(liste) - 4}' if len(liste) > 4 else '')
            print(f'  Charge {charge:02d}: {len(liste):3d} offen — {zeige}')
    else:
        print('  Vollstaendig.')
    return fehlt


# ------------------------------------------------------------------ Uebernahme

def uebernehmen(ordner, erwartet, pruefen, umbenennen):
    dateien = sorted(p for p in Path(ordner).iterdir()
                     if p.is_file() and p.suffix.lower() in ENDUNGEN)
    if not dateien:
        print(f'Keine Bilddateien in {ordner} ({", ".join(ENDUNGEN)}).')
        return

    print(f'{len(dateien)} Datei(en) in {ordner}\n')
    gut = warn = schlecht = 0

    for p in dateien:
        groesse = p.stat().st_size
        b, h, typ = masse(p)
        ziel_id = erwartet.get(p.stem, {}).get('id')
        umbenannt = False
        if not ziel_id:
            ziel_id = naechster(p.name, erwartet)
            umbenannt = bool(ziel_id)

        maengel, hinweise = [], []
        if not ziel_id:
            maengel.append('kein Rezept mit diesem Namen')
        elif umbenannt and not umbenennen:
            maengel.append(f'Name weicht ab (gemeint: {ziel_id}.jpg) — mit --umbenennen uebernehmen')
        if typ != 'jpg':
            maengel.append(f'{typ.upper()} statt JPG — die Seiten laden <id>.jpg')
        if b is None:
            maengel.append('Masse nicht lesbar (Datei unvollstaendig?)')
        else:
            if b < MIN_BREITE:
                maengel.append(f'{b}x{h} zu klein (mind. {MIN_BREITE} breit)')
            seite = b / h
            if abs(seite - SOLL_SEITE) / SOLL_SEITE > SEITE_TOL:
                maengel.append(f'Seitenverhaeltnis {seite:.2f}:1 statt 1,50:1 (3:2)')
        if groesse > MAX_BYTES:
            maengel.append(f'{groesse // 1024} KB ueber der Grenze von {MAX_BYTES // 1024} KB')
        elif groesse > WARN_BYTES:
            hinweise.append(f'{groesse // 1024} KB — ueber der Zielmarke {WARN_BYTES // 1024} KB')

        marke = '✗' if maengel else ('!' if hinweise else '✓')
        masse_txt = f'{b}x{h}' if b else '?'
        print(f'  {marke} {p.name:<46} {masse_txt:>10}  {groesse // 1024:>4} KB')
        for m in maengel + hinweise:
            print(f'      {m}')

        if maengel:
            schlecht += 1
            continue
        if hinweise:
            warn += 1
        else:
            gut += 1
        if not pruefen:
            ziel = ZIEL / f'{ziel_id}.jpg'
            ersetzt = ziel.exists()
            shutil.copy2(p, ziel)
            print(f'      → {"ersetzt" if ersetzt else "abgelegt"}: assets/rezepte/{ziel_id}.jpg')

    print(f'\n{gut} sauber · {warn} mit Hinweis · {schlecht} abgewiesen'
          + ('  (nur geprueft, nichts abgelegt)' if pruefen else ''))
    if not pruefen and (gut or warn):
        print('Danach: cd web && node ../tools/gen_sw.js')


def main():
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    pruefen    = '--pruefen' in sys.argv
    umbenennen = '--umbenennen' in sys.argv
    erwartet = erwartet_lesen()
    if args:
        ordner = Path(args[0]).expanduser()
        if not ordner.is_dir():
            sys.exit(f'Kein Ordner: {ordner}')
        uebernehmen(ordner, erwartet, pruefen, umbenennen)
    stand(erwartet)


if __name__ == '__main__':
    main()
