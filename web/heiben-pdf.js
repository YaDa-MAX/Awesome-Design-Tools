/* HeiBen — echte PDF-Erzeugung (clientseitig, offline) via jsPDF.
   - HeiBenPDF.beleg(o)        → Angebot/Auftragsbestätigung als PDF (Firmierung der Welt)
   - HeiBenPDF.expose(obj,firma)→ Immobilien-Exposé aus Objekt-Rohdaten als PDF
   Beide geben das jsPDF-Dokument zurück und speichern es (Download), außer opts.noSave. */
(function(){
  function getJsPDF(){ try{ return (window.jspdf&&window.jspdf.jsPDF)||window.jsPDF||null; }catch(e){ return null; } }
  function firma(w){ return (window.HEIBEN_FIRMA?window.HEIBEN_FIRMA(w):{name:'HeiBen',rechtsform:'i. G.',kurz:'HeiBen',farbe:'#1f1c17',gf:[],steuer:'',belegName:'Angebot',leistungswort:'Leistung',register:'',ustid:'',iban:'',sitz:'Köln',anschrift:'Köln',claim:'Heimat leben'}); }
  function hexToRgb(h){ h=(''+(h||'#000')).replace('#',''); if(h.length===3)h=h.replace(/(.)/g,'$1$1'); var n=parseInt(h,16); return [(n>>16)&255,(n>>8)&255,n&255]; }
  function eur(n,dec){ n=+n||0; dec=dec||0; return n.toLocaleString('de-DE',{minimumFractionDigits:dec,maximumFractionDigits:dec}); }
  function slug(s){ s=(''+(s||'Datei')).replace(/ä/g,'ae').replace(/ö/g,'oe').replace(/ü/g,'ue').replace(/Ä/g,'Ae').replace(/Ö/g,'Oe').replace(/Ü/g,'Ue').replace(/ß/g,'ss'); return s.replace(/[^A-Za-z0-9]+/g,'-').replace(/^-+|-+$/g,'')||'Datei'; }
  var W=595.28, H=841.89, M=48;

  function beleg(o,opts){
    var JS=getJsPDF(); if(!JS) return false; o=o||{};
    var f=firma(o.welt||'reisen'); var col=hexToRgb(f.farbe||'#1f1c17');
    var doc=new JS({unit:'pt',format:'a4'}); var y;
    doc.setFillColor(col[0],col[1],col[2]); doc.rect(0,0,W,10,'F');
    var isAuftrag=(o.typ==='auftrag'||o.typ==='buchung'); var titel=isAuftrag?'Auftragsbestätigung':(f.belegName||'Angebot'); y=46;
    doc.setTextColor(31,28,23); doc.setFont('helvetica','bold'); doc.setFontSize(13); doc.text(f.name+' '+(f.rechtsform||''),M,y);
    doc.setFont('helvetica','normal'); doc.setFontSize(8.5); doc.setTextColor(107,98,86);
    doc.text(f.leistung||'',M,y+13); doc.text(f.anschrift||'Köln',M,y+24);
    doc.setFont('times','normal'); doc.setFontSize(20); doc.setTextColor(col[0],col[1],col[2]); doc.text(titel,W-M,y,{align:'right'});
    doc.setFont('helvetica','normal'); doc.setFontSize(8.5); doc.setTextColor(107,98,86);
    var ry=y+16;
    doc.text('Beleg-Nr.: '+(o.referenz||'—'),W-M,ry,{align:'right'});
    doc.text('Datum: '+(o.datum||new Date().toISOString()).slice(0,10),W-M,ry+11,{align:'right'});
    if(o.gueltigBis){ ry+=11; doc.text('gültig bis: '+(''+o.gueltigBis).slice(0,10),W-M,ry+11,{align:'right'}); }
    if(o.persons){ ry+=11; doc.text('Personen: '+o.persons,W-M,ry+11,{align:'right'}); }
    y+=58;
    doc.setTextColor(107,98,86); doc.setFontSize(8.5); doc.text('Für',M,y);
    doc.setTextColor(31,28,23); doc.setFont('helvetica','bold'); doc.setFontSize(11); doc.text(o.kunde||'Kund:in',M,y+13); y+=38;
    var cLeist=M+24, cMenge=W-M-200, cEinzel=W-M-110, cSumme=W-M;
    doc.setFont('helvetica','bold'); doc.setFontSize(7.5); doc.setTextColor(107,98,86);
    doc.text('#',M,y); doc.text((f.leistungswort||'Leistung').toUpperCase(),cLeist,y);
    doc.text('MENGE',cMenge,y,{align:'right'}); doc.text('EINZEL',cEinzel,y,{align:'right'}); doc.text('SUMME',cSumme,y,{align:'right'});
    y+=6; doc.setDrawColor(31,28,23); doc.setLineWidth(0.8); doc.line(M,y,W-M,y); y+=15;
    doc.setFont('helvetica','normal'); doc.setFontSize(9.5); doc.setTextColor(31,28,23);
    var pos=o.positionen||[];
    pos.forEach(function(p,i){
      if(y>H-130){ doc.addPage(); y=60; }
      doc.text(String(i+1),M,y);
      var label=(p.t||''); if(p.datum) label+=' · '+p.datum;
      var lines=doc.splitTextToSize(label, cMenge-cLeist-14); doc.text(lines,cLeist,y);
      if(p.menge!=null) doc.text(String(p.menge),cMenge,y,{align:'right'});
      if(p.einzel!=null) doc.text(eur(p.einzel,2)+' €',cEinzel,y,{align:'right'});
      if(p.summe!=null) doc.text(eur(p.summe,2)+' €',cSumme,y,{align:'right'});
      var rh=(lines.length>1?lines.length*12+4:16); y+=rh;
      doc.setDrawColor(227,218,198); doc.setLineWidth(0.4); doc.line(M,y-6,W-M,y-6);
    });
    var gesamt=(o.gesamt!=null?o.gesamt:pos.reduce(function(s,p){return s+(+p.summe||0);},0));
    y+=4; doc.setDrawColor(31,28,23); doc.setLineWidth(1.4); doc.line(M,y,W-M,y); y+=17;
    doc.setFont('helvetica','bold'); doc.setFontSize(11); doc.setTextColor(31,28,23);
    doc.text('Gesamt'+(isAuftrag?'':' (Angebot)'),cLeist,y); doc.text(eur(gesamt,2)+' €',cSumme,y,{align:'right'}); y+=24;
    doc.setFont('helvetica','normal'); doc.setFontSize(8); doc.setTextColor(107,98,86);
    var stx=doc.splitTextToSize(f.steuer||'',W-2*M); doc.text(stx,M,y); y+=stx.length*10+4;
    if(o.hinweis){ var hx=doc.splitTextToSize(o.hinweis,W-2*M); doc.text(hx,M,y); }
    var fy=H-66; doc.setDrawColor(227,218,198); doc.setLineWidth(0.5); doc.line(M,fy,W-M,fy); fy+=12;
    doc.setFontSize(7.5); doc.setTextColor(107,98,86);
    doc.text([f.name+' '+(f.rechtsform||''),'Sitz: '+(f.sitz||'Köln'),(f.register||'')],M,fy);
    doc.text(['USt-IdNr.: '+(f.ustid||'—'),'Geschäftsführung:'].concat(f.gf||[]),M+185,fy);
    doc.text(['Bank (Platzhalter):',(f.iban||'—'),'„'+(f.claim||'Heimat leben')+'"'],M+365,fy);
    var fname=(isAuftrag?'Auftragsbestaetigung':'Angebot')+'_'+slug(o.referenz||'HeiBen')+'.pdf';
    if(!(opts&&opts.noSave)) doc.save(fname);
    return doc;
  }

  function expose(obj, firmaObj, opts){
    var JS=getJsPDF(); if(!JS) return false; obj=obj||{};
    var f=firmaObj||firma('immobilien'); var col=hexToRgb(f.farbe||'#792d29');
    var katRaw=(''+(obj.kat||obj.typ||'')).toLowerCase();
    var katMap={wohnung:'Wohnung',haus:'Haus',gewerbe:'Gewerbefläche',grundstueck:'Grundstück','grundstück':'Grundstück'};
    var katLabel=katMap[katRaw]||obj.typ||'Immobilie';
    var ort=obj.ort||obj.lage||''; var area=(obj.flaeche!=null?obj.flaeche:obj.m2)||0;
    var rooms=(obj.zimmer!=null?obj.zimmer:obj.zi); var preis=obj.preis||0;
    var provPct=(obj.provPct!=null?obj.provPct:3.57); var desc=obj.desc||'';
    var feat=obj.feat||[]; var energie=obj.energie||'Energieausweis: liegt vor, Details auf Anfrage.';
    var ppm=area?Math.round(preis/area):0; var provBetrag=Math.round(preis*provPct/100);
    var provTxt=(''+provPct).replace('.',',');
    var doc=new JS({unit:'pt',format:'a4'}); var y;
    // ---- Deckblatt ----
    doc.setFillColor(col[0],col[1],col[2]); doc.rect(0,0,W,150,'F');
    doc.setTextColor(255,255,255); doc.setFont('helvetica','bold'); doc.setFontSize(9); doc.text('EXPOSÉ · '+(''+katLabel).toUpperCase(),M,50);
    doc.setFont('times','normal'); doc.setFontSize(23); var tl=doc.splitTextToSize(obj.t||'Immobilie',W-2*M); doc.text(tl,M,80);
    doc.setFont('helvetica','normal'); doc.setFontSize(11); doc.text(ort,M,80+tl.length*23+4);
    y=190; doc.setFont('helvetica','normal'); doc.setFontSize(9); doc.setTextColor(107,98,86); doc.text('Kaufpreis',M,y);
    doc.setFont('times','normal'); doc.setFontSize(26); doc.setTextColor(col[0],col[1],col[2]); doc.text(eur(preis,0)+' €',M,y+27);
    y+=72; var facts=[['Wohn-/Nutzfläche',area+' m²'],['Zimmer',(rooms!=null&&rooms!==0?String(rooms):'—')],['Preis / m²',ppm?eur(ppm,0)+' €':'—']];
    var fw=(W-2*M)/3;
    facts.forEach(function(ft,i){ var x=M+i*fw; doc.setDrawColor(216,205,183); doc.setLineWidth(0.6); doc.rect(x,y,fw-12,54);
      doc.setFont('helvetica','normal'); doc.setFontSize(8); doc.setTextColor(107,98,86); doc.text(ft[0],x+10,y+19);
      doc.setFont('helvetica','bold'); doc.setFontSize(14); doc.setTextColor(31,28,23); doc.text(ft[1],x+10,y+42); });
    y+=84; doc.setFont('times','normal'); doc.setFontSize(14); doc.setTextColor(31,28,23); doc.text('Objektbeschreibung',M,y); y+=8;
    doc.setDrawColor(col[0],col[1],col[2]); doc.setLineWidth(1.6); doc.line(M,y,M+64,y); y+=18;
    doc.setFont('helvetica','normal'); doc.setFontSize(10); doc.setTextColor(60,55,46);
    var dl=doc.splitTextToSize(desc||'Beschreibung folgt.',W-2*M); doc.text(dl,M,y); y+=dl.length*13+16;
    if(feat.length){ doc.setFont('times','normal'); doc.setFontSize(14); doc.setTextColor(31,28,23); doc.text('Ausstattung',M,y); y+=8;
      doc.setDrawColor(col[0],col[1],col[2]); doc.setLineWidth(1.6); doc.line(M,y,M+64,y); y+=16;
      doc.setFont('helvetica','normal'); doc.setFontSize(10); doc.setTextColor(60,55,46);
      feat.forEach(function(ft){ if(y>H-90){doc.addPage();y=60;} doc.text('•  '+ft,M,y); y+=14; }); }
    // ---- Seite 2: Eckdaten / Lage / Kontakt ----
    doc.addPage(); doc.setFillColor(col[0],col[1],col[2]); doc.rect(0,0,W,8,'F'); y=58;
    doc.setFont('times','normal'); doc.setFontSize(15); doc.setTextColor(31,28,23); doc.text('Eckdaten',M,y); y+=22;
    var rows=[['Objektart',katLabel],['Lage',ort],['Wohn-/Nutzfläche',area+' m²'],['Zimmer',(rooms!=null&&rooms!==0?String(rooms):'—')],
      ['Kaufpreis',eur(preis,0)+' €'],['Preis / m²',ppm?eur(ppm,0)+' €':'—'],
      ['Käuferprovision',provTxt+' % inkl. USt ('+eur(provBetrag,0)+' €)'],
      ['Energieausweis',energie],['Verfügbarkeit','nach Vereinbarung'],['Objekt-Nr.',(obj.id||'—')]];
    doc.setFontSize(10);
    rows.forEach(function(r){ doc.setDrawColor(227,218,198); doc.setLineWidth(0.4); doc.line(M,y+4,W-M,y+4);
      doc.setFont('helvetica','normal'); doc.setTextColor(107,98,86); doc.text(r[0],M,y);
      doc.setFont('helvetica','bold'); doc.setTextColor(31,28,23);
      var vl=doc.splitTextToSize(String(r[1]),W-M-(M+175)); doc.text(vl,M+175,y); y+=(vl.length>1?vl.length*13+6:18); });
    y+=16; doc.setFont('times','normal'); doc.setFontSize(14); doc.setTextColor(31,28,23); doc.text('Lage',M,y); y+=16;
    doc.setFont('helvetica','normal'); doc.setFontSize(10); doc.setTextColor(60,55,46);
    var lage=ort+(obj.lat&&obj.lng?'   ·   Koordinaten '+obj.lat+', '+obj.lng:''); doc.text(doc.splitTextToSize(lage,W-2*M),M,y); y+=28;
    doc.setFont('times','normal'); doc.setFontSize(14); doc.setTextColor(31,28,23); doc.text('Ihr Ansprechpartner',M,y); y+=17;
    doc.setFont('helvetica','bold'); doc.setFontSize(10); doc.setTextColor(31,28,23); doc.text(f.name+' '+(f.rechtsform||''),M,y); y+=14;
    doc.setFont('helvetica','normal'); doc.setFontSize(9); doc.setTextColor(60,55,46);
    doc.text(['Geschäftsführung: '+((f.gf||[]).join(' · ')),'immobilien@heiben.de · '+(f.sitz||'Köln'),(f.register||'')],M,y);
    var fy=H-72; doc.setDrawColor(227,218,198); doc.setLineWidth(0.5); doc.line(M,fy,W-M,fy); fy+=12;
    doc.setFont('helvetica','normal'); doc.setFontSize(7.5); doc.setTextColor(107,98,86);
    var disc='Alle Angaben beruhen auf Informationen der Eigentümer:innen und erfolgen ohne Gewähr; sie sind kein Vertragsbestandteil. Zwischenverkauf vorbehalten. Käuferprovision '+provTxt+' % inkl. gesetzlicher USt., verdient und fällig mit Abschluss eines notariellen Kaufvertrags. '+f.name+' '+(f.rechtsform||'')+' · „'+(f.claim||'Heimat leben')+'"';
    doc.text(doc.splitTextToSize(disc,W-2*M),M,fy);
    var fname='Expose_'+slug(obj.t||obj.id||'Objekt')+'.pdf';
    if(!(opts&&opts.noSave)) doc.save(fname);
    return doc;
  }

  function ustBreakdown(brutto, satz, margin){
    brutto=Math.round((+brutto||0)*100)/100;
    if(margin){ return {margin:true, brutto:brutto, netto:null, ust:null, satz:0}; }
    satz=+satz||0;
    var netto=Math.round(brutto/(1+satz/100)*100)/100;
    var ust=Math.round((brutto-netto)*100)/100;
    return {margin:false, brutto:brutto, netto:netto, ust:ust, satz:satz};
  }

  function ustBreakdownMixed(positionen, defaultSatz, margin){
    positionen=positionen||[];
    var brutto=Math.round(positionen.reduce(function(s,p){return s+(+p.summe||0);},0)*100)/100;
    if(margin){ return {margin:true, brutto:brutto, netto:null, ust:null, groups:[]}; }
    var ds=(+defaultSatz||0); var byRate={};
    positionen.forEach(function(p){ var r=(p.ust!=null?+p.ust:ds); byRate[r]=(byRate[r]||0)+(+p.summe||0); });
    var groups=Object.keys(byRate).map(function(k){ var r=+k; var g=Math.round(byRate[k]*100)/100; var n=Math.round(g/(1+r/100)*100)/100; return {satz:r, brutto:g, netto:n, ust:Math.round((g-n)*100)/100}; });
    groups.sort(function(a,b){ return b.satz-a.satz; });
    var netto=Math.round(groups.reduce(function(s,g){return s+g.netto;},0)*100)/100;
    var ust=Math.round(groups.reduce(function(s,g){return s+g.ust;},0)*100)/100;
    return {margin:false, brutto:brutto, netto:netto, ust:ust, groups:groups};
  }

  function rechnung(o, opts){
    var JS=getJsPDF(); if(!JS) return false; o=o||{};
    var f=firma(o.welt||'reisen'); var col=hexToRgb(f.farbe||'#1f1c17');
    var pos=o.positionen||[];
    var brutto=(o.gesamt!=null?o.gesamt:pos.reduce(function(s,p){return s+(+p.summe||0);},0));
    var bd=ustBreakdownMixed(pos, f.ustSatz, f.margin);
    var ztage=(o.zahlungszielTage!=null?o.zahlungszielTage:14);
    var dDatum=(o.datum||new Date().toISOString()).slice(0,10);
    var faellig=new Date((o.datum?new Date(o.datum):new Date()).getTime()+ztage*86400000).toISOString().slice(0,10);
    var doc=new JS({unit:'pt',format:'a4'}); var y;
    doc.setFillColor(col[0],col[1],col[2]); doc.rect(0,0,W,10,'F'); y=46;
    doc.setTextColor(31,28,23); doc.setFont('helvetica','bold'); doc.setFontSize(13); doc.text(f.name+' '+(f.rechtsform||''),M,y);
    doc.setFont('helvetica','normal'); doc.setFontSize(8.5); doc.setTextColor(107,98,86);
    doc.text(f.leistung||'',M,y+13); doc.text(f.anschrift||'Köln',M,y+24);
    doc.setFont('times','normal'); doc.setFontSize(20); doc.setTextColor(col[0],col[1],col[2]); doc.text('Rechnung',W-M,y,{align:'right'});
    doc.setFont('helvetica','normal'); doc.setFontSize(8.5); doc.setTextColor(107,98,86); var ry=y+16;
    doc.text('Rechnungs-Nr.: '+(o.referenz||'—'),W-M,ry,{align:'right'});
    doc.text('Rechnungsdatum: '+dDatum,W-M,ry+11,{align:'right'});
    doc.text('Leistungsdatum: '+((o.leistungsdatum||dDatum)+'').slice(0,10),W-M,ry+22,{align:'right'});
    if(o.auftragRef) doc.text('Beleg/Auftrag: '+o.auftragRef,W-M,ry+33,{align:'right'});
    y+=60;
    doc.setTextColor(107,98,86); doc.setFontSize(8.5); doc.text('Rechnungsempfänger',M,y);
    doc.setTextColor(31,28,23); doc.setFont('helvetica','bold'); doc.setFontSize(11); doc.text(o.kunde||'Kund:in',M,y+13); y+=38;
    var cLeist=M+24, cMenge=W-M-200, cEinzel=W-M-110, cSumme=W-M;
    doc.setFont('helvetica','bold'); doc.setFontSize(7.5); doc.setTextColor(107,98,86);
    doc.text('#',M,y); doc.text((f.leistungswort||'Leistung').toUpperCase(),cLeist,y);
    doc.text('MENGE',cMenge,y,{align:'right'}); doc.text('EINZEL',cEinzel,y,{align:'right'}); doc.text('BETRAG',cSumme,y,{align:'right'});
    y+=6; doc.setDrawColor(31,28,23); doc.setLineWidth(0.8); doc.line(M,y,W-M,y); y+=15;
    doc.setFont('helvetica','normal'); doc.setFontSize(9.5); doc.setTextColor(31,28,23);
    pos.forEach(function(p,i){
      if(y>H-180){ doc.addPage(); y=60; }
      doc.text(String(i+1),M,y);
      var label=(p.t||''); if(p.datum) label+=' · '+p.datum;
      var lines=doc.splitTextToSize(label, cMenge-cLeist-14); doc.text(lines,cLeist,y);
      if(p.menge!=null) doc.text(String(p.menge),cMenge,y,{align:'right'});
      if(p.einzel!=null) doc.text(eur(p.einzel,2)+' €',cEinzel,y,{align:'right'});
      if(p.summe!=null) doc.text(eur(p.summe,2)+' €',cSumme,y,{align:'right'});
      var rh=(lines.length>1?lines.length*12+4:16); y+=rh;
      doc.setDrawColor(227,218,198); doc.setLineWidth(0.4); doc.line(M,y-6,W-M,y-6);
    });
    // Summen-Block (rechtsbündig)
    y+=6; var lx=W-M-190, vx=W-M;
    if(bd.margin){
      doc.setFont('helvetica','bold'); doc.setFontSize(12); doc.setTextColor(31,28,23);
      doc.setDrawColor(31,28,23); doc.setLineWidth(1.2); doc.line(lx,y-4,vx,y-4);
      doc.text('Rechnungsbetrag',lx,y+10); doc.text(eur(bd.brutto,2)+' €',vx,y+10,{align:'right'}); y+=26;
      doc.setFont('helvetica','normal'); doc.setFontSize(8); doc.setTextColor(107,98,86);
      var mx=doc.splitTextToSize('Reiseleistung; Margenbesteuerung nach § 25 UStG. Ein gesonderter Umsatzsteuerausweis erfolgt nicht.',W-2*M); doc.text(mx,M,y); y+=mx.length*10+6;
    } else if(bd.groups.length>=2){
      doc.setFont('helvetica','bold'); doc.setFontSize(7.5); doc.setTextColor(107,98,86);
      doc.text('USt-SATZ',lx,y); doc.text('NETTO',vx-92,y,{align:'right'}); doc.text('USt',vx,y,{align:'right'}); y+=12;
      doc.setFont('helvetica','normal'); doc.setFontSize(9); doc.setTextColor(60,55,46);
      bd.groups.forEach(function(gp){ doc.text(gp.satz+' %',lx,y); doc.text(eur(gp.netto,2)+' €',vx-92,y,{align:'right'}); doc.text(eur(gp.ust,2)+' €',vx,y,{align:'right'}); y+=13; });
      doc.setDrawColor(216,205,183); doc.setLineWidth(0.5); doc.line(lx,y-4,vx,y-4); y+=4;
      doc.text('Nettobetrag',lx,y); doc.text(eur(bd.netto,2)+' €',vx,y,{align:'right'}); y+=13;
      doc.text('USt gesamt',lx,y); doc.text(eur(bd.ust,2)+' €',vx,y,{align:'right'}); y+=8;
      doc.setDrawColor(31,28,23); doc.setLineWidth(1.2); doc.line(lx,y,vx,y); y+=14;
      doc.setFont('helvetica','bold'); doc.setFontSize(12); doc.setTextColor(31,28,23);
      doc.text('Rechnungsbetrag',lx,y); doc.text(eur(bd.brutto,2)+' €',vx,y,{align:'right'}); y+=24;
    } else {
      var satz1=(bd.groups[0]?bd.groups[0].satz:(f.ustSatz||0));
      doc.setFont('helvetica','normal'); doc.setFontSize(9.5); doc.setTextColor(60,55,46);
      doc.text('Nettobetrag',lx,y); doc.text(eur(bd.netto,2)+' €',vx,y,{align:'right'}); y+=15;
      doc.text('zzgl. '+satz1+' % USt',lx,y); doc.text(eur(bd.ust,2)+' €',vx,y,{align:'right'}); y+=8;
      doc.setDrawColor(31,28,23); doc.setLineWidth(1.2); doc.line(lx,y,vx,y); y+=14;
      doc.setFont('helvetica','bold'); doc.setFontSize(12); doc.setTextColor(31,28,23);
      doc.text('Rechnungsbetrag',lx,y); doc.text(eur(bd.brutto,2)+' €',vx,y,{align:'right'}); y+=24;
    }
    // Zahlungshinweis
    if(y>H-150){ doc.addPage(); y=60; }
    doc.setFillColor(235,227,212); doc.rect(M,y,W-2*M,52,'F');
    doc.setFont('helvetica','bold'); doc.setFontSize(9); doc.setTextColor(31,28,23); doc.text('Zahlung',M+12,y+16);
    doc.setFont('helvetica','normal'); doc.setFontSize(8.5); doc.setTextColor(60,55,46);
    doc.text('Bitte überweisen Sie '+eur(bd.brutto,2)+' € bis zum '+faellig+' ohne Abzug. Verwendungszweck: '+(o.referenz||''),M+12,y+30);
    doc.text('Empfänger: '+f.name+' '+(f.rechtsform||'')+'   ·   IBAN: '+(f.iban||'—')+'   ·   BIC: '+(f.bic||'—'),M+12,y+43);
    y+=66;
    // Pflichtangaben-Fuß
    var fy=H-66; doc.setDrawColor(227,218,198); doc.setLineWidth(0.5); doc.line(M,fy,W-M,fy); fy+=12;
    doc.setFont('helvetica','normal'); doc.setFontSize(7.5); doc.setTextColor(107,98,86);
    doc.text([f.name+' '+(f.rechtsform||''),'Sitz: '+(f.sitz||'Köln'),(f.register||'')],M,fy);
    doc.text(['USt-IdNr.: '+(f.ustid||'—'),'Geschäftsführung:'].concat(f.gf||[]),M+185,fy);
    doc.text(['Bank (Platzhalter):',(f.iban||'—'),'„'+(f.claim||'Heimat leben')+'"'],M+365,fy);
    var fname='Rechnung_'+slug(o.referenz||'HeiBen')+'.pdf';
    if(!(opts&&opts.noSave)) doc.save(fname);
    return doc;
  }

  function storno(o, opts){
    var JS=getJsPDF(); if(!JS) return false; o=o||{};
    var f=firma(o.welt||'reisen'); var col=hexToRgb(f.farbe||'#1f1c17');
    var pos=o.positionen||[]; var bd=ustBreakdownMixed(pos, f.ustSatz, f.margin);
    var brutto=(bd.brutto!=null?bd.brutto:(o.gesamt||0));
    var doc=new JS({unit:'pt',format:'a4'}); var y;
    doc.setFillColor(col[0],col[1],col[2]); doc.rect(0,0,W,10,'F'); y=46;
    doc.setTextColor(31,28,23); doc.setFont('helvetica','bold'); doc.setFontSize(13); doc.text(f.name+' '+(f.rechtsform||''),M,y);
    doc.setFont('helvetica','normal'); doc.setFontSize(8.5); doc.setTextColor(107,98,86);
    doc.text(f.leistung||'',M,y+13); doc.text(f.anschrift||'Köln',M,y+24);
    doc.setFont('times','normal'); doc.setFontSize(20); doc.setTextColor(col[0],col[1],col[2]); doc.text('Stornobeleg',W-M,y,{align:'right'});
    doc.setFont('helvetica','normal'); doc.setFontSize(8.5); doc.setTextColor(107,98,86); var ry=y+16;
    doc.text('Storno-Nr.: '+(o.referenz||'—'),W-M,ry,{align:'right'});
    doc.text('Datum: '+(o.datum||new Date().toISOString()).slice(0,10),W-M,ry+11,{align:'right'});
    if(o.originalRef) doc.text('storniert: '+(o.originalTyp?o.originalTyp+' ':'')+o.originalRef,W-M,ry+22,{align:'right'});
    y+=58;
    doc.setTextColor(107,98,86); doc.setFontSize(8.5); doc.text('Für',M,y);
    doc.setTextColor(31,28,23); doc.setFont('helvetica','bold'); doc.setFontSize(11); doc.text(o.kunde||'Kund:in',M,y+13); y+=36;
    doc.setFont('helvetica','normal'); doc.setFontSize(9.5); doc.setTextColor(60,55,46);
    var intro=doc.splitTextToSize('Hiermit stornieren wir '+(o.originalTyp?o.originalTyp+' ':'den Vorgang ')+(o.originalRef||'')+' vollständig. Bereits berechnete Beträge werden gutgeschrieben.',W-2*M);
    doc.text(intro,M,y); y+=intro.length*13+10;
    var cLeist=M+24, cMenge=W-M-200, cEinzel=W-M-110, cSumme=W-M;
    doc.setFont('helvetica','bold'); doc.setFontSize(7.5); doc.setTextColor(107,98,86);
    doc.text('#',M,y); doc.text('STORNO-POSITION',cLeist,y); doc.text('MENGE',cMenge,y,{align:'right'}); doc.text('EINZEL',cEinzel,y,{align:'right'}); doc.text('BETRAG',cSumme,y,{align:'right'});
    y+=6; doc.setDrawColor(31,28,23); doc.setLineWidth(0.8); doc.line(M,y,W-M,y); y+=15;
    doc.setFont('helvetica','normal'); doc.setFontSize(9.5); doc.setTextColor(31,28,23);
    pos.forEach(function(p,i){ if(y>H-160){doc.addPage();y=60;}
      doc.text(String(i+1),M,y);
      var label=(p.t||''); if(p.datum) label+=' · '+p.datum;
      var lines=doc.splitTextToSize(label, cMenge-cLeist-14); doc.text(lines,cLeist,y);
      if(p.menge!=null) doc.text(String(p.menge),cMenge,y,{align:'right'});
      if(p.einzel!=null) doc.text('-'+eur(p.einzel,2)+' €',cEinzel,y,{align:'right'});
      if(p.summe!=null) doc.text('-'+eur(p.summe,2)+' €',cSumme,y,{align:'right'});
      var rh=(lines.length>1?lines.length*12+4:16); y+=rh;
      doc.setDrawColor(227,218,198); doc.setLineWidth(0.4); doc.line(M,y-6,W-M,y-6);
    });
    y+=6; var lx=W-M-190, vx=W-M;
    if(bd.margin){
      doc.setFont('helvetica','bold'); doc.setFontSize(12); doc.setTextColor(31,28,23);
      doc.setDrawColor(31,28,23); doc.setLineWidth(1.2); doc.line(lx,y-4,vx,y-4);
      doc.text('Stornobetrag',lx,y+10); doc.text('-'+eur(brutto,2)+' €',vx,y+10,{align:'right'}); y+=26;
      doc.setFont('helvetica','normal'); doc.setFontSize(8); doc.setTextColor(107,98,86);
      var mx=doc.splitTextToSize('Reiseleistung; Margenbesteuerung nach § 25 UStG. Ein gesonderter Umsatzsteuerausweis erfolgt nicht.',W-2*M); doc.text(mx,M,y); y+=mx.length*10+6;
    } else {
      doc.setFont('helvetica','normal'); doc.setFontSize(9.5); doc.setTextColor(60,55,46);
      doc.text('Nettobetrag',lx,y); doc.text('-'+eur(bd.netto,2)+' €',vx,y,{align:'right'}); y+=15;
      doc.text('USt',lx,y); doc.text('-'+eur(bd.ust,2)+' €',vx,y,{align:'right'}); y+=8;
      doc.setDrawColor(31,28,23); doc.setLineWidth(1.2); doc.line(lx,y,vx,y); y+=14;
      doc.setFont('helvetica','bold'); doc.setFontSize(12); doc.setTextColor(31,28,23);
      doc.text('Stornobetrag',lx,y); doc.text('-'+eur(bd.brutto,2)+' €',vx,y,{align:'right'}); y+=24;
    }
    if(o.grund){ doc.setFont('helvetica','normal'); doc.setFontSize(8.5); doc.setTextColor(107,98,86); var gx=doc.splitTextToSize('Grund: '+o.grund,W-2*M); doc.text(gx,M,y); }
    var fy=H-66; doc.setDrawColor(227,218,198); doc.setLineWidth(0.5); doc.line(M,fy,W-M,fy); fy+=12;
    doc.setFont('helvetica','normal'); doc.setFontSize(7.5); doc.setTextColor(107,98,86);
    doc.text([f.name+' '+(f.rechtsform||''),'Sitz: '+(f.sitz||'Köln'),(f.register||'')],M,fy);
    doc.text(['USt-IdNr.: '+(f.ustid||'—'),'Geschäftsführung:'].concat(f.gf||[]),M+185,fy);
    doc.text(['Bank (Platzhalter):',(f.iban||'—'),'„'+(f.claim||'Heimat leben')+'"'],M+365,fy);
    var fname='Storno_'+slug(o.referenz||'HeiBen')+'.pdf';
    if(!(opts&&opts.noSave)) doc.save(fname);
    return doc;
  }

  function programm(o, opts){
    var JS=getJsPDF(); if(!JS) return false; o=o||{};
    var f=firma(o.welt||'reisen'); var col=hexToRgb(f.farbe||'#1f1c17');
    var doc=new JS({unit:'pt',format:'a4'}); var y;
    doc.setFillColor(col[0],col[1],col[2]); doc.rect(0,0,W,120,'F');
    doc.setTextColor(255,255,255); doc.setFont('helvetica','bold'); doc.setFontSize(9); doc.text((''+(o.art||'Programm')).toUpperCase(),M,46);
    doc.setFont('times','normal'); doc.setFontSize(22); var tl=doc.splitTextToSize(o.titel||(f.kurz+'-Konzept'),W-2*M); doc.text(tl,M,74);
    doc.setFont('helvetica','normal'); doc.setFontSize(10); var sub=[o.kunde,o.meta].filter(Boolean).join('   ·   '); if(sub) doc.text(sub,M,74+tl.length*22+2);
    y=152;
    (o.sektionen||[]).forEach(function(s){
      if(y>H-110){ doc.addPage(); y=60; }
      doc.setFont('times','normal'); doc.setFontSize(14); doc.setTextColor(31,28,23); doc.text(s.name||'',M,y); y+=7;
      doc.setDrawColor(col[0],col[1],col[2]); doc.setLineWidth(1.6); doc.line(M,y,M+58,y); y+=16;
      (s.items||[]).forEach(function(it){
        if(y>H-80){ doc.addPage(); y=60; }
        doc.setFont('helvetica','bold'); doc.setFontSize(10.5); doc.setTextColor(31,28,23);
        var nameW=(it.preis!=null)?(W-2*M-90):(W-2*M);
        var nl=doc.splitTextToSize(it.t||'',nameW); doc.text(nl,M,y);
        if(it.preis!=null){ doc.setFont('helvetica','normal'); doc.setTextColor(col[0],col[1],col[2]); doc.text(eur(it.preis,0)+' €',W-M,y,{align:'right'}); }
        y+=nl.length*13;
        if(it.meta){ doc.setFont('helvetica','normal'); doc.setFontSize(8.5); doc.setTextColor(107,98,86); var ml=doc.splitTextToSize(it.meta,W-2*M); doc.text(ml,M,y); y+=ml.length*11; }
        y+=6;
      });
      y+=8;
    });
    if(o.gesamt!=null){ if(y>H-90){doc.addPage();y=60;} doc.setDrawColor(31,28,23); doc.setLineWidth(1); doc.line(M,y,W-M,y); y+=16; doc.setFont('helvetica','bold'); doc.setFontSize(12); doc.setTextColor(31,28,23); doc.text('Gesamt',M,y); doc.text(eur(o.gesamt,2)+' €',W-M,y,{align:'right'}); y+=20; }
    if(o.hinweis){ doc.setFont('helvetica','normal'); doc.setFontSize(8.5); doc.setTextColor(107,98,86); var hx=doc.splitTextToSize(o.hinweis,W-2*M); doc.text(hx,M,y); }
    var fy=H-54; doc.setDrawColor(227,218,198); doc.setLineWidth(0.5); doc.line(M,fy,W-M,fy); fy+=12;
    doc.setFont('helvetica','normal'); doc.setFontSize(7.5); doc.setTextColor(107,98,86);
    doc.text(f.name+' '+(f.rechtsform||'')+'   ·   '+(f.sitz||'Köln')+'   ·   „'+(f.claim||'Heimat leben')+'"',M,fy);
    var fname=slug(o.art||'Dokument')+'_'+slug(o.titel||'HeiBen')+'.pdf';
    if(!(opts&&opts.noSave)) doc.save(fname);
    return doc;
  }

  function mahnung(o, opts){
    var JS=getJsPDF(); if(!JS) return false; o=o||{};
    var f=firma(o.welt||'reisen'); var col=hexToRgb(f.farbe||'#1f1c17');
    var stufe=o.mahnstufe||1; var titel=(stufe<=1?'Zahlungserinnerung':((stufe-1)+'. Mahnung'));
    var gebuehr=(+o.gebuehr||0); var betrag=(+o.betrag||0); var gesamt=Math.round((betrag+gebuehr)*100)/100;
    var doc=new JS({unit:'pt',format:'a4'}); var y;
    doc.setFillColor(col[0],col[1],col[2]); doc.rect(0,0,W,10,'F'); y=46;
    doc.setTextColor(31,28,23); doc.setFont('helvetica','bold'); doc.setFontSize(13); doc.text(f.name+' '+(f.rechtsform||''),M,y);
    doc.setFont('helvetica','normal'); doc.setFontSize(8.5); doc.setTextColor(107,98,86); doc.text(f.leistung||'',M,y+13); doc.text(f.anschrift||'Köln',M,y+24);
    doc.setFont('times','normal'); doc.setFontSize(20); doc.setTextColor(col[0],col[1],col[2]); doc.text(titel,W-M,y,{align:'right'});
    doc.setFont('helvetica','normal'); doc.setFontSize(8.5); doc.setTextColor(107,98,86); var ry=y+16;
    if(o.referenz) doc.text('Vorgang: '+o.referenz,W-M,ry,{align:'right'});
    doc.text('Datum: '+(o.datum||new Date().toISOString()).slice(0,10),W-M,ry+11,{align:'right'});
    doc.text('betrifft Rechnung: '+(o.rechnungNr||'—'),W-M,ry+22,{align:'right'});
    y+=58; doc.setTextColor(31,28,23); doc.setFont('helvetica','bold'); doc.setFontSize(11); doc.text(o.kunde||'Kund:in',M,y); y+=22;
    doc.setFont('helvetica','normal'); doc.setFontSize(10); doc.setTextColor(60,55,46);
    var txt;
    if(stufe<=1){ txt='vermutlich ist es Ihrer Aufmerksamkeit entgangen: unsere Rechnung '+(o.rechnungNr||'')+(o.faelligAlt?' war am '+(''+o.faelligAlt).slice(0,10)+' fällig':'')+' und ist bislang offen. Wir bitten um Ausgleich des unten genannten Betrags bis zum '+(''+o.neueFrist).slice(0,10)+'. Sollten Sie bereits gezahlt haben, betrachten Sie dieses Schreiben als gegenstandslos.'; }
    else { txt='trotz unserer Erinnerung ist die Rechnung '+(o.rechnungNr||'')+(o.faelligAlt?' (fällig am '+(''+o.faelligAlt).slice(0,10)+')':'')+' weiterhin offen. Wir fordern Sie auf, den unten genannten Betrag bis zum '+(''+o.neueFrist).slice(0,10)+' zu begleichen.'+(gebuehr?' Für den Mehraufwand berechnen wir eine Mahngebühr von '+eur(gebuehr,2)+' €.':''); }
    var tl=doc.splitTextToSize('Guten Tag,   '+txt, W-2*M); doc.text(tl,M,y); y+=tl.length*14+14;
    var bh=(gebuehr?64:48); doc.setFillColor(235,227,212); doc.rect(M,y,W-2*M,bh,'F'); var by=y+18;
    doc.setFont('helvetica','normal'); doc.setFontSize(9.5); doc.setTextColor(60,55,46);
    doc.text('Offener Rechnungsbetrag',M+12,by); doc.text(eur(betrag,2)+' €',W-M-12,by,{align:'right'});
    if(gebuehr){ by+=15; doc.text('Mahngebühr',M+12,by); doc.text(eur(gebuehr,2)+' €',W-M-12,by,{align:'right'}); }
    by+=17; doc.setFont('helvetica','bold'); doc.setFontSize(11); doc.setTextColor(31,28,23);
    doc.text('Zu zahlen bis '+(''+o.neueFrist).slice(0,10),M+12,by); doc.text(eur(gesamt,2)+' €',W-M-12,by,{align:'right'});
    y+=bh+18; doc.setFont('helvetica','normal'); doc.setFontSize(8.5); doc.setTextColor(107,98,86);
    doc.text(doc.splitTextToSize('Bitte überweisen auf: '+f.name+' '+(f.rechtsform||'')+'  ·  IBAN '+(f.iban||'—')+'  ·  BIC '+(f.bic||'—')+'  ·  Verwendungszweck '+(o.rechnungNr||''),W-2*M),M,y);
    var fy=H-66; doc.setDrawColor(227,218,198); doc.setLineWidth(0.5); doc.line(M,fy,W-M,fy); fy+=12;
    doc.setFont('helvetica','normal'); doc.setFontSize(7.5); doc.setTextColor(107,98,86);
    doc.text([f.name+' '+(f.rechtsform||''),'Sitz: '+(f.sitz||'Köln'),(f.register||'')],M,fy);
    doc.text(['USt-IdNr.: '+(f.ustid||'—'),'Geschäftsführung:'].concat(f.gf||[]),M+185,fy);
    doc.text(['Bank (Platzhalter):',(f.iban||'—'),'„'+(f.claim||'Heimat leben')+'"'],M+365,fy);
    var fname='Mahnung_'+slug(o.referenz||o.rechnungNr||'HeiBen')+'.pdf';
    if(!(opts&&opts.noSave)) doc.save(fname);
    return doc;
  }

  window.HeiBenPDF={ beleg:beleg, expose:expose, rechnung:rechnung, storno:storno, programm:programm, mahnung:mahnung, ustBreakdown:ustBreakdown, ustBreakdownMixed:ustBreakdownMixed, available:function(){ return !!getJsPDF(); } };
})();
