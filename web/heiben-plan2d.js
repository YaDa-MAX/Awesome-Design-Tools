/* HeiBen — 2D-Grundriss-Editor v3 (Canvas, offline).
   HeiBenPlan2D.create(canvas,{onChange,onSelect,onRoom}) →
     {setRoom,setItems,getPositions,setSelected,clearSel,setMeasure,resize,dispose}.
   Räume als rechtwinkliges Polygon (Rechteck / L / versetzt) mit mehreren Türen & Fenstern (an Wand verschiebbar, Snap).
   Möbel: verschieben, drehen (90°), in der Größe ändern. Automatische Bemaßung (m/cm) + Maßband + Indikator engster Durchgang. */
(function(){
  var EPS=1e-4;
  function fmtM(m){ return (m).toFixed(2).replace('.',',')+' m'; }
  function fmtD(m){ if(m>=1) return (m).toFixed(2).replace('.',',')+' m'; return Math.round(m*100)+' cm'; }
  function rr(c,x,y,w,h,r){ r=Math.min(r,Math.abs(w)/2,Math.abs(h)/2); c.beginPath(); c.moveTo(x+r,y); c.arcTo(x+w,y,x+w,y+h,r); c.arcTo(x+w,y+h,x,y+h,r); c.arcTo(x,y+h,x,y,r); c.arcTo(x,y,x+w,y,r); c.closePath(); }
  function hexA(hex,a){ var n=parseInt(hex.replace('#',''),16); return 'rgba('+((n>>16)&255)+','+((n>>8)&255)+','+(n&255)+','+a+')'; }
  function rectOutline(w,d){ return [{x:-w/2,z:-d/2},{x:w/2,z:-d/2},{x:w/2,z:d/2},{x:-w/2,z:d/2}]; }
  function snap(v){ return Math.round(v/0.05)*0.05; }
  function clamp(v,a,b){ return b<a?(a+b)/2:Math.max(a,Math.min(b,v)); }

  function create(canvas,opts){
    opts=opts||{}; var ctx=canvas.getContext('2d');
    var room={outline:rectOutline(4,3),doors:[],windows:[],name:'Raum',shapeLabel:'rechteckig',bb:{x0:-2,z0:-1.5,x1:2,z1:1.5,w:4,d:3}};
    var items=[], sel=null, drag=null, rotBtn=null, resBtn=null, dpr=1, W=0,H=0, measuring=false, measureLine=null;
    var PAD=30, BOT=26, LEFTM=30;

    function edges(){ var o=room.outline,e=[]; for(var i=0;i<o.length;i++){ e.push([o[i],o[(i+1)%o.length]]); } return e; }
    function hSpans(z){ var xs=[]; edges().forEach(function(e){ var a=e[0],b=e[1]; if(Math.abs(a.x-b.x)<EPS){ var z0=Math.min(a.z,b.z),z1=Math.max(a.z,b.z); if(z>z0+EPS&&z<z1-EPS) xs.push(a.x); } }); xs.sort(function(p,q){return p-q;}); var s=[]; for(var i=0;i+1<xs.length;i+=2) s.push([xs[i],xs[i+1]]); return s; }
    function vSpans(x){ var zs=[]; edges().forEach(function(e){ var a=e[0],b=e[1]; if(Math.abs(a.z-b.z)<EPS){ var x0=Math.min(a.x,b.x),x1=Math.max(a.x,b.x); if(x>x0+EPS&&x<x1-EPS) zs.push(a.z); } }); zs.sort(function(p,q){return p-q;}); var s=[]; for(var i=0;i+1<zs.length;i+=2) s.push([zs[i],zs[i+1]]); return s; }
    function spanAt(sp,v){ for(var i=0;i<sp.length;i++){ if(v>=sp[i][0]-EPS&&v<=sp[i][1]+EPS) return sp[i]; } var b=sp[0],bd=1e9; sp.forEach(function(s){var d=Math.min(Math.abs(v-s[0]),Math.abs(v-s[1])); if(d<bd){bd=d;b=s;}}); return b||[room.bb.x0,room.bb.x1]; }
    function ef(it){ var r=((it.rot||0)%180); return r===0?{w:it.w,d:it.d}:{w:it.d,d:it.w}; }

    function resize(){ dpr=Math.min(window.devicePixelRatio||1,2); W=canvas.clientWidth||520; H=canvas.clientHeight||360; canvas.width=Math.round(W*dpr); canvas.height=Math.round(H*dpr); ctx.setTransform(dpr,0,0,dpr,0,0); draw(); }
    function scale(){ return Math.min((W-LEFTM-PAD-PAD)/room.bb.w, (H-PAD-BOT-PAD)/room.bb.d); }
    function geom(){ var s=scale(); var rw=room.bb.w*s, rd=room.bb.d*s; return {s:s,ox:LEFTM+(W-LEFTM-PAD-rw)/2,oy:PAD+(H-PAD-BOT-rd)/2,rw:rw,rd:rd}; }
    function m2px(x,z){ var g=geom(); return {x:g.ox+(x-room.bb.x0)*g.s, y:g.oy+(z-room.bb.z0)*g.s}; }
    function px2m(px,py){ var g=geom(); return {x:(px-g.ox)/g.s+room.bb.x0, z:(py-g.oy)/g.s+room.bb.z0}; }

    function clampItem(it){ var e=ef(it); var hs=spanAt(hSpans(it.z),it.x); it.x=clamp(it.x,hs[0]+e.w/2,hs[1]-e.w/2); var vs=spanAt(vSpans(it.x),it.z); it.z=clamp(it.z,vs[0]+e.d/2,vs[1]-e.d/2); }
    function pathOutline(){ var o=room.outline; ctx.beginPath(); o.forEach(function(p,i){ var q=m2px(p.x,p.z); if(i===0)ctx.moveTo(q.x,q.y); else ctx.lineTo(q.x,q.y); }); ctx.closePath(); }

    // ---- Wände ziehen (freie Maße L/versetzt) + Öffnungen um Ecken ----
    function recomputeBB(){ var o=room.outline,xs=o.map(function(p){return p.x;}),zs=o.map(function(p){return p.z;});
      room.bb={x0:Math.min.apply(null,xs),x1:Math.max.apply(null,xs),z0:Math.min.apply(null,zs),z1:Math.max.apply(null,zs)}; room.bb.w=room.bb.x1-room.bb.x0; room.bb.d=room.bb.z1-room.bb.z0; }
    function edgeLen(o,i){ var a=o[i],b=o[(i+1)%o.length]; return Math.hypot(a.x-b.x,a.z-b.z); }
    function polyAreaOf(o){ var a=0; for(var i=0;i<o.length;i++){ var p=o[i],q=o[(i+1)%o.length]; a+=p.x*q.z-q.x*p.z; } return Math.abs(a)/2; }
    function bbOf(o){ var xs=o.map(function(p){return p.x;}),zs=o.map(function(p){return p.z;}); return {w:Math.max.apply(null,xs)-Math.min.apply(null,xs),d:Math.max.apply(null,zs)-Math.min.apply(null,zs)}; }
    function validOutline(o){ if(polyAreaOf(o)<1.2)return false; var b=bbOf(o); if(b.w<1.2||b.d<1.2)return false; for(var i=0;i<o.length;i++){ if(edgeLen(o,i)<0.25)return false; } return true; }
    function hitWall(px,py){ var o=room.outline,best=null;
      for(var i=0;i<o.length;i++){ if(edgeLen(o,i)<0.4)continue; var a=m2px(o[i].x,o[i].z),b=m2px(o[(i+1)%o.length].x,o[(i+1)%o.length].z);
        var d=distToSeg(px,py,a,b); if(d<7&&(best===null||d<best.d)){ best={i:i,orient:(Math.abs(o[i].x-o[(i+1)%o.length].x)<EPS?'v':'h'),d:d}; } }
      return best; }
    function projWall(mx,mz){ var b=room.bb; var c=[
      {wall:'top',at:clamp(mx,b.x0,b.x1),d:Math.abs(mz-b.z0)},
      {wall:'bottom',at:clamp(mx,b.x0,b.x1),d:Math.abs(mz-b.z1)},
      {wall:'left',at:clamp(mz,b.z0,b.z1),d:Math.abs(mx-b.x0)},
      {wall:'right',at:clamp(mz,b.z0,b.z1),d:Math.abs(mx-b.x1)} ];
      c.sort(function(p,q){return p.d-q.d;}); return c[0]; }
    function roomInfo(){ return {outline:room.outline.map(function(p){return {x:p.x,z:p.z};}),doors:room.doors,windows:room.windows,bb:{w:room.bb.w,d:room.bb.d},name:room.name,shapeLabel:room.shapeLabel}; }
    function drawWallGrips(){ var o=room.outline; for(var i=0;i<o.length;i++){ if(edgeLen(o,i)<0.5)continue; var a=o[i],b=o[(i+1)%o.length];
      var p=m2px((a.x+b.x)/2,(a.z+b.z)/2), vert=Math.abs(a.x-b.x)<EPS; ctx.save(); ctx.fillStyle='#b9ab8c'; ctx.strokeStyle='#f5f0e6'; ctx.lineWidth=1.4;
      rr(ctx,p.x-(vert?3:9),p.y-(vert?9:3),vert?6:18,vert?18:6,3); ctx.fill(); ctx.stroke(); ctx.restore(); } }

    function draw(){
      if(!W){ resize(); return; }
      ctx.clearRect(0,0,W,H); ctx.fillStyle='#efe9dd'; ctx.fillRect(0,0,W,H);
      var g=geom();
      ctx.save(); pathOutline(); ctx.clip(); ctx.fillStyle='#f5f0e6'; ctx.fillRect(0,0,W,H);
      ctx.strokeStyle='rgba(120,108,88,.13)'; ctx.lineWidth=1; ctx.beginPath();
      for(var gx=Math.ceil(room.bb.x0/0.5)*0.5; gx<=room.bb.x1+EPS; gx+=0.5){ var p=m2px(gx,room.bb.z0); ctx.moveTo(p.x,g.oy); ctx.lineTo(p.x,g.oy+g.rd); }
      for(var gz=Math.ceil(room.bb.z0/0.5)*0.5; gz<=room.bb.z1+EPS; gz+=0.5){ var q=m2px(room.bb.x0,gz); ctx.moveTo(g.ox,q.y); ctx.lineTo(g.ox+g.rw,q.y); }
      ctx.stroke(); ctx.restore();
      ctx.strokeStyle='#b9ab8c'; ctx.lineWidth=4; pathOutline(); ctx.stroke();
      if(!measuring) drawWallGrips();
      drawOpenings();
      ctx.fillStyle='#524a3e'; ctx.font="600 12px 'JetBrains Mono',monospace"; ctx.textAlign='left'; ctx.textBaseline='alphabetic';
      ctx.fillText(room.name+' · '+polyArea().toFixed(1).replace('.',',')+' m² · '+room.shapeLabel, g.ox, g.oy-10);
      dimLine(g.ox,g.oy+g.rd+14,g.ox+g.rw,g.oy+g.rd+14,fmtM(room.bb.w),false);
      dimLine(g.ox-14,g.oy,g.ox-14,g.oy+g.rd,fmtM(room.bb.d),true);
      items.forEach(function(it){ drawItem(it,it.id===sel); });
      var s=items.filter(function(i){return i.id===sel;})[0]; rotBtn=null; resBtn=null;
      if(s && !measuring){ drawDistances(s); drawRotateBtn(s); drawResizeBtn(s); }
      drawNarrowest();
      if(measureLine) drawMeasure();
      ctx.fillStyle='#8a7f6c'; ctx.font="10px 'JetBrains Mono',monospace"; ctx.textAlign='right';
      ctx.fillText(measuring?'Maßband: ziehen zum Messen':'Möbel/Wände/Öffnungen ziehen · ⟳ drehen · ⤡ Größe', W-6, H-6);
    }
    function polyArea(){ var o=room.outline,a=0; for(var i=0;i<o.length;i++){ var p=o[i],q=o[(i+1)%o.length]; a+=p.x*q.z-q.x*p.z; } return Math.abs(a)/2; }

    function wallSeg(o){ var b=room.bb;
      if(o.wall==='top'){ return {a:m2px(o.at-o.width/2,b.z0),b:m2px(o.at+o.width/2,b.z0),inward:{x:0,y:1},axis:'x'}; }
      if(o.wall==='bottom'){ return {a:m2px(o.at-o.width/2,b.z1),b:m2px(o.at+o.width/2,b.z1),inward:{x:0,y:-1},axis:'x'}; }
      if(o.wall==='left'){ return {a:m2px(b.x0,o.at-o.width/2),b:m2px(b.x0,o.at+o.width/2),inward:{x:1,y:0},axis:'z'}; }
      return {a:m2px(b.x1,o.at-o.width/2),b:m2px(b.x1,o.at+o.width/2),inward:{x:-1,y:0},axis:'z'}; }
    function line(a,b){ ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke(); }
    function openLabel(s,txt,col){ var mx=(s.a.x+s.b.x)/2+s.inward.x*12, my=(s.a.y+s.b.y)/2+s.inward.y*12;
      ctx.font="700 8px 'JetBrains Mono',monospace"; var tw=ctx.measureText(txt).width;
      ctx.fillStyle=col; rr(ctx,mx-tw/2-3,my-6,tw+6,12,3); ctx.fill(); ctx.fillStyle='#f3eee5'; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText(txt,mx,my); }
    function drawOpenings(){
      (room.windows||[]).forEach(function(w){ var s=wallSeg(w); var bt=(w.type==='bodentief');
        ctx.strokeStyle='#efe9dd'; ctx.lineWidth=bt?7:5; line(s.a,s.b);
        if(bt){ var o1={x:s.a.x+s.inward.x*4,y:s.a.y+s.inward.y*4}, o2={x:s.b.x+s.inward.x*4,y:s.b.y+s.inward.y*4};
          ctx.strokeStyle='#5e87a6'; ctx.lineWidth=2.4; line(s.a,s.b); line(o1,o2); ctx.lineWidth=1.6; line(s.a,o1); line(s.b,o2); openLabel(s,'BT','#5e87a6'); }
        else { ctx.strokeStyle='#7fa6c2'; ctx.lineWidth=2; line(s.a,s.b); } });
      (room.doors||[]).forEach(function(d){ var s=wallSeg(d); var ft=(d.type==='fenstertuer');
        ctx.strokeStyle='#efe9dd'; ctx.lineWidth=6; line(s.a,s.b);
        if(ft){ ctx.strokeStyle='#7fa6c2'; ctx.lineWidth=2.2; line(s.a,s.b); }
        var rad=Math.abs(d.width)*scale(); var a0=Math.atan2(s.inward.y,s.inward.x), dir=nrm(s.b,s.a), a1=Math.atan2(dir.y,dir.x);
        ctx.strokeStyle=ft?'rgba(46,111,107,.65)':'rgba(75,93,58,.5)'; ctx.lineWidth=1.2; ctx.beginPath(); ctx.arc(s.a.x,s.a.y,rad,Math.min(a0,a1),Math.max(a0,a1)); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(s.a.x,s.a.y); ctx.lineTo(s.a.x+s.inward.x*rad,s.a.y+s.inward.y*rad); ctx.stroke();
        if(ft) openLabel(s,'FT','#2e6f6b'); });
    }
    function nrm(p,q){ var dx=p.x-q.x,dy=p.y-q.y,l=Math.hypot(dx,dy)||1; return {x:dx/l,y:dy/l}; }

    function dimLine(x1,y1,x2,y2,label,vert){
      ctx.strokeStyle='#9c8f74'; ctx.lineWidth=1; line({x:x1,y:y1},{x:x2,y:y2});
      ctx.beginPath(); if(vert){ ctx.moveTo(x1-4,y1); ctx.lineTo(x1+4,y1); ctx.moveTo(x2-4,y2); ctx.lineTo(x2+4,y2); } else { ctx.moveTo(x1,y1-4); ctx.lineTo(x1,y1+4); ctx.moveTo(x2,y2-4); ctx.lineTo(x2,y2+4); } ctx.stroke();
      var mx=(x1+x2)/2,my=(y1+y2)/2; ctx.font="600 11px 'JetBrains Mono',monospace";
      if(vert){ ctx.save(); ctx.translate(mx-2,my); ctx.rotate(-Math.PI/2); var tw=ctx.measureText(label).width; ctx.fillStyle='#efe9dd'; ctx.fillRect(-tw/2-4,-8,tw+8,15); ctx.fillStyle='#524a3e'; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText(label,0,0); ctx.restore(); }
      else { var tw2=ctx.measureText(label).width; ctx.fillStyle='#efe9dd'; ctx.fillRect(mx-tw2/2-4,my-8,tw2+8,15); ctx.fillStyle='#524a3e'; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText(label,mx,my); }
    }
    function drawItem(it,on){ var e=ef(it); var a=m2px(it.x-e.w/2,it.z-e.d/2),b=m2px(it.x+e.w/2,it.z+e.d/2); var x=a.x,y=a.y,w=b.x-a.x,h=b.y-a.y;
      ctx.save(); if(on){ ctx.shadowColor='rgba(31,28,23,.25)'; ctx.shadowBlur=10; }
      rr(ctx,x,y,w,h,5); ctx.fillStyle=hexA(it.col,on?0.92:0.8); ctx.fill(); ctx.shadowBlur=0;
      ctx.lineWidth=on?2.4:1.4; ctx.strokeStyle=on?'#1f1c17':it.col; rr(ctx,x,y,w,h,5); ctx.stroke(); ctx.restore();
      ctx.fillStyle='#1f1c17'; ctx.font="600 10px 'Manrope',sans-serif"; ctx.textAlign='center'; ctx.textBaseline='middle';
      var lbl=it.t||''; if(ctx.measureText(lbl).width>w-6){ while(lbl.length>3&&ctx.measureText(lbl+'…').width>w-6) lbl=lbl.slice(0,-1); lbl+='…'; }
      if(w>26&&h>14) ctx.fillText(lbl,x+w/2,y+h/2); }
    function drawRotateBtn(it){ var e=ef(it); var c=m2px(it.x+e.w/2,it.z-e.d/2); var bx=c.x+2,by=c.y-2,r=13;
      ctx.beginPath(); ctx.arc(bx,by,r,0,6.2832); ctx.fillStyle='#4a5c39'; ctx.fill(); ctx.strokeStyle='#f3eee5'; ctx.lineWidth=1.5; ctx.beginPath(); ctx.arc(bx,by,r*0.5,-0.5,4.2); ctx.stroke();
      var ax=bx+Math.cos(4.2)*r*0.5, ay=by+Math.sin(4.2)*r*0.5; ctx.beginPath(); ctx.moveTo(ax,ay); ctx.lineTo(ax-3,ay-2); ctx.lineTo(ax+1,ay-4); ctx.closePath(); ctx.fillStyle='#f3eee5'; ctx.fill();
      rotBtn={x:bx,y:by,r:r+7,id:it.id}; }
    function drawResizeBtn(it){ var e=ef(it); var c=m2px(it.x+e.w/2,it.z+e.d/2); var bx=c.x+2,by=c.y+2,r=11;
      ctx.beginPath(); ctx.arc(bx,by,r,0,6.2832); ctx.fillStyle='#b04a31'; ctx.fill(); ctx.strokeStyle='#f3eee5'; ctx.lineWidth=1.6;
      ctx.beginPath(); ctx.moveTo(bx-4,by-4); ctx.lineTo(bx+4,by+4); ctx.moveTo(bx+4,by+4); ctx.lineTo(bx+1,by+4); ctx.moveTo(bx+4,by+4); ctx.lineTo(bx+4,by+1); ctx.moveTo(bx-4,by-4); ctx.lineTo(bx-1,by-4); ctx.moveTo(bx-4,by-4); ctx.lineTo(bx-4,by-1); ctx.stroke();
      resBtn={x:bx,y:by,r:r+7,id:it.id}; }

    function clearances(it){ var e=ef(it); var hs=spanAt(hSpans(it.z),it.x), vs=spanAt(vSpans(it.x),it.z);
      return { l:(it.x-e.w/2)-hs[0], r:hs[1]-(it.x+e.w/2), t:(it.z-e.d/2)-vs[0], b:vs[1]-(it.z+e.d/2), hs:hs, vs:vs, e:e }; }
    function drawDistances(it){ var cl=clearances(it); var cx=m2px(it.x,it.z).x, cy=m2px(it.x,it.z).y;
      var el=m2px(it.x-cl.e.w/2,it.z), er=m2px(it.x+cl.e.w/2,it.z), et=m2px(it.x,it.z-cl.e.d/2), eb=m2px(it.x,it.z+cl.e.d/2);
      var wl=m2px(cl.hs[0],it.z), wr=m2px(cl.hs[1],it.z), wt=m2px(it.x,cl.vs[0]), wb=m2px(it.x,cl.vs[1]);
      distSeg(wl.x,cy,el.x,cy,cl.l); distSeg(er.x,cy,wr.x,cy,cl.r); distSeg(cx,wt.y,cx,et.y,cl.t); distSeg(cx,eb.y,cx,wb.y,cl.b);
      var best=neighborGap(it); if(best&&best.gap<1.4&&best.seg) distSeg(best.seg.a.x,best.seg.a.y,best.seg.b.x,best.seg.b.y,best.gap,true); }
    function neighborGap(it){ var best=null,e1=ef(it);
      items.forEach(function(o){ if(o.id===it.id)return; var e2=ef(o); var ovz=Math.abs(it.z-o.z)<(e1.d+e2.d)/2, ovx=Math.abs(it.x-o.x)<(e1.w+e2.w)/2; var gap,seg;
        if(ovz&&!ovx){ gap=Math.abs(it.x-o.x)-(e1.w+e2.w)/2; var z=(it.z+o.z)/2,x1=(it.x<o.x)?(it.x+e1.w/2):(o.x+e2.w/2),x2=(it.x<o.x)?(o.x-e2.w/2):(it.x-e1.w/2); seg={a:m2px(x1,z),b:m2px(x2,z)}; }
        else if(ovx&&!ovz){ gap=Math.abs(it.z-o.z)-(e1.d+e2.d)/2; var x=(it.x+o.x)/2,z1=(it.z<o.z)?(it.z+e1.d/2):(o.z+e2.d/2),z2=(it.z<o.z)?(o.z-e2.d/2):(it.z-e1.d/2); seg={a:m2px(x,z1),b:m2px(x,z2)}; }
        else return; if(best===null||gap<best.gap) best={gap:Math.max(0,gap),seg:seg}; }); return best; }
    function distSeg(x1,y1,x2,y2,m,neighbor){ var col=neighbor?(m<0.4?'#b04a31':'#6b3951'):(m<0.6?'#b04a31':'#4a5c39');
      ctx.strokeStyle=col; ctx.lineWidth=1.4; ctx.setLineDash([4,3]); line({x:x1,y:y1},{x:x2,y:y2}); ctx.setLineDash([]);
      var mx=(x1+x2)/2,my=(y1+y2)/2,t=fmtD(Math.max(0,m)); ctx.font="600 10px 'JetBrains Mono',monospace"; var tw=ctx.measureText(t).width;
      ctx.fillStyle=col; rr(ctx,mx-tw/2-3,my-7,tw+6,14,4); ctx.fill(); ctx.fillStyle='#f3eee5'; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText(t,mx,my); }
    function narrowest(){ var fs=items.filter(function(i){return !i.flat;}); var best=null;
      function cand(gap,seg){ if(gap<0)gap=0; if(best===null||gap<best.gap) best={gap:gap,seg:seg}; }
      fs.forEach(function(it){ var cl=clearances(it);
        cand(cl.l,{a:m2px(cl.hs[0],it.z),b:m2px(it.x-cl.e.w/2,it.z)}); cand(cl.r,{a:m2px(it.x+cl.e.w/2,it.z),b:m2px(cl.hs[1],it.z)});
        cand(cl.t,{a:m2px(it.x,cl.vs[0]),b:m2px(it.x,it.z-cl.e.d/2)}); cand(cl.b,{a:m2px(it.x,it.z+cl.e.d/2),b:m2px(it.x,cl.vs[1])}); });
      for(var i=0;i<fs.length;i++){ var ng=neighborGap(fs[i]); if(ng&&ng.seg) cand(ng.gap,ng.seg); } return best; }
    function drawNarrowest(){ var n=narrowest(); if(!n)return; var m=n.gap; var col=m<0.6?'#b04a31':(m<0.8?'#b8860b':'#4a5c39');
      if(n.seg){ ctx.strokeStyle=col; ctx.lineWidth=3; ctx.setLineDash([2,2]); line(n.seg.a,n.seg.b); ctx.setLineDash([]); }
      var g=geom(),t='Engster Durchgang: '+fmtD(m); ctx.font="600 11px 'JetBrains Mono',monospace"; var tw=ctx.measureText(t).width,bx=g.ox+g.rw/2;
      rr(ctx,bx-tw/2-8,g.oy-2,tw+16,18,9); ctx.fillStyle=col; ctx.fill(); ctx.fillStyle='#f3eee5'; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText(t,bx,g.oy+7); }
    function drawMeasure(){ var a=m2px(measureLine.a.x,measureLine.a.z), b=m2px(measureLine.b.x,measureLine.b.z);
      ctx.strokeStyle='#1f1c17'; ctx.lineWidth=1.6; ctx.setLineDash([5,3]); line(a,b); ctx.setLineDash([]);
      [a,b].forEach(function(p){ ctx.beginPath(); ctx.arc(p.x,p.y,3,0,6.28); ctx.fillStyle='#1f1c17'; ctx.fill(); });
      var len=Math.hypot(measureLine.a.x-measureLine.b.x,measureLine.a.z-measureLine.b.z); var mx=(a.x+b.x)/2,my=(a.y+b.y)/2,t=fmtD(len);
      ctx.font="600 11px 'JetBrains Mono',monospace"; var tw=ctx.measureText(t).width; ctx.fillStyle='#1f1c17'; rr(ctx,mx-tw/2-4,my-8,tw+8,16,5); ctx.fill(); ctx.fillStyle='#f3eee5'; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText(t,mx,my); }

    // ---- Interaktion ----
    function evPos(e){ var r=canvas.getBoundingClientRect(); return {px:e.clientX-r.left,py:e.clientY-r.top}; }
    function hitItem(px,py){ for(var i=items.length-1;i>=0;i--){ var it=items[i]; var e=ef(it); var a=m2px(it.x-e.w/2,it.z-e.d/2),b=m2px(it.x+e.w/2,it.z+e.d/2); if(px>=a.x&&px<=b.x&&py>=a.y&&py<=b.y) return it; } return null; }
    function distToSeg(px,py,a,b){ var dx=b.x-a.x,dy=b.y-a.y,L2=dx*dx+dy*dy; var t=L2?((px-a.x)*dx+(py-a.y)*dy)/L2:0; t=Math.max(0,Math.min(1,t)); var cx=a.x+t*dx,cy=a.y+t*dy; return Math.hypot(px-cx,py-cy); }
    function hitOpening(px,py){ var list=[]; (room.doors||[]).forEach(function(d,i){list.push({kind:'doors',i:i,o:d});}); (room.windows||[]).forEach(function(w,i){list.push({kind:'windows',i:i,o:w});});
      for(var k=0;k<list.length;k++){ var s=wallSeg(list[k].o); if(distToSeg(px,py,s.a,s.b)<8) return list[k]; } return null; }
    canvas.addEventListener('pointerdown',function(e){ var p=evPos(e); var m=px2m(p.px,p.py);
      if(measuring){ measureLine={a:{x:m.x,z:m.z},b:{x:m.x,z:m.z}}; drag={type:'measure'}; canvas.setPointerCapture(e.pointerId); draw(); return; }
      if(rotBtn && Math.hypot(p.px-rotBtn.x,p.py-rotBtn.y)<=rotBtn.r){ var it=byId(rotBtn.id); if(it){ it.rot=((it.rot||0)+90)%360; clampItem(it); draw(); fire(); } return; }
      if(resBtn && Math.hypot(p.px-resBtn.x,p.py-resBtn.y)<=resBtn.r){ drag={type:'resize',id:resBtn.id}; canvas.setPointerCapture(e.pointerId); return; }
      var op=hitOpening(p.px,p.py); if(op){ drag={type:'opening',op:op}; canvas.setPointerCapture(e.pointerId); return; }
      var hi=hitItem(p.px,p.py);
      if(hi){ sel=hi.id; drag={type:'move',id:hi.id,offx:m.x-hi.x,offz:m.z-hi.z}; canvas.setPointerCapture(e.pointerId); }
      else { var wi=hitWall(p.px,p.py); if(wi){ sel=null; drag={type:'wall',i:wi.i,orient:wi.orient}; canvas.setPointerCapture(e.pointerId); } else { sel=null; } }
      if(opts.onSelect)opts.onSelect(sel); draw(); });
    canvas.addEventListener('pointermove',function(e){ if(!drag)return; var p=evPos(e); var m=px2m(p.px,p.py);
      if(drag.type==='measure'){ measureLine.b={x:m.x,z:m.z}; draw(); return; }
      if(drag.type==='move'){ var it=byId(drag.id); if(!it)return; it.x=m.x-drag.offx; it.z=m.z-drag.offz; clampItem(it); draw(); fire(); return; }
      if(drag.type==='resize'){ var r=byId(drag.id); if(!r)return; var e0=ef(r); var hs=spanAt(hSpans(r.z),r.x), vs=spanAt(vSpans(r.x),r.z);
        var ew=clamp(2*Math.abs(m.x-r.x),0.3,2*Math.min(r.x-hs[0],hs[1]-r.x)); var ed=clamp(2*Math.abs(m.z-r.z),0.3,2*Math.min(r.z-vs[0],vs[1]-r.z));
        var rr2=((r.rot||0)%180); if(rr2===0){ r.w=ew; r.d=ed; } else { r.w=ed; r.d=ew; } draw(); fire(); return; }
      if(drag.type==='wall'){ var o=room.outline,i=drag.i,j=(i+1)%o.length; var sv=o.map(function(p){return {x:p.x,z:p.z};});
        if(drag.orient==='v'){ var nx=snap(m.x); o[i].x=nx; o[j].x=nx; } else { var nz=snap(m.z); o[i].z=nz; o[j].z=nz; }
        if(!validOutline(o)){ for(var k=0;k<o.length;k++){ o[k].x=sv[k].x; o[k].z=sv[k].z; } }
        recomputeBB(); room.shapeLabel=(o.length>4?room.shapeLabel:'rechteckig'); items.forEach(clampItem); draw(); if(opts.onRoom)opts.onRoom(roomInfo()); return; }
      if(drag.type==='opening'){ var arr=room[drag.op.kind], op=arr[drag.op.i]; var c=projWall(m.x,m.z); var b=room.bb; var half=op.width/2+0.05;
        var rng=(c.wall==='top'||c.wall==='bottom')?[b.x0+half,b.x1-half]:[b.z0+half,b.z1-half];
        if(rng[1]>rng[0]){ op.wall=c.wall; op.at=clamp(snap(c.at),rng[0],rng[1]); }
        draw(); if(opts.onRoom)opts.onRoom(roomInfo()); return; } });
    function endDrag(){ if(drag){ var t=drag.type; drag=null; if(t==='move'||t==='resize'||t==='wall')fire(); } } canvas.addEventListener('pointerup',endDrag); canvas.addEventListener('pointercancel',endDrag);
    canvas.style.touchAction='none';
    document.addEventListener('keydown',function(e){ if((e.key==='r'||e.key==='R')&&sel){ var it=byId(sel); if(it){ it.rot=((it.rot||0)+90)%360; clampItem(it); draw(); fire(); } } });
    function byId(id){ return items.filter(function(x){return x.id===id;})[0]; }
    function fire(){ if(opts.onChange)opts.onChange(positions()); }
    function positions(){ var o={}; items.forEach(function(it){ o[it.id]={x:it.x,z:it.z,rot:it.rot||0,w:it.w,d:it.d}; }); return o; }

    return {
      setRoom:function(r){ var out=r.outline||rectOutline(r.w,r.d); var xs=out.map(function(p){return p.x;}),zs=out.map(function(p){return p.z;});
        var bb={x0:Math.min.apply(null,xs),x1:Math.max.apply(null,xs),z0:Math.min.apply(null,zs),z1:Math.max.apply(null,zs)}; bb.w=bb.x1-bb.x0; bb.d=bb.z1-bb.z0;
        room={outline:out,doors:(r.doors||[]).map(function(d){return {wall:d.wall,at:d.at,width:d.width,type:(d.type||'tuer')};}),windows:(r.windows||[]).map(function(w){return {wall:w.wall,at:w.at,width:w.width,type:(w.type||'fenster')};}),name:r.name||'Raum',shapeLabel:r.shapeLabel||'rechteckig',bb:bb}; draw(); },
      setItems:function(list){ items=(list||[]).map(function(it){ return {id:it.id,t:it.t,kat:it.kat,col:it.col||'#9b8f78',w:it.w,d:it.d,x:it.x||0,z:it.z||0,rot:it.rot||0,flat:!!it.flat}; }); if(sel&&!items.some(function(i){return i.id===sel;}))sel=null; draw(); },
      getPositions:positions, getRoom:function(){ return roomInfo(); }, setSelected:function(id){ sel=id; draw(); }, clearSel:function(){ sel=null; draw(); },
      setMeasure:function(on){ measuring=!!on; if(!on)measureLine=null; if(on){sel=null;} draw(); },
      resize:resize, dispose:function(){ items=[]; }
    };
  }
  window.HeiBenPlan2D={ create:create };
})();
