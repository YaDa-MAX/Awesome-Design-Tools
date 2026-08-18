/* HeiBen Werkzeug-Register — Anzeige. Remake v3, Welle 5.

   Die Seite stellt einen Behälter auf, dieses Skript füllt ihn:
     <div data-hb-werkzeuge="alle">      alle Werkzeuge, nach Gruppen
     <div data-hb-werkzeuge="reisen">    nur die Werkzeuge dieser Welt
     <div data-hb-werkzeuge="Geld & Vorsorge">   nur diese Gruppe

   Quelle ist heiben-werkzeuge.js (generiert aus tools/seiten.json). Wer ein
   Werkzeug einträgt, muss keine Seite anfassen — es taucht überall auf, wo ein
   passender Behälter steht. Gebaut ausschliesslich aus den Bausteinen der
   Designgrundstruktur (heiben-design.css). */
(function () {
  'use strict';
  var LISTE = window.HEIBEN_WERKZEUGE || [];
  var GRUPPEN = window.HEIBEN_WERKZEUG_GRUPPEN || [];
  if (!LISTE.length) return;

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* BEWUSST OHNE data-hb-motion: diese Kacheln entstehen erst beim Rendern, also NACH
     dem Start von hb-motion.js. Der Beobachter wuerde sie nie erfassen — sie blieben bis
     zum 3-Sekunden-Sicherheitsnetz unsichtbar. Client-erzeugter Inhalt tritt statisch auf. */
  function kachel(w) {
    return '<a class="hb-kachel" href="' + esc(w.u) + '" data-hb-welt="' + esc(w.w) + '">'
      + '<span class="hb-augenbraue">' + esc(w.g) + '</span>'
      + '<span class="hb-titel-3" style="display:block">' + esc(w.t) + '</span>'
      + '<span class="hb-fliess" style="display:block;margin-top:var(--hb-raum-2)">'
      + esc(w.b) + '</span></a>';
  }

  function raster(werkzeuge) {
    return '<div class="hb-raster" style="--hb-min:250px">'
      + werkzeuge.map(kachel).join('') + '</div>';
  }

  document.querySelectorAll('[data-hb-werkzeuge]').forEach(function (behaelter) {
    var filter = (behaelter.getAttribute('data-hb-werkzeuge') || 'alle').trim();
    var teil = filter === 'alle' ? LISTE
      : LISTE.filter(function (w) { return w.w === filter || w.g === filter; });
    if (!teil.length) { behaelter.hidden = true; return; }

    if (filter !== 'alle') { behaelter.innerHTML = raster(teil); return; }

    /* Vollansicht: nach Gruppen, in der Reihenfolge des Registers. */
    var html = '';
    var reihen = GRUPPEN.filter(function (g) {
      return teil.some(function (w) { return w.g === g; });
    });
    reihen.forEach(function (g) {
      html += '<h3 class="hb-titel-3" style="margin:var(--hb-raum-7) 0 var(--hb-raum-4)">'
        + esc(g) + '</h3>'
        + raster(teil.filter(function (w) { return w.g === g; }));
    });
    behaelter.innerHTML = html;
  });
})();
