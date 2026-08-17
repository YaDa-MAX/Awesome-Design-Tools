/* HeiBen — ausgelagert aus 5 Seiten (Remake v3, Welle 1).
   Inhalt wortgleich uebernommen, nicht ueberarbeitet. */
/* eingebunden aus _src/kulinarik-core.js */
/* ============================================================
   HeiBen — Kulinarik-Kern (das fünfte Haus: Rezepte)
   Gemeinsame Grundlage für Übersicht, Rezeptansicht und Redaktion.
   EINE Quelle für: Datenspeicher, Rezept-Datenmodell, Beispielrezepte
   (= Werkseinstellungen), Auswahllisten und Hilfsfunktionen.
   Geschwister von Magazin- und Schaufenster-Kern: gleiche Speicherlogik,
   gleiche Namensgebung, gleiches Statusdenken (Entwurf / veröffentlicht).

   GRUNDHALTUNG DES HAUSES: ohne Schweinefleisch. Wo ein Klassiker sonst
   Schwein verlangt, bietet das Rezept eine Alternative, die geschmacklich
   trägt (Feld "alternative"). Verankert in der Familiengeschichte:
   algerische (halal geprägte) und norddeutsche Küche unter einem Dach.
   ============================================================ */
(function () {
  'use strict';

  /* ---- A) Speicher: localStorage mit Rückfall auf Arbeitsspeicher -------- */
  var memStore = {};
  var store = {
    get: function (key) {
      try { var v = localStorage.getItem(key); return v ? JSON.parse(v) : (memStore[key] != null ? memStore[key] : null); }
      catch (e) { return memStore[key] != null ? memStore[key] : null; }
    },
    set: function (key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { memStore[key] = val; } },
    del: function (key) { try { localStorage.removeItem(key); } catch (e) {} delete memStore[key]; }
  };
  var KEY = 'heiben-kulinarik';

  /* ---- B) Auswahllisten (für Redaktion und Filter) ----------------------- */
  var GAENGE = ['Frühstück', 'Vorspeise', 'Suppe', 'Hauptgericht', 'Beilage', 'Snack', 'Dessert', 'Getränk'];
  var ARTEN = ['Vegetarisch', 'Vegan', 'Fisch', 'Fleisch', 'Geflügel', 'Lamm'];
  var SCHWIERIGKEIT = ['Einfach', 'Mittel', 'Anspruchsvoll'];
  // Hinweis: "Schwein" gibt es bewusst nicht als Art. Das ganze Haus ist schweinefrei.

  /* ---- C) Beispielrezepte = Werkseinstellungen --------------------------
     Sechs Rezepte, die beide Familienküchen verbinden: zwei algerische
     Klassiker (von Natur aus schweinefrei), zwei norddeutsche Klassiker in
     einer schweinefreien Fassung (mit erklärter Alternative), ein maghreb-
     inisches Geflügelgericht und ein algerisches Gebäck.                    */
  var SEED = {
    version: 1,
    entries: [
      {
        id: 'couscous-royale-mit-lamm-haehnchen-und-merguez',
        status: 'published', date: '2026-05-22', cover: '',
        name: 'Couscous Royale mit Lamm, Hähnchen und Merguez',
        land: 'Algerien', kontinent: 'Afrika',
        gang: 'Hauptgericht', art: ['Fleisch', 'Geflügel', 'Lamm'],
        schwierigkeit: 'Mittel', vorbereitungMin: 40, kochMin: 90, portionen: 6,
        kurzinfo: 'Das Festtagsgericht schlechthin: dampfender Grieß, dreierlei Fleisch und ein Gemüsesud, der nach Sonntag bei der Familie schmeckt.',
        zutaten: [
          '600 g Couscous (mittlerer Grieß)',
          '600 g Lammschulter, in großen Würfeln',
          '4 Hähnchenkeulen',
          '6 Merguez (Lamm- oder Rindwurst)',
          '3 Möhren, in Stücken',
          '2 Zucchini, in Stücken',
          '1 Steckrübe oder weißer Rettich, gewürfelt',
          '1 Dose Kichererbsen (400 g), abgespült',
          '2 Zwiebeln, gewürfelt',
          '3 EL Tomatenmark',
          '2 TL Ras el-Hanout, 1 TL Kreuzkümmel, 1 TL Kurkuma',
          'Olivenöl, Salz, Pfeffer',
          'frischer Koriander zum Servieren'
        ],
        zubereitung: [
          'Lamm und Hähnchen in Olivenöl in einem großen Topf rundum anbraten, herausnehmen.',
          'Zwiebeln glasig dünsten, Tomatenmark und Gewürze kurz mitrösten.',
          'Fleisch zurückgeben, mit Wasser bedecken, salzen und zugedeckt 45 Minuten sanft köcheln.',
          'Möhren und Steckrübe zugeben, 15 Minuten garen; dann Zucchini und Kichererbsen weitere 15 Minuten.',
          'Couscous nach Packung mit etwas Öl und Salz quellen lassen und mit der Gabel auflockern.',
          'Merguez in einer Pfanne ohne Zugabe von Fett knusprig braten.',
          'Grieß auf eine große Platte häufen, Fleisch und Gemüse darauf anrichten, mit Sud beträufeln und mit Koriander bestreuen.'
        ],
        hinweise: 'Den Sud lieber etwas reichlicher ansetzen — am nächsten Tag ziehen die Aromen nach und das Gericht schmeckt fast noch besser. Wer es schärfer mag, reicht Harissa separat.',
        alternative: '',
        geschichte: 'Couscous ist in Algerien kein Alltagsessen, sondern Anlass: Es kommt auf den Tisch, wenn Familie zusammenkommt. Traditionell wird der Grieß über dem Gemüsesud gedämpft, damit er dessen Aroma aufnimmt — die schnelle Variante mit Quellgrieß macht das Gericht aber auch unter der Woche möglich.',
        persoenlich: 'Yakins Großmutter in Boukadir richtete das Couscous immer auf einer einzigen großen Platte an, von der alle gemeinsam aßen. Dieses Bild steht am Anfang von HeiBen Kulinarik.',
        servier: 'Auf einer großen Platte in der Tischmitte, dazu eingelegtes Gemüse und ein Glas Pfefferminztee.',
        tags: ['Festtag', 'Familienrezept', 'Eintopf', 'Maghreb']
      },
      {
        id: 'chorba-frik-algerische-lammsuppe',
        status: 'published', date: '2026-05-15', cover: '',
        name: 'Chorba Frik — algerische Lammsuppe mit Grünkern',
        land: 'Algerien', kontinent: 'Afrika',
        gang: 'Vorspeise', art: ['Fleisch', 'Lamm'],
        schwierigkeit: 'Einfach', vorbereitungMin: 20, kochMin: 60, portionen: 4,
        kurzinfo: 'Die wärmende Suppe, die im Ramadan den Tag beschließt: Lamm, Tomate, Grünkern und ein Bündel Kräuter.',
        zutaten: [
          '400 g Lammschulter, klein gewürfelt',
          '100 g Frik (gerösteter Grünkern), ersatzweise Graupen',
          '1 Zwiebel, fein gewürfelt',
          '2 EL Tomatenmark',
          '400 g passierte Tomaten',
          '1 TL Kreuzkümmel, 1 TL gemahlener Koriander, ½ TL Zimt',
          '1 Bund frische Petersilie und Koriander, gehackt',
          'Olivenöl, Salz, Pfeffer',
          'Saft einer halben Zitrone'
        ],
        zubereitung: [
          'Lammwürfel in Olivenöl anbraten, Zwiebel zugeben und glasig dünsten.',
          'Tomatenmark und Gewürze kurz mitrösten, bis es duftet.',
          'Passierte Tomaten und 1,5 l Wasser angießen, salzen und 40 Minuten köcheln.',
          'Frik einrühren und weitere 20 Minuten quellen lassen, gelegentlich umrühren.',
          'Mit Zitronensaft abschmecken, reichlich Kräuter unterrühren.'
        ],
        hinweise: 'Frik gibt der Suppe ihren typisch nussigen Biss. Findet man ihn nicht, funktionieren Graupen gut; die Garzeit dann etwas verlängern.',
        alternative: '',
        geschichte: 'Chorba steht in vielen Haushalten des Maghreb allabendlich während des Ramadan auf dem Tisch. Jede Familie hat ihre eigene Würzung — diese hier ist mild gehalten und lässt sich leicht nachschärfen.',
        persoenlich: '',
        servier: 'Mit einem Spritzer Zitrone und warmem Fladenbrot.',
        tags: ['Suppe', 'Ramadan', 'Maghreb', 'Wohlfühlessen']
      },
      {
        id: 'gruenkohl-mit-merguez-statt-pinkel',
        status: 'published', date: '2026-05-10', cover: '',
        name: 'Grünkohl mit Merguez statt Pinkel',
        land: 'Deutschland', kontinent: 'Europa',
        gang: 'Hauptgericht', art: ['Fleisch', 'Lamm'],
        schwierigkeit: 'Mittel', vorbereitungMin: 25, kochMin: 75, portionen: 4,
        kurzinfo: 'Der norddeutsche Winterklassiker — neu gedacht: Wo sonst Pinkel und Kassler liegen, sorgen Merguez und geräuchertes Rind für Rauch und Würze.',
        zutaten: [
          '1,5 kg Grünkohl (TK oder frisch, geputzt)',
          '8 Merguez (Lamm- oder Rindwurst)',
          '400 g geräucherte Rinderbrust oder Pastrami am Stück',
          '2 Zwiebeln, gewürfelt',
          '2 EL Senf, 1 TL Piment, 1 Lorbeerblatt',
          'etwas Hafergrütze oder eine Handvoll Haferflocken (zum Binden)',
          'Gänse- oder Pflanzenschmalz, Salz, Pfeffer',
          'optional: 1 TL Zucker zum Karamellisieren'
        ],
        zubereitung: [
          'Zwiebeln in Schmalz glasig dünsten, optional mit etwas Zucker leicht karamellisieren.',
          'Grünkohl zugeben, kurz mitdünsten, mit Wasser oder Brühe knapp bedecken.',
          'Geräuchertes Rind, Senf, Piment und Lorbeer einlegen und zugedeckt 60 Minuten schmoren.',
          'Hafergrütze einrühren, damit der Kohl sämig bindet; weitere 10 Minuten köcheln.',
          'Merguez in der Pfanne knusprig braten und zum Schluss auf dem Kohl anrichten.',
          'Kräftig mit Salz und Pfeffer abschmecken.'
        ],
        hinweise: 'Grünkohl verträgt eine lange Garzeit — er soll mürbe, nicht knackig sein. Am zweiten Tag aufgewärmt schmeckt er am besten.',
        alternative: 'Klassisch kommen in den Grünkohl Pinkel (eine Grützwurst vom Schwein) und Kassler. Beides ersetzen wir hier: Merguez bringt dieselbe würzig-fettige Rauchnote wie die Pinkel und sogar mehr Gewürztiefe, geräucherte Rinderbrust übernimmt die Rolle des Kasslers. So bleibt der herzhafte, rauchige Charakter des Originals erhalten — und es verbindet sich ganz nebenbei der Norden mit dem Maghreb.',
        geschichte: 'Grünkohl ist in Norddeutschland fester Bestandteil des Winters, oft begleitet von „Kohlfahrten“ und einem festlichen Essen am Ziel. Das Gericht lebt von Rauch, Fett und langer Garzeit — Eigenschaften, die sich auch mit anderem Fleisch erreichen lassen.',
        persoenlich: 'In Katharinas Familie gehörte Grünkohl zu jedem Januar. Als beide Familien zum ersten Mal gemeinsam aßen, entstand aus der Not eine Idee — und dieses Rezept.',
        servier: 'Mit Salzkartoffeln oder Bratkartoffeln und kräftigem Senf.',
        tags: ['Winter', 'Norddeutsch', 'Klassiker neu interpretiert', 'Winterküche']
      },
      {
        id: 'birnen-bohnen-und-geraeuchertes-rind',
        status: 'published', date: '2026-04-28', cover: '',
        name: 'Birnen, Bohnen und geräuchertes Rind',
        land: 'Deutschland', kontinent: 'Europa',
        gang: 'Hauptgericht', art: ['Fleisch'],
        schwierigkeit: 'Einfach', vorbereitungMin: 20, kochMin: 40, portionen: 4,
        kurzinfo: 'Das norddeutsche Sommergericht in einer schweinefreien Fassung: grüne Bohnen, feste Kochbirnen und rauchiges Rind statt Speck.',
        zutaten: [
          '800 g grüne Bohnen, geputzt',
          '4 feste Kochbirnen, geviertelt',
          '300 g geräucherte Rinderbrust oder luftgetrocknetes Rind, in Scheiben',
          '2 Zwiebeln, gewürfelt',
          '1 Zweig Bohnenkraut',
          '500 ml Gemüse- oder Rinderbrühe',
          'Butter oder Öl, Salz, Pfeffer',
          'frische Petersilie'
        ],
        zubereitung: [
          'Zwiebeln in Butter andünsten, geräuchertes Rind kurz mitbraten.',
          'Bohnen und Bohnenkraut zugeben, mit Brühe angießen und 15 Minuten köcheln.',
          'Birnenviertel auflegen und weitere 12–15 Minuten garen, bis sie weich, aber nicht zerfallen sind.',
          'Mit Salz und Pfeffer abschmecken, Bohnenkraut entfernen, mit Petersilie bestreuen.'
        ],
        hinweise: 'Birnen und Bohnen getrennt im Auge behalten — die Birnen sollen ihre Form halten. Süße und Rauch sind hier der ganze Reiz.',
        alternative: 'Das Original „Birnen, Bohnen und Speck“ wird mit durchwachsenem Schweinespeck gekocht. Geräucherte Rinderbrust liefert dieselbe rauchig-herzhafte Tiefe, ohne Schwein. Wer es kräftiger mag, brät einige Scheiben luftgetrocknetes Rind separat knusprig und streut sie darüber.',
        geschichte: 'Ein Gericht aus der Erntezeit, wenn Bohnen und Birnen gleichzeitig reif sind. Es lebt vom Kontrast zwischen süßer Frucht, herbem Bohnenkraut und rauchigem Fleisch.',
        persoenlich: '',
        servier: 'Mit jungen Salzkartoffeln.',
        tags: ['Sommer', 'Norddeutsch', 'Klassiker neu interpretiert', 'Erntezeit']
      },
      {
        id: 'haehnchen-tajine-mit-zitrone-und-oliven',
        status: 'published', date: '2026-04-18', cover: '',
        name: 'Hähnchen-Tajine mit Salzzitrone und Oliven',
        land: 'Marokko', kontinent: 'Afrika',
        gang: 'Hauptgericht', art: ['Geflügel'],
        schwierigkeit: 'Einfach', vorbereitungMin: 20, kochMin: 50, portionen: 4,
        kurzinfo: 'Zart geschmortes Hähnchen, das Salz-Sauer der eingelegten Zitrone und herbe Oliven — ein Klassiker, der wie von selbst gelingt.',
        zutaten: [
          '8 Hähnchenteile (Keulen und Schenkel)',
          '1 eingelegte Salzzitrone, in Streifen',
          '150 g grüne Oliven (entsteint)',
          '2 Zwiebeln, in Ringen',
          '3 Knoblauchzehen',
          '1 TL Kurkuma, 1 TL Ingwer, ½ TL Safranfäden',
          '1 Bund Koriander und Petersilie',
          'Olivenöl, Salz, Pfeffer'
        ],
        zubereitung: [
          'Hähnchen mit Kurkuma, Ingwer, Knoblauch und Öl marinieren (gern über Nacht).',
          'In einer Tajine oder einem schweren Topf Zwiebeln andünsten, Hähnchen darauf legen.',
          'Safran in etwas warmem Wasser lösen, angießen, salzen und zugedeckt 40 Minuten sanft schmoren.',
          'Salzzitrone und Oliven zugeben, weitere 10 Minuten garen.',
          'Mit reichlich Kräutern bestreut servieren.'
        ],
        hinweise: 'Salzzitronen gibt es fertig im Glas — oder man legt sie selbst ein. Sie sind das Herz des Gerichts; bitte nicht weglassen.',
        alternative: '',
        geschichte: 'Die Tajine ist zugleich Topf und Gericht. Ihre Form lässt den Dampf zirkulieren, sodass das Fleisch in seinem eigenen Saft mürbe wird — ein Prinzip, das auch im normalen Schmortopf funktioniert.',
        persoenlich: '',
        servier: 'Mit Fladenbrot oder Couscous, der den Sud aufnimmt.',
        tags: ['Schmorgericht', 'Maghreb', 'Alltagstauglich']
      },
      {
        id: 'makroud-griessrauten-mit-datteln',
        status: 'published', date: '2026-04-05', cover: '',
        name: 'Makroud — Grießrauten mit Datteln',
        land: 'Algerien', kontinent: 'Afrika',
        gang: 'Dessert', art: ['Vegetarisch'],
        schwierigkeit: 'Anspruchsvoll', vorbereitungMin: 45, kochMin: 25, portionen: 8,
        kurzinfo: 'Goldene Grießrauten mit einer Füllung aus Datteln, gebadet in Honig — das Gebäck, das zu jedem Fest gehört.',
        zutaten: [
          '500 g Hartweizengrieß (mittel)',
          '150 ml mildes Olivenöl',
          '120 ml Orangenblütenwasser (plus Wasser nach Bedarf)',
          '400 g entsteinte Datteln',
          '1 TL Zimt, 1 Prise Muskat',
          'abgeriebene Schale einer Orange',
          '300 g Honig',
          'Öl zum Ausbacken'
        ],
        zubereitung: [
          'Grieß mit Öl verkneten, ruhen lassen, dann mit Orangenblütenwasser zu einem festen Teig verarbeiten.',
          'Datteln mit Zimt, Muskat und Orangenschale zu einer geschmeidigen Paste mixen.',
          'Teig zu Bändern ausrollen, Dattelpaste als Strang einlegen, einrollen und in Rauten schneiden.',
          'Rauten in heißem Öl goldbraun ausbacken und kurz abtropfen lassen.',
          'Honig leicht erwärmen und die noch warmen Rauten darin wenden.',
          'Auf einem Gitter abtropfen lassen und vollständig auskühlen.'
        ],
        hinweise: 'Der Teig darf nicht zu nass sein, sonst saugen sich die Rauten beim Frittieren voll. Lieber das Orangenblütenwasser löffelweise zugeben.',
        alternative: '',
        geschichte: 'Makroud reicht von Tunesien bis Algerien und wird zu Festen, Hochzeiten und am Ende des Ramadan gereicht. In manchen Regionen wird es in Honig getaucht, in anderen in Zuckersirup.',
        persoenlich: '',
        servier: 'Zu Pfefferminztee, in kleinen Mengen — sie sind reichhaltig.',
        tags: ['Gebäck', 'Süßes', 'Fest', 'Maghreb']
      }
    ]
  };

  /* Externe Werkseinstellung (Familienrezepte + 51 Laenderkuechen) bevorzugen,
     falls kulinarik-daten.js geladen wurde. Fehlt sie, bleibt der Inline-Bestand. */
  if (window.HEIBEN_KULINARIK_SEED && Array.isArray(window.HEIBEN_KULINARIK_SEED.entries)) {
    SEED = window.HEIBEN_KULINARIK_SEED;
  }

  /* ---- D) Hilfsfunktionen (parallel zu Magazin/Schaufenster) ------------- */
  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function slugify(s) {
    return String(s || '').toLowerCase()
      .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
      .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 70) || 'rezept';
  }
  function uid() { return 'r' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }

  function totalMin(r) {
    var v = (parseInt(r.vorbereitungMin, 10) || 0) + (parseInt(r.kochMin, 10) || 0);
    return v || 0;
  }
  function fmtMin(min) {
    min = parseInt(min, 10) || 0; if (!min) return '';
    if (min < 60) return min + ' Min';
    var h = Math.floor(min / 60), m = min % 60;
    return m ? h + ' Std ' + m + ' Min' : h + ' Std';
  }

  // Meta-Zeile (Land · Gang · Zeit · Portionen) als kompakte Faktenliste.
  function renderMeta(r) {
    var rows = [];
    if (r.land) rows.push(['Herkunft', r.land]);
    if (r.gang) rows.push(['Gang', r.gang]);
    if (r.schwierigkeit) rows.push(['Schwierigkeit', r.schwierigkeit]);
    var t = totalMin(r); if (t) rows.push(['Zeit gesamt', fmtMin(t)]);
    if (r.portionen) rows.push(['Portionen', String(r.portionen)]);
    if (r.art && r.art.length) rows.push(['Art', r.art.join(', ')]);
    if (!rows.length) return '';
    return '<dl class="facts">' + rows.map(function (x) {
      return '<div class="fact"><dt>' + esc(x[0]) + '</dt><dd>' + esc(x[1]) + '</dd></div>';
    }).join('') + '</dl>';
  }

  function renderList(items, cls) {
    var arr = (items || []).filter(function (x) { return x && String(x).trim(); });
    if (!arr.length) return '';
    return '<ul class="' + (cls || '') + '">' + arr.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ul>';
  }
  function renderSteps(items) {
    var arr = (items || []).filter(function (x) { return x && String(x).trim(); });
    if (!arr.length) return '';
    return '<ol class="steps-list">' + arr.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ol>';
  }
  function renderDescription(text) {
    if (!text) return '';
    return String(text).split(/\n{2,}/).map(function (p) {
      var t = p.trim(); return t ? '<p>' + esc(t) + '</p>' : '';
    }).join('\n');
  }
  function tagChips(tags) {
    var arr = (tags || []).filter(function (x) { return x && String(x).trim(); });
    if (!arr.length) return '';
    return '<div class="tagrow">' + arr.map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join('') + '</div>';
  }

  /* ---- E) Datenzugriff (eine Quelle für alle Seiten) --------------------- */
  function loadData() {
    var d = store.get(KEY);
    if (!d || !Array.isArray(d.entries)) { d = clone(SEED); store.set(KEY, d); }
    return d;
  }
  function saveData(d) { store.set(KEY, d); return d; }
  function resetData() { var d = clone(SEED); store.set(KEY, d); return d; }

  function sortedByDateDesc(list) {
    return list.slice().sort(function (a, b) { return (b.date || '').localeCompare(a.date || ''); });
  }
  function getPublished() {
    return sortedByDateDesc(loadData().entries.filter(function (e) { return e.status === 'published'; }));
  }
  function getAll() { return sortedByDateDesc(loadData().entries); }
  function findById(id) {
    var list = loadData().entries;
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  }

  // Vorhandene Facetten aus den veröffentlichten Rezepten (für Filter-Knöpfe).
  function facets() {
    var pub = getPublished();
    function uniq(arr) { var s = []; arr.forEach(function (x) { if (x && s.indexOf(x) < 0) s.push(x); }); return s; }
    return {
      laender: uniq(pub.map(function (r) { return r.land; })).sort(),
      gaenge: GAENGE.filter(function (g) { return pub.some(function (r) { return r.gang === g; }); }),
      arten: ARTEN.filter(function (a) { return pub.some(function (r) { return (r.art || []).indexOf(a) >= 0; }); })
    };
  }

  // Filtert + sucht. filter = {land, gang, art, q}. Alle kombinierbar.
  function query(filter) {
    filter = filter || {};
    var q = (filter.q || '').trim().toLowerCase();
    return getPublished().filter(function (r) {
      if (filter.land && filter.land !== 'alle' && r.land !== filter.land) return false;
      if (filter.gang && filter.gang !== 'alle' && r.gang !== filter.gang) return false;
      if (filter.art && filter.art !== 'alle' && (r.art || []).indexOf(filter.art) < 0) return false;
      if (q) {
        var hay = [r.name, r.land, r.kurzinfo, (r.tags || []).join(' '), (r.zutaten || []).join(' ')].join(' ').toLowerCase();
        if (hay.indexOf(q) < 0) return false;
      }
      return true;
    });
  }

  /* ---- Bereitstellen ----------------------------------------------------- */
  window.HeiBenKulinarik = {
    store: store, KEY: KEY, SEED: SEED,
    GAENGE: GAENGE, ARTEN: ARTEN, SCHWIERIGKEIT: SCHWIERIGKEIT,
    clone: clone, esc: esc, slugify: slugify, uid: uid,
    totalMin: totalMin, fmtMin: fmtMin,
    renderMeta: renderMeta, renderList: renderList, renderSteps: renderSteps,
    renderDescription: renderDescription, tagChips: tagChips,
    loadData: loadData, saveData: saveData, resetData: resetData,
    getPublished: getPublished, getAll: getAll, findById: findById,
    facets: facets, query: query, sortedByDateDesc: sortedByDateDesc
  };
})();
