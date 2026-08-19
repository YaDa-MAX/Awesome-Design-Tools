/* HeiBen Service-Worker — Offline-Fähigkeit & App-Shell (v20260615-1323) */
const CACHE='heiben-v20260622-2999';
const PRECACHE=[
  /* GENERIERT von tools/gen_sw.js — nicht von Hand pflegen.
     Kaltstart-Huelle; Grosses und vendor/ kommt zur Laufzeit in den Cache. */
  "404.html",
  "agb.html",
  "anfragenverwaltung.html",
  "api.html",
  "auto.html",
  "begriffskarten.html",
  "bestellverwaltung.html",
  "datenschutz.html",
  "designsystem.html",
  "digital.html",
  "erste-wohnung.html",
  "erstehilfe.html",
  "familie.html",
  "finanzcheck.html",
  "finanzen.html",
  "finanzielle-freiheit.html",
  "gehaltsverhandlung.html",
  "haushalt.html",
  "heiben-automation.html",
  "heiben-wachstum.html",
  "holding-dashboard.html",
  "immobilien-anfrage.html",
  "immobilien-angebote.html",
  "immobilien-planner.html",
  "immobilien.html",
  "immobilienbudget.html",
  "impressum.html",
  "index.html",
  "jobwechsel.html",
  "koeln-quiz.html",
  "konsumcheck.html",
  "konto-verwaltung.html",
  "konto.html",
  "kulinarik-app.html",
  "kulinarik-export.html",
  "kulinarik-heute.html",
  "kulinarik-kochbuch.html",
  "kulinarik-mealplanner.html",
  "kulinarik-planner.html",
  "kulinarik-redaktion.html",
  "kulinarik-rezept.html",
  "kulinarik-rezepte.html",
  "kulinarik-rezeptwuerfel.html",
  "kulinarik-wochenplan.html",
  "kulinarik.html",
  "lebensmittel.html",
  "lernpfade.html",
  "manufaktur-bestellungen.html",
  "manufaktur-galerie.html",
  "manufaktur-gestalten.html",
  "manufaktur-kalkulation.html",
  "manufaktur-maschinencode.html",
  "manufaktur.html",
  "marke.html",
  "mein-abo.html",
  "mein-heiben.html",
  "mieten-oder-kaufen.html",
  "papierkram.html",
  "partner-demo.html",
  "pflanzen.html",
  "rechtliches.html",
  "reisebudget.html",
  "reisen-anfrage.html",
  "reisen-kuratiert.html",
  "reisen-planer.html",
  "reisen.html",
  "schaufenster-detail.html",
  "schaufenster-redaktion.html",
  "schaufenster.html",
  "schuldenfrei.html",
  "shortcut-speedrun.html",
  "sparziel.html",
  "steuererklaerung.html",
  "strategie.html",
  "stromfresser.html",
  "studio-artikel.html",
  "studio-einrichtungstheorie.html",
  "studio-lebenswissen-artikel.html",
  "studio-lebenswissen-bibliothek.html",
  "studio-lebenswissen-redaktion.html",
  "studio-lebenswissen.html",
  "studio-magazin.html",
  "studio-redaktion.html",
  "studio.html",
  "studium-ausbildung.html",
  "suche.html",
  "tagesdosis.html",
  "tastentrainer.html",
  "unternehmen.html",
  "versicherungscheck.html",
  "wahr-oder-falsch.html",
  "welt-cockpit.html",
  "widerruf.html",
  "wissen.html",
  "wissensquiz.html",
  "wohnen-anfrage.html",
  "wohnen-konfigurator.html",
  "wohnen-planer.html",
  "wohnen.html",
  "zinseszins.html",
  "zuhause-ordner.html",
  "assets/apple-touch-icon.png",
  "assets/favicon-32.png",
  "assets/favicon.svg",
  "assets/hero-light.png",
  "assets/wordmark-holding.png",
  "assets/wordmark-immobilien.png",
  "assets/wordmark-kulinarik.png",
  "assets/wordmark-on-dark.png",
  "assets/wordmark-reisen.png",
  "assets/wordmark-studio.png",
  "assets/wordmark-wohnen.png",
  "auto-daten.js",
  "digital-daten.js",
  "erstehilfe-daten.js",
  "finanzen-daten.js",
  "haushalt-daten.js",
  "hb-anfrage-app.js",
  "hb-anfrage-core.js",
  "hb-bereiche.js",
  "hb-bestand-redaktion.css",
  "hb-bestand-statisch.css",
  "hb-kulinarik-core.js",
  "hb-magazin-core.js",
  "hb-menue.css",
  "hb-motion.css",
  "hb-motion.js",
  "hb-pwa.js",
  "hb-schaufenster-core.js",
  "hb-suche-nav.js",
  "hb-weltmosaik.css",
  "hb-werkzeuge.js",
  "heiben-ab.js",
  "heiben-analytics.js",
  "heiben-angebot.js",
  "heiben-bereiche.js",
  "heiben-design.css",
  "heiben-erfolge.js",
  "heiben-firmierungen.js",
  "heiben-kennzahlen.js",
  "heiben-konto.js",
  "heiben-legal.js",
  "heiben-nav.js",
  "heiben-pdf.js",
  "heiben-plan2d.js",
  "heiben-produkt.js",
  "heiben-room3d.js",
  "heiben-rueckblick.js",
  "heiben-speicher.js",
  "heiben-stand.js",
  "heiben-werkzeuge.js",
  "kulinarik-lebensmittel.js",
  "lebensmittel-daten.js",
  "lebenswissen-tools.js",
  "lernpfade-daten.js",
  "manifest.webmanifest",
  "manufaktur-gestalten.js",
  "manufaktur-rezepte.js",
  "papierkram-daten.js",
  "pflanzen-daten.js",
  "styles.css",
  "suche-index.js"
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
