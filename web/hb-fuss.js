/* ============================================================================
   HeiBen — ein Fuß für alle Seiten. Remake v3, Welle 18.

   Vorher lag derselbe Fußbereich 32-mal von Hand kopiert im Markup (drei
   Fassungen, die sich in Leerzeichen und zwei fehlenden Links unterschieden),
   während 67 von 109 Seiten überhaupt keinen Rechts-Link trugen. Diese Datei
   baut ihn einmal.

   WIE heiben-nav.js, UND AUS DEMSELBEN GRUND: gebaut wird ein
   div[role="contentinfo"], nie ein <footer>-Element. styles.css stylt
   `footer{}` als Element-Selektor (dunkler Grund, eigenes Raster) und würde
   den neuen Fuß auf 29 Seiten überschreiben.

   Wer den Fuß nicht will, setzt data-hb-fuss="aus" am body — das tut die
   Startseite, die ihren eigenen Abschluss mitbringt.
   ========================================================================== */
(function () {
  'use strict';
  if (document.querySelector('.hb-fuss')) return;

  var WELTEN = [
    ['reisen.html',     'HeiBen Reisen',     'reisen'],
    ['wohnen.html',     'HeiBen Wohnen',     'wohnen'],
    ['immobilien.html', 'HeiBen Immobilien', 'immobilien'],
    ['studio.html',     'HeiBen Studio',     'studio'],
    ['kulinarik.html',  'HeiBen Kulinarik',  'kulinarik']
  ];
  /* Zweite Ordnung: gehört in die Welten-Spalte, ist aber keine eigene Welt. */
  var WEITER = [
    ['studio-magazin.html', 'Das Magazin'],
    ['schaufenster.html',   'Unsere Arbeit']
  ];
  var RECHT = [
    ['impressum.html',   'Impressum'],
    ['datenschutz.html', 'Datenschutz'],
    ['agb.html',         'AGB'],
    ['widerruf.html',    'Widerruf'],
    /* Stand vor dieser Welle nur im Fuß von impressum.html — 67 Seiten
       konnten die Übersicht gar nicht erreichen. */
    ['rechtliches.html', 'Rechtliches']
  ];

  function el(tag, klasse, text) {
    var e = document.createElement(tag);
    if (klasse) e.className = klasse;
    if (text != null) e.textContent = text;
    return e;
  }
  function link(href, text, klasse) {
    var a = el('a', klasse, text);
    a.href = href;
    return a;
  }

  function wortmarke() {
    var s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    s.setAttribute('viewBox', '168.5 10 465.6 178');
    s.setAttribute('role', 'img');
    s.setAttribute('aria-label', 'HeiBen');
    s.setAttribute('class', 'hb-fuss-marke');
    /* Die Farben stehen im Stylesheet, nicht hier — sonst wäre der Fuß der
       einzige Ort im System, der die Markenfarbe erneut als Hex nennt. */
    s.innerHTML = '<text x="400" y="150" text-anchor="middle" font-family="Fraunces,serif"'
      + ' font-weight="560" font-size="150" letter-spacing="-4">'
      + '<tspan class="a">H</tspan><tspan>ei</tspan>'
      + '<tspan class="a">B</tspan><tspan>en</tspan></text>';
    return s;
  }

  function spalte(titel, eintraege, weltfarbe) {
    var d = el('div', 'hb-fuss-spalte');
    d.appendChild(el('h4', null, titel));
    var ul = el('ul');
    eintraege.forEach(function (e) {
      var li = el('li');
      var a = link(e[0], e[1], e[2] === 'leise' ? 'leise' : null);
      /* Punkt nur für die fünf echten Welten. Die Zusatzlinks tragen 'leise'
         statt eines Weltschlüssels; ein Punkt darauf wäre farblos. */
      if (weltfarbe && e[2] && e[2] !== 'leise') {
        var punkt = el('i');
        punkt.style.background = 'var(--hb-w-' + e[2] + ')';
        li.appendChild(punkt);
      }
      li.appendChild(a);
      ul.appendChild(li);
    });
    d.appendChild(ul);
    return d;
  }

  function bauen() {
    if (document.body.getAttribute('data-hb-fuss') === 'aus') return;
    if (document.querySelector('.hb-fuss')) return;

    var fuss = el('div', 'hb-fuss');
    fuss.setAttribute('role', 'contentinfo');
    var innen = el('div', 'hb-fuss-innen');
    var oben = el('div', 'hb-fuss-oben');

    var marke = el('div', 'hb-fuss-block');
    marke.appendChild(wortmarke());
    marke.appendChild(el('p', null,
      'Eine Kölner Unternehmensfamilie. Heimat ist kein Ort, sondern ein Verb.'));
    marke.appendChild(link('familie.html', 'Unsere Geschichte →', 'hb-fuss-weg'));
    oben.appendChild(marke);

    oben.appendChild(spalte('Die Welten',
      WELTEN.concat(WEITER.map(function (w) { return [w[0], '↳ ' + w[1], 'leise']; })), true));

    var kontakt = el('div', 'hb-fuss-spalte');
    kontakt.appendChild(el('h4', null, 'Kontakt & Rechtliches'));
    var ul = el('ul');
    [['mailto:hallo@heiben.de', 'hallo@heiben.de'],
     ['tel:+49221000000', '+49 221 000000'],
     ['manufaktur.html', 'Shop · Manufaktur'],
     ['manufaktur-gestalten.html', 'Selbst gestalten']
    ].forEach(function (e) {
      var li = el('li'); li.appendChild(link(e[0], e[1])); ul.appendChild(li);
    });
    var recht = el('li', 'hb-fuss-recht');
    RECHT.forEach(function (r, i) {
      if (i) recht.appendChild(document.createTextNode(' · '));
      recht.appendChild(link(r[0], r[1]));
    });
    ul.appendChild(recht);
    kontakt.appendChild(ul);
    oben.appendChild(kontakt);

    innen.appendChild(oben);

    var legal = el('div', 'hb-fuss-legal');
    var firma = el('div');
    firma.innerHTML = 'HeiBen Holding GmbH <span class="ph">[i. G.]</span> · Sitz Köln · '
      + 'Geschäftsführung Yakin Benkhaouda &amp; Katharina Hein · '
      + 'Amtsgericht Köln HRB <span class="ph">[Nummer]</span> · '
      + 'USt-IdNr. <span class="ph">[DE…]</span>';
    legal.appendChild(firma);
    var zeile = el('div');
    zeile.appendChild(document.createTextNode('© ' + new Date().getFullYear() + ' HeiBen'));
    RECHT.forEach(function (r) {
      zeile.appendChild(document.createTextNode(' · '));
      zeile.appendChild(link(r[0], r[1]));
    });
    legal.appendChild(zeile);
    innen.appendChild(legal);

    fuss.appendChild(innen);
    document.body.appendChild(fuss);
    einpassen(fuss);
  }

  /* An den body anhängen setzt voraus, dass der body ein Block-Container ist.
     Er ist es nicht überall: 404.html zentriert seinen Inhalt mit
     display:flex — der Fuß wurde dort zum Element NEBEN dem Inhalt, 208 px
     schmal, und schob die Seite 112 px über den Rand. Darum die Lage messen
     statt sie anzunehmen. */
  function einpassen(fuss) {
    var cs = getComputedStyle(document.body);
    if (/flex/.test(cs.display)) {
      fuss.style.flex = '0 0 100%';
      /* Ohne Umbruch bliebe der Fuß in derselben Zeile stehen. Bei einem
         zentrierten Inhalt ändert der Umbruch sonst nichts. */
      if (cs.flexWrap === 'nowrap') document.body.style.flexWrap = 'wrap';
    } else if (/grid/.test(cs.display)) {
      fuss.style.gridColumn = '1 / -1';
    }
  }

  if (document.body) bauen();
  else document.addEventListener('DOMContentLoaded', bauen);
})();
