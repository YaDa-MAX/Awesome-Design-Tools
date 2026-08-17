# So pflegen Sie Ihren HeiBen-Shop

Diese Anleitung ist bewusst ohne Fachbegriffe geschrieben. Sie erklärt, wie Sie Produkte und Räume im 3D-Konfigurator selbst anlegen, ändern und löschen — ganz ohne Programmierkenntnisse.

## Die Verwaltung öffnen

Öffnen Sie die Seite `wohnen-konfigurator.html` in Ihrem Browser. Oben rechts finden Sie die Schaltfläche „Verwaltung". Ein Klick darauf öffnet ein Fenster mit drei Reitern: Produkte, Räume sowie Sichern und Laden. Alles, was Sie zur Pflege brauchen, befindet sich hier.

## Ein Produkt anlegen oder ändern

Wechseln Sie auf den Reiter „Produkte". Sie sehen die Liste Ihres gesamten Sortiments. Mit der Schaltfläche „Neues Produkt anlegen" öffnen Sie ein leeres Formular; mit „Ändern" neben einem vorhandenen Eintrag bearbeiten Sie ein bestehendes Stück.

Im Formular tragen Sie die Angaben in Alltagssprache ein. Der Name ist das, was später im Katalog steht. Beim Feld „Raum" wählen Sie, in welchem Zimmer das Stück angeboten wird. Das Feld „Form" bestimmt das dreidimensionale Aussehen — Sie wählen einfach die Vorlage, die Ihrem Möbelstück am nächsten kommt, etwa Sofa, Tisch oder Regal. Das Feld „Material" entscheidet, welche Farben die Kundschaft später wählen kann, also Stoff, Holz oder Metall. Danach folgen Grundpreis sowie Breite und Tiefe in Metern; die Maße sorgen dafür, dass das Stück im Raum sinnvoll begrenzt wird.

Wenn ein Produkt in mehreren Größen erhältlich sein soll, etwa ein Sofa als Zwei- und als Dreisitzer, setzen Sie das Häkchen bei „Größenvarianten anbieten" und füllen die zwei Variantenzeilen aus. Der Breitenfaktor beschreibt dabei, wie breit die Variante im Verhältnis zur Grundform ist: 1,0 ist die Originalbreite, 0,8 ist etwas schmaler. Wenn Sie nur einen Preis anbieten, lassen Sie die Varianten einfach leer.

Mit „Speichern" übernehmen Sie alles. Die Änderung erscheint sofort im Katalog.

## Einen Raum anlegen oder ändern

Auf dem Reiter „Räume" verwalten Sie die Zimmer. Auch hier legen Sie über ein einfaches Formular einen neuen Raum an oder ändern einen bestehenden. Sie vergeben einen Namen, tragen Breite und Tiefe in Metern ein und wählen über zwei Farbflächen die Wand- und die Bodenfarbe. Nach dem Speichern steht der Raum sofort zur Auswahl. Beachten Sie, dass immer mindestens ein Raum bestehen bleiben muss.

## Ihre Arbeit sichern und weitergeben

Ihre Eingaben werden automatisch im Browser gespeichert, mit dem Sie gerade arbeiten. Das genügt für die eigene Arbeit an einem Rechner. Wenn Sie Ihre Arbeit jedoch sichern, auf einen anderen Rechner übertragen oder an die Person weitergeben möchten, die Ihre Website ins Internet stellt, nutzen Sie den Reiter „Sichern und Laden".

Dort speichert die Schaltfläche „Produkte und Räume als Datei sichern" Ihr gesamtes Sortiment in einer kleinen Datei namens `heiben-shop-daten.json`. Diese Datei können Sie aufbewahren oder weitergeben. Über „Daten aus Datei laden" holen Sie eine zuvor gesicherte Datei wieder zurück. Und falls Sie einmal von vorn beginnen möchten, stellt „Auf Werkseinstellungen zurücksetzen" die ursprünglichen Beispiel-Daten wieder her. Die gesicherte Datei enthält nur Ihr Sortiment und Ihre Räume, niemals Bestellungen oder Kundendaten.

## Wie der Bestellvorgang heute funktioniert — und was später dazukommt

Der Kaufprozess ist vollständig: Die Kundschaft stellt ihren Raum zusammen, legt Stücke in den Warenkorb, wählt Versand- und Zahlungsart, prüft die Übersicht, bestätigt die Geschäftsbedingungen und schließt die Bestellung ab. Daraufhin entsteht eine eindeutige Bestellnummer, und die Bestellung lässt sich als Datei herunterladen oder als fertig ausgefüllte E-Mail an Ihr Postfach senden.

Ehrlich gesagt gehört zu einem echten Online-Shop noch ein Baustein, der sich nicht allein in einer einzelnen Seite verwirklichen lässt: die tatsächliche Zahlungsabwicklung, also das verbindliche Einziehen des Geldes über Rechnung, Lastschrift, PayPal oder Kreditkarte. Dafür braucht es ein sogenanntes Shop-Backend, einen Dienst im Hintergrund, der Zahlungen sicher verarbeitet und Bestellungen dauerhaft speichert. Der jetzige Aufbau ist genau so gestaltet, dass dieser Dienst später an einer einzigen, klar markierten Stelle angebunden werden kann, ohne dass alles Übrige neu gebaut werden müsste. Bis dahin haben Sie mit der erzeugten Bestellzusammenfassung eine vollständige, verlässliche Grundlage, um jede Bestellung manuell zu bearbeiten.

## Wenn einmal kein 3D-Bild erscheint

Die räumliche Darstellung benötigt eine Grafikfunktion des Browsers namens WebGL, die heute praktisch überall vorhanden ist. Sollte ein sehr altes Gerät sie einmal nicht bieten, zeigt die Seite an dieser Stelle einen freundlichen Hinweis, und alles Übrige — Katalog, Verwaltung, Warenkorb und Kasse — funktioniert trotzdem weiter.
