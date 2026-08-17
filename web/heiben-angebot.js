/* HeiBen — Angebotsvorlage & Automatismus (Ledger)
   - HeiBenLedger: geteiltes Vorgangs-Register über alle Welten (localStorage).
     Jede Welt protokolliert Angebote/Buchungen automatisch hierher; Cockpit
     (je Welt) und Holding-Dashboard lesen daraus. Trennung bleibt pro Welt.
   - HeiBenAngebot: erzeugt einen druckfertigen Beleg (Angebot/Auftragsbestätigung)
     mit der korrekten Firmierung der jeweiligen Welt. */
(function(){
  var LKEY='heiben-ledger';
  function read(){ try{ return JSON.parse(localStorage.getItem(LKEY))||[]; }catch(e){ return []; } }
  function write(a){ try{ localStorage.setItem(LKEY,JSON.stringify(a)); }catch(e){} }
  function eur(n){ return (Math.round((+n||0)*100)/100).toLocaleString('de-DE',{minimumFractionDigits:2,maximumFractionDigits:2}); }

  var Ledger={
    KEY:LKEY,
    log:function(e){
      e=e||{}; var a=read();
      e.id=e.id||('L'+Date.now().toString(36)+Math.random().toString(36).slice(2,5));
      e.datum=e.datum||new Date().toISOString();
      e.typ=e.typ||'buchung'; e.status=e.status||(e.typ==='angebot'?'angebot':'gebucht');
      // Idempotenz: gleiche Welt+Referenz+Typ aktualisieren statt duplizieren
      var idx=-1; for(var i=0;i<a.length;i++){ if(a[i].welt===e.welt&&a[i].referenz===e.referenz&&a[i].typ===e.typ){ idx=i; break; } }
      if(idx>=0){ a[idx]=Object.assign(a[idx],e); } else { a.push(e); }
      write(a);
      try{ if(window.HeiBenTrack&&window.HeiBenTrack.ev) window.HeiBenTrack.ev('ledger_log',{welt:e.welt,typ:e.typ,status:e.status}); }catch(_){ }
      return e;
    },
    update:function(welt,referenz,patch){ var a=read(); a.forEach(function(x){ if(x.welt===welt&&x.referenz===referenz) Object.assign(x,patch); }); write(a); },
    all:function(){ return read(); },
    byWelt:function(w){ return read().filter(function(x){ return x.welt===w; }); },
    remove:function(id){ write(read().filter(function(x){ return x.id!==id; })); },
    clear:function(){ write([]); },
    kpis:function(list){
      list=list||read();
      var k={count:list.length,angebote:0,buchungen:0,offen:0,gebucht:0,storniert:0,volumen:0,angebotVolumen:0,personen:0,volumenMonat:0,kunden:0,avgBuchung:0,conversion:0,pipeline:0};
      var monat=new Date().toISOString().slice(0,7); var namen={};
      list.forEach(function(x){
        var t=(+x.total||0); var st=(x.status||''); var nm=(x.kunde||x.titel||'').trim(); if(nm) namen[nm.toLowerCase()]=1;
        if(x.typ==='angebot'){ k.angebote++; k.angebotVolumen+=t; }
        else { k.buchungen++; if(st==='storniert'){ k.storniert++; } else { k.volumen+=t; k.personen+=(+x.persons||0); if((x.datum||'').slice(0,7)===monat) k.volumenMonat+=t; if(st==='offen') k.offen++; else k.gebucht++; } }
      });
      k.kunden=Object.keys(namen).length;
      k.pipeline=k.angebotVolumen;
      k.avgBuchung=k.gebucht?Math.round(k.volumen/k.gebucht):0;
      k.conversion=(k.angebote+k.gebucht)?Math.round(100*k.gebucht/(k.angebote+k.gebucht)):0;
      return k;
    },
    nextNr:function(welt, code){
      var KEY='heiben-seq'; var year=new Date().getFullYear(); var key=welt+':'+code+':'+year;
      var m; try{ m=JSON.parse(localStorage.getItem(KEY))||{}; }catch(e){ m={}; }
      var n=(m[key]||0)+1; m[key]=n; try{ localStorage.setItem(KEY,JSON.stringify(m)); }catch(e){}
      return code+'-'+year+'-'+('0000'+n).slice(-4);
    },
    ustSplit:function(positionen, defaultSatz, margin){
      positionen=positionen||[];
      var brutto=Math.round(positionen.reduce(function(s,p){return s+(+p.summe||0);},0)*100)/100;
      if(margin){ return {brutto:brutto, margin:true, rates:{}, netto:0, ust:0, margeBrutto:brutto}; }
      var ds=(+defaultSatz||0), byRate={};
      positionen.forEach(function(p){ var r=(p.ust!=null?+p.ust:ds); byRate[r]=(byRate[r]||0)+(+p.summe||0); });
      var rates={}, netto=0, ust=0;
      Object.keys(byRate).forEach(function(k){ var r=+k, g=Math.round(byRate[k]*100)/100, nt=Math.round(g/(1+r/100)*100)/100, us=Math.round((g-nt)*100)/100; rates[r]={netto:nt,ust:us,brutto:g}; netto+=nt; ust+=us; });
      return {brutto:brutto, margin:false, rates:rates, netto:Math.round(netto*100)/100, ust:Math.round(ust*100)/100, margeBrutto:0};
    },
    buchhaltungRows:function(list){
      list=list||read(); var F=window.HEIBEN_FIRMA; var self=this; var heute=new Date().toISOString().slice(0,10);
      return list.filter(function(x){ return x.typ==='buchung'; }).map(function(x){
        var f=(F?F(x.welt):{name:x.welt,ustSatz:19,margin:false}); var storno=((x.status||'')==='storniert'); var sign=storno?-1:1;
        var pos=(x.positionen&&x.positionen.length)?x.positionen:[{summe:(x.total||0),ust:(f.margin?undefined:f.ustSatz)}];
        var sp=self.ustSplit(pos, f.ustSatz, f.margin);
        function g(r){ return (sp.rates&&sp.rates[r])?sp.rates[r]:{netto:0,ust:0}; }
        return {
          datum:(x.datum||'').slice(0,10),
          belegart: storno?'Storno':(x.rechnungNr?'Rechnung':'Buchung'),
          belegnr: storno?(x.stornoNr||x.referenz):(x.rechnungNr||x.referenz),
          kunde: (x.kunde||x.titel||''), welt:x.welt, firma:(f.name||x.welt),
          brutto: Math.round(sp.brutto*sign*100)/100,
          netto19: Math.round(g(19).netto*sign*100)/100, ust19: Math.round(g(19).ust*sign*100)/100,
          netto7: Math.round(g(7).netto*sign*100)/100, ust7: Math.round(g(7).ust*sign*100)/100,
          margeBrutto: Math.round((sp.margeBrutto||0)*sign*100)/100,
          zahlstatus: (x.rechnungNr?(x.bezahlt?'bezahlt':((x.faelligAm&&x.faelligAm<heute)?'überfällig':'offen')):''),
          status: (x.status||'')
        };
      });
    }
  };
  window.HeiBenLedger=Ledger;

  /* HeiBenKunden — Kundenstamm (Mock-Persistenz in localStorage).
     Kontakte/Notizen werden lokal gespeichert; Aktivität (Vorgänge, Volumen,
     Welten, letzte Aktivität) wird aus dem Ledger abgeleitet und gemerged. */
  var KKEY='heiben-kunden';
  function kread(){ try{ return JSON.parse(localStorage.getItem(KKEY))||[]; }catch(e){ return []; } }
  function kwrite(a){ try{ localStorage.setItem(KKEY,JSON.stringify(a)); }catch(e){} }
  function normName(n){ return (''+(n||'')).trim().toLowerCase(); }
  var Kunden={
    KEY:KKEY,
    all:function(){ return kread(); },
    get:function(id){ return kread().filter(function(x){return x.id===id;})[0]||null; },
    upsert:function(rec){ rec=rec||{}; var a=kread();
      if(!rec.id){ var nn=normName(rec.name), ex=null; for(var i=0;i<a.length;i++){ if(normName(a[i].name)===nn){ ex=a[i]; break; } }
        if(ex){ rec.id=ex.id; } else { rec.id='K'+Date.now().toString(36)+Math.random().toString(36).slice(2,4); rec.erstellt=new Date().toISOString(); } }
      var idx=-1; for(var j=0;j<a.length;j++){ if(a[j].id===rec.id){ idx=j; break; } }
      if(idx>=0){ a[idx]=Object.assign(a[idx],rec); } else { a.push(rec); }
      kwrite(a); return rec; },
    remove:function(id){ kwrite(kread().filter(function(x){return x.id!==id;})); },
    clear:function(){ kwrite([]); },
    derive:function(list){
      list=list||read(); var store=kread(); var map={};
      function row(name){ var nn=normName(name); if(!map[nn]) map[nn]={name:name,vorgaenge:0,angebote:0,gebucht:0,volumen:0,welten:{},letzte:''}; return map[nn]; }
      list.forEach(function(x){ var nm=(x.kunde||x.titel||'').trim(); if(!nm)return; var r=row(nm); r.vorgaenge++;
        if(x.welt)r.welten[x.welt]=1; if((x.datum||'')>r.letzte)r.letzte=(x.datum||'');
        if(x.typ==='angebot'){ r.angebote++; } else if((x.status||'')!=='storniert'){ r.volumen+=(+x.total||0); if((x.status||'')!=='offen') r.gebucht++; } });
      store.forEach(function(s){ var r=map[normName(s.name)]||row(s.name); r.id=s.id; r.email=s.email||''; r.tel=s.tel||''; r.notiz=s.notiz||''; r.erstellt=s.erstellt||r.erstellt; });
      var rows=Object.keys(map).map(function(k){ var r=map[k]; r.welten=Object.keys(r.welten); return r; });
      rows.sort(function(a,b){ return (b.volumen-a.volumen)||(b.vorgaenge-a.vorgaenge); });
      return rows;
    }
  };
  window.HeiBenKunden=Kunden;

  function firma(w){ return (window.HEIBEN_FIRMA?window.HEIBEN_FIRMA(w):{name:'HeiBen',kurz:'HeiBen',farbe:'#1f1c17',gf:[],steuer:'',belegName:'Angebot',leistungswort:'Leistung',register:'',ustid:'',iban:'',sitz:'Köln',anschrift:'Köln'}); }

  var Angebot={
    /* baut den Beleg-HTML-String (testbar ohne Druck) */
    html:function(o){
      o=o||{}; var f=firma(o.welt||'reisen');
      var isAuftrag=(o.typ==='auftrag'||o.typ==='buchung');
      var titel=isAuftrag?'Auftragsbestätigung':(f.belegName||'Angebot');
      var pos=(o.positionen||[]).map(function(p,i){
        return '<tr><td>'+(i+1)+'</td><td>'+(p.t||'')+(p.datum?' <span class="mut">· '+p.datum+'</span>':'')+'</td>'+
          '<td class="r">'+(p.menge!=null?p.menge:'')+'</td>'+
          '<td class="r">'+(p.einzel!=null?eur(p.einzel)+' €':'')+'</td>'+
          '<td class="r">'+(p.summe!=null?eur(p.summe)+' €':'')+'</td></tr>';
      }).join('');
      var gesamt=(o.gesamt!=null?o.gesamt:(o.positionen||[]).reduce(function(s,p){return s+(+p.summe||0);},0));
      var datum=(o.datum||new Date().toISOString()).slice(0,10);
      var gf=(f.gf||[]).join(' · ');
      return '<!DOCTYPE html><html lang="de"><head><meta charset="utf-8"><title>'+titel+' '+(o.referenz||'')+' — '+f.name+'</title>'+
        '<style>@page{margin:18mm;}*{box-sizing:border-box;}body{font-family:Georgia,\'Times New Roman\',serif;color:#1f1c17;margin:0;padding:24px;font-size:13px;line-height:1.5;}'+
        '.bar{height:6px;background:'+(f.farbe||'#1f1c17')+';border-radius:3px;margin-bottom:18px;}'+
        '.head{display:flex;justify-content:space-between;align-items:flex-start;gap:24px;}'+
        '.firm b{font-size:1.15rem;}.mut{color:#6b6256;}.small{font-size:11px;color:#6b6256;}'+
        '.doc{ text-align:right;}.doc h1{font-family:Georgia,serif;font-size:1.5rem;margin:0 0 4px;color:'+(f.farbe||'#1f1c17')+';}'+
        'table{width:100%;border-collapse:collapse;margin:22px 0 10px;}th,td{text-align:left;padding:7px 8px;border-bottom:1px solid #e3dac6;}'+
        'th{font-size:10px;letter-spacing:.06em;text-transform:uppercase;color:#6b6256;}td.r,th.r{text-align:right;}'+
        '.tot td{border-top:2px solid #1f1c17;border-bottom:0;font-weight:bold;font-size:1.05rem;}'+
        '.foot{margin-top:26px;border-top:1px solid #e3dac6;padding-top:10px;font-size:10.5px;color:#6b6256;display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap;}'+
        '.foot div{flex:1;min-width:150px;}.kunde{margin:14px 0 4px;}</style></head><body>'+
        '<div class="bar"></div>'+
        '<div class="head"><div class="firm"><b>'+f.name+'</b> <span class="mut">'+(f.rechtsform||'')+'</span><br>'+
          '<span class="small">'+(f.leistung||'')+'</span><br><span class="small">'+(f.anschrift||'Köln')+'</span></div>'+
          '<div class="doc"><h1>'+titel+'</h1><div class="small">Beleg-Nr.: <b>'+(o.referenz||'—')+'</b><br>Datum: '+datum+
            (o.gueltigBis?'<br>gültig bis: '+(''+o.gueltigBis).slice(0,10):'')+(o.persons?'<br>Personen: '+o.persons:'')+'</div></div></div>'+
        '<div class="kunde"><span class="small">Für</span><br><b>'+(o.kunde||'Kund:in')+'</b></div>'+
        '<table><thead><tr><th>#</th><th>'+(f.leistungswort||'Leistung')+'</th><th class="r">Menge</th><th class="r">Einzel</th><th class="r">Summe</th></tr></thead>'+
          '<tbody>'+(pos||'<tr><td colspan="5" class="mut">keine Positionen</td></tr>')+
          '<tr class="tot"><td colspan="4">Gesamt'+(isAuftrag?'':' (Angebot)')+'</td><td class="r">'+eur(gesamt)+' €</td></tr></tbody></table>'+
        '<div class="small">'+(f.steuer||'')+'</div>'+
        (o.hinweis?'<div class="small" style="margin-top:6px;">'+o.hinweis+'</div>':'')+
        '<div class="foot">'+
          '<div><b>'+f.name+'</b> '+(f.rechtsform||'')+'<br>Sitz: '+(f.sitz||'Köln')+'<br>'+(f.register||'')+'</div>'+
          '<div>USt-IdNr.: '+(f.ustid||'—')+'<br>Geschäftsführung:<br>'+gf+'</div>'+
          '<div>Bank (Platzhalter):<br>'+(f.iban||'—')+'<br><i>„'+(f.claim||'Heimat leben')+'"</i></div>'+
        '</div></body></html>';
    },
    /* öffnet Druckansicht; protokolliert optional ins Ledger */
    dokument:function(o){
      if(window.HeiBenPDF&&window.HeiBenPDF.beleg){ try{ var d=window.HeiBenPDF.beleg(o); if(d) return d; }catch(e){} }
      var html=this.html(o); var w=window.open('','_blank');
      if(!w){ alert('Bitte Pop-ups erlauben, um den Beleg zu öffnen.'); return null; }
      w.document.open(); w.document.write(html); w.document.close();
      try{ w.focus(); setTimeout(function(){ try{w.print();}catch(e){} },350); }catch(e){}
      return w;
    }
  };
  window.HeiBenAngebot=Angebot;
})();
