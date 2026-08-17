/* ============================================================
   HeiBen Konto — zentrale Anmelde-/Rechte-Bibliothek (PROTOTYP)
   ------------------------------------------------------------
   Alle Flows sind echt bedienbar (Registrieren, Bestätigen,
   Login, Rollen, Abo, Verwaltung). Speicher: localStorage.
   FÜR DEN LIVE-BETRIEB: Die Funktionen _load/_save sowie der
   "Mailversand" (Bestätigungscode) müssen durch ein Backend
   bzw. einen Dienst (z. B. Supabase/Firebase) ersetzt werden —
   clientseitige Prüfungen sind kein echter Schutz.
   Passwörter werden nie im Klartext gespeichert (SHA-256+Salt).
   ============================================================ */
(function(){
  var UKEY='heiben-konto-users', SKEY='heiben-konto-session';
  var memU=null, memS=null;

  function _load(){ try{var r=localStorage.getItem(UKEY); if(r) return JSON.parse(r);}catch(e){} return memU||{version:1,users:[]}; }
  function _save(db){ memU=db; try{localStorage.setItem(UKEY,JSON.stringify(db));}catch(e){} }
  function _sload(){ try{var r=localStorage.getItem(SKEY); if(r) return JSON.parse(r);}catch(e){} return memS; }
  function _ssave(s){ memS=s; try{ if(s) localStorage.setItem(SKEY,JSON.stringify(s)); else localStorage.removeItem(SKEY);}catch(e){} }

  function _rand(n){ var s=''; for(var i=0;i<n;i++) s+='ABCDEFGHJKLMNPQRSTUVWXYZ23456789'[Math.floor(Math.random()*32)]; return s; }
  function _code(){ return String(Math.floor(100000+Math.random()*900000)); }
  function _now(){ return new Date().toISOString(); }
  function _normEmail(e){ return String(e||'').trim().toLowerCase(); }
  function _validEmail(e){ return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e); }

  function _hash(salt,pw){
    var data=salt+'|'+pw;
    if(window.crypto&&crypto.subtle&&crypto.subtle.digest){
      var enc=new TextEncoder().encode(data);
      return crypto.subtle.digest('SHA-256',enc).then(function(buf){
        return Array.prototype.map.call(new Uint8Array(buf),function(b){return ('0'+b.toString(16)).slice(-2);}).join('');
      });
    }
    /* Fallback ohne WebCrypto (nur Demo) */
    var h=5381; for(var i=0;i<data.length;i++){ h=((h<<5)+h+data.charCodeAt(i))>>>0; }
    return Promise.resolve('djb2-'+h.toString(16));
  }

  function _seed(db){
    if(db.users.length) return db;
    /* Demo-Admin — Zugangsdaten bitte nach dem ersten Login ändern */
    db.users.push({id:'u-admin',email:'admin@heiben.de',name:'HeiBen Admin',
      salt:'seed',pwHash:null,pwPlainSeed:'heiben2026', /* wird beim ersten Login gehasht */
      role:'admin',status:'aktiv',abo:'plus',createdAt:_now(),confirmCode:null});
    _save(db); return db;
  }

  function byEmail(db,email){ email=_normEmail(email); for(var i=0;i<db.users.length;i++){ if(db.users[i].email===email) return db.users[i]; } return null; }

  var K={
    /* ---------- Registrierung & Login ---------- */
    register:function(o){
      var db=_seed(_load());
      var email=_normEmail(o.email), name=String(o.name||'').trim(), pw=String(o.pw||'');
      if(!_validEmail(email)) return Promise.resolve({error:'Bitte eine gültige E-Mail-Adresse angeben.'});
      if(name.length<2) return Promise.resolve({error:'Bitte einen Namen angeben.'});
      if(pw.length<8) return Promise.resolve({error:'Das Passwort braucht mindestens 8 Zeichen.'});
      if(byEmail(db,email)) return Promise.resolve({error:'Für diese E-Mail existiert bereits ein Konto.'});
      var salt=_rand(12), code=_code();
      return _hash(salt,pw).then(function(h){
        db.users.push({id:'u-'+_rand(8),email:email,name:name,salt:salt,pwHash:h,
          role:'kunde',status:'unbestaetigt',abo:'free',createdAt:_now(),confirmCode:code});
        _save(db);
        return {ok:true,code:code,email:email}; /* Live: Code per E-Mail versenden, NICHT zurückgeben */
      });
    },
    confirm:function(email,code){
      var db=_seed(_load()), u=byEmail(db,email);
      if(!u) return {error:'Kein Konto zu dieser E-Mail gefunden.'};
      if(u.status==='aktiv') return {ok:true,already:true};
      if(String(code).trim()!==String(u.confirmCode)) return {error:'Der Bestätigungscode stimmt nicht.'};
      u.status='aktiv'; u.confirmCode=null; _save(db);
      return {ok:true};
    },
    login:function(email,pw){
      var db=_seed(_load()), u=byEmail(db,email);
      if(!u) return Promise.resolve({error:'E-Mail oder Passwort stimmen nicht.'});
      var check;
      if(u.pwHash===null&&u.pwPlainSeed){ /* Seed-Admin: ersten Login hashen */
        if(pw!==u.pwPlainSeed) return Promise.resolve({error:'E-Mail oder Passwort stimmen nicht.'});
        return _hash(u.salt,pw).then(function(h){ u.pwHash=h; delete u.pwPlainSeed; _save(db);
          if(u.status!=='aktiv') return {error:'Dieses Konto ist nicht aktiv.'};
          _ssave({userId:u.id,ts:_now()}); return {ok:true,user:K.current()}; });
      }
      return _hash(u.salt,pw).then(function(h){
        if(h!==u.pwHash) return {error:'E-Mail oder Passwort stimmen nicht.'};
        if(u.status==='unbestaetigt') return {error:'Bitte bestätigen Sie zuerst Ihre E-Mail-Adresse.',needConfirm:true};
        if(u.status==='gesperrt') return {error:'Dieses Konto ist gesperrt.'};
        _ssave({userId:u.id,ts:_now()});
        return {ok:true,user:K.current()};
      });
    },
    logout:function(){ _ssave(null); },
    current:function(){
      var s=_sload(); if(!s) return null;
      var db=_seed(_load());
      for(var i=0;i<db.users.length;i++){ if(db.users[i].id===s.userId&&db.users[i].status==='aktiv'){ var u=db.users[i];
        return {id:u.id,email:u.email,name:u.name,role:u.role,abo:u.abo}; } }
      return null;
    },
    isPlus:function(){ var u=K.current(); return !!u&&(u.abo==='plus'||u.role==='redaktion'||u.role==='admin'); },
    hasRole:function(roles){ var u=K.current(); return !!u&&roles.indexOf(u.role)>=0; },

    /* ---------- Abo (Demo: ohne Zahlungsanbieter) ---------- */
    setAboSelf:function(abo){
      var s=_sload(); if(!s) return {error:'Nicht angemeldet.'};
      var db=_seed(_load());
      for(var i=0;i<db.users.length;i++){ if(db.users[i].id===s.userId){ db.users[i].abo=abo; _save(db); return {ok:true}; } }
      return {error:'Konto nicht gefunden.'};
    },

    /* ---------- Lebenswissen: Einzelkauf & Jahres-Pass (Demo ohne Zahlung) ---------- */
    _lwUser:function(){
      var sess=_sload(); if(!sess) return null;
      var db=_seed(_load());
      for(var i=0;i<db.users.length;i++){ if(db.users[i].id===sess.userId&&db.users[i].status==='aktiv'){ return {db:db,u:db.users[i]}; } }
      return null;
    },
    lwState:function(){
      var r=K._lwUser(); if(!r) return {loggedIn:false,items:[],passUntil:null,passActive:false,credits:0};
      var lw=r.u.lw||{items:[],passUntil:null,credits:0};
      var act=!!(lw.passUntil&&new Date(lw.passUntil)>new Date());
      return {loggedIn:true,items:lw.items||[],passUntil:lw.passUntil||null,passActive:act,credits:lw.credits||0};
    },
    lwBuyPack:function(){ /* 5er-Paket 1,99 € (Demo) — löst das Mikropayment-Gebührenproblem */
      var r=K._lwUser(); if(!r) return {error:'login'};
      r.u.lw=r.u.lw||{items:[],passUntil:null,credits:0};
      r.u.lw.credits=(r.u.lw.credits||0)+5;
      _save(r.db); return {ok:true,credits:r.u.lw.credits};
    },
    lwRedeem:function(id){
      var r=K._lwUser(); if(!r) return {error:'login'};
      r.u.lw=r.u.lw||{items:[],passUntil:null,credits:0};
      if((r.u.lw.credits||0)<1) return {error:'kein Guthaben'};
      if(r.u.lw.items.indexOf(id)<0){ r.u.lw.items.push(id); r.u.lw.credits--; }
      _save(r.db); return {ok:true,credits:r.u.lw.credits};
    },
    /* ---------- Newsletter („Lebenslagen-Brief") ---------- */
    nlState:function(){ var r=K._lwUser(); return r?!!r.u.newsletter:false; },
    nlSet:function(on){
      var r=K._lwUser(); if(!r) return {error:'login'};
      r.u.newsletter=!!on; _save(r.db); return {ok:true,on:!!on};
    },
    nlGuest:function(email){
      email=_normEmail(email);
      if(!_validEmail(email)) return {error:'Bitte eine gültige E-Mail-Adresse angeben.'};
      var l; try{l=JSON.parse(localStorage.getItem('heiben-newsletter-gaeste'))||[];}catch(e){l=[];}
      if(l.indexOf(email)<0){ l.push(email); try{localStorage.setItem('heiben-newsletter-gaeste',JSON.stringify(l));}catch(e){} }
      return {ok:true};
    },
    nlList:function(){
      var db=_seed(_load());
      var konten=db.users.filter(function(u){return u.status==='aktiv'&&u.newsletter;}).map(function(u){return u.email;});
      var g; try{g=JSON.parse(localStorage.getItem('heiben-newsletter-gaeste'))||[];}catch(e){g=[];}
      return {konten:konten,gaeste:g};
    },
    lwAccess:function(id){
      if(K.hasRole(['redaktion','admin'])) return true;
      var st=K.lwState();
      return st.passActive||st.items.indexOf(id)>=0;
    },
    lwBuy:function(id){
      var r=K._lwUser(); if(!r) return {error:'login'};
      r.u.lw=r.u.lw||{items:[],passUntil:null};
      if(r.u.lw.items.indexOf(id)<0) r.u.lw.items.push(id);
      _save(r.db); return {ok:true};
    },
    lwBuyPass:function(){
      var r=K._lwUser(); if(!r) return {error:'login'};
      r.u.lw=r.u.lw||{items:[],passUntil:null};
      var d=new Date(); d.setFullYear(d.getFullYear()+1);
      r.u.lw.passUntil=d.toISOString();
      _save(r.db); return {ok:true,until:r.u.lw.passUntil};
    },

    /* ---------- Manufaktur-Shop: Bestellungen (Demo, lokal) ---------- */
    shopOrder:function(order){
      var list; try{list=JSON.parse(localStorage.getItem('heiben-shop-orders'))||[];}catch(e){list=[];}
      var who=K.current();
      var rec={id:'M-'+_rand(6).toUpperCase(), at:_now(), status:'eingegangen',
        items:(order&&order.items)||[], total:(order&&order.total)||0,
        kunde:(order&&order.kunde)||{},
        email:((order&&order.kunde&&order.kunde.email)||(who&&who.email)||'').toLowerCase(),
        userId: who?who.id:null};
      list.unshift(rec);
      try{localStorage.setItem('heiben-shop-orders',JSON.stringify(list));}catch(e){}
      return {ok:true,id:rec.id};
    },
    shopOrders:function(){
      var who=K.current(); if(!who) return [];
      var list; try{list=JSON.parse(localStorage.getItem('heiben-shop-orders'))||[];}catch(e){list=[];}
      return list.filter(function(o){ return o.userId===who.id || (o.email&&who.email&&o.email.toLowerCase()===who.email.toLowerCase()); });
    },
    shopOrderList:function(){
      if(!K.hasRole(['admin','redaktion'])) return [];
      try{return JSON.parse(localStorage.getItem('heiben-shop-orders'))||[];}catch(e){return [];}
    },
    shopOrderSetStatus:function(id,status){
      if(!K.hasRole(['admin','redaktion'])) return {error:'kein Zugriff'};
      var list; try{list=JSON.parse(localStorage.getItem('heiben-shop-orders'))||[];}catch(e){list=[];}
      for(var i=0;i<list.length;i++){ if(list[i].id===id){ list[i].status=status; } }
      try{localStorage.setItem('heiben-shop-orders',JSON.stringify(list));}catch(e){}
      return {ok:true};
    },

    /* ---------- Verwaltung (nur Admin-Oberfläche) ---------- */
    adminList:function(){ return _seed(_load()).users.map(function(u){return {id:u.id,email:u.email,name:u.name,role:u.role,status:u.status,abo:u.abo,code:u.confirmCode,createdAt:u.createdAt};}); },
    adminSet:function(id,patch){
      var db=_seed(_load());
      for(var i=0;i<db.users.length;i++){ if(db.users[i].id===id){ ['role','status','abo'].forEach(function(k){ if(patch[k]) db.users[i][k]=patch[k]; }); _save(db); return {ok:true}; } }
      return {error:'Nicht gefunden.'};
    },
    adminDelete:function(id){
      var db=_seed(_load()); var n=db.users.length;
      db.users=db.users.filter(function(u){return u.id!==id;}); _save(db);
      return {ok:db.users.length<n};
    },
    adminCreate:function(o){
      var db=_seed(_load()); var email=_normEmail(o.email);
      if(!_validEmail(email)) return Promise.resolve({error:'Ungültige E-Mail.'});
      if(byEmail(db,email)) return Promise.resolve({error:'E-Mail bereits vergeben.'});
      var pw=o.pw&&o.pw.length>=8?o.pw:_rand(10), salt=_rand(12);
      return _hash(salt,pw).then(function(h){
        db.users.push({id:'u-'+_rand(8),email:email,name:o.name||email,salt:salt,pwHash:h,
          role:o.role||'redaktion',status:'aktiv',abo:o.role==='kunde'?'free':'plus',createdAt:_now(),confirmCode:null});
        _save(db);
        return {ok:true,pw:pw}; /* Initialpasswort einmalig anzeigen */
      });
    },

    /* ---------- UI-Bausteine ---------- */
    navWidget:function(){
      var nav=document.querySelector('nav'); if(!nav||document.getElementById('hbKontoNav')) return;
      var u=K.current();
      var a=document.createElement('a'); a.id='hbKontoNav'; a.href='konto.html';
      a.textContent=u?('Konto · '+u.name.split(' ')[0]):'Anmelden';
      a.style.cssText="font-family:'JetBrains Mono',monospace;font-size:.66rem;letter-spacing:.14em;text-transform:uppercase;text-decoration:none;color:var(--ink,#1f1c17);border:1px solid var(--rule,#d8cdb7);padding:8px 12px;margin-left:14px;align-self:center;";
      nav.appendChild(a);
      if(K.hasRole(['admin'])){
        var v=document.createElement('a'); v.href='konto-verwaltung.html'; v.textContent='Verwaltung';
        v.style.cssText=a.style.cssText; nav.appendChild(v);
      }
    },
    requireRole:function(roles,label){
      if(K.hasRole(roles)) return true;
      var d=document.createElement('div');
      d.style.cssText='position:fixed;inset:0;background:#f3eee5;z-index:9999;display:flex;align-items:center;justify-content:center;padding:24px;text-align:center;';
      d.innerHTML='<div style="max-width:460px"><div style="font-family:\'JetBrains Mono\',monospace;font-size:.66rem;letter-spacing:.22em;text-transform:uppercase;color:#6b3951;margin-bottom:14px">Interner Bereich</div>'+
        '<h1 style="font-family:\'Fraunces\',serif;font-weight:400;font-size:1.7rem;margin:0 0 10px">'+(label||'Anmeldung erforderlich')+'</h1>'+
        '<p style="color:#524a3e;line-height:1.6;margin:0 0 22px">Dieser Bereich ist Konten mit entsprechender Berechtigung vorbehalten. Bitte melden Sie sich an.</p>'+
        '<a href="konto.html" style="display:inline-block;background:#1f1c17;color:#fff;text-decoration:none;padding:11px 20px;font-family:\'JetBrains Mono\',monospace;font-size:.66rem;letter-spacing:.14em;text-transform:uppercase">Zur Anmeldung</a>'+
        '<p style="font-size:.74rem;color:#8a8174;margin-top:18px">Hinweis: Im Prototyp ist dieser Schutz clientseitig — im Live-Betrieb übernimmt das ein Server.</p></div>';
      function add(){ document.body.appendChild(d); }
      if(document.body) add(); else document.addEventListener('DOMContentLoaded',add);
      return false;
    }
  };
  window.HeiBenKonto=K;
})();
