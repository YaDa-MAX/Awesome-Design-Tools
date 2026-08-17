/* HeiBen A/B — sticky Varianten-Zuteilung + Tracking über HeiBenTrack. window.HeiBenAB */
(function(){
  function ld(){ try{ return JSON.parse(localStorage.getItem('heiben-ab'))||{}; }catch(e){ return {}; } }
  function sv(o){ try{ localStorage.setItem('heiben-ab',JSON.stringify(o)); }catch(e){} }
  function ev(n,p){ try{ if(window.HeiBenTrack) HeiBenTrack.ev(n,p); }catch(e){} }
  function variant(exp, list){ var o=ld(); if(!o[exp]){ o[exp]=list[Math.floor(Math.random()*list.length)]; sv(o); } return o[exp]; }
  var _viewed={};
  function view(exp, list){ var v=variant(exp,list); if(!_viewed[exp]){ _viewed[exp]=1; ev('ab_view',{exp:exp,v:v}); } return v; }
  function convert(exp){ var v=ld()[exp]; if(v) ev('ab_convert',{exp:exp,v:v}); }
  function results(exp, list){
    var evs=(window.HeiBenTrack&&HeiBenTrack.events())||[];
    return list.map(function(v){ var views=0,conv=0;
      evs.forEach(function(e){ if(e.p&&e.p.exp===exp&&e.p.v===v){ if(e.n==='ab_view')views++; else if(e.n==='ab_convert')conv++; } });
      return {v:v, views:views, conv:conv, rate:views?Math.round(conv/views*100):0}; });
  }
  window.HeiBenAB={ variant:variant, view:view, convert:convert, results:results };
})();
