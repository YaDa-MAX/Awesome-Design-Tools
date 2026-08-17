#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""HeiBen Kulinarik – Rezept-PDF-Generator.
Rendert pro A4-Seite genau ein Rezept aus dem generischen DB-JSON.
Aufruf:
    python3 build_recipe_pdf.py <output.pdf> <untertitel> [Land1 Land2 ... | ALLE]
"""
import os, sys, json, html, datetime, glob

os.environ.setdefault("PLAYWRIGHT_BROWSERS_PATH", "/opt/pw-browsers")

DATA = "/home/claude/work/heiben_kit/data/rezepte-alle.json"
AUBERGINE = "#6d3a52"
INK = "#1f1c17"
INK_SOFT = "#524a3e"
RULE = "#d8cdb7"
PERG = "#f3eee5"
PERG2 = "#ebe3d4"

def esc(s):
    return html.escape(str(s), quote=True)

def load_recipes(countries):
    d = json.load(open(DATA, encoding="utf-8"))
    recipes = d["recipes"]
    if countries and countries != ["ALLE"]:
        order = {c: i for i, c in enumerate(countries)}
        sel = [r for r in recipes if r["country"] in order]
        # nach gewünschter Länderreihenfolge, darin Originalreihenfolge
        sel.sort(key=lambda r: order[r["country"]])
        return sel
    # ALLE: Europa zuerst (alphabetisch), dann Nordafrika (alphabetisch)
    eu = sorted({r["country"] for r in recipes if r["continent"] == "Europa"})
    af = sorted({r["country"] for r in recipes if r["continent"] == "Afrika"})
    order = {c: i for i, c in enumerate(eu + af)}
    return sorted(recipes, key=lambda r: (order[r["country"]], r["recipe_name"]))

def ingredient_line(it):
    q = (it.get("quantity") or "").strip()
    u = (it.get("unit") or "").strip()
    item = esc(it.get("item", ""))
    amt = " ".join(p for p in [q, u] if p).strip()
    if amt:
        return f'<li><span class="amt">{esc(amt)}</span> {item}</li>'
    return f'<li>{item}</li>'

def recipe_page(r, total_idx, total_n):
    cats = " · ".join(r.get("categories", []))
    eyebrow = f'{esc(r["country"])} &middot; {esc(r["continent"])}'
    title = esc(r["recipe_name"])
    desc = esc(r.get("short_description", ""))
    hist = esc(r.get("history", ""))
    ings = "\n".join(ingredient_line(i) for i in r.get("ingredients", []))
    steps = "\n".join(f"<li>{esc(s)}</li>" for s in r.get("instructions", []))
    tips = "".join(f"<li>{esc(t)}</li>" for t in r.get("tips", []))
    tags = " ".join(f'<span class="tag">{esc(t)}</span>' for t in r.get("tags", []))
    sub = r.get("substitution")
    sub_html = ""
    if sub:
        sub_html = f'''
        <div class="box sub">
          <div class="box-label">Unsere Abwandlung</div>
          <p>{esc(sub)}</p>
        </div>'''
    tips_html = ""
    if tips:
        tips_html = f'''
        <div class="box tips">
          <div class="box-label">Tipps</div>
          <ul>{tips}</ul>
        </div>'''
    return f'''
    <section class="page">
      <div class="accent"></div>
      <div class="eyebrow">{eyebrow}{(' &middot; ' + esc(cats)) if cats else ''}</div>
      <h1 class="title">{title}</h1>
      <p class="desc">{desc}</p>
      <div class="hist">{hist}</div>
      <div class="rule"></div>
      <div class="cols">
        <div class="col">
          <div class="col-label">Zutaten</div>
          <ul class="ings">{ings}</ul>
        </div>
        <div class="col">
          <div class="col-label">Zubereitung</div>
          <ol class="steps">{steps}</ol>
        </div>
      </div>
      {tips_html}
      {sub_html}
      <div class="tags">{tags}</div>
      <div class="foot">
        <span>HeiBen Kulinarik &middot; Eine K&uuml;che mit Herkunft</span>
        <span>{esc(r["country"])} &middot; {total_idx}/{total_n}</span>
      </div>
    </section>'''

def cover_page(subtitle, n_recipes, n_countries):
    today = datetime.date.today().strftime("%d.%m.%Y")
    return f'''
    <section class="page cover">
      <div class="cover-inner">
        <div class="cover-eyebrow">HeiBen Kulinarik</div>
        <h1 class="cover-title">Rezepte</h1>
        <div class="cover-sub">{esc(subtitle)}</div>
        <div class="cover-rule"></div>
        <div class="cover-meta">{n_recipes} Rezepte &middot; {n_countries} {'Land' if n_countries==1 else 'L&auml;nder'} &middot; ein Rezept je Seite</div>
        <div class="cover-tag">Eine K&uuml;che mit Herkunft &mdash; von Maghreb bis Norddeutschland</div>
        <div class="cover-date">Stand {today}</div>
      </div>
    </section>'''

def build_html(recipes, subtitle):
    n = len(recipes)
    ncs = len({r["country"] for r in recipes})
    pages = [cover_page(subtitle, n, ncs)]
    for i, r in enumerate(recipes, 1):
        pages.append(recipe_page(r, i, n))
    body = "\n".join(pages)
    return f'''<!DOCTYPE html>
<html lang="de"><head><meta charset="utf-8">
<style>
  @page {{ size: A4; margin: 0; }}
  * {{ box-sizing: border-box; }}
  html, body {{ margin: 0; padding: 0; }}
  body {{
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    color: {INK};
    -webkit-print-color-adjust: exact; print-color-adjust: exact;
  }}
  .page {{
    position: relative;
    width: 210mm; height: 297mm;
    padding: 18mm 17mm 14mm 17mm;
    background: {PERG};
    overflow: hidden;
    page-break-after: always;
  }}
  .page:last-child {{ page-break-after: auto; }}
  .accent {{ position: absolute; top: 0; left: 0; right: 0; height: 6mm; background: {AUBERGINE}; }}
  .eyebrow {{
    margin-top: 4mm; font-size: 8.5pt; letter-spacing: .14em; text-transform: uppercase;
    color: {AUBERGINE}; font-weight: 700;
  }}
  .title {{
    font-family: Georgia, "Times New Roman", serif;
    font-size: 23pt; line-height: 1.1; margin: 2mm 0 1.5mm; color: {INK}; font-weight: 700;
  }}
  .desc {{ font-style: italic; font-size: 10.5pt; line-height: 1.35; color: {INK_SOFT}; margin: 0 0 3mm; }}
  .hist {{ font-size: 9.4pt; line-height: 1.45; color: {INK}; text-align: justify; margin: 0; }}
  .rule {{ height: 1px; background: {RULE}; margin: 4mm 0; }}
  .cols {{ display: flex; gap: 9mm; }}
  .col {{ flex: 1; }}
  .col-label, .box-label {{
    font-size: 8.5pt; letter-spacing: .14em; text-transform: uppercase; font-weight: 700;
    color: {AUBERGINE}; margin-bottom: 2mm; border-bottom: 1px solid {RULE}; padding-bottom: 1mm;
  }}
  ul.ings {{ list-style: none; padding: 0; margin: 0; font-size: 9.3pt; line-height: 1.5; }}
  ul.ings li {{ padding-left: 0; margin-bottom: .6mm; }}
  ul.ings .amt {{ color: {AUBERGINE}; font-weight: 700; }}
  ol.steps {{ padding-left: 4.5mm; margin: 0; font-size: 9.3pt; line-height: 1.42; }}
  ol.steps li {{ margin-bottom: 1.4mm; padding-left: 1mm; }}
  ol.steps li::marker {{ color: {AUBERGINE}; font-weight: 700; }}
  .box {{ margin-top: 4mm; padding: 3mm 4mm; border-radius: 2mm; }}
  .box p {{ margin: 0; font-size: 9.2pt; line-height: 1.42; }}
  .box ul {{ margin: 0; padding-left: 4.5mm; font-size: 9.2pt; line-height: 1.4; }}
  .box.tips {{ background: {PERG2}; }}
  .box.sub {{ background: #efe2ea; border-left: 3px solid {AUBERGINE}; }}
  .tags {{ margin-top: 4mm; }}
  .tag {{
    display: inline-block; font-size: 7.4pt; color: {INK_SOFT};
    border: 1px solid {RULE}; border-radius: 6px; padding: .4mm 1.6mm; margin: 0 1mm 1mm 0;
  }}
  .foot {{
    position: absolute; left: 17mm; right: 17mm; bottom: 8mm;
    display: flex; justify-content: space-between;
    font-size: 7.6pt; color: {INK_SOFT}; border-top: 1px solid {RULE}; padding-top: 2mm;
  }}
  /* Cover */
  .cover {{ background: {AUBERGINE}; color: {PERG}; padding: 0; }}
  .cover .accent {{ display: none; }}
  .cover-inner {{
    position: absolute; inset: 0; display: flex; flex-direction: column;
    justify-content: center; align-items: center; text-align: center; padding: 30mm;
  }}
  .cover-eyebrow {{ font-size: 11pt; letter-spacing: .3em; text-transform: uppercase; opacity: .85; }}
  .cover-title {{ font-family: Georgia, serif; font-size: 56pt; margin: 4mm 0 0; font-weight: 700; }}
  .cover-sub {{ font-family: Georgia, serif; font-style: italic; font-size: 20pt; margin-top: 2mm; opacity: .95; }}
  .cover-rule {{ width: 40mm; height: 2px; background: {PERG}; opacity: .6; margin: 8mm 0; }}
  .cover-meta {{ font-size: 11pt; letter-spacing: .05em; }}
  .cover-tag {{ font-size: 10pt; opacity: .8; margin-top: 3mm; max-width: 120mm; line-height: 1.4; }}
  .cover-date {{ position: absolute; bottom: 18mm; font-size: 9pt; opacity: .7; }}
</style></head>
<body>
{body}
</body></html>'''

def render_pdf(html_path, pdf_path):
    from playwright.sync_api import sync_playwright
    with sync_playwright() as p:
        browser = p.chromium.launch(args=["--no-sandbox"])
        page = browser.new_page()
        page.goto("file://" + html_path, wait_until="networkidle")
        page.pdf(path=pdf_path, width="210mm", height="297mm",
                 print_background=True,
                 margin={"top": "0", "bottom": "0", "left": "0", "right": "0"})
        browser.close()

def main():
    out_pdf = sys.argv[1]
    subtitle = sys.argv[2]
    countries = sys.argv[3:] if len(sys.argv) > 3 else ["ALLE"]
    recipes = load_recipes(countries)
    if not recipes:
        print("Keine Rezepte gefunden für:", countries); sys.exit(1)
    html_doc = build_html(recipes, subtitle)
    html_path = "/home/claude/work/_recipe_render.html"
    open(html_path, "w", encoding="utf-8").write(html_doc)
    render_pdf(html_path, out_pdf)
    print(f"PDF erstellt: {out_pdf}  ({len(recipes)} Rezepte, {len(recipes)+1} Seiten inkl. Deckblatt)")

if __name__ == "__main__":
    main()
