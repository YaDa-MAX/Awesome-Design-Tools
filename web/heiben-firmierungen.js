/* HeiBen — Firmierungs-Registry
   Jede Welt operiert als eigene Rechtsperson (in Gründung). Werte sind fiktive
   Platzhalter; HRB/USt-IdNr./IBAN folgen mit Eintragung. Geschäftsführung
   einheitlich: Yakin Benkhaouda & Katharina Hein. */
(function(){
  var HOLDING={
    key:'holding', name:'HeiBen Holding GmbH', rechtsform:'i. G.', kurz:'HeiBen Holding',
    sitz:'Köln', anschrift:'Anschrift i. G. · Köln', farbe:'#1f1c17',
    gf:['Yakin Benkhaouda','Katharina Hein'],
    register:'Amtsgericht Köln · HRB — (in Gründung)', ustid:'folgt (i. G.)',
    iban:'DE00 0000 0000 0000 0000 00 (Platzhalter)', claim:'Heimat leben'
  };
  function welt(o){
    return Object.assign({
      rechtsform:'i. G.', sitz:'Köln', anschrift:'Anschrift i. G. · Köln',
      gf:['Yakin Benkhaouda','Katharina Hein'],
      register:'Amtsgericht Köln · HRB — (in Gründung)', ustid:'folgt (i. G.)',
      iban:'DE00 0000 0000 0000 0000 00 (Platzhalter)', bic:'BIC folgt (i. G.)',
      ustSatz:19, margin:false, claim:'Heimat leben'
    }, o);
  }
  var FIRMEN={
    reisen: welt({ key:'reisen', welt:'reisen', name:'HeiBen Reisen GmbH', kurz:'HeiBen Reisen',
      farbe:'#a97a1d', refPrefix:'HB-', leistung:'Reise- & Hospitality-Leistungen',
      belegName:'Reise-Angebot', leistungswort:'Reiseleistung', margin:true,
      steuer:'Reiseleistungen; ggf. Margenbesteuerung nach § 25 UStG (vorbehaltlich).' }),
    wohnen: welt({ key:'wohnen', welt:'wohnen', name:'HeiBen Wohnen GmbH', kurz:'HeiBen Wohnen',
      farbe:'#4a5c39', refPrefix:'AB-', leistung:'Einrichtung & Manufaktur',
      belegName:'Einrichtungs-Angebot', leistungswort:'Lieferung/Werkleistung',
      steuer:'Lieferungen/Werkleistungen zzgl. 19 % USt., sofern nicht anders ausgewiesen.' }),
    kulinarik: welt({ key:'kulinarik', welt:'kulinarik', name:'HeiBen Kulinarik GmbH', kurz:'HeiBen Kulinarik',
      farbe:'#6b3951', refPrefix:'KB-', leistung:'Catering & Bewirtung',
      belegName:'Kulinarik-Angebot', leistungswort:'Bewirtung/Catering',
      steuer:'Bewirtung 19 % USt.; Außer-Haus-Lieferung ggf. 7 % USt.' }),
    immobilien: welt({ key:'immobilien', welt:'immobilien', name:'HeiBen Immobilien GmbH', kurz:'HeiBen Immobilien',
      farbe:'#792d29', refPrefix:'IM-', leistung:'Immobilienvermittlung (Nachweis/Vermittlung)',
      belegName:'Vermittlungs-Angebot', leistungswort:'Maklerleistung',
      steuer:'Maklercourtage zzgl. 19 % USt.; fällig mit Vertragsabschluss.' }),
    studio: welt({ key:'studio', welt:'studio', name:'HeiBen Studio GmbH', kurz:'HeiBen Studio',
      farbe:'#1f1c17', refPrefix:'ST-', leistung:'Medien, Magazin & Lebenswissen',
      belegName:'Studio-Angebot', leistungswort:'Medien-/Redaktionsleistung',
      steuer:'Digitale und journalistische Leistungen; USt. nach Leistungsart.' })
  };
  window.HEIBEN_HOLDING=HOLDING;
  window.HEIBEN_FIRMEN=FIRMEN;
  window.HEIBEN_FIRMA=function(w){ return FIRMEN[w]||FIRMEN.reisen; };
  window.HEIBEN_WELTEN=['reisen','wohnen','kulinarik','immobilien','studio'];
})();
