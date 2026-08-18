#!/usr/bin/env python3
"""HeiBen Remake v3 — Substanz-Audit über web/.

Misst die Kennzahlen der Blaupause v3 (REMAKE-KONZEPT-V3.md) reproduzierbar,
damit jede Welle ihren Fortschritt belegen kann.

Aufruf:  cd web && python3 ../tools/audit_v3.py
         python3 tools/audit_v3.py web        (aus dem Projekt-Root)
"""
import glob
import hashlib
import json
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
    "heiben-design.css": ("heiben-design.css",),
    "heiben-nav.js": ("heiben-nav.js",),
    "heiben-legal.js": ("heiben-legal.js",),
    # Seit v3-W1 liegt die Registrierung in hb-pwa.js statt inline im Markup.
    "SW-Registrierung": ("serviceWorker", "hb-pwa.js"),
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


def registry():
    """tools/seiten.json, falls vorhanden — liefert die bewussten Ausnahmen."""
    for p in ("../tools/seiten.json", "tools/seiten.json"):
        if os.path.exists(p):
            return json.load(open(p, encoding="utf-8")).get("seiten", {})
    return {}


def kopf(txt):
    titel("2. DOKUMENTKOPF (Vollstaendigkeit ueber alle Seiten)")
    reg = registry()
    standalone = {f for f, e in reg.items() if e.get("typ") == "standalone"}
    intern = {f for f, e in reg.items() if e.get("typ") == "intern"}
    ohne_nav = {f for f, e in reg.items() if e.get("nav") is False}
    pflicht = {f: s for f, s in txt.items() if f not in standalone}
    n = len(pflicht)
    if standalone:
        print(f"(ausgenommen: {len(standalone)} Standalone-Entwurf — "
              f"{', '.join(sorted(standalone))})")

    def zeile(name, treffer, soll, hinweis=""):
        fehlt = sorted(soll - treffer)
        stand = "OK" if not fehlt else "LUECKE"
        print(f"{name:<18}{len(treffer & soll):>4} / {len(soll)}   {stand}"
              + (f"   {hinweis}" if hinweis else "")
              + ("" if not fehlt else "   fehlt: " + ", ".join(fehlt[:4])
                 + (" …" if len(fehlt) > 4 else "")))

    alle = set(pflicht)
    for name, pat in KOPF_MERKMALE.items():
        rx = re.compile(pat, re.I)
        treffer = {f for f, s in pflicht.items() if rx.search(s)}
        soll = alle
        hinweis = ""
        if name == "JSON-LD":
            soll = alle - intern
            hinweis = f"(ohne {len(intern)} interne Seiten)"
        zeile(name, treffer, soll, hinweis)
    for name, marker in KOPF_SKRIPTE.items():
        treffer = {f for f, s in pflicht.items() if any(m in s for m in marker)}
        soll = alle - ohne_nav if name == "heiben-nav.js" else alle
        hinweis = f"(ohne {', '.join(sorted(ohne_nav))})" if name == "heiben-nav.js" and ohne_nav else ""
        zeile(name, treffer, soll, hinweis)
    if intern:
        noindex = {f for f in intern if re.search(r'name="robots"[^>]*noindex', pflicht.get(f, ""))}
        zeile("noindex (intern)", noindex, intern)


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
    # Nicht jeder Weg zu einer Seite steht im Markup: die Navigation (heiben-nav.js)
    # und das Werkzeug-Register (heiben-werkzeuge.js, gerendert von hb-werkzeuge.js)
    # erzeugen ihre Links zur Laufzeit. Wer das ignoriert, misst falsch.
    erzeugt = {}
    if os.path.exists("heiben-nav.js"):
        js = open("heiben-nav.js", encoding="utf-8").read()
        for z in re.findall(r'u:\s*"([a-z0-9-]+\.html)"', js):
            erzeugt.setdefault(z, set()).add("heiben-nav.js")
    if os.path.exists("heiben-werkzeuge.js") and any(
            "data-hb-werkzeuge" in t for t in txt.values()):
        js = open("heiben-werkzeuge.js", encoding="utf-8").read()
        for z in re.findall(r'"u":"([a-z0-9-]+\.html)"', js):
            erzeugt.setdefault(z, set()).add("Werkzeug-Register")
    for z, q in erzeugt.items():
        if z in seiten:
            eingehend[z] |= q

    waisen = sorted(p for p in seiten if not eingehend[p] and p != "index.html")
    print(f"Kaputte interne Links: {len(kaputt)}")
    print(f"Zur Laufzeit erzeugte Wege: {len(erzeugt)} Ziele "
          f"({', '.join(sorted({q for qs in erzeugt.values() for q in qs}))})")
    for f, t in kaputt:
        print(f"  {f} -> {t}")
    print(f"Verwaiste Seiten (kein Weg dorthin, weder im Markup noch erzeugt): {len(waisen)}")
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



