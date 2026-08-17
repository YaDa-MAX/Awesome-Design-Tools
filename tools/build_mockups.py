#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Erzeugt Beispielseiten (neues Layout) in mehreren Farbwelten zum Vergleich."""
import os, json, html, re
os.environ.setdefault("PLAYWRIGHT_BROWSERS_PATH", "/opt/pw-browsers")
DATA="/home/claude/work/heiben_kit/data/rezepte-alle.json"

def esc(s): return html.escape(str(s), quote=True)

def halve_history(text, ratio=0.5):
    """Auf ~halbe Länge kürzen, an Satzgrenze (nie mitten im Satz)."""
    sents=re.split(r'(?<=[.!?])\s+', text.strip())
    total=len(text.split()); target=total*ratio
    out=[]; wc=0
    for s in sents:
        out.append(s); wc+=len(s.split())
        if wc>=target: break
    return " ".join(out)

PALETTES={
 "A_terrakotta_olive": {
   "name":"Terrakotta & Olive","bg":"#FBF5EA","card":"#F1E6D2","ink":"#2A211A","soft":"#6B5E4E",
   "primary":"#C8542F","secondary":"#6E7B3D","img":"#ECE0CC","subbg":"#F6E3D7","tip":"#EFE4CF"},
 "B_safran_petrol": {
   "name":"Safran & Petrol","bg":"#FCFAF3","card":"#E7F1EF","ink":"#1E2528","soft":"#5A6166",
   "primary":"#E29A2E","secondary":"#157571","img":"#E2EEEB","subbg":"#FBEFD8","tip":"#E4EFEC"},
 "C_beere_salbei": {
   "name":"Beere & Salbei","bg":"#FAF4F1","card":"#EFE6E9","ink":"#2B2330","soft":"#6A5F66",
   "primary":"#B23E63","secondary":"#7E9B6B","img":"#EBE0E4","subbg":"#F4E4EA","tip":"#EAE8E2"},
}

def ing_line(it):
    q=(it.get("quantity") or "").strip(); u=(it.get("unit") or "").strip()
    amt=" ".join(p for p in [q,u] if p).strip(); item=esc(it.get("item",""))
    return f'<li><span class="amt">{esc(amt)}</span> {item}</li>' if amt else f'<li>{item}</li>'

