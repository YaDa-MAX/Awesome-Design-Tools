/* HeiBen — ausgelagert aus 42 Seiten (Remake v3, Welle 1).
   Inhalt wortgleich uebernommen, nicht ueberarbeitet. */
(function(){
  /* Service-Worker registrieren */
  if('serviceWorker' in navigator){
    window.addEventListener('load',function(){ navigator.serviceWorker.register('service-worker.js').catch(function(){}); });
  }
  /* Bereits als App installiert? Dann keine Aufforderung. */
  function standalone(){ return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone===true; }
  if(standalone()) return;
  try{ if(localStorage.getItem('heiben-pwa-dismiss')==='1') return; }catch(e){}
  var deferred=null;
  function bar(html){
    if(document.getElementById('hbInstall')) return document.getElementById('hbInstall');
    var d=document.createElement('div'); d.id='hbInstall';
    d.style.cssText='position:fixed;left:12px;right:12px;bottom:12px;z-index:9000;max-width:520px;margin:0 auto;background:var(--ink,#1f1c17);color:#f3eee5;border-radius:14px;padding:13px 14px;box-shadow:0 14px 40px rgba(31,28,23,.35);display:flex;align-items:center;gap:12px;font-family:Manrope,system-ui,sans-serif;';
    d.innerHTML=html;
    document.body.appendChild(d); return d;
  }
  function dismiss(){ try{localStorage.setItem('heiben-pwa-dismiss','1');}catch(e){} var b=document.getElementById('hbInstall'); if(b) b.remove(); }
  /* Android / Desktop-Chromium: echtes Installieren */
  window.addEventListener('beforeinstallprompt',function(e){
    e.preventDefault(); deferred=e;
    var d=bar('<img src="assets/favicon-192.png" alt="" style="width:38px;height:38px;border-radius:9px;flex:0 0 auto" />'+
      '<div style="flex:1;line-height:1.35"><b style="font-size:.92rem">HeiBen als App installieren</b><br><span style="font-size:.78rem;opacity:.8">Schnellzugriff, Offline-Nutzung, eigenes Symbol.</span></div>'+
      '<button id="hbInstBtn" style="flex:0 0 auto;border:0;border-radius:8px;background:#b04a31;color:#fff;padding:9px 13px;font-family:\'JetBrains Mono\',monospace;font-size:.62rem;letter-spacing:.1em;text-transform:uppercase;cursor:pointer">Installieren</button>'+
      '<button id="hbInstX" aria-label="Schließen" style="flex:0 0 auto;border:0;background:none;color:#f3eee5;font-size:1.1rem;cursor:pointer;opacity:.7">✕</button>');
    d.querySelector('#hbInstBtn').addEventListener('click',function(){ if(!deferred) return; deferred.prompt(); deferred.userChoice.then(function(){ deferred=null; var b=document.getElementById('hbInstall'); if(b) b.remove(); }); });
    d.querySelector('#hbInstX').addEventListener('click',dismiss);
  });
  window.addEventListener('appinstalled',function(){ var b=document.getElementById('hbInstall'); if(b) b.remove(); });
  /* iOS Safari: kein beforeinstallprompt -> Hinweis „Teilen -> Zum Home-Bildschirm" */
  var ua=navigator.userAgent||'';
  var isIOS=/iphone|ipad|ipod/i.test(ua);
  var isSafari=/safari/i.test(ua)&&!/crios|fxios|edgios/i.test(ua);
  if(isIOS&&isSafari){
    setTimeout(function(){
      if(standalone()||document.getElementById('hbInstall')) return;
      var d=bar('<img src="assets/favicon-192.png" alt="" style="width:38px;height:38px;border-radius:9px;flex:0 0 auto" />'+
        '<div style="flex:1;line-height:1.35"><b style="font-size:.92rem">Zum Home-Bildschirm hinzufügen</b><br><span style="font-size:.78rem;opacity:.8">Tippen Sie auf <b>Teilen</b> ▵ und dann „Zum Home-Bildschirm".</span></div>'+
        '<button id="hbInstX" aria-label="Schließen" style="flex:0 0 auto;border:0;background:none;color:#f3eee5;font-size:1.1rem;cursor:pointer;opacity:.7">✕</button>');
      d.querySelector('#hbInstX').addEventListener('click',dismiss);
    },1600);
  }
})();
