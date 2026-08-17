/* HeiBen — ausgelagert aus 3 Seiten (Remake v3, Welle 1).
   Inhalt wortgleich uebernommen, nicht ueberarbeitet. */
/* eingebunden aus _src/anfrage-app.js */
/* ============================================================
   HeiBen — Anfrage-Assistent (gemeinsame Lauf-Logik aller Formulare)
   Liest das Schema des jeweiligen Typs aus anfrage-core.js, zeigt einen
   Schritt nach dem anderen, prüft Pflichtfelder, fasst zusammen und erzeugt
   beim Absenden Datei + E-Mail. Eine Engine für alle drei Anfragetypen.

   Aufruf am Seitenende:  HeiBenAnfrageApp.start('reisen', '#app');
   ============================================================ */
(function () {
  'use strict';
  var A = window.HeiBenAnfrage;

  function el(id) { return document.querySelector(id); }

  function start(typeKey, mountSel) {
    var schema = A.SCHEMA[typeKey];
    if (!schema) { console.error('Unbekannter Anfragetyp:', typeKey); return; }
    var steps = A.stepsFor(typeKey);        // inkl. Kontaktschritt
    var mount = el(mountSel);
    var state = { step: 0, answers: {}, errors: {} };

    // -------- Eingabe-Bausteine --------
    function fieldHtml(f) {
      var val = state.answers[f.id] != null ? state.answers[f.id] : '';
      var reqMark = f.required ? ' <span class="req">*</span>' : '';
      var err = state.errors[f.id] ? '<div class="field-error">' + A.esc(state.errors[f.id]) + '</div>' : '';
      var inner;

      if (f.type === 'choice') {
        inner = '<div class="choices" data-choices="' + f.id + '">' +
          f.options.map(function (o) {
            var sel = (val === o) ? ' sel' : '';
            return '<button type="button" class="' + sel.trim() + '" data-val="' + A.esc(o) + '">' + A.esc(o) + '</button>';
          }).join('') + '</div>';
      } else if (f.type === 'textarea') {
        inner = '<textarea data-field="' + f.id + '" placeholder="' + A.esc(f.placeholder || '') + '">' + A.esc(val) + '</textarea>';
      } else if (f.type === 'select') {
        inner = '<select data-field="' + f.id + '"><option value="">Bitte wählen …</option>' +
          f.options.map(function (o) { return '<option' + (val === o ? ' selected' : '') + '>' + A.esc(o) + '</option>'; }).join('') + '</select>';
      } else {
        var t = (f.type === 'email' || f.type === 'tel' || f.type === 'number' || f.type === 'date') ? f.type : 'text';
        inner = '<input type="' + t + '" data-field="' + f.id + '" value="' + A.esc(val) + '" placeholder="' + A.esc(f.placeholder || '') + '" />';
      }
      return '<div class="fld"><label>' + A.esc(f.label) + reqMark + '</label>' + inner + err + '</div>';
    }

    // Zwei schmale Felder (z. B. Erwachsene/Kinder) nebeneinander setzen.
    function renderFields(fields) {
      var html = '';
      for (var i = 0; i < fields.length; i++) {
        var f = fields[i], next = fields[i + 1];
        var narrow = function (x) { return x && x.type === 'number'; };
        if (narrow(f) && narrow(next)) {
          html += '<div class="fld-row">' + fieldHtml(f).replace('class="fld"', 'class="fld" style="margin:0"') +
                  fieldHtml(next).replace('class="fld"', 'class="fld" style="margin:0"') + '</div>';
          // den Abstand der Reihe wieder herstellen
          html = html.replace('</div></div>', '</div></div>');
          i++; // nächstes Feld schon verbraucht
        } else {
          html += fieldHtml(f);
        }
      }
      return html;
    }

    // -------- Schritte zeichnen --------
    function progressHtml() {
      var total = steps.length + 1; // + Zusammenfassung
      var segs = '';
      for (var i = 0; i < total; i++) {
        var cls = i < state.step ? 'done' : (i === state.step ? 'active' : '');
        segs += '<div class="seg ' + cls + '"></div>';
      }
      return '<div class="steps-bar">' + segs + '</div>';
    }

    function renderStep() {
      var st = steps[state.step];
      mount.innerHTML =
        progressHtml() +
        '<div class="step-count">Schritt ' + (state.step + 1) + ' von ' + (steps.length + 1) + '</div>' +
        '<h1 class="step-title">' + A.esc(st.title) + '</h1>' +
        (st.intro ? '<p class="step-intro">' + A.esc(st.intro) + '</p>' : '') +
        '<div class="fields">' + renderFields(st.fields) + '</div>' +
        navHtml(false);
      wireInputs();
      window.scrollTo(0, 0);
    }

    function renderSummary() {
      var idx = A.fieldIndex(typeKey);
      var rows = '';
      A.stepsFor(typeKey).forEach(function (st) {
        st.fields.forEach(function (f) {
          var v = state.answers[f.id];
          if (v != null && String(v).trim() !== '') {
            rows += '<div class="srow"><span class="lbl">' + A.esc(f.label) + '</span><span class="val">' + A.esc(v) + '</span></div>';
          }
        });
      });
      mount.innerHTML =
        progressHtml() +
        '<div class="step-count">Letzter Schritt · Überprüfen &amp; Absenden</div>' +
        '<h1 class="step-title">Stimmt alles <em>so</em>?</h1>' +
        '<p class="step-intro">Prüfen Sie Ihre Angaben. Mit dem Absenden erzeugen wir eine vorbereitete E-Mail und – auf Wunsch – eine Datei für unsere Anfragenverwaltung.</p>' +
        '<div class="summary"><h3>Ihre Anfrage</h3>' + rows + '</div>' +
        navHtml(true);
      wireNav(true);
      window.scrollTo(0, 0);
    }

    function navHtml(isSummary) {
      var back = state.step > 0 || isSummary
        ? '<button type="button" class="btn-step" data-nav="back">← Zurück</button>'
        : '<span></span>';
      var fwd = isSummary
        ? '<button type="button" class="btn-step primary" data-nav="submit">Anfrage absenden</button>'
        : '<button type="button" class="btn-step primary" data-nav="next">Weiter →</button>';
      return '<div class="anfrage-nav">' + back + '<span class="spacer"></span>' + fwd + '</div>';
    }

    // -------- Eingaben verdrahten --------
    function wireInputs() {
      // Text/Mehrzeilig/Auswahllisten
      Array.prototype.forEach.call(mount.querySelectorAll('[data-field]'), function (inp) {
        var ev = (inp.tagName === 'SELECT') ? 'change' : 'input';
        inp.addEventListener(ev, function () {
          state.answers[inp.getAttribute('data-field')] = inp.value;
          delete state.errors[inp.getAttribute('data-field')];
        });
      });
      // Chip-Auswahl
      Array.prototype.forEach.call(mount.querySelectorAll('[data-choices]'), function (group) {
        group.addEventListener('click', function (e) {
          var b = e.target.closest('button'); if (!b) return;
          var id = group.getAttribute('data-choices'), v = b.getAttribute('data-val');
          // erneutes Tippen hebt die Auswahl auf (außer Pflichtfeld)
          state.answers[id] = (state.answers[id] === v) ? '' : v;
          delete state.errors[id];
          Array.prototype.forEach.call(group.querySelectorAll('button'), function (x) {
            x.classList.toggle('sel', x.getAttribute('data-val') === state.answers[id]);
          });
        });
      });
      wireNav(false);
    }

    function wireNav(isSummary) {
      Array.prototype.forEach.call(mount.querySelectorAll('[data-nav]'), function (btn) {
        btn.addEventListener('click', function () {
          var nav = btn.getAttribute('data-nav');
          if (nav === 'back') { goBack(); }
          else if (nav === 'next') { goNext(); }
          else if (nav === 'submit') { submit(); }
        });
      });
    }

    // -------- Ablauf --------
    function validateStep() {
      var st = steps[state.step]; var ok = true; state.errors = {};
      st.fields.forEach(function (f) {
        if (f.required) {
          var v = state.answers[f.id];
          if (v == null || String(v).trim() === '') { state.errors[f.id] = 'Bitte ausfüllen.'; ok = false; }
        }
        if (f.type === 'email' && state.answers[f.id]) {
          if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(state.answers[f.id])) { state.errors[f.id] = 'Bitte eine gültige E-Mail angeben.'; ok = false; }
        }
      });
      return ok;
    }

    function goNext() {
      if (!validateStep()) { renderStep(); return; }
      if (state.step < steps.length - 1) { state.step++; renderStep(); }
      else { state.step = steps.length; renderSummary(); }   // hinter letzten Schritt = Zusammenfassung
    }
    function goBack() {
      if (state.step > 0) {
        state.step = Math.min(state.step, steps.length) - 1;
        renderStep();
      }
    }

    function submit() {
      var lead = { id: A.leadId(typeKey), type: typeKey, createdAt: new Date().toISOString(), answers: state.answers };
      var mailto = A.mailtoFor(lead);
      // Erfolgsbildschirm
      mount.innerHTML =
        '<div class="done-card">' +
          '<div class="mark">✓</div>' +
          '<h2>Ihre Anfrage ist <em>fertig</em>.</h2>' +
          '<p>Vielen Dank! Senden Sie uns Ihre Anfrage mit einem Klick als vorbereitete E-Mail. Sie können sie zusätzlich als Datei sichern.</p>' +
          '<div class="done-id">Anfrage-Nr.: ' + A.esc(lead.id) + '</div>' +
          '<div class="done-actions">' +
            '<a class="primary" id="sendMail" href="' + A.esc(mailto) + '">E-Mail senden</a>' +
            '<button type="button" id="saveFile">Als Datei sichern</button>' +
          '</div>' +
          '<p class="done-note">Tipp: Falls sich kein E-Mail-Programm öffnet, sichern Sie die Datei und senden sie an ' +
            A.esc(A.EMPFAENGER[typeKey] || 'hallo@heiben.de') + '.</p>' +
        '</div>';
      el('#saveFile').addEventListener('click', function () { A.downloadJson(lead); });
      window.scrollTo(0, 0);
    }

    renderStep();
  }

  window.HeiBenAnfrageApp = { start: start };
})();
