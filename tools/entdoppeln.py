#!/usr/bin/env python3
"""HeiBen Remake v3 · Welle 1 — Entdoppelung (E2) und Bilder als Dateien (E3).

Zieht mehrfach abgelegte <style>/<script>-Bloecke in gemeinsame Dateien und
ersetzt base64-Bilder durch die bereits vorhandenen Dateien in assets/.

Grundsatz: die Welle ist UNSICHTBAR. Ersetzt wird nur, was byte-identisch ist —
CSS/JS-Bloecke werden wortgleich ausgelagert, Bilder nur bei md5-Gleichheit mit
einer Datei in assets/. Einzige bewusste Ausnahme: MERGE_BESTAND (siehe unten).

Aufruf:  cd web && python3 ../tools/entdoppeln.py --pruefen     (nur Bericht)
         cd web && python3 ../tools/entdoppeln.py --anwenden
"""
import base64
import glob
import hashlib
import os
import re
import sys

# md5-Praefix des Blocks -> Zieldatei. Nur was hier steht, wird angefasst.
CSS_BLOECKE = {
    "ba6b26a6": "styles.css",          # 46,7K x11 — neuester Stand (5 Welten)
    "e401824d": "styles.css",          # 46,7K x11 — MERGE, siehe MERGE_BESTAND
    "690b1c10": "styles.css",          # 46,7K x 7 — MERGE, siehe MERGE_BESTAND
    "6d94645a": "hb-bestand-redaktion.css",  # 37,7K x 2
    "84bc6277": "hb-bestand-statisch.css",   # 12,2K x 6
    "1fb5f93c": "hb-weltmosaik.css",         # 2,7K x 8
    "97d525ed": "hb-menue.css",              # 1,4K x34
    "2305faf6": "hb-motion.css",             # 0,5K x46
}
JS_BLOECKE = {
    "612a2155": "hb-pwa.js",                 # 3,5K x42 — SW-Registrierung + Installhinweis
    "ede59278": "hb-suche-nav.js",           # 4,8K x25
    "911b90ac": "hb-kulinarik-core.js",      # 21,2K x 5
    "3c1d5cc0": "hb-schaufenster-core.js",   # 12,3K x 3
    "10b03a12": "hb-magazin-core.js",        # 11,3K x 3
    "0d71329d": "hb-anfrage-core.js",        # 11,3K x 3
    "781b408a": "hb-anfrage-app.js",         # 9,4K x 3
    "7b07b145": "hb-motion.js",              # 1,2K x37
}

# Die drei 46-KB-Bloecke sind auseinandergedriftete Kopien EINES Stylesheets.
# Unterschiede (geprueft): .cross-grid.quad repeat(4) vs repeat(5) und die Regel
# .cross-card.kulinarik. Beide Selektoren kommen im Markup AUSSCHLIESSLICH in
# familie.html vor — und familie.html traegt bereits ba6b26a6. Die Zusammen-
# fuehrung auf ba6b26a6 ist damit fuer jede Seite ergebnisgleich.
MERGE_BESTAND = "ba6b26a6"

RE_STYLE = re.compile(r"<style([^>]*)>(.*?)</style>", re.S)
RE_SCRIPT = re.compile(r"<script((?![^>]*\bsrc=)[^>]*)>(.*?)</script>", re.S)
RE_DATAURI = re.compile(r"data:image/(?:png|jpeg|jpg|svg\+xml|webp);base64,[A-Za-z0-9+/=]+")


def h8(text):
    return hashlib.md5(text.encode("utf-8")).hexdigest()[:8]


def asset_register():
    reg = {}
    for p in sorted(glob.glob("assets/*")):
        if os.path.isfile(p):
            reg[hashlib.md5(open(p, "rb").read()).hexdigest()] = p
    return reg


def bloecke_sammeln(seiten):
    """Sammelt Blockinhalte und Trefferzahl je Zieldatei."""
    inhalte, seitenzahl = {}, {}
    for f in seiten:
        s = open(f, encoding="utf-8").read()
        getroffen = set()
        for tabelle, treffer in ((CSS_BLOECKE, RE_STYLE.findall(s)),
                                 (JS_BLOECKE, RE_SCRIPT.findall(s))):
            for _, blk in treffer:
                marke = h8(blk)
                ziel = tabelle.get(marke)
                if not ziel:
                    continue
                # Beim gemergten Bestand gewinnt immer die Leitfassung.
                if ziel not in inhalte or marke == MERGE_BESTAND:
                    inhalte[ziel] = blk
                getroffen.add(ziel)
        for ziel in getroffen:
            seitenzahl[ziel] = seitenzahl.get(ziel, 0) + 1
    return inhalte, seitenzahl


