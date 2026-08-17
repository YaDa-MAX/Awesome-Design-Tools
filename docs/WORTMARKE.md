# Die Wortmarke — Prüfung & animierte Herleitung

## Prüfbefund (alle wordmark-*.png vermessen)
Die Herleitung **HEI·mat + le·BEN → HeiBen** ist konsistent umgesetzt: Alle sechs Wortmarken
nutzen exakt dieselbe Glyphenform (pixelidentische B-Fläche), nur die Farbe des Binnen-B wechselt
je Haus — Holding #c2533a (Terracotta), Reisen #d29939 (Ocker), Wohnen #4a5c39 (Moos),
Immobilien #792d29 (Burgund), Kulinarik #6b3951 (Aubergine), Studio bewusst Ink; on-dark Gold.
Das große B markiert die Naht der beiden Wörter („Binnenmajuskel"). Der Claim „Heimat leben"
wird auf Start- und Familienseite konsistent geführt.

## Neue Sektion „Die Wortmarke" (index.html, vor den Häusern)
Scroll-ausgelöste Animation in vier Phasen, am Ende ein statisches Erklärbild:
1. „Heimat leben" steht groß in Fraunces.
2. „Hei" und „ben" werden farbig unterstrichen (die tragenden Silben).
3. „mat" und „le" kollabieren sanft (Breite→0), das kleine b blendet zum großen, farbigen **B** —
   aus zwei Wörtern wird **HeiBen**.
4. Endbild: Das B zykliert einmal durch die fünf Hausfarben (synchron leuchten die fünf
   Haus-Punkte auf) und endet in der Holding-Farbe. Darunter bleibt die Erklärung stehen:
   „Zwei Wörter, ein Name … Das große B ist die Naht — und trägt die Farbe des Hauses."
   Plus „Noch einmal ansehen"-Knopf.

Robustheit: startet einmalig beim Scrollen in den Sichtbereich; `prefers-reduced-motion`
zeigt sofort das statische Endbild; ohne JavaScript wird nichts versteckt.

## Rollout (7 Seiten, abgestimmt auf die vorhandenen Scroll-Reveals)
- **index.html & familie.html:** volle Herleitung, Finale in der Holding-Farbe (Terracotta).
- **Die fünf Haus-Seiten** (vor dem Kontakt-/CTA-Band, als ruhiger Marken-Moment am Seitenende):
  identische Animation, aber das B endet in der **eigenen Hausfarbe** — Reisen Ocker, Wohnen Moos,
  Immobilien Burgund, Studio bewusst tiefes Ink, Kulinarik Aubergine. Der eigene Haus-Punkt wird
  hervorgehoben, der Erklärsatz benennt Farbe und Haus.
- Bewusst NICHT eingebaut auf Funktions- und Inhaltsseiten (Rezepte/Planer/Würfel, Anfragen,
  Konfigurator, Magazin/Schaufenster, interne Verwaltung, 404) — dort wäre es Ablenkung.
- Integration mit dem Motion-Layer: Die Sektion nimmt am normalen Scroll-Reveal teil; die
  Herleitung selbst startet erst bei ~45% Sichtbarkeit, einmalig, mit Replay-Knopf.
  `prefers-reduced-motion` zeigt sofort das statische Endbild.
