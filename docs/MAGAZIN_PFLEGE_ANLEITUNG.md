# So pflegen Sie Ihr HeiBen-Studio-Magazin

Diese Anleitung ist bewusst ohne Fachbegriffe geschrieben. Sie erklärt, wie Sie Beiträge im Magazin selbst anlegen, ändern, veröffentlichen und sichern — ganz ohne Programmierkenntnisse. Das Magazin folgt demselben einfachen Muster wie Ihr 3D-Shop: Sie arbeiten in einer Verwaltung, Ihre Eingaben werden automatisch im Browser gespeichert, und über einen eigenen Reiter sichern Sie alles als Datei.

## Die drei Seiten und wie sie zusammengehören

Ihr Magazin besteht aus drei Seiten, die eng zusammenarbeiten. Die Übersichtsseite `studio-magazin.html` ist das öffentliche Schaufenster: Hier sehen Ihre Leserinnen und Leser den neuesten Beitrag groß als Aufmacher, darunter alle weiteren als Kacheln, und sie können oben nach den vier Themen filtern. Die Beitragsseite `studio-artikel.html` zeigt einen einzelnen Artikel in der schönen Lesefassung; sie ist eine einzige Vorlage, die jeden Ihrer Beiträge darstellen kann. Und die Redaktionsseite `studio-redaktion.html` ist Ihr internes Werkzeug, mit dem Sie alles schreiben und verwalten.

Wichtig zu wissen: Alle drei Seiten greifen auf denselben gemeinsamen Vorrat an Beiträgen zu. Was Sie in der Redaktion anlegen und veröffentlichen, erscheint sofort in der Übersicht und ist als eigene Beitragsseite abrufbar. Sie pflegen Ihre Inhalte also an genau einer Stelle.

## Die Redaktion öffnen

Öffnen Sie die Seite `studio-redaktion.html` in Ihrem Browser. Diese Seite ist bewusst nicht mit Ihrer öffentlichen Website verlinkt — sie ist Ihr Hinterzimmer, das nur Sie kennen. Sie sehen oben zwei Reiter: „Beiträge“ und „Sichern und Laden“. Auf dem Reiter „Beiträge“ finden Sie die Liste all Ihrer Artikel mit ihrem jeweiligen Zustand, also ob sie veröffentlicht oder noch ein Entwurf sind.

## Einen Beitrag anlegen

Klicken Sie auf dem Reiter „Beiträge“ auf die Schaltfläche „+ Neuer Beitrag“. Es öffnet sich der Editor. Auf der linken Seite tragen Sie die Angaben ein, auf der rechten Seite sehen Sie in einer Live-Vorschau sofort, wie der fertige Beitrag aussehen wird. Diese Vorschau zeigt genau dieselbe Darstellung, die später öffentlich erscheint — was rechts gut aussieht, sieht auch im Magazin gut aus.

Zuerst vergeben Sie einen Titel. Darunter wählen Sie eine der vier Kategorien — Kultur, Design, Reisen oder Haushaltsmanagement —; die Kategorie bestimmt zugleich die Akzentfarbe, in der der Beitrag erscheint. Das Datum bestimmt die Reihenfolge: Der jüngste Beitrag steht in der Übersicht immer oben als Aufmacher. Es folgen ein Untertitel, der neugierig macht, der Name der Autorin oder des Autors und, wenn Sie mögen, die Adresse eines Aufmacherbildes. Lassen Sie das Bildfeld leer, erscheint an seiner Stelle eine ruhige dunkle Fläche in der Markenfarbe.

## Den Text aus Bausteinen zusammensetzen

Den eigentlichen Text bauen Sie aus Bausteinen. Unter „Text des Beitrags“ finden Sie fünf Schaltflächen: Absatz, Zwischentitel, Zitat, Liste und Bild. Jeder Klick fügt einen neuen Baustein hinzu, den Sie einfach ausfüllen. Ein Absatz ist normaler Fließtext. Ein Zwischentitel gliedert längere Beiträge. Ein Zitat wird groß und in der Akzentfarbe hervorgehoben. Bei einer Liste schreiben Sie einfach einen Punkt pro Zeile. Und bei einem Bild tragen Sie dessen Adresse und auf Wunsch eine Bildunterschrift ein.

