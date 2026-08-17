# Konto-System: Registrierung, Rollen, Plus-Paywall, Verwaltung, Newsletter (PROTOTYP)

## Ehrliche Einordnung
Das Kit ist eine statische Website. Dieses Konto-System bildet **alle Abläufe vollständig
bedienbar** ab (UI/UX, Rollen, Paywall, Verwaltung) — gespeichert wird aber im Browser
(`localStorage`), und der Bestätigungscode wird angezeigt statt gemailt. **Für den Live-Betrieb**
müssen Speicher, Mailversand und Rechteprüfung auf einen Server bzw. Dienst (z. B. Supabase,
Firebase, eigenes Backend) umziehen — die zentrale Bibliothek `web/heiben-konto.js` ist genau
dafür gekapselt (alle Zugriffe laufen über `_load/_save` und die `HeiBenKonto`-API).
Passwörter werden nie im Klartext gespeichert (SHA-256 + Salt, Web Crypto API).

## Kundenfluss
1. **Registrieren** auf `konto.html` (Name, E-Mail, Passwort ≥ 8 Zeichen).
2. **E-Mail bestätigen:** 6-stelliger Code (Demo: wird angezeigt; Live: per Mail). Ohne
   Bestätigung ist kein Login möglich.
3. **Anmelden** → Profil mit Abo-Status. **HeiBen Kulinarik Plus** lässt sich im Prototyp ohne
   Zahlung freischalten/beenden (Live: Zahlungsanbieter einhängen).

## Was Plus freischaltet (Free = Teaser)
- **Rezepte:** Die 153 Länderküchen-Rezepte zeigen ohne Plus nur 3 Zutaten + Schritt 1 plus
  Plus-Hinweis; mit Plus alles. **Familienrezepte bleiben immer frei.**
- **Studio-Artikel:** Ohne Plus die ersten zwei Absätze mit Ausblendung + Hinweis; mit Plus voll.
- Übersicht, Karte, Würfel und Wochenplaner bleiben als Einstieg frei.

## Rollen & interne Bereiche
- Rollen: `kunde`, `redaktion`, `admin` (Redaktion/Admin sehen automatisch alles, inkl. Plus).
- Guards: Redaktionen + Export verlangen `redaktion`/`admin`; Anfragen-/Bestell- und
  Nutzerverwaltung verlangen `admin`. (Im Prototyp clientseitig — Live serverseitig!)
- Nav: Auf allen öffentlichen Seiten erscheint „Anmelden" bzw. „Konto · {Vorname}"
  (Admins zusätzlich „Verwaltung").

## Verwaltung (`konto-verwaltung.html`, nur Admin, noindex + robots-Disallow)
- Kontenliste: Status (freischalten/sperren), Rolle und Abo direkt umschalten, löschen,
  offene Bestätigungscodes einsehen.
- **Neues Konto anlegen** (z. B. Redaktionszugang) — Initialpasswort wird einmalig angezeigt.
- Schnellzugriff auf alle sechs internen Werkzeuge.
- **Newsletter:** drei kopierbare Vorlagen (Bestätigungs-Mail mit {{code}}, Plus-Willkommen,
  Monatsbrief) + Empfängerlisten (alle aktiven Konten / nur Plus) zum Kopieren.

## Demo-Zugang
`admin@heiben.de` / `heiben2026` — beim Live-Gang ändern. Erste Registrierung/Codes lassen
sich in der Verwaltung einsehen.
