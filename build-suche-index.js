/* build-suche-index.js — HeiBen Suchindex neu erzeugen.
 *
 * IMMER nach jeder Aenderung an web/lebenswissen-daten.js ausfuehren:
 *     node build-suche-index.js
 *
 * Was es tut:
 *   - laedt web/lebenswissen-daten.js (LW_DATA: ARTIKEL, KATS)
 *   - laedt den bestehenden web/suche-index.js
 *   - behaelt ALLE Nicht-Lebenswissen-Eintraege (Rezepte, Magazin, Schaufenster, Seiten) unveraendert
 *   - erzeugt die Lebenswissen-Eintraege komplett neu aus ALLEN Artikeln
 *   - aktualisiert die Wegweiser-Zahl auf der Hub-Seite (studio-lebenswissen.html)
 *   - schreibt web/suche-index.js (Header-Kommentar in Zeile 1 bleibt erhalten)
 */
const fs = require('fs');
const path = require('path');

const WEB = fs.existsSync(path.join(__dirname, 'web')) ? path.join(__dirname, 'web') : __dirname;
const DATA = path.join(WEB, 'lebenswissen-daten.js');
const INDEX = path.join(WEB, 'suche-index.js');

global.window = {};
require(DATA);
const D = global.window.LW_DATA;
if (!D || !Array.isArray(D.ARTIKEL)) { console.error('FEHLER: LW_DATA.ARTIKEL nicht gefunden'); process.exit(1); }

const katName = {};
Object.keys(D.KATS || {}).forEach(k => { const v = D.KATS[k]; katName[k] = (v && (v.n || v.name)) || k; });

const raw = fs.readFileSync(INDEX, 'utf8');
const header = raw.split('\n')[0];
require(INDEX);
const OLD = global.window.HEIBEN_SUCHE || [];

// Seiten-Eintraege kommen seit v3-W5 aus tools/seiten.json und werden hier neu
// erzeugt — vorher kannte die Suche nur 14 von 102 Seiten.
const REG = JSON.parse(fs.readFileSync(path.join(__dirname, 'tools', 'seiten.json'), 'utf8'));
const LABEL = {
  reisen: 'Reisen', wohnen: 'Wohnen', immobilien: 'Immobilien', studio: 'Studio',
  kulinarik: 'Kulinarik', wissen: 'Wissen', konto: 'Mein HeiBen', holding: 'Unternehmen',
};
const entities = (t) => String(t).replace(/&(amp|lt|gt|quot|#39|nbsp);/g,
  (_, e) => ({ amp: '&', lt: '<', gt: '>', quot: '"', '#39': "'", nbsp: ' ' }[e]));
const seitenEintraege = Object.keys(REG.seiten)
  .filter((d) => {
    const e = REG.seiten[d];
    // Standalone-Entwuerfe und interne Bereiche gehoeren nicht in die oeffentliche Suche.
    return e.typ !== 'standalone' && e.typ !== 'intern' && d !== '404.html'
      && fs.existsSync(path.join(WEB, d));
  })
  .map((d) => {
    const e = REG.seiten[d];
    const art = e.typ === 'werkzeug' ? 'Werkzeug'
      : e.typ === 'kompendium' ? 'Kompendium'
      : e.typ === 'legal' ? 'Rechtliches' : (LABEL[e.welt] || 'Seite');
    return { t: 'seite', u: d, h: entities(e.titel).replace(/\s*[·—-]\s*HeiBen$/, ''),
      s: art, x: entities(e.beschreibung) };
  });

// Nicht-Lebenswissen und Nicht-Seiten behalten; Hub-Seite Wegweiser-Zahl aktualisieren
const nonLW = OLD.filter(e => e.t !== 'lebenswissen' && e.t !== 'seite').map(e => {
  if (e.t === 'seite' && e.u === 'studio-lebenswissen.html') {
    return Object.assign({}, e, { x: e.x.replace(/\b\d+ Wegweiser/, D.ARTIKEL.length + ' Wegweiser') });
  }
  return e;
});

// Lebenswissen-Eintraege frisch aus ALLEN Artikeln
const lw = D.ARTIKEL.map(a => ({
  t: 'lebenswissen',
  u: 'studio-lebenswissen-artikel.html?id=' + a.id,
  h: a.t,
  s: katName[a.k] || a.k,
  x: a.kurz || ''
}));

const out = nonLW.concat(seitenEintraege, lw);
fs.writeFileSync(INDEX, header + '\n' + 'window.HEIBEN_SUCHE=' + JSON.stringify(out) + ';\n', 'utf8');
console.log('Suchindex neu: ' + out.length + ' Eintraege (' + nonLW.length + ' uebrige + '
  + seitenEintraege.length + ' Seiten + ' + lw.length + ' Lebenswissen).');
