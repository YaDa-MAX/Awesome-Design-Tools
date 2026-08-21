/* HeiBen — die fünf Weltzeichen als EINE Quelle.
   Remake v3, Welle 13.

   Bis dahin lag die Geometrie nur in index.html. Die Weltseiten zeigen dasselbe
   Zeichen — also gehört es in eine Datei, nicht zweimal in Seiten.

   AUFBAU je Welt:
     form     Polygonzug in einem 100×100-Feld, offen gezeichnet aber umlaufend
              geführt (Anfang und Ende treffen sich). Die Startseite tastet ihn
              per Bogenlänge auf feste Punktzahl um und lerpt zwischen den Welten;
              die Weltseiten zeichnen ihn direkt.
     detail   Ergänzungen (Griff, Fenster, Faden, Dampf …) als fertige Pfad-d.
              REGEL aus v3-W9: eine Kante wird von genau EINEM Pfad gezeichnet —
              deshalb hat der Topf keine Randlinie in der Form, der Deckel schließt
              sie; und die Tür hat keine eigene Schwelle.
     grund    kanonische Weltfarbe (heiben-firmierungen.js)
     licht    dieselbe Farbe, auf dunklem Grund lesbar gemacht
     verb     das Verb der Welt, wie auf der Startseite

   Reihenfolge ist die Reihenfolge der Welten: Reisen, Wohnen, Immobilien,
   Studio, Kulinarik. Wer sie ändert, ändert die Erzählung der Startseite mit. */
(function () {
  'use strict';

  function bogen(cx, cy, rx, ry, von, bis, n) {
    var p = [], i;
    for (i = 0; i <= n; i++) {
      var a = (von + (bis - von) * (i / n)) * Math.PI / 180;
      p.push([cx + rx * Math.cos(a), cy - ry * Math.sin(a)]);
    }
    return p;
  }
  function kasten(x1, y1, x2, y2, r) {
    return [[x1 + r, y1], [x2 - r, y1]]
      .concat(bogen(x2 - r, y1 + r, r, r, 90, 0, 8)).concat([[x2, y2 - r]])
      .concat(bogen(x2 - r, y2 - r, r, r, 0, -90, 8)).concat([[x1 + r, y2]])
      .concat(bogen(x1 + r, y2 - r, r, r, -90, -180, 8)).concat([[x1, y1 + r]])
      .concat(bogen(x1 + r, y1 + r, r, r, 180, 90, 8));
  }

  var MARKEN = [
    {
      welt: 'reisen', zeichen: 'Koffer', verb: 'aufbrechen',
      grund: '#a97a1d', licht: '#d2a544',
      form: kasten(19, 35, 81, 79, 6),
      detail: ['M41 35 V30 a9 5 0 0 1 18 0 V35', 'M19 55 H81',
               'M35 51 h7 v8 h-7 z', 'M58 51 h7 v8 h-7 z']
    },
    {
      welt: 'wohnen', zeichen: 'Haus', verb: 'bleiben',
      grund: '#4a5c39', licht: '#8fae6c',
      form: [[14,52],[50,21],[86,52],[86,85],[14,85],[14,52]],
      detail: ['M43 85 V65 h14 v20', 'M22 58 h13 v13 h-13 z',
               'M28.5 58 v13', 'M22 64.5 h13', 'M70 34 V24 h7 v17']
    },
    {
      welt: 'immobilien', zeichen: 'Tür', verb: 'ankommen',
      grund: '#792d29', licht: '#c9736a',
      form: [[26,88],[26,48]].concat(bogen(50,48,24,24,180,0,26)).concat([[74,48],[74,88],[26,88]]),
      detail: ['M33 88 V50 a17 17 0 0 1 34 0 V88', 'M63 68 a2.6 2.6 0 1 1 -0.1 0']
    },
    {
      welt: 'studio', zeichen: 'Glühbirne', verb: 'verstehen',
      grund: '#1f1c17', licht: '#d8cdb7',
      form: [[42,74]].concat(bogen(50,46,25,25,252,-72,42)).concat([[58,74],[58,88],[42,88],[42,74]]),
      detail: ['M44 55 q3 -11 6 0 q3 11 6 0', 'M42 79 H58', 'M42 84 H58',
               'M26 26 l-7 -6', 'M74 26 l7 -6', 'M50 15 V7']
    },
    {
      welt: 'kulinarik', zeichen: 'Topf', verb: 'teilen',
      grund: '#6b3951', licht: '#b47fa1',
      form: [[16,42],[19,68]].concat(bogen(50,68,31,12,180,360,24)).concat([[81,68],[84,42]]),
      detail: ['M16 42 a34 13 0 0 1 68 0', 'M50 22 a3.5 3.5 0 1 0 0.1 0',
               'M16.5 46 a7 6 0 0 0 1.2 11', 'M83.5 46 a7 6 0 0 1 -1.2 11',
               'M41 19 q5 -4 0 -8 q-5 -4 0 -8', 'M59 19 q5 -4 0 -8 q-5 -4 0 -8']
    }
  ];

  function nach(welt) {
    for (var i = 0; i < MARKEN.length; i++) if (MARKEN[i].welt === welt) return MARKEN[i];
    return null;
  }
  /* Punktliste zu einem d-Attribut. Gerade Segmente: die Ecken von Haus und
     Koffer sollen Ecken bleiben, die Rundungen stecken schon in den Punkten. */
  function pfad(punkte) {
    var d = 'M' + punkte[0][0].toFixed(2) + ' ' + punkte[0][1].toFixed(2), i;
    for (i = 1; i < punkte.length; i++) d += 'L' + punkte[i][0].toFixed(2) + ' ' + punkte[i][1].toFixed(2);
    return d;
  }

  window.HEIBEN_MARKEN = MARKEN;
  window.HEIBEN_MARKE = { nach: nach, pfad: pfad, bogen: bogen, kasten: kasten };
})();
