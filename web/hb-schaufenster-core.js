/* HeiBen — ausgelagert aus 3 Seiten (Remake v3, Welle 1).
   Inhalt wortgleich uebernommen, nicht ueberarbeitet. */
/* eingebunden aus _src/schaufenster-core.js */
/* ============================================================
   HeiBen — Schaufenster-Kern ("Unsere Arbeit")
   Gemeinsame Grundlage für Übersicht, Detailansicht und Redaktion.
   EINE Quelle für: Datenspeicher, Beispiel-Einträge (= Werkseinstellungen),
   die drei Haus-Typen samt ihrer Kerndaten-Felder und Hilfsfunktionen.
   Aufgebaut als Geschwister des Magazin-Kerns: gleiche Speicherlogik,
   gleiche Namensgebung, gleiches Statusdenken (Entwurf / veröffentlicht).
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
  var KEY = 'heiben-schaufenster';

  /* ---- B) Typen = die drei beratenden Häuser ----------------------------
     Jeder Typ kennt seine Akzentklasse (greift die Hausfarbe auf), ein paar
     sprachliche Bezeichnungen und seine Kerndaten-Felder ("facts"). Genau
     diese facts sind der einzige Unterschied zwischen den drei Inhaltsarten. */
  var TYPES = {
    reisen: {
      key: 'reisen', label: 'Reisen', klass: 'reisen',
      noun: 'Beispielroute', nounPlural: 'Beispielrouten',
      anfrage: { href: 'reisen-anfrage.html', label: 'Reise-Anfrage starten' },
      facts: [
        { id: 'ziel',    label: 'Ziel / Region' },
        { id: 'dauer',   label: 'Dauer' },
        { id: 'abPreis', label: 'Ab-Preis pro Person' }
      ]
    },
    wohnen: {
      key: 'wohnen', label: 'Wohnen', klass: 'wohnen',
      noun: 'Projekt', nounPlural: 'Projekte',
      anfrage: { href: 'wohnen-anfrage.html', label: 'Interior-Beratung starten' },
      facts: [
        { id: 'ort',    label: 'Ort / Objekt' },
        { id: 'stil',   label: 'Stil' },
        { id: 'umfang', label: 'Umfang' }
      ]
    },
    immobilien: {
      key: 'immobilien', label: 'Immobilien', klass: 'immobilien',
      noun: 'Objekt', nounPlural: 'Objekte',
      anfrage: { href: 'immobilien-anfrage.html', label: 'Immobilien-Anfrage starten' },
      facts: [
        { id: 'lage',         label: 'Lage' },
        { id: 'objektart',    label: 'Art', type: 'select', options: ['Wohnung', 'Haus', 'Grundstück', 'Gewerbe'] },
        { id: 'zimmer',       label: 'Zimmer' },
        { id: 'flaeche',      label: 'Wohnfläche' },
        { id: 'preis',        label: 'Preis' },
        { id: 'objektStatus', label: 'Status', type: 'select', options: ['Verfügbar', 'Reserviert', 'Verkauft'], badge: true }
      ]
    }
  };
  var TYPE_ORDER = ['reisen', 'wohnen', 'immobilien'];

  /* ---- C) Beispiel-Einträge = Werkseinstellungen ------------------------- */
  var SEED = {
    version: 1,
    entries: [
      {
        id: 'norddeutschland-wasser-wind-weite', type: 'reisen', status: 'published',
        title: 'Norddeutschland: Wasser, Wind und Weite', date: '2026-05-20', cover: '',
        teaser: 'Eine ruhige Route entlang der Schleswig-Holsteiner Küste — für alle, die im Weiten zur Ruhe kommen.',
        facts: { ziel: 'Schleswig-Holstein & Nordseeküste', dauer: '6 Tage', abPreis: 'ab 1.180 €' },
        highlights: ['Übernachtung in einem reetgedeckten Gasthof', 'Wattwanderung mit ortskundiger Begleitung', 'Ein Tag in Wilster, der Heimat der Familie Hein'],
        description: 'Diese Route führt dorthin, wo der Himmel größer wirkt als anderswo. Wir verbinden stille Deichwege mit kleinen Häfen und Tischen, an denen man als Gast noch willkommen ist.\n\nDer Norden ist kein Ort für Eile. Genau deshalb planen wir die Tage großzügig: viel Landschaft, wenig Programm, dafür Begegnungen, die hängen bleiben.'
      },
      {
        id: 'der-andere-norden-algeriens', type: 'reisen', status: 'published',
        title: 'Der andere Norden Algeriens', date: '2026-05-08', cover: '',
        teaser: 'Eine Reise dorthin, wo kein Hochglanzprospekt hinführt — begleitet von einer Familie, die die Türen kennt.',
        facts: { ziel: 'Region Boukadir, Algerien', dauer: '9 Tage', abPreis: 'auf Anfrage' },
        highlights: ['Märkte am frühen Morgen', 'Werkstätten der Kupferschmiede', 'Abende an Familientischen'],
        description: 'Die meisten Reisen nach Nordafrika enden am Pool einer Anlage, die überall stehen könnte. Diese hier beginnt dort, wo die Reiseführer aufhören.\n\nWir kennen diese Tische, weil sie zu unserer eigenen Familie gehören. Diese Nähe ist nichts, was man buchen kann — aber etwas, das wir teilen.'
      },
      {
        id: 'altbau-in-ehrenfeld-neu-gedacht', type: 'wohnen', status: 'published',
        title: 'Altbau in Ehrenfeld, neu gedacht', date: '2026-05-16', cover: '',
        teaser: 'Eine Dreizimmerwohnung, die ihren Charakter behält und trotzdem leicht zu bewohnen ist.',
        facts: { ort: '3-Zimmer-Altbau, Köln-Ehrenfeld', stil: 'Warm & natürlich', umfang: 'Komplette Einrichtung, 95 m²' },
        highlights: ['Originaldielen aufgearbeitet statt ersetzt', 'Licht in Schichten statt einer Deckenlampe', 'Ein Erbstück als heimlicher Mittelpunkt'],
        description: 'Der Reiz dieser Wohnung lag in dem, was schon da war: hohe Decken, alte Dielen, ein Stuck, der Geschichten erzählt. Unsere Aufgabe war nicht, das zu überschreiben, sondern es atmen zu lassen.\n\nDas Ergebnis ist ein Zuhause, das nicht beeindrucken will, sondern bleiben lässt — genau die Linie, an der HeiBen Wohnen entlangarbeitet.'
      },
      {
        id: 'gaestezimmer-wie-ein-kleines-hotel', type: 'wohnen', status: 'published',
        title: 'Ein Gästezimmer wie ein kleines Hotel', date: '2026-04-30', cover: '',
        teaser: 'Ein selten genutzter Raum wird zum Lieblingsplatz für Besuch — mit den Kniffen aus der Hotellerie.',
        facts: { ort: 'Einfamilienhaus, Bergisches Land', stil: 'Klar & reduziert', umfang: 'Einzelraum inkl. Bad' },
        highlights: ['Verdunkelung, die wirklich verdunkelt', 'Eine Ablage für alles, was man abends loswird', 'Frische, die man riecht, bevor man sie sieht'],
        description: 'Gästezimmer stehen meist leer und sehen auch so aus. Wir haben diesen Raum so behandelt, wie ein gutes Hotel ein Zimmer behandelt: vorausschauend, gastlich, bis ins kleinste Detail.\n\nEntstanden ist ein Ort, an dem Besuch gern länger bleibt — und den die Gastgeber selbst am liebsten für sich behalten würden.'
      },
      {
        id: 'stilaltbau-mit-rheinblick', type: 'immobilien', status: 'published',
        title: 'Stilaltbau mit Rheinblick', date: '2026-05-18', cover: '',
        teaser: 'Eine großzügige Altbauwohnung in Köln-Riehl, wenige Schritte vom Strom entfernt.',
        facts: { lage: 'Köln-Riehl', objektart: 'Wohnung', zimmer: '4', flaeche: '132 m²', preis: '895.000 €', objektStatus: 'Verfügbar' },
        highlights: ['Blick auf den Rhein aus zwei Zimmern', 'Originaler Stuck und Flügeltüren', 'Tiefgaragenstellplatz möglich'],
        description: 'Diese Wohnung verbindet, was selten zusammenfällt: die Ruhe eines gewachsenen Viertels und die Weite des Rheins direkt vor der Tür. Die Räume sind hell, hoch und vielfältig nutzbar.\n\nWir begleiten Besichtigung und Kauf persönlich und vertraulich — sprechen Sie uns an.'
      },
      {
        id: 'stadthaus-zum-verlieben', type: 'immobilien', status: 'published',
        title: 'Stadthaus zum Verlieben', date: '2026-05-02', cover: '',
        teaser: 'Ein charaktervolles Stadthaus in Köln-Sülz mit Garten und Raum für eine ganze Familie.',
        facts: { lage: 'Köln-Sülz', objektart: 'Haus', zimmer: '6', flaeche: '210 m²', preis: 'auf Anfrage', objektStatus: 'Reserviert' },
        highlights: ['Sonniger Garten nach Südwesten', 'Ausgebautes Dachgeschoss', 'Fußläufig zu Schulen und Veedel'],
        description: 'Ein Haus, das nach Familie klingt: gewachsene Räume, ein Garten zum Bleiben und eine Lage, die alles Wichtige zu Fuß erreichbar macht.\n\nDieses Objekt ist derzeit reserviert — gern nehmen wir Sie für vergleichbare Häuser in unsere Vormerkung auf.'
      }
    ]
  };

  /* ---- D) Hilfsfunktionen (wie im Magazin) ------------------------------- */
  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function slugify(s) {
    return String(s || '').toLowerCase()
      .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
      .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60) || 'eintrag';
  }
  function uid() { return 's' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }

  var MONATE = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
  function fmtDate(iso) {
    if (!iso) return '';
    var p = String(iso).split('-'); if (p.length < 3) return iso;
    var d = parseInt(p[2], 10), m = parseInt(p[1], 10), y = p[0];
    if (!d || !m) return iso;
    return d + '. ' + MONATE[m - 1] + ' ' + y;
  }

  // Fakten eines Eintrags als Definitionsliste — gemeinsame Render-Logik für
  // Übersichtskarte, Detailseite und Redaktions-Vorschau.
  function renderFacts(entry) {
    var t = TYPES[entry.type]; if (!t) return '';
    var rows = t.facts.map(function (f) {
      var v = (entry.facts || {})[f.id];
      if (v == null || String(v).trim() === '') return '';
      return '<div class="fact"><dt>' + esc(f.label) + '</dt><dd>' + esc(v) + '</dd></div>';
    }).filter(Boolean).join('');
    return rows ? '<dl class="facts">' + rows + '</dl>' : '';
  }

  // Verfügbarkeits-Etikett (nur Immobilien) als kleine Plakette.
  function statusBadge(entry) {
    if (entry.type !== 'immobilien') return '';
    var v = (entry.facts || {}).objektStatus; if (!v) return '';
    var k = slugify(v);
    return '<span class="obj-badge ' + k + '">' + esc(v) + '</span>';
  }

  // Freitext-Beschreibung: Absätze an Leerzeilen trennen. Bewusst einfacher als
  // der Block-Editor des Magazins — Schaufenster-Einträge sind formularartig.
  function renderDescription(text) {
    if (!text) return '';
    return String(text).split(/\n{2,}/).map(function (p) {
      var t = p.trim(); return t ? '<p>' + esc(t) + '</p>' : '';
    }).join('\n');
  }

  function renderHighlights(list) {
    var items = (list || []).filter(function (x) { return x && String(x).trim(); });
    if (!items.length) return '';
    return '<ul class="highlights">' + items.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ul>';
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
  function getPublished(type) {
    var list = loadData().entries.filter(function (e) { return e.status === 'published'; });
    if (type && type !== 'alle') list = list.filter(function (e) { return e.type === type; });
    return sortedByDateDesc(list);
  }
  function getAll() { return sortedByDateDesc(loadData().entries); }
  function findById(id) {
    var list = loadData().entries;
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  }

  /* ---- Bereitstellen ----------------------------------------------------- */
  window.HeiBenSchau = {
    store: store, KEY: KEY, TYPES: TYPES, TYPE_ORDER: TYPE_ORDER, SEED: SEED,
    clone: clone, esc: esc, slugify: slugify, uid: uid, fmtDate: fmtDate,
    renderFacts: renderFacts, statusBadge: statusBadge, renderDescription: renderDescription, renderHighlights: renderHighlights,
    loadData: loadData, saveData: saveData, resetData: resetData,
    getPublished: getPublished, getAll: getAll, findById: findById, sortedByDateDesc: sortedByDateDesc
  };
})();
