# Lastenheft — Zahlungsanbindung HeiBen Wohnen

Dieses Dokument beschreibt in einfacher Sprache, was zu tun ist, um den bestehenden 3D-Konfigurator von einer funktionierenden Demonstration zu einem Shop mit echter Bezahlung zu erweitern. Es ist als Auftragsgrundlage für eine Entwicklerin oder einen Entwickler gedacht und benennt bewusst das Was, nicht das Wie — die technische Umsetzung bleibt dem Profi überlassen.

## Ausgangslage

Es existiert eine vollständige, eigenständige Webseite (`wohnen-konfigurator.html`), in der Kundinnen und Kunden einen Raum dreidimensional zusammenstellen, Möbel in den Warenkorb legen, Versand- und Zahlungsart wählen und eine Bestellung abschließen. Am Ende erzeugt die Seite eine Bestellzusammenfassung als Textdatei, als strukturierte JSON-Datei und als vorbereitete E-Mail. An genau dieser Stelle — dort, wo heute die Bestellung erzeugt wird — soll künftig eine echte Zahlung ausgelöst werden. Der Programmcode ist an dieser Stelle klar kommentiert und kapselt den Bestellabschluss in einer einzigen Funktion (`placeOrder`), sodass der Eingriffspunkt eindeutig ist.

## Ziel

Ziel ist, dass eine Bestellung verbindlich bezahlt werden kann, dass die Zahlung sicher und gesetzeskonform abgewickelt wird und dass eingegangene Bestellungen dauerhaft und mehrplatzfähig gespeichert werden — also nicht nur im Browser eines einzelnen Rechners, wie es die heutige Übergangslösung tut.

## Funktionale Anforderungen

Die Seite soll beim Bestellabschluss den gewählten Zahlungsdienstleister aufrufen und die Zahlung über dessen sichere Oberfläche abwickeln, sodass Karten- oder Kontodaten niemals über die HeiBen-Seite selbst laufen. Nach erfolgreicher Zahlung soll die Bestellung mit allen Angaben — Kunde, Lieferadresse, Artikel mit Mengen und Farben, Versand- und Zahlungsart, Summen, Zeitpunkt — dauerhaft gespeichert werden. Die Kundschaft soll eine Bestätigung per E-Mail erhalten, und im Hintergrund soll eine Benachrichtigung an HeiBen gehen. Die bestehende, eigenständige Bestellverwaltung kann als Vorlage dienen, wie eine Bestellung dargestellt wird; sie soll perspektivisch durch eine serverseitige Variante ersetzt oder ergänzt werden, die alle Mitarbeitenden sehen.

Wichtig ist, dass die im Konfigurator bereits angelegten Zahlungsarten — Kauf auf Rechnung, SEPA-Lastschrift, PayPal und Kreditkarte — mit dem gewählten Dienstleister tatsächlich abgebildet werden, und dass die ebenfalls bereits vorhandenen Versandarten samt Preisen korrekt in den zu zahlenden Endbetrag einfließen. Die Mehrwertsteuer wird im Konfigurator bereits mit neunzehn Prozent ausgewiesen und ist im Gesamtbetrag enthalten.

## Empfohlene technische Richtung

Aus der Marktrecherche ergibt sich für den deutschen Markt eine naheliegende Kombination: ein Hauptdienstleister wie Mollie oder Stripe, der ohne monatliche Grundgebühr pro Transaktion abrechnet und die gängigen europäischen Zahlarten abdeckt, ergänzt um PayPal, das in Deutschland besonders verbreitet ist. Für die verbindliche Zahlungsabwicklung und die dauerhafte Speicherung der Bestellungen ist ein kleiner serverseitiger Dienst nötig, ein sogenanntes Backend, weil eine reine Browser-Seite Zahlungen aus Sicherheitsgründen nicht selbst abwickeln darf. Welche konkrete Technik dafür gewählt wird, liegt im Ermessen der Entwicklung; entscheidend sind Sicherheit, Wartbarkeit und die saubere Anbindung an den bestehenden Konfigurator.

## Was vorab durch HeiBen bereitzustellen ist

Vor Beginn der Arbeiten sind durch HeiBen einige Dinge zu klären, die nicht in den Bereich der Entwicklung fallen. Dazu gehört ein Geschäftskonto beim gewählten Zahlungsdienstleister, das die Gewerbeanmeldung und die eingetragene GmbH voraussetzt. Ebenso müssen geprüfte Allgemeine Geschäftsbedingungen und eine Widerrufsbelehrung vorliegen, die im Bestellprozess verlinkt werden; im Konfigurator ist die entsprechende Bestätigung bereits vorgesehen. Schließlich ist festzulegen, an welche E-Mail-Adresse Bestellbenachrichtigungen gehen sollen und wie die Bestellbestätigung an die Kundschaft formuliert ist.

## Abgrenzung

Nicht Teil dieses Auftrags sind die Gestaltung der Möbelmodelle, die Pflege des Sortiments — diese erfolgt weiterhin über die eingebaute Verwaltung — sowie steuerliche und rechtliche Beratung. Letztere ist durch Steuerberatung und gegebenenfalls Anwalt abzudecken.
