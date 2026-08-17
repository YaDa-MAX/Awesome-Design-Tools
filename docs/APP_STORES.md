# HeiBen in App Store & Play Store

HeiBen ist ab sofort eine **installierbare App** — auf zwei Ebenen:

1. **PWA (sofort live, ohne Store):** Das Web ist eine vollständige Progressive Web App mit
   Manifest, Offline-Service-Worker, App-Icons und Installations-Aufforderung. Auf Android/
   Desktop erscheint „HeiBen als App installieren"; auf iOS der Hinweis „Teilen → Zum
   Home-Bildschirm". Damit ist HeiBen schon ohne Store als App nutzbar (eigenes Symbol,
   Vollbild, offline). **Voraussetzung: HTTPS-Hosting** (Service-Worker laufen nur über
   https bzw. localhost).

2. **Echte Store-Apps:** Aus denselben Web-Assets erzeugt das Capacitor-Projekt unter `app/`
   native iOS-/Android-Apps.

## Was bereits erledigt ist
- Manifest (`web/manifest.webmanifest`): Name, Farben, 4 Icons (inkl. maskable), 4 Shortcuts.
- Service-Worker (`web/service-worker.js`): Precache aller Seiten/Daten, Netzwerk-zuerst für
  Seiten, stale-while-revalidate für Assets → volle Offline-Nutzung (getestet).
- Install-Aufforderung + iOS-Hinweis + iOS-Vollbild-Metatags auf allen Seiten.
- Icons: `favicon-192/512`, `maskable-192/512`, `apple-touch-icon`, `icon-source-1024`.
- Capacitor-Projekt `app/`: Config, Build-Skript (`copy-web.mjs`), Icon-/Splash-Quellen.

## Route A — Play Store (Android), schnellster Weg: PWA → TWA
Wenn HeiBen bereits unter HTTPS läuft, geht Android am schnellsten per **Trusted Web Activity**
(die App zeigt die echte Website ohne Browser-Leiste):
1. https://www.pwabuilder.com öffnen, HeiBen-URL eingeben → „Package for Stores" → Android.
2. Das erzeugte **.aab** in der Google Play Console hochladen.
3. `assetlinks.json` (von PWABuilder geliefert) unter `https://DEINE-DOMAIN/.well-known/`
   ablegen (verknüpft App und Domain, entfernt die Adressleiste).
Alternativ volle Kontrolle über Capacitor (Route C).

## Route B — App Store (iOS)
Apple akzeptiert keine reinen TWA/PWA-Pakete zuverlässig (Richtlinie 4.2 „Minimum
Functionality"). Empfohlen ist der **Capacitor-Weg** (Route C). Die PWA-Eigenschaften
(Offline, App-Shell, eigenständige Werkzeuge wie Rechner/Wochenplaner) helfen, die
4.2-Prüfung zu bestehen, weil die App eigenständigen Nutzen über eine bloße Website hinaus
bietet.

## Route C — Capacitor (beide Stores, volle Kontrolle)
```bash
cd app && npm install
npm run add:ios && npm run add:android
npm run open:ios      # Xcode: Team/Signing wählen → Archive → an App Store Connect
npm run open:android  # Android Studio: Signiertes .aab → Play Console
```

## Vor der Einreichung benötigt (beide Stores)
- **Konten:** Apple Developer (99 €/Jahr), Google Play (25 $ einmalig).
- **Store-Texte:** Name (HeiBen), Untertitel, Beschreibung, Keywords, Support-/Datenschutz-URL.
- **Screenshots:** iPhone 6.7" & 6.5", iPad 12.9"; Android Phone & 7"/10"-Tablet
  (mit dem Simulator/Emulator je 3–5 Aufnahmen: Start, Rezepte, Wochenplan, Lebenswissen, Suche).
- **Datenschutz-Angaben:** HeiBen speichert Konto, Merklisten, Notizen, Käufe und Verlauf
  **nur lokal auf dem Gerät** (localStorage) — in Apples „App Privacy" und Googles „Data
  safety" entsprechend als geräte-lokal/keine Server-Sammlung angeben. Vor dem echten
  Verkauf (Plus, Lebenswissen-Pass) sind In-App-Käufe der Stores oder ein eigener
  Zahlungs-Backend nötig — der aktuelle Kauf-Flow ist eine geräte-lokale Demo.
- **Hinweise:** Bei realen In-App-Käufen verlangen beide Stores ihre eigenen
  Bezahlsysteme (15–30 % Provision); Affiliate-Buchlinks sind als Anzeige zu kennzeichnen.

## Aktualisieren
Inhalte/Funktionen immer in `web/` ändern. PWA: neu hochladen — der Service-Worker zieht die
neue Version automatisch. Store-Apps: `cd app && npm run sync`, dann in Xcode/Android Studio
eine neue Build-Nummer hochladen.
