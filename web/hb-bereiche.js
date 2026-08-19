/* HeiBen Bereiche — Anzeige. Remake v3, Welle 7.

   Drei Aufgaben, eine Quelle (heiben-bereiche.js, erzeugt aus tools/seiten.json):

   1. KENNZEICHNUNG: Interne Seiten geben sich als solche zu erkennen — bisher tat
      das jede anders (vier gar nicht, die übrigen mit „Redaktion"/„Backoffice" im
      Fließtext). Jetzt ein Band, überall gleich, direkt unter der Navigation.
   2. ÜBERSICHT: <div data-hb-intern> listet alle internen Bereiche — damit sie
      einen Einstieg haben statt lose in der Sitemap zu liegen.
   3. WELTSEITEN: <div data-hb-weltseiten="reisen"> zeigt, was eine Welt umfasst.

   Wie beim Werkzeug-Register tragen client-erzeugte Elemente KEIN data-hb-motion —
   sie entstehen nach hb-motion.js. */
(function () {
  'use strict';
  var INTERN = window.HEIBEN_INTERN || [];
  var WELTSEITEN = window.HEIBEN_WELTSEITEN || {};

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  var hier = (location.pathname.split('/').pop() || 'index.html');
  var istIntern = INTERN.some(function (e) { return e.u === hier; });

  /* --- 1. Band auf internen Seiten --- */
  function band() {
    if (!istIntern || document.getElementById('hbInternBand')) return;
    var d = document.createElement('div');
    d.id = 'hbInternBand';
    d.setAttribute('role', 'note');
    d.className = 'hb-intern-band';
    d.innerHTML = '<span class="hb-intern-punkt" aria-hidden="true"></span>'
      + '<b>Interner Bereich</b>'
      + '<span>Backoffice der HeiBen Holding — nicht Teil des öffentlichen Auftritts. '
      + 'Alle Daten bleiben lokal auf diesem Gerät.</span>'
      + '<a href="holding-dashboard.html">Alle internen Bereiche</a>';
    var nav = document.querySelector('.hb-nav');
    if (nav && nav.parentNode) nav.parentNode.insertBefore(d, nav.nextSibling);
    else document.body.insertBefore(d, document.body.firstChild);
  }

  /* --- 2. Übersicht der internen Bereiche --- */
  function uebersicht() {
    document.querySelectorAll('[data-hb-intern]').forEach(function (b) {
      if (!INTERN.length) { b.hidden = true; return; }
      b.innerHTML = '<div class="hb-raster" style="--hb-min:240px">' + INTERN.map(function (e) {
        return '<a class="hb-kachel" href="' + esc(e.u) + '" data-hb-welt="' + esc(e.w) + '">'
          + '<span class="hb-augenbraue">Intern</span>'
          + '<span class="hb-titel-3" style="display:block">' + esc(e.t) + '</span>'
          + '<span class="hb-fliess" style="display:block;margin-top:var(--hb-raum-2)">'
          + esc(e.b.replace(/^Interner Bereich:\s*/, '')) + '</span></a>';
      }).join('') + '</div>';
    });
  }

  /* --- 3. Seiten einer Welt --- */
  function weltseiten() {
    document.querySelectorAll('[data-hb-weltseiten]').forEach(function (b) {
      var w = (b.getAttribute('data-hb-weltseiten') || '').trim();
      var liste = (WELTSEITEN[w] || []).filter(function (e) { return e.u !== hier; });
      if (!liste.length) { b.hidden = true; return; }
      b.innerHTML = '<div class="hb-raster" style="--hb-min:230px">' + liste.map(function (e) {
        return '<a class="hb-kachel" href="' + esc(e.u) + '" data-hb-welt="' + esc(w) + '">'
          + '<span class="hb-titel-3" style="display:block">' + esc(e.t) + '</span>'
          + '<span class="hb-fliess" style="display:block;margin-top:var(--hb-raum-2)">'
          + esc(e.b) + '</span></a>';
      }).join('') + '</div>';
    });
  }

  function los() { band(); uebersicht(); weltseiten(); }
  /* Das Band braucht die von heiben-nav.js erzeugte Leiste — beide laufen mit defer,
     die Navigation steht vorher im Kopf, also ist sie hier bereits da. */
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', los);
  else los();
})();
