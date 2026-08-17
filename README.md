# HeiBen Kit

Arbeitsstand der fiktiven Kölner Familienholding **HeiBen** („Heimat leben“) — eine statische,
offline-fähige Web-App **ohne Build-Schritt**: reines HTML/CSS/JS, Zustand in `localStorage`,
Auslieferung direkt aus `web/`.

> Die Holding, ihre Gesellschaften und sämtliche Inhalte sind **Fiktion** — ein Gestaltungs- und
> Entwicklungsprojekt, kein reales Unternehmen und keine Rechts-, Finanz- oder Gesundheitsberatung.

## Die fünf Welten

| Welt | Farbe | Inhalt |
|---|---|---|
| Reisen | `#a97a1d` | Kuratierte Reisen, Planer, Anfrage-Strecke |
| Wohnen | `#4a5c39` | Konfigurator, Raumplaner (2D/3D), Manufaktur |
| Immobilien | `#792d29` | Angebote, Planner, Budgetrechner |
| Studio | `#1f1c17` | Magazin, Lebenswissen, 8 Kompendien mit 370 Steckbriefen |
| Kulinarik | `#6b3951` | Rezepte, Wochenplan, Mealplanner, Export |

Kanonische Quelle für Firmierungen, Farben und Steuerlogik: `web/heiben-firmierungen.js`.

## Loslegen

```bash
cd web && python3 -m http.server 8180
# http://127.0.0.1:8180/index.html
```

## Verzeichnisse

| Pfad | Inhalt |
|---|---|
| `web/` | Die Anwendung: 101 Seiten, `assets/`, `vendor/`, Service-Worker |
| `docs/` | Konzepte und Pflegeanleitungen je Bereich |
| `tools/` | Pflegewerkzeuge (Kennzahlen, Audit, Entdoppelung, PDF-Bau) — **kein** Build-Schritt |
| `mock/` | Buchungs-Mock-Server samt OpenAPI-Beschreibung |
| `contract/`, `data/`, `vorlagen/`, `print/`, `brand/`, `exporte/` | Verträge, Daten, Vorlagen, Druck- und Markenmaterial |

## Mitarbeiten

`CLAUDE.md` ist die verbindliche Arbeitsanweisung (Pflicht-Workflow, Architektur-Regeln, stabile
Verträge, Testmuster). `_WEITERARBEIT.md` ist das fortlaufende Protokoll — vor jeder Sitzung lesen,
nach jeder Änderung fortschreiben.

Der laufende Umbau folgt `REMAKE-KONZEPT-V3.md`; den Ist-Stand misst

```bash
cd web && python3 ../tools/audit_v3.py
```

## Herkunft

Dieses Repository ist ein Fork von
[LisaDziuba/Awesome-Design-Tools](https://github.com/LisaDziuba/Awesome-Design-Tools) und wird als
Ablage für das HeiBen Kit weiterverwendet. Die Listen der Vorlage
(`Awesome-Design-*.md`, `Media/`, `docs/` der Vorlage, `index.js`) liegen unverändert daneben; die
Lizenz der Vorlage steht in `LICENSE`.
