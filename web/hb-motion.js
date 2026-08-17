/* HeiBen — ausgelagert aus 37 Seiten (Remake v3, Welle 1).
   Inhalt wortgleich uebernommen, nicht ueberarbeitet. */
(function(){
  if(!('IntersectionObserver' in window)) return;
  if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var els=[];
  document.querySelectorAll('section, header.subhero, footer').forEach(function(el){ el.classList.add('hb-rv'); els.push(el); });
  document.querySelectorAll('[class*="grid"]').forEach(function(g){
    if(g.closest('nav')) return;
    Array.prototype.slice.call(g.children,0,12).forEach(function(el,i){
      el.classList.add('hb-rv'); el.style.setProperty('--hbd',(Math.min(i,8)*0.075)+'s'); els.push(el);
    });
  });
  els.forEach(function(el){
    el.addEventListener('animationend',function h(){ el.classList.add('hb-done'); el.removeEventListener('animationend',h); });
  });
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add('hb-go'); io.unobserve(en.target); } });
  },{threshold:.05,rootMargin:'0px 0px -4% 0px'});
  els.forEach(function(el){ io.observe(el); });
  /* Sicherheitsnetz: nach 3s ist garantiert alles sichtbar */
  setTimeout(function(){ els.forEach(function(el){ el.classList.add('hb-go'); }); io.disconnect(); },3000);
})();
