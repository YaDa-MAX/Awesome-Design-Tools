/* HeiBen Service-Worker-Generator — erzeugt die PRECACHE-Liste aus dem Dateibestand.
   Aufruf:  cd web && node ../tools/gen_sw.js [--pruefen]

   GRUNDSATZ: Der Precache sichert den KALTSTART, nicht den ganzen Bestand. Der
   fetch-Handler des Service-Workers legt ohnehin jede abgerufene Datei ab
   (stale-while-revalidate) — schwere Brocken landen also beim ersten Gebrauch
   im Cache. Vorab geladen wird deshalb nur:
     - jede Seite ausser den Standalone-Entwuerfen aus tools/seiten.json,
     - jede von einer Seite referenzierte Datei, die klein genug ist,
     - das Manifest.
   Ausgeschlossen: alles unter vendor/ und Einzeldateien ueber GRENZE. */
const fs = require('fs');
const path = require('path');

const GRENZE = 150 * 1024;
const PRUEFEN = process.argv.includes('--pruefen');
const REG = JSON.parse(fs.readFileSync(path.join(__dirname, 'seiten.json'), 'utf8')).seiten;
const STANDALONE = new Set(Object.keys(REG).filter((f) => REG[f].typ === 'standalone'));

const seiten = fs.readdirSync('.')
  .filter((f) => f.endsWith('.html') && !STANDALONE.has(f))
  .sort();

const RE_REF = /(?:<script[^>]+src|<link[^>]+href|<img[^>]+src)="([^"]+)"/g;
const referenziert = new Set();
const fehlend = [];
for (const seite of seiten) {
  const s = fs.readFileSync(seite, 'utf8');
  let m;
  while ((m = RE_REF.exec(s)) !== null) {
    const ziel = m[1].split('?')[0].split('#')[0];
    if (!ziel || /^(https?:)?\/\//.test(ziel) || ziel.startsWith('data:')) continue;
    /* Aus Inline-Skripten stammende Vorlagen ("' + x + '") sind keine Dateien. */
    if (/['"`+${}]/.test(ziel)) continue;
    if (fs.existsSync(ziel)) referenziert.add(ziel);
    else fehlend.push(seite + ' -> ' + ziel);
  }
}

/* Zweite Runde: was Stylesheets per url() holen, gehoert ebenso in den Precache.
   Ohne diesen Schritt fehlte ein Bild, das NUR aus CSS kommt, offline — genau so
   ist es dem Monogramm in v3-W12 ergangen. Auch Inline-<style> wird gelesen, denn
   die Startseite haelt ihre Gestaltung im Dokument. */
const RE_URL = /url\(\s*['"]?([^'")]+)['"]?\s*\)/g;
const RE_STYLE = /<style[^>]*>([\s\S]*?)<\/style>/g;
const quellen = [...referenziert].filter((f) => f.endsWith('.css')).map((f) => fs.readFileSync(f, 'utf8'));
for (const seite of seiten) {
  const s = fs.readFileSync(seite, 'utf8');
  let m;
  while ((m = RE_STYLE.exec(s)) !== null) quellen.push(m[1]);
}
for (const css of quellen) {
  let m;
  while ((m = RE_URL.exec(css)) !== null) {
    const ziel = m[1].split('?')[0].split('#')[0];
    if (!ziel || /^(https?:)?\/\//.test(ziel) || ziel.startsWith('data:')) continue;
    if (fs.existsSync(ziel)) referenziert.add(ziel);
  }
}

const spaeter = [];
const dateien = [...referenziert].filter((f) => {
  if (f.startsWith('vendor/')) { spaeter.push(f); return false; }
  if (fs.statSync(f).size > GRENZE) { spaeter.push(f); return false; }
  return true;
}).sort();

if (fs.existsSync('manifest.webmanifest')) dateien.push('manifest.webmanifest');

/* Doppelte vermeiden: das Manifest steht bereits als <link rel="manifest"> in den Seiten. */
const liste = [...new Set([...seiten, ...dateien])];
const kb = (n) => Math.round(n / 1024);
const gesamt = liste.reduce((a, f) => a + fs.statSync(f).size, 0);

const sw = fs.readFileSync('service-worker.js', 'utf8');
const anfang = sw.indexOf('const PRECACHE=[');
const ende = sw.indexOf('];', anfang);
if (anfang < 0 || ende < 0) throw new Error('PRECACHE-Block in service-worker.js nicht gefunden');

/* Cache-Version hochzaehlen */
const ver = sw.match(/heiben-v(\d+)-(\d+)/);
const neueVer = `heiben-v${ver[1]}-${Number(ver[2]) + 1}`;

const block = 'const PRECACHE=[\n'
  + '  /* GENERIERT von tools/gen_sw.js — nicht von Hand pflegen.\n'
  + '     Kaltstart-Huelle; Grosses und vendor/ kommt zur Laufzeit in den Cache. */\n'
  + liste.map((f) => `  "${f}"`).join(',\n') + '\n';

/* Version steht am Dateianfang — erst zusammensetzen, dann ersetzen. */
const neu = (sw.slice(0, anfang) + block + sw.slice(ende)).replace(ver[0], neueVer);

console.log(PRUEFEN ? 'PRÜFLAUF (nichts geschrieben)' : 'GESCHRIEBEN');
console.log(`  Precache: ${liste.length} Einträge (${seiten.length} Seiten + ${dateien.length} Dateien), ${kb(gesamt)} KB`);
console.log(`  zur Laufzeit: ${spaeter.length} Dateien (vendor/ oder > ${kb(GRENZE)} KB)`);
if (fehlend.length) console.log('  FEHLENDE Referenzen:\n    ' + fehlend.join('\n    '));
if (!PRUEFEN) {
  fs.writeFileSync('service-worker.js', neu);
  console.log(`  Cache-Version: ${ver[0]} → ${neueVer}`);
}
