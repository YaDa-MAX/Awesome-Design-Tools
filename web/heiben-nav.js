/* HeiBen Fundament — gemeinsame Kopfnavigation (Remake v2, W1)
   Nutzung je Seite:
     <link rel="stylesheet" href="heiben-design.css">
     <script src="heiben-nav.js" defer></script>
     <body data-hb-welt="reisen|wohnen|immobilien|studio|kulinarik|wissen|konto|holding">
   Progressive Enhancement: ohne JS bleiben die Footer-Links jeder Seite voll nutzbar.
   Farben kommen aus heiben-firmierungen.js (falls geladen), sonst aus dem Fallback. */
(function(){
  "use strict";
  if(document.querySelector(".hb-nav")) return; /* nie doppelt */

  var FALLBACK={reisen:"#a97a1d",wohnen:"#4a5c39",immobilien:"#792d29",studio:"#1f1c17",kulinarik:"#6b3951"};
  function farbe(w){
    try{ if(window.HEIBEN_FIRMA){ var f=window.HEIBEN_FIRMA(w); if(f&&f.farbe) return f.farbe; } }catch(e){}
    return FALLBACK[w]||"#d8cdb7";
  }

  var WELTEN=[
    {k:"reisen",     t:"Reisen",     u:"reisen.html"},
    {k:"wohnen",     t:"Wohnen",     u:"wohnen.html"},
    {k:"immobilien", t:"Immobilien", u:"immobilien.html"},
    {k:"studio",     t:"Studio",     u:"studio.html"},
    {k:"kulinarik",  t:"Kulinarik",  u:"kulinarik.html"}
  ];
  var EXTRA=[
    {k:"wissen", t:"Wissen",      u:"wissen.html"},
    /* Die Suche hing bis v3-W5 an hb-suche-nav.js, das ein <nav>-Element voraussetzt —
       das haben nur noch 4 Seiten. Seitdem steht sie hier, also auf jeder Seite. */
    {k:"suche",  t:"Suche",       u:"suche.html"},
    {k:"konto",  t:"Mein HeiBen", u:"mein-heiben.html"}
  ];

  var aktiv=(document.body.getAttribute("data-hb-welt")||"").trim();

  function link(item,dot){
    var a=document.createElement("a");
    a.href=item.u; a.setAttribute("data-welt",item.k);
    if(dot){
      a.style.setProperty("--wf",farbe(item.k));
      var i=document.createElement("i"); i.className="hb-dot"; a.appendChild(i);
    }
    a.appendChild(document.createTextNode(item.t));
    if(item.k===aktiv) a.className="on";
    return a;
  }

  var nav=document.createElement("div");   /* div statt header/nav: immun gegen Element-Selektoren im Bestand */
  nav.className="hb-nav"; nav.setAttribute("role","banner");
  var inner=document.createElement("div"); inner.className="hb-nav-in";

  var brand=document.createElement("a");
  brand.className="hb-brand"; brand.href="index.html";
  brand.innerHTML="HeiBen<small>Heimat leben</small>";
  inner.appendChild(brand);

  var burger=document.createElement("button");
  burger.className="hb-burger"; burger.type="button";
  burger.setAttribute("aria-label","Menü öffnen"); burger.setAttribute("aria-expanded","false");
  burger.textContent="☰";
  burger.addEventListener("click",function(){
    var open=nav.classList.toggle("open");
    burger.setAttribute("aria-expanded",open?"true":"false");
    burger.setAttribute("aria-label",open?"Menü schließen":"Menü öffnen");
  });
  inner.appendChild(burger);

  var links=document.createElement("div");
  links.className="hb-links"; links.setAttribute("role","navigation"); links.setAttribute("aria-label","HeiBen Bereiche");
  WELTEN.forEach(function(w){ links.appendChild(link(w,true)); });
  var sep=document.createElement("span"); sep.className="hb-nav-sep"; links.appendChild(sep);
  EXTRA.forEach(function(x){ links.appendChild(link(x,false)); });
  inner.appendChild(links);

  nav.appendChild(inner);
  document.body.insertBefore(nav,document.body.firstChild);
})();
