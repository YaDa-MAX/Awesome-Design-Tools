/* HeiBen — gemeinsamer "Mein-HeiBen"-Stand + kompaktes Startseiten-Panel.
   Genutzt von index.html (Panel bei Anmeldung) und kompatibel mit mein-heiben.html.
   Liest nur localStorage; optionale Globals TD_BANK (Kartenzahl) und PFADE (Lernpfade). */
(function(){
  var CARD_TOTAL_FALLBACK=544;     // Stand der Begriffskarten; via TD_BANK.length überschrieben falls geladen
  function get(k,f){try{var v=JSON.parse(localStorage.getItem(k));return v==null?f:v;}catch(e){return f;}}
  function pad(n){return n<10?"0"+n:""+n;}
  function dstr(d){return d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate());}
  function esc(s){return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}

  function compute(){
    var today=new Date(), TODAY=dstr(today);
    // Karten
    var ks=get("heiben_karten_v1",{mastered:{},gewusst:0,bestStreak:0});
    var kMast=ks.mastered?Object.keys(ks.mastered).length:0;
    var dueN=0; if(ks.sr){var nw=Date.now(); for(var id in ks.sr){ if(ks.sr[id]&&ks.sr[id].due<=nw)dueN++; }}
    var kTot=(typeof window.TD_BANK!=="undefined"&&window.TD_BANK.length)?window.TD_BANK.length:CARD_TOTAL_FALLBACK;
    // Tagesdosis
    var td=get("heiben-tagesdosis",{streak:0,best:0,total:0,last:null});
    var doneToday=td.last===TODAY;
    // Lernpfade
    var PF=(typeof window.PFADE!=="undefined")?window.PFADE:[];
    var lp=get("heiben-lernpfad",{}), verlauf=get("heiben-verlauf",[]);
    var readSet={}; (verlauf||[]).forEach(function(h){var m=String(h.u||"").match(/[?&]id=([^&]+)/);if(m)readSet[decodeURIComponent(m[1])]=1;});
    function isDone(id){ if(lp[id]===true)return true; if(lp[id]===false)return false; return !!readSet[id]; }
    var pfDone=0, artDone={}, artTot=0;
    PF.forEach(function(p){ var d=0; (p.steps||[]).forEach(function(s){artTot++; if(isDone(s[0])){d++;artDone[s[0]]=1;}}); if(p.steps&&d===p.steps.length)pfDone++; });
    var artDoneN=Object.keys(artDone).length;
    // Mein Garten (Pflanzen-Merkliste)
    var gartenN=0; try{var pv=get("heiben_pflanzen_v1",null); if(pv&&pv.merk){for(var gk in pv.merk){if(pv.merk[gk])gartenN++;}}}catch(e){}
    // Gesamtstand
    var pK=kTot?kMast/kTot:0, pP=artTot?artDoneN/artTot:0, pD=Math.min((td.total||0)/30,1);
    var overall=Math.round(((pK)+(pP)+(pD))/3*100);
    return {overall:overall,kMast:kMast,kTot:kTot,pfDone:pfDone,pfTot:PF.length,
            artDone:artDoneN,artTot:artTot,streak:td.streak||0,best:td.best||0,total:td.total||0,doneToday:doneToday,dueN:dueN,gartenN:gartenN};
  }

  function ring(pct,size){
    size=size||72; var sw=8,r=(size-sw)/2,c=2*Math.PI*r,off=c*(1-pct/100);
    return '<svg width="'+size+'" height="'+size+'" viewBox="0 0 '+size+' '+size+'" aria-hidden="true">'+
      '<circle cx="'+size/2+'" cy="'+size/2+'" r="'+r+'" fill="none" stroke="rgba(255,255,255,.15)" stroke-width="'+sw+'"/>'+
      '<circle cx="'+size/2+'" cy="'+size/2+'" r="'+r+'" fill="none" stroke="#a97a1d" stroke-width="'+sw+'" stroke-linecap="round" stroke-dasharray="'+c.toFixed(1)+'" stroke-dashoffset="'+off.toFixed(1)+'" transform="rotate(-90 '+size/2+' '+size/2+')"/>'+
      '<text x="'+size/2+'" y="'+(size/2+5)+'" text-anchor="middle" font-family="Fraunces,serif" font-size="18" fill="#a97a1d">'+pct+'</text></svg>';
  }

  function panelHTML(name){
    var s=compute();
    var h=new Date().getHours();
    var gruss=(h<11?"Guten Morgen":h<18?"Guten Tag":"Guten Abend");
    var vorname=String(name||"").trim().split(/\s+/)[0]||"";
    var dailyChip = s.doneToday
      ? '<span style="display:inline-block;font-family:\'JetBrains Mono\',monospace;font-size:.58rem;letter-spacing:.08em;text-transform:uppercase;color:#9ec27f;border:1px solid rgba(158,194,127,.5);border-radius:999px;padding:.2rem .6rem">Tagesdosis heute erledigt ✓</span>'
      : '<a href="tagesdosis.html" style="display:inline-block;font-family:\'JetBrains Mono\',monospace;font-size:.58rem;letter-spacing:.08em;text-transform:uppercase;color:#1f1c17;background:#a97a1d;border-radius:999px;padding:.25rem .7rem;text-decoration:none">Tagesdosis heute offen →</a>';
    var dueChip = s.dueN>0
      ? '<a href="begriffskarten.html?kat=faellig" style="display:inline-block;font-family:\'JetBrains Mono\',monospace;font-size:.58rem;letter-spacing:.08em;text-transform:uppercase;color:#f3eee5;border:1px solid rgba(243,238,229,.45);border-radius:999px;padding:.2rem .6rem;text-decoration:none">'+s.dueN+' Karten fällig →</a>'
      : '';
    return ''+
    '<div style="max-width:var(--maxw,1180px);margin:0 auto;padding:1.4rem 22px 0">'+
      '<div style="display:flex;align-items:center;gap:1.2rem;flex-wrap:wrap;background:#1f1c17;color:#f3eee5;border-radius:18px;padding:1.1rem 1.3rem">'+
        '<div style="flex:0 0 auto">'+ring(s.overall,76)+'</div>'+
        '<div style="flex:1 1 240px;min-width:200px">'+
          '<div style="font-family:\'JetBrains Mono\',monospace;font-size:.6rem;letter-spacing:.22em;text-transform:uppercase;color:#a97a1d">'+gruss+(vorname?', '+esc(vorname):'')+'</div>'+
          '<div style="font-family:\'Fraunces\',serif;font-size:1.35rem;color:#fff;line-height:1.2;margin:.15rem 0 .35rem">Dein HeiBen-Stand</div>'+
          '<div style="font-size:.9rem;color:#cdbfa8">'+s.kMast+' von '+s.kTot+' Begriffen'+(s.pfTot?' · '+s.pfDone+'/'+s.pfTot+' Pfade':'')+' · '+s.streak+'-Tage-Serie'+(s.gartenN>0?' · '+s.gartenN+(s.gartenN===1?' Pflanze':' Pflanzen')+' im Garten':'')+'</div>'+
          '<div style="margin-top:.6rem;display:flex;gap:.5rem;flex-wrap:wrap">'+dailyChip+dueChip+'</div>'+
        '</div>'+
        '<div style="flex:0 0 auto">'+
          '<a href="mein-heiben.html" style="display:inline-block;font-family:\'JetBrains Mono\',monospace;font-size:.64rem;letter-spacing:.1em;text-transform:uppercase;color:#1f1c17;background:#f3eee5;border-radius:10px;padding:.6rem .9rem;text-decoration:none;font-weight:600">Mein HeiBen öffnen →</a>'+
        '</div>'+
      '</div>'+
    '</div>';
  }

  function mount(containerId){
    try{
      var box=document.getElementById(containerId); if(!box)return;
      var u=(window.HeiBenKonto&&HeiBenKonto.current)?HeiBenKonto.current():null;
      if(u){ box.innerHTML=panelHTML(u.name); } else { box.innerHTML=""; }
    }catch(e){}
  }

  window.HeibenStand={compute:compute,panelHTML:panelHTML,mount:mount};
})();