Jeder Baustein trägt rechts oben drei kleine Knöpfe: Mit den Pfeilen verschieben Sie ihn nach oben oder unten, mit dem Kreuz entfernen Sie ihn. Über das Auswahlfeld links oben können Sie sogar nachträglich die Art eines Bausteins ändern, etwa einen Absatz in ein Zitat verwandeln. So ordnen Sie Ihren Beitrag frei, bis er sitzt.

## Speichern, veröffentlichen und zurückziehen

Sind Sie fertig, haben Sie unten zwei Möglichkeiten. „Speichern und veröffentlichen“ stellt den Beitrag sofort öffentlich ins Magazin. „Als Entwurf speichern“ bewahrt Ihre Arbeit auf, ohne sie zu veröffentlichen — ideal, wenn Sie später weiterschreiben möchten. Mit „Abbrechen“ verwerfen Sie die laufende Bearbeitung.

In der Beitragsliste sehen Sie zu jedem Artikel seinen Zustand. Neben „Bearbeiten“ finden Sie dort „Veröffentlichen“ beziehungsweise „Zurückziehen“: Damit nehmen Sie einen Beitrag jederzeit wieder aus der Öffentlichkeit, ohne ihn zu löschen — er wird einfach wieder zum Entwurf. „Duplizieren“ erstellt eine Kopie als Entwurf, was praktisch ist, wenn ein neuer Beitrag einem bestehenden ähneln soll. „Löschen“ entfernt einen Beitrag endgültig.

Ein hilfreiches Detail im Hintergrund: Wenn Sie einen veröffentlichten Beitrag später umbenennen, bleibt seine Internet-Adresse dieselbe. Ein einmal geteilter Link — etwa in einem Newsletter — funktioniert also weiter, auch wenn Sie den Titel noch einmal überarbeiten.

## Ihre Arbeit sichern und weitergeben

Ihre Eingaben werden automatisch in dem Browser gespeichert, mit dem Sie gerade arbeiten. Das genügt für die eigene Arbeit an einem Rechner. Wenn Sie Ihre Beiträge jedoch sichern, auf einen anderen Rechner übertragen oder an die Person weitergeben möchten, die Ihre Website ins Internet stellt, nutzen Sie den Reiter „Sichern und Laden“.

Dort speichert die Schaltfläche „Beiträge als Datei sichern“ Ihren gesamten Bestand in einer kleinen Datei namens `heiben-magazin-daten.json`. Diese Datei können Sie aufbewahren oder weitergeben. Über „Daten aus Datei laden“ holen Sie eine zuvor gesicherte Datei wieder zurück; die geladenen Beiträge ersetzen dann den aktuellen Stand in diesem Browser. Und falls Sie einmal von vorn beginnen möchten, stellt „Auf Werkseinstellungen zurücksetzen“ die ursprünglichen vier Beispiel-Beiträge wieder her. Sichern Sie vorher als Datei, wenn Sie Ihre eigenen Beiträge behalten möchten.

## Wie der Beitrag ins Internet kommt

Solange Sie nur in Ihrem eigenen Browser arbeiten, sehen Ihre Beiträge nur Sie. Damit die Welt sie sieht, gibt es den vertrauten Weg über die Datei: Sie sichern Ihren Bestand als `heiben-magazin-daten.json` und geben sie an die Person weiter, die Ihre Website betreut. Diese spielt die Datei auf der Redaktionsseite des Servers ein und sichert den Stand dort. Das ist genau dasselbe Vorgehen, das Sie schon vom Shop kennen — eine kleine Datei trägt Ihre Arbeit von einem Ort zum anderen.

Wenn Sie Ihr Magazin später vollautomatisch betreiben möchten, sodass ein veröffentlichter Beitrag ohne diesen Zwischenschritt sofort für alle Besucher sichtbar wird, ist auch das vorbereitet: Dafür braucht es denselben Hintergrunddienst, der bereits für die Zahlungsabwicklung des Shops vorgesehen ist. Bis dahin ist der Weg über die gesicherte Datei verlässlich und vollständig.

## Wenn die Schrift einmal anders aussieht

Das Magazin verwendet die Marken-Schriften Fraunces, Manrope und JetBrains Mono. Diese werden beim Öffnen der Seite aus dem Internet geladen. Sind Sie einmal ohne Internetverbindung oder lädt die Schrift nicht, fällt die Seite still auf eine ähnliche Standardschrift zurück — alle Inhalte und Funktionen bleiben dabei vollständig erhalten, nur das Schriftbild wirkt etwas schlichter.
