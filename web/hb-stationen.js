/* ============================================================================
   HeiBen — besuchte Kompendium-Stationen merken. Remake v3, Welle 22.

   AUSGANGSLAGE: 48 der 91 Lernpfad-Schritte zeigen auf Steckbriefe der acht
   Kompendien (`pflanzen.html#tomate` …). Abgehakt werden konnten sie nie:
   `isDone()` erkennt nur `?id=`-Ziele im Verlauf, und ein Steckbrief schrieb
   überhaupt nichts. Über die Hälfte jedes Säulen-Pfads war damit tot.

   WARUM EIN EIGENER SCHLÜSSEL: `heiben-verlauf` ist auf 10 Einträge gekappt —
   als Gedächtnis für „gelesen" reicht das nicht, der elfte Besuch löscht den
   ersten. `heiben-stationen` hält den Bestand: { "<stationId>": <zeit> }.
   Der Verlauf wird zusätzlich gefüttert, damit „Zuletzt angesehen" stimmt.

   DIE KENNUNG entsteht aus Datei und Sprungmarke, so wie sie in
   lernpfade-daten.js vergeben wurde:  pflanzen.html#tomate → k8-pflanzen-tomate

   Diese Datei SCHREIBT nur. Gelesen wird der Schlüssel dort, wo der
   Fortschritt zählt (lernpfade.html, heiben-stand.js, heiben-rueckblick.js) —
   drei Zeilen `Object.keys(...)`, keine Ableitung, keine Kopie von Logik.
   ========================================================================== */
(function () {
  'use strict';
  var SK = 'heiben-stationen';
  var datei = (location.pathname.split('/').pop() || '').replace(/\.html$/, '');
  if (!datei) return;

  function lesen(k, f) {
    try { var v = JSON.parse(localStorage.getItem(k)); return v == null ? f : v; }
    catch (e) { return f; }
  }
  function schreiben(k, v) {
    try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* voll oder gesperrt */ }
  }

  function stationId(marke) {
    return 'k8-' + datei + '-' + marke;
  }

  /* Der Verlauf faerbt seinen Punkt mit var(--<k>). Die Kategorien stammen aus
     dem Lebenswissen (KATS); ein Kompendiumname waere dort keine Farbe. Darum
     jedes Kompendium auf die Kategorie legen, in die es inhaltlich gehoert. */
  var KATEGORIE = {
    auto: 'freizeit', digital: 'digital', erstehilfe: 'gesundheit',
    finanzen: 'finanzen', haushalt: 'wohnen', lebensmittel: 'gesundheit',
    papierkram: 'buero', pflanzen: 'freizeit'
  };

  function merken(marke) {
    if (!marke) return;
    var id = stationId(marke);
    var stand = lesen(SK, {});
    stand[id] = Date.now();
    schreiben(SK, stand);

    /* Verlauf: derselbe Eintrag wie überall — echte URL, kein Ersatzpfad,
       damit „Zuletzt angesehen" den Steckbrief auch wirklich öffnet. */
    var titel = titelVon(marke);
    var u = datei + '.html#' + marke;
    var H = lesen('heiben-verlauf', []);
    if (!Array.isArray(H)) H = [];
    H = H.filter(function (x) { return x && x.u !== u; });
    H.unshift({ ty: 'kb', n: titel, u: u, k: KATEGORIE[datei] || 'buero' });
    schreiben('heiben-verlauf', H.slice(0, 10));
  }

  /* Der Titel steht schon auf der Seite — die Karte trägt ihn. Kein zweiter
     Datenzugriff, keine Annahme über den Datensatz der jeweiligen Seite. */
  function karteVon(marke) {
    try {
      return document.querySelector('[data-id="' + (window.CSS && CSS.escape
        ? CSS.escape(marke) : marke.replace(/"/g, '\\"')) + '"]');
    } catch (e) { return null; }
  }

  function titelVon(marke) {
    var karte = karteVon(marke);
    var n = karte && karte.querySelector('.n');
    var t = (n ? n.textContent : (karte ? karte.textContent : '')) || marke;
    return t.trim().slice(0, 90) || marke;
  }

  /* Der Deep-Link beim Laden. Die Seite oeffnet ihn selbst in einem inline-
     Skript — das laeuft VOR dieser defer-Datei, HB_STATIONEN gibt es da noch
     nicht. Darum hier nachtragen, aber nur, wenn wirklich ein Steckbrief
     offen ist: sonst merkte sich eine falsch getippte Sprungmarke eine
     Station, die es nicht gibt. */
  function ausHash() {
    var h = (location.hash || '').slice(1);
    if (!h) return;
    if (!karteVon(h)) return;              /* Station gibt es hier nicht */
    try { merken(decodeURIComponent(h)); } catch (e) { merken(h); }
  }

  window.addEventListener('hashchange', ausHash);
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ausHash);
  } else {
    ausHash();
  }

  /* Nach aussen sichtbar, damit die Seite beim Öffnen einer Station melden
     kann, was sie zeigt — auch wenn der Hash schon stimmt (erneuter Aufruf
     derselben Marke löst kein hashchange aus). */
  window.HB_STATIONEN = { merken: merken, schluessel: SK };
})();