def designebene(txt):
    titel("9. DESIGNEBENE (Fragmentierung der Gestaltung)")
    quellen = []
    for f in sorted(glob.glob("*.css")):
        quellen.append((f, open(f, encoding="utf-8").read()))
    for f, s in txt.items():
        for m in RE_STYLE.findall(s):
            quellen.append((f, m))
    alles = "\n".join(c for _, c in quellen)

    def n(rx, wandel=lambda x: x):
        return len({wandel(m) for m in re.findall(rx, alles, re.I)}), \
               len(re.findall(rx, alles, re.I))

    zeilen = [
        ("Hex-Farben", n(r"#[0-9a-f]{3,8}\b", str.lower)),
        ("rgb/rgba-Farben", n(r"rgba?\([^)]*\)")),
        ("font-size-Werte", n(r"font-size:\s*([^;}\n]+)", str.strip)),
        ("border-radius-Werte", n(r"border-radius:\s*([^;}\n]+)", str.strip)),
        ("box-shadow-Werte", n(r"box-shadow:\s*([^;}\n]+)", str.strip)),
        ("transition-Werte", n(r"transition:\s*([^;}\n]+)", str.strip)),
        ("Easings", n(r"cubic-bezier\([^)]*\)")),
        ("@keyframes", n(r"@keyframes\s+([\w-]+)")),
    ]
    print(f"{'Merkmal':<24}{'verschieden':>12}{'Vorkommen':>12}")
    for name, (v, g) in zeilen:
        print(f"{name:<24}{v:>12}{g:>12}")

    var = defaultdict(int)
    for m in re.findall(r"(--[\w-]+)\s*:", alles):
        var[m] += 1
    hb = {k: v for k, v in var.items() if k.startswith("--hb-")}
    print(f"\nCustom Properties gesamt: {len(var)} verschiedene, "
          f"{sum(var.values())} Deklarationen")
    print(f"  davon Fundament (--hb-*): {len(hb)} verschiedene, {sum(hb.values())} Deklarationen")
    mehrfach = sorted(((v, k) for k, v in var.items() if v > 10), reverse=True)[:5]
    if mehrfach:
        print("  am haeufigsten neu deklariert: "
              + ", ".join(f"{k} ({v}x)" for v, k in mehrfach))

    ruhe = sum(1 for _, c in quellen if "prefers-reduced-motion" in c)
    print(f"\nBewegungsruhe beachtet: {ruhe} von {len(quellen)} Stilquellen")
    ansage = sum(1 for s in txt.values() if "data-hb-motion" in s)
    regie = sum(1 for s in txt.values() if 'data-hb-regie="ansage"' in s)
    welt = sum(1 for s in txt.values() if "data-hb-welt" in s)
    print(f"Ansagepfad [data-hb-motion]: {ansage} Seiten (davon {regie} nur Ansage)")
    print(f"Weltzuweisung [data-hb-welt]: {welt} Seiten")

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
    designebene(txt)
    print("\nFertig. Bezugsdokument: REMAKE-KONZEPT-V3.md")


if __name__ == "__main__":
    main()
