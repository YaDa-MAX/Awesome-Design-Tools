# So pflegen Sie Ihr Schaufenster „Unsere Arbeit"

Diese Anleitung ist bewusst ohne Fachbegriffe geschrieben. Sie erklärt, wie Sie die Arbeit Ihrer drei Häuser selbst zeigen: Reiserouten, Wohnprojekte und Immobilienobjekte. Das Schaufenster folgt demselben einfachen Muster, das Sie schon vom Magazin kennen — eine Datenquelle, eine Vorlage, ein internes Redaktionswerkzeug. Wenn Ihnen die Magazin-Pflege vertraut ist, werden Sie sich hier sofort zurechtfinden.

## Wozu das Schaufenster da ist

Bisher beschrieben Ihre Tochterseiten, *was* die Häuser tun. Das Schaufenster zeigt, *wie* es aussieht, wenn sie es tun. Es steht damit genau zwischen Ihren Inhaltsseiten und dem Anfragesystem: Ein Besucher sieht ein Beispiel, das ihm gefällt, und findet auf derselben Seite den Knopf, mit dem er dazu eine Anfrage startet. So wird aus Interesse ein Gespräch.

## Die drei Seiten und wie sie zusammengehören

Ihr Schaufenster besteht aus drei Seiten, die eng zusammenarbeiten. Die Übersichtsseite `schaufenster.html` ist das öffentliche Schaufenster: Hier sehen Ihre Besucher alle Einträge als Karten und können oben nach Haus filtern. Die Detailseite `schaufenster-detail.html` zeigt einen einzelnen Eintrag ausführlich; sie ist eine einzige Vorlage, die jeden Ihrer Einträge darstellen kann — gleich, ob Reise, Projekt oder Objekt. Und die Redaktionsseite `schaufenster-redaktion.html` ist Ihr internes Werkzeug, mit dem Sie alles anlegen und verwalten.

Wie beim Magazin greifen alle drei Seiten auf denselben gemeinsamen Vorrat an Einträgen zu. Was Sie in der Redaktion anlegen und veröffentlichen, erscheint sofort in der Übersicht und ist als eigene Detailseite abrufbar. Sie pflegen Ihre Inhalte also an genau einer Stelle.

## Die Redaktion öffnen

Öffnen Sie `schaufenster-redaktion.html` in Ihrem Browser. Diese Seite ist bewusst nicht mit Ihrer Website verlinkt — sie ist Ihr Hinterzimmer, das nur Sie kennen. Oben finden Sie zwei Reiter: „Einträge" und „Sichern und Laden". Auf dem Reiter „Einträge" sehen Sie die Liste all Ihrer Einträge mit Haus, Titel und Zustand, und Sie können nach Haus filtern.

## Einen Eintrag anlegen

Klicken Sie auf „+ Neuer Eintrag". Es öffnet sich der Editor. Links tragen Sie die Angaben ein, rechts sehen Sie in einer Live-Vorschau sofort, wie der fertige Eintrag aussehen wird — genau so, wie er später öffentlich erscheint.

Das wichtigste Feld steht ganz oben: das **Haus**. Hier wählen Sie, ob es um eine Reise, ein Wohnprojekt oder eine Immobilie geht. Diese Wahl tut zweierlei. Erstens bestimmt sie die Farbe, in der der Eintrag erscheint — Ocker für Reisen, Moos für Wohnen, Burgund für Immobilien. Zweitens — und das ist der eigentliche Kniff — bestimmt sie, welche **Kerndaten** abgefragt werden. Bei einer Reise sind das Ziel, Dauer und Ab-Preis; bei einem Wohnprojekt Ort, Stil und Umfang; bei einer Immobilie Lage, Art, Zimmer, Fläche, Preis und ein Verfügbarkeitsstatus. Wechseln Sie das Haus, wechseln auch diese Felder. So müssen Sie nie an Felder denken, die zu Ihrem Eintrag gar nicht passen.

Darunter vergeben Sie einen Titel, ein Datum (es bestimmt die Reihenfolge — der jüngste Eintrag steht in der Übersicht oben), bei Bedarf die Adresse eines Titelbildes und eine Kurzbeschreibung, die in der Übersicht neugierig macht. Lassen Sie das Bildfeld leer, erscheint an seiner Stelle eine ruhige dunkle Fläche in der Markenfarbe.

## Höhepunkte und Beschreibung

