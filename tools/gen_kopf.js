/* HeiBen Kopf-Generator — normiert den Dokumentkopf aller Seiten aus tools/seiten.json.
   Aufruf:  cd web && node ../tools/gen_kopf.js            (schreibt)
            cd web && node ../tools/gen_kopf.js --pruefen  (nur Bericht)

   Der Generator besitzt AUSSCHLIESSLICH Metadaten ohne Layout-Wirkung: charset, viewport,
   title, description, canonical, robots, theme-color, App-Meta, Manifest, Favicons, og/twitter
   und JSON-LD. Er schreibt sie als einen Block direkt hinter <head> und entfernt die alten
   Einzelvorkommen. Schriften, Stylesheets, <style>-Bloecke und sonstige Skripte bleiben
   unberuehrt — deren Reihenfolge entscheidet ueber das Aussehen.

   Zusaetzlich stellt er sicher, dass jede Seite heiben-design.css, heiben-nav.js,
   heiben-legal.js und hb-pwa.js laedt. Vorhandene Einbindungen werden NICHT verschoben,
   fehlende am Ende des Kopfes ergaenzt. */
const fs = require('fs');
const path = require('path');

const REG = JSON.parse(fs.readFileSync(path.join(__dirname, 'seiten.json'), 'utf8'));
const BASIS = REG._basis;
const SEITEN = REG.seiten;
const PRUEFEN = process.argv.includes('--pruefen');

/* Firmierungen — gespiegelt aus web/heiben-firmierungen.js (dort ist der Kanon). */
const FIRMA = {
  reisen: 'HeiBen Reisen GmbH', wohnen: 'HeiBen Wohnen GmbH',
  immobilien: 'HeiBen Immobilien GmbH', studio: 'HeiBen Studio GmbH',
  kulinarik: 'HeiBen Kulinarik GmbH',
  /* Wissen ist Studio-Substanz: Studio ist Absender und Lizenzgeber der Kompendien
     (REMAKE-KONZEPT.md § 2.2). */
  wissen: 'HeiBen Studio GmbH',
};
const HOLDING = 'HeiBen Holding GmbH';
const PAPIER = '#f3eee5';   /* Grundton der Marke — Vorgabe fuer theme-color */
const VORSCHAU = 'assets/hero-light.png';   /* Wortmarke auf hellem Grund */
/* Zwei Felder duerfen je Seite abweichen, weil sie das AUSSEHEN beschreiben und nicht
   den Inhalt: "farbe" faerbt die Browserleiste, "bild" ist das Vorschaubild beim Teilen.
   Die dunkle Startseite darf nicht mit heller Browserleiste und hellem Bild auftreten. */

const PFLICHT = [
  { datei: 'heiben-design.css', tag: '<link rel="stylesheet" href="heiben-design.css">' },
  { datei: 'heiben-nav.js', tag: '<script src="heiben-nav.js" defer></script>', optionalWennNavAus: true },
  /* Weltmenue: heiben-nav.js baut das Feld erst beim ersten Oeffnen, liest die Liste
     also nach dem Laden aller defer-Skripte. Reihenfolge im Kopf ist darum egal. */
  { datei: 'heiben-menue.js', tag: '<script src="heiben-menue.js" defer></script>', optionalWennNavAus: true },
  { datei: 'heiben-legal.js', tag: '<script src="heiben-legal.js" defer></script>' },
  { datei: 'hb-pwa.js', tag: '<script id="hb-pwa" src="hb-pwa.js" defer></script>' },
  /* Nur dort, wo es etwas zu tun gibt: auf internen Seiten (Kennzeichnung) und auf
     Seiten mit einem Behaelter (Uebersichten). Nicht auf allen 102 Seiten. */
  { datei: 'heiben-bereiche.js', tag: '<script src="heiben-bereiche.js" defer></script>',
    nurWenn: (e, text) => e.typ === 'intern' || /data-hb-(intern|weltseiten)/.test(text) },
  { datei: 'hb-nachbarn.js', tag: '<script src="hb-nachbarn.js" defer></script>',
    nurWenn: (e, text) => /data-hb-nachbarn/.test(text) },
  { datei: 'hb-bereiche.js', tag: '<script src="hb-bereiche.js" defer></script>',
    nurWenn: (e, text) => e.typ === 'intern' || /data-hb-(intern|weltseiten)/.test(text) },
];

