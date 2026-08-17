# HeiBen — Starter-Kit für Homepage & Geschäftspapier

Stand Mai 2026 · intern · Köln. Dieses Kit ist die praktische Arbeitsgrundlage, mit der die Markenwelt aus dem CI-Manual jetzt in echte, nutzbare Dateien übersetzt ist: eine startklare Homepage, fertige Logo-Dateien und editierbare Geschäftspapiere. Alles folgt demselben System — Schrift Fraunces / Manrope / JetBrains Mono, die Farbwelt aus Pergament, Tinte und den fünf Erdtönen, und die Wortmarke mit dem signaturhaften großen B.

## Was im Kit liegt

Das Kit ist in vier Ordner gegliedert. Im Ordner **assets** liegen alle Logo-Dateien als hochauflösende, transparente PNGs: die Hero-Wortmarke mit dem versteckten Wort (hell und dunkel), die Standard-Wortmarke in sechs Farbvarianten (eine je Einheit plus eine für dunkle Flächen), das HB-Monogramm (hell und dunkel) sowie Favicon und Apple-Touch-Icon. Diese Dateien brauchen Sie sowohl im Web als auch in jedem Druckstück, weshalb sie zusätzlich in die jeweiligen Ordner kopiert sind.

Im Ordner **web** liegt die fertige Startseite `index.html` samt Unterordner `assets`. Sie ist eine vollständige, funktionierende Holding-Seite mit allen vier Häusern, der Idee-Sektion, dem Köln-Band und einem Footer, in dem die rechtlichen Pflichtangaben bereits als deutlich markierte Platzhalter stehen.

Im Ordner **print** liegen die Geschäftspapiere: der Briefbogen und die Rechnung als editierbare Word-Vorlagen (`.docx`), die E-Mail-Signaturen und die Visitenkarten als HTML-Dateien.

Im Ordner **docs** liegt dieser Leitfaden.

## Die Schriften zuerst installieren

Alle drei Markenschriften stehen unter der freien SIL Open Font License und kosten nichts. Sie lassen sich kostenlos bei Google Fonts herunterladen: Fraunces, Manrope und JetBrains Mono. Für die Homepage ist nichts zu tun — sie lädt die Schriften automatisch über das Internet. Für die Word-Vorlagen empfiehlt es sich, Manrope und JetBrains Mono auf dem Arbeitsrechner zu installieren, damit Briefe und Rechnungen exakt im Markenbild erscheinen; solange das nicht geschehen ist, weichen die Vorlagen automatisch auf gut aussehende Systemschriften aus, sodass nichts kaputtgeht.

## Die Homepage in Betrieb nehmen

Die Datei `web/index.html` lässt sich sofort im Browser öffnen und ansehen. Um sie ins Netz zu stellen, laden Sie den gesamten `web`-Ordner (inklusive des `assets`-Unterordners) zu einem Webhoster hoch. Für eine Seite dieser Art eignen sich kostengünstige Static-Hosting-Dienste hervorragend; klassischer Webspace mit einem Verzeichnis-Upload funktioniert genauso. Wichtig ist nur, dass der `assets`-Ordner relativ zur `index.html` an derselben Stelle bleibt, damit die Logos gefunden werden.

Bevor die Seite öffentlich geht, sollten drei Dinge ergänzt werden, die bewusst als Platzhalter offen sind. Erstens die echte Domain — vorgesehen ist `heiben.de`, deren Verfügbarkeit Sie noch bei der DENIC prüfen sollten. Zweitens die Kontaktdaten im Footer, also echte E-Mail-Adresse und Telefonnummer. Drittens, und rechtlich am wichtigsten, die Pflichtangaben: vollständiger Firmenname, Geschäftsführer, Amtsgericht und Handelsregisternummer sowie die Umsatzsteuer-Identifikationsnummer. Diese Platzhalter sind im Code in der Akzentfarbe markiert, damit sie nicht übersehen werden. Außerdem braucht eine veröffentlichte Geschäftsseite in Deutschland ein vollständiges Impressum und eine Datenschutzerklärung — beides ist im Footer bereits verlinkt, die Seiten selbst sind noch anzulegen.

## Wie die Homepage weiterwächst

