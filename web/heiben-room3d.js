/* HeiBen — 3D-Raumansicht (Three.js, offline).
   HeiBenRoom3D.create(canvas) → Handle: setItems / setAutoRotate / resetView / setMode('3d'|'plan') / resize / dispose.
   Items: [{t, kat, col, masse, preis, qty}]. Features: Image-Based-Lighting (PMREM), Kontaktschatten,
   physikalische Materialien, schwebende HTML-Preis-Labels, Grundriss-Umschalter (Ortho-Draufsicht). */
(function(){
  if(!window.THREE){ window.HeiBenRoom3D={ create:function(){return null;}, available:function(){return false;} }; return; }
  var T=window.THREE; var _maxAniso=4, _tc={};

  function nums(m){ return ((''+(m||'')).match(/\d+(?:[.,]\d+)?/g)||[]).map(function(x){return parseFloat(x.replace(',','.'));}); }
  function clamp(v,a,b){ return Math.max(a,Math.min(b,v)); }
  function dims(kat, masse){
    var m=''+(masse||''), dia=/Ø/.test(m), n=nums(m), w,d,h;
    if(dia && n.length>=2){ w=n[0]/100; d=n[0]/100; h=n[1]/100; }
    else if(n.length>=3){ w=n[0]/100; d=n[1]/100; h=n[2]/100; }
    else {
      var f={sofa:[2.0,0.9,0.8],tisch:[1.2,0.7,0.74],bett:[1.6,2.0,0.5],schrank:[1.0,0.45,2.0],leuchte:[0.34,0.34,1.6],
             deko:[1.6,2.4,0.02],kueche:[1.8,0.6,0.9],buero:[1.4,0.7,0.74],outdoor:[0.62,0.66,0.85],kind:[1.0,0.62,0.8],textil:[1.4,0.04,2.4]}[kat]||[0.9,0.6,0.9];
      w=f[0]; d=f[1]; h=f[2]; if(n.length===1){ if(kat==='leuchte'||kat==='textil') h=n[0]/100; else w=n[0]/100; }
    }
    return {w:clamp(w,0.12,3.6), d:clamp(d,0.12,3.6), h:clamp(h,0.04,2.6)};
  }
  function shade(hex,f){ var c=new T.Color(hex); c.offsetHSL(0,0,f); return c; }
  // physikalisch basierte Materialien (nutzen scene.environment automatisch)
  function pmat(col,rough,metal,clear){ return new T.MeshPhysicalMaterial({color:(col instanceof T.Color?col:new T.Color(col)),
    roughness:(rough==null?0.7:rough), metalness:(metal==null?0:metal), clearcoat:(clear==null?0:clear), clearcoatRoughness:0.4, envMapIntensity:1.0}); }
  function box(w,h,d,m){ var g=new T.Mesh(new T.BoxGeometry(w,h,d),m); g.castShadow=true; g.receiveShadow=true; return g; }
  function _cv(n){ var c=document.createElement('canvas'); c.width=c.height=n; return c; }
  function css(c){ return 'rgb('+(c.r*255|0)+','+(c.g*255|0)+','+(c.b*255|0)+')'; }
  function shadeHex(hex,f){ return '#'+shade(hex,f).getHexString(); }
  function _tex(cv,rep,srgb){ var t=new T.CanvasTexture(cv); t.wrapS=t.wrapT=T.RepeatWrapping; if(rep)t.repeat.set(rep[0],rep[1]); if(srgb&&T.sRGBEncoding)t.encoding=T.sRGBEncoding; t.anisotropy=_maxAniso; t.needsUpdate=true; return t; }
  function hashStr(s){ s=''+s; var h=0; for(var i=0;i<s.length;i++){ h=(h*31+s.charCodeAt(i))>>>0; } return h; }
  function pick(seed,arr){ return arr[hashStr(seed)%arr.length]; }
  function weaveCv(n,st){ var c=_cv(n),x=c.getContext('2d'); st=st||5; for(var y=0;y<n;y+=st){ for(var xx=0;xx<n;xx+=st){ var v=(((xx/st|0)+(y/st|0))%2===0)?150:104; x.fillStyle='rgb('+v+','+v+','+v+')'; x.fillRect(xx,y,st,st); } } return c; }
  function woodMaps(col){ var key='w_'+col; if(_tc[key])return _tc[key]; var n=256,c=_cv(n),x=c.getContext('2d'),base=new T.Color(col);
    x.fillStyle=css(base); x.fillRect(0,0,n,n);
    for(var i=0;i<n;i++){ var l=0.05*Math.sin(i*0.5)+0.05*Math.sin(i*0.17)+(Math.random()*0.03-0.015); if(l<0){x.strokeStyle='rgba(0,0,0,'+(-l*0.6).toFixed(3)+')';} else {x.strokeStyle='rgba(255,255,255,'+(l*0.5).toFixed(3)+')';} x.beginPath(); x.moveTo(i,0); x.lineTo(i,n); x.stroke(); }
    var bc=_cv(n),bx=bc.getContext('2d'); bx.fillStyle='#7f7f7f'; bx.fillRect(0,0,n,n); for(var j=0;j<n;j++){ var g=127+Math.round(Math.sin(j*0.5)*20+Math.sin(j*0.17)*18+(Math.random()*10-5)); bx.strokeStyle='rgb('+g+','+g+','+g+')'; bx.beginPath(); bx.moveTo(j,0); bx.lineTo(j,n); bx.stroke(); }
    var r={map:_tex(c,[1,1],true),bump:_tex(bc,[1,1],false)}; _tc[key]=r; return r; }
  function fabricMaps(col,pat){ var key='f_'+col+'_'+pat; if(_tc[key])return _tc[key]; var n=256,c=_cv(n),x=c.getContext('2d'),base=new T.Color(col);
    x.fillStyle=css(base); x.fillRect(0,0,n,n);
    var st=4; for(var y=0;y<n;y+=st){ for(var xx=0;xx<n;xx+=st){ var on=(((xx/st|0)+(y/st|0))%2===0); x.fillStyle=on?'rgba(255,255,255,0.05)':'rgba(0,0,0,0.05)'; x.fillRect(xx,y,st,st); } }
    var d=css(base.clone().offsetHSL(0,0,-0.1)), lgt=css(base.clone().offsetHSL(0,0,0.13));
    if(pat==='stripe'){ x.fillStyle=d; for(var i=0;i<n;i+=40) x.fillRect(i,0,18,n); }
    else if(pat==='check'){ x.fillStyle=d; for(var i2=0;i2<n;i2+=48){ x.fillRect(i2,0,20,n); x.fillRect(0,i2,n,20); } }
    else if(pat==='dots'){ x.fillStyle=lgt; for(var yy=14;yy<n;yy+=38)for(var xd=14;xd<n;xd+=38){ x.beginPath(); x.arc(xd+((yy/38|0)%2?19:0),yy,6,0,6.283); x.fill(); } }
    else if(pat==='herringbone'){ x.strokeStyle=d; x.lineWidth=4; for(var ih=-n;ih<n;ih+=18){ x.beginPath(); x.moveTo(ih,0); x.lineTo(ih+n,n); x.stroke(); } }
    else if(pat==='raute'){ x.strokeStyle=d; x.lineWidth=3; for(var rx=0;rx<n;rx+=34)for(var ry=0;ry<n;ry+=34){ x.beginPath(); x.moveTo(rx+17,ry); x.lineTo(rx+34,ry+17); x.lineTo(rx+17,ry+34); x.lineTo(rx,ry+17); x.closePath(); x.stroke(); } }
    var r={map:_tex(c,[2,2],true),bump:_tex(weaveCv(n,4),[8,8],false)}; _tc[key]=r; return r; }
  function rugMaps(col,pat){ var key='r_'+col+'_'+pat; if(_tc[key])return _tc[key]; var n=256,c=_cv(n),x=c.getContext('2d'),base=new T.Color(col);
    x.fillStyle=css(base); x.fillRect(0,0,n,n); var a=css(base.clone().offsetHSL(0,0,-0.13)), b=css(base.clone().offsetHSL(0,0,0.15)), cr='#efe6d2';
    x.strokeStyle=a; x.lineWidth=14; x.strokeRect(7,7,n-14,n-14); x.strokeStyle=cr; x.lineWidth=3; x.strokeRect(18,18,n-36,n-36);
    if(pat==='stripe'){ x.fillStyle=a; for(var i=30;i<n-22;i+=26) x.fillRect(24,i,n-48,12); x.fillStyle=b; for(var i2=43;i2<n-22;i2+=26) x.fillRect(24,i2,n-48,5); }
    else if(pat==='diamond'){ x.strokeStyle=a; x.lineWidth=4; for(var gx=26;gx<n-22;gx+=28)for(var gy=26;gy<n-22;gy+=28){ x.beginPath(); x.moveTo(gx,gy-12); x.lineTo(gx+14,gy); x.lineTo(gx,gy+12); x.lineTo(gx-14,gy); x.closePath(); x.stroke(); } }
    else if(pat==='herringbone'){ x.strokeStyle=a; x.lineWidth=4; for(var ih=-n;ih<n;ih+=22){ x.beginPath(); x.moveTo(ih,24); x.lineTo(ih+(n-48),n-24); x.stroke(); x.beginPath(); x.moveTo(ih,24); x.lineTo(ih-(n-48),n-24); x.stroke(); } }
    else if(pat==='grid'){ x.strokeStyle=a; x.lineWidth=3; for(var ig=30;ig<n-22;ig+=24){ x.beginPath(); x.moveTo(24,ig); x.lineTo(n-24,ig); x.stroke(); x.beginPath(); x.moveTo(ig,24); x.lineTo(ig,n-24); x.stroke(); } }
    else { x.strokeStyle=a; x.lineWidth=5; for(var row=34;row<n-24;row+=22){ x.beginPath(); for(var px=24;px<=n-24;px+=14){ var yz=row+(((px/14|0)%2)?8:-8); if(px===24)x.moveTo(px,yz); else x.lineTo(px,yz); } x.stroke(); } }
    var r={map:_tex(c,[1,1],true),bump:_tex(weaveCv(n,5),[6,6],false)}; _tc[key]=r; return r; }
  function metalMaps(col){ var key='m_'+col; if(_tc[key])return _tc[key]; var n=128,c=_cv(n),x=c.getContext('2d'),base=new T.Color(col); x.fillStyle=css(base); x.fillRect(0,0,n,n);
    for(var i=0;i<n;i++){ var l=(Math.random()*0.16-0.08); x.strokeStyle=(l>0?'rgba(255,255,255,':'rgba(0,0,0,')+Math.abs(l).toFixed(3)+')'; x.beginPath(); x.moveTo(0,i); x.lineTo(n,i); x.stroke(); }
    var r={map:_tex(c,[1,1],true)}; _tc[key]=r; return r; }
  var WOODTONES=['#b58a55','#7d5733','#c8a877','#5e4126','#9c6f3a'];
  function woodTone(seed){ return WOODTONES[hashStr((seed||'x')+'wt')%WOODTONES.length]; }
  function woodMat(col){ var m=woodMaps(col); return new T.MeshPhysicalMaterial({map:m.map,bumpMap:m.bump,bumpScale:0.014,roughness:0.55,metalness:0,clearcoat:0.22,clearcoatRoughness:0.5,envMapIntensity:1.0}); }
  function fabricMat(col,pat){ var m=fabricMaps(col,pat); if(pat==='samt'){ return new T.MeshPhysicalMaterial({map:m.map,bumpMap:m.bump,bumpScale:0.008,roughness:0.6,metalness:0,clearcoat:0.28,clearcoatRoughness:0.6,envMapIntensity:0.9}); } return new T.MeshStandardMaterial({map:m.map,bumpMap:m.bump,bumpScale:0.012,roughness:0.92,metalness:0,envMapIntensity:0.7}); }
  function metalMat(col){ var m=metalMaps(col); return new T.MeshStandardMaterial({map:m.map,roughness:0.34,metalness:0.86,envMapIntensity:1.0}); }
  function rugMat(col,pat){ var m=rugMaps(col,pat); return new T.MeshStandardMaterial({map:m.map,bumpMap:m.bump,bumpScale:0.01,roughness:0.95,metalness:0,envMapIntensity:0.5}); }
  function plasterMat(){ var n=256,c=_cv(n),x=c.getContext('2d'); x.fillStyle='#efe7d6'; x.fillRect(0,0,n,n); for(var k=0;k<5200;k++){ var v=Math.random()*0.05; x.fillStyle=(Math.random()<0.5?'rgba(255,255,255,':'rgba(0,0,0,')+v.toFixed(3)+')'; x.fillRect(Math.random()*n,Math.random()*n,1.5,1.5); } return new T.MeshStandardMaterial({map:_tex(c,[6,6],true),roughness:1,metalness:0,envMapIntensity:0.3}); }
  function floorMat(){ var n=256,c=_cv(n),x=c.getContext('2d'),base=new T.Color('#d8c7a6'); x.fillStyle=css(base); x.fillRect(0,0,n,n); var ph=n/4;
    for(var p=0;p<4;p++){ var pc=base.clone().offsetHSL(0,0,Math.random()*0.08-0.04); x.fillStyle=css(pc); x.fillRect(0,p*ph,n,ph-1); for(var i=0;i<n;i+=2){ x.strokeStyle='rgba(0,0,0,'+(Math.random()*0.05*0.4).toFixed(3)+')'; x.beginPath(); x.moveTo(i,p*ph+2); x.lineTo(i,(p+1)*ph-2); x.stroke(); } x.fillStyle='rgba(0,0,0,0.18)'; x.fillRect(0,(p+1)*ph-1,n,1); }
    var bc=_cv(n),bx=bc.getContext('2d'); bx.fillStyle='#808080'; bx.fillRect(0,0,n,n); for(var p2=0;p2<4;p2++){ bx.fillStyle='rgb(64,64,64)'; bx.fillRect(0,(p2+1)*ph-1,n,2); }
    return new T.MeshStandardMaterial({map:_tex(c,[18,18],true),bumpMap:_tex(bc,[18,18],false),bumpScale:0.02,roughness:0.72,metalness:0,envMapIntensity:0.4}); }

  function buildSofa(D,col,seed){ var g=new T.Group(); var pat=pick(seed,['plain','stripe','check','dots','herringbone','samt','raute']); var sH=D.h*0.42;
    var base=box(D.w,sH,D.d,fabricMat(col,pat)); base.position.y=sH/2; g.add(base);
    var back=box(D.w,D.h-sH,D.d*0.22,fabricMat(shadeHex(col,-0.04),pat)); back.position.set(0,sH+(D.h-sH)/2,-D.d/2+D.d*0.11); g.add(back);
    var aw=Math.min(0.18,D.w*0.1); [-1,1].forEach(function(s){ var a=box(aw,D.h*0.6,D.d,fabricMat(shadeHex(col,-0.02),pat)); a.position.set(s*(D.w/2-aw/2),D.h*0.3,0); g.add(a); });
    var cush=box(D.w-2*aw,sH*0.34,D.d*0.8,fabricMat(shadeHex(col,0.06),pick(seed+'c',['plain','stripe','dots','samt']))); cush.position.set(0,sH+sH*0.17,D.d*0.04); g.add(cush); return g; }
  function buildTable(D,col,seed){ var g=new T.Group(); var wt=woodTone(seed); var wm=woodMat(wt); var tH=Math.min(0.06,D.h*0.12); var top=box(D.w,tH,D.d,wm); top.position.y=D.h-tH/2; g.add(top);
    var lw=Math.min(0.07,D.w*0.06), lx=D.w/2-lw, lz=D.d/2-lw, lm=woodMat(shadeHex(wt,-0.05));
    [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(function(s){ var l=box(lw,D.h-tH,lw,lm); l.position.set(s[0]*lx,(D.h-tH)/2,s[1]*lz); g.add(l); }); return g; }
  function buildChair(D,col,seed){ var g=buildTable({w:D.w,d:D.d,h:D.h*0.55},col,seed); var bk=box(D.w*0.94,D.h*0.5,Math.min(0.05,D.d*0.12),woodMat(woodTone(seed))); bk.position.set(0,D.h*0.55+D.h*0.25,-D.d/2+0.03); g.add(bk);
    var pad=box(D.w*0.9,0.03,D.d*0.9,fabricMat(shadeHex(col,0.1),pick(seed,['plain','stripe','check']))); pad.position.set(0,D.h*0.55+0.02,0); g.add(pad); return g; }
  function buildBed(D,col,seed){ var g=new T.Group(); var fr=box(D.w,D.h*0.34,D.d,woodMat(shadeHex(woodTone(seed),-0.05))); fr.position.y=D.h*0.17; g.add(fr);
    var matt=box(D.w*0.96,D.h*0.34,D.d*0.96,fabricMat(shadeHex(col,0.14),'plain')); matt.position.y=D.h*0.5; g.add(matt);
    var hb=box(D.w,D.h*1.0,D.d*0.1,fabricMat(col,pick(seed,['plain','stripe','check','herringbone','samt']))); hb.position.set(0,D.h*0.5,-D.d/2+D.d*0.05); g.add(hb);
    var pillow=box(D.w*0.42,D.h*0.12,D.d*0.22,fabricMat(shadeHex(col,0.2),'plain')); pillow.position.set(0,D.h*0.7,-D.d*0.3); g.add(pillow); return g; }
  function buildShelf(D,col,seed){ var g=new T.Group(); var m=woodMat(woodTone(seed)); var side=Math.min(0.05,D.w*0.06);
    [-1,1].forEach(function(s){ var p=box(side,D.h,D.d,m); p.position.set(s*(D.w/2-side/2),D.h/2,0); g.add(p); });
    var n=Math.max(2,Math.round(D.h/0.4)); for(var i=0;i<=n;i++){ var sh=box(D.w,0.03,D.d,m); sh.position.y=D.h*(i/n); g.add(sh); } return g; }
  function buildCabinet(D,col,seed){ var g=new T.Group(); var b=box(D.w,D.h,D.d,woodMat(woodTone(seed))); b.position.y=D.h/2; g.add(b);
    var hm=metalMat('#cfc8bb'); var doors=Math.max(1,Math.round(D.w/0.5)); for(var i=0;i<doors;i++){ var hd=new T.Mesh(new T.CylinderGeometry(0.012,0.012,Math.min(0.18,D.h*0.2),12),hm); hd.rotation.z=Math.PI/2; hd.position.set(-D.w/2+(i+0.5)*(D.w/doors)+(D.w/doors)*0.32,D.h*0.5,D.d/2+0.01); hd.castShadow=true; g.add(hd); } return g; }
  function buildLamp(D,col){ var g=new T.Group(); var mm=metalMat('#8a8276'); var base=new T.Mesh(new T.CylinderGeometry(Math.max(0.1,D.w*0.35),Math.max(0.12,D.w*0.4),0.04,28),mm); base.position.y=0.02; base.castShadow=true; g.add(base);
    var pole=new T.Mesh(new T.CylinderGeometry(0.022,0.026,D.h*0.78,18),mm); pole.position.y=D.h*0.4; pole.castShadow=true; g.add(pole);
    var fm=fabricMaps(col,'plain'); var shadeM=new T.MeshStandardMaterial({map:fm.map,bumpMap:fm.bump,bumpScale:0.008,color:new T.Color(col),roughness:0.6,emissive:new T.Color(col),emissiveIntensity:0.4,side:T.DoubleSide,envMapIntensity:0.5});
    var sh=new T.Mesh(new T.ConeGeometry(Math.max(0.14,D.w*0.55),D.h*0.24,28,1,true),shadeM); sh.position.y=D.h*0.86; g.add(sh);
    var bulb=new T.PointLight(0xfff0cf,0.5,3.6,2); bulb.position.y=D.h*0.8; g.add(bulb); return g; }
  function buildRug(D,col,seed){ var g=new T.Group(); var w=D.w, d=(D.d>0.3?D.d:Math.max(D.d,D.h)); var pat=pick(seed,['stripe','diamond','herringbone','grid','kelim']);
    var r=box(w,0.02,d,rugMat(col,pat)); r.position.y=0.011; r.castShadow=false; r.receiveShadow=true; g.add(r); return g; }
  function builderFor(kat){ return {sofa:buildSofa,tisch:buildTable,bett:buildBed,schrank:buildShelf,leuchte:buildLamp,
    deko:buildRug,kueche:buildCabinet,buero:buildTable,outdoor:buildChair,kind:buildBed,textil:buildRug}[kat]||buildCabinet; }
  function isFlat(kat){ return kat==='deko'||kat==='textil'; }

  // Equirect-Gradient als Umgebung (warmes, weiches Studio-Licht für Reflexionen/Ambient)
  function equirectGradient(){ var c=document.createElement('canvas'); c.width=256; c.height=128; var x=c.getContext('2d');
    var g=x.createLinearGradient(0,0,0,128); g.addColorStop(0,'#fff7ea'); g.addColorStop(0.45,'#f2ead9'); g.addColorStop(0.7,'#e3d8c2'); g.addColorStop(1,'#c9bca3');
    x.fillStyle=g; x.fillRect(0,0,256,128); var t=new T.CanvasTexture(c); return t; }
  // weicher radialer Kontaktschatten als Textur
  function contactTexture(){ var c=document.createElement('canvas'); c.width=128; c.height=128; var x=c.getContext('2d');
    var g=x.createRadialGradient(64,64,4,64,64,62); g.addColorStop(0,'rgba(30,26,20,0.42)'); g.addColorStop(0.6,'rgba(30,26,20,0.16)'); g.addColorStop(1,'rgba(30,26,20,0)');
    x.fillStyle=g; x.beginPath(); x.arc(64,64,62,0,Math.PI*2); x.fill(); return new T.CanvasTexture(c); }
  function fmtEUR(n){ try{ return (Math.round(n)).toLocaleString('de-DE')+' €'; }catch(e){ return n+' €'; } }

  function create(canvas){
    var wrap=canvas.parentNode;
    var W=canvas.clientWidth||640, H=canvas.clientHeight||430;
    var renderer=new T.WebGLRenderer({canvas:canvas,antialias:true,preserveDrawingBuffer:true});
    renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
    renderer.setSize(W,H,false); try{ _maxAniso=renderer.capabilities.getMaxAnisotropy(); }catch(e){}
    renderer.shadowMap.enabled=true; renderer.shadowMap.type=T.PCFSoftShadowMap;
    if(T.sRGBEncoding) renderer.outputEncoding=T.sRGBEncoding;
    renderer.toneMapping=T.ACESFilmicToneMapping; renderer.toneMappingExposure=1.0;
    var scene=new T.Scene(); scene.background=new T.Color('#efe9dd');
    try{ var pmrem=new T.PMREMGenerator(renderer); var eq=equirectGradient(); eq.mapping=T.EquirectangularReflectionMapping;
         var env=pmrem.fromEquirectangular(eq).texture; scene.environment=env; eq.dispose(); pmrem.dispose(); }catch(e){}

    var camP=new T.PerspectiveCamera(42,W/H,0.1,200); camP.position.set(5.6,4.2,6.2);
    var camO=new T.OrthographicCamera(-7,7,7,-7,0.1,200); camO.position.set(0,18,0.001); camO.up.set(0,0,-1); camO.lookAt(0,0,0);
    var active=camP, mode='3d', autoRotate=false;

    scene.add(new T.HemisphereLight(0xfdfaf2,0x9c947f,0.4));
    scene.add(new T.AmbientLight(0xffffff,0.1));
    var dir=new T.DirectionalLight(0xfff4e2,1.35); dir.position.set(6.5,10,4.5); dir.castShadow=true;
    dir.shadow.mapSize.set(2048,2048); dir.shadow.camera.near=1; dir.shadow.camera.far=46; if('radius' in dir.shadow) dir.shadow.radius=4;
    dir.shadow.camera.left=-14; dir.shadow.camera.right=14; dir.shadow.camera.top=14; dir.shadow.camera.bottom=-14; dir.shadow.bias=-0.0003; scene.add(dir);
    var fill=new T.DirectionalLight(0xeaf0ff,0.16); fill.position.set(-6,5,-4); scene.add(fill);

    var floor=new T.Mesh(new T.PlaneGeometry(80,80), floorMat());
    floor.rotation.x=-Math.PI/2; floor.receiveShadow=true; scene.add(floor);
    var wallMat=plasterMat();
    var back=new T.Mesh(new T.PlaneGeometry(80,16),wallMat); back.position.set(0,8,-6); back.receiveShadow=true; scene.add(back);
    var left=new T.Mesh(new T.PlaneGeometry(80,16),wallMat.clone()); left.rotation.y=Math.PI/2; left.position.set(-6,8,0); left.receiveShadow=true; scene.add(left);

    var controls=null; if(T.OrbitControls){ controls=new T.OrbitControls(camP,renderer.domElement); controls.enableDamping=true; controls.dampingFactor=0.08; controls.minDistance=3; controls.maxDistance=22; controls.maxPolarAngle=Math.PI*0.49; controls.target.set(0,0.6,0); controls.autoRotateSpeed=0.9; }

    var overlay=document.createElement('div'); overlay.className='r3d-labels'; overlay.style.cssText='position:absolute;inset:0;pointer-events:none;overflow:hidden;'; if(wrap) wrap.appendChild(overlay);
    var labels=[]; var tmpV=new T.Vector3();
    var contactTex=contactTexture();
    var group=new T.Group(); scene.add(group);
    var raf=null, running=true, needsRender=true;
    function frame(){ raf=null; if(!running)return; var changed=false; if(controls){ controls.autoRotate=(mode==='3d'&&autoRotate); controls.enableRotate=(mode!=='plan'); changed=controls.update(); } renderer.render(scene,active); updateLabels(); var go=running&&(autoRotate||changed||needsRender); needsRender=false; if(go) raf=requestAnimationFrame(frame); }
    function kick(){ if(!running)return; needsRender=true; if(!raf) raf=requestAnimationFrame(frame); }
    if(controls) controls.addEventListener('change', kick);
    kick();

    function updateLabels(){ if(!labels.length)return; var w=canvas.clientWidth||W, h=canvas.clientHeight||H;
      for(var i=0;i<labels.length;i++){ var L=labels[i]; L.obj.getWorldPosition(tmpV); tmpV.y+=L.h+0.18; tmpV.project(active);
        var x=Math.round((tmpV.x*0.5+0.5)*w), y=Math.round((-tmpV.y*0.5+0.5)*h);
        var on=(tmpV.z<1 && x>-60 && x<w+60 && y>-30 && y<h+30);
        if(on){ if(L.lx!==x||L.ly!==y){ L.el.style.left=x+'px'; L.el.style.top=y+'px'; L.lx=x; L.ly=y; } if(L.vis!==1){ L.el.style.display='block'; L.vis=1; } }
        else if(L.vis!==0){ L.el.style.display='none'; L.vis=0; } } }

    function clearScene(){ for(var i=group.children.length-1;i>=0;i--){ var c=group.children[i]; c.traverse(function(o){ if(o.geometry)o.geometry.dispose(); if(o.material){ (Array.isArray(o.material)?o.material:[o.material]).forEach(function(m){m.dispose&&m.dispose();}); } }); group.remove(c); }
      labels.forEach(function(L){ if(L.el&&L.el.parentNode) L.el.parentNode.removeChild(L.el); }); labels=[]; }

    function addContact(parent,w,d){ var s=Math.max(w,d)*1.25; var pl=new T.Mesh(new T.PlaneGeometry(s,s), new T.MeshBasicMaterial({map:contactTex,transparent:true,depthWrite:false,opacity:0.95}));
      pl.rotation.x=-Math.PI/2; pl.position.y=0.006; pl.renderOrder=1; parent.add(pl); }

    function setItems(items){
      clearScene(); items=items||[];
      var placed=[]; items.forEach(function(it){ var q=Math.min(it.qty||1,3); for(var i=0;i<q;i++) placed.push(it); });
      placed.sort(function(a,b){ return (isFlat(a.kat)?1:0)-(isFlat(b.kat)?1:0); });
      var objs=placed.map(function(it){ var D=dims(it.kat,it.masse); var g=builderFor(it.kat)(D,it.col||'#9b8f78',it.t||it.kat); if(!isFlat(it.kat)) addContact(g,D.w,D.d); return {mesh:g,w:D.w,d:D.d,h:D.h,col:it.col,preis:it.preis,t:it.t,flat:isFlat(it.kat)}; });
      var positioned=placed.length>0 && placed.every(function(it){ return typeof it.x==='number' && typeof it.z==='number'; });
      if(positioned){ objs.forEach(function(o,idx){ o.mesh.position.set(placed[idx].x,0,placed[idx].z); if(typeof placed[idx].rot==='number') o.mesh.rotation.y=-placed[idx].rot*Math.PI/180; if(placed[idx].sx) o.mesh.scale.set(placed[idx].sx,1,placed[idx].sz||placed[idx].sx); group.add(o.mesh); }); group.position.set(0,0,0); }
      else { var roomW=10.5, gap=0.55, x=-roomW/2, z=-4.3, rowD=0;
        objs.forEach(function(o){ if(x+o.w>roomW/2){ x=-roomW/2; z+=rowD+gap; rowD=0; } o.mesh.position.set(x+o.w/2,0,z+o.d/2); group.add(o.mesh); x+=o.w+gap; rowD=Math.max(rowD,o.d); });
        var bb=new T.Box3().setFromObject(group); if(isFinite(bb.min.x)){ var c=bb.getCenter(new T.Vector3()); group.position.x-=c.x; group.position.z-=c.z; } }
      // Preis-Labels
      objs.forEach(function(o){ if(o.preis==null)return; var el=document.createElement('div'); el.className='r3dprice'; el.style.setProperty('--c', o.col||'#1f1c17'); el.textContent=fmtEUR(o.preis); el.title=(o.t||'').replace(/'/g,''); overlay.appendChild(el); labels.push({el:el,obj:o.mesh,h:o.flat?0.25:o.h}); });
      if(controls){ controls.target.set(0,0.6,0); controls.update(); }
      if(mode==='plan') fitOrtho(); kick();
    }

    function fitOrtho(){ var bb=new T.Box3().setFromObject(group); var size=new T.Vector3(), c=new T.Vector3();
      if(isFinite(bb.min.x)){ bb.getSize(size); bb.getCenter(c); } else { size.set(8,1,6); c.set(0,0,0); }
      var pad=1.4, halfW=Math.max(size.x,4)/2+pad, halfD=Math.max(size.z,3)/2+pad;
      var asp=(canvas.clientWidth||1)/(canvas.clientHeight||1); var hw=halfW, hh=halfD; if(hw/hh<asp) hw=hh*asp; else hh=hw/asp;
      camO.left=-hw; camO.right=hw; camO.top=hh; camO.bottom=-hh; camO.position.set(c.x,18,c.z+0.001); camO.lookAt(c.x,0,c.z); camO.updateProjectionMatrix(); }

    function setMode(m){ mode=(m==='plan'?'plan':'3d'); active=(mode==='plan'?camO:camP); if(mode==='plan') fitOrtho(); resize(); kick(); }
    function setAutoRotate(v){ autoRotate=!!v; kick(); }
    function resetView(){ camP.position.set(5.6,4.2,6.2); if(controls){ controls.target.set(0,0.6,0); controls.update(); } if(mode==='plan'){ setMode('3d'); } kick(); }
    function resize(){ var w=canvas.clientWidth||W, h=canvas.clientHeight||H; if(w<2||h<2)return; camP.aspect=w/h; camP.updateProjectionMatrix(); if(mode==='plan') fitOrtho(); renderer.setSize(w,h,false); kick(); }
    function dispose(){ running=false; if(raf)cancelAnimationFrame(raf); clearScene(); if(overlay&&overlay.parentNode) overlay.parentNode.removeChild(overlay); if(scene.environment&&scene.environment.dispose) scene.environment.dispose(); if(renderer.dispose) renderer.dispose(); }

    return { setItems:setItems, setAutoRotate:setAutoRotate, resetView:resetView, setMode:setMode, resize:resize, dispose:dispose };
  }
  window.HeiBenRoom3D={ create:create, available:function(){ return !!window.THREE; } };
})();