/* Tags, die der Generator besitzt und darum vorher entfernt. */
const ENTFERNEN = [
  /<meta[^>]+charset=[^>]*>\s*/gi,
  /<meta[^>]+name=["']viewport["'][^>]*>\s*/gi,
  /<title[^>]*>[\s\S]*?<\/title>\s*/gi,
  /<meta[^>]+name=["']description["'][^>]*>\s*/gi,
  /<meta[^>]+name=["']robots["'][^>]*>\s*/gi,
  /<meta[^>]+name=["']theme-color["'][^>]*>\s*/gi,
  /<meta[^>]+name=["']application-name["'][^>]*>\s*/gi,
  /<meta[^>]+name=["'](?:apple-)?mobile-web-app-[^"']*["'][^>]*>\s*/gi,
  /<meta[^>]+name=["']apple-mobile-web-app-[^"']*["'][^>]*>\s*/gi,
  /<meta[^>]+property=["']og:[^"']*["'][^>]*>\s*/gi,
  /<meta[^>]+name=["']twitter:[^"']*["'][^>]*>\s*/gi,
  /<link[^>]+rel=["']canonical["'][^>]*>\s*/gi,
  /<link[^>]+rel=["']manifest["'][^>]*>\s*/gi,
  /<link[^>]+rel=["'](?:shortcut )?icon["'][^>]*>\s*/gi,
  /<link[^>]+rel=["']apple-touch-icon["'][^>]*>\s*/gi,
  /<script[^>]+type=["']application\/ld\+json["'][\s\S]*?<\/script>\s*/gi,
  /<!--\s*HeiBen social\/meta\s*-->\s*/gi,
  /<!-- hb:kopf[\s\S]*?<!-- \/hb:kopf -->\s*/g,
];

/* Erst entschluesseln, dann kodieren: sonst wird ein in seiten.json bereits als "&amp;"
   notierter Text zu "&amp;amp;". Der Registry-Text ist Klartext, nicht HTML. */
const entschluesseln = (s) => String(s)
  .replace(/&(amp|lt|gt|quot|#39|apos|nbsp);/g, (_, e) => ({
    amp: '&', lt: '<', gt: '>', quot: '"', '#39': "'", apos: "'", nbsp: ' ' }[e]));
const esc = (s) => entschluesseln(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
  .replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function jsonld(datei, e) {
  if (e.typ === 'intern') return '';
  const seite = { '@type': 'WebPage', name: e.titel, description: e.beschreibung,
    url: BASIS + (datei === 'index.html' ? '' : datei), inLanguage: 'de-DE' };
  const anbieter = FIRMA[e.welt] || HOLDING;
  if (e.typ === 'start') {
    return JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebSite',
      name: 'HeiBen', alternateName: 'HeiBen — Heimat leben', url: BASIS, inLanguage: 'de-DE',
      publisher: { '@type': 'Organization', name: HOLDING, slogan: 'Heimat leben',
        address: { '@type': 'PostalAddress', addressLocality: 'Köln', addressCountry: 'DE' } } });
  }
  seite.isPartOf = { '@type': 'WebSite', name: 'HeiBen', url: BASIS };
  seite.publisher = { '@type': 'Organization', name: anbieter };
  return JSON.stringify(Object.assign({ '@context': 'https://schema.org' }, seite));
}

function kopfblock(datei, e) {
  const url = BASIS + (datei === 'index.html' ? '' : datei);
  const z = [];
  z.push('<!-- hb:kopf — erzeugt von tools/gen_kopf.js aus tools/seiten.json. Nicht von Hand ändern. -->');
  z.push('<meta charset="utf-8">');
  z.push('<meta name="viewport" content="width=device-width, initial-scale=1">');
  z.push(`<title>${esc(e.titel)}</title>`);
  z.push(`<meta name="description" content="${esc(e.beschreibung)}">`);
  z.push(`<link rel="canonical" href="${url}">`);
  if (e.typ === 'intern') z.push('<meta name="robots" content="noindex, nofollow">');
  z.push(`<meta name="theme-color" content="${e.farbe || PAPIER}">`);
  z.push('<link rel="icon" type="image/svg+xml" href="assets/favicon.svg">');
  z.push('<link rel="icon" type="image/png" sizes="32x32" href="assets/favicon-32.png">');
  z.push('<link rel="apple-touch-icon" href="assets/apple-touch-icon.png">');
  z.push('<link rel="manifest" href="manifest.webmanifest">');
  z.push('<meta name="application-name" content="HeiBen">');
  z.push('<meta name="mobile-web-app-capable" content="yes">');
  z.push('<meta name="apple-mobile-web-app-capable" content="yes">');
  z.push('<meta name="apple-mobile-web-app-title" content="HeiBen">');
  z.push('<meta name="apple-mobile-web-app-status-bar-style" content="default">');
  z.push('<meta property="og:type" content="website">');
  z.push('<meta property="og:site_name" content="HeiBen">');
  z.push('<meta property="og:locale" content="de_DE">');
  z.push(`<meta property="og:url" content="${url}">`);
  z.push(`<meta property="og:title" content="${esc(e.titel)}">`);
  z.push(`<meta property="og:description" content="${esc(e.beschreibung)}">`);
  z.push(`<meta property="og:image" content="${e.bild || VORSCHAU}">`);
  z.push('<meta name="twitter:card" content="summary_large_image">');
  z.push(`<meta name="twitter:title" content="${esc(e.titel)}">`);
  z.push(`<meta name="twitter:description" content="${esc(e.beschreibung)}">`);
  z.push(`<meta name="twitter:image" content="${e.bild || VORSCHAU}">`);
  const ld = jsonld(datei, e);
  if (ld) z.push(`<script type="application/ld+json">${ld}</script>`);
  z.push('<!-- /hb:kopf -->');
  return z.join('\n');
}

let geschrieben = 0, ergaenzt = 0, uebersprungen = 0;
const berichte = [];

for (const datei of Object.keys(SEITEN)) {
  const e = SEITEN[datei];
  if (e.typ === 'standalone') { uebersprungen++; continue; }
  if (!fs.existsSync(datei)) { berichte.push(`  FEHLT: ${datei}`); continue; }
  const alt = fs.readFileSync(datei, 'utf8');
  const i = alt.indexOf('<head>');
  const j = alt.indexOf('</head>');
  if (i < 0 || j < 0) { berichte.push(`  OHNE <head>: ${datei}`); continue; }

  let kopf = alt.slice(i + 6, j);
  const rest = alt.slice(j);
  for (const rx of ENTFERNEN) kopf = kopf.replace(rx, '');

  /* Pflichtdateien nur ergaenzen, nie verschieben. */
  const fehlend = [];
  for (const p of PFLICHT) {
    if (p.optionalWennNavAus && e.nav === false) continue;
    if (p.nurWenn && !p.nurWenn(e, alt)) continue;
    if (!kopf.includes(p.datei) && !rest.includes(p.datei)) fehlend.push(p.tag);
  }
  if (fehlend.length) ergaenzt++;

  const neu = alt.slice(0, i + 6) + '\n' + kopfblock(datei, e) + '\n'
    + kopf.replace(/^\s*\n/, '').replace(/\s*$/, '\n')
    + (fehlend.length ? fehlend.join('\n') + '\n' : '') + rest;

  if (neu !== alt) {
    geschrieben++;
    if (!PRUEFEN) fs.writeFileSync(datei, neu);
    if (fehlend.length) berichte.push(`  ${datei}: ergänzt ${fehlend.length} ×`
      + ` (${fehlend.map((t) => (t.match(/(?:href|src)="([^"]+)"/) || [])[1]).join(', ')})`);
  }
}

/* heiben-werkzeuge.js — das Register der Rechner und Werkzeuge, damit sie in den
   Welten und im Wissens-Hub auftauchen können (Remake v3, Welle 5). Quelle ist
   dieselbe Registry; wer ein Werkzeug einträgt, muss nichts weiter pflegen. */
const REIHENFOLGE = ['Geld & Vorsorge', 'Wohnen & Immobilien', 'Beruf & Bildung',
  'Unterwegs', 'Üben & Spielen'];
const werkzeuge = Object.keys(SEITEN)
  .filter((d) => SEITEN[d].typ === 'werkzeug' && fs.existsSync(d))
  .map((d) => ({ u: d, t: entschluesseln(SEITEN[d].titel).replace(/\s*·\s*HeiBen$/, ''),
    b: entschluesseln(SEITEN[d].beschreibung), w: SEITEN[d].welt,
    g: SEITEN[d].gruppe || 'Weitere' }))
  .sort((a, b) => (REIHENFOLGE.indexOf(a.g) - REIHENFOLGE.indexOf(b.g))
    || a.t.localeCompare(b.t, 'de'));
const werkzeugJs = '/* HeiBen Werkzeug-Register — GENERIERT von tools/gen_kopf.js aus\n'
  + '   tools/seiten.json. Nicht von Hand pflegen. */\n'
  + 'window.HEIBEN_WERKZEUGE=' + JSON.stringify(werkzeuge) + ';\n'
  + 'window.HEIBEN_WERKZEUG_GRUPPEN=' + JSON.stringify(REIHENFOLGE) + ';\n';
if (!PRUEFEN) fs.writeFileSync('heiben-werkzeuge.js', werkzeugJs);
console.log(`  heiben-werkzeuge.js: ${werkzeuge.length} Werkzeuge in `
  + `${new Set(werkzeuge.map((w) => w.g)).size} Gruppen`);

/* heiben-bereiche.js — zwei Listen aus derselben Registry (Remake v3, Welle 7):
   die internen Bereiche (damit sie sich einheitlich als solche zu erkennen geben)
   und die Seiten je Welt (damit duenn besetzte Welten ihren eigenen Bestand zeigen). */
const ORDNUNG = ['welt', 'weltseite', 'werkzeug', 'kompendium', 'wissen', 'konto', 'holding'];
function eintrag(d) {
  return { u: d, t: entschluesseln(SEITEN[d].titel).replace(/\s*[·—-]\s*HeiBen$/, '')
    .replace(/^HeiBen\s+/, ''), b: entschluesseln(SEITEN[d].beschreibung), w: SEITEN[d].welt };
}
const intern = Object.keys(SEITEN)
  .filter((d) => SEITEN[d].typ === 'intern' && fs.existsSync(d))
  .map(eintrag).sort((a, b) => a.t.localeCompare(b.t, 'de'));
const weltseiten = {};
for (const d of Object.keys(SEITEN)) {
  const e = SEITEN[d];
  if (!ORDNUNG.includes(e.typ) || e.typ === 'intern' || !fs.existsSync(d)) continue;
  if (!['reisen', 'wohnen', 'immobilien', 'studio', 'kulinarik'].includes(e.welt)) continue;
  (weltseiten[e.welt] = weltseiten[e.welt] || []).push(
    Object.assign(eintrag(d), { start: e.typ === 'welt' }));
}
Object.keys(weltseiten).forEach((w) => weltseiten[w].sort(
  (a, b) => (b.start - a.start) || a.t.localeCompare(b.t, 'de')));
const bereicheJs = '/* HeiBen Bereiche — GENERIERT von tools/gen_kopf.js aus tools/seiten.json.\n'
  + '   Nicht von Hand pflegen. */\n'
  + 'window.HEIBEN_INTERN=' + JSON.stringify(intern) + ';\n'
  + 'window.HEIBEN_WELTSEITEN=' + JSON.stringify(weltseiten) + ';\n';
if (!PRUEFEN) fs.writeFileSync('heiben-bereiche.js', bereicheJs);

/* heiben-menue.js — dieselbe Liste, aber nur Adresse und Titel. Die Beschreibungen
   machen in heiben-bereiche.js rund drei Viertel des Umfangs aus; das Menü braucht
   sie nicht, und diese Datei liegt auf JEDER Seite mit Navigation. */
const WELTWORT = /^(Reisen|Wohnen|Immobilien|Studio|Kulinarik|Manufaktur|Lebenswissen)\s*[—·|:]\s*/;
/* Im Menü stehen fünf Spalten nebeneinander; die Spalte sagt schon, welche Welt das ist.
   Also fällt weg, was der Titel nur zur Wiederholung trägt: der Markenzusatz am Ende,
   das vorangestellte Weltwort und der Untertitel nach dem Gedankenstrich. Der Hinweis
   „intern" bleibt stehen — der sagt etwas, was der Leser wissen muss. */
function kurz(t) {
  let x = String(t).replace(/\s*[|·—-]\s*HeiBen\b[^|]*$/i, '').trim();
  x = x.replace(WELTWORT, '').trim();
  const teil = x.split(' — ');
  if (teil.length > 1 && !/intern/i.test(teil[1]) && teil[0].length >= 8) x = teil[0].trim();
  return x || String(t);
}
const menue = {};
Object.keys(weltseiten).forEach((w) => {
  menue[w] = weltseiten[w].map((e) => ({ u: e.u, t: kurz(e.t) }));
});
const menueJs = '/* HeiBen Menü — GENERIERT von tools/gen_kopf.js aus tools/seiten.json.\n'
  + '   Nicht von Hand pflegen. */\n'
  + 'window.HEIBEN_MENUE=' + JSON.stringify(menue) + ';\n';
if (!PRUEFEN) fs.writeFileSync('heiben-menue.js', menueJs);
console.log(`  heiben-menue.js: `
  + Object.keys(menue).map((w) => w + ' ' + menue[w].length).join(' · ')
  + ` (${(menueJs.length / 1024).toFixed(1)} KB)`);
console.log(`  heiben-bereiche.js: ${intern.length} interne Seiten · `
  + Object.keys(weltseiten).map((w) => w + ' ' + weltseiten[w].length).join(' · '));

/* sitemap.xml und robots.txt folgen derselben Registry: was intern ist, wird nicht
   indexiert; alles andere gehört in die Sitemap. */
const PRIO = { start: '1.0', welt: '0.9', kompendium: '0.8', wissen: '0.8', werkzeug: '0.7',
  weltseite: '0.7', konto: '0.5', holding: '0.5', legal: '0.3' };

const oeffentlich = Object.keys(SEITEN).filter((d) => {
  const t = SEITEN[d].typ;
  return t !== 'intern' && t !== 'standalone' && d !== '404.html' && fs.existsSync(d);
});
const sitemap = ['<?xml version="1.0" encoding="UTF-8"?>',
  '<!-- GENERIERT von tools/gen_kopf.js aus tools/seiten.json. Nicht von Hand pflegen. -->',
  '<!-- Beim Live-Gang www.heiben.de durch die echte Domain ersetzen (tools/seiten.json → _basis). -->',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'];
for (const d of oeffentlich) {
  const url = BASIS + (d === 'index.html' ? '' : d);
  sitemap.push(`  <url><loc>${url}</loc><changefreq>monthly</changefreq>`
    + `<priority>${PRIO[SEITEN[d].typ] || '0.5'}</priority></url>`);
}
sitemap.push('</urlset>', '');

const interne = Object.keys(SEITEN).filter((d) => SEITEN[d].typ === 'intern');
const robots = ['User-agent: *', 'Allow: /', '',
  '# GENERIERT von tools/gen_kopf.js — interne Bereiche (typ "intern" in tools/seiten.json).',
  '# Dieselben Seiten tragen <meta name="robots" content="noindex, nofollow">.']
  .concat(interne.map((d) => 'Disallow: /' + d))
  .concat(['', '# Beim Live-Gang die echte Domain eintragen:',
    'Sitemap: ' + BASIS + 'sitemap.xml', '']);

if (!PRUEFEN) {
  fs.writeFileSync('sitemap.xml', sitemap.join('\n'));
  fs.writeFileSync('robots.txt', robots.join('\n'));
}
console.log(`  sitemap.xml: ${oeffentlich.length} URLs · robots.txt: ${interne.length} Disallow`);

console.log(PRUEFEN ? 'PRÜFLAUF (nichts geschrieben)' : 'GESCHRIEBEN');
console.log(`  Seiten mit neuem Kopf: ${geschrieben}`);
console.log(`  davon Pflichtdateien ergänzt: ${ergaenzt}`);
console.log(`  übersprungen (standalone): ${uebersprungen}`);
if (berichte.length) console.log(berichte.join('\n'));