Unter den Kerndaten tragen Sie die **Höhepunkte** ein — kurze Stichpunkte, die das Besondere auf den Punkt bringen. Mit „+ Höhepunkt" fügen Sie weitere Zeilen hinzu, mit dem Kreuz entfernen Sie eine. In der **ausführlichen Beschreibung** erzählen Sie frei. Eine Leerzeile beginnt dabei einen neuen Absatz — mehr müssen Sie über die Gestaltung nicht wissen, den Rest übernimmt die Vorlage.

## Speichern, veröffentlichen und zurückziehen

Sind Sie fertig, haben Sie zwei Möglichkeiten. „Speichern und veröffentlichen" stellt den Eintrag sofort öffentlich ins Schaufenster. „Als Entwurf speichern" bewahrt Ihre Arbeit auf, ohne sie zu zeigen — ideal, wenn Sie später weiterschreiben möchten.

In der Liste führen Sie jeden Eintrag durch zwei Zustände: „Entwurf" und „Veröffentlicht". Neben „Bearbeiten" finden Sie „Veröffentlichen" beziehungsweise „Zurückziehen": Damit nehmen Sie einen Eintrag jederzeit wieder aus der Öffentlichkeit, ohne ihn zu löschen — bei Immobilien ist das praktisch, sobald ein Objekt verkauft ist. „Duplizieren" erstellt eine Kopie als Entwurf, was Zeit spart, wenn ein neuer Eintrag einem bestehenden ähnelt. „Löschen" entfernt einen Eintrag endgültig.

Ein hilfreiches Detail im Hintergrund: Wenn Sie einen veröffentlichten Eintrag später umbenennen, bleibt seine Internet-Adresse dieselbe. Ein einmal geteilter Link — etwa zu einem Objekt in einem Inserat — funktioniert also weiter, auch wenn Sie den Titel noch einmal überarbeiten.

## Der Verfügbarkeitsstatus bei Immobilien

Immobilien haben ein zusätzliches Kerndatum: den Status „Verfügbar", „Reserviert" oder „Verkauft". Dieser erscheint als kleine farbige Plakette auf der Karte und der Detailseite — grün für verfügbar, ocker für reserviert, grau für verkauft. So sehen Interessenten auf einen Blick, was noch zu haben ist. Ein verkauftes Objekt können Sie sichtbar lassen, um Ihre Arbeit zu zeigen, oder über „Zurückziehen" aus der Öffentlichkeit nehmen.

## Ihre Arbeit sichern und weitergeben

Ihre Eingaben werden automatisch in dem Browser gespeichert, mit dem Sie arbeiten. Möchten Sie Ihre Einträge sichern, auf einen anderen Rechner übertragen oder an die Person weitergeben, die Ihre Website betreut, nutzen Sie den Reiter „Sichern und Laden". Dort speichert „Einträge als Datei sichern" Ihren gesamten Bestand in einer Datei namens `heiben-schaufenster-daten.json`. Über „Daten aus Datei laden" holen Sie eine Sicherung zurück. Und „Auf Werkseinstellungen zurücksetzen" stellt die ursprünglichen Beispiel-Einträge wieder her — sichern Sie vorher, wenn Sie Ihre eigenen behalten möchten.

## Wie ein Eintrag ins Internet kommt

Wie beim Magazin und beim Shop gilt: Solange Sie nur in Ihrem Browser arbeiten, sehen Ihre Einträge nur Sie. Damit die Welt sie sieht, sichern Sie Ihren Bestand als Datei und geben sie an die Person weiter, die Ihre Website ins Internet stellt. Möchten Sie eines Tages, dass ein veröffentlichter Eintrag ohne diesen Zwischenschritt sofort für alle sichtbar wird, ist auch das vorbereitet — dafür braucht es denselben Hintergrunddienst, der bereits für die Zahlungsabwicklung des Shops vorgesehen ist. Bis dahin ist der Weg über die gesicherte Datei verlässlich und vollständig.

## Die Beispiel-Einträge

Das Schaufenster startet mit sechs Beispiel-Einträgen — zwei je Haus —, die im Geist Ihrer Familiengeschichte verfasst sind. Sie sind als Werkseinstellung gedacht und sollten von Ihnen geprüft, angepasst oder durch echte Arbeiten ersetzt werden, bevor das Schaufenster öffentlich geht.

## Wenn die Schrift einmal anders aussieht

Das Schaufenster verwendet die Marken-Schriften. Werden sie einmal nicht geladen — etwa ohne Internetverbindung —, fällt die Seite still auf eine ähnliche Standardschrift zurück. Alle Inhalte und Funktionen bleiben dabei vollständig erhalten, nur das Schriftbild wirkt etwas schlichter.
