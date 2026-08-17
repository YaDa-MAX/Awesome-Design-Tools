#!/usr/bin/env python3
"""HeiBen Remake v3 — Substanz-Audit über web/.

Misst die Kennzahlen der Blaupause v3 (REMAKE-KONZEPT-V3.md) reproduzierbar,
damit jede Welle ihren Fortschritt belegen kann.

Aufruf:  cd web && python3 ../tools/audit_v3.py
         python3 tools/audit_v3.py web        (aus dem Projekt-Root)
"""
import glob
import hashlib
import os
import re
import sys
from collections import defaultdict

WELTFARBEN = {
    "reisen": "a97a1d", "wohnen": "4a5c39", "immobilien": "792d29",
    "studio": "1f1c17", "kulinarik": "6b3951",
}
KOPF_MERKMALE = {
    "description": r'<meta[^>]+name="description"',
    "og:*": r'property="og:',
    "JSON-LD": r'application/ld\+json',
    "canonical": r'rel="canonical"',
    "theme-color": r'name="theme-color"',
    "manifest": r'rel="manifest"',
}
KOPF_SKRIPTE = {
    "heiben-design.css": "heiben-design.css",
    "heiben-nav.js": "heiben-nav.js",
    "heiben-legal.js": "heiben-legal.js",
    "SW-Registrierung": "serviceWorker",
}
RE_STYLE = re.compile(r"<style[^>]*>(.*?)</style>", re.S)
RE_INLINE_JS = re.compile(r"<script(?![^>]*\bsrc=)[^>]*>(.*?)</script>", re.S)
RE_BASE64 = re.compile(r"base64,([A-Za-z0-9+/=]+)")
RE_HREF = re.compile(r'href="([^"#?][^"]*?)"')
RE_SRC = re.compile(r'<script[^>]+src="([^"]+)"')
RE_CSSLINK = re.compile(r'<link[^>]+href="([^"]+\.css)"')


def kb(n):
    return f"{n / 1024:,.0f} KB".replace(",", ".")


def titel(t):
    print(f"\n\033[1m{t}\033[0m" if sys.stdout.isatty() else f"\n{t}")
    print("-" * len(t))


def lade(seiten):
    return {f: open(f, encoding="utf-8").read() for f in seiten}


def gewicht(txt):
    titel("1. GEWICHT & REDUNDANZ")
    gesamt = sum(len(s) for s in txt.values())
    style = inline = b64 = 0
    for s in txt.values():
        style += sum(len(m) for m in RE_STYLE.findall(s))
        inline += sum(len(m) for m in RE_INLINE_JS.findall(s))
        b64 += sum(len(m) for m in RE_BASE64.findall(s))
    print(f"HTML gesamt            {kb(gesamt):>12}  ({len(txt)} Seiten, "
          f"Ø {kb(gesamt / max(1, len(txt)))})")
    print(f"davon inline <style>   {kb(style):>12}  ({style / gesamt:.1%})")
    print(f"davon inline <script>  {kb(inline):>12}  ({inline / gesamt:.1%})")
    print(f"davon base64-Bilder    {kb(b64):>12}  ({b64 / gesamt:.1%})")

    bloecke = defaultdict(list)
    for f, s in txt.items():
        for art, rx in (("CSS", RE_STYLE), ("JS", RE_INLINE_JS)):
            for m in rx.findall(s):
                if len(m) > 400:
                    bloecke[(art, hashlib.md5(m.encode()).hexdigest(), len(m))].append(f)
    dups = [(k, v) for k, v in bloecke.items() if len(v) > 1]
    dups.sort(key=lambda kv: -kv[0][2] * (len(kv[1]) - 1))
    verschnitt = sum(k[2] * (len(v) - 1) for k, v in dups)
    print(f"\nByte-identische Bloecke (>400 B) mehrfach: {len(dups)}")
    print(f"Vermeidbar durch Auslagern: {kb(verschnitt)} ({verschnitt / gesamt:.1%} des HTML)")
    print(f"Vermeidbar inkl. base64:    {kb(verschnitt + b64)} "
          f"({(verschnitt + b64) / gesamt:.1%})")
    for k, v in dups[:5]:
        print(f"  {k[0]:>3} {kb(k[2]):>9} x{len(v):>3} Seiten -> "
              f"{kb(k[2] * (len(v) - 1)):>9}   z.B. {v[0]}")
    return verschnitt + b64


