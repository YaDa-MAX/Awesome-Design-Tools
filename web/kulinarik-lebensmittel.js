/* HeiBen Lebensmittel-Datenbank — Nährwerte je 100 g (Richtwerte). window.HeiBenFood */
(function(){
  // Felder: energie(kcal),eiweiss,kh,fett,ballast,vitc(mg),vitd(µg),eisen(mg),calcium(mg),magnesium(mg)
  function f(n,kat,e,p,k,fe,b,vc,vd,fs,ca,mg){ return {id:n.toLowerCase().replace(/[^a-z0-9]+/g,'-'),n:n,kat:kat,per100:{energie:e,eiweiss:p,kh:k,fett:fe,ballast:b,vitc:vc,vitd:vd,eisen:fs,calcium:ca,magnesium:mg}}; }
  var DB=[
    f('Haferflocken','Getreide',370,13,59,7,10,0,0,4.3,54,130),
    f('Vollkornbrot','Getreide',220,8,40,3,7,0,0,2.5,40,60),
    f('Reis, gekocht','Getreide',130,2.7,28,0.3,0.4,0,0,0.2,10,12),
    f('Vollkornnudeln, gekocht','Getreide',124,5,26,0.5,3.9,0,0,1.1,15,43),
    f('Quinoa, gekocht','Getreide',120,4.4,21,1.9,2.8,0,0,1.5,17,64),
    f('Kartoffel, gekocht','Gemüse',87,2,20,0.1,1.8,13,0,0.3,8,20),
    f('Brokkoli','Gemüse',34,2.8,7,0.4,2.6,89,0,0.7,47,21),
    f('Spinat','Gemüse',23,2.9,3.6,0.4,2.2,28,0,2.7,99,79),
    f('Karotte','Gemüse',41,0.9,10,0.2,2.8,5.9,0,0.3,33,12),
    f('Tomate','Gemüse',18,0.9,3.9,0.2,1.2,14,0,0.3,10,11),
    f('Paprika','Gemüse',31,1,6,0.3,2.1,128,0,0.4,7,12),
    f('Avocado','Obst',160,2,9,15,7,10,0,0.6,12,29),
    f('Apfel','Obst',52,0.3,14,0.2,2.4,12,0,0.1,6,5),
    f('Banane','Obst',89,1.1,23,0.3,2.6,9,0,0.3,5,27),
    f('Ei','Protein',155,13,1.1,11,0,0,2,1.8,56,12),
    f('Hähnchenbrust','Protein',165,31,0,3.6,0,0,0.1,0.7,5,29),
    f('Lachs','Protein',208,20,0,13,0,0,11,0.3,9,29),
    f('Rinderhack','Protein',250,26,0,17,0,0,0.1,2.6,18,21),
    f('Tofu','Protein',144,15,3,9,1,0.1,0,2.7,350,58),
    f('Linsen, gekocht','Hülsenfrucht',116,9,20,0.4,8,1.5,0,3.3,19,36),
    f('Kichererbsen, gekocht','Hülsenfrucht',164,9,27,2.6,8,1.3,0,2.9,49,48),
    f('Kidneybohnen, gekocht','Hülsenfrucht',127,8.7,23,0.5,7.4,1.2,0,2.9,35,45),
    f('Joghurt natur','Milch',61,3.5,4.7,3.3,0,0.5,0.1,0.1,121,12),
    f('Milch','Milch',64,3.4,4.8,3.6,0,0,0.1,0.1,120,11),
    f('Haferdrink','Milch',45,0.3,6.6,1.5,0.8,0,1.5,0.2,120,5),
    f('Gouda','Milch',356,25,2.2,27,0,0,0.5,0.3,700,29),
    f('Feta','Milch',264,14,4,21,0,0,0.4,0.2,360,19),
    f('Mandeln','Nüsse',579,21,22,50,12,0,0,3.7,269,270),
    f('Walnüsse','Nüsse',654,15,14,65,7,1.3,0,2.9,98,158),
    f('Olivenöl','Fett',884,0,0,100,0,0,0,0.6,1,0),
    f('Butter','Fett',717,0.9,0.1,81,0,0,1.5,0,24,2),
    f('Honig','Sonstiges',304,0.3,82,0,0.2,0.5,0,0.4,6,2)
  ];
  function search(q){ q=(q||'').trim().toLowerCase(); if(!q) return DB.slice(0,8);
    return DB.filter(function(x){ return x.n.toLowerCase().indexOf(q)>=0 || x.kat.toLowerCase().indexOf(q)>=0; }).slice(0,12); }
  function byId(id){ for(var i=0;i<DB.length;i++) if(DB[i].id===id) return DB[i]; return null; }
  function scale(per100, gram){ var o={}; var f=gram/100; for(var k in per100) o[k]=Math.round(per100[k]*f*10)/10; return o; }
  window.HeiBenFood={ DB:DB, search:search, byId:byId, scale:scale };
})();