Die Startseite ist so gebaut, dass sich Unterseiten leicht ergänzen lassen. Jedes der vier Häuser verweist derzeit auf den Kontaktbereich; sobald eigene Unterseiten existieren — etwa `reisen.html`, `wohnen.html` und so fort — werden einfach die Verweise umgehängt. Beim Bau weiterer Seiten gilt eine einzige Regel, damit alles zusammenhält: Dieselben Schriften, dieselbe Farbwelt und dieselbe Wortmarke verwenden, und die jeweilige Tochter über ihre Akzentfarbe kenntlich machen — Ocker für Reisen, Moos für Wohnen, Burgunder für Immobilien, dunkle Tinte für Studio, Terracotta für die Holding. Die Startseite selbst ist die beste Vorlage dafür: Ihre CSS-Variablen am Dateianfang definieren das gesamte System an einer einzigen Stelle.

## Die Geschäftspapiere nutzen

Der Briefbogen `HeiBen_Briefbogen.docx` ist nach der deutschen Norm DIN 5008 aufgebaut. Das bedeutet, dass das Anschriftenfeld genau dort sitzt, wo es in einem Fensterumschlag erscheinen muss, und dass Rücksendeangabe, Infoblock und Betreff an den normgerechten Positionen stehen. Sie öffnen die Datei in Word, ersetzen die Platzhalter in eckigen Klammern und schreiben Ihren Brief in den dafür vorgesehenen Textbereich. Die Wortmarke im Kopf und die dreispaltige Fußzeile mit den Pflichtangaben bleiben dabei unverändert. Diese Fußzeile enthält die Angaben, die das GmbH-Gesetz für Geschäftsbriefe vorschreibt — Firma, Sitz, Registergericht und -nummer sowie Geschäftsführer; diese müssen vor dem ersten echten Versand eingetragen werden.

Die Rechnung `HeiBen_Rechnungsvorlage.docx` funktioniert genauso und enthält alle Angaben, die das Umsatzsteuergesetz für eine ordnungsgemäße Rechnung verlangt: fortlaufende Rechnungsnummer, Rechnungs- und Leistungsdatum, die Positionen mit Netto-, Umsatzsteuer- und Bruttobetrag sowie die Bankverbindung. Auch hier sind alle veränderlichen Angaben als Platzhalter angelegt. Ein Hinweis für den Fall der Kleinunternehmerregelung ist bereits vorbereitet und kann je nach steuerlicher Situation stehen bleiben oder entfernt werden.

Die E-Mail-Signaturen in `HeiBen_Email_Signaturen.html` öffnen Sie im Browser. Für jede der fünf Einheiten gibt es eine fertige Signatur mit einem Knopf, der den HTML-Code in die Zwischenablage legt; diesen fügen Sie im Signatur-Editor Ihres E-Mail-Programms ein und ersetzen die Platzhalter. Die Signaturen sind bewusst mit websicheren Schriften gebaut, weil E-Mail-Programme keine Web-Schriften laden — sie sehen dadurch überall gleich aus.

Die Visitenkarten in `HeiBen_Visitenkarten.html` öffnen Sie ebenfalls im Browser und speichern sie über die Druckfunktion als PDF, ohne Skalierung. Jede Einheit hat eine farbcodierte Vorderseite und eine einheitliche dunkle Rückseite. Für die Druckerei sollten Sie erwähnen, dass die Karten im Format 85 mal 55 Millimeter angelegt sind; einen kleinen Beschnittrand legt die Druckerei in der Regel selbst an.

## Die wichtigsten offenen Punkte

Drei Dinge sind noch zu erledigen, bevor Marke und Papiere offiziell in Gebrauch gehen. Erstens die Sicherung von Domain und Markenrecht, wie im Strategiedossier beschrieben. Zweitens das Eintragen sämtlicher rechtlicher Pflichtangaben an allen markierten Stellen — in der Homepage, im Briefbogen und in der Rechnung. Drittens, sobald die Gesellschaft tatsächlich gegründet ist, das Entfernen des Zusatzes „i. G." (in Gründung), der derzeit überall als Platzhalter mitläuft.

Dieses Kit ist keine Rechts- oder Steuerberatung. Die enthaltenen Pflichtangaben-Felder bilden den üblichen Rahmen ab, ersetzen aber nicht die Prüfung durch Steuerberatung und gegebenenfalls Anwalt, die die konkreten Verhältnisse kennt.
