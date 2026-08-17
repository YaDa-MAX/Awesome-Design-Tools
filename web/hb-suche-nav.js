/* HeiBen — ausgelagert aus 25 Seiten (Remake v3, Welle 1).
   Inhalt wortgleich uebernommen, nicht ueberarbeitet. */
(function(){
  var nav=document.querySelector('nav'); if(!nav||document.getElementById('hbSearch')) return;
  if(getComputedStyle(nav).position==='static') nav.style.position='relative';
  var st=document.createElement('style');
  st.textContent='#hbSearch{position:relative;display:inline-flex;align-items:center;gap:7px;border:1px solid var(--rule,#d8cdb7);border-radius:999px;background:#fff;padding:8px 15px;margin:6px 0 6px 14px;vertical-align:middle;}'+
   '#hbSearch .lupe{color:#a39a8a;font-size:.95rem;line-height:1;pointer-events:none;}'+
   '#hbSearch input{border:0;background:none;outline:none;font:inherit;font-size:.85rem;color:var(--ink,#1f1c17);width:130px;transition:width .25s ease;}'+
   '#hbSearch input::placeholder{color:#a39a8a;}'+
   '#hbSearch:focus-within{border-color:var(--terracotta,#b04a31);}'+
   '#hbSearch:focus-within input{width:200px;}'+
   '#hbSearchDrop{display:none;position:absolute;top:calc(100% + 8px);left:0;min-width:300px;max-width:min(420px,92vw);background:var(--bg,#f3eee5);border:1px solid var(--rule,#d8cdb7);box-shadow:0 18px 40px rgba(31,28,23,.16);z-index:80;}'+
   '#hbSearchDrop.open{display:block;}'+
   '#hbSearchDrop a{display:block;padding:10px 14px;border-bottom:1px solid var(--rule,#d8cdb7);text-decoration:none;color:var(--ink,#1f1c17);font-size:.86rem;line-height:1.35;}'+
   '#hbSearchDrop a:last-child{border-bottom:0;}'+
   '#hbSearchDrop a:hover{background:#fff;}'+
   '#hbSearchDrop a small{display:block;font-family:\'JetBrains Mono\',monospace;font-size:.56rem;letter-spacing:.12em;text-transform:uppercase;color:#a39a8a;margin-top:2px;}'+
   '#hbSearchDrop .all{font-family:\'JetBrains Mono\',monospace;font-size:.62rem;letter-spacing:.12em;text-transform:uppercase;color:var(--terracotta,#b04a31);}'+
   '@media (max-width:780px){#hbSearch{margin-left:24px;} #hbSearch input{width:34vw;} #hbSearch:focus-within input{width:42vw;} #hbSearchDrop{position:fixed;left:12px;right:12px;min-width:0;max-width:none;}}';
  document.head.appendChild(st);
  var form=document.createElement('form'); form.id='hbSearch'; form.setAttribute('role','search');
  form.innerHTML='<span class="lupe" aria-hidden="true">⌕</span><input id="hbSearchInput" type="search" placeholder="Suche" autocomplete="off" aria-label="Suche" /><div id="hbSearchDrop" role="listbox"></div>';
  var k=document.getElementById('hbKontoNav');
  if(k) nav.insertBefore(form,k); else nav.appendChild(form);
  var inp=form.querySelector('input'), drop=form.querySelector('#hbSearchDrop');
  var IDX=null, loading=false;
  function loadIdx(cb){
    if(window.HEIBEN_SUCHE){ IDX=window.HEIBEN_SUCHE; cb(); return; }
    if(loading) return; loading=true;
    var sc=document.createElement('script'); sc.src='suche-index.js';
    sc.onload=function(){ IDX=window.HEIBEN_SUCHE||[]; cb(); };
    document.head.appendChild(sc);
  }
  var GR={rezept:'Rezept · Kulinarik',lebenswissen:'Lebenswissen · Studio',magazin:'Magazin · Studio',schaufenster:'Schaufenster',seite:'Seite'};
  function esc(t){ return String(t).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];}); }
  function suggest(){
    var q=inp.value.trim().toLowerCase();
    if(q.length<2||!IDX){ drop.classList.remove('open'); return; }
    var words=q.split(/\s+/).filter(Boolean), hits=[];
    for(var i=0;i<IDX.length&&hits.length<60;i++){
      var e=IDX[i], h=e.h.toLowerCase(), s=(e.s||'').toLowerCase(), x=(e.x||'').toLowerCase(), sc=0, ok=true;
      for(var w=0;w<words.length;w++){
        var ww=words[w];
        if(h.indexOf(ww)>=0) sc+=(h.indexOf(ww)===0?5:3);
        else if(s.indexOf(ww)>=0) sc+=2;
        else if(x.indexOf(ww)>=0) sc+=1;
        else { ok=false; break; }
      }
      if(ok) hits.push([sc,e]);
    }
    hits.sort(function(a,b){return b[0]-a[0];});
    if(!hits.length){ drop.innerHTML='<a class="all" href="suche.html?q='+encodeURIComponent(inp.value)+'">Keine Schnelltreffer — alle Ergebnisse ansehen →</a>'; drop.classList.add('open'); return; }
    drop.innerHTML=hits.slice(0,7).map(function(hh){
      var e=hh[1];
      return '<a href="'+esc(e.u)+'">'+esc(e.h)+'<small>'+esc(GR[e.t]||e.t)+'</small></a>';
    }).join('')+'<a class="all" href="suche.html?q='+encodeURIComponent(inp.value)+'">Alle Ergebnisse ('+hits.length+(hits.length>=60?'+':'')+') →</a>';
    drop.classList.add('open');
  }
  var t=null;
  inp.addEventListener('focus',function(){ loadIdx(suggest); });
  inp.addEventListener('input',function(){ clearTimeout(t); t=setTimeout(function(){ loadIdx(suggest); },130); });
  form.addEventListener('submit',function(e){ e.preventDefault(); var q=inp.value.trim(); if(q) location.href='suche.html?q='+encodeURIComponent(q); });
  document.addEventListener('click',function(e){ if(!form.contains(e.target)) drop.classList.remove('open'); });
  document.addEventListener('keydown',function(e){ if(e.key==='Escape') drop.classList.remove('open'); });
})();
