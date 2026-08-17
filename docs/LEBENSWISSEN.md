# Lebenswissen — Integration als Studio-Rubrik

## Entscheidung: Teil von Studio (kein sechstes Haus)
Ein sechstes Haus hätte das Markensystem gebrochen: Die Wortmarken-Herleitung arbeitet auf
sieben Seiten mit genau fünf Punkten/Hausfarben, Start- und Familienseite mit dem Fünfer-Raster.
Inhaltlich ist „Lebenswissen" zudem genuiner Studio-Stoff (das Inhalte-Haus). Es läuft daher als
**„HeiBen Studio · Lebenswissen"** mit eigener Sub-Identität: Die 9 Bereichsfarben des Originals
(Bildung … Alter) wirken als Akzentsystem unterhalb der Studio-Marke (Kartenkanten, Badges,
Vertiefungs-Rahmen) — HeiBen-Typografie und -Papierton bleiben führend.

## Übernommene Inhalte (1:1 aus lebenswissen.html extrahiert)
- **94 Wegweiser** in 9 Lebensbereichen (je 10–13), mit Altersspannen und Lebenslagen-Zuordnung.
- **94 Premium-Vertiefungen** (HTML mit Tabellen/Anleitungen) inkl. **31 interaktiven Rechnern**
  (Netto, ALG, Notgroschen, Zinseszins, Tilgung, Hauskauf, Elterngeld, Pflege-Eigenanteil,
  Erbschaftsteuer, Prozessrisiko u. v. m.) — Rechenlogik unverändert übernommen
  (`web/lebenswissen-daten.js` 379 KB, `web/lebenswissen-tools.js` 32 KB).

## Seiten
- `studio-lebenswissen.html`: Übersicht mit 9 farbcodierten Bereichs-Chips, Lebenslagen-Select
  und Textsuche.
