# Weiterarbeit — Übergabe für den nächsten Chat

Dieses Dokument fasst alles zusammen, was nötig ist, um nahtlos weiterzuarbeiten — auch in einem frischen Gespräch ohne Vorwissen. Es nennt den Projektstand, die Markengrundlagen, die technischen Spielregeln, den Vorrat an Aufgaben, die sich in Eigenleistung erledigen lassen, und am Ende einen klaren ersten Schritt samt fertigem Text, den Sie in den nächsten Chat kopieren können, um sofort loszulegen.

## Worum es geht

HeiBen ist eine fiktive Kölner Unternehmensfamilie: eine Holding mit vier Töchtern — Reisen, Wohnen, Immobilien und Studio. Der Markenkern lautet, dass Heimat kein Ort ist, sondern ein Verb, etwas, das man lebt. Der Name verbirgt zugleich den Satz „Heimat leben" und die Nachnamen der Gründer Hein und Benkhaouda. Dieser Gedanke trägt das gesamte Auftreten.

## Was bereits fertig ist

Es existiert ein vollständiges Marken- und Web-Kit. Dazu gehören ein Corporate-Identity-System, fertige Logo-Dateien, eine Website aus neun miteinander verbundenen, jeweils eigenständigen Seiten — Startseite, Impressum, Datenschutz, die vier Tochterseiten, der 3D-Konfigurator von HeiBen Wohnen und die Bestellverwaltung — sowie Geschäftspapiere als Briefbogen, Rechnung, Visitenkarten und E-Mail-Signaturen. Der Konfigurator ist ein voll funktionierender Shop mit Katalog, mehreren Raumtypen, vierstufigem Kaufprozess und einer Verwaltung, mit der sich Produkte und Räume ohne Programmierkenntnisse pflegen lassen. Er ist bereits darauf vorbereitet, echte 3D-Modelle aufzunehmen, und fällt bis dahin auf einfache Formen zurück. Die Bestellverwaltung ist ein eigenständiges Backoffice, das die Bestellungen einsammelt und im Status führt.

## Die Markengrundlagen, die jede neue Seite einhalten muss

