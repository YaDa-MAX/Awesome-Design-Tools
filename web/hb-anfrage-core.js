/* HeiBen — ausgelagert aus 3 Seiten (Remake v3, Welle 1).
   Inhalt wortgleich uebernommen, nicht ueberarbeitet. */
/* eingebunden aus _src/anfrage-core.js */
/* ============================================================
   HeiBen — Anfrage-Kern (gemeinsame Grundlage aller drei Formulare)
   EINE Quelle für: Feld-Bausteine je Anfragetyp (Reisen/Wohnen/Immobilien),
   die geführte Schritt-Logik, die strukturierte Lead-Datei und die
   vorbereitete E-Mail. Wird beim Bauen in jede Formularseite eingesetzt.

   Spiegelt bewusst das erprobte Muster des Shops:
   - erzeugt eine Datei mit Kennzeichen kind:'heibenLead' (analog 'heibenOrder')
   - erzeugt eine vorbereitete mailto:-E-Mail mit lesbarem Text
   - die gemeinsame Anfragenverwaltung liest beides nach demselben Verfahren ein
   ============================================================ */
(function () {
  'use strict';

  /* ---- Adressaten je Einheit (wie auf den Tochterseiten verwendet) ------- */
  var EMPFAENGER = {
    reisen:     'reisen@heiben.de',
    wohnen:     'wohnen@heiben.de',
    immobilien: 'immobilien@heiben.de'
  };

  /* ---- Feld-Typen ---------------------------------------------------------
     Jeder Schritt eines Formulars besteht aus Feldern. Ein Feld kennt seinen
     Typ (text/email/tel/textarea/select/choice/date/number), seine Beschriftung,
     ob es Pflicht ist, und – bei Auswahlfeldern – seine Optionen.            */

  /* ---- Schemata: hier steht der gesamte fachliche Inhalt der drei Formulare.
     Reihenfolge der Schritte = Reihenfolge im Assistenten.                  */
  var SCHEMA = {
    /* ---------------- REISEN ---------------- */
    reisen: {
      key: 'reisen',
      label: 'Reisen',
      title: 'Reise-Anfrage',
      lead: 'Erzählen Sie uns, wohin es gehen soll — wir stellen daraus einen Vorschlag zusammen, der zu Ihnen passt.',
      steps: [
        {
          title: 'Ihre Reiseidee',
          intro: 'Zuerst das Wichtigste: Wohin zieht es Sie?',
          fields: [
            { id: 'ziel', type: 'text', label: 'Wunschziel oder Region', required: true, placeholder: 'z. B. Norddeutschland, Algerien, „noch offen“' },
            { id: 'anlass', type: 'choice', label: 'Anlass der Reise', options: ['Urlaub', 'Hochzeitsreise', 'Familienbesuch', 'Geschäftlich', 'Anderes'] },
            { id: 'stil', type: 'choice', label: 'Welcher Reisestil passt zu Ihnen?', options: ['Entspannt & ruhig', 'Aktiv & entdeckend', 'Kulturell & nah an Menschen', 'Noch unentschieden'] }
          ]
        },
        {
          title: 'Zeit & Gruppe',
          intro: 'Wann möchten Sie reisen, und mit wem?',
          fields: [
            { id: 'zeitraum', type: 'text', label: 'Wunschzeitraum', placeholder: 'z. B. Mai 2026, Spätsommer, flexibel' },
            { id: 'dauer', type: 'choice', label: 'Ungefähre Dauer', options: ['Wochenende', '1 Woche', '2 Wochen', 'Länger', 'Unklar'] },
            { id: 'erwachsene', type: 'number', label: 'Erwachsene', placeholder: '2' },
            { id: 'kinder', type: 'number', label: 'Kinder', placeholder: '0' }
          ]
        },
        {
          title: 'Rahmen & Wünsche',
          intro: 'Was ist Ihnen wichtig? Je mehr wir wissen, desto persönlicher der Vorschlag.',
          fields: [
            { id: 'budget', type: 'choice', label: 'Budgetrahmen pro Person', options: ['bis 1.000 €', '1.000–2.500 €', '2.500–5.000 €', 'über 5.000 €', 'Lieber besprechen'] },
            { id: 'wuensche', type: 'textarea', label: 'Besondere Wünsche', placeholder: 'Unterkunftsart, Barrierefreiheit, kulinarische Vorlieben, alles, was zählt …' }
          ]
        }
      ]
    },

    /* ---------------- WOHNEN ---------------- */
    wohnen: {
      key: 'wohnen',
      label: 'Wohnen',
      title: 'Interior-Beratung',
      lead: 'Beschreiben Sie Ihren Raum und Ihren Geschmack — wir melden uns mit ersten Ideen und einem Vorschlag fürs weitere Vorgehen.',
      steps: [
        {
          title: 'Ihr Projekt',
          intro: 'Worum geht es?',
          fields: [
            { id: 'projektart', type: 'choice', label: 'Art des Projekts', required: true, options: ['Einzelnes Zimmer', 'Ganze Wohnung', 'Haus', 'Einzelne Möbelstücke', 'Beratung allgemein'] },
            { id: 'raeume', type: 'text', label: 'Welche Räume?', placeholder: 'z. B. Wohnzimmer & Flur' },
            { id: 'stil', type: 'choice', label: 'Welche Richtung gefällt Ihnen?', options: ['Warm & natürlich', 'Klar & reduziert', 'Klassisch & gediegen', 'Mutig & charaktervoll', 'Noch offen'] }
          ]
        },
        {
          title: 'Raum & Zeit',
          intro: 'Ein paar Eckdaten helfen uns, realistisch zu planen.',
          fields: [
            { id: 'flaeche', type: 'text', label: 'Ungefähre Fläche', placeholder: 'z. B. 24 m²' },
            { id: 'zeit', type: 'choice', label: 'Wann soll es losgehen?', options: ['So bald wie möglich', 'In den nächsten Monaten', 'Dieses Jahr', 'Nur Ideen sammeln'] },
            { id: 'budget', type: 'choice', label: 'Budgetrahmen', options: ['bis 5.000 €', '5.000–15.000 €', '15.000–40.000 €', 'über 40.000 €', 'Lieber besprechen'] }
          ]
        },
        {
          title: 'Ihre Vorstellungen',
          intro: 'Erzählen Sie frei — Bilder im Kopf, Lieblingsstücke, No-Gos.',
          fields: [
            { id: 'wuensche', type: 'textarea', label: 'Was schwebt Ihnen vor?', placeholder: 'Stimmung, Farben, vorhandene Möbel, besondere Anforderungen …' }
          ]
        }
      ]
    },

    /* ---------------- IMMOBILIEN ---------------- */
    immobilien: {
      key: 'immobilien',
      label: 'Immobilien',
      title: 'Immobilien-Anfrage',
      lead: 'Ob Kauf, Verkauf oder Besichtigung — schildern Sie Ihr Anliegen, wir melden uns vertraulich.',
      steps: [
        {
          title: 'Ihr Anliegen',
          intro: 'Wie können wir helfen?',
          fields: [
            { id: 'anliegen', type: 'choice', label: 'Worum geht es?', required: true, options: ['Ich möchte kaufen', 'Ich möchte verkaufen', 'Ich möchte mieten', 'Besichtigung vereinbaren', 'Bewertung / Beratung'] },
            { id: 'objektart', type: 'choice', label: 'Art der Immobilie', options: ['Wohnung', 'Haus', 'Grundstück', 'Gewerbe', 'Noch offen'] },
            { id: 'lage', type: 'text', label: 'Lage / Region', placeholder: 'z. B. Köln-Ehrenfeld, Rheinland' }
          ]
        },
        {
          title: 'Eckdaten',
          intro: 'Je nach Anliegen helfen ein paar Zahlen — lassen Sie offen, was nicht passt.',
          fields: [
            { id: 'zimmer', type: 'text', label: 'Zimmer / Größe', placeholder: 'z. B. 3 Zimmer, ca. 90 m²' },
            { id: 'preis', type: 'text', label: 'Preisvorstellung / Budget', placeholder: 'z. B. bis 600.000 €' },
            { id: 'zeit', type: 'choice', label: 'Zeithorizont', options: ['So bald wie möglich', 'In den nächsten Monaten', 'Dieses Jahr', 'Unverbindlich informieren'] }
          ]
        },
        {
          title: 'Details',
          intro: 'Was sollten wir noch wissen?',
          fields: [
            { id: 'wuensche', type: 'textarea', label: 'Ihre Anmerkungen', placeholder: 'Besondere Wünsche, Ausstattung, Finanzierungsfragen …' }
          ]
        }
      ]
    }
  };

  /* ---- Kontaktschritt: bei allen drei Formularen identisch und immer zuletzt.
     Hier entstehen die Daten, die für eine Rückmeldung wirklich nötig sind. */
  var KONTAKT_STEP = {
    title: 'Ihre Kontaktdaten',
    intro: 'Damit wir uns persönlich bei Ihnen melden können.',
    fields: [
      { id: 'name', type: 'text', label: 'Name', required: true, placeholder: 'Vor- und Nachname' },
      { id: 'email', type: 'email', label: 'E-Mail', required: true, placeholder: 'name@beispiel.de' },
      { id: 'telefon', type: 'tel', label: 'Telefon (optional)', placeholder: 'für Rückfragen' },
      { id: 'kontaktweg', type: 'choice', label: 'Wie sollen wir Sie erreichen?', options: ['E-Mail', 'Telefon', 'Egal'] }
    ]
  };

  /* ---- Hilfsfunktionen ---------------------------------------------------- */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function leadId(typeKey) {
    // Menschlich lesbar + eindeutig: ANF-REI-7K3F9 o. ä.
    var prefix = { reisen: 'REI', wohnen: 'WOH', immobilien: 'IMM' }[typeKey] || 'ANF';
    var rnd = (Date.now().toString(36) + Math.random().toString(36).slice(2)).toUpperCase().replace(/[^A-Z0-9]/g, '').slice(-5);
    return 'ANF-' + prefix + '-' + rnd;
  }

  // Liefert alle Schritte eines Typs inkl. abschließendem Kontaktschritt.
  function stepsFor(typeKey) {
    var s = SCHEMA[typeKey];
    if (!s) return [];
    return s.steps.concat([KONTAKT_STEP]);
  }

  // Sammelt alle Felder (für Beschriftungen beim Erzeugen des Textes).
  function fieldIndex(typeKey) {
    var idx = {};
    stepsFor(typeKey).forEach(function (st) {
      st.fields.forEach(function (f) { idx[f.id] = f; });
    });
    return idx;
  }

  /* ---- Lesbarer Text der Anfrage (für E-Mail-Text und Datei-Beleg) -------- */
  function leadText(lead) {
    var s = SCHEMA[lead.type];
    var idx = fieldIndex(lead.type);
    var lines = [];
    lines.push('HeiBen ' + (s ? s.label : '') + ' — ' + (s ? s.title : 'Anfrage'));
    lines.push('Anfrage-Nr.: ' + lead.id);
    lines.push('Eingegangen: ' + new Date(lead.createdAt).toLocaleString('de-DE'));
    lines.push('');
    // Felder in Schemareihenfolge ausgeben, leere auslassen.
    stepsFor(lead.type).forEach(function (st) {
      var block = [];
      st.fields.forEach(function (f) {
        var v = lead.answers[f.id];
        if (v != null && String(v).trim() !== '') {
          block.push('  ' + f.label + ': ' + v);
        }
      });
      if (block.length) {
        lines.push(st.title);
        lines.push.apply(lines, block);
        lines.push('');
      }
    });
    lines.push('— Diese Anfrage wurde über die HeiBen-Website erzeugt.');
    return lines.join('\n');
  }

  // Strukturierte Datei fürs Backoffice — schlankes, stabiles Format mit
  // Kennzeichen "heibenLead", analog zu "heibenOrder" beim Shop.
  function leadData(lead) {
    return {
      kind: 'heibenLead',
      version: 1,
      id: lead.id,
      type: lead.type,
      createdAt: lead.createdAt,
      status: 'neu',
      contact: {
        name: lead.answers.name || '',
        email: lead.answers.email || '',
        telefon: lead.answers.telefon || '',
        kontaktweg: lead.answers.kontaktweg || ''
      },
      answers: lead.answers
    };
  }

  function downloadJson(lead) {
    var data = leadData(lead);
    var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; a.download = 'HeiBen-Anfrage-' + lead.id + '.json';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
  }

  function mailtoFor(lead) {
    var to = EMPFAENGER[lead.type] || 'hallo@heiben.de';
    var subject = 'Anfrage ' + lead.id;
    return 'mailto:' + to + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(leadText(lead));
  }

  /* ---- Bereitstellen ----------------------------------------------------- */
  window.HeiBenAnfrage = {
    SCHEMA: SCHEMA, KONTAKT_STEP: KONTAKT_STEP, EMPFAENGER: EMPFAENGER,
    esc: esc, leadId: leadId, stepsFor: stepsFor, fieldIndex: fieldIndex,
    leadText: leadText, leadData: leadData, downloadJson: downloadJson, mailtoFor: mailtoFor
  };
})();
