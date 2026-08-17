/* HeiBen — ausgelagert aus 3 Seiten (Remake v3, Welle 1).
   Inhalt wortgleich uebernommen, nicht ueberarbeitet. */
/* eingebunden aus _src/magazin-core.js */
/* ============================================================
   HeiBen Studio — Magazin-Kern
   Gemeinsame Grundlage für Übersicht, Artikelansicht und Redaktion.
   EINE Quelle für: Datenspeicher, Beispiel-Beiträge (= Werkseinstellungen),
   Kategorien und Hilfsfunktionen. Wird beim Bauen in jede Seite eingesetzt,
   damit Logik und Inhalt nur an einer Stelle gepflegt werden.
   ============================================================ */
(function () {
  'use strict';

  /* ---- A) Speicher: localStorage mit Rückfall auf Arbeitsspeicher --------
     Manche Vorschau-Umgebungen sperren localStorage. Damit nichts bricht,
     kapseln wir jeden Zugriff und weichen im Fehlerfall auf memStore aus.
     (Dasselbe Muster nutzt bereits der 3D-Konfigurator.)                    */
  var memStore = {};
  var store = {
    get: function (key) {
      try { var v = localStorage.getItem(key); return v ? JSON.parse(v) : (memStore[key] != null ? memStore[key] : null); }
      catch (e) { return memStore[key] != null ? memStore[key] : null; }
    },
    set: function (key, val) {
      try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { memStore[key] = val; }
    },
    del: function (key) {
      try { localStorage.removeItem(key); } catch (e) {} delete memStore[key];
    }
  };
  var KEY = 'heiben-magazin';

  /* ---- B) Kategorien — spiegeln die vier redaktionellen Säulen ----------- */
  var CATEGORIES = {
    kultur:   { label: 'Kultur',              klass: 'kultur' },
    design:   { label: 'Design',              klass: 'design' },
    reisen:   { label: 'Reisen',              klass: 'reisen' },
    haushalt: { label: 'Haushaltsmanagement', klass: 'haushalt' }
  };
  var CATEGORY_ORDER = ['kultur', 'design', 'reisen', 'haushalt'];

  /* ---- C) Beispiel-Beiträge = Werkseinstellungen ------------------------- */
  var SEED = {
    version: 1,
    articles: [
      {
        id: 'zwei-kuechen-ein-tisch',
        status: 'published',
        category: 'kultur',
        title: 'Zwei Küchen, ein Tisch',
        dek: 'Aufgewachsen zwischen dem Topf meines algerischen Vaters und dem Backofen meiner norddeutschen Mutter — und der Frage, wo eigentlich die Heimat wohnt.',
        author: 'Yakin Benkhaouda',
        date: '2026-05-22',
        cover: '',
        blocks: [
          { type: 'p', text: 'In meiner Kindheit gab es zwei Sprachen, die nie übersetzt werden mussten: den Duft von Kreuzkümmel und frischer Minze auf der einen Seite, den von Kardamom im Sonntagskuchen auf der anderen. Mein Vater stammt aus Boukadir, einer Stadt im Norden Algeriens; meine Mutter aus dem kühlen, klaren Wilster in Schleswig-Holstein. Beide haben sich in Köln gefunden — und in unserer Küche.' },
          { type: 'p', text: 'Ich habe lange geglaubt, ich müsse mich entscheiden. Für das eine Land oder das andere, für die eine Großmutter oder die andere. Bis ich verstand, dass die Entscheidung nie verlangt wurde. Heimat war nicht das Land auf dem Pass, sondern der Tisch, an dem beides nebeneinander stand und sich erstaunlich gut vertrug.' },
          { type: 'h', text: 'Was am Tisch passiert' },
          { type: 'p', text: 'Am Tisch wird nicht verglichen, sondern geteilt. Niemand fragt, welche Küche die bessere ist. Man reicht weiter, man probiert, man erzählt. Vielleicht ist genau das gemeint, wenn wir bei HeiBen sagen, dass Heimat kein Ort ist, sondern etwas, das man tut.' },
          { type: 'quote', text: 'Heimat war nie ein Land. Heimat war der Tisch, an dem beides nebeneinander Platz hatte.' }
        ]
      },
      {
        id: 'ankommen-im-eigenen-raum',
        status: 'published',
        category: 'design',
        title: 'Die Kunst, einen Raum zum Ankommen zu machen',
        dek: 'Ein schönes Zimmer ist leicht. Ein Raum, in dem man sich abends fallen lässt, ist die eigentliche Arbeit — und sie hat wenig mit Möbeln zu tun.',
        author: 'Katharina Hein',
        date: '2026-05-15',
        cover: '',
        blocks: [
          { type: 'p', text: 'In der Hotellerie lernt man früh einen Unterschied, der im Privaten oft übersehen wird: Es gibt Räume, die beeindrucken, und Räume, in denen man bleiben möchte. Das Erste gelingt mit Geld. Das Zweite gelingt mit Aufmerksamkeit.' },
          { type: 'h', text: 'Drei Dinge, die mehr zählen als das Sofa' },
          { type: 'list', items: [
            'Licht in Schichten statt einer Deckenlampe — der Abend braucht andere Helligkeit als der Morgen.',
            'Ein Gegenstand mit Geschichte, der nicht ins Konzept passt und gerade deshalb bleibt.',
            'Genug Leere, damit das Auge sich ausruhen kann.'
          ] },
          { type: 'p', text: 'Erst wenn ein Raum nicht mehr darum bittet, bewundert zu werden, fängt er an, ein Zuhause zu sein. Das ist die Linie, an der HeiBen Wohnen entlangarbeitet — und die wir hier im Magazin gern sichtbar machen.' }
        ]
      },
      {
        id: 'boukadir-abseits-der-postkarte',
        status: 'published',
        category: 'reisen',
        title: 'Boukadir, abseits der Postkarte',
        dek: 'Der Norden Algeriens taucht in keinem Hochglanzprospekt auf. Genau deshalb lohnt sich der Weg dorthin — mit jemandem, der die Türen kennt.',
        author: 'HeiBen Studio',
        date: '2026-05-06',
        cover: '',
        blocks: [
          { type: 'p', text: 'Die meisten Reisen nach Nordafrika enden am Pool einer Anlage, die überall stehen könnte. Dabei beginnt das eigentliche Land erst dort, wo die Reiseführer aufhören: in den Markthallen am frühen Morgen, in den Werkstätten der Kupferschmiede, an den Küchentischen von Familien, die einen Gast noch als Glücksfall begreifen.' },
          { type: 'p', text: 'Wir kennen diese Tische, weil sie zu unserer eigenen Familie gehören. Diese Nähe ist nichts, was man buchen kann — aber etwas, das wir teilen können.' },
          { type: 'quote', text: 'Das eigentliche Land beginnt dort, wo die Reiseführer aufhören.' },
          { type: 'p', text: 'Wer einmal so gereist ist, kommt anders zurück: nicht mit Postkarten, sondern mit Namen, Gerüchen und der leisen Gewissheit, für ein paar Tage irgendwo dazugehört zu haben.' }
        ]
      },
      {
        id: 'haushalt-ist-ein-kleines-hotel',
        status: 'published',
        category: 'haushalt',
        title: 'Ein Haushalt ist ein kleines Hotel',
        dek: 'Was die Hotellerie über das Führen eines Zuhauses weiß — ganz ohne erhobenen Zeigefinger und ohne Effizienzwahn.',
        author: 'Katharina Hein',
        date: '2026-04-28',
        cover: '',
        blocks: [
          { type: 'p', text: 'Ein gutes Hotel funktioniert, weil unsichtbare Routinen es tragen. Niemand sieht sie, alle spüren sie. Übersetzt man dieses Prinzip nach Hause, verliert der Haushalt seinen Schrecken — und gewinnt etwas Gastliches, auch sich selbst gegenüber.' },
          { type: 'h', text: 'Die Idee der „Rücksetzung"' },
          { type: 'p', text: 'In der Hotellerie wird jeder Raum nach Gebrauch in einen Grundzustand zurückgesetzt. Zu Hause klingt das nach Mühe, ist aber das Gegenteil: Wer abends die Küche in ihren Ausgangszustand bringt, schenkt dem Morgen einen ruhigen Start. Es ist kein Putzen, es ist Vorsorge für das eigene künftige Ich.' },
          { type: 'p', text: 'Haushaltsmanagement ist die am meisten unterschätzte unserer vier Säulen — und vielleicht die ehrlichste. Denn hier entscheidet sich täglich, ob ein Ort sich nach Heimat anfühlt.' }
        ]
      }
    ]
  };

  /* ---- D) Hilfsfunktionen ------------------------------------------------ */
  function clone(o) { return JSON.parse(JSON.stringify(o)); }

  // HTML-sicheres Maskieren — Redaktion gibt reinen Text ein, nie Code.
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function slugify(s) {
    return String(s || '').toLowerCase()
      .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
      .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60) || ('beitrag');
  }

  function uid() { return 'a' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }

  var MONATE = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
  function fmtDate(iso) {
    if (!iso) return '';
    var p = String(iso).split('-');
    if (p.length < 3) return iso;
    var d = parseInt(p[2], 10), m = parseInt(p[1], 10), y = p[0];
    if (!d || !m) return iso;
    return d + '. ' + MONATE[m - 1] + ' ' + y;
  }

  function wordCount(article) {
    var n = 0;
    (article.blocks || []).forEach(function (b) {
      if (b.type === 'list') (b.items || []).forEach(function (i) { n += String(i).split(/\s+/).length; });
      else if (b.text) n += String(b.text).split(/\s+/).length;
    });
    return n;
  }

  function estimateMinutes(article) {
    return Math.max(1, Math.round(wordCount(article) / 200));
  }

  // Wandelt die Blöcke eines Beitrags in HTML — die einzige Render-Logik,
  // die Artikelansicht und Redaktions-Vorschau gemeinsam verwenden.
  function renderBlocks(blocks) {
    if (!blocks || !blocks.length) return '';
    return blocks.map(function (b) {
      if (b.type === 'h') return b.text ? '<h2>' + esc(b.text) + '</h2>' : '';
      if (b.type === 'quote') return b.text ? '<blockquote>' + esc(b.text) + '</blockquote>' : '';
      if (b.type === 'list') {
        var items = (b.items || []).filter(function (x) { return x && String(x).trim(); });
        if (!items.length) return '';
        return '<ul>' + items.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ul>';
      }
      if (b.type === 'image') {
        if (!b.src) return '';
        var cap = b.caption ? '<figcaption>' + esc(b.caption) + '</figcaption>' : '';
        return '<figure><img src="' + esc(b.src) + '" alt="' + esc(b.caption || '') + '" loading="lazy" />' + cap + '</figure>';
      }
      return b.text ? '<p>' + esc(b.text) + '</p>' : '';
    }).join('\n');
  }

  /* ---- E) Datenzugriff (eine Quelle für alle drei Seiten) ---------------- */
  function loadData() {
    var d = store.get(KEY);
    if (!d || !Array.isArray(d.articles)) { d = clone(SEED); store.set(KEY, d); }
    return d;
  }
  function saveData(d) { store.set(KEY, d); return d; }
  function resetData() { var d = clone(SEED); store.set(KEY, d); return d; }

  function sortedByDateDesc(list) {
    return list.slice().sort(function (a, b) { return (b.date || '').localeCompare(a.date || ''); });
  }
  function getPublished() {
    return sortedByDateDesc(loadData().articles.filter(function (a) { return a.status === 'published'; }));
  }
  function getAll() { return sortedByDateDesc(loadData().articles); }
  function findById(id) {
    var list = loadData().articles;
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  }

  /* ---- Bereitstellen ----------------------------------------------------- */
  window.HeiBenMag = {
    store: store, KEY: KEY, CATEGORIES: CATEGORIES, CATEGORY_ORDER: CATEGORY_ORDER, SEED: SEED,
    clone: clone, esc: esc, slugify: slugify, uid: uid, fmtDate: fmtDate,
    wordCount: wordCount, estimateMinutes: estimateMinutes, renderBlocks: renderBlocks,
    loadData: loadData, saveData: saveData, resetData: resetData,
    getPublished: getPublished, getAll: getAll, findById: findById, sortedByDateDesc: sortedByDateDesc
  };
})();
