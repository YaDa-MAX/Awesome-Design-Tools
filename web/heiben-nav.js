/* HeiBen Fundament — gemeinsame Kopfnavigation.
   Remake v3: Leiste plus Weltmenü.

   Nutzung je Seite (unverändert):
     <link rel="stylesheet" href="heiben-design.css">
     <script src="heiben-nav.js" defer></script>
     <body data-hb-welt="reisen|wohnen|immobilien|studio|kulinarik|wissen|konto|holding">

   VERTRÄGE, die hier nicht gebrochen werden:
   - gebaut wird div[role=banner] / div[role=navigation], NIE header/nav — der Bestand
     stylt nav{} als Element-Selektor.
   - .hb-nav bleibt die erste Kind-Ebene des body: hb-bereiche.js hängt das Band der
     internen Seiten direkt dahinter.
   - data-welt gehört dieser Datei (Weltlinks); kein anderes Bauteil verwendet es.
   - Farben kanonisch aus heiben-firmierungen.js, sonst Fallback.
   - Die Weltfarbe der Leiste kommt aus der Token-Ebene (--hb-welt über data-hb-welt),
     nicht aus JavaScript. Nur das Menü setzt --wf je Spalte, weil dort fünf Welten
     nebeneinander stehen.

   Das Menü wird ERST BEIM ERSTEN ÖFFNEN gebaut. Grund: heiben-menue.js wird vom
   Kopf-Generator hinter dieser Datei eingehängt, beide mit defer — beim Ausführen
   dieser Datei gibt es window.HEIBEN_MENUE also noch nicht. Progressive Enhancement:
   fehlt die Liste, zeigt das Menü die fünf Welten ohne Unterseiten. */