Die Farbwelt besteht aus Pergament als hellem Grund (#f3eee5, weicher #ebe3d4), Tinte als Dunkelton (#1f1c17) und je einer Akzentfarbe pro Einheit: Terracotta für die Holding (#c2533a), Ocker für Reisen (#d29939), Moos für Wohnen (#4a5c39), Burgund für Immobilien (#792d29) und ein dunkles Tintenbraun für Studio (#2c2620). Die Schriften sind Fraunces für Überschriften, Manrope für Fließtext und JetBrains Mono für kleine Etiketten; alle drei sind kostenlos unter offener Lizenz. Das gesamte Designsystem liegt zentral in `web/styles.css`, und jede Tochterseite schaltet ihre Akzentfarbe über eine einzige Klasse am Körper der Seite um.

## Die wichtigste technische Spielregel

Jede ausgelieferte Seite muss eigenständig sein, das heißt, sie trägt ihr Design und ihre Bilder direkt in sich. Der Grund liegt in der Vorschau: Öffnet man eine einzelne Datei ohne ihren Ordner, findet sie ausgelagerte Stildateien oder Bilder nicht und zeigt nur nackten Text. Deshalb wird beim Bauen das Stylesheet als Inline-Block eingesetzt, werden Logos als eingebettete Bilddaten hinterlegt und werden die 3D-Bibliotheken vollständig in die Seite geschrieben. Es gibt dafür kleine Bauskripte, und schlanke Quellfassungen liegen unter `web/_src`. Eine zweite Regel ist, nach jeder Änderung zu testen, weil ein einziger Tippfehler ein ganzes Skript lahmlegen kann. Eine dritte Regel betrifft das Netzwerk: Externe Inhalte dürfen nur von erlaubten Quellen kommen, weshalb alles Nötige eingebettet statt nachgeladen wird.

## Was sich für die ganze Gruppe in Eigenleistung schaffen lässt

Auf der Ebene der Holding bietet sich zunächst die inhaltliche Vertiefung der Website an, etwa eine Seite über die Familie und die Gründungsgeschichte, eine Team- oder Werteseite und eine Presse- oder Medienkit-Seite, die Logos, Farben und einen Markenkurztext gebündelt zum Herunterladen anbietet. All das nutzt das bestehende Designsystem und erfordert nur Inhalt.

Den größten unmittelbaren Geschäftswert verspricht ein einheitliches Anfrage- und Lead-System, das genau dem bereits bewährten Muster des Shops folgt. So wie der Konfigurator eine Bestellung als strukturierte Datei erzeugt und die Bestellverwaltung sie einliest, lassen sich für Reisen, Wohnen und Immobilien geführte Anfrageformulare bauen, die eine strukturierte Datei und eine vorbereitete E-Mail erzeugen, ergänzt um eine gemeinsame Anfragenverwaltung. Damit wird die Website von einer Broschüre zu einem Werkzeug, das Interessenten einsammelt und ordnet — ganz ohne Server.

Für jede Tochter gibt es zusätzlich eigene, naheliegende Stücke. Reisen profitiert von einem geführten Reise-Anfrage-Assistenten und von Beispiel-Reiserouten als Inhaltsseiten. Wohnen, dessen Shop bereits steht, ließe sich um einen Interior-Beratungsfragebogen ergänzen. Immobilien braucht vor allem das Standarddokument der Branche, ein Objekt-Exposé, das sich als Vorlage bauen lässt, dazu ein Datenblatt und ein Besichtigungs-Anfrageformular. Studio schließlich ist der eigentliche Inhaltsmotor der Gruppe: Hier lohnt sich ein Magazinsystem mit einer Artikel-Seitenvorlage im Markenstil, einer Übersichtsseite und auf Wunsch einem kleinen Artikel-Editor nach dem Vorbild der Shop-Verwaltung, sodass die Redaktion neue Beiträge ohne Programmierung anlegen kann.

An Arbeitsdokumenten lassen sich in Eigenleistung eine Angebots- und eine Auftragsbestätigungsvorlage erstellen, die die vorhandene Rechnung ergänzen, ferner Exposé-Vorlagen für Immobilien und Reisen, Entwürfe für Geschäftsbedingungen und Widerrufsbelehrung mit dem klaren Hinweis auf die nötige anwaltliche Prüfung, ein Redaktions- und Inhaltsplan für Studio sowie ein Leitfaden für die sozialen Medien.

## Was weiterhin Fachkräfte erfordert

Außerhalb der Eigenleistung bleiben zwei Dinge: die echte Zahlungsabwicklung, die einen Hintergrunddienst und damit eine Entwicklerin oder einen Entwickler braucht, und die fotorealistischen Möbelmodelle, die eine 3D-Gestalterin oder einen 3D-Gestalter erfordern. Für beides liegen im Ordner `docs` bereits das Lastenheft und das Briefing bereit, sodass die Beauftragung vorbereitet ist.

## Empfohlener erster Schritt im nächsten Chat

Der Vorschlag ist, mit dem einheitlichen Anfrage- und Lead-System zu beginnen, weil es schnell entsteht, auf einem bereits erprobten Muster aufbaut und der ganzen Gruppe sofort geschäftlichen Nutzen bringt. Als starker zweiter Schritt folgt das Magazinsystem für Studio, das den Inhaltsmotor in Gang setzt.

Um sofort loszulegen, lässt sich dieser Text in den nächsten Chat kopieren:

> Wir arbeiten am HeiBen-Projekt weiter (Kölner Unternehmensfamilie, Holding mit vier Töchtern Reisen, Wohnen, Immobilien, Studio). Das vollständige Web- und Marken-Kit liegt bereits vor, einschließlich 3D-Shop und Bestellverwaltung. Bitte sieh dir zuerst das Dokument docs/WEITERARBEIT.md im heiben_kit an. Anschließend möchte ich in Eigenleistung das einheitliche Anfrage- und Lead-System bauen: geführte Anfrageformulare für Reisen, Wohnen und Immobilien im Markenstil, die jeweils eine strukturierte Datei und eine vorbereitete E-Mail erzeugen, dazu eine gemeinsame Anfragenverwaltung nach dem Vorbild der bestehenden Bestellverwaltung. Halte dich an die Standalone-Bauweise und teste nach jeder Änderung.

Wer lieber mit den Inhalten beginnt, ersetzt den letzten Teil durch den Wunsch nach dem Studio-Magazinsystem mit Artikelvorlage, Übersichtsseite und einfachem Artikel-Editor.
