/* HeiBen — „Weiter in dieser Welt". Remake v3, Welle 14.

   Bis dahin führte der Weg von einer Unterseite zu ihren Geschwistern nur über
   das Weltmenü — man musste es erst öffnen. Dieses Bauteil legt die Nachbarn
   direkt auf die Seite: jede Unterseite zeigt am Fuß, was sonst noch zu ihrer
   Welt gehört, und den Weg zurück zur Welt selbst.

   Quelle ist window.HEIBEN_MENUE (erzeugt von tools/gen_kopf.js aus
   tools/seiten.json) — dieselbe Liste, die auch das Weltmenü füllt. Wer eine
   Seite einträgt, bekommt die Verknüpfung überall, ohne eine Zeile Markup.

   Einbau je Seite:  <div data-hb-nachbarn></div>
   Die Welt kommt aus data-hb-welt am body; die aktuelle Seite fällt heraus.

   Wie beim Werkzeug-Register tragen die erzeugten Elemente KEIN data-hb-motion:
   sie entstehen nach hb-motion.js und blieben sonst bis zum Sicherheitsnetz
   unsichtbar. */
(function () {
  'use strict';

  var behaelter = [].slice.call(document.querySelectorAll('[data-hb-nachbarn]'));
  if (!behaelter.length) return;

  var welt = (document.body.getAttribute('data-hb-welt') || '').trim();
  var karte = window.HEIBEN_MENUE || {};
  var liste = (karte[welt] || []);
  var hier = (location.pathname.split('/').pop() || 'index.html');
  var nachbarn = liste.filter(function (s) { return s.u !== hier; });
  if (!nachbarn.length) return;

  var NAME = { reisen: 'Reisen', wohnen: 'Wohnen', immobilien: 'Immobilien',
               studio: 'Studio', kulinarik: 'Kulinarik' };
  var weltname = NAME[welt] || '';
  var weltseite = welt + '.html';

  function el(tag, klasse, text) {
    var d = document.createElement(tag);
    if (klasse) d.className = klasse;
    if (text != null) d.appendChild(document.createTextNode(text));
    return d;
  }

  behaelter.forEach(function (ziel) {
    if (ziel.getAttribute('data-hb-fertig')) return;
    ziel.setAttribute('data-hb-fertig', '1');

    var block = el('div', 'hb-nachbarn');
    var kopf = el('div', 'hb-nachbarn-kopf');
    kopf.appendChild(el('span', 'hb-nachbarn-titel', 'Weiter in HeiBen ' + weltname));
    var zurueck = el('a', 'hb-nachbarn-zurueck', 'Zur Welt ' + weltname);
    zurueck.href = weltseite;
    kopf.appendChild(zurueck);
    block.appendChild(kopf);

    var reihe = el('div', 'hb-nachbarn-reihe');
    nachbarn.forEach(function (s) {
      var a = el('a', null, s.t);
      a.href = s.u;
      if (s.u === weltseite) a.className = 'welt';
      reihe.appendChild(a);
    });
    block.appendChild(reihe);
    ziel.appendChild(block);
  });
})();