def seite_umbauen(s, assets, zaehler):
    """Ersetzt Bloecke und base64-Bilder in einer Seite. Gibt neuen Text zurueck."""
    def css_ersatz(m):
        ziel = CSS_BLOECKE.get(h8(m.group(2)))
        if not ziel:
            return m.group(0)
        zaehler["css"] += 1
        zaehler["bytes"] += len(m.group(0))
        return '<link rel="stylesheet" href="%s">' % ziel

    def js_ersatz(m):
        ziel = JS_BLOECKE.get(h8(m.group(2)))
        if not ziel:
            return m.group(0)
        zaehler["js"] += 1
        zaehler["bytes"] += len(m.group(0))
        attrs = m.group(1).strip()
        return '<script %ssrc="%s"></script>' % (attrs + " " if attrs else "", ziel)

    def bild_ersatz(m):
        uri = m.group(0)
        b64 = uri.split("base64,", 1)[1]
        try:
            roh = base64.b64decode(b64)
        except Exception:
            return uri
        pfad = assets.get(hashlib.md5(roh).hexdigest())
        if not pfad:
            zaehler["bild_ohne_datei"] += 1
            return uri
        zaehler["bild"] += 1
        zaehler["bytes"] += len(uri) - len(pfad)
        return pfad

    s = RE_STYLE.sub(css_ersatz, s)
    s = RE_SCRIPT.sub(js_ersatz, s)
    s = RE_DATAURI.sub(bild_ersatz, s)
    return s


def main():
    anwenden = "--anwenden" in sys.argv
    seiten = sorted(glob.glob("*.html"))
    if not seiten:
        sys.exit("Keine HTML-Seiten gefunden — bitte in web/ ausfuehren.")
    assets = asset_register()
    vorher = sum(os.path.getsize(f) for f in seiten)

    inhalte, seitenzahl = bloecke_sammeln(seiten)
    fehlend = (set(CSS_BLOECKE.values()) | set(JS_BLOECKE.values())) - set(inhalte)
    if fehlend:
        print("Hinweis: bereits ausgelagert oder nicht gefunden:", ", ".join(sorted(fehlend)))

    if anwenden:
        kopf = ("/* HeiBen — ausgelagert aus %d Seiten (Remake v3, Welle 1).\n"
                "   Inhalt wortgleich uebernommen, nicht ueberarbeitet. */\n")
        for ziel, blk in sorted(inhalte.items()):
            open(ziel, "w", encoding="utf-8").write(
                (kopf % seitenzahl.get(ziel, 0)) + blk.strip() + "\n")
            print(f"  geschrieben: {ziel:<28} {os.path.getsize(ziel)/1024:6.1f} KB "
                  f"(aus {seitenzahl.get(ziel, 0)} Seiten)")

    z = {"css": 0, "js": 0, "bild": 0, "bild_ohne_datei": 0, "bytes": 0}
    geaendert = []
    for f in seiten:
        s = open(f, encoding="utf-8").read()
        neu = seite_umbauen(s, assets, z)
        if neu != s:
            geaendert.append(f)
            if anwenden:
                open(f, "w", encoding="utf-8").write(neu)

    nachher = sum(os.path.getsize(f) for f in seiten) if anwenden else vorher - z["bytes"]
    print(f"\n{'ANGEWENDET' if anwenden else 'PRUEFLAUF (nichts geschrieben)'}")
    print(f"  Seiten veraendert:      {len(geaendert)} / {len(seiten)}")
    print(f"  CSS-Bloecke ersetzt:    {z['css']}")
    print(f"  JS-Bloecke ersetzt:     {z['js']}")
    print(f"  base64-Bilder ersetzt:  {z['bild']}  (ohne passende Datei: {z['bild_ohne_datei']})")
    print(f"  HTML {vorher/1048576:.2f} MB -> {nachher/1048576:.2f} MB "
          f"(-{(vorher-nachher)/1024:.0f} KB, -{(vorher-nachher)/vorher:.1%})")
    if anwenden:
        print("\nNICHT VERGESSEN: neue Dateien in den SW-Precache aufnehmen und "
              "die Cache-Version bumpen.")


if __name__ == "__main__":
    main()
