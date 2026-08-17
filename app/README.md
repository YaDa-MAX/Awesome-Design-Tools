# HeiBen — native App (Capacitor)

Diese Hülle verpackt die Web-Assets aus `../web` in echte iOS-/Android-Apps für App Store
und Play Store. Die Web-Version bleibt die einzige Quelle der Wahrheit — Änderungen immer
in `../web` machen, dann unten neu synchronisieren.

## Voraussetzungen (auf dem eigenen Rechner)
- Node.js ≥ 18
- **iOS:** macOS + Xcode + CocoaPods (`sudo gem install cocoapods`) + Apple-Developer-Konto (99 €/Jahr)
- **Android:** Android Studio (inkl. SDK) + Google-Play-Developer-Konto (25 $ einmalig)

## Einrichtung
```bash
cd app
npm install
npm run add:ios       # legt das iOS-Projekt an + erzeugt Icons/Splash
npm run add:android   # legt das Android-Projekt an + erzeugt Icons/Splash
```

## Nach jeder Web-Änderung
```bash
npm run sync          # kopiert ../web → www und synchronisiert beide Plattformen
```

## Öffnen & bauen
```bash
npm run open:ios      # öffnet Xcode  → Signieren → Archive → App Store Connect
npm run open:android  # öffnet Android Studio → Signed App Bundle (.aab) → Play Console
```

Icon-/Splash-Quelle: `assets/icon.png` (1024×1024) und `assets/splash.png` (2732×2732).
Bei Markenänderungen ersetzen und `npm run assets` ausführen.

Den vollständigen Store-Einreichungs-Leitfaden gibt es in `../docs/APP_STORES.md`.
