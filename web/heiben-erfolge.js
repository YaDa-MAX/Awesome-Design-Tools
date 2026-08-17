/* HeiBen — Abzeichen/Erfolge. Leitet Erfolge aus dem vorhandenen Fortschritt ab.
   evaluate(ctx) erwartet: {kMast,kTot,best,tdTotal,pfDone,pfTot,resultCount}.
   Freischalt-Zeitpunkte werden in localStorage "heiben-erfolge" gemerkt (id -> ts). */
(function(){
  var SK="heiben-erfolge";
  var GRP={karten:"#b04a31",serie:"#4a5c39",pfade:"#a97a1d",tools:"#6b3951"};
  // metric(ctx) -> aktueller Wert; goal(ctx) -> Zielwert; erreicht wenn metric>=goal
  var BADGES=[
    {id:"karten5",  grp:"karten",sym:"5",  t:"Erste Begriffe",   d:"5 Begriffe gemeistert",            m:function(c){return c.kMast;}, g:function(){return 5;}},
    {id:"karten50", grp:"karten",sym:"50", t:"Wissensdurst",     d:"50 Begriffe gemeistert",           m:function(c){return c.kMast;}, g:function(){return 50;}},
    {id:"kartenH",  grp:"karten",sym:"½",  t:"Auf halbem Weg",   d:"Die Hälfte aller Begriffe",        m:function(c){return c.kMast;}, g:function(c){return Math.ceil((c.kTot||544)/2);}},
    {id:"kartenAll",grp:"karten",sym:"★",  t:"Begriffsmeister",  d:"Alle Begriffe gemeistert",         m:function(c){return c.kMast;}, g:function(c){return c.kTot||544;}},
    {id:"streak3",  grp:"serie", sym:"3",  t:"Dranbleiber",      d:"3 Tage in Folge",                  m:function(c){return c.best;},  g:function(){return 3;}},
    {id:"streak7",  grp:"serie", sym:"7",  t:"Wochenserie",      d:"7 Tage in Folge",                  m:function(c){return c.best;},  g:function(){return 7;}},
    {id:"streak30", grp:"serie", sym:"30", t:"Eiserne Disziplin",d:"30 Tage in Folge",                 m:function(c){return c.best;},  g:function(){return 30;}},
    {id:"tage50",   grp:"serie", sym:"∞",  t:"Stammgast",        d:"50 Tagesdosen insgesamt",          m:function(c){return c.tdTotal;},g:function(){return 50;}},
    {id:"pfad1",    grp:"pfade", sym:"1",  t:"Erster Pfad",      d:"Einen Lernpfad gemeistert",        m:function(c){return c.pfDone;},g:function(){return 1;}},
    {id:"pfad4",    grp:"pfade", sym:"4",  t:"Wegfinder",        d:"Vier Lernpfade gemeistert",        m:function(c){return c.pfDone;},g:function(){return 4;}},
    {id:"pfadAll",  grp:"pfade", sym:"✦",  t:"Alle Wege",        d:"Alle Lernpfade gemeistert",        m:function(c){return c.pfDone;},g:function(c){return c.pfTot||8;}},
    {id:"tool1",    grp:"tools", sym:"€",  t:"Erste Rechnung",   d:"Ein Geld-Werkzeug genutzt",        m:function(c){return c.resultCount;},g:function(){return 1;}}
  ];
  function load(){try{return JSON.parse(localStorage.getItem(SK))||{};}catch(e){return {};}}
  function save(o){try{localStorage.setItem(SK,JSON.stringify(o));}catch(e){}}

  function evaluate(ctx){
    ctx=ctx||{}; var store=load(), now=Date.now(), WEEK=7*86400000, changed=false;
    var earned=[], locked=[], neu=[];
    BADGES.forEach(function(b){
      var cur=b.m(ctx)||0, goal=b.g(ctx)||0, met=cur>=goal;
      if(met){
        if(!store[b.id]){ store[b.id]=now; changed=true; }
        var ts=store[b.id]; var isNeu=(now-ts)<WEEK;
        var rec={id:b.id,t:b.t,d:b.d,sym:b.sym,col:GRP[b.grp],ts:ts,neu:isNeu};
        earned.push(rec); if(isNeu)neu.push(rec);
      } else {
        locked.push({id:b.id,t:b.t,d:b.d,sym:b.sym,col:GRP[b.grp],cur:cur,goal:goal,p:goal?Math.min(cur/goal,1):0});
      }
    });
    if(changed)save(store);
    earned.sort(function(a,b){return b.ts-a.ts;});
    locked.sort(function(a,b){return b.p-a.p;}); // am nächsten dran zuerst
    return {earned:earned,locked:locked,neu:neu,total:BADGES.length,earnedCount:earned.length};
  }

  function medal(b,locked){
    var op=locked?'opacity:.5;filter:grayscale(.4)':'';
    var ring=locked?'border:2px dashed '+b.col:'background:'+b.col;
    var color=locked?b.col:'#fff';
    var neu=b.neu?'<span style="position:absolute;top:-5px;right:-5px;background:#a97a1d;color:#1f1c17;font-family:\'JetBrains Mono\',monospace;font-size:.46rem;letter-spacing:.04em;border-radius:999px;padding:.05rem .3rem">NEU</span>':'';
    return '<div title="'+b.t+' — '+b.d+'" style="position:relative;display:flex;flex-direction:column;align-items:center;gap:.3rem;width:74px;text-align:center;'+op+'">'+
      '<div style="position:relative;width:48px;height:48px;border-radius:50%;'+ring+';display:flex;align-items:center;justify-content:center;font-family:\'Fraunces\',serif;font-size:1.15rem;color:'+color+'">'+b.sym+neu+'</div>'+
      '<div style="font-size:.62rem;line-height:1.15;color:var(--ink2,#524a3e)">'+b.t+'</div>'+
      (locked?'<div style="width:100%;height:4px;background:var(--bg2,#ebe3d4);border-radius:9px;overflow:hidden"><i style="display:block;height:100%;width:'+Math.round(b.p*100)+'%;background:'+b.col+'"></i></div>':'')+
    '</div>';
  }

  /* Vollständige Sektion fürs Dashboard. opts.nextN = wie viele gesperrte zeigen (Default 3). */
  function sectionHTML(ctx,opts){
    opts=opts||{}; var res=evaluate(ctx); var nextN=opts.nextN==null?3:opts.nextN;
    var earnedHTML=res.earned.length?res.earned.map(function(b){return medal(b,false);}).join(''):
      '<div style="color:var(--ink2,#524a3e);font-size:.9rem">Noch keine Abzeichen — leg los, das erste ist nah.</div>';
    var next=res.locked.slice(0,nextN);
    var lockedHTML=next.length?('<div style="font-family:\'JetBrains Mono\',monospace;font-size:.56rem;letter-spacing:.12em;text-transform:uppercase;color:var(--aub,#6b3951);margin:1rem 0 .6rem">Als Nächstes</div>'+
      '<div style="display:flex;flex-wrap:wrap;gap:.9rem">'+next.map(function(b){return medal(b,true);}).join('')+'</div>'):'';
    return '<div style="display:flex;align-items:baseline;justify-content:space-between;gap:1rem;margin-bottom:.7rem">'+
        '<div class="h2" style="margin:0">Abzeichen</div>'+
        '<div style="font-family:\'JetBrains Mono\',monospace;font-size:.7rem;color:var(--ink2,#524a3e)">'+res.earnedCount+' / '+res.total+'</div></div>'+
      '<div style="background:var(--paper,#fffdf8);border:1px solid var(--rule,#d8cdb7);border-radius:16px;padding:1.1rem">'+
        '<div style="display:flex;flex-wrap:wrap;gap:.9rem">'+earnedHTML+'</div>'+lockedHTML+'</div>';
  }

  window.HeibenErfolge={BADGES:BADGES,evaluate:evaluate,sectionHTML:sectionHTML};
})();
