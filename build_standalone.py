#!/usr/bin/env python3
"""
Baut aus einer Quelldatei unter web/_src/ eine eigenstaendige (standalone)
Seite unter web/: das gemeinsame styles.css wird inline eingesetzt und alle
Logo-Verweise auf assets/*.png werden als base64-Datenbloecke eingebettet.
Der Google-Fonts-Link bleibt erhalten (Schriften fallen sonst sauber zurueck).

Aufruf:  python3 build_standalone.py <name>     # z. B. familie
"""
import sys, os, re, base64, mimetypes

WEB = os.path.join(os.path.dirname(os.path.abspath(__file__)), "web")
SRC = os.path.join(WEB, "_src")

def asset_data_uri(rel_path):
    """assets/foo.png -> data:image/png;base64,...  (oder None, wenn Datei fehlt)"""
    full = os.path.join(WEB, rel_path)
    if not os.path.isfile(full):
        return None
    mime = mimetypes.guess_type(full)[0] or "application/octet-stream"
    with open(full, "rb") as f:
        b64 = base64.b64encode(f.read()).decode("ascii")
    return f"data:{mime};base64,{b64}"

def build(name):
    src_file = os.path.join(SRC, f"{name}.html")
    out_file = os.path.join(WEB, f"{name}.html")
    if not os.path.isfile(src_file):
        sys.exit(f"Quelle nicht gefunden: {src_file}")

    html = open(src_file, encoding="utf-8").read()

    # 0) Einbinde-Anweisungen aufloesen: <!--INCLUDE:datei.js--> wird durch den
    #    Inhalt der Datei (aus _src/) als <script>-Block ersetzt. So lebt z. B.
    #    der Magazin-Kern in einer Quelle und landet dennoch in jeder Seite.
    def inc(m):
        fn = m.group(1).strip()
        p = os.path.join(SRC, fn)
        if not os.path.isfile(p):
            sys.exit(f"INCLUDE nicht gefunden: {p}")
        body = open(p, encoding="utf-8").read()
        return "<script>\n/* eingebunden aus _src/" + fn + " */\n" + body + "\n</script>"
    html = re.sub(r'<!--\s*INCLUDE:\s*([^>]+?)\s*-->', inc, html)

    # 1) styles.css inline einsetzen
    css = open(os.path.join(WEB, "styles.css"), encoding="utf-8").read()
    link_re = re.compile(r'<link rel="stylesheet" href="styles\.css"\s*/?>')
    if not link_re.search(html):
        sys.exit("Kein <link ... styles.css> in der Quelle gefunden.")
    html = link_re.sub("<style>\n" + css + "\n</style>", html, count=1)

    # 2) alle assets/*.png-Verweise als base64-Datenblock einbetten
    #    (greift sowohl bei src="assets/x.png" als auch href="assets/x.png")
    missing = []
    def repl(m):
        attr, path = m.group(1), m.group(2)
        uri = asset_data_uri(path)
        if uri is None:
            missing.append(path)
            return m.group(0)
        return f'{attr}="{uri}"'
    html = re.sub(r'(src|href)="(assets/[^"]+)"', repl, html)

    if missing:
        sys.exit("Fehlende Assets: " + ", ".join(sorted(set(missing))))

    with open(out_file, "w", encoding="utf-8") as f:
        f.write(html)

    # kleine Bilanz
    n_b64 = html.count("data:image")
    has_link = "styles.css" in html
    print(f"Gebaut: {out_file}")
    print(f"  eingebettete Bilder (data:image): {n_b64}")
    print(f"  externer styles.css-Verweis verbleibt: {'JA (Fehler!)' if has_link else 'nein'}")
    print(f"  Google-Fonts-Link vorhanden: {'ja' if 'fonts.googleapis.com' in html else 'NEIN (Fehler!)'}")
    print(f"  Dateigroesse: {os.path.getsize(out_file)//1024} KB")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit("Aufruf: python3 build_standalone.py <name>")
    build(sys.argv[1])
