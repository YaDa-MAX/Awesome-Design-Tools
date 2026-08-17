/* HeiBen Manufaktur — Selbst gestalten (parametrische 3D-Engine)
   Erzeugt Geometrie clientseitig, schätzt Gewicht/Druckzeit deterministisch,
   liest die Admin-Kostenhebel (heiben-kalk-annahmen + heiben-kalk-eigendesign)
   und exportiert STL sowie einen G-code-Entwurf (Maschinenanweisung). */
(function(){
'use strict';
var W=window;

/* ---------------- Kostenhebel (vom Admin) ---------------- */
var DEF_A={anschaffung:1200,lebensdauer:5000,watt:120,strompreis:0.32,wartung:0.12,
  arbeit:32,setup:6,postK1:1,postK2:5,postK3:12,abfall:7,ausschuss:8,kf1:1.00,kf2:1.12,kf3:1.30,
  verpAuftrag:1.00,verpStueck:0.35,overhead:18,gebuehr:2.9,marge:40,mwst:19,
  mats:{'PLA':22,'PETG':22,'PLA satiniert':24,'PLA lichtdurchlässig':24,'PLA zweifarbig':24,'Flex-TPU':30,'Food-safe PETG':28,'Resin':40,'Food-safe Resin':45,'Resin/PLA':32,'PETG/PLA':22}};
var DEF_E={pruefzeit:12,fehldruckAufschlag:12,handarbeit:20,zielmarge:50,minPreis:15,durchsatz:13};
var DENS={'PLA':1.24,'PETG':1.27,'PLA satiniert':1.24,'PLA lichtdurchlässig':1.24,'PLA zweifarbig':1.24,'Flex-TPU':1.20,'Food-safe PETG':1.27,'Resin':1.10,'Food-safe Resin':1.10,'Resin/PLA':1.18,'PETG/PLA':1.25};
function loadJSON(k){ try{return JSON.parse(localStorage.getItem(k));}catch(e){return null;} }
function A(){ var a=loadJSON('heiben-kalk-annahmen'); if(a){a.mats=Object.assign({},DEF_A.mats,a.mats||{});return Object.assign({},DEF_A,a);} return JSON.parse(JSON.stringify(DEF_A)); }
function E(){ var e=loadJSON('heiben-kalk-eigendesign'); return e?Object.assign({},DEF_E,e):JSON.parse(JSON.stringify(DEF_E)); }

/* ---------------- Geometrie-Helfer (Triangle-Soup) ---------------- */
function Mesh(){ this.t=[]; } // flache Liste: [ax,ay,az,bx,by,bz,cx,cy,cz, ...]
Mesh.prototype.tri=function(a,b,c){ this.t.push(a[0],a[1],a[2],b[0],b[1],b[2],c[0],c[1],c[2]); };
Mesh.prototype.quad=function(a,b,c,d){ this.tri(a,b,c); this.tri(a,c,d); };
Mesh.prototype.array=function(){ return new Float32Array(this.t); };
Mesh.prototype.volume_cm3=function(){ // signierte Tetraeder-Summe (mm^3 -> cm^3)
  var v=0,t=this.t; for(var i=0;i<t.length;i+=9){
    var ax=t[i],ay=t[i+1],az=t[i+2],bx=t[i+3],by=t[i+4],bz=t[i+5],cx=t[i+6],cy=t[i+7],cz=t[i+8];
    v+=(ax*(by*cz-bz*cy)-ay*(bx*cz-bz*cx)+az*(bx*cy-by*cx));
  } return Math.abs(v)/6/1000;
};
Mesh.prototype.bbox=function(){ var t=this.t,mx=[1e9,1e9,1e9],Mx=[-1e9,-1e9,-1e9];
  for(var i=0;i<t.length;i+=3){for(var k=0;k<3;k++){mx[k]=Math.min(mx[k],t[i+k]);Mx[k]=Math.max(Mx[k],t[i+k]);}}
  return {min:mx,max:Mx,dx:Mx[0]-mx[0],dy:Mx[1]-mx[1],dz:Mx[2]-mx[2]}; };

/* Heightmap-Solid: Grundplatte W×D (mm), Sockeldicke t, Relief r aus Sampler(u,v)∈[0,1] */
function reliefSolid(Wmm,Dmm,t,r,sampler,Nx){
  Nx=Nx||110; var Ny=Math.max(8,Math.round(Nx*Dmm/Wmm));
  var m=new Mesh(); var top=[], bot=[];
  function P(i,j,z){ return [ -Wmm/2 + Wmm*i/(Nx-1), -Dmm/2 + Dmm*j/(Ny-1), z ]; }
  var H=[]; for(var j=0;j<Ny;j++){H[j]=[];for(var i=0;i<Nx;i++){var s=sampler? sampler(i/(Nx-1), j/(Ny-1)) : 0; H[j][i]=t + r*s;}}
  for(j=0;j<Ny-1;j++)for(i=0;i<Nx-1;i++){
    m.quad(P(i,j,H[j][i]),P(i+1,j,H[j][i+1]),P(i+1,j+1,H[j+1][i+1]),P(i,j+1,H[j+1][i])); // top
    m.quad(P(i,j+1,0),P(i+1,j+1,0),P(i+1,j,0),P(i,j,0)); // bottom
  }
  for(i=0;i<Nx-1;i++){ // front/back walls
    m.quad(P(i,0,0),P(i+1,0,0),P(i+1,0,H[0][i+1]),P(i,0,H[0][i]));
    m.quad(P(i,Ny-1,H[Ny-1][i]),P(i+1,Ny-1,H[Ny-1][i+1]),P(i+1,Ny-1,0),P(i,Ny-1,0));
  }
  for(j=0;j<Ny-1;j++){ // left/right walls
    m.quad(P(0,j,H[j][0]),P(0,j+1,H[j+1][0]),P(0,j+1,0),P(0,j,0));
    m.quad(P(Nx-1,j,0),P(Nx-1,j+1,0),P(Nx-1,j+1,H[j+1][Nx-1]),P(Nx-1,j,H[j][Nx-1]));
  }
  m._foot=[[-Wmm/2,-Dmm/2],[Wmm/2,-Dmm/2],[Wmm/2,Dmm/2],[-Wmm/2,Dmm/2]];
  return m;
}

/* Box / Behälter: außen Wmm×Dmm×Hmm, Wandstärke wt, Boden bt, offen oben */
function boxSolid(Wmm,Dmm,Hmm,wt,bt){
  var m=new Mesh();
  var ox=Wmm/2, oy=Dmm/2, ix=ox-wt, iy=oy-wt;
  function B(x,y,z){return [x,y,z];}
  // Außenwände
  var o=[[-ox,-oy],[ox,-oy],[ox,oy],[-ox,oy]];
  for(var k=0;k<4;k++){var a=o[k],b=o[(k+1)%4];
    m.quad(B(a[0],a[1],0),B(b[0],b[1],0),B(b[0],b[1],Hmm),B(a[0],a[1],Hmm));}
  // Innenwände (Normalen nach innen)
  var ii=[[-ix,-iy],[ix,-iy],[ix,iy],[-ix,iy]];
  for(k=0;k<4;k++){a=ii[k];b=ii[(k+1)%4];
    m.quad(B(a[0],a[1],Hmm),B(b[0],b[1],Hmm),B(b[0],b[1],bt),B(a[0],a[1],bt));}
  // Boden außen unten + innen (oberseite des Bodens)
  m.quad(B(-ox,oy,0),B(ox,oy,0),B(ox,-oy,0),B(-ox,-oy,0));
  m.quad(B(-ix,-iy,bt),B(ix,-iy,bt),B(ix,iy,bt),B(-ix,iy,bt));
  // oberer Rand (Ring)
  for(k=0;k<4;k++){a=o[k];b=o[(k+1)%4];var ai=ii[k],bi=ii[(k+1)%4];
    m.quad(B(a[0],a[1],Hmm),B(b[0],b[1],Hmm),B(bi[0],bi[1],Hmm),B(ai[0],ai[1],Hmm));}
  m._foot=o; m._wallVol=(Wmm*Dmm*Hmm-(Wmm-2*wt)*(Dmm-2*wt)*(Hmm-bt))/1000; // cm3 Material (Wand+Boden)
  return m;
}

/* Vase: Polygon-Querschnitt (sides) von r_unten zu r_oben über Höhe, Wand wt, optional Twist (Grad gesamt) */
function vaseSolid(rb,rt,Hmm,wt,twistDeg,sides,rings){
  sides=sides||64; rings=rings||40; var m=new Mesh();
  function ring(rad,z,rot){var pts=[];for(var s=0;s<sides;s++){var a=rot+2*Math.PI*s/sides;pts.push([rad*Math.cos(a),rad*Math.sin(a),z]);}return pts;}
  var outer=[],inner=[];
  for(var i=0;i<=rings;i++){var f=i/rings; var r=rb+(rt-rb)*f; var z=Hmm*f; var rot=(twistDeg||0)*Math.PI/180*f;
    outer.push(ring(r,z,rot)); inner.push(ring(Math.max(0.6,r-wt),z,rot)); }
  for(i=0;i<rings;i++)for(var s=0;s<sides;s++){var s2=(s+1)%sides;
    m.quad(outer[i][s],outer[i][s2],outer[i+1][s2],outer[i+1][s]);          // außen
    m.quad(inner[i+1][s],inner[i+1][s2],inner[i][s2],inner[i][s]);          // innen
  }
  // Boden (massiv unten) + oberer Rand
  var cb=[0,0,0]; for(s=0;s<sides;s++){var s2=(s+1)%sides; m.tri(cb,outer[0][s2],outer[0][s]);}
  // Innenboden auf Höhe wt (massiver Sockel)
  var ib=[0,0,wt]; for(s=0;s<sides;s++){s2=(s+1)%sides; m.tri(inner[0][s],inner[0][s2],ib);} 
  // Sockelwand schließen zwischen outer[0] unten und inner[0] bei z=wt? Boden als massiver Block:
  for(s=0;s<sides;s++){s2=(s+1)%sides; m.quad(outer[0][s],outer[0][s2],inner[0][s2],inner[0][s]);}
  // oberer Rand
  for(s=0;s<sides;s++){s2=(s+1)%sides; m.quad(outer[rings][s],outer[rings][s2],inner[rings][s2],inner[rings][s]);}
  m._foot=ring(Math.max(rb,rt),0,0).map(function(p){return [p[0],p[1]];});
  m._wallVol=null; // über Mesh-Volumen
  return m;
}

/* ---------------- Text/Bild -> Sampler (Relief) ---------------- */
function textSampler(text, line2, Wmm, Dmm, img){
  var px=Math.round(Wmm*4), py=Math.round(Dmm*4);
  var cv=document.createElement('canvas'); cv.width=px; cv.height=py;
  var ctx=cv.getContext('2d'); ctx.fillStyle='#000'; ctx.fillRect(0,0,px,py);
  if(img){ try{ var iw=img.width,ih=img.height; var sc=Math.min(px/iw,py/ih)*0.92; var w=iw*sc,h=ih*sc; ctx.globalAlpha=1; ctx.drawImage(img,(px-w)/2,(py-h)/2,w,h);}catch(e){} }
  ctx.fillStyle='#fff'; ctx.textAlign='center'; ctx.textBaseline='middle';
  ctx.font='700 '+Math.round(py*(line2?0.34:0.5))+'px Fraunces, Georgia, serif';
  if(text){ ctx.fillText(text, px/2, line2? py*0.36 : py*0.5); }
  if(line2){ ctx.font='600 '+Math.round(py*0.24)+'px Manrope, Arial, sans-serif'; ctx.fillText(line2, px/2, py*0.7); }
  var data=ctx.getImageData(0,0,px,py).data;
  return function(u,v){ var x=Math.min(px-1,Math.floor(u*px)), y=Math.min(py-1,Math.floor((1-v)*py));
    var idx=(y*px+x)*4; return data[idx]/255; }; // Luminanz aus Rotkanal (weiß=1)
}

/* ---------------- STL (binär) ---------------- */
function toSTL(tris){
  var n=tris.length/9; var buf=new ArrayBuffer(84+n*50); var dv=new DataView(buf); var o=84; dv.setUint32(80,n,true);
  for(var i=0;i<n;i++){ var b=i*9;
    var ux=tris[b+3]-tris[b],uy=tris[b+4]-tris[b+1],uz=tris[b+5]-tris[b+2];
    var vx=tris[b+6]-tris[b],vy=tris[b+7]-tris[b+1],vz=tris[b+8]-tris[b+2];
    var nx=uy*vz-uz*vy,ny=uz*vx-ux*vz,nz=ux*vy-uy*vx,l=Math.hypot(nx,ny,nz)||1;
    dv.setFloat32(o,nx/l,true);dv.setFloat32(o+4,ny/l,true);dv.setFloat32(o+8,nz/l,true);o+=12;
    for(var k=0;k<9;k++){dv.setFloat32(o,tris[b+k],true);o+=4;} dv.setUint16(o,0,true);o+=2;
  } return new Blob([buf],{type:'application/sla'});
}

/* ---------------- G-code-Entwurf (Hüllkörper aus Footprint, extrudiert) ---------------- */
function toGcode(foot, Hmm, material, opts){
  opts=opts||{}; var lh=opts.layerH||0.2, lw=opts.lineW||0.42, infill=opts.infill||0.20;
  var temp = /Resin/.test(material)?210 : /TPU/.test(material)?225 : /PETG/.test(material)?240 : 205;
  var bed = /PETG/.test(material)?80 : /PLA/.test(material)?60 : 55;
  // Footprint-Bounds + nach Druckbettmitte (110,110) verschieben
  var xs=foot.map(function(p){return p[0];}), ys=foot.map(function(p){return p[1];});
  var minx=Math.min.apply(0,xs),maxx=Math.max.apply(0,xs),miny=Math.min.apply(0,ys),maxy=Math.max.apply(0,ys);
  var w=maxx-minx,d=maxy-miny, cx=110-(minx+w/2), cy=110-(miny+d/2);
  var g=[]; var EA=0; var fil=1.75, area=Math.PI*fil*fil/4;
  function e(dist,wmul){ EA += (lw*lh*dist)/area*(wmul||1); return EA.toFixed(5); }
  g.push('; HeiBen Manufaktur — Eigendesign · G-code-ENTWURF (Hüllkörper)');
  g.push('; Material: '+material+'  Layer: '+lh+'mm  Linie: '+lw+'mm  Infill: '+Math.round(infill*100)+'%');
  g.push('; ACHTUNG: unvalidierter Entwurf — finale Maschinenanweisung erst nach manueller Freigabe (Copyright/Machbarkeit).');
  g.push('M140 S'+bed,'M104 S'+temp,'M190 S'+bed,'M109 S'+temp,'G21','G90','M82','G28','G92 E0');
  var nLayers=Math.max(1,Math.round(Hmm/lh)); var perim=opts.perim||3;
  for(var L=0;L<nLayers;L++){ var z=((L+1)*lh).toFixed(2); g.push('G1 Z'+z+' F900','; layer '+(L+1)+'/'+nLayers);
    for(var p=0;p<perim;p++){ var ins=lw*(p+0.5);
      var x0=minx+ins+cx, x1=maxx-ins+cx, y0=miny+ins+cy, y1=maxy-ins+cy;
      if(x1<=x0||y1<=y0) break;
      g.push('G0 X'+x0.toFixed(2)+' Y'+y0.toFixed(2)+' F4800','G92 E0');
      g.push('G1 X'+x1.toFixed(2)+' Y'+y0.toFixed(2)+' E'+e(x1-x0)+' F1500');
      g.push('G1 X'+x1.toFixed(2)+' Y'+y1.toFixed(2)+' E'+e(y1-y0));
      g.push('G1 X'+x0.toFixed(2)+' Y'+y1.toFixed(2)+' E'+e(x1-x0));
      g.push('G1 X'+x0.toFixed(2)+' Y'+y0.toFixed(2)+' E'+e(y1-y0));
    }
    // Rectilinear-Infill (entfällt bei infill<=0 => Vase-/Wand-Modus)
    if(infill>0){
    var step=lw/Math.max(0.05,infill); var fx0=minx+perim*lw+cx, fx1=maxx-perim*lw+cx, fy0=miny+perim*lw+cy, fy1=maxy-perim*lw+cy;
    var dir=L%2; var yy;
    if(fx1>fx0&&fy1>fy0){ g.push('G92 E0');
      if(dir){ for(yy=fy0;yy<=fy1;yy+=step){ g.push('G0 X'+fx0.toFixed(2)+' Y'+yy.toFixed(2)+' F4800'); g.push('G1 X'+fx1.toFixed(2)+' Y'+yy.toFixed(2)+' E'+e(fx1-fx0)+' F1800'); } }
      else { for(var xx=fx0;xx<=fx1;xx+=step){ g.push('G0 X'+xx.toFixed(2)+' Y'+fy0.toFixed(2)+' F4800'); g.push('G1 X'+xx.toFixed(2)+' Y'+fy1.toFixed(2)+' E'+e(fy1-fy0)+' F1800'); } }
    }
    }
  }
  g.push('G1 E'+(EA-2).toFixed(5)+' F2100','M104 S0','M140 S0','G28 X0','M84','; Ende Entwurf');
  return new Blob([g.join('\n')],{type:'text/plain'});
}

/* ---------------- Kalkulation (Serie-Modell + Eigendesign-Aufschläge) ---------------- */
function weightG(vol_cm3, material, infill, solid){ var d=DENS[material]||1.24; var f= solid? (0.30+0.70*infill) : 1; return vol_cm3*d*f; }
function estTimeH(wG, hMm){ return wG/(E().durchsatz||13) + hMm/100; }
function price(wG, hMm, material){
  var a=A(), e=E();
  var maschstd=(a.anschaffung/a.lebensdauer)+(a.watt/1000*a.strompreis)+a.wartung;
  var kg=a.mats[material]||22;
  var ausschuss=(a.ausschuss+e.fehldruckAufschlag)/100;
  var zielmarge=Math.max(a.marge,e.zielmarge)/100;
  var mat=wG*kg/1000*(1+a.abfall/100), masch=hMm===0?0:hMm, maschk=estTimeH(wG,hMm)*maschstd;
  var nach=a.postK3/60*a.arbeit, pruef=e.pruefzeit/60*a.arbeit, setup=a.setup/60*a.arbeit, verp=a.verpStueck+a.verpAuftrag;
  var herstell=(mat+maschk+nach+pruef)*(1+ausschuss)*a.kf3+setup+verp;
  herstell*=(1+e.handarbeit/100);
  var selbst=herstell*(1+a.overhead/100);
  var vkNetto=selbst/(1-zielmarge-a.gebuehr/100);
  var vkBrutto=vkNetto*(1+a.mwst/100);
  if(vkBrutto<e.minPreis) vkBrutto=e.minPreis;
  var empf=Math.ceil(vkBrutto*2)/2;
  var netto=empf/(1+a.mwst/100); var db=netto-herstell; var dbMarge=db/netto;
  return {mat:mat,maschk:maschk,nach:nach,pruef:pruef,setup:setup,verp:verp,herstell:herstell,selbst:selbst,
    vkNetto:vkNetto,vkBrutto:vkBrutto,empf:empf,db:db,dbMarge:dbMarge,zeitH:estTimeH(wG,hMm),maschstd:maschstd};
}

function buildRecipe(rec,custom){ custom=custom||{};
  if(rec.typ==='box') return boxSolid(rec.params.W,rec.params.D,rec.params.H,rec.params.wall,rec.params.bottom);
  if(rec.typ==='vase') return vaseSolid(rec.params.rb,rec.params.rt,rec.params.H,rec.params.wall,rec.params.twist||0,56,Math.max(24,Math.round(rec.params.H/3)));
  if(rec.typ==='relief'){ var p=rec.params; var text=(custom.text!=null?custom.text:(p.text||'')); var line2=(custom.line2!=null?custom.line2:(p.line2||'')); var img=custom._img||null;
    var s=((p.r||0)>0 && (text||line2||img))? textSampler(text,line2,p.W,p.D,img) : null; return reliefSolid(p.W,p.D,p.t,(p.r||0)>0?p.r:0.001,s); }
  return null; }
function recipeProfile(rec,ov){ return Object.assign({material:'PLA',layerHeight:0.2,infill:0.2,perimeters:3}, rec.profil||{}, ov||{}); }
function gcodeRecipe(rec,custom,ov){ var pf=recipeProfile(rec,ov); var m;
  if(rec.typ==='relief'){ var p=rec.params; var text=(custom&&custom.text!=null)?custom.text:(p.text||''); var line2=(custom&&custom.line2!=null)?custom.line2:(p.line2||''); var img=(custom&&custom._img)||null;
    var s=((p.r||0)>0&&(text||line2||img))?textSampler(text,line2,p.W,p.D,img):null; m=reliefSolid(p.W,p.D,p.t,(p.r||0)>0?p.r:0.001,s,72); }
  else { m=buildRecipe(rec,custom); }
  if(!m) return null;
  return meshGcode(m.array(), {layerH:pf.layerHeight, lineW:0.42, infill:pf.infill, perim:pf.perimeters, material:pf.material}); }
function stlRecipe(rec,custom){ var m=buildRecipe(rec,custom); return m?toSTL(m.array()):null; }
function meshRecipe(rec,custom){ return buildRecipe(rec,custom); }

function designMesh(d){ d=d||{}; var p=d.params||{};
  if(d.typ==='box') return boxSolid(p.W,p.D,p.H,p.wall,p.bottom);
  if(d.typ==='vase') return vaseSolid(p.rb,p.rt,p.H,p.wall,p.twist||0,56,Math.max(24,Math.round(p.H/3)));
  var s=((p.r||0)>0)? textSampler(p.text||'',p.line2||'',p.W,p.D,null):null;
  return reliefSolid(p.W,p.D,p.t,(p.r||0)>0?p.r:0.001,s); }
function gcodeDesign(d){ var m=designMesh(d); var inf=(d.infill!=null?d.infill:0.2);
  return meshGcode(m.array(), {layerH:0.2, lineW:0.42, infill:inf, perim:3, material:d.material||'PLA'}); }
function stlDesign(d){ return toSTL(designMesh(d).array()); }


/* ---------------- Echter Mesh-Slicer (geometrisch exakt) ---------------- */
function _qkey(x,y){ return Math.round(x*100)/100+','+Math.round(y*100)/100; }
function sliceTris(tris,z){ var segs=[],t=tris;
  for(var i=0;i<t.length;i+=9){
    var ax=t[i],ay=t[i+1],az=t[i+2],bx=t[i+3],by=t[i+4],bz=t[i+5],cx=t[i+6],cy=t[i+7],cz=t[i+8];
    var da=az-z,db=bz-z,dc=cz-z; var pts=[];
    function cross(x1,y1,d1,x2,y2,d2){ var u=d1/(d1-d2); pts.push([x1+(x2-x1)*u, y1+(y2-y1)*u]); }
    if((da<0)!==(db<0)) cross(ax,ay,da,bx,by,db);
    if((db<0)!==(dc<0)) cross(bx,by,db,cx,cy,dc);
    if((dc<0)!==(da<0)) cross(cx,cy,dc,ax,ay,da);
    if(pts.length===2) segs.push([pts[0][0],pts[0][1],pts[1][0],pts[1][1]]);
  } return segs; }
function stitchLoops(segs){
  var map={}; segs.forEach(function(s,i){ [_qkey(s[0],s[1]),_qkey(s[2],s[3])].forEach(function(k){ (map[k]=map[k]||[]).push(i); }); });
  var used=new Array(segs.length); var loops=[];
  for(var i=0;i<segs.length;i++){ if(used[i]) continue; used[i]=true;
    var loop=[[segs[i][0],segs[i][1]]]; var cx=segs[i][2],cy=segs[i][3]; var startK=_qkey(segs[i][0],segs[i][1]); var guard=0;
    while(guard++<200000){ loop.push([cx,cy]); var k=_qkey(cx,cy); if(k===startK) break;
      var cand=map[k]||[], nxt=-1; for(var j=0;j<cand.length;j++){ if(!used[cand[j]]){nxt=cand[j];break;} }
      if(nxt<0) break; used[nxt]=true; var s=segs[nxt];
      if(_qkey(s[0],s[1])===k){ cx=s[2];cy=s[3]; } else { cx=s[0];cy=s[1]; } }
    if(loop.length>=4) loops.push(loop);
  } return loops; }
function _crossX(loops,y){ var xs=[]; for(var l=0;l<loops.length;l++){ var lp=loops[l]; for(var i=0;i<lp.length-1;i++){ var y1=lp[i][1],y2=lp[i+1][1]; if((y1<=y&&y2>y)||(y2<=y&&y1>y)){ var x1=lp[i][0],x2=lp[i+1][0]; xs.push(x1+(y-y1)/(y2-y1)*(x2-x1)); } } } return xs.sort(function(a,b){return a-b;}); }
function _crossY(loops,x){ var ys=[]; for(var l=0;l<loops.length;l++){ var lp=loops[l]; for(var i=0;i<lp.length-1;i++){ var x1=lp[i][0],x2=lp[i+1][0]; if((x1<=x&&x2>x)||(x2<=x&&x1>x)){ var y1=lp[i][1],y2=lp[i+1][1]; ys.push(y1+(x-x1)/(x2-x1)*(y2-y1)); } } } return ys.sort(function(a,b){return a-b;}); }
function _inside(x,y,loops){ var xs=_crossX(loops,y),c=0; for(var i=0;i<xs.length;i++){ if(xs[i]<x) c++; } return (c&1)===1; }
function _area(lp){ var a=0; for(var i=0;i<lp.length-1;i++){ a+=lp[i][0]*lp[i+1][1]-lp[i+1][0]*lp[i][1]; } return a/2; }
function _lineX(p1,p2,p3,p4){ var x1=p1[0],y1=p1[1],x2=p2[0],y2=p2[1],x3=p3[0],y3=p3[1],x4=p4[0],y4=p4[1];
  var den=(x1-x2)*(y3-y4)-(y1-y2)*(x3-x4); if(Math.abs(den)<1e-9) return null;
  var t=((x1-x3)*(y3-y4)-(y1-y3)*(x3-x4))/den; return [x1+t*(x2-x1), y1+t*(y2-y1)]; }
function offsetLoop(loop,d,dir){ var pts=loop.slice(); if(pts.length>1 && _qkey(pts[0][0],pts[0][1])===_qkey(pts[pts.length-1][0],pts[pts.length-1][1])) pts.pop();
  var n=pts.length; if(n<3) return null; var sgn=(_area(loop)>=0?1:-1)*dir; var ed=[];
  for(var i=0;i<n;i++){ var a=pts[i],b=pts[(i+1)%n]; var dx=b[0]-a[0],dy=b[1]-a[1]; var L=Math.hypot(dx,dy)||1; var nx=-dy/L*sgn,ny=dx/L*sgn;
    ed.push([[a[0]+nx*d,a[1]+ny*d],[b[0]+nx*d,b[1]+ny*d]]); }
  var out=[]; for(i=0;i<n;i++){ var e0=ed[(i-1+n)%n],e1=ed[i]; var p=_lineX(e0[0],e0[1],e1[0],e1[1]); out.push(p||e1[0]); }
  out.push(out[0]); return out; }
function offsetInto(loop,d,allLoops){ var o=offsetLoop(loop,d,1); if(o){ var m=o[Math.floor(o.length/2)]; if(_inside(m[0],m[1],allLoops)) return o; } var o2=offsetLoop(loop,d,-1); return o2; }
function _ptSeg(p,a,b){ var dx=b[0]-a[0],dy=b[1]-a[1]; var L2=dx*dx+dy*dy; if(L2<1e-9) return Math.hypot(p[0]-a[0],p[1]-a[1]); var t=((p[0]-a[0])*dx+(p[1]-a[1])*dy)/L2; t=Math.max(0,Math.min(1,t)); return Math.hypot(p[0]-(a[0]+t*dx), p[1]-(a[1]+t*dy)); }
function simplifyLoop(loop,eps){ if(loop.length<6) return loop; var pts=loop, keep=new Array(pts.length); keep[0]=keep[pts.length-1]=true;
  var stack=[[0,pts.length-1]]; while(stack.length){ var seg=stack.pop(),s=seg[0],en=seg[1],dmax=0,idx=-1;
    for(var i=s+1;i<en;i++){ var d=_ptSeg(pts[i],pts[s],pts[en]); if(d>dmax){dmax=d;idx=i;} }
    if(dmax>eps&&idx>0){ keep[idx]=true; stack.push([s,idx]); stack.push([idx,en]); } }
  var out=[]; for(i=0;i<pts.length;i++){ if(keep[i]) out.push(pts[i]); } return out.length>=4?out:loop; }
function meshGcode(tris,opt){
  opt=opt||{}; var lh=opt.layerH||0.2, lw=opt.lineW||0.42, dens=(opt.infill==null?0.2:opt.infill), perim=Math.max(1,opt.perim||3), material=opt.material||'PLA';
  var nb=opt.bottom==null?4:opt.bottom, nt=opt.top==null?4:opt.top;
  var t=tris, zmin=1e9,zmax=-1e9,xmin=1e9,xmax=-1e9,ymin=1e9,ymax=-1e9;
  for(var i=0;i<t.length;i+=3){ var X=t[i],Y=t[i+1],Z=t[i+2]; if(i%9!==0){} if(Z<zmin)zmin=Z; if(Z>zmax)zmax=Z; }
  for(i=0;i<t.length;i+=3){ if(t[i]<xmin)xmin=t[i]; if(t[i]>xmax)xmax=t[i]; if(t[i+1]<ymin)ymin=t[i+1]; if(t[i+1]>ymax)ymax=t[i+1]; }
  var ox=110-(xmin+xmax)/2, oy=110-(ymin+ymax)/2;
  var temp=/Resin/.test(material)?210:/TPU/.test(material)?225:/PETG/.test(material)?240:205;
  var bed=/PETG/.test(material)?80:/PLA/.test(material)?60:55;
  var nLayers=Math.max(1,Math.floor((zmax-zmin-1e-4)/lh)+1);
  var fil=1.75, fa=Math.PI*fil*fil/4, EA=0;
  function e(d){ EA+=(lw*lh*d)/fa; return EA.toFixed(5); }
  var X=function(x){return (x+ox).toFixed(2);}, Y=function(y){return (y+oy).toFixed(2);};
  var g=['; HeiBen Manufaktur — geometrisch geslict aus Mesh (ENTWURF)',
    '; Material: '+material+'  Layer: '+lh+'mm  Perimeter: '+perim+'  Infill: '+Math.round(dens*100)+'%  Layers: '+nLayers,
    '; Unvalidierter Entwurf — finale Maschinenanweisung erst nach manueller Freigabe (Copyright/Machbarkeit).',
    'M140 S'+bed,'M104 S'+temp,'M190 S'+bed,'M109 S'+temp,'G21','G90','M82','G28','G92 E0'];
  function emitLoop(lp){ if(lp.length<3) return; g.push('G0 X'+X(lp[0][0])+' Y'+Y(lp[0][1])+' F4800','G92 E0');
    for(var k=1;k<lp.length;k++){ var dx=lp[k][0]-lp[k-1][0],dy=lp[k][1]-lp[k-1][1]; g.push('G1 X'+X(lp[k][0])+' Y'+Y(lp[k][1])+' E'+e(Math.hypot(dx,dy))+' F1500'); } }
  for(var li=0; li<nLayers; li++){
    var z=zmin+lh*(li+0.5); if(z>=zmax) break;
    var loops=stitchLoops(sliceTris(t,z)); if(!loops.length) continue;
    loops=loops.map(function(lp){return simplifyLoop(lp,0.05);});
    g.push('G1 Z'+(lh*(li+1)).toFixed(2)+' F900','; layer '+(li+1)+'/'+nLayers);
    for(var p=0;p<perim;p++){ var d=lw*(p+0.5); for(var q=0;q<loops.length;q++){ var off=offsetInto(loops[q],d,loops); if(off&&off.length>3) emitLoop(off); } }
    var solid=(li<nb)||(li>=nLayers-nt); var density=solid?0.97:dens; if(density<=0) continue;
    var sp=lw/Math.min(0.99,Math.max(0.05,density)); var inset=perim*lw; var horiz=(li%2===0); g.push('G92 E0');
    if(horiz){ for(var y=ymin+inset;y<=ymax-inset;y+=sp){ var xs=_crossX(loops,y); for(var s=0;s+1<xs.length;s+=2){ var xa=xs[s]+inset,xb=xs[s+1]-inset; if(xb-xa>lw){ g.push('G0 X'+X(xa)+' Y'+Y(y)+' F4800','G1 X'+X(xb)+' Y'+Y(y)+' E'+e(xb-xa)+' F1800'); } } } }
    else { for(var x=xmin+inset;x<=xmax-inset;x+=sp){ var ys=_crossY(loops,x); for(var s2=0;s2+1<ys.length;s2+=2){ var ya=ys[s2]+inset,yb=ys[s2+1]-inset; if(yb-ya>lw){ g.push('G0 X'+X(x)+' Y'+Y(ya)+' F4800','G1 X'+X(x)+' Y'+Y(yb)+' E'+e(yb-ya)+' F1800'); } } } }
  }
  g.push('G1 E'+(EA-2).toFixed(5)+' F2100','M104 S0','M140 S0','G28 X0','M84','; Ende');
  return new Blob([g.join('\n')],{type:'text/plain'});
}

W.HeiBenGestalten={Mesh:Mesh,reliefSolid:reliefSolid,boxSolid:boxSolid,vaseSolid:vaseSolid,buildRecipe:buildRecipe,meshRecipe:meshRecipe,recipeProfile:recipeProfile,gcodeRecipe:gcodeRecipe,stlRecipe:stlRecipe,designMesh:designMesh,gcodeDesign:gcodeDesign,stlDesign:stlDesign,meshGcode:meshGcode,sliceTris:sliceTris,stitchLoops:stitchLoops,
  textSampler:textSampler,toSTL:toSTL,toGcode:toGcode,weightG:weightG,price:price,estTimeH:estTimeH,A:A,E:E,DENS:DENS};
})();
