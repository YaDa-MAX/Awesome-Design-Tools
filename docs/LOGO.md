# HeiBen — Logo-System (bestätigte Version)

## Das Zeichen
Wortmarke **HeiBen** in Fraunces, beide Versalien (H und B) in Terrakotta (#c2533a) —
das Pivot-Prinzip: Hei(mat) trifft (le)Ben. Im vollen Lockup folgen darunter ein feiner
Strich, die fünf Hausfarben-Punkte (Reisen Ocker, Wohnen Moos, Immobilien Burgund,
Studio Tinte, Kulinarik Aubergine) und der Claim HEIMAT LEBEN.

## Einbau im Kit (alles als Inline-SVG → skaliert verlustfrei, erbt die echte Fraunces)
- **Header** (27 Seiten): kompakte Wortmarke „HeiBen" (ei/en in Tinte). Größe via
  `.brand svg{height:30px}`, mobil 25px.
- **Footer** (Marke auf Dunkel): Wortmarke mit ei/en in Papier (`.brand-block svg`).
- **Hero/Wortmarken-Sektion** (7 Seiten): volles Lockup (Wortmarke + Strich + fünf Punkte +
  Claim), `.wms-lockup svg{width:min(540px,84vw)}`. Die alte Buchstaben-Animation wurde
  durch das statische Lockup ersetzt; die sanfte Einblendung des Motion-Layers bleibt.

## Icon-Familie (neu gerendert aus dem Monogramm „HB + fünf Punkte")
Quelle: `assets/icon-source-1024.png`. Abgeleitet in allen Pflichtgrößen:
`favicon-32`, `favicon-192`, `favicon-512`, `maskable-192`, `maskable-512` (Inhalt in der
80%-Sicherheitszone), `apple-touch-icon` (180). Head-Favicons verweisen jetzt auf Dateien
statt base64. Capacitor-Quellen `app/assets/icon.png` (1024) und `splash.png` (2732) ebenfalls
neu. PWA-Manifest unverändert gültig (gleiche Dateinamen).

## Größen-Logik zentral
Ein Block `<style id="hb-logo-css">` auf jeder Seite steuert alle Logo-Größen (Header,
Footer, Hero) inkl. Mobil-Breakpoint — eine Stelle für künftige Anpassungen.

## Quell-/Ansichtsdateien
`brand/logo-final.html` (bestätigte Version), `brand/logo-konzepte.html` &
`brand/logo-konzepte-v2.html` (frühere Studien). Verifiziert auf Desktop + 375/390px,
33 Seiten ohne Konsolenfehler.
