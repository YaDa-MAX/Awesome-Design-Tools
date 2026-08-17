# So nutzen Sie Ihr HeiBen-Anfrage- und Lead-System

Diese Anleitung ist bewusst ohne Fachbegriffe geschrieben. Sie erklärt, wie aus Besuchern Ihrer Website Anfragen werden, wie diese Anfragen bei Ihnen ankommen und wie Sie sie an einer Stelle ordnen — ganz ohne Programmierkenntnisse. Das System folgt demselben einfachen Muster wie Ihr 3D-Shop: Auf der einen Seite füllt die Kundschaft etwas aus und erhält eine fertige E-Mail und eine Datei; auf der anderen Seite sammeln Sie diese in einer Verwaltung, genau wie die Bestellungen.

## Der Grundgedanke in einem Satz

Bisher war Ihre Website eine Broschüre, die nur Ihre E-Mail-Adresse zeigte. Jetzt ist sie ein Werkzeug, das Interessenten geführt befragt, ihre Antworten ordentlich sammelt und sie Ihnen so übergibt, dass Sie sofort damit arbeiten können — ohne dass im Hintergrund ein Server nötig wäre.

## Die fünf Bausteine und wie sie zusammengehören

Das System besteht aus drei öffentlichen Formularen und einer internen Verwaltung. Für jede Ihrer drei beratenden Einheiten gibt es ein eigenes, geführtes Formular: `reisen-anfrage.html` für Reisen, `wohnen-anfrage.html` für die Interior-Beratung und `immobilien-anfrage.html` für Immobilien. Alle drei sind über die jeweilige Tochterseite erreichbar — auf jeder steht im Kontaktbereich nun ein deutlicher Knopf, der das passende Formular öffnet. Die vierte Seite, `anfragenverwaltung.html`, ist Ihr internes Hinterzimmer, in dem alle Anfragen zusammenlaufen. Sie ist bewusst nicht mit der Website verlinkt; nur Sie kennen sie.

## Was beim Interessenten passiert

Klickt jemand auf einer Ihrer Tochterseiten auf „Anfrage starten“, öffnet sich ein geführter Assistent. Statt eines einschüchternden großen Formulars beantwortet die Person nacheinander ein paar überschaubare Schritte — zuerst zum Anliegen, dann zu Rahmen und Wünschen, und zuletzt zu den Kontaktdaten. Eine Fortschrittsanzeige oben zeigt, wie weit es noch ist. Pflichtfelder sind dezent markiert; wer das Wichtigste vergisst oder eine ungültige E-Mail einträgt, wird freundlich darauf hingewiesen, bevor es weitergeht. Am Ende sieht die Person eine Zusammenfassung und kann sie prüfen.

Mit dem Absenden erzeugt das Formular zweierlei. Erstens eine vorbereitete E-Mail an die richtige Adresse Ihrer Einheit, in der alle Angaben bereits sauber untereinanderstehen — die Person muss nur noch auf „Senden“ tippen. Zweitens, auf Wunsch, eine kleine Datei, die dieselben Angaben in strukturierter Form enthält. Jede Anfrage bekommt dabei eine eindeutige Nummer, etwa `ANF-REI-7K3F9`, an der Sie sie später wiedererkennen.

## Wie die Anfragen zu Ihnen kommen

Es gibt zwei Wege, und beide kennen Sie im Prinzip schon vom Shop. Der unmittelbare Weg ist die E-Mail: Die fertig ausgefüllte Nachricht landet in Ihrem Postfach, und Sie können direkt antworten. Der ordnende Weg ist die Datei: Sie sammeln die `.json`-Dateien Ihrer Anfragen und ziehen sie in die Anfragenverwaltung — genauso, wie Sie die Bestelldateien in die Bestellverwaltung ziehen.

In der Praxis bewährt sich eine Mischung. Die E-Mail informiert Sie sofort, dass eine Anfrage da ist. Hängt die Person ihre gesicherte Datei an die E-Mail an, speichern Sie diese Datei und legen sie in der Verwaltung ab, damit Sie den Überblick behalten.

## Die Anfragenverwaltung öffnen und nutzen

Öffnen Sie `anfragenverwaltung.html` in Ihrem Browser. Sie sehen oben das vertraute Feld zum Hineinziehen der Dateien und darunter eine Zeile mit Filtern. Ziehen Sie eine oder mehrere Anfrage-Dateien in das Feld; jede gültige Anfrage erscheint sofort als Karte. Lädt jemand versehentlich dieselbe Datei zweimal, erkennt das System die Nummer und übernimmt sie kein zweites Mal — Doubletten entstehen also nicht.

Jede Karte zeigt auf einen Blick den Status, die Einheit, die Anfragenummer, den Namen und das Datum. Ein Klick auf die Karte klappt die vollständigen Angaben auf. Dort führen Sie die Anfrage durch drei Zustände: „Neu“, „In Arbeit“ und „Erledigt“ — dieselbe Logik wie bei den Bestellungen. Ein eigener Knopf öffnet eine vorbereitete Antwort-E-Mail, die bereits an die Adresse des Interessenten gerichtet ist. Über die Filter blenden Sie wahlweise nur eine Einheit oder nur einen Status ein, was bei vielen Anfragen den Überblick wahrt.

## Ihre Arbeit sichern und weitergeben

Wie beim Shop werden Ihre Eingaben automatisch in dem Browser gespeichert, mit dem Sie arbeiten. Möchten Sie den gesamten Bestand sichern, auf einen anderen Rechner übertragen oder an eine Kollegin weitergeben, nutzen Sie unten die Schaltfläche „Alle Anfragen als Datei sichern“. Über „Sicherung laden“ holen Sie einen solchen Stand wieder zurück. Sie können dort auch eine einzelne Anfrage-Datei laden, falls Sie sie nicht in das obere Feld ziehen möchten.

## Was später noch dazukommen kann

So, wie das System heute gebaut ist, sammeln Sie Anfragen verlässlich über E-Mail und Datei. Wenn Sie eines Tages möchten, dass eine abgeschickte Anfrage ganz ohne diesen Zwischenschritt automatisch in einer gemeinsamen, von mehreren Personen einsehbaren Liste erscheint, ist auch das vorbereitet: Dafür braucht es denselben Hintergrunddienst, der bereits für die Zahlungsabwicklung des Shops vorgesehen ist. Bis dahin ist der Weg über E-Mail und gesicherte Datei vollständig und zuverlässig.

## Wenn beim Absenden kein E-Mail-Programm aufgeht

Auf manchen Geräten ist kein E-Mail-Programm hinterlegt, sodass sich die vorbereitete Nachricht nicht von selbst öffnet. Für diesen Fall zeigt der Abschlussbildschirm einen Hinweis und bietet an, die Anfrage als Datei zu sichern; diese Datei kann die Person Ihnen dann auf anderem Weg zukommen lassen. So geht keine Anfrage verloren, gleich auf welchem Gerät.