def page_html(r, pal):
    cats=" · ".join(r.get("categories",[]))
    ings="".join(ing_line(i) for i in r.get("ingredients",[]))
    steps="".join(f"<li>{esc(s)}</li>" for s in r.get("instructions",[]))
    tips="".join(f"<li>{esc(t)}</li>" for t in r.get("tips",[]))
    tags=" ".join(f'<span class="tag">{esc(t)}</span>' for t in r.get("tags",[]))
    hist=esc(halve_history(r.get("history","")))
    p=pal
    return f'''<!DOCTYPE html><html lang="de"><head><meta charset="utf-8"><style>
  @page {{ size:A4; margin:0; }}
  * {{ box-sizing:border-box; }}
  html,body {{ margin:0; padding:0; }}
  body {{ font-family:"Carlito","DejaVu Sans",sans-serif; color:{p['ink']}; -webkit-print-color-adjust:exact; print-color-adjust:exact; }}
  .page {{ position:relative; width:210mm; height:297mm; padding:16mm 16mm 13mm; background:{p['bg']}; overflow:hidden; }}
  .accent {{ position:absolute; top:0; left:0; right:0; height:7mm; background:{p['primary']}; }}
  .accent::after {{ content:""; position:absolute; left:0; right:0; top:7mm; height:1.6mm; background:{p['secondary']}; }}
  .eyebrow {{ margin-top:5mm; font-size:8.5pt; letter-spacing:.16em; text-transform:uppercase; color:{p['secondary']}; font-weight:700; }}
  .title {{ font-family:"Lora",Georgia,serif; font-size:27pt; line-height:1.05; margin:1.5mm 0 1mm; font-weight:700; color:{p['primary']}; }}
  .desc {{ font-family:"Lora",Georgia,serif; font-style:italic; font-size:11pt; line-height:1.35; color:{p['soft']}; margin:0 0 4mm; }}
  .cols {{ display:flex; gap:8mm; }}
  .col-prep {{ flex:1.35; }} .col-ing {{ flex:1; }}
  .label {{ font-family:"Lora",Georgia,serif; font-size:12pt; font-weight:700; color:{p['primary']}; margin:0 0 2mm; display:flex; align-items:center; gap:2mm; }}
  .label::before {{ content:""; width:4mm; height:4mm; background:{p['secondary']}; border-radius:50%; display:inline-block; }}
  ol.steps {{ padding-left:5mm; margin:0; font-size:9.4pt; line-height:1.45; }}
  ol.steps li {{ margin-bottom:1.6mm; padding-left:1mm; }}
  ol.steps li::marker {{ color:{p['primary']}; font-weight:700; }}
  ul.ings {{ list-style:none; padding:0; margin:0; font-size:9.4pt; line-height:1.5; background:{p['card']}; border-radius:3mm; padding:4mm 5mm; }}
  ul.ings li {{ margin-bottom:1mm; padding-bottom:1mm; border-bottom:1px solid rgba(0,0,0,.06); }}
  ul.ings li:last-child {{ border-bottom:none; margin-bottom:0; }}
  ul.ings .amt {{ color:{p['primary']}; font-weight:700; }}
  .imgph {{ margin:6mm 0 0; height:50mm; border-radius:3mm; background:{p['img']};
            border:1.5px dashed {p['primary']}; display:flex; flex-direction:column; align-items:center; justify-content:center; color:{p['soft']}; }}
  .imgph .cam {{ font-size:20pt; }} .imgph .t {{ font-size:9pt; letter-spacing:.12em; text-transform:uppercase; margin-top:1mm; }}
  .tips {{ margin-top:5mm; background:{p['tip']}; border-radius:3mm; padding:3mm 5mm; }}
  .tips .label {{ font-size:10.5pt; margin-bottom:1.5mm; }}
  .tips ul {{ margin:0; padding-left:4.5mm; font-size:9pt; line-height:1.4; }}
  .hist-wrap {{ margin-top:5mm; border-top:2px solid {p['secondary']}; padding-top:3mm; }}
  .hist-label {{ font-size:8pt; letter-spacing:.16em; text-transform:uppercase; color:{p['secondary']}; font-weight:700; margin-bottom:1.5mm; }}
  .hist {{ font-size:9.2pt; line-height:1.5; color:{p['soft']}; text-align:justify; margin:0; }}
  .foot {{ position:absolute; left:16mm; right:16mm; bottom:8mm; }}
  .tags {{ margin-bottom:2.5mm; }}
  .tag {{ display:inline-block; font-size:7.2pt; color:{p['soft']}; border:1px solid {p['secondary']}; border-radius:6px; padding:.3mm 1.6mm; margin:0 1mm 1mm 0; }}
  .footline {{ display:flex; justify-content:space-between; font-size:7.6pt; color:{p['soft']}; border-top:1px solid rgba(0,0,0,.12); padding-top:2mm; }}
</style></head><body>
  <div class="page">
    <div class="accent"></div>
    <div class="eyebrow">{esc(r['country'])} &middot; {esc(r['continent'])}{(' &middot; ' + esc(cats)) if cats else ''}</div>
    <h1 class="title">{esc(r['recipe_name'])}</h1>
    <p class="desc">{esc(r.get('short_description',''))}</p>
    <div class="cols">
      <div class="col-prep"><div class="label">Zubereitung</div><ol class="steps">{steps}</ol></div>
      <div class="col-ing"><div class="label">Zutaten</div><ul class="ings">{ings}</ul></div>
    </div>
    <div class="imgph"><div class="cam">&#9634;</div><div class="t">Foto folgt</div></div>
    <div class="tips"><div class="label">Tipps</div><ul>{tips}</ul></div>
    <div class="hist-wrap"><div class="hist-label">Herkunft</div><p class="hist">{hist}</p></div>
    <div class="foot">
      <div class="tags">{tags}</div>
      <div class="footline"><span>HeiBen Kulinarik &middot; Eine K&uuml;che mit Herkunft</span><span>{esc(r['country'])} &middot; Seite&nbsp;24</span></div>
    </div>
  </div>
</body></html>'''

def render(htmlstr, pdf):
    from playwright.sync_api import sync_playwright
    hp=pdf.replace(".pdf",".html"); open(hp,"w",encoding="utf-8").write(htmlstr)
    with sync_playwright() as pw:
        b=pw.chromium.launch(args=["--no-sandbox"]); pg=b.new_page()
        pg.goto("file://"+hp, wait_until="networkidle")
        pg.pdf(path=pdf, width="210mm", height="297mm", print_background=True,
               margin={"top":"0","bottom":"0","left":"0","right":"0"}); b.close()

if __name__=="__main__":
    d=json.load(open(DATA,encoding="utf-8"))
    r=next(x for x in d["recipes"] if x["recipe_name"]=="Käsespätzle")
    for key,pal in PALETTES.items():
        out=f"/home/claude/work/mock_{key}.pdf"
        render(page_html(r,pal), out)
        print("ok", key)