def kopf(txt):
    titel("2. DOKUMENTKOPF (Vollstaendigkeit ueber alle Seiten)")
    n = len(txt)
    for name, pat in KOPF_MERKMALE.items():
        rx = re.compile(pat, re.I)
        t = sum(1 for s in txt.values() if rx.search(s))
        print(f"{name:<18}{t:>4} / {n}   {'OK' if t == n else 'LUECKE'}")
    for name, marker in KOPF_SKRIPTE.items():
        t = sum(1 for s in txt.values() if marker in s)
        print(f"{name:<18}{t:>4} / {n}   {'OK' if t == n else 'LUECKE'}")


def auffindbarkeit(txt):
    titel("3. AUFFINDBARKEIT")
    seiten = set(txt)
    eingehend = defaultdict(set)
    kaputt = []
    for f, s in txt.items():
        for h in RE_HREF.findall(s):
            if h.startswith(("http", "mailto:", "tel:", "//", "javascript:", "data:")):
                continue
            t = h.split("#")[0].split("?")[0]
            if not t.endswith(".html"):
                continue
            if t in seiten:
                eingehend[t].add(f)
            elif "+" not in t:
                kaputt.append((f, t))
    waisen = sorted(p for p in seiten if not eingehend[p] and p != "index.html")
    print(f"Kaputte interne Links: {len(kaputt)}")
    for f, t in kaputt:
        print(f"  {f} -> {t}")
    print(f"Verwaiste Seiten (kein eingehender Link im Markup): {len(waisen)}")
    for w in waisen:
        print(f"  {w}")
    if os.path.exists("suche-index.js"):
        s = open("suche-index.js", encoding="utf-8").read()
        ziele = {m.split("?")[0].split("#")[0] for m in re.findall(r'"u":"([^"]+)"', s)}
        ziele = {z for z in ziele if z.endswith(".html")}
        print(f"\nSuchindex: {len(re.findall(chr(34) + 'u' + chr(34) + ':', s))} Eintraege "
              f"auf {len(ziele)} Zielseiten -> {len(seiten - ziele)} Seiten nicht auffindbar")
    return waisen


def offline(txt):
    titel("4. OFFLINE-VERSPRECHEN (Service-Worker-Precache)")
    if not os.path.exists("service-worker.js"):
        print("service-worker.js fehlt")
        return []
    s = open("service-worker.js", encoding="utf-8").read()
    ver = re.search(r"heiben-v[0-9]+-[0-9]+", s)
    kopfteil = s[: s.index("];")] if "];" in s else s
    pre = {x for x in re.findall(r'"([^"]+)"', kopfteil) if x.endswith(".html")}
    fehlt = sorted(set(txt) - pre)
    print(f"Cache-Version: {ver.group(0) if ver else '?'}")
    print(f"Precached HTML: {len(pre)} / {len(txt)}   nicht precached: {len(fehlt)}")
    for f in fehlt:
        print(f"  {f}")
    return fehlt


