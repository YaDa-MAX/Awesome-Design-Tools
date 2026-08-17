/* HeiBen Lebenswissen — Rechner */
var ACTIVE_TOOL=null;
const fmtE = n => (Math.round(n)).toLocaleString("de-DE") + " €";
const num = id => { const v = parseFloat(String(document.getElementById(id)?.value).replace(",", ".")); return isNaN(v) ? 0 : v; };
const inp = (id,l,v,step) => '<label>'+l+'<input type="number" id="'+id+'" value="'+v+'" step="'+(step||1)+'" oninput="TC.go()"></label>';
const sel = (id,l,opts) => '<label>'+l+'<select id="'+id+'" onchange="TC.go()">'+opts.map(o=>'<option value="'+o[0]+'">'+o[1]+'</option>').join('')+'</select></label>';
/* Grobe Brutto->Netto-Schätzung (Steuerklasse I, ±10 %): Jahresbrutto -> Jahresnetto.
   Bewusst vereinfacht (Sozialabgaben-Pauschale bis BBG, grobe progressive Lohnsteuer, ohne Kirchensteuer/Kinderfreibeträge). Nur für Überschläge, nicht für die Steuerplanung. */
function nettoSchaetzung(brutto){
  brutto=+brutto||0; if(brutto<=0) return 0;
  var sv=Math.min(brutto,62100)*0.20;                 // AN-Anteil Sozialabgaben (grob, bis ~BBG)
  var zvE=Math.max(0, brutto-11600-(Math.min(sv,brutto)*0.5)); // Grundfreibetrag + grobe Vorsorgepauschale
  var st;
  if(zvE<=0) st=0;
  else if(zvE<=17000) st=zvE*0.16;                    // Eingangsbereich grob
  else if(zvE<=66000) st=2720+(zvE-17000)*0.30;       // Progression grob
  else st=17420+(zvE-66000)*0.42;                     // Spitzensteuer grob
  var netto=brutto-sv-Math.max(0,st);
  return Math.max(0, Math.round(netto));
}
const TOOLS = {
studienbudget: { t:"Studienbudget-Rechner", h:
 '<div class="row">'+inp("sb_miete","Miete warm (€/Mon)",420)+inp("sb_leben","Leben & Mobilität (€/Mon)",450)+inp("sb_sem","Semesterbeitrag (€/Sem)",320)+'</div><div class="row">'+inp("sb_bafoeg","BAföG/Eltern (€/Mon)",500)+inp("sb_kg","Kindergeld (€/Mon)",255)+inp("sb_lohn","Nebenjob netto (€/Mon)",350)+'</div><div class="tres" id="sb_r"></div>',
 go(){ const bedarf = num("sb_miete")+num("sb_leben")+num("sb_sem")/6;
   const deck = num("sb_bafoeg")+num("sb_kg")+num("sb_lohn"); const d = deck-bedarf;
   document.getElementById("sb_r").innerHTML = "Monatsbedarf: <b>"+fmtE(bedarf)+"</b> · Deckung: <b>"+fmtE(deck)+"</b><br>"+
     (d>=0 ? "✅ Puffer von <b>"+fmtE(d)+"</b>/Monat — davon etwas in den Notgroschen!" :
     "⚠️ Lücke von <b>"+fmtE(-d)+"</b>/Monat — Hebel: Stipendien prüfen, Wohnheim-Warteliste, Werkstudentenstelle (zahlt meist besser als Minijob).");} },

kfrist: { t:"Kündigungsfristen-Rechner (§ 622 BGB)", h:
 '<div class="row">'+inp("kf_jahre","Betriebszugehörigkeit (Jahre)",4)+sel("kf_wer","Wer kündigt?",[["ag","Arbeitgeber"],["an","Arbeitnehmer"]])+'</div><div class="tres" id="kf_r"></div>',
 go(){ const j = num("kf_jahre"); const stufen=[[20,7],[15,6],[12,5],[10,4],[8,3],[5,2],[2,1]];
   let f = "4 Wochen zum 15. oder zum Monatsende";
   if (document.getElementById("kf_wer").value==="ag"){ for(const [y,m] of stufen){ if(j>=y){ f = m+" Monat"+(m>1?"e":"")+" zum Monatsende"; break; } } }
   document.getElementById("kf_r").innerHTML = "Gesetzliche Frist: <b>"+f+"</b><br><small>Für Arbeitnehmer gilt die Grundfrist, sofern der Vertrag nichts anderes regelt. Tarif- oder Arbeitsvertrag können abweichen — immer zuerst dort nachsehen. Probezeit: 2 Wochen.</small>"; } },

netto: { t:"Brutto-Netto-Überschlag", h:
 '<div class="row">'+inp("nt_brutto","Bruttojahresgehalt (€)",48000,1000)+'</div><div class="tres" id="nt_r"></div>',
 go(){ const b = num("nt_brutto"); const n = nettoSchaetzung(b);
   document.getElementById("nt_r").innerHTML = "Netto/Jahr ≈ <b>"+fmtE(n)+"</b> · Netto/Monat ≈ <b>"+fmtE(n/12)+"</b><br><small>Grobe Schätzung (±10 %, Logik Steuerklasse I, ohne Kirchensteuer/Kinderfreibeträge). Für Angebote vergleichen geeignet, nicht für die Steuerplanung.</small>"; } },

alg: { t:"Arbeitslosengeld-I-Rechner", h:
 '<div class="row">'+inp("al_brutto","Bisheriges Brutto/Monat (€)",3800,100)+inp("al_alter","Alter (Jahre)",38)+inp("al_besch","Versicherte Beschäftigung in den letzten 5 Jahren (Monate)",48)+sel("al_kind","Kind (Kindergeldanspruch)?",[["0","Nein (60 %)"],["1","Ja (67 %)"]])+'</div><div class="tres" id="al_r"></div>',
 go(){ const netto = nettoSchaetzung(num("al_brutto")*12)/12;
   const satz = document.getElementById("al_kind").value==="1" ? 0.67 : 0.60;
   const a=num("al_alter"), m=num("al_besch");
   let cap = 12;
   if(a>=58) cap=24; else if(a>=55) cap=18; else if(a>=50) cap=15;
   const dauer = Math.min(cap, Math.floor(m/2));
   document.getElementById("al_r").innerHTML = "ALG I ≈ <b>"+fmtE(netto*satz)+"</b>/Monat · Bezugsdauer bis zu <b>"+dauer+" Monate</b><br><small>Überschlag auf Basis pauschalierten Nettos — der echte Bescheid weicht ab. Wichtig: Sperrzeit (12 Wochen) bei Eigenkündigung/Aufhebungsvertrag ohne wichtigen Grund.</small>"; } },

budget: { t:"50/30/20-Budget-Rechner", h:
 '<div class="row">'+inp("bu_netto","Haushaltsnetto/Monat (€)",2800,50)+inp("bu_fix","Tatsächliche Fixkosten (€)",1500,50)+'</div><div class="tres" id="bu_r"></div>',
 go(){ const n=num("bu_netto"), fix=num("bu_fix");
   const q = n? Math.round(fix/n*100):0;
   document.getElementById("bu_r").innerHTML = "Richtwerte: Fixes <b>"+fmtE(n*0.5)+"</b> · Wünsche <b>"+fmtE(n*0.3)+"</b> · Sparen <b>"+fmtE(n*0.2)+"</b><br>Deine Fixkostenquote: <b>"+q+" %</b> — "+(q<=50?"✅ im grünen Bereich.":q<=60?"🟡 etwas hoch: größte Hebel sind Wohnen, Auto, Verträge.":"🔴 kritisch: vor dem Sparen erst Fixkosten strukturell senken (Verträge, Wohnkosten, Mobilität).")+"<br>Verbleibendes Wunsch-Budget bei 20 % Sparquote: <b>"+fmtE(Math.max(0,n-fix-n*0.2))+"</b>"; } },

notgroschen: { t:"Notgroschen-Rechner", h:
 '<div class="row">'+inp("ng_ausg","Monatliche Ausgaben gesamt (€)",2200,50)+sel("ng_typ","Situation",[["3","Angestellt, 2 Einkommen (3 Monate)"],["6","Angestellt, 1 Einkommen / Familie (6 Monate)"],["9","Selbstständig (9 Monate)"],["12","Selbstständig, schwankend (12 Monate)"]])+inp("ng_ist","Schon vorhanden (€)",2000,100)+inp("ng_rate","Mögliche Sparrate (€/Monat)",200,25)+'</div><div class="tres" id="ng_r"></div>',
 go(){ const ziel = num("ng_ausg")*parseInt(document.getElementById("ng_typ").value);
   const fehlt = Math.max(0, ziel-num("ng_ist")); const r = num("ng_rate");
   document.getElementById("ng_r").innerHTML = "Zielgröße: <b>"+fmtE(ziel)+"</b> · Es fehlen: <b>"+fmtE(fehlt)+"</b>"+(fehlt&&r? "<br>Mit "+fmtE(r)+"/Monat erreicht in <b>"+Math.ceil(fehlt/r)+" Monaten</b>." : fehlt?"":"<br>✅ Ziel erreicht — Überschüsse dürfen ins Depot."); } },

zins: { t:"Sparplan- & Zinseszins-Rechner", h:
 '<div class="row">'+inp("zz_start","Startkapital (€)",1000,100)+inp("zz_rate","Sparrate (€/Monat)",150,25)+inp("zz_jahre","Laufzeit (Jahre)",25)+inp("zz_zins","Rendite p. a. (%)",6,0.5)+'</div><div class="tres" id="zz_r"></div>',
 go(){ const r=num("zz_zins")/100/12, n=num("zz_jahre")*12, S=num("zz_start"), m=num("zz_rate");
   const end = S*Math.pow(1+r,n) + (r? m*((Math.pow(1+r,n)-1)/r) : m*n);
   const einz = S+m*n;
   document.getElementById("zz_r").innerHTML = "Endwert: <b>"+fmtE(end)+"</b><br>Eingezahlt: "+fmtE(einz)+" · Kurszuwachs: <b>"+fmtE(end-einz)+"</b><br><small>Vor Steuern & Inflation; Renditen schwanken — 6 % ist ein historischer Aktien-Richtwert, keine Garantie.</small>"; } },

pendler: { t:"Pendler- & Homeoffice-Rechner", h:
 '<div class="row">'+inp("pd_km","Einfache Entfernung (km)",18)+inp("pd_tage","Pendeltage/Jahr",180)+inp("pd_ho","Homeoffice-Tage/Jahr",60)+'</div><div class="tres" id="pd_r"></div>',
 go(){ const km=num("pd_km"), t=num("pd_tage");
   const pp = t*(Math.min(km,20)*0.30 + Math.max(0,km-20)*0.38);
   const ho = Math.min(num("pd_ho"),210)*6;
   const wk = pp+ho;
   document.getElementById("pd_r").innerHTML = "Pendlerpauschale: <b>"+fmtE(pp)+"</b> + Homeoffice: <b>"+fmtE(ho)+"</b> = Werbungskosten <b>"+fmtE(wk)+"</b><br>"+(wk>1230? "✅ Über der 1.230-€-Pauschale — Abgabe lohnt; jeder weitere Beleg (Arbeitsmittel, Fortbildung) wirkt voll.":"Unter der Pauschale ("+fmtE(1230)+") — wird ohnehin automatisch berücksichtigt; weitere Posten (Versicherungen, Handwerker, Spenden) können die Abgabe trotzdem lohnend machen."); } },

rentenluecke: { t:"Rentenlücken- & Sparraten-Rechner", h:
 '<div class="row">'+inp("rl_wunsch","Wunsch-Budget im Alter (€/Monat, heutige Kaufkraft)",2200,50)+inp("rl_rente","Erwartete Rente lt. Renteninfo (€/Monat)",1500,50)+inp("rl_jahre","Jahre bis zur Rente",30)+inp("rl_zins","Rendite p. a. (%)",5,0.5)+'</div><div class="tres" id="rl_r"></div>',
 go(){ const luecke = Math.max(0, num("rl_wunsch")-num("rl_rente"));
   const kapital = luecke*12*25;            // 4-%-Faustregel
   const r=num("rl_zins")/100/12, n=num("rl_jahre")*12;
   const rate = r? kapital*r/(Math.pow(1+r,n)-1) : kapital/n;
   document.getElementById("rl_r").innerHTML = "Monatliche Lücke: <b>"+fmtE(luecke)+"</b> → benötigtes Kapital (4-%-Regel): <b>"+fmtE(kapital)+"</b><br>Nötige Sparrate: <b>"+fmtE(rate)+"/Monat</b> über "+num("rl_jahre")+" Jahre<br><small>Vereinfachung ohne Inflation, Steuern und Rentensteigerungen — als Größenordnung gedacht. Renteninfo-Wert ist brutto!</small>"; } },

tilgung: { t:"Schulden-Tilgungsrechner", h:
 '<div class="row">'+inp("tg_schuld","Restschuld (€)",8000,100)+inp("tg_zins","Effektivzins (% p. a.)",9.5,0.1)+inp("tg_rate","Monatsrate (€)",250,10)+'</div><div class="tres" id="tg_r"></div>',
 go(){ const S=num("tg_schuld"), i=num("tg_zins")/100/12, m=num("tg_rate");
   if(m<=S*i){ document.getElementById("tg_r").innerHTML="🔴 Die Rate deckt nicht einmal die Zinsen ("+fmtE(S*i)+"/Monat) — so wächst die Schuld. Umschuldung oder Schuldnerberatung prüfen!"; return; }
   const n = Math.log(m/(m-S*i))/Math.log(1+i);
   const n2 = Math.log((m+50)/((m+50)-S*i))/Math.log(1+i);
   document.getElementById("tg_r").innerHTML = "Schuldenfrei in <b>"+Math.ceil(n)+" Monaten</b> ("+(n/12).toFixed(1)+" Jahre) · Zinskosten gesamt: <b>"+fmtE(m*n-S)+"</b><br>Mit 50 € mehr Rate: nur <b>"+Math.ceil(n2)+" Monate</b> — Ersparnis "+fmtE((m*n-S)-((m+50)*n2-S))+" Zinsen."; } },

miete: { t:"Mietbelastungs-Rechner", h:
 '<div class="row">'+inp("mi_netto","Haushaltsnetto (€/Monat)",2600,50)+inp("mi_warm","Warmmiete (€/Monat)",950,10)+'</div><div class="tres" id="mi_r"></div>',
 go(){ const q = num("mi_netto")? Math.round(num("mi_warm")/num("mi_netto")*100):0;
   document.getElementById("mi_r").innerHTML = "Mietbelastungsquote: <b>"+q+" %</b> — "+
   (q<=30?"✅ komfortabel: Sparen und Leben haben Platz.":q<=35?"🟡 obere Normalzone — Fixkosten sonst schlank halten.":q<=40?"🟠 angespannt: wenig Puffer für Notgroschen & Vorsorge.":"🔴 Risikozone: jede Einkommensdelle wird kritisch — WBS-Anspruch und Wohngeld prüfen!")+
   "<br>Max. Warmmiete bei 30/35 %: <b>"+fmtE(num("mi_netto")*0.30)+" / "+fmtE(num("mi_netto")*0.35)+"</b>"; } },

umzug: { t:"Umzugskosten-Schätzer", h:
 '<div class="row">'+inp("um_zimmer","Zimmer",2)+sel("um_art","Art",[["selbst","Selbst + Transporter + Helfer"],["firma","Umzugsfirma"]])+inp("um_kaution","Neue Kaution (Kaltmieten)",3)+inp("um_kalt","Neue Kaltmiete (€)",750,10)+'</div><div class="tres" id="um_r"></div>',
 go(){ const z=num("um_zimmer"), firma = document.getElementById("um_art").value==="firma";
   const transport = firma? 600+z*450 : 120+z*80;
   const neben = 150+z*60;                          // Kartons, Halteverbot, Pizza & Co.
   const kaution = num("um_kaution")*num("um_kalt");
   document.getElementById("um_r").innerHTML = "Transport: <b>"+fmtE(transport)+"</b> + Nebenkosten: <b>"+fmtE(neben)+"</b> + Kaution: <b>"+fmtE(kaution)+"</b><br>Liquiditätsbedarf gesamt: <b>"+fmtE(transport+neben+kaution)+"</b><br><small>Richtwerte; Kaution kommt zurück und darf in 3 Raten gezahlt werden. Beruflicher Umzug: Pauschale + Kosten absetzen!</small>"; } },

nk: { t:"Nebenkosten-Abschlags-Check", h:
 '<div class="row">'+inp("nk_qm","Wohnfläche (m²)",65)+inp("nk_pers","Personen",2)+inp("nk_ab","Aktueller Abschlag NK + Heizung (€/Monat)",220,10)+'</div><div class="tres" id="nk_r"></div>',
 go(){ const erw = num("nk_qm")*3.0;               // Richtwert „zweite Miete“ ~2,50–3,50 €/m² warm
   const diff = num("nk_ab")-erw;
   document.getElementById("nk_r").innerHTML = "Richtwert für deine Fläche: ≈ <b>"+fmtE(erw)+"</b>/Monat (Spanne "+fmtE(num("nk_qm")*2.5)+"–"+fmtE(num("nk_qm")*3.5)+")<br>"+
   (Math.abs(diff)<=erw*0.15? "✅ Dein Abschlag liegt im normalen Korridor." : diff>0? "🟡 Dein Abschlag liegt <b>"+fmtE(diff)+"</b> über dem Richtwert — Abrechnung prüfen oder Guthaben einplanen." : "⚠️ Dein Abschlag liegt <b>"+fmtE(-diff)+"</b> unter dem Richtwert — Nachzahlungsgefahr: Rücklage bilden oder Abschlag erhöhen.")+"<br><small>Stark abhängig von Gebäudezustand, Heizart und Region.</small>"; } },

hauskauf: { t:"Kaufnebenkosten- & Raten-Rechner", h:
 '<div class="row">'+inp("hk_preis","Kaufpreis (€)",380000,5000)+inp("hk_gest","Grunderwerbsteuer (%)",5.0,0.5)+sel("hk_makler","Makler?",[["3.57","Ja (3,57 %)"],["0","Nein"]])+'</div><div class="row">'+inp("hk_ek","Eigenkapital (€)",80000,5000)+inp("hk_zins","Sollzins (% p. a.)",3.6,0.1)+inp("hk_tilg","Anfangstilgung (%)",2.5,0.5)+'</div><div class="tres" id="hk_r"></div>',
 go(){ const p=num("hk_preis");
   const nk = p*(num("hk_gest")/100 + 0.02 + parseFloat(document.getElementById("hk_makler").value)/100);
   const darlehen = Math.max(0, p+nk-num("hk_ek"));
   const rate = darlehen*(num("hk_zins")+num("hk_tilg"))/100/12;
   document.getElementById("hk_r").innerHTML = "Kaufnebenkosten: <b>"+fmtE(nk)+"</b> ("+((nk/p)*100).toFixed(1)+" %) → Gesamt: <b>"+fmtE(p+nk)+"</b><br>Darlehen: <b>"+fmtE(darlehen)+"</b> · Monatsrate: <b>"+fmtE(rate)+"</b><br><small>+ Rücklage ~"+fmtE(1.75*100)+"/100 m² für Instandhaltung einplanen. Stresstest: Rate auch bei +2 Punkten Anschlusszins tragbar?</small>"; } },

elterngeld: { t:"Elterngeld-Schätzer", h:
 '<div class="row">'+inp("eg_netto","Durchschnittl. Netto vor Geburt (€/Monat)",2300,50)+sel("eg_form","Variante",[["1","Basiselterngeld"],["0.5","ElterngeldPlus (halber Betrag, doppelte Dauer)"]])+'</div><div class="tres" id="eg_r"></div>',
 go(){ const n = num("eg_netto");
   let satz = 0.65; if(n<1000) satz=0.67; else if(n<1240) satz=0.67-((n-1000)/240)*0.02;
   let eg = Math.min(1800, Math.max(300, n*satz));
   const f = parseFloat(document.getElementById("eg_form").value); eg*=f;
   document.getElementById("eg_r").innerHTML = "Geschätztes Elterngeld: <b>"+fmtE(eg)+"</b>/Monat ("+(f===1?"12+2 Monate":"bis zu 24+4 Monate")+")<br><small>Überschlag: Basis ist das bereinigte Erwerbs-Netto der 12 Monate vor Geburt; Steuerklassenwechsel vorher kann den Betrag erhöhen. Mindest 300 €, Höchstbetrag 1.800 € (Basis).</small>"; } },

energie: { t:"Energiebedarfs-Rechner (Mifflin-St. Jeor)", h:
 '<div class="row">'+inp("en_kg","Gewicht (kg)",78)+inp("en_cm","Größe (cm)",176)+inp("en_alter","Alter",35)+sel("en_sex","Geschlecht",[["5","männlich"],["-161","weiblich"]])+sel("en_pal","Aktivität",[["1.3","sitzend"],["1.5","moderat aktiv"],["1.7","sehr aktiv"]])+'</div><div class="tres" id="en_r"></div>',
 go(){ const g = 10*num("en_kg")+6.25*num("en_cm")-5*num("en_alter")+parseFloat(document.getElementById("en_sex").value);
   const t = g*parseFloat(document.getElementById("en_pal").value);
   document.getElementById("en_r").innerHTML = "Grundumsatz: <b>"+Math.round(g)+" kcal</b> · Gesamtbedarf: <b>"+Math.round(t)+" kcal/Tag</b><br>Moderates Abnehmen (−0,25–0,5 kg/Woche): <b>"+Math.round(t-400)+" kcal/Tag</b> — nie dauerhaft unter den Grundumsatz.<br><small>Formel-Schätzung; bei Erkrankungen, Untergewicht oder Essstörungs-Vorgeschichte gehört Ernährungsplanung in ärztliche Begleitung.</small>"; } },

reise: { t:"Reisebudget-Rechner", h:
 '<div class="row">'+inp("re_tage","Reisetage",10)+inp("re_pers","Personen",2)+sel("re_stil","Stil",[["55","Budget (Hostel, Selbstversorgung)"],["110","Mittelklasse"],["220","Komfort"]])+inp("re_transport","An-/Abreise gesamt (€)",500,50)+'</div><div class="tres" id="re_r"></div>',
 go(){ const tag = parseFloat(document.getElementById("re_stil").value);
   const vorOrt = num("re_tage")*num("re_pers")*tag;
   const sum = vorOrt+num("re_transport");
   document.getElementById("re_r").innerHTML = "Vor Ort: <b>"+fmtE(vorOrt)+"</b> ("+fmtE(tag)+" p. P./Tag) + Anreise: "+fmtE(num("re_transport"))+"<br>Gesamt inkl. 12 % Puffer: <b>"+fmtE(sum*1.12)+"</b><br><small>Tagessätze als Mitteleuropa-Richtwert — Südostasien günstiger, Skandinavien/Schweiz teurer.</small>"; } },

rentenstart: { t:"Früher in Rente: Abschlags-Rechner", h:
 '<div class="row">'+inp("rs_rente","Rente zur Regelaltersgrenze (€/Monat)",1650,50)+inp("rs_monate","Monate früher",24)+'</div><div class="tres" id="rs_r"></div>',
 go(){ const m = Math.min(num("rs_monate"), 48);
   const abschlag = Math.min(m*0.003, 0.144);
   const neu = num("rs_rente")*(1-abschlag);
   document.getElementById("rs_r").innerHTML = m+" Monate früher = Abschlag <b>"+(abschlag*100).toFixed(1)+" %</b> → Rente: <b>"+fmtE(neu)+"</b> statt "+fmtE(num("rs_rente"))+" (dauerhaft −"+fmtE(num("rs_rente")-neu)+"/Monat)<br><small>0,3 %/Monat, max. 14,4 %. Ausnahme: abschlagsfrei nach 45 Versicherungsjahren (Frühestgrenze). Ausgleichszahlungen ab 50 können Abschläge zurückkaufen — steuerbegünstigt!</small>"; } },

pflege: { t:"Heimkosten-Eigenanteil-Rechner", h:
 '<div class="row">'+inp("pf_heim","Heimkosten gesamt (€/Monat)",4600,50)+sel("pf_grad","Pflegegrad",[["805","PG 2"],["1319","PG 3"],["1855","PG 4"],["2096","PG 5"]])+sel("pf_dauer","Bereits im Heim",[["0.15","0–12 Monate (15 % Zuschlag)"],["0.30","1–2 Jahre (30 %)"],["0.50","2–3 Jahre (50 %)"],["0.75","über 3 Jahre (75 %)"]])+inp("pf_eink","Verfügbares Einkommen (Rente etc., €/Monat)",1900,50)+'</div><div class="tres" id="pf_r"></div>',
 go(){ const kasse = parseFloat(document.getElementById("pf_grad").value);
   const rest = Math.max(0, num("pf_heim")-kasse);
   const zuschlag = rest*0.55*parseFloat(document.getElementById("pf_dauer").value); // grobe EEE-Annäherung: ~55 % des Rests sind Pflegeanteil
   const eigen = rest - zuschlag;
   const luecke = eigen - num("pf_eink");
   document.getElementById("pf_r").innerHTML = "Pflegekasse: <b>"+fmtE(kasse)+"</b> · Eigenanteil nach Leistungszuschlag: ≈ <b>"+fmtE(eigen)+"</b>/Monat<br>"+
   (luecke>0? "⚠️ Lücke zum Einkommen: <b>"+fmtE(luecke)+"</b>/Monat → Vermögen, Angehörige (erst ab 100.000 € Jahresbrutto!) oder „Hilfe zur Pflege“ (Sozialamt)." : "✅ Einkommen deckt den Eigenanteil — Vermögen bleibt unangetastet.")+"<br><small>Richtwerte (Leistungsbeträge Stand 2025, vereinfachte Zuschlags-Logik) — exakte Zahlen nennt das Heim im Kostenblatt.</small>"; } },

erbe: { t:"Erbschaftsteuer-Freibetrags-Check", h:
 '<div class="row">'+inp("er_wert","Erbe/Schenkung (€)",350000,10000)+sel("er_wer","Verhältnis zum Erblasser",[["500000","Ehepartner (500.000 €)"],["400000","Kind (400.000 €)"],["200000","Enkel (200.000 €)"],["100000","Eltern bei Erbschaft (100.000 €)"],["20000","Geschwister, Partner unverh., Sonstige (20.000 €)"]])+'</div><div class="tres" id="er_r"></div>',
 go(){ const fb = parseFloat(document.getElementById("er_wer").value);
   const stpf = Math.max(0, num("er_wert")-fb);
   let satz = 0;
   if(stpf>0){ const kl1 = fb>=100000;
     const stufen = kl1? [[75000,7],[300000,11],[600000,15],[6e6,19],[Infinity,23]] : [[75000,15],[300000,20],[600000,25],[6e6,30],[Infinity,35]];
     for(const [g,s] of stufen){ if(stpf<=g){ satz=s; break; } } }
   document.getElementById("er_r").innerHTML = "Freibetrag: <b>"+fmtE(fb)+"</b> · Steuerpflichtig: <b>"+fmtE(stpf)+"</b>"+
   (stpf>0? " · Steuersatz ≈ <b>"+satz+" %</b> → Steuer ≈ <b>"+fmtE(stpf*satz/100)+"</b><br>💡 Freibeträge gelten alle 10 Jahre neu — Schenken in Etappen und Nießbrauch sind die Klassiker. Familienheim kann steuerfrei bleiben." : " → <b>steuerfrei</b> ✅")+
   "<br><small>Vereinfachte Tabelle ohne Versorgungsfreibeträge und Bewertungsbesonderheiten.</small>"; } },
kkg: { t:"Kinderkrankengeld-Tage-Rechner", h:
 '<div class="row">'+inp("kk_kinder","Kinder unter 12 (Anzahl)",2)+sel("kk_allein","Alleinerziehend?",[["0","Nein"],["1","Ja"]])+inp("kk_netto","Eigenes Netto/Monat (€)",2400,50)+'</div><div class="tres" id="kk_r"></div>',
 go(){ const k=Math.max(1,num("kk_kinder")), allein=document.getElementById("kk_allein").value==="1";
   const proKind = allein? 30:15, deckel = allein? 70:35;
   const tage = Math.min(k*proKind, deckel);
   const taggeld = Math.min(num("kk_netto")*12/365*0.9, 120);
   document.getElementById("kk_r").innerHTML = "Anspruch: <b>"+tage+" Arbeitstage/Jahr</b> ("+(allein?"alleinerziehend":"pro Elternteil")+", "+k+" Kind"+(k>1?"er":"")+")<br>Kinderkrankengeld ≈ <b>"+fmtE(taggeld)+"/Tag</b> (~90 % vom Netto, gedeckelt)<br><small>Richtwerte GKV (Stand 2025); Attest je nach Kasse ab Tag 1. Privatversicherte/Beamte: eigene Regeln. Tage sind zwischen Eltern teils übertragbar (AG muss zustimmen).</small>"; } },

taschengeld: { t:"Taschengeld-Empfehlung (Jugendamt-Richtwerte)", h:
 '<div class="row">'+inp("tg2_alter","Alter des Kindes",8)+'</div><div class="tres" id="tg2_r"></div>',
 go(){ const a=num("tg2_alter"); let txt;
   if(a<4) txt="Noch kein Taschengeld nötig — Geld begreifen geht ab ~4 über kleine Münzbeträge.";
   else if(a<6) txt="<b>0,50–1 €/Woche</b> — wöchentlich auszahlen, bar.";
   else if(a<8) txt="<b>1–2 €/Woche</b> — wöchentlich, bar; erste eigene Kauf-Entscheidungen lassen.";
   else if(a<10) txt="<b>2–3 €/Woche</b> — wöchentlich; Fehlkäufe nicht retten!";
   else if(a<12) txt="<b>20–25 €/Monat</b> — Umstellung auf monatlich = Budgettraining.";
   else if(a<14) txt="<b>25–30 €/Monat</b> — eigenes (Jugend-)Konto wird sinnvoll.";
   else if(a<16) txt="<b>30–45 €/Monat</b> — plus ggf. Budgetgeld für Kleidung/Handy mit klarer Abgrenzung.";
   else if(a<18) txt="<b>45–75 €/Monat</b> — Nebenjob ab 15/16 ergänzt; Budgetverantwortung ausweiten.";
   else txt="Volljährig: statt Taschengeld gemeinsame Budget-/Unterhaltsabsprache (Ausbildung/Studium).";
   document.getElementById("tg2_r").innerHTML = txt+"<br><small>Richtwerte angelehnt an Jugendamts-Empfehlungen (z. B. DJI) — ans Familienbudget anpassen. Prinzipien: fester Rhythmus, bedingungslos, keine Koppelung an Noten oder Verhalten.</small>"; } }
,
zahnzuschuss: { t:"Zahnersatz-Festzuschuss-Rechner (Bonusheft-Effekt)", h:
 '<div class="row">'+inp("zz2_kosten","Gesamtkosten lt. Heil- und Kostenplan (€)",2800,100)+inp("zz2_regel","davon Regelversorgungs-Anteil (€)",1400,100)+sel("zz2_bonus","Bonusheft",[["0.60","ohne / lückenhaft (60 %)"],["0.70","5 Jahre lückenlos (70 %)"],["0.75","10 Jahre lückenlos (75 %)"]])+'</div><div class="tres" id="zz2_r"></div>',
 go(){ const regel=Math.min(num("zz2_regel"),num("zz2_kosten"));
   const satz=parseFloat(document.getElementById("zz2_bonus").value);
   const zuschuss=regel*satz, eigen=num("zz2_kosten")-zuschuss;
   const eigen60=num("zz2_kosten")-regel*0.60;
   document.getElementById("zz2_r").innerHTML = "Kassenzuschuss: <b>"+fmtE(zuschuss)+"</b> → Eigenanteil: <b>"+fmtE(eigen)+"</b>"+
   (satz>0.60? "<br>Dein Bonusheft spart gegenüber 60 %: <b>"+fmtE(eigen60-eigen)+"</b>":"")+
   "<br><small>Der Festzuschuss bemisst sich nur an der Regelversorgung — höherwertige Versorgung (Implantat, Keramik) zahlt man darüber hinaus selbst. Härtefall: doppelter Festzuschuss bei geringem Einkommen.</small>"; } },

rauchstopp: { t:"Rauchstopp-Sparrechner", h:
 '<div class="row">'+inp("rs2_zig","Zigaretten/Tag",15)+inp("rs2_preis","Preis pro Schachtel à 20 (€)",8.5,0.5)+inp("rs2_jahre","Betrachtung (Jahre)",10)+'</div><div class="tres" id="rs2_r"></div>',
 go(){ const proTag=num("rs2_zig")/20*num("rs2_preis");
   const jahr=proTag*365, j=num("rs2_jahre");
   const r=0.05/12, n=j*12, m=jahr/12;
   const etf = m*((Math.pow(1+r,n)-1)/r);
   document.getElementById("rs2_r").innerHTML = "Du verrauchst <b>"+fmtE(proTag)+"/Tag</b> = <b>"+fmtE(jahr)+"/Jahr</b><br>In "+j+" Jahren gespart: <b>"+fmtE(jahr*j)+"</b> — als ETF-Sparplan (5 % p. a.): <b>"+fmtE(etf)+"</b><br><small>Der Gesundheitsgewinn beginnt früher: nach 24 h sinkt das Herzinfarktrisiko, nach 1 Jahr ist das Zusatzrisiko halbiert. Kassen-Kurse + Nikotinersatz verdoppeln die Erfolgsquote.</small>"; } },

krankengeld: { t:"Krankengeld-Rechner", h:
 '<div class="row">'+inp("kg_brutto","Brutto/Monat (€)",3600,100)+'</div><div class="tres" id="kg_r"></div>',
 go(){ const b=num("kg_brutto");
   const netto=nettoSchaetzung(b*12)/12;
   const kg=Math.min(b*0.70, netto*0.90, 3504);   // Deckel: kalendertägl. Höchstbetrag (Richtwert)
   const kgNetto=kg*0.88;                          // abzgl. SV-Anteile (RV/AV/PV) grob
   document.getElementById("kg_r").innerHTML = "Krankengeld ≈ <b>"+fmtE(kg)+"/Monat</b> (70 % brutto, max. 90 % netto, gedeckelt)<br>Nach Abzug deiner SV-Beiträge verbleiben ≈ <b>"+fmtE(kgNetto)+"</b><br>Lücke zum bisherigen Netto: <b>"+fmtE(Math.max(0,netto-kgNetto))+"/Monat</b><br><small>Überschlag mit Richtwerten — maßgeblich ist der Kassenbescheid. Maximal 78 Wochen je Krankheit in 3 Jahren (inkl. der 6 Wochen Lohnfortzahlung).</small>"; } }
,
bussgeld: { t:"Bußgeld-Schnellcheck Tempoverstoß (PKW)", h:
 '<div class="row">'+inp("bg_kmh","Zu schnell (km/h, nach Toleranzabzug)",24)+sel("bg_ort","Wo?",[["i","innerorts"],["a","außerorts"]])+'</div><div class="tres" id="bg_r"></div>',
 go(){ const v=num("bg_kmh"), inn=document.getElementById("bg_ort").value==="i";
   const T = inn?
     [[10,30,0,0],[15,50,0,0],[20,70,0,0],[25,115,1,0],[30,180,1,0],[40,260,2,1],[50,400,2,1],[60,560,2,2],[70,700,2,3],[999,800,2,3]]:
     [[10,20,0,0],[15,40,0,0],[20,60,0,0],[25,100,1,0],[30,150,1,0],[40,200,1,0],[50,320,2,1],[60,480,2,1],[70,600,2,2],[999,700,2,3]];
   let row=T[T.length-1]; for(const r of T){ if(v<=r[0]){ row=r; break; } }
   document.getElementById("bg_r").innerHTML = "Regelsatz: <b>"+fmtE(row[1])+"</b>"+(row[2]?" · <b>"+row[2]+" Punkt"+(row[2]>1?"e":"")+"</b>":"")+(row[3]?" · <b>"+row[3]+" Monat"+(row[3]>1?"e":"")+" Fahrverbot</b>":"")+
   ((inn&&v>=26&&v<=30)?"<br>⚠️ Bei zweitem Verstoß ≥26 km/h binnen 12 Monaten droht zusätzlich Fahrverbot.":"")+
   ((v>20)?"<br>⚠️ Probezeit: A-Verstoß → Aufbauseminar + 2 Jahre Verlängerung.":"")+
   "<br><small>Regelsätze Bußgeldkatalog (Stand 2025) ohne Gebühren (+~28,50 €); Erhöhungen bei Gefährdung, Anhänger, Baustelle möglich. Keine Rechtsberatung.</small>"; } },

verjaehrung: { t:"Verjährungs-Checker für Forderungen", h:
 '<div class="row">'+sel("vj_typ","Art der Forderung",[["3","Kauf, Handwerker-Rechnung, Miete, Gehalt (Regelfall: 3 Jahre)"],["2","Gewährleistung beweglicher Kauf (2 Jahre ab Übergabe)"],["5","Mängel am Bauwerk (5 Jahre ab Abnahme)"],["30","Titulierte Forderung / Urteil (30 Jahre)"]])+inp("vj_jahr","Jahr der Entstehung/Rechnung",2023)+'</div><div class="tres" id="vj_r"></div>',
 go(){ const t=parseInt(document.getElementById("vj_typ").value), j=num("vj_jahr");
   const silvester = t===3;
   const ende = silvester? (j+t)+" zum 31.12." : "taggenau "+(j+t);
   const heute = new Date().getFullYear();
   const abgelaufen = silvester? heute > j+t : heute > j+t;
   document.getElementById("vj_r").innerHTML = "Verjährung: <b>"+t+" Jahre</b> → Ende: <b>"+ende+"</b>"+
   (silvester? "<br>Regelverjährung läuft ab Jahresende der Entstehung — Forderung aus "+j+" verjährt also mit Ablauf des 31.12."+(j+t)+".":"")+
   "<br>"+(abgelaufen? "🔴 Voraussichtlich verjährt — Zahlung kann verweigert werden (Einrede!), freiwillige Zahlung ist aber wirksam." : "🟢 Noch nicht verjährt — Mahnbescheid oder Klage hemmen die Verjährung, eine einfache Mahnung NICHT!")+
   "<br><small>Vereinfachte Regelfälle; Hemmung (Verhandlungen, Mahnbescheid) und Neubeginn (Anerkenntnis, Teilzahlung!) verschieben das Ende. Keine Rechtsberatung.</small>"; } },

prozesskosten: { t:"Prozesskostenrisiko-Rechner (1. Instanz)", h:
 '<div class="row">'+inp("pk_wert","Streitwert (€)",5000,500)+'</div><div class="tres" id="pk_r"></div>',
 go(){ const w=Math.max(500,num("pk_wert"));
   const RVG=[[500,49],[1000,88],[2000,166],[3000,222],[4000,278],[5000,334],[6000,390],[7000,446],[8000,502],[9000,558],[10000,614],[13000,666],[16000,718],[19000,770],[22000,822],[25000,874],[30000,955],[35000,1036],[40000,1117],[45000,1198],[50000,1279]];
   const GKG=[[500,38],[1000,58],[2000,98],[3000,119],[4000,140],[5000,161],[6000,182],[7000,203],[8000,224],[9000,245],[10000,266],[13000,295],[16000,324],[19000,353],[22000,382],[25000,411],[30000,449],[35000,487],[40000,525],[45000,563],[50000,601]];
   const look=(T,x)=>{ for(const [g,f] of T){ if(x<=g) return f; } return T[T.length-1][1]*(x/50000); };
   const rvg1=look(RVG,w), gkg1=look(GKG,w);
   const anwalt = (rvg1*2.5+20)*1.19;         // 1,3 Verfahren + 1,2 Termin + Pauschale + USt
   const gericht = gkg1*3;
   const risiko = anwalt*2 + gericht;
   document.getElementById("pk_r").innerHTML = "Eigener Anwalt: ≈ <b>"+fmtE(anwalt)+"</b> · Gegneranwalt: ≈ "+fmtE(anwalt)+" · Gericht: ≈ "+fmtE(gericht)+
   "<br>Kostenrisiko bei voller Niederlage: <b>≈ "+fmtE(risiko)+"</b> ("+Math.round(risiko/w*100)+" % des Streitwerts)"+
   "<br><small>Richtwerte 1. Instanz nach RVG/GKG-Tabellen (Stand 2025), ohne Zeugen/Gutachter (die teuer werden können!) und ohne Vergleichs-Effekte. Bei Teilerfolg wird quotiert. Keine Rechtsberatung.</small>"; } }
,
haustier: { t:"Haustier-Lebenskosten-Rechner", h:
 '<div class="row">'+sel("ht_art","Tierart",[["hund","Hund (mittelgroß)"],["katze","Katze"],["klein","Kaninchen/Meerschweinchen (Paar)"],["aqua","Aquarium"]])+inp("ht_jahre","Erwartete Lebensjahre",14)+'</div><div class="tres" id="ht_r"></div>',
 go(){ const D={hund:{a:400,m:130,extra:"Steuer, Haftpflicht & Hundeschule eingerechnet"},katze:{a:250,m:90,extra:"inkl. Streu & OP-Schutz-Anteil"},klein:{a:250,m:55,extra:"Paarhaltung Pflicht — Gehege groß denken"},aqua:{a:350,m:30,extra:"Strom läuft 24/7 mit"}};
   const d=D[document.getElementById("ht_art").value], j=num("ht_jahre");
   const gesamt=d.a + d.m*12*j + 1500;
   document.getElementById("ht_r").innerHTML = "Anschaffung & Erstausstattung: <b>"+fmtE(d.a)+"</b> · Laufend: <b>"+fmtE(d.m)+"/Monat</b><br>Lebenszeit-Gesamtkosten über "+j+" Jahre (inkl. 1.500 € Tierarzt-Notfallreserve): <b>"+fmtE(gesamt)+"</b><br><small>"+d.extra+". Richtwerte — Rassen, Region und Krankheiten streuen stark. Notfall-OPs können einzeln 1.500–4.000 € kosten: OP-Versicherung oder Tierkonto einplanen.</small>"; } },

sabbatical: { t:"Auszeit-Sparrechner", h:
 '<div class="row">'+inp("sa_monate","Auszeit-Dauer (Monate)",4)+inp("sa_budget","Budget pro Monat (€)",1800,100)+inp("sa_start","Monate bis zum Start",18)+inp("sa_ist","Schon angespart (€)",2000,250)+'</div><div class="tres" id="sa_r"></div>',
 go(){ const ziel=num("sa_monate")*num("sa_budget")*1.2 + 0;
   const fehlt=Math.max(0, ziel-num("sa_ist"));
   const rate=num("sa_start")>0? fehlt/num("sa_start") : fehlt;
   document.getElementById("sa_r").innerHTML = "Zielbudget inkl. 20 % Puffer: <b>"+fmtE(ziel)+"</b> · Es fehlen: <b>"+fmtE(fehlt)+"</b><br>Nötige Sparrate: <b>"+fmtE(rate)+"/Monat</b> über "+num("sa_start")+" Monate<br><small>Plus Empfehlung: 3 Monatsgehälter Wiedereinstiegs-Puffer separat. Bei unbezahlter Freistellung Krankenversicherung (~230 €+/Monat freiwillige GKV) ins Monatsbudget einrechnen — beim Zeitwertkonto-Modell läuft sie weiter.</small>"; } }
,
kindsparplan: { t:"Kinder-Sparplan-Rechner (bis zum 18. Geburtstag)", h:
 '<div class="row">'+inp("ks_alter","Alter des Kindes heute (Jahre)",0)+inp("ks_rate","Sparrate (€/Monat)",50,5)+inp("ks_start","Startkapital (€)",500,100)+inp("ks_zins","Rendite p. a. (%)",6,0.5)+'</div><div class="tres" id="ks_r"></div>',
 go(){ const jahre=Math.max(0,18-num("ks_alter")), n=jahre*12, r=num("ks_zins")/100/12, m=num("ks_rate"), S=num("ks_start");
   const end = S*Math.pow(1+r,n) + (r? m*((Math.pow(1+r,n)-1)/r) : m*n);
   const einz = S+m*n;
   document.getElementById("ks_r").innerHTML = "Zum 18. Geburtstag ("+jahre+" Jahre Laufzeit): <b>"+fmtE(end)+"</b><br>Eingezahlt: "+fmtE(einz)+" · Kurszuwachs: <b>"+fmtE(end-einz)+"</b>"+
   (end>15000? "<br>⚠️ Über ~15.000 € beim Kind kann später BAföG-relevant werden — ab dieser Größenordnung Eltern-Depot-Anteil erwägen." : "")+
   "<br><small>Vor Steuern (mit NV-Bescheinigung meist ohnehin steuerfrei) und vor Inflation; 6 % ist ein historischer Aktien-Richtwert, keine Garantie.</small>"; } }
,
verzug: { t:"Verzugszinsen-Rechner (§ 288 BGB)", h:
 '<div class="row">'+inp("vz_betrag","Offene Forderung (€)",1200,50)+inp("vz_tage","Tage im Verzug",60)+inp("vz_basis","Basiszinssatz Bundesbank (%)",3.62,0.01)+sel("vz_wer","Beteiligte",[["v","Verbraucher beteiligt (+5 %)"],["b","nur Unternehmen (+9 %)"]])+'</div><div class="tres" id="vz_r"></div>',
 go(){ var b=num("vz_betrag"), t=num("vz_tage"), basis=num("vz_basis"); var auf=(document.getElementById("vz_wer").value==="b")?9:5; var satz=basis+auf;
   var zins=b*(satz/100)*(t/365);
   document.getElementById("vz_r").innerHTML = "Verzugszinssatz: <b>"+satz.toLocaleString("de-DE")+" %</b> p. a. (Basis "+basis+" % + "+auf+" %)<br>Zinsen für "+t+" Tage: <b>"+fmtE(zins)+"</b> · Gesamt offen: <b>"+fmtE(b+zins)+"</b>"+
   ((document.getElementById("vz_wer").value==="b")? "<br>+ Verzugspauschale <b>40 €</b> möglich (§ 288 Abs. 5 BGB).":"")+
   "<br><small>Der Basiszinssatz der Bundesbank ändert sich halbjährlich (1.1. / 1.7.) — aktuellen Wert eintragen. Verzug tritt ein nach Mahnung bzw. 30 Tage nach Rechnung/Fälligkeit (bei Verbrauchern nur mit Hinweis auf der Rechnung).</small>"; } }
,
teilzeit: { t:"Teilzeit-Rechner (Brutto, Netto, Stundenlohn)", h:
 '<div class="row">'+inp("tz_voll","Vollzeit-Brutto/Monat (€)",3600,50)+inp("tz_vollh","Vollzeit-Wochenstunden",40)+inp("tz_neu","Gewünschte Wochenstunden",30)+'</div><div class="tres" id="tz_r"></div>',
 go(){ var voll=num("tz_voll"), vh=num("tz_vollh")||40, nh=num("tz_neu"); var quote=vh? nh/vh:0;
   var brutto=voll*quote; var nettoM=nettoSchaetzung(brutto*12)/12; var stundenlohn=nh? (brutto/(nh*4.33)) : 0;
   document.getElementById("tz_r").innerHTML = "Anteil: <b>"+Math.round(quote*100)+" %</b> · Teilzeit-Brutto ≈ <b>"+fmtE(brutto)+"</b>/Monat<br>Netto ≈ <b>"+fmtE(nettoM)+"</b>/Monat · Stundenlohn ≈ <b>"+stundenlohn.toLocaleString("de-DE",{maximumFractionDigits:2})+" €</b><br><small>Überschlag (Steuerklasse I). Weniger Stunden senken später die Rente. Anspruch auf Teilzeit: in Betrieben über 15 Beschäftigten nach 6 Monaten (TzBfG); zeitlich begrenzte Brückenteilzeit ab über 45 Beschäftigten. Urlaubstage werden anteilig umgerechnet.</small>"; } }
,
wgmiete: { t:"WG-Mietteilung (fair nach Zimmergröße)", h:
 '<div class="row">'+inp("wg_miete","Gesamtmiete warm (€/Monat)",1500,50)+inp("wg_zimmer","Anzahl Privatzimmer",3)+inp("wg_gem","Gemeinschaftsfläche gesamt (m²)",30,1)+'</div><div class="row">'+inp("wg_mein","Mein Zimmer (m²)",18,1)+inp("wg_rest","Übrige Privatzimmer zusammen (m²)",32,1)+'</div><div class="tres" id="wg_r"></div>',
 go(){ var miete=num("wg_miete"), z=Math.max(1,num("wg_zimmer")); var mein=num("wg_mein"), rest=num("wg_rest"), gem=num("wg_gem");
   var privat=mein+rest; if(privat<=0){ document.getElementById("wg_r").innerHTML="Bitte Zimmergrößen eintragen."; return; }
   var meineFlaeche=mein+(gem/z), gesamtFlaeche=privat+gem; var anteil=miete*(meineFlaeche/gesamtFlaeche); var gleich=miete/z;
   document.getElementById("wg_r").innerHTML = "Fairer Anteil (Zimmer + anteilige Gemeinschaftsfläche): <b>"+fmtE(anteil)+"</b>/Monat<br>Zum Vergleich, einfach durch "+z+" geteilt: "+fmtE(gleich)+"<br><small>Modell: Privatzimmer nach m², Gemeinschaftsfläche zu gleichen Teilen. Im Hauptmietvertrag haften meist alle gesamtschuldnerisch — die interne Aufteilung am besten schriftlich festhalten. Besonderheiten (Balkon, eigenes Bad) rechtfertigen einen Zuschlag.</small>"; } }
,
burente: { t:"Berufsunfähigkeits-Bedarf (BU-Rente)", h:
 '<div class="row">'+inp("br_netto","Aktuelles Netto/Monat (€)",2200,50)+inp("br_fix","Unvermeidbare Fixkosten/Monat (€)",1400,50)+inp("br_sonst","Andere Absicherung/Monat (€)",0,50)+'</div><div class="tres" id="br_r"></div>',
 go(){ var netto=num("br_netto"), fix=num("br_fix"), sonst=num("br_sonst");
   var ziel=Math.max(fix, Math.round(netto*0.8)); var bedarf=Math.max(0, ziel-sonst);
   document.getElementById("br_r").innerHTML = "Empfohlene BU-Rente: <b>"+fmtE(bedarf)+"</b>/Monat<br><small>Richtwert: rund 80 % des Nettos, mindestens die unvermeidbaren Fixkosten. Die gesetzliche Erwerbsminderungsrente reicht selten und entfällt als Berufsunfähigkeitsschutz für die meisten ganz. Wichtige Klauseln beim Abschluss: Verzicht auf abstrakte Verweisung, Nachversicherungsgarantie ohne erneute Gesundheitsprüfung, Leistung ab 50 % BU, weltweiter Schutz. Je jünger und gesünder, desto günstiger der Beitrag — Gesundheitsfragen unbedingt vollständig und ehrlich beantworten.</small>"; } }
,
stundensatz: { t:"Freelancer-Stundensatz-Kalkulator", h:
 '<div class="row">'+inp("ss_eink","Ziel-Jahreseinkommen vor Steuer (€)",45000,1000)+inp("ss_kosten","Betriebskosten/Jahr (€)",8000,500)+inp("ss_vors","Vorsorge/Jahr (KV, Rente) (€)",9000,500)+inp("ss_std","Fakturierbare Stunden/Jahr",1100,50)+'</div><div class="tres" id="ss_r"></div>',
 go(){ var ziel=num("ss_eink")+num("ss_kosten")+num("ss_vors"); var std=num("ss_std"); var satz=std? ziel/std:0;
   document.getElementById("ss_r").innerHTML = "Nötiger Netto-Stundensatz: <b>"+Math.round(satz).toLocaleString("de-DE")+" €</b> (zzgl. USt)<br>Deckt Einkommen, Betriebskosten und Vorsorge bei "+std+" fakturierbaren Stunden.<br><small>Realistisch sind 1.000–1.200 fakturierbare Stunden pro Jahr, nicht 1.800 — Akquise, Buchhaltung, Urlaub und Krankheit fehlen. Als Plausibilitätscheck: grob das Zwei- bis Dreifache eines vergleichbaren Angestellten-Stundenlohns, weil Sozialabgaben, Ausfallzeiten und unternehmerisches Risiko allein getragen werden.</small>"; } }
,
ehesplitting: { t:"Ehegattensplitting — Vorteil schätzen", h:
 '<div class="row">'+inp("es_a","Zu versteuerndes Einkommen Person A (€/Jahr)",55000,1000)+inp("es_b","Zu versteuerndes Einkommen Person B (€/Jahr)",15000,1000)+'</div><div class="tres" id="es_r"></div>',
 go(){ function st(zvE){ zvE=Math.max(0,zvE);
     if(zvE<=11604) return 0;
     if(zvE<=17005){ var y=(zvE-11604)/10000; return (922.98*y+1400)*y; }
     if(zvE<=66760){ var z=(zvE-17005)/10000; return (181.19*z+2397)*z+1025.38; }
     if(zvE<=277825) return 0.42*zvE-10602.13;
     return 0.45*zvE-18936.88; }
   var a=num("es_a"), b=num("es_b"); var einzeln=st(a)+st(b); var split=2*st((a+b)/2); var vorteil=Math.max(0, Math.round(einzeln-split));
   document.getElementById("es_r").innerHTML = "Geschätzter Splitting-Vorteil: <b>"+fmtE(vorteil)+"</b>/Jahr<br><small>Sehr grobe Schätzung (vereinfachter Grundtarif, ohne Soli/Kirchensteuer/Freibeträge). Der Vorteil wächst, je unterschiedlicher die Einkommen sind, und ist null bei gleich hohem Verdienst. Das Splitting wirkt über die Steuerklassenwahl nur auf die Liquidität im Jahr — die endgültige Ersparnis ergibt sich immer erst mit der gemeinsamen Steuererklärung.</small>"; } }
,
kindesunterhalt: { t:"Kindesunterhalt-Schätzer (Düsseldorfer Tabelle, Richtwert)", h:
 '<div class="row">'+inp("ku_netto","Bereinigtes Netto Zahlende:r (€/Monat)",2400,50)+inp("ku_alter","Alter des Kindes (Jahre)",8)+'</div><div class="tres" id="ku_r"></div>',
 go(){ var netto=num("ku_netto"), alter=num("ku_alter");
   var basis = alter<6?480 : alter<12?551 : alter<18?645 : 689;
   var grp = netto<=2100?0 : Math.min(10, Math.floor((netto-2100)/400)+1);
   var pct = 100 + grp*5;
   var tabelle = Math.round(basis*pct/100);
   var zahl = Math.max(0, tabelle - (alter<18?125:0)); // halbes Kindergeld beim Minderjährigen
   document.getElementById("ku_r").innerHTML = "Tabellenbetrag: <b>"+fmtE(tabelle)+"</b> (Einkommensgruppe "+(grp+1)+", "+pct+" %)<br>Zahlbetrag minderjährig (− halbes Kindergeld): <b>"+fmtE(zahl)+"</b>/Monat<br><small>Grober Richtwert nach Düsseldorfer Tabelle — konkrete Werte und Selbstbehalt ändern sich jährlich (Stand prüfen). „Bereinigt“ heißt: nach Abzug berufsbedingter Aufwendungen und berücksichtigungsfähiger Schulden. Beim Wechselmodell und bei Volljährigen gelten Sonderregeln. Im Zweifel Beratung beim Jugendamt (Beistandschaft, kostenlos) oder Fachanwalt.</small>"; } }
,
bestatt: { t:"Bestattungskosten-Überschlag", h:
 '<div class="row">'+inp("bs_best","Bestatter-Grundleistung (€)",2500,100)+inp("bs_fried","Friedhof/Grab (€)",2000,100)+inp("bs_feier","Trauerfeier, Blumen, Karten (€)",1200,100)+inp("bs_stein","Grabstein/-platte (€)",1800,100)+'</div><div class="tres" id="bs_r"></div>',
 go(){ var sum=num("bs_best")+num("bs_fried")+num("bs_feier")+num("bs_stein");
   document.getElementById("bs_r").innerHTML = "Geschätzte Gesamtkosten: <b>"+fmtE(sum)+"</b><br><small>Große Spannen sind normal — schon die Bestatter-Grundleistung unterscheidet sich um mehrere tausend Euro für dieselbe Leistung. Sparhebel ohne Würdeverlust: Feuerbestattung mit pflegefreiem Baum- oder Urnengemeinschaftsgrab, kleine selbst gestaltete Feier, mehrere Angebote vergleichen. Bei Mittellosigkeit übernimmt das Sozialamt die erforderlichen Kosten auf Antrag (Sozialbestattung).</small>"; } }
,
aufstiegsbafoeg: { t:"Aufstiegs-BAföG: Eigenanteil-Rechner", h:
 '<div class="row">'+inp("ab_kurs","Lehrgangs- + Prüfungsgebühren (€)",7300,100)+'</div><div class="tres" id="ab_r"></div>',
 go(){ var k=num("ab_kurs"); var zuschuss=k*0.5, darlehen=k*0.5, erlass=darlehen*0.5, eigen=darlehen-erlass;
   document.getElementById("ab_r").innerHTML = "Zuschuss (geschenkt): <b>"+fmtE(zuschuss)+"</b><br>KfW-Darlehen "+fmtE(darlehen)+", nach bestandener Prüfung 50 % erlassen (−"+fmtE(erlass)+")<br>Verbleibender Eigenanteil: <b>"+fmtE(eigen)+"</b> (zinsgünstig, gestreckt)<br><small>Gilt für Lehrgangs- und Prüfungsgebühren; Material und Fahrten sind separat, aber als Werbungskosten absetzbar. Häufig zusätzlich eine Meisterprämie des Bundeslandes. Vollzeit-Variante: einkommensabhängiger Unterhaltsbeitrag. Förderquoten ändern sich — Stand prüfen.</small>"; } }
,
wohnumbau: { t:"Wohnumbau im Alter: Zuschüsse & Eigenanteil", h:
 '<div class="row">'+inp("wu_kosten","Umbaukosten (€)",6000,100)+sel("wu_pg","Pflegegrad vorhanden?",[["ja","ja (ab Pflegegrad 1)"],["nein","nein"]])+'</div><div class="tres" id="wu_r"></div>',
 go(){ var k=num("wu_kosten"); var pg=document.getElementById("wu_pg").value;
   var pflege=(pg==="ja")? Math.min(4180,k):0; var rest=Math.max(0,k-pflege); var kfw=Math.min(2500, Math.round(rest*0.10)); var eigen=Math.max(0,k-pflege-kfw);
   document.getElementById("wu_r").innerHTML = "Pflegekassen-Zuschuss (je Maßnahme): <b>"+fmtE(pflege)+"</b><br>KfW-Zuschuss (Richtwert 10 %, gedeckelt): <b>"+fmtE(kfw)+"</b><br>Verbleibender Eigenanteil: <b>"+fmtE(eigen)+"</b><br><small>Richtwerte — Programme und Höchstbeträge ändern sich (Stand prüfen). Der Pflegekassen-Zuschuss bis 4.180 € je wohnumfeldverbessernder Maßnahme gilt ab Pflegegrad 1; leben mehrere Anspruchsberechtigte im Haushalt, steigt der Betrag. KfW-Mittel sind kontingentiert — Antrag vor Beginn. Handwerkerlöhne sind zusätzlich steuerlich absetzbar.</small>"; } }
,
sanierung: { t:"Sanierung: Förderung & Eigenanteil", h:
 '<div class="row">'+inp("sa_kosten","Maßnahmenkosten (€)",20000,500)+inp("sa_quote","Förderquote Zuschuss (%)",15,1)+'</div><div class="tres" id="sa_r"></div>',
 go(){ var k=num("sa_kosten"), q=num("sa_quote"); var zuschuss=Math.round(k*q/100); var eigen=k-zuschuss; var steuer=Math.round(k*0.20);
   document.getElementById("sa_r").innerHTML = "Zuschuss-Weg (BAFA/KfW): Förderung <b>"+fmtE(zuschuss)+"</b> → Eigenanteil <b>"+fmtE(eigen)+"</b><br>Alternativ Steuerbonus § 35c: <b>"+fmtE(steuer)+"</b> (20 %, über 3 Jahre direkt von der Steuerschuld)<br><small>Für dieselbe Maßnahme nur einen Weg wählen. Bei hohen Förderquoten (Heizungstausch, mit iSFP-Bonus) schlägt der Zuschuss meist den Steuerbonus; bei kleinen Einzelmaßnahmen ist der Steuerweg bequem. Antrag immer vor Auftrag — Konditionen tagesaktuell bei BAFA/KfW prüfen.</small>"; } }
,
inflation: { t:"Inflation & Kaufkraft", h:
 '<div class="row">'+inp("if_betrag","Heutiger Betrag (€)",10000,500)+inp("if_jahre","Zeitraum (Jahre)",20)+inp("if_rate","Inflation p. a. (%)",2.5,0.1)+'</div><div class="tres" id="if_r"></div>',
 go(){ var b=num("if_betrag"), n=num("if_jahre"), r=num("if_rate"); var faktor=Math.pow(1+r/100,n); var kauf=b/faktor; var verlust=b-kauf;
   document.getElementById("if_r").innerHTML = "Kaufkraft von "+fmtE(b)+" in "+n+" Jahren: <b>"+fmtE(kauf)+"</b> (in heutigem Geld)<br>Realer Wertverlust: "+fmtE(verlust)+" ("+Math.round(verlust/b*100)+" %)<br><small>Damit Erspartes seine Kaufkraft behält, muss die Geldanlage NACH Steuern mindestens die Inflationsrate erwirtschaften — auf dem Giro-/Sparkonto gelingt das selten. Genau deshalb schlägt breit gestreutes Investieren langfristig das Horten. Die Rate ist eine Annahme; tatsächliche Inflation schwankt.</small>"; } }
,
dispokredit: { t:"Dispo & Umschuldung", h:
 '<div class="row">'+inp("dk_betrag","Dauerhaft genutzter Dispo (€)",2000,100)+inp("dk_dispo","Dispo-Zins (%)",11.5,0.1)+inp("dk_raten","Ratenkredit-Zins (%)",7,0.1)+'</div><div class="tres" id="dk_r"></div>',
 go(){ var b=num("dk_betrag"), d=num("dk_dispo"), r=num("dk_raten"); var dispo=b*d/100, raten=b*r/100; var spar=dispo-raten;
   document.getElementById("dk_r").innerHTML = "Dispo-Zinsen pro Jahr: <b>"+fmtE(dispo)+"</b><br>Nach Umschuldung auf Ratenkredit: "+fmtE(raten)+"/Jahr → Ersparnis <b>"+fmtE(Math.max(0,spar))+"</b>/Jahr<br><small>Ein dauerhaft ausgereizter Dispo ist einer der teuersten Alltagskredite. Wer ihn nicht binnen Wochen ausgleichen kann, schuldet ihn in einen Ratenkredit mit fester Laufzeit um (Bank ansprechen) — und nutzt den Dispo danach nur noch als kurzfristige Brücke. Zinssätze verhandelbar; Vergleich lohnt.</small>"; } }
,
homeoffice: { t:"Homeoffice: Pauschale & Fahrtersparnis", h:
 '<div class="row">'+inp("ho_tage","Homeoffice-Tage/Jahr",100)+inp("ho_km","Entfernung Wohnung–Arbeit (km, einfach)",20,1)+'</div><div class="tres" id="ho_r"></div>',
 go(){ var t=num("ho_tage"), km=num("ho_km"); var pausch=Math.min(t,210)*6; var fahrt=Math.round(t*km*2*0.30);
   document.getElementById("ho_r").innerHTML = "Homeoffice-Pauschale: <b>"+fmtE(pausch)+"</b> (6 €/Tag, max. 210 Tage = 1.260 €)<br>Grob gesparte Fahrtkosten dieser Tage: ~<b>"+fmtE(fahrt)+"</b>/Jahr<br><small>Die Pauschale gilt auch ohne separates Arbeitszimmer. Für denselben Tag nicht gleichzeitig Homeoffice-Pauschale und Entfernungspauschale ansetzen. Die Fahrtersparnis ist illustrativ (reale Kfz-Vollkosten liegen meist höher). Arbeitsrechtlich gibt es keinen generellen Anspruch auf Homeoffice — es wird vereinbart.</small>"; } }
,
solar: { t:"Balkonkraftwerk: Ersparnis & Amortisation", h:
 '<div class="row">'+inp("so_kosten","Anschaffung inkl. Montage (€)",500,50)+inp("so_kwh","Stromertrag (kWh/Jahr)",550,50)+'</div><div class="row">'+inp("so_preis","Strompreis (ct/kWh)",35,1)+inp("so_eigen","Eigenverbrauchsquote (%)",70,5)+'</div><div class="tres" id="so_r"></div>',
 go(){ var k=num("so_kosten"), kwh=num("so_kwh"), p=num("so_preis"), e=num("so_eigen"); var spar=kwh*(e/100)*(p/100); var amort=spar>0?(k/spar):0;
   document.getElementById("so_r").innerHTML = "Jährliche Stromersparnis: <b>"+fmtE(spar)+"</b><br>Amortisation: <b>"+(amort>0?amort.toFixed(1)+" Jahre":"—")+"</b> (Module halten meist 20+ Jahre)<br><small>Nur der selbst verbrauchte Strom spart Geld — der Ertrag zählt, wenn jemand zu Hause ist. Eigenverbrauch steigt mit Grundlast (Kühlschrank, Router) und cleverem Timing (Wäsche/Spülmaschine mittags). Anmeldung im Marktstammdatenregister; Mietende brauchen die Zustimmung von Vermieter/Eigentümergemeinschaft (Anspruch besteht).</small>"; } }
,
schlaf: { t:"Schlaf-Rechner (Zubettgeh-Zeit)", h:
 '<div class="row">'+inp("sl_h","Aufwachzeit — Stunde (0–23)",7)+inp("sl_m","Aufwachzeit — Minute",0)+'</div><div class="tres" id="sl_r"></div>',
 go(){ var wake=num("sl_h")*60+num("sl_m"); function ft(min){min=((Math.round(min)%1440)+1440)%1440; var hh=Math.floor(min/60), mm=min%60; return (hh<10?"0":"")+hh+":"+(mm<10?"0":"")+mm;}
   var b6=wake-15-6*90, b5=wake-15-5*90;
   document.getElementById("sl_r").innerHTML = "Für das Aufwachen um <b>"+ft(wake)+"</b> ideal ins Bett gegen:<br>~<b>"+ft(b6)+"</b> (6 Zyklen, ca. 9 h) oder ~<b>"+ft(b5)+"</b> (5 Zyklen, ca. 7,5 h)<br><small>Schlaf verläuft in rund 90-Minuten-Zyklen; am Zyklusende aufzuwachen fällt leichter als mittendrin (plus etwa 15 Minuten Einschlafzeit). Erwachsene brauchen meist 7–9 Stunden. Der wirksamste Hebel für guten Schlaf ist eine feste Aufstehzeit — auch am Wochenende.</small>"; } }
,
autokosten: { t:"Auto: monatliche Vollkosten", h:
 '<div class="row">'+inp("au_kauf","Kaufpreis (€)",25000,500)+inp("au_rest","Restwert nach Haltedauer (€)",10000,500)+inp("au_jahre","Haltedauer (Jahre)",8)+'</div><div class="row">'+inp("au_km","Fahrleistung (km/Jahr)",12000,500)+inp("au_verb","Verbrauch (l/100 km)",7,0.1)+inp("au_preis","Kraftstoff (€/l)",1.80,0.05)+'</div><div class="row">'+inp("au_fix","Versicherung+Steuer+Wartung (€/Jahr)",1600,100)+'</div><div class="tres" id="au_r"></div>',
 go(){ var dep=(num("au_kauf")-num("au_rest"))/(num("au_jahre")*12); var sprit=num("au_km")/100*num("au_verb")*num("au_preis")/12; var fix=num("au_fix")/12; var ges=dep+sprit+fix;
   document.getElementById("au_r").innerHTML = "Wertverlust: "+fmtE(dep)+"/Mon · Kraftstoff: "+fmtE(sprit)+"/Mon · Fixkosten: "+fmtE(fix)+"/Mon<br>Echte Vollkosten: <b>"+fmtE(ges)+" / Monat</b> (≈ "+fmtE(ges*12)+"/Jahr)<br><small>Der größte und unterschätzte Posten ist meist der Wertverlust, nicht der Sprit. Reifen, Parken, TÜV und Reparaturen variieren stark — als Faustwert in die Fixkosten einrechnen. Diese Vollkostenrechnung macht Carsharing oder ÖPNV oft konkurrenzfähig, sobald die Fahrleistung niedrig ist.</small>"; } }
,
pendelvergleich: { t:"Pendeln: Auto vs. ÖPNV + Pauschale", h:
 '<div class="row">'+inp("pv_km","Entfernung einfach (km)",25,1)+inp("pv_tage","Arbeitstage/Monat",20)+'</div><div class="row">'+inp("pv_verb","Verbrauch (l/100 km)",7,0.1)+inp("pv_preis","Kraftstoff (€/l)",1.80,0.05)+inp("pv_ticket","ÖPNV-Ticket (€/Monat)",58,1)+'</div><div class="tres" id="pv_r"></div>',
 go(){ var km=num("pv_km"), tage=num("pv_tage"); var auto=km*2*tage/100*num("pv_verb")*num("pv_preis"); var ticket=num("pv_ticket");
   var pausch=(Math.min(km,20)*0.30+Math.max(0,km-20)*0.38)*tage*12;
   document.getElementById("pv_r").innerHTML = "Auto (nur Kraftstoff): <b>"+fmtE(auto)+"/Monat</b> · ÖPNV-Ticket: <b>"+fmtE(ticket)+"/Monat</b><br>Differenz: "+fmtE(Math.abs(auto-ticket))+"/Monat zugunsten "+(auto<ticket?"Auto":"ÖPNV")+"<br>Entfernungspauschale steuerlich: ~<b>"+fmtE(pausch)+"/Jahr</b> (0,30 € bis 20 km, 0,38 € ab dem 21. km)<br><small>Beim Auto sind hier nur die Spritkosten erfasst — mit Wertverlust, Wartung und Parken liegt es real höher (siehe Auto-Vollkostenrechner). Die Pauschale gilt unabhängig vom Verkehrsmittel und mindert die Steuer.</small>"; } }
,
stromrechner: { t:"Stromkosten & Anbieterwechsel", h:
 '<div class="row">'+inp("st_kwh","Jahresverbrauch (kWh)",2500,100)+inp("st_preis","Arbeitspreis aktuell (ct/kWh)",35,0.5)+'</div><div class="row">'+inp("st_grund","Grundpreis (€/Monat)",12,1)+inp("st_neu","Arbeitspreis neuer Tarif (ct/kWh)",30,0.5)+'</div><div class="tres" id="st_r"></div>',
 go(){ var kwh=num("st_kwh"), grund=num("st_grund")*12; var alt=kwh*num("st_preis")/100+grund; var neu=kwh*num("st_neu")/100+grund; var spar=alt-neu;
   document.getElementById("st_r").innerHTML = "Jahreskosten aktuell: <b>"+fmtE(alt)+"</b> (≈ "+fmtE(alt/12)+"/Monat)<br>Mit neuem Arbeitspreis: <b>"+fmtE(neu)+"</b> → Ersparnis <b>"+fmtE(Math.max(0,spar))+"/Jahr</b><br><small>Orientierung Verbrauch: 1 Person ≈ 1.500 kWh, 4-Personen-Haushalt ≈ 4.000 kWh (mehr mit Warmwasser über Strom). Den Abschlag nicht zu hoch ansetzen — er ist nur eine Vorauszahlung. Bei Wechsel auf Kündigungsfristen, Preisgarantie und Boni-Tricks achten; Grundversorgung ist meist teurer als ein Sondertarif.</small>"; } }
,
handykosten: { t:"Handyvertrag: gebündelt vs. getrennt", h:
 '<div class="row">'+inp("hk_bundle","Tarif MIT Gerät (€/Monat)",40,1)+inp("hk_sim","SIM-only-Tarif (€/Monat)",15,1)+'</div><div class="row">'+inp("hk_geraet","Gerätepreis bei Einzelkauf (€)",700,50)+inp("hk_monate","Vertragslaufzeit (Monate)",24)+'</div><div class="tres" id="hk_r"></div>',
 go(){ var m=num("hk_monate"); var bundle=num("hk_bundle")*m; var einzeln=num("hk_sim")*m+num("hk_geraet"); var d=bundle-einzeln;
   document.getElementById("hk_r").innerHTML = "Bündel-Tarif über "+m+" Monate: <b>"+fmtE(bundle)+"</b><br>SIM-only + Gerät separat: <b>"+fmtE(einzeln)+"</b><br>Günstiger: <b>"+(d>0?"getrennt (−"+fmtE(d)+")":"gebündelt (−"+fmtE(-d)+")")+"</b><br><small>In vielen Bündeln steckt das Gerät als verstecktes Ratenkredit-Aufgeld — getrennt (gebrauchtes oder vorjähriges Gerät + günstiger SIM-only-Tarif) ist oft deutlich billiger. Rechne auch ein, wie lange du das Gerät wirklich nutzt; ein länger genutztes Handy senkt die Monatskosten am stärksten.</small>"; } }
,
jobrad: { t:"Dienstrad-Leasing (JobRad)", h:
 '<div class="row">'+inp("jr_preis","Listenpreis Rad (€)",2500,100)+inp("jr_rate","Leasingrate brutto (€/Monat)",75,5)+'</div><div class="row">'+inp("jr_steuer","persönlicher Steuer-/Abgabensatz (%)",35,1)+inp("jr_monate","Laufzeit (Monate)",36)+'</div><div class="tres" id="jr_r"></div>',
 go(){ var preis=num("jr_preis"), rate=num("jr_rate"), s=num("jr_steuer")/100, m=num("jr_monate"); var nettoRate=rate*(1-s); var uebernahme=preis*0.18; var ges=nettoRate*m+uebernahme; var d=preis-ges;
   document.getElementById("jr_r").innerHTML = "Netto-Belastung der Rate: ~<b>"+fmtE(nettoRate)+"/Monat</b> (Brutto-Gehaltsumwandlung spart Steuer/Abgaben)<br>Gesamt über "+m+" Monate inkl. Übernahme (~18 %): <b>"+fmtE(ges)+"</b><br>Vergleich Direktkauf "+fmtE(preis)+" → "+(d>0?"Ersparnis <b>"+fmtE(d)+"</b>":"Mehrkosten <b>"+fmtE(-d)+"</b>")+"<br><small>Vereinfachte Schätzung. Der Vorteil steigt mit dem persönlichen Steuersatz; der geldwerte Vorteil (0,25-%-Regel) ist meist gering. Restwert/Übernahme variiert. Nur sinnvoll bei einem Rad, das man wirklich nutzt — und Gehaltsumwandlung senkt minimal spätere Lohnersatzleistungen.</small>"; } }
,
urlaub: { t:"Urlaubsanspruch berechnen", h:
 '<div class="row">'+inp("ur_voll","Urlaubstage/Jahr bei 5-Tage-Woche",28)+inp("ur_tage","tatsächliche Arbeitstage/Woche",5)+inp("ur_monate","Monate im Jahr beschäftigt",12)+'</div><div class="tres" id="ur_r"></div>',
 go(){ var anspruch=num("ur_voll")/5*num("ur_tage"); var anteilig=Math.floor(anspruch*num("ur_monate")/12+1e-9); var mind=4*num("ur_tage");
   document.getElementById("ur_r").innerHTML = "Voller Jahresanspruch (auf deine Arbeitstage umgerechnet): <b>"+anspruch.toFixed(1)+" Tage</b><br>Anteilig bei "+num("ur_monate")+" Monaten: <b>"+anteilig+" Tage</b><br>Gesetzliches Minimum: "+mind+" Tage (4 Wochen)<br><small>Teilzeit ändert die Zahl der Urlaubstage, nicht die Urlaubswochen — wer an weniger Tagen arbeitet, hat entsprechend weniger Tage, aber gleich viele freie Wochen. Im Ein- und Austrittsjahr wird anteilig (pro Monat 1/12) gerechnet; viele Arbeitsverträge gewähren über das gesetzliche Minimum hinaus.</small>"; } }
,
minijob: { t:"Minijob: Verdienst & Stunden", h:
 '<div class="row">'+inp("mj_lohn","Stundenlohn (€)",12.82,0.10)+inp("mj_stunden","Stunden/Monat",43)+inp("mj_grenze","Verdienstgrenze (€/Monat)",556,10)+'</div><div class="tres" id="mj_r"></div>',
 go(){ var lohn=num("mj_lohn"); var verdienst=lohn*num("mj_stunden"); var maxStd=lohn>0?num("mj_grenze")/lohn:0; var ueber=verdienst>num("mj_grenze");
   document.getElementById("mj_r").innerHTML = "Monatsverdienst: <b>"+fmtE(verdienst)+"</b>"+(ueber?" — <b>über</b> der Grenze!":" — innerhalb der Grenze")+"<br>Maximale Stunden bei dieser Grenze: <b>"+maxStd.toFixed(1)+" h/Monat</b><br><small>Die Minijob-Grenze ist an den Mindestlohn gekoppelt und steigt mit ihm (Stand prüfen). Im Minijob bleibt der Lohn für die Beschäftigten meist abgaben- und steuerfrei; sinnvoll ist, sich die Rentenversicherungspflicht NICHT befreien zu lassen (geringer Eigenanteil, voller Versicherungsschutz). Darüber beginnt der Midijob-Übergangsbereich mit reduzierten Beiträgen.</small>"; } }
,
kaution: { t:"Mietkaution: Höchstbetrag & Raten", h:
 '<div class="row">'+inp("ka_kalt","Kaltmiete (€/Monat)",700,10)+inp("ka_verlangt","verlangte Kaution (€)",2100,50)+'</div><div class="tres" id="ka_r"></div>',
 go(){ var kalt=num("ka_kalt"); var maxK=3*kalt; var verlangt=num("ka_verlangt"); var zuviel=Math.max(0,verlangt-maxK);
   document.getElementById("ka_r").innerHTML = "Gesetzlicher Höchstbetrag (3 Kaltmieten): <b>"+fmtE(maxK)+"</b><br>In 3 Raten zahlbar: <b>"+fmtE(maxK/3)+"/Monat</b> (1. Rate zu Mietbeginn)"+(zuviel>0?"<br>Zu viel verlangt: <b>"+fmtE(zuviel)+"</b>":"")+"<br><small>Die Kaution darf höchstens drei Nettokaltmieten betragen und ist in drei Monatsraten zahlbar. Der Vermieter muss sie getrennt vom eigenen Vermögen und verzinst anlegen; die Zinsen stehen dir zu. Nach dem Auszug erfolgt die Rückzahlung zügig, ein angemessener Teil darf bis zur Nebenkostenabrechnung einbehalten werden.</small>"; } }
,
bahncard: { t:"BahnCard: ab wann lohnt sie sich?", h:
 '<div class="row">'+inp("bc_karte","Kartenpreis (€/Jahr)",244,1)+inp("bc_rabatt","Rabatt (%)",50,5)+inp("bc_tickets","geplante Ticketausgaben ohne Karte (€/Jahr)",800,50)+'</div><div class="tres" id="bc_r"></div>',
 go(){ var karte=num("bc_karte"), rab=num("bc_rabatt")/100, tickets=num("bc_tickets"); var spar=tickets*rab; var netto=spar-karte; var breakeven=rab>0?karte/rab:0;
   document.getElementById("bc_r").innerHTML = "Rabatt erspart: <b>"+fmtE(spar)+"</b> · abzüglich Kartenpreis: <b>"+(netto>=0?"+":"")+fmtE(netto)+"/Jahr</b><br>Lohnt sich ab Bahn-Ausgaben von <b>"+fmtE(breakeven)+"/Jahr</b><br><small>Reine Preisrechnung. Wer regelmäßig fährt, erreicht den Break-even schnell; bei wenigen Fahrten reichen oft Sparpreise ohne Karte. Achte auf die automatische Verlängerung (rechtzeitig kündigen) und prüfe, ob ein Jobticket/Deutschlandticket die bessere Grundlage ist.</small>"; } }
,
festgeld: { t:"Tages-/Festgeld: Zinsertrag nach Steuer", h:
 '<div class="row">'+inp("fg_betrag","Anlagebetrag (€)",10000,500)+inp("fg_zins","Zins p. a. (%)",3,0.1)+inp("fg_jahre","Laufzeit (Jahre)",3)+'</div><div class="tres" id="fg_r"></div>',
 go(){ var b=num("fg_betrag"), z=num("fg_zins")/100, n=num("fg_jahre"); var brutto=b*(Math.pow(1+z,n)-1); var frei=1000*n; var stpfl=Math.max(0,brutto-frei); var steuer=stpfl*0.26375; var netto=brutto-steuer;
   document.getElementById("fg_r").innerHTML = "Zinsertrag brutto über "+n+" Jahre: <b>"+fmtE(brutto)+"</b><br>Nach Steuer (Sparerpauschbetrag "+fmtE(frei)+" berücksichtigt): ~<b>"+fmtE(netto)+"</b><br>Endkapital: <b>"+fmtE(b+netto)+"</b><br><small>Mit Zinseszins gerechnet; bei jährlicher Auszahlung etwas weniger. Abgeltungsteuer 25 % plus Soli (Kirchensteuer nicht berücksichtigt). Freistellungsauftrag bei der Bank nicht vergessen. Sicherheit: gesetzliche Einlagensicherung bis 100.000 € je Bank — bei höheren Summen splitten. Zins schlägt selten die Inflation, eignet sich aber gut für den Notgroschen.</small>"; } }
,
etfsparplan: { t:"ETF-Sparplan: der Zinseszins-Motor", h:
 '<div class="row">'+inp("es_rate","Sparrate (€/Monat)",150,10)+inp("es_jahre","Laufzeit (Jahre)",20)+inp("es_rendite","Rendite p. a. (%)",6,0.5)+'</div><div class="tres" id="es_r"></div>',
 go(){ var rate=num("es_rate"), n=num("es_jahre")*12, r=num("es_rendite")/100/12; var fv=r>0?rate*((Math.pow(1+r,n)-1)/r):rate*n; var ein=rate*n; var gew=fv-ein;
   document.getElementById("es_r").innerHTML = "Endkapital nach "+num("es_jahre")+" Jahren: <b>"+fmtE(fv)+"</b><br>davon eingezahlt: "+fmtE(ein)+" · Gewinn durch Zinseszins: <b>"+fmtE(gew)+"</b><br><small>Modellrechnung mit konstanter Rendite — real schwanken Kurse, langfristig glättet sich das aber. Je länger die Laufzeit, desto stärker der Zinseszins. Breit streuen (Welt-Index), Kosten (TER) niedrig halten und stur weitersparen, gerade in schwachen Phasen. Keine Anlageberatung.</small>"; } }
,
skonto: { t:"Skonto: lohnt der Abzug?", h:
 '<div class="row">'+inp("sk_betrag","Rechnungsbetrag (€)",1000,50)+inp("sk_proz","Skonto (%)",2,0.5)+'</div><div class="row">'+inp("sk_frist","Skontofrist (Tage)",10,1)+inp("sk_ziel","Zahlungsziel (Tage)",30,1)+'</div><div class="tres" id="sk_r"></div>',
 go(){ var betrag=num("sk_betrag"), p=num("sk_proz"); var rest=Math.max(1,num("sk_ziel")-num("sk_frist")); var ersp=betrag*p/100; var effz=(p/(100-p))*(360/rest)*100;
   document.getElementById("sk_r").innerHTML = "Mit Skonto zahlst du <b>"+fmtE(betrag-ersp)+"</b> statt "+fmtE(betrag)+" — gespart: <b>"+fmtE(ersp)+"</b><br>Wer erst zum Zahlungsziel zahlt, verzichtet darauf und zahlt effektiv <b>"+effz.toFixed(0)+" % p. a.</b> mehr<br><small>Skonto ist ein Rabatt fürs schnelle Zahlen. Rechnet man den Verzicht in einen Jahreszins um, ist er meist sehr hoch (2/10 netto 30 entspricht rund 36 % p. a.). Deshalb lohnt es fast immer, Skonto zu ziehen — notfalls sogar finanziert über den günstigeren Dispo. Frist genau einhalten, sonst entfällt der Abzug.</small>"; } }
,
hausrat: { t:"Hausrat: Versicherungssumme prüfen", h:
 '<div class="row">'+inp("hr_qm","Wohnfläche (m²)",70,5)+inp("hr_wert","Richtwert (€/m²)",650,50)+inp("hr_summe","vereinbarte Versicherungssumme (€)",30000,1000)+'</div><div class="tres" id="hr_r"></div>',
 go(){ var empf=num("hr_qm")*num("hr_wert"); var summe=num("hr_summe"); var unter=empf>summe;
   document.getElementById("hr_r").innerHTML = "Empfohlene Versicherungssumme: <b>"+fmtE(empf)+"</b> (Wohnfläche × Richtwert)<br>Vereinbart: "+fmtE(summe)+(unter?" — <b>Unterversicherung!</b> Lücke "+fmtE(empf-summe):" — ausreichend")+"<br><small>Der Richtwert von rund 650 €/m² ist üblich; bei gehobener Ausstattung höher. Wichtig ist der Unterversicherungsverzicht in der Police — dann zahlt der Versicherer im Schaden den vollen Betrag. Fahrräder, Wertsachen und Elementarschäden (Hochwasser, Starkregen) oft separat absichern.</small>"; } }
,
bu: { t:"Berufsunfähigkeit: Bedarf abschätzen", h:
 '<div class="row">'+inp("bu_netto","Nettoeinkommen (€/Monat)",2200,50)+inp("bu_quote","abzusichern (%)",75,5)+inp("bu_em","gesetzl. EM-Rente ca. (€/Monat)",900,50)+'</div><div class="tres" id="bu_r"></div>',
 go(){ var empf=num("bu_netto")*num("bu_quote")/100; var luecke=Math.max(0,empf-num("bu_em"));
   document.getElementById("bu_r").innerHTML = "Empfohlene BU-Rente: ~<b>"+fmtE(empf)+"/Monat</b> ("+num("bu_quote")+" % vom Netto)<br>Abzüglich gesetzlicher EM-Rente bleibt Absicherungslücke: <b>"+fmtE(luecke)+"/Monat</b><br><small>Die gesetzliche Erwerbsminderungsrente reicht selten zum Leben und greift nur bei sehr starker Einschränkung. Je jünger und gesünder man abschließt, desto günstiger der Beitrag. Auf den Verzicht der sogenannten abstrakten Verweisung achten. Keine Versicherungsberatung — Bedingungen genau vergleichen.</small>"; } }
,
quadratmeter: { t:"Miete pro Quadratmeter", h:
 '<div class="row">'+inp("qm_kalt","Kaltmiete (€/Monat)",910,10)+inp("qm_qm","Wohnfläche (m²)",65,1)+inp("qm_orts","ortsüblich (€/m²)",12,0.5)+'</div><div class="tres" id="qm_r"></div>',
 go(){ var preis=num("qm_qm")>0?num("qm_kalt")/num("qm_qm"):0; var orts=num("qm_orts"); var abw=orts>0?(preis-orts)/orts*100:0;
   document.getElementById("qm_r").innerHTML = "Deine Kaltmiete: <b>"+preis.toFixed(2)+" €/m²</b><br>Ortsüblich: "+orts.toFixed(2)+" €/m² → <b>"+(abw>=0?"+":"")+abw.toFixed(0)+" %</b> "+(abw>=0?"darüber":"darunter")+"<br><small>In angespannten Wohnlagen begrenzt die Mietpreisbremse die Neuvertragsmiete auf ortsüblich + 10 %. Referenz ist der qualifizierte Mietspiegel der Kommune. Lage, Baujahr, Ausstattung und Möblierung erklären Abweichungen — der reine €/m²-Wert ist nur ein erster Anhaltspunkt.</small>"; } }
,
heizkosten: { t:"Heizkosten und Sparpotenzial", h:
 '<div class="row">'+inp("hz_kwh","Heizenergie (kWh/Jahr)",12000,500)+inp("hz_preis","Preis (ct/kWh)",12,0.5)+'</div><div class="row">'+inp("hz_grund","Grundpreis (€/Monat)",10,1)+inp("hz_senk","Temperatur senken (°C)",1,1)+'</div><div class="tres" id="hz_r"></div>',
 go(){ var verbr=num("hz_kwh")*num("hz_preis")/100; var jahr=verbr+num("hz_grund")*12; var spar=verbr*num("hz_senk")*0.06;
   document.getElementById("hz_r").innerHTML = "Heizkosten: <b>"+fmtE(jahr)+"/Jahr</b> (≈ "+fmtE(jahr/12)+"/Monat)<br>"+num("hz_senk")+" °C weniger spart rund "+(num("hz_senk")*6)+" % → <b>"+fmtE(spar)+"/Jahr</b><br><small>Richtwerte; Gas und Wärme werden meist in kWh abgerechnet. Faustregel: je Grad weniger Raumtemperatur rund 6 % Einsparung. Wirksam sind außerdem Stoßlüften statt Kippen, freie Heizkörper, Nachtabsenkung und ein hydraulischer Abgleich der Anlage.</small>"; } }
,
reisekosten: { t:"Dienstreise: Pauschale & Fahrt", h:
 '<div class="row">'+inp("rk_voll","volle Tage (24 h)",2)+inp("rk_teil","An-/Abreisetage",2)+inp("rk_km","gefahrene km (gesamt)",300,10)+'</div><div class="tres" id="rk_r"></div>',
 go(){ var verpf=num("rk_voll")*28+num("rk_teil")*14; var fahrt=num("rk_km")*0.30; var ges=verpf+fahrt;
   document.getElementById("rk_r").innerHTML = "Verpflegungspauschale: <b>"+fmtE(verpf)+"</b> (volle Tage × 28 € + Teiltage × 14 €)<br>Fahrtkosten (Pkw, 0,30 €/km): <b>"+fmtE(fahrt)+"</b><br>Summe: <b>"+fmtE(ges)+"</b><br><small>Inlandspauschalen. Stellt der Arbeitgeber Mahlzeiten, wird gekürzt (Frühstück −20 %, Mittag-/Abendessen je −40 % der vollen Tagespauschale). Entweder erstattet der Arbeitgeber steuerfrei, oder du setzt die Beträge als Werbungskosten in der Steuererklärung an.</small>"; } }
,
mietminderung: { t:"Mietminderung bei Mängeln", h:
 '<div class="row">'+inp("mm_warm","Warmmiete (€/Monat)",1000,10)+inp("mm_quote","Minderungsquote (%)",20,1)+inp("mm_tage","Tage mit Mangel",15)+'</div><div class="tres" id="mm_r"></div>',
 go(){ var betrag=num("mm_warm")*num("mm_quote")/100*num("mm_tage")/30;
   document.getElementById("mm_r").innerHTML = "Minderungsbetrag: ~<b>"+fmtE(betrag)+"</b><br><small>Berechnet auf die Brutto-(Warm-)Miete, anteilig für die Tage des Mangels. Den Mangel unverzüglich schriftlich anzeigen und dem Vermieter eine Frist zur Beseitigung setzen — erst dann mindern. Die Quoten richten sich nach Gerichtsurteilen (Heizungsausfall im Winter hoch, kleiner Schönheitsmangel gering). Im Zweifel Mieterverein oder Anwalt. Keine Rechtsberatung.</small>"; } }
,
kreditrate: { t:"Ratenkredit: Rate & Gesamtkosten", h:
 '<div class="row">'+inp("kr_summe","Kreditsumme (€)",12000,500)+inp("kr_zins","Nominalzins p. a. (%)",7,0.1)+inp("kr_jahre","Laufzeit (Jahre)",4)+'</div><div class="tres" id="kr_r"></div>',
 go(){ var s=num("kr_summe"), i=num("kr_zins")/100/12, n=num("kr_jahre")*12; var rate=i>0?s*i/(1-Math.pow(1+i,-n)):s/n; var ges=rate*n; var zins=ges-s;
   document.getElementById("kr_r").innerHTML = "Monatsrate: <b>"+fmtE(rate)+"</b><br>Gesamtkosten: <b>"+fmtE(ges)+"</b> · davon Zinsen: <b>"+fmtE(zins)+"</b><br><small>Annuitätenrechnung mit dem Nominalzins. Achte auf den <b>Effektivzins</b> — er enthält Gebühren und macht Angebote vergleichbar. Eine kürzere Laufzeit bedeutet weniger Zinsen, aber eine höhere Rate. Ein kostenloses Sondertilgungsrecht spart bei vorzeitiger Rückzahlung bares Geld.</small>"; } }
,
eauto: { t:"E-Auto laden: Kosten zu Hause vs. öffentlich", h:
 '<div class="row">'+inp("ev_verb","Verbrauch (kWh/100 km)",18,0.5)+inp("ev_km","Fahrleistung (km/Jahr)",12000,500)+'</div><div class="row">'+inp("ev_haus","Strompreis zu Hause (ct/kWh)",30,1)+inp("ev_oeff","öffentlich (ct/kWh)",55,1)+'</div><div class="tres" id="ev_r"></div>',
 go(){ var kwh=num("ev_verb")*num("ev_km")/100; var haus=kwh*num("ev_haus")/100; var oeff=kwh*num("ev_oeff")/100;
   document.getElementById("ev_r").innerHTML = "Stromverbrauch: ~<b>"+Math.round(kwh)+" kWh/Jahr</b><br>Laden zu Hause: <b>"+fmtE(haus)+"/Jahr</b> · öffentlich: <b>"+fmtE(oeff)+"/Jahr</b><br>Differenz: <b>"+fmtE(Math.abs(oeff-haus))+"/Jahr</b> zugunsten Heimladen<br><small>Zu Hause laden ist meist klar günstiger, vor allem mit eigener PV-Anlage oder Nacht-/Wärmepumpentarif. Die Anschaffung einer Wallbox solltest du einrechnen. Öffentliche Preise schwanken stark — Ad-hoc-Laden ist teurer als mit Ladekarte/App.</small>"; } }
,
mietenkaufen: { t:"Mieten oder kaufen?", h:
 '<div class="row">'+inp("mk_preis","Kaufpreis ohne Nebenkosten (€)",400000,5000)+inp("mk_ek","Eigenkapital (€)",90000,5000)+inp("mk_zins","Darlehenszins (%)",3.8,0.1)+'</div><div class="row">'+inp("mk_miete","Vergleichsmiete kalt (€/Monat)",1400,50)+inp("mk_jahre","Betrachtung (Jahre)",15,1)+inp("mk_rendite","Anlagerendite Eigenkapital (%)",5,0.5)+'</div><div class="tres" id="mk_r"></div>',
 go(){ var preis=num("mk_preis"), ek=num("mk_ek"), zins=num("mk_zins")/100, miete=num("mk_miete"), jahre=num("mk_jahre"), r=num("mk_rendite")/100;
   var nk=preis*0.10; var darlehen=Math.max(0,preis+nk-ek); var i=zins/12; var pay=darlehen*(zins+0.02)/12;
   var bal=darlehen, zinsKauf=0; for(var m=0;m<jahre*12 && bal>0.5;m++){ var zm=bal*i; var tilg=pay-zm; if(tilg<0)tilg=0; bal-=tilg; zinsKauf+=zm; } if(bal<0)bal=0;
   var instand=preis*0.01*jahre; var kaufV=nk+zinsKauf+instand; var getilgt=darlehen-bal;
   var mietV=miete*12*jahre; var ekErtrag=ek*(Math.pow(1+r,jahre)-1); var diff=Math.abs(kaufV-mietV);
   document.getElementById("mk_r").innerHTML = "Über "+jahre+" Jahre — nicht aufbauendes Wohngeld (ohne Vermögensaufbau):<br>Kaufen: <b>"+fmtE(kaufV)+"</b> (Nebenkosten "+fmtE(nk)+" + Zinsen "+fmtE(zinsKauf)+" + Instandhaltung "+fmtE(instand)+")<br>Mieten: <b>"+fmtE(mietV)+"</b> (Kaltmiete)<br>"+(kaufV<mietV?"Kaufen ist hier um <b>"+fmtE(diff)+"</b> günstiger":"Mieten ist hier um <b>"+fmtE(diff)+"</b> günstiger")+"<br><small>Vereinfachte Faustrechnung. Beim Kauf baust du zusätzlich Vermögen auf (getilgt ~"+fmtE(getilgt)+", Restschuld ~"+fmtE(bal)+"); als Mieter bleibt dein Eigenkapital angelegt (Ertrag ~"+fmtE(ekErtrag)+"). Nicht enthalten: Wert- und Mietsteigerung, Steuern, Umzugsflexibilität. Keine Finanzberatung.</small>"; } }
,
erbschaftsteuer: { t:"Erbschaft- und Schenkungsteuer", h:
 '<div class="row">'+inp("er_wert","Erbe oder Schenkung (€)",400000,10000)+sel("er_grad","Verhältnis zum Erblasser",[["500000:1","Ehe-/Lebenspartner — 500.000 €"],["400000:1","Kind/Stiefkind — 400.000 €"],["200000:1","Enkel — 200.000 €"],["100000:1","Eltern im Erbfall — 100.000 €"],["20000:2","Geschwister/Nichte/Neffe — 20.000 €"],["20000:3","nicht verwandt — 20.000 €"]])+'</div><div class="tres" id="er_r"></div>',
 go(){ var wert=num("er_wert"); var pr=document.getElementById("er_grad").value.split(":"); var frei=+pr[0], kl=+pr[1]; var st=Math.max(0,wert-frei);
   function rate(x,k){ var I=[[75000,7],[300000,11],[600000,15],[6000000,19],[13000000,23],[26000000,27],[1e15,30]]; var II=[[75000,15],[300000,20],[600000,25],[6000000,30],[13000000,35],[26000000,40],[1e15,43]]; var III=[[75000,30],[300000,30],[600000,30],[6000000,30],[13000000,50],[26000000,50],[1e15,50]]; var t=k===1?I:(k===2?II:III); for(var j=0;j<t.length;j++){ if(x<=t[j][0]) return t[j][1]; } return 30; }
   var rt=rate(st,kl); var steuer=st*rt/100;
   document.getElementById("er_r").innerHTML = "Freibetrag: <b>"+fmtE(frei)+"</b><br>Steuerpflichtiger Erwerb: <b>"+fmtE(st)+"</b><br>Steuersatz (Steuerklasse "+kl+"): ca. <b>"+rt+" %</b> → Steuer ~<b>"+fmtE(steuer)+"</b><br><small>Stark vereinfacht (voller Erwerb × Eingangssatz der Stufe; der reale Tarif kennt einen Härteausgleich an den Stufengrenzen). Freibeträge gelten je Erbfall bzw. Schenkung und lassen sich alle zehn Jahre neu nutzen — ein starkes Gestaltungsmittel. Das selbst genutzte Familienheim bleibt für Ehepartner und Kinder unter Bedingungen steuerfrei. Keine Steuerberatung.</small>"; } }
,
abfindung: { t:"Abfindung: Orientierungswert", h:
 '<div class="row">'+inp("ab_brutto","Bruttomonatsgehalt (€)",4000,100)+inp("ab_jahre","Beschäftigungsjahre",8,1)+sel("ab_faktor","Faktor",[["0.25","0,25 (niedrig)"],["0.5","0,5 (Regelfall)"],["0.75","0,75"],["1","1,0 (stark)"]])+'</div><div class="tres" id="ab_r"></div>',
 go(){ var b=num("ab_brutto"), j=num("ab_jahre"), f=parseFloat(document.getElementById("ab_faktor").value); var abf=b*j*f;
   document.getElementById("ab_r").innerHTML = "Orientierungswert Abfindung: <b>"+fmtE(abf)+"</b><br><small>Faustformel: Faktor × Bruttomonatsgehalt × Beschäftigungsjahre (angefangene Jahre werden oft aufgerundet). Ein gesetzlicher Anspruch besteht nur in Sonderfällen (etwa § 1a KSchG oder Sozialplan); meist ist die Abfindung Verhandlungssache, häufig im gerichtlichen Vergleich. Steuerlich voll pflichtig, aber die Fünftelregelung mildert die Progression. Achtung: Bei einem Aufhebungsvertrag droht eine Sperrzeit beim Arbeitslosengeld. Keine Rechtsberatung.</small>"; } }
,
fluggastrechte: { t:"Fluggastrechte (EU): Entschädigung", h:
 '<div class="row">'+inp("fl_dist","Flugdistanz (km)",1500,100)+inp("fl_delay","Ankunftsverspätung (Std.)",4,1)+sel("fl_typ","Fall",[["delay","Verspätung"],["annul","Annullierung (kurzfristig)"]])+'</div><div class="tres" id="fl_r"></div>',
 go(){ var d=num("fl_dist"), v=num("fl_delay"), typ=document.getElementById("fl_typ").value; var betr=d<=1500?250:(d<=3500?400:600);
   if(typ==="delay"){ if(v<3) betr=0; else if(d>3500 && v<4) betr=300; }
   document.getElementById("fl_r").innerHTML = (betr>0?"Mögliche Entschädigung: <b>"+fmtE(betr)+" pro Person</b>":"Unter 3 Std. Verspätung: <b>keine Entschädigung</b>")+"<br><small>EU-Fluggastrechte (Verordnung 261/2004) gelten bei Abflug in der EU oder bei Ankunft in der EU mit einer EU-Airline. Voraussetzung ist eine Ankunft von mindestens drei Stunden zu spät oder eine kurzfristige Annullierung — und die Airline muss verantwortlich sein (außergewöhnliche Umstände wie Unwetter oder ein Streik der Flugsicherung schließen die Zahlung aus). Zusätzlich bestehen Betreuungsleistungen wie Verpflegung und Hotel. Ansprüche verjähren je nach Land erst nach mehreren Jahren. Keine Rechtsberatung.</small>"; } }
,
krankengeldschaetzer: { t:"Krankengeld schätzen", h:
 '<div class="row">'+inp("kg_brutto","Bruttoentgelt (€/Monat)",3500,100)+inp("kg_netto","Nettoentgelt (€/Monat)",2300,100)+'</div><div class="tres" id="kg_r"></div>',
 go(){ var b=num("kg_brutto"), n=num("kg_netto"); var brk=Math.min(b*0.70,n*0.90); var net=brk*(1-0.125);
   document.getElementById("kg_r").innerHTML = "Krankengeld brutto: ~<b>"+fmtE(brk)+"/Monat</b> (70 % vom Brutto, höchstens 90 % vom Netto)<br>nach Sozialabgaben ca. <b>"+fmtE(net)+"/Monat</b><br><small>Greift nach sechs Wochen Lohnfortzahlung und wird von der gesetzlichen Krankenkasse für dieselbe Erkrankung bis zu 78 Wochen (innerhalb von drei Jahren) gezahlt. Es gilt eine Höchstgrenze (Beitragsbemessungsgrenze). Vom Krankengeld gehen noch Beiträge zur Renten-, Arbeitslosen- und Pflegeversicherung ab. Privat Versicherte sichern den Verdienstausfall über ein Krankentagegeld ab. Keine Beratung.</small>"; } }









};
const TC = { go(){ if(ACTIVE_TOOL && TOOLS[ACTIVE_TOOL]) TOOLS[ACTIVE_TOOL].go(); } };
function renderTool(tid){
  const t = TOOLS[tid]; if(!t) return "";
  return '<div class="tool"><h5>🧮 '+t.t+'</h5>'+t.h+'</div>';
}
window.LW_TOOLS={TOOLS:TOOLS,TC:TC,renderTool:renderTool,setActive:function(t){ACTIVE_TOOL=t;}};
window.TC=TC;
