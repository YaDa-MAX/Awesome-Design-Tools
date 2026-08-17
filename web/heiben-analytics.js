/* HeiBen Analytics — leichtgewichtiges, clientseitiges Event-/Funnel-Tracking (ohne Backend).
   Erfasst Funnel-Schritte lokal für das Wachstums-Dashboard. window.HeiBenTrack */
(function(){
  var KEY='heiben-events', MAX=800;
  function load(){ try{ return JSON.parse(localStorage.getItem(KEY))||[]; }catch(e){ return []; } }
  function save(a){ try{ localStorage.setItem(KEY, JSON.stringify(a.slice(-MAX))); }catch(e){} }
  function ev(name, props){
    var a=load(); a.push({t:new Date().toISOString(), n:name, p:props||{}, path:location.pathname.split('/').pop()});
    save(a); return true;
  }
  function events(){ return load(); }
  function count(name){ return load().filter(function(e){return e.n===name;}).length; }
  function clear(){ try{ localStorage.removeItem(KEY); }catch(e){} }
  function funnel(){
    var visits=count('page_view'), trial=count('trial_start'), sub=count('subscribe'),
        cfg=count('configurator_add_to_cart'), kb=count('kochbuch_purchase'),
        inv=count('referral_invite'), lead=count('lead_magnet'), bundle=count('bundle');
    function pct(a,b){ return b>0?Math.round(a/b*100):0; }
    return {
      steps:[
        {k:'Besuche', v:visits},
        {k:'Lead-Magnet', v:lead},
        {k:'Probemonat', v:trial},
        {k:'Abo abgeschlossen', v:sub},
        {k:'Konfigurator-Kauf', v:cfg},
        {k:'Kochbuch-Kauf', v:kb},
        {k:'Referral-Einladungen', v:inv},
        {k:'Bundle', v:bundle}
      ],
      conv:{ besuch_trial:pct(trial,visits), trial_abo:pct(sub,trial), besuch_abo:pct(sub,visits) }
    };
  }
  /* Auto: Seitenaufruf zählen (einmal pro Seitenladung) */
  try{ ev('page_view',{}); }catch(e){}
  window.HeiBenTrack={ ev:ev, events:events, count:count, funnel:funnel, clear:clear };
})();