(function () {
  'use strict';
  if (document.querySelector('.hb-nav')) return;   /* nie doppelt */

  var FALLBACK = { reisen: '#a97a1d', wohnen: '#4a5c39', immobilien: '#792d29',
                   studio: '#1f1c17', kulinarik: '#6b3951' };
  function farbe(w) {
    try { if (window.HEIBEN_FIRMA) { var f = window.HEIBEN_FIRMA(w); if (f && f.farbe) return f.farbe; } } catch (e) {}
    return FALLBACK[w] || '#d8cdb7';
  }

  var WELTEN = [
    { k: 'reisen',     t: 'Reisen',     u: 'reisen.html',     v: 'aufbrechen' },
    { k: 'wohnen',     t: 'Wohnen',     u: 'wohnen.html',     v: 'bleiben' },
    { k: 'immobilien', t: 'Immobilien', u: 'immobilien.html', v: 'ankommen' },
    { k: 'studio',     t: 'Studio',     u: 'studio.html',     v: 'verstehen' },
    { k: 'kulinarik',  t: 'Kulinarik',  u: 'kulinarik.html',  v: 'teilen' }
  ];
  /* Kurzwege in der Leiste. Die Suche stand bis v3-W5 in hb-suche-nav.js, das ein
     <nav>-Element voraussetzt — das haben nur noch 4 Seiten. Seitdem steht sie hier. */
  var EXTRA = [
    { k: 'wissen', t: 'Wissen', u: 'wissen.html' },
    { k: 'suche',  t: 'Suche',  u: 'suche.html' }
  ];
  /* Fuß des Menüs: alles, was zu keiner Welt gehört. */
  var WEGE = [
    { t: 'Startseite',        u: 'index.html' },
    { t: 'Wissen für Zuhause', u: 'wissen.html' },
    { t: 'Suche',             u: 'suche.html' },
    { t: 'Zuhause-Ordner',    u: 'zuhause-ordner.html' },
    { t: 'Mein HeiBen',       u: 'mein-heiben.html' },
    { t: 'Das Unternehmen',   u: 'unternehmen.html' }
  ];

  var aktiv = (document.body.getAttribute('data-hb-welt') || '').trim();
  var hier  = (location.pathname.split('/').pop() || 'index.html');

  function el(tag, klasse, text) {
    var d = document.createElement(tag);
    if (klasse) d.className = klasse;
    if (text != null) d.appendChild(document.createTextNode(text));
    return d;
  }
  function marke() {
    var a = el('a', 'hb-brand');
    a.href = 'index.html';
    a.appendChild(document.createTextNode('HeiBen'));
    a.appendChild(el('small', null, 'Heimat leben'));
    return a;
  }

  /* ---------- 1. Leiste ---------------------------------------------------- */
  var nav = el('div', 'hb-nav');
  nav.setAttribute('role', 'banner');
  var inner = el('div', 'hb-nav-in');
  inner.appendChild(marke());

  var links = el('div', 'hb-links');
  links.setAttribute('role', 'navigation');
  links.setAttribute('aria-label', 'HeiBen Bereiche');
  WELTEN.forEach(function (w) {
    var a = el('a');
    a.href = w.u;
    a.setAttribute('data-welt', w.k);
    a.style.setProperty('--wf', farbe(w.k));
    a.appendChild(el('i', 'hb-dot'));
    a.appendChild(document.createTextNode(w.t));
    if (w.k === aktiv) { a.className = 'on'; a.setAttribute('aria-current', 'true'); }
    links.appendChild(a);
  });
  links.appendChild(el('span', 'hb-nav-sep'));
  EXTRA.forEach(function (x) {
    var a = el('a', x.k === aktiv ? 'on' : null, x.t);
    a.href = x.u;
    a.setAttribute('data-welt', x.k);
    if (x.k === aktiv) a.setAttribute('aria-current', 'true');
    links.appendChild(a);
  });
  inner.appendChild(links);

  var konto = el('a', 'hb-konto', 'Mein HeiBen');
  konto.href = 'mein-heiben.html';
  konto.setAttribute('data-welt', 'konto');
  if (aktiv === 'konto') konto.setAttribute('aria-current', 'true');
  inner.appendChild(konto);

  var burger = document.createElement('button');
  burger.className = 'hb-burger';
  burger.type = 'button';
  burger.id = 'hbBurger2';
  burger.setAttribute('aria-label', 'Menü öffnen');
  burger.setAttribute('aria-expanded', 'false');
  burger.setAttribute('aria-controls', 'hbMenue');
  burger.appendChild(el('i'));
  burger.appendChild(el('i'));
  inner.appendChild(burger);

  nav.appendChild(inner);
  document.body.insertBefore(nav, document.body.firstChild);

  /* ---------- 2. Menü ------------------------------------------------------ */
  var feld = null, zuKnopf = null;

  function bauen() {
    if (feld) return feld;
    var karte = window.HEIBEN_MENUE || {};

    feld = el('div', 'hb-menue');
    feld.id = 'hbMenue';
    feld.hidden = true;
    feld.setAttribute('role', 'dialog');
    feld.setAttribute('aria-modal', 'true');
    feld.setAttribute('aria-label', 'HeiBen Menü');

    var box = el('div', 'hb-menue-in');

    var kopf = el('div', 'hb-menue-kopf');
    kopf.appendChild(marke());
    zuKnopf = document.createElement('button');
    zuKnopf.type = 'button';
    zuKnopf.className = 'hb-menue-zu';
    zuKnopf.setAttribute('aria-label', 'Menü schließen');
    zuKnopf.appendChild(el('i'));
    zuKnopf.appendChild(el('i'));
    kopf.appendChild(zuKnopf);
    box.appendChild(kopf);

    var raster = el('div', 'hb-menue-welten');
    WELTEN.forEach(function (w) {
      var sp = el('div', 'hb-mw' + (w.k === aktiv ? ' jetzt' : ''));
      sp.style.setProperty('--wf', farbe(w.k));

      var zeile = el('div', 'hb-mw-zeile');
      var k = el('a', 'hb-mw-kopf');
      k.href = w.u;
      k.appendChild(el('b', null, w.t));
      k.appendChild(el('em', null, w.v));
      zeile.appendChild(k);

      var seiten = (karte[w.k] || []).filter(function (s) { return s.u !== w.u; });

      /* Schmal stehen sonst fünf Welten mit vierzig Zeilen untereinander: dort klappt
         jede Welt zu, die aktuelle bleibt offen. Breit sind alle Listen sichtbar,
         der Schalter ist per CSS aus dem Weg (display:none) und damit auch aus der
         Bedienhilfe. */
      if (seiten.length) {
        var schalter = document.createElement('button');
        schalter.type = 'button';
        schalter.className = 'hb-mw-schalter';
        schalter.setAttribute('aria-label', w.t + ' aufklappen');
        schalter.setAttribute('aria-expanded', w.k === aktiv ? 'true' : 'false');
        schalter.appendChild(el('i'));
        schalter.appendChild(el('i'));
        schalter.addEventListener('click', function () {
          var offen = sp.classList.toggle('offen');
          schalter.setAttribute('aria-expanded', offen ? 'true' : 'false');
          schalter.setAttribute('aria-label', w.t + (offen ? ' zuklappen' : ' aufklappen'));
        });
        zeile.appendChild(schalter);
        if (w.k === aktiv) sp.classList.add('offen');
      }
      sp.appendChild(zeile);

      if (seiten.length) {
        var ul = el('ul', 'hb-mw-liste');
        seiten.forEach(function (s) {
          var li = el('li');
          var a = el('a', s.u === hier ? 'hier' : null, s.t);
          a.href = s.u;
          if (s.u === hier) a.setAttribute('aria-current', 'page');
          li.appendChild(a);
          ul.appendChild(li);
        });
        sp.appendChild(ul);
      }
      raster.appendChild(sp);
    });
    box.appendChild(raster);

    var wege = el('div', 'hb-menue-wege');
    WEGE.forEach(function (x) {
      var a = el('a', x.u === hier ? 'hier' : null, x.t);
      a.href = x.u;
      if (x.u === hier) a.setAttribute('aria-current', 'page');
      wege.appendChild(a);
    });
    box.appendChild(wege);

    feld.appendChild(box);
    document.body.appendChild(feld);   /* ans Ende, damit .hb-nav erstes Kind bleibt */

    zuKnopf.addEventListener('click', zu);
    feld.addEventListener('click', function (e) {
      if (e.target === feld) zu();               /* Klick auf den freien Grund */
    });
    return feld;
  }

  function fokussierbar() {
    return [].slice.call(feld.querySelectorAll('a[href],button'))
      .filter(function (n) { return n.offsetParent !== null; });
  }

  function auf() {
    bauen();
    feld.hidden = false;
    requestAnimationFrame(function () { feld.classList.add('da'); });
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', 'Menü schließen');
    document.documentElement.style.overflow = 'hidden';
    if (zuKnopf) zuKnopf.focus();
  }

  function zu() {
    if (!feld || feld.hidden) return;
    feld.classList.remove('da');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Menü öffnen');
    document.documentElement.style.overflow = '';
    var ruhe = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setTimeout(function () {
      if (burger.getAttribute('aria-expanded') === 'false') feld.hidden = true;
    }, ruhe ? 0 : 320);
    burger.focus();
  }

  burger.addEventListener('click', function () {
    burger.getAttribute('aria-expanded') === 'true' ? zu() : auf();
  });

  document.addEventListener('keydown', function (e) {
    if (!feld || feld.hidden) return;
    if (e.key === 'Escape') { zu(); return; }
    if (e.key !== 'Tab') return;
    /* Solange das Feld steht, bleibt der Tabulator darin. */
    var n = fokussierbar();
    if (!n.length) return;
    var erst = n[0], letzt = n[n.length - 1];
    if (e.shiftKey && document.activeElement === erst) { e.preventDefault(); letzt.focus(); }
    else if (!e.shiftKey && document.activeElement === letzt) { e.preventDefault(); erst.focus(); }
  });
})();
