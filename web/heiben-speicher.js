/* ============================================================
   HeiBen Speicher — der Vertrag über alles, was lokal bleibt.
   Remake v3, Welle 6.

   AUSGANGSLAGE: 88 Schlüssel in zwei Namensschemata (heiben-… und
   heiben_…_v1), verstreut über 100 Seiten, ohne zentrale Stelle und ohne
   Möglichkeit, den eigenen Stand mitzunehmen. „Mein HeiBen" las fünf davon.

   GRUNDSATZ: Die Schlüsselnamen sind ein STABILER VERTRAG und werden hier
   nur BESCHRIEBEN, niemals umbenannt. Bestehende Seiten schreiben weiter
   direkt in localStorage — dieses Modul zwingt niemanden zu etwas.

   AUFZÄHLUNG kommt aus dem echten Speicher, nicht aus dem Register: nur so
   werden auch zur Laufzeit gebildete Schlüssel (heiben-immo-…, heiben-kuli-…)
   miterfasst. Das Register dient der Zuordnung zur Welt, nicht der Auswahl.
   ============================================================ */
(function () {
  'use strict';
  var PRAEFIX = /^heiben[-_]/;
  var FASSUNG = 1;

  /* Zuordnung Schlüssel → Welt, erhoben aus dem Bestand (v3-W6). */
  var REGISTER = {
    "heiben-ab": "holding",
    "heiben-abo": "konto",
    "heiben-app-onboarding": "holding",
    "heiben-bundle": "konto",
    "heiben-consent": "holding",
    "heiben-einkauf": "kulinarik",
    "heiben-erfolge": "wissen",
    "heiben-events": "holding",
    "heiben-galerie": "wohnen",
    "heiben-immo": "immobilien",
    "heiben-immobilien": "immobilien",
    "heiben-invoices": "konto",
    "heiben-kalk-annahmen": "wohnen",
    "heiben-kalk-eigendesign": "wohnen",
    "heiben-konto-session": "konto",
    "heiben-konto-users": "konto",
    "heiben-kuli": "kulinarik",
    "heiben-kulinarik": "kulinarik",
    "heiben-kulinarik-favs": "kulinarik",
    "heiben-kulinarik-notizen": "kulinarik",
    "heiben-kulinarik-portionen": "kulinarik",
    "heiben-kulinarik-vorrat": "kulinarik",
    "heiben-kulinarik-wochenplan": "kulinarik",
    "heiben-kunden": "holding",
    "heiben-lead": "holding",
    "heiben-ledger": "holding",
    "heiben-lernpfad": "wissen",
    "heiben-lw-favs": "studio",
    "heiben-lw-stand": "studio",
    "heiben-magazin": "studio",
    "heiben-mc-presets": "wohnen",
    "heiben-mc-profile": "wohnen",
    "heiben-newsletter-gaeste": "konto",
    "heiben-nutri-log": "kulinarik",
    "heiben-nutri-profile": "kulinarik",
    "heiben-outbox": "holding",
    "heiben-pay": "konto",
    "heiben-platzhalter-21": "studio",
    "heiben-pwa-dismiss": "holding",
    "heiben-recipes-": "kulinarik",
    "heiben-redaktion": "studio",
    "heiben-ref": "konto",
    "heiben-reise": "reisen",
    "heiben-reisen": "reisen",
    "heiben-reiseplan": "reisen",
    "heiben-reminders": "konto",
    "heiben-rewards": "konto",
    "heiben-schaufenster": "holding",
    "heiben-seq": "holding",
    "heiben-shop-merkliste": "wohnen",
    "heiben-shop-orders": "konto",
    "heiben-shop-warenkorb": "kulinarik",
    "heiben-streak": "konto",
    "heiben-tagesdosis": "wissen",
    "heiben-verlauf": "wissen",
    "heiben-weight-log": "kulinarik",
    "heiben-wochen": "wissen",
    "heiben-wohn": "wohnen",
    "heiben-wohnen": "wohnen",
    "heiben_catalog": "wohnen",
    "heiben_check_v1": "wissen",
    "heiben_debt_v1": "wissen",
    "heiben_fire_v1": "wissen",
    "heiben_gehalt_v1": "wissen",
    "heiben_immo_v1": "immobilien",
    "heiben_job_v1": "wissen",
    "heiben_karten_v1": "wissen",
    "heiben_koeln_v1": "holding",
    "heiben_konsum_v1": "wissen",
    "heiben_leads": "holding",
    "heiben_mietkauf_v1": "wissen",
    "heiben_orders": "holding",
    "heiben_ordner_v1": "konto",
    "heiben_pflanzen_v1": "wissen",
    "heiben_quiz_v1": "wissen",
    "heiben_reise_v1": "reisen",
    "heiben_results": "wissen",
    "heiben_rooms": "wohnen",
    "heiben_sparziel_v1": "wissen",
    "heiben_speedrun_v1": "wissen",
    "heiben_steuer_v1": "wissen",
    "heiben_strom_v1": "wissen",
    "heiben_studium_v1": "wissen",
    "heiben_tasten_v1": "wissen",
    "heiben_vers_v1": "wissen",
    "heiben_wof_v1": "wissen",
    "heiben_wohnung_v1": "wissen",
    "heiben_zins_v1": "wissen"
  };

  /* Ein neuer Schlüssel soll ohne Pflege richtig landen: erst Präfixregeln,
     dann das Register, sonst „sonstige". */
  var REGELN = [
    [/^heiben-kulinarik|^heiben-(einkauf|kuli|wochen$)/, 'kulinarik'],
    [/^heiben-(mc-|kalk-|galerie|wohnen)|^heiben_wohn/, 'wohnen'],
    [/^heiben-(immo|immobilien)|^heiben_immo/, 'immobilien'],
    [/^heiben-(reise|reisen)|^heiben_reise/, 'reisen'],
    [/^heiben-(lw-|magazin|redaktion|schaufenster)/, 'studio'],
    [/^heiben-(konto|abo|bundle|invoices|pay|orders|shop-)|^heiben_(orders|leads)/, 'konto'],
    [/^heiben-(lernpfad|verlauf|tagesdosis|erfolge)|^heiben_(karten|quiz|results)/, 'wissen'],
  ];

  var WELTNAME = {
    reisen: 'Reisen', wohnen: 'Wohnen', immobilien: 'Immobilien', studio: 'Studio',
    kulinarik: 'Kulinarik', wissen: 'Wissen', konto: 'Mein HeiBen',
    holding: 'Unternehmen', sonstige: 'Sonstiges',
  };

  function welt(k) {
    if (REGISTER[k]) return REGISTER[k];
    for (var i = 0; i < REGELN.length; i++) if (REGELN[i][0].test(k)) return REGELN[i][1];
    return 'sonstige';
  }

  function schluessel() {
    var out = [];
    try {
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        if (k && PRAEFIX.test(k)) out.push(k);
      }
    } catch (e) { /* Speicher gesperrt — dann eben nichts */ }
    return out.sort();
  }

  function bytes(k) {
    try { return (localStorage.getItem(k) || '').length + k.length; } catch (e) { return 0; }
  }

  function uebersicht() {
    var nach = {};
    schluessel().forEach(function (k) {
      var w = welt(k);
      nach[w] = nach[w] || { welt: w, name: WELTNAME[w] || w, anzahl: 0, bytes: 0, schluessel: [] };
      nach[w].anzahl++; nach[w].bytes += bytes(k); nach[w].schluessel.push(k);
    });
    return Object.keys(nach).map(function (w) { return nach[w]; })
      .sort(function (a, b) { return b.bytes - a.bytes; });
  }

  function lesen(k, ersatz) {
    try {
      var v = localStorage.getItem(k);
      if (v === null) return ersatz;
      try { return JSON.parse(v); } catch (e) { return v; }
    } catch (e) { return ersatz; }
  }

  function schreiben(k, wert) {
    try {
      localStorage.setItem(k, typeof wert === 'string' ? wert : JSON.stringify(wert));
      return true;
    } catch (e) { return false; }
  }

  function entfernen(k) { try { localStorage.removeItem(k); return true; } catch (e) { return false; } }

  function exportieren() {
    var daten = {};
    schluessel().forEach(function (k) { try { daten[k] = localStorage.getItem(k); } catch (e) {} });
    return { marke: 'heiben', fassung: FASSUNG, erzeugt: new Date().toISOString(),
      anzahl: Object.keys(daten).length, daten: daten };
  }

  function dateiname() {
    var d = new Date();
    function p(n) { return (n < 10 ? '0' : '') + n; }
    return 'heiben-stand-' + d.getFullYear() + p(d.getMonth() + 1) + p(d.getDate()) + '.json';
  }

  /* Gibt den Stand als Datei aus. Ohne Server, ohne Übertragung — die Datei
     entsteht im Browser und bleibt beim Nutzer. */
  function alsDatei() {
    var text = JSON.stringify(exportieren(), null, 1);
    var blob = new Blob([text], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; a.download = dateiname();
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
    return text.length;
  }

  /* Nimmt einen Export wieder auf. Standard ist ZUSAMMENFÜHREN — nichts wird
     still überschrieben, was der Nutzer inzwischen angelegt hat. */
  function importieren(text, wahl) {
    wahl = wahl || {};
    var paket;
    try { paket = typeof text === 'string' ? JSON.parse(text) : text; }
    catch (e) { return { fehler: 'Die Datei ist kein gültiges JSON.' }; }
    if (!paket || paket.marke !== 'heiben' || !paket.daten) {
      return { fehler: 'Das ist kein HeiBen-Stand.' };
    }
    if (paket.fassung > FASSUNG) {
      return { fehler: 'Der Stand stammt aus einer neueren Fassung (' + paket.fassung + ').' };
    }
    var uebernommen = 0, uebersprungen = 0;
    Object.keys(paket.daten).forEach(function (k) {
      if (!PRAEFIX.test(k)) { uebersprungen++; return; }
      var da = false;
      try { da = localStorage.getItem(k) !== null; } catch (e) {}
      if (da && !wahl.ersetzen) { uebersprungen++; return; }
      try { localStorage.setItem(k, paket.daten[k]); uebernommen++; } catch (e) { uebersprungen++; }
    });
    return { gelesen: Object.keys(paket.daten).length, uebernommen: uebernommen,
      uebersprungen: uebersprungen, erzeugt: paket.erzeugt };
  }

  function zuruecksetzen(w) {
    var weg = schluessel().filter(function (k) { return !w || w === 'alle' || welt(k) === w; });
    weg.forEach(entfernen);
    return weg.length;
  }

  window.HeiBenSpeicher = {
    REGISTER: REGISTER, WELTNAME: WELTNAME, FASSUNG: FASSUNG,
    welt: welt, schluessel: schluessel, uebersicht: uebersicht,
    lesen: lesen, schreiben: schreiben, entfernen: entfernen,
    exportieren: exportieren, alsDatei: alsDatei, importieren: importieren,
    zuruecksetzen: zuruecksetzen,
    groesse: function () { return schluessel().reduce(function (a, k) { return a + bytes(k); }, 0); },
  };
})();
