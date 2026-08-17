/* HeiBen Service-Worker — Offline-Fähigkeit & App-Shell (v20260615-1323) */
const CACHE='heiben-v20260622-2990';
const PRECACHE=[
  "index.html",
  "404.html",
  "anfragenverwaltung.html",
  "assets/apple-touch-icon.png",
  "assets/favicon-192.png",
  "assets/favicon-32.png",
  "assets/favicon-512.png",
  "assets/favicon.svg",
  "assets/hero-dark.png",
  "assets/hero-light.png",
  "assets/icon-source-1024.png",
  "assets/maskable-192.png",
  "assets/maskable-512.png",
  "assets/monogram-dark.png",
  "assets/monogram-light.png",
  "assets/wordmark-holding.png",
  "assets/wordmark-immobilien.png",
  "assets/wordmark-kulinarik.png",
  "assets/wordmark-on-dark.png",
  "assets/wordmark-reisen.png",
  "assets/wordmark-studio.png",
  "assets/wordmark-wohnen.png",
  "bestellverwaltung.html",
  "datenschutz.html",
  "familie.html",
  "heiben-konto.js",
  "immobilien-anfrage.html",
  "immobilien.html",
  "impressum.html",
  "agb.html",
  "widerruf.html",
  "rechtliches.html",
  "unternehmen.html",
  "reisen-kuratiert.html",
  "reisen-planer.html",
  "studio-einrichtungstheorie.html",
  "heiben-room3d.js",
  "heiben-plan2d.js",
  "vendor/three/three.min.js",
  "vendor/three/OrbitControls.js",
  "heiben-pdf.js",
  "vendor/jspdf/jspdf.umd.min.js",
  "heiben-firmierungen.js",
  "heiben-angebot.js",
  "welt-cockpit.html",
  "holding-dashboard.html",
  "wohnen-planer.html",
  "immobilien-planner.html",
  "kulinarik-planner.html",
  "vendor/leaflet/leaflet.js",
  "vendor/leaflet/leaflet.css",
  "immobilien-angebote.html",
  "studio-lebenswissen-bibliothek.html",
  "studio-lebenswissen-redaktion.html",
  "kulinarik-heute.html",
  "api.html",
  "openapi.yaml",
  "vendor/swagger-ui/swagger-ui.css",
  "vendor/swagger-ui/swagger-ui-bundle.js",
  "heiben-legal.js",
  "konto-verwaltung.html",
  "konto.html",
  "kulinarik-daten.js",
  "kulinarik-export.html",
  "kulinarik-redaktion.html",
  "kulinarik-rezept.html",
  "kulinarik-rezepte.html",
  "kulinarik-rezeptwuerfel.html",
  "kulinarik-wochenplan.html",
  "kulinarik.html",
  "lebenswissen-daten.js",
  "lebenswissen-tools.js",
  "lernpfade-daten.js",
  "heiben-stand.js",
  "heiben-erfolge.js",
  "manifest.webmanifest",
  "reisen-anfrage.html",
  "reisen.html",
  "schaufenster-detail.html",
  "schaufenster-redaktion.html",
  "schaufenster.html",
  "studio-artikel.html",
  "studio-lebenswissen-artikel.html",
  "studio-lebenswissen.html",
  "studio-magazin.html",
  "studio-redaktion.html",
  "studio.html",
  "suche-index.js",
  "suche.html",
  "wohnen-anfrage.html",
  "wohnen-konfigurator.html",
  "wohnen.html",
  "manufaktur.html",
  "manufaktur-gestalten.html",
  "manufaktur-gestalten.js",
  "manufaktur-rezepte.js",
  "manufaktur-kalkulation.html",
  "manufaktur-maschinencode.html",
  "manufaktur-bestellungen.html",
  "three.min.js",
  "heiben-produkt.js",
  "heiben-analytics.js",
  "heiben-ab.js",
  "kulinarik-lebensmittel.js",
  "manufaktur-galerie.html",
  "heiben-automation.html",
  "mein-abo.html",
  "kulinarik-kochbuch.html",
  "kulinarik-mealplanner.html",
  "heiben-wachstum.html",
  "kulinarik-app.html",
  /* Remake v3 · Welle 1 — ausgelagerte gemeinsame Dateien */
  "styles.css",
  "heiben-design.css",
  "heiben-nav.js",
  "hb-bestand-redaktion.css",
  "hb-bestand-statisch.css",
  "hb-weltmosaik.css",
  "hb-menue.css",
  "hb-motion.css",
  "hb-motion.js",
  "hb-pwa.js",
  "hb-suche-nav.js",
  "hb-kulinarik-core.js",
  "hb-schaufenster-core.js",
  "hb-magazin-core.js",
  "hb-anfrage-core.js",
  "hb-anfrage-app.js"
];
self.addEventListener('install',function(e){
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(function(c){
    return Promise.all(PRECACHE.map(function(u){
      return c.add(new Request(u,{cache:'reload'})).catch(function(){});
    }));
  }));
});
self.addEventListener('activate',function(e){
  e.waitUntil(caches.keys().then(function(keys){
    return Promise.all(keys.filter(function(k){return k!==CACHE;}).map(function(k){return caches.delete(k);}));
  }).then(function(){return self.clients.claim();}));
});
self.addEventListener('fetch',function(e){
  var req=e.request;
  if(req.method!=='GET') return;
  var url=new URL(req.url);
  if(url.origin!==location.origin) return; /* Drittanbieter (z.B. Amazon-Links) nie cachen */
  var isNav=req.mode==='navigate'||(req.headers.get('accept')||'').indexOf('text/html')>=0;
  if(isNav){
    /* Netzwerk zuerst, dann Cache, dann Start-Seite */
    e.respondWith(
      fetch(req).then(function(res){
        var copy=res.clone(); caches.open(CACHE).then(function(c){c.put(req,copy);}); return res;
      }).catch(function(){
        return caches.match(req).then(function(m){ return m||caches.match('index.html'); });
      })
    );
    return;
  }
  /* Assets/JS: Cache zuerst, im Hintergrund aktualisieren (stale-while-revalidate) */
  e.respondWith(
    caches.match(req).then(function(cached){
      var net=fetch(req).then(function(res){
        var copy=res.clone(); caches.open(CACHE).then(function(c){c.put(req,copy);}); return res;
      }).catch(function(){return cached;});
      return cached||net;
    })
  );
});
