/* ============================================================
   HeiBen Bewegung — Regie. Remake v3, Welle 3.

   Zwei Pfade, ein Beobachter:
   1) BESTANDSPFAD  — dieselbe Auswahl und dieselbe Wirkung wie seit W1
      (section / header.subhero / footer und die ersten Kinder von
      [class*="grid"]). Eingefroren: der Bestand soll sich nicht ändern.
   2) ANSAGEPFAD    — [data-hb-motion] im Markup. Für alles Neue.
      Die Seite sagt WAS, diese Datei sagt WANN.

   Grundsätze:
   - EIN IntersectionObserver für beide Pfade.
   - Bewegungsruhe wird beachtet und LIVE nachgezogen (matchMedia change):
     Inhalt bleibt sichtbar, nur die Bewegung entfällt.
   - Kein Element bleibt unsichtbar zurück: was der Beobachter nicht
     erreicht, wird beim Verlassen der Seite sichtbar geschaltet.
   ============================================================ */
(function () {
  'use strict';
  var ruhig = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');

  /* Sofort sichtbar, ohne Bewegung — fuer Bewegungsruhe und fehlenden Beobachter. */
  function alleZeigen() {
    document.querySelectorAll('[data-hb-motion]').forEach(function (el) {
      el.classList.add('hb-sicht');
    });
    document.querySelectorAll('.hb-rv').forEach(function (el) {
      el.classList.add('hb-go', 'hb-done');
    });
  }

  /* Sicherheitsnetz: nur den Eintritt ausloesen. NICHT 'hb-done' setzen —
     das wuerde eine laufende Animation mittendrin abschneiden (Bestand seit W1). */
  function netzAuffangen() {
    document.querySelectorAll('[data-hb-motion]').forEach(function (el) {
      el.classList.add('hb-sicht');
    });
    document.querySelectorAll('.hb-rv:not(.hb-go)').forEach(function (el) {
      el.classList.add('hb-go');
    });
  }

  /* Bewegungsruhe: nichts animieren, aber auch nichts verstecken. */
  if (ruhig && ruhig.matches) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', alleZeigen);
    } else {
      alleZeigen();
    }
    return;
  }
  if (ruhig && ruhig.addEventListener) {
    ruhig.addEventListener('change', function (e) { if (e.matches) alleZeigen(); });
  }
  if (!('IntersectionObserver' in window)) { alleZeigen(); return; }

  function start() {
    var beobachtet = [];

    /* Seiten, die ihre Bewegung selbst ansagen, bekommen NUR ihre Ansage.
       <body data-hb-regie="ansage"> schaltet den Bestandspfad ab. Ohne das
       Attribut bleibt alles wie seit W1 — die 100 Bestandsseiten merken nichts. */
    var nurAnsage = document.body && document.body.getAttribute('data-hb-regie') === 'ansage';

    /* --- 1) Bestandspfad: Auswahl unverändert seit W1 --- */
    if (!nurAnsage) {
    document.querySelectorAll('section, header.subhero, footer').forEach(function (el) {
      if (el.hasAttribute('data-hb-motion')) return;   /* Ansage hat Vorrang */
      if (el.dataset.hbErfasst) return;
      el.dataset.hbErfasst = '1';
      el.classList.add('hb-rv');
      beobachtet.push(el);
    });
    document.querySelectorAll('[class*="grid"]').forEach(function (g) {
      if (g.closest('nav')) return;
      Array.prototype.slice.call(g.children, 0, 12).forEach(function (el, i) {
        if (el.hasAttribute('data-hb-motion')) return;
        if (el.dataset.hbErfasst) return;
        el.dataset.hbErfasst = '1';
        el.classList.add('hb-rv');
        el.style.setProperty('--hbd', (Math.min(i, 8) * 0.075) + 's');
        beobachtet.push(el);
      });
    });
    beobachtet.forEach(function (el) {
      el.addEventListener('animationend', function h() {
        el.classList.add('hb-done');
        el.removeEventListener('animationend', h);
      });
    });
    }

    /* --- 2) Ansagepfad: Stufung aus der Geschwisterfolge --- */
    var stufe = getComputedStyle(document.documentElement)
      .getPropertyValue('--hb-stufe').trim() || '70ms';
    var stufeMs = parseFloat(stufe) * (stufe.indexOf('ms') < 0 ? 1000 : 1);
    var gruppen = new Map();
    var angesagt = Array.prototype.slice.call(
      document.querySelectorAll('[data-hb-motion]:not([data-hb-erfasst])'));
    angesagt.forEach(function (el) {
      el.dataset.hbErfasst = '1';
      if (!el.hasAttribute('data-hb-stufe')) {
        var p = el.parentElement || document.body;
        var n = gruppen.get(p) || 0;
        gruppen.set(p, n + 1);
        if (n > 0) el.style.setProperty('--hb-verzug', Math.min(n, 8) * stufeMs + 'ms');
      } else {
        el.style.setProperty('--hb-verzug',
          Math.min(parseInt(el.getAttribute('data-hb-stufe'), 10) || 0, 12) * stufeMs + 'ms');
      }
      beobachtet.push(el);
    });

    var io = new IntersectionObserver(function (eintraege) {
      eintraege.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add(e.target.hasAttribute('data-hb-motion') ? 'hb-sicht' : 'hb-go');
        io.unobserve(e.target);
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -4% 0px' });
    beobachtet.forEach(function (el) { io.observe(el); });

    /* Sicherheitsnetz wie seit W1: nach 3 s ist garantiert alles sichtbar. */
    setTimeout(function () { netzAuffangen(); io.disconnect(); }, 3000);
  }

  /* SOFORT starten, nicht auf DOMContentLoaded warten: der Bestand bindet diese
     Datei am Ende des <body> ein und setzt die Reveal-Klassen noch waehrend des
     Parsens. Ein spaeteres Setzen koennte den Inhalt kurz aufblitzen lassen.
     Fuer Einbindungen im <head> (defer) wird bei DOMContentLoaded nachgetragen —
     start() ueberspringt, was bereits erfasst ist. */
  start();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  }
})();