def datenschicht(txt):
    titel("5. DATENSCHICHT (localStorage)")
    keys = set()
    for s in list(txt.values()) + [open(j, encoding="utf-8").read() for j in glob.glob("*.js")]:
        keys |= set(re.findall(r"['\"](heiben[-_][a-z0-9_-]{2,})['\"]", s))
    keys = {k for k in keys if not re.match(r"heiben-v[0-9]{8}", k)}
    strich = sorted(k for k in keys if k.startswith("heiben-"))
    unter = sorted(k for k in keys if k.startswith("heiben_"))
    print(f"Distinkte Schluessel gesamt: {len(keys)}")
    print(f"  Schema 'heiben-...' : {len(strich)}")
    print(f"  Schema 'heiben_..._v1': {len(unter)}")
    print("  -> zwei konkurrierende Namensschemata, kein zentrales Register")
    if os.path.exists("mein-heiben.html"):
        d = set(re.findall(r"['\"](heiben[-_][a-z0-9_-]{2,})['\"]", txt["mein-heiben.html"]))
        print(f"mein-heiben.html liest {len(d)} davon: {', '.join(sorted(d))}")
    return keys


def kanon(txt):
    titel("6. KANON vs. PRAXIS (Weltfarben)")
    alle = dict(txt)
    for j in glob.glob("*.js") + glob.glob("*.css"):
        alle[j] = open(j, encoding="utf-8").read()
    n_reg = sum(1 for s in txt.values() if "heiben-firmierungen.js" in s)
    print(f"heiben-firmierungen.js (kanonische Registry) eingebunden auf "
          f"{n_reg} / {len(txt)} Seiten")
    for welt, hexv in WELTFARBEN.items():
        rx = re.compile("#" + hexv, re.I)
        dateien = sum(1 for s in alle.values() if rx.search(s))
        vork = sum(len(rx.findall(s)) for s in alle.values())
        print(f"  {welt:<11}#{hexv}  hart kodiert in {dateien:>3} Dateien / {vork:>4} Vorkommen")


def gewichtung(txt):
    titel("7. GEWICHTUNG DER WELTEN (Seiten je data-hb-welt)")
    z = defaultdict(int)
    for s in txt.values():
        m = re.search(r'data-hb-welt="([a-z]+)"', s)
        z[m.group(1) if m else "(ohne)"] += 1
    ges = sum(z.values())
    for w, n in sorted(z.items(), key=lambda x: -x[1]):
        print(f"  {w:<12}{n:>4}  {'#' * n}  {n / ges:.0%}")
    operativ = sum(z[w] for w in WELTFARBEN)
    print(f"\n  fuenf operative Welten zusammen: {operativ} / {ges} ({operativ / ges:.0%})")


def ladelast(txt):
    titel("8. LADELAST DER EINSTIEGSSEITEN (statische Nutzlast)")
    proben = ["index.html", "startseite-neu.html", "mein-heiben.html", "wissen.html",
              "kulinarik.html", "wohnen-konfigurator.html", "lebensmittel.html"]
    for p in proben:
        if p not in txt:
            continue
        s = txt[p]
        tot = len(s)
        teile = [(p, len(s))]
        for src in RE_SRC.findall(s) + RE_CSSLINK.findall(s):
            f = src.split("?")[0]
            if os.path.exists(f):
                tot += os.path.getsize(f)
                teile.append((f, os.path.getsize(f)))
        gross = " · ".join(f"{n}={v // 1024}K" for n, v in sorted(teile, key=lambda x: -x[1])[:3])
        print(f"  {p:<26}{kb(tot):>10}   {gross}")


def main():
    ziel = sys.argv[1] if len(sys.argv) > 1 else "."
    if os.path.isdir(ziel):
        os.chdir(ziel)
    seiten = sorted(glob.glob("*.html"))
    if not seiten:
        sys.exit("Keine HTML-Seiten gefunden — bitte in web/ ausfuehren.")
    txt = lade(seiten)
    print("HeiBen Substanz-Audit v3 — Verzeichnis:", os.getcwd())
    gewicht(txt)
    kopf(txt)
    auffindbarkeit(txt)
    offline(txt)
    datenschicht(txt)
    kanon(txt)
    gewichtung(txt)
    ladelast(txt)
    print("\nFertig. Bezugsdokument: REMAKE-KONZEPT-V3.md")


if __name__ == "__main__":
    main()
