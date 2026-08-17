/* HeiBen Kennzahlen-Generator — erzeugt web/heiben-kennzahlen.js aus den echten Daten.
   Aufruf:  cd heiben_kit/web && node ../tools/gen_kennzahlen.js
   Zaehlt: alle window-Arrays mit id+n-Objekten (= Kompendien-Steckbriefe),
           PFADE (+ steps = Stationen), LW_DATA.ARTIKEL, BANK aus begriffskarten.html. */
const fs=require('fs'), vm=require('vm');
const sb={window:{},document:{addEventListener(){}},location:{hash:'',search:''},
  localStorage:{getItem(){return null},setItem(){}},console};
sb.window=sb; vm.createContext(sb);
for(const f of ['pflanzen','haushalt','lebensmittel','papierkram','digital','erstehilfe','auto','finanzen','lebenswissen','lernpfade'])
  vm.runInContext(fs.readFileSync(f+'-daten.js','utf8'), sb, {filename:f});
let steck=0,komp=0;
for(const k of Object.keys(sb)){const v=sb[k];
  if(Array.isArray(v)&&v.length>5&&v[0]&&typeof v[0]==='object'&&'id' in v[0]&&'n' in v[0]&&k!=='PFADE'){steck+=v.length;komp++;}}
const P=sb.PFADE, stationen=P.reduce((a,p)=>a+((p.steps||[]).length),0);
const artikel=sb.LW_DATA.ARTIKEL.length;
const html=fs.readFileSync('begriffskarten.html','utf8');
const mB=html.match(/var BANK=(\[[\s\S]*?\]);\s*BANK\.forEach/);
const mE=html.match(/var EXT = (\{[\s\S]*?\});/);
const sb2={console}; vm.createContext(sb2);
vm.runInContext('BANK='+mB[1],sb2); vm.runInContext('EXT='+(mE?mE[1]:'{}'),sb2);
const karten=sb2.BANK.length+Object.values(sb2.EXT).reduce((a,v)=>a+(Array.isArray(v)?v.length:0),0);
const kz={welten:5,kompendien:komp,steckbriefe:steck,lernpfade:P.length,stationen,karten,artikel};
fs.writeFileSync('heiben-kennzahlen.js',
`/* HeiBen Kennzahlen — GENERIERT, nicht von Hand pflegen!
   Regenerieren: cd web && node ../tools/gen_kennzahlen.js
   Stand: ${new Date().toISOString().slice(0,10)} */
window.HEIBEN_KZ=${JSON.stringify(kz)};
`);
console.log('heiben-kennzahlen.js:',JSON.stringify(kz));
