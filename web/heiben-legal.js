/* HeiBen — schlanker, ehrlicher Hinweis: nur technisch notwendige lokale Speicherung. */
(function(){
  try{ if(localStorage.getItem('heiben-consent')) return; }catch(e){ return; }
  function mount(){
    var bar=document.createElement('div');
    bar.setAttribute('role','region'); bar.setAttribute('aria-label','Hinweis zur Datenspeicherung');
    bar.style.cssText='position:fixed;left:0;right:0;bottom:0;z-index:9999;background:#1f1c17;color:#f3eee5;font-family:Manrope,sans-serif;font-size:.86rem;line-height:1.5;padding:.9rem 1.1rem;display:flex;gap:1rem;align-items:center;justify-content:center;flex-wrap:wrap;box-shadow:0 -6px 20px rgba(0,0,0,.18)';
    bar.innerHTML='<span style="max-width:62ch">Diese Website speichert nur technisch notwendige Daten lokal in deinem Browser (z. B. Warenkorb, Einstellungen) — keine Tracking-Cookies. Mehr in der <a href="datenschutz.html" style="color:#a97a1d">Datenschutzerklärung</a>.</span><button id="hbConsentOk" style="border:0;cursor:pointer;background:#b04a31;color:#f3eee5;font-family:JetBrains Mono,monospace;font-size:.62rem;letter-spacing:.1em;text-transform:uppercase;padding:.6rem 1rem;border-radius:8px">Verstanden</button>';
    document.body.appendChild(bar);
    var b=document.getElementById('hbConsentOk'); if(b) b.addEventListener('click',function(){ try{localStorage.setItem('heiben-consent','1');}catch(e){} bar.remove(); });
  }
  if(document.body) mount(); else document.addEventListener('DOMContentLoaded',mount);
})();
