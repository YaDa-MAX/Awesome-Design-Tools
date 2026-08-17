/* HeiBen — Wochenrückblick "Deine Woche". Ohne Zeitstempel-Daten: merkt sich beim
   ersten Besuch der Woche den kumulierten Stand (Baseline) und zeigt die Zuwächse seither.
   Beim Wochenwechsel rollt die Baseline weiter; die letzte Woche wird als Vergleich behalten.
   Speicher: localStorage "heiben-wochen" = {weekKey, baseline:{...}, last:{...deltas}|null, baselineTs}. */
(function(){
  var SK="heiben-wochen";
  var MO=["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];
  function get(k,f){try{var v=JSON.parse(localStorage.getItem(k));return v==null?f:v;}catch(e){return f;}}
  function pad(n){return n<10?"0"+n:""+n;}
  function dstr(d){return d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate());}
  function mondayOf(d){ var x=new Date(d.getFullYear(),d.getMonth(),d.getDate()); var off=(x.getDay()+6)%7; x.setDate(x.getDate()-off); return x; }

  // Aktueller kumulierter Stand (nur was wir verlässlich zählen können)
  function metricsNow(){
    var ks=get("heiben_karten_v1",{mastered:{}}); var kMast=ks.mastered?Object.keys(ks.mastered).length:0;
    var td=get("heiben-tagesdosis",{total:0,streak:0}); var tdTotal=td.total||0, streak=td.streak||0;
    var PF=(typeof window.PFADE!=="undefined")?window.PFADE:[];
    var lp=get("heiben-lernpfad",{}), verlauf=get("heiben-verlauf",[]);
    var readSet={}; (verlauf||[]).forEach(function(h){var m=String(h.u||"").match(/[?&]id=([^&]+)/);if(m)readSet[decodeURIComponent(m[1])]=1;});
    function isDone(id){ if(lp[id]===true)return true; if(lp[id]===false)return false; return !!readSet[id]; }
    var pfDone=0, artDone={};
    PF.forEach(function(p){ var d=0; (p.steps||[]).forEach(function(s){ if(isDone(s[0])){d++;artDone[s[0]]=1;} }); if(p.steps&&d===p.steps.length)pfDone++; });
    return {kMast:kMast,tdTotal:tdTotal,artDone:Object.keys(artDone).length,pfDone:pfDone,streak:streak};
  }
  function diff(a,b){ // a - b, geclamped >=0
    return {kMast:Math.max(0,a.kMast-b.kMast),tdTotal:Math.max(0,a.tdTotal-b.tdTotal),
            artDone:Math.max(0,a.artDone-b.artDone),pfDone:Math.max(0,a.pfDone-b.pfDone)};
  }

  function computeWeek(){
    var now=new Date(), mon=mondayOf(now), weekKey=dstr(mon);
    var m=metricsNow();
    var store=get(SK,null);
    if(!store || store.weekKey!==weekKey){
      var last=(store&&store.baseline)?diff(m,store.baseline):null;  // Zuwachs der gerade beendeten Woche
      store={weekKey:weekKey, baseline:{kMast:m.kMast,tdTotal:m.tdTotal,artDone:m.artDone,pfDone:m.pfDone}, last:last, baselineTs:Date.now()};
      try{localStorage.setItem(SK,JSON.stringify(store));}catch(e){}
    }
    var wd=diff(m,store.baseline);
    return {monday:mon, week:wd, last:store.last, streak:m.streak, totalThisWeek:(wd.kMast+wd.tdTotal+wd.artDone+wd.pfDone)};
  }

  function rangeLabel(mon){
    var sun=new Date(mon.getFullYear(),mon.getMonth(),mon.getDate()+6);
    if(mon.getMonth()===sun.getMonth()) return mon.getDate()+".–"+sun.getDate()+". "+MO[sun.getMonth()];
    return mon.getDate()+". "+MO[mon.getMonth()]+" – "+sun.getDate()+". "+MO[sun.getMonth()];
  }

  function cardHTML(){
    var r=computeWeek(), w=r.week;
    var chips=[];
    if(w.kMast)  chips.push(['+'+w.kMast, w.kMast===1?'Begriff gemeistert':'Begriffe gemeistert','#b04a31']);
    if(w.tdTotal)chips.push(['+'+w.tdTotal, w.tdTotal===1?'Tagesdosis':'Tagesdosen','#4a5c39']);
    if(w.artDone)chips.push(['+'+w.artDone, w.artDone===1?'Pfad-Artikel':'Pfad-Artikel','#6b3951']);
    if(w.pfDone) chips.push(['+'+w.pfDone, w.pfDone===1?'Pfad gemeistert':'Pfade gemeistert','#a97a1d']);
    var chipsHTML=chips.length?('<div style="display:flex;flex-wrap:wrap;gap:.6rem;margin-top:.2rem">'+chips.map(function(c){
        return '<div style="background:var(--bg,#f3eee5);border:1px solid var(--rule,#d8cdb7);border-radius:11px;padding:.45rem .7rem;min-width:84px">'+
          '<div style="font-family:\'Fraunces\',serif;font-size:1.35rem;line-height:1;color:'+c[2]+'">'+c[0]+'</div>'+
          '<div style="font-size:.74rem;color:var(--ink2,#524a3e);line-height:1.2;margin-top:.15rem">'+c[1]+'</div></div>';
      }).join('')+'</div>'):'';
    var summary = r.totalThisWeek===0
      ? 'Diese Woche noch nichts notiert — ein einziger Begriff bringt dich ins Rollen.'
      : (r.totalThisWeek>=8 ? 'Eine richtig starke Woche. Genau so bleibt Wissen hängen.'
         : 'Schöne Woche bisher — jeder kleine Schritt zählt.');
    var streakLine = r.streak>0
      ? '<div style="margin-top:.9rem;font-size:.9rem;color:var(--ink2,#524a3e)">Aktuelle Serie: <b style="color:#4a5c39">'+r.streak+' Tag'+(r.streak===1?'':'e')+'</b> in Folge.</div>'
      : '';
    var lastLine='';
    if(r.last && (r.last.kMast+r.last.tdTotal+r.last.artDone+r.last.pfDone)>0){
      var parts=[];
      if(r.last.kMast)parts.push(r.last.kMast+' Begriffe');
      if(r.last.tdTotal)parts.push(r.last.tdTotal+' Tagesdosen');
      if(r.last.artDone)parts.push(r.last.artDone+' Artikel');
      if(r.last.pfDone)parts.push(r.last.pfDone+' Pfade');
      lastLine='<div style="margin-top:.5rem;font-size:.82rem;color:var(--ink2,#524a3e);opacity:.85">Letzte Woche: '+parts.join(' · ')+'.</div>';
    }
    return '<div style="background:var(--paper,#fffdf8);border:1px solid var(--rule,#d8cdb7);border-radius:16px;padding:1.2rem">'+
      '<div style="display:flex;align-items:baseline;justify-content:space-between;gap:1rem">'+
        '<div style="font-family:\'Fraunces\',serif;font-size:1.3rem;line-height:1.1">Deine Woche</div>'+
        '<div style="font-family:\'JetBrains Mono\',monospace;font-size:.62rem;letter-spacing:.08em;text-transform:uppercase;color:var(--ink2,#524a3e)">'+rangeLabel(r.monday)+'</div>'+
      '</div>'+
      '<div style="font-size:.95rem;color:var(--ink,#1f1c17);margin:.4rem 0 .2rem">'+summary+'</div>'+
      chipsHTML+streakLine+lastLine+'</div>';
  }

  window.HeibenRueckblick={computeWeek:computeWeek,cardHTML:cardHTML};
})();
