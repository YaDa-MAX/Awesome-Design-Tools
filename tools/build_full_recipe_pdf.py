#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""HeiBen Kulinarik – vollständiger Rezept-PDF (neues Layout, Palette 'Beere & Salbei' grün-dominant).
Titelseite -> Inhaltsverzeichnis (mit Seitenzahlen) -> ein Rezept pro A4-Seite.
Layout je Rezept: Kopf -> [links Zubereitung | rechts Zutaten] -> Foto-Platzhalter -> Tipps -> Abwandlung -> Herkunft(halbiert, zuletzt).
"""
import os, sys, json, html, re, datetime
os.environ.setdefault("PLAYWRIGHT_BROWSERS_PATH", "/opt/pw-browsers")
DATA="/home/claude/work/heiben_kit/data/rezepte-alle.json"

# Palette: Grün primär, Beere sekundär
GREEN="#4F7A36"; GREEN_DK="#436A2E"; BERRY="#B23E63"
BG="#FAF6EF"; CARD="#E8EEDF"; INK="#2B2A26"; SOFT="#5F5F54"
TIPBG="#EFE9DD"; SUBBG="#F4E4EA"; IMGBG="#E8EEDF"; RULE="#D9D2C2"

def esc(s): return html.escape(str(s), quote=True)

def halve_history(text, ratio=0.5):
    sents=re.split(r'(?<=[.!?])\s+', text.strip())
    counts=[len(s.split()) for s in sents]; total=sum(counts) or 1; target=total*ratio
    cum=0; best_i=0; best=None
    for i,c in enumerate(counts):
        cum+=c; diff=abs(cum-target)
        if best is None or diff<best: best=diff; best_i=i
    return " ".join(sents[:best_i+1])

def ordered_groups():
    d=json.load(open(DATA,encoding="utf-8")); rec=d["recipes"]
    eu=sorted({r["country"] for r in rec if r["continent"]=="Europa"})
    af=sorted({r["country"] for r in rec if r["continent"]=="Afrika"})
    groups=[]; flat=[]
    for c in eu+af:
        items=sorted([r for r in rec if r["country"]==c], key=lambda r:r["recipe_name"])
        groups.append((c,items)); flat.extend(items)
    return groups, flat, len(eu), len(af)

def ing_line(it):
    q=(it.get("quantity") or "").strip(); u=(it.get("unit") or "").strip()
    amt=" ".join(p for p in [q,u] if p).strip(); item=esc(it.get("item",""))
    return f'<li><span class="amt">{esc(amt)}</span> {item}</li>' if amt else f'<li>{item}</li>'

def recipe_page(r, pageno):
    cats=" · ".join(r.get("categories",[]))
    ings="".join(ing_line(i) for i in r.get("ingredients",[]))
    steps="".join(f"<li>{esc(s)}</li>" for s in r.get("instructions",[]))
    tips="".join(f"<li>{esc(t)}</li>" for t in r.get("tips",[]))
    tags=" ".join(f'<span class="tag">{esc(t)}</span>' for t in r.get("tags",[]))
    hist=esc(halve_history(r.get("history","")))
    tips_html=(f'<div class="tips"><div class="tips-label"><span class="bulb">&#128161;</span> Tipps</div><ul>{tips}</ul></div>') if tips else ""
    sub=r.get("substitution")
    sub_html=(f'<div class="sub"><div class="sub-label">Unsere Abwandlung</div><p>{esc(sub)}</p></div>') if sub else ""
    return f'''<section class="page recipe">
      <div class="accent"></div>
      <div class="eyebrow">{esc(r["country"])} &middot; {esc(r["continent"])}{(" &middot; " + esc(cats)) if cats else ""}</div>
      <h1 class="title">{esc(r["recipe_name"])}</h1>
      <p class="desc">{esc(r.get("short_description",""))}</p>
      <div class="cols">
        <div class="col-prep"><div class="label">Zubereitung</div><ol class="steps">{steps}</ol></div>
        <div class="col-ing"><div class="label">Zutaten</div><ul class="ings">{ings}</ul></div>
      </div>
      <div class="imgph"><div class="cam">&#9634;</div><div class="t">Foto folgt</div></div>
      {tips_html}{sub_html}
      <div class="hist-wrap"><div class="hist-label">Herkunft</div><p class="hist">{hist}</p></div>
      <div class="foot"><div class="tags">{tags}</div>
        <div class="footline"><span>HeiBen Kulinarik &middot; Eine K&uuml;che mit Herkunft</span><span>{esc(r["country"])} &middot; Seite&nbsp;{pageno}</span></div></div>
    </section>'''

def cover_page(n_recipes, n_countries):
    today=datetime.date.today().strftime("%d.%m.%Y")
    return f'''<section class="page cover">
      <div class="cover-inner">
        <div class="cover-eyebrow">HeiBen Kulinarik</div>
        <h1 class="cover-title">Rezepte</h1>
        <div class="cover-sub">Eine K&uuml;che mit Herkunft</div>
        <div class="cover-rule"></div>
        <div class="cover-meta">{n_recipes} Rezepte &middot; {n_countries} L&auml;nder &middot; ein Rezept je Seite</div>
        <div class="cover-tag">Traditionelle Gerichte aus ganz Europa und Nordafrika &mdash; von Maghreb bis Norddeutschland</div>
        <div class="cover-date">Stand {today}</div>
      </div></section>'''

def toc_html(groups, pageno_map):
    blocks=[]
    for country, items in groups:
        rows="".join(f'<div class="toc-row"><span class="tname">{esc(it["recipe_name"])}</span><span class="dots"></span><span class="tpg">{pageno_map.get(id(it),"")}</span></div>' for it in items)
        blocks.append(f'<div class="toc-group"><div class="toc-country">{esc(country)}</div>{rows}</div>')
    return f'''<section class="tocsec">
      <div class="accent"></div>
      <div class="toc-head"><div class="eyebrow">Inhalt</div><h1 class="toc-title">Inhaltsverzeichnis</h1></div>
      <div class="toc-cols">{"".join(blocks)}</div></section>'''

def build_html(groups, flat, n_eu, n_af, pageno_map, include_recipes):
    n=len(flat); ncs=n_eu+n_af
    parts=[cover_page(n,ncs), toc_html(groups,pageno_map)]
    if include_recipes:
        parts += [recipe_page(it, pageno_map.get(id(it),"")) for it in flat]
    body="\n".join(parts)
    return f'''<!DOCTYPE html><html lang="de"><head><meta charset="utf-8"><style>
  @page {{ size:A4; margin:0; }}
  * {{ box-sizing:border-box; }}
  html,body {{ margin:0; padding:0; background:{BG}; }}
  body {{ font-family:"Carlito","DejaVu Sans",sans-serif; color:{INK}; -webkit-print-color-adjust:exact; print-color-adjust:exact; }}
  .page {{ position:relative; width:210mm; height:297mm; padding:15mm 16mm 13mm; background:{BG}; overflow:hidden; page-break-after:always; }}
  .accent {{ position:absolute; top:0; left:0; right:0; height:7mm; background:{GREEN}; }}
  .accent::after {{ content:""; position:absolute; left:0; right:0; top:7mm; height:1.6mm; background:{BERRY}; }}
  .eyebrow {{ margin-top:5mm; font-size:8.5pt; letter-spacing:.16em; text-transform:uppercase; color:{BERRY}; font-weight:700; }}
  .title {{ font-family:"Lora",Georgia,serif; font-size:26pt; line-height:1.05; margin:1.5mm 0 1mm; font-weight:700; color:{GREEN}; }}
  .desc {{ font-family:"Lora",Georgia,serif; font-style:italic; font-size:10.5pt; line-height:1.32; color:{SOFT}; margin:0 0 3.5mm; }}
  .cols {{ display:flex; gap:8mm; }}
  .col-prep {{ flex:1.35; }} .col-ing {{ flex:1; }}
  .label {{ font-family:"Lora",Georgia,serif; font-size:11.5pt; font-weight:700; color:{GREEN}; margin:0 0 2mm; display:flex; align-items:center; gap:2mm; }}
  .label::before {{ content:""; width:3.6mm; height:3.6mm; background:{BERRY}; border-radius:50%; display:inline-block; }}
  ol.steps {{ padding-left:5mm; margin:0; font-size:9.3pt; line-height:1.42; }}
  ol.steps li {{ margin-bottom:1.4mm; padding-left:1mm; }}
  ol.steps li::marker {{ color:{GREEN}; font-weight:700; }}
  ul.ings {{ list-style:none; padding:4mm 5mm; margin:0; font-size:9.2pt; line-height:1.45; background:{CARD}; border-radius:3mm; }}
  ul.ings li {{ margin-bottom:.9mm; padding-bottom:.9mm; border-bottom:1px solid rgba(0,0,0,.06); }}
  ul.ings li:last-child {{ border-bottom:none; margin-bottom:0; padding-bottom:0; }}
  ul.ings .amt {{ color:{GREEN_DK}; font-weight:700; }}
  .imgph {{ margin:5mm 0 0; height:40mm; border-radius:3mm; background:{IMGBG}; border:1.5px dashed {GREEN}; display:flex; flex-direction:column; align-items:center; justify-content:center; color:{SOFT}; }}
  .imgph .cam {{ font-size:17pt; color:{GREEN}; }} .imgph .t {{ font-size:8.5pt; letter-spacing:.12em; text-transform:uppercase; margin-top:.5mm; }}
  .tips {{ margin-top:4.5mm; background:{TIPBG}; border-radius:3mm; padding:3mm 5mm; }}
  .tips-label {{ font-family:"Lora",Georgia,serif; font-size:11pt; font-weight:700; color:{GREEN}; margin-bottom:1.4mm; display:flex; align-items:center; gap:2mm; }}
  .bulb {{ font-size:12pt; filter:drop-shadow(0 0 2px #f4b400) drop-shadow(0 0 4.5px #f7c948); }}
  .tips ul {{ margin:0; padding-left:4.5mm; font-size:9pt; line-height:1.38; }}
  .tips li {{ margin-bottom:.5mm; }}
  .sub {{ margin-top:4.5mm; background:{SUBBG}; border-left:3px solid {BERRY}; border-radius:2mm; padding:3mm 5mm; }}
  .sub-label {{ font-size:8.5pt; letter-spacing:.14em; text-transform:uppercase; font-weight:700; color:{BERRY}; margin-bottom:1.2mm; }}
  .sub p {{ margin:0; font-size:9pt; line-height:1.4; }}
  .hist-wrap {{ margin-top:4.5mm; border-top:2px solid {BERRY}; padding-top:2.5mm; }}
  .hist-label {{ font-size:8pt; letter-spacing:.16em; text-transform:uppercase; color:{BERRY}; font-weight:700; margin-bottom:1.4mm; }}
  .hist {{ font-size:9.1pt; line-height:1.48; color:{SOFT}; text-align:justify; margin:0; }}
  .foot {{ position:absolute; left:16mm; right:16mm; bottom:8mm; }}
  .tags {{ margin-bottom:2.5mm; }}
  .tag {{ display:inline-block; font-size:7.2pt; color:{SOFT}; border:1px solid {GREEN}; border-radius:6px; padding:.3mm 1.6mm; margin:0 1mm 1mm 0; }}
  .footline {{ display:flex; justify-content:space-between; font-size:7.6pt; color:{SOFT}; border-top:1px solid {RULE}; padding-top:2mm; }}
  /* Cover */
  .cover {{ background:{GREEN}; color:{BG}; padding:0; }} .cover .accent {{ display:none; }}
  .cover-inner {{ position:absolute; inset:0; display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center; padding:30mm; }}
  .cover-eyebrow {{ font-size:11pt; letter-spacing:.3em; text-transform:uppercase; opacity:.9; }}
  .cover-title {{ font-family:"Lora",Georgia,serif; font-size:58pt; margin:4mm 0 0; font-weight:700; }}
  .cover-sub {{ font-family:"Lora",Georgia,serif; font-style:italic; font-size:20pt; margin-top:2mm; opacity:.95; }}
  .cover-rule {{ width:42mm; height:3px; background:{BERRY}; margin:8mm 0; border-radius:2px; }}
  .cover-meta {{ font-size:11pt; letter-spacing:.05em; }}
  .cover-tag {{ font-size:10pt; opacity:.85; margin-top:3mm; max-width:130mm; line-height:1.4; }}
  .cover-date {{ position:absolute; bottom:18mm; font-size:9pt; opacity:.75; }}
  /* TOC */
  .tocsec {{ position:relative; padding:15mm 16mm 16mm; page-break-after:always; }}
  .toc-head {{ margin-bottom:6mm; }}
  .toc-title {{ font-family:"Lora",Georgia,serif; font-size:27pt; margin:1mm 0 0; font-weight:700; color:{GREEN}; }}
  .toc-cols {{ column-count:2; column-gap:11mm; }}
  .toc-group {{ break-inside:avoid; margin-bottom:4mm; }}
  .toc-country {{ font-size:9pt; letter-spacing:.1em; text-transform:uppercase; font-weight:700; color:{GREEN}; border-bottom:1.5px solid {BERRY}; padding-bottom:.8mm; margin-bottom:1.4mm; }}
  .toc-row {{ display:flex; align-items:baseline; font-size:9pt; line-height:1.55; }}
  .toc-row .tname {{ white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:62mm; }}
  .toc-row .dots {{ flex:1; border-bottom:1px dotted {RULE}; margin:0 1.5mm; position:relative; top:-2px; }}
  .toc-row .tpg {{ color:{GREEN_DK}; font-weight:700; font-variant-numeric:tabular-nums; }}
</style></head><body>
{body}
</body></html>'''

def render_pdf(html_str, pdf_path):
    from playwright.sync_api import sync_playwright
    hp="/home/claude/work/_full_render.html"; open(hp,"w",encoding="utf-8").write(html_str)
    with sync_playwright() as p:
        b=p.chromium.launch(args=["--no-sandbox"]); pg=b.new_page()
        pg.goto("file://"+hp, wait_until="networkidle")
        pg.pdf(path=pdf_path, width="210mm", height="297mm", print_background=True,
               margin={"top":"0","bottom":"0","left":"0","right":"0"}); b.close()

def count_pages(p):
    from pypdf import PdfReader; return len(PdfReader(p).pages)

def main():
    out_pdf=sys.argv[1]
    groups, flat, n_eu, n_af = ordered_groups(); n=len(flat)
    placeholder={id(it):"00" for it in flat}
    tmp="/home/claude/work/_toc_probe.pdf"
    render_pdf(build_html(groups,flat,n_eu,n_af,placeholder,False), tmp)
    n_toc=count_pages(tmp)-1
    pageno_map={id(it): 1+n_toc+i for i,it in enumerate(flat,1)}
    render_pdf(build_html(groups,flat,n_eu,n_af,pageno_map,True), out_pdf)
    total=count_pages(out_pdf); expected=1+n_toc+n
    print(f"TOC-Seiten: {n_toc} · Rezepte: {n} · Gesamt: {total} (erwartet {expected})")
    assert total==expected
    print("OK ·", out_pdf)

if __name__=="__main__":
    main()
