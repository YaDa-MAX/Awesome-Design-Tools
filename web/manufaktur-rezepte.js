/* HeiBen Manufaktur — Fertigungsrezept-Datenbank je Standardartikel.
   Effizient: gespeichert wird das Rezept (Geometrie-Typ + Parameter + Slicing-Profil),
   nicht der fertige (große) G-code. Maschinencode/STL werden daraus on demand erzeugt
   (window.HeiBenGestalten.gcodeRecipe / stlRecipe). Personalisierbare Artikel tragen ein
   perso-Schema; die Kundeneingaben (text/line2/Bild) fließen in die Geometrie ein. */
(function(){
'use strict';
function P(material,layerHeight,infill,perimeters){ return {material:material,layerHeight:layerHeight,infill:infill,perimeters:perimeters}; }

var R={
  /* ---- parametrisch generierbar ---- */
  vase:        {name:'Vase „Rille"', kat:'Wohnen', typ:'vase', params:{rb:40,rt:45,H:150,wall:2,twist:0}, profil:P('PETG',0.2,0,2)},
  topf:        {name:'Pflanztopf + Untersetzer', kat:'Garten', typ:'vase', params:{rb:55,rt:60,H:95,wall:2.5,twist:0}, profil:P('PETG',0.24,0,3)},
  leuchte:     {name:'Leuchtenschirm „Falte"', kat:'Wohnen', typ:'vase', params:{rb:55,rt:95,H:170,wall:1.6,twist:0}, profil:P('PLA satiniert',0.2,0,2)},
  stiftekoecher:{name:'Stifteköcher „Welle"', kat:'Schreibtisch', typ:'vase', params:{rb:35,rt:38,H:95,wall:2,twist:0}, profil:P('PLA',0.24,0,3)},
  organizer:   {name:'Schubladen-Organizer', kat:'Alltag', typ:'box', params:{W:120,D:80,H:45,wall:2,bottom:2}, profil:P('PLA',0.24,0.12,2)},
  kabeltray:   {name:'Kabel-Tray (Untertisch)', kat:'Schreibtisch', typ:'box', params:{W:160,D:70,H:45,wall:2.4,bottom:2.4}, profil:P('PETG',0.24,0.12,3)},
  untersetzer: {name:'Untersetzer-Set (4)', kat:'Wohnen', typ:'relief', params:{W:95,D:95,t:4,r:0}, profil:P('PETG',0.2,0.2,3)},
  schluesselbrett:{name:'Schlüsselbrett „Magnet"', kat:'Alltag', typ:'relief', params:{W:160,D:40,t:6,r:0}, profil:P('PLA',0.24,0.18,3)},
  lesezeichen: {name:'Lesezeichen-Set (2)', kat:'Geschenke', typ:'relief', params:{W:120,D:40,t:2,r:0.8,text:'HeiBen'}, profil:P('PETG',0.16,0.3,3), perso:[{k:'text',label:'Text (optional)',v:''}]},
  koord:       {name:'Koordinaten-Schild', kat:'Geschenke', typ:'relief', params:{W:120,D:80,t:4,r:1.4,text:'Köln',line2:'50.94, 6.96 · 2026'}, profil:P('PLA zweifarbig',0.2,0.25,3),
                perso:[{k:'text',label:'Ort',v:'Köln'},{k:'line2',label:'Koordinaten · Datum',v:'50.94, 6.96 · 2026'}]},
  tuerschild:  {name:'Türschild Kinderzimmer', kat:'Kinder', typ:'relief', params:{W:120,D:70,t:4,r:1.6,text:'Lina'}, profil:P('PLA zweifarbig',0.2,0.25,3),
                perso:[{k:'text',label:'Name',v:'Lina'},{k:'line2',label:'Zusatz (optional)',v:''}]},
  keychain:    {name:'Anhänger „Heimat"', kat:'Geschenke', typ:'relief', params:{W:48,D:22,t:3,r:1.2,text:'Heimat'}, profil:P('PETG',0.2,0.3,3),
                perso:[{k:'text',label:'Text',v:'Heimat'}]},
  kraeuterschild:{name:'Kräuterschilder (6)', kat:'Garten', typ:'relief', params:{W:70,D:20,t:3,r:1.0,text:'Basilikum'}, profil:P('PETG',0.2,0.25,3),
                perso:[{k:'text',label:'Kräutername',v:'Basilikum'}]},
  relieftile:  {name:'Stadtrelief (Kachel)', kat:'Architektur', typ:'relief', params:{W:120,D:120,t:5,r:2.2,text:'Köln'}, profil:P('PLA',0.16,0.2,3),
                perso:[{k:'text',label:'Straße / Ort',v:'Ehrenfeld'},{k:'_img',label:'Karte/Bild (optional)',t:'file'}]},

  /* ---- extern: Maschinencode aus hinterlegter CAD/STL (komplex, nicht primitiv) ---- */
  handystand:  {name:'Handy-/Tablet-Ständer', kat:'Schreibtisch', typ:'extern', datei:'handystand.stl', profil:P('PETG',0.2,0.2,3)},
  kopfhoerer:  {name:'Kopfhörer-Halter', kat:'Schreibtisch', typ:'extern', datei:'kopfhoerer.stl', profil:P('PETG',0.2,0.2,3)},
  buchstuetze: {name:'Buchstützen (Paar)', kat:'Schreibtisch', typ:'extern', datei:'buchstuetze.stl', profil:P('PLA',0.24,0.3,3)},
  tuerstopper: {name:'Türstopper „Keil"', kat:'Alltag', typ:'extern', datei:'tuerstopper.stl', profil:P('Flex-TPU',0.2,0.2,3)},
  haken:       {name:'Wandhaken-Set (3)', kat:'Alltag', typ:'extern', datei:'haken.stl', profil:P('PETG',0.2,0.25,3)},
  brillenhalter:{name:'Brillenhalter', kat:'Alltag', typ:'extern', datei:'brillenhalter.stl', profil:P('PLA',0.2,0.2,3)},
  fernbedienung:{name:'Fernbedienungs-Ablage', kat:'Alltag', typ:'extern', datei:'fernbedienung.stl', profil:P('PLA',0.2,0.2,3)},
  kochbuch:    {name:'Kochbuch-/Tablet-Halter', kat:'Küche', typ:'extern', datei:'kochbuch.stl', profil:P('PETG',0.2,0.2,3)},
  flaschenstopfen:{name:'Flaschenverschluss-Set (2)', kat:'Küche', typ:'extern', datei:'flaschenstopfen.stl', profil:P('Food-safe PETG',0.16,0.4,3)},
  gewuerz:     {name:'Magnet-Gewürzhalter (3)', kat:'Küche', typ:'extern', datei:'gewuerz.stl', profil:P('Food-safe PETG',0.2,0.2,3)},
  eierbecher:  {name:'Eierbecher (2)', kat:'Küche', typ:'extern', datei:'eierbecher.stl', profil:P('Food-safe PETG',0.2,0.15,3)},
  kekskoeln:   {name:'Ausstecher-Set „Köln"', kat:'Küche', typ:'extern', datei:'ausstecher-koeln.stl', profil:P('Food-safe PETG',0.16,0.2,2)},
  kekswelt:    {name:'Ausstecher „Länderküche"', kat:'Küche', typ:'extern', datei:'ausstecher-land.stl', profil:P('Food-safe PETG',0.16,0.2,2),
                perso:[{k:'text',label:'Land',v:'Italien'}]},
  schoko:      {name:'Schokoform „Fünf Häuser"', kat:'Küche', typ:'extern', datei:'schokoform.stl', profil:P('Food-safe Resin',0.05,1,0)},
  schlauchhalter:{name:'Schlauch-/Kabelhalter', kat:'Garten', typ:'extern', datei:'schlauchhalter.stl', profil:P('PETG',0.24,0.25,3)},
  nachtlicht:  {name:'Nachtlicht „Mond"', kat:'Kinder', typ:'extern', datei:'nachtlicht.stl', profil:P('PLA lichtdurchlässig',0.16,0.1,2)},
  wuerfelturm: {name:'Würfelturm (Dice Tower)', kat:'Kinder', typ:'extern', datei:'wuerfelturm.stl', profil:P('PLA',0.24,0.15,3)},
  zuhause:     {name:'Miniatur „Dein Zuhause"', kat:'Geschenke', typ:'extern', datei:'zuhause.stl', profil:P('Resin',0.05,1,0),
                perso:[{k:'text',label:'Adresse',v:''}]},
  figmini:     {name:'Mini-Figur nach Foto', kat:'Geschenke', typ:'extern', datei:'figur.stl', profil:P('Resin',0.05,1,0),
                perso:[{k:'text',label:'Name / Anlass',v:''}]},
  modell:      {name:'Architektur-Modell 1:200', kat:'Architektur', typ:'extern', datei:'modell.stl', profil:P('Resin/PLA',0.1,0.15,3)},
  ersatz:      {name:'Möbel-Ersatzteil', kat:'Ersatzteile', typ:'extern', datei:'ersatzteil.stl', profil:P('PETG',0.2,0.3,3), perso:[{k:'text',label:'Beschreibung/Maße',v:''}]},
  kabelclips:   {name:'Kabelclips-Set (5)', kat:'Schreibtisch', typ:'extern', datei:'kabelclips.stl', profil:P('PETG',0.2,0.25,3)},
  'set-schreibtisch':{name:'Set „Schreibtisch"', kat:'Sets', typ:'extern', datei:'set-schreibtisch.3mf', profil:P('PETG',0.2,0.2,3)},
  'set-wohnung':{name:'Set „Erste Wohnung"', kat:'Sets', typ:'extern', datei:'set-wohnung.3mf', profil:P('PETG',0.2,0.2,3)}
};

window.HeiBenRezepte={
  recipes:R,
  get:function(id){ return R[id]||null; },
  perso:function(id){ return (R[id]&&R[id].perso)||null; },
  isPerso:function(id){ return !!(R[id]&&R[id].perso); },
  ids:function(){ return Object.keys(R); },
  parametrisch:function(){ return Object.keys(R).filter(function(k){return R[k].typ!=='extern';}); }
};
})();
