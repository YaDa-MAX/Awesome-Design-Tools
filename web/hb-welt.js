/* HeiBen — Regie der Weltseiten. Remake v3, Welle 13.

   Zwei Aufgaben, beide klein:
   1. das Zeichen der Welt in die Bühne zeichnen (Silhouette + Detailstriche),
      Geometrie aus heiben-marken.js — dieselbe Quelle wie die Startseite;
   2. den Maskenaufzug auslösen.

   REGEL AUS v3-W9 (teuer gelernt): Chromium rechnet das eigene clip-path eines
   Elements in die Sichtbarkeitsquote des IntersectionObservers ein. Ein Bauteil,
   das maskiert startet, meldet ewig 0 %. Also wird der BLOCK beobachtet und die
   KINDER werden aufgezogen. Bei Bewegungsruhe hängt nichts am Scrollen. */
(function () {
  'use strict';

  var welt = (document.body.getAttribute('data-hb-welt') || '').trim();
  var marke = window.HEIBEN_MARKE && window.HEIBEN_MARKE.nach(welt);
  var ruhe = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var NS = 'http://www.w3.org/2000/svg';

  /* ---------- 1. Zeichen ---------------------------------------------------- */
  var buehne = document.querySelector('[data-w-marke]');
  if (buehne && marke) {
    var schein = document.createElement('div');
    schein.className = 'schein';
    schein.setAttribute('aria-hidden', 'true');
    buehne.appendChild(schein);

    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '0 0 100 100');
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', 'Das Zeichen der Welt ' + welt + ': ' + marke.zeichen);

    var strich = document.createElementNS(NS, 'path');
    strich.setAttribute('class', 'w-strich');
    strich.setAttribute('d', window.HEIBEN_MARKE.pfad(marke.form));
    strich.setAttribute('pathLength', '1');
    svg.appendChild(strich);

    var gruppe = document.createElementNS(NS, 'g');
    gruppe.setAttribute('class', 'w-detail');
    marke.detail.forEach(function (d) {
      var p = document.createElementNS(NS, 'path');
      p.setAttribute('d', d);
      p.setAttribute('pathLength', '1');
      gruppe.appendChild(p);
    });
    svg.appendChild(gruppe);
    buehne.appendChild(svg);

    /* Das Zeichen zeichnet sich einmal selbst — der eine Auftritt der Seite.
       Erst die Silhouette, dann die Details, wie auf der Startseite. */
    if (!ruhe) {
      strich.style.strokeDasharray = '1';
      strich.style.strokeDashoffset = '1';
      gruppe.style.opacity = '0';
      requestAnimationFrame(function () {
        strich.style.transition = 'stroke-dashoffset 1500ms cubic-bezier(.22,.9,.24,1) 200ms';
        strich.style.strokeDashoffset = '0';
        gruppe.style.transition = 'opacity 620ms linear 1400ms';
        gruppe.style.opacity = '1';
      });
    }
  }

  /* ---------- 2. Maskenaufzug ---------------------------------------------- */
  var bloecke = [].slice.call(document.querySelectorAll('[data-w-block]'));
  function zeigen(block) {
    [].slice.call(block.querySelectorAll('.w-auf')).forEach(function (el) { el.classList.add('da'); });
  }
  if (ruhe || !('IntersectionObserver' in window)) {
    bloecke.forEach(zeigen);
  } else {
    var beobachter = new IntersectionObserver(function (eintraege) {
      eintraege.forEach(function (e) {
        if (!e.isIntersecting) return;
        zeigen(e.target);
        beobachter.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.16 });
    bloecke.forEach(function (b) { beobachter.observe(b); });
    /* Der Kopf steht schon im Bild — er wartet nicht auf einen Schnittpunkt. */
    var kopf = document.querySelector('[data-w-block="kopf"]');
    if (kopf) requestAnimationFrame(function () { zeigen(kopf); });
  }
})();
