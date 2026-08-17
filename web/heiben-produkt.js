/* HeiBen Produkt-Modul — Abos (monatlich/jährlich + Vorkasse), Probemonat, Freemium,
   Referral, Bundle, Streak, Lead-Magnet, Teilen, Abo-Lifecycle (Auto-Renew/Kündigung/
   Rechnungen/Zahlungsmethode-Demo), lokale Erinnerungen, Loyalty-Belohnungen.
   Prototyp ohne echten Zahlungsanbieter. window.HeiBenProdukt */
(function(){
  var K = window.HeiBenKonto || null;
  var DAY = 86400000;
  function load(k,def){ try{ var v=JSON.parse(localStorage.getItem(k)); return v==null?def:v; }catch(e){ return def; } }
  function save(k,v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }
  function now(){ return new Date(); }
  function iso(d){ return d.toISOString(); }
  function rand(n){ var s='ABCDEFGHJKLMNPQRSTUVWXYZ23456789',o=''; for(var i=0;i<n;i++) o+=s[Math.floor(Math.random()*s.length)]; return o; }
  function track(n,p){ try{ if(window.HeiBenTrack) window.HeiBenTrack.ev(n,p); }catch(e){} }

  /* ---------- Pläne ---------- */
  var PLANS = {
    lebenswissen: { label:'Lebenswissen', monat:1.90, jahr:14.90, trialDays:30,
      nutzen:'Alle Vertiefungen, Vorlagen & Rechner – neue Staffeln laufend.' },
    app:          { label:'Kulinarik-App', monat:6.90, jahr:69.00, trialDays:30,
      nutzen:'Saisonküche, Einkaufslisten, Rezept-Sync mit dem Kochbuch.' }
  };
  function jahrErsparnis(scope){ var p=PLANS[scope]; return Math.max(0, p.monat*12 - p.jahr); }

  /* ---------- Abo-Status ---------- */
  function aboAll(){ return load('heiben-abo', {}); }
  function aboState(scope){
    var a = aboAll()[scope] || {};
    var trialActive = a.trialUntil && new Date(a.trialUntil) > now();
    var subActive   = a.until && new Date(a.until) > now();
    var viaKonto = false; try { if(K && K.isPlus && K.isPlus()) viaKonto = true; } catch(e){}
    var status = trialActive ? 'Probemonat'
               : subActive ? (a.autoRenew!==false ? 'aktiv' : 'gekündigt – läuft aus')
               : (a.until ? 'abgelaufen' : 'kein Abo');
    return {
      scope:scope, plan:a.plan||null, cycle:a.cycle||null,
      trial:!!trialActive, active:!!subActive, access:(trialActive||subActive||viaKonto),
      until:a.until||null, trialUntil:a.trialUntil||null, since:a.since||null,
      autoRenew:a.autoRenew!==false, viaKonto:viaKonto, trialUsed:!!a.trialUsed,
      status:status, nextBilling:(subActive && a.autoRenew!==false)?a.until:null
    };
  }
  function setAbo(scope, patch){ var all=aboAll(); all[scope]=Object.assign({}, all[scope]||{}, patch); save('heiben-abo', all); }

  function startTrial(scope){
    var st=aboState(scope);
    if(st.trialUsed) return {error:'Probemonat bereits genutzt.'};
    if(st.access)   return {error:'Bereits aktiv.'};
    setAbo(scope, {trialUntil: iso(new Date(Date.now()+PLANS[scope].trialDays*DAY)), trialUsed:true, plan:scope, since:iso(now())});
    track('trial_start',{scope:scope}); return {ok:true};
  }
  function subscribe(scope, cycle){
    cycle = (cycle==='jahr')?'jahr':'monat';
    var add = (cycle==='jahr')?365:31;
    setAbo(scope, {plan:scope, cycle:cycle, until: iso(new Date(Date.now()+add*DAY)), since:iso(now()), autoRenew:true, trialUntil:null});
    addInvoice(scope, cycle, PLANS[scope][cycle]);
    try { if(K && K.setAboSelf) K.setAboSelf('plus'); } catch(e){}
    track('subscribe',{scope:scope,cycle:cycle,amount:PLANS[scope][cycle]});
    return {ok:true, cycle:cycle};
  }
  function cancel(scope){ setAbo(scope, {autoRenew:false}); track('cancel',{scope:scope}); return {ok:true}; }
  function resume(scope){ setAbo(scope, {autoRenew:true}); return {ok:true}; }

  /* ---------- Rechnungen / Lifecycle ---------- */
  function invoices(){ return load('heiben-invoices', []); }
  function addInvoice(scope, cycle, amount){
    var inv=invoices();
    inv.unshift({id:'R-'+Date.now().toString(36).toUpperCase(), scope:scope, cycle:cycle, amount:amount, date:iso(now()), status:'bezahlt'});
    save('heiben-invoices', inv.slice(0,60)); return inv[0];
  }
  function renewIfDue(){
    var all=aboAll(), changed=false;
    Object.keys(all).forEach(function(scope){
      var a=all[scope]; if(!a.until) return;
      while(a.autoRenew!==false && new Date(a.until) <= now()){
        var add=(a.cycle==='jahr')?365:31;
        a.until=iso(new Date(new Date(a.until).getTime()+add*DAY));
        addInvoice(scope, a.cycle||'monat', PLANS[scope]?PLANS[scope][a.cycle||'monat']:0);
        track('abo_renew',{scope:scope}); changed=true;
        if(new Date(a.until) > new Date(Date.now()+400*DAY)) break; /* Sicherung */
      }
    });
    if(changed) save('heiben-abo', all);
  }

  /* ---------- Zahlungsmethode (Demo) ---------- */
  function paymentMethod(){ return load('heiben-pay', null); }
  function setPaymentMethod(num){
    num=String(num||'').replace(/\s+/g,'');
    if(!/^\d{12,19}$/.test(num)) return {error:'Bitte eine gültige Kartennummer eingeben (Demo).'};
    var pm={brand:(num[0]==='4'?'Visa':(num[0]==='5'?'Mastercard':'Karte')), last4:num.slice(-4), at:iso(now())};
    save('heiben-pay', pm); return {ok:true, pm:pm};
  }

  /* ---------- Referral ---------- */
  function refState(){
    var r=load('heiben-ref', null);
    if(!r){ r={code:'HB-'+rand(5), applied:null, invited:0, creditsCt:0}; save('heiben-ref', r); }
    return r;
  }
  function applyCode(code){
    code=String(code||'').trim().toUpperCase();
    var r=refState();
    if(!/^HB-[A-Z0-9]{4,6}$/.test(code)) return {error:'Code ungültig.'};
    if(code===r.code) return {error:'Eigener Code zählt nicht.'};
    if(r.applied) return {error:'Es ist bereits ein Code hinterlegt.'};
    r.applied=code; save('heiben-ref', r); track('referral_applied',{}); return {ok:true, rabatt:0.10};
  }
  function discountForCart(){ var r=refState(); return r.applied ? 0.10 : 0; }
  function creditWerber(){ var r=refState(); r.invited++; r.creditsCt+=500; save('heiben-ref', r); track('referral_invite',{}); return r; }
  function refLink(){ var r=refState(); var base=location.origin+location.pathname.replace(/[^\/]+$/, 'manufaktur.html'); return base+'?ref='+r.code; }

  /* ---------- Bundle ---------- */
  var BUNDLE = { label:'Kochbuch + App-Probemonat', kochbuch:19.90, vorteil:'E-Book sofort + 30 Tage Kulinarik-App gratis' };
  function buyBundle(){ startTrial('app'); save('heiben-bundle', {at:iso(now())}); track('bundle',{}); return {ok:true}; }

  /* ---------- Streak + Loyalty ---------- */
  function streakState(){ return load('heiben-streak', {last:null, count:0, best:0}); }
  function streakPing(){
    var s=streakState(); var t=new Date(); var today=t.toISOString().slice(0,10);
    if(s.last===today) return s;
    var yest=new Date(Date.now()-DAY).toISOString().slice(0,10);
    s.count = (s.last===yest) ? s.count+1 : 1;
    s.last=today; s.best=Math.max(s.best||0, s.count); save('heiben-streak', s); track('streak_ping',{count:s.count}); return s;
  }
  var TIERS=[{d:3,ct:200},{d:7,ct:500},{d:14,ct:1000},{d:30,ct:2500}];
  function rewards(){ return load('heiben-rewards',{claimed:[]}); }
  function streakReward(){ var s=streakState(), r=rewards();
    return {due:TIERS.filter(function(t){return s.count>=t.d && r.claimed.indexOf(t.d)<0;}), claimed:r.claimed, tiers:TIERS, count:s.count}; }
  function claimRewards(){ var s=streakState(), r=rewards(), ref=refState(), got=0;
    TIERS.forEach(function(t){ if(s.count>=t.d && r.claimed.indexOf(t.d)<0){ r.claimed.push(t.d); ref.creditsCt+=t.ct; got+=t.ct; } });
    save('heiben-rewards',r); save('heiben-ref',ref); if(got) track('loyalty_claim',{got:got}); return {got:got, creditsCt:ref.creditsCt}; }

  /* ---------- Erinnerungen (lokal, ohne Backend) ---------- */
  function remindersOn(){ return !!load('heiben-reminders',{on:false}).on; }
  function enableReminders(){
    if(!('Notification' in window)) return Promise.resolve({error:'Dieser Browser unterstützt keine Benachrichtigungen.'});
    return Notification.requestPermission().then(function(p){ save('heiben-reminders',{on:p==='granted'}); return p==='granted'?{ok:true}:{error:'Benachrichtigungen wurden nicht erlaubt.'}; });
  }
  function notify(title, body){ try{ if(('Notification' in window)&&Notification.permission==='granted'){ new Notification(title,{body:body}); return true; } }catch(e){} return false; }
  function reEngage(){
    var s=streakState(); if(!s.last) return null;
    var today=new Date().toISOString().slice(0,10), yest=new Date(Date.now()-DAY).toISOString().slice(0,10);
    if(s.last===today) return null;
    if(s.last===yest) return {type:'keep', msg:'Heute kochen hält deine '+s.count+'-Tage-Serie. 🔥'};
    return {type:'back', msg:'Schön, dich wiederzusehen — starte heute eine neue Koch-Serie.'};
  }

  /* ---------- Lead-Magnet ---------- */
  function leadMagnet(email){
    email=String(email||'').trim();
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return {error:'Bitte eine gültige E-Mail-Adresse angeben.'};
    try { if(K && K.nlGuest) K.nlGuest(email); } catch(e){}
    save('heiben-lead', {email:email, miniCookbook:true, at:iso(now())}); track('lead_magnet',{}); return {ok:true};
  }
  function leadHas(){ return !!(load('heiben-lead',{}).miniCookbook); }

  /* ---------- Teilen ---------- */
  function shareDesign(payload){
    var enc=''; try{ enc=btoa(unescape(encodeURIComponent(JSON.stringify(payload||{})))); }catch(e){}
    return location.origin+location.pathname+'?d='+enc;
  }
  function readShared(){
    var q=new URLSearchParams(location.search).get('d'); if(!q) return null;
    try{ return JSON.parse(decodeURIComponent(escape(atob(q)))); }catch(e){ return null; }
  }
  function copy(text){
    try{ navigator.clipboard.writeText(text); return true; }catch(e){}
    try{ var t=document.createElement('textarea'); t.value=text; document.body.appendChild(t); t.select(); document.execCommand('copy'); t.remove(); return true; }catch(e){ return false; }
  }
  function toast(msg){
    var d=document.createElement('div'); d.textContent=msg;
    d.style.cssText='position:fixed;left:50%;bottom:26px;transform:translateX(-50%);background:#1f1c17;color:#f3eee5;'+
      'font:600 .9rem/1.3 Manrope,system-ui,sans-serif;padding:12px 18px;border-radius:12px;z-index:9999;box-shadow:0 8px 30px rgba(0,0,0,.25);max-width:90vw;';
    document.body.appendChild(d); setTimeout(function(){ d.style.transition='opacity .4s'; d.style.opacity='0'; setTimeout(function(){d.remove();},420); }, 2600);
  }

  /* Init: Referral aus URL, fällige Abrechnungen nachziehen */
  try { var rc=new URLSearchParams(location.search).get('ref'); if(rc){ var rr=refState(); if(!rr.applied && rc.toUpperCase()!==rr.code){ applyCode(rc); } } } catch(e){}
  try { renewIfDue(); } catch(e){}

  window.HeiBenProdukt = {
    PLANS:PLANS, BUNDLE:BUNDLE, jahrErsparnis:jahrErsparnis,
    aboState:aboState, startTrial:startTrial, subscribe:subscribe, cancel:cancel, resume:resume,
    hasAccess:function(scope){ return aboState(scope).access; },
    invoices:invoices, renewIfDue:renewIfDue, paymentMethod:paymentMethod, setPaymentMethod:setPaymentMethod,
    refState:refState, applyCode:applyCode, discountForCart:discountForCart, creditWerber:creditWerber, refLink:refLink,
    buyBundle:buyBundle, streakState:streakState, streakPing:streakPing,
    streakReward:streakReward, claimRewards:claimRewards,
    remindersOn:remindersOn, enableReminders:enableReminders, notify:notify, reEngage:reEngage,
    leadMagnet:leadMagnet, leadHas:leadHas,
    shareDesign:shareDesign, readShared:readShared, copy:copy, toast:toast,
    fmt:function(e){ return (e||0).toFixed(2).replace('.',',')+'\u00a0€'; }
  };
})();