- `studio-lebenswissen-artikel.html?id=…`: **Grundlagen frei** (Kurzfassung, Absätze,
  „Zum Abhaken"-Checkliste), darunter **„★ Die Vertiefung"** — offen oder als Kauf-Box.

## Monetarisierung (übernommen & angepasst) — Preis-Evaluation
Originalmodell: „Grundlagen frei, Premium öffnet Vertiefungen" zu 4,90 €/Monat (= 58,80 €/Jahr).
Als Rubrik **neben** HeiBen Plus (4,99 €/Monat für Kulinarik + Magazin) wäre das zu teuer und
würde kannibalisieren. Daher:
- **0,50 € je Artikel** (Vorgabe): passt zum Nachschlagewerk-Charakter — punktueller Bedarf
  beim Lebensereignis. 94 Artikel = 47 € Maximalwert.
- **Jahres-Pass 14,90 €/Jahr**: Break-even bei 30 Artikeln (⅓ des Bestands), ~1,24 €/Monat —
  klar unterhalb von Plus positioniert, attraktiv ab dem zweiten Lebensereignis.
- **Abgrenzung:** Käufe/Pass hängen am HeiBen-Konto; HeiBen Plus bleibt unabhängig (wird im
  Kauf-Dialog explizit gesagt). Redaktion/Admin sehen alles. Das „Lebenslang"-Angebot des
  Originals wurde bewusst weggelassen (verwässert das Jahres-Modell).
- **Live-Hinweis:** 0,50-€-Einzelzahlungen sind wegen Zahlungsgebühren real unwirtschaftlich —
  im Live-Betrieb als Guthaben/5er-Paket bündeln (steht auch im UI-Hinweis). Demo ohne Zahlung.

## Technik & Integration
- Konto-API erweitert: `lwAccess(id)`, `lwBuy(id)`, `lwBuyPass()` (12 Monate), `lwState()` —
  gespeichert am Nutzer (`u.lw`), Profil zeigt Pass-Status/Käufe.
- Studio-Landing-Teaser, Magazin-Querverweis, Suche um Gruppe „Lebenswissen" erweitert
  (94 Einträge, nur freie Teaser — kein Premium-Leak), Sitemap, Motion + Nav-Widgets.
- E2E-getestet: Filter, Gast-Sperre, Einzelkauf → Vertiefung + Rechner live, Jahres-Pass,
  Persistenz, Profil-Status, Suche. 0 Konsolen-Fehler.

## Buchempfehlungen mit Partner-Links (aus lebenswissen_mit_Buch.html)
- **30 der 94 Artikel** bringen aus der Quelle je **2 kuratierte Buchempfehlungen** mit
  (Titel, Autor:in, Kernidee als Kaufargument). Die Box „Literatur zum Vertiefen" erscheint
  automatisch überall, wo Daten existieren — weitere Artikel lassen sich einfach im
  `BUECHER`-Objekt in `lebenswissen-daten.js` ergänzen (gleiche Struktur `{t,a,i}`).
- **Platzhalter-Links:** `https://www.amazon.de/s?k=Titel+Autor&tag=heiben-platzhalter-21` —
  vor dem Live-Gang das eigene Amazon-PartnerNet-Tag einsetzen (eine Konstante `AFF_TAG`
  in `studio-lebenswissen-artikel.html`). Kennzeichnung: „Anzeige · Partner-Links"-Label,
  Sternchen am Button, Fußnote, `rel="sponsored nofollow noopener"`.
- **Bewusste Abweichung vom Original:** Dort sahen Free-Leser die Kernidee nur verschwommen
  und ohne Link. Hier sind Bücher für alle sichtbar — Affiliate monetarisiert gerade die
  Free-Mehrheit; die Box steht UNTER der Vertiefung, damit sie den eigenen Verkauf
  (0,50 € / Pass) nicht kannibalisiert.

## Finanzielle Einschätzung der Buch-Provision
Annahmen: Amazon-PartnerNet zahlt für Bücher ~5 %; Ratgeber kosten im Schnitt 18–22 € →
~1 € je verkauftem Buch; das 24-h-Cookie vergütet den gesamten Warenkorb → effektiv oft
1,50–2,50 € je Conversion. Funnel: 1–3 % der Artikel-Leser klicken (kuratierte Box mit
Kaufargument im Ratgeber-Kontext), davon kaufen 5–10 %.
- **Ertrag je 1.000 Artikelaufrufe (RPM): grob 0,50–4 €.**
- Szenarien/Monat: 10.000 Aufrufe ≈ 5–40 € · 100.000 ≈ 50–400 € · 1 Mio ≈ 500–4.000 €.
- Vergleich: Dieselben 10.000 Leser bringen bei nur 0,5 % Pass-Conversion ~745 €/Monat.
**Fazit:** Affiliate ist ein Zubrot mit null Grenzkosten — wertvoll, weil es die nie
zahlende Mehrheit monetarisiert und linear mit SEO-Traffic skaliert (94 Long-Tail-Ratgeber
sind genau dafür gebaut). Tragende Säulen bleiben Einzelkauf und Jahres-Pass; To-dos für
den Live-Gang: PartnerNet-Konto, Tag ersetzen, restliche 64 Artikel kuratieren,
Affiliate-Hinweis in Impressum/Datenschutz.

## Ausbau: Guthaben, Konversion, Newsletter, Lebensphasen
- **5er-Paket (1,99 € = 0,40 €/Artikel):** Neue mittlere Kaufoption; Guthaben hängt am Konto
  (`lwBuyPack`/`lwRedeem`). Hat man Guthaben, wird „Mit Guthaben freischalten — noch n übrig"
  zur primären Aktion. Löst das Gebührenproblem der 0,50-€-Einzelzahlung; Profil zeigt
  Restguthaben.
- **Mitgliedschafts-Übersicht für Gäste** auf `konto.html`: Vor dem Login zwei Karten
  (HeiBen Plus 4,99 €/Monat · Lebenswissen ab 0,40 €/Artikel) mit Leistungen — Kaufanreiz,
  bevor man ein Konto anlegt.
- **Lebenslagen-Brief (Newsletter) jetzt mit echter Anmeldung:** Studio-CTA ist statt
  mailto ein Formular (Gast-E-Mails landen in einer eigenen Liste; eingeloggte Konten
  setzen ihr Flag), Profil hat einen Abo-Toggle, die Admin-Verwaltung eine dritte
  kopierbare Empfängerliste (Konten + Gäste). Demo-Hinweis: live mit Double-Opt-in.
- **Lebensphasen-Band** auf der Lebenswissen-Übersicht: Der „typische Lebensverlauf" aus
  der Quelle (9 Phasen mit Altersspannen, farbcodiert) ist jetzt horizontal scrollbar und
  filtert die Wegweiser per Antippen nach Altersüberlappung (Toggle).
Alles E2E-getestet (Paketkauf → 5 Guthaben → Einlösen über zwei Artikel hinweg, Profil- und
Admin-Anzeigen, Gast-Anmeldung, Phasenfilter 94→82→94), 0 Konsolen-Fehler.

## Vom Lese- zum Arbeits-Nachschlagewerk
Damit Lebenswissen im Alltag *benutzt* wird (Behördengang, Umzug, Antrag), nicht nur gelesen:
- **Abhakbare Checklisten mit Fortschritt:** Jeder Punkt der „Zum Abhaken"-Liste ist klickbar,
  der Stand (z. B. „2/4") wird je Wegweiser gespeichert (`heiben-lw-stand`).
- **Eigenes Notizfeld je Wegweiser:** Fristen, Aktenzeichen, Zwischenstände — Autosave, privat
  auf dem Gerät, erscheint mit auf dem Ausdruck.
- **Merken (♥):** Herz auf Artikel und auf allen Übersichtskarten, Filter „♥ Gemerkte (n)",
  Anzeige im Konto-Profil (`heiben-lw-favs`) — konsistent zur Rezept-Merkliste.
- **Drucken / als PDF:** „⎙ Drucken"-Knopf erzeugt eine saubere Fassung (ohne Navigation,
  Kaufbox, Bücher, Rechner-Eingaben; eigene Notizen sichtbar; Fußzeile mit Quelle).
- **„Zuletzt angesehen":** Chip-Leiste auf der Lebenswissen- und der Rezepte-Übersicht
  (gemeinsamer Verlauf `heiben-verlauf`, jüngste zuerst, max. 6 sichtbar).
E2E-getestet: Check-Persistenz über Reload, Notiz-Autosave, ♥ Artikel↔Übersicht-Filter,
Print-Emulation (Notiz sichtbar, Kaufbox/Bücher/Tool versteckt), Verlauf auf beiden
Übersichten, Profil-Block. 0 Konsolen-Fehler.
