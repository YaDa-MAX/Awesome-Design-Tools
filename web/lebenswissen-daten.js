/* HeiBen Lebenswissen — Daten inkl. Buchempfehlungen (aus lebenswissen_mit_Buch.html) */
const KATS = {
  bildung:{n:"Bildung & Lernen",c:"var(--bildung)"},
  beruf:{n:"Beruf & Karriere",c:"var(--beruf)"},
  finanzen:{n:"Finanzen & Vorsorge",c:"var(--finanzen)"},
  wohnen:{n:"Wohnen & Alltag",c:"var(--wohnen)"},
  familie:{n:"Familie & Beziehungen",c:"var(--familie)"},
  gesundheit:{n:"Gesundheit & Psyche",c:"var(--gesundheit)"},
  recht:{n:"Recht & Bürokratie",c:"var(--recht)"},
  digital:{n:"Digitales Leben",c:"var(--digital)"},
  buero:{n:"Büro & Software",c:"var(--buero)"},
  freizeit:{n:"Freizeit & Hobbys",c:"var(--freizeit)"},
  alter:{n:"Alter & Lebensende",c:"var(--alter)"}
};
const PHASEN = [
  {a:[6,16],  k:"bildung",  t:"Schulzeit", d:"Schullaufbahn, Lernen lernen, erste Interessen und Hobbys entdecken."},
  {a:[16,19], k:"bildung",  t:"Abschluss & Orientierung", d:"Schulabschluss, Berufsorientierung, Praktika, die Weichenstellung: Ausbildung oder Studium?"},
  {a:[18,25], k:"beruf",    t:"Ausbildung, Studium & erste Wohnung", d:"Eigenes Konto, erste Wohnung, BAföG/Gehalt, Versicherungen, Selbstständigkeit im Alltag."},
  {a:[25,35], k:"finanzen", t:"Berufseinstieg & Aufbau", d:"Karrierestart, Gehaltsverhandlung, Notgroschen, erste Geldanlage, feste Partnerschaft."},
  {a:[30,45], k:"familie",  t:"Familien- & Gestaltungsphase", d:"Heirat, Kinder, Elternzeit, evtl. Immobilienkauf, Balance aus Beruf und Familie."},
  {a:[45,60], k:"gesundheit",t:"Konsolidierung", d:"Karrierehöhepunkt, Vorsorge intensivieren, Gesundheit pflegen, oft: eigene Eltern unterstützen."},
  {a:[60,67], k:"recht",    t:"Übergang in den Ruhestand", d:"Rente planen und beantragen, Vollmachten regeln, den dritten Lebensabschnitt gestalten."},
  {a:[67,80], k:"freizeit", t:"Aktiver Ruhestand", d:"Zeit für Hobbys, Reisen, Ehrenamt und Enkel — bei geregelten Finanzen und Gesundheit."},
  {a:[80,100],k:"alter",    t:"Hohes Alter & letztes Kapitel", d:"Pflege organisieren, Nachlass ordnen, Testament, Bestattungswünsche, Abschied in Würde."}
];
const SITS = ["Schulabschluss","Ausbildung wählen","Erste Wohnung","Berufseinstieg","Jobwechsel","Jobverlust","Selbstständigkeit","Heirat","Kind bekommen","Trennung","Hauskauf","Krankheit","Schulden","Pflegefall","Ruhestand","Todesfall"];
const ARTIKEL = [

  /* ---------- NEU: Themenbereich Büro & Software (Charge O) ---------- */
  {id:"excelgrundlagen",k:"buero",a:[14,90],s:["Studium","Berufseinstieg"],t:"Excel von Grund auf: Zellen, Bezüge, Formeln",
   kurz:"Excel wirkt einschüchternd, beruht aber auf einer einzigen Idee: Zellen, die rechnen. Wer das Grundprinzip versteht, baut in Minuten, wofür andere Stunden tippen.",
   p:["Eine Tabelle ist ein Raster aus Zellen, jede mit einer Adresse aus Spaltenbuchstabe und Zeilennummer wie B7 — diese Adresse ist der Schlüssel zu allem.",
      "Eine Formel beginnt mit einem Gleichheitszeichen; statt eines festen Werts schreibt man eine Rechenanweisung, die Excel sofort ausführt.",
      "Statt Zahlen direkt einzutippen, verweist man auf Zellen: Eine Formel mit A1+A2 rechnet immer mit dem, was gerade dort steht, und aktualisiert sich von selbst.",
      "Der wichtigste Unterschied ist relativ gegen absolut: Beim Kopieren wandern relative Bezüge mit, ein mit Dollarzeichen fixierter Bezug bleibt stehen.",
      "Wer diese vier Dinge beherrscht — Adressen, Formeln, Zellbezüge und das Fixieren — hat das Fundament für alles Weitere."],
   c:["Zelladressen lesen (Spalte + Zeile, z. B. C12)","Formeln immer mit dem Gleichheitszeichen beginnen","Mit Zellbezügen statt fester Zahlen rechnen","Relative und absolute Bezüge bewusst einsetzen"],
   prem:"Vertiefung: Das mentale Modell der Tabelle, wie Formeln und Bezüge funktionieren und warum das Fixieren mit Dollarzeichen der häufigste Stolperstein ist."},

  {id:"excelfunktionen",k:"buero",a:[14,90],s:["Studium","Berufseinstieg"],t:"Die wichtigsten Excel-Funktionen",
   kurz:"Von hunderten Funktionen braucht man im Alltag eine Handvoll. Diese sechs decken die meisten Aufgaben ab — vom Summieren bis zum Nachschlagen.",
   p:["SUMME, MITTELWERT, MIN und MAX fassen ganze Bereiche zusammen und ersetzen mühsames Einzelrechnen.",
      "ZÄHLENWENN und SUMMEWENN zählen oder summieren nur, was eine Bedingung erfüllt — etwa alle Umsätze über einem Schwellenwert.",
      "Die WENN-Funktion trifft Entscheidungen: Ist eine Bedingung erfüllt, passiert das eine, sonst das andere.",
      "Zum Nachschlagen in Tabellen ist XVERWEIS — in älteren Versionen SVERWEIS — das mächtigste Werkzeug: Es findet zu einem Suchbegriff den passenden Wert.",
      "Funktionen lassen sich verschachteln, doch wer früh zu komplex baut, verliert den Überblick; klare einzelne Schritte schlagen lange Formelketten."],
   c:["SUMME/MITTELWERT für schnelle Auswertungen","ZÄHLENWENN/SUMMEWENN für bedingte Zusammenfassungen","WENN für Entscheidungen","XVERWEIS/SVERWEIS zum Nachschlagen"],
   prem:"Vertiefung: Wofür die sechs Kernfunktionen gut sind, wie XVERWEIS gegenüber dem alten SVERWEIS funktioniert und wann man eine Formel besser in Schritte zerlegt."},

  {id:"pivottabellen",k:"buero",a:[16,90],s:["Berufseinstieg","Jobwechsel"],t:"Pivot-Tabellen: Daten in Sekunden auswerten",
   kurz:"Tausende Zeilen Rohdaten in eine klare Auswertung verwandeln — ohne eine einzige Formel. Pivot-Tabellen sind Excels meistunterschätzte Superkraft.",
   p:["Eine Pivot-Tabelle gruppiert und summiert große Datenmengen automatisch, indem man Felder per Maus in Zeilen, Spalten und Werte zieht.",
      "Aus einer langen Liste von Verkäufen wird so in Sekunden eine Übersicht: Umsatz pro Monat, pro Region oder pro Produkt.",
      "Die Rohdaten bleiben unangetastet; die Pivot-Tabelle ist nur eine Sicht darauf, die man beliebig umbauen kann.",
      "Voraussetzung sind saubere Daten: eine Überschriftenzeile, keine Leerzeilen, ein Datensatz pro Zeile.",
      "Wer verstanden hat, dass Auswerten hier Ziehen statt Tippen ist, löst in Sekunden, was mit Formeln eine halbe Stunde dauern würde."],
   c:["Rohdaten sauber halten (Überschriften, keine Lücken)","Felder in Zeilen, Spalten und Werte ziehen","Auswertung durch Umstellen sofort ändern","Werte als Summe, Anzahl oder Mittelwert anzeigen"],
   prem:"Vertiefung: Wie eine Pivot-Tabelle denkt, welche vier Bereiche es gibt und warum saubere Rohdaten die halbe Miete sind."},

  {id:"exceldiagramme",k:"buero",a:[16,90],s:["Studium","Berufseinstieg"],t:"Aussagekräftige Diagramme erstellen",
   kurz:"Ein gutes Diagramm beantwortet eine Frage auf einen Blick. Die Kunst liegt weniger im Klicken als in der Wahl des richtigen Typs — und im Weglassen.",
   p:["Der Diagrammtyp folgt der Aussage: Balken vergleichen Größen, Linien zeigen Verläufe über die Zeit, Kreise zeigen Anteile an einem Ganzen.",
      "Kreisdiagramme funktionieren nur bei wenigen Teilen; bei vielen Segmenten ist ein Balkendiagramm fast immer lesbarer.",
      "Weniger ist mehr: Gitterlinien, 3D-Effekte und grelle Farben lenken ab; ein klarer Titel und beschriftete Achsen tragen die Botschaft.",
      "Die Werteachse sollte bei null beginnen, sonst werden Unterschiede optisch übertrieben — ein häufiger, oft unbeabsichtigter Trugschluss.",
      "Ein Diagramm braucht eine Kernaussage; wer nicht in einem Satz sagen kann, was es zeigt, hat den falschen Typ oder zu viele Daten."],
   c:["Diagrammtyp nach Aussage wählen (Vergleich/Verlauf/Anteil)","Kreisdiagramme nur bei wenigen Teilen","Überflüssige Elemente entfernen","Achsen ehrlich beschriften, bei null beginnen"],
   prem:"Vertiefung: Welcher Diagrammtyp welche Aussage trägt, welche Elemente nur ablenken und wie eine abgeschnittene Achse in die Irre führt."},

  {id:"wordvorlagen",k:"buero",a:[14,90],s:["Studium","Berufseinstieg"],t:"Word mit Formatvorlagen: Schluss mit dem Formatierungschaos",
   kurz:"Wer in Word jede Überschrift von Hand fett und groß macht, arbeitet gegen das Programm. Formatvorlagen sind der Trick, der alles automatisch zusammenhält.",
   p:["Eine Formatvorlage bündelt das Aussehen — Schrift, Größe, Abstand — unter einem Namen wie „Überschrift 1“; man weist sie zu, statt manuell zu formatieren.",
      "Ändert man die Vorlage, ändern sich alle damit formatierten Stellen auf einen Schlag — Stunden Nacharbeit entfallen.",
      "Erst durch Überschriften-Vorlagen entsteht die Struktur und damit das automatische Inhaltsverzeichnis und die Navigation.",
      "Manuelle Formatierung sieht anfangs gleich aus, rächt sich aber bei jeder Änderung und bei langen Dokumenten.",
      "Der Umstieg kostet einmal Gewöhnung und spart danach bei jedem Dokument Zeit und Nerven."],
   c:["Überschriften per Formatvorlage auszeichnen","Aussehen zentral über die Vorlage ändern","Inhaltsverzeichnis automatisch erzeugen lassen","Manuelles Fett und Groß für Struktur vermeiden"],
   prem:"Vertiefung: Was eine Formatvorlage wirklich ist, warum sie das Inhaltsverzeichnis erst möglich macht und wie der Umstieg von manueller Formatierung gelingt."},

  {id:"worddokumente",k:"buero",a:[16,90],s:["Studium","Berufseinstieg"],t:"Lange Dokumente meistern: Verzeichnisse, Seitenzahlen, Serienbrief",
   kurz:"Ab ein paar Seiten trennt sich gutes von mühsamem Arbeiten. Vier Word-Funktionen machen aus einem wachsenden Dokument ein professionelles.",
   p:["Das automatische Inhaltsverzeichnis baut sich aus den Überschriften und aktualisiert sich per Klick — vorausgesetzt, man nutzt Formatvorlagen.",
      "Abschnittswechsel erlauben unterschiedliche Kopf- und Fußzeilen oder Seitenformate innerhalb eines Dokuments.",
      "Seitenzahlen, Querverweise und ein Abbildungsverzeichnis entstehen als Felder, die mitwachsen, statt von Hand gepflegt zu werden.",
      "Der Serienbrief erzeugt aus einer Adressliste viele personalisierte Briefe oder E-Mails auf einmal.",
      "Wer am Ende exportiert, nutzt PDF: Es bewahrt das Layout unabhängig vom Gerät des Empfängers."],
   c:["Inhaltsverzeichnis automatisch aus Überschriften","Abschnitte für eigene Kopf- und Fußzeilen","Seitenzahlen und Verweise als Felder","Serienbrief für personalisierte Massenpost"],
   prem:"Vertiefung: Wie Inhaltsverzeichnis, Abschnitte, Felder und Serienbrief zusammenspielen und warum PDF das richtige Ausgabeformat ist."},

  {id:"praesentationen",k:"buero",a:[14,90],s:["Studium","Berufseinstieg"],t:"Präsentationen, die hängenbleiben",
   kurz:"Die meisten Folien sind vollgeschriebene Sprechzettel. Gute Präsentationen folgen ein paar Regeln — und die wichtigste lautet: weniger.",
   p:["Eine Folie ist kein Dokument: Stichworte statt Sätze, ein Gedanke pro Folie; der Vortrag lebt vom Gesprochenen, nicht vom Abgelesenen.",
      "Der Folienmaster legt Schrift, Farben und Logo einmal zentral fest; so bleibt das Design konsistent und Änderungen gehen schnell.",
      "Bilder und einfache Diagramme wirken stärker als Textwüsten; ein einziges großes Bild kann eine ganze Aussage tragen.",
      "Struktur gibt Halt: ein klarer Einstieg, ein roter Faden, ein Abschluss mit der einen Botschaft, die bleiben soll.",
      "Animationen und Übergänge sparsam einsetzen — sie sollen führen, nicht beeindrucken."],
   c:["Pro Folie ein Gedanke, Stichworte statt Sätze","Design zentral über den Folienmaster","Bilder und Diagramme statt Textwüsten","Klare Dramaturgie mit einer Kernbotschaft"],
   prem:"Vertiefung: Warum eine Folie kein Dokument ist, wie der Folienmaster Konsistenz schafft und wie eine Dramaturgie aus einer Aussage entsteht."},

  {id:"mailorganisation",k:"buero",a:[16,90],s:["Berufseinstieg","Jobwechsel"],t:"Die E-Mail-Flut bändigen",
   kurz:"Der Posteingang ist eine Aufgabenliste, die andere schreiben. Mit Ordnern, Regeln und einer einfachen Routine bekommt man ihn — und den Kopf — wieder frei.",
   p:["Das Ziel ist nicht null E-Mails, sondern ein leerer Posteingang als Durchgangsstation: Jede Mail wird einmal angefasst und einsortiert.",
      "Für jede Nachricht gilt eine von vier Entscheidungen: löschen, sofort erledigen (unter zwei Minuten), delegieren oder für später ablegen.",
      "Regeln und Filter sortieren Newsletter, Benachrichtigungen und CC-Mails automatisch vor, bevor sie ablenken.",
      "Feste Mail-Zeiten statt ständigem Blick ins Postfach schützen die Konzentration mehr als jeder Trick.",
      "Benachrichtigungen abzuschalten ist der wirksamste einzelne Schritt gegen die ständige Unterbrechung."],
   c:["Vier-Wege-Regel: löschen, erledigen, delegieren, ablegen","Regeln und Filter für Newsletter und CC","Feste Mail-Zeiten statt Dauerblick","E-Mail-Benachrichtigungen abschalten"],
   prem:"Vertiefung: Wie die Vier-Wege-Regel den Posteingang leert, wie Filter die Ablenkung vorab abfangen und warum feste Zeiten mehr bringen als jeder Kniff."},

  {id:"tastenkuerzel",k:"buero",a:[12,90],s:["Studium","Berufseinstieg"],t:"Tastenkürzel, die wirklich Zeit sparen",
   kurz:"Jeder Griff zur Maus kostet Sekunden, die sich zu Stunden summieren. Ein Dutzend Tastenkürzel verändert spürbar, wie schnell man arbeitet.",
   p:["Die universellen Kürzel funktionieren fast überall: Kopieren, Einfügen, Ausschneiden, Rückgängig und Suchen sind die tägliche Grundausstattung.",
      "Mit Kürzeln zum Wechseln zwischen Fenstern und Tabs bewegt man sich durch Programme, ohne die Hände von der Tastatur zu nehmen.",
      "In Office sparen Kürzel fürs Speichern, Formatieren und Navigieren in großen Tabellen besonders viel Zeit.",
      "Man lernt sie nicht auf einmal: Drei neue pro Woche, konsequent genutzt, sitzen nach kurzer Zeit.",
      "Der Gewinn ist nicht nur Tempo, sondern Fluss — der Gedanke bricht nicht ab, weil die Hand zur Maus wandert."],
   c:["Grundausstattung: Kopieren, Einfügen, Rückgängig, Suchen","Fenster und Tabs per Tastatur wechseln","Office-Kürzel fürs Speichern und Formatieren","Wöchentlich wenige neue Kürzel einüben"],
   prem:"Vertiefung: Die universellen Kürzel, die überall gelten, die nützlichsten in Office und eine einfache Methode, sie sich dauerhaft anzueignen."},

  {id:"dateiorganisation",k:"buero",a:[14,90],s:["Studium","Berufseinstieg"],t:"Dateien & Ordner: ein System, das hält",
   kurz:"Der Desktop voller Dateien namens „final_final_2“ ist Alltag — und vermeidbar. Ein einfaches System spart das ewige Suchen und schützt vor Datenverlust.",
   p:["Ein gutes Ablagesystem ist flach und konsequent: lieber wenige klare Ebenen als tief verschachtelte Ordner, in denen man sich verliert.",
      "Sprechende Dateinamen mit Datum im Format Jahr-Monat-Tag sortieren sich von selbst chronologisch und sind ohne Öffnen verständlich.",
      "Versionen gehören in den Namen oder besser in die Versionsverwaltung der Cloud, statt in ein Dutzend Kopien mit „final“ im Namen.",
      "Cloud-Synchronisierung schützt vor Geräteverlust, ersetzt aber kein Backup — beides gehört zusammen.",
      "Das beste System ist das, das man durchhält; Einfachheit schlägt eine Perfektion, die nach zwei Wochen zerfällt."],
   c:["Flache, klare Ordnerstruktur statt tiefer Verschachtelung","Dateinamen mit Datum (JJJJ-MM-TT)","Versionen sauber benennen oder Cloud-Verlauf nutzen","Cloud-Sync plus separates Backup"],
   prem:"Vertiefung: Warum flache Strukturen gewinnen, wie ein Datums- und Namensschema das Suchen beendet und wie sich Versionen ohne Kopien-Chaos verwalten lassen."},

  /* ---------- NEU: Themenbereich Digitales Leben (Charge N) ---------- */
  {id:"passwoerter",k:"digital",a:[14,90],s:["Berufseinstieg","Erste Wohnung"],t:"Passwörter, 2FA & Passkeys: die digitalen Schlüssel",
   kurz:"Ein einziges geknacktes Passwort kann das halbe digitale Leben aufschließen. Mit drei Gewohnheiten ist man besser geschützt als die meisten — ganz ohne Technikwissen.",
   p:["Das größte Risiko ist nicht das schwache Passwort, sondern dasselbe Passwort überall: Ein Datenleck bei einem Dienst öffnet dann alle anderen.",
      "Die Lösung ist ein Passwortmanager, der für jeden Dienst ein langes, einzigartiges Passwort erzeugt und speichert — man merkt sich nur noch eines.",
      "Die Zwei-Faktor-Authentifizierung fügt einen zweiten Schlüssel hinzu, etwa einen Code aus einer App — ein gestohlenes Passwort allein nützt dann wenig.",
      "Passkeys sind der nächste Schritt: Statt eines Passworts entsperrt man Konten per Fingerabdruck oder Gesicht, was Phishing praktisch ausschließt.",
      "Besonders schützenswert ist das E-Mail-Konto — über seine Passwort-Funktion lassen sich fast alle anderen Konten zurücksetzen."],
   c:["Für jeden Dienst ein eigenes, langes Passwort (Passwortmanager)","Zwei-Faktor-Authentifizierung überall aktivieren","E-Mail-Konto besonders stark absichern","App- oder Hardware-Faktoren statt SMS-Codes bevorzugen"],
   prem:"Vertiefung: Warum Wiederverwendung das eigentliche Problem ist, wie 2FA und Passkeys funktionieren und welcher zweite Faktor wie sicher ist."},

  {id:"kialltag",k:"digital",a:[16,90],s:["Berufseinstieg","Studium"],t:"Künstliche Intelligenz im Alltag nutzen — und einordnen",
   kurz:"KI-Assistenten beantworten Fragen, schreiben Texte und fassen zusammen. Richtig genutzt sparen sie Zeit — blind vertraut führen sie in die Irre.",
   p:["KI-Sprachmodelle erzeugen Antworten, indem sie wahrscheinliche Wortfolgen vorhersagen; sie verstehen Inhalte nicht und können überzeugend Falsches behaupten.",
      "Für Entwürfe, Zusammenfassungen, Ideen und Erklärungen sind sie stark — bei Fakten, Zahlen und Quellen gehört jede Aussage gegengeprüft.",
      "Wer Persönliches oder Vertrauliches eingibt, sollte wissen, dass Eingaben je nach Dienst gespeichert und ausgewertet werden können.",
      "Gute Ergebnisse entstehen durch klare Aufträge: Kontext, Ziel und gewünschtes Format angeben, statt vage zu fragen.",
      "KI ersetzt kein Fachurteil bei Gesundheit, Recht oder Finanzen — sie kann vorbereiten, aber nicht verantworten."],
   c:["KI für Entwürfe und Ideen nutzen, Fakten selbst prüfen","Keine sensiblen Daten in Chatbots eingeben","Aufträge mit Kontext, Ziel und Format formulieren","Bei Gesundheit/Recht/Finanzen Fachleute hinzuziehen"],
   prem:"Vertiefung: Wie Sprachmodelle wirklich arbeiten, wofür sie taugen und wofür nicht, und wie man mit guten Aufforderungen bessere Ergebnisse bekommt."},

  {id:"sozialemedien",k:"digital",a:[13,80],s:["Studium","Berufseinstieg"],t:"Soziale Medien bewusst nutzen",
   kurz:"Soziale Netzwerke sind auf Verweildauer optimiert, nicht auf dein Wohlbefinden. Wer ihre Mechanik kennt, nutzt sie als Werkzeug statt als Zeitfresser.",
   p:["Algorithmen zeigen, was lange bindet — oft das Aufregende, Empörende oder Perfekte; das verzerrt das Bild von der Welt und vom eigenen Leben.",
      "Die Privatsphäre-Einstellungen entscheiden, wer Beiträge, Standort und Kontakte sieht; die Voreinstellungen sind selten die schützendsten.",
      "Was einmal geteilt ist, lässt sich kaum vollständig zurückholen — auch gelöschte Inhalte existieren oft als Kopie weiter.",
      "Bewusste Nutzung heißt: Benachrichtigungen reduzieren, Nutzungszeiten setzen und Konten entfolgen, die schlecht tun.",
      "Für Beruf und Bewerbung lohnt ein gepflegtes, getrenntes Profil — private und berufliche Sichtbarkeit auseinanderzuhalten."],
   c:["Privatsphäre-Einstellungen aktiv prüfen und verschärfen","Benachrichtigungen und Nutzungszeit begrenzen","Vor dem Posten an die Dauerhaftigkeit denken","Berufliches und Privates trennen"],
   prem:"Vertiefung: Wie der Algorithmus deine Aufmerksamkeit lenkt, welche Privatsphäre-Einstellungen wirklich zählen und wie man Social Media als Werkzeug behält."},

  {id:"fakenews",k:"digital",a:[14,90],s:["Studium","Ruhestand"],t:"Falschinformationen erkennen & Quellen prüfen",
   kurz:"Desinformation verbreitet sich schneller als die Korrektur. Ein paar einfache Prüfschritte schützen davor, Falsches zu glauben — und weiterzuverbreiten.",
   p:["Falschmeldungen zielen auf Emotionen: Wer wütend oder empört klickt und teilt, verbreitet sie weiter, bevor er nachdenkt.",
      "Die wichtigste Frage ist die Quelle: Wer behauptet das, mit welchem Interesse, und berichten unabhängige Medien dasselbe?",
      "Bilder und Videos lassen sich aus dem Zusammenhang reißen oder fälschen; eine Bilder-Rückwärtssuche zeigt oft den echten Ursprung.",
      "Deepfakes machen gefälschte Stimmen und Gesichter zugänglich — gesundes Misstrauen bei Sensationellem ist berechtigt.",
      "Vor dem Teilen lohnt der kurze Faktencheck; seriöse Faktenchecker haben viele kursierende Behauptungen längst geprüft."],
   c:["Vor dem Teilen kurz innehalten (starke Emotion = Warnsignal)","Quelle und Interesse hinterfragen, gegenrecherchieren","Bilder per Rückwärtssuche prüfen","Faktencheck-Seiten nutzen"],
   prem:"Vertiefung: Warum Emotion das Einfallstor ist, wie eine schnelle Quellen- und Bildprüfung geht und woran man Deepfakes und Fälschungen erkennt."},

  {id:"digitalerfussabdruck",k:"digital",a:[16,90],s:["Berufseinstieg","Jobwechsel"],t:"Dein digitaler Fußabdruck: Selbstauskunft & Aufräumen",
   kurz:"Über die Jahre sammeln sich Konten, Profile und Datenspuren an. Wer weiß, was über ihn im Netz steht, kann es kontrollieren — und vieles löschen lassen.",
   p:["Der digitale Fußabdruck besteht aus allem, was man selbst teilt, und allem, was andere und Dienste über einen sammeln.",
      "Ein Selbst-Googeln zeigt, was öffentlich auffindbar ist — oft tauchen alte Konten, Fotos oder Einträge auf, die man vergessen hat.",
      "Über die Datenschutz-Grundverordnung hat man ein Auskunftsrecht: Dienste müssen offenlegen, welche Daten sie über einen speichern.",
      "Alte, ungenutzte Konten sind ein Risiko; sie lassen sich löschen oder deaktivieren, samt der dort hinterlegten Daten.",
      "Suchmaschinen müssen Einträge unter Umständen auslisten, wenn die berechtigten Interessen der Person überwiegen — das Recht auf Vergessenwerden."],
   c:["Sich selbst googeln und Funde sichten","Auskunft bei Diensten anfordern (DSGVO)","Alte, ungenutzte Konten löschen","Auslistung bei berechtigtem Interesse beantragen"],
   prem:"Vertiefung: Woraus der digitale Fußabdruck besteht, wie das Auskunftsrecht der DSGVO funktioniert und wie man alte Spuren wirksam löschen lässt."},

  {id:"clouddaten",k:"digital",a:[16,90],s:["Berufseinstieg","Familiengründung"],t:"Cloud, Backup & Daten sichern",
   kurz:"Fotos, Dokumente, Erinnerungen — der größte digitale Verlust kommt selten durch Hacker, sondern durch ein kaputtes Gerät ohne Backup. Die 3-2-1-Regel verhindert das.",
   p:["Daten gehen am häufigsten durch Defekt, Verlust oder Diebstahl des Geräts verloren — nicht durch Angriffe.",
      "Die 3-2-1-Regel ist der Standard: drei Kopien, auf zwei verschiedenen Medien, davon eine an einem anderen Ort.",
      "Die Cloud ist bequem und erfüllt den dritten Punkt, ersetzt aber kein eigenes Backup — auch Anbieter können ausfallen oder Konten sperren.",
      "Wichtige und sensible Daten sollten verschlüsselt sein, damit sie bei Verlust nicht lesbar sind.",
      "Ein Backup ist erst dann eines, wenn man die Wiederherstellung einmal getestet hat."],
   c:["3-2-1-Regel umsetzen (3 Kopien, 2 Medien, 1 extern)","Automatische Backups einrichten","Sensible Daten verschlüsseln","Wiederherstellung einmal testen"],
   prem:"Vertiefung: Was die 3-2-1-Regel praktisch bedeutet, wo die Cloud hilft und wo nicht, und warum ein ungetestetes Backup kein Backup ist."},

  {id:"onlinedating",k:"digital",a:[18,80],s:["Trennung","Berufseinstieg"],t:"Online-Dating: sicher und souverän",
   kurz:"Kennenlernen läuft heute oft über Apps. Das funktioniert — wenn man ein paar Sicherheitsregeln beachtet und die Maschen der Betrüger kennt.",
   p:["Profile sagen wenig über die reale Person; ein Video-Telefonat vor dem ersten Treffen schützt vor bösen Überraschungen.",
      "Erste Treffen gehören an öffentliche Orte; eine Vertrauensperson sollte wissen, wo und mit wem man sich trifft.",
      "Romance-Scam ist die häufigste Masche: Über Wochen wird Nähe aufgebaut, dann folgt — immer aus der Ferne — die Bitte um Geld.",
      "Niemand, den man nur online kennt, sollte Geld, Gutscheine oder Zugangsdaten bekommen, egal wie überzeugend die Geschichte klingt.",
      "Persönliche Daten, Arbeitsplatz und Wohnadresse gibt man erst preis, wenn echtes Vertrauen gewachsen ist."],
   c:["Vor dem Treffen per Video sprechen","Erstes Treffen öffentlich, Vertrauensperson informieren","Niemals Geld an reine Online-Bekanntschaften","Persönliche Daten nur schrittweise teilen"],
   prem:"Vertiefung: Wie man Profile einordnet, wie der Romance-Scam abläuft und welche Sicherheitsregeln fürs erste Treffen wirklich zählen."},

  {id:"smarthome",k:"digital",a:[18,85],s:["Erste Wohnung","Hauskauf"],t:"Smart Home & vernetzte Geräte: Komfort ohne Kontrollverlust",
   kurz:"Sprachassistenten, smarte Lampen, Kameras — vernetzte Geräte sind praktisch, aber sie hören, sehen und senden. Wer sie einrichtet, sollte wissen, wohin.",
   p:["Jedes vernetzte Gerät ist ein kleiner Computer mit Mikrofon, Kamera oder Sensor — und damit ein mögliches Einfallstor.",
      "Das Wichtigste ist banal: Standardpasswörter ändern und Geräte aktuell halten, denn veraltete Software ist das Hauptrisiko.",
      "Sprachassistenten und Kameras zeichnen auf; in den Einstellungen lässt sich oft begrenzen, was gespeichert und ausgewertet wird.",
      "Sinnvoll ist ein getrenntes Gäste- oder Geräte-WLAN, damit smarte Geräte nicht im selben Netz wie Computer und Handy hängen.",
      "Vor dem Kauf lohnt die Frage, ob das Gerät überhaupt vernetzt sein muss — der beste Schutz ist, was man gar nicht erst anschließt."],
   c:["Standardpasswörter ändern, Updates aktiv halten","Aufzeichnung von Sprache und Bild in den Einstellungen begrenzen","Getrenntes WLAN für smarte Geräte nutzen","Vor dem Kauf den echten Nutzen hinterfragen"],
   prem:"Vertiefung: Welche Risiken vernetzte Geräte bergen, welche Einstellungen die Aufzeichnung begrenzen und wie ein getrenntes Netz das Zuhause schützt."},

  {id:"kinderdigital",k:"digital",a:[25,55],s:["Familiengründung"],t:"Kinder im Netz begleiten",
   kurz:"Verbote allein wirken nicht — Begleitung schon. Wer Altersfreigaben, Schutzfunktionen und vor allem das Gespräch nutzt, gibt Kindern einen sicheren Start ins Digitale.",
   p:["Altersfreigaben und die Mindestalter der Dienste sind Orientierung, kein Selbstzweck — entscheidend ist, was das Kind dort tatsächlich tut.",
      "Technische Schutzfunktionen helfen bei Kleinen; bei Älteren ersetzt nur das Gespräch die fehlende Kontrolle.",
      "Bildschirmzeit ist weniger eine Frage der Minuten als der Inhalte und der Gemeinsamkeit — gemeinsam genutzt ist besser als allein konsumiert.",
      "Kinder sollten wissen, dass sie sich bei Unangenehmem wie Mobbing oder Kontaktversuchen ohne Angst vor Strafe an die Eltern wenden können.",
      "Vorbild wirkt stärker als jede Regel: Wie Erwachsene selbst mit dem Handy umgehen, prägt am meisten."],
   c:["Alters- und Inhaltsfreigaben als Orientierung nutzen","Schutzfunktionen einrichten, mit dem Alter lockern","Über Risiken sprechen statt nur zu verbieten","Eigenes Medien-Vorbild ehrlich reflektieren"],
   prem:"Vertiefung: Wie Altersfreigaben einzuordnen sind, welche Schutzfunktionen in welchem Alter sinnvoll sind und warum das Gespräch wichtiger ist als jede Sperre."},

  {id:"wlansicherheit",k:"digital",a:[16,90],s:["Erste Wohnung","Reisen"],t:"WLAN & öffentliche Netze sicher nutzen",
   kurz:"Das Heimnetz ist die Haustür ins digitale Zuhause — und öffentliches WLAN ein offener Raum. Beides lässt sich mit wenigen Handgriffen absichern.",
   p:["Der Router ist die wichtigste Sicherheitskomponente im Haushalt; ein eigenes, starkes Passwort und aktuelle Software sind Pflicht.",
      "Das voreingestellte Admin-Passwort des Routers ändern viele nie — genau das nutzen Angreifer aus.",
      "In öffentlichen Netzen in Café, Bahn oder Hotel kann der Datenverkehr mitgelesen werden; sensible Logins meidet man dort oder sichert sie ab.",
      "Eine verschlüsselte Verbindung, erkennbar am Schloss-Symbol, und bei Bedarf ein VPN schützen in fremden Netzen.",
      "Ein getrenntes Gäste-WLAN hält Besucher und smarte Geräte vom eigentlichen Heimnetz fern."],
   c:["Router-Admin-Passwort ändern, Updates einspielen","Starke WLAN-Verschlüsselung (WPA3/WPA2) nutzen","In öffentlichem WLAN keine ungeschützten sensiblen Logins","Gäste-WLAN für Besuch und smarte Geräte einrichten"],
   prem:"Vertiefung: Wie man den Router absichert, warum öffentliches WLAN riskant ist und wie verschlüsselte Verbindungen und ein VPN unterwegs schützen."},

  /* ---------- NEU: 10 Artikel (Charge M) ---------- */
  {id:"lohnabrechnung",k:"beruf",a:[18,67],s:["Berufseinstieg","Jobwechsel"],t:"Die Gehaltsabrechnung verstehen",
   kurz:"Brutto, Netto und ein Dschungel aus Abkürzungen — die erste Lohnabrechnung versteht kaum jemand. Dabei lohnt der genaue Blick: Hier sieht man, wohin das Geld wirklich geht.",
   p:["Oben steht das Bruttogehalt; davon gehen Lohnsteuer, Solidaritätszuschlag, eventuell Kirchensteuer und die Sozialabgaben ab, bis unten das Netto übrig bleibt.",
      "Die Sozialabgaben teilen sich in Renten-, Kranken-, Pflege- und Arbeitslosenversicherung — getragen etwa zur Hälfte von Arbeitgeber und Arbeitnehmer.",
      "Die Steuerklasse bestimmt, wie viel Lohnsteuer einbehalten wird; sie ist kein endgültiger Satz, sondern eine Vorauszahlung, die die Steuererklärung später glättet.",
      "Abkürzungen wie KV, RV, PV, AV, LSt und SolZ stehen für die einzelnen Abzüge; einmal entschlüsselt, ist jede künftige Abrechnung lesbar.",
      "Fehler kommen vor — falsche Steuerklasse, vergessene Freibeträge, falsche Beitragssätze; ein jährlicher Abgleich lohnt sich."],
   c:["Brutto, Abzüge und Netto Zeile für Zeile nachvollziehen","Steuerklasse und Freibeträge auf Richtigkeit prüfen","Sozialversicherungs-Beiträge grob gegenchecken","Abrechnungen sammeln — wichtig für Kredit, Elterngeld, Rente"],
   prem:"Vertiefung: Was die einzelnen Abzüge bedeuten, wie die Steuerklasse das Netto beeinflusst und welche Abkürzungen auf der Abrechnung wofür stehen."},

  {id:"arbeitszeugnis",k:"beruf",a:[18,67],s:["Jobwechsel","Berufseinstieg"],t:"Das Arbeitszeugnis entschlüsseln",
   kurz:"Ein Arbeitszeugnis muss wohlwollend klingen — und sagt trotzdem die Wahrheit, nur verschlüsselt. Wer die Zeugnissprache kennt, erkennt seine echte Note.",
   p:["In Deutschland besteht Anspruch auf ein qualifiziertes Zeugnis, das wohlwollend formuliert sein muss, den Arbeitgeber aber nicht zur Lüge zwingt.",
      "Daraus entstand eine Geheimsprache: scheinbar freundliche Formulierungen entsprechen festen Schulnoten.",
      "„Stets zu unserer vollsten Zufriedenheit“ ist die Bestnote; fehlt ein Wort wie „stets“ oder „vollsten“, sinkt die Note spürbar.",
      "Auch Auslassungen sprechen Bände — fehlt die Schlussformel mit Dank und guten Wünschen, gilt das als versteckte Abwertung.",
      "Ein schlechtes oder fehlerhaftes Zeugnis kann man beanstanden und korrigieren lassen; dafür gelten kurze Fristen."],
   c:["Gesamtnote anhand der Zufriedenheits-Formel einordnen","Auf Vollständigkeit achten (Aufgaben, Leistung, Verhalten, Schluss)","Versteckte Abwertungen und Auslassungen erkennen","Bei Mängeln zeitnah eine Korrektur verlangen"],
   prem:"Vertiefung: Wie die Zufriedenheits-Formeln den Schulnoten entsprechen, welche Auslassungen abwerten und wie man eine Korrektur durchsetzt."},

  {id:"werbungskosten",k:"finanzen",a:[18,67],s:["Berufseinstieg","Jobwechsel"],t:"Werbungskosten: was Arbeitnehmer absetzen können",
   kurz:"Über 1.230 Euro setzt das Finanzamt jedem Arbeitnehmer automatisch ab. Wer beruflich mehr ausgibt, holt sich mit den Werbungskosten bares Geld zurück.",
   p:["Werbungskosten sind alle Ausgaben rund um den Job; bis zum Arbeitnehmer-Pauschbetrag von 1.230 Euro zieht das Finanzamt sie ohne Nachweis ab.",
      "Wer mehr ausgibt, gibt die Posten einzeln an — dann zählt jeder Euro über dem Pauschbetrag und senkt die Steuer.",
      "Klassiker sind die Entfernungspauschale fürs Pendeln, Arbeitsmittel, Fortbildung, Bewerbungskosten und die Homeoffice-Pauschale.",
      "Auch doppelte Haushaltsführung, Beiträge zu Berufsverbänden und beruflich veranlasste Umzüge gehören dazu.",
      "Belege zu sammeln lohnt sich: Ein längerer Arbeitsweg plus ein Laptop knacken den Pauschbetrag oft mühelos."],
   c:["Entfernungspauschale berechnen (0,30 € / ab 21. km 0,38 €)","Arbeitsmittel, Fortbildung, Bewerbungen sammeln","Homeoffice-Pauschale oder Arbeitszimmer prüfen","Nur der Teil über 1.230 € bringt zusätzliche Ersparnis"],
   prem:"Vertiefung: Welche Posten als Werbungskosten zählen, wie die Entfernungspauschale rechnet und ab wann sich das Einzeln-Angeben gegenüber dem Pauschbetrag lohnt."},

  {id:"steuerbescheid",k:"finanzen",a:[18,80],s:["Berufseinstieg","Ruhestand"],t:"Steuerbescheid prüfen & Einspruch einlegen",
   kurz:"Der Steuerbescheid ist kein Schicksal: Nicht selten enthält er Fehler zugunsten des Staates. Ein kurzer Abgleich — und notfalls ein Einspruch — lohnt sich fast immer.",
   p:["Im Bescheid vergleicht man die Festsetzung mit der eigenen Erklärung; Abweichungen erklärt das Finanzamt in den Erläuterungen.",
      "Häufige Stolpersteine sind nicht anerkannte Werbungskosten, übersehene Belege oder falsch übernommene Zahlen.",
      "Gegen einen fehlerhaften Bescheid kann man innerhalb eines Monats schriftlich Einspruch einlegen — formlos und kostenfrei.",
      "Solange der Einspruch läuft, kann das Finanzamt den Bescheid in jede Richtung ändern; eine gezielte Begründung verringert das Risiko.",
      "Wer nur auf eine ähnliche Musterklage wartet, kann ein Ruhen des Verfahrens beantragen, statt selbst zu klagen."],
   c:["Festsetzung Zeile für Zeile mit der Erklärung abgleichen","Erläuterungstext auf Streichungen prüfen","Einspruchsfrist von einem Monat beachten","Einspruch schriftlich und begründet einlegen"],
   prem:"Vertiefung: Wie man den Bescheid systematisch prüft, wo typische Fehler stecken und wie ein wirksamer Einspruch samt Antrag auf Ruhen des Verfahrens aussieht."},

  {id:"rentenpunkte",k:"finanzen",a:[20,67],s:["Berufseinstieg","Ruhestand"],t:"Die Rente verstehen: Entgeltpunkte & Renteninformation",
   kurz:"Die jährliche Renteninformation landet im Briefkasten und wird meist weggelegt. Dabei steht darin in wenigen Zahlen, was im Alter aufs Konto kommt — und wie man es beeinflusst.",
   p:["Die gesetzliche Rente beruht auf Entgeltpunkten: Wer genau das Durchschnittseinkommen verdient, sammelt pro Jahr einen Punkt.",
      "Jeder Punkt ist beim Renteneintritt einen festen Euro-Betrag wert (den Rentenwert); die Rente ist die Summe aller Punkte mal diesem Wert.",
      "Die Renteninformation zeigt drei Zahlen: die bereits erreichte Rente, die Hochrechnung bei gleichem Verlauf und den Einfluss der Inflation.",
      "Lücken entstehen durch Teilzeit, Ausbildung oder Auszeiten; manche Zeiten wie Kindererziehung und Pflege werden gutgeschrieben.",
      "Wer früher in Rente geht, zahlt Abschläge — pro Monat vorzeitig sinkt die Rente dauerhaft um einen festen Prozentsatz."],
   c:["Renteninformation jährlich aufheben und lesen","Erreichte und hochgerechnete Rente einordnen","Lücken durch Teilzeit oder Auszeiten erkennen","Abschläge bei vorzeitigem Renteneintritt einplanen"],
   prem:"Vertiefung: Wie ein Entgeltpunkt entsteht und was er wert ist, wie man die drei Zahlen der Renteninformation liest und wie Abschläge und Zuschläge wirken."},

  {id:"kleinunternehmer",k:"beruf",a:[18,67],s:["Berufseinstieg","Jobwechsel"],t:"Kleinunternehmerregelung & Umsatzsteuer für Einsteiger",
   kurz:"Wer nebenbei oder neu selbstständig startet, spart sich mit der Kleinunternehmerregelung viel Bürokratie — muss aber die Grenzen und den Haken kennen.",
   p:["Mit der Kleinunternehmerregelung weist man keine Umsatzsteuer aus und muss keine Umsatzsteuer-Voranmeldung abgeben — ein großer bürokratischer Vorteil.",
      "Sie gilt, solange der Umsatz im Vorjahr und im laufenden Jahr unter den gesetzlichen Grenzen bleibt.",
      "Der Haken: Man darf die Vorsteuer aus eigenen Einkäufen nicht zurückholen — bei hohen Anfangsinvestitionen kann der Verzicht teuer werden.",
      "Wer überwiegend Privatkunden bedient, fährt mit der Regelung meist gut; bei Geschäftskunden ist sie oft neutral.",
      "Die Einkommensteuer fällt unabhängig davon an — Einnahmen müssen weiterhin über die Steuererklärung versteuert werden."],
   c:["Umsatzgrenzen für Vor- und laufendes Jahr prüfen","Vorsteuer-Verzicht gegen geplante Investitionen abwägen","Kundenstruktur (privat vs. geschäftlich) berücksichtigen","Einnahmen trotzdem in der Einkommensteuer angeben"],
   prem:"Vertiefung: Wie die Kleinunternehmerregelung funktioniert, wann sich der Verzicht auf den Vorsteuerabzug rächt und worauf man bei der Wahl achten sollte."},

  {id:"paarfinanzen",k:"familie",a:[20,70],s:["Familiengründung","Trennung"],t:"Gemeinsame Finanzen: Kontenmodelle für Paare",
   kurz:"Geld ist einer der häufigsten Streitpunkte in Beziehungen — meist nicht wegen der Höhe, sondern wegen fehlender Absprachen. Drei Kontenmodelle decken fast jede Konstellation ab.",
   p:["Am verbreitetsten ist das Drei-Konten-Modell: zwei eigene Konten plus ein gemeinsames, auf das beide anteilig einzahlen.",
      "Wer sehr unterschiedlich verdient, teilt die gemeinsamen Kosten oft nicht hälftig, sondern im Verhältnis der Einkommen — das empfinden viele als fairer.",
      "Ein gemeinsames Konto schafft Transparenz, ein eigenes Konto bewahrt Autonomie; die Mischung verhindert beide Extreme.",
      "Wichtig ist Klarheit über große Posten: Wer zahlt was, wem gehören Anschaffungen, und was geschieht mit gemeinsamem Vermögen bei einer Trennung.",
      "Gemeinsame Kredite und Bürgschaften wirken über eine Trennung hinaus — hier ist besondere Vorsicht geboten."],
   c:["Kontenmodell bewusst wählen (gemeinsam, getrennt, Mischung)","Aufteilung der Fixkosten festlegen (hälftig oder nach Einkommen)","Eigentum an größeren Anschaffungen klären","Gemeinsame Kredite und ihre Folgen bedenken"],
   prem:"Vertiefung: Die drei gängigen Kontenmodelle mit ihren Vor- und Nachteilen, die faire Kostenaufteilung bei ungleichem Einkommen und was bei Trennung mit gemeinsamem Geld passiert."},

  {id:"krankschreibung",k:"gesundheit",a:[16,67],s:["Berufseinstieg","Jobwechsel"],t:"Krankschreibung & Lohnfortzahlung: deine Rechte",
   kurz:"Krank sein ist Stress genug — die Regeln drumherum sollten es nicht sein. Wer Krankmeldung, Lohnfortzahlung und die Sechs-Wochen-Grenze kennt, macht keine Fehler.",
   p:["Bei Krankheit informiert man den Arbeitgeber unverzüglich — am besten vor Arbeitsbeginn, unabhängig von der ärztlichen Bescheinigung.",
      "Die Krankschreibung übermittelt die Arztpraxis heute meist elektronisch an die Krankenkasse; der Arbeitgeber ruft sie dort ab.",
      "In den ersten sechs Wochen derselben Erkrankung zahlt der Arbeitgeber das volle Gehalt weiter (Entgeltfortzahlung).",
      "Danach übernimmt die Krankenkasse das Krankengeld — deutlich weniger als das Nettogehalt, aber eine wichtige Absicherung.",
      "Ab wann eine Bescheinigung nötig ist, hängt vom Arbeitsvertrag ab; viele verlangen sie ab dem vierten Tag, manche schon ab dem ersten."],
   c:["Arbeitgeber sofort informieren (vor Arbeitsbeginn)","Im Arbeitsvertrag prüfen, ab wann eine Bescheinigung nötig ist","Sechs-Wochen-Grenze der Lohnfortzahlung kennen","Bei längerer Krankheit Krankengeld bei der Kasse klären"],
   prem:"Vertiefung: Der zeitliche Ablauf von Krankmeldung, Lohnfortzahlung und Krankengeld, die Rolle der elektronischen AU und was bei wiederholter Krankheit gilt."},

  {id:"mieterhoehung",k:"wohnen",a:[18,80],s:["Erste Wohnung","Umzug"],t:"Mieterhöhung: wann sie zulässig ist und wie man sie prüft",
   kurz:"Eine Mieterhöhung im Briefkasten ist kein Befehl. Vermieter müssen Grenzen und Formvorschriften einhalten — und die werden erstaunlich oft verfehlt.",
   p:["Bei einer Erhöhung bis zur ortsüblichen Vergleichsmiete muss der Vermieter diese begründen — etwa mit Mietspiegel oder Vergleichswohnungen.",
      "Die Kappungsgrenze begrenzt die Erhöhung innerhalb von drei Jahren auf 20 Prozent, in angespannten Märkten auf 15 Prozent.",
      "Nach einer Modernisierung darf ein Teil der Kosten umgelegt werden, aber gedeckelt und nur unter Bedingungen.",
      "Eine Erhöhung muss in Textform kommen, korrekt begründet sein und eine Zustimmungsfrist einräumen — Formfehler machen sie unwirksam.",
      "Einer berechtigten Erhöhung muss man zustimmen, hat dafür aber Bedenkzeit; bei Zweifeln hilft der Mieterverein."],
   c:["Begründung (Mietspiegel, Vergleichswohnungen) prüfen","Kappungsgrenze (15/20 % in drei Jahren) nachrechnen","Form und Fristen der Erhöhung kontrollieren","Bei Zweifeln Mieterverein oder Beratung einschalten"],
   prem:"Vertiefung: Welche Arten der Mieterhöhung es gibt, wie Kappungsgrenze und Vergleichsmiete zusammenspielen und welche Formfehler eine Erhöhung kippen."},

  {id:"erbeausschlagen",k:"recht",a:[18,90],s:["Trennung","Ruhestand"],t:"Erbe ausschlagen: überschuldeter Nachlass & Fristen",
   kurz:"Ein Erbe ist nicht immer ein Geschenk — wer Schulden erbt, haftet unter Umständen mit dem eigenen Vermögen. Ausschlagen kann richtig sein, aber nur fristgerecht.",
   p:["Mit dem Erbe gehen nicht nur Vermögen, sondern auch Schulden über; im Zweifel haftet der Erbe dafür.",
      "Wer ein überschuldetes Erbe vermeiden will, kann es ausschlagen — dann tritt der Nächste in der Erbfolge an seine Stelle.",
      "Für die Ausschlagung gilt eine kurze Frist von sechs Wochen ab Kenntnis vom Erbfall — sie wird leicht verpasst.",
      "Die Ausschlagung erklärt man persönlich beim Nachlassgericht oder notariell beglaubigt; formlos geht sie nicht.",
      "Ist die Lage unklar, begrenzen Alternativen wie die Nachlassverwaltung die Haftung auf den Nachlass selbst."],
   c:["Vermögen und Schulden des Nachlasses überschlagen","Sechs-Wochen-Frist ab Kenntnis strikt beachten","Ausschlagung beim Nachlassgericht oder Notar erklären","Bei Unklarheit Nachlassverwaltung statt Ausschlagung prüfen"],
   prem:"Vertiefung: Wie Erben-Haftung entsteht, welche Fristen und Formen für die Ausschlagung gelten und wann Nachlassverwaltung oder Nachlassinsolvenz die bessere Wahl sind."},

  /* ---------- NEU: 10 Artikel (Charge L) ---------- */
  {id:"gebrauchtkauf",k:"recht",a:[18,75],s:["Berufseinstieg","Erste Wohnung"],t:"Gebraucht kaufen & verkaufen: sicher handeln",
   kurz:"Auf Kleinanzeigen-Portalen lässt sich viel sparen und verdienen – aber zwischen Schnäppchen und Betrug liegt oft nur eine Nachricht. Mit ein paar Regeln handelt man sicher und rechtlich sauber.",
   p:["Beim privaten Verkauf gilt: Wer die Gewährleistung wirksam ausschließt, haftet später nicht für Mängel – arglistig verschwiegene Fehler ausgenommen.",
      "Käufer sollten Ware nach Möglichkeit persönlich prüfen und bar bei Übergabe zahlen; Vorkasse an Unbekannte ist das häufigste Einfallstor für Betrug.",
      "Typische Maschen sind gefälschte „Bezahldienst“-Links, angebliche Spediteure bei zu günstigen Angeboten und Überzahlungs-Tricks mit Rückforderung.",
      "Ein kurzer Übergabebeleg mit Datum, Artikel, Preis und beiden Namen beweist, dass die Sache übergeben und bezahlt wurde – das schützt beide Seiten.",
      "Adresse, Ausweiskopien und Kontodaten gehören nicht in den Chat; für die Abholung reicht ein neutraler, belebter Treffpunkt."],
   c:["Gewährleistung im Inserat wirksam ausschließen (nur privat)","Bar bei Übergabe oder über geprüften Käuferschutz zahlen","Übergabebeleg mit Datum, Artikel, Preis, Namen anfertigen","Bei Auslandsversand und „zu schön“-Preisen misstrauisch sein"],
   prem:"Vertiefung: Wie der Gewährleistungsausschluss richtig formuliert wird, welche Betrugsmaschen gerade kursieren und wie ein wasserdichter Übergabebeleg aussieht."},

  {id:"gewaehrleistung",k:"recht",a:[18,80],s:["Berufseinstieg","Erste Wohnung"],t:"Reklamation: Gewährleistung, Garantie & dein Recht",
   kurz:"Geht etwas kaputt, verwechseln viele Gewährleistung und Garantie – und verschenken Rechte. Die gesetzliche Gewährleistung gilt zwei Jahre und kostet nichts.",
   p:["Die Gewährleistung ist gesetzlich vorgeschrieben: Der Verkäufer haftet zwei Jahre dafür, dass die Ware bei Übergabe mangelfrei war.",
      "Eine Garantie ist dagegen freiwillig – Hersteller oder Händler versprechen zusätzliche Leistungen, deren Umfang sie selbst festlegen.",
      "In den ersten zwölf Monaten wird vermutet, dass ein Mangel schon bei Übergabe bestand; danach muss es im Zweifel der Käufer belegen.",
      "Zuerst hat man Anspruch auf Nacherfüllung – Reparatur oder Ersatz; erst wenn das scheitert, kommen Minderung oder Rücktritt in Betracht.",
      "Reklamiert wird immer beim Verkäufer, nicht beim Hersteller – am besten schriftlich und mit einer angemessenen Frist."],
   c:["Kaufbeleg aufbewahren – er ist der Nachweis","Mangel schriftlich beim Verkäufer rügen, Frist setzen","Erst Nacherfüllung verlangen, dann Minderung/Rücktritt","Garantiebedingungen getrennt von der Gewährleistung prüfen"],
   prem:"Vertiefung: Der Unterschied zwischen Gewährleistung und Garantie, die Beweislast-Umkehr nach zwölf Monaten und wie eine wirksame Mängelrüge formuliert ist."},

  {id:"kreditkarte",k:"finanzen",a:[18,70],s:["Berufseinstieg","Reisen"],t:"Kreditkarte richtig nutzen: Typen, Ausland & Fallen",
   kurz:"Kreditkarte ist nicht gleich Kreditkarte. Wer Charge-, Debit- und Revolving-Karten unterscheidet, vermeidet teure Zinsen und Gebühren – besonders im Ausland.",
   p:["Die in Deutschland übliche Charge-Karte sammelt alle Umsätze und bucht sie einmal im Monat komplett ab – zinsfrei, wenn das Konto gedeckt ist.",
      "Bei der Revolving-Karte zahlt man nur einen Teil zurück, der Rest wird hoch verzinst – ein Mechanismus, der schnell in die Schuldenfalle führt.",
      "Im Ausland lauern das Auslandseinsatzentgelt und die „Sofort-Umrechnung“ (DCC): in Euro abrechnen zu lassen ist fast immer teurer als in Landeswährung.",
      "Bargeld per Kreditkarte abzuheben kostet oft Gebühr plus sofortige Zinsen – anders als beim normalen Einkauf.",
      "Der eigentliche Mehrwert echter Kreditkarten liegt im Einkaufsschutz und der weltweiten Akzeptanz, nicht im Kreditrahmen."],
   c:["Kartentyp klären: Charge, Debit oder Revolving","Bei Revolving immer den vollen Betrag zurückzahlen","Im Ausland in Landeswährung abrechnen lassen (kein DCC)","Bargeldabhebung per Kreditkarte meiden"],
   prem:"Vertiefung: Wie sich die Kartentypen unterscheiden, warum „in Euro zahlen“ im Ausland eine Kostenfalle ist und wann sich welche Gebühr wirklich lohnt."},

  {id:"mahnung",k:"finanzen",a:[18,80],s:["Berufseinstieg","Trennung"],t:"Mahnung, Inkasso & Mahnbescheid: richtig reagieren",
   kurz:"Post vom Inkassobüro macht Angst – aber Ignorieren ist der teuerste Fehler. Wer die Eskalationsstufen kennt, behält die Kontrolle und zahlt nicht zu viel.",
   p:["Eine Mahnung ist zunächst nur eine Zahlungserinnerung; rechtlich entscheidend wird es erst beim gerichtlichen Mahnbescheid.",
      "Inkassobüros dürfen Forderungen eintreiben, aber ihre Gebühren sind gedeckelt – überhöhte Kosten muss man nicht akzeptieren.",
      "Ist die Forderung berechtigt, aber gerade nicht zahlbar, hilft eine schriftliche Bitte um Ratenzahlung weit mehr als Schweigen.",
      "Ist die Forderung unberechtigt, widerspricht man schriftlich und verlangt einen Nachweis des ursprünglichen Vertrags.",
      "Auf einen gerichtlichen Mahnbescheid muss man innerhalb von zwei Wochen reagieren – sonst droht der Vollstreckungsbescheid."],
   c:["Forderung prüfen: berechtigt, Höhe, Verjährung","Bei Unrecht schriftlich widersprechen, Nachweis verlangen","Inkassokosten auf Angemessenheit prüfen","Frist beim gerichtlichen Mahnbescheid (2 Wochen) wahren"],
   prem:"Vertiefung: Die Eskalationsstufen vom Erinnerungsschreiben bis zur Zwangsvollstreckung, gedeckelte Inkassokosten und die Fristen, die wirklich zählen."},

  {id:"kapitalertraege",k:"finanzen",a:[18,80],s:["Berufseinstieg","Ruhestand"],t:"Steuer auf Zinsen & Dividenden: Freistellungsauftrag nutzen",
   kurz:"Auf Kapitalerträge zahlt man pauschal 25 % Abgeltungsteuer – aber bis zum Sparerpauschbetrag bleibt alles steuerfrei, wenn man einen Freistellungsauftrag stellt.",
   p:["Zinsen, Dividenden und Kursgewinne unterliegen der Abgeltungsteuer von 25 % plus Soli und gegebenenfalls Kirchensteuer – die Bank führt sie automatisch ab.",
      "Pro Person bleiben 1.000 Euro Kapitalerträge im Jahr steuerfrei (Sparerpauschbetrag), bei zusammen veranlagten Ehepaaren 2.000 Euro.",
      "Diese Freistellung wirkt aber nur mit einem Freistellungsauftrag bei der Bank – sonst wird ab dem ersten Euro Steuer einbehalten.",
      "Wer mehrere Banken nutzt, verteilt den Pauschbetrag per Auftrag; in Summe darf der Höchstbetrag nicht überschritten werden.",
      "Bei thesaurierenden ETFs greift die Vorabpauschale – eine kleine jährliche Vorab-Besteuerung, die später mit dem Verkaufsgewinn verrechnet wird."],
   c:["Freistellungsauftrag bei jeder Bank einrichten","Pauschbetrag (1.000/2.000 €) sinnvoll auf Banken verteilen","Vorabpauschale bei thesaurierenden ETFs einplanen","Bei geringem Einkommen Günstigerprüfung in der Steuererklärung"],
   prem:"Vertiefung: Wie der Sparerpauschbetrag wirkt, wie man ihn auf mehrere Banken verteilt, was die Vorabpauschale bedeutet und wann sich die Anlage KAP lohnt."},

  {id:"vertragkuendigen",k:"recht",a:[18,80],s:["Berufseinstieg","Umzug"],t:"Verträge kündigen: Fristen, Button & Sonderkündigung",
   kurz:"Handy, Fitnessstudio, Streaming – Verträge sammeln sich an. Seit der Reform ist Kündigen einfacher, wenn man Fristen und den Kündigungsbutton kennt.",
   p:["Online abgeschlossene Dauerverträge müssen seit 2022 einen gut sichtbaren „Vertrag-kündigen“-Button haben – die Kündigung per Klick ist damit jederzeit möglich.",
      "Nach der ersten Mindestlaufzeit dürfen sich Verträge nur noch um höchstens einen Monat verlängern und sind dann monatlich kündbar.",
      "Die ordentliche Kündigung wahrt die vereinbarte Frist; ein Sonderkündigungsrecht greift bei Preiserhöhung, Umzug oder geänderten Bedingungen.",
      "Eine Kündigung sollte man sich bestätigen lassen – per Button-Quittung, E-Mail oder Einschreiben mit Datum.",
      "Wer zu spät dran ist, verlängert oft ungewollt; ein Kalendereintrag zur Kündigungsfrist verhindert das zuverlässig."],
   c:["Mindestlaufzeit und Kündigungsfrist im Vertrag prüfen","Online den Kündigungsbutton nutzen, Quittung sichern","Sonderkündigungsrecht bei Preiserhöhung/Umzug prüfen","Kündigungsbestätigung aufbewahren"],
   prem:"Vertiefung: Wie der gesetzliche Kündigungsbutton funktioniert, welche Fristen seit der Reform gelten und wann ein Sonderkündigungsrecht greift – mit Musterformulierung."},

  {id:"digitalnachlass",k:"recht",a:[20,90],s:["Ruhestand","Familiengründung"],t:"Digitaler Nachlass: Konten, Passwörter & Vorsorge",
   kurz:"E-Mail, Cloud, Social Media, Abos – das digitale Leben endet nicht automatisch mit dem Tod. Wer vorsorgt, erspart den Angehörigen einen zermürbenden Marathon.",
   p:["Rechtlich gehen digitale Konten wie analoges Vermögen auf die Erben über – praktisch scheitern diese aber oft an Passwörtern und Plattformregeln.",
      "Eine Liste der wichtigsten Konten und Zugänge, sicher verwahrt, ist die einfachste und wirksamste Vorsorge.",
      "Eine Vertrauensperson sollte per Vollmacht „über den Tod hinaus“ berechtigt sein, sich um die digitalen Angelegenheiten zu kümmern.",
      "Viele Dienste bieten einen Nachlasskontakt oder einen Inaktivitäts-Manager – diese Funktionen einzurichten dauert nur Minuten.",
      "Passwörter gehören nicht ins Testament, das später eingesehen werden kann, sondern in einen Passwortmanager oder einen separat verwahrten, verschlüsselten Ort."],
   c:["Liste wichtiger Konten und Zugänge anlegen","Passwortmanager nutzen, Master-Zugang sicher hinterlegen","Vollmacht über den Tod hinaus erteilen","Nachlass- und Inaktivitätsfunktionen der Dienste einrichten"],
   prem:"Vertiefung: Was rechtlich mit Online-Konten passiert, wie eine Vollmacht über den Tod hinaus aussieht und wie man Zugänge sicher und auffindbar hinterlegt – ohne sie angreifbar zu machen."},

  {id:"radverkehr",k:"freizeit",a:[16,80],s:["Berufseinstieg","Studium"],t:"Mit dem Rad im Recht: Regeln, Diebstahl & Versicherung",
   kurz:"Das Fahrrad ist Alltagsverkehrsmittel Nummer eins – und unterliegt klaren Regeln. Wer sie kennt, fährt sicherer, günstiger und steht bei Diebstahl nicht im Regen.",
   p:["Fürs Rad gelten die meisten Verkehrsregeln wie fürs Auto: Promillegrenzen, Handyverbot und Ampelregeln werden auch hier geahndet.",
      "Pflicht sind funktionierende Bremsen, Licht und Reflektoren; ein Helm ist nicht vorgeschrieben, bei Unfällen aber ein starkes Argument.",
      "Gegen Diebstahl hilft vor allem ein gutes Schloss – Faustregel rund zehn Prozent des Radwerts – und das Anschließen an einen festen Gegenstand.",
      "Die Rahmennummer zu notieren und das Rad zu registrieren erhöht die Chance, ein gestohlenes Rad wiederzubekommen.",
      "Hochwertige Räder lassen sich über die Hausratversicherung mit einer Fahrrad-Klausel absichern – auf die sogenannte Nachtzeitklausel achten."],
   c:["Licht, Bremsen, Reflektoren regelmäßig prüfen","Gutes Schloss, immer an festen Gegenstand anschließen","Rahmennummer notieren, Rad registrieren","Hausrat um Fahrrad-Klausel prüfen (Nachtzeitklausel beachten)"],
   prem:"Vertiefung: Welche Verkehrsregeln und Promillegrenzen fürs Rad gelten, wie man Diebstahl wirksam vorbeugt und wann sich eine eigene Fahrradversicherung gegenüber der Hausrat-Klausel lohnt."},

  {id:"taschengeld",k:"familie",a:[25,55],s:["Familiengründung"],t:"Taschengeld & Finanzerziehung: Umgang mit Geld lernen",
   kurz:"Kinder lernen den Umgang mit Geld vor allem durch eigenes Geld. Taschengeld ist das beste Übungsfeld – wenn Höhe, Regelmäßigkeit und Freiheit stimmen.",
   p:["Taschengeld sollte regelmäßig, verlässlich und ohne Gegenleistung fließen – es ist Lerngeld, kein Lohn und kein Druckmittel.",
      "Als grobe Orientierung dienen die mit dem Alter steigenden Empfehlungen der Jugendämter; entscheidend ist weniger die genaue Höhe als die Verlässlichkeit.",
      "Kinder dürfen im Rahmen ihres Taschengeldes selbst kaufen – der sogenannte Taschengeldparagraf macht solche Geschäfte wirksam.",
      "Auch Fehlkäufe sind Teil des Lernens; wer jeden Kauf kommentiert oder rettet, nimmt die wichtigste Erfahrung weg.",
      "Ältere Kinder profitieren von einem Budgetgeld für Kleidung oder Handy – so üben sie das Einteilen über längere Zeiträume."],
   c:["Feste Höhe und festen Termin vereinbaren","Taschengeld ohne Gegenleistung und ohne Strafen zahlen","Eigene – auch falsche – Kaufentscheidungen zulassen","Ab dem Jugendalter Budgetgeld für größere Posten einführen"],
   prem:"Vertiefung: Welche Orientierungswerte fürs Taschengeld gelten, was der Taschengeldparagraf erlaubt und wie der Übergang zum eigenverantwortlichen Budget gelingt."},

  {id:"buergschaft",k:"finanzen",a:[18,80],s:["Berufseinstieg","Familiengründung"],t:"Bürgschaft & Mithaftung: bevor du für andere unterschreibst",
   kurz:"Für Freunde oder Familie zu bürgen fühlt sich solidarisch an – kann aber existenzbedrohend werden. Eine Unterschrift macht fremde Schulden zu deinen eigenen.",
   p:["Mit einer Bürgschaft verpflichtest du dich, die Schuld eines anderen zu begleichen, falls dieser nicht zahlt – im schlimmsten Fall in voller Höhe.",
      "Besonders riskant ist die selbstschuldnerische Bürgschaft: Der Gläubiger darf sofort dich in Anspruch nehmen, ohne erst den Hauptschuldner zu verklagen.",
      "Auch ein gemeinsamer Kreditvertrag macht beide voll haftbar – diese Mithaftung läuft selbst nach einer Trennung weiter.",
      "Banken verlangen Bürgschaften oft von Angehörigen; Gerichte heben sie nur in Ausnahmefällen wegen krasser finanzieller Überforderung auf.",
      "Vor jeder Unterschrift gilt: Höhe begrenzen, eine Befristung verlangen und ehrlich prüfen, ob man den Ernstfall selbst tragen könnte."],
   c:["Bürgschaftshöhe und Laufzeit schriftlich begrenzen","Art der Bürgschaft klären (Ausfall- vs. selbstschuldnerisch)","Bei gemeinsamen Krediten an die Zeit nach einer Trennung denken","Nur unterschreiben, was man im Ernstfall selbst tragen kann"],
   prem:"Vertiefung: Die Arten der Bürgschaft und ihre Risiken, der Unterschied zur Mithaftung im gemeinsamen Kredit und woran man eine sittenwidrige Überforderung erkennt."},

/* ---------- NEU: interaktive Artikel (Charge D — ausfuehrlich) ---------- */
{id:"mietenkaufen",k:"wohnen",a:[25,75],s:["Hauskauf","Erste Wohnung"],t:"Mieten oder kaufen? Die ehrliche Rechnung",
 kurz:"Kaufen gilt als vernünftig, Mieten als Geldverschwendung – so einfach ist es nicht. Ob sich der Kauf lohnt, hängt von Zins, Kaufnebenkosten, Eigenkapital und der Zeit ab, die man bleibt.",
 p:["Beim Kauf sind nicht nur Zins und Tilgung relevant, sondern auch Kaufnebenkosten und laufende Instandhaltung.","Tilgung ist kein verlorenes Geld, sondern Vermögensaufbau – Zinsen, Nebenkosten und Instandhaltung dagegen sind reine Kosten.","Wer mietet, kann das Eigenkapital anlegen; dieser Ertrag gehört in einen fairen Vergleich.","Je länger man im Objekt bleibt, desto eher amortisieren sich die hohen Kaufnebenkosten.","Lage, Wert- und Mietentwicklung sind unsicher – die Rechnung liefert eine Tendenz, keine Prophezeiung."],
 c:["Kaufnebenkosten (rund 10 %) von Anfang an einplanen","Wie lange will ich bleiben? Unter 7–10 Jahren wird Kauf oft eng","Eigenkapital-Ertrag des Mieters gegenrechnen","Instandhaltungsrücklage nicht vergessen"],
 prem:"Vertiefung: Welche Kosten beim Kauf wirklich anfallen, warum die Haltedauer entscheidet und wie ein fairer Vergleich mit dem Mieten aussieht. Inklusive interaktivem Rechner."},

{id:"erbschaftsteuer",k:"recht",a:[25,99],s:["Ruhestand","Trennung"],t:"Erbschaft und Schenkung: Freibeträge clever nutzen",
 kurz:"Vererben und Schenken ist in Deutschland großzügig freigestellt – wenn man die Freibeträge kennt und früh plant. Wer sie alle zehn Jahre neu nutzt, spart oft die gesamte Steuer.",
 p:["Jeder Erwerb hat einen Freibetrag, der vom Verwandtschaftsgrad abhängt – beim Ehepartner 500.000, beim Kind 400.000 Euro.","Nur der Betrag über dem Freibetrag wird besteuert; der Steuersatz steigt mit Höhe und Verwandtschaftsferne.","Die Freibeträge lassen sich alle zehn Jahre erneut nutzen – ein starkes Mittel der vorausschauenden Schenkung.","Das selbst genutzte Familienheim bleibt für Ehepartner und Kinder unter Bedingungen komplett steuerfrei.","Wer früh und verteilt überträgt, kann die Steuer legal stark senken oder ganz vermeiden."],
 c:["Freibetrag je nach Verwandtschaftsgrad bestimmen","Große Vermögen über die 10-Jahres-Frist verteilt schenken","Familienheim-Regelung prüfen","Bei größeren Werten fachlichen Rat einholen"],
 prem:"Vertiefung: Welche Freibeträge gelten, wie der Steuersatz steigt und wie man mit Schenkungen über zehn Jahre legal spart. Inklusive interaktivem Rechner."},

{id:"abfindung",k:"beruf",a:[20,67],s:["Jobwechsel","Trennung"],t:"Abfindung: Anspruch, Höhe und Steuer",
 kurz:"Eine Abfindung ist selten ein gesetzlicher Anspruch, sondern Verhandlungssache. Wer die Faustformel, die Fünftelregelung und die Sperrzeit-Falle kennt, verhandelt aus einer stärkeren Position.",
 p:["Einen gesetzlichen Anspruch auf Abfindung gibt es nur in Sonderfällen – meist ist sie das Ergebnis einer Verhandlung.","Als Orientierung dient die Faustformel: ein halbes Bruttomonatsgehalt je Beschäftigungsjahr.","Die Abfindung ist voll steuerpflichtig, die Fünftelregelung mildert aber die Steuerprogression.","Ein Aufhebungsvertrag kann eine Sperrzeit beim Arbeitslosengeld auslösen – Vorsicht ist geboten.","Eine Kündigungsschutzklage erhöht oft den Verhandlungsdruck und damit die Abfindungshöhe."],
 c:["Orientierungswert mit der Faustformel berechnen","Steuerwirkung der Fünftelregelung bedenken","Sperrzeit-Risiko bei Aufhebungsvertrag prüfen","Fristen für die Kündigungsschutzklage (3 Wochen) beachten"],
 prem:"Vertiefung: Wann eine Abfindung zusteht, wie sich die Höhe bemisst, wie die Fünftelregelung wirkt und welche Fallen lauern. Inklusive interaktivem Rechner."},

{id:"fluggastrechte",k:"freizeit",a:[16,99],s:["Berufseinstieg","Ruhestand"],t:"Fluggastrechte: Entschädigung bei Verspätung",
 kurz:"Bei großer Verspätung oder Annullierung steht dir oft eine feste Entschädigung zu – bis zu 600 Euro pro Person, unabhängig vom Ticketpreis. Die EU-Verordnung macht es erstaunlich klar.",
 p:["Die EU-Fluggastrechte gelten bei Abflug in der EU oder bei Ankunft in der EU mit einer EU-Airline.","Anspruch besteht ab drei Stunden Ankunftsverspätung oder bei kurzfristiger Annullierung.","Die Höhe richtet sich nach der Flugdistanz: 250, 400 oder 600 Euro – nicht nach dem Ticketpreis.","Außergewöhnliche Umstände wie Unwetter oder ein Streik der Flugsicherung befreien die Airline von der Zahlung.","Zusätzlich gibt es Betreuungsleistungen: Verpflegung, Kommunikation und gegebenenfalls Hotel."],
 c:["Verspätungsgrund und Ankunftszeit dokumentieren","Distanzklasse für die Entschädigung bestimmen","Anspruch direkt bei der Airline geltend machen","Bei Ablehnung Schlichtungsstelle oder Inkasso-Dienstleister nutzen"],
 prem:"Vertiefung: Wann genau Geld zusteht, wie hoch es ausfällt, was die Airline entlastet und wie du deinen Anspruch durchsetzt. Inklusive interaktivem Rechner."},

{id:"krankengeld",k:"gesundheit",a:[18,67],s:["Krankheit","Berufseinstieg"],t:"Krankengeld: Einkommen bei langer Krankheit",
 kurz:"Wer lange krank ist, bekommt nach sechs Wochen kein volles Gehalt mehr, sondern Krankengeld von der Krankenkasse. Wie hoch es ist, wie lange es läuft und was abgezogen wird.",
 p:["Die ersten sechs Wochen zahlt der Arbeitgeber das volle Gehalt weiter (Entgeltfortzahlung).","Danach übernimmt die gesetzliche Krankenkasse mit dem Krankengeld – deutlich weniger als das Nettogehalt.","Es beträgt 70 Prozent des Bruttoentgelts, höchstens aber 90 Prozent des Nettoentgelts.","Gezahlt wird für dieselbe Erkrankung bis zu 78 Wochen innerhalb von drei Jahren.","Vom Krankengeld gehen noch Sozialbeiträge ab; privat Versicherte brauchen ein Krankentagegeld."],
 c:["Sechs Wochen Entgeltfortzahlung einplanen","Krankengeld-Höhe grob abschätzen","Lücke zum Nettogehalt einkalkulieren","Privat Versicherte: Krankentagegeld prüfen"],
 prem:"Vertiefung: Wann Krankengeld greift, wie es berechnet wird, wie lange es läuft und welche Abzüge anfallen. Inklusive interaktivem Rechner."},

/* ---------- NEU: interaktive Artikel (Charge C) ---------- */
{id:"etfsparplan",k:"finanzen",a:[16,80],s:["Berufseinstieg","Ruhestand"],t:"ETF-Sparplan: der Zinseszins-Motor",
 kurz:"Ein breit gestreuter ETF-Sparplan ist der einfachste Weg, langfristig Vermögen aufzubauen. Wenig Geld pro Monat, viel Geduld – den Rest erledigt der Zinseszins.",
 p:["Ein ETF bildet einen ganzen Markt ab (z. B. die Weltwirtschaft) und streut dadurch das Risiko breit.","Der Zinseszins wirkt umso stärker, je länger man dabei bleibt – die letzten Jahre bringen den größten Schub.","Wichtig sind niedrige Kosten (TER) und ein thesaurierender oder ausschüttender Welt-Index ohne Wetten auf Einzelwerte.","Kursschwankungen gehören dazu; wer stur weiterspart, kauft in schwachen Phasen günstiger ein.","Der Sparplan ist flexibel: Rate jederzeit anpassbar, schon kleine Beträge ab wenigen Euro sind möglich."],
 c:["Erst Notgroschen, dann langfristig anlegen","Breit streuen statt einzelne Aktien wählen","Auf niedrige Kosten (TER) achten","Automatisch sparen und Schwankungen aushalten"],
 prem:"Vertiefung: Wie der Zinseszins über die Jahre wirkt, worauf es bei der ETF-Auswahl ankommt und warum Durchhalten der wichtigste Faktor ist. Inklusive interaktivem Rechner."},

{id:"skonto",k:"finanzen",a:[18,99],s:["Schulden","Berufseinstieg"],t:"Skonto: der teuerste Rabatt, den man liegen lässt",
 kurz:"Skonto klingt nach Kleinkram – zwei Prozent fürs schnelle Zahlen. Rechnet man den Verzicht in einen Jahreszins um, zeigt sich: Skonto nicht zu ziehen ist eine der teuersten Entscheidungen überhaupt.",
 p:["Skonto ist ein Preisnachlass dafür, dass man eine Rechnung schnell zahlt – typisch sind 2 oder 3 Prozent innerhalb weniger Tage.","Wer die kurze Skontofrist verstreichen lässt und erst zum Zahlungsziel zahlt, verschenkt diesen Rabatt.","Rechnet man den Verzicht in einen Jahreszins um, ist er meist sehr hoch – oft über 30 Prozent.","Deshalb lohnt es fast immer, Skonto zu ziehen, selbst wenn man dafür kurz ein günstigeres Darlehen oder den Dispo nutzt.","Skonto findet sich auf Handwerker-, Material- und Lieferantenrechnungen – auch privat, etwa beim Möbel- oder Baustoffkauf."],
 c:["Rechnungen auf Skonto-Angebote prüfen","Skontofrist im Kalender markieren","Effektiven Jahreszins des Verzichts im Kopf haben","Im Zweifel günstig zwischenfinanzieren statt Skonto verfallen lassen"],
 prem:"Vertiefung: Wie aus zwei Prozent ein hoher Jahreszins wird, wann sich Skonto lohnt und worauf man bei der Frist achtet. Inklusive interaktivem Rechner."},

{id:"hausrat",k:"wohnen",a:[18,99],s:["Erste Wohnung","Hauskauf"],t:"Hausratversicherung: Summe richtig wählen",
 kurz:"Die Hausratversicherung ersetzt Hab und Gut nach Feuer, Einbruch oder Wasserschaden. Entscheidend ist die richtige Versicherungssumme – sonst droht im Schaden eine böse Kürzung.",
 p:["Versichert ist der gesamte bewegliche Hausrat zum Neuwert – also Möbel, Elektronik, Kleidung, Geschirr.","Die Versicherungssumme sollte zum tatsächlichen Wert passen; üblich ist ein Richtwert pro Quadratmeter.","Bei Unterversicherung kürzt der Versicherer im Schaden anteilig – der Unterversicherungsverzicht schützt davor.","Fahrräder, Wertsachen und Elementarschäden (Hochwasser, Starkregen) sind oft nur mit Zusatz abgedeckt.","Nach größeren Anschaffungen die Summe anpassen, sonst wächst die Lücke unbemerkt."],
 c:["Versicherungssumme über Wohnfläche × Richtwert prüfen","Unterversicherungsverzicht vereinbaren","Fahrrad und Wertsachen gesondert absichern","Elementarschäden je nach Lage einschließen"],
 prem:"Vertiefung: Wie die Versicherungssumme bestimmt wird, was Unterversicherung bedeutet und welche Zusätze sinnvoll sind. Inklusive interaktivem Rechner."},

{id:"bu",k:"recht",a:[18,60],s:["Berufseinstieg","Krankheit"],t:"Berufsunfähigkeit: die wichtigste Police",
 kurz:"Die Arbeitskraft ist das größte Vermögen – fällt sie weg, reißt das ein tiefes Loch. Die gesetzliche Absicherung genügt selten; eine BU-Versicherung schließt die Lücke.",
 p:["Wer dauerhaft nicht mehr arbeiten kann, verliert sein Einkommen – die größte finanzielle Gefahr im Erwerbsleben.","Die gesetzliche Erwerbsminderungsrente ist niedrig und greift nur bei sehr starker Einschränkung.","Eine BU-Rente zahlt, wenn man den zuletzt ausgeübten Beruf zu mindestens 50 Prozent nicht mehr ausüben kann.","Je jünger und gesünder man abschließt, desto niedriger der Beitrag – Vorerkrankungen erschweren den Abschluss.","Auf gute Bedingungen achten: Verzicht auf abstrakte Verweisung, weltweiter Schutz, Nachversicherungsgarantie."],
 c:["Absicherungsbedarf vom Nettoeinkommen ableiten","Gesetzliche EM-Rente als Basis einrechnen","Früh abschließen, solange gesund","Bedingungen genau vergleichen"],
 prem:"Vertiefung: Warum die gesetzliche Absicherung selten reicht, wie hoch die BU-Rente sein sollte und worauf es bei den Bedingungen ankommt. Inklusive interaktivem Rechner."},

{id:"quadratmeter",k:"wohnen",a:[18,99],s:["Erste Wohnung","Hauskauf"],t:"Miete pro Quadratmeter und Mietspiegel",
 kurz:"Der Quadratmeterpreis macht Mieten vergleichbar – und zeigt, ob eine Wohnung teuer ist. Mit Mietspiegel und Mietpreisbremse lässt sich eine überhöhte Miete erkennen.",
 p:["Der Quadratmeterpreis (Kaltmiete geteilt durch Wohnfläche) macht unterschiedliche Wohnungen vergleichbar.","Referenz ist der qualifizierte Mietspiegel der Stadt – er bildet die ortsübliche Vergleichsmiete ab.","In angespannten Lagen begrenzt die Mietpreisbremse die Neuvertragsmiete auf ortsüblich plus zehn Prozent.","Lage, Baujahr, Ausstattung und Möblierung erklären Abweichungen – der reine Wert ist nur ein Anhaltspunkt.","Bei deutlich überhöhter Miete lohnt eine Rüge gegenüber dem Vermieter, gestützt auf den Mietspiegel."],
 c:["Eigenen Quadratmeterpreis berechnen","Mit dem örtlichen Mietspiegel vergleichen","Mietpreisbremse in angespannten Lagen prüfen","Bei Überhöhung schriftlich rügen"],
 prem:"Vertiefung: Wie der Quadratmeterpreis hilft, was der Mietspiegel leistet und wie die Mietpreisbremse wirkt. Inklusive interaktivem Rechner."},

{id:"heizen",k:"wohnen",a:[18,99],s:["Erste Wohnung","Hauskauf"],t:"Heizkosten verstehen und senken",
 kurz:"Heizen ist der größte Energieposten im Haushalt. Wer den Verbrauch kennt und ein paar Gewohnheiten ändert, spart spürbar – ganz ohne zu frieren.",
 p:["Heizenergie wird meist in Kilowattstunden abgerechnet; Verbrauch mal Preis plus Grundpreis ergibt die Kosten.","Die Raumtemperatur ist der größte Hebel: je Grad weniger rund sechs Prozent Einsparung.","Stoßlüften statt gekippter Fenster spart Energie und beugt Schimmel vor.","Freie Heizkörper, Nachtabsenkung und entlüftete Heizungen wirken sofort – ganz ohne Investition.","Ein hydraulischer Abgleich verteilt die Wärme gleichmäßig und senkt den Verbrauch dauerhaft."],
 c:["Jahresverbrauch in kWh von der Abrechnung ablesen","Raumtemperatur bewusst um 1 °C senken","Stoßlüften statt Dauerkippen","Heizkörper frei halten und entlüften"],
 prem:"Vertiefung: Wie sich Heizkosten zusammensetzen, wie viel jedes Grad bringt und welche Maßnahmen ohne Investition wirken. Inklusive interaktivem Rechner."},

{id:"dienstreise",k:"beruf",a:[18,67],s:["Berufseinstieg","Jobwechsel"],t:"Dienstreise: Verpflegungspauschale und Fahrtkosten",
 kurz:"Wer beruflich unterwegs ist, kann Verpflegung und Fahrt pauschal abrechnen – steuerfrei über den Arbeitgeber oder als Werbungskosten. Die Regeln sind einfacher als gedacht.",
 p:["Für Verpflegung gibt es feste Tagespauschalen, gestaffelt nach Abwesenheitsdauer.","Volle Reisetage (24 Stunden) zählen mehr als An- und Abreisetage.","Fahrtkosten mit dem eigenen Pkw lassen sich pauschal je Kilometer ansetzen.","Stellt der Arbeitgeber Mahlzeiten, wird die Pauschale gekürzt (Frühstück, Mittag, Abendessen).","Entweder erstattet der Arbeitgeber steuerfrei, oder man setzt die Beträge in der Steuererklärung an."],
 c:["Abwesenheitszeiten je Tag notieren","Volle und Teiltage unterscheiden","Gefahrene Kilometer dokumentieren","Mahlzeiten-Kürzungen berücksichtigen"],
 prem:"Vertiefung: Wie die Pauschalen gestaffelt sind, wie Fahrtkosten zählen und wann gekürzt wird. Inklusive interaktivem Rechner."},

{id:"mietminderung",k:"recht",a:[18,99],s:["Erste Wohnung","Trennung"],t:"Mietminderung bei Mängeln: was geht?",
 kurz:"Schimmel, kaputte Heizung, Dauerlärm: Bei echten Mängeln darf die Miete gemindert werden. Wichtig ist das richtige Vorgehen – sonst riskiert man den Anspruch.",
 p:["Ein Mangel, der die Nutzung der Wohnung erheblich beeinträchtigt, berechtigt zur Mietminderung.","Die Minderung bemisst sich an der Brutto-(Warm-)Miete, anteilig für die Tage des Mangels.","Voraussetzung ist die unverzügliche schriftliche Anzeige beim Vermieter mit Frist zur Beseitigung.","Die Höhe richtet sich nach Gerichtsurteilen – Heizungsausfall im Winter hoch, Kleinmangel gering.","Bei Streit helfen Mieterverein oder Anwalt; eigenmächtige Kürzungen ohne Anzeige sind riskant."],
 c:["Mangel dokumentieren (Fotos, Datum)","Vermieter unverzüglich schriftlich informieren","Frist zur Beseitigung setzen","Quote an Vergleichsfällen orientieren"],
 prem:"Vertiefung: Wann ein Mangel zur Minderung berechtigt, wie hoch gemindert werden darf und wie man richtig vorgeht. Inklusive interaktivem Rechner."},

{id:"ratenkredit",k:"finanzen",a:[18,99],s:["Schulden","Hauskauf"],t:"Ratenkredit: Rate, Zins und Gesamtkosten",
 kurz:"Ein Ratenkredit macht große Anschaffungen planbar – kostet aber Zinsen. Wer Rate, Laufzeit und Effektivzins versteht, vergleicht Angebote richtig und zahlt weniger.",
 p:["Die Monatsrate ergibt sich aus Kreditsumme, Zins und Laufzeit (Annuität).","Eine längere Laufzeit senkt die Rate, erhöht aber die gesamten Zinskosten deutlich.","Vergleichbar sind Angebote nur über den Effektivzins – er enthält Gebühren, der Nominalzins nicht.","Ein kostenloses Sondertilgungsrecht spart bei vorzeitiger Rückzahlung bares Geld.","Vorsicht bei Restschuldversicherungen und Mini-Raten – sie verteuern den Kredit oft erheblich."],
 c:["Rate und Gesamtkosten vorab durchrechnen","Immer den Effektivzins vergleichen","Laufzeit so kurz wie tragbar wählen","Sondertilgungsrecht vereinbaren"],
 prem:"Vertiefung: Wie sich die Rate berechnet, warum die Laufzeit so viel ausmacht und worauf man bei Angeboten achtet. Inklusive interaktivem Rechner."},

{id:"eauto",k:"wohnen",a:[18,99],s:["Hauskauf","Erste Wohnung"],t:"E-Auto laden: zu Hause oder öffentlich?",
 kurz:"Beim E-Auto entscheidet vor allem der Ladeort über die Kosten. Wer zu Hause lädt – am besten mit eigenem Strom – fährt deutlich günstiger als an der Schnellladesäule.",
 p:["Der Verbrauch wird in Kilowattstunden pro 100 Kilometer gemessen; mal Fahrleistung ergibt den Jahresbedarf.","Zu Hause laden ist meist klar günstiger als öffentlich – besonders mit PV-Anlage oder Nachttarif.","Öffentliche Preise schwanken stark; Ad-hoc-Laden ohne Vertrag ist am teuersten.","Eine Wallbox kostet in der Anschaffung, macht das Heimladen aber bequem und schnell.","Wärmepumpen- oder Autostromtarife können den Heimstrom zusätzlich verbilligen."],
 c:["Jahresverbrauch aus kWh/100 km und Fahrleistung schätzen","Heim- gegen öffentliche Ladekosten vergleichen","Wallbox-Anschaffung einrechnen","Günstige Lade-/Autostromtarife prüfen"],
 prem:"Vertiefung: Wie sich die Ladekosten berechnen, warum Heimladen meist gewinnt und was die Wallbox kostet. Inklusive interaktivem Rechner."},

/* ---------- NEU: interaktive Artikel (Charge B) ---------- */
{id:"auto",k:"finanzen",a:[18,99],s:["Berufseinstieg","Hauskauf"],t:"Auto: kaufen, leasen und die wahren Kosten",
 kurz:"Ein Auto kostet weit mehr als Sprit und Kaufpreis. Wer Wertverlust, Versicherung und Wartung mitrechnet, trifft die ehrlichere Entscheidung – und merkt oft, dass weniger Auto reicht.",
 p:["Die größte Kostenstelle ist meist der Wertverlust, nicht der Kraftstoff – vor allem in den ersten Jahren.","Vollkosten heißt: Kaufpreis (verteilt), Sprit, Versicherung, Steuer, Wartung, Reifen, TÜV, Parken.","Leasing wirkt günstig, bindet aber mit Raten und Kilometergrenzen; am Ende gehört das Auto nicht einem.","Gebraucht statt neu spart den steilsten Wertverlust – die ersten Jahre übernimmt der Erstkäufer.","Bei geringer Fahrleistung sind Carsharing, Bahn und Mietwagen für Einzelfahrten oft insgesamt billiger."],
 c:["Vollkosten pro Monat ehrlich ausrechnen","Fahrleistung prüfen: Lohnt sich ein eigenes Auto überhaupt?","Neu vs. jung gebraucht vergleichen","Versicherung jährlich neu vergleichen"],
 prem:"Vertiefung: Welche Posten in die Vollkosten gehören, warum der Wertverlust dominiert und wann der Verzicht aufs Auto rechnet. Inklusive interaktivem Rechner."},

{id:"pendeln",k:"beruf",a:[18,67],s:["Berufseinstieg","Jobwechsel"],t:"Pendeln: Auto, ÖPNV und die Pendlerpauschale",
 kurz:"Der Arbeitsweg frisst Zeit und Geld. Ein nüchterner Vergleich von Auto und ÖPNV – samt steuerlicher Pendlerpauschale – zeigt, was wirklich günstiger ist.",
 p:["Pendeln ist ein großer, oft unterschätzter Kostenblock – und ein Lebenszeitfresser.","Im Auto-Vergleich werden meist nur die Spritkosten gesehen; Wertverlust und Verschleiß kommen obendrauf.","Das Deutschlandticket hat den ÖPNV-Vergleich für viele Strecken stark verändert.","Die Entfernungspauschale mindert die Steuer – unabhängig vom Verkehrsmittel, ab dem 21. Kilometer erhöht.","Auch Zeit zählt: Pendelzeit lässt sich im Zug nutzen, am Steuer kaum."],
 c:["Auto-Spritkosten und ÖPNV-Ticket pro Monat gegenüberstellen","Entfernungspauschale für die Steuer ansetzen","Deutschlandticket/Jobticket prüfen","Pendelzeit in die Entscheidung einrechnen"],
 prem:"Vertiefung: Auto- gegen ÖPNV-Kosten, wie die Entfernungspauschale wirkt und welche Rolle die Zeit spielt. Inklusive interaktivem Rechner."},

{id:"stromtarif",k:"wohnen",a:[18,99],s:["Erste Wohnung","Hauskauf"],t:"Stromtarif verstehen und Anbieter wechseln",
 kurz:"Strom ist teurer geworden – und doch zahlen viele zu viel, weil sie in der Grundversorgung hängen. Wer Verbrauch und Preis kennt, wechselt in Minuten und spart spürbar.",
 p:["Der Strompreis besteht aus Arbeitspreis (pro kWh) und Grundpreis (pro Monat) – beides zählt.","Die Grundversorgung ist bequem, aber meist teurer als ein Sondertarif beim selben oder anderen Anbieter.","Der Abschlag ist nur eine Vorauszahlung; zu hoch angesetzt verschenkt man zinslos Geld.","Beim Wechsel auf Kündigungsfrist, Preisgarantie und einmalige Boni achten (die im Folgejahr wegfallen).","Der größte Hebel bleibt der Verbrauch selbst: alte Geräte, Standby und Warmwasser über Strom."],
 c:["Jahresverbrauch (kWh) von der letzten Rechnung ablesen","Arbeits- und Grundpreis mit einem Sondertarif vergleichen","Abschlag realistisch einstellen","Wechsel-Bonus und Folgepreis im Blick behalten"],
 prem:"Vertiefung: Wie sich der Strompreis zusammensetzt, wie viel ein Wechsel bringt und worauf man bei Tarifen achten muss. Inklusive interaktivem Rechner."},

{id:"handyvertrag",k:"wohnen",a:[14,99],s:["Erste Wohnung","Berufseinstieg"],t:"Handy- und Internetvertrag: Kosten und Fallen",
 kurz:"Im gebündelten Handytarif steckt das Gerät oft als versteckter Ratenkredit. Getrennt gerechnet – SIM-only plus eigenes Gerät – ist meist deutlich günstiger.",
 p:["Tarife mit Gerät verteilen den Kaufpreis auf die Monatsrate – oft teurer als ein Einzelkauf.","SIM-only-Tarife sind flexibel und günstig; das Gerät kauft man separat, gern gebraucht oder als Vorjahresmodell.","Je länger man ein Handy nutzt, desto niedriger die Kosten pro Monat – Langlebigkeit schlägt jedes Angebot.","Auf Vertragslaufzeit, automatische Verlängerung und Datenvolumen achten; vieles wird nie gebraucht.","Beim Internet zu Hause Bandbreite realistisch wählen – das schnellste Paket ist selten nötig."],
 c:["Bündel- gegen Getrennt-Variante über die Laufzeit rechnen","Datenvolumen am echten Bedarf ausrichten","Kündigungsfrist und Verlängerung notieren","Gerät länger nutzen statt jährlich wechseln"],
 prem:"Vertiefung: Warum das Bündel oft teurer ist, wie man Tarife ehrlich vergleicht und welche Vertragsfallen lauern. Inklusive interaktivem Rechner."},

{id:"jobrad",k:"beruf",a:[18,67],s:["Berufseinstieg","Jobwechsel"],t:"Dienstrad-Leasing (JobRad): lohnt es sich?",
 kurz:"Über Gehaltsumwandlung wird das Rad aus dem Brutto bezahlt – das spart Steuern und Abgaben. Ob es günstiger ist als der Direktkauf, hängt vom Steuersatz und der Nutzung ab.",
 p:["Beim Dienstrad-Leasing wird die Rate vom Bruttogehalt einbehalten – dadurch sinkt die Steuer- und Abgabenlast.","Der geldwerte Vorteil wird nur mit 0,25 Prozent versteuert – der Effekt ist gering.","Am Ende der Laufzeit kann man das Rad günstig übernehmen (Restwert).","Der Vorteil wächst mit dem persönlichen Steuersatz; bei niedrigem Einkommen ist er kleiner.","Gehaltsumwandlung senkt minimal spätere Lohnersatzleistungen (Kranken-, Elterngeld) – meist vernachlässigbar."],
 c:["Netto-Belastung der Rate abschätzen","Mit dem Direktkaufpreis vergleichen","Restwert/Übernahme klären","Nur für ein Rad, das wirklich genutzt wird"],
 prem:"Vertiefung: Wie die Gehaltsumwandlung wirkt, wann sich JobRad rechnet und worauf man bei Übernahme und Versicherung achtet. Inklusive interaktivem Rechner."},

{id:"urlaubsanspruch",k:"beruf",a:[16,67],s:["Berufseinstieg","Jobwechsel"],t:"Urlaubsanspruch: wie viele Tage stehen mir zu?",
 kurz:"Das Bundesurlaubsgesetz sichert ein Minimum, viele Verträge geben mehr. Bei Teilzeit und unterjährigem Ein- oder Austritt wird anteilig gerechnet – hier die Regeln.",
 p:["Gesetzliches Minimum: vier Wochen pro Jahr – bei 5-Tage-Woche also 20, bei 6 Tagen 24 Arbeitstage.","Teilzeit ändert die Zahl der Urlaubstage, nicht die freien Wochen – wer weniger Tage arbeitet, hat entsprechend weniger Tage.","Im Ein- und Austrittsjahr wird pro Monat ein Zwölftel gerechnet.","Resturlaub verfällt grundsätzlich zum Jahresende – es sei denn, der Arbeitgeber hat nicht auf den Verfall hingewiesen.","Krankheitstage im Urlaub zählen mit Attest nicht als Urlaub."],
 c:["Vertraglichen Urlaubsanspruch nachlesen (oft über dem Minimum)","Teilzeit-Anspruch korrekt umrechnen","Im Wechseljahr anteilig rechnen","Resturlaub rechtzeitig nehmen oder Übertrag klären"],
 prem:"Vertiefung: Wie Teilzeit und unterjähriger Wechsel den Anspruch verändern und wann Urlaub verfällt. Inklusive interaktivem Rechner."},

{id:"minijob",k:"beruf",a:[15,99],s:["Berufseinstieg","Ausbildung wählen"],t:"Minijob und Midijob: Grenzen, Stunden, Steuern",
 kurz:"Der Minijob bleibt für Beschäftigte meist steuer- und abgabenfrei – aber die Verdienstgrenze ist hart. Wer sie kennt, plant die Stunden richtig und sichert sich Rentenpunkte.",
 p:["Die Minijob-Grenze ist an den Mindestlohn gekoppelt und steigt mit ihm.","Der Lohn ist für die Beschäftigten in der Regel steuer- und sozialabgabenfrei.","Wichtig: die Rentenversicherungspflicht nicht abwählen – der geringe Eigenanteil bringt vollen Schutz und Punkte.","Wer mehrere Minijobs hat, addiert die Verdienste – die Grenze gilt insgesamt.","Über der Grenze beginnt der Midijob-Übergang mit reduzierten, langsam steigenden Beiträgen."],
 c:["Maximale Stunden bei der aktuellen Grenze berechnen","Mehrere Minijobs zusammenrechnen","Rentenversicherung NICHT befreien lassen","Bei mehr Verdienst Midijob-Regeln prüfen"],
 prem:"Vertiefung: Wie Grenze, Stunden und Beiträge zusammenhängen und warum sich Rentenpunkte lohnen. Inklusive interaktivem Rechner."},

{id:"mietkaution",k:"wohnen",a:[18,99],s:["Erste Wohnung","Trennung"],t:"Mietkaution: Höhe, Anlage und Rückzahlung",
 kurz:"Die Kaution darf höchstens drei Kaltmieten betragen und ist in drei Raten zahlbar. Sie muss getrennt und verzinst angelegt werden – die Zinsen stehen dir zu.",
 p:["Höchstbetrag: drei Nettokaltmieten – mehr darf der Vermieter nicht verlangen.","Zahlbar in drei Monatsraten; die erste zu Mietbeginn, nicht alles auf einmal.","Der Vermieter muss die Kaution getrennt vom eigenen Vermögen und verzinst anlegen.","Nach dem Auszug wird zügig zurückgezahlt; ein angemessener Teil darf bis zur Nebenkostenabrechnung einbehalten werden.","Alternativen wie Kautionsbürgschaften sind bequem, aber laufende Kosten – meist lohnt das Ansparen mehr."],
 c:["Verlangte Kaution gegen drei Kaltmieten prüfen","Auf Ratenzahlung bestehen, wenn nötig","Getrennte, verzinste Anlage einfordern","Übergabeprotokoll für die Rückzahlung aufheben"],
 prem:"Vertiefung: Was erlaubt ist, wie die Anlage funktioniert und wie die Rückzahlung abläuft. Inklusive interaktivem Rechner."},

{id:"bahncard",k:"freizeit",a:[14,99],s:["Berufseinstieg","Ruhestand"],t:"BahnCard: ab wann lohnt sie sich?",
 kurz:"Die BahnCard rechnet sich rein über die Ersparnis: Sobald der Rabatt den Kartenpreis übersteigt, sparst du. Bei wenigen Fahrten reichen oft Sparpreise.",
 p:["Die BahnCard 25 und 50 geben feste Rabatte auf den Fahrpreis – 25 bzw. 50 Prozent.","Lohnen tut sie sich, sobald die Summe der Rabatte den Kartenpreis übersteigt.","Vielfahrer erreichen den Break-even schnell; Gelegenheitsfahrer kommen mit Sparpreisen oft günstiger.","Achtung: Die BahnCard verlängert sich automatisch – rechtzeitig kündigen.","Prüfe Jobticket und Deutschlandticket als Grundlage – in Kombination kann das günstiger sein."],
 c:["Geplante Bahn-Ausgaben pro Jahr schätzen","Break-even mit dem Kartenpreis abgleichen","Automatische Verlängerung im Kalender markieren","Deutschlandticket/Jobticket gegenrechnen"],
 prem:"Vertiefung: Wie sich der Break-even berechnet, wann sich BC25 vs. BC50 lohnt und welche Tickets man kombiniert. Inklusive interaktivem Rechner."},

{id:"festgeld",k:"finanzen",a:[18,99],s:["Berufseinstieg","Ruhestand"],t:"Tagesgeld und Festgeld: Zinsen clever nutzen",
 kurz:"Für den Notgroschen und kurzfristige Ziele sind Tages- und Festgeld ideal: sicher und planbar. Mit Sparerpauschbetrag und Einlagensicherung holt man das Beste heraus.",
 p:["Tagesgeld ist täglich verfügbar, Festgeld bringt für feste Laufzeiten meist etwas mehr Zins.","Auf Zinserträge fällt Abgeltungsteuer an – bis zum Sparerpauschbetrag bleibt es steuerfrei.","Den Freistellungsauftrag bei der Bank nicht vergessen, sonst wird zu viel Steuer einbehalten.","Sicherheit: die gesetzliche Einlagensicherung greift bis 100.000 Euro je Bank – größere Summen splitten.","Zins schlägt selten die Inflation – für langfristiges Sparen sind Sachwerte besser geeignet."],
 c:["Notgroschen aufs Tagesgeld legen","Freistellungsauftrag einrichten","Bei großen Summen auf mehrere Banken verteilen","Festgeld nur für fest planbare Zeiträume"],
 prem:"Vertiefung: Wie Zins, Steuer und Einlagensicherung zusammenwirken und wofür sich Tages- und Festgeld eignen. Inklusive interaktivem Rechner."},

/* ---------- NEU: interaktive Artikel ---------- */
{id:"inflation",k:"finanzen",a:[16,99],s:["Berufseinstieg","Schulden"],t:"Inflation: was dein Geld morgen noch wert ist",
 kurz:"Inflation knabbert leise an Erspartem: Was heute 100 Euro kauft, kostet in zwanzig Jahren deutlich mehr. Wer das versteht, legt Geld anders an und hortet weniger auf dem Konto.",
 p:["Inflation bedeutet: Die gleiche Geldsumme kauft mit der Zeit weniger. Ein Ziel von rund 2 Prozent jährlich gilt als normal.","Geld auf dem Giro- oder Sparkonto verliert real an Wert, wenn der Zins unter der Inflation liegt – das ist meist der Fall.","Sachwerte (breit gestreute Aktien, Immobilien) gleichen Inflation langfristig eher aus als reines Bargeld.","Auch Schulden mit festem Zins werden durch Inflation real leichter – das Gehalt steigt, die Rate bleibt.","Die persönliche Inflation kann abweichen: Wer viel Miete oder Energie zahlt, spürt sie stärker als der Durchschnitt."],
 c:["Notgroschen ja – aber darüber hinaus nicht alles auf dem Konto parken","Sparzins mit der aktuellen Inflationsrate vergleichen","Langfristiges Sparen breit gestreut anlegen statt horten","Bei Festzins-Krediten Sondertilgung nicht überstürzen"],
 prem:"Vertiefung: Wie der Zinseszins der Inflation wirkt, eine Kaufkraft-Tabelle über 30 Jahre und die nötige Nettorendite zum Werterhalt. Inklusive interaktivem Rechner."},

{id:"dispo",k:"finanzen",a:[18,99],s:["Schulden","Berufseinstieg"],t:"Teure Kredite erkennen: Dispo, Raten und Umschuldung",
 kurz:"Der Dispo ist bequem – und einer der teuersten Kredite überhaupt. Wer dauerhaft im Minus steht, spart mit einer Umschuldung oft mehrere hundert Euro im Jahr.",
 p:["Der Dispokredit ist für kurze Überbrückung gedacht, nicht als Dauerzustand – die Zinsen liegen weit über denen eines Ratenkredits.","Ein dauerhaft genutzter Dispo kostet schnell mehrere hundert Euro Zinsen pro Jahr, oft unbemerkt.","Lösung: den Minusbetrag in einen Ratenkredit mit fester Laufzeit umschulden und den Dispo danach nur noch als Brücke nutzen.","Zinssätze sind verhandelbar – ein Anruf bei der Bank oder ein Vergleich kann die Rate spürbar senken.","Vorsicht bei Null-Prozent-Finanzierungen und Mini-Raten: Sie verleiten zu Käufen, die man sich sonst nicht leisten würde."],
 c:["Kontoauszug prüfen: Wie oft und wie tief im Dispo?","Dispo-Zins der eigenen Bank heraussuchen","Bei Dauer-Minus: Umschuldungsangebot einholen","Ratenkredite nur mit klarem Ende und Sondertilgungsrecht"],
 prem:"Vertiefung: Die Kreditarten nach Kosten sortiert, der Umschuldungs-Fahrplan und worauf man bei Ratenkrediten achten muss. Inklusive interaktivem Rechner."},

{id:"homeoffice",k:"beruf",a:[18,67],s:["Berufseinstieg","Jobwechsel"],t:"Homeoffice: Recht, Steuer-Pauschale und Ausstattung",
 kurz:"Mobiles Arbeiten ist Verhandlungssache, kein Selbstläufer. Was rechtlich gilt, was die Homeoffice-Pauschale bringt und wie ein gesunder Arbeitsplatz zu Hause aussieht.",
 p:["Einen generellen Rechtsanspruch auf Homeoffice gibt es nicht – es wird zwischen Beschäftigten und Arbeitgeber vereinbart.","Steuerlich gibt es die Homeoffice-Pauschale pro Tag, auch ohne separates Arbeitszimmer – das senkt die Steuerlast.","Auch im Homeoffice gelten Arbeitszeitgesetz und Arbeitsschutz: Pausen, Höchstarbeitszeit und Erreichbarkeitsgrenzen bleiben.","Ein guter Arbeitsplatz spart Rückenschmerzen: Stuhl, Tischhöhe, Bildschirm auf Augenhöhe, Licht von der Seite.","Klare Trennung von Arbeit und Freizeit (fester Platz, fester Feierabend) schützt vor Dauer-Erreichbarkeit."],
 c:["Homeoffice-Regelung schriftlich festhalten (Tage, Erreichbarkeit)","Arbeitstage für die Steuer-Pauschale notieren","Arbeitsplatz ergonomisch einrichten","Feierabend-Ritual etablieren – Gerät bewusst weglegen"],
 prem:"Vertiefung: Was die Homeoffice-Pauschale bringt und wo ihre Grenzen liegen, die Ergonomie-Basics und die Abgrenzung zur Entfernungspauschale. Inklusive interaktivem Rechner."},

{id:"solar",k:"wohnen",a:[18,99],s:["Erste Wohnung","Hauskauf"],t:"Balkonkraftwerk: lohnt sich die Mini-Solaranlage?",
 kurz:"Eine Steckersolaranlage ist in Stunden montiert und seit den Erleichterungen auch für Mietende leicht möglich. Ob sie sich rechnet, hängt vor allem vom Eigenverbrauch ab.",
 p:["Ein Balkonkraftwerk speist Strom über eine Steckdose ins Hausnetz – genutzt wird er sofort von laufenden Geräten.","Nur der selbst verbrauchte Strom spart Geld; Überschuss, der ins Netz geht, wird in der Regel nicht vergütet.","Der Eigenverbrauch steigt mit der Grundlast (Kühlschrank, Router) und cleverem Timing tagsüber (Wasch-, Spülmaschine).","Anmeldung im Marktstammdatenregister ist Pflicht, aber unkompliziert; die Bürokratie wurde stark vereinfacht.","Mietende und Eigentümer in einer Gemeinschaft haben inzwischen einen Anspruch auf Zustimmung zur Montage."],
 c:["Standort mit möglichst viel Sonne prüfen (Süd, wenig Schatten)","Eigenverbrauch realistisch einschätzen (wer ist tagsüber da?)","Im Marktstammdatenregister anmelden","Bei Miete/WEG: Zustimmung einholen"],
 prem:"Vertiefung: Wie Eigenverbrauch und Strompreis die Amortisation bestimmen, was Anmeldung und Zustimmung erfordern und welche Fehler den Ertrag schmälern. Inklusive interaktivem Rechner."},

{id:"schlaf",k:"gesundheit",a:[14,99],s:["Berufseinstieg","Krankheit"],t:"Gesunder Schlaf: Rhythmus, Routinen und Schlaffenster",
 kurz:"Guter Schlaf ist kein Luxus, sondern Grundlage von Konzentration, Stimmung und Gesundheit. Mit festen Zeiten und ein paar Routinen lässt er sich gezielt verbessern.",
 p:["Erwachsene brauchen meist sieben bis neun Stunden – der Bedarf ist individuell, aber selten unter sechs.","Der stärkste Hebel ist eine feste Aufstehzeit, auch am Wochenende; sie stabilisiert die innere Uhr.","Schlaf läuft in Zyklen von rund 90 Minuten; am Ende eines Zyklus aufzuwachen fällt leichter.","Bildschirme, Koffein am Nachmittag und Alkohol am Abend stören die Schlafqualität, auch wenn man einschläft.","Bei anhaltenden Ein- oder Durchschlafproblemen über Wochen lohnt eine ärztliche Abklärung."],
 c:["Feste Aufsteh- und Zubettgeh-Zeit einhalten","Letzte Stunde vor dem Schlaf bildschirmarm gestalten","Koffein nach dem frühen Nachmittag meiden","Schlafzimmer dunkel, kühl und ruhig halten"],
 prem:"Vertiefung: Wie Schlafzyklen das Aufwachen beeinflussen, eine Routine für besseren Schlaf und wann ärztliche Hilfe sinnvoll ist. Inklusive interaktivem Rechner."},
  {id:"einrichtungslehre",k:"wohnen",a:[18,99],s:["Einrichtung","Möbel","Wohnzimmer","Schlafzimmer","Licht","Flow","Zonierung"],t:"Einrichten nach Plan — interaktiv",kurz:"Welche Möbel in welchen Raum, wie Wege frei bleiben und wie Licht in drei Ebenen wirkt — mit interaktivem 3D-Test, in dem du es selbst nachbaust.",url:"studio-einrichtungstheorie.html",interaktiv:true},
/* ---------- BILDUNG & LERNEN ---------- */
{id:"abschluesse",k:"bildung",a:[14,20],s:["Schulabschluss"],t:"Schulabschlüsse & die Wege danach",
 kurz:"Hauptschulabschluss, mittlerer Abschluss, Fachhochschulreife, Abitur — jeder Abschluss öffnet bestimmte Türen, und fast jeder lässt sich später nachholen.",
 p:["Der mittlere Schulabschluss ist Mindestvoraussetzung für viele Ausbildungen, das (Fach-)Abitur für ein Studium.","Abschlüsse können am zweiten Bildungsweg nachgeholt werden: Abendschule, Kolleg, Fernlehrgang, externe Prüfung.","Auch ohne Abitur ist ein Studium möglich — etwa mit Meistertitel oder mehrjähriger Berufserfahrung plus Eignungsprüfung.","Berufsorientierung früh starten: Praktika, Berufsberatung der Agentur für Arbeit, Schnuppertage, Gespräche mit Berufstätigen.","Notenpanik relativieren: Für Arbeitgeber zählen nach wenigen Jahren Praxis vor allem Erfahrung und Haltung."],
 c:["Zeugnisse digital sichern und Originale sicher ablegen","Mind. 2 Praktika in unterschiedlichen Feldern machen","Termin bei der Berufsberatung vereinbaren","Plan B notieren: Was, wenn der Wunschweg nicht klappt?"],
 prem:"Vertiefung: Übersicht aller Nachhol-Wege je Bundesland, Musterzeitplan für das letzte Schuljahr (Bewerbungsfristen für Ausbildung beginnen oft 12–18 Monate vorher) und ein Selbsttest mit 20 Fragen zur Studien- vs. Ausbildungsneigung."},

{id:"ausb_studium",k:"bildung",a:[15,25],s:["Ausbildung wählen","Schulabschluss"],t:"Ausbildung oder Studium — die Weichenstellung",
 kurz:"Beide Wege führen zu guten Karrieren. Die Ausbildung bringt früh Gehalt und Praxis, das Studium mehr Spezialisierungs- und Verdienstspielraum — entscheidend ist der Mensch, nicht das Prestige.",
 p:["Duale Ausbildung: 2–3,5 Jahre, Vergütung ab dem ersten Tag, hohe Übernahmequoten, später Aufstieg über Meister/Techniker/Fachwirt.","Studium: 3 Jahre Bachelor + ggf. 2 Jahre Master; akademische Berufe (Medizin, Jura, Lehramt, Ingenieurwesen) führen nur hierüber.","Duales Studium kombiniert beides: Gehalt + Hochschulabschluss, dafür hohe Belastung und frühe Bindung an einen Arbeitgeber.","Entscheidungskriterien: Lernt man lieber praktisch oder theoretisch? Wie wichtig ist frühes eigenes Geld? Welche Berufe begeistern wirklich?","Nichts ist endgültig: Studienabbrecher sind in Ausbildungen gefragt, Gesellen können später studieren."],
 c:["3 Berufsbilder im Detail recherchieren (Alltag, Gehalt, Perspektive)","Je 1 Praktikum/Probetag in Praxis- und Theorie-Richtung","Bewerbungsfristen notieren (Ausbildung: oft Sommer/Herbst des Vorjahres)","Mit 2 Menschen sprechen, die den jeweiligen Weg gegangen sind"],
 prem:"Vertiefung: Gehaltsvergleich nach 10 Berufsjahren für 12 typische Berufe, Entscheidungsmatrix als ausfüllbare Vorlage und die häufigsten 5 Denkfehler bei der Berufswahl."},

{id:"studienfin",k:"bildung",a:[17,28],s:["Ausbildung wählen","Erste Wohnung"],t:"Studienfinanzierung: BAföG, Jobs, Stipendien",
 kurz:"Ein Studium kostet je nach Stadt 700–1.300 € im Monat. Die Finanzierung steht meist auf mehreren Beinen: BAföG, Nebenjob, Eltern, Stipendien — in dieser Reihenfolge prüfen.",
 p:["BAföG immer beantragen, auch wenn es knapp aussieht: Die Hälfte ist Zuschuss, die Darlehenshälfte ist zinslos und gedeckelt.","Stipendien sind keine Elite-Sache: Viele Förderwerke suchen Engagement, nicht nur Bestnoten; die Bewerbungsquoten sind oft niedrig.","Werkstudentenjobs (bis 20 Std./Woche im Semester) bringen Geld plus Berufserfahrung im eigenen Fach.","Minijob-Grenze und BAföG-Freibeträge beachten, sonst drohen Rückforderungen.","Studienkredite nur als letzte Option — Zinsen laufen, Rückzahlung beginnt früh."],
 c:["BAföG-Antrag vor Semesterbeginn stellen (dauert Wochen)","Stipendien-Datenbanken durchsuchen und 2 Bewerbungen abschicken","Semesterticket, GEZ-Befreiung und Studierendenrabatte aktivieren","Monatsbudget aufstellen: Miete, Essen, Versicherung, Puffer"],
 prem:"Vertiefung: BAföG-Rechenbeispiel mit Elterneinkommen, Liste der 13 großen Begabtenförderwerke mit Anforderungsprofilen sowie Steuer-Basics für Werkstudenten (Lohnsteuer zurückholen)."},

{id:"weiterbildung",k:"bildung",a:[20,65],s:["Jobwechsel","Jobverlust"],t:"Weiterbildung & lebenslanges Lernen",
 kurz:"Wissen veraltet schneller als je zuvor. Wer pro Jahr gezielt ein Kompetenzfeld ausbaut, bleibt beschäftigungsfähig — oft sogar auf Kosten des Arbeitgebers oder des Staates.",
 p:["Förderinstrumente kennen: Bildungsurlaub (in den meisten Bundesländern 5 Tage/Jahr), Aufstiegs-BAföG, Bildungsgutschein der Arbeitsagentur, Qualifizierungschancengesetz.","Formale Abschlüsse (Meister, Fachwirt, Zertifikate) zahlen sich bei Gehalt und Aufstieg messbar aus.","Informelles Lernen zählt ebenso: Fachbücher, Online-Kurse, Podcasts, Konferenzen — dokumentieren und im Lebenslauf nutzen.","Jährliches Lernziel setzen und mit dem Arbeitgeber im Mitarbeitergespräch verhandeln.","Lernen lernen: Spaced Repetition, aktive Anwendung und Lehren des Gelernten schlagen passives Konsumieren."],
 c:["1 Kompetenzlücke identifizieren, die im eigenen Feld wächst","Förderanspruch prüfen (Bildungsurlaub, Zuschüsse)","Weiterbildung mit Zertifikat oder Projektnachweis wählen","Gelerntes binnen 4 Wochen praktisch anwenden"],
 prem:"Vertiefung: Übersicht aller staatlichen Förderungen mit Voraussetzungen, Vorlage für den Weiterbildungs-Antrag beim Arbeitgeber und ein 12-Monats-Lernplan-Template."},

{id:"privatbildung",k:"bildung",a:[16,100],s:[],t:"Private Bildung: Allgemeinwissen, Sprachen, Geldverstand",
 kurz:"Privates Lernen — abseits von Schule und Job — ist der stille Hebel für ein selbstbestimmtes Leben: Es verbessert Urteilskraft, Gespräche, Finanzen und Gesundheit.",
 p:["Ein Grundkanon trägt durchs Leben: Finanz-Grundwissen, Gesundheitskompetenz, digitale Mündigkeit, Geschichte/Politik für die Einordnung von Nachrichten.","Lesen ist der günstigste Bildungsweg: 20 Minuten täglich ergeben rund 12–20 Bücher pro Jahr; Bibliotheksausweise kosten fast nichts.","Sprachen, Instrumente oder Programmieren lernt man als Erwachsener langsamer, aber zuverlässig — Konstanz schlägt Talent.","Volkshochschulen bieten qualitätsgesicherte Kurse zu sehr niedrigen Preisen, von Rhetorik bis Steuererklärung.","Medienkompetenz pflegen: Quellen prüfen, Statistiken hinterfragen, eigene Filterblasen bewusst durchbrechen."],
 c:["Bibliotheksausweis besorgen","Festen Lese-/Lernslot im Kalender blocken (20 Min/Tag)","1 VHS-Kurs pro Jahr belegen","Jährlich 1 Thema wählen, das man bewusst „erwachsen“ beherrschen will"],
 prem:"Vertiefung: Der Lebenswissen-Lesekanon (30 Bücher für die Lebenspraxis, thematisch sortiert) plus Methodenvergleich: Anki, Lerntagebuch, Feynman-Technik."},

/* ---------- BERUF & KARRIERE ---------- */
{id:"bewerbung",k:"beruf",a:[16,60],s:["Berufseinstieg","Jobwechsel","Jobverlust"],t:"Bewerbung: Lebenslauf & Anschreiben, die wirken",
 kurz:"Personaler entscheiden in unter einer Minute. Ein klar strukturierter, auf die Stelle zugeschnittener Lebenslauf ist wichtiger als jedes kreative Design.",
 p:["Lebenslauf: maximal 2 Seiten, antichronologisch, mit messbaren Ergebnissen („Umsatz +15 %“ statt „war zuständig für“).","Auf jede Stelle zuschneiden: Schlüsselbegriffe aus der Anzeige aufgreifen — auch wegen automatischer Vorfilter (ATS).","Anschreiben kurz (max. 1 Seite): Warum diese Firma, warum ich, was bringe ich konkret mit.","Lücken nicht verstecken, sondern neutral benennen (Orientierung, Pflege, Weiterbildung).","Online-Profil pflegen: LinkedIn/XING aktuell halten; viele Stellen werden über Netzwerke vergeben, bevor sie ausgeschrieben sind."],
 c:["Master-Lebenslauf pflegen und je Bewerbung kürzen","Rechtschreibung von einer zweiten Person prüfen lassen","Professionelles Foto oder bewusst ohne (zulässig)","Eigene Online-Präsenz googeln und aufräumen"],
 prem:"Vertiefung: 3 Lebenslauf-Vorlagen (klassisch, Tech, Quereinstieg), Formulierungs-Baukasten für Erfolge sowie eine Checkliste „ATS-sicher bewerben“."},

{id:"vorstellung",k:"beruf",a:[16,60],s:["Berufseinstieg","Jobwechsel"],t:"Das Vorstellungsgespräch souverän meistern",
 kurz:"Ein Vorstellungsgespräch ist keine Prüfung, sondern ein beidseitiges Kennenlernen. Vorbereitung auf 6–8 Standardfragen deckt 80 % jedes Gesprächs ab.",
 p:["Dauerbrenner vorbereiten: Selbstvorstellung (2 Min), Stärken/Schwächen, Wechselmotiv, Gehaltsvorstellung, „Wo sehen Sie sich in 5 Jahren?“.","STAR-Methode für Beispiele: Situation, Task, Action, Result — konkrete Geschichten überzeugen mehr als Adjektive.","Unternehmen recherchieren: Produkte, Zahlen, Kultur; 2–3 eigene kluge Rückfragen mitbringen.","Unzulässige Fragen (Schwangerschaft, Religion, Parteizugehörigkeit) müssen nicht wahrheitsgemäß beantwortet werden.","Nachfassen: Kurze Dank-Mail binnen 24 Stunden hält den Kontakt warm."],
 c:["Antworten auf die 8 Standardfragen laut üben","Gehaltsspanne mit Marktdaten festlegen","Outfit, Anfahrt/Technik-Check am Vortag klären","2 Rückfragen notieren, die echtes Interesse zeigen"],
 prem:"Vertiefung: 25 reale Interviewfragen mit Musterantworten nach STAR, Verhandlungs-Skript für die Gehaltsfrage und Sonderteil Video-Interviews."},

{id:"arbeitsvertrag",k:"beruf",a:[16,67],s:["Berufseinstieg","Jobwechsel"],t:"Den Arbeitsvertrag verstehen, bevor man unterschreibt",
 kurz:"Ein Arbeitsvertrag regelt Jahre Ihres Lebens. Fünf Klauseln entscheiden über Geld, Freiheit und Absicherung — und sind vor der Unterschrift verhandelbar, danach kaum noch.",
 p:["Kernpunkte prüfen: Gehalt (inkl. Sonderzahlungen), Wochenstunden, Urlaubstage (gesetzlich min. 20 bei 5-Tage-Woche, üblich 26–30), Probezeit, Kündigungsfristen.","Befristung checken: Ohne Sachgrund max. 2 Jahre; Kettenbefristungen kritisch hinterfragen.","Überstundenklauseln („mit dem Gehalt abgegolten“) sind nur in engen Grenzen wirksam — Umfang muss erkennbar sein.","Wettbewerbsverbote nach Vertragsende sind nur gegen Karenzentschädigung (mind. 50 % der Bezüge) bindend.","Alles Wichtige schriftlich: mündliche Zusagen (Bonus, Homeoffice, Beförderung) in den Vertrag oder per E-Mail bestätigen lassen."],
 c:["Vertrag in Ruhe mitnehmen — niemals am Tisch unterschreiben","Gehalt: Brutto/Netto-Rechner nutzen, 13. Gehalt erfragen","Urlaubsanspruch, Probezeitdauer, Kündigungsfrist markieren","Bei Unsicherheit: Gewerkschaft oder Fachanwalt gegenlesen lassen"],
 prem:"Vertiefung: Klausel-Lexikon mit 15 typischen Vertragsklauseln in Ampel-Bewertung (grün/gelb/rot) und Formulierungshilfen für Nachverhandlungen."},

{id:"gehalt",k:"beruf",a:[18,65],s:["Berufseinstieg","Jobwechsel"],t:"Gehaltsverhandlung: Marktwert kennen und durchsetzen",
 kurz:"Wer nie verhandelt, verschenkt über ein Berufsleben oft sechsstellige Summen. Gute Verhandlung ist Handwerk: Marktwert recherchieren, Leistung belegen, ruhig fordern.",
 p:["Marktwert ermitteln: Gehaltsreports, Stepstone/Kununu-Daten, Tarifverträge, Kollegen in vergleichbaren Rollen.","Timing nutzen: Jahresgespräch, nach erfolgreichen Projekten, bei Aufgabenzuwachs — nicht in Krisenphasen des Unternehmens.","Mit konkreter Zahl eröffnen (leicht über dem Ziel); wer zuerst eine Zahl nennt, setzt den Anker.","Leistungsmappe führen: Erfolge, Zahlen, übernommene Verantwortung — Argumente schlagen Bitten.","Alternativen mitdenken: Mehr Urlaub, Weiterbildung, Homeoffice oder Bonus, wenn beim Fixum nichts geht; ein Jobwechsel bringt im Schnitt den größten Sprung."],
 c:["3 Quellen zum Marktgehalt auswerten","Zielzahl, Minimalzahl und Alternativen festlegen","Erfolge des letzten Jahres mit Zahlen notieren","Gesprächstermin aktiv vereinbaren statt warten"],
 prem:"Vertiefung: Komplettes Verhandlungsskript mit Einwandbehandlung („kein Budget“, „nächstes Jahr“) und Rechenbeispiel: Was 5 % mehr ab 30 über die Karriere kumuliert ausmachen."},

{id:"kuendigung",k:"beruf",a:[18,65],s:["Jobverlust","Jobwechsel"],t:"Kündigung & Jobverlust: Rechte, Fristen, Arbeitslosengeld",
 kurz:"Eine Kündigung ist ein Schock — aber ein geregelter. Wer die ersten 7 Tage richtig handelt, sichert Geld, Rechte und den schnellen Neustart.",
 p:["Sofort handeln: Spätestens 3 Tage nach Kenntnis arbeitsuchend melden, sonst drohen Sperrzeiten beim Arbeitslosengeld.","Kündigungsschutzklage nur binnen 3 Wochen möglich — Frist verpasst heißt Kündigung wirksam, auch wenn sie angreifbar war.","Arbeitslosengeld I: i. d. R. 60 % (mit Kind 67 %) des Nettoentgelts, Bezugsdauer je nach Alter und Vorbeschäftigung 6–24 Monate.","Aufhebungsverträge nie spontan unterschreiben: Sie können Sperrzeiten auslösen; Abfindung und Zeugnisnote sind verhandelbar.","Anspruch auf ein wohlwollendes qualifiziertes Arbeitszeugnis besteht immer — Formulierungscodes prüfen lassen."],
 c:["Arbeitsuchend melden (online möglich) — Frist: 3 Tage","Kündigung auf Form/Frist prüfen, ggf. Anwalt binnen 3 Wochen","Unterlagen sichern: Verträge, Abrechnungen, Zeugnisse","Finanzen: Fixkosten senken, Notgroschen-Plan aktivieren"],
 prem:"Vertiefung: Schritt-für-Schritt-Fahrplan für Woche 1–4 nach der Kündigung, Abfindungs-Faustformeln und Zeugnis-Code-Tabelle („stets zur vollsten Zufriedenheit“ = sehr gut)."},

{id:"selbststaendig",k:"beruf",a:[18,60],s:["Selbstständigkeit"],t:"Selbstständigkeit gründen: vom Plan zur Anmeldung",
 kurz:"Selbstständigkeit bedeutet Freiheit gegen Sicherheit. Wer Geschäftsmodell, Finanzpuffer und Bürokratie vor dem Sprung klärt, überlebt das kritische erste Jahr deutlich öfter.",
 p:["Geschäftsmodell testen, bevor man kündigt: nebenberuflich starten, erste zahlende Kunden gewinnen, dann skalieren.","Rechtsform wählen: Einzelunternehmen/Freiberufler (einfach, volle Haftung) vs. GmbH/UG (Haftungsschutz, mehr Pflichten).","Anmeldungen: Gewerbeamt bzw. Finanzamt (Fragebogen zur steuerlichen Erfassung), ggf. Kammer, Berufsgenossenschaft.","Kalkulieren lernen: Stundensatz = (Wunschgehalt + Kosten + Steuern + Vorsorge + Ausfallzeiten) ÷ verkaufbare Stunden — meist das 1,5–2-Fache des Angestellten-Brutto.","Absicherung selbst organisieren: Kranken-, Renten-, Berufshaftpflichtversicherung; Rücklagen für Steuern (grob 30–40 % vom Gewinn) sofort separieren."],
 c:["6 Monatsausgaben als Puffer ansparen","3 Testkunden vor der Vollzeit-Gründung gewinnen","Geschäftskonto eröffnen, Steuer-Rücklagenkonto einrichten","Gründungszuschuss/Beratungsförderung prüfen"],
 prem:"Vertiefung: Stundensatz-Kalkulator mit Beispielrechnung, Behörden-Fahrplan in der richtigen Reihenfolge und die 7 häufigsten Gründungsfehler samt Gegenmittel."},

{id:"neuorientierung",k:"beruf",a:[25,60],s:["Jobwechsel","Jobverlust","Krankheit"],t:"Berufliche Neuorientierung & Quereinstieg",
 kurz:"Kaum jemand arbeitet 45 Jahre im selben Beruf. Neuorientierung ist normal geworden — und gelingt planvoll besser als aus dem Affekt.",
 p:["Unterscheiden: Brauche ich einen neuen Arbeitgeber, eine neue Rolle oder ein neues Feld? Oft reicht die kleinere Veränderung.","Übertragbare Kompetenzen inventarisieren: Projektleitung, Kundenkontakt, Analyse — sie sind die Brücke in neue Branchen.","Quereinstiegs-freundliche Felder kennen: IT, Pflege, Bildung, Handwerk, Vertrieb — oft mit geförderter Umschulung.","Realitätstest vor dem Sprung: Hospitationen, Nebenprojekte, Gespräche mit Menschen im Zielberuf.","Finanziell absichern: Umschulungen können über Bildungsgutschein samt Lebensunterhalt gefördert werden."],
 c:["Energie-Bilanz führen: Was gibt/raubt im Job Kraft?","Kompetenzliste schreiben (Hilfe: alte Zeugnisse, Projekte)","2 Zielberufe definieren und je 1 Insider interviewen","Förderberatung der Arbeitsagentur nutzen"],
 prem:"Vertiefung: Selbstanalyse-Workbook (Werte, Stärken, Lebensphase) und 10 dokumentierte Quereinstiegs-Pfade mit typischer Dauer und Gehaltsentwicklung."},

/* ---------- FINANZEN & VORSORGE ---------- */
{id:"budget",k:"finanzen",a:[16,100],s:["Erste Wohnung","Berufseinstieg","Schulden"],t:"Konto, Budget & Haushaltsplan: das Fundament",
 kurz:"Wer weiß, wohin sein Geld fließt, hat es im Griff — alle anderen werden von ihm regiert. Ein einfaches Kontenmodell und 30 Minuten im Monat genügen.",
 p:["Drei-Konten-Modell: Gehaltskonto (Fixkosten), Alltagskonto (Variables), Sparkonto/Depot (Zukunft) — Daueraufträge am Monatsanfang automatisieren.","50-30-20-Faustregel als Start: 50 % Fixkosten, 30 % Wünsche, 20 % Sparen — an die eigene Lage anpassen.","Haushaltsbuch 2–3 Monate führen (App oder Tabelle) deckt die typischen Lecks auf: Abos, Lieferessen, Impulskäufe.","Girokonto vergleichen: kostenlose Kontoführung, faire Auslandsgebühren; Kontowechsel ist gesetzlich vereinfacht.","Abo-Inventur halbjährlich: Verträge listen, Kündigungsfristen notieren, Ungenutztes streichen."],
 c:["Alle Fixkosten in einer Liste erfassen","Dauerauftrag „Sparen zuerst“ am 1. des Monats einrichten","3 Monate Ausgaben tracken","Abo-Liste mit Kündigungsfristen anlegen"],
 prem:"Vertiefung: Haushaltsbuch-Vorlage mit Auswertung, Referenzwerte „Was geben Haushalte typisch aus?“ und das 6-Konten-Modell für Fortgeschrittene."},

{id:"notgroschen",k:"finanzen",a:[18,100],s:["Berufseinstieg","Jobverlust","Krankheit"],t:"Notgroschen: der Puffer, der alles entspannt",
 kurz:"Drei bis sechs Nettomonatsausgaben auf einem Tagesgeldkonto verwandeln Katastrophen (Jobverlust, Waschmaschine, Autoreparatur) in Unannehmlichkeiten.",
 p:["Zielgröße: 3 Monatsausgaben (sicherer Job, keine Kinder) bis 6+ (Selbstständige, Familien, Immobilienbesitzer).","Parken auf Tagesgeld: täglich verfügbar, Einlagensicherung bis 100.000 € pro Bank und Person — nicht investieren!","Erst Notgroschen, dann Börse: Wer ohne Puffer investiert, muss im Crash zum schlechtesten Zeitpunkt verkaufen.","Aufbau automatisieren: fester Dauerauftrag direkt nach Gehaltseingang, Sonderzahlungen zu 50 % zuführen.","Nach Nutzung diszipliniert wieder auffüllen — der Puffer ist Verbrauchsmaterial, kein Tabu."],
 c:["Eigene Monatsausgaben exakt beziffern","Tagesgeldkonto mit fairer Verzinsung eröffnen","Dauerauftrag einrichten, bis Ziel erreicht","Regel definieren: Wofür darf der Puffer angefasst werden?"],
 prem:"Vertiefung: Tagesgeld-Auswahlkriterien (Zinstreppe, Aktionszins-Fallen) und Stufenplan, wie man den Puffer auch mit kleinem Einkommen in 18 Monaten aufbaut."},

{id:"etf",k:"finanzen",a:[18,70],s:["Berufseinstieg","Ruhestand"],t:"Investieren für Einsteiger: ETF & Zinseszins",
 kurz:"Langfristiger Vermögensaufbau ist kein Glücksspiel, sondern ein Handwerk mit drei Regeln: breit streuen, Kosten minimieren, Jahrzehnte durchhalten.",
 p:["Ein weltweit gestreuter Aktien-ETF (z. B. auf MSCI World/All Country World) enthält tausende Firmen — Einzelaktien-Risiko entfällt.","Zinseszins braucht Zeit: Früh klein anfangen schlägt spät groß; historisch lieferten Weltaktien langfristig im Schnitt grob 6–8 % p. a. — ohne Garantie.","Kosten fressen Rendite: laufende Gebühren (TER) unter 0,3 % anstreben, Depot mit kostenlosen Sparplänen wählen.","Sparplan automatisieren und Kursstürze aussitzen — der größte Feind ist das eigene Panikverhalten, nicht der Markt.","Nur Geld investieren, das 10+ Jahre nicht gebraucht wird; Sicherheitsbaustein (Tagesgeld/Anleihen) je nach Nervenkostüm beimischen.","Finger weg von: Hebelprodukten, heißen Tipps, „garantierten“ Renditen und allem, was man nicht erklären kann."],
 c:["Notgroschen zuerst vollmachen","Depot bei günstigem Broker eröffnen","Monatlichen ETF-Sparplan einrichten (geht ab 25 €)","Einmal jährlich prüfen — nicht täglich schauen"],
 prem:"Vertiefung: Rechenbeispiel 100/300/500 € Sparrate über 30 Jahre, Depot-Vergleichskriterien, Steuer-Basics (Sparerpauschbetrag, Vorabpauschale) und Entnahmestrategien für später."},

{id:"steuern",k:"finanzen",a:[18,100],s:["Berufseinstieg","Heirat","Selbstständigkeit"],t:"Steuererklärung: Grundlagen ohne Schrecken",
 kurz:"Für die meisten Angestellten ist die Steuererklärung freiwillig — und lohnt sich trotzdem: Im Schnitt gibt es über 1.000 € zurück, mit Software in 1–2 Stunden erledigt.",
 p:["Pflicht u. a. bei: Nebeneinkünften über 410 €, Lohnersatzleistungen (Eltern-/Kurzarbeitergeld), Steuerklassen-Kombination 3/5, Selbstständigkeit.","Die großen Posten: Werbungskosten (Pendeln, Arbeitsmittel, Homeoffice-Pauschale), Sonderausgaben (Vorsorge, Spenden), außergewöhnliche Belastungen (Krankheit, Pflege), Handwerkerleistungen.","Pauschalen nutzen: Bis zur Werbungskostenpauschale braucht es keine Belege — darüber lohnt Sammeln.","Software oder Elster führen durchs Formular; bei komplexen Fällen (Vermietung, Ausland, Gründung) lohnt Steuerberatung oder Lohnsteuerhilfeverein.","Fristen: Pflichtabgabe bis Ende Juli des Folgejahres (mit Berater später); freiwillig kann man 4 Jahre rückwirkend abgeben."],
 c:["Belege-Ordner (digital) anlegen: Rechnungen, Spenden, Fahrten","Lohnsteuerbescheinigung des Arbeitgebers ablegen","Steuersoftware wählen und Erklärung terminieren","Steuerbescheid prüfen — Einspruch binnen 1 Monat möglich"],
 prem:"Vertiefung: Die 20 meist vergessenen Absetzposten, Steuerklassen-Wahl für Paare mit Rechenbeispiel und Sonderteil für Selbstständige (EÜR, Umsatzsteuer, Vorauszahlungen)."},

{id:"versicherungen",k:"finanzen",a:[18,100],s:["Erste Wohnung","Berufseinstieg","Kind bekommen"],t:"Versicherungen: Welche man wirklich braucht",
 kurz:"Versichert wird, was die Existenz bedroht — nicht das Handydisplay. Drei bis vier Policen decken die echten Risiken; vieles andere ist teurer Seelenfrieden.",
 p:["Unverzichtbar: Krankenversicherung (Pflicht) und private Haftpflicht — sie deckt Schäden an Dritten bis in Millionenhöhe für ~5 €/Monat.","Sehr wichtig: Berufsunfähigkeitsversicherung — die Arbeitskraft ist das größte Vermögen; je jünger der Abschluss, desto günstiger.","Situativ sinnvoll: Hausrat (wertvoller Besitz), Risikolebensversicherung (Familie/Kredit), Wohngebäude (Eigentümer), Auslandskranken (Reisen), Kfz-Haftpflicht (Pflicht für Halter).","Meist verzichtbar: Handy-, Brillen-, Glas-, Reisegepäck-, Sterbegeldversicherung und Kapitallebensversicherungen als Geldanlage.","Regel: Hohe, existenzielle Schäden versichern; kleine Schäden aus dem Notgroschen zahlen. Selbstbeteiligung senkt Beiträge."],
 c:["Haftpflicht abschließen bzw. Deckungssumme prüfen (min. 10 Mio.)","BU-Bedarf prüfen, solange jung und gesund","Bestehende Policen listen: Was deckt was, was doppelt?","Jährlich kündbare Verträge auf dem Markt vergleichen"],
 prem:"Vertiefung: Prioritätenliste nach Lebensphase (Student, Familie, Eigentümer, Rentner), BU-Auswahlkriterien (abstrakte Verweisung!) und Kündigungs-Musterschreiben."},

{id:"vorsorge",k:"finanzen",a:[20,67],s:["Berufseinstieg","Ruhestand"],t:"Altersvorsorge: die drei Säulen verstehen",
 kurz:"Die gesetzliche Rente sichert die Basis, reicht aber selten für den Lebensstandard. Wer die Lücke früh kennt, schließt sie mit kleinen, automatisierten Beträgen.",
 p:["Säule 1: Gesetzliche Rente — Höhe hängt an Beitragsjahren und Einkommen; die jährliche Renteninformation zeigt den Stand.","Säule 2: Betriebliche Altersvorsorge — Arbeitgeberzuschuss (mind. 15 % bei Entgeltumwandlung) mitnehmen, Konditionen aber prüfen.","Säule 3: Private Vorsorge — für viele ist ein breiter ETF-Sparplan der flexible Kern; geförderte Produkte (Riester/Rürup) nur in Sonderfällen.","Rentenlücke berechnen: Wunsch-Nettoeinkommen im Alter minus erwartete Rente = monatlicher Fehlbetrag, hochgerechnet mit Inflation.","Faustregel Sparquote: grob 10–15 % des Nettos fürs Alter; jedes Jahrzehnt Verspätung verdoppelt ungefähr die nötige Rate."],
 c:["Renteninformation lesen und abheften","Rentenlücke überschlagen (Online-Rechner)","bAV-Angebot des Arbeitgebers prüfen","Privaten Sparplan starten/erhöhen, an Gehaltssprünge koppeln"],
 prem:"Vertiefung: Rentenlücken-Rechner mit Beispielhaushalt, Riester/Rürup-Entscheidungsbaum und Strategie „Vorsorge bei Selbstständigkeit“."},

{id:"schulden",k:"finanzen",a:[18,100],s:["Schulden","Jobverlust","Trennung"],t:"Schulden & Kredite: Auswege aus der Spirale",
 kurz:"Schulden sind ein lösbares Sachproblem, kein moralisches Urteil. Wer Überblick schafft und früh Hilfe holt, kommt fast immer wieder heraus — notfalls über die Privatinsolvenz.",
 p:["Erster Schritt: Vollständige Gläubigerliste mit Beträgen, Zinsen, Mahnstufen — Verdrängung ist der teuerste Fehler.","Priorisieren: Existenzielles zuerst (Miete, Energie, Krankenversicherung), dann teuerste Zinsen (Dispo oft 10–14 %!).","Dispo sofort in einen günstigeren Ratenkredit umschulden; neue Konsumkredite stoppen, „Buy now pay later“ meiden.","Mit Gläubigern reden: Ratenpläne und Stundungen sind Alltag — Schweigen führt zu Vollstreckung.","Staatlich anerkannte Schuldnerberatungen (Caritas, Diakonie, Verbraucherzentralen) sind kostenlos; Privatinsolvenz führt heute nach 3 Jahren zur Restschuldbefreiung.","P-Konto einrichten, wenn Pfändung droht — es schützt das Existenzminimum."],
 c:["Alle Schulden in einer Tabelle erfassen","Haushaltsplan: Was ist monatlich realistisch tilgbar?","Kostenlose Schuldnerberatung kontaktieren","Dispo kündigen/umschulden, Daueraufträge anpassen"],
 prem:"Vertiefung: Musterbriefe an Gläubiger (Ratenzahlung, Vergleich), Ablauf der Verbraucherinsolvenz in 6 Schritten und Schutzrechte gegenüber Inkassobüros."},

{id:"schufa",k:"finanzen",a:[18,100],s:["Erste Wohnung","Hauskauf","Schulden"],t:"SCHUFA & Bonität: der unsichtbare Lebenslauf",
 kurz:"Ob Wohnung, Handyvertrag oder Kredit — fast jede größere Entscheidung anderer über Sie läuft über Ihre Bonität. Man kann sie kennen, pflegen und korrigieren.",
 p:["Einmal jährlich kostenlose Datenkopie (Art. 15 DSGVO) bei Auskunfteien anfordern und auf Fehler prüfen — falsche Einträge sind häufig und löschbar.","Score-Pflege: Rechnungen pünktlich zahlen, Mahnungen vermeiden, nicht zu viele Konten/Kreditkarten parallel, Konditionsanfragen statt Kreditanfragen stellen.","Erledigte Negativeinträge verjähren regulär nach gewisser Zeit — auf fristgerechte Löschung pochen.","Für Vermieter genügt die SCHUFA-Bonitätsauskunft (Bezahlversion) oder zunehmend Alternativen wie Bonify-Mietauskunft.","Identitätsdiebstahl beobachten: Unbekannte Einträge sofort melden und Anzeige erstatten."],
 c:["Kostenlose Datenkopie anfordern","Fehlerhafte/veraltete Einträge schriftlich reklamieren","Lastschriften für Fixkosten einrichten (nie Mahnung riskieren)","Vor Kreditanfragen: nur „Konditionsanfrage“ zulassen"],
 prem:"Vertiefung: Welche Faktoren den Score wirklich beeinflussen (und Mythen wie „Wohngegend“), Musterbrief zur Löschung und Bonitäts-Fahrplan 6 Monate vor einer Immobilienfinanzierung."},
/* ---------- WOHNEN & ALLTAG ---------- */
{id:"erstewohnung",k:"wohnen",a:[17,30],s:["Erste Wohnung","Berufseinstieg"],t:"Die erste eigene Wohnung & der Mietvertrag",
 kurz:"Die erste Wohnung ist der Schritt ins eigene Leben — und der erste große Vertrag. Wer Kaution, Klauseln und Übergabeprotokoll versteht, spart sich teure Anfängerfehler.",
 p:["Budget-Faustregel: Warmmiete maximal ein Drittel des Nettoeinkommens; Vermieter verlangen meist das ~3-Fache der Kaltmiete als Einkommen.","Bewerbungsmappe bereithalten: Selbstauskunft, Einkommensnachweise, Bonitätsauskunft, ggf. Bürgschaft der Eltern.","Kaution: maximal 3 Kaltmieten, zahlbar in 3 Raten; auf separates Kautionskonto bestehen.","Übergabeprotokoll mit Fotos ist Gold wert — jeder Kratzer, jeder Zählerstand wird dokumentiert.","Mietvertrag prüfen: Staffel-/Indexmiete, Schönheitsreparatur-Klauseln (starre Fristen sind unwirksam), Kündigungsfrist (Mieter: 3 Monate).","Nebenkosten realistisch einplanen: Heizung, Strom, Internet, GEZ, Hausrat — oft 30–40 % auf die Kaltmiete."],
 c:["Bewerbungsmappe als PDF vorbereiten","Übergabeprotokoll + Fotos bei Ein- und Auszug","Mängel binnen 14 Tagen schriftlich nachmelden","Ummeldung beim Bürgeramt binnen 2 Wochen"],
 prem:"Vertiefung: Mietvertrag-Klauselcheck (12 typische Fallen), Erstausstattungs-Liste mit realistischem Budget und Musterschreiben für Mängelanzeige & Mietminderung."},

{id:"umzug",k:"wohnen",a:[18,80],s:["Erste Wohnung","Jobwechsel","Trennung"],t:"Umzug organisieren: Fristen, Ummeldungen, Ablauf",
 kurz:"Ein Umzug ist ein Projekt mit 30 kleinen Deadlines. Mit einem 8-Wochen-Plan wird daraus Routine statt Chaos.",
 p:["8 Wochen vorher: Alte Wohnung fristgerecht kündigen, Nachsendeauftrag planen, Umzugshelfer/-firma sichern (Angebote vergleichen).","4 Wochen vorher: Verträge ummelden oder kündigen — Strom, Gas, Internet (Sonderkündigungsrecht bei Nichtverfügbarkeit), Versicherungen informieren.","Behörden: Ummeldung beim Einwohnermeldeamt binnen 2 Wochen nach Einzug (Wohnungsgeberbestätigung nötig); Kfz ggf. umschreiben.","Banken, Arbeitgeber, Krankenkasse, Abos, Finanzamt: Adressänderung systematisch per Liste abarbeiten.","Umzugskosten können steuerlich absetzbar sein — beruflich bedingt sogar mit Pauschalen.","Kartons klug packen: Raum + Inhalt beschriften, Erste-Nacht-Kiste (Werkzeug, Bettzeug, Kaffee) separat."],
 c:["Kündigungsfristen Wohnung & Verträge prüfen","Nachsendeauftrag 1 Woche vor Umzug aktivieren","Ummeldung Bürgeramt terminieren","Zählerstände in beiden Wohnungen fotografieren"],
 prem:"Vertiefung: Interaktive 8-Wochen-Checkliste zum Abhaken, Kostenkalkulation Umzugsfirma vs. Eigenregie und Steuer-Guide für beruflich bedingte Umzüge."},

{id:"nebenkosten",k:"wohnen",a:[18,100],s:["Erste Wohnung"],t:"Nebenkosten, Strom & Verträge im Griff",
 kurz:"Die „zweite Miete“ lässt sich steuern: Wer Abrechnungen prüft und Anbieter wechselt, spart oft mehrere hundert Euro im Jahr — ohne Komfortverlust.",
 p:["Nebenkostenabrechnung prüfen: Muss binnen 12 Monaten nach Abrechnungszeitraum kommen; nur umlagefähige Posten (BetrKV) sind zulässig — Verwaltung und Reparaturen nicht.","Widerspruchsfrist: 12 Monate; Belegeinsicht beim Vermieter ist Ihr Recht.","Strom/Gas: Grundversorgung ist meist am teuersten; jährlicher Anbietervergleich mit Bonus-Fallen-Blick spart deutlich.","Heizkosten senken: 1 Grad weniger spart ~6 % Energie; Stoßlüften statt Kippfenster, Heizkörper entlüften.","Internet/Mobilfunk: Nach Mindestlaufzeit monatlich kündbar — Verhandeln in der Kündigungsphase bringt oft Bestandskunden-Rabatte.","Rundfunkbeitrag gilt pro Wohnung — in WGs nur einmal fällig."],
 c:["Abrechnung mit Vorjahr vergleichen, Posten prüfen","Strom-/Gasvertrag jährlich vergleichen","Zählerstände am Jahresende notieren","Kündigungsfristen aller Verträge im Kalender"],
 prem:"Vertiefung: Nebenkosten-Prüfprotokoll Punkt für Punkt, Tabelle umlagefähiger Kosten und Verhandlungs-Skript für die Anbieter-Hotline."},

{id:"hauskauf",k:"wohnen",a:[28,55],s:["Hauskauf","Heirat","Kind bekommen"],t:"Immobilienkauf & Baufinanzierung",
 kurz:"Der Immobilienkauf ist die größte Finanzentscheidung des Lebens. Drei Zahlen entscheiden: Eigenkapital, Kaufnebenkosten und die monatliche Rate, die auch in schlechten Jahren trägt.",
 p:["Kaufnebenkosten einplanen: Grunderwerbsteuer (je Bundesland ~3,5–6,5 %), Notar/Grundbuch (~2 %), ggf. Makler — zusammen oft 9–12 % zusätzlich, die das Eigenkapital tragen sollte.","Eigenkapital-Faustregel: mindestens Nebenkosten + 10–20 % des Kaufpreises; mehr Eigenkapital = bessere Zinsen.","Rate kalkulieren: inkl. Instandhaltungsrücklage (1–2 €/m²/Monat) nicht mehr als ~35 % des Haushaltsnettos; Zinsbindung 10–20 Jahre je nach Zinsniveau.","Objekt prüfen: Lage vor Ausstattung; Gutachter für Bausubstanz, Energieausweis, Protokolle der Eigentümerversammlung (bei Wohnungen) lesen.","Tilgung: Anfangstilgung mind. 2 %, Sondertilgungsrecht vereinbaren; Förderkredite (z. B. KfW) prüfen.","Kaufen vs. Mieten ist eine Rechen- UND Lebensfrage: Flexibilität hat ebenso einen Wert wie Eigentum."],
 c:["Finanzierungsrahmen vor der Suche bankseitig klären","Mind. 3 Finanzierungsangebote vergleichen","Besichtigung mit Fachperson, Mängelliste führen","Kaufvertrag 14 Tage vor Notartermin prüfen (lassen)"],
 prem:"Vertiefung: Vollständige Beispielrechnung 400.000-€-Kauf (Nebenkosten, Rate, Gesamtkosten über 30 Jahre), Besichtigungs-Checkliste mit 40 Punkten und Kauf-oder-Miete-Rechner-Logik."},

{id:"haushalt",k:"wohnen",a:[16,100],s:["Erste Wohnung"],t:"Haushalt führen: Kochen, Putzen, Reparieren",
 kurz:"Haushaltskompetenz ist gesammelte Lebenszeit: Wer Grundrezepte, Putzroutinen und kleine Reparaturen beherrscht, lebt günstiger, gesünder und unabhängiger.",
 p:["Kochen: 10 Grundrezepte (Pasta, Pfannengericht, Suppe, Ofengemüse, Curry …) decken den Alltag; Wochenplan + Einkaufsliste senken Kosten und Foodwaste massiv.","Vorratshaltung: Mindesthaltbarkeitsdatum ist kein Wegwerfdatum — sehen, riechen, schmecken.","Putzen in Routinen statt Großaktionen: täglich 10 Minuten, wöchentlich Bad/Küche/Boden, saisonal Fenster & Entkalken.","Vier Hausmittel ersetzen ein Regal: Zitronensäure (Kalk), Soda/Natron (Fett), Essigreiniger, Spülmittel.","Basis-Werkzeugkasten: Schraubendreher, Zange, Hammer, Inbus, Dübel, Wasserwaage, Cuttermesser — dazu wissen, wo Wasserhaupthahn und Sicherungskasten sind.","Kleine Reparaturen selbst: Silikonfuge, tropfender Hahn (Dichtung), Abfluss (Pömpel/Spirale), Wand spachteln — Videos + Geduld genügen meist."],
 c:["Wochen-Speiseplan + Einkaufsliste testen","Putzplan mit festen Slots aufhängen","Werkzeug-Grundausstattung anschaffen","Wasserhaupthahn & Sicherungskasten lokalisieren"],
 prem:"Vertiefung: Die 10 Grundrezepte mit Varianten, Putzplan-Vorlage und ein Reparatur-ABC für die 15 häufigsten Wohnungs-Wehwehchen."},

/* ---------- FAMILIE & BEZIEHUNGEN ---------- */
{id:"partnerschaft",k:"familie",a:[18,80],s:["Heirat","Erste Wohnung"],t:"Partnerschaft & Zusammenziehen",
 kurz:"Zusammenziehen ist romantisch — und ein Wirtschaftsbündnis. Paare, die früh über Geld, Aufgaben und Erwartungen sprechen, streiten später seltener über genau diese Dinge.",
 p:["Geldmodell wählen: getrennte Konten, Gemeinschaftskonto oder Drei-Konten-Modell (meins/deins/unseres) — fair heißt oft anteilig zum Einkommen, nicht 50/50.","Beide in den Mietvertrag oder klare Untermiet-Regelung — sonst hat einer im Trennungsfall keinerlei Rechte an der Wohnung.","Unverheiratete sind rechtlich Fremde: kein Auskunftsrecht im Krankenhaus, kein gesetzliches Erbrecht — Vollmachten und ggf. Partnerschaftsvertrag schaffen Sicherheit.","Mental Load sichtbar machen: Unsichtbare Organisationsarbeit (Termine, Geschenke, Vorräte) explizit verteilen.","Streitkultur pflegen: Ich-Botschaften, Themen einzeln klären, Pausen vereinbaren — Verachtung ist der zuverlässigste Trennungsprädiktor."],
 c:["Geldmodell und Fixkosten-Aufteilung schriftlich festhalten","Beide Namen in Mietvertrag/Übergabeprotokoll","Vorsorgevollmachten füreinander ausstellen","Halbjährliches „Beziehungs-Review“ einführen"],
 prem:"Vertiefung: Muster-Haushaltsvereinbarung für Paare, Rechenbeispiel anteilige Kostenteilung und Rechts-Überblick: Was ändert sich (nicht) ohne Trauschein?"},

{id:"heirat",k:"familie",a:[22,70],s:["Heirat"],t:"Heiraten: Standesamt, Namensrecht, Güterstand",
 kurz:"Die Ehe ist neben dem Fest vor allem ein Rechtsvertrag mit Wirkung auf Steuern, Erbe und Vermögen. Wer die Grundzüge kennt, entscheidet bewusst statt nebenbei.",
 p:["Formalia: Anmeldung beim Standesamt (frühestens 6 Monate vorher) mit Geburtsurkunden, Ausweisen, ggf. Scheidungsurteilen; die standesamtliche Trauung ist die rechtsgültige.","Namensrecht: gemeinsamer Familienname, Doppelname oder jeder behält seinen — die Entscheidung wirkt auch für Kinder.","Güterstand: Ohne Ehevertrag gilt Zugewinngemeinschaft — jeder behält sein Vermögen, nur der Zuwachs während der Ehe wird bei Scheidung ausgeglichen.","Ehevertrag ist kein Misstrauen: sinnvoll bei Selbstständigkeit, großem Vermögensgefälle oder Immobilien — nur notariell gültig.","Folgen im Paket: Steuerklassenwahl/Splitting, gegenseitiges gesetzliches Erbrecht, Auskunftsrechte, Hinterbliebenenrente, gegenseitige Unterhaltspflicht.","Hochzeitsbudget realistisch planen: Feiern gehen schnell in fünfstellige Beträge — Schulden fürs Fest vermeiden."],
 c:["Standesamt-Termin & Dokumente 6 Monate vorher klären","Namensführung gemeinsam entscheiden","Ehevertrag-Bedarf prüfen (Notar-Erstgespräch)","Nach der Trauung: Steuerklasse, Versicherungen, Konten anpassen"],
 prem:"Vertiefung: Steuerklassen-Rechenbeispiel nach der Hochzeit, Ehevertrag-Bausteine verständlich erklärt und Behörden-Checkliste „Nach der Hochzeit“."},

{id:"kind",k:"familie",a:[20,45],s:["Kind bekommen"],t:"Ein Kind bekommen: Schwangerschaft, Elterngeld, Elternzeit",
 kurz:"Mit dem positiven Test beginnt neben der Vorfreude ein Antrags-Marathon. Die gute Nachricht: Mutterschutz, Elterngeld und Kindergeld folgen klaren Regeln — und Fristen.",
 p:["Mutterschutz: 6 Wochen vor und 8 Wochen nach der Geburt Beschäftigungsverbot bei vollem Einkommensschutz; Kündigungsschutz ab Mitteilung der Schwangerschaft.","Elterngeld: ersetzt grob 65 % des wegfallenden Nettos (Basiselterngeld 14 Monate teilbar, mind. 2 Partnermonate); ElterngeldPlus streckt bei Teilzeit.","Elternzeit: Anspruch bis zu 3 Jahre pro Kind, Anmeldung beim Arbeitgeber spätestens 7 Wochen vorher, danach Rückkehrrecht.","Kindergeld für jedes Kind beantragen (Familienkasse); dazu Geburtsurkunde, Krankenversicherung des Kindes, Vaterschaftsanerkennung bei Unverheirateten vor der Geburt regeln.","Betreuung früh planen: Kita-Anmeldung läuft vielerorts schon in der Schwangerschaft; Rechtsanspruch ab dem 1. Geburtstag.","Erstausstattung gebraucht denken: Kinder wachsen schneller als Kontostände."],
 c:["Arbeitgeber informieren (Mutterschutz aktiviert sich)","Elterngeld-Monate als Paar planen (Bezugshöhe optimieren)","Anträge sammeln: Elterngeld, Kindergeld, Geburtsurkunde","Kita-Anmeldung & Vorsorgevollmacht/Notfallplan fürs Kind"],
 prem:"Vertiefung: Elterngeld-Rechenbeispiele (Basis vs. Plus, Partnerschaftsbonus), Fristen-Zeitstrahl von Test bis 1. Geburtstag und Steuerklassen-Trick vor dem Mutterschutz."},

{id:"erziehung",k:"familie",a:[25,55],s:["Kind bekommen"],t:"Erziehung, Kita & Schule begleiten",
 kurz:"Kinder brauchen keine perfekten Eltern, sondern verlässliche. Bindung, klare Grenzen und vorgelebtes Verhalten wirken stärker als jede Erziehungsmethode.",
 p:["Bindung vor Bildung: Verlässliche Zuwendung in den ersten Jahren ist das Fundament für Lernen und Selbstwert.","Klar und freundlich führen: Wenige, konsequente Regeln schlagen viele verhandelbare; Schimpfen ersetzt keine Grenze.","Vorbild wirkt: Mediennutzung, Streitkultur und Umgang mit Fehlern schauen Kinder sich ab — nicht an, was man sagt.","Kita/Schule als Partner: Entwicklungsgespräche nutzen, bei Problemen früh und kooperativ statt eskalierend.","Selbstständigkeit zulassen: Altersgerechte Aufgaben, eigenes Taschengeld (Faustregel: zur freien Verfügung, nicht als Druckmittel) und kalkulierte Risiken machen lebenstüchtig.","Eltern-Selbstfürsorge ist Kindeswohl: Erschöpfte Eltern dürfen und sollen Hilfe annehmen (Familienberatung, Großeltern, Kur)."],
 c:["3–5 Familienregeln gemeinsam festlegen","Medienzeiten altersgerecht vereinbaren","Taschengeld-Plan einführen","Notfall-/Abholberechtigten-Liste für Kita & Schule hinterlegen"],
 prem:"Vertiefung: Taschengeld-Orientierungstabelle nach Alter, Gesprächsleitfaden für Lehrkräfte-Konflikte und Medienzeit-Empfehlungen mit Familienvertrag-Vorlage."},

{id:"trennung",k:"familie",a:[20,70],s:["Trennung"],t:"Trennung & Scheidung geordnet bewältigen",
 kurz:"Eine Trennung ist emotional ein Erdbeben — rechtlich ist sie ein Verfahren mit klaren Schritten. Wer Wohnung, Geld und Kinder früh sachlich regelt, schützt alle Beteiligten.",
 p:["Trennungsjahr: Scheidung setzt i. d. R. 1 Jahr Getrenntleben voraus (auch innerhalb der Wohnung möglich, getrennte Haushaltsführung dokumentieren).","Erste Schritte: eigenes Konto, Kontovollmachten widerrufen, wichtige Unterlagen kopieren, gemeinsame Verträge sichten.","Kinder zuerst: Sorgerecht bleibt meist gemeinsam; Umgangs- und Betreuungsmodell (Residenz/Wechselmodell) im Sinne des Kindes regeln, Kindesunterhalt richtet sich nach der Düsseldorfer Tabelle.","Unterhalt & Vermögen: Trennungs-/nachehelicher Unterhalt, Zugewinnausgleich und Rentenausgleich (Versorgungsausgleich) laufen nach festen Regeln — früh beraten lassen.","Einvernehmlich spart Geld und Nerven: Mediation oder gemeinsame Scheidung mit einem Anwalt; nur die Scheidung selbst braucht zwingend Anwalt und Gericht.","Bei Gewalt: Gewaltschutzgesetz ermöglicht Wohnungszuweisung und Kontaktverbote — Polizei und Hilfetelefone sofort einschalten."],
 c:["Trennungsdatum schriftlich festhalten","Eigenes Konto + neue Passwörter/Vollmachten","Liste: gemeinsame Verträge, Versicherungen, Schulden","Beratung: Anwalt-Erstgespräch oder Mediation vereinbaren"],
 prem:"Vertiefung: Fahrplan Trennungsjahr Monat für Monat, Unterhalts-Grundrechnung mit Beispiel und Checkliste „Versicherungen & Steuerklasse nach Trennung“."},

{id:"pflegeang",k:"familie",a:[35,70],s:["Pflegefall","Krankheit"],t:"Eltern & Angehörige pflegen",
 kurz:"Der Pflegefall in der Familie kommt fast immer plötzlich. Wer Pflegegrade, Leistungen und Entlastungsangebote kennt, organisiert Hilfe, statt sich selbst aufzureiben.",
 p:["Pflegegrad beantragen (Pflegekasse anrufen genügt) — Leistungen gibt es erst ab Antrag; MD-Begutachtung mit Pflegetagebuch vorbereiten.","Leistungsbausteine: Pflegegeld (Angehörigenpflege), Pflegesachleistung (Dienst), Kombination, Tages-/Kurzzeit-/Verhinderungspflege, Entlastungsbetrag, Zuschüsse für Wohnungsumbau und Hausnotruf.","Beruf & Pflege: kurzfristige Freistellung bis 10 Tage (mit Pflegeunterstützungsgeld), Pflegezeit bis 6 Monate, Familienpflegezeit — Ansprüche je nach Betriebsgröße.","Pflegende Angehörige sind rentenversichert (unter Bedingungen) — prüfen lassen, es ist bares Geld im Alter.","Eigene Grenzen ernst nehmen: Pflegekurse, Selbsthilfegruppen und professionelle Teil-Entlastung verhindern den Zusammenbruch der Hauptpflegeperson.","Rechtzeitig klären: Vorsorgevollmacht und Patientenverfügung der Eltern, solange sie entscheidungsfähig sind."],
 c:["Pflegegrad-Antrag stellen, Pflegetagebuch 1 Woche führen","Pflegestützpunkt-Beratung (kostenlos) nutzen","Entlastungsbetrag & Verhinderungspflege aktivieren","Familienkonferenz: Aufgaben und Kosten verteilen"],
 prem:"Vertiefung: Leistungstabelle aller Pflegegrade, Vorbereitung auf die MD-Begutachtung (häufige Fehler) und Finanzierungsbeispiel häusliche Pflege vs. Heim."},

/* ---------- GESUNDHEIT & PSYCHE ---------- */
{id:"krankenvers",k:"gesundheit",a:[18,100],s:["Berufseinstieg","Selbstständigkeit","Krankheit"],t:"Krankenversicherung & der Weg durchs Gesundheitssystem",
 kurz:"Gesetzlich oder privat, Hausarzt oder Facharzt, Krankschreibung oder Krankengeld — wer das System versteht, bekommt schneller die richtige Behandlung und verschenkt kein Geld.",
 p:["GKV vs. PKV: Gesetzlich zahlt nach Einkommen und versichert Familie kostenfrei mit; privat lockt jung mit Leistungen, wird im Alter teuer und ist schwer reversibel — Wechsel gut überlegen.","Hausarzt als Lotse: koordiniert Fachärzte, kennt die Historie; Termine über die 116117-Terminservicestelle, im Notfall 112, ärztlicher Bereitschaftsdienst 116117.","Krankschreibung: unverzüglich melden, AU spätestens nach Arbeitgeber-Vorgabe; nach 6 Wochen Lohnfortzahlung übernimmt die Kasse Krankengeld (~70 % brutto, max. 90 % netto).","Zweitmeinung ist Ihr Recht — bei großen Eingriffen aktiv einholen; Kassen fördern strukturierte Zweitmeinungsverfahren.","Zusatzleistungen prüfen: Zahnersatz-Bonusheft, Wahltarife, Zusatzversicherungen (Zähne, Brille, Krankenhaus) nur bei realem Bedarf.","Patientenrechte: Einsicht in die eigene Akte, verständliche Aufklärung, Kostenvoranschlag bei IGeL-Angeboten (oft verzichtbar)."],
 c:["Bonusheft Zahnvorsorge jährlich stempeln lassen","Hausarztpraxis wählen und Erstgespräch machen","Krankmeldungs-Prozess des Arbeitgebers kennen","Notfallnummern & Versichertenkarte ins Portemonnaie/Handy"],
 prem:"Vertiefung: GKV/PKV-Entscheidungsbaum für Angestellte, Beamte und Selbstständige, Krankengeld-Rechenbeispiel und IGeL-Bewertungsliste."},

{id:"vorsorgeunt",k:"gesundheit",a:[18,100],s:["Krankheit"],t:"Vorsorgeuntersuchungen: der Gesundheits-Fahrplan",
 kurz:"Die meisten schweren Krankheiten sind früh erkannt gut behandelbar. Die Kassen zahlen ein festes Vorsorgeprogramm — man muss es nur abrufen.",
 p:["Ab 18: Zahnvorsorge 1–2×/Jahr; Frauen: jährliche Genitaluntersuchung, ab 20 Pap-Abstrich-Programm, ab 30 Brustabtastung.","Ab 35: Check-up (Herz-Kreislauf, Diabetes, Nieren) alle 3 Jahre — einmalig auch zwischen 18 und 34; Hautkrebs-Screening alle 2 Jahre.","Ab 50: Darmkrebsvorsorge (Stuhltest bzw. Koloskopie — Männer ab 50, Frauen ab 55 Koloskopie), Frauen 50–75 Mammographie-Einladung alle 2 Jahre, Männer ab 45 Prostata-Check.","Impfstatus pflegen: Tetanus/Diphtherie alle 10 Jahre auffrischen, Empfehlungen der STIKO (Grippe ab 60, Pneumokokken, Gürtelrose) beachten.","Zahlen kennen lohnt: Blutdruck, Blutzucker, Cholesterin, BMI/Bauchumfang — die vier stillen Risikomarker.","Vorsorge ersetzt nicht Aufmerksamkeit: Neue Knoten, Blut in Ausscheidungen, unerklärlicher Gewichtsverlust → zeitnah abklären."],
 c:["Impfpass prüfen/auffrischen","Anstehende Vorsorgen für das eigene Alter terminieren","Zahnarzt-Bonusheft führen","Eigene Basiswerte (Blutdruck etc.) notieren"],
 prem:"Vertiefung: Vorsorge-Kalender nach Alter und Geschlecht als Übersichtstabelle plus Erinnerungs-Vorlage für die Familie."},

{id:"mental",k:"gesundheit",a:[14,100],s:["Krankheit","Jobverlust","Trennung","Todesfall"],t:"Mentale Gesundheit: Vorsorgen, erkennen, Hilfe finden",
 kurz:"Psychische Gesundheit folgt denselben Regeln wie körperliche: Sie braucht Pflege, hat Frühwarnzeichen, und Behandlung wirkt. Hilfe zu suchen ist Kompetenz, nicht Schwäche.",
 p:["Schutzfaktoren pflegen: Schlaf, Bewegung, Tageslicht, soziale Kontakte und Pausen sind keine Wellness, sondern Psychohygiene.","Warnzeichen ernst nehmen: Wochenlange Erschöpfung, Freudlosigkeit, Schlafstörungen, sozialer Rückzug oder Reizbarkeit sind Anlass für ein ärztliches Gespräch — der Hausarzt ist eine gute erste Anlaufstelle.","Weg zur Psychotherapie: Psychotherapeutische Sprechstunde (Termine über 116117) → Probatorik → Therapie; gesetzliche Kassen zahlen Richtlinientherapie.","Wartezeiten überbrücken: Beratungsstellen, Gruppenangebote, geprüfte digitale Gesundheitsanwendungen (DiGA auf Rezept).","In akuten Krisen zählt sofortige Hilfe: Sich jemandem anvertrauen, ärztliche oder telefonische Krisendienste kontaktieren — niemand muss das allein durchstehen.","Am Arbeitsplatz: Überlastung früh ansprechen; Wiedereingliederung nach längerer Krankheit (Hamburger Modell) erleichtert die Rückkehr."],
 c:["Eigene Frühwarnzeichen kennen und notieren","Schlaf-/Bewegungs-Basics als feste Routine","Bei anhaltenden Symptomen: Termin über 116117","Notfallkontakte (Vertrauensperson, Krisendienst) im Handy"],
 prem:"Vertiefung: Wegweiser durch das Therapiesystem (Verfahren, Kostenerstattung bei vollem Wartelisten-Stau) und ein Selbstfürsorge-Wochenplan. Hinweis: ersetzt keine Diagnose oder Behandlung."},

{id:"fitness",k:"gesundheit",a:[16,100],s:[],t:"Bewegung, Schlaf & Ernährung: die Basics, die wirken",
 kurz:"Drei unspektakuläre Gewohnheiten schlagen jedes Wundermittel: ausreichend Bewegung, 7–9 Stunden Schlaf und überwiegend unverarbeitetes Essen.",
 p:["Bewegung: WHO-Richtwert ~150 Minuten moderate Aktivität pro Woche plus 2× Krafttraining — zügiges Gehen zählt; Muskelerhalt wird ab 40 zur Rentenversicherung des Körpers.","Schlaf: feste Zeiten, dunkles kühles Zimmer, Koffein nach dem Mittag meiden, Bildschirme vor dem Schlafen reduzieren — Schlafmangel sabotiert Stimmung, Gewicht und Immunsystem.","Ernährung 80/20: viel Gemüse, Hülsenfrüchte, Vollkorn, ausreichend Protein; stark Verarbeitetes, Zuckergetränke und Alkohol als Ausnahme statt Standard.","Keine Verbote, sondern Umgebung gestalten: Gesundes sichtbar, Süßes unzugänglich — Willenskraft ist überschätzt, Gewohnheit unterschätzt.","Realistisch starten: 2 Trainingseinheiten/Woche, die man durchhält, schlagen den 6-Tage-Plan, der nach 3 Wochen stirbt.","Messbar machen: Schritte, Trainingstagebuch oder Wiederholungen — Fortschritt motiviert mehr als Vorsätze."],
 c:["2 feste Bewegungs-Termine in den Kalender","Schlaffenster definieren (z. B. 23–7 Uhr)","1 Standard-Frühstück/-Mittag gesund „vorentscheiden“","Jahres-Check: Gewicht, Ausdauer, Kraftwerte"],
 prem:"Vertiefung: Einsteiger-Trainingsplan für 2×/Woche ohne Studio, Schlafhygiene-Protokoll und eine Einkaufslisten-Vorlage für 7 Tage ausgewogene Ernährung."},

/* ---------- RECHT & BÜROKRATIE ---------- */
{id:"behoerden",k:"recht",a:[16,100],s:["Erste Wohnung","Heirat","Kind bekommen"],t:"Behörden & Dokumente: das persönliche Ordnungssystem",
 kurz:"Erwachsensein heißt auch: Papiere haben, wenn man sie braucht. Ein einziger gut sortierter Ordner (plus digitale Kopie) spart über die Jahre Tage an Suchzeit und Gebühren.",
 p:["Lebenswichtige Dokumente: Geburtsurkunde, Ausweis/Pass, Zeugnisse, Arbeitsverträge, Renten-/Sozialversicherungsnachweise, Versicherungspolicen, Impfpass, Mietverträge, Steuerbescheide.","Aufbewahrungsfristen kennen: Steuerunterlagen privat mind. bis Bescheid bestandskräftig (Empfehlung 4+ Jahre), Handwerkerrechnungen 2 Jahre, Rentennachweise dauerhaft.","Notfallordner anlegen: Vollmachten, Verfügungen, Versicherungen, Kontenliste, Passwörter-Hinweis — Angehörige müssen ihn finden können.","Digital sichern: Scans verschlüsselt ablegen plus 1 Backup außer Haus; Ausweis-Kopien nur geschwärzt weitergeben.","Behördengänge planen: Termine fast überall online buchbar; Personalausweis rechtzeitig verlängern (Gültigkeit prüfen vor Reisen).","Verwaltungssprache übersetzen: Bescheide enthalten immer eine Rechtsbehelfsbelehrung — Widerspruchsfristen (oft 1 Monat) sind hart."],
 c:["Dokumenten-Ordner mit Registern anlegen","Notfallordner erstellen und Ablageort kommunizieren","Ablaufdaten von Ausweis/Pass in den Kalender","Digitale Sicherungskopie + Backup einrichten"],
 prem:"Vertiefung: Komplette Dokumenten-Matrix (Was? Wie lange? Original oder Kopie?) und Notfallordner-Inhaltsverzeichnis als Vorlage."},

{id:"vertraege",k:"recht",a:[16,100],s:["Erste Wohnung","Schulden"],t:"Verträge, Widerruf & Verbraucherrechte",
 kurz:"Jeder Klick auf „Kaufen“ ist ein Vertrag. Wer Widerrufsrecht, Gewährleistung und Kündigungsregeln kennt, lässt sich weder von Shops noch von Abofallen über den Tisch ziehen.",
 p:["Widerruf: Online- und Haustürgeschäfte 14 Tage ohne Gründe widerrufbar (Ausnahmen: u. a. Maßanfertigung, entsiegelte Hygieneartikel); im Laden gekauft gilt kein generelles Rückgaberecht — Kulanz ist freiwillig.","Gewährleistung ≠ Garantie: 2 Jahre gesetzliche Mängelhaftung des Verkäufers (bei Gebrauchtem verkürzbar auf 1 Jahr); Garantie ist eine freiwillige Zusatzleistung des Herstellers.","Kündigungs-Basics: Laufzeitverträge sind nach der Mindestlaufzeit monatlich kündbar; Kündigungsbutton ist für Online-Abos Pflicht; Fristen im Kalender führen.","Inkasso prüfen statt zahlen: Forderung berechtigt? Inkassokosten überhöht? Musterbriefe der Verbraucherzentralen nutzen; unberechtigte Forderungen schriftlich bestreiten.","Mahnbescheid niemals ignorieren: Binnen 2 Wochen Widerspruch einlegen, sonst droht Vollstreckungstitel — auch bei unberechtigten Forderungen.","Hilfe holen: Verbraucherzentralen beraten günstig; Schlichtungsstellen (z. B. für Flug, Bank, Energie) sind kostenlos."],
 c:["Abo-/Vertragsliste mit Kündigungsfristen führen","Widerrufsfristen bei Onlinekäufen notieren","Kaufbelege 2 Jahre aufbewahren (Gewährleistung)","Bei Inkasso: Forderung prüfen, nicht reflexhaft zahlen"],
 prem:"Vertiefung: Musterschreiben-Paket (Widerruf, Mängelrüge, Inkasso-Bestreiten, Kündigung) und Entscheidungsbaum „Mahnung erhalten — was jetzt?“."},

{id:"vollmachten",k:"recht",a:[18,100],s:["Heirat","Pflegefall","Krankheit","Ruhestand"],t:"Vorsorgevollmacht, Patientenverfügung & Betreuung",
 kurz:"Ein Unfall kann jeden in jedem Alter entscheidungsunfähig machen — und Ehepartner dürfen dann nicht automatisch alles regeln. Drei Dokumente sichern den eigenen Willen.",
 p:["Vorsorgevollmacht: bevollmächtigt eine Vertrauensperson für Finanzen, Behörden, Gesundheit und Aufenthalt — verhindert ein gerichtliches Betreuungsverfahren; für Immobiliengeschäfte notarielle Form nötig.","Patientenverfügung: legt fest, welche medizinischen Maßnahmen man in konkreten Situationen (irreversibles Koma, Sterbephase) wünscht oder ablehnt — möglichst konkret formulieren, Textbausteine des Justizministeriums nutzen.","Betreuungsverfügung: benennt, wen das Gericht als Betreuer einsetzen soll, falls keine Vollmacht greift.","Ohne Vorsorge gilt seit 2023 nur ein begrenztes Not-Vertretungsrecht für Ehegatten in Gesundheitsfragen (max. 6 Monate) — kein Ersatz für eine Vollmacht.","Auffindbarkeit sichern: Originale im Notfallordner, Hinweiskarte ins Portemonnaie, Registrierung im Zentralen Vorsorgeregister.","Aktualität: alle 2–3 Jahre prüfen, mit Datum neu bestätigen, mit Bevollmächtigten und Hausarzt besprechen."],
 c:["Vorsorgevollmacht ausfüllen und unterschreiben","Patientenverfügung mit konkreten Szenarien erstellen","Im Zentralen Vorsorgeregister registrieren","Kopien an Bevollmächtigte, Original-Fundort mitteilen"],
 prem:"Vertiefung: Kommentierte Formulierungshilfen Abschnitt für Abschnitt, typische Unwirksamkeits-Fehler und Gesprächsleitfaden für das Familiengespräch."},

/* ---------- FREIZEIT & HOBBYS ---------- */
{id:"hobbys",k:"freizeit",a:[14,100],s:["Ruhestand","Jobverlust"],t:"Hobbys finden & dranbleiben",
 kurz:"Hobbys sind keine Zeitverschwendung, sondern Lebensinfrastruktur: Sie liefern Ausgleich, Können, Freundschaften und Identität jenseits des Jobs — besonders in Übergangsphasen.",
 p:["Suchstrategie: An Kindheitsfreuden anknüpfen, 3 Dinge je 4 Wochen testen (Schnupperkurse, Leihausrüstung), erst dann investieren.","Mischung anstreben: etwas Körperliches, etwas Kreatives, etwas Soziales — zusammen decken sie die psychischen Grundbedürfnisse ab.","Dranbleiben durch Struktur: fester Wochentermin, Verabredung mit anderen, kleine sichtbare Fortschritte (Kurslevel, Projekte).","Budget-bewusst starten: Gebraucht kaufen, Vereins- statt Studio-Preise, Bibliotheken/Repair-Cafés/Volkshochschule nutzen.","Hobby ≠ Nebenjob-Zwang: Nicht alles muss monetarisiert werden — zweckfreie Zeit ist der Punkt.","Im Lebenslauf wirken Hobbys mit Substanz (Vereinsamt, Trainerlizenz, Projekte) als echte Soft-Skill-Belege."],
 c:["Liste: 5 Dinge, die als Kind Freude machten","3 Schnupperangebote in den nächsten 6 Wochen buchen","Festen Hobby-Slot im Kalender blocken","Nach 3 Monaten Bilanz: weiter, wechseln, vertiefen?"],
 prem:"Vertiefung: Hobby-Finder nach Persönlichkeit und Budget (40 Vorschläge) plus Kostenvergleich Verein vs. kommerzielle Anbieter."},

{id:"ehrenamt",k:"freizeit",a:[14,100],s:["Ruhestand"],t:"Ehrenamt & Vereinsleben",
 kurz:"Rund jeder dritte Mensch in Deutschland engagiert sich freiwillig — und gewinnt dabei Netzwerk, Sinn und Fähigkeiten, die kein Kurs vermittelt.",
 p:["Einstieg niedrigschwellig: Freiwilligenagenturen, Vereine vor Ort, Feuerwehr, Tafeln, Sportvereine, Hospizdienste — fast überall wird gesucht.","Absicherung: Engagierte sind i. d. R. über Träger oder gesetzliche Unfall-/Sammelversicherungen der Länder geschützt — vorher klären.","Steuerfreibeträge kennen: Übungsleiterpauschale (Training, Betreuung, Pflege) und Ehrenamtspauschale machen Aufwandsentschädigungen steuerfrei.","Vereins-Basics: Mitgliederversammlung, Vorstand, Satzung — wer Verantwortung übernimmt, sollte Haftung und D&O-Absicherung des Vereins kennen.","Zeit realistisch zusagen: Lieber 2 verlässliche Stunden pro Woche als großes Versprechen mit Burnout-Ende.","Engagement wirkt doppelt: nachweislich positiv auf Zufriedenheit und Gesundheit — besonders im Ruhestand gegen das „Rentenloch“."],
 c:["Interessenfeld wählen (Mensch, Tier, Umwelt, Kultur, Sport)","Freiwilligenagentur oder Verein kontaktieren","Probemitarbeit vereinbaren, Versicherungsschutz erfragen","Pauschalen bei der Steuer angeben"],
 prem:"Vertiefung: Übersicht der Engagement-Felder mit Zeitbedarf, Pauschalen-Rechenbeispiel und Mini-Guide „Vereinsvorstand ohne Haftungsfalle“."},

{id:"reisen",k:"freizeit",a:[16,100],s:[],t:"Reisen planen: Budget, Sicherheit, Recht",
 kurz:"Gute Reisen entstehen aus guter Vorbereitung: realistisches Budget, die richtigen Dokumente und Wissen um Fluggast- und Stornorechte ersparen die teuersten Urlaubsfehler.",
 p:["Budget-Rahmen: Transport + Unterkunft + Tagessatz (Essen, Aktivitäten) + 15 % Puffer; Nebensaison und flexible Daten sparen oft 30–50 %.","Dokumente: Pass-Gültigkeit (viele Länder verlangen 6 Monate über Rückreise hinaus), Visa/ESTA-Anforderungen, internationale Führerschein-Regeln früh prüfen.","Pflichtschutz: Auslandsreisekrankenversicherung (wenige Euro/Jahr) — die GKV deckt außerhalb Europas fast nichts, Rücktransport nie.","Fluggastrechte (EU): Bei großer Verspätung/Annullierung stehen je nach Strecke pauschale Entschädigungen zu; Ansprüche schriftlich geltend machen.","Pauschalreise vs. Einzelbuchung: Pauschal bietet Insolvenzschutz und einen Ansprechpartner; individuell ist flexibler, aber selbst abzusichern.","Sicherheit: Reise- und Sicherheitshinweise des Auswärtigen Amts checken, Dokumenten-Scans in die Cloud, Notfallnummern notieren."],
 c:["Pass-/Visa-Check 3 Monate vor Abreise","Auslandskrankenversicherung abschließen","Zahlungsmix: Kreditkarte ohne Auslandsgebühr + etwas Bargeld","Kopien wichtiger Dokumente digital hinterlegen"],
 prem:"Vertiefung: Reisebudget-Vorlage, Fluggastrechte-Tabelle mit Entschädigungshöhen und Packlisten-System für jede Reiseart."},

/* ---------- ALTER & LEBENSENDE ---------- */
{id:"ruhestand",k:"alter",a:[55,70],s:["Ruhestand"],t:"Ruhestand planen & Rente beantragen",
 kurz:"Der Ruhestand beginnt auf dem Papier Jahre vor dem letzten Arbeitstag. Wer Konto klärt, Abschläge versteht und rechtzeitig beantragt, vermeidet Rentenlücken im wörtlichen Sinn.",
 p:["Kontenklärung mit ~55: Rentenkonto bei der Deutschen Rentenversicherung prüfen — fehlende Zeiten (Ausbildung, Kinder, Krankheit) nachweisen lassen.","Renteneintritt: Regelaltersgrenze steigt schrittweise auf 67; früher gehen kostet i. d. R. 0,3 % Abschlag pro Monat — dauerhaft; besonders langjährig Versicherte (45 Jahre) können früher abschlagsfrei.","Rentenantrag ~3 Monate vor gewünschtem Beginn stellen — die Rente kommt nicht automatisch.","Hinzuverdienst ist bei Altersrenten inzwischen weitgehend frei möglich; Teilrente und gleitende Übergänge prüfen.","Finanz-Übergang planen: Krankenversicherung der Rentner, Steuerpflicht der Rente, Auszahlpläne für Depot/bAV strukturieren.","Der nicht-finanzielle Teil ist der schwerste: Struktur, Aufgaben und Kontakte für die 2.000 neuen freien Stunden pro Jahr bewusst gestalten."],
 c:["Renteninformation & Kontenklärung anstoßen","Beratungstermin bei der DRV (kostenlos) buchen","Rentenantrag 3 Monate vor Start stellen","Plan für Woche 1 nach dem Abschied: Projekte, Ehrenamt, Routine"],
 prem:"Vertiefung: Abschlags-Rechenbeispiele (63 vs. 65 vs. 67), Checkliste „12 Monate vor Rentenbeginn“ und Entnahmestrategie fürs Ersparte."},

{id:"pflegegrad",k:"alter",a:[60,100],s:["Pflegefall","Krankheit"],t:"Pflegegrade, Pflegeheim & Finanzierung",
 kurz:"Pflege ist organisierbar — und teilfinanziert. Entscheidend ist der richtige Pflegegrad, die Wahl der Versorgungsform und ein klarer Blick auf den Eigenanteil.",
 p:["Pflegegrade 1–5 bemessen die Selbstständigkeit, nicht die Diagnose; Begutachtung durch den Medizinischen Dienst nach Antrag bei der Pflegekasse.","Versorgungsformen: häusliche Pflege (Angehörige/Dienst), Tagespflege, betreutes Wohnen, ambulante WGs, vollstationäres Heim — Kombinationen sind üblich.","Heimkosten: Pflegekasse zahlt je Grad einen Festbetrag; der einrichtungseinheitliche Eigenanteil plus Unterkunft/Verpflegung/Investitionen bleibt — oft 2.000–3.000 €+ monatlich, mit Zuschlägen je Aufenthaltsdauer.","Reicht das Geld nicht: „Hilfe zur Pflege“ vom Sozialamt; Kinder haften erst ab 100.000 € Jahresbruttoeinkommen (Angehörigen-Entlastungsgesetz).","Heim auswählen: unangemeldet besichtigen, Personal fragen, Transparenzberichte lesen, Probewohnen vereinbaren, Heimvertrag prüfen lassen.","Würde wahren: Biografiebogen, vertraute Gegenstände und regelmäßige Besuche wirken stärker auf Lebensqualität als jede Ausstattung."],
 c:["Pflegegrad-Antrag und Beratungstermin (Pflegestützpunkt)","Kostenaufstellung: Leistungen vs. Eigenanteil","3 Einrichtungen besichtigen und vergleichen","Vollmachten & Verfügungen der betroffenen Person sichern"],
 prem:"Vertiefung: Eigenanteils-Rechenbeispiel je Pflegegrad, Heim-Besichtigungsbogen mit 30 Prüfpunkten und Wegweiser „Hilfe zur Pflege“ beantragen."},

{id:"testament",k:"alter",a:[30,100],s:["Heirat","Kind bekommen","Hauskauf","Todesfall"],t:"Testament & Erbrecht: den Nachlass selbst bestimmen",
 kurz:"Ohne Testament entscheidet das Gesetz — und das passt oft nicht zur eigenen Familie. Ein gültiges Testament kostet wenig Aufwand und erspart Erben Streit und Steuern.",
 p:["Gesetzliche Erbfolge: Ehepartner erbt neben Kindern meist die Hälfte, Kinder teilen den Rest; unverheiratete Partner erben nichts — gar nichts.","Formgültig: Eigenhändiges Testament komplett handschriftlich mit Ort, Datum, Unterschrift — oder notariell (ersetzt später oft den Erbschein und spart Kosten).","Pflichtteil: Kinder, Ehepartner (und ggf. Eltern) können auch bei Enterbung die Hälfte ihres gesetzlichen Erbteils in Geld fordern.","Berliner Testament (Ehegatten setzen sich gegenseitig ein) ist beliebt, hat aber Bindungswirkung und Steuer-Nachteile — beraten lassen.","Steuerfreibeträge nutzen: Ehepartner 500.000 €, je Kind 400.000 € — alle 10 Jahre auch für Schenkungen zu Lebzeiten.","Aufbewahrung: amtliche Verwahrung beim Nachlassgericht (geringe Gebühr) verhindert „Verschwinden“; digitalen Nachlass (Konten, Verträge, Accounts) mitregeln."],
 c:["Vermögensliste und Wunsch-Verteilung notieren","Testament handschriftlich verfassen oder Notartermin","Amtliche Verwahrung beim Nachlassgericht","Digitalen Nachlass regeln (Zugangsliste im Notfallordner)"],
 prem:"Vertiefung: Formulierungs-Bausteine für typische Konstellationen (Patchwork, Unverheiratete, Unternehmer), Pflichtteils-Rechenbeispiel und Schenkungs-Strategie über Freibeträge."},

{id:"bestattung",k:"alter",a:[40,100],s:["Todesfall"],t:"Bestattung organisieren: Ablauf, Formen, Kosten",
 kurz:"Im Trauerfall müssen Angehörige binnen Tagen Entscheidungen über tausende Euro treffen. Wer Ablauf und Preisspannen kennt — oder selbst vorsorgt — nimmt ihnen diese Last.",
 p:["Erste Schritte im Todesfall: Arzt für Todesbescheinigung rufen, Bestatter beauftragen (in Ruhe vergleichen — keine gesetzliche Eile über die Bestattungsfristen der Länder hinaus), Sterbeurkunde beim Standesamt.","Bestattungsformen: Erdbestattung, Feuerbestattung mit Urnenbeisetzung, Baum-/Waldbestattung, Seebestattung — Spielräume und Pflichten regelt das Landes-Bestattungsrecht (in Deutschland gilt grds. Friedhofs-/Beisetzungspflicht für die Asche).","Kostenrahmen: gesamt häufig ~4.000–10.000 €+ (Bestatter, Grab, Grabnutzungsgebühren, Stein, Trauerfeier) — Angebote mit Einzelposten vergleichen, es gibt große Unterschiede.","Bestattungspflicht & -kosten tragen die nächsten Angehörigen (Reihenfolge je Landesrecht) — unabhängig vom Erbe; bei Bedürftigkeit übernimmt das Sozialamt eine einfache Bestattung.","Vorsorge entlastet: Bestattungsverfügung (Wünsche schriftlich), Bestattungsvorsorgevertrag mit Treuhandkonto — Sterbegeldversicherungen sind oft teurer als Selbst-Ansparen.","Danach: Sterbeurkunden mehrfach ausstellen lassen (Banken, Versicherungen, Rente) — Hinterbliebenenrente und Lebensversicherungen fristgerecht melden (Lebensversicherer oft binnen 72 Stunden!)."],
 c:["Eigene Wünsche in einer Bestattungsverfügung festhalten","Im Trauerfall: 2–3 Bestatter-Angebote einholen","Sterbeurkunde in 5+ Ausfertigungen beantragen","Versicherungen/Rente/Arbeitgeber fristgerecht informieren"],
 prem:"Vertiefung: Kostentabelle aller Bestattungsformen mit Beispielangeboten, 72-Stunden-Checkliste für Angehörige und Vorsorgevertrag-Prüfpunkte."},

{id:"trauer",k:"alter",a:[16,100],s:["Todesfall"],t:"Trauer, Nachlass & Neubeginn",
 kurz:"Nach der Beerdigung beginnt die eigentliche Arbeit: der Papierkrieg des Nachlasses — und die Trauer, die keinen Zeitplan kennt. Beides darf man sich erleichtern lassen.",
 p:["Erbschaft prüfen, bevor man handelt: Ausschlagung ist nur binnen 6 Wochen ab Kenntnis möglich — bei überschuldetem Nachlass entscheidend; wer Nachlassgegenstände „verwertet“, nimmt faktisch an.","Nachlass-Bürokratie: Erbschein (falls nötig) beim Nachlassgericht, Konten mit Sterbeurkunde/Erbschein umschreiben, laufende Verträge kündigen (Sonderkündigungsrechte nutzen), Erbschaftsteuer-Anzeige binnen 3 Monaten ans Finanzamt.","Hinterbliebenenrente: Witwen-/Witwerrente und Halbwaisenrente beantragen; im „Sterbevierteljahr“ wird die Rente des Verstorbenen zunächst voll weitergezahlt.","Digitaler Nachlass: Accounts vererben sich mit — Plattform-Gedenkstatus oder Löschung mit Sterbeurkunde beantragen.","Trauer ist keine Krankheit: Wellen, Schuldgefühle und Erschöpfung sind normal; Rituale, Erinnerungsorte und Reden über die Person helfen.","Hilfe annehmen: Trauergruppen, Hospizvereine und Trauerbegleitung sind kostenlos oder günstig; wenn Trauer das Leben dauerhaft blockiert, ist professionelle Unterstützung ein guter Schritt."],
 c:["6-Wochen-Frist prüfen: Nachlass solvent?","Vertragsliste des Verstorbenen abarbeiten","Hinterbliebenenrente & Versicherungen beantragen","Sich selbst einen Trauer-Anker geben: Gruppe, Ritual, Gespräch"],
 prem:"Vertiefung: Nachlass-Abwicklungsplan in 10 Schritten mit Fristen-Übersicht, Musterbrief Vertragskündigung im Todesfall und Wegweiser Trauerbegleitung."},
{id:"kindgesundheit",k:"gesundheit",a:[20,48],s:["Kind bekommen","Krankheit"],t:"Kindergesundheit: U-Untersuchungen, Impfen, krankes Kind",
 kurz:"Vom U-Heft bis zur Fiebernacht: Das Vorsorgesystem für Kinder ist eng getaktet und gut — wenn man die Termine kennt, die Warnzeichen einordnen kann und weiß, welche Rechte berufstätige Eltern beim kranken Kind haben.",
 p:["U1–U9 plus J1: Die Früherkennungsuntersuchungen vom Kreißsaal (U1) bis zum Jugendcheck (J1, 12–14 Jahre) sind kostenlos und in vielen Bundesländern quasi verpflichtend — das gelbe U-Heft ist das wichtigste Gesundheitsdokument des Kindes.","Impfen nach STIKO-Kalender: Die Grundimmunisierung läuft überwiegend im ersten Lebensjahr; Kita-Aufnahme setzt Masernschutz gesetzlich voraus (Masernschutzgesetz).","Fieber ist Symptom, nicht Krankheit: Entscheidend ist der Allgemeinzustand — trinkt, reagiert, spielt das Kind zwischendurch? Höhe allein sagt wenig.","Rote-Flaggen-Wissen rettet Nerven und Leben: schrilles Schreien, Nackensteifigkeit, nicht wegdrückbare Hauteinblutungen, Trinkverweigerung beim Säugling, Atemnot, Fieber unter 3 Monaten — sofort ärztlich abklären (116117 / Kinderklinik, im Notfall 112).","Kinderkrankengeld: Gesetzlich versicherte Eltern erhalten pro Kind und Elternteil bezahlte Freistellungstage bei Krankheit des Kindes unter 12 — Attest ab Tag 1 je nach Kasse nötig.","Hausapotheke fürs Kind: Fieberthermometer, altersgerechtes Fiebermittel nach ärztlicher Rücksprache, Elektrolytlösung, Pflaster, Zeckenkarte — keine Erwachsenenmedikamente teilen!"],
 c:["U-Termine direkt nach Geburt alle ins Familienkalender-System eintragen","Impfpass bei jeder U mitnehmen und prüfen lassen","Nummern griffbereit: Kinderarzt, 116117, Giftnotruf des Bundeslands","Kinderkrankentage beim Arbeitgeber & der Kasse klären, bevor man sie braucht"],
 prem:"Vertiefung: Der komplette U- und Impf-Fahrplan als Tabelle, die Fieber-Entscheidungshilfe für nachts um 3, Giftnotruf-Wissen und der Kinderkrankengeld-Rechner für berufstätige Eltern."},
{id:"kindernaehrung",k:"gesundheit",a:[20,48],s:["Kind bekommen"],t:"Kinderernährung: von Beikost bis Gemüseverweigerung",
 kurz:"Kaum ein Thema macht Eltern mehr Druck — dabei ist die Studienlage entspannter als der Familientisch: Kinder regulieren Mengen erstaunlich gut selbst, wenn Erwachsene das Was und Wann bestimmen und das Wieviel dem Kind lassen.",
 p:["Beikost ab dem 5.–7. Monat nach Reifezeichen (sitzt mit Unterstützung, Zungenstoßreflex weg, Interesse am Essen) — ob Brei oder Fingerfood (Baby-led Weaning) ist Geschmackssache, die Sicherheit (keine ganzen Nüsse, Weintrauben halbieren!) nicht.","Die Arbeitsteilung nach Ellyn Satter ist der wirksamste Anti-Stress-Rahmen: Eltern entscheiden, was, wann und wo gegessen wird — das Kind entscheidet, ob und wie viel. Kein Zwang, kein Belohnen mit Nachtisch.","Neophobie ist normal: Ab ca. 2 Jahren lehnen fast alle Kinder Neues ab; ein Lebensmittel braucht oft 8–15 neutrale Begegnungen, bis es akzeptiert wird — anbieten, nicht kommentieren.","Getränke sind der größte Hebel: Wasser und ungesüßter Tee als Standard; Saft, Softdrinks und gesüßte Kindermilchprodukte sind Hauptquellen für Zuckerüberschuss und Karies.","Spezielle „Kinderlebensmittel“ sind Marketing: Quetschies, Kinderjoghurts und Frühstücksflocken sind meist süßer und teurer als die normale Variante.","Vitamin D im ersten Lebensjahr und Jod beim Kochen sind die zwei Supplement-Themen mit echter Relevanz — der Rest gehört in ärztliche Hände."],
 c:["Familientisch-Regel einführen: ein Gericht für alle, immer eine „sichere“ Komponente dabei","Feste Mahlzeiten- und Snackzeiten statt Dauergrasen","Wasser als Standardgetränk etablieren (Vorbild zählt!)","Bei Gedeih- oder Gewichtssorgen: Perzentilkurve beim Kinderarzt besprechen statt selbst Diäten basteln"],
 prem:"Vertiefung: Beikost-Fahrplan mit Sicherheitsliste, die Satter-Methode im Alltag (inkl. Skript für den Machtkampf am Tisch), Nährstoff-Fokus vegetarisch/vegan aufgezogener Kinder und die Quetschie-Wahrheit."},
{id:"erziehungsstile",k:"familie",a:[20,50],s:["Kind bekommen"],t:"Erziehungsstile & -theorien: von Bindung bis Montessori",
 kurz:"Autoritär, antiautoritär, bedürfnisorientiert, Montessori, Waldorf — hinter den Etiketten stehen 70 Jahre Forschung mit erstaunlich klarem Ergebnis: Auf die Kombination aus Wärme und Struktur kommt es an, nicht auf die reine Lehre.",
 p:["Die klassische Matrix (nach Baumrind/Maccoby): zwei Achsen — emotionale Wärme und Anforderungen/Kontrolle. Autoritativ (beides hoch) zeigt über Jahrzehnte und Kulturen die besten Ergebnisse für Selbstwert, Schulerfolg und psychische Gesundheit.","Autoritär (Kontrolle ohne Wärme) erzeugt Gehorsam nach außen und Angst oder Rebellion nach innen; permissiv (Wärme ohne Grenzen) erschwert Frustrationstoleranz; vernachlässigend schadet am meisten.","Bindungstheorie (Bowlby/Ainsworth): Feinfühlige, verlässliche Reaktion in den ersten Jahren baut sichere Bindung — das Fundament, auf dem Erziehung überhaupt wirkt. Verwöhnen durch Trösten ist ein Mythos.","Bedürfnisorientierte Erziehung ist die moderne Übersetzung des autoritativen Stils — sie heißt ausdrücklich nicht grenzenlos: Bedürfnis ernst nehmen UND Grenze halten schließen sich nicht aus.","Pädagogische Konzepte (Montessori, Waldorf, Reggio, Pikler) sind Umgebungs- und Lernphilosophien, keine Erziehungsstile — sie lassen sich teils kombinieren und sind so gut wie die Menschen, die sie umsetzen.","Konsistenz schlägt Perfektion: Reparieren nach eigenen Fehlern (sich beim Kind entschuldigen!) ist nachweislich wichtiger als Fehlerfreiheit."],
 c:["Mit Partner:in die eigene Matrix-Position ehrlich verorten: Wo fehlt Wärme, wo Struktur?","3–5 nicht verhandelbare Familienregeln definieren — und beide halten sie gleich","Tägliche Exklusivzeit (10–15 Min, Kind bestimmt das Spiel) als Bindungsanker","Bei Konzept-Kitas/Schulen: Hospitieren statt Hochglanzbroschüre glauben"],
 prem:"Vertiefung: Die Stil-Matrix mit Alltagssituationen durchgespielt (Trotzanfall, Hausaufgaben, Mediengrenzen), Bindungstypen und ihre Langzeitfolgen, Montessori/Waldorf/Reggio im nüchternen Vergleich — plus Taschengeld-Tabelle als interaktives Tool."},
{id:"entwicklung",k:"familie",a:[20,48],s:["Kind bekommen"],t:"Kindliche Entwicklung verstehen: Meilensteine & Theorie",
 kurz:"Wann läuft, spricht, rechnet ein Kind — und wann muss man sich Sorgen machen? Entwicklungspsychologie im Schnellkurs: was Piaget, Erikson und die moderne Hirnforschung für den Familienalltag wirklich bedeuten.",
 p:["Meilensteine sind Korridore, keine Stichtage: Freies Laufen z. B. irgendwann zwischen 10 und 18 Monaten — entscheidend ist der Gesamtverlauf, nicht der Vergleich auf dem Spielplatz.","Piagets Stufen als Landkarte: sensomotorisch (0–2, Welt begreifen heißt anfassen), präoperational (2–7, magisches Denken, Egozentrismus ist Entwicklungsphase, kein Charakterfehler), konkret-operational (7–11, logisches Denken an Konkretem), formal-operational (ab ~12, abstraktes Denken).","Erikson ergänzt die emotionale Seite: Urvertrauen (Jahr 1), Autonomie (Trotzphase = gesunde Ich-Entwicklung!), Initiative, Werksinn (Grundschule), Identität (Pubertät).","Exekutive Funktionen (Impulskontrolle, Planung) reifen bis weit über 20 — ein Kleinkind KANN nicht warten wie ein Erwachsener, ein Teenager bewertet Risiken anders: Das ist Neurologie, nicht Unwille.","Sprache: Mit 2 Jahren ~50 Wörter und Zweiwortsätze als grobe Marke; bei Stagnation, fehlender Reaktion auf Ansprache oder Verlust erworbener Fähigkeiten früh abklären (Pädaudiologie, SPZ) — frühe Förderung wirkt am stärksten.","Spiel IST Entwicklung: Freies Spiel trainiert exekutive Funktionen besser als jedes Förderprogramm — Langeweile ist ein Feature."],
 c:["Sorgen konkret notieren und zur nächsten U mitnehmen statt googeln","Bei Verdacht: Hörtest zuerst — viele „Sprachprobleme“ sind Hörprobleme","Trotzphase reframen: Autonomieübung begleiten statt brechen","Pro Tag mindestens ein Block unverplante Spielzeit verteidigen"],
 prem:"Vertiefung: Meilenstein-Tabelle 0–6 Jahre mit Rote-Flaggen-Spalte, Piaget & Erikson in Alltagssprache, was die Trotzphase im Gehirn ist (und die 3-Schritte-Begleitung), Frühförderung & SPZ-Wegweiser."},
{id:"kita",k:"familie",a:[20,45],s:["Kind bekommen"],t:"Kita: Platz finden, Konzept wählen, Eingewöhnung meistern",
 kurz:"Der Rechtsanspruch ab dem 1. Geburtstag ist das Gesetz — die Warteliste die Realität. Wie man strategisch sucht, Qualität von Hochglanz unterscheidet und die Eingewöhnung so gestaltet, dass sie trägt.",
 p:["Früh listen lassen: In Großstädten ab Schwangerschaftsmitte auf 5–10 Listen bzw. ins zentrale Kita-Portal; Rechtsanspruch ab 1 Jahr notfalls per Widerspruch und Klage durchsetzen — Kommunen müssen sonst teils private Betreuung zahlen.","Qualität erkennt man nicht am Konzept-Namen, sondern am Betreuungsschlüssel, an der Personalfluktuation, am Ton zwischen Fachkraft und Kind und daran, ob beim Hospitieren Kinder vertieft spielen.","Eingewöhnung nach Berliner Modell: 2–4 Wochen einplanen — Grundphase mit Elternteil, erster kurzer Trennungsversuch ca. Tag 4, schrittweiser Ausbau; Weinen beim Abschied ist okay, wenn das Kind sich von der Bezugserzieherin trösten lässt.","Kindertagespflege (Tagesmutter/-vater) ist die gleichwertige, oft familiärere Alternative für unter Dreijährige — gleiche Förderlogik, gleiche Zuschüsse.","Kosten sind Ländersache: von beitragsfrei bis mehrere hundert Euro plus Essensgeld; Geschwisterrabatte und einkommensabhängige Ermäßigung beim Jugendamt prüfen.","Eltern-Kita-Beziehung pflegen: Tür-und-Angel-Gespräche ernst nehmen, Entwicklungsgespräche wahrnehmen, Konflikte zuerst mit der Fachkraft klären, dann mit der Leitung."],
 c:["Ab SSW 20: Listen/Portal-Anmeldung, Besichtigungstermine sammeln","Beim Hospitieren auf Ton, Schlüssel und spielende Kinder achten — nicht auf die Wandgestaltung","Für die Eingewöhnung 4 Wochen Puffer im Job einplanen (Elternzeit-Ende danach legen!)","Zuschüsse & Ermäßigungen beim Jugendamt abfragen"],
 prem:"Vertiefung: Die Hospitations-Checkliste mit 15 Qualitätssignalen, Berliner vs. Münchener Eingewöhnungsmodell im Detail, der Klageweg zum Kita-Platz Schritt für Schritt und das Krankheits-Karussell des ersten Kita-Jahres."},
{id:"einschulung",k:"familie",a:[24,50],s:["Kind bekommen"],t:"Einschulung & Schulzeit: Schulreife, Schulwahl, Lernbegleitung",
 kurz:"Die Schultüte ist der leichteste Teil. Davor stehen Schulreife-Frage und Schulwahl, danach sechs Jahre Grundschule, in denen Eltern vor allem eines lernen müssen: begleiten ohne zu übernehmen.",
 p:["Schulreife ist mehr als Buchstabenkenntnis: emotionale Stabilität (Frustration aushalten), Selbstständigkeit (anziehen, Bedürfnisse äußern), Konzentration ~15–20 Minuten und Stifthaltung zählen mehr als Vorlesen-Können — die Schuleingangsuntersuchung prüft genau das.","Rückstellung oder Kann-Kind-Einschulung sind Einzelfallentscheidungen: Das jüngste Kind der Klasse zu sein ist statistisch ein leichter Nachteil, der sich meist verwächst — Bauchgefühl von Eltern UND Erziehern ernst nehmen.","Grundschulwahl: In den meisten Ländern gilt der Schulbezirk; Ausnahmeanträge (Betreuung, Geschwister) sind möglich. Wichtiger als der Ruf der Schule ist die konkrete Lehrkraft-Stabilität und das Ganztagskonzept.","Hausaufgaben-Regel der Forschung: kurz, regelmäßig, selbstständig — Eltern sind für Rahmen (Zeit, Ort, Ruhe) zuständig, nicht für Richtigkeit; wer abends radiert und verbessert, trainiert dem Kind die Verantwortung ab.","Lese-Rechtschreib-Schwäche und Dyskalkulie früh testen lassen (Schulpsychologie, SPZ): Diagnose bringt Nachteilsausgleich und gezielte Förderung statt jahrelangem Üben-Frust.","Der Übergang nach Klasse 4 ist keine Lebensentscheidung: Schulformwechsel sind in beide Richtungen häufig und vorgesehen — Durchlässigkeit ist im System eingebaut."],
 c:["1,5 Jahre vor Einschulung: Schuleingangsuntersuchungs-Termin und Infoabende wahrnehmen","Schulweg gemeinsam trainieren — Selbstständigkeit ab Tag 1","Fester Hausaufgabenplatz + feste Zeit, Eltern in Rufweite statt am Tisch","Bei Lernfrust über Monate: Abklärung statt Nachhilfe-Karussell"],
 prem:"Vertiefung: Der Schulreife-Selbstcheck in 12 Punkten, Rückstellung Pro/Contra nach Studienlage, das Elterngespräch-Skript bei Schulproblemen und der Nachteilsausgleich-Wegweiser (LRS/Dyskalkulie/ADHS)."},
{id:"weihnachtsmann",k:"familie",a:[22,50],s:["Kind bekommen"],t:"Weihnachtsmann, Zahnfee & Co.: Magisches Denken und der Umgang mit „Lügen“",
 kurz:"Darf man Kindern den Weihnachtsmann „vormachen“? Die Entwicklungspsychologie ist entspannter als die Elternforen: Magisches Denken ist eine Entwicklungsphase, Fantasiegestalten sind Kulturgut — und die Aufklärung läuft fast immer sanfter ab als befürchtet.",
 p:["Magisches Denken (ca. 2–7 Jahre, Piagets präoperationale Phase) ist der Normalmodus des Kinderhirns: Grenzen zwischen Fantasie und Realität sind durchlässig — der Weihnachtsmann erfindet diese Phase nicht, er nutzt sie.","Die Forschung findet keine Hinweise auf Vertrauensschäden: Kinder, die die Wahrheit entdecken, reagieren überwiegend neutral bis stolz aufs eigene Kombinieren — Enttäuschung ist meist mild und kurz; manche Eltern trauern mehr als die Kinder.","Selbst herausfinden lassen ist der Königsweg: Typisch zwischen 6 und 8 stellen Kinder Testfragen („Wie schafft er alle Häuser in einer Nacht?“) — dann sokratisch zurückfragen („Was glaubst du denn?“) statt mit Aufwand gegenzusteuern.","Die Beförderungs-Aufklärung nimmt den Stachel: Wer Bescheid weiß, wird „Mitwisser“ und darf den Zauber für kleinere Geschwister mitgestalten — aus Belogen-Werden wird Eingeweiht-Sein.","Grenze des Spiels: Fantasiegestalten nicht als Erziehungsdrohung missbrauchen („Wenn du nicht brav bist, bringt er nichts“) — das verknüpft Magie mit Angst und Leistungsdruck.","Familien ohne Weihnachtsmann-Tradition (religiöse, kulturelle oder Prinzipien-Gründe) brauchen nur einen Satz fürs Kind: andere Familien spielen das Spiel — und man verdirbt anderen Kindern das Spiel nicht."],
 c:["Im Familienkreis (Großeltern!) eine Linie absprechen — inkl. Antwort auf Testfragen","Geschenke-Logistik wahren: Etiketten-Handschrift und Versteck bedenken","Bei Direktfrage mit ernstem Gesicht: ehrlich antworten und zum Mitwisser befördern","Niemals als Drohung oder Überwachung („er sieht alles“) einsetzen"],
 prem:"Vertiefung: Was die Studienlage zu Santa-Glaube und Vertrauen wirklich sagt, das Aufklärungsgespräch als Skript (mit dem berühmten „Jetzt bist du einer von uns“-Brief), Zahnfee-Ökonomie und der Umgang mit dem Kita-Spoiler."},
{id:"notfall",k:"gesundheit",a:[14,100],s:["Krankheit"],t:"Erste Hilfe & Notfallwissen: die Minuten, die zählen",
 kurz:"Im Ernstfall entscheidet nicht der letzte Erste-Hilfe-Kurs von vor 15 Jahren, sondern was man jetzt abrufen kann: die richtige Nummer, die Schlaganfall-Schnellprüfung, Drücken statt Zögern bei der Reanimation.",
 p:["Nummern-Logik: 112 bei Lebensgefahr (Bewusstlosigkeit, Atemnot, Brustschmerz, schwere Blutung, Schlaganfallverdacht) — 116117 für alles, was zum Arzt muss, aber bis morgen nicht warten kann; im Zweifel immer 112, die Leitstelle triagiert.","FAST-Test beim Schlaganfallverdacht: Face (Lächeln schief?), Arms (ein Arm sinkt?), Speech (verwaschene Sprache?), Time (sofort 112 + Zeitpunkt merken) — jede Minute kostet Hirngewebe, Lysetherapie ist zeitkritisch.","Reanimation in einem Satz: Keine normale Atmung? 112, dann fest und schnell in die Mitte des Brustkorbs drücken (100–120/Min, 5–6 cm tief, an „Stayin' Alive“ orientieren) — nicht aufhören bis Hilfe übernimmt; falsch machen kann man nur eines: nichts tun.","Defibrillatoren (AED) hängen in Bahnhöfen, Ämtern, Supermärkten — einschalten genügt, das Gerät spricht jeden Schritt vor und schockt nur, wenn nötig.","Stabile Seitenlage bei Bewusstlosen MIT normaler Atmung; bei starker Blutung: direkter Druck aufs Wundgebiet mit allem, was greifbar ist.","Notfall-Vorsorge zu Hause: Notfallnummern am Kühlschrank, Medikamentenliste der Familie, Rettungsdienst findet die Adresse? (Hausnummer beleuchtet, Tür öffnen lassen)."],
 c:["Erste-Hilfe-Kurs auffrischen, wenn älter als 5 Jahre (1 Tag, ~60 €, als Ersthelfer im Betrieb oft kostenlos)","FAST-Test und 112/116117-Logik der Familie beibringen — auch Kindern","Standorte der nächsten AEDs bewusst wahrnehmen","Notfallkontakte ins Handy (ICE-Kontakt / Notfallpass-Funktion) eintragen"],
 prem:"Vertiefung: Der 5-Minuten-Drill für die häufigsten Notfälle (Herzinfarkt, Schlaganfall, Verschlucken, Krampfanfall, allergischer Schock), Kinder-Notfälle gesondert, und was der Rettungsdienst beim Eintreffen von dir braucht."},
{id:"patientenrechte",k:"gesundheit",a:[18,100],s:["Krankheit"],t:"Patientenrechte & Arztgespräch: mündig im Gesundheitssystem",
 kurz:"Wer fragt, wird besser behandelt — wörtlich: Vorbereitete Patienten bekommen messbar bessere Versorgung. Dazu kommen Rechte, die kaum jemand kennt: Akteneinsicht, Zweitmeinung, Behandlungsfehler-Hilfe.",
 p:["Das Patientenrechtegesetz garantiert: verständliche Aufklärung VOR jeder Behandlung, Einsicht in die komplette Patientenakte (elektronisch meist kostenlos, Kopien gegen Kostenerstattung), freie Arztwahl und Selbstbestimmung — auch gegen ärztlichen Rat.","Zweitmeinung ist Kassenleistung bei vielen planbaren Eingriffen (z. B. Knie, Rücken, Mandeln, Gebärmutterentfernung) — der erstbehandelnde Arzt muss sogar darauf hinweisen.","Arztgespräch vorbereiten wie einen wichtigen Termin: 3 Hauptbeschwerden priorisiert, Medikamentenliste, konkrete Fragen notiert — und die Schlussfrage: „Was passiert, wenn wir nichts tun?“ entlarvt Übertherapie.","Verdacht auf Behandlungsfehler: Krankenkasse einschalten (muss kostenlos mit MD-Gutachten unterstützen!), Gutachterkommission der Ärztekammer (kostenlos), Dokumentation sichern (Akteneinsicht sofort).","IGeL-Leistungen (Selbstzahler-Angebote in der Praxis) vorher auf igel-monitor.de prüfen — die Mehrheit ist mit „unklar“ oder „tendenziell negativ“ bewertet; niemand muss am Empfang sofort unterschreiben.","Elektronische Patientenakte (ePA): Chancen (alle Befunde an einem Ort) und Steuerung (Zugriffe lassen sich je Praxis einschränken oder widersprechen) bewusst nutzen."],
 c:["Vor jedem wichtigen Termin: 3-Fragen-Zettel schreiben","Befunde grundsätzlich als Kopie/ePA mitnehmen und selbst ablegen","Vor planbaren OPs: Zweitmeinungs-Anspruch prüfen","Bei IGeL-Druck: Bedenkzeit nehmen ist immer legitim"],
 prem:"Vertiefung: Das Arztgespräch-Skript (inkl. der 4 Fragen, die Überdiagnostik verhindern), der Behandlungsfehler-Fahrplan von Verdacht bis Gutachten, ePA-Einstellungen im Detail und Krankenhaus-Wissen (Wahlleistungen, Entlassmanagement)."},
{id:"medikamente",k:"gesundheit",a:[18,100],s:["Krankheit"],t:"Medikamente sicher anwenden: Wirkung, Wechselwirkung, Hausapotheke",
 kurz:"Medikamente gehören zu den größten Segnungen und den häufigsten vermeidbaren Gesundheitsrisiken zugleich — die Differenz liegt fast immer in der Anwendung: Dosis, Dauer, Kombination, Disziplin.",
 p:["Beipackzettel lesen können: Häufigkeitsangaben einordnen („häufig“ = bis zu 1 von 10), auf Wechselwirkungs- und Warnhinweise fokussieren statt die Nebenwirkungsliste zu fürchten — Nocebo ist real.","Die unterschätzten Klassiker: Schmerzmittel wie Ibuprofen/Paracetamol sind nicht harmlos (Magen, Niere bzw. Leber; Obergrenzen und Dauer beachten, Dauergebrauch ärztlich klären — Kopfschmerz DURCH Schmerzmittel-Übergebrauch existiert).","Antibiotika: nur gegen Bakterien, exakt nach Verordnung, niemals Reste „auf Vorrat“ oder vom Partner — Resistenzbildung ist ein persönliches und globales Risiko.","Wechselwirkungs-Hotspots kennen: Grapefruit, Johanniskraut (hebelt u. a. Pille und viele Medikamente aus!), Alkohol, Blutverdünner + Schmerzmittel — bei mehr als 3 Dauermedikamenten jährlichen Medikationscheck in der Apotheke nutzen (teils Kassenleistung).","Generika sind wirkstoffgleich und gleichwertig — der Festbetrags-Aufpreis fürs Original ist fast nie medizinisch begründet.","Hausapotheke: kühl, dunkel, kindersicher, NICHT im Badezimmer; jährlich Verfallsdaten prüfen, Altmedikamente in den Restmüll (nicht ins Klo!), regional auch Apotheken-Rücknahme."],
 c:["Aktuelle Medikamentenliste (auch Nahrungsergänzung!) im Portemonnaie/Handy","Bei jedem neuen Rezept fragen: Wofür, wie lange, was beachten?","Hausapotheken-Check 1× jährlich (Termin mit Rauchmelder-Test koppeln)","Dauer-Selbstmedikation über 2 Wochen → ärztlich abklären"],
 prem:"Vertiefung: Die Hausapotheken-Inventarliste, Beipackzettel-Lesekurs, die 10 relevantesten Wechselwirkungs-Paare im Alltag und der Umgang mit Lieferengpässen (Austausch, Notdienst, Rezept-Gültigkeit)."},
{id:"zaehne",k:"gesundheit",a:[18,100],s:["Krankheit"],t:"Zahngesundheit: Prophylaxe, Bonusheft & die Zahnersatz-Falle",
 kurz:"Zähne sind das Körperteil mit der direktesten Geld-Verbindung: Wer Prophylaxe und Bonusheft ernst nimmt, spart sich vier- bis fünfstellige Zahnersatz-Rechnungen — und das Drama beginnt fast immer schmerzfrei.",
 p:["Karies und Parodontitis sind die häufigsten chronischen Erkrankungen überhaupt — und fast vollständig verhütbar: 2× täglich fluoridhaltige Zahnpasta (nach dem Putzen nur ausspucken, nicht spülen!), 1× täglich Zahnzwischenräume (Interdentalbürsten schlagen Zahnseide in der Praxis).","Parodontitis ist der stille Zahnkiller ab 40: Zahnfleischbluten ist Warnsignal, nicht Normalzustand — unbehandelt drohen Zahnverlust und Wechselwirkungen mit Diabetes und Herz-Kreislauf.","Bonusheft = bares Geld: lückenlose jährliche Kontrolle erhöht den Festzuschuss beim Zahnersatz von 60 % auf 70 % (5 Jahre) bzw. 75 % (10 Jahre) — ein vergessener Stempel kann später vierstellig kosten.","Beim Zahnersatz IMMER: Heil- und Kostenplan vor Behandlungsbeginn zur Kasse, Vergleichsangebot einholen (Preisunterschiede von 50 %+ sind normal), nach Härtefallregelung fragen (geringes Einkommen = doppelter Festzuschuss).","Professionelle Zahnreinigung (1–2×/Jahr, 80–120 €) ist die sinnvollste IGeL überhaupt — viele Kassen bezuschussen.","Zahnzusatzversicherung lohnt fast nur VOR dem ersten Befund — laufende oder angeratene Behandlungen sind ausgeschlossen; jung abschließen oder bewusst selbst ansparen."],
 c:["Recall-System der Praxis aktivieren (automatische Termin-Erinnerung)","Bonusheft digital fotografieren — Verlust ist teuer","Vor Zahnersatz: Heil- und Kostenplan + Zweitangebot","Interdentalbürsten in der passenden Größe besorgen (Praxis fragen)"],
 prem:"Vertiefung: Die Zahnputz-Technik, die Zahnärzte wirklich empfehlen, Parodontitis-Selbstcheck, Zahnersatz-Optionen im Kostenvergleich (Brücke/Implantat/Prothese) — plus Festzuschuss-Rechner mit Bonusheft-Effekt."},
{id:"sucht",k:"gesundheit",a:[16,100],s:["Krankheit"],t:"Alkohol, Rauchen & Verhaltenssüchte: ehrlich Bilanz ziehen",
 kurz:"Sucht beginnt nicht in der Gosse, sondern im Alltag: beim Feierabendbier, das zur Pflicht wird, der Zigarette „nur zum Stress“ und dem Handy, das morgens vor den Augen aufgeht. Früh hinschauen ist keine Schwäche — es ist Statistik-Kompetenz.",
 p:["Alkohol: Die Fachgesellschaften haben die Empfehlung faktisch auf „weniger ist immer besser, risikofrei ist keine Menge“ verschoben; als Risikoschwelle gelten geringe Mengen — und mindestens 2 alkoholfreie Tage pro Woche. Der CAGE-Selbsttest (Cut down? Annoyed? Guilty? Eye-opener?) mit 2+ Ja-Antworten ist ein ernstes Signal.","Warnzeichen statt Klischees: heimliches Trinken, Toleranzanstieg, gescheiterte Reduktionsversuche, Trinken gegen Gefühle — Abhängigkeit ist ein Kontinuum, kein Schalter.","Rauchstopp ist die wirksamste Einzelmaßnahme für die Gesundheit überhaupt: Schon nach 1 Jahr halbiert sich das Herzinfarkt-Zusatzrisiko; am besten belegt ist die Kombination aus professioneller Unterstützung (Kurse sind Kassenleistung!) und Nikotinersatz/Medikamenten — Schlusspunktmethode allein hat einstellige Erfolgsquoten.","Verhaltenssüchte ernst nehmen: Glücksspiel (Gaming inklusive Lootboxen!), Kaufen, Pornografie, Social Media — gleiche Belohnungsschleifen, gleiche Kriterien: Kontrollverlust, Vernachlässigung, Weitermachen trotz Schaden.","Hilfe ist niederschwelliger als gedacht: Suchtberatungsstellen (kostenlos, anonym, auch für Angehörige!), Hausarzt, anonyme Gruppen, BZgA-Telefonberatungen — Entzug bei Alkohol gehört wegen Krampfrisiko in ärztliche Begleitung, niemals kalt allein.","Angehörige: Co-Abhängigkeit erkennen (Verheimlichen, Ausreden organisieren, Konsequenzen abfedern) — Hilfe für sich selbst suchen ist erlaubt und wirksam, auch wenn die süchtige Person (noch) nicht will."],
 c:["2 fixe alkoholfreie Tage pro Woche etablieren — und ehrlich tracken","CAGE-Test machen; bei 2+ Ja: Beratungsstelle (kostet nichts, verpflichtet zu nichts)","Rauchstopp: Kassen-Kurs + Stoppdatum + Umfeld informieren","Bildschirmzeit-Report 1 Woche ungeschönt ansehen"],
 prem:"Vertiefung: Selbsttests (CAGE, Fagerström) mit Auswertung, der evidenzbasierte Rauchstopp-Plan Woche für Woche, Alkohol-Reduktion ohne Komplett-Verzicht (und wann der nicht mehr reicht) — plus Rauchstopp-Sparrechner mit Zinseszins-Effekt."},
{id:"ruecken",k:"gesundheit",a:[20,100],s:["Krankheit"],t:"Rücken, Nacken & Gelenke: Volkskrankheit Nr. 1 entschärfen",
 kurz:"Rückenschmerz ist der häufigste Grund für Krankschreibungen — und gleichzeitig das Feld mit den meisten überflüssigen Bildern, Spritzen und OPs. Die unbequeme gute Nachricht: Das wirksamste Mittel ist fast immer Bewegung, nicht Schonung.",
 p:["85–90 % der Rückenschmerzen sind „unspezifisch“ — kein Bandscheibenvorfall, kein struktureller Schaden — und bessern sich binnen Wochen; Bettruhe verlängert sie nachweislich, Aktivbleiben verkürzt.","Bildgebung (MRT/Röntgen) ohne Warnzeichen ist meist überflüssig bis schädlich: Bandscheibenvorwölbungen finden sich bei einem Großteil beschwerdefreier Erwachsener — Zufallsbefunde erzeugen Angst und unnötige Eingriffe.","Red Flags, die SOFORT abgeklärt gehören: Lähmungen, Taubheit im Genital-/Gesäßbereich, Blasen-/Mastdarmstörung, Schmerz nach Sturz, Fieber, ungewollter Gewichtsverlust, Nachtschmerz in Ruhe.","Stärkstes Rezept: 2× Woche Kräftigung (Rumpf, Gesäß, Rücken — Reha-Sport und Funktionstraining werden ärztlich verordnet und von Kassen getragen!) plus Alltagsbewegung; die beste Sitzhaltung ist die nächste — Positionswechsel schlägt jedes ergonomische Wunderprodukt.","Nackenschmerz & Bildschirm: Monitor-Oberkante auf Augenhöhe, Handy auf Brusthöhe statt Schoß, Mikropausen (alle 30–45 Min aufstehen) — die „SMS-Haltung“ vervielfacht die Last auf die Halswirbelsäule.","Knie/Hüfte-Arthrose: Bewegung und Gewichtsmanagement sind Erstlinientherapie; Gelenkspritzen und Arthroskopien beim Verschleißknie sind wissenschaftlich weitgehend entzaubert — vor OP-Empfehlungen Zweitmeinung (Kassenleistung)."],
 c:["Bei akutem Hexenschuss ohne Red Flags: in Bewegung bleiben, Wärme, Geduld","2 feste Kraft-Termine/Woche einrichten (20 Min reichen für den Anfang)","Arbeitsplatz-Check: Monitorhöhe, Stuhl, Steh-Anteile","Schmerz >6 Wochen oder Red Flags → ärztlich, ggf. multimodale Schmerztherapie ansprechen"],
 prem:"Vertiefung: Das 15-Minuten-Heimprogramm (6 Übungen mit Progressionsstufen), der Red-Flags-Spickzettel, Bildgebung-Entscheidungshilfe („Brauche ich ein MRT?“) und der Weg in verordneten Reha-Sport."},
{id:"chronisch",k:"gesundheit",a:[18,100],s:["Krankheit","Jobverlust"],t:"Chronisch krank: Diagnose managen, Rechte nutzen, Leben behalten",
 kurz:"Diabetes, Rheuma, MS, Long Covid, Depression: Eine chronische Diagnose verändert das Leben — aber das Sozialsystem hält erstaunlich viel bereit, von der Belastungsgrenze über Reha bis zum Schwerbehindertenausweis. Man muss es nur abrufen.",
 p:["Disease-Management-Programme (DMP) für Diabetes, Asthma/COPD, KHK, Depression u. a.: strukturierte Versorgung mit festen Kontrollen und Schulungen — Einschreibung lohnt fast immer.","Zuzahlungs-Belastungsgrenze: Chronisch Kranke zahlen maximal 1 % des Bruttoeinkommens pro Jahr zu (statt 2 %) — Quittungen sammeln, Befreiung bei der Kasse beantragen, ggf. gleich zu Jahresbeginn vorauszahlen.","Krankengeld-Langstrecke: nach 6 Wochen Lohnfortzahlung zahlt die Kasse bis zu 78 Wochen (innerhalb von 3 Jahren je Krankheit) — Lücken in den AU-Bescheinigungen sind der häufigste, teuerste Formfehler; rechtzeitig vor Aussteuerung Reha/Rente klären (Arbeitsagentur „Nahtlosigkeit“).","Medizinische Reha beantragen, bevor nichts mehr geht: „Reha vor Rente“-Prinzip der DRV; Antrag stellt man selbst (mit Arztbefürwortung), Ablehnungen sind widerspruchsfähig und werden häufig korrigiert.","Schwerbehindertenausweis ab GdB 50 (Gleichstellung ab 30): besserer Kündigungsschutz, Zusatzurlaub, Steuerpauschbetrag, früherer Rentenzugang — der Antrag beim Versorgungsamt wird mit guter ärztlicher Befunddokumentation deutlich erfolgreicher; viele Diagnosen „stapeln“ sich im GdB.","Arbeit anpassen statt aufgeben: Betriebliches Eingliederungsmanagement (BEM) nach 6 Wochen Krankheit ist Pflichtangebot des Arbeitgebers, stufenweise Wiedereingliederung („Hamburger Modell“) führt sanft zurück, technische Hilfen zahlt oft das Integrationsamt."],
 c:["DMP-Eignung bei der Kasse prüfen","Zuzahlungsquittungen ab Tag 1 sammeln (Ordner/App)","AU-Bescheinigungen lückenlos — Folgebescheinigung am letzten Gültigkeitstag","Bei absehbar >6 Monaten Einschränkung: GdB-Antrag mit Arztberichten vorbereiten"],
 prem:"Vertiefung: Der Krankengeld-Zeitstrahl mit allen Fristen und Fallen (inkl. Aussteuerung), GdB-Antrag optimieren Schritt für Schritt, Reha-Antrag mit Formulierungshilfen — plus Krankengeld-Rechner."},
{id:"datenschutz",k:"recht",a:[16,100],s:[],t:"Datenschutz & digitale Selbstverteidigung",
 kurz:"Die DSGVO gibt jedem Bürger scharfe Werkzeuge — Auskunft, Löschung, Beschwerde — und kaum jemand nutzt sie. Dazu das Pflichtprogramm gegen die realen Risiken: Datenlecks, Identitätsdiebstahl, Konto-Übernahmen.",
 p:["Auskunftsrecht (Art. 15 DSGVO): Jedes Unternehmen muss binnen eines Monats kostenlos offenlegen, was es über dich speichert, woher die Daten stammen und an wen sie gingen — formlose E-Mail genügt; bei Schweigen drohen ihm Bußgelder.","Löschung & Widerspruch: Werbe-Einwilligungen sind jederzeit widerrufbar, Löschanträge (Art. 17) wirken bei nicht mehr nötigen Daten; Robinsonliste und Werbewiderspruch stoppen adressierte Reklame.","Beschwerde kostet nichts: Die Landesdatenschutzbehörde nimmt Beschwerden online entgegen — wirksam bei hartnäckigen Verstößen (Newsletter ohne Einwilligung, Videoüberwachung, Auskunftsverweigerung).","Konto-Hygiene schlägt jede Verschlüsselungs-Esoterik: Passwortmanager + überall einzigartige Passwörter + Zwei-Faktor-Authentifizierung (App statt SMS) auf E-Mail, Bank, Apple/Google-Konto — das E-Mail-Konto ist der Generalschlüssel zu allem.","Datenleck-Routine: Mit der eigenen Adresse regelmäßig Leak-Checker (z. B. HPI Identity Leak Checker, Have I Been Pwned) abfragen; bei Treffern sofort Passwort des betroffenen Dienstes UND aller Wiederverwendungen ändern.","Identitätsdiebstahl (Bestellungen, Konten im eigenen Namen): Strafanzeige erstatten (Aktenzeichen!), Schufa & Auskunfteien informieren und Identitätsmissbrauch eintragen lassen, betroffene Händler mit Anzeige-Kopie anschreiben — nie aus Scham zahlen."],
 c:["Passwortmanager einrichten, Top-5-Konten auf 2FA umstellen (1 Abend)","Art.-15-Auskunft testweise an einen Datensammler senden","E-Mail-Adressen im Leak-Checker prüfen — Kalendereintrag halbjährlich","Werbewiderspruch + Robinsonliste für die Postflut"],
 prem:"Vertiefung: Die Auskunfts- und Lösch-Musterschreiben, der 60-Minuten-Sicherheits-Setup-Plan (Passwortmanager, 2FA, Backup-Codes), Smartphone-Berechtigungen entrümpeln und der Notfallplan bei gehacktem Konto."},
{id:"verkehr",k:"recht",a:[17,100],s:[],t:"Bußgeld, Punkte & Unfall: Verkehrsrecht im Alltag",
 kurz:"Zwischen Knöllchen und Fahrverbot liegt ein System mit klaren Regeln — wer sie kennt, zahlt nicht zu viel, verliert keine Punkte unnötig und macht nach einem Unfall nicht die teuren Minuten-Fehler.",
 p:["Punktesystem Flensburg: 1–3 Punkte je Verstoß, ab 4 Punkten Ermahnung, ab 6 Verwarnung, bei 8 ist der Führerschein weg; Punkte verfallen je nach Schwere nach 2,5 / 5 / 10 Jahren — ein freiwilliges Fahreignungsseminar baut bei ≤5 Punkten einen Punkt ab (alle 5 Jahre).","Bußgeldbescheid prüfen lohnt: Zustellung muss binnen 3 Monaten nach Verstoß erfolgen (Verjährung!), Messfehler und Form-Mängel sind häufig — Einspruchsfrist 2 Wochen ab Zustellung; Anhörungsbogen ist noch kein Bescheid und Schweigen dort erlaubt.","Fahrverbot (1–3 Monate) trifft oft härter als das Bußgeld: Bei Ersttätern und beruflicher Härte lässt es sich teils gegen erhöhtes Bußgeld abwenden — das ist Verhandlungssache mit anwaltlicher Hilfe; 4 Monate Abgabefrist-Spielraum bei Ersttätern nutzen.","Unfall-Protokoll: Absichern (Warnblinker, Weste, Dreieck 100 m), Verletzte? 112 — sonst bei Blechschaden Fahrbahn räumen (Fotos vorher!); Daten + Kennzeichen + Zeugen austauschen, KEIN Schuldanerkenntnis unterschreiben, Polizei bei Personenschaden, unklarer Schuld, Mietwagen oder Unfallflucht-Verdacht.","Unfallflucht ist auch der Parkrempler mit Zettel: Wartepflicht (richtwert ~30–60 Min), dann unverzüglich Polizei melden — der Zettel an der Scheibe schützt nicht vor Strafverfahren und Führerscheinverlust.","Gegnerische Versicherung reguliert? Eigene Rechte kennen: freie Werkstattwahl, eigener Gutachter ab erheblichem Schaden (zahlt die Gegenseite), Nutzungsausfall oder Mietwagen, Wertminderung — die „Schadensteuerung“ der Versicherer spart deren Geld, nicht deins."],
 c:["Warnweste(n) in den Innenraum, nicht in den Kofferraum","Unfall-Checkliste + Europäischer Unfallbericht ins Handschuhfach","Bußgeldbescheid: Datum der Zustellung notieren (2-Wochen-Frist!)","Punktestand kostenlos beim KBA abfragen (online mit Ausweis-Funktion)"],
 prem:"Vertiefung: Der Bußgeld-Schnellcheck als Rechner (Tempoverstoß → Bußgeld, Punkte, Fahrverbot), die Einspruch-Entscheidungshilfe, Unfallabwicklung Schritt für Schritt inkl. Gutachter-Schwelle und die Probezeit-Sonderregeln."},
{id:"nachbarschaft",k:"recht",a:[18,100],s:["Erste Wohnung","Hauskauf"],t:"Nachbarschaftsrecht: Lärm, Grenze, Grill & gesunder Frieden",
 kurz:"Kein Rechtsgebiet wird so emotional geführt wie der Streit am Gartenzaun — und kaum eines ist so sehr Landesrecht und Einzelfall. Die Grundregeln, die wichtigsten Mythen und die Eskalationsleiter, die Beziehungen (und Geld) schont.",
 p:["Lärm-Basics: Nachtruhe 22–6 Uhr und ganztägige Rücksichtnahme; Kinderlärm ist privilegiert (kein Abwehranspruch gegen normales Spielen), Rasenmähen regeln Geräte-Verordnung und Kommune (sonn-/feiertags tabu), „einmal im Monat laut feiern“ ist ein Mythos ohne Rechtsgrundlage.","Zimmerlautstärke-Streit dokumentieren: Lärmprotokoll (Datum, Zeit, Art, Dauer, Zeugen) ist die Eintrittskarte für Mietminderung oder Unterlassung — ohne Protokoll keine Chance.","Grenzbewuchs: Abstände für Bäume/Hecken regelt das Nachbarrechtsgesetz des Bundeslands (oft 0,5 m kleine, 1–2 m große Gehölze, mit Verjährung der Beseitigungsansprüche nach ~5 Jahren!); überhängende Zweige darf man nach Fristsetzung selbst kappen (§ 910 BGB), Fallobst vom Überhang gehört dem Grundstück, auf das es fällt.","Grillen ist erlaubt — Dauerbeschallung mit Rauch nicht: Maßstab ist die wesentliche Beeinträchtigung; Mietverträge können Balkongrillen einschränken (Klausel gilt!), Elektrogrill ist der diplomatische Kompromiss.","Schlichtung vor Klage ist in vielen Bundesländern bei Nachbarstreit PFLICHT (obligatorisches Schiedsverfahren, ~10–50 €) — und löst real die Mehrheit der Fälle; Schiedspersonen der Gemeinde sind die unterschätzte Institution.","Die 80/20-Wahrheit: Das Gespräch bei ruhigem Anlass (nicht um 23 Uhr im Konflikt) löst die meisten Fälle — wer zuerst den Anwalt schickt, gewinnt selten den Frieden, auch wenn er den Prozess gewinnt."],
 c:["Beim Einzug: aktiv vorstellen — das Konto, von dem man später abhebt","Konflikt: erst 1 ruhiges Gespräch, dann freundliche schriftliche Bitte, dann Schlichtung","Lärmprotokoll-Vorlage bereithalten (Datum/Zeit/Art/Zeuge)","Vor Heckenschnitt-Selbsthilfe: Frist setzen und Vogelschutzzeit (März–Sept.) beachten"],
 prem:"Vertiefung: Die Eskalationsleiter mit Musterformulierungen für jede Stufe, Landesrecht-Wegweiser Grenzabstände, die Top-10-Mythen im Faktencheck (Wäsche, Laub, Kameras, Wegerecht) und WEG-Besonderheiten."},
{id:"strafverfahren",k:"recht",a:[16,100],s:[],t:"Polizei, Anzeige & Co.: richtig verhalten als Zeuge, Opfer, Beschuldigter",
 kurz:"Die meisten Menschen haben einmal im Leben Kontakt mit einem Strafverfahren — als Opfer, Zeuge oder völlig überraschend als Beschuldigte. Für jede Rolle gibt es genau ein richtiges Grundverhalten, und alle drei sind verschieden.",
 p:["Als BESCHULDIGTER gilt die eiserne Regel: Schweigen. Personalien angeben ja — zur Sache keine Aussage ohne Anwalt und Akteneinsicht, auch wenn man unschuldig ist (gerade dann: gut gemeinte Erklärungen liefern oft die Puzzleteile der Anklage). Schweigen darf nicht als Schuldindiz gewertet werden.","Polizeiliche Vorladung als Beschuldigter oder Zeuge bei der POLIZEI ist freiwillig — erst Vorladungen von Staatsanwaltschaft oder Gericht verpflichten (Zeugen müssen dort erscheinen und aussagen, außer Zeugnis-/Auskunftsverweigerungsrechte greifen: nahe Angehörige, Selbstbelastung).","Hausdurchsuchung: Beschluss zeigen lassen, Widerspruch zu Protokoll geben, nichts erklären, Zeugen hinzuziehen, Durchsuchungsprotokoll und Sicherstellungsverzeichnis verlangen — Widerstand nie, Rechtsmittel danach.","Als OPFER: Anzeige bei jeder Dienststelle oder online (Onlinewache), Aktenzeichen geben lassen; Beweise sichern (Fotos, Chats, Arztbericht), Strafantrag bei Antragsdelikten (Beleidigung, Hausfriedensbruch) binnen 3 Monaten!","Opferrechte sind ausgebaut: kostenlose psychosoziale Prozessbegleitung bei Gewaltdelikten, Nebenklage, Adhäsionsverfahren (Schmerzensgeld im Strafprozess), Entschädigung nach dem Sozialen Entschädigungsrecht — der WEISSE RING hilft kostenlos und schnell.","Strafbefehl im Briefkasten (Verurteilung ohne Verhandlung): 2 Wochen Einspruchsfrist — danach rechtskräftig wie ein Urteil; Tagessatzhöhe prüfen (richtet sich nach Nettoeinkommen, ist oft falsch geschätzt) — allein dagegen kann man beschränkt Einspruch einlegen."],
 c:["Merksatz einprägen: „Ich mache von meinem Schweigerecht Gebrauch und möchte einen Anwalt.“","Polizei-Vorladung als Beschuldigter: höflich absagen, Anwalt einschalten","Als Opfer: Beweise sofort sichern, Fristen (3 Monate Strafantrag) notieren","Strafbefehl: Frist-Datum sofort markieren, Tagessatzhöhe gegen Netto prüfen"],
 prem:"Vertiefung: Die drei Rollen-Spickzettel im Detail, Pflichtverteidiger vs. Wahlverteidiger (und wer ihn zahlt), Ablauf eines Ermittlungsverfahrens von Anzeige bis Einstellung/Anklage, Führungszeugnis-Wahrheiten."},
{id:"abzocke",k:"recht",a:[16,100],s:["Schulden"],t:"Betrugsmaschen erkennen: Phishing, Fake-Shops, Schockanrufe",
 kurz:"Betrug ist heute industrialisiert: Phishing-Baukästen, KI-Stimmen, gefälschte Shops mit echtem Impressum. Schutz ist weniger Technik als Mustererkennung — die Maschen rotieren, die Mechanik dahinter bleibt gleich: Druck, Emotion, Vorkasse.",
 p:["Die Universal-Signatur aller Maschen: künstliche Dringlichkeit („sofort handeln!“) + ungewöhnlicher Zahlweg (Gutscheinkarten, Krypto, Bargeld-Abholer, Echtzeitüberweisung an Fremde) + Geheimhaltung („sag niemandem davon“). Ein Treffer = Alarm, zwei = Abbruch.","Phishing entlarven: Banken, Paketdienste, Behörden fordern NIE per Link zur Dateneingabe auf — Absenderadresse genau lesen reicht oft; im Zweifel die Website selbst eintippen oder die App nutzen, niemals den Link. Echtzeit-Phishing fängt auch 2FA-Codes ab: Codes nie am Telefon durchgeben.","Fake-Shops: Traumpreis + nur Vorkasse = Finger weg; Check in 60 Sekunden: Impressum mit ladungsfähiger Adresse, Fakeshop-Finder der Verbraucherzentrale, Händler-Bewertungen außerhalb des Shops. Zahlung per Lastschrift/Kreditkarte/Käuferschutz lässt sich zurückholen, Vorkasse-Überweisung fast nie.","Schockanruf & Enkeltrick 2.0 (auch mit KI-Stimme): Polizei/Staatsanwalt fordern NIEMALS Geld oder Wertsachen, schon gar nicht zur Abholung; Gegenmittel: auflegen, Familienmitglied unter der BEKANNTEN Nummer selbst anrufen, Familien-Codewort vereinbaren.","WhatsApp-Masche („Mama, neue Nummer“) & Liebesbetrug: nie auf Zuruf zahlen — Identität über die alte Nummer/Videoanruf verifizieren; bei Romance Scam gilt: Wer nach Monaten Online-Liebe Geld braucht, ist ein Skript.","Nach dem Klick/der Zahlung zählt Tempo: Bank anrufen (Überweisungs-Rückruf in den ersten Stunden manchmal möglich, Lastschrift 8 Wochen widerrufbar, Kreditkarte: Chargeback), Passwörter ändern, Strafanzeige (auch online) — Scham ist der beste Freund der Täter: Anzeigen schützt die Nächsten."],
 c:["Familien-Codewort für Geld-Notfälle vereinbaren (heute!)","Bank-/Behörden-Mails: nie Link klicken — App oder Lesezeichen","Vor Online-Kauf bei unbekanntem Shop: 60-Sekunden-Check","Betroffen? Reihenfolge: Bank → Passwörter → Anzeige → Verbraucherzentrale"],
 prem:"Vertiefung: Die 12 aktuellen Maschen mit Original-Wortlaut zum Wiedererkennen, der Notfall-Fahrplan nach Geldabfluss Stunde für Stunde, Rückbuchungs-Rechte je Zahlart in der Übersicht und das Schutz-Setup für Eltern/Großeltern."},
{id:"anwalt",k:"recht",a:[18,100],s:[],t:"Recht durchsetzen: Anwalt, Kosten, Prozess — oder klüger ohne",
 kurz:"„Da müsste man eigentlich klagen“ scheitert meist an zwei Unbekannten: Was kostet es, und was bringt es? Beides ist berechenbarer als gedacht — und oft ist der beste Rechtsweg der, der am Gericht vorbeiführt.",
 p:["Kosten-Logik: Gerichts- und Anwaltsgebühren richten sich nach dem Streitwert (RVG/GKG-Tabellen) — wer verliert, zahlt grundsätzlich alles (eigener + gegnerischer Anwalt + Gericht); Erstberatung beim Anwalt kostet für Verbraucher maximal 190 € + USt., viele bieten Pauschalen.","Geringes Einkommen schließt Rechtsdurchsetzung nicht aus: Beratungshilfe (Schein vom Amtsgericht, Eigenanteil 15 €) für außergerichtlichen Rat, Prozesskostenhilfe (PKH) übernimmt Gerichts- und eigene Anwaltskosten — Achtung: gegnerische Kosten bei Niederlage trägt PKH nicht, und sie kann 4 Jahre lang zurückgefordert werden, wenn das Einkommen steigt.","Rechtsschutzversicherung richtig nutzen: Wartezeiten (meist 3 Monate) und Bausteine (Arbeit, Verkehr, Miete, Privat) kennen, Deckungszusage VOR Mandatserteilung einholen — und wissen: freie Anwaltswahl ist gesetzlich garantiert, Versicherer-Empfehlungen sind nur Empfehlungen.","Die Abkürzungen vor der Klage: Schlichtungsstellen (Banken, Versicherungen, Energie, Reise, Telekom — kostenlos und für Unternehmen oft bindend!), Ombudsleute, Mahnverfahren (gerichtlicher Mahnbescheid online ab ~36 €, verjährungshemmend!) und der 3-Stufen-Brief (freundlich → bestimmt mit Frist → „letzte Frist vor rechtlichen Schritten“).","Bis 5.000 € Streitwert: Amtsgericht ohne Anwaltszwang — gut vorbereitete Laien gewinnen dort regelmäßig (Beweise ordnen, Chronologie schreiben, Anträge klar formulieren).","Kosten-Nutzen ehrlich rechnen: Bei 500 € Streitwert frisst schon der eigene Anwalt außergerichtlich einen Großteil — dafür gibt es Schlichtung, Mahnbescheid und Inkasso-Verzicht; bei 20.000 € dreht sich das Bild komplett. Der Rechner unten macht das Prozessrisiko konkret."],
 c:["Vor jedem Rechtsstreit: Schlichtungsstelle für die Branche googeln","Rechtsschutz: Deckungszusage schriftlich VOR dem Anwaltstermin","Forderungen: 3-Stufen-Brief, dann Online-Mahnbescheid (hemmt Verjährung!)","Anwaltssuche über Fachanwaltstitel + Erstberatungspreis abfragen"],
 prem:"Vertiefung: Der Prozesskosten-Rechner (Streitwert → Kostenrisiko 1. Instanz), PKH-Selbstcheck, der 3-Stufen-Mahnbrief als Vorlage in drei Tonlagen und die Schlichtungsstellen-Landkarte nach Branchen."},
{id:"haftung",k:"recht",a:[18,100],s:["Kind bekommen"],t:"Wer haftet wann? Kinder, Aufsichtspflicht, Gefälligkeiten, Tiere",
 kurz:"„Eltern haften für ihre Kinder“ ist das berühmteste falsche Schild Deutschlands. Die echten Haftungsregeln überraschen in beide Richtungen — und entscheiden, wofür man wirklich eine Versicherung braucht.",
 p:["Kinder unter 7 haften NIE (im Straßenverkehr unter 10) — und Eltern nur bei Verletzung der Aufsichtspflicht, die altersabhängig gleitet: Ein 5-Jähriges darf man beim Spielen zeitweise unbeaufsichtigt lassen, Kontrolle in Intervallen genügt; war die Aufsicht okay, bleibt der Geschädigte oft auf dem Schaden sitzen.","Deliktfähige Kinder (ab 7) haften selbst — mit ihrem Vermögen, notfalls 30 Jahre lang vollstreckbar: Genau dafür gehört der Baustein „deliktunfähige Kinder“ UND die Mitversicherung der Kinder in die Familien-Privathaftpflicht.","Gefälligkeiten (Umzugshilfe, Blumengießen, Mitfahrgelegenheit): Wer hilft, haftet grundsätzlich auch für Fahrlässigkeit — die Rechtsprechung nimmt nur begrenzt stillschweigende Haftungsausschlüsse an; die Privathaftpflicht des Helfers ist die echte Lösung (Schäden an geliehenen/bewegten Sachen je nach Tarif!).","Tierhalterhaftung ist verschuldensUNabhängig: Der Hund muss nichts „falsch“ machen — schon das Ausweichen eines Radfahrers vor dem freundlichen Hund kann den Halter voll haftbar machen; Hundehaftpflicht ist in mehreren Bundesländern Pflicht, Katzen deckt die Privathaftpflicht.","Verkehrssicherungspflicht von Eigentümern und Mietern: Räum- und Streupflicht (per Mietvertrag übertragbar — dann auch die Haftung!), Laub, lose Dachziegel, der morsche Baum: Wer eine Gefahrenquelle beherrscht, muss sie sichern — Haus- und Grundbesitzerhaftpflicht bzw. Privathaftpflicht decken das.","Schlüsselverlust (Arbeitgeber, Mietshaus mit Schließanlage) kann fünfstellig werden — der Haftpflicht-Baustein „fremde Schlüssel“ kostet fast nichts und fehlt in alten Verträgen oft."],
 c:["Privathaftpflicht-Police prüfen: deliktunfähige Kinder? Gefälligkeitsschäden? Schlüssel? Forderungsausfall?","Das Schild „Eltern haften…“ innerlich übersetzen: Es ist meist nur Abschreckung","Hundehalter: Pflichtversicherungs-Status des Bundeslands prüfen","Winterdienst-Übertragung im Mietvertrag ernst nehmen (Protokoll, Vertretung im Urlaub)"],
 prem:"Vertiefung: Die Aufsichtspflicht-Tabelle nach Alter mit Urteils-Beispielen, der Privathaftpflicht-Bausteine-Check zum Abhaken, Gefälligkeitsschäden-Fallsammlung und die Forderungsausfall-Deckung als unterschätzter Selbstschutz."},
{id:"haustiere",k:"freizeit",a:[18,100],s:["Kind bekommen","Ruhestand"],t:"Haustier anschaffen: Kosten, Recht, ehrliche Eignung",
 kurz:"Ein Tier ist kein Konsumgut mit Rückgaberecht, sondern ein 10–20-Jahres-Vertrag mit täglicher Fälligkeit. Wer vorher ehrlich rechnet — Zeit, Geld, Lebensplanung — erspart sich und dem Tier das häufigste Drama: die Abgabe.",
 p:["Die Lebenszeit-Rechnung schockiert heilsam: Ein Hund kostet über 15 Jahre realistisch 15.000–25.000 € (Futter, Tierarzt, Steuer, Versicherung, Betreuung), eine Katze 10.000–15.000 € — die Anschaffung ist der billigste Teil; Tierarzt-Notfälle (OP schnell 1.500–4.000 €) sind der Budgetkiller Nr. 1.","Zeit ehrlich bilanzieren: Hund = 2–4 Stunden täglich (Gassi, Beschäftigung, Erziehung) über Jahre, bei jedem Wetter, auch mit Grippe; Katzen sind keine Deko, sondern brauchen Spiel und bei Wohnungshaltung Artgenossen; „Kleintiere für Kinder“ (Kaninchen, Meerschweinchen) sind Gruppentiere mit überraschend hohen Ansprüchen — und die Pflege bleibt erfahrungsgemäß an den Eltern hängen.","Mietrecht: Kleintiere sind immer erlaubt, pauschale Hunde-/Katzenverbote in Formularverträgen sind unwirksam — aber Zustimmungsvorbehalte gelten: vorher schriftlich klären, nicht vollendete Tatsachen schaffen (Kündigungsrisiko bei Störungen bleibt).","Pflichtprogramm Hund: Steuer (je Kommune 0–180 €+/Jahr), Haftpflicht (in mehreren Bundesländern Pflicht, überall vernünftig), Chip & Registrierung (z. B. TASSO), je nach Land Sachkunde/Leinenregeln; Listenhunde haben Sonderauflagen.","Woher: Tierheim zuerst (Schutzgebühr 150–400 €, Tiere sind gecheckt, geimpft, kastriert — und die Vermittler beraten ehrlich); beim Züchter nur mit VDH/Papieren, Besuch der Mutter, Wartezeit; Vorsicht Online-Welpenhandel: Vorkasse, Übergabe auf Parkplätzen, gefälschte Pässe = organisierte Tierqual.","Krankenversicherung fürs Tier rechnet sich meist nur als OP-Schutz (ab ~10–20 €/Monat) — Vollschutz ist teuer; Alternative: eigenes Tier-Notfallkonto mit 50 €/Monat ab Tag 1."],
 c:["Lebenszeit-Kosten mit dem Rechner kalkulieren — VOR dem Verlieben","Urlaubs- und Krankheits-Backup organisieren (wer nimmt das Tier?)","Vermieter-Zustimmung schriftlich einholen","2 Wochen Probe-Alltag simulieren: täglich zu den nötigen Zeiten raus/da sein"],
 prem:"Vertiefung: Der Eignungs-Selbsttest in 12 Fragen, Tierarzt-Kostentabelle der häufigsten Eingriffe, Erstausstattung ohne Geldverbrennung und die Tierheim-Adoption Schritt für Schritt — plus Haustier-Lebenskosten-Rechner."},
{id:"garten",k:"freizeit",a:[20,100],s:["Erste Wohnung","Hauskauf","Ruhestand"],t:"Garten, Balkon & Schrebergarten: Anbauen mit Plan",
 kurz:"Vom Tomatentopf bis zur Parzelle: Gärtnern ist das Hobby mit dem besten Preis-Glück-Verhältnis — messbar gut für Psyche und Blutdruck. Es scheitert fast nie am grünen Daumen, sondern an drei vermeidbaren Anfängerfehlern.",
 p:["Die drei Anfängerfehler: zu viel auf einmal (Start: 3–5 Kulturen!), falscher Standort (erst Sonnenstunden zählen — Tomaten & Paprika brauchen 6+, Salat & Kräuter begnügen sich mit 4) und Gießfehler (selten, aber durchdringend schlägt täglich oberflächlich; morgens schlägt abends).","Balkon reicht völlig: Ein 80-cm-Kasten liefert Salat im Wochenrhythmus, ein 20-l-Topf eine Tomatenpflanze mit kiloweise Ertrag; wichtigste Investition ist nicht Deko, sondern Topfgröße + gute Erde (torffrei) + Drainage-Loch.","Statik & Recht auf dem Balkon: Blumenkästen innen sicherer als außen (außen teils genehmigungspflichtig), Bewässerung darf Nachbarn darunter nicht tropfnass machen, Rankhilfen nicht in die Fassade bohren ohne Erlaubnis.","Schrebergarten: Wartelisten 1–5 Jahre (jetzt anmelden!), Ablöse für Laube/Bestand 1.500–8.000 €, Pacht + Nebenkosten oft nur 300–600 €/Jahr — dafür gilt das Bundeskleingartengesetz: kleingärtnerische Nutzung Pflicht (Faustregel Drittel-Teilung: Anbau/Erholung/Bebauung), dauerhaftes Wohnen verboten, Vereinspflichten (Gemeinschaftsstunden) einplanen.","Kompost & Mulch sind 80 % der Bodenpflege: Küchen- und Gartenabfälle schließen den Kreislauf, Mulchschicht spart die Hälfte des Gießens und das meiste Unkrautjäten.","Saisonlogik statt Frust: Aussaatkalender beachten (Eisheilige Mitte Mai für Frostempfindliches!), regionales Saatgut, und der Profi-Trick für Berufstätige: vorgezogene Jungpflanzen vom Wochenmarkt kaufen statt Anzucht-Drama auf der Fensterbank."],
 c:["Sonnenstunden des Standorts an einem freien Tag protokollieren","Mit 3 Sicher-Erfolgen starten: Schnittsalat, Radieschen, Kräuter","Schrebergarten: heute auf 2–3 Wartelisten setzen lassen","Regentonne/Bewässerung vor dem ersten Sommerurlaub lösen"],
 prem:"Vertiefung: Der Anbauplan fürs erste Jahr (Monat für Monat, Balkon & Beet), die Schrebergarten-Übernahme ohne Ablöse-Falle, Mischkultur-Spickzettel und Gießen im Urlaub — drei Systeme im Vergleich."},
{id:"digitalbalance",k:"freizeit",a:[14,100],s:[],t:"Digitale Balance: Bildschirmzeit, Doomscrolling & echte Gegenmittel",
 kurz:"Das Durchschnitts-Smartphone wird über 3 Stunden täglich genutzt — ein Achtel des Wachlebens. Das Problem ist nicht das Gerät, sondern das Design dahinter: Apps sind auf Verweildauer optimiert. Die Gegenwehr ist Architektur, nicht Willenskraft.",
 p:["Ehrliche Diagnose zuerst: Eine Woche Bildschirmzeit-Report ungeschönt ansehen (iOS/Android eingebaut) — die meisten unterschätzen sich um 50–100 %; entscheidend ist nicht die Stundenzahl, sondern was verdrängt wird (Schlaf, Sport, Gespräche) und wie man sich danach fühlt.","Friktion ist das wirksamste Werkzeug: Graustufen-Modus, Social-Apps vom Homescreen in Ordner auf Seite 3, Log-out nach jeder Nutzung, Benachrichtigungen auf Messenger + Kalender reduzieren (alles andere ist Marketing in Push-Form) — jede zusätzliche Hürde halbiert Impulsgriffe.","Doomscrolling hat einen Mechanismus: variable Belohnung (wie Spielautomaten) + Negativitäts-Bias der Algorithmen; Gegenmittel: feste Nachrichten-Zeiten (1–2×/Tag aktiv eine Quelle) statt Dauerfeed, Infinite-Scroll-Apps durch Browser-Versionen ersetzen.","Schlaf ist die rote Linie: Handy nachts raus aus dem Schlafzimmer (10-€-Wecker kaufen — der wirksamste Einzeltrick der Verhaltensforschung), letzte 30–60 Min ohne Bildschirm.","Phantom-Effekt kennen: Allein das sichtbare Handy auf dem Tisch senkt messbar Gesprächsqualität und Konzentration („Brain Drain“-Studien) — Sichtbarkeit steuern heißt Aufmerksamkeit steuern.","Ersatz schlägt Verzicht: Digital Detox scheitert, wenn die wiedergewonnene Zeit leer bleibt — vorher festlegen, was stattdessen passiert (Buch griffbereit, Verabredung, Hobby-Slot), sonst gewinnt das Gewohnheits-Vakuum."],
 c:["Wochen-Report ansehen und EIN Limit setzen (die größte Zeitfresser-App)","Handy-Ladeplatz außerhalb des Schlafzimmers einrichten","Benachrichtigungen radikal entrümpeln (10 Minuten, einmalig)","Einen medienfreien Anker etablieren: Mahlzeiten oder erste Stunde des Tages"],
 prem:"Vertiefung: Das 4-Wochen-Rückeroberungs-Programm mit Wochenzielen, App-für-App-Friktions-Anleitungen, Doomscrolling-Notbremsen für Akutmomente und Familien-Medienregeln, die nicht ständig Streit erzeugen."},
{id:"sportverein",k:"freizeit",a:[6,100],s:["Ruhestand"],t:"Sport organisieren: Verein, Studio oder Eigenregie?",
 kurz:"Die teuerste Sportausrüstung ist die ungenutzte: Über die Hälfte der Studio-Mitgliedschaften wird kaum genutzt. Welche Organisationsform zum eigenen Motivationstyp passt, entscheidet mehr über Dranbleiben als jede Trainingslehre.",
 p:["Der Motivations-Selbsttest: Brauche ich Termine und Menschen (→ Verein, Kurse), Flexibilität und Anonymität (→ Studio, Heimtraining) oder Wettkampf und Fortschrittsmessung (→ Verein mit Ligabetrieb, Laufgruppen mit Events)? Wer gegen seinen Typ wählt, kämpft doppelt.","Verein ist der unterschlagene Preissieger: 80–200 €/JAHR für Training mit Übungsleitern, festen Terminen (= eingebaute Verbindlichkeit) und Sozialleben; Probetraining ist überall kostenlos und unverbindlich — einfach hingehen.","Studio-Vertrag lesen: Seit 2022 nach Mindestlaufzeit monatlich kündbar; Preislogik verstehen (Startpaket, Getränke-/Wellness-Zwangsmodule, Jahres-„Servicepauschalen“), bei Umzug/Krankheit Sonderkündigung mit Nachweis möglich — und die Verhandlungsmacht zum Laufzeitende nutzen.","Kasse zahlt mit: Präventionskurse (§ 20 SGB V — Rücken, Yoga, Schwimmen…) bezuschussen Krankenkassen mit 75–100 % für 1–2 Kurse pro Jahr; Reha-Sport auf Verordnung ist komplett kostenlos; Bonusprogramme belohnen Vereins- und Studionachweise.","Eigenregie funktioniert mit Struktur: fester Wochenplan (gleiche Tage, gleiche Zeit), Mini-Einstieg (10 Minuten zählen), Fortschritts-Tracking, und ein Trainingspartner oder Online-Kurs als Verbindlichkeits-Ersatz; reine Motivation hält statistisch 6 Wochen.","Wiedereinstieg nach Jahren oder mit Vorerkrankung: langsam steigern (10-%-Regel pro Woche), ab 35 mit Risikofaktoren oder nach langer Pause sportärztlicher Check (viele Kassen bezuschussen) — der häufigste Fehler ist das Comeback im Tempo von früher."],
 c:["Motivationstyp ehrlich bestimmen, dann erst Form wählen","2 Probetrainings im Verein vereinbaren (diese Woche)","Krankenkassen-Zuschuss für Präventionskurse abfragen","Sport-Termine in den Kalender wie Arzttermine — nicht verhandelbar"],
 prem:"Vertiefung: Der Motivationstyp-Test mit Auswertung, Studio-Vertrags-Checkliste vor der Unterschrift, das Comeback-Programm nach langer Pause (8 Wochen) und Vereinssport für Erwachsene jenseits von Fußball — die unterschätzten Sparten."},
{id:"kreativ",k:"freizeit",a:[14,100],s:["Ruhestand"],t:"Kreativ werden als Erwachsener: Musik, Schreiben, Kunst lernen",
 kurz:"„Dafür bin ich zu alt“ ist neurologisch widerlegt: Erwachsene lernen Instrumente, Malen und Schreiben anders als Kinder — strukturierter, zielorientierter, oft schneller. Was wirklich fehlt, ist nicht Talent, sondern die Erlaubnis, schlecht anzufangen.",
 p:["Die Talent-Lüge entkräften: Studien zu Expertise zeigen — gezieltes Üben schlägt Veranlagung in fast allen Künsten; der Unterschied zwischen „unmusikalisch“ und „spielt passabel Gitarre“ sind meist 100–200 Übungsstunden, nicht Gene.","Erwachsenen-Vorteile nutzen: Selbstdisziplin, Mustererkennung, klare Ziele („5 Songs am Lagerfeuer“ schlägt „Gitarre lernen“) — Nachteil ist nur der Perfektionsanspruch; Gegenmittel: bewusst eine „Erlaubnis für 100 schlechte Versuche“ erteilen (die ersten 100 Skizzen/Seiten/Stücke SIND Übungsmaterial).","20 Minuten täglich schlagen 3 Stunden sonntags: Motorisches und kreatives Lernen konsolidiert im Schlaf — Frequenz vor Dauer; Instrument sichtbar lagern, Skizzenbuch in der Tasche, Schreib-Slot im Kalender.","Unterricht beschleunigt 3–5×: Musikschulen nehmen Erwachsene (auch 70+), VHS-Kurse kosten 50–150 €, Privatlehrer 25–50 €/45 Min, Online-Kurse für Selbstlerner mit Disziplin; reine YouTube-Autodidaktik scheitert meist an fehlendem Feedback zu Grundfehlern (Haltung!, die sich einschleifen).","Gemeinschaft hält durch: Chöre (überall, oft ohne Vorsingen!), Malgruppen, Schreibwerkstätten, offene Bühnen, Bands für Wiedereinsteiger — Kreativität mit Sozialtermin hat die Abbruchquote von Vereinssport, nicht von Neujahrsvorsätzen.","Teilen ohne Druck: Werke zeigen (Familie, Online, offene Bühne) ist der stärkste Motivationsverstärker — aber Monetarisierungs-Fantasien („Etsy-Shop“, „Spotify“) am Anfang bewusst parken: Sie verwandeln Spiel in Arbeit, bevor das Fundament steht."],
 c:["Ein konkretes 3-Monats-Ziel formulieren (Song, Bild, Kurzgeschichte)","20-Minuten-Slot an 4 Tagen/Woche blocken, Material sichtbar lagern","Eine Unterrichtsstunde oder einen VHS-Kurs buchen (Feedback!)","Die 100-schlechte-Versuche-Erlaubnis schriftlich erteilen — im Ernst"],
 prem:"Vertiefung: Instrument-Wahlhilfe für Erwachsene (Aufwand vs. schnelle Erfolge), der 90-Tage-Plan für Gitarre/Klavier/Zeichnen/Schreiben, Übe-Wissenschaft kompakt (Deliberate Practice, Fehlerkultur) und Auftritts-Angst entschärfen."},
{id:"soziales",k:"freizeit",a:[18,100],s:["Jobwechsel","Trennung","Ruhestand"],t:"Freundschaften als Erwachsener: finden, pflegen, vertiefen",
 kurz:"Einsamkeit ist gesundheitlich so schädlich wie starkes Rauchen — und betrifft längst nicht nur Alte. Der Unterschied zu Schulzeiten: Freundschaft entsteht im Erwachsenenleben nicht mehr nebenbei. Sie braucht, was unromantisch klingt: System.",
 p:["Warum es schwerer wurde: Die Soziologie nennt drei Zutaten für Freundschaft — Nähe, wiederholte ungeplante Begegnung, Verletzlichkeits-Gelegenheiten. Schule und Studium liefern alle drei gratis, das Erwachsenenleben keine; man muss sie künstlich herstellen.","Wiederholung schlägt Funken: Nicht „Leute kennenlernen“ (Events, Apps), sondern denselben Menschen 8–12× begegnen — deshalb funktionieren wöchentliche Formate (Verein, Chor, Kurs, Stammtisch, Ehrenamt) und Einzel-Events nicht.","Der Initiativen-Mut ist der Engpass: Studien zeigen, dass Menschen systematisch unterschätzen, wie gern andere ihre Einladung annehmen („Liking Gap“) — die Faustregel: Wer dreimal initiativ war ohne Gegeninitiative, darf loslassen; vorher ist Schweigen meist Alltag, nicht Ablehnung.","Pflege ist Logistik, nicht Gefühl: feste Rituale (Monatsessen, Sonntagsanruf, jährliches Wochenende) überleben jede Lebensphase — spontane Freundschaften sterben an vollen Kalendern, ritualisierte nicht; Geburtstagsliste mit Erinnerungen ist kein Zynismus, sondern Wertschätzung mit Backup.","Vertiefung braucht Verletzlichkeit in Dosen: Vom Smalltalk zur Freundschaft führt gegenseitiges, schrittweises Öffnen (die berühmten 36-Fragen-Studien zeigen das Prinzip) — praktisch: eine echte Frage mehr stellen, eine ehrliche Antwort mehr geben, Hilfe anbieten UND annehmen.","Übergänge sind Hochrisiko-Zonen: Umzug, Elternschaft, Trennung, Ruhestand kosten im Schnitt die Hälfte des aktiven Netzwerks — wer es weiß, plant gegen: alte Kontakte ritualisieren, am neuen Ort sofort 1–2 Wiederholungs-Formate suchen, Paar-Freundschaften um Einzel-Drähte ergänzen."],
 c:["Eine Wiederholungs-Struktur beitreten (wöchentlich, mit denselben Menschen)","2 eingeschlafene Kontakte diese Woche anschreiben — ohne Anlass","Ein festes Ritual mit dem engsten Kreis etablieren (Monatsessen o. ä.)","Beim nächsten Gespräch: eine Frage tiefer als üblich"],
 prem:"Vertiefung: Der Netzwerk-Audit (Energiespender vs. -räuber), Skripte für die ersten Initiativen ohne Awkwardness, Freundschaft in der Rushhour des Lebens (Eltern-Edition) und Einsamkeit im Alter vorbeugen — die 10-Jahres-Strategie."},
{id:"auszeit",k:"freizeit",a:[22,60],s:["Jobwechsel"],t:"Sabbatical & Auszeiten: vom Mikroabenteuer bis zum Jahr weg",
 kurz:"Zwischen „mal durchatmen“ und Kündigung liegt ein ganzes Spektrum legaler, finanzierbarer Auszeiten — vom Bildungsurlaub über Teilzeit-Modelle bis zum echten Sabbatjahr. Die meisten scheitern nicht am Chef, sondern daran, nie konkret zu fragen.",
 p:["Die Leiter der Auszeiten: Mikroabenteuer (Feierabend-Übernachtung draußen, 24-h-Wanderung — null Kosten, sofort), Brückentage-Architektur (mit Planung werden aus 30 Urlaubstagen 60+ freie Tage), Bildungsurlaub (5 bezahlte Extra-Tage/Jahr in fast allen Bundesländern — auch für Sprachen, Yoga-Lehrgänge, politische Bildung), unbezahlter Urlaub (Verhandlungssache), Sabbatical (3–12 Monate).","Sabbatical-Finanzierung ohne Kündigung: Das Zeitwertkonto-/Ansparmodell (z. B. 12 Monate 75 % Gehalt arbeiten, dann 3–4 Monate bei 75 % frei) hält Gehalt, Sozialversicherung UND Job aufrecht — im öffentlichen Dienst etabliert, in der Privatwirtschaft verhandelbar; Alternative unbezahlte Freistellung: dann KV selbst zahlen (freiwillige GKV ab ~230 €/Monat) und Rentenlücke kennen.","Der Verhandlungs-Dreh: Nicht um Erlaubnis bitten, sondern ein Rückkehr-Konzept vorlegen — Vertretungsplan, Wissenstransfer, Zeitpunkt in der Nebensaison, schriftliche Rückkehrgarantie auf gleichwertige Position; Firmen verlieren lieber 6 Monate als eine eingearbeitete Fachkraft.","Budget-Realität: Weltreise-Klassiker 6 Monate Südostasien/Südamerika ≈ 8.000–15.000 € p. P. (mit dem Reise-Rechner kalkulieren), Zuhause-Sabbatical für Projekte/Familie kostet „nur“ das fehlende Gehalt — Faustregel: Budget × 1,2 ansparen plus 3 Monatsgehälter Wiedereinstiegs-Puffer.","Versicherungs-Hausaufgaben bei Langzeitreisen: Langzeit-Auslandskranken (1–2 €/Tag, VOR Abreise abschließen!), bestehende Verträge pausieren/kündigen, Wohnung untervermieten (Vermieter-Erlaubnis!) oder auflösen, Post-Vollmacht und Steuer-Zugang regeln.","Die Rückkehr mitplanen: Das Loch danach ist real — wer Wiedereinstieg (Termin, Projekt), Budgetpuffer und die erste Woche zurück vorab strukturiert, landet weich; und die ehrliche Frage vorher stellen: Will ich Pause vom Job oder von DIESEM Job? Letzteres löst kein Sabbatical."],
 c:["Dieses Quartal: ein Mikroabenteuer + Brückentage fürs nächste Jahr blocken","Bildungsurlaubs-Anspruch des Bundeslands prüfen und 1 Kurs wählen","Sabbatical: Wunschzeitraum + Rückkehr-Konzept als 1-Pager entwerfen","Sparziel mit Datum festlegen (Rechner unten) — Auszeiten werden gebucht, nicht erträumt"],
 prem:"Vertiefung: Die Brückentage-Architektur fürs Maximum an freien Tagen, das Zeitwertkonto-Modell durchgerechnet, der Sabbatical-Pitch als Vorlage und die Wiedereinstiegs-Checkliste — plus Auszeit-Sparrechner."},
{id:"auslandszeit",k:"bildung",a:[16,35],s:["Schulabschluss","Ausbildung wählen","Jobwechsel"],t:"Auslandszeit: Work & Travel, Au-pair, Auslandssemester, Freiwilligendienst",
 kurz:"Eine Zeit im Ausland ist die Weiterbildung, die keine Urkunde braucht: Sprache, Selbstständigkeit, Netzwerk. Die Formate unterscheiden sich massiv in Kosten, Alter und Aufwand — und fast alle haben Fristen, die ein Jahr vorher beginnen.",
 p:["Format-Überblick: Work & Travel (18–30/35, Working-Holiday-Visa u. a. für Australien, Neuseeland, Kanada, Japan — Jobben finanziert die Reise), Au-pair (18–26, Familie + Taschengeld + Sprachkurs), Auslandssemester (Erasmus+ in Europa: Studiengebühren entfallen, Mobilitätszuschuss!), Freiwilligendienste (FSJ/FÖJ im Ausland, weltwärts, Europäisches Solidaritätskorps — gefördert!), Sprachreisen und Auslandspraktika.","Die Förder-Wahrheit: Erasmus+ zahlt je nach Land mehrere hundert Euro/Monat zusätzlich zum erlassenen Auslands-Studienentgelt; Auslands-BAföG ist GROSSZÜGIGER als Inlands-BAföG (eigene Bedarfssätze, Reisekosten, Studiengebühren-Zuschuss bis ~5.600 €) — auch viele bekommen es, die im Inland leer ausgehen: immer prüfen (zuständig sind spezielle Auslands-Ämter, Antrag 6 Monate vorher!).","Working-Holiday braucht Vorlauf: Visa-Kontingente (z. B. Japan, Kanada) sind schnell vergriffen — 6–12 Monate vorher kümmern; Pflichtpaket: Auslandskrankenversicherung für die Gesamtdauer, Startkapital-Nachweis (oft 2.500–5.000 €), internationaler Führerschein.","Lebenslauf-Einordnung: Personaler werten strukturierte Auslandszeit positiv — entscheidend ist die Erzählung (was gelernt, was geleistet), nicht das Land; Lücken-Angst ist unbegründet, wenn die Zeit benennbar ist.","Auch ohne Abi/Studium: Au-pair, Work & Travel, weltwärts und Auslandspraktika über die Handwerkskammern (Gesellen ins Ausland!) stehen Azubis und Berufstätigen offen — sogar während der Ausbildung sind Auslandsaufenthalte bis zu einem Viertel der Ausbildungszeit möglich (Erasmus+ Berufsbildung).","Rückkehr-Logistik vorausdenken: Krankenversicherung nahtlos reaktivieren, Anmeldung, ggf. Anrechnung von Studienleistungen (Learning Agreement VOR Abreise unterschreiben lassen!) — und das Erlebte binnen 4 Wochen in Lebenslauf-Bullets gießen, solange es frisch ist."],
 c:["Format nach Alter, Budget und Ziel wählen (Sprache? Reisen? Lebenslauf?)","12 Monate vorher: Visa-/Bewerbungsfristen und Förderanträge recherchieren","Auslands-BAföG IMMER prüfen — auch wenn Inlands-BAföG abgelehnt wurde","Auslandskrankenversicherung für die volle Dauer vor Abreise abschließen"],
 prem:"Vertiefung: Die Format-Entscheidungsmatrix mit Kosten/Förderung je Variante, der 12-Monats-Countdown-Plan, Geld verdienen unterwegs (legale Jobs je Visum) und die Rückkehr ohne Loch (Versicherung, Anrechnung, Storytelling)."},
{id:"aufstieg",k:"bildung",a:[20,55],s:["Jobwechsel","Berufseinstieg"],t:"Meister, Fachwirt, Techniker: Aufstiegsfortbildung statt Studium",
 kurz:"Der unterschätzte Karriereweg: Aufstiegsfortbildungen sind dem Bachelor formal gleichgestellt (DQR 6), kosten dank Aufstiegs-BAföG oft nur noch einen Bruchteil — und führen in Führung, Selbstständigkeit oder sogar ohne Abi an die Hochschule.",
 p:["Die Treppe verstehen: Geselle/Fachkraft → Meister, Fachwirt, Techniker, Bilanzbuchhalter (alle DQR-Stufe 6 = Bachelor-Niveau) → Betriebswirt (HwO/IHK, DQR 7 = Master-Niveau). Mit dem Abschluss kommt automatisch die Hochschulzugangsberechtigung — der Weg zum Studium ohne Abitur.","Aufstiegs-BAföG ist der Gamechanger: 50 % der Lehrgangs- und Prüfungsgebühren als Zuschuss (geschenkt!), Rest als zinsgünstiges KfW-Darlehen — und wer die Prüfung besteht, bekommt davon nochmal 50 % erlassen; bei Vollzeit zusätzlich Unterhaltsbeitrag. Einkommens- und altersunabhängig!","Meisterbonus/Meisterprämie: Viele Bundesländer legen 1.000–3.000 € Prämie nach bestandener Prüfung obendrauf — Liste des eigenen Landes prüfen.","Formate ehrlich vergleichen: Vollzeit (6–12 Monate, schnell, aber Einkommensausfall), berufsbegleitend (1,5–3 Jahre, Abende/Samstage — Belastungsprobe für Familie!), Fernlehrgang (flexibel, hohe Abbruchquote ohne Lerngruppe); Bestehensquoten und Stundenzahl der Anbieter vergleichen, nicht nur Preise.","Was es bringt: Meister dürfen ausbilden und Betriebe führen (in zulassungspflichtigen Gewerken Pflicht für die Selbstständigkeit!), Gehaltssprünge von 10–25 % sind üblich, Fachkräftemangel macht Absolventen zu Umworbenen — und der Titel veraltet nicht wie manches Modul-Zertifikat.","Arbeitgeber einbinden: Viele zahlen mit (Bindungsvereinbarung mit fairer Staffelung akzeptabel — siehe Arbeitsvertrags-Artikel), Freistellung für Prüfungsphasen verhandeln, Bildungsurlaub zusätzlich nutzen."],
 c:["Zielabschluss + 2–3 Anbieter mit Bestehensquoten vergleichen","Aufstiegs-BAföG-Antrag VOR Lehrgangsbeginn stellen","Meisterprämie des Bundeslands recherchieren","Familien-/Arbeitgeber-Gespräch über die Belastungsphase führen"],
 prem:"Vertiefung: Die Kostenrechnung an einem echten Beispiel (Meister mit allen Förderungen: Eigenanteil oft unter 20 %), Vollzeit vs. berufsbegleitend als Entscheidungsbaum, Prüfungsstruktur und die typischen Durchfaller-Fehler, danach: Selbstständigkeit oder Studium ohne Abi."},
{id:"lernen",k:"bildung",a:[16,70],s:["Schulabschluss","Ausbildung wählen","Jobwechsel"],t:"Lernen & Prüfungen bestehen: die Methodik für Erwachsene",
 kurz:"Ob IHK-Prüfung, Führerschein-Theorie, Staatsexamen oder Sprachzertifikat: Erwachsene scheitern selten am Stoff, sondern an Schul-Methoden, die nie funktioniert haben — Markern, Wiederlesen, Nacht-Schichten. Die Lernforschung hat bessere Werkzeuge.",
 p:["Die zwei Techniken, die fast alles schlagen: Aktives Abrufen (sich selbst abfragen statt wiederlesen — Karteikarten, Übungsklausuren, Stoff laut erklären) und verteiltes Lernen (Spaced Repetition: Wiederholung in wachsenden Abständen statt Blocklernen). Beide zusammen verdoppeln bis verdreifachen die Behaltensleistung gegenüber Markieren & Wiederlesen.","Übungsklausuren sind das halbe Bestehen: Alte Prüfungen unter Echtbedingungen (Zeit! kein Spicken!) trainieren Format, Zeitmanagement und decken Lücken auf — Faustregel: Ab der Hälfte der Vorbereitungszeit mehr prüfen als lernen.","Der Lernplan rückwärts: Vom Prüfungstag zurückrechnen, Stoff in Wochenpakete teilen, letzte Woche NUR Wiederholung + Klausuren, Puffertage einbauen (Leben passiert) — und täglich 25–50-Minuten-Blöcke mit Pausen (Pomodoro) schlagen Marathon-Sessions, weil Konzentration ein endlicher Tank ist.","Prüfungsangst ist trainierbar: Simulation (je öfter Echtbedingungen, desto kleiner die Angst), Atemtechnik (4 Sek ein, 6 Sek aus — physiologisch wirksam), Blackout-Protokoll vorbereiten (Aufgabe überspringen, leichteste zuerst, nach 2 Min zurück), und die Nacht davor: schlafen schlägt lernen — Schlaf konsolidiert, Koffein-Nächte löschen.","Mündliche Prüfungen sind Gespräarche, keine Verhöre: laut üben (Partner oder Sprachmemo), Brücken-Sätze für Nichtwissen parat („Das weiß ich im Detail nicht, aber der Zusammenhang ist…“), Prüfer wollen bestehen lassen — Struktur und Ruhe zählen mehr als Vollständigkeit.","Erwachsenen-Spezial: Lernen neben Job und Familie braucht Termine wie Zahnarzt-Termine (fix im Kalender, dem Umfeld kommuniziert), einen festen Lernort mit Material griffbereit, und realistische Dosis — 5× 30 Minuten pro Woche konsequent schlagen das Fantasie-Wochenende, das nie kommt."],
 c:["Karteikarten-System (App oder Papier) für den aktuellen Stoff aufsetzen","Alte Prüfungen/Übungsaufgaben besorgen — vor dem Lernstart","Lernplan rückwärts vom Prüfungstag, mit Puffertagen","Feste Lern-Slots in den Kalender, Umfeld informieren"],
 prem:"Vertiefung: Der 6-Wochen-Prüfungsplan als ausfüllbare Vorlage, Spaced-Repetition richtig einstellen, das Blackout-Notfallprotokoll Schritt für Schritt und Lerntechniken im Wirksamkeits-Ranking (was die Forschung wirklich stützt — und was Mythos ist)."},
{id:"sprachen",k:"bildung",a:[14,100],s:["Jobwechsel","Ruhestand"],t:"Sprachen lernen als Erwachsener: System schlägt Talent",
 kurz:"„Zu alt für Sprachen“ ist ein Mythos mit wahrem Kern: Erwachsene lernen anders — schlechter im beiläufigen Aufsaugen, besser mit System. Wer Input, Sprechen und Routine kombiniert, erreicht Alltagstauglichkeit in 6–12 Monaten Nebenbei-Lernen.",
 p:["Realistische Ziele nach GER-Stufen: A2 (Alltag überleben) ≈ 150–200 Lernstunden, B1 (selbstständig zurechtkommen, Smalltalk) ≈ 350–400, B2 (arbeitsfähig) ≈ 500–650 — bei 30 Min/Tag ist B1 in einem Jahr machbar; ähnliche Sprachen (Spanisch nach Französisch) gehen deutlich schneller.","Die Dreier-Kombination schlägt jede Einzelmethode: 1. App/Kurs für Struktur (täglich 15 Min — Streak nutzen, aber nicht überschätzen: Apps allein machen nicht sprechfähig), 2. Input auf Niveau (Serien mit Zielsprachen-Untertiteln, Podcasts für Lerner, ab B1 Originale), 3. SPRECHEN von Woche 1 (Tandempartner kostenlos via Apps/VHS, Online-Lehrer ab ~10–15 €/Stunde — der größte Beschleuniger überhaupt).","Fehler sind der Weg, nicht das Hindernis: Flüssigkeit vor Korrektheit in den ersten Monaten — wer auf den perfekten Satz wartet, sagt nie einen; Muttersprachler honorieren Versuche fast immer.","Vokabeln mit System: Die 1.000 häufigsten Wörter decken ~80 % der Alltagssprache — Frequenzlisten + Spaced-Repetition-App statt Lehrbuch-Wortlisten von „Tante“ bis „Füllfederhalter“; Wörter in Beispielsätzen lernen, nie isoliert.","Förderung & Anlässe nutzen: Bildungsurlaub für Intensiv-Sprachkurse (auch im Ausland!), VHS-Kurse ab ~80 €/Semester, Integrationskurs-Logik umgekehrt: Sprachzertifikate (telc, Goethe, IELTS, DELE) als konkretes Ziel mit Datum verwandeln Vorsatz in Projekt.","Dranbleiben ist Architektur: Sprache an bestehende Routinen koppeln (Podcast beim Pendeln, App beim Kaffee), Wochenziel statt Tagesdruck, und ein „Warum“ mit Datum (Reise gebucht, Gespräch mit Schwiegereltern, Jobziel) — ohne konkreten Anlass stirbt jede Sprache im April."],
 c:["GER-Zielstufe + Datum festlegen (z. B. „B1 bis zur Reise im Oktober“)","Dreier-Kombi einrichten: App-Slot, 1 Input-Quelle, 1 Sprech-Termin/Woche","Frequenz-Vokabelliste in eine Spaced-Repetition-App laden","Bildungsurlaub für einen Intensivkurs prüfen"],
 prem:"Vertiefung: Der 6-Monats-Plan zu B1 mit Wochenstruktur, Tandem & Online-Lehrer finden und nutzen (inkl. erster-Termin-Skript), die Plateau-Phase ab B1 durchbrechen und Zertifikate im Vergleich (welches wofür zählt)."},
{id:"fernstudium",k:"bildung",a:[20,60],s:["Jobwechsel","Berufseinstieg"],t:"Fernstudium & Online-Abschlüsse: berufsbegleitend zum Titel",
 kurz:"Studieren neben dem Job ist erwachsener Alltag geworden — von der staatlichen Fernuni für ein paar hundert Euro bis zur privaten Online-Hochschule für 15.000 €+. Der Abschluss ist gleichwertig; die Unterschiede liegen in Preis, Betreuung und der brutalen Ehrlichkeit der Abbruchquoten.",
 p:["Anbieter-Landschaft: Staatliche Fernuniversität (Hagen: ~1.500–3.000 € fürs GANZE Studium, akademisch anspruchsvoll, Betreuung schlank), private Fernhochschulen (IU, Euro-FH & Co.: 10.000–17.000 €, starke Didaktik/Flexibilität, Marketing-Maschine), berufsbegleitende Präsenz-/Hybridmodelle staatlicher Hochschulen (Abend/Wochenende, oft unterschätzt günstig).","Akkreditierung prüfen, nicht Werbung glauben: Staatlich anerkannte Hochschule + akkreditierter Studiengang (Akkreditierungsrat-Datenbank) — dann ist der Bachelor/Master identisch viel wert wie ein Präsenzabschluss; „Zertifikatskurse“ und ausländische Titel-Mühlen sind KEINE Abschlüsse.","Die Abbruch-Wahrheit: Fernstudien-Abbruchquoten liegen deutlich über Präsenz — Hauptgründe sind Zeitüberschätzung und Isolation; Gegenmittel: realistisches Pensum (neben Vollzeitjob sind 15–20 h/Woche das Maximum → Regelstudienzeit × 1,5 planen), Lerngruppe ab Woche 1 (online organisiert), Urlaubssemester-Option kennen statt hinwerfen.","Finanzierung: Arbeitgeber-Beteiligung verhandeln (mit Bindungsklausel-Augenmaß), Studiengebühren voll als Werbungskosten absetzbar (auch im Erststudium nach Ausbildung!), Teilzeit-Studierende haben teils BAföG-Zugang, Stipendien (Aufstiegsstipendium für Berufserfahrene: ~3.000 €/Jahr berufsbegleitend!) werden kaum nachgefragt.","Anrechnung spart Jahre: Ausbildung, Fortbildungen (Fachwirt!) und Berufserfahrung können bis zu 50 % der Credits ersetzen — VOR der Einschreibung Anrechnungsantrag klären, das ist bares Geld und Zeit.","Probemonat nutzen: Seriöse Anbieter bieten 2–4 Wochen kostenloses Testen — echte Module ansehen, nicht die Demo; Kündigungsfristen und monatliche Zahlweise (statt Gesamtvertrag!) sind die wichtigsten Vertragspunkte."],
 c:["3 Anbieter vergleichen: Gesamtkosten, Akkreditierung, Betreuung, Kündigungsmodell","Anrechnungspotenzial (Ausbildung/Fortbildung) VOR Einschreibung prüfen","Aufstiegsstipendium checken (Berufserfahrene mit guten Leistungen)","Wochenplan-Ehrlichkeit: 15 h dauerhaft? Familie einverstanden?"],
 prem:"Vertiefung: Die Anbieter-Vergleichstabelle (Kosten/Modell/Eignung), der Anrechnungs-Fahrplan für maximale Credit-Ersparnis, Zeitbudget-Realität mit Wochenplan-Vorlage und die Steuer-Rechnung (was das Studium netto wirklich kostet)."},
{id:"wg",k:"wohnen",a:[18,40],s:["Erste Wohnung","Trennung"],t:"WG & Untermiete: Verträge, Geld, Zusammenleben",
 kurz:"Die WG ist längst nicht mehr nur Studentensache — sie ist Antwort auf Wohnungsnot, Trennungen und Einsamkeit. Rechtlich ist sie ein Minenfeld aus drei Vertragsmodellen, und sozial steht und fällt sie mit Regeln, die vor dem Einzug besprochen wurden.",
 p:["Die drei Vertragsmodelle entscheiden alles: 1. Alle im Hauptmietvertrag (gleichberechtigt, aber GESAMTSCHULDNERISCH — zieht einer aus und zahlt nicht, haften die anderen; Auszug braucht Mitwirkung aller + Vermieter), 2. Ein Hauptmieter + Untermieter (flexibel für Untermieter, Macht beim Hauptmieter, Kündigungsschutz schwächer), 3. Einzelverträge je Zimmer (sauberste Trennung, Vermieter bestimmt Nachzüger mit).","Untervermietung braucht Erlaubnis: Wer untervermietet, braucht die Vermieter-Zustimmung — bei berechtigtem Interesse (finanziell, persönlich) besteht aber ein ANSPRUCH auf Erlaubnis zur Teil-Untervermietung; ohne Erlaubnis drohen Abmahnung und Kündigung. Befristete Untermiete (Auslandssemester!) ist der legale Klassiker.","Geld-Architektur: Gemeinsames Haushaltskonto oder App fürs Aufteilen, Nebenkosten-Nachzahlungen anteilig nach Zeitraum regeln (Auszugs-Klassiker!), Kaution-Anteile schriftlich quittieren, Anschaffungs-Liste führen (wem gehört die Couch beim Auszug?).","Das Einzugs-Gespräch verhindert 80 % der Konflikte: Putzplan-Realität (Plan vs. Putzkraft umlegen!), Besucher- und Partner-Übernachtungsregeln, Ruhezeiten, gemeinsames vs. getrenntes Essen, Homeoffice-Nutzung des Wohnzimmers — einmal ehrlich besprochen schlägt zehnmal passiv-aggressive Zettel.","Casting in beide Richtungen: Beim WG-Besichtigen selbst Fragen stellen (Wie lange wohnen die Leute schon hier? Wie lief der letzte Konflikt? Wer zieht aus und warum?) — hohe Fluktuation ist das ehrlichste Warnsignal.","Anmeldung & Bürokratie: Jeder Bewohner meldet sich an (Wohnungsgeberbestätigung!), Rundfunkbeitrag fällt EINMAL pro Wohnung an (aufteilen), Hausrat des Einzelnen über eigene oder elterliche Police klären, WG-Zimmer-Kosten ggf. bei doppelter Haushaltsführung absetzbar."],
 c:["Vertragsmodell verstehen, BEVOR unterschrieben wird — Haftung klären","Untermiete: schriftliche Vermieter-Erlaubnis einholen","Einzugs-Gespräch mit den 6 Konfliktthemen führen","Inventar- und Kautions-Liste anlegen (Auszugs-Versicherung)"],
 prem:"Vertiefung: Die drei Vertragsmodelle mit Muster-Klauseln und Auszugs-Szenarien durchgespielt, der Untermietvertrag als Vorlage, die WG-Finanz-Toolbox (Konten, Apps, Nachzahlungs-Formel) und das Konfliktgespräch-Skript für die Klassiker (Putzen, Lärm, Dauergast)."},
{id:"weg",k:"wohnen",a:[25,100],s:["Hauskauf"],t:"Eigentumswohnung leben: WEG, Hausgeld & Eigentümerversammlung",
 kurz:"Mit dem Wohnungskauf wird man Zwangsmitglied einer Mini-Demokratie: der Eigentümergemeinschaft. Wer ihre Spielregeln — Hausgeld, Beschlüsse, Rücklagen — nicht kennt, erlebt Sonderumlagen als Schicksal statt als vermeidbares Versäumnis.",
 p:["Hausgeld verstehen: Es deckt Betriebskosten (umlagefähig bei Vermietung), Verwaltung und INSTANDHALTUNGSRÜCKLAGE — Richtwert gesamt 3–4,50 €/m²/Monat; verdächtig billiges Hausgeld bedeutet meist: Rücklage zu klein, Sonderumlage vorprogrammiert.","Sondereigentum vs. Gemeinschaftseigentum entscheidet, wer zahlt: Innenputz, Bodenbeläge, Innentüren = deins; Fenster, Wohnungstür (außen), Leitungen bis zur Abzweigung, Dach, Fassade, Heizung = Gemeinschaft — der Klassiker „kaputtes Fenster“ ist fast immer Gemeinschaftssache.","Die Eigentümerversammlung ist das Parlament: einmal jährlich, Beschlüsse meist mit einfacher Mehrheit (seit WEG-Reform auch bauliche Veränderungen leichter), Vollmacht möglich, Protokoll anfordern — wer nie hingeht, wird von den Anwesenden regiert. Beschluss-Anfechtung: nur binnen 1 MONAT bei Gericht!","Verwalter ist Dienstleister, nicht Obrigkeit: Leistungskatalog im Vertrag, Vergleichsangebote bei Verlängerung, Belegeinsicht ist Eigentümerrecht, Jahresabrechnung und Wirtschaftsplan kritisch lesen (die häufigsten Fehler: falsche Verteilerschlüssel, Rücklagen-Vermischung); schlechte Verwalter wechselt die Mehrheit ab.","Vor JEDEM Kauf einer ETW: letzte 3 Versammlungsprotokolle (dort stehen Konflikte und kommende Großprojekte!), Rücklagenhöhe, Wirtschaftspläne, Teilungserklärung + Gemeinschaftsordnung (Haustiere? Gewerbe? Vermietung?) und laufende Rechtsstreitigkeiten erfragen.","Modernisierung kommt auf alle zu: Heizungstausch, Dämmung, Ladesäulen — energetische Sanierung wird Gemeinschaftsthema mit hohen Summen; gut gefüllte Rücklage und frühe Beschluss-Beteiligung sind der Unterschied zwischen Plan und Panik-Sonderumlage."],
 c:["Vor Kauf: 3 Protokolle + Rücklagenstand + Teilungserklärung lesen","Jede Eigentümerversammlung wahrnehmen oder Vollmacht erteilen","Jahresabrechnung prüfen: Schlüssel, Rücklage, Belegeinsicht","Hausgeld-Realität ins Budget: 3–4,50 €/m² + eigene Rücklage fürs Sondereigentum"],
 prem:"Vertiefung: Die Jahresabrechnung Zeile für Zeile erklärt, Beschluss-Kunde (was welche Mehrheit braucht, wie man Anträge stellt), der Verwalterwechsel Schritt für Schritt und die Sonderumlagen-Frühwarnzeichen beim Kauf."},
{id:"sanierung",k:"wohnen",a:[28,75],s:["Hauskauf"],t:"Sanieren & Heizung tauschen: Pflichten, Förderung, Reihenfolge",
 kurz:"Energetische Sanierung ist die größte Einzelinvestition nach dem Kauf — und das Feld mit dem meisten Förder-Geld, das ungenutzt verfällt. Wer die richtige Reihenfolge kennt und VOR Auftragsvergabe fördert, spart fünfstellig.",
 p:["Erst Beratung, dann Bagger: Der Energieberater (Liste der dena, Förderung deckt einen Großteil der Kosten) erstellt den individuellen Sanierungsfahrplan (iSFP) — der bringt nicht nur Plan statt Flickwerk, sondern erhöht auch viele Zuschüsse um Extra-Prozentpunkte.","Die goldene Reihenfolge: 1. Hülle dicht (Dach/oberste Geschossdecke — bestes Kosten-Nutzen-Verhältnis!, Kellerdecke), 2. Fenster, 3. Fassade, 4. DANN Heizung dimensionieren — wer zuerst die Heizung tauscht, kauft sie zu groß; Ausnahme: Die Heizung stirbt jetzt.","Heizungs-Realität: Wärmepumpe ist im Bestand meist machbar (Heizkörper-Tausch einzelner Räume statt Fußbodenheizungs-Mythos; Heizlast berechnen lassen!), Förderung deckt einen erheblichen Anteil der Kosten (Grundförderung + Boni je nach Einkommen und Tempo); Gas-Neueinbau unterliegt GEG-Anforderungen (65 %-Erneuerbare-Regel je nach kommunaler Wärmeplanung) — vor jeder Entscheidung den aktuellen Stand für die eigene Kommune prüfen.","Förder-Grundregeln: Antrag IMMER vor Auftragsvergabe (BAFA/KfW), Zuschüsse und Förderkredite kombinierbar, alternativ Steuerbonus für Sanierung (20 % über 3 Jahre direkt von der Steuerschuld — ohne Antrag, mit Fachunternehmer-Bescheinigung); Handwerker-Knappheit einplanen: 6–12 Monate Vorlauf sind normal.","Pflichten nach Kauf kennen: Beim Eigentümerwechsel greifen Nachrüstpflichten (oberste Geschossdecke dämmen, alte Konstanttemperatur-Kessel >30 Jahre tauschen — Fristen ab Übergang!), Energieausweis-Pflichten und ggf. kommunale Satzungen.","Low-Cost zuerst: Hydraulischer Abgleich, Heizungspumpen-Tausch, smarte Thermostate, Dichtungen, Kellerdecken-Dämmung in Eigenleistung — zusammen oft 10–20 % Einsparung für unter 3.000 €, bevor das große Besteck kommt."],
 c:["Energieberater buchen + iSFP erstellen lassen (Förderung nutzen)","Förderantrag-Regel verinnerlichen: erst Antrag, dann Auftrag","Low-Cost-Paket umsetzen (Abgleich, Pumpe, Thermostate)","Bei Kauf: Nachrüstpflichten und Heizungsalter in die Preisverhandlung nehmen"],
 prem:"Vertiefung: Der Sanierungsfahrplan an einem Beispielhaus mit Kosten und Förderung je Maßnahme, Wärmepumpe im Altbau (die Machbarkeits-Checkliste), Zuschuss vs. Steuerbonus durchgerechnet und die Handwerker-Akquise in Mangelzeiten."},
{id:"einrichten",k:"wohnen",a:[18,100],s:["Erste Wohnung","Hauskauf","Trennung"],t:"Einrichten mit Budget: Wirkung statt Geld",
 kurz:"Zwischen Möbelhaus-Schuldenfalle und Pinterest-Perfektionismus liegt die Wahrheit: Räume wirken durch wenige Hebel — Licht, Proportionen, Reihenfolge der Anschaffungen. Die teuersten Fehler passieren in der ersten Einrichtungswoche.",
 p:["Die Reihenfolge-Regel: Erst wohnen, dann kaufen — 4–8 Wochen mit Provisorium leben zeigt, wo Licht fehlt, welche Wege man geht, wo Stauraum gebraucht wird; die teuersten Fehlkäufe sind die der ersten Woche (zu großes Sofa, falscher Schrank).","Budget-Hierarchie nach Nutzungsstunden: Matratze und Arbeitsstuhl (8+ Stunden täglich!) verdienen Qualität — Sofa, Bettgestell, Regale verzeihen Gebrauchtkauf; Faustverteilung fürs Startbudget: 40 % Schlafen/Sitzen-Qualität, 30 % Stauraum, 20 % Licht, 10 % Deko (nicht umgekehrt, wie es der Handel will).","Gebraucht ist der Königsweg: Kleinanzeigen, Sozialkaufhäuser, Wohnungsauflösungen, Möbelbörsen — Massivholz von 1980 überlebt jede Pressspan-Neuware; nur Matratzen, Polster mit Geruchs-/Hygiene-Risiko und Lattenroste kritisch prüfen oder neu kaufen.","Licht ist der unterschätzte Raum-Verwandler: Drei Lichtquellen pro Raum (Decke + Steh-/Tischleuchte + Akzent), warmweiß (2700–3000 K) im Wohnbereich, Dimmer — 100 € in Licht verändern mehr als 1.000 € in Möbeln.","Proportionen schlagen Stil: Teppich groß genug (Vorderfüße der Möbel drauf!), Bilder auf Augenhöhe (Mitte ~145 cm), Vorhänge deckennah aufhängen (Raum wirkt höher), ein großes Stück statt fünf kleiner — die häufigsten „irgendwas stimmt nicht“-Räume kranken an Maßstab, nicht an Geschmack.","Mieter-sichere Aufwertung: Wandfarbe (Rückbau einplanen), Klebefolien für Küchenfronten, Tapeten zum Abziehen, Möbelgriffe tauschen, freistehende Garderoben — und vor dem Bohren: Leitungssucher und die Frage, ob es die Wand sein muss (Dübel-Lasten vs. Klebe-Lösungen)."],
 c:["4 Wochen Provisorium aushalten, Bedürfnis-Liste führen","Budget nach Nutzungsstunden verteilen: Matratze & Stuhl zuerst","3-Lichtquellen-Setup pro Hauptraum einrichten","Gebraucht-Suchaufträge für die großen Stücke anlegen"],
 prem:"Vertiefung: Der Erstausstattungs-Plan mit Preisspannen (gebraucht/neu) je Raum, die 10 Proportions-Regeln mit Vorher-Nachher-Logik, Gebraucht-Kauf-Checklisten (worauf bei Sofa, Schrank, Matratze achten) und kleine Räume groß wohnen."},
{id:"einbruchschutz",k:"wohnen",a:[20,100],s:["Erste Wohnung","Hauskauf"],t:"Einbruchschutz & Sicherheit: was wirklich abschreckt",
 kurz:"Einbrecher sind keine Filmprofis, sondern Gelegenheitstäter mit Schraubendreher: Die meisten Einbrüche laufen über Fenster und Wohnungstüren in unter 5 Minuten — und ein erheblicher Teil scheitert schon an simpler Mechanik. Genau dort beginnt sinnvoller Schutz, nicht bei der Kamera.",
 p:["Mechanik vor Elektronik — die Polizei-Beratung ist eindeutig: Abschließbare Fenstergriffe + Pilzkopfverriegelung (Nachrüstung möglich), Türen mit Mehrfachverriegelung und Schutzbeschlag, Querriegel für Altbautüren, Kellerschächte sichern; Widerstandsklasse RC2 ist der Haushalts-Standard. Wer 3–5 Minuten Widerstand leistet, ist meist raus aus dem Beuteschema.","Das gekippte Fenster ist ein offenes Fenster (versicherungsrechtlich oft grob fahrlässig!), der Schlüssel unterm Blumentopf eine Einladung, und „nur kurz weg“ ohne Abschließen kann den Hausrat-Schutz kosten — Türen IMMER zweifach abschließen.","Anwesenheits-Simulation schlägt Festungs-Optik: Zeitschaltuhren/smarte Lampen mit Zufallsmodus, Rollläden nicht wochenlang unten, Briefkasten leeren lassen, keine Urlaubs-Posts in Echtzeit — Einbrecher klingeln vorher oder beobachten; Nachbarschafts-Absprachen sind das älteste und beste Alarmsystem.","Elektronik als Ergänzung: Alarmanlagen wirken abschreckend (Norm-Qualität statt Baumarkt-Attrappe), Kameras nur aufs EIGENE Grundstück (Datenschutz! Nachbar/Gehweg tabu), smarte Türsensoren melden — aber keine Kamera hält eine Tür zu: erst Mechanik, dann Spielzeug.","Staat zahlt mit: KfW-Zuschuss für Einbruchschutz-Maßnahmen (auch Mieter mit Vermieter-Zustimmung!), polizeiliche Beratungsstellen beraten KOSTENLOS und herstellerneutral vor Ort — der unterschätzteste Termin der Wohnsicherheit.","Nach dem Einbruch: nichts anfassen, 110, Stehlgutliste fürs Protokoll (vorher anlegen! Fotos/Rechnungen von Wertsachen in der Cloud), Versicherung binnen Frist melden, Schlösser tauschen — und die psychische Last ernst nehmen: Das Sicherheitsgefühl leidet oft mehr als der Geldbeutel, Opferhilfe (WEISSER RING) hilft auch hier."],
 c:["Kostenlosen Termin der polizeilichen Beratungsstelle vereinbaren","Fenster-Schwachstellen nachrüsten (Griffe, Pilzköpfe) — Reihenfolge: EG & Keller zuerst","Wertsachen-Liste mit Fotos/Rechnungen in der Cloud anlegen","Urlaubs-Routine: Simulation, Briefkasten, keine Live-Posts"],
 prem:"Vertiefung: Der Schwachstellen-Rundgang ums eigene Zuhause als Checkliste, Nachrüst-Kosten und KfW-Förderung je Maßnahme, Mieter-Edition (was ohne Vermieter geht) und die Wertsachen-Dokumentation, die im Schadensfall Gold wert ist."},
{id:"wohnenalter",k:"alter",a:[55,100],s:["Ruhestand","Pflegefall"],t:"Wohnen im Alter: Umbau, Umzug oder Alternativen — rechtzeitig entscheiden",
 kurz:"Die wichtigste Wohnentscheidung des Lebens fällt meist zu spät: erst nach dem Sturz, der Diagnose, dem Tod des Partners. Wer mit 60–70 plant statt mit 85 reagiert, hat alle Optionen — danach entscheiden andere.",
 p:["Die ehrliche Bestandsaufnahme mit 65: Treppen ohne Geländer beidseits? Bad mit Wanne statt Dusche? Schlafzimmer nur oben? Einkauf/Arzt ohne Auto erreichbar? Soziales Netz im Viertel? — Drei Nein bedeuten: Das Haus passt dem 85-jährigen Ich nicht.","Barrierereduzierter Umbau: bodengleiche Dusche (3.000–6.000 €), Haltegriffe & Lichtkonzept (kleines Geld, große Sturz-Prävention), Treppenlift (3.000–12.000 €), Rampen, breitere Türen; Förderung: Pflegekasse zahlt ab Pflegegrad bis 4.180 € je Maßnahme (mehrfach bei Verschlechterung!), KfW-Programm „Altersgerecht Umbauen“, teils Landesprogramme.","Die Alternativen-Palette kennen, BEVOR es eng wird: Betreutes Wohnen (Miete + Servicepauschale 50–200 €+; auf Vertragsdetails achten — was ist Grund-, was Wahlservice?), Senioren-WGs (selbstorganisiert oder trägergestützt), Mehrgenerationenwohnen, Wohnen für Hilfe (Studierende wohnen günstig gegen Unterstützung), Quartierskonzepte — und das klassische Heim als letzte, nicht erste Option.","Haus zu groß, Rente zu klein? Optionen nüchtern vergleichen: Verkauf + altersgerechte Mietwohnung (Kapital wird liquide, Verantwortung weg), Vermietung einer Einliegerwohnung, Teilverkauf/Leibrente/Umkehrhypothek (VORSICHT: oft teuer und komplex — unabhängige Beratung vor Unterschrift, Verbraucherzentralen warnen regelmäßig), Untervermietung mit Service-Tausch.","Der Umzugs-Mut zahlt sich aus: Studien zeigen — wer freiwillig und früh in passendes Wohnen wechselt, lebt zufriedener als wer „durchhält“; entscheidend ist Nähe zu Menschen und Versorgung, nicht Quadratmeter. Ausmisten mit System (Zimmer für Zimmer, Erbstücke jetzt verschenken — mit warmen Händen geben) macht den Schritt leichter.","Rechtzeitig heißt: solange man selbst entscheidet — nach Schlaganfall oder Demenz-Diagnose entscheiden Bevollmächtigte unter Zeitdruck aus schlechten Optionen; die Wohnfrage gehört ins selbe Gespräch wie Vollmacht und Patientenverfügung."],
 c:["Bestandsaufnahme-Check mit den 5 Fragen — heute, nicht „irgendwann“","Bad-Umbau als erste Maßnahme prüfen (größter Sturz- und Würde-Hebel)","Förderlandschaft checken: Pflegekasse, KfW, Land","2 Alternativen besichtigen, solange es NICHT nötig ist (Druckfrei entscheidet besser)"],
 prem:"Vertiefung: Der Wohn-Check als 25-Punkte-Liste, Umbau-Maßnahmen mit Kosten und Förderwegen, Betreutes-Wohnen-Verträge richtig lesen (die Servicepauschalen-Fallen) und Teilverkauf/Leibrente im kritischen Vergleich."},
{id:"gesundaltern",k:"alter",a:[50,100],s:["Ruhestand"],t:"Gesund altern: was die Langlebigkeits-Forschung wirklich empfiehlt",
 kurz:"Zwischen Anti-Aging-Marketing und Schicksalsergebenheit liegt solide Wissenschaft: Etwa drei Viertel des gesunden Alterns sind Lebensstil, nicht Gene. Die wirksamen Hebel sind unspektakulär — und beginnen mit 50 wirksamer als mit 75, aber nie zu spät.",
 p:["Muskelkraft ist die Lebensversicherung des Alters: Ab 50 verliert der Körper ohne Training 1–2 % Muskelmasse pro Jahr (Sarkopenie) — Krafttraining 2×/Woche ist die am besten belegte Einzelmaßnahme gegen Gebrechlichkeit, Stürze und Pflegebedürftigkeit; es wirkt nachweislich auch bei 80- und 90-Jährigen.","Sturzprävention rettet Selbstständigkeit: Ein Drittel der über 65-Jährigen stürzt jährlich, Oberschenkelhalsbruch ist der klassische Pflege-Auslöser — Gegenprogramm: Gleichgewichtstraining (Tai-Chi ist Studien-Champion!), Kraft, Sehtest & Brille aktuell, Medikamenten-Check (Schwindel-Nebenwirkungen!), Stolperfallen zu Hause beseitigen, gutes Licht.","Das Gehirn altert wie der Körper trainiert wird: Die größten belegten Demenz-Schutzfaktoren sind Bewegung, Blutdruck-/Diabetes-Kontrolle, HÖRGERÄTE bei Hörverlust (unterschätzter Top-Faktor — unbehandelte Schwerhörigkeit isoliert und beschleunigt Abbau), soziale Eingebundenheit und Neues lernen; Kreuzworträtsel allein reichen nicht — Neuigkeit + Sozialkontakt schlagen Routine-Rätsel.","Einsamkeit ist ein medizinischer Risikofaktor auf Raucher-Niveau: Die 10-Jahres-Strategie aus dem Freundschafts-Artikel ist Gesundheitsvorsorge — Strukturen vor dem Ruhestand aufbauen, Hörgerät tragen (!), Mobilität erhalten (der Führerschein-Verzicht braucht einen Mobilitäts-Plan B, sonst schrumpft die Welt).","Ernährung im Alter dreht eine Regel um: Eiweiß wird WICHTIGER (1–1,2 g/kg Körpergewicht — Muskelerhalt!), Appetit sinkt, Trinken wird vergessen (Durstgefühl lässt nach: Trinkroutinen!); ungewollter Gewichtsverlust ist nie „normal“, sondern Abklärungsgrund.","Vorsorge-Upgrade ab 60/65: Grippe jährlich, Pneumokokken, Gürtelrose-Impfung, Bauchaorten-Screening (Männer), Augendruck/Makula im Blick, Zahnstatus (Kaufähigkeit = Ernährung!) — und die unbequemste Vorsorge: Fahreignung ehrlich selbst prüfen, bevor andere es tun müssen."],
 c:["Krafttraining 2×/Woche etablieren — Reha-Sport/Vereins-Seniorengruppen nutzen","Hörtest machen (ab 60 alle 2 Jahre) — und Hörgeräte TRAGEN","Sturz-Check der Wohnung: Teppichkanten, Licht, Haltegriffe","Eiweiß pro Mahlzeit einplanen, Trinkroutine festlegen"],
 prem:"Vertiefung: Das Kraft- und Gleichgewichts-Programm für Einsteiger 60+ (zu Hause, 20 Minuten), die Demenz-Schutzfaktoren mit Umsetzungsplan, der Medikamenten-Check-Leitfaden fürs Arztgespräch und der Mobilitäts-Plan B ohne Auto."},
{id:"grosseltern",k:"alter",a:[50,90],s:["Ruhestand","Kind bekommen"],t:"Großeltern sein: Nähe, Grenzen, rechtliche Realität",
 kurz:"Großeltern sind das größte unbezahlte Betreuungssystem des Landes — und die Rolle ist anspruchsvoller geworden: andere Erziehungsregeln, Patchwork, Distanz-Enkel, eigene Pläne. Gelingende Großelternschaft ist Beziehungsarbeit mit klaren Absprachen.",
 p:["Die goldene Hierarchie-Regel: Die Eltern bestimmen die Linie (Essen, Medien, Schlaf, Erziehungsstil) — Großeltern dürfen verwöhnen IM vereinbarten Rahmen; der Klassiker-Konflikt („Bei Oma gibt's das aber“) ist fast immer ein Absprache-, kein Liebesproblem: einmal jährlich das Regel-Gespräch führen, bevor es kracht.","Betreuung verlässlich statt grenzenlos: Feste Tage schlagen Dauerbereitschaft — sie geben Eltern Planbarkeit und Großeltern ihr eigenes Leben zurück; Nein-Sagen ist erlaubt und beziehungserhaltend (Großeltern-Burnout ist real, besonders bei Vollzeit-Einspringen).","Geld & Recht im Hintergrund: Regelmäßige Betreuung kann sich lohnen zu formalisieren — Fahrtkosten erstatten lassen ist legitim; Betreuungskosten an Großeltern können bei den Eltern absetzbar sein (Vertrag + Überweisung, fremdüblich!); auch Rentenpunkte-Übertragung der Kindererziehungszeiten an betreuende Großeltern ist in Konstellationen möglich — beraten lassen.","Umgangsrecht existiert: Großeltern haben ein gesetzliches Umgangsrecht (§ 1685 BGB), WENN es dem Kindeswohl dient — bei Zerwürfnis oder Trennung der Eltern ist der Rechtsweg aber fast immer der schlechteste: Mediation und Deeskalation zuerst, das Gericht prüft streng und ein Prozess vergiftet meist endgültig.","Distanz-Großeltern können Bindung bauen: feste Video-Rituale (Vorlesen per Bildschirm funktioniert ab 2–3!), Sprachnachrichten-Ketten, Post mit Kleinkram (Kinder lieben Briefe), gemeinsames Online-Spiel mit Teenagern, 1:1-Besuchszeiten statt nur Großfamilien-Events — Qualität und Wiederholung schlagen Geografie.","Schenken mit Verstand: Das Junior-Depot der Enkel ist das nachhaltigste Geschenk (siehe Finanz-Artikel) — Freibeträge (200.000 € je Enkel alle 10 Jahre) machen Großeltern zu den steuerlich idealen Schenkern; bei Ausbildungs-Zuschüssen direkt zahlen statt bar (Zweckbindung), und Gerechtigkeit zwischen Enkel-Stämmen früh mitdenken (Erbfrieden!)."],
 c:["Das jährliche Regel-Gespräch mit den Eltern etablieren (Essen, Medien, Rituale)","Feste Betreuungstage statt Dauerbereitschaft vereinbaren","Bei Distanz: ein wöchentliches Video-Ritual starten","Enkel-Sparplan prüfen — Freibeträge der Großeltern nutzen"],
 prem:"Vertiefung: Das Regel-Gespräch als Leitfaden (die 8 Konfliktthemen vorab klären), Betreuungs-Vereinbarungen mit Steuer- und Rentenaspekten, das Umgangsrecht nüchtern erklärt mit Eskalations-Alternativen und Fernbeziehungs-Rituale je Enkelalter."},
{id:"auswandernrente",k:"alter",a:[50,80],s:["Ruhestand"],t:"Ruhestand im Ausland: Rente, Krankenversicherung, Realität",
 kurz:"Sonne, niedrigere Kosten, Meerblick — der Auslands-Ruhestand boomt. Die Rente reist problemlos mit; die Krankenversicherung, die Steuer und die soziale Realität sind die drei Punkte, an denen Träume scheitern oder gelingen.",
 p:["Die Rente folgt fast überallhin: Deutsche Renten werden in die meisten Länder voll überwiesen (EU sowieso, viele Abkommensstaaten ebenso) — melden muss man den Wegzug dem Rentenservice; jährlich kommt die Lebensbescheinigung. Achtung bei wenigen Konstellationen mit Kürzungen außerhalb von Abkommen — vorher Rentenberatung!","Krankenversicherung ist DIE Schicksalsfrage: In der EU funktioniert die GKV-Absicherung über Formulare (S1) im Wohnsitzland — Leistungsniveau des GASTLANDS!; außerhalb der EU endet die GKV-Leistung weitgehend: private internationale Tarife werden im Alter sehr teuer, Rückkehr-Optionen in die GKV sind eng — die KV-Frage entscheidet VOR der Länderwahl, nicht danach.","Steuern: Deutschland besteuert deutsche Renten meist auch bei Wegzug (beschränkte Steuerpflicht, KEIN Grundfreibetrag — auf Antrag teils unbeschränkte Pflicht), Doppelbesteuerungsabkommen regeln, welches Land zugreift (je nach Land unterschiedlich: mal D, mal Wohnsitzstaat) — eine Beratungsstunde vor dem Umzug spart vierstellig.","Das Probejahr schlägt den Komplettverkauf: 3–6 Monate Probewohnen in der NEBENSAISON (der Februar zeigt die Wahrheit über den Urlaubsort), Wohnung in Deutschland zunächst vermieten statt verkaufen, Rückkehroption offen halten — die Rückwanderer-Quote ist hoch, Hauptgründe: Sprache, Gesundheit, Enkel-Heimweh, Pflegefall.","Pflege im Ausland mitdenken: Deutsches Pflegegeld wird in die EU gezahlt, Sachleistungen nicht; Pflegestrukturen vor Ort prüfen — und den Plan B formulieren: Wer pflegt, wenn es so weit ist, und wo?","Die soziale Rechnung ehrlich machen: Auswanderer-Communities tragen die ersten Jahre, Sprache entscheidet über echte Integration (Behörden! Ärzte!), und die Heimat-Besuchskosten gehören ins Budget — 2–4 Flüge jährlich plus Unterkunft summieren sich auf einen Monatsrente."],
 c:["KV-Lösung fürs Zielland klären, BEVOR Immobilien angeschaut werden","Probewohnen in der Nebensaison: 3 Monate Miete statt Kauf","Steuer-Beratung zu DBA + beschränkter Steuerpflicht buchen","Rentenservice informieren, Konto-/Vollmachts-Setup für Deutschland behalten"],
 prem:"Vertiefung: Die Länder-Kriterienliste (KV, DBA, Lebenskosten, Gesundheitssystem, Residenz-Regeln), der Wegzugs-Fahrplan in 12 Schritten, die KV-Optionen im Detail (S1, Anwartschaft, privat international) und der Rückkehr-Plan als Sicherheitsnetz."},
{id:"demenz",k:"alter",a:[45,100],s:["Pflegefall","Krankheit"],t:"Demenz: erkennen, handeln, begleiten — ohne sich selbst zu verlieren",
 kurz:"Demenz ist die Diagnose, vor der sich Familien am meisten fürchten — und die am längsten verdrängt wird. Frühes Handeln ändert den Verlauf wenig, aber die Lebensqualität aller Beteiligten dramatisch: rechtlich, finanziell, menschlich.",
 p:["Vergesslichkeit vs. Warnzeichen: Namen vergessen und wiederfinden ist Alter; Warnzeichen sind: gleiche Fragen im Minutentakt, Vertrautes nicht mehr bedienen können (Kaffeemaschine, Überweisungen), zeitlich/örtlich die Orientierung verlieren, Wesensveränderung, Verlegen + Beschuldigen („Ihr habt mein Geld gestohlen“) — bei Häufung: Abklärung in der Gedächtnisambulanz/-sprechstunde (Hausarzt überweist), denn ein Teil der „Demenzen“ ist behandelbar (Schilddrüse, B12, Depression, Medikamente!).","Die Diagnose-Scheu überwinden lohnt: Früh diagnostiziert kann die betroffene Person selbst entscheiden — Vollmacht, Patientenverfügung, Finanzen ordnen, Wünsche für später festhalten, Antidementiva und Studien prüfen, den eigenen Abschied vom Autofahren gestalten statt erleiden.","Rechtlich tickt die Uhr: Vollmachten müssen bei GESCHÄFTSFÄHIGKEIT errichtet werden — nach fortgeschrittener Diagnose ist es zu spät, dann bleibt nur das Betreuungsgericht; deshalb gehört das Vollmachten-Paket (siehe eigener Artikel) in die ersten Wochen nach Verdacht, nicht ans Ende.","Kommunikation, die funktioniert: Nicht korrigieren und diskutieren (die Demenz gewinnt jede Logik-Debatte), sondern Gefühl spiegeln und umlenken (Validation); kurze Sätze, eine Information, Blickkontakt; Routinen und vertraute Musik sind stabiler als Fakten — Musik erreicht Menschen noch in späten Stadien.","Versorgung baut sich in Stufen: Pflegegrad früh beantragen (kognitive Einschränkungen zählen voll!), Tagespflege ist der unterschätzte Gamechanger (Struktur für Betroffene, Luft für Angehörige), Demenz-WGs und Spezialbereiche prüfen; Verhinderungs-/Kurzzeitpflege nutzen BEVOR die Erschöpfung kommt.","Angehörige sind die zweiten Patienten: Pflegende Partner von Demenzkranken haben massiv erhöhte Krankheitsrisiken — Angehörigengruppen (Alzheimer-Gesellschaften, kostenlos), Pflegekurse speziell Demenz, und die Erlaubnis, Hilfe anzunehmen, sind keine Kür; die härteste Lektion der Begleitung: Man darf trauern, während der Mensch noch lebt."],
 c:["Bei Warnzeichen-Häufung: Gedächtnissprechstunde statt Abwarten","Vollmachten-Paket SOFORT nach Verdacht angehen (Geschäftsfähigkeit!)","Pflegegrad beantragen — kognitive Einschränkung zählt","Angehörigengruppe der örtlichen Alzheimer-Gesellschaft kontaktieren"],
 prem:"Vertiefung: Die Warnzeichen-Liste mit Abklärungs-Fahrplan, der Rechts- und Finanz-Ordner nach Diagnose (Reihenfolge der ersten 90 Tage), Validation-Kommunikation mit Beispieldialogen und der Angehörigen-Schutzplan gegen den eigenen Zusammenbruch."},
{id:"konflikt",k:"beruf",a:[18,67],s:["Jobwechsel","Krankheit"],t:"Konflikte & Mobbing am Arbeitsplatz: wehren mit System",
 kurz:"Zwischen normalem Reibungsverlust und Mobbing liegt eine Grenze, die man kennen muss — denn die Gegenmittel sind völlig verschieden. Für beides gilt: Dokumentation schlägt Empörung, und wer früh systematisch handelt, behält Job und Gesundheit.",
 p:["Konflikt oder Mobbing? Konflikt ist Sache gegen Sache (lösbar durch Klärung); Mobbing ist Person gegen Person: systematisch, wiederholt, über Wochen/Monate, mit Schädigungsabsicht — Ausgrenzen, Informationen vorenthalten, Bloßstellen, sinnlose Aufgaben, Gerüchte. Die Unterscheidung entscheidet die Strategie.","Beim normalen Konflikt: früh und direkt klären (das 4-Schritte-Gespräch: Beobachtung – Wirkung – Bedürfnis – Bitte), Eskalation nur entlang der Linie (Beteiligte → Führungskraft → HR), E-Mail-Kriege vermeiden (Konflikte wachsen schriftlich), und bei festgefahrenen Fronten interne Mediation vorschlagen.","Beim Mobbing: ab Tag 1 Mobbing-Tagebuch (Datum, Uhrzeit, Vorfall, Beteiligte, Zeugen, eigene Reaktion, Folgen) — es ist DAS Beweismittel für alle späteren Schritte; Verbündete sichern (Zeugen, Betriebsrat), Vorfälle sachlich beim Arbeitgeber melden (der hat FÜRSORGEPFLICHT und muss handeln — schriftlich einfordern!).","Die Eskalations-Werkzeuge: Betriebsrat (Beschwerde nach §§ 84/85 BetrVG), Beschwerde nach AGG bei Diskriminierungsbezug (Frist 2 Monate für Ansprüche!), Gefährdungsanzeige bei Gesundheitsfolgen, externe Beratung (Mobbing-Telefone, Gewerkschaft, Fachanwalt) — und parallel die Gesundheit ernst nehmen: Schlafstörungen und Dauergrübeln sind Behandlungsgründe, nicht Schwäche.","Wenn die Führungskraft das Problem ist (Bossing — häufigster Fall): Einzelgespräch dokumentieren, dann nächsthöhere Ebene/HR mit Tagebuch-Substanz, Versetzungsantrag als legitime Option — und nüchtern prüfen: Manche Systeme ändern sich nicht; der geordnete Wechsel aus stabiler Position ist dann Sieg, nicht Niederlage.","Selbstschutz-Basics während des Sturms: Leistung dokumentieren (Erfolge, Mails, Zwischenstände — gegen die „Schlechtleistungs“-Erzählung), nichts Unbedachtes unterschreiben, Krankschreibung ist legitim, aber lange Abwesenheit allein löst nichts — sie braucht einen parallelen Plan (BEM, Klärung, Wechsel)."],
 c:["Einordnen: Konflikt (klären) oder Mobbing (dokumentieren)?","Mobbing-Tagebuch ab dem ersten Verdachtsmoment führen","Fürsorgepflicht schriftlich einfordern, Betriebsrat einbinden","Gesundheit parallel sichern: Hausarzt, ggf. psychologische Unterstützung"],
 prem:"Vertiefung: Das Mobbing-Tagebuch als Vorlage mit Beweis-Logik, das 4-Schritte-Konfliktgespräch mit Beispielsätzen, die Eskalationsleiter mit Rechtsgrundlagen und Fristen, und die Exit-Strategie aus Stärke (Zeugnis, Verhandlung, Referenzen sichern)."},
{id:"teilzeit",k:"beruf",a:[20,67],s:["Kind bekommen","Jobwechsel","Pflegefall"],t:"Teilzeit, Brückenteilzeit & flexible Modelle: Anspruch und Strategie",
 kurz:"Arbeitszeit ist verhandelbarer als die meisten glauben — vieles ist sogar einklagbarer Anspruch. Wer die Rechtslage kennt und die Reduktion klug gestaltet, vermeidet die zwei großen Fallen: Teilzeit-Falle (gleiche Arbeit, weniger Geld) und Karriere-Abstellgleis.",
 p:["Die Anspruchs-Landschaft: Allgemeiner Teilzeitanspruch (TzBfG: Betrieb >15 MA, 6 Monate dabei, 3 Monate Vorlauf — Ablehnung nur aus betrieblichen Gründen), BRÜCKENTEILZEIT (Betrieb >45 MA: befristete Reduktion 1–5 Jahre mit RÜCKKEHRGARANTIE auf Vollzeit — die Lösung gegen die Teilzeitfalle!), Elternzeit-Teilzeit (15–32 h/Woche, eigener Anspruch), Pflegezeit/Familienpflegezeit (Reduktion bis 24 Monate bei Angehörigen-Pflege).","Die Teilzeit-Falle hat einen Mechanismus: Aufgaben schrumpfen selten mit den Stunden — Gegenmittel: VOR der Reduktion schriftlich klären, welche Aufgaben/Projekte ABGEGEBEN werden (Liste!), Erreichbarkeits-Grenzen definieren, Meeting-Struktur anpassen (Kernzeiten), und nach 3 Monaten Review-Termin: Stimmen Stunden und Last noch überein?","Geld-Gesamtbild rechnen: Brutto sinkt proportional, Netto weniger stark (Progression!), aber Rente, ALG-Ansprüche und Elterngeld-Basis sinken mit — der Rechner im Gehalts-Artikel hilft; Alternativen mitdenken: 35 statt 30 Stunden, 4-Tage-Woche bei vollem Fokus, Jahresarbeitszeit-Konten, Jobsharing für Führungsrollen.","Karriere in Teilzeit ist möglich, aber nicht passiv: Sichtbarkeit aktiv managen (Ergebnisse kommunizieren, Schlüsselmeetings priorisieren), Beförderungs-Ambition explizit aussprechen (Teilzeit wird sonst als Ambitionsverzicht gelesen — ein Gespräch korrigiert das), Jobsharing-Tandems machen Führung teilbar.","Homeoffice & Flexibilität verhandeln: Kein genereller Rechtsanspruch, aber starke Verhandlungsposition (Fachkräftemangel!) — mit Ergebnis-Argumenten statt Bedürfnis-Argumenten verhandeln, Probephase mit Review anbieten, Vereinbarung schriftlich (Tage, Erreichbarkeit, Ausstattung, Widerrufsregeln).","Aufstocken ist auch ein Recht: Teilzeitkräfte mit Aufstockungswunsch müssen bei der Besetzung freier Stellen bevorzugt berücksichtigt werden (§ 9 TzBfG) — Wunsch schriftlich hinterlegen; und wer unfreiwillig in Teilzeit ist, kann ergänzendes ALG/Wohngeld prüfen."],
 c:["Anspruchs-Check: Welcher Teilzeit-Anspruch passt (Brücke! Elternzeit! Pflege!)?","Antrag 3 Monate vorher schriftlich, Brückenteilzeit-Befristung wählen","Aufgaben-Abgabe-Liste VOR Start verhandeln + 3-Monats-Review","Renten-/Absicherungs-Effekt rechnen, ggf. Ausgleich vereinbaren"],
 prem:"Vertiefung: Die Ansprüche im Detail mit Fristen-Tabelle, der Reduktions-Antrag als Muster mit Aufgaben-Abgabe-Anlage, die Netto- und Renten-Rechnung an Beispielen und Jobsharing/4-Tage-Modelle für Fortgeschrittene."},
{id:"nebenjob",k:"beruf",a:[16,75],s:["Berufseinstieg","Schulden","Ruhestand"],t:"Nebenjob, Minijob & Nebengewerbe: Regeln, Steuern, Grenzen",
 kurz:"Ob Minijob neben dem Studium, Nebengewerbe neben der Festanstellung oder Zuverdienst zur Rente: Nebeneinkommen ist fast immer erlaubt — aber an Spielregeln gebunden, deren Missachtung teuer wird: Arbeitgeber-Anzeige, Steuerfallen, Sozialversicherungs-Überraschungen.",
 p:["Hauptjob-Spielregeln zuerst: Nebentätigkeit ist grundsätzlich erlaubt (Berufsfreiheit!) — Grenzen: keine Konkurrenz zum Arbeitgeber, keine Leistungsbeeinträchtigung (Arbeitszeitgesetz: max. 8–10 h/Tag ÜBER ALLE Jobs, 11 h Ruhezeit!), kein Urlaub für Nebenarbeit zweckentfremden, Anzeige-/Genehmigungsklauseln im Arbeitsvertrag beachten (pauschale Verbote sind unwirksam, Anzeigepflichten gelten).","Minijob-Mechanik: Geringfügigkeitsgrenze (dynamisch an Mindestlohn gekoppelt), pauschal versteuert, EIN Minijob neben Hauptjob bleibt SV-frei — der zweite wird voll SV-pflichtig zusammengerechnet!; Rentenversicherungspflicht im Minijob nicht reflexhaft abwählen (kleiner Eigenbeitrag, voller Rentenpunkte- und Reha-Schutz, Erwerbsminderungs-Anwartschaft!).","Midijob-Zone kennen: Zwischen Minijob-Grenze und ~2.000 € greift der Übergangsbereich mit reduzierten Arbeitnehmer-SV-Beiträgen bei vollen Leistungsansprüchen — oft attraktiver als der Minijob-Deckel.","Nebengewerbe/Freiberuflich nebenbei: Gewerbeanmeldung (20–60 €) bzw. Finanzamt-Fragebogen, Kleinunternehmerregelung prüfen, Gewinnermittlung per EÜR — Steuer-Freigrenze: Nebeneinkünfte bis 410 €/Jahr GEWINN bleiben steuerfrei, darüber Steuererklärungspflicht; Krankenkasse informieren (hauptberuflich-selbstständig-Prüfung bei großem Umfang!), und der Hauptjob-Status (angestellt) schützt die günstige KV nur, solange die Anstellung überwiegt.","Studierende & Rentner: Werkstudenten-Privileg (bis 20 h/Woche in der Vorlesungszeit nur RV-Beitrag — mehr Netto als Minijob ab mittleren Stundenzahlen!), BAföG-Freibeträge beachten; Rentner dürfen seit 2023 zur vorgezogenen Rente UNBEGRENZT hinzuverdienen — aber Steuern auf die Summe und ggf. KV-Beiträge auf Versorgungsbezüge einrechnen.","Schwarzarbeit ist die teuerste Abkürzung: Nachzahlung aller SV-Beiträge (auch Arbeitgeber-Anteil vom Auftraggeber rückforderbar), Steuerstrafverfahren, kein Unfallschutz — die „bar auf die Hand“-Putzhilfe ist über das Haushaltsscheck-Verfahren in 10 Minuten legal (und bringt dem Haushalt sogar Steuerbonus)."],
 c:["Arbeitsvertrag auf Anzeige-/Genehmigungsklausel prüfen, Nebenjob anzeigen","Minijob: RV-Pflicht bewusst behalten statt abwählen","Bei Selbstständigkeit nebenbei: Fragebogen Finanzamt + Krankenkasse informieren","Arbeitszeit-Summe und Ruhezeiten über alle Jobs im Blick behalten"],
 prem:"Vertiefung: Minijob vs. Midijob vs. Werkstudent im Netto-Vergleich, das Nebengewerbe-Starterpaket (Anmeldung, EÜR, Kleinunternehmer-Entscheidung), die Hinzuverdienst-Regeln für Rentner durchgerechnet und Haushaltshilfe legal anmelden in 10 Minuten."},
{id:"sozialleistungen",k:"finanzen",a:[18,100],s:["Jobverlust","Schulden","Kind bekommen","Trennung"],t:"Sozialleistungs-Kompass: Wohngeld, Bürgergeld, Kinderzuschlag & Co.",
 kurz:"Milliarden an Sozialleistungen verfallen jährlich, weil Berechtigte nicht beantragen — aus Unwissen, Scham oder Bürokratie-Angst. Dieser Kompass ordnet das System: Wer bekommt was, was schließt sich aus, und wie man Anträge übersteht.",
 p:["Die Vorrang-Logik verstehen: Erst vorrangige Leistungen (Wohngeld, Kinderzuschlag, ALG I, Unterhalt/UVG, BAföG), DANN Bürgergeld als Grundsicherung — Jobcenter verweisen auf vorrangige Ansprüche; oft ist die Kombination Wohngeld + Kinderzuschlag besser als Bürgergeld (kein volles Vermögens-/Partnereinkommens-Regime!).","Wohngeld wird massiv unterschätzt: Zuschuss zur Miete (oder Lastenzuschuss für Eigentümer!) für Erwerbstätige, Rentner, Studierende ohne BAföG-Anspruch — seit der Reform deutlich mehr Berechtigte; Faustsignal: Warmmiete frisst >35–40 % eines niedrigen Einkommens → Wohngeld-Rechner des Landes füttern, Antrag bei der Kommune, gilt ab Antragsmonat.","Kinderzuschlag (KiZ) für arbeitende Eltern: bis zu ~290 €+/Monat je Kind zusätzlich zum Kindergeld, wenn das Einkommen für die Eltern reicht, aber fürs Kind knapp wird — dazu automatisch Bildung-und-Teilhabe-Paket (Schulbedarf, Mittagessen, Vereinsbeitrag!) und KiTa-Gebührenbefreiung; Antrag online bei der Familienkasse, 6 Monate Bewilligung.","Bürgergeld-Basics ohne Mythen: Regelbedarf + angemessene Wohnkosten + KV; Schonvermögen und Karenzzeit fürs Wohnen federn den Einstieg ab, Erwerbstätigen-Freibeträge lassen Zuverdienst teilweise anrechnungsfrei — und der Antrag wirkt ab Monatsbeginn der Antragstellung: erst Antrag (formlos genügt zur Fristwahrung!), dann Unterlagen nachreichen.","Weitere unterschätzte Bausteine: Unterhaltsvorschuss für Alleinerziehende (zahlt der andere Elternteil nicht — Staat springt ein, bis 18!), Grundsicherung im Alter/bei Erwerbsminderung (Rente unter ~1.000 €? Prüfen! Kinder-Rückgriff erst ab 100.000 € Brutto), Befreiung Rundfunkbeitrag, Sozialtarife (Strom, ÖPNV, Telefon), Stiftungen (Familien in Not, Mutter-Kind).","Antrags-Überlebensregeln: Eingang dokumentieren (Fax/Einwurf mit Zeuge/Online-Bestätigung), Kopien von ALLEM, unvollständig einreichen ist okay (Frist gewahrt!), Bescheide IMMER prüfen — Fehlerquoten sind hoch, Widerspruch binnen 1 Monat kostenlos, Sozialverbände und Sozialberatungen helfen für kleines Geld; Leistungen zu beantragen ist ein Rechtsanspruch, kein Bittgang — man holt sich Versichertes und Erarbeitetes zurück."],
 c:["Wohngeld-Rechner und KiZ-Lotsen der Behörden durchspielen (15 Min)","Bei Engpass: Antrag SOFORT formlos stellen, Unterlagen nachreichen","Jeden Bescheid prüfen (lassen) — Widerspruchsfrist 1 Monat","Bildung-und-Teilhabe für Kinder aktiv abrufen (Verein, Schulbedarf)"],
 prem:"Vertiefung: Die Leistungs-Landkarte mit Zuständigkeiten und typischen Beträgen, drei durchgerechnete Haushalts-Beispiele (Alleinerziehend, Aufstocker-Familie, Rentnerin), die Antrags-Checkliste je Leistung und der Widerspruchs-Baukasten mit Musterformulierungen."},
{id:"kindersparen",k:"finanzen",a:[20,70],s:["Kind bekommen"],t:"Sparen fürs Kind: Junior-Depot, Konto-Eigentum & 18 Jahre Zinseszins",
 kurz:"50 € monatlich ab Geburt werden bis zum 18. Geburtstag zu einem fünfstelligen Startkapital — wenn man drei Dinge richtig macht: das richtige Produkt (ETF statt Sparbuch), das richtige Konto (Eigentumsfrage!) und ein Wort mit den Großeltern.",
 p:["Der Zinseszins-Vorsprung: 50 €/Monat über 18 Jahre bei ~6 % ergeben rund 19.000 € (eingezahlt: 10.800 €) — dasselbe Sparbuch schafft kaum die Einzahlung plus Inflationsverlust; der Anlagehorizont eines Neugeborenen ist der längste, den es gibt: Aktien-Welt-ETF ist hier die rationale Wahl (Schwankungen sind bei 18 Jahren Horizont Feature, nicht Bug).","Die Eigentumsfrage ist die wichtigste Designentscheidung: Depot AUF DEN NAMEN DES KINDES = Geld gehört rechtlich dem Kind (mit 18 volle Verfügung — auch für den Sportwagen!), eigene Steuer-Freibeträge des Kindes (Sparerpauschbetrag + Grundfreibetrag via NV-Bescheinigung = praktisch steuerfreies Wachstum), ABER: relevant für BAföG (Vermögensfreibetrag!) und Familienversicherungs-Grenzen. Depot auf ELTERN-Namen = volle Kontrolle behalten, eigene Freibeträge belastet, Schenkung später gestaltbar — beide Wege sind legitim: bewusst wählen.","Produkt-Setup in 30 Minuten: Junior-Depot bei kostenlosem Broker, ein thesaurierender Welt-ETF, Sparplan ab 25 €, Freistellungsauftrag/NV-Bescheinigung einrichten — fertig; Finger weg von Ausbildungsversicherungen und „Kinder-Policen“ (Kostenfresser mit Mini-Rendite — der Klassiker am Wochenbett-Vertriebstisch).","Großeltern einbinden statt Spielzeugberge: Der Geburtstags-Dauerauftrag ins Junior-Depot ist das Geschenk, das mit 18 noch existiert; bei größeren Summen schenken Großeltern steuerlich ideal (200.000 € Freibetrag je Enkel alle 10 Jahre) — Absprache verhindert auch das Konto-Wirrwarr aus fünf Sparbüchern bei drei Banken.","Geldbildung mitwachsen lassen: Ab Grundschule Taschengeld (siehe Erziehungs-Tool), ab ~12 das Depot gemeinsam anschauen (Schwankungen erklären: „Ausverkauf = Sparplan kauft billig“), ab 16 Budget-Verantwortung (Klamotten-Budget aufs Jugendkonto) — das Depot wird zum Lehrmittel, nicht nur zum Sparstrumpf.","Die 18-Geburtstag-Frage entschärfen: Wer das Sportwagen-Risiko fürchtet, wählt das Eltern-Depot ODER bespricht früh und ehrlich Zweck und Werte (Studien zeigen: eingebundene Kinder verprassen selten) — Kontrollklauseln über 18 hinaus gibt es beim Kinder-Depot nicht; Vertrauen ist Teil des Konzepts."],
 c:["Eigentumsfrage entscheiden: Kind-Depot (Steuer!) vs. Eltern-Depot (Kontrolle)","Junior-Depot + Welt-ETF-Sparplan einrichten, NV-Bescheinigung stellen","Großeltern-Gespräch: Dauerauftrag statt Geschenkeberg","Ab 12: Depot gemeinsam anschauen — Finanzbildung inklusive"],
 prem:"Vertiefung: Kind- vs. Eltern-Depot in der Entscheidungstabelle (Steuer, BAföG, KV, Kontrolle), das 30-Minuten-Setup Schritt für Schritt, die NV-Bescheinigung erklärt und Schenkungs-Strategien der Großeltern — plus Kinder-Sparplan-Rechner bis zum 18. Geburtstag."}
];
const PREM_DETAIL = {

  excelgrundlagen: { h:`
<h5>Das mentale Modell</h5>
<p>Excel ist im Kern nur ein Rechenblatt aus Zellen, angeordnet in Spalten (Buchstaben) und Zeilen (Zahlen). Jede Zelle hat dadurch eine eindeutige Adresse wie C12. Diese Adresse ist der ganze Trick: Statt mit Zahlen zu rechnen, rechnet man mit Orten, an denen Zahlen stehen. Verändert sich der Inhalt eines Ortes, rechnet alles, was darauf verweist, automatisch neu.</p>
<h5>Die erste Formel</h5>
<p>Jede Formel beginnt mit einem Gleichheitszeichen — das ist das Signal an Excel: Rechne, statt einfach anzuzeigen. Schreibt man in eine Zelle eine Anweisung, zwei andere Zellen zu addieren, erscheint sofort das Ergebnis und passt sich an, sobald sich eine der beiden Zellen ändert. Genau das macht eine Tabelle lebendig.</p>
<h5>Relativ gegen absolut</h5>
<table class="ptable"><tr><th>Bezug</th><th>Beim Kopieren nach unten</th></tr>
<tr><td>A1 (relativ)</td><td>wandert mit: wird A2, A3, ...</td></tr>
<tr><td>$A$1 (absolut)</td><td>bleibt fest auf A1</td></tr>
<tr><td>A$1 / $A1 (gemischt)</td><td>nur ein Teil bleibt fest</td></tr></table>
<p>Dies ist der häufigste Stolperstein für Einsteiger. Kopiert man eine Formel, verschieben sich die Bezüge automatisch — meist gewollt. Soll ein Bezug stehen bleiben (etwa ein fester Steuersatz), fixiert man ihn mit Dollarzeichen.</p>
<h5>Sauber starten</h5>
<p>Wer von Anfang an mit Bezügen statt mit eingetippten Zahlen arbeitet, baut Tabellen, die sich selbst aktualisieren und Fehler vermeiden. Kurz: Adressen verstehen, mit Gleichheitszeichen rechnen, Bezüge bewusst fixieren — der Rest ist Übung.</p>
` },
  excelfunktionen: { h:`
<h5>Die Arbeitspferde</h5>
<p>Vier Funktionen erledigen den Löwenanteil: SUMME addiert einen Bereich, MITTELWERT bildet den Durchschnitt, MIN und MAX finden den kleinsten und größten Wert. Statt Zellen einzeln zu verrechnen, markiert man einen Bereich und bekommt das Ergebnis sofort.</p>
<h5>Bedingtes Rechnen</h5>
<p>Spannend wird es mit Bedingungen. ZÄHLENWENN zählt nur die Einträge, die ein Kriterium erfüllen; SUMMEWENN summiert nur diese. Die WENN-Funktion verzweigt: Trifft eine Bedingung zu, gibt sie das eine zurück, sonst das andere — die Grundlage jeder kleinen Automatik in der Tabelle.</p>
<h5>Nachschlagen mit XVERWEIS</h5>
<table class="ptable"><tr><th>Funktion</th><th>Zweck</th></tr>
<tr><td>SUMME / MITTELWERT</td><td>Bereiche zusammenfassen</td></tr>
<tr><td>WENN</td><td>Entscheidungen treffen</td></tr>
<tr><td>ZÄHLENWENN / SUMMEWENN</td><td>bedingt zählen oder summieren</td></tr>
<tr><td>XVERWEIS / SVERWEIS</td><td>Werte in Tabellen nachschlagen</td></tr></table>
<p>Der XVERWEIS findet zu einem Suchwert den passenden Eintrag in einer anderen Spalte — etwa zur Artikelnummer den Preis. Er ist flexibler und weniger fehleranfällig als der ältere SVERWEIS, den man aber in vielen Tabellen noch antrifft.</p>
<h5>Einfach halten</h5>
<p>Funktionen lassen sich ineinander verschachteln, doch lange Formelketten werden schnell unlesbar. Wer eine Aufgabe in nachvollziehbare Schritte zerlegt — eine Hilfsspalte hier, eine Zwischenrechnung da — spart sich später die Fehlersuche. Kurz: wenige Funktionen sicher beherrschen schlägt viele halb.</p>
` },
  pivottabellen: { h:`
<h5>Auswerten heißt Ziehen, nicht Tippen</h5>
<p>Eine Pivot-Tabelle ist Excels Antwort auf die Frage: Was sagen diese tausend Zeilen eigentlich aus? Man wählt die Daten aus, und statt Formeln zu schreiben, zieht man Felder in Bereiche — und Excel gruppiert, zählt und summiert von selbst. In Sekunden entsteht aus einer Rohliste eine Auswertung.</p>
<h5>Die vier Bereiche</h5>
<table class="ptable"><tr><th>Bereich</th><th>Funktion</th></tr>
<tr><td>Zeilen</td><td>wonach gruppiert wird (z. B. Region)</td></tr>
<tr><td>Spalten</td><td>zweite Gruppierung (z. B. Monat)</td></tr>
<tr><td>Werte</td><td>was berechnet wird (Summe, Anzahl)</td></tr>
<tr><td>Filter</td><td>was vorab eingegrenzt wird</td></tr></table>
<p>Das Schöne: Man kann die Felder beliebig umstellen und sieht die Auswertung sofort aus einem anderen Blickwinkel — ohne irgendetwas neu zu rechnen.</p>
<h5>Saubere Daten als Bedingung</h5>
<p>Pivot-Tabellen verlangen ordentliche Rohdaten: eine einzige Überschriftenzeile, keine Leerzeilen, keine zusammengefassten Zellen, ein Datensatz je Zeile. Wer hier diszipliniert ist, erspart sich die meisten Fehlermeldungen.</p>
<h5>Die Rohdaten bleiben heilig</h5>
<p>Eine Pivot-Tabelle verändert die Ursprungsdaten nie — sie ist nur eine Sicht. Deshalb kann man gefahrlos experimentieren. Kurz: saubere Liste, Felder ziehen, Blickwinkel wechseln — fertig ist die Auswertung, für die andere Formeln bauen.</p>
` },
  exceldiagramme: { h:`
<h5>Der Typ folgt der Aussage</h5>
<p>Bevor man klickt, sollte die Frage feststehen, die das Diagramm beantworten soll. Daraus ergibt sich der Typ fast von selbst: Geht es um einen Vergleich, einen Verlauf oder einen Anteil? Der häufigste Fehler ist, mit dem Diagrammtyp zu beginnen und die Aussage hinterher zu suchen.</p>
<h5>Welcher Typ wofür</h5>
<table class="ptable"><tr><th>Typ</th><th>Gut für</th></tr>
<tr><td>Balken / Säulen</td><td>Größen vergleichen</td></tr>
<tr><td>Linie</td><td>Entwicklung über die Zeit</td></tr>
<tr><td>Kreis</td><td>wenige Anteile an einem Ganzen</td></tr>
<tr><td>Punkt (Streu)</td><td>Zusammenhang zweier Größen</td></tr></table>
<p>Kreisdiagramme verleiten dazu, zu viele Segmente hineinzupacken — ab etwa fünf Teilen wird ein Balkendiagramm lesbarer.</p>
<h5>Weglassen ist Gestalten</h5>
<p>Ein klares Diagramm verzichtet auf alles, was nicht trägt: keine 3D-Effekte, keine schweren Gitterlinien, keine grellen Farbverläufe. Übrig bleiben ein aussagekräftiger Titel, beschriftete Achsen und die Daten selbst.</p>
<h5>Ehrliche Achsen</h5>
<p>Eine Werteachse, die nicht bei null beginnt, lässt kleine Unterschiede riesig wirken — manchmal Absicht, oft Versehen. Wer fair darstellen will, beginnt bei null oder weist die Stauchung deutlich aus. Kurz: erst die Frage, dann der Typ, dann das Weglassen.</p>
` },
  wordvorlagen: { h:`
<h5>Was eine Formatvorlage ist</h5>
<p>Eine Formatvorlage ist ein gespeichertes Aussehen unter einem Namen. „Überschrift 1“ enthält etwa Schriftart, Größe, Farbe und Abstände. Statt eine Überschrift von Hand fett und groß zu machen, weist man ihr die Vorlage zu. Word weiß dann: Das ist eine Überschrift — nicht nur dicker Text, sondern ein Strukturelement.</p>
<h5>Eine Änderung, überall wirksam</h5>
<p>Der eigentliche Gewinn zeigt sich beim Ändern. Passt man die Vorlage „Überschrift 1“ einmal an, ändern sich alle Überschriften im Dokument gleichzeitig. Bei manueller Formatierung müsste man jede einzeln anfassen — bei langen Texten eine Sisyphusarbeit.</p>
<h5>Struktur ermöglicht Automatik</h5>
<table class="ptable"><tr><th>Vorlage</th><th>Wofür</th></tr>
<tr><td>Überschrift 1–3</td><td>Gliederung, Inhaltsverzeichnis, Navigation</td></tr>
<tr><td>Standard</td><td>Fließtext</td></tr>
<tr><td>Zitat / Beschriftung</td><td>besondere Absätze</td></tr></table>
<p>Erst weil Überschriften als solche ausgezeichnet sind, kann Word ein Inhaltsverzeichnis erzeugen und den Navigationsbereich füllen. Manuelles Großschreiben sieht gleich aus, liefert dem Programm aber keine Struktur.</p>
<h5>Der Umstieg lohnt</h5>
<p>Die erste Umstellung kostet Gewöhnung, doch danach arbeitet jedes Dokument schneller und sieht konsistenter aus. Kurz: nicht Aussehen anklicken, sondern Bedeutung zuweisen — den Rest erledigt Word.</p>
` },
  worddokumente: { h:`
<h5>Das Verzeichnis baut sich selbst</h5>
<p>Sobald Überschriften per Formatvorlage ausgezeichnet sind, erzeugt Word ein Inhaltsverzeichnis auf Knopfdruck — mit Seitenzahlen, die sich beim Aktualisieren von selbst korrigieren. Was bei manueller Pflege ständig veraltet, bleibt hier immer stimmig.</p>
<h5>Abschnitte teilen das Dokument</h5>
<p>Ein Abschnittswechsel ist eine unsichtbare Grenze, hinter der andere Regeln gelten können: ein Querformat für eine breite Tabelle, eine eigene Kopfzeile pro Kapitel, ein Neustart der Seitennummerierung. Ohne Abschnitte gilt eine Einstellung immer für das ganze Dokument.</p>
<h5>Felder statt Handarbeit</h5>
<table class="ptable"><tr><th>Funktion</th><th>Nutzen</th></tr>
<tr><td>Inhaltsverzeichnis</td><td>aktualisiert sich automatisch</td></tr>
<tr><td>Seitenzahlen / Verweise</td><td>wachsen mit, bleiben korrekt</td></tr>
<tr><td>Serienbrief</td><td>viele personalisierte Schreiben auf einmal</td></tr>
<tr><td>PDF-Export</td><td>festes Layout für jeden Empfänger</td></tr></table>
<h5>Sauber ausgeben</h5>
<p>Zum Schluss zählt das Format: Als PDF exportiert, sieht das Dokument bei allen gleich aus — unabhängig von Schriftarten oder Word-Version des Empfängers. Kurz: Struktur per Vorlagen, Aufteilung per Abschnitten, Routine per Feldern, Ausgabe per PDF.</p>
` },
  praesentationen: { h:`
<h5>Eine Folie ist kein Dokument</h5>
<p>Der häufigste Fehler ist, die Folie als Textblatt zu missbrauchen. Eine Folie unterstützt den Vortrag, sie ersetzt ihn nicht. Das heißt: Stichworte statt ganzer Sätze, ein Gedanke pro Folie. Wer alles aufschreibt, zwingt das Publikum zum Lesen — und hört auf zuzuhören.</p>
<h5>Der Folienmaster</h5>
<p>Im Folienmaster legt man Schriften, Farben, Logo und Positionen ein einziges Mal fest. Alle Folien erben dieses Design automatisch. Das spart nicht nur Zeit, es sorgt auch für den ruhigen, einheitlichen Eindruck, der professionelle Präsentationen ausmacht.</p>
<h5>Zeigen statt beschreiben</h5>
<table class="ptable"><tr><th>Statt</th><th>Besser</th></tr>
<tr><td>Textwüste</td><td>ein großes Bild, eine Aussage</td></tr>
<tr><td>Tabelle voller Zahlen</td><td>ein einfaches Diagramm</td></tr>
<tr><td>fünf Aufzählungen</td><td>fünf Folien mit je einem Punkt</td></tr></table>
<p>Bilder und reduzierte Diagramme transportieren eine Botschaft schneller als jede Aufzählung — das Auge versteht ein Bild, bevor es einen Satz gelesen hat.</p>
<h5>Dramaturgie und Maß</h5>
<p>Eine Präsentation braucht einen Bogen: ein Einstieg, der neugierig macht, ein roter Faden, ein Schluss mit der einen Botschaft. Animationen führen den Blick, wenn man sie sparsam nutzt — zu viele wirken unruhig. Kurz: weniger Text, klares Design, eine Aussage, die bleibt.</p>
` },
  mailorganisation: { h:`
<h5>Der Posteingang als Durchgang</h5>
<p>Der Posteingang ist kein Lager, sondern eine Durchgangsstation. Das Ziel ist nicht, keine Mails zu bekommen, sondern jede genau einmal zu bearbeiten und dann aus dem Eingang zu entfernen. Ein leerer Eingang ist dabei weniger ein Ordnungszwang als eine Befreiung des Kopfes.</p>
<h5>Vier Wege für jede Mail</h5>
<table class="ptable"><tr><th>Entscheidung</th><th>Wann</th></tr>
<tr><td>Löschen</td><td>irrelevant, erledigt</td></tr>
<tr><td>Sofort erledigen</td><td>dauert unter zwei Minuten</td></tr>
<tr><td>Delegieren</td><td>jemand anderes ist zuständig</td></tr>
<tr><td>Ablegen / terminieren</td><td>braucht mehr Zeit, als Aufgabe</td></tr></table>
<p>Diese Vier-Wege-Regel verhindert das ewige Wieder-Lesen derselben Mails. Jede Nachricht wird einmal angefasst und bekommt sofort ihr Ziel.</p>
<h5>Filter fangen vorab ab</h5>
<p>Regeln sortieren Newsletter, automatische Benachrichtigungen und Mails, in denen man nur in Kopie steht, gleich in eigene Ordner — sie landen gar nicht erst zwischen den wichtigen Nachrichten. Das reduziert die gefühlte Flut enorm.</p>
<h5>Zeiten statt Dauerblick</h5>
<p>Der größte Hebel ist nicht technisch: Wer feste Zeiten für E-Mail einrichtet und Benachrichtigungen abschaltet, wird seltener unterbrochen und arbeitet konzentrierter. Kurz: einmal anfassen, vorsortieren lassen, in Blöcken bearbeiten.</p>
` },
  tastenkuerzel: { h:`
<h5>Warum Kürzel mehr sind als Tempo</h5>
<p>Jeder Wechsel zwischen Tastatur und Maus kostet nicht nur Sekunden, sondern reißt den Gedanken aus dem Fluss. Tastenkürzel halten die Hände am Ort und den Kopf bei der Sache. Der Zeitgewinn ist real, der Konzentrationsgewinn oft noch größer.</p>
<h5>Die Grundausstattung</h5>
<table class="ptable"><tr><th>Kürzel</th><th>Wirkung</th></tr>
<tr><td>Strg + C / V / X</td><td>Kopieren, Einfügen, Ausschneiden</td></tr>
<tr><td>Strg + Z / Y</td><td>Rückgängig, Wiederholen</td></tr>
<tr><td>Strg + F / S</td><td>Suchen, Speichern</td></tr>
<tr><td>Alt + Tab</td><td>zwischen Fenstern wechseln</td></tr></table>
<p>Diese wenigen Kombinationen funktionieren in fast jedem Programm gleich und sind die lohnendste erste Investition. (Auf dem Mac tritt die Befehlstaste an die Stelle von Strg.)</p>
<h5>Office im Griff</h5>
<p>In Tabellen und Dokumenten kommen mächtige Helfer dazu: schnelles Speichern, Formatieren mit einem Griff, das Springen ans Ende einer Datenspalte oder das Markieren ganzer Bereiche per Tastatur. Gerade in großen Tabellen spart das spürbar Klickwege.</p>
<h5>In kleinen Dosen lernen</h5>
<p>Niemand merkt sich zwanzig Kürzel auf einmal. Wer sich drei pro Woche vornimmt und sie bewusst statt der Maus nutzt, hat nach wenigen Wochen ein Repertoire, das automatisch sitzt. Kurz: erst die universellen fünf, dann die Office-Helfer, immer in kleinen Schritten.</p>
` },
  dateiorganisation: { h:`
<h5>Flach schlägt tief</h5>
<p>Tief verschachtelte Ordner fühlen sich ordentlich an, führen aber zum Verlieren: Ab der vierten oder fünften Ebene weiß niemand mehr, wo etwas liegt. Wenige, klare Hauptordner mit aussagekräftigen Namen sind leichter zu überblicken und schneller zu durchsuchen.</p>
<h5>Namen, die für sich sprechen</h5>
<table class="ptable"><tr><th>Prinzip</th><th>Beispiel</th></tr>
<tr><td>Datum voran (JJJJ-MM-TT)</td><td>2026-03-14 Angebot Mueller</td></tr>
<tr><td>Inhalt statt Kürzel</td><td>Bewerbung Lebenslauf, nicht bw_lf</td></tr>
<tr><td>keine Sonderzeichen</td><td>Bindestrich statt Schrägstrich</td></tr></table>
<p>Ein vorangestelltes Datum im Jahr-Monat-Tag-Format sortiert Dateien automatisch in der richtigen Reihenfolge — ganz ohne manuelles Umräumen.</p>
<h5>Versionen ohne Chaos</h5>
<p>Statt zehn Dateien mit immer neuen „final“-Varianten gehört die Version in den Namen (etwa v1, v2) oder, besser, in den Versionsverlauf der Cloud, der jede Fassung automatisch aufbewahrt. So bleibt nachvollziehbar, was die aktuelle ist.</p>
<h5>Sichern, nicht nur synchronisieren</h5>
<p>Cloud-Dienste gleichen Geräte ab und schützen vor dem Verlust eines einzelnen Geräts — aber ein gelöschtes oder verschlüsseltes Original ist überall gelöscht. Deshalb gehört zu jedem System ein echtes Backup. Kurz: flach ablegen, klar benennen, Versionen führen, zusätzlich sichern. Das beste System ist das, das man durchhält.</p>
` },

  passwoerter: { h:`
<h5>Das wahre Problem: Wiederverwendung</h5>
<p>Die meisten Konto-Übernahmen gelingen nicht, weil ein Passwort zu kurz war, sondern weil dasselbe Passwort an vielen Stellen genutzt wurde. Taucht es in einem Datenleck auf, probieren Angreifer es automatisiert bei hunderten anderen Diensten — und kommen überall hinein, wo es wiederholt wurde.</p>
<h5>Der Passwortmanager</h5>
<p>Ein Passwortmanager löst das in einem Schritt: Er erzeugt für jeden Dienst ein langes, zufälliges Passwort, speichert es verschlüsselt und füllt es automatisch aus. Man selbst merkt sich nur noch ein einziges, starkes Hauptpasswort. Damit wird das schwächste Glied — das menschliche Gedächtnis — entlastet.</p>
<h5>Der zweite Faktor</h5>
<table class="ptable"><tr><th>Zweiter Faktor</th><th>Schutz</th></tr>
<tr><td>SMS-Code</td><td>besser als nichts, aber abfangbar</td></tr>
<tr><td>App-Code (TOTP)</td><td>gut, geräteseitig erzeugt</td></tr>
<tr><td>Hardware-Schlüssel / Passkey</td><td>sehr stark, phishing-resistent</td></tr></table>
<p>Die Zwei-Faktor-Authentifizierung verlangt zusätzlich zum Passwort einen zweiten Nachweis. Selbst wer das Passwort kennt, scheitert ohne diesen zweiten Faktor.</p>
<h5>Passkeys und das E-Mail-Konto</h5>
<p>Passkeys ersetzen das Passwort ganz: Man bestätigt per Fingerabdruck oder Gesicht, ein Geheimnis wird nie übertragen, Phishing läuft ins Leere. Bis sich das überall durchsetzt, gilt: Das E-Mail-Konto zuerst absichern, denn über seine Zurücksetzen-Funktion hängen fast alle anderen Konten daran. Keine Sicherheitsgarantie, aber ein sehr großer Schritt.</p>
` },
  kialltag: { h:`
<h5>Was ein Sprachmodell tut — und was nicht</h5>
<p>KI-Assistenten erzeugen Text, indem sie aus riesigen Datenmengen die wahrscheinlichste Fortsetzung berechnen. Das Ergebnis klingt souverän, beruht aber nicht auf Verstehen oder Nachschlagen. Deshalb können solche Systeme flüssig und überzeugend etwas Falsches behaupten — der bekannte Effekt des Halluzinierens.</p>
<h5>Stärken und Grenzen</h5>
<table class="ptable"><tr><th>Gut geeignet</th><th>Mit Vorsicht</th></tr>
<tr><td>Entwürfe, Umformulieren</td><td>aktuelle Fakten, Zahlen</td></tr>
<tr><td>Zusammenfassen, Strukturieren</td><td>Quellenangaben</td></tr>
<tr><td>Ideen, Erklärungen</td><td>Rechts-, Medizin-, Finanzrat</td></tr></table>
<p>Faustregel: Für alles, was man selbst beurteilen kann, ist KI ein starker Beschleuniger. Für alles, was Konsequenzen hat und man nicht prüfen kann, bleibt sie höchstens Vorbereitung.</p>
<h5>Daten und Datenschutz</h5>
<p>Eingaben können je nach Anbieter gespeichert, ausgewertet und zum Training genutzt werden. Persönliche, vertrauliche oder fremde Daten gehören deshalb nicht ungefiltert in einen Chatbot. Manche Dienste bieten Einstellungen, die das Training mit den eigenen Eingaben abschalten.</p>
<h5>Bessere Ergebnisse durch bessere Fragen</h5>
<p>Wer Kontext liefert (worum geht es), das Ziel nennt (was soll herauskommen) und das Format vorgibt (Liste, Tabelle, Länge), bekommt deutlich bessere Antworten als bei einer vagen Frage. Und am Ende gilt immer: gegenprüfen, was zählt. Keine fachliche Beratung.</p>
` },
  sozialemedien: { h:`
<h5>Die Aufmerksamkeits-Maschine</h5>
<p>Soziale Netzwerke verdienen an deiner Verweildauer. Ihre Algorithmen zeigen bevorzugt, was lange bindet: das Emotionale, Empörende, Perfekte. Das ist kein Zufall, sondern Design — und es verzerrt, wie man Welt, andere und das eigene Leben wahrnimmt. Wer das weiß, nimmt den Inhalten etwas von ihrer Macht.</p>
<h5>Privatsphäre, die zählt</h5>
<table class="ptable"><tr><th>Einstellung</th><th>Wirkung</th></tr>
<tr><td>Profil privat</td><td>nur bestätigte Kontakte sehen Inhalte</td></tr>
<tr><td>Standort aus</td><td>keine Ortsverräter in Fotos/Posts</td></tr>
<tr><td>Werbe-Tracking begrenzen</td><td>weniger Profilbildung</td></tr></table>
<p>Die Voreinstellungen sind meist auf maximale Sichtbarkeit gestellt — also auf das Interesse der Plattform, nicht das eigene. Ein paar Minuten in den Einstellungen ändern das.</p>
<h5>Das Internet vergisst nicht</h5>
<p>Was einmal online ist, kann kopiert, gespeichert und weiterverbreitet werden — auch nach dem Löschen. Vor jedem Post hilft die Frage, ob man den Inhalt in einigen Jahren oder im Bewerbungsgespräch noch vertreten würde.</p>
<h5>Vom Konsum zur Kontrolle</h5>
<p>Bewusste Nutzung ist Architektur, nicht Willenskraft: Benachrichtigungen ausschalten, feste Zeiten setzen, Konten entfolgen, die schlecht tun, und Berufliches von Privatem trennen. So wird aus dem Zeitfresser ein Werkzeug.</p>
` },
  fakenews: { h:`
<h5>Emotion ist das Einfallstor</h5>
<p>Desinformation funktioniert über Gefühle. Eine Schlagzeile, die wütend, ängstlich oder empört macht, wird geteilt, bevor der Verstand einsetzt — genau darauf ist sie gebaut. Die wirksamste Schutzgewohnheit ist deshalb banal: bei starker emotionaler Reaktion zuerst innehalten, dann prüfen.</p>
<h5>Die Quellenfrage</h5>
<table class="ptable"><tr><th>Warnsignal</th><th>Prüfung</th></tr>
<tr><td>nur eine Quelle</td><td>berichten unabhängige Medien dasselbe?</td></tr>
<tr><td>kein Datum / Autor</td><td>wer steht dahinter, mit welchem Interesse?</td></tr>
<tr><td>spektakuläres Bild</td><td>Bilder-Rückwärtssuche</td></tr></table>
<p>Seriöse Information lässt sich an mehreren Stellen unabhängig wiederfinden. Eine Behauptung, die nur in einem Kanal kursiert, ist ein Warnzeichen.</p>
<h5>Wenn Bilder lügen</h5>
<p>Fotos werden aus dem Zusammenhang gerissen, alte Aufnahmen als aktuell ausgegeben, und Deepfakes erzeugen täuschend echte Stimmen und Gesichter. Eine Rückwärtssuche enttarnt viele alte Bilder; bei Videos hilft der Blick auf unnatürliche Details und die Frage, woher die Aufnahme stammt.</p>
<h5>Erst prüfen, dann teilen</h5>
<p>Wer eine Falschmeldung weiterleitet, wird ungewollt Teil ihrer Verbreitung. Ein kurzer Blick auf eine Faktencheck-Seite klärt viele kursierende Behauptungen — und im Zweifel gilt: lieber nicht teilen. Keine Gewähr für Einzelfälle.</p>
` },
  digitalerfussabdruck: { h:`
<h5>Was alles Spuren hinterlässt</h5>
<p>Der digitale Fußabdruck hat zwei Hälften: den aktiven Teil, den man selbst teilt — Profile, Fotos, Kommentare — und den passiven, den Dienste im Hintergrund sammeln: besuchte Seiten, Standorte, Käufe. Beides zusammen ergibt ein erstaunlich vollständiges Bild, das oft länger sichtbar bleibt als beabsichtigt.</p>
<h5>Bestandsaufnahme</h5>
<p>Der erste Schritt ist, sich selbst zu googeln — am besten auch in der Bildersuche und im abgemeldeten Browser. So sieht man, was öffentlich auffindbar ist, und stößt fast immer auf vergessene Konten und alte Einträge.</p>
<h5>Auskunft und Löschung</h5>
<table class="ptable"><tr><th>Recht</th><th>Wirkung</th></tr>
<tr><td>Auskunft (DSGVO)</td><td>Dienst muss zeigen, welche Daten er hat</td></tr>
<tr><td>Löschung</td><td>Daten müssen unter Bedingungen gelöscht werden</td></tr>
<tr><td>Auslistung</td><td>Suchmaschine entfernt Treffer aus der Trefferliste</td></tr></table>
<p>Die Datenschutz-Grundverordnung gibt jedem diese Werkzeuge — kostenlos und formlos. Eine kurze E-Mail an den Anbieter genügt, um Auskunft oder Löschung zu verlangen.</p>
<h5>Aufräumen mit System</h5>
<p>Alte, ungenutzte Konten sind doppelt riskant: Sie enthalten Daten und können bei einem Leck als Einfallstor dienen. Wer sie löscht, verkleinert die Angriffsfläche. Beim Auslisten in Suchmaschinen wägt der Betreiber ab, ob das Interesse an Vergessenwerden überwiegt. Keine Rechtsberatung.</p>
` },
  clouddaten: { h:`
<h5>Der häufigste Verlust ist banal</h5>
<p>Nicht der spektakuläre Hackerangriff vernichtet die meisten Daten, sondern das heruntergefallene Handy, die kaputte Festplatte, der verlorene Laptop. Gegen all das hilft nur eines: eine zweite, aktuelle Kopie, die anderswo liegt.</p>
<h5>Die 3-2-1-Regel</h5>
<table class="ptable"><tr><th>Ziffer</th><th>Bedeutung</th></tr>
<tr><td>3</td><td>drei Kopien der Daten</td></tr>
<tr><td>2</td><td>auf zwei verschiedenen Medien</td></tr>
<tr><td>1</td><td>eine davon an einem anderen Ort</td></tr></table>
<p>Praktisch heißt das oft: das Original auf dem Gerät, ein automatisches Backup auf einer externen Festplatte und eine Kopie in der Cloud. Fällt eines aus, bleiben zwei.</p>
<h5>Die Cloud ist kein Backup</h5>
<p>Cloud-Speicher ist bequem und erfüllt den Auswärts-Teil der Regel — aber er allein genügt nicht. Wird ein Konto gesperrt, gehackt oder der Dienst eingestellt, sind synchronisierte Daten ebenso weg. Wer Sensibles speichert, sollte es zusätzlich verschlüsseln.</p>
<h5>Ein ungetestetes Backup zählt nicht</h5>
<p>Viele merken erst im Ernstfall, dass das Backup unvollständig oder unlesbar war. Deshalb gehört zum Sichern das Zurückspielen: Einmal ausprobieren, ob sich die Daten wirklich wiederherstellen lassen. Keine Gewähr für einzelne Produkte.</p>
` },
  onlinedating: { h:`
<h5>Vom Profil zur echten Person</h5>
<p>Ein Profil ist eine Auswahl: schöne Fotos, geschliffene Sätze, manchmal frei erfunden. Bevor man Zeit und Gefühl investiert, schafft ein kurzes Video-Telefonat Klarheit — es entlarvt Fälschungen und gibt ein ehrlicheres Bild als jeder Chat.</p>
<h5>Das erste Treffen</h5>
<table class="ptable"><tr><th>Regel</th><th>Warum</th></tr>
<tr><td>öffentlicher Ort</td><td>Sicherheit, leichter Rückzug</td></tr>
<tr><td>Vertrauensperson informiert</td><td>jemand weiß, wo du bist</td></tr>
<tr><td>eigene An- und Abreise</td><td>Unabhängigkeit</td></tr></table>
<p>Diese drei Punkte kosten nichts und nehmen jeder Begegnung das Risiko, ohne ihr die Leichtigkeit zu nehmen.</p>
<h5>Romance-Scam erkennen</h5>
<p>Die häufigste Betrugsmasche läuft immer gleich: Über Wochen wird intensiv Nähe aufgebaut, oft mit großen Gefühlen und Zukunftsplänen. Ein persönliches Treffen scheitert stets an Ausreden. Dann kommt — aus einer Notlage heraus — die Bitte um Geld. Die eiserne Regel: an reine Online-Bekanntschaften niemals Geld, Gutscheine oder Zugangsdaten.</p>
<h5>Daten dosieren</h5>
<p>Nachname, Arbeitsplatz, Wohnadresse und Finanzielles gehören nicht in die erste Phase. Vertrauen wächst mit der Zeit und mit echten Begegnungen — wer drängt, hat selten gute Absichten. Keine Gewähr im Einzelfall.</p>
` },
  smarthome: { h:`
<h5>Jedes Gerät ist ein Computer</h5>
<p>Eine smarte Lampe, ein Türsensor, eine Kamera, ein Lautsprecher mit Sprachassistent — sie alle sind kleine, vernetzte Computer mit Sensoren. Das macht sie praktisch, aber auch angreifbar: Jedes Gerät ist ein möglicher Zugang ins Heimnetz und sammelt Daten über den Alltag.</p>
<h5>Die zwei wichtigsten Handgriffe</h5>
<table class="ptable"><tr><th>Maßnahme</th><th>Warum</th></tr>
<tr><td>Standardpasswort ändern</td><td>werkseitige Passwörter sind öffentlich bekannt</td></tr>
<tr><td>Updates aktiv halten</td><td>veraltete Software ist das Hauptrisiko</td></tr></table>
<p>Diese beiden Schritte verhindern die große Mehrheit der realen Angriffe — alles Weitere ist Feinschliff.</p>
<h5>Was mithört und mitsieht</h5>
<p>Sprachassistenten und Kameras zeichnen auf und senden Daten an Server. In den Einstellungen lässt sich meist begrenzen, was gespeichert, ausgewertet und wie lange aufbewahrt wird. Wer das prüft, behält die Kontrolle über die intimsten Räume des Alltags.</p>
<h5>Trennen und hinterfragen</h5>
<p>Ein eigenes Gäste- oder Geräte-WLAN hält smarte Geräte vom Netz mit Computer und Handy fern — wird ein Gerät gekapert, bleibt der Schaden begrenzt. Und die einfachste Sicherheitsfrage steht vor dem Kauf: Muss dieses Gerät wirklich vernetzt sein? Keine Gewähr für einzelne Produkte.</p>
` },
  kinderdigital: { h:`
<h5>Begleiten schlägt verbieten</h5>
<p>Kinder wachsen selbstverständlich mit Bildschirmen auf. Pauschale Verbote verschieben das Thema nur — bei Freunden, später, heimlich. Wirksamer ist Begleitung: gemeinsam nutzen, erklären, im Gespräch bleiben. So lernen Kinder einen Umgang, der auch dann trägt, wenn die Eltern nicht danebensitzen.</p>
<h5>Freigaben als Orientierung</h5>
<table class="ptable"><tr><th>Alter</th><th>Schwerpunkt</th></tr>
<tr><td>klein</td><td>Schutzfunktionen, enge Auswahl, Gemeinsamkeit</td></tr>
<tr><td>Grundschule</td><td>Regeln, erste Eigenständigkeit, Gespräch</td></tr>
<tr><td>Jugend</td><td>Vertrauen, Risiken besprechen, weniger Sperren</td></tr></table>
<p>Alters- und Inhaltsfreigaben geben einen Rahmen, ersetzen aber nicht den Blick darauf, was das Kind konkret tut und erlebt.</p>
<h5>Nicht die Minuten, die Inhalte</h5>
<p>Ob Bildschirmzeit schadet, hängt weniger an der Uhr als am Inhalt und am Kontext. Gemeinsam etwas anzusehen oder kreativ zu nutzen ist etwas anderes als stundenlanges, einsames Scrollen. Wichtig ist, dass das Digitale Bewegung, Schlaf und echte Begegnungen nicht verdrängt.</p>
<h5>Sicherer Hafen sein</h5>
<p>Kinder müssen wissen: Wenn online etwas Unangenehmes passiert — Mobbing, verstörende Inhalte, Kontaktversuche — können sie ohne Angst vor Strafe zu den Eltern kommen. Und das stärkste Signal bleibt das eigene Verhalten: Wie Erwachsene selbst zum Handy greifen, prägt mehr als jede Regel.</p>
` },
  wlansicherheit: { h:`
<h5>Der Router ist die Haustür</h5>
<p>Das gesamte digitale Zuhause hängt am Router. Wird er übernommen, liegt der ganze Datenverkehr offen. Deshalb beginnt Sicherheit hier: mit einem eigenen, starken WLAN-Passwort, aktueller Geräte-Software und — besonders wichtig — einem geänderten Admin-Passwort für die Router-Oberfläche.</p>
<h5>Das vergessene Admin-Passwort</h5>
<table class="ptable"><tr><th>Stellschraube</th><th>Empfehlung</th></tr>
<tr><td>Admin-Login</td><td>Standardpasswort sofort ändern</td></tr>
<tr><td>WLAN-Verschlüsselung</td><td>WPA3, mindestens WPA2</td></tr>
<tr><td>Firmware</td><td>Updates automatisch installieren</td></tr></table>
<p>Viele lassen das werkseitige Admin-Passwort jahrelang unverändert — eine bekannte Schwachstelle, die Angreifer gezielt ausnutzen.</p>
<h5>Fremde Netze sind offene Räume</h5>
<p>In öffentlichem WLAN — Café, Bahn, Hotel — teilt man sich das Netz mit Unbekannten, und der Verkehr kann mitgelesen werden. Sensible Anmeldungen meidet man dort oder schützt sie. Eine verschlüsselte Verbindung erkennt man am Schloss-Symbol; ein VPN verschlüsselt zusätzlich den gesamten Datenverkehr.</p>
<h5>Gäste sauber trennen</h5>
<p>Ein Gäste-WLAN gibt Besuchern und smarten Geräten einen eigenen, abgeschotteten Zugang — getrennt vom Netz mit Computer, Handy und persönlichen Dateien. So bleibt ein gekapertes Gerät ohne Zugriff aufs Wesentliche. Keine Sicherheitsgarantie, aber eine solide Grundlage.</p>
` },

  lohnabrechnung: { h:`
<h5>Vom Brutto zum Netto</h5>
<p>Jede Abrechnung erzählt dieselbe Geschichte von oben nach unten: Das Bruttogehalt steht am Anfang, dann werden Steuern und Sozialabgaben abgezogen, und unten bleibt der Auszahlungsbetrag — das Netto. Dazwischen verbergen sich zwei Blöcke: die Steuern (Lohnsteuer, Solidaritätszuschlag, ggf. Kirchensteuer) und die vier Zweige der Sozialversicherung.</p>
<h5>Die Abkürzungen</h5>
<table class="ptable"><tr><th>Kürzel</th><th>Bedeutung</th></tr>
<tr><td>LSt</td><td>Lohnsteuer</td></tr>
<tr><td>SolZ</td><td>Solidaritätszuschlag</td></tr>
<tr><td>KV / PV</td><td>Kranken- / Pflegeversicherung</td></tr>
<tr><td>RV / AV</td><td>Renten- / Arbeitslosenversicherung</td></tr></table>
<p>Die Sozialabgaben tragen Arbeitgeber und Arbeitnehmer in der Regel etwa zur Hälfte. Auf der Abrechnung steht meist nur der Arbeitnehmer-Anteil, der vom Brutto abgezogen wird.</p>
<h5>Was die Steuerklasse macht</h5>
<p>Die Steuerklasse legt fest, wie viel Lohnsteuer monatlich einbehalten wird — sie ist eine Voraus-Schätzung, kein endgültiger Steuersatz. Wer zu viel zahlt, bekommt es über die Steuererklärung zurück; wer zu wenig zahlt, muss nachzahlen. Bei Paaren verändert die Kombination der Klassen nur die monatliche Verteilung, nicht die Jahressteuer.</p>
<h5>Worauf sich der Blick lohnt</h5>
<p>Einmal jährlich lohnt der Abgleich: Stimmt die Steuerklasse, sind Kinderfreibeträge eingetragen, passen die Beitragssätze? Und die Abrechnungen gehören aufgehoben — sie sind Nachweis für Kreditanträge, Elterngeld und die spätere Rente. Keine Steuerberatung.</p>
` },
  arbeitszeugnis: { h:`
<h5>Wohlwollend, aber wahr</h5>
<p>Das deutsche Zeugnisrecht steckt in einem Dilemma: Ein Zeugnis muss wohlwollend sein, darf die berufliche Zukunft nicht unnötig erschweren — und muss trotzdem der Wahrheit entsprechen. Aus diesem Spagat ist über Jahrzehnte eine codierte Sprache entstanden, in der freundliche Sätze klare Noten transportieren.</p>
<h5>Die Notenskala der Zufriedenheit</h5>
<table class="ptable"><tr><th>Formulierung</th><th>Note</th></tr>
<tr><td>stets zu unserer vollsten Zufriedenheit</td><td>sehr gut</td></tr>
<tr><td>stets zu unserer vollen Zufriedenheit</td><td>gut</td></tr>
<tr><td>zu unserer vollen Zufriedenheit</td><td>befriedigend</td></tr>
<tr><td>zu unserer Zufriedenheit</td><td>ausreichend</td></tr></table>
<p>Die Logik: Je mehr Steigerungsworte (stets, vollste) fehlen, desto schlechter die Note. „Im Großen und Ganzen zu unserer Zufriedenheit“ ist bereits eine glatte Fünf.</p>
<h5>Was Auslassungen verraten</h5>
<p>Mindestens so wichtig ist, was fehlt. Ein vollständiges Zeugnis nennt Aufgaben, Leistung, Verhalten und endet mit einer Schlussformel, die das Ausscheiden bedauert, dankt und alles Gute wünscht. Fehlt diese Schlussformel oder wird das Verhalten gegenüber Vorgesetzten auffällig vor den Kollegen genannt, ist das eine versteckte Abwertung.</p>
<h5>Korrektur verlangen</h5>
<p>Wer eine zu schlechte oder fehlerhafte Bewertung erkennt, kann eine Berichtigung verlangen. Bei der Durchschnittsnote „befriedigend“ trägt der Arbeitgeber die Beweislast für eine schlechtere, der Arbeitnehmer für eine bessere Note. Wichtig ist, zeitnah zu handeln. Keine Rechtsberatung.</p>
` },
  werbungskosten: { h:`
<h5>Der Pauschbetrag als Startlinie</h5>
<p>Das Finanzamt zieht jedem Arbeitnehmer ohne jeden Nachweis 1.230 Euro als Werbungskosten ab — die sogenannte Arbeitnehmer-Pauschale. Wirklich Geld bringen Werbungskosten deshalb erst, wenn die tatsächlichen beruflichen Ausgaben über dieser Schwelle liegen. Dann zählt jeder Euro darüber und mindert das zu versteuernde Einkommen.</p>
<h5>Die wichtigsten Posten</h5>
<table class="ptable"><tr><th>Posten</th><th>Größenordnung</th></tr>
<tr><td>Entfernungspauschale</td><td>0,30 €/km, ab 21. km 0,38 €</td></tr>
<tr><td>Homeoffice-Pauschale</td><td>6 €/Tag, gedeckelt</td></tr>
<tr><td>Arbeitsmittel</td><td>Laptop, Möbel, Fachliteratur</td></tr>
<tr><td>Fortbildung, Bewerbung</td><td>Kurse, Fahrten, Porto</td></tr></table>
<p>Die Entfernungspauschale gilt nur für die einfache Strecke und zählt jeden Arbeitstag — bei einem längeren Arbeitsweg ist der Pauschbetrag oft allein dadurch überschritten.</p>
<h5>Was viele übersehen</h5>
<p>Auch eine doppelte Haushaltsführung, Beiträge zu Gewerkschaften oder Berufsverbänden, ein beruflich veranlasster Umzug und Kontoführungspauschalen zählen. Wer im Homeoffice arbeitet, rechnet die Tagespauschale, ohne ein separates Arbeitszimmer nachweisen zu müssen.</p>
<h5>Belege schlagen Schätzungen</h5>
<p>Es lohnt sich, übers Jahr eine einfache Sammlung anzulegen — ein Ordner oder ein Foto-Album auf dem Handy genügt. Wer am Jahresende die Posten addiert und sieht, dass sie über 1.230 Euro liegen, gibt sie einzeln an und holt sich die Differenz als Steuerersparnis zurück. Keine Steuerberatung.</p>
` },
  steuerbescheid: { h:`
<h5>Der Bescheid ist eine Behauptung</h5>
<p>Der Steuerbescheid teilt mit, wie das Finanzamt die Erklärung bewertet hat — und das stimmt nicht immer mit den eigenen Angaben überein. Der erste Schritt ist deshalb ein Abgleich: Die Festsetzung wird neben die eigene Erklärung gelegt, und im Erläuterungsteil erklärt das Amt, wo es abgewichen ist und warum.</p>
<h5>Wo es typischerweise hakt</h5>
<table class="ptable"><tr><th>Häufiger Fehler</th><th>Prüfen</th></tr>
<tr><td>Werbungskosten gekürzt</td><td>Erläuterung, Nachweis nachreichen</td></tr>
<tr><td>Beleg übersehen</td><td>Zahl in der Festsetzung</td></tr>
<tr><td>Zahlendreher</td><td>Eingaben gegen Bescheid</td></tr></table>
<p>Diese Punkte stehen fast immer im Erläuterungstext am Ende des Bescheids — er ist der wichtigste Abschnitt, obwohl ihn kaum jemand liest.</p>
<h5>Der Einspruch</h5>
<p>Stimmt etwas nicht, kann man innerhalb eines Monats nach Zugang schriftlich Einspruch einlegen — formlos, kostenfrei und gern mit kurzer Begründung. Achtung: Während des Einspruchs prüft das Finanzamt den gesamten Bescheid neu und kann ihn auch zum Nachteil ändern; eine fokussierte Begründung hält das Risiko klein.</p>
<h5>Abwarten statt klagen</h5>
<p>Geht es um eine Rechtsfrage, die bereits vor einem höheren Gericht liegt, muss man nicht selbst klagen: Ein Antrag auf Ruhen des Verfahrens hält den eigenen Fall offen, bis das Musterurteil da ist. Keine Steuerberatung.</p>
` },
  rentenpunkte: { h:`
<h5>Ein Punkt pro Durchschnittsjahr</h5>
<p>Die gesetzliche Rente rechnet nicht in Euro, sondern in Entgeltpunkten. Wer in einem Jahr genau das Durchschnittseinkommen aller Versicherten verdient, bekommt einen Entgeltpunkt. Wer das Doppelte verdient, bekommt zwei; wer die Hälfte verdient, einen halben. Über das Arbeitsleben summieren sich diese Punkte.</p>
<h5>Was ein Punkt wert ist</h5>
<p>Beim Renteneintritt wird jeder gesammelte Punkt mit dem aktuellen Rentenwert in Euro multipliziert. Die monatliche Rente ist also, vereinfacht, die Summe aller Entgeltpunkte mal dem Rentenwert. Dieser Wert wird jährlich angepasst, weshalb die Renteninformation auch eine inflationsbereinigte Variante zeigt.</p>
<h5>Die drei Zahlen der Renteninformation</h5>
<table class="ptable"><tr><th>Zahl</th><th>Bedeutung</th></tr>
<tr><td>Bisher erreicht</td><td>Rente aus den schon gesammelten Punkten</td></tr>
<tr><td>Hochrechnung</td><td>Rente, wenn es so weiterläuft</td></tr>
<tr><td>Kaufkraft</td><td>Wert in heutigem Geld</td></tr></table>
<h5>Lücken und Abschläge</h5>
<p>Teilzeit, Studium und Auszeiten bringen weniger oder keine Punkte; Kindererziehung und Pflege werden dagegen gutgeschrieben. Wer vor der Regelaltersgrenze in Rente geht, zahlt pro vorgezogenem Monat einen dauerhaften Abschlag — wer länger arbeitet, sammelt Zuschläge. Keine Rentenberatung.</p>
` },
  kleinunternehmer: { h:`
<h5>Weniger Bürokratie, ein Preis</h5>
<p>Die Kleinunternehmerregelung befreit kleine Selbstständige davon, Umsatzsteuer auf ihren Rechnungen auszuweisen und ans Finanzamt abzuführen. Das spart die regelmäßige Umsatzsteuer-Voranmeldung und macht die Buchhaltung deutlich einfacher — ideal für Nebenberufler und den Start.</p>
<h5>Die Grenzen und der Haken</h5>
<table class="ptable"><tr><th>Aspekt</th><th>Folge</th></tr>
<tr><td>Umsatzgrenzen</td><td>Vorjahr und laufendes Jahr müssen darunter liegen</td></tr>
<tr><td>Keine Umsatzsteuer</td><td>einfache Rechnungen, keine Voranmeldung</td></tr>
<tr><td>Kein Vorsteuerabzug</td><td>Umsatzsteuer auf Einkäufe bleibt Kostenpunkt</td></tr></table>
<p>Der Haken steckt in der letzten Zeile: Wer viel investiert — Technik, Material, Ausstattung — kann sich die darin enthaltene Umsatzsteuer nicht zurückholen. Bei hohen Anfangskosten kann der Verzicht auf die Regelung deshalb günstiger sein.</p>
<h5>Für wen sie passt</h5>
<p>Wer vor allem Privatkunden bedient, profitiert: Die Preise wirken ohne Umsatzsteuer günstiger, und der Aufwand sinkt. Bei Geschäftskunden, die die Umsatzsteuer ohnehin abziehen, ist der Effekt neutral — hier zählt eher die ersparte Bürokratie.</p>
<h5>Die Einkommensteuer bleibt</h5>
<p>Wichtig zu trennen: Die Kleinunternehmerregelung betrifft nur die Umsatzsteuer. Die Gewinne müssen weiterhin in der Einkommensteuererklärung angegeben und versteuert werden. Keine Steuerberatung.</p>
` },
  paarfinanzen: { h:`
<h5>Geld ist Beziehungsarbeit</h5>
<p>Studien nennen Geld regelmäßig als einen der häufigsten Streitpunkte in Partnerschaften — selten wegen zu wenig davon, meist wegen ungeklärter Erwartungen. Wer früh über Modelle, Aufteilung und Eigentum spricht, nimmt dem Thema die Sprengkraft.</p>
<h5>Drei Modelle</h5>
<table class="ptable"><tr><th>Modell</th><th>Idee</th></tr>
<tr><td>Getrennt</td><td>jeder zahlt eigene Posten, klärt Gemeinsames manuell</td></tr>
<tr><td>Gemeinsam</td><td>ein Konto für alles, volle Transparenz</td></tr>
<tr><td>Drei Konten</td><td>zwei eigene plus ein gemeinsames für Fixkosten</td></tr></table>
<p>Das Drei-Konten-Modell ist der beliebte Kompromiss: Gemeinsame Ausgaben laufen transparent über ein Haushaltskonto, während jeder einen eigenen Bereich für Persönliches behält.</p>
<h5>Fair statt gleich</h5>
<p>Bei sehr unterschiedlichen Einkommen empfinden viele eine hälftige Teilung als ungerecht. Eine Aufteilung im Verhältnis der Einkommen — wer mehr verdient, trägt einen größeren Anteil der gemeinsamen Kosten — sorgt dafür, dass beiden am Monatsende ein ähnlicher Spielraum bleibt.</p>
<h5>An den Ernstfall denken</h5>
<p>Wem gehören Auto, Möbel, Ersparnisse? Und was passiert bei einer Trennung? Besonders gemeinsame Kredite sind heikel, denn die Mithaftung läuft weiter, bis der Vertrag getilgt oder geändert ist. Große gemeinsame Posten schriftlich festzuhalten ist kein Misstrauen, sondern Fürsorge. Keine Rechtsberatung.</p>
` },
  krankschreibung: { h:`
<h5>Zuerst melden, dann krankschreiben</h5>
<p>Zwei Dinge werden oft verwechselt: die Krankmeldung und die Arbeitsunfähigkeitsbescheinigung. Die Meldung — ein kurzer Anruf oder eine Nachricht — muss unverzüglich erfolgen, idealerweise vor Arbeitsbeginn. Die ärztliche Bescheinigung kommt unabhängig davon und ist heute meist elektronisch unterwegs.</p>
<h5>Der zeitliche Ablauf</h5>
<table class="ptable"><tr><th>Phase</th><th>Wer zahlt</th></tr>
<tr><td>Tag 1</td><td>Arbeitgeber informieren</td></tr>
<tr><td>Bis 6 Wochen</td><td>Arbeitgeber (volle Entgeltfortzahlung)</td></tr>
<tr><td>Ab 7. Woche</td><td>Krankenkasse (Krankengeld)</td></tr></table>
<p>Die Sechs-Wochen-Frist gilt je Erkrankung. Bei einer neuen, anderen Erkrankung beginnt sie von vorn; bei derselben Erkrankung innerhalb bestimmter Zeiträume wird zusammengerechnet.</p>
<h5>Ab wann eine Bescheinigung?</h5>
<p>Gesetzlich ist eine AU spätestens ab dem vierten Krankheitstag fällig, der Arbeitsvertrag kann sie aber schon ab dem ersten Tag verlangen. Ein Blick in den eigenen Vertrag erspart Ärger — im Zweifel lieber früher zum Arzt.</p>
<h5>Wenn es länger dauert</h5>
<p>Das Krankengeld liegt deutlich unter dem Nettogehalt und ist gedeckelt. Wer absehbar länger ausfällt, klärt früh mit der Krankenkasse die Höhe und die Bezugsdauer — und prüft, ob eine Krankentagegeldversicherung die Lücke schließt. Keine Rechts- oder Gesundheitsberatung.</p>
` },
  mieterhoehung: { h:`
<h5>Drei Wege zu mehr Miete</h5>
<p>Vermieter können die Miete nicht beliebig anheben. Es gibt im Wesentlichen drei zulässige Wege: die Erhöhung bis zur ortsüblichen Vergleichsmiete, die Umlage von Modernisierungskosten und — bei entsprechender Vereinbarung — Staffel- oder Indexmieten. Jeder Weg hat eigene Regeln und Grenzen.</p>
<h5>Vergleichsmiete und Kappungsgrenze</h5>
<table class="ptable"><tr><th>Schranke</th><th>Regel</th></tr>
<tr><td>Begründung</td><td>Mietspiegel oder Vergleichswohnungen</td></tr>
<tr><td>Kappungsgrenze</td><td>max. 20 % in 3 Jahren</td></tr>
<tr><td>Angespannter Markt</td><td>max. 15 % in 3 Jahren</td></tr></table>
<p>Die Erhöhung darf die ortsübliche Vergleichsmiete nicht überschreiten und ist zusätzlich durch die Kappungsgrenze gebremst — beide Schranken gelten gleichzeitig.</p>
<h5>Form schlägt Inhalt</h5>
<p>Eine Mieterhöhung muss in Textform kommen, korrekt begründet sein und eine Zustimmungsfrist einräumen. Fehlt die Begründung oder ist sie unschlüssig, ist die Erhöhung unwirksam — unabhängig davon, ob die Höhe an sich zulässig wäre.</p>
<h5>Ruhig prüfen, dann reagieren</h5>
<p>Einer berechtigten und formgerechten Erhöhung muss man zustimmen, hat dafür aber Bedenkzeit. Wer unsicher ist, lässt das Schreiben vom Mieterverein prüfen, statt vorschnell zu unterschreiben oder pauschal abzulehnen. Keine Rechtsberatung.</p>
` },
  erbeausschlagen: { h:`
<h5>Erben heißt auch Schulden erben</h5>
<p>Ein Erbe ist ein Gesamtpaket: Mit dem Vermögen gehen auch die Verbindlichkeiten des Verstorbenen über. Reicht der Nachlass nicht, um die Schulden zu decken, kann im schlimmsten Fall das eigene Vermögen des Erben herangezogen werden. Deshalb sollte am Anfang immer eine grobe Bilanz stehen: Was ist da, was fehlt?</p>
<h5>Die Ausschlagung</h5>
<p>Wer ein überschuldetes oder unklares Erbe nicht will, kann es ausschlagen. Dann wird man so behandelt, als hätte man nie geerbt — das Erbe geht an die nächste Person in der gesetzlichen Reihenfolge. Wichtig: Ausschlagen kann man nur das ganze Erbe, nicht einzelne Teile.</p>
<h5>Die Sechs-Wochen-Falle</h5>
<table class="ptable"><tr><th>Schritt</th><th>Frist / Form</th></tr>
<tr><td>Ausschlagung</td><td>6 Wochen ab Kenntnis</td></tr>
<tr><td>Wo</td><td>Nachlassgericht oder Notar</td></tr>
<tr><td>Wie</td><td>persönlich oder beglaubigt, nie formlos</td></tr></table>
<p>Die Frist ist kurz und beginnt, sobald man von Erbfall und eigener Erbenstellung weiß. Wer sie verstreichen lässt, gilt als Erbe — mitsamt den Schulden.</p>
<h5>Die mildere Alternative</h5>
<p>Ist die Lage unübersichtlich, muss man nicht zwischen Annahme und Ausschlagung wählen: Die Nachlassverwaltung oder die Nachlassinsolvenz trennen das Erbe vom eigenen Vermögen und begrenzen die Haftung auf den Nachlass. So lässt sich in Ruhe klären, was wirklich übrig bleibt. Keine Rechtsberatung.</p>
` },

  gebrauchtkauf: { h:`
<h5>Privat verkauft anders als gewerblich</h5>
<p>Wer als Privatperson verkauft, darf die Gewährleistung vollständig ausschließen – ein Satz wie „Verkauf von privat, unter Ausschluss jeglicher Sachmängelhaftung“ genügt. Damit haftet man nicht, wenn das gebrauchte Gerät später den Geist aufgibt. Die einzige Grenze: arglistig verschwiegene Mängel. Wer einen bekannten Defekt bewusst verheimlicht, haftet trotz Ausschluss. Gewerbliche Verkäufer dürfen die Gewährleistung dagegen nicht ausschließen, nur auf ein Jahr verkürzen.</p>
<h5>Die drei häufigsten Maschen</h5>
<table class="ptable"><tr><th>Masche</th><th>Erkennungszeichen</th></tr>
<tr><td>Fake-Bezahldienst</td><td>Link per Chat, „bestätige deine Kontodaten“ auf einer nachgebauten Seite</td></tr>
<tr><td>Spediteur-Trick</td><td>Verkäufer angeblich im Ausland, Ware nur gegen Vorkasse per Versand</td></tr>
<tr><td>Überzahlung</td><td>Es wird „zu viel“ überwiesen, die Differenz soll man zurückzahlen</td></tr></table>
<p>Die Regel dahinter ist simpel: Sobald jemand vom sicheren Weg abweicht – Vorkasse, fremde Links, Druck, ungewöhnliche Zahlwege – steigt das Risiko sprunghaft.</p>
<h5>Sicher zahlen und übergeben</h5>
<p>Am sichersten ist die persönliche Übergabe gegen Bargeld: Ware prüfen, zahlen, fertig. Bei Versand schützt nur die in die Plattform integrierte Käuferschutz-Funktion, nicht der Klick auf einen zugeschickten Link. Treffpunkte legt man an belebte, gut einsehbare Orte; teure Abholungen nicht allein.</p>
<h5>Der Übergabebeleg</h5>
<p>Ein kurzer Zettel mit Datum, Artikelbeschreibung, Preis, „Ware übergeben und Betrag erhalten“ und beiden Unterschriften beendet die meisten späteren Streitigkeiten. Ein Foto vom Zustand bei Übergabe ergänzt den Beleg ideal. So lässt sich auch Wochen später belegen, was verkauft und in welchem Zustand es übergeben wurde. Keine Rechtsberatung.</p>
` },
  gewaehrleistung: { h:`
<h5>Zwei Begriffe, die ständig verwechselt werden</h5>
<p>Gewährleistung und Garantie sind nicht dasselbe. Die Gewährleistung ist ein gesetzliches Recht gegenüber dem Verkäufer und besteht immer, auch ohne dass jemand etwas verspricht. Die Garantie ist ein freiwilliges Zusatzversprechen, meist vom Hersteller, mit selbst gewählten Bedingungen und Laufzeiten. Beide können nebeneinander bestehen – die Garantie ersetzt die Gewährleistung nicht.</p>
<table class="ptable"><tr><th></th><th>Gewährleistung</th><th>Garantie</th></tr>
<tr><td>Grundlage</td><td>gesetzlich, immer</td><td>freiwillig</td></tr>
<tr><td>Gegner</td><td>Verkäufer</td><td>wer sie gibt (oft Hersteller)</td></tr>
<tr><td>Dauer</td><td>2 Jahre</td><td>frei festgelegt</td></tr></table>
<h5>Die entscheidenden zwölf Monate</h5>
<p>Im ersten Jahr nach dem Kauf wird zugunsten des Käufers vermutet, dass ein auftretender Mangel schon bei der Übergabe angelegt war – der Verkäufer müsste das Gegenteil beweisen. Nach Ablauf dieser Frist kehrt sich die Beweislast um: Jetzt muss der Käufer zeigen, dass der Fehler von Anfang an bestand. Deshalb lohnt es sich, Mängel früh zu reklamieren.</p>
<h5>Die richtige Reihenfolge</h5>
<p>Der Käufer kann nicht sofort sein Geld zurückverlangen. Zuerst steht dem Verkäufer die Nacherfüllung zu: Reparatur oder Ersatzlieferung, nach Wahl des Käufers. Erst wenn diese fehlschlägt, zweimal misslingt oder verweigert wird, kommen der Rücktritt vom Kauf oder die Minderung des Preises in Betracht.</p>
<h5>Wie man wirksam reklamiert</h5>
<p>Reklamiert wird beim Verkäufer, schriftlich, mit klarer Beschreibung des Mangels und einer angemessenen Frist – meist zwei Wochen. Der Kaufbeleg ist der Nachweis; ein Kontoauszug genügt notfalls. Wer freundlich, aber bestimmt und mit Frist schreibt, kommt erfahrungsgemäß am schnellsten zum Ziel. Keine Rechtsberatung.</p>
` },
  kreditkarte: { h:`
<h5>Drei Karten, die alle „Kreditkarte“ heißen</h5>
<table class="ptable"><tr><th>Typ</th><th>Abrechnung</th><th>Risiko</th></tr>
<tr><td>Debit</td><td>sofort vom Konto</td><td>gering, wie EC-Karte</td></tr>
<tr><td>Charge</td><td>einmal monatlich komplett</td><td>gering bei gedecktem Konto</td></tr>
<tr><td>Revolving</td><td>Teilzahlung mit Restzins</td><td>hoch, teure Zinsfalle</td></tr></table>
<p>In Deutschland ist die Charge-Karte der Standard. Die Revolving-Variante ist im Marketing oft als „flexible Rückzahlung“ getarnt – tatsächlich ist sie einer der teuersten Alltagskredite überhaupt.</p>
<h5>Die Ausland-Falle DCC</h5>
<p>Im Ausland fragt das Terminal gern, ob man „in Euro“ statt in Landeswährung zahlen will. Diese Dynamic Currency Conversion klingt bequem, rechnet aber zu einem schlechten Kurs mit Aufschlag um. Die Regel lautet deshalb immer: in der Landeswährung abrechnen lassen. Dazu kann je nach Karte ein Auslandseinsatzentgelt kommen – ein Vergleich vor der Reise lohnt sich.</p>
<h5>Warum Bargeld teuer ist</h5>
<p>Eine Bargeldabhebung mit der Kreditkarte wird meist sofort verzinst, ohne den zinsfreien Zeitraum des Einkaufs – plus fester Gebühr. Wer Bargeld braucht, nutzt besser die Giro- oder Debitkarte.</p>
<h5>Der eigentliche Mehrwert</h5>
<p>Gut genutzt ist die Kreditkarte vor allem ein Zahlungsmittel mit weltweiter Akzeptanz, Einkaufsschutz und – bei vollständiger monatlicher Rückzahlung – kostenlosem Zahlungsaufschub. Wer den vollen Betrag stets begleicht und DCC sowie Bargeldabhebung meidet, fährt fast immer kostenfrei. Keine Finanzberatung.</p>
` },
  mahnung: { h:`
<h5>Erst Erinnerung, dann Ernst</h5>
<p>Eine erste „Mahnung“ ist juristisch nur eine Zahlungserinnerung. Sie verändert die Rechtslage kaum, auch wenn der Ton bedrohlich klingt. Wichtig wird es, wenn ein Gericht ins Spiel kommt – beim gerichtlichen Mahnbescheid. Bis dahin ist nichts verloren, aber Ignorieren verteuert die Sache mit jeder Stufe.</p>
<table class="ptable"><tr><th>Stufe</th><th>Reaktion</th></tr>
<tr><td>Zahlungserinnerung / Mahnung</td><td>prüfen, klären, ggf. zahlen oder widersprechen</td></tr>
<tr><td>Inkasso</td><td>Forderung und Gebühren prüfen</td></tr>
<tr><td>Gerichtlicher Mahnbescheid</td><td>binnen 2 Wochen Widerspruch möglich</td></tr>
<tr><td>Vollstreckungsbescheid</td><td>binnen 2 Wochen Einspruch, sonst Zwangsvollstreckung</td></tr></table>
<h5>Inkassokosten sind gedeckelt</h5>
<p>Inkassobüros dürfen nur begrenzte Gebühren verlangen, abhängig von der Höhe der Forderung. Fantasiebeträge oder doppelte Pauschalen muss man nicht hinnehmen – ein höfliches, aber bestimmtes Schreiben mit Bitte um Aufschlüsselung wirkt oft Wunder.</p>
<h5>Berechtigt oder nicht?</h5>
<p>Bei einer berechtigten Forderung ist Reden Gold: Eine schriftliche Ratenzahlungs-Bitte verhindert die Eskalation. Bei einer unberechtigten Forderung widerspricht man schriftlich und verlangt den Nachweis des Vertrags. Auch Verjährung kann greifen – viele Alltagsforderungen verjähren nach drei Jahren zum Jahresende.</p>
<h5>Die Frist, die zählt</h5>
<p>Kommt ein gerichtlicher Mahnbescheid, läuft eine Zwei-Wochen-Frist für den Widerspruch. Wer sie verstreichen lässt, riskiert den Vollstreckungsbescheid. Das Formular liegt bei – ein Kreuz und die Unterschrift genügen, um die Sache vor Gericht klären zu lassen. Keine Rechtsberatung.</p>
` },
  kapitalertraege: { h:`
<h5>Was besteuert wird</h5>
<p>Kapitalerträge – Zinsen, Dividenden, Kursgewinne aus Wertpapieren – werden pauschal mit 25 Prozent Abgeltungsteuer belegt, dazu kommen Solidaritätszuschlag und gegebenenfalls Kirchensteuer. Bei Konten und Depots in Deutschland zieht die Bank diese Steuer automatisch ein und führt sie ab. Man muss sich also um nichts kümmern – verschenkt aber leicht den steuerfreien Teil.</p>
<h5>Der Sparerpauschbetrag</h5>
<table class="ptable"><tr><th>Konstellation</th><th>steuerfrei pro Jahr</th></tr>
<tr><td>Einzelperson</td><td>1.000 €</td></tr>
<tr><td>Ehepaar (zusammen veranlagt)</td><td>2.000 €</td></tr></table>
<p>Bis zu diesem Betrag bleiben Erträge steuerfrei – aber nur, wenn man der Bank einen Freistellungsauftrag erteilt. Ohne ihn behält die Bank ab dem ersten Euro Steuer ein, die man sich dann erst über die Steuererklärung zurückholen müsste.</p>
<h5>Mehrere Banken, ein Höchstbetrag</h5>
<p>Wer Konten bei verschiedenen Instituten hat, kann den Pauschbetrag aufteilen – etwa 600 Euro bei der einen, 400 bei der anderen Bank. Die Summe aller Aufträge darf den Höchstbetrag aber nicht übersteigen, sonst drohen Rückfragen vom Finanzamt.</p>
<h5>Vorabpauschale und Günstigerprüfung</h5>
<p>Bei thesaurierenden ETFs, die Erträge nicht ausschütten, erhebt der Staat die Vorabpauschale: eine kleine jährliche Vorab-Besteuerung, die später beim Verkauf gegengerechnet wird. Wer insgesamt wenig verdient, kann über die Anlage KAP die Günstigerprüfung beantragen und zu viel gezahlte Abgeltungsteuer zurückbekommen. Keine Steuerberatung.</p>
` },
  vertragkuendigen: { h:`
<h5>Der Kündigungsbutton</h5>
<p>Seit 2022 müssen Anbieter für online abgeschlossene Dauerverträge einen leicht auffindbaren Kündigungsbutton bereitstellen – beschriftet mit „Verträge hier kündigen“ oder ähnlich. Nach dem Klick bekommt man eine Bestätigung mit Datum, die als Nachweis dient. Fehlt der Button, kann der Vertrag oft jederzeit gekündigt werden – ein starkes Druckmittel.</p>
<h5>Laufzeit und Verlängerung</h5>
<table class="ptable"><tr><th>Phase</th><th>Regel</th></tr>
<tr><td>Erste Laufzeit</td><td>maximal 24 Monate</td></tr>
<tr><td>Verlängerung</td><td>höchstens um 1 Monat, dann monatlich kündbar</td></tr>
<tr><td>Kündigungsfrist danach</td><td>maximal 1 Monat</td></tr></table>
<p>Die früher üblichen automatischen Verlängerungen um ein ganzes Jahr sind damit Geschichte. Wer die Mindestlaufzeit übersteht, kommt anschließend kurzfristig wieder heraus.</p>
<h5>Das Sonderkündigungsrecht</h5>
<p>Unabhängig von der Frist darf man außerordentlich kündigen, wenn sich Wesentliches ändert: Preiserhöhungen, geänderte Vertragsbedingungen oder – etwa beim Internet- und Mobilfunkvertrag – ein Umzug, an dem die Leistung nicht verfügbar ist. Hier gelten eigene, kurze Fristen ab Kenntnis.</p>
<h5>Eine Kündigung, die sitzt</h5>
<p>Eine knappe Formulierung reicht: „Ich kündige meinen Vertrag mit der Nummer … fristgerecht zum nächstmöglichen Termin und bitte um schriftliche Bestätigung des Beendigungsdatums.“ Wichtig ist nur der Nachweis – Button-Quittung, E-Mail-Eingang oder Einschreiben. Keine Rechtsberatung.</p>
` },
  digitalnachlass: { h:`
<h5>Online-Konten sind vererbbar</h5>
<p>Der Bundesgerichtshof hat klargestellt: Digitale Konten gehen wie das übrige Vermögen auf die Erben über. Anbieter dürfen den Zugang nicht pauschal verweigern. In der Praxis aber stehen Angehörige vor verschlossenen Türen, weil Passwörter fehlen und jede Plattform eigene Hürden aufbaut. Vorsorge ersetzt hier mühsame Nachweise.</p>
<h5>Die einfachste Vorsorge</h5>
<p>Eine aktuelle Liste der wichtigsten Zugänge – E-Mail, Online-Banking, wichtige Abos, Cloud, soziale Netzwerke – ist die wirkungsvollste Maßnahme. Entscheidend ist die E-Mail-Adresse: Über sie laufen die meisten Passwort-Rücksetzungen, sie ist der Generalschlüssel.</p>
<h5>Vollmacht über den Tod hinaus</h5>
<p>Mit einer Vollmacht, die ausdrücklich „über den Tod hinaus“ gilt, kann eine Vertrauensperson sofort handeln, ohne den Erbschein abzuwarten. Diese Vollmacht regelt, wer sich kümmern darf – getrennt von der Frage, wer erbt. Viele Dienste bieten zusätzlich einen Nachlasskontakt oder einen Inaktivitäts-Manager, der nach langer Untätigkeit definierte Schritte auslöst.</p>
<h5>Passwörter sicher, aber auffindbar</h5>
<p>Zugangsdaten gehören nicht ins Testament, denn dieses kann später eingesehen werden. Besser ist ein Passwortmanager, dessen Hauptzugang an einem sicheren Ort hinterlegt ist, den die Vertrauensperson im Ernstfall findet. So bleibt der Schlüssel zu Lebzeiten geschützt und ist im Notfall trotzdem erreichbar. Keine Rechtsberatung.</p>
` },
  radverkehr: { h:`
<h5>Auf dem Rad gilt fast alles wie im Auto</h5>
<table class="ptable"><tr><th>Regel</th><th>Fürs Fahrrad</th></tr>
<tr><td>Promillegrenze</td><td>ab 1,6 ‰ Straftat; auffällig schon früher</td></tr>
<tr><td>Handy am Ohr</td><td>verboten, Bußgeld</td></tr>
<tr><td>Rote Ampel</td><td>Bußgeld, bei Gefährdung mit Punkten</td></tr>
<tr><td>Beleuchtung</td><td>Pflicht bei Dämmerung und Dunkelheit</td></tr></table>
<p>Wer alkoholisiert oder bei Rot fährt, riskiert reale Konsequenzen – im Extremfall sogar die Fahrerlaubnis fürs Auto. Das Fahrrad ist verkehrsrechtlich kein rechtsfreier Raum.</p>
<h5>Diebstahl vorbeugen</h5>
<p>Das beste Schloss nützt wenig, wenn das Rad nur an sich selbst abgeschlossen ist. Es gehört an einen festen, nicht überwindbaren Gegenstand. Als Faustregel investiert man rund zehn Prozent des Radwerts in ein gutes Bügel- oder Faltschloss. Die Rahmennummer und ein Foto erleichtern später die Fahndung und den Versicherungsfall.</p>
<h5>Richtig versichern</h5>
<p>Viele Hausratversicherungen decken Fahrraddiebstahl über eine Zusatzklausel ab – oft mit einer Entschädigungsgrenze und einer Nachtzeitklausel, die nachts nur zahlt, wenn das Rad in einem abgeschlossenen Raum stand. Für teure oder E-Bikes lohnt häufig eine eigene Fahrradversicherung, die Diebstahl rund um die Uhr und teils auch Reparaturen einschließt.</p>
<h5>Im Schadensfall</h5>
<p>Nach einem Diebstahl gilt: zügig Anzeige bei der Polizei erstatten, Rahmennummer und Kaufbeleg bereithalten und den Schaden fristgerecht der Versicherung melden. Ohne diese Nachweise wird es schwierig. Keine Rechtsberatung.</p>
` },
  taschengeld: { h:`
<h5>Lerngeld, kein Lohn</h5>
<p>Taschengeld erfüllt nur dann seinen Zweck, wenn es bedingungslos fließt: regelmäßig, zum festen Termin, ohne Kopplung an Noten, Aufgaben oder Wohlverhalten. Wird es als Belohnung oder Strafe eingesetzt, lernt das Kind nicht den Umgang mit Geld, sondern Gehorsam. Der eigentliche Lerneffekt entsteht durch die Freiheit, selbst zu entscheiden – und auch danebenzugreifen.</p>
<h5>Orientierungswerte</h5>
<table class="ptable"><tr><th>Alter</th><th>Häufigkeit</th><th>grober Rahmen</th></tr>
<tr><td>6–9 Jahre</td><td>wöchentlich</td><td>kleine Beträge</td></tr>
<tr><td>10–13 Jahre</td><td>monatlich</td><td>steigend mit dem Alter</td></tr>
<tr><td>ab 14 Jahre</td><td>monatlich</td><td>plus Budgetgeld</td></tr></table>
<p>Die Jugendämter veröffentlichen jährlich Empfehlungen. Entscheidend ist nicht der genaue Euro-Betrag, sondern dass die Zahlung verlässlich kommt und zum Familienbudget passt.</p>
<h5>Der Taschengeldparagraf</h5>
<p>Kinder sind nur eingeschränkt geschäftsfähig – aber Käufe im Rahmen ihres Taschengeldes sind wirksam, sobald sie bezahlt sind. Das gibt Kindern echten Handlungsspielraum und Eltern Gelassenheit: Der kleine Spielzeugkauf ist gültig, ohne dass die Eltern jedem Geschäft zustimmen müssen.</p>
<h5>Vom Taschengeld zum Budget</h5>
<p>Mit dem Jugendalter lohnt der Übergang zum Budgetgeld: ein größerer Betrag, aus dem Kleidung, Handy oder Freizeit selbst bezahlt werden. So üben Jugendliche, über Wochen zu planen, Prioritäten zu setzen und für größere Wünsche zu sparen – die beste Vorbereitung aufs eigene Konto.</p>
` },
  buergschaft: { h:`
<h5>Eine Unterschrift, fremde Schulden</h5>
<p>Eine Bürgschaft ist ein Versprechen gegenüber dem Gläubiger, für die Schuld eines anderen einzustehen. Zahlt der Hauptschuldner nicht, wird der Bürge zur Kasse gebeten – je nach Ausgestaltung bis zur vollen Höhe samt Zinsen und Kosten. Die emotionale Nähe, die zur Unterschrift führt, ändert nichts an der harten finanziellen Realität.</p>
<h5>Ausfall- oder selbstschuldnerisch?</h5>
<table class="ptable"><tr><th>Art</th><th>Bedeutung</th></tr>
<tr><td>Ausfallbürgschaft</td><td>erst nach erfolgloser Vollstreckung beim Hauptschuldner</td></tr>
<tr><td>Selbstschuldnerische Bürgschaft</td><td>sofortiger Zugriff auf den Bürgen</td></tr></table>
<p>Banken verlangen fast immer die selbstschuldnerische Variante – die für den Bürgen gefährlichste. Hier entfällt der Schutz, dass zuerst der eigentliche Schuldner herangezogen werden muss.</p>
<h5>Mithaftung im gemeinsamen Kredit</h5>
<p>Wer einen Kreditvertrag mitunterschreibt, ist nicht Bürge, sondern gleichberechtigter Schuldner – und haftet voll. Besonders heikel: Nach einer Trennung bleibt diese Mithaftung bestehen, bis der Kredit getilgt oder der Vertrag geändert ist. Die Bank muss einer Entlassung aus der Haftung nicht zustimmen.</p>
<h5>Wann Bürgschaften unwirksam sind</h5>
<p>Gerichte haben Bürgschaften wegen sittenwidriger Überforderung gekippt – etwa wenn ein einkommensschwacher Angehöriger aus emotionaler Verbundenheit für eine Summe bürgt, die er niemals tragen könnte. Verlassen sollte man sich darauf nicht. Besser: Höhe begrenzen, befristen und nur unterschreiben, was man im schlimmsten Fall selbst stemmen kann. Keine Rechtsberatung.</p>
` },

  mietenkaufen: { tool:"mietenkaufen", h:`
<h5>Die Grundfrage hinter dem Bauchgefühl</h5>
<p>„Miete ist rausgeschmissenes Geld" – kaum ein Satz hält sich hartnäckiger. Tatsächlich ist die Entscheidung zwischen Mieten und Kaufen eine Rechenaufgabe mit mehreren Unbekannten. Beim Kauf zahlt man zwar irgendwann nichts mehr ans Darlehen, gibt aber über Jahre erhebliche Beträge für Zinsen, Kaufnebenkosten und Instandhaltung aus, die nie zu Vermögen werden. Beim Mieten wiederum bleibt das Eigenkapital frei und kann Erträge erwirtschaften. Wer ehrlich vergleicht, trennt deshalb sauber zwischen Geld, das Vermögen aufbaut, und Geld, das schlicht weg ist.</p>
<h5>Was beim Kaufen wirklich kostet</h5>
<table class="ptable"><tr><th>Posten</th><th>Größenordnung</th></tr>
<tr><td>Grunderwerbsteuer</td><td>3,5–6,5 % (je Bundesland)</td></tr>
<tr><td>Notar und Grundbuch</td><td>ca. 1,5–2 %</td></tr>
<tr><td>Maklerprovision</td><td>oft 3–4 %</td></tr>
<tr><td>Instandhaltung</td><td>Richtwert ~1 % des Werts pro Jahr</td></tr></table>
<p>Allein die Kaufnebenkosten summieren sich schnell auf rund zehn Prozent des Kaufpreises – und dieses Geld ist vom ersten Tag an verloren. Es muss erst über die Jahre „wieder eingespart" werden, bevor der Kauf gegenüber dem Mieten vorne liegt.</p>
<h5>Warum die Haltedauer entscheidet</h5>
<p>Genau deshalb ist die wichtigste Frage nicht der Zins, sondern: Wie lange bleibe ich? Unter etwa sieben bis zehn Jahren rechnet sich ein Kauf oft nicht, weil die hohen Anfangskosten und die in den ersten Jahren hohen Zinsanteile noch nicht aufgeholt sind. Wer dagegen Jahrzehnte bleibt, profitiert von der abbezahlten Immobilie und – mit Glück – von der Wertsteigerung.</p>
<h5>Der faire Vergleich</h5>
<p>Ein ehrlicher Vergleich stellt die „verbrannten" Kosten gegenüber: beim Kauf Nebenkosten plus Zinsen plus Instandhaltung, beim Mieten die Kaltmiete – und berücksichtigt zusätzlich, dass der Mieter sein Eigenkapital anlegen kann. Der Käufer baut im Gegenzug durch die Tilgung Vermögen auf. Der Rechner unten macht genau das: Er zeigt die nicht aufbauenden Wohnkosten beider Varianten über den gewählten Zeitraum und stellt daneben Tilgung, Restschuld und den Anlageertrag des Eigenkapitals. Das Ergebnis ist eine Tendenz, keine Garantie – Wert- und Mietentwicklung bleiben unsicher. Aber es ersetzt das Bauchgefühl durch Zahlen. Keine Finanzberatung.</p>
` },
  erbschaftsteuer: { tool:"erbschaftsteuer", h:`
<h5>Großzügige Freibeträge – wenn man sie kennt</h5>
<p>Erben und Schenken klingt nach hoher Steuer, ist in Deutschland aber großzügig freigestellt. Jeder Erwerb hat einen persönlichen Freibetrag, und nur was darüber liegt, wird überhaupt besteuert. Wie hoch der Freibetrag ist und welcher Steuersatz greift, hängt vom Verwandtschaftsgrad ab – je näher, desto mehr bleibt steuerfrei und desto niedriger der Tarif.</p>
<h5>Wer wie viel steuerfrei erhält</h5>
<table class="ptable"><tr><th>Verhältnis</th><th>Freibetrag</th></tr>
<tr><td>Ehe-/Lebenspartner</td><td>500.000 €</td></tr>
<tr><td>Kind / Stiefkind</td><td>400.000 €</td></tr>
<tr><td>Enkel</td><td>200.000 €</td></tr>
<tr><td>Eltern (im Erbfall)</td><td>100.000 €</td></tr>
<tr><td>Geschwister, Nichten, Nicht-Verwandte</td><td>20.000 €</td></tr></table>
<p>Der Steuersatz beginnt in der günstigsten Steuerklasse bei sieben Prozent und steigt mit der Höhe des Erwerbs; in den ferneren Steuerklassen sind die Sätze deutlich höher und beginnen bereits bei 15 oder 30 Prozent.</p>
<h5>Der Zehn-Jahres-Trick</h5>
<p>Das wirksamste Gestaltungsmittel ist Zeit: Freibeträge lassen sich alle zehn Jahre erneut ausschöpfen. Wer ein größeres Vermögen frühzeitig in mehreren Schritten verschenkt, kann die Steuer dramatisch senken oder ganz vermeiden. Ein Elternpaar kann jedem Kind alle zehn Jahre 400.000 Euro steuerfrei übertragen – beide Elternteile zusammen also 800.000 Euro je Kind und Jahrzehnt.</p>
<h5>Das Familienheim und der Rat vom Profi</h5>
<p>Eine Sonderrolle spielt das selbst genutzte Familienheim: Es geht an Ehepartner steuerfrei über, an Kinder ebenfalls, sofern sie zehn Jahre selbst darin wohnen (bei Kindern zusätzlich eine Wohnflächengrenze). Bei größeren Vermögen, Unternehmen oder Immobilien lohnt der Gang zum Steuerberater oder Notar fast immer – die Gestaltungsspielräume sind groß. Der Rechner unten schätzt aus Erwerb und Verwandtschaftsgrad Freibetrag, steuerpflichtigen Anteil und die ungefähre Steuer. Keine Steuerberatung.</p>
` },
  abfindung: { tool:"abfindung", h:`
<h5>Gibt es überhaupt einen Anspruch?</h5>
<p>Die häufigste Fehlannahme: dass es bei einer Kündigung „automatisch" eine Abfindung gibt. Das stimmt nicht. Einen gesetzlichen Anspruch gibt es nur in Sonderfällen – etwa wenn der Arbeitgeber sie bei einer betriebsbedingten Kündigung nach § 1a Kündigungsschutzgesetz ausdrücklich anbietet, oder im Rahmen eines Sozialplans. In der Praxis ist die Abfindung fast immer Verhandlungssache, häufig das Ergebnis eines Vergleichs im Kündigungsschutzprozess: Der Arbeitgeber zahlt, um das Risiko und die Dauer des Verfahrens loszuwerden.</p>
<h5>Die Faustformel</h5>
<table class="ptable"><tr><th>Faktor</th><th>Einordnung</th></tr>
<tr><td>0,25</td><td>schwache Verhandlungsposition</td></tr>
<tr><td>0,5</td><td>Regelfall / Orientierung der Gerichte</td></tr>
<tr><td>1,0</td><td>starke Position, gute Erfolgsaussichten</td></tr></table>
<p>Als grobe Orientierung gilt: ein halbes Bruttomonatsgehalt je Beschäftigungsjahr. Bei acht Jahren und 4.000 Euro brutto wären das rund 16.000 Euro. Die tatsächliche Höhe hängt aber stark von den Erfolgsaussichten einer Klage ab.</p>
<h5>Die Steuer: Fünftelregelung</h5>
<p>Eine Abfindung ist in voller Höhe steuerpflichtig – aber sie wird als „außerordentliche Einkünfte" begünstigt besteuert. Die Fünftelregelung tut so, als verteile sich die Summe auf fünf Jahre, und mildert dadurch die Progression. Das senkt die Steuerlast spürbar, besonders wenn man im Auszahlungsjahr sonst wenig verdient (etwa bei anschließender Arbeitslosigkeit).</p>
<h5>Vorsicht Sperrzeit – und richtig verhandeln</h5>
<p>Wer einen Aufhebungsvertrag unterschreibt oder selbst kündigt, riskiert eine Sperrzeit von bis zu zwölf Wochen beim Arbeitslosengeld, weil man die Arbeitslosigkeit „mitverursacht" hat. Deshalb ist die Form entscheidend. Wichtig ist außerdem die Drei-Wochen-Frist: Eine Kündigungsschutzklage muss binnen drei Wochen nach Zugang der Kündigung eingereicht werden – sie ist oft der stärkste Hebel für eine höhere Abfindung. Der Rechner unten liefert einen Orientierungswert. Keine Rechtsberatung.</p>
` },
  fluggastrechte: { tool:"fluggastrechte", h:`
<h5>Wann es Geld gibt</h5>
<p>Die EU-Fluggastrechteverordnung (VO 261/2004) ist eines der verbraucherfreundlichsten Gesetze überhaupt – und kaum jemand schöpft sie aus. Sie greift bei Flügen, die in der EU starten, sowie bei Flügen in die EU, die von einer EU-Airline durchgeführt werden. Ein Anspruch auf Entschädigung entsteht, wenn man mit mindestens drei Stunden Verspätung am Ziel ankommt oder der Flug kurzfristig annulliert wird. Entscheidend ist die Ankunftszeit, nicht der Abflug.</p>
<h5>Die Entschädigungsstufen</h5>
<table class="ptable"><tr><th>Flugdistanz</th><th>Entschädigung</th></tr>
<tr><td>bis 1.500 km</td><td>250 €</td></tr>
<tr><td>1.500–3.500 km</td><td>400 €</td></tr>
<tr><td>über 3.500 km</td><td>600 € (bei 3–4 h ggf. 300 €)</td></tr></table>
<p>Bemerkenswert: Die Höhe richtet sich allein nach der Distanz, nicht nach dem Ticketpreis. Wer einen 80-Euro-Flug gebucht hat, kann bei großer Verspätung trotzdem 250 oder 400 Euro bekommen.</p>
<h5>Was die Airline entlastet</h5>
<p>Es gibt eine wichtige Ausnahme: „außergewöhnliche Umstände", die die Airline nicht beherrschen kann. Dazu zählen Unwetter, ein Streik der Flugsicherung oder politische Instabilität. Ein Streik des eigenen Personals oder ein technischer Defekt am Flugzeug zählen dagegen in der Regel nicht als außergewöhnlich – hier bleibt der Anspruch bestehen. Im Streitfall muss die Airline beweisen, dass ein außergewöhnlicher Umstand vorlag.</p>
<h5>Mehr als nur Geld – und so setzt du es durch</h5>
<p>Unabhängig von der Entschädigung hat man ab einer gewissen Wartezeit Anspruch auf Betreuungsleistungen: Verpflegung, zwei Kommunikationsmittel und bei Übernachtung ein Hotel samt Transfer. Den Entschädigungsanspruch macht man zunächst direkt und schriftlich bei der Airline geltend. Lehnt sie ab, helfen die Schlichtungsstelle für den öffentlichen Personenverkehr oder spezialisierte Inkasso-Dienstleister, die gegen Provision durchsetzen. Ansprüche verjähren in Deutschland erst nach drei Jahren. Der Rechner unten zeigt die mögliche Entschädigung. Keine Rechtsberatung.</p>
` },
  krankengeld: { tool:"krankengeldschaetzer", h:`
<h5>Wann Krankengeld greift</h5>
<p>Wer krank wird, bekommt zunächst sechs Wochen lang das volle Gehalt weiter – die Entgeltfortzahlung durch den Arbeitgeber. Dauert dieselbe Erkrankung länger, springt die gesetzliche Krankenkasse mit dem Krankengeld ein. Diesen Übergang unterschätzen viele: Das Krankengeld liegt deutlich unter dem gewohnten Nettogehalt, und die Lücke trifft genau dann, wenn man ohnehin geschwächt ist.</p>
<h5>Wie hoch es ist</h5>
<table class="ptable"><tr><th>Grenze</th><th>Regel</th></tr>
<tr><td>Grundsatz</td><td>70 % des Bruttoentgelts</td></tr>
<tr><td>Deckel</td><td>höchstens 90 % des Nettoentgelts</td></tr>
<tr><td>Obergrenze</td><td>begrenzt durch die Beitragsbemessungsgrenze</td></tr></table>
<p>Es gilt der jeweils niedrigere der beiden Werte. In der Praxis landet das Krankengeld dadurch meist bei rund 78 bis 80 Prozent des Nettogehalts – vor Abzügen. Denn auch vom Krankengeld gehen noch Beiträge ab.</p>
<h5>Wie lange – und was abgezogen wird</h5>
<p>Für dieselbe Erkrankung wird Krankengeld bis zu 78 Wochen innerhalb von drei Jahren gezahlt; die sechs Wochen Entgeltfortzahlung sind dabei eingerechnet. Vom Krankengeld behält die Kasse noch die Arbeitnehmeranteile zur Renten-, Arbeitslosen- und Pflegeversicherung ein – nur der Krankenversicherungsbeitrag selbst entfällt. Dadurch sinkt der ausgezahlte Betrag noch einmal um gut zwölf Prozent.</p>
<h5>Privat Versicherte und Vorsorge</h5>
<p>Wichtig für gesetzlich Versicherte mit höherem Einkommen und für Selbstständige: Die Beitragsbemessungsgrenze deckelt das Krankengeld, sodass gerade Gutverdienende eine spürbare Lücke haben. Privat Krankenversicherte erhalten gar kein gesetzliches Krankengeld – sie müssen den Verdienstausfall über ein separates Krankentagegeld absichern, dessen Höhe und Beginn frei vereinbart werden. Wer lange ausfällt und die Lücke nicht überbrücken kann, sollte früh mit der Kasse über Übergangsleistungen und Wiedereingliederung sprechen. Der Rechner unten schätzt das Krankengeld aus Brutto und Netto. Keine Beratung.</p>
` },

  etfsparplan: { tool:"etfsparplan", h:`
<h5>Der einfachste Vermögensaufbau</h5>
<p>Ein ETF bildet einen ganzen Markt nach – etwa die größten Unternehmen der Welt – und streut das Risiko damit automatisch über hunderte Firmen. Statt auf einzelne Aktien zu wetten, kauft man ein kleines Stück der gesamten Wirtschaft. Ein Sparplan zahlt monatlich automatisch ein, schon ab wenigen Euro, und macht aus kleinen Beträgen über die Jahre ein erstaunliches Vermögen.</p>
<h5>Warum der Zinseszins so stark ist</h5>
<table class="ptable"><tr><th>150 €/Monat, 6 % p. a.</th><th>Endkapital (ca.)</th></tr>
<tr><td>nach 10 Jahren</td><td>~24.500 € (eingezahlt 18.000 €)</td></tr>
<tr><td>nach 20 Jahren</td><td>~69.000 € (eingezahlt 36.000 €)</td></tr>
<tr><td>nach 30 Jahren</td><td>~150.000 € (eingezahlt 54.000 €)</td></tr></table>
<p>Man sieht: Der Gewinn wächst nicht linear, sondern beschleunigt sich – die letzten Jahre bringen den größten Schub, weil die Erträge selbst wieder Erträge erwirtschaften.</p>
<h5>Worauf es ankommt</h5>
<p>Zuerst der Notgroschen, dann der Sparplan – Geld, das man jahrelang nicht braucht. Wähle einen breiten Welt-Index mit niedrigen laufenden Kosten und verzichte auf Wetten gegen den Markt. Kursschwankungen sind normal und sogar hilfreich: In schwachen Phasen kauft die feste Rate automatisch mehr Anteile. Der wichtigste Erfolgsfaktor ist nicht das perfekte Timing, sondern das Durchhalten. Der Rechner unten zeigt, wie aus Rate, Laufzeit und Rendite ein Endkapital wird. Keine Anlageberatung.</p>
` },
  skonto: { tool:"skonto", h:`
<h5>Was Skonto eigentlich ist</h5>
<p>Skonto ist ein Preisnachlass dafür, dass man eine Rechnung besonders schnell begleicht – typischerweise zwei oder drei Prozent, wenn man innerhalb weniger Tage zahlt statt erst zum Zahlungsziel. Auf den ersten Blick wirkt das wie Kleingeld. Tatsächlich steckt darin eine der lukrativsten Sparmöglichkeiten im Alltag von Selbstständigen wie Privatleuten.</p>
<h5>Warum der Verzicht so teuer ist</h5>
<table class="ptable"><tr><th>Bedingung</th><th>Effektiver Jahreszins</th></tr>
<tr><td>2 % / 10 Tage, Ziel 30</td><td>~36 % p. a.</td></tr>
<tr><td>3 % / 10 Tage, Ziel 30</td><td>~55 % p. a.</td></tr>
<tr><td>2 % / 14 Tage, Ziel 30</td><td>~46 % p. a.</td></tr></table>
<p>Der Trick: Man bekommt für ein paar Tage früheres Zahlen einen festen Rabatt. Hochgerechnet aufs Jahr ergibt das einen Zinssatz, der jeden Konsumkredit und sogar den Dispo weit übertrifft.</p>
<h5>Was daraus folgt</h5>
<p>Skonto zu ziehen lohnt fast immer – und zwar so sehr, dass es sich sogar rechnet, dafür kurzfristig ein günstigeres Darlehen oder notfalls den Dispo zu nutzen, dessen Jahreszins meist deutlich unter dem Skonto-Vorteil liegt. Entscheidend ist, die Skontofrist exakt einzuhalten; ein Tag zu spät, und der Abzug entfällt komplett. Markiere die Frist im Kalender und prüfe Rechnungen gezielt auf Skonto-Klauseln. Der Rechner unten zeigt die Ersparnis in Euro und den effektiven Jahreszins des Verzichts.</p>
` },
  hausrat: { tool:"hausrat", h:`
<h5>Was die Hausratversicherung leistet</h5>
<p>Die Hausratversicherung ersetzt den beweglichen Besitz in der Wohnung, wenn er durch Feuer, Leitungswasser, Sturm oder Einbruch zerstört oder gestohlen wird – zum Neuwert, nicht zum Zeitwert. Möbel, Elektronik, Kleidung, Geschirr: Im Schadensfall summiert sich das schnell zu einem Betrag, den kaum jemand aus der Tasche zahlen möchte.</p>
<h5>Die richtige Versicherungssumme</h5>
<table class="ptable"><tr><th>Begriff</th><th>Bedeutung</th></tr>
<tr><td>Richtwert</td><td>rund 650 €/m² Wohnfläche</td></tr>
<tr><td>Unterversicherung</td><td>Summe zu niedrig → anteilige Kürzung</td></tr>
<tr><td>Unterversicherungsverzicht</td><td>Versicherer zahlt vollen Schaden</td></tr></table>
<p>Liegt die vereinbarte Summe unter dem tatsächlichen Wert, kürzt der Versicherer im Schaden anteilig – selbst bei kleinen Schäden. Der Unterversicherungsverzicht in der Police verhindert genau das.</p>
<h5>Sinnvolle Zusätze</h5>
<p>Fahrräder sind oft nur bis zu einer geringen Grenze und nur bei Einbruch versichert – wer ein teures Rad hat, braucht einen Zusatzbaustein, idealerweise mit Diebstahlschutz unterwegs. Wertsachen wie Schmuck haben Entschädigungsgrenzen. Und angesichts häufigerer Starkregen lohnt der Einschluss von Elementarschäden je nach Lage. Nach größeren Anschaffungen die Summe anpassen. Der Rechner unten schätzt die nötige Versicherungssumme und warnt vor Unterversicherung.</p>
` },
  bu: { tool:"bu", h:`
<h5>Das größte Vermögen ist die Arbeitskraft</h5>
<p>Wer jung ist, besitzt selten viel Geld – aber die Fähigkeit, über Jahrzehnte Einkommen zu erzielen. Genau dieses Vermögen sichert die Berufsunfähigkeitsversicherung ab. Fällt die Arbeitskraft durch Krankheit oder Unfall dauerhaft weg, bricht das Einkommen weg, während die Kosten weiterlaufen. Das ist die unterschätzteste finanzielle Gefahr im Erwerbsleben.</p>
<h5>Warum die gesetzliche Rente nicht reicht</h5>
<table class="ptable"><tr><th>Punkt</th><th>Kurz</th></tr>
<tr><td>gesetzliche EM-Rente</td><td>niedrig, nur bei starker Einschränkung</td></tr>
<tr><td>BU-Rente</td><td>zahlt ab 50 % Berufsunfähigkeit</td></tr>
<tr><td>Beitrag</td><td>steigt mit Alter und Vorerkrankungen</td></tr></table>
<p>Die gesetzliche Erwerbsminderungsrente liegt meist deutlich unter dem letzten Nettoeinkommen und setzt voraus, dass man kaum noch irgendeine Tätigkeit ausüben kann.</p>
<h5>Worauf beim Abschluss achten</h5>
<p>Je früher man abschließt, desto günstiger und einfacher – mit dem Alter und jeder Diagnose steigen Beitrag und Hürden. Gute Verträge verzichten auf die abstrakte Verweisung (der Versicherer darf einen nicht auf einen anderen Beruf verweisen), bieten weltweiten Schutz und eine Nachversicherungsgarantie für spätere Lebensphasen. Als Faustregel sichert man rund 70 bis 80 Prozent des Nettoeinkommens ab. Der Rechner unten schätzt den Bedarf und die Lücke zur gesetzlichen Rente. Keine Versicherungsberatung.</p>
` },
  quadratmeter: { tool:"quadratmeter", h:`
<h5>Mieten vergleichbar machen</h5>
<p>Ob eine Wohnung teuer ist, sagt die nackte Kaltmiete nicht – erst der Preis pro Quadratmeter macht unterschiedliche Wohnungen vergleichbar. Man teilt die Kaltmiete durch die Wohnfläche und erhält einen Wert, den man gegen den örtlichen Durchschnitt halten kann.</p>
<h5>Mietspiegel und Mietpreisbremse</h5>
<table class="ptable"><tr><th>Instrument</th><th>Funktion</th></tr>
<tr><td>Mietspiegel</td><td>zeigt die ortsübliche Vergleichsmiete</td></tr>
<tr><td>Mietpreisbremse</td><td>Neuvertrag max. ortsüblich + 10 %</td></tr>
<tr><td>Rüge</td><td>Mittel gegen überhöhte Miete</td></tr></table>
<p>Der qualifizierte Mietspiegel der Kommune ist die offizielle Referenz. In ausgewiesenen angespannten Wohnlagen darf die Miete bei Neuvermietung höchstens zehn Prozent über dem ortsüblichen Wert liegen.</p>
<h5>Was den Preis erklärt</h5>
<p>Lage, Baujahr, Ausstattung, Energiestandard und Möblierung erklären, warum zwei Wohnungen mit gleicher Größe unterschiedlich kosten – der reine Quadratmeterwert ist nur ein erster Anhaltspunkt, kein Urteil. Wer den Verdacht hat, deutlich zu viel zu zahlen, kann sich auf den Mietspiegel stützen und die Miete gegenüber dem Vermieter rügen. Der Rechner unten ermittelt deinen Quadratmeterpreis und vergleicht ihn mit dem ortsüblichen Wert.</p>
` },
  heizen: { tool:"heizkosten", h:`
<h5>Der größte Energieposten</h5>
<p>In den meisten Haushalten verschlingt das Heizen mehr Energie als alles andere zusammen. Abgerechnet wird in der Regel nach Kilowattstunden: Verbrauch mal Arbeitspreis plus einem festen Grundpreis ergibt die Jahreskosten. Wer seinen Verbrauch von der letzten Abrechnung kennt, kann gezielt ansetzen.</p>
<h5>Der stärkste Hebel: Temperatur</h5>
<table class="ptable"><tr><th>Maßnahme</th><th>Wirkung</th></tr>
<tr><td>1 °C weniger</td><td>rund 6 % Ersparnis</td></tr>
<tr><td>Stoßlüften statt Kippen</td><td>weniger Verlust, kein Schimmel</td></tr>
<tr><td>Nachtabsenkung</td><td>spart in den Schlafstunden</td></tr></table>
<p>Schon ein Grad weniger Raumtemperatur senkt den Verbrauch spürbar – und in Räumen, die man kaum nutzt, darf es ohnehin kühler sein.</p>
<h5>Maßnahmen ohne Investition</h5>
<p>Vieles wirkt sofort und kostet nichts: Heizkörper frei stellen (nicht hinter Sofa oder Vorhang), regelmäßig entlüften, Rollläden nachts schließen, Türen zu ungeheizten Räumen geschlossen halten. Mittelfristig bringt ein hydraulischer Abgleich viel – er verteilt die Wärme gleichmäßig und senkt den Verbrauch dauerhaft, oft mit Förderung. Der Rechner unten schätzt deine Heizkosten und zeigt, wie viel ein Grad weniger spart.</p>
` },
  dienstreise: { tool:"reisekosten", h:`
<h5>Was sich abrechnen lässt</h5>
<p>Wer beruflich auswärts unterwegs ist, hat Mehraufwand für Verpflegung und Fahrt – beides lässt sich pauschal abrechnen, ohne jeden Beleg zu sammeln. Entweder erstattet der Arbeitgeber die Beträge steuerfrei, oder man setzt sie in der eigenen Steuererklärung als Werbungskosten an. Beides zusammen geht nicht.</p>
<h5>Die Verpflegungspauschale</h5>
<table class="ptable"><tr><th>Abwesenheit</th><th>Pauschale (Inland)</th></tr>
<tr><td>voller Tag (24 h)</td><td>28 €</td></tr>
<tr><td>An-/Abreisetag</td><td>14 €</td></tr>
<tr><td>über 8 h ohne Übernachtung</td><td>14 €</td></tr></table>
<p>Stellt der Arbeitgeber Mahlzeiten, wird die Tagespauschale gekürzt: um 20 Prozent fürs Frühstück, um je 40 Prozent für Mittag- und Abendessen.</p>
<h5>Fahrt und Nachweis</h5>
<p>Für Fahrten mit dem eigenen Pkw lassen sich pauschal 0,30 Euro je gefahrenem Kilometer ansetzen (anders als beim Arbeitsweg zählt hier die tatsächlich gefahrene Strecke, hin und zurück). Übernachtungskosten werden gegen Beleg erstattet. Wichtig ist, Reisetage, Abwesenheitszeiten und Kilometer sauber zu dokumentieren. Der Rechner unten addiert Verpflegungspauschale und Fahrtkosten zu einem Gesamtbetrag.</p>
` },
  mietminderung: { tool:"mietminderung", h:`
<h5>Wann gemindert werden darf</h5>
<p>Ist die Wohnung mangelhaft und dadurch ihre Nutzung erheblich beeinträchtigt, darf die Miete gemindert werden – das Gesetz sieht das ausdrücklich vor. Klassische Fälle sind Schimmel, eine ausgefallene Heizung im Winter, anhaltender Baulärm oder undichte Fenster. Bagatellen rechtfertigen dagegen keine Minderung.</p>
<h5>So wird gerechnet</h5>
<table class="ptable"><tr><th>Punkt</th><th>Detail</th></tr>
<tr><td>Basis</td><td>Brutto-(Warm-)Miete</td></tr>
<tr><td>Zeitraum</td><td>nur die Tage mit Mangel</td></tr>
<tr><td>Quote</td><td>orientiert an Gerichtsurteilen</td></tr></table>
<p>Die Minderung bemisst sich an der Warmmiete und gilt nur für die Dauer des Mangels. Die Höhe der Quote ist nicht frei wählbar, sondern richtet sich an vergleichbaren Urteilen aus.</p>
<h5>Richtig vorgehen</h5>
<p>Entscheidend ist die Reihenfolge: den Mangel dokumentieren (Fotos mit Datum), ihn unverzüglich schriftlich beim Vermieter anzeigen und eine Frist zur Beseitigung setzen. Erst dann mindern – und im Zweifel nur unter Vorbehalt, um nichts zu verspielen. Eigenmächtige, zu hohe Kürzungen können zur Kündigung führen. Bei Unsicherheit helfen Mieterverein oder Anwalt. Der Rechner unten schätzt den Minderungsbetrag aus Warmmiete, Quote und Tagen. Keine Rechtsberatung.</p>
` },
  ratenkredit: { tool:"kreditrate", h:`
<h5>Wie die Rate entsteht</h5>
<p>Ein Ratenkredit verteilt eine größere Summe auf gleichbleibende Monatsraten. Jede Rate enthält einen Zins- und einen Tilgungsanteil; zu Beginn überwiegt der Zins, zum Ende die Tilgung. Aus Kreditsumme, Zinssatz und Laufzeit ergibt sich die Rate rechnerisch eindeutig – die sogenannte Annuität.</p>
<h5>Laufzeit und Zins</h5>
<table class="ptable"><tr><th>Hebel</th><th>Wirkung</th></tr>
<tr><td>längere Laufzeit</td><td>niedrigere Rate, mehr Zinsen gesamt</td></tr>
<tr><td>Nominalzins</td><td>ohne Gebühren – nicht vergleichbar</td></tr>
<tr><td>Effektivzins</td><td>mit Gebühren – der ehrliche Vergleich</td></tr></table>
<p>Die längere Laufzeit fühlt sich angenehm an, weil die Rate sinkt – kostet aber unterm Strich oft deutlich mehr Zinsen. Vergleichbar sind Angebote nur über den Effektivzins.</p>
<h5>Worauf achten</h5>
<p>Wähle die Laufzeit so kurz wie tragbar und vereinbare ein kostenloses Sondertilgungsrecht, um bei Geldsegen schneller schuldenfrei zu sein. Finger weg von teuren Restschuldversicherungen, die dem Kredit oft aufgedrängt werden, und von Lockraten, die hinten teuer werden. Und die ehrlichste Frage zuerst: Lässt sich die Anschaffung aufschieben und ansparen? Der Rechner unten zeigt Monatsrate, Gesamtkosten und den Zinsanteil.</p>
` },
  eauto: { tool:"eauto", h:`
<h5>Der Ladeort entscheidet</h5>
<p>Bei einem E-Auto sind nicht Motor oder Marke der größte Kostenhebel, sondern der Ort, an dem geladen wird. Der Energiebedarf ergibt sich aus dem Verbrauch (Kilowattstunden pro 100 Kilometer) und der Jahresfahrleistung – multipliziert mit dem Strompreis ergibt das die Ladekosten.</p>
<h5>Zu Hause vs. öffentlich</h5>
<table class="ptable"><tr><th>Ladeort</th><th>Eigenschaft</th></tr>
<tr><td>zu Hause</td><td>günstig, bequem, planbar</td></tr>
<tr><td>mit PV/Nachttarif</td><td>am günstigsten</td></tr>
<tr><td>öffentlich (Ad-hoc)</td><td>am teuersten, stark schwankend</td></tr></table>
<p>Heimladen ist fast immer deutlich günstiger als die öffentliche Säule – besonders mit eigener Solaranlage oder einem speziellen Auto- bzw. Wärmepumpentarif.</p>
<h5>Was noch zählt</h5>
<p>Eine Wallbox macht das Laden zu Hause schnell und sicher, kostet aber in der Anschaffung und ggf. für den Elektriker – das gehört in die Rechnung. Unterwegs lohnt eine Ladekarte oder App, denn spontanes Ad-hoc-Laden ohne Vertrag ist am teuersten und die Preise je Anbieter unterscheiden sich erheblich. Wer überwiegend zu Hause lädt, fährt im Alltag sehr günstig. Der Rechner unten vergleicht die jährlichen Ladekosten zu Hause und öffentlich.</p>
` },

  auto: { tool:"autokosten", h:`
<h5>Was ein Auto wirklich kostet</h5>
<p>Die meisten rechnen beim Auto nur Kaufpreis und Sprit – und unterschätzen damit die laufenden Kosten massiv. Tatsächlich ist der größte Posten oft unsichtbar: der Wertverlust. Ein Neuwagen verliert in den ersten Jahren am steilsten an Wert, lange bevor die erste größere Reparatur fällig wird.</p>
<h5>Die Vollkosten im Überblick</h5>
<table class="ptable"><tr><th>Posten</th><th>Anteil</th></tr>
<tr><td>Wertverlust</td><td>meist der größte Block</td></tr>
<tr><td>Kraftstoff/Strom</td><td>je nach Fahrleistung</td></tr>
<tr><td>Versicherung + Kfz-Steuer</td><td>fix pro Jahr</td></tr>
<tr><td>Wartung, Reifen, TÜV, Parken</td><td>schwankend, gern vergessen</td></tr></table>
<p>Erst die Summe all dieser Posten zeigt die echten Monatskosten – und die liegen fast immer höher als gedacht.</p>
<h5>Kaufen, leasen oder verzichten</h5>
<p>Leasing wirkt durch niedrige Raten attraktiv, bindet aber mit Laufzeit und Kilometergrenzen, und am Ende gehört einem nichts. Ein junger Gebrauchter umgeht den steilsten Wertverlust, den der Erstkäufer trägt. Und bei geringer Fahrleistung schlagen Carsharing, Bahn plus gelegentlicher Mietwagen die eigenen Vollkosten oft deutlich. Der Rechner unten schätzt aus Kaufpreis, Restwert, Fahrleistung und Fixkosten die echten Monatskosten – eine ehrliche Grundlage für die Entscheidung.</p>
` },
  pendeln: { tool:"pendelvergleich", h:`
<h5>Der unterschätzte Kostenblock</h5>
<p>Der tägliche Arbeitsweg summiert sich – in Euro und in Lebenszeit. Beim Auto sieht man meist nur den Sprit, doch jeder Pendelkilometer erzeugt auch Wertverlust und Verschleiß. Ein nüchterner Vergleich mit dem ÖPNV lohnt sich daher fast immer, besonders seit dem Deutschlandticket.</p>
<h5>Auto gegen ÖPNV</h5>
<table class="ptable"><tr><th>Faktor</th><th>Auto</th><th>ÖPNV</th></tr>
<tr><td>variable Kosten</td><td>Sprit + Verschleiß je km</td><td>meist fester Ticketpreis</td></tr>
<tr><td>Flexibilität</td><td>hoch</td><td>fahrplanabhängig</td></tr>
<tr><td>Zeitnutzung</td><td>am Steuer gebunden</td><td>Lesen, Arbeiten, Ruhe</td></tr></table>
<p>Gerade bei festen Arbeitszeiten und guter Anbindung gewinnt der ÖPNV oft doppelt: günstiger und nutzbare Zeit.</p>
<h5>Die Pendlerpauschale</h5>
<p>Unabhängig vom Verkehrsmittel mindert die Entfernungspauschale die Steuer: pro Entfernungskilometer (einfache Strecke) und Arbeitstag, ab dem 21. Kilometer erhöht. Sie wirkt im Rahmen der Werbungskosten und übersteigt bei längeren Wegen schnell den Pauschbetrag. Der Rechner unten stellt Auto-Spritkosten und Ticketpreis gegenüber und schätzt die jährliche Pauschale – die wahren Auto-Vollkosten liegen wegen Wertverlust und Wartung noch darüber.</p>
` },
  stromtarif: { tool:"stromrechner", h:`
<h5>Woraus sich der Strompreis zusammensetzt</h5>
<p>Eine Stromrechnung hat zwei Hebel: den Arbeitspreis pro Kilowattstunde und den festen Grundpreis pro Monat. Beide zusammen ergeben die Jahreskosten. Wer nur auf den Arbeitspreis schaut, übersieht, dass ein niedriger Grundpreis bei kleinem Verbrauch viel ausmacht – und umgekehrt.</p>
<h5>Verbrauch einordnen</h5>
<table class="ptable"><tr><th>Haushalt</th><th>Richtwert/Jahr</th></tr>
<tr><td>1 Person</td><td>ca. 1.500 kWh</td></tr>
<tr><td>2 Personen</td><td>ca. 2.500 kWh</td></tr>
<tr><td>4 Personen</td><td>ca. 4.000 kWh</td></tr></table>
<p>Mit Warmwasser oder Heizung über Strom liegen die Werte deutlich höher – dann lohnt der Blick auf die Geräte besonders.</p>
<h5>Wechseln – und worauf achten</h5>
<p>Die Grundversorgung ist die teure Komfortzone; ein Sondertarif beim selben oder einem anderen Anbieter ist meist günstiger. Beim Wechsel zählen Kündigungsfrist, eine Preisgarantie und die Frage, wie der Preis nach dem ersten Jahr aussieht, wenn Boni wegfallen. Den Abschlag nicht zu hoch ansetzen – er ist nur eine zinslose Vorauszahlung. Der stärkste Hebel bleibt der eigene Verbrauch: alte Geräte, Standby und elektrisches Warmwasser. Der Rechner unten zeigt Jahreskosten und die Ersparnis durch einen günstigeren Arbeitspreis.</p>
` },
  handyvertrag: { tool:"handykosten", h:`
<h5>Das versteckte Gerät im Tarif</h5>
<p>Ein Tarif mit Smartphone wirkt praktisch: alles in einer Monatsrate. Genau darin steckt die Falle – der Gerätepreis wird als Aufschlag über die Laufzeit verteilt, oft teurer als ein Ratenkredit. Wer SIM-only-Tarif und Gerät getrennt betrachtet, sieht die wahren Kosten.</p>
<h5>Bündel vs. getrennt</h5>
<table class="ptable"><tr><th>Variante</th><th>Eigenschaft</th></tr>
<tr><td>Tarif mit Gerät</td><td>bequem, oft teurer, lange Bindung</td></tr>
<tr><td>SIM-only + Gerät separat</td><td>flexibel, meist günstiger</td></tr>
<tr><td>Gerät gebraucht/Vorjahr</td><td>größter Sparhebel</td></tr></table>
<p>Je länger ein Handy genutzt wird, desto niedriger sind die Kosten pro Monat – Langlebigkeit schlägt jedes Neugerät-Angebot.</p>
<h5>Vertragsfallen vermeiden</h5>
<p>Auf die Laufzeit achten (kurze Bindung bevorzugen), die automatische Verlängerung im Kalender markieren und das Datenvolumen am echten Bedarf ausrichten – viele zahlen für Gigabyte, die sie nie nutzen. Beim Internet zu Hause gilt dasselbe: Das schnellste Paket ist selten nötig, die mittlere Bandbreite reicht fast immer. Der Rechner unten vergleicht Bündel- und Getrennt-Variante über die gesamte Laufzeit.</p>
` },
  jobrad: { tool:"jobrad", h:`
<h5>Wie die Gehaltsumwandlung wirkt</h5>
<p>Beim Dienstrad-Leasing zahlt nicht der Arbeitgeber das Rad, sondern man selbst – aber aus dem Bruttogehalt. Weil die Leasingrate vor Steuern und Sozialabgaben einbehalten wird, sinkt das zu versteuernde Einkommen. Die Netto-Belastung ist dadurch spürbar niedriger als die Bruttorate, und der geldwerte Vorteil wird nur mit 0,25 Prozent versteuert.</p>
<h5>Wovon der Vorteil abhängt</h5>
<table class="ptable"><tr><th>Faktor</th><th>Wirkung</th></tr>
<tr><td>persönlicher Steuersatz</td><td>je höher, desto größer der Vorteil</td></tr>
<tr><td>Listenpreis des Rads</td><td>bestimmt Rate und Übernahmewert</td></tr>
<tr><td>Restwert/Übernahme</td><td>typisch rund 18 % am Ende</td></tr></table>
<p>Bei niedrigem Einkommen schrumpft der Effekt – dann kann der schlichte Direktkauf günstiger sein.</p>
<h5>Worauf noch achten</h5>
<p>Gehaltsumwandlung senkt minimal die Bemessungsgrundlage für spätere Lohnersatzleistungen wie Kranken- oder Elterngeld – meist vernachlässigbar, aber gut zu wissen. Sinnvoll ist JobRad nur für ein Rad, das wirklich genutzt wird, idealerweise auch für den Arbeitsweg. Versicherung und Wartungspaket gehören in die Rechnung. Der Rechner unten schätzt die Netto-Rate und vergleicht die Gesamtkosten inklusive Übernahme mit dem Direktkauf.</p>
` },
  urlaubsanspruch: { tool:"urlaub", h:`
<h5>Das gesetzliche Minimum</h5>
<p>Das Bundesurlaubsgesetz sichert vier Wochen bezahlten Urlaub pro Jahr. Bei einer Fünf-Tage-Woche sind das 20 Arbeitstage, bei sechs Tagen 24. Das ist die Untergrenze – viele Tarif- und Arbeitsverträge gewähren mehr, oft 28 bis 30 Tage. Der vertragliche Anspruch geht dem Gesetz vor, solange er höher ist.</p>
<h5>Teilzeit und Wechseljahr</h5>
<table class="ptable"><tr><th>Fall</th><th>Regel</th></tr>
<tr><td>Teilzeit</td><td>Tage anteilig, freie Wochen bleiben gleich</td></tr>
<tr><td>Eintritt unterjährig</td><td>pro Monat ein Zwölftel</td></tr>
<tr><td>Austritt</td><td>anteilig bis zum Austrittsmonat</td></tr></table>
<p>Wichtig: Teilzeit kürzt die Zahl der Urlaubstage, nicht die Erholung – wer an drei Tagen arbeitet, hat weniger Tage, aber genauso viele freie Wochen.</p>
<h5>Verfall und Krankheit</h5>
<p>Resturlaub verfällt grundsätzlich zum Jahresende oder bis Ende März des Folgejahres. Aber: Der Arbeitgeber muss rechtzeitig und nachweisbar auf den drohenden Verfall hinweisen – tut er das nicht, verfällt der Urlaub nicht. Wer im Urlaub krank wird, bekommt die Tage mit ärztlichem Attest gutgeschrieben. Der Rechner unten ermittelt den vollen und den anteiligen Anspruch aus Wochenarbeitstagen und Beschäftigungsmonaten.</p>
` },
  minijob: { tool:"minijob", h:`
<h5>Was den Minijob ausmacht</h5>
<p>Der Minijob ist eine geringfügige Beschäftigung bis zu einer festen Verdienstgrenze, die an den Mindestlohn gekoppelt ist und mit ihm steigt. Für die Beschäftigten bleibt der Lohn in der Regel steuer- und sozialabgabenfrei – die pauschalen Abgaben trägt der Arbeitgeber. Das macht ihn als Zuverdienst beliebt.</p>
<h5>Grenzen und Stunden</h5>
<table class="ptable"><tr><th>Punkt</th><th>Kurz</th></tr>
<tr><td>Verdienstgrenze</td><td>an den Mindestlohn gekoppelt</td></tr>
<tr><td>mehrere Minijobs</td><td>Verdienste werden addiert</td></tr>
<tr><td>Rentenversicherung</td><td>Pflicht, Befreiung möglich – besser nicht</td></tr></table>
<p>Wer die Befreiung von der Rentenversicherung NICHT beantragt, zahlt nur einen kleinen Eigenanteil und sammelt dafür vollwertige Rentenpunkte samt Schutz – das lohnt fast immer.</p>
<h5>Der Übergang zum Midijob</h5>
<p>Steigt der Verdienst über die Minijob-Grenze, beginnt der Midijob-Übergangsbereich: Hier zahlen Beschäftigte zunächst nur reduzierte, dann langsam steigende Beiträge – der Sprung ins volle Brutto-Netto erfolgt nicht abrupt. So lohnt sich auch ein Verdienst knapp über der Grenze. Der Rechner unten zeigt den Monatsverdienst, ob die Grenze überschritten wird und wie viele Stunden bei einem gegebenen Stundenlohn maximal möglich sind.</p>
` },
  mietkaution: { tool:"kaution", h:`
<h5>Wie hoch darf die Kaution sein?</h5>
<p>Die Mietkaution sichert den Vermieter gegen Schäden und offene Forderungen ab – sie ist aber gesetzlich gedeckelt. Mehr als drei Nettokaltmieten darf nicht verlangt werden, egal was im Vertrag steht. Eine höhere Vereinbarung ist in dem Teil unwirksam, der das Maximum übersteigt.</p>
<h5>Zahlung und Anlage</h5>
<table class="ptable"><tr><th>Regel</th><th>Detail</th></tr>
<tr><td>Höchstbetrag</td><td>3 Nettokaltmieten</td></tr>
<tr><td>Ratenzahlung</td><td>3 gleiche Monatsraten erlaubt</td></tr>
<tr><td>Anlage</td><td>getrennt vom Vermietervermögen, verzinst</td></tr></table>
<p>Die erste Rate ist zu Mietbeginn fällig, die weiteren in den Folgemonaten – niemand muss alles auf einmal aufbringen. Die Zinsen der Anlage stehen den Mietenden zu.</p>
<h5>Rückzahlung beim Auszug</h5>
<p>Nach dem Auszug zahlt der Vermieter die Kaution zügig zurück. Einen angemessenen Teil darf er bis zur nächsten Nebenkostenabrechnung einbehalten, falls eine Nachzahlung droht; der Rest gehört ohne Verzögerung erstattet. Ein sauberes Übergabeprotokoll mit Fotos ist die beste Versicherung gegen Streit. Kautionsbürgschaften sind bequem, kosten aber laufend Gebühren – meist lohnt das eigene Ansparen mehr. Der Rechner unten zeigt Höchstbetrag, Ratenhöhe und ob zu viel verlangt wird.</p>
` },
  bahncard: { tool:"bahncard", h:`
<h5>Eine reine Rechenfrage</h5>
<p>Ob sich eine BahnCard lohnt, ist erstaunlich nüchtern zu beantworten: Sie rechnet sich, sobald die Summe der gesparten Rabatte den Kartenpreis übersteigt. Die BahnCard 25 gibt ein Viertel, die BahnCard 50 die Hälfte Rabatt auf den Normalpreis. Alles, was man dafür braucht, ist eine ehrliche Schätzung der eigenen Bahn-Ausgaben.</p>
<h5>BC25 oder BC50?</h5>
<table class="ptable"><tr><th>Profil</th><th>passt zu</th></tr>
<tr><td>BahnCard 25</td><td>gelegentliche Fahrten, oft mit Sparpreisen kombiniert</td></tr>
<tr><td>BahnCard 50</td><td>regelmäßige Fahrten zum Flexpreis</td></tr>
<tr><td>keine Karte</td><td>seltene Fahrten – Sparpreise reichen</td></tr></table>
<p>Vielfahrer erreichen den Break-even schnell, Gelegenheitsfahrer fahren mit frühzeitig gebuchten Sparpreisen oft günstiger als mit einer teuren Karte.</p>
<h5>Stolperfallen</h5>
<p>Die BahnCard verlängert sich automatisch um ein Jahr, wenn man nicht rechtzeitig kündigt – das kostet viele unbemerkt Geld. Vor dem Kauf lohnt der Blick auf Jobticket und Deutschlandticket: Wer ohnehin ein Nahverkehrsticket hat, braucht die BahnCard nur noch für Fernfahrten. Der Rechner unten zeigt, ab welchen jährlichen Bahn-Ausgaben sich die Karte lohnt und was unterm Strich übrig bleibt.</p>
` },
  festgeld: { tool:"festgeld", h:`
<h5>Sicher und planbar</h5>
<p>Tages- und Festgeld sind die ruhigen Bausteine der Geldanlage: kein Kursrisiko, klare Zinsen. Tagesgeld ist täglich verfügbar und eignet sich für den Notgroschen; Festgeld bindet das Geld für eine feste Laufzeit und bringt dafür meist etwas mehr Zins. Für kurzfristige Ziele und die Reserve ist beides ideal – für langfristigen Vermögensaufbau dagegen zu zinsschwach.</p>
<h5>Steuer und Sicherheit</h5>
<table class="ptable"><tr><th>Thema</th><th>Kurz</th></tr>
<tr><td>Abgeltungsteuer</td><td>25 % plus Soli auf Zinsen</td></tr>
<tr><td>Sparerpauschbetrag</td><td>bis 1.000 Euro/Jahr steuerfrei</td></tr>
<tr><td>Einlagensicherung</td><td>bis 100.000 Euro je Bank</td></tr></table>
<p>Den Freistellungsauftrag bei der Bank einzurichten ist Pflichtprogramm – sonst wird unnötig Steuer einbehalten, die man erst über die Steuererklärung zurückholt.</p>
<h5>Klug aufteilen</h5>
<p>Bei größeren Summen lohnt das Splitten auf mehrere Banken, damit jede Anlage in der Einlagensicherung bleibt. Und der wichtigste Realitätscheck: Der Zins liegt oft unter der Inflation, das Geld verliert real also leicht an Kaufkraft. Für die Reserve ist das in Ordnung – was darüber hinaus jahrzehntelang liegt, gehört breiter gestreut angelegt. Der Rechner unten zeigt den Zinsertrag nach Steuer und das Endkapital.</p>
` },

  inflation: { tool:"inflation", h:`
<h5>Warum Geld auf dem Konto schrumpft</h5>
<p>Inflation heißt: Die Preise steigen, also kauft dieselbe Geldsumme mit der Zeit weniger. Bei rund 2 Prozent im Jahr klingt das harmlos, doch der Effekt summiert sich wie ein Zinseszins – nur in die falsche Richtung. Liegt der Sparzins unter der Inflationsrate, verliert das Geld auf dem Konto real an Wert, Monat für Monat, ohne dass eine Zahl auf dem Auszug kleiner wird.</p>
<h5>Kaufkraft über die Jahre</h5>
<table class="ptable"><tr><th>Heute 10.000 Euro</th><th>Wert bei 2,5 % Inflation</th></tr>
<tr><td>nach 10 Jahren</td><td>ca. 7.800 Euro Kaufkraft</td></tr>
<tr><td>nach 20 Jahren</td><td>ca. 6.100 Euro Kaufkraft</td></tr>
<tr><td>nach 30 Jahren</td><td>ca. 4.800 Euro Kaufkraft</td></tr></table>
<p>Aus 10.000 Euro werden real also weniger als die Hälfte – obwohl der Betrag nominal gleich bleibt. Genau das übersehen viele, die ihr ganzes Erspartes aus Vorsicht auf dem Tagesgeld lassen.</p>
<h5>Was daraus folgt</h5>
<p>Der Notgroschen gehört weiter aufs Konto – dort zählt Verfügbarkeit, nicht Rendite. Alles darüber hinaus sollte aber mindestens die Inflation ausgleichen. Breit gestreute Sachwerte (Aktien-ETF, Immobilien) haben das langfristig getan, Bargeld nie. Umgekehrt entlastet Inflation, wer einen Kredit mit festem Zins hat: Die Rate bleibt, das Einkommen wächst nominal, die Schuld wird real leichter. Der Rechner unten zeigt, wie stark die Kaufkraft eines Betrags über die Zeit sinkt – und welche Nettorendite nötig ist, um sie zu erhalten.</p>
` },
  dispo: { tool:"dispokredit", h:`
<h5>Warum der Dispo so teuer ist</h5>
<p>Der Dispositionskredit ist als kurzfristige Überbrückung gedacht – für die Tage zwischen großer Rechnung und nächstem Gehalt. Sein Komfort hat einen Preis: Die Zinsen liegen meist deutlich über denen eines normalen Ratenkredits. Wer nur gelegentlich und kurz ins Minus rutscht, zahlt wenig. Wer dauerhaft im Dispo lebt, verbrennt unbemerkt Geld.</p>
<h5>Kredite nach Kosten sortiert</h5>
<table class="ptable"><tr><th>Kreditart</th><th>Typische Kosten</th></tr>
<tr><td>Dispo / geduldete Überziehung</td><td>sehr hoch</td></tr>
<tr><td>Kreditkarten-Teilzahlung</td><td>hoch</td></tr>
<tr><td>Ratenkredit der Bank</td><td>mittel</td></tr>
<tr><td>Förder-/Bauspardarlehen</td><td>niedrig</td></tr></table>
<p>Die Faustregel: Je länger ein Kredit läuft und je flexibler er ist, desto teurer ist er pro Euro – der Dispo vereint beide teuren Eigenschaften.</p>
<h5>Der Umschuldungs-Fahrplan</h5>
<p>Steht das Konto dauerhaft tief im Minus, lohnt der Wechsel: Den Betrag in einen Ratenkredit mit fester Laufzeit umschulden, am besten mit Sondertilgungsrecht, und den Dispo danach diszipliniert nur noch als Brücke nutzen. Vorher Angebote vergleichen und ruhig nach einem besseren Zins fragen – Banken verhandeln. Finger weg von Mini-Raten und Null-Prozent-Lockangeboten, die vor allem zu unnötigen Käufen verleiten. Der Rechner unten zeigt, wie viel ein dauerhaft genutzter Dispo im Jahr kostet und was eine Umschuldung spart.</p>
` },
  homeoffice: { tool:"homeoffice", h:`
<h5>Was rechtlich gilt</h5>
<p>Einen allgemeinen Anspruch auf Homeoffice gibt es nicht – es wird zwischen Beschäftigten und Arbeitgeber vereinbart, am besten schriftlich mit klaren Tagen und Erreichbarkeitsregeln. Umgekehrt darf der Arbeitgeber Homeoffice in der Regel auch nicht einseitig dauerhaft anordnen. Wichtig: Arbeitszeitgesetz und Arbeitsschutz gelten zu Hause genauso – Pausen, Höchstarbeitszeit und das Recht auf echten Feierabend bleiben bestehen.</p>
<h5>Die Steuer-Pauschale</h5>
<table class="ptable"><tr><th>Punkt</th><th>Kurz</th></tr>
<tr><td>Höhe</td><td>6 Euro je Homeoffice-Tag</td></tr>
<tr><td>Obergrenze</td><td>max. 210 Tage = 1.260 Euro/Jahr</td></tr>
<tr><td>Arbeitszimmer nötig?</td><td>nein, auch am Küchentisch</td></tr>
<tr><td>Wichtig</td><td>pro Tag entweder Pauschale ODER Entfernungspauschale</td></tr></table>
<p>Die Pauschale wirkt im Rahmen der Werbungskosten – sie lohnt sich vor allem, wenn die Summe aller Werbungskosten den Pauschbetrag übersteigt.</p>
<h5>Der gesunde Arbeitsplatz</h5>
<p>Ein paar Basics ersparen Rückenschmerzen: Bildschirm auf Augenhöhe, Oberkante etwa in Blickrichtung; Unterarme waagerecht auf dem Tisch; ein Stuhl, der das Becken stützt; Licht möglichst von der Seite, nicht im Rücken oder direkt dahinter. Genauso wichtig ist die mentale Grenze: ein fester Arbeitsplatz statt Sofa, ein bewusster Feierabend, das Diensthandy außer Reichweite. So bleibt Homeoffice ein Gewinn an Flexibilität statt einer Falle der Dauer-Erreichbarkeit. Der Rechner unten schätzt Pauschale und gesparte Fahrtkosten.</p>
` },
  solar: { tool:"solar", h:`
<h5>So funktioniert ein Balkonkraftwerk</h5>
<p>Eine Steckersolaranlage besteht aus ein, zwei Modulen und einem kleinen Wechselrichter, der den Strom über eine Steckdose ins Hausnetz einspeist. Laufende Geräte – Kühlschrank, Router, Standby-Verbraucher – nehmen ihn sofort ab. Montage und Anschluss schaffen viele an einem Nachmittag, und seit den jüngsten Erleichterungen ist die Bürokratie auf eine simple Anmeldung im Marktstammdatenregister geschrumpft.</p>
<h5>Was über die Rendite entscheidet</h5>
<table class="ptable"><tr><th>Faktor</th><th>Wirkung</th></tr>
<tr><td>Eigenverbrauch</td><td>entscheidend – nur selbst genutzter Strom spart</td></tr>
<tr><td>Standort/Ausrichtung</td><td>Süd und wenig Schatten = mehr Ertrag</td></tr>
<tr><td>Strompreis</td><td>je höher, desto schneller die Amortisation</td></tr>
<tr><td>Anschaffungspreis</td><td>stark gesunken – oft im niedrigen dreistelligen Bereich</td></tr></table>
<p>Der ins Netz abgegebene Überschuss wird in der Regel nicht vergütet – es zählt also, dass jemand tagsüber Strom verbraucht.</p>
<h5>Mehr herausholen</h5>
<p>Den Eigenverbrauch hebt, wer die Grundlast kennt und stromhungrige Geräte in die Mittagsstunden legt: Wasch- und Spülmaschine per Zeitschaltung, Laden von Akkus und E-Bike bei Sonne. Mietende und Eigentümer in einer Gemeinschaft haben inzwischen einen Anspruch darauf, dass Vermieter beziehungsweise WEG der Montage zustimmen – sachliche Gründe vorausgesetzt. Der Rechner unten schätzt aus Anschaffung, Ertrag, Strompreis und Eigenverbrauchsquote die jährliche Ersparnis und die Amortisationszeit.</p>
` },
  schlaf: { tool:"schlaf", h:`
<h5>Wie viel Schlaf der Mensch braucht</h5>
<p>Die meisten Erwachsenen brauchen sieben bis neun Stunden; der genaue Bedarf ist individuell, fällt aber selten dauerhaft unter sechs Stunden, ohne dass Konzentration, Stimmung und Gesundheit leiden. Wichtiger als die exakte Stundenzahl ist die Regelmäßigkeit: Eine feste Aufstehzeit – auch am Wochenende – ist der stärkste Hebel für erholsamen Schlaf, weil sie die innere Uhr stabilisiert.</p>
<h5>Schlafzyklen verstehen</h5>
<table class="ptable"><tr><th>Zyklen</th><th>Schlafdauer (ca.)</th></tr>
<tr><td>5 Zyklen</td><td>rund 7,5 Stunden</td></tr>
<tr><td>6 Zyklen</td><td>rund 9 Stunden</td></tr></table>
<p>Schlaf läuft in Phasen von etwa 90 Minuten. Wer am Ende eines Zyklus erwacht, fühlt sich frischer als jemand, den der Wecker mitten aus dem Tiefschlaf reißt – daher die Idee, die Zubettgeh-Zeit an ganzen Zyklen auszurichten.</p>
<h5>Routinen, die wirken</h5>
<p>Bewährt sind: die letzte Stunde bildschirmarm und gedimmt, kein Koffein nach dem frühen Nachmittag, Alkohol meiden (er lässt zwar einschlafen, zerstört aber die zweite Nachthälfte), Tageslicht am Morgen, Bewegung tagsüber und ein dunkles, kühles, ruhiges Schlafzimmer. Das Bett möglichst nur für Schlaf nutzen, damit der Körper die Verknüpfung lernt. Halten Ein- oder Durchschlafprobleme über mehrere Wochen an oder belasten den Alltag stark, gehört das ärztlich abgeklärt. Der Rechner unten gibt aus der gewünschten Aufwachzeit zwei günstige Zubettgeh-Zeiten entlang ganzer Schlafzyklen.</p>
` },

/* ---------- BILDUNG ---------- */
abschluesse: { h: `
<h5>Abschlüsse nachholen — alle Wege im Überblick</h5>
<table class="ptable"><tr><th>Weg</th><th>Dauer</th><th>Für wen</th></tr>
<tr><td>Abendschule / VHS</td><td>1–3 Jahre</td><td>Berufstätige, kostenlos bis günstig</td></tr>
<tr><td>Kolleg (Vollzeit)</td><td>2–3 Jahre</td><td>BAföG-fähig, schulisches Umfeld</td></tr>
<tr><td>Externenprüfung</td><td>flexibel</td><td>Selbstlerner, nur Prüfungsgebühr</td></tr>
<tr><td>Telekolleg / Fernkurs</td><td>1–3 Jahre</td><td>Ortsunabhängig, ca. 100–200 €/Monat</td></tr></table>
<h5>Strategie nach Ausgangslage</h5>
<p>Ohne Abschluss: erst Hauptschulabschluss über die VHS, oft in 1 Jahr — viele Länder koppeln ihn an eine bestandene Berufsausbildung sogar automatisch. Mit mittlerem Abschluss: Fachhochschulreife über die Fachoberschule (2 Jahre) ist der schnellste Weg Richtung Studium. Wichtig: Mit abgeschlossener Ausbildung plus 2–3 Jahren Berufserfahrung ist in fast allen Bundesländern ein Studium <em>ohne Abitur</em> möglich (beruflich Qualifizierte, teils mit Probestudium oder Eignungsprüfung).</p>
<h5>Förderung</h5>
<p>Schüler-BAföG für Kolleg/FOS muss nicht zurückgezahlt werden. Aufstiegs-BAföG fördert Meister/Techniker/Fachwirt mit Zuschüssen bis ~50 % der Lehrgangskosten. Die Agentur für Arbeit finanziert das Nachholen des Hauptschulabschlusses bei Arbeitslosigkeit häufig komplett.</p>
<h5>Welcher Abschluss öffnet was?</h5>
<table class="ptable"><tr><th>Abschluss</th><th>Öffnet</th></tr>
<tr><td>Hauptschulabschluss</td><td>viele Ausbildungsberufe</td></tr>
<tr><td>Mittlerer Abschluss (Realschule)</td><td>weitere Ausbildungen, Fachoberschule</td></tr>
<tr><td>Fachhochschulreife</td><td>Studium an Fachhochschulen</td></tr>
<tr><td>Abitur</td><td>Studium an allen Hochschulen</td></tr>
<tr><td>Ausbildung + 2–3 Jahre Berufserfahrung</td><td>Studium auch ohne Abitur (beruflich Qualifizierte)</td></tr></table>
<h5>Neben dem Job durchhalten</h5>
<p>Realistisch sind 10–15 Lernstunden pro Woche über 1–3 Jahre. Was hilft: feste Lernblöcke im Kalender wie Termine, eine Lerngruppe (Verbindlichkeit), und früh die Prüfungsordnung lesen, um gezielt auf das Geprüfte hinzuarbeiten. Mit dem Arbeitgeber Bildungsurlaub (in den meisten Bundesländern 5 Tage/Jahr) und ggf. reduzierte Stunden klären.</p>
` },

ausb_studium: { h: `
<h5>Die ehrliche Rechnung: Lebenseinkommen vs. Startgehalt</h5>
<p>Akademiker verdienen im Schnitt über das Leben mehr — aber der Median verdeckt viel: Ein Fachinformatiker mit Weiterbildung überholt viele Geisteswissenschaftler deutlich. Entscheidend ist die Kombination aus Fachrichtung, Branche und Region, nicht das Etikett „Studium“. Faustregel: MINT, Medizin, Jura mit Prädikat → Studium lohnt fast immer. Handwerk mit Meisterperspektive → oft gleichwertig bei früherem Vermögensaufbau (5–7 Jahre Einkommensvorsprung, Zinseszins!).</p>
<h5>Die Hybridwege, die kaum jemand kennt</h5>
<p><strong>Duales Studium:</strong> Gehalt ab Tag 1 (ca. 900–1.600 €/Monat), Übernahmequote &gt;80 %, aber hohe Belastung und frühe Bindung an einen Konzern. <strong>Berufsausbildung + berufsbegleitendes Studium:</strong> maximale Sicherheit, Arbeitgeber zahlen oft mit. <strong>Studienabbruch ist kein Makel:</strong> Kammern rechnen Studienleistungen auf Ausbildungen an — Verkürzung auf 2 Jahre ist üblich.</p>
<h5>Entscheidungsraster (3 Fragen)</h5>
<p>1. Lerne ich besser durch Anwenden oder durch Theorie? 2. Brauche ich das Studium <em>formal</em> für mein Zielberufsbild (Arzt, Lehrer, Ingenieur mit Kammereintrag)? 3. Halte ich 3–5 Jahre ohne nennenswertes Einkommen finanziell und mental durch? Zwei von drei Antworten zeigen fast immer klar in eine Richtung.</p>
<h5>Die drei Wege nebeneinander</h5>
<table class="ptable"><tr><th>Weg</th><th>Einkommen-Start</th><th>Vermögensaufbau</th><th>Flexibilität</th></tr>
<tr><td>Studium (Vollzeit)</td><td>spät, aber oft höher</td><td>verzögert</td><td>breit, formal nötig für reglementierte Berufe</td></tr>
<tr><td>Duales Studium</td><td>ab Tag 1</td><td>früh</td><td>hoch, aber Konzernbindung</td></tr>
<tr><td>Ausbildung + Aufstieg (Meister/Fachwirt)</td><td>sofort</td><td>5–7 Jahre Vorsprung</td><td>sehr praxisnah, Selbstständigkeit möglich</td></tr></table>
<p>Es gibt nicht <em>den</em> besten Weg, nur den passenden zu Lerntyp, Zielberuf und finanzieller Lage.</p>
` },

studienfin: { h: `
<h5>Der Finanzierungsmix in der Praxis</h5>
<p>Kaum jemand finanziert ein Studium aus einer Quelle. Typischer Mix: BAföG (Hälfte Zuschuss, Hälfte zinsloses Darlehen, Rückzahlung auf max. ~10.000 € gedeckelt) + Werkstudentenjob (bis 20 h/Woche ohne vollen SV-Beitrag) + Kindergeld bis 25. <strong>Stipendien werden dramatisch unterschätzt:</strong> Nur ein Bruchteil der Studierenden bewirbt sich, dabei zählen bei den 13 Begabtenförderwerken Engagement und Biografie oft mehr als Noten. Das Deutschlandstipendium (300 €/Monat) hat an vielen Hochschulen mehr Plätze als Bewerber.</p>
<h5>BAföG-Fallstricke</h5>
<p>Antrag immer stellen — auch wenn die Eltern „zu viel“ verdienen scheinen: Geschwister in Ausbildung, Freibeträge und Werbungskosten der Eltern ändern das Ergebnis oft überraschend. Fachrichtungswechsel nur bis zum 3. Semester unschädlich. Leistungsnachweis nach dem 4. Semester nicht verschlafen. Elternunabhängiges BAföG gibt es u. a. nach 3 Jahren Erwerbstätigkeit nach der Ausbildung.</p>
<h5>Was man vermeiden sollte</h5>
<p>Studienkredite (z. B. KfW) nur als letzte Brücke kurz vor dem Abschluss — variable Zinsen haben Absolventen schon böse überrascht. Vollzeitjob neben Vollzeitstudium verlängert das Studium statistisch um Jahre und kostet damit mehr, als er bringt.</p>
<h5>Stipendien: in dieser Reihenfolge bewerben</h5>
<p>1. Deutschlandstipendium (an der eigenen Hochschule, oft mehr Plätze als Bewerber). 2. Das zur Biografie passende der 13 Begabtenförderwerke (politisch/konfessionell/gewerkschaftsnah — Engagement zählt mehr als der Notenschnitt). 3. Kleine fach- oder regionsspezifische Stiftungen (Stipendien-Datenbanken durchsuchen). Aufwand: ein gutes Motivationsschreiben einmal schreiben, mehrfach anpassen. Erwartungswert pro Bewerbungsstunde: oft höher als jeder Nebenjob.</p>
`, tool: "studienbudget" },

weiterbildung: { h: `
<h5>Wer zahlt? Die Förderlandschaft</h5>
<table class="ptable"><tr><th>Instrument</th><th>Was es bringt</th></tr>
<tr><td>Bildungsurlaub</td><td>5 bezahlte Extra-Tage/Jahr in den meisten Bundesländern — Anspruch, kein Gefallen</td></tr>
<tr><td>Aufstiegs-BAföG</td><td>Meister, Fachwirt, Techniker: ~50 % Zuschuss auf Kursgebühren, Rest zinsgünstig</td></tr>
<tr><td>Bildungsgutschein (AfA)</td><td>100 % bei Arbeitslosigkeit oder Bedrohung des Jobs — auch Umschulungen</td></tr>
<tr><td>Qualifizierungschancengesetz</td><td>Förderung <em>im bestehenden Job</em>, Arbeitgeber stellt frei, Staat zahlt mit</td></tr>
<tr><td>Steuer</td><td>Fortbildungskosten unbegrenzt als Werbungskosten absetzbar (Kurs, Fahrt, Material)</td></tr></table>
<h5>Lernstrategie für Berufstätige</h5>
<p>Das 70-20-10-Modell: 70 % Lernen durch anspruchsvolle Aufgaben im Job, 20 % durch Austausch/Mentoring, nur 10 % durch Kurse. Konsequenz: Vor dem teuren Zertifikat erst fragen, ob ein Projekt mit Lernkurve im eigenen Haus zu bekommen ist. Zertifikate lohnen vor allem, wenn sie <em>Signalwirkung</em> am Arbeitsmarkt haben (IHK-Abschlüsse, anerkannte IT-Zertifizierungen) — nicht als Sammelobjekt.</p>
<h5>Die Karriere-Inventur (jährlich, 1 Stunde)</h5>
<p>Drei Listen: Was kann ich, was der Markt in 5 Jahren noch bezahlt? Was kann ich, was er nicht mehr bezahlt? Was bezahlt er, was ich noch nicht kann? Aus Liste 3 ein Lernziel pro Jahr ableiten — mehr ist unrealistisch.</p>
<h5>Lohnt sich der Kurs? Der 3-Fragen-ROI</h5>
<p>1. Erhöht das Zertifikat nachweislich mein Marktgehalt oder meine Jobsicherheit (Stellenanzeigen im Zielfeld zählen, wie oft es gefordert wird)? 2. Bekomme ich denselben Lerneffekt günstiger über ein Projekt im Job (70-20-10)? 3. Ist der Anbieter anerkannt (Kammer, Branchenstandard) statt nur hübsch? Erst wenn Frage 1 ein klares Ja ist und 2 ein Nein, lohnt das Geld. Förderung (Bildungsurlaub, Aufstiegs-BAföG, Steuer) immer vorher abklopfen.</p>
` },

privatbildung: { h: `
<h5>Das Curriculum des Erwachsenenlebens</h5>
<p>Schulen vermitteln vieles — aber selten das, was Erwachsene täglich brauchen. Eine sinnvolle private Lern-Roadmap deckt vier Felder ab: <strong>Geld</strong> (Zinseszins, Inflation, Steuern lesen können), <strong>Recht im Alltag</strong> (Verträge, Fristen, Vollmachten), <strong>Gesundheitskompetenz</strong> (Studien von Schlagzeilen unterscheiden), <strong>Digitales</strong> (Datensicherheit, Passwortmanager, Backups). Pro Quartal ein Feld vertiefen reicht völlig.</p>
<h5>Lernen, das hält: die Methode</h5>
<p>Wirksam sind nachweislich: Spaced Repetition (Wiederholung in wachsenden Abständen, z. B. per Karteikarten-App), aktives Abrufen statt erneutem Lesen, und das Feynman-Prinzip — etwas so erklären können, dass es ein Kind versteht. Unwirksam: Markieren, passives Video-Schauen, „Lerntypen“-Mythen.</p>
<h5>Kostenlose Spitzenressourcen</h5>
<p>VHS (Kurse oft unter 100 €), Stadtbibliothek inkl. Onleihe und Streaming-Lernplattformen mit Bibliotheksausweis (~20 €/Jahr), Hochschul-Vorlesungen als offene Kurse, Fachpodcasts für Pendelzeit. Eine Sprache hebt man am schnellsten mit der Kombination App (täglich 15 Min) + Tandempartner (wöchentlich) + Serien in Originalsprache.</p>
<h5>Quartalsplan als Vorlage</h5>
<table class="ptable"><tr><th>Quartal</th><th>Feld</th><th>Konkretes Ziel</th></tr>
<tr><td>Q1</td><td>Geld</td><td>Haushalt + ETF-Sparplan verstehen und einrichten</td></tr>
<tr><td>Q2</td><td>Recht im Alltag</td><td>Verträge, Fristen, eine Vorsorgevollmacht aufsetzen</td></tr>
<tr><td>Q3</td><td>Gesundheitskompetenz</td><td>Quellen prüfen, Vorsorgetermine planen</td></tr>
<tr><td>Q4</td><td>Digitales</td><td>Passwortmanager, 2-Faktor, Backups einrichten</td></tr></table>
<h5>Was sich von der Steuer absetzen lässt</h5>
<p>Beruflich veranlasste Weiterbildung (Kurse, Fachbücher, Fahrten, Prüfungsgebühren) zählt als Werbungskosten — Belege sammeln lohnt. Bildungsurlaub von in der Regel 5 Tagen pro Jahr gibt es in den meisten Bundesländern auch für persönlichkeitsbildende oder politische Kurse, nicht nur für rein berufliche Themen. Privates Schulgeld der eigenen Kinder ist nur begrenzt absetzbar (Anteil bis zu einem Jahreshöchstbetrag).</p>
` },

/* ---------- BERUF ---------- */
bewerbung: { h: `
<h5>So liest ein Recruiter wirklich (und so schreibt man dafür)</h5>
<p>Erstscreening: 30–60 Sekunden, oft vorher ein ATS-Parser. Konsequenzen: Standard-Schriftarten, keine Tabellen-Layouts mit zwei Spalten im Lebenslauf, Schlüsselbegriffe aus der Stellenanzeige wörtlich aufnehmen (das System matcht stumpf). Die wichtigsten 10 Zeilen sind die obere Hälfte von Seite 1: aktuelle Position, Kernergebnisse, Kernskills.</p>
<h5>Die Ergebnis-Formel für jede Station</h5>
<p>Statt Aufgaben („zuständig für Bestellwesen“) Ergebnisse mit Zahl: „Bestellprozess digitalisiert — Durchlaufzeit −40 %“. Schema: <em>Verb + Was + messbares Ergebnis</em>. Wer keine Zahlen hat, nimmt Größenordnungen (Teamgröße, Budget, Kundenzahl). Drei solcher Bullets pro Station schlagen zehn Aufgaben-Bullets.</p>
<h5>Anschreiben in 4 Sätzen-Logik</h5>
<p>1. Hook: konkreter Bezug zur Firma (Produkt, Projekt, Nachricht). 2. Match: meine zwei stärksten Belege für genau diese Anforderungen. 3. Mehrwert: was ich in den ersten 6 Monaten anpacken würde. 4. Abschluss ohne Konjunktiv-Demut („Ich freue mich auf das Gespräch“ statt „würde mich freuen, wenn Sie eventuell…“). Lücken im Lebenslauf: benennen, nicht verstecken — ein Satz mit Aktivität (Weiterbildung, Pflege, Reise) genügt.</p>
<h5>Häufige Ablehnungsgründe — und das Gegenmittel</h5>
<table class="ptable"><tr><th>Grund</th><th>Gegenmittel</th></tr>
<tr><td>Generisches Anschreiben</td><td>konkreter Firmenbezug im ersten Satz</td></tr>
<tr><td>Aufgaben statt Ergebnisse</td><td>Verb + Was + Zahl je Station</td></tr>
<tr><td>Lücken unerklärt</td><td>ein ehrlicher Satz mit Aktivität</td></tr>
<tr><td>ATS-untaugliches Layout</td><td>einspaltig, Standardschrift, Keywords der Anzeige</td></tr>
<tr><td>Kein Follow-up</td><td>nach 1–2 Wochen freundlich nachfragen</td></tr></table>
` },

vorstellung: { h: `
<h5>Die 6 Fragen, die fast immer kommen — und ihre Logik</h5>
<p>„Erzählen Sie von sich“ prüft Struktur (2 Minuten: Gegenwart → relevante Vergangenheit → warum hier). „Stärken/Schwächen“ prüft Selbstreflexion (echte Schwäche + Umgang damit, keine getarnte Stärke). „Warum wir?“ prüft Vorbereitung (2 konkrete Fakten über die Firma). „Konfliktsituation?“ prüft Verhalten — hier immer mit der <strong>STAR-Methode</strong> antworten: Situation, Task, Action, Result. Vorab 5 STAR-Geschichten vorbereiten deckt 80 % aller Verhaltensfragen ab.</p>
<h5>Rückfragen, die Eindruck machen</h5>
<p>„Woran würden Sie nach 12 Monaten festmachen, dass die Besetzung ein Erfolg war?“ — „Was ist die größte Herausforderung des Teams gerade?“ — „Wie sieht der Entscheidungsprozess weiter aus?“ Keine Fragen zu Urlaub/Benefits im Erstgespräch.</p>
<h5>Unzulässige Fragen & Gehaltsfrage</h5>
<p>Fragen nach Schwangerschaft, Familienplanung, Religion, Parteizugehörigkeit oder (meist) Krankheit sind unzulässig — hier darf man die Antwort verweigern oder ausweichen. Bei der Gehaltsfrage nie als Erster eine einzelne Zahl ohne Recherche nennen: Spanne nennen, deren Untergrenze das eigene Zielgehalt ist. Nach dem Gespräch: 24-h-Dankesmail mit einem inhaltlichen Anknüpfungspunkt — kaum jemand macht das, fast jeder Recruiter merkt es sich.</p>
<h5>Der Vorabend-Check</h5>
<p>Outfit raus (eine Stufe over- statt underdressed), Route/Zugang getestet (oder Video-Link 10 Min vorher geprüft: Kamera, Ton, Licht, Hintergrund), Unterlagen als Mappe und als PDF, drei eigene Fragen notiert, fünf STAR-Geschichten überflogen, Firmen-News der letzten Wochen gelesen. Am Morgen: 20 Minuten Puffer einplanen — Zuspätkommen ist der einzige Fehler, der vor dem ersten Satz schon entscheidet.</p>
` },

arbeitsvertrag: { h: `<h5>In dieser Reihenfolge prüfen</h5>
<p>Bevor irgendetwas unterschrieben wird, vier Dinge zuerst lesen: <strong>Befristung</strong> (mit/ohne Sachgrund?), <strong>Vergütung</strong> (fix vs. variabel, Fälligkeit), <strong>Arbeitszeit & Überstunden</strong> und <strong>Kündigungs-/Ausschlussfristen</strong>. Erst danach die Nebenklauseln. Wer unsicher ist, bittet schriftlich um „ein, zwei Tage Bedenkzeit“ — ein seriöser Arbeitgeber gewährt das immer.</p>
<h5>Die Klausel-Ampel</h5>
<table class="ptable"><tr><th>Klausel</th><th>Bewertung</th></tr>
<tr><td>Probezeit bis 6 Monate</td><td>🟢 Normal (Kündigungsfrist dann 2 Wochen)</td></tr>
<tr><td>Versetzungsvorbehalt (Ort/Tätigkeit)</td><td>🟡 Verhandeln: auf zumutbaren Radius begrenzen</td></tr>
<tr><td>„Überstunden mit Gehalt abgegolten“</td><td>🟡 Nur mit konkreter Obergrenze wirksam; pauschal oft unwirksam</td></tr>
<tr><td>Ausschlussfristen unter 3 Monate</td><td>🔴 Häufig unwirksam, aber riskant — Ansprüche immer schriftlich u. fristgerecht geltend machen</td></tr>
<tr><td>Nachvertragliches Wettbewerbsverbot ohne Karenzentschädigung</td><td>🔴 Unverbindlich — der Arbeitgeber muss mind. 50 % der letzten Bezüge zahlen</td></tr>
<tr><td>Rückzahlung von Fortbildungskosten</td><td>🟡 Nur mit gestaffelter, angemessener Bindungsdauer zulässig</td></tr>
<tr><td>Dynamische Bezugnahme auf Tarifvertrag</td><td>🟢 Meist gut — sichert künftige Tariferhöhungen</td></tr></table>
<h5>Befristung: die häufigste Falle</h5>
<p>Ohne Sachgrund ist eine Befristung nur bis zu <strong>2 Jahre</strong> zulässig und nur, wenn man <em>noch nie</em> bei diesem Arbeitgeber beschäftigt war (Vorbeschäftigungsverbot). Jede Verlängerung muss <em>vor</em> Ablauf und schriftlich erfolgen — wer nach Fristende einfach weiterarbeitet, hat oft unbemerkt einen unbefristeten Vertrag. Kettenbefristungen mit Sachgrund sind möglich, werden aber von Gerichten als Rechtsmissbrauch gekippt, wenn sie über Jahre laufen.</p>
<h5>Vergütung & Überstunden lesbar machen</h5>
<p>Variable Vergütung nur akzeptieren, wenn die Zielsystematik beschrieben ist — „nach billigem Ermessen“ ist ein Blankoscheck. Bei Überstundenpauschalen auf eine Zahl bestehen („bis zu 10 Std./Monat sind abgegolten“); alles darüber ist zu vergüten oder in Freizeit auszugleichen. Faustregel für die Bewertung eines Angebots: das Bruttojahresgehalt durch 12 — und mit dem Brutto-Netto-Überschlag (anderer Rechner im Magazin) auf das Monatsnetto umrechnen, bevor man Angebote vergleicht.</p>
<h5>Was im Vertrag fehlen darf</h5>
<p>Nicht alles muss im Vertrag stehen (Gesetze und ggf. Tarifvertrag gelten ohnehin), aber das Nachweisgesetz verpflichtet den Arbeitgeber, die wesentlichen Bedingungen schriftlich zu dokumentieren — seit der Verschärfung auch Arbeitszeit, Pausen, Fortbildungsanspruch und das Verfahren bei Kündigung. Fehlt das, kann ein Bußgeld gegen den Arbeitgeber drohen. Unten im Tool: die gesetzlichen Kündigungsfristen nach Betriebszugehörigkeit als schnelle Orientierung.</p>`, tool: "kfrist" },

gehalt: { h: `
<h5>Marktwert ermitteln wie ein Profi</h5>
<p>Drei Quellen mitteln: Gehaltsreports der Jobportale, Entgeltatlas der Bundesagentur (echte SV-Daten!), und 2–3 Gespräche im eigenen Netzwerk („Welche Spanne ist bei euch für Rolle X üblich?“ fragt sich leichter als „Was verdienst du?“). Auf Region, Firmengröße und Branche normieren — dieselbe Rolle streut locker ±30 %.</p>
<h5>Die Verhandlung selbst</h5>
<p>Anker setzen: Wer zuerst eine fundierte Zahl nennt, definiert den Rahmen — die eigene Zielzahl gehört ans obere Ende der recherchierten Spanne. Begründung immer über <em>Beitrag</em>, nie über Bedarf („Miete gestiegen“ ist kein Argument, „Verantwortung um X gewachsen, Ergebnis Y geliefert“ schon). Schweigen aushalten. Bei „kein Budget“: Paket verhandeln — Weiterbildungsbudget, zusätzliche Urlaubstage, Bonus, früherer nächster Gehaltstermin <em>mit schriftlich fixiertem Kriterium</em>.</p>
<h5>Timing & Turnus</h5>
<p>Beste Zeitpunkte: nach messbarem Erfolg, vor Budgetplanung (oft Q3/Q4), bei Aufgabenerweiterung. Jahresgespräch ist Pflichttermin, nicht einziger Termin. Realistische Sprünge: intern 3–8 %, bei Beförderung 10–15 %, bei Arbeitgeberwechsel 10–25 %. Unten der Brutto-Netto-Überschlag, um Angebote vergleichbar zu machen.</p>
<h5>Rechenbeispiel: Wechsel schlägt Treue</h5>
<p>Bei 48.000 € Jahresbrutto bringt eine interne Erhöhung von 5 % rund 2.400 € mehr — ein Wechsel mit +18 % rund 8.640 €. Über zehn Jahre wirkt der einmalige Sprung als Basis für jede künftige Steigerung wie ein Zinseszins. Genau deshalb ist die schwächste Verhandlungsposition die, die nie verhandelt. Den Brutto-Netto-Überschlag (Rechner unten) immer auf beide Angebote anwenden — 18 % brutto sind nicht 18 % netto.</p>
<h5>Vorsicht beim Gegenangebot</h5>
<p>Kontert der aktuelle Arbeitgeber nach einer Kündigung mit mehr Geld, ist Skepsis angebracht: Studien zeigen, dass viele „Geretteten“ binnen 12 Monaten doch gehen — die Gründe für den Wechsel waren selten nur das Gehalt. Ein Gegenangebot ist legitim, aber kein Ersatz für die ehrliche Frage, warum man überhaupt suchen war.</p>
`, tool: "netto" },

kuendigung: { h: `<h5>Die ersten 72 Stunden</h5>
<p>1. <strong>Sofort</strong> arbeitsuchend melden (spätestens 3 Tage nach Kenntnis, sonst Sperrzeit-Risiko) — online genügt zunächst. 2. Kündigung auf Form prüfen: Schriftform mit Originalunterschrift ist Pflicht, E-Mail/WhatsApp sind unwirksam. 3. Frist notieren: <strong>Kündigungsschutzklage nur innerhalb von 3 Wochen</strong> ab Zugang — danach gilt die Kündigung als wirksam, selbst wenn sie es nicht war. 4. Nichts unterschreiben (Aufhebungsvertrag, „Ausgleichsquittung“) ohne Prüfung.</p>
<h5>Fristen & Sperrzeit auf einen Blick</h5>
<table class="ptable"><tr><th>Situation</th><th>Folge</th></tr>
<tr><td>Arbeitgeber kündigt (betriebs-/personenbedingt)</td><td>Kein Sperrzeit-Risiko; ALG nach Fristablauf</td></tr>
<tr><td>Eigenkündigung ohne wichtigen Grund</td><td>Sperrzeit bis 12 Wochen</td></tr>
<tr><td>Aufhebungsvertrag</td><td>Regelmäßig 12 Wochen Sperrzeit — nur mit Abfindung und Beratung erwägen</td></tr>
<tr><td>Kündigungsschutzklage</td><td>Frist 3 Wochen ab Zugang, sonst verloren</td></tr></table>
<h5>Abfindung: Mythos und Realität</h5>
<p>Einen gesetzlichen Abfindungsanspruch gibt es im Normalfall nicht — Abfindungen sind Verhandlungsergebnis, meist im Kündigungsschutzprozess. Faustformel als Verhandlungsbasis: <strong>0,5 Bruttomonatsgehälter pro Beschäftigungsjahr</strong>; je schwächer die Kündigungsgründe, desto mehr ist drin. Steuerlich kann die Fünftelregelung die Last mildern. Eine Rechtsschutzversicherung mit Arbeitsrecht-Baustein zahlt sich genau hier aus — sie muss aber vor dem Konflikt bestehen.</p>
<h5>Arbeitszeugnis entschlüsseln</h5>
<table class="ptable"><tr><th>Formulierung</th><th>Bedeutung</th></tr>
<tr><td>„stets zur vollsten Zufriedenheit“</td><td>sehr gut</td></tr>
<tr><td>„stets zur vollen Zufriedenheit“</td><td>gut</td></tr>
<tr><td>„zur vollen Zufriedenheit“</td><td>befriedigend</td></tr>
<tr><td>„stets bemüht“</td><td>mangelhaft (Warnsignal)</td></tr></table>
<p>Anspruch besteht auf ein wohlwollendes qualifiziertes Zeugnis; Note „gut“ ist faktisch Standard — schlechter muss der Arbeitgeber begründen. Resturlaub wird genommen oder ausgezahlt, ebenso Überstundenguthaben. Unten: ALG-I-Rechner für Höhe und Bezugsdauer.</p>`, tool: "alg" },

selbststaendig: { h: `
<h5>Rechtsform in 2 Minuten</h5>
<table class="ptable"><tr><th>Form</th><th>Kosten/Aufwand</th><th>Haftung</th></tr>
<tr><td>Einzelunternehmen</td><td>~0 €, Gewerbeanmeldung 20–60 €</td><td>privat, unbeschränkt</td></tr>
<tr><td>Freiberufler</td><td>0 €, nur Finanzamt-Fragebogen</td><td>privat, aber keine Gewerbesteuer/IHK</td></tr>
<tr><td>UG (haftungsbeschränkt)</td><td>ab 1 € Kapital + Notar, Bilanzpflicht</td><td>auf Gesellschaftsvermögen beschränkt</td></tr>
<tr><td>GmbH</td><td>25.000 € Kapital (12.500 € einzahlen)</td><td>beschränkt, höchste Reputation</td></tr></table>
<h5>Die unterschätzten Pflichten</h5>
<p><strong>Krankenversicherung selbst zahlen</strong> (GKV freiwillig: Beitrag nach Einkommen, Mindestbeitrag auch bei wenig Gewinn). <strong>Scheinselbstständigkeit</strong> vermeiden: nur ein Auftraggeber + Weisungsgebundenheit = Risiko Nachzahlung aller SV-Beiträge; Statusfeststellung bei der DRV schafft Sicherheit. <strong>Kleinunternehmerregelung</strong> (keine USt bis zur Umsatzgrenze) spart Bürokratie, kostet aber Vorsteuerabzug — bei B2B-Kunden meist Verzicht sinnvoll.</p>
<h5>Finanzplanung für das Jahr 1</h5>
<p>Privatentnahme-Bedarf × 12 + Puffer = Mindestumsatzziel; davon gehen grob 30–45 % an Steuern und KV ab. Stundensatz-Formel: (Wunsch-Jahresbrutto + Kosten + Vorsorge) ÷ fakturierbare Stunden (realistisch 1.000–1.200/Jahr, nicht 1.800). Gründungszuschuss der AfA: aus ALG-I-Bezug heraus 6 Monate ALG + 300 €, danach optional 9 × 300 € — Antrag vor Gründung stellen.</p>
<h5>Die 3-Konten-Regel gegen die Steuerfalle</h5>
<p>Größter Anfängerfehler: Umsatz für Einkommen halten. Drei getrennte Konten schaffen Ruhe — Geschäftskonto (Eingänge), Steuer-/Rücklagenkonto (sofort 30–45 % jedes Eingangs hierhin) und Privatkonto (feste monatliche Entnahme). Vorauszahlungen ans Finanzamt kommen ab dem zweiten Jahr quartalsweise; wer vorsorgt, wird davon nicht überrascht. Umsatzsteuer ist ein durchlaufender Posten — nie als eigenes Geld betrachten.</p>
<h5>Stundensatz statt Bauchgefühl</h5>
<p>Der häufigste Fehler ist ein zu niedriger Satz, weil mit 1.800 Arbeitsstunden statt 1.000–1.200 <em>fakturierbaren</em> gerechnet wird. Der Rechner unten kalkuliert aus Wunscheinkommen, Betriebskosten und Vorsorge den nötigen Netto-Stundensatz — die Basis jeder Angebotskalkulation.</p>
` },

neuorientierung: { h: `
<h5>Wechsel-Diagnose: Job, Rolle oder Beruf?</h5>
<p>Drei verschiedene Probleme, drei verschiedene Lösungen: Stört das <em>Umfeld</em> (Chef, Kultur) → Arbeitgeberwechsel reicht. Stört der <em>Zuschnitt</em> (zu wenig Verantwortung, falsche Aufgaben) → interne Rotation oder Rollenwechsel. Stört der <em>Inhalt</em> selbst → echter Berufswechsel. Wer das nicht trennt, wechselt teuer den Beruf, obwohl ein Teamwechsel gereicht hätte.</p>
<h5>Der risikoarme Quereinstieg</h5>
<p>Brückenstrategie statt Sprung: 1. Zielfeld in der Freizeit testen (Projekt, Ehrenamt, Nebengewerbe). 2. Übertragbare Skills inventarisieren — Projektleitung, Kundenkontakt, Datenarbeit zählen überall. 3. Brückenrolle suchen, die alte Branche mit neuer Funktion verbindet (oder alte Funktion mit neuer Branche — nie beides gleichzeitig wechseln). 4. Erst kündigen, wenn Vertrag oder 6-Monats-Puffer steht.</p>
<h5>Geförderte Umschulung</h5>
<p>Bei Arbeitslosigkeit oder gesundheitlich erzwungenem Wechsel: Bildungsgutschein der Agentur für Arbeit deckt Umschulungskosten, bei beruflicher Reha (z. B. Rücken raus aus der Pflege) ist die DRV zuständig — inklusive Übergangsgeld. Verkürzte Umschulungen (2 statt 3 Jahre) mit IHK-Abschluss sind der Standardweg. Ab 45 wird Erfahrung zum Verkaufsargument: Senior-Quereinsteiger punkten mit Stabilität und Netzwerk — im Anschreiben genau so rahmen.</p>
<h5>90-Tage-Plan für den Wechsel</h5>
<table class="ptable"><tr><th>Phase</th><th>Fokus</th></tr>
<tr><td>Tag 1–30</td><td>Diagnose (Job/Rolle/Beruf?), Skills inventarisieren, 5 Zielprofile recherchieren</td></tr>
<tr><td>Tag 31–60</td><td>Test im Kleinen (Projekt/Ehrenamt/Kurs), 10 Gespräche im Zielfeld führen</td></tr>
<tr><td>Tag 61–90</td><td>Unterlagen auf Zielrolle zuschneiden, Brückenrollen bewerben, Puffer sichern</td></tr></table>
<p>Erst kündigen, wenn Vertrag oder mindestens ein 6-Monats-Puffer steht — nie beide Variablen (Funktion und Branche) gleichzeitig wechseln.</p>
` },
/* ---------- FINANZEN ---------- */
budget: { h: `
<h5>Das Kontenmodell, das sich selbst steuert</h5>
<p>Vier Töpfe: <strong>Gehaltskonto</strong> (alles landet hier), <strong>Fixkostenkonto</strong> (Miete, Strom, Versicherungen — alle Daueraufträge laufen nur hier), <strong>Spaßkonto</strong> (Wochenbudget per Dauerauftrag, gern mit eigener Karte) und <strong>Sparkonto/Depot</strong>. Am Tag nach Gehaltseingang verteilen automatische Daueraufträge alles — Budgetdisziplin wird zur Voreinstellung statt zur Willensfrage. Wer nur vom Spaßkonto zahlt, kann faktisch nicht überziehen.</p>
<h5>50/30/20 ehrlich anwenden</h5>
<p>50 % Fixes, 30 % Wünsche, 20 % Sparen ist Richtwert, kein Gesetz: In teuren Städten sind 60/25/15 realistisch — entscheidend ist, dass die Sparquote <em>vor</em> dem Konsum abgeht („Pay yourself first“). Unter 10 % Sparquote ist ein Warnsignal, über 30 % bei normalem Einkommen oft Lebensqualitätsverzicht ohne Not.</p>
<h5>Die Ausgaben-Inventur (1× im Quartal, 30 Minuten)</h5>
<p>Kontoauszüge der letzten 3 Monate exportieren, drei Marker: grün = bewusst und gut, gelb = Gewohnheit prüfen, rot = sofort kündigen/wechseln. Klassische Rot-Kandidaten: ungenutzte Abos, überteuerte Handyverträge (Altverträge!), doppelte Versicherungen, Dispozinsen. Allein Strom-, Handy- und KFZ-Versicherungswechsel sparen typischen Haushalten dreistellig pro Jahr.</p>
<h5>Beispiel-Aufteilung bei 2.500 € netto</h5>
<table class="ptable"><tr><th>Topf</th><th>Anteil</th><th>Betrag</th></tr>
<tr><td>Fixkosten (Miete, Strom, Versicherungen, ÖPNV)</td><td>55 %</td><td>1.375 €</td></tr>
<tr><td>Wünsche (Essen gehen, Hobbys, Reisen)</td><td>25 %</td><td>625 €</td></tr>
<tr><td>Sparen/Tilgen (zuerst!)</td><td>20 %</td><td>500 €</td></tr></table>
<p>In teuren Städten verschiebt sich das zu 60/25/15 — solange die Sparrate <em>automatisch zuerst</em> abgeht.</p>
<h5>Reihenfolge zur finanziellen Stabilität</h5>
<p>1. Mini-Notgroschen (1 Monatsausgabe). 2. Teure Schulden (Dispo, Kreditkarte) tilgen. 3. Notgroschen voll (3–6 Monate). 4. Arbeitgeber-Zulagen/Förderung mitnehmen (vermögenswirksame Leistungen, Riester nur wenn Förderquote hoch). 5. Breit gestreut investieren (ETF-Sparplan). Diese Treppe schlägt jede komplizierte Optimierung.</p>
`, tool: "budget" },

notgroschen: { h: `
<h5>Wie groß muss er wirklich sein?</h5>
<p>Basis sind die <em>Ausgaben</em>, nicht das Einkommen: 3 Netto-Monatsausgaben für Angestellte in sicheren Jobs mit Doppelverdiener-Haushalt, 6 für Alleinverdiener, Familien und Mieter mit hohen Fixkosten, 9–12 für Selbstständige mit schwankendem Einkommen. Wohneigentümer addieren einen Instandhaltungspuffer (Heizung, Dach) separat dazu.</p>
<h5>Wo er liegt — und wo nicht</h5>
<p>Tagesgeldkonto bei einer anderen Bank als dem Girokonto (psychologische Distanz, trotzdem täglich verfügbar). Zinsen mitnehmen, aber nicht hinterherjagen — der Notgroschen ist Versicherung, kein Investment. <strong>Nicht</strong> ins Depot (Crash kommt gern zeitgleich mit Jobverlust), nicht in Festgeld, nicht in die Sofa-Ritze des Girokontos, wo er „aus Versehen“ ausgegeben wird.</p>
<h5>Aufbau- und Nachfüll-Protokoll</h5>
<p>Aufbau: fester Dauerauftrag am Monatsanfang, Sondertilgungen aus Steuererstattung, Bonus, Verkäufen. Erst Notgroschen-Minimum (1 Monatsausgabe), dann teure Schulden tilgen, dann Notgroschen voll, dann investieren. Nach jeder Entnahme gilt: Sparrate fürs Depot pausiert, bis der Puffer wieder voll ist — diese Regel vorab schriftlich festlegen, sonst gewinnt die Bequemlichkeit.</p>
<h5>Beispiel: Wie viel für wen?</h5>
<table class="ptable"><tr><th>Lebenslage</th><th>Monatsausgaben</th><th>Richtwert</th></tr>
<tr><td>Angestellt, sicherer Job, zu zweit</td><td>3 ×</td><td>oft genug</td></tr>
<tr><td>Alleinverdiener-Familie, zur Miete</td><td>6 ×</td><td>Standard</td></tr>
<tr><td>Selbstständig, schwankendes Einkommen</td><td>9–12 ×</td><td>Pflicht</td></tr>
<tr><td>Wohneigentum</td><td>+ Instandhaltungspuffer</td><td>separat</td></tr></table>
<p>Bei 2.000 € Monatsausgaben sind das 6.000–12.000 €. Lieber klein anfangen und konsequent auffüllen als auf die perfekte Summe zu warten.</p>
`, tool: "notgroschen" },

etf: { h: `
<h5>Das Weltportfolio in einer Zeile</h5>
<p>Ein einziger weltweit streuender Aktien-ETF (z. B. auf einen All-World-Index mit &gt;3.000 Firmen) genügt für die meisten Privatanleger — alles Weitere ist Optimierung am Rand. Auswahlkriterien: Fondsvolumen &gt;500 Mio. €, laufende Kosten (TER) unter ~0,25 %, physisch replizierend, thesaurierend für den Vermögensaufbau. Der Sparplan ab 25 €/Monat schlägt das Warten auf den „richtigen Zeitpunkt“: Zeit im Markt schlägt Markt-Timing.</p>
<h5>Risiko richtig dosieren</h5>
<p>Die einzige Stellschraube, die zählt, ist die Aktienquote: Geld, das in &lt;10 Jahren gebraucht wird, gehört nicht in Aktien. Faustformel: erwartbare zwischenzeitliche Verluste von −50 % müssen aushaltbar sein — wer bei −30 % verkauft, macht aus Buchverlust echten Verlust. Rebalancing 1× jährlich reicht.</p>
<h5>Steuern & Kosten im Blick</h5>
<p>Freistellungsauftrag stellen (Sparerpauschbetrag nutzen), Vorabpauschale bei Thesaurierern ist normal und klein. Depot beim günstigen Broker, Sparplanausführung kostenlos. Finger weg von: aktiv gemanagten Fonds mit Ausgabeaufschlag, Einzelaktien-Zockerei als Hauptstrategie, Krypto als Altersvorsorge, allem mit „garantiert“ und „exklusiv“. Unten: der Zinseszins-Rechner — das wirkungsvollste Motivationswerkzeug der Finanzwelt.</p>
<h5>Sparplan-Beispiel: der Zinseszins arbeitet</h5>
<p>200 €/Monat über 30 Jahre = 72.000 € eingezahlt. Bei rund 6 % langfristiger Durchschnittsrendite werden daraus grob 195.000 € — mehr als das Doppelte ist Zinseszins, nicht Einzahlung. Startet man dieselbe Rate erst nach 10 Jahren, fehlen am Ende rund 100.000 €. Die teuerste Entscheidung ist das Warten. Der Zinseszins-Rechner unten macht den Effekt mit eigenen Zahlen sichtbar — gut gegen den inneren Aufschieber.</p>
`, tool: "zins" },

steuern: { h: `
<h5>Lohnt sich die Erklärung? (Spoiler: meistens ja)</h5>
<p>Durchschnittliche Erstattung liegt um die 1.000 €. Pflicht zur Abgabe u. a. bei Steuerklassen-Kombi 3/5, Nebeneinkünften &gt;410 €, Kurzarbeiter-/Elterngeld (Progressionsvorbehalt). Freiwillige Abgabe geht 4 Jahre rückwirkend — wer nie abgegeben hat, kann mehrere Jahre auf einmal nachholen.</p>
<h5>Die Pauschalen-Treppe</h5>
<p>Arbeitnehmer-Pauschbetrag wird automatisch abgezogen — interessant wird es <em>darüber</em>: Pendlerpauschale (0,30 €/km einfache Strecke, ab dem 21. km mehr), Homeoffice-Pauschale (6 €/Tag), Arbeitsmittel, Fortbildungen, Bewerbungskosten, Umzug aus beruflichem Anlass (Pauschale!), doppelte Haushaltsführung. Dazu: Handwerkerleistungen (20 % der Lohnkosten direkt von der Steuer), haushaltsnahe Dienstleistungen, Spenden, Krankheitskosten über der zumutbaren Belastung.</p>
<h5>Workflow für 2 Stunden im Jahr</h5>
<p>Ein Mailordner + ein Papierfach „Steuer JJJJ“, alles ungefiltert hinein. Erklärung mit ELSTER (kostenlos) oder Steuersoftware (~20–40 €, führt durch Interviews und findet Pauschalen). Bescheid <em>immer</em> prüfen: 4 Wochen Einspruchsfrist, formloser Einspruch genügt. Unten: Pendler- & Homeoffice-Rechner für den schnellen Überschlag, ob sich Belegesammeln über die Pauschale hinaus lohnt.</p>
<h5>Oft vergessene Posten</h5>
<table class="ptable"><tr><th>Posten</th><th>Hinweis</th></tr>
<tr><td>Handwerkerleistungen</td><td>20 % der Lohnkosten direkt von der Steuer (nicht Material), unbar zahlen</td></tr>
<tr><td>Haushaltsnahe Dienstleistungen</td><td>Reinigung, Garten, Umzug — 20 % der Lohnkosten</td></tr>
<tr><td>Arbeitszimmer/Homeoffice-Pauschale</td><td>6 €/Tag, gedeckelt</td></tr>
<tr><td>Fortbildung, Fachbücher, Bewerbungen</td><td>Werbungskosten, Belege sammeln</td></tr>
<tr><td>Spenden, Kinderbetreuung, Krankheitskosten</td><td>je nach Grenze absetzbar</td></tr></table>
<h5>Fristen merken</h5>
<p>Pflichtveranlagung: Abgabe bis 31. Juli des Folgejahres (mit Steuerberatung später). Freiwillige Abgabe: rückwirkend 4 Jahre. Einspruch gegen den Bescheid: 1 Monat ab Bekanntgabe, formlos. Wer unsicher ist, gibt lieber freiwillig ab — eine Nachzahlung droht bei freiwilliger Abgabe praktisch nie, eine Erstattung dafür oft.</p>
`, tool: "pendler" },

versicherungen: { h: `<h5>Die Prioritätenpyramide</h5>
<table class="ptable"><tr><th>Stufe</th><th>Versicherung</th><th>Merksatz</th></tr>
<tr><td>Existenziell</td><td>Privathaftpflicht (Deckung ≥ 10 Mio. €)</td><td>~5 €/Monat gegen Millionenrisiko — Pflichtkür Nr. 1</td></tr>
<tr><td>Existenziell</td><td>Berufsunfähigkeit</td><td>Arbeitskraft ist das größte Vermögen; jung abschließen = günstig</td></tr>
<tr><td>Existenziell</td><td>Kranken-/Pflegepflicht</td><td>gesetzlich ohnehin Pflicht</td></tr>
<tr><td>Situativ</td><td>Risikoleben (Familie/Kredit), Hausrat, Wohngebäude, KFZ-Haftpflicht, Auslandsreisekranken</td><td>nur wenn die Lebenslage zutrifft</td></tr>
<tr><td>Meist verzichtbar</td><td>Handy-, Brillen-, Glas-, Reisegepäck-, Sterbegeld-, Restschuldversicherung</td><td>kleine Schäden selbst tragen</td></tr></table>
<h5>Die goldene Regel</h5>
<p>Versichert werden Risiken, die einen <em>ruinieren</em> können — nicht solche, die nur ärgern. Und: Versichern und Sparen trennen. Kapitalbildende Lebensversicherungen vermischen beides teuer; reiner Risikoschutz plus separater ETF-Sparplan ist fast immer überlegen und flexibler.</p>
<h5>Deckungssummen — Richtwerte</h5>
<table class="ptable"><tr><th>Versicherung</th><th>Sinnvolle Größenordnung</th></tr>
<tr><td>Privathaftpflicht</td><td>10–50 Mio. € pauschal, mit Forderungsausfalldeckung</td></tr>
<tr><td>Berufsunfähigkeit</td><td>ca. 80 % des Nettos als Monatsrente (siehe Rechner unten)</td></tr>
<tr><td>Risikolebensversicherung</td><td>3–5 Jahresnettoeinkommen bzw. Restschuld des Kredits</td></tr>
<tr><td>Hausrat</td><td>ca. 650 €/m² Wohnfläche — Unterversicherung vermeiden</td></tr></table>
<h5>Berufsunfähigkeit: worauf es ankommt</h5>
<p>Die gesetzliche Erwerbsminderungsrente reicht selten und sichert nicht den erlernten Beruf. Eine private BU sollte enthalten: <strong>Verzicht auf abstrakte Verweisung</strong>, Leistung ab 50 % BU, Nachversicherungsgarantie und weltweiten Schutz. Gesundheitsfragen vollständig und ehrlich beantworten — Falschangaben kosten im Leistungsfall den Schutz. Der Rechner unten schätzt den nötigen Rentenbetrag.</p>
<h5>Die häufigsten stillen Lücken & Pflege-Termine</h5>
<p>Unterversicherung beim Hausrat und veraltete BU-Summen sind die häufigsten unbemerkten Risiken. Jährlich: KFZ kündigen/wechseln (Stichtag meist 30.11.), Beitragserhöhungen prüfen — sie lösen ein Sonderkündigungsrecht aus. Bei Lebensereignissen (Umzug, Heirat, Kind, Hausbau) den Bestand anpassen. Vor Neuabschluss immer prüfen, ob ein Risiko schon woanders mitversichert ist (z. B. Kinder in der Familienhaftpflicht, Studierende über die Eltern).</p>` },

vorsorge: { h: `
<h5>Die drei Säulen — und was sie realistisch leisten</h5>
<p><strong>Gesetzliche Rente:</strong> Fundament, aber Standardrente liegt deutlich unter dem letzten Netto — die Lücke ist der Normalfall, nicht die Ausnahme. <strong>Betrieblich (bAV):</strong> lohnt fast immer, wenn der Arbeitgeber kräftig zuzahlt (Pflichtzuschuss 15 %, gute Arbeitgeber geben 20–50 %); bei Jobwechseln auf Mitnahme achten. <strong>Privat:</strong> ETF-Sparplan als flexibler Kern; Riester/Rürup nur in Spezialfällen (hohe Zulagenquote bei Kindern bzw. Selbstständige mit hohem Steuersatz) — Kosten der Produkte genau prüfen.</p>
<h5>Renteninformation lesen lernen</h5>
<p>Der jährliche Brief der DRV nennt drei Zahlen: erreichte Anwartschaft, Hochrechnung bei Weiterzahlung, Erwerbsminderungsrente. Wichtig: Die Hochrechnung ist <em>vor</em> Inflation und vor Steuern/KV-Beiträgen — real verfügbar ist deutlich weniger. Kontenklärung ab 43 beantragen: fehlende Zeiten (Ausbildung, Kindererziehung, Ausland) jetzt belegen, nicht mit 66.</p>
<h5>Wieviel sparen?</h5>
<p>Faustregel: 10–15 % vom Netto für die Altersvorsorge, je später der Start, desto mehr. Jedes Jahrzehnt Verzögerung verdoppelt grob die nötige Sparrate — der Rechner unten zeigt, was die eigene Rate im Alter ergibt und wie groß die Lücke noch ist.</p>
<h5>Rechenbeispiel: die Lücke sichtbar machen</h5>
<p>Letztes Netto 2.500 €, gesetzliche Rente vielleicht 1.300 € — Lücke 1.200 €/Monat. Um daraus eine lebenslange Zusatzrente zu erzeugen, braucht es grob das 300- bis 400-Fache als Kapital (4-%-Entnahmeregel zzgl. Puffer), also rund 360.000–430.000 €. Klingt viel — mit 30 Jahren Anlauf und einem ETF-Sparplan ist es eine dreistellige Monatsrate, mit 50 ein Vielfaches. Genau das zeigt der Renten-Rechner unten: früh anfangen schlägt viel sparen.</p>
`, tool: "rentenluecke" },

schulden: { h: `
<h5>Triage: Welche Schuld zuerst?</h5>
<p>Reihenfolge nach Eskalationsrisiko, dann nach Zins: 1. Alles, was Wohnung, Strom oder Strafverfahren bedroht (Mietrückstand, Energieschulden, Geldstrafen). 2. Dispo & Kreditkartenschulden (oft 8–12 % — sofort in günstigeren Ratenkredit umschulden). 3. Konsumkredite nach Zinshöhe (Avalanche-Methode rechnerisch optimal; Snowball — kleinste Schuld zuerst — psychologisch oft erfolgreicher: beides ist legitim, dranbleiben zählt).</p>
<h5>Verhandeln statt verstecken</h5>
<p>Gläubiger wollen Geld, keine Akten: Wer <em>vor</em> der Mahnung anruft und eine realistische Rate anbietet, bekommt fast immer Stundung oder Vergleich. Jede Vereinbarung schriftlich. Inkassoforderungen prüfen (Forderung berechtigt? Gebühren überhöht?) — Musterbriefe der Verbraucherzentralen nutzen. Mahnbescheid nie ignorieren: Widerspruch binnen 2 Wochen, sonst wird auch Unberechtigtes vollstreckbar.</p>
<h5>Das Sicherheitsnetz</h5>
<p>P-Konto einrichten schützt das Existenzminimum vor Pfändung. Staatlich anerkannte Schuldnerberatung (Caritas, Diakonie, AWO, Kommunen) ist kostenlos — Wartezeit überbrücken mit Gläubigerliste und Haushaltsplan. Letzter Ausweg Privatinsolvenz: nach 3 Jahren restschuldbefreit, danach Neustart. Unten: Tilgungsrechner — zeigt, wie stark schon 50 € mehr Rate die Laufzeit verkürzen.</p>
<h5>Avalanche vs. Snowball am Beispiel</h5>
<p>Drei Schulden: 2.000 € zu 12 %, 800 € zu 6 %, 400 € zu 0 %. <strong>Avalanche</strong> tilgt zuerst die 12 %-Schuld — rechnerisch die geringsten Gesamtzinsen. <strong>Snowball</strong> tilgt zuerst die 400 € — der schnelle Erfolg motiviert zum Dranbleiben. Beide funktionieren; der Tilgungsrechner unten zeigt, wie stark schon 50 € mehr Monatsrate die Laufzeit verkürzen.</p>
<h5>P-Konto: was geschützt ist</h5>
<p>Jedes Girokonto lässt sich kostenlos in ein Pfändungsschutzkonto umwandeln. Geschützt ist ein monatlicher Grundfreibetrag (mit Bescheinigung höher bei Unterhaltspflichten/Sozialleistungen). Wichtig: rechtzeitig umwandeln — der Schutz wirkt nicht rückwirkend auf bereits gepfändete Beträge. Die kostenlose Schuldnerberatung hilft auch bei der Einrichtung.</p>
`, tool: "tilgung" },

schufa: { h: `<h5>Was wirklich im Score steckt</h5>
<p>Gespeichert werden Konten, Karten, Kredite, Verträge mit Zahlungsausfallrisiko (Handy!), Mahn-/Inkassodaten nach bestimmten Regeln und Anfragen. <em>Nicht</em> gespeichert: Einkommen, Vermögen, Beruf, Nationalität. Score-Gift sind harte Negativmerkmale (titulierte Forderungen, Insolvenz), viele Kredit<em>anfragen</em> in kurzer Zeit und häufige Kontowechsel; score-freundlich sind langjährige, unauffällige Konten und wenige Karten.</p>
<h5>Mythen-Check</h5>
<table class="ptable"><tr><th>Behauptung</th><th>Stimmt das?</th></tr>
<tr><td>„Die Wohngegend beeinflusst den Score.“</td><td>🔴 Nein — Geodaten sind als alleiniges Kriterium unzulässig</td></tr>
<tr><td>„Ein Dispo verschlechtert automatisch den Score.“</td><td>🟡 Nur dauerhafte Überziehung fällt negativ auf</td></tr>
<tr><td>„Viele Konten = besser.“</td><td>🔴 Eher umgekehrt — wenige, lang geführte Konten sind besser</td></tr>
<tr><td>„Selbstauskunft schadet dem Score.“</td><td>🟢 Nein, die eigene Abfrage ist neutral</td></tr></table>
<h5>Die zwei magischen Begriffe</h5>
<p>Bei Kreditvergleichen immer „<strong>Konditionsanfrage</strong>“ statt „Kreditanfrage“ — erstere ist score-neutral, letztere kann ihn drücken. Und: einmal jährlich die <strong>kostenlose Datenkopie nach Art. 15 DSGVO</strong> anfordern (nicht das Bezahlprodukt) und auf Fehler prüfen.</p>
<h5>Löschfristen kennen</h5>
<table class="ptable"><tr><th>Eintrag</th><th>Löschung</th></tr>
<tr><td>Erledigte Forderung (beglichen)</td><td>i. d. R. nach 3 Jahren (Jahresende)</td></tr>
<tr><td>Kredit nach Rückzahlung</td><td>3 Jahre nach Abschluss</td></tr>
<tr><td>Anfragen (Konditionsanfrage)</td><td>für Dritte unsichtbar, intern ~12 Monate</td></tr>
<tr><td>Konto/Verträge nach Auflösung</td><td>3 Jahre</td></tr></table>
<h5>Score-Reha in 12 Monaten</h5>
<p>Offene Kleinforderungen sofort begleichen (schnelle Zahlung kann frühere Löschung ermöglichen), ungenutzte Konten/Karten schließen, Dispo selten nutzen, Rechnungen per Lastschrift automatisieren. Für die Wohnungssuche: Die Bonitätsauskunft für Vermieter zeigt nur das Nötige — die vollständige Datenkopie gehört nie in fremde Hände.</p>` },

/* ---------- WOHNEN ---------- */
erstewohnung: { h: `
<h5>Die wahren Kosten vor dem Einzug</h5>
<p>Kaution (max. 3 Nettokaltmieten, zahlbar in 3 Raten!), ggf. Genossenschaftsanteile, Umzug, Erstausstattung (gebraucht spart 70 %: Küchen aus Wohnungsauflösungen sind die beste Quelle), doppelte Miete im Übergangsmonat. Budgetregel: Warmmiete ≤ 30–35 % des Nettos — der Rechner unten zeigt die persönliche Quote und was sie für den Spielraum bedeutet.</p>
<h5>Mietvertrag: die 5 Prüfpunkte</h5>
<p>1. <strong>Schönheitsreparaturen:</strong> starre Fristen („alle 3 Jahre streichen“) sind unwirksam; unrenoviert übernommen = meist keine Renovierungspflicht beim Auszug. 2. <strong>Staffel-/Indexmiete</strong> erkennen — Index koppelt an Inflation. 3. <strong>Kleinreparaturklausel</strong> nur mit Obergrenze pro Fall (~100–120 €) und Jahresdeckel wirksam. 4. <strong>Befristung</strong> braucht einen gesetzlichen Grund. 5. Übergabeprotokoll mit Fotos — beweissicher für beide Seiten.</p>
<h5>Rechte, die Geld wert sind</h5>
<p>Mängel (Schimmel, Heizungsausfall) schriftlich melden + Frist setzen = Mietminderungsrecht ab Zugang der Anzeige. Mieterhöhungen auf Mietspiegel-Konformität prüfen (Kappungsgrenzen!). Kaution muss verzinst angelegt werden und ist nach Auszug binnen angemessener Frist (Richtwert 3–6 Monate) abzurechnen. Mitgliedschaft im Mieterverein (~90 €/Jahr) amortisiert sich oft mit einem einzigen Fall.</p>
<h5>Erstausstattung mit Budget</h5>
<table class="ptable"><tr><th>Bereich</th><th>Gebraucht/sparsam</th><th>Hinweis</th></tr>
<tr><td>Küche & Großgeräte</td><td>200–600 €</td><td>Wohnungsauflösungen, Energielabel beachten</td></tr>
<tr><td>Bett & Matratze</td><td>150–400 €</td><td>Matratze neu kaufen (Hygiene)</td></tr>
<tr><td>Sofa, Tisch, Schränke</td><td>150–500 €</td><td>Kleinanzeigen, Sozialkaufhaus</td></tr>
<tr><td>Lampen, Vorhänge, Kleinkram</td><td>100–250 €</td><td>oft unterschätzt</td></tr></table>
<h5>Die Bewerbungsmappe für Vermieter</h5>
<p>Wer komplett auftritt, gewinnt das Rennen um knappe Wohnungen: Selbstauskunft, Einkommensnachweise (3 Gehaltsabrechnungen), Mietschuldenfreiheitsbestätigung des Vorvermieters, Bonitätsauskunft (nur die Vermieter-Version, nicht die volle Datenkopie) und ggf. eine Bürgschaft. Alles als ein sauberes PDF — beim Besichtigungstermin direkt übergeben.</p>
`, tool: "miete" },

umzug: { h: `<h5>Countdown-Plan</h5>
<table class="ptable"><tr><th>Wann</th><th>Was</th></tr>
<tr><td>3 Monate vorher</td><td>Alte Wohnung kündigen (Frist!), Umzugstag festlegen, ggf. Umzugsfirma: 3 Angebote mit Besichtigung</td></tr>
<tr><td>6 Wochen</td><td>Nachsendeauftrag, neue Strom-/Internetverträge (Internet-Vorlauf oft 2–4 Wochen!), Ausmisten</td></tr>
<tr><td>2 Wochen</td><td>Halteverbotszone beantragen, Helfer fixieren, Kartons raumweise beschriften</td></tr>
<tr><td>Umzugstag</td><td>Zählerstände beider Wohnungen mit Foto, Übergabeprotokolle</td></tr>
<tr><td>Danach: 2 Wochen</td><td><strong>Ummeldung beim Einwohnermeldeamt</strong> (gesetzliche Frist!), dann KFZ, Bank, Versicherungen, Arbeitgeber, Krankenkasse, Rundfunkbeitrag, Abos</td></tr></table>
<h5>Was kostet das? Realistischer Rahmen</h5>
<table class="ptable"><tr><th>Variante</th><th>Größenordnung (2–3 Zimmer, Stadt)</th></tr>
<tr><td>Eigenregie (Transporter + Pizza für Helfer)</td><td>150–400 €</td></tr>
<tr><td>Teilspedition (Möbel, Rest selbst)</td><td>500–900 €</td></tr>
<tr><td>Vollservice mit Verpackung</td><td>1.200–2.500 €+</td></tr>
<tr><td>Halteverbotszone</td><td>40–120 € je Standort</td></tr></table>
<p>Der Kosten-Schätzer unten hilft bei der Budgetplanung. Sparhebel: Werktag statt Samstag (−20–30 %), Kartons leihen/gebraucht, Hausrat-Versicherung mitnehmen statt neu abschließen.</p>
<h5>Übergabe & Kaution: hier geht Geld verloren</h5>
<p>Übergabeprotokoll mit Fotos ist die wichtigste Versicherung gegen Streit. <strong>Schönheitsreparaturen</strong> schuldet man nur bei wirksamer Klausel und tatsächlichem Bedarf — starre Fristen („alle 3 Jahre streichen“) sind unwirksam, bei unrenoviert übernommener Wohnung entfällt die Pflicht meist ganz. Die Kaution (max. 3 Nettokaltmieten) muss getrennt und verzinst angelegt werden; Rückzahlung in der Regel binnen 3–6 Monaten, ein Teil darf bis zur Nebenkostenabrechnung einbehalten werden.</p>
<h5>Geld zurück vom Finanzamt</h5>
<p>Beruflich bedingter Umzug: Umzugskostenpauschale plus tatsächliche Transportkosten absetzen — auch wenn der Arbeitgeber nichts zahlt; Kriterium ist u. a. eine deutlich verkürzte Pendelzeit (Faustregel: täglich mind. 1 Stunde weniger). Privater Umzug: Lohnanteil der Spedition als haushaltsnahe Dienstleistung (20 %, bis zum Höchstbetrag) absetzbar. Rechnungen aufheben und unbar zahlen — Barzahlung erkennt das Finanzamt nicht an.</p>`, tool: "umzug" },

nebenkosten: { h: `<h5>Die Abrechnung in 10 Minuten prüfen</h5>
<p>Prüfschema: 1. <strong>Frist</strong> — die Abrechnung muss binnen 12 Monaten nach Periodenende zugehen, sonst sind Nachforderungen meist verloren (ein Guthaben bleibt aber bestehen). 2. Umlageschlüssel konstant und vertragsgemäß? 3. Nur umlagefähige Posten? 4. Plausibilität: Sprünge über 20 % zum Vorjahr hinterfragen. Widerspruchsfrist: 12 Monate ab Zugang.</p>
<h5>Umlagefähig — oder nicht?</h5>
<table class="ptable"><tr><th>Umlagefähig</th><th>Nicht umlagefähig</th></tr>
<tr><td>Heizung, Warmwasser, Wasser/Abwasser</td><td>Verwaltungskosten</td></tr>
<tr><td>Müll, Straßenreinigung, Schornsteinfeger</td><td>Instandhaltung & Reparaturen</td></tr>
<tr><td>Hausmeister, Gartenpflege, Aufzug</td><td>Bank-/Kontogebühren</td></tr>
<tr><td>Gebäude-/Haftpflichtversicherung, Grundsteuer</td><td>Leerstand, Mietausfallwagnis</td></tr></table>
<h5>Belegeinsicht — Ihr stärkstes Recht</h5>
<p>Bei Zweifeln schriftlich um Belegeinsicht bitten (Muster: „Ich bitte um Einsicht in sämtliche Abrechnungsbelege des Zeitraums … sowie um Mitteilung der Gesamtkosten und des Verteilerschlüssels.“). Wird sie verweigert, darf eine Nachzahlung bis zur Einsicht zurückgehalten werden. Heizkosten müssen zu 50–70 % verbrauchsabhängig abgerechnet werden — sonst dürfen 15 % gekürzt werden.</p>
<h5>Strom & Gas: der Wechsel-Autopilot</h5>
<p>Grundversorgung ist fast immer der teuerste Tarif. Jährlicher Vergleich (Filter: 12 Monate Laufzeit, kurze Kündigungsfrist, keine Vorkasse, Boni realistisch bewerten) spart typischen Haushalten 100–300 €/Jahr. Kalendereintrag 10 Wochen vor Vertragsende genügt als System. Abschläge nach der ersten Jahresabrechnung aktiv anpassen — hohe Nachzahlungen sind fast immer falsch eingestellte Abschläge.</p>
<h5>Verbrauch senken ohne Komfortverlust</h5>
<p>Heizung: 1 °C weniger ≈ 6 % Energie; Heizkörper entlüften; Nachtabsenkung. Strom: Altgeräte messen (Steckdosen-Messgerät aus der Bibliothek leihen!) — alte Kühl-/Gefriergeräte und Umwälzpumpen sind die üblichen Verdächtigen. Unten: Abschlags-Check gegen Richtwerte nach Haushaltsgröße.</p>`, tool: "nk" },

hauskauf: { h: `
<h5>Kaufnebenkosten: die unterschätzten 10–15 %</h5>
<p>Grunderwerbsteuer (3,5–6,5 % je Bundesland) + Notar & Grundbuch (~2 %) + ggf. Makler (meist ~3,57 % je Seite) gehen <em>verloren</em> — sie stecken nicht im Objektwert. Banken wollen mindestens diese Nebenkosten als Eigenkapital sehen; komfortabel sind 20–30 % Gesamteigenkapital für gute Zinskonditionen.</p>
<h5>Finanzierung stressfest bauen</h5>
<p>Anfangstilgung ≥ 2 % (besser 3 % bei niedrigen Zinsen — sonst läuft der Kredit 40+ Jahre), Zinsbindung 15+ Jahre in unsicheren Zinsphasen, Sondertilgungsrecht 5 %/Jahr kostenlos vereinbaren. <strong>Stresstest:</strong> Rate auch tragbar bei +2 Punkten Anschlusszins, einem Gehalt weniger, Kind? Nach §489 BGB ist jede Baufinanzierung 10 Jahre nach Vollauszahlung mit 6 Monaten Frist kündbar — wichtiges Sicherheitsventil bei langer Bindung.</p>
<h5>Objektprüfung vor der Unterschrift</h5>
<p>Pflichtlektüre: Grundbuchauszug (Lasten Abt. II/III!), Energieausweis, bei ETW zusätzlich Teilungserklärung, letzte 3 Protokolle der Eigentümerversammlung und Höhe der Instandhaltungsrücklage — dort stehen die kommenden Sonderumlagen. Altbau ohne Gutachter kaufen ist Glücksspiel (500–1.500 € fürs Gutachten vs. fünfstellige Überraschungen bei Dach, Feuchte, Heizung). Laufende Instandhaltung einplanen: ~1,5–2 €/m²/Monat zurücklegen. Unten: Rechner für Nebenkosten + monatliche Rate.</p>
<h5>Kauf oder Miete? Die ehrliche Faustregel</h5>
<p>Grobe Orientierung über den Kaufpreisfaktor (Kaufpreis ÷ Jahres-Nettokaltmiete): unter ~20 eher günstig, über ~30 eher teuer — regional sehr unterschiedlich. Kaufen lohnt vor allem bei langer Haltedauer (Faustwert 10+ Jahre, sonst fressen Kaufnebenkosten den Vorteil), stabilem Einkommen und Lust auf Eigenleistung/Instandhaltung. Mieten ist kein „Geld verbrennen“, sondern kauft Flexibilität — wer beruflich mobil sein muss, fährt damit oft besser. Den Vergleich immer mit den vollen Nebenkosten und einer realistischen Instandhaltungsrücklage rechnen, nicht Rate gegen Kaltmiete.</p>
`, tool: "hauskauf" },

haushalt: { h: `
<h5>Das Minimal-System gegen Chaos</h5>
<p>Täglich 10 Minuten (Küche abends resetten, einmal „Sichtflächen frei“), wöchentlich 1 Block à 60–90 Minuten (Bad, Böden, Wäsche-Rhythmus), saisonal 1 Aktion (Fenster, Schränke, Keller). Wichtigster Hebel ist nicht Putztechnik, sondern <em>weniger Zeug</em>: Jede Oberfläche ohne Dauerbewohner halbiert die Putzzeit. Bei Paaren/WGs: Zuständigkeiten nach Bereichen statt „wer's sieht, macht's“ — das verhindert den klassischen Mental-Load-Konflikt.</p>
<h5>Kochen als Wirtschaftsfaktor</h5>
<p>10 beherrschte Standardgerichte decken 80 % aller Abende. Wochenplanung + ein Großeinkauf schlägt 4 Spontankäufe: spart erfahrungsgemäß 20–30 % des Lebensmittelbudgets und jede Menge Entscheidungsmüdigkeit. Basics: Vorratshaltung (Reis, Pasta, Dosen-Tomaten, TK-Gemüse), Resteverwertungstag pro Woche, Gefrierschrank als Zeitmaschine (doppelt kochen, halb einfrieren).</p>
<h5>Reparieren können — die Grundausstattung</h5>
<p>Werkzeugkasten-Minimum: Schraubendreher-Set, Zange, Hammer, Inbus, Wasserwaage, Akkuschrauber, Dübel-Sortiment, Kabelbinder, WD40, Pömpel. Können-Minimum: Bild aufhängen (Bohren inkl. Leitungssucher), Silikonfuge ziehen, Abfluss reinigen, Heizkörper entlüften, Möbel aufbauen. Für alles andere: Repair-Cafés (kostenlos), Video-Anleitungen, und die Erkenntnis, wann der Profi günstiger ist als der dritte Fehlversuch.</p>
<h5>Putz-Frequenz als Faustregel</h5>
<table class="ptable"><tr><th>Aufgabe</th><th>Rhythmus</th></tr>
<tr><td>Küche abends zurücksetzen, Bett machen</td><td>täglich (10 Min)</td></tr>
<tr><td>Bad, Böden, Staub, Wäsche</td><td>wöchentlich (60–90 Min)</td></tr>
<tr><td>Kühlschrank, Bettwäsche</td><td>alle 1–2 Wochen</td></tr>
<tr><td>Fenster, Schränke, Entrümpeln</td><td>saisonal (1×/Quartal)</td></tr></table>
<p>Wer den wöchentlichen Block fest in den Kalender legt wie einen Termin, braucht keine Motivation mehr — nur einen Haken.</p>
` },
/* ---------- FAMILIE ---------- */
partnerschaft: { h: `
<h5>Zusammenziehen: die rechtliche Realität</h5>
<p>Unverheiratet zusammenleben heißt rechtlich: fast nichts ist automatisch geregelt. <strong>Beide in den Mietvertrag</strong> — wer nicht drinsteht, hat bei Trennung oder Tod des Partners kein eigenes Wohnrecht (nur ein Eintrittsrecht beim Tod). Gemeinsame Anschaffungen: Liste führen, wer was bezahlt hat; bei teuren Dingen (Auto, Möbel) Eigentum klären. Ein kurzer <strong>Partnerschaftsvertrag</strong> (formlos möglich, bei Immobilien notariell) regelt Kontenmodell, Anschaffungen und Auszugsszenario — unromantisch, aber der größte Streitvermeider.</p>
<h5>Geldmodelle im Vergleich</h5>
<p>Drei-Konten-Modell (Meins/Deins/Unseres) ist der bewährte Standard: Gemeinsames Konto für Wohnen + Leben, Einzahlung <em>proportional zum Einkommen</em> statt 50/50 — das verhindert, dass der Geringerverdienende relativ verarmt. Volle Kontogemeinschaft erst bei langfristiger Bindung; reine Getrenntkassen scheitern oft an „wer kauft das Klopapier“.</p>
<h5>Die Beziehungs-Wartung</h5>
<p>Gottman-Forschung kurzgefasst: Verhältnis positiver zu negativer Interaktionen ~5:1 hält Beziehungen stabil; die vier Warnsignale sind Kritik an der Person, Verachtung, Rechtfertigung, Mauern. Praktisch: wöchentlicher 20-Minuten-Check-in (Was lief gut? Was brauche ich?), Konflikte über Bedürfnisse statt Vorwürfe formulieren, große Themen (Kinder? Stadt? Geld?) <em>vor</em> großen Schritten klären.</p>
<h5>Heiraten oder nicht? Was sich rechtlich ändert</h5>
<table class="ptable"><tr><th>Bereich</th><th>Ehe</th><th>Unverheiratet</th></tr>
<tr><td>Steuer</td><td>Splittingvorteil möglich</td><td>kein Splitting</td></tr>
<tr><td>Erbrecht</td><td>gesetzl. Erbe + Freibeträge hoch</td><td>kein gesetzl. Erbe, Freibetrag gering</td></tr>
<tr><td>Auskunft/Vertretung im Krankheitsfall</td><td>über Notvertretung erleichtert</td><td>nur mit Vollmacht</td></tr>
<tr><td>Trennung</td><td>Unterhalt/Zugewinn geregelt</td><td>kaum Ausgleichsansprüche</td></tr></table>
<p>Unverheiratete sollten die Lücken gezielt schließen: Testament, Vorsorgevollmacht, ggf. Partnerschaftsvertrag.</p>
` },

heirat: { h: `
<h5>Was die Ehe rechtlich wirklich ändert</h5>
<p>Automatisch gilt die <strong>Zugewinngemeinschaft</strong>: Jeder behält sein Vermögen, nur der <em>Zuwachs</em> während der Ehe wird bei Scheidung ausgeglichen — Mythos „alles gehört beiden“ stimmt nicht. Dazu kommen: gesetzliches Erbrecht des Partners, Auskunfts- und Beistandsrechte im Krankenhaus (Vollmacht trotzdem sinnvoll!), Splittingtarif bei der Steuer, Hinterbliebenenrente, Unterhaltspflichten. Ehevertrag lohnt vor allem bei: Selbstständigkeit/Firma (Zugewinn modifizieren!), großem Vermögensgefälle, Auslandsbezug, Patchwork.</p>
<h5>Steuerklassen nach der Hochzeit</h5>
<p>4/4 ist Standard, 3/5 verschiebt nur die Liquidität ins Jahr (Pflicht zur Steuererklärung, Nachzahlungsrisiko, und Achtung: Klasse 5 drückt Lohnersatzleistungen wie Eltern- und Arbeitslosengeld!). Faktor-Verfahren 4/4 verteilt fair. Vor geplanter Elternzeit rechtzeitig (Monate vorher) die Steuerklasse des betreuenden Elternteils optimieren — das erhöht das Elterngeld spürbar.</p>
<h5>Namensrecht & Organisation</h5>
<p>Optionen: gemeinsamer Ehename (einer von beiden), jeder behält seinen, Doppelname. Nach der Entscheidung: Ausweise, Bank, Arbeitgeber, Versicherungen, Verträge ändern — Checkliste anlegen. Kirchliche/freie Trauung ist rechtlich bedeutungslos; nur das Standesamt zählt. Hochzeitsbudget-Realität: Gästezahl ist der mit Abstand größte Kostenhebel.</p>
<h5>Ehegattensplitting: der eigentliche Steuervorteil</h5>
<p>Der Splittingtarif bringt umso mehr, je <em>unterschiedlicher</em> die Einkommen sind, und nichts bei gleich hohem Verdienst. Er entsteht ohnehin erst mit der gemeinsamen Steuererklärung; die Steuerklassenwahl (4/4, 3/5 oder Faktor) verschiebt nur, wann das Geld fließt. Der Rechner unten schätzt die Größenordnung des Jahresvorteils aus zwei Einkommen.</p>
<h5>Checkliste: nach der Hochzeit</h5>
<table class="ptable"><tr><th>Bereich</th><th>To-do</th></tr>
<tr><td>Standesamt</td><td>Eheurkunde(n) ausreichend oft anfordern</td></tr>
<tr><td>Namensänderung</td><td>Ausweis/Pass, Bank, Arbeitgeber, Versicherungen, Verträge</td></tr>
<tr><td>Steuer</td><td>Steuerklassen prüfen (Finanzamt/ELSTER)</td></tr>
<tr><td>Vorsorge</td><td>Begünstigte in Versicherungen/Verträgen aktualisieren, Vollmachten</td></tr></table>
` },

kind: { h: `
<h5>Der Behörden-Fahrplan</h5>
<table class="ptable"><tr><th>Wann</th><th>Was</th></tr>
<tr><td>SSW 12–20</td><td>Arbeitgeber informieren (Kündigungsschutz ab Mitteilung!), Hebamme suchen (früh — knapp!), Kita-Wartelisten in Großstädten schon jetzt</td></tr>
<tr><td>7 Wochen vor Termin</td><td>Antrag Mutterschaftsgeld (Krankenkasse); Mutterschutz beginnt 6 Wochen vorher</td></tr>
<tr><td>Vor Geburt</td><td>Elternzeit planen (Anmeldung spätestens 7 Wochen vorher beim AG), bei Unverheirateten: Vaterschaftsanerkennung + Sorgeerklärung (geht schon vor Geburt!)</td></tr>
<tr><td>Nach Geburt</td><td>Geburtsurkunde → Kindergeld (Familienkasse) → Elterngeld (Frist: rückwirkend nur 3 Monate!) → Krankenkasse Familienversicherung → Steuer-ID kommt automatisch</td></tr></table>
<h5>Elterngeld strategisch nutzen</h5>
<p>Basiselterngeld: ~65–67 % des wegfallenden Nettos (min. 300, max. 1.800 €/Monat), 12+2 Monate (2 Partnermonate). <strong>ElterngeldPlus</strong>: halber Betrag, doppelte Dauer — ideal bei Teilzeit, da Zuverdienst weniger angerechnet wird. Hebel: Steuerklasse vorher wechseln, Partnerschaftsbonus prüfen, Monate ohne Einkommen (z. B. Mutterschutz) klug legen. Der Rechner unten gibt den Überschlag.</p>
<h5>Was ein Kind kostet</h5>
<p>Richtwert: 600–900 €/Monat in den ersten Jahren (ohne Betreuung), Erstausstattung gebraucht für unter 500 € machbar (Ausnahme: neuer Autositz & Matratze). Sofort starten: 25–50 €/Monat ETF-Sparplan aufs Kind — 18 Jahre Zinseszins sind das beste Geschenk.</p>
<h5>Geld vom Staat im Überblick</h5>
<table class="ptable"><tr><th>Leistung</th><th>Kurz</th></tr>
<tr><td>Kindergeld</td><td>monatlich je Kind (Familienkasse)</td></tr>
<tr><td>Elterngeld / ElterngeldPlus</td><td>Einkommensersatz, Antrag rückwirkend nur 3 Monate!</td></tr>
<tr><td>Kinderzuschlag</td><td>für Familien mit kleinem Einkommen statt Bürgergeld</td></tr>
<tr><td>Betreuungskosten</td><td>zu zwei Dritteln als Sonderausgaben absetzbar (bis Höchstbetrag)</td></tr>
<tr><td>Bildung & Teilhabe</td><td>Zuschüsse für Schulbedarf, Mittagessen, Vereine</td></tr></table>
`, tool: "elterngeld" },

erziehung: { h: `
<h5>Was die Forschung wirklich trägt</h5>
<p>Der autoritative Stil — Wärme <em>plus</em> klare Grenzen — schlägt in praktisch allen Langzeitstudien sowohl autoritäre Strenge als auch Laissez-faire. Praktisch heißt das: wenige, konsistente Regeln (beide Eltern gleich!), Gefühle des Kindes ernst nehmen, Verhalten begrenzen („Du darfst wütend sein, aber nicht hauen“), Lob fürs <em>Bemühen</em> statt fürs Talent (Growth Mindset). Vorbild schlägt Predigt: Kinder kopieren Mediennutzung, Streitkultur und Esserhalten der Eltern, nicht ihre Ansagen.</p>
<h5>Kita & Schule als Partner managen</h5>
<p>Kita-Platz: Rechtsanspruch ab 1 Jahr — bei Ablehnung Widerspruch und notfalls Klage (Kommunen zahlen teils private Betreuung). Eingewöhnung 2–4 Wochen einplanen. Schulzeit: Elternabende nutzen, bei Problemen früh das Gespräch mit Lehrkraft suchen (Eskalationsweg: Lehrkraft → Klassenleitung → Schulleitung → Schulamt), Lernschwierigkeiten abklären lassen (LRS/Dyskalkulie-Diagnostik gibt Nachteilsausgleich). Hausaufgaben: Eltern sind Coach, nicht Co-Autor.</p>
<h5>Medien & Taschengeld</h5>
<p>Bildschirmzeit-Richtwerte: unter 3 möglichst null, 3–6 max. ~30 Min/Tag begleitet, Grundschule ~60 Min — wichtiger als Minuten ist <em>Inhalt + Begleitung</em>. Taschengeld ab Schulalter, fester Rhythmus, keine Koppelung an Verhalten/Noten: Es ist Lerngeld für Geldfehler in klein.</p>
<h5>Taschengeld-Richttabelle</h5>
<table class="ptable"><tr><th>Alter</th><th>Richtwert</th><th>Rhythmus</th></tr>
<tr><td>6–8</td><td>2–3 €</td><td>wöchentlich</td></tr>
<tr><td>9–11</td><td>3–6 €</td><td>wöchentlich</td></tr>
<tr><td>12–14</td><td>25–40 €</td><td>monatlich</td></tr>
<tr><td>15–17</td><td>40–80 €</td><td>monatlich</td></tr></table>
<p>Richtwerte (Stand prüfen) — wichtiger als die Höhe ist die Verlässlichkeit. Ab etwa 14 hilft ein „Budgetgeld“ für Kleidung/Handy, um Planen zu üben. Der Taschengeld-Rechner unten gibt eine altersgerechte Orientierung.</p>
` },

trennung: { h: `
<h5>Das Trennungsjahr richtig nutzen</h5>
<p>Scheidung setzt i. d. R. 1 Jahr Getrenntleben voraus — auch innerhalb der Wohnung möglich („Trennung von Tisch und Bett“: getrennte Räume, Kassen, kein gemeinsamer Haushalt; Datum schriftlich festhalten!). In dieser Zeit klären: Wohnsituation, vorläufiger Umgang mit Kindern, Trennungsunterhalt, Kontenentflechtung (Gemeinschaftskonto auflösen/umstellen, Vollmachten widerrufen, Dispo begrenzen — Schutz vor bösen Überraschungen).</p>
<h5>Die Geld-Baustellen</h5>
<p><strong>Kindesunterhalt</strong> nach Düsseldorfer Tabelle (Betreuungsmodell beachten), <strong>Trennungs-/nachehelicher Unterhalt</strong> je nach Einkommensgefälle und Ehedauer, <strong>Zugewinnausgleich</strong> (Stichtag Zustellung Scheidungsantrag — Vermögensaufstellung früh sichern), <strong>Versorgungsausgleich</strong> der Rentenanwartschaften läuft automatisch. Steuerklassen ändern sich zum 1.1. nach dem Trennungsjahr. Gemeinsame Immobilie: Verkauf, Auszahlung oder (befristete) Vermietung — Schuldhaftung gegenüber der Bank bleibt unabhängig vom Grundbuch bestehen!</p>
<h5>Kinder & Verfahren</h5>
<p>Gemeinsame Sorge bleibt Standard; gestritten wird über Aufenthalt und Umgang — Leitlinie der Gerichte ist das Kindeswohl, nicht die Elternfairness. Goldene Regel: nie negativ über den anderen Elternteil vor dem Kind. Günstige Wege: einvernehmliche Scheidung mit <em>einem</em> Anwalt (nur einer ist Pflicht), Mediation für Streitpunkte, Verfahrenskostenhilfe bei geringem Einkommen. Beratungshilfe gibt es schon fürs Erstgespräch.</p>
<h5>Kindesunterhalt: so wird gerechnet</h5>
<p>Der Zahlbetrag richtet sich nach der Düsseldorfer Tabelle: Einkommensgruppe des zahlenden Elternteils × Altersstufe des Kindes, abzüglich des halben Kindergeldes beim minderjährigen Kind. Der betreuende Elternteil leistet seinen Anteil durch die Betreuung selbst. Der Rechner unten gibt einen Richtwert — die Tabellenwerte und der Selbstbehalt ändern sich jährlich. Das Jugendamt bietet eine kostenlose Beistandschaft zur Berechnung und Durchsetzung an.</p>
` },

pflegeang: { h: `
<h5>Der Akut-Fahrplan (z. B. nach Schlaganfall)</h5>
<p>1. Im Krankenhaus sofort den <strong>Sozialdienst</strong> einschalten — er organisiert Reha, Kurzzeitpflege, Hilfsmittel. 2. <strong>Pflegegrad-Antrag</strong> telefonisch bei der Pflegekasse stellen (Leistungen gelten ab Antragsmonat!). 3. MD-Begutachtung vorbereiten: Pflegetagebuch über 1–2 Wochen führen, schlechte Tage ehrlich schildern, Angehörige anwesend. 4. Bei Ablehnung oder zu niedrigem Grad: Widerspruch binnen 1 Monat — die Erfolgsquote ist hoch.</p>
<h5>Geld & Absicherung der Pflegenden</h5>
<p>Pflegegeld (bei Pflege zu Hause), Verhinderungspflege & Kurzzeitpflege (Urlaubs-/Krankheitsvertretung — Budget verfällt oft ungenutzt!), Entlastungsbetrag 131 €/Monat (Alltagshilfen), Zuschüsse für Wohnungsumbau (bis 4.180 € je Maßnahme) und Hausnotruf. Pflegende Angehörige: Rentenpunkte zahlt die Pflegekasse ab Pflegegrad 2 + ≥10 h/Woche, Pflegezeit/Familienpflegezeit sichern den Job, kostenlose Pflegekurse stärken Technik und Rücken.</p>
<h5>Die eigene Grenze ernst nehmen</h5>
<p>Pflegende erkranken überdurchschnittlich oft selbst. Frühwarnzeichen (Schlafstörungen, Gereiztheit, Isolation) ernst nehmen, Entlastung <em>vor</em> dem Zusammenbruch organisieren: Tagespflege, Nachbarschaftshilfe, Pflegedienst für Teilaufgaben, Angehörigengruppen. Der Pflegestützpunkt der Kommune berät kostenlos und kennt alle lokalen Angebote — erste Anlaufstelle, nicht letzte.</p>
<h5>Pflegegrade & Leistungen (Richtwerte)</h5>
<table class="ptable"><tr><th>Pflegegrad</th><th>Pflegegeld (häuslich)</th><th>typische Lage</th></tr>
<tr><td>1</td><td>—, nur Entlastungsbetrag</td><td>geringe Beeinträchtigung</td></tr>
<tr><td>2</td><td>~330 €/Monat</td><td>erhebliche Beeinträchtigung</td></tr>
<tr><td>3</td><td>~570 €/Monat</td><td>schwere Beeinträchtigung</td></tr>
<tr><td>4–5</td><td>~760–~990 €/Monat</td><td>schwerste Beeinträchtigung</td></tr></table>
<p>Beträge sind Richtwerte und werden angepasst (Stand prüfen). Statt Pflegegeld kann anteilig Pflegedienst (Sachleistung) treten. Der Pflege-Rechner unten gibt einen schnellen Überblick über die Größenordnung der Leistungen je Grad.</p>
` },

/* ---------- GESUNDHEIT ---------- */
krankenvers: { h: `
<h5>GKV vs. PKV: die Lebensentscheidung</h5>
<p>PKV lockt junge Gesunde mit niedrigen Beiträgen und Top-Leistungen — die Risiken zeigen sich später: Beiträge steigen im Alter deutlich, Rückkehr in die GKV ist ab 55 fast unmöglich, Kinder kosten extra (GKV: Familienversicherung kostenlos!). Faustregel: PKV nur für dauerhaft gut verdienende Beamte (Beihilfe!) und kinderlose Selbstständige mit Disziplin für Altersrückstellungen. Angestellte unterhalb der Versicherungspflichtgrenze haben ohnehin keine Wahl.</p>
<h5>Kassenwechsel & Zusatzleistungen</h5>
<p>Innerhalb der GKV sind die Kernleistungen ~95 % identisch — Unterschiede: Zusatzbeitrag (bis zu mehreren hundert Euro Ersparnis/Jahr), Bonusprogramme, Zahnreinigung, Osteopathie, digitale Services. Wechsel: 12 Monate Bindung, 2 Monate Frist, bei Beitragserhöhung Sonderkündigungsrecht. Sinnvolle private Ergänzungen: Zahnzusatz (früh, vor Befund!), Auslandsreisekranken (~10 €/Jahr, Pflicht für jeden Urlaub), ggf. Krankentagegeld für Selbstständige.</p>
<h5>Systemnavigation für Fortgeschrittene</h5>
<p>Facharzttermin schneller: Terminservicestelle 116117 (vermittelt binnen 4 Wochen bei Überweisung mit Dringlichkeitscode), Akutsprechstunden, Termin-Apps. Zweitmeinung vor großen OPs ist Kassenleistung. Krankengeld: ab Woche 7 ~70 % vom Brutto (max. 90 % vom Netto), Lücken bei AU-Bescheinigungen unbedingt vermeiden — nahtlos krankschreiben lassen. IGeL-Angebote („Selbstzahlerleistungen“) sind überwiegend nicht evidenzbasiert: erst igel-monitor.de prüfen.</p>
<h5>GKV oder PKV? Schnellcheck</h5>
<table class="ptable"><tr><th>Eher PKV</th><th>Eher GKV</th></tr>
<tr><td>Beamtin/Beamter mit Beihilfe</td><td>Angestellte unter Versicherungspflichtgrenze (keine Wahl)</td></tr>
<tr><td>kinderlos, hohes stabiles Einkommen, diszipliniert</td><td>Kinderwunsch / Familie (Familienversicherung kostenlos)</td></tr>
<tr><td>jung &amp; gesund mit Blick auf Altersrückstellungen</td><td>schwankendes Einkommen, Rückkehrwunsch im Alter</td></tr></table>
<p>Krankengeld ab Woche 7 sichert das Einkommen bei langer Krankheit — der Krankengeld-Rechner unten zeigt die ungefähre Höhe.</p>
` },

vorsorgeunt: { h: `
<h5>Der Vorsorge-Kalender nach Alter</h5>
<table class="ptable"><tr><th>Alter</th><th>Kassenleistung</th></tr>
<tr><td>18–34</td><td>1× Gesundheits-Check-up; Zahnvorsorge 2×/Jahr; Frauen: jährlich Genitaluntersuchung, ab 20 Pap-Abstrich; Chlamydien-Screening bis 25</td></tr>
<tr><td>ab 35</td><td>Check-up alle 3 Jahre (Blut, Urin, Herz-Kreislauf); Hautkrebs-Screening alle 2 Jahre; 1× Hepatitis-B/C-Test</td></tr>
<tr><td>ab 50</td><td>Darmkrebs: Stuhltest jährlich bzw. Koloskopie (Goldstandard, 10 Jahre Ruhe bei Normalbefund); Frauen: Mammographie-Screening 50–75 alle 2 Jahre</td></tr>
<tr><td>ab 45/65</td><td>Männer ab 45: Prostata-Tastuntersuchung; ab 65: einmalig Ultraschall Bauchaorta (Männer)</td></tr></table>
<h5>Impfstatus = Vorsorge Nr. 1</h5>
<p>Alle 10 Jahre Tetanus/Diphtherie auffrischen (mit Keuchhusten-Kombi), Masernschutz prüfen (für nach 1970 Geborene relevant), ab 60: Grippe jährlich, Pneumokokken, Gürtelrose. Impfpass verloren? Hausarzt rekonstruiert oder impft nach — Nachimpfen ist unschädlich.</p>
<h5>Vorbereitung macht den Unterschied</h5>
<p>Vor jedem Check: Beschwerden-Liste, Medikamentenliste, Familienkrankheiten (Krebs, Herz, Diabetes bei Eltern/Geschwistern → ggf. frühere/engmaschigere Vorsorge!). Werte als Kopie mitnehmen und selbst abheften — der eigene Verlauf über Jahre ist diagnostisch Gold wert. Zur Einordnung: Vorsorge findet Krankheiten früh, ersetzt aber keinen Arztbesuch bei Symptomen — Warnzeichen (unerklärter Gewichtsverlust, Blut, neue starke Schmerzen) immer zeitnah abklären.</p>
<h5>Die Kasse zahlt oft mehr als gedacht</h5>
<p>Viele Kassen erstatten über die Pflichtleistungen hinaus: zusätzliche Hautkrebs- oder Ultraschall-Checks, professionelle Zahnreinigung, Bonusprogramme mit Geldprämien fürs Wahrnehmen der Vorsorge. Ein Anruf bei der eigenen Kasse oder ein Blick in deren Bonusheft lohnt sich. Umgekehrt gilt bei kostenpflichtigen „IGeL“-Angeboten in der Praxis: erst auf igel-monitor.de nachsehen — viele Selbstzahlerleistungen haben keinen belegten Nutzen, einige bergen sogar Risiken.</p>
` },

mental: { h: `
<h5>Wann ist es „mehr als eine Phase“?</h5>
<p>Orientierung: Symptome (gedrückte Stimmung, Interessenverlust, Schlaf-/Appetitstörung, Konzentrationsprobleme, Reizbarkeit, sozialer Rückzug) bestehen <em>länger als 2 Wochen</em>, beeinträchtigen Alltag/Arbeit/Beziehungen spürbar oder kommen in Wellen wieder. Dann gilt: abklären lassen — Hausarzt ist ein völlig legitimer erster Schritt (auch um Körperliches wie Schilddrüse auszuschließen).</p>
<h5>Der Weg zur Therapie (mit Abkürzungen)</h5>
<p>1. <strong>Psychotherapeutische Sprechstunde</strong> über 116117 buchen — Erstgespräch binnen Wochen, keine Überweisung nötig. 2. Probatorik bei Therapeut:in (2–4 Kennenlern-Sitzungen, wechseln erlaubt!). 3. Bei langer Wartezeit auf einen Kassenplatz: <strong>Kostenerstattungsverfahren</strong> dokumentiert anfragen oder Therapeuten mit Privatpraxis + Erstattung prüfen; Übergangshilfen: anerkannte Online-Programme (Kassenleistung „DiGA“), Kliniksprechstunden, Beratungsstellen (Caritas/Diakonie, kostenlos). Verfahren (Verhaltenstherapie, tiefenpsychologisch, systemisch, analytisch) wirken vergleichbar — die Passung zur Person zählt mehr.</p>
<h5>Selbstfürsorge mit Evidenz & Akuthilfe</h5>
<p>Nachweislich wirksam ergänzend: regelmäßige Bewegung (bei leichter Depression ähnlich wirksam wie Medikation), Schlafhygiene, Tageslicht, soziale Kontakte aktiv halten, Alkohol als „Selbstmedikation“ meiden. Wichtig zu wissen: Eine behandelte Episode ist kein Karriere-Aus, Krankschreibung wegen Psyche ist Krankschreibung wie jede andere. <em>Hinweis: Dieser Artikel informiert allgemein. In akuten Krisen: Telefonseelsorge 0800 111 0 111 / 0800 111 0 222 (rund um die Uhr, anonym) oder ärztlicher Bereitschaftsdienst 116117; bei akuter Gefahr 112.</em></p>
<h5>Wenn es jemanden betrifft, der mir nahesteht</h5>
<p>Unterstützen heißt vor allem zuhören, ohne sofort reparieren zu wollen — Gefühle ernst nehmen, dableiben, zu professioneller Hilfe ermutigen und beim ersten praktischen Schritt helfen (etwa einen Termin über die 116117 mitorganisieren). Sätze wie „reiß dich zusammen“ schaden; Geduld und Verlässlichkeit helfen. Äußerungen über Lebensmüdigkeit oder Selbstverletzung immer ernst nehmen, die Person nicht allein lassen und gemeinsam Hilfe holen — bei akuter Gefahr 112, rund um die Uhr die Telefonseelsorge (0800 111 0 111) oder der ärztliche Bereitschaftsdienst 116117. Und dabei die eigenen Kräfte schützen: Wer begleitet, darf sich selbst ebenfalls Unterstützung holen.</p>
` },

fitness: { h: `
<h5>Bewegung: die Mindestdosis mit Maximaleffekt</h5>
<p>WHO-Richtwert: 150 Min moderate Ausdauer/Woche + 2× Kraft. Wer bei null startet: Der größte Gesundheitssprung passiert zwischen „nichts“ und „etwas“ — 3× 30 Min zügiges Gehen senkt das Sterblichkeitsrisiko bereits messbar. Krafttraining ist ab 40 der unterschätzte Schlüssel (Muskelerhalt, Knochendichte, Stoffwechsel): 2× 30 Min Grundübungen (Kniebeuge, Drücken, Ziehen, Rumpf) reichen. Dranbleib-Trick: Termin im Kalender + Mini-Regel („Schuhe anziehen zählt“) + Verabredung — Motivation folgt der Gewohnheit, nicht umgekehrt.</p>
<h5>Schlaf: der unterschätzte Multiplikator</h5>
<p>7–9 Stunden; chronisch &lt;6 h erhöht Risiko für Übergewicht, Diabetes, Depression und Unfälle deutlich. Die wirksamsten Hebel in Reihenfolge: konstante Aufstehzeit (auch am Wochenende ±1 h), Koffein-Stopp 8 h vor dem Schlafen, Schlafzimmer kühl/dunkel/leise, Bildschirm-Puffer 30–60 Min, Alkohol nicht als Einschlafhilfe (zerstört die zweite Nachthälfte). Bei Schnarchen mit Atemaussetzern: Schlafapnoe ärztlich abklären.</p>
<h5>Ernährung ohne Dogma</h5>
<p>Konsens jenseits aller Diät-Moden: viel Gemüse/Obst, Hülsenfrüchte, Vollkorn, Nüsse; Fisch &gt; rotes Fleisch &gt; Wurst; Wasser/Kaffee/Tee statt Zuckergetränken; hochverarbeitete Produkte als Ausnahme. Die 80/20-Regel schlägt jede Verbotsdiät, weil sie durchhaltbar ist. Gewicht: Kaloriendefizit entscheidet, die Diätform ist Geschmackssache — Crash-Diäten verlieren langfristig fast immer. Unten: Energiebedarfs-Rechner als realistischer Startpunkt.</p>
<h5>Alltagsbewegung schlägt das Fitnessstudio</h5>
<p>Der unterschätzte Hebel ist nicht das Training, sondern die Bewegung <em>zwischen</em> den Trainings (Fachbegriff NEAT). Wer viel sitzt, kippt einen Teil des Trainingsnutzens wieder. Wirksame Mini-Gewohnheiten: Treppe statt Aufzug, Telefonate im Gehen, jede halbe Stunde kurz aufstehen, ein Teil des Wegs zu Fuß oder mit dem Rad, Steh-Phasen am Schreibtisch. Diese Schritte summieren sich über den Tag stärker als eine einzelne Einheit — und sie kosten weder Zeitblock noch Mitgliedsbeitrag.</p>
`, tool: "energie" },

/* ---------- RECHT ---------- */
behoerden: { h: `
<h5>Der Lebensordner: ein System für alles</h5>
<p>Sieben Register genügen: 1. Identität (Urkunden, Pässe-Kopien, Stammbuch) 2. Wohnen (Mietvertrag/Grundbuch, Übergabeprotokolle) 3. Arbeit & Rente (Zeugnisse, Verträge, DRV-Briefe, Sozialversicherungsausweis) 4. Finanzen (Konten, Depots, Kredite, Steuerbescheide) 5. Versicherungen (Policen, Beitragsrechnungen) 6. Gesundheit (Impfpass-Kopie, Befunde, Bonusheft) 7. Vorsorge (Vollmachten, Verfügungen, Testament-Hinweis). Erste Seite: Notfall-Übersicht mit allen Vertrags-/Kontonummern — im Ernstfall finden Angehörige alles in Minuten.</p>
<h5>Aufbewahrungsfristen-Spickzettel</h5>
<table class="ptable"><tr><th>Dokument</th><th>Dauer</th></tr>
<tr><td>Geburts-/Heiratsurkunden, Rentenunterlagen, ärztl. Gutachten</td><td>lebenslang</td></tr>
<tr><td>Steuerbescheide & Belege (privat)</td><td>4 Jahre empfohlen (Pflicht nur bei hohen Einkünften/Vermietung)</td></tr>
<tr><td>Kontoauszüge, Rechnungen</td><td>3 Jahre (Verjährung); Handwerkerrechnungen 2 Jahre Pflicht, besser 5</td></tr>
<tr><td>Kaufbelege Garantie/Gewährleistung</td><td>mind. 2 Jahre</td></tr></table>
<h5>Digital-Backup & Behörden-Praxis</h5>
<p>Alles Wichtige 1× scannen, verschlüsselt in Cloud + auf externer Platte (3-2-1-Regel). Urkunden-Verlust: Standesamt des Ereignisorts stellt neu aus. Behördengänge: Termin online buchen, Unterlagenliste vorab prüfen, zu jedem Antrag Eingangsbestätigung/Aktenzeichen notieren. Gegen Bescheide: Widerspruchsfrist meist 1 Monat — Fristen sind im Verwaltungsrecht fast alles.</p>
<h5>Widerspruch in 4 Schritten</h5>
<p>1. <strong>Frist</strong> aus der Rechtsbehelfsbelehrung lesen (meist 1 Monat ab Zugang; fehlt die Belehrung, gilt 1 Jahr). 2. Formloser, fristwahrender Widerspruch genügt zunächst („hiermit lege ich Widerspruch ein, Begründung folgt“). 3. Akteneinsicht beantragen, dann sachlich begründen. 4. Bei Ablehnung bleibt die Klage vor dem Verwaltungs-/Sozialgericht — in vielen Sozialsachen gerichtskostenfrei. Wichtig: Ein Widerspruch hat oft <em>aufschiebende Wirkung</em>, bei Geldforderungen aber nicht automatisch — dann zusätzlich Aussetzung der Vollziehung beantragen.</p>
<h5>Vieles geht heute online</h5>
<p>Über die BundID und die Online-Ausweisfunktion lassen sich Wohnsitz-An/Ummeldung, Führungszeugnis, Kindergeld, BAföG und viele Anträge digital erledigen. Trotzdem gilt: zu jedem Online-Antrag die Eingangsbestätigung als PDF sichern und das Aktenzeichen in den Lebensordner legen.</p>
` },

vertraege: { h: `
<h5>Widerruf: die 14-Tage-Superkraft</h5>
<p>Online-/Telefon-/Haustürgeschäfte: 14 Tage Widerruf ohne Begründung — Frist beginnt erst mit korrekter Belehrung (fehlt sie, verlängert sich das Widerrufsrecht drastisch, bis zu 12 Monate + 14 Tage). Ausnahmen: Maßanfertigungen, entsiegelte Hygieneartikel, Downloads nach Zustimmung, <strong>Ladenkauf</strong> (Umtausch dort ist Kulanz, kein Recht!). Widerruf beweissicher per E-Mail, Rücksendung dokumentieren.</p>
<h5>Gewährleistung ≠ Garantie</h5>
<p><strong>Gewährleistung</strong>: gesetzlich, 2 Jahre, gegen den Händler; im ersten Jahr wird vermutet, dass der Mangel von Anfang an bestand (Beweislast beim Händler!). Reihenfolge: Nacherfüllung (Reparatur/Austausch, 2 Versuche) → dann Rücktritt/Minderung. <strong>Garantie</strong>: freiwillige Herstellerzusage, gilt <em>zusätzlich</em>, ersetzt die Gewährleistung nie — „Wenden Sie sich an den Hersteller“ ist beim Mangel in den ersten 2 Jahren eine unzulässige Abwimmelei.</p>
<h5>Abos, AGB-Fallen & Durchsetzung</h5>
<p>Kündigungsbutton ist bei Online-Abos Pflicht; Verträge ab 2022: nach Mindestlaufzeit monatlich kündbar. Untergeschobene Telefon-Verträge: Bestätigung verlangen, widerrufen. Werkzeugkasten der Durchsetzung: 1. schriftliche Mängelrüge mit Frist (14 Tage), 2. Verbraucherzentrale/Musterbriefe, 3. Schlichtungsstellen (kostenlos! z. B. Versicherung, Banken, Reise, Energie), 4. Mahnverfahren/Klage — bis 5.000 € Amtsgericht ohne Anwaltspflicht. Eigene Unterschrift nur nach Lesen der Kernpunkte: Laufzeit, Preisänderungen, Kündigungsfrist, automatische Verlängerung.</p>
<h5>Schlichtungsstellen — kostenlos zum Recht</h5>
<table class="ptable"><tr><th>Branche</th><th>Stelle</th></tr>
<tr><td>Versicherungen</td><td>Versicherungsombudsmann</td></tr>
<tr><td>Banken</td><td>Ombudsmann der Bankenverbände</td></tr>
<tr><td>Energie</td><td>Schlichtungsstelle Energie</td></tr>
<tr><td>Telekommunikation</td><td>Bundesnetzagentur</td></tr>
<tr><td>Reise/Allgemein</td><td>Universalschlichtungsstelle des Bundes</td></tr></table>
<h5>Musterformulierung Mängelrüge</h5>
<p>„Sehr geehrte Damen und Herren, der am … gekaufte Artikel … weist folgenden Mangel auf: … Ich fordere Sie unter Fristsetzung bis zum … zur Nacherfüllung (Reparatur oder Austausch) auf.“ Schriftlich, mit Frist, beweissicher per E-Mail. Bleibt der Verkäufer untätig, greifen Rücktritt oder Minderung. Bei Zahlungsverzug der Gegenseite hilft der Verzugszinsen-Rechner unten, die berechtigte Forderung zu beziffern.</p>
` },

vollmachten: { h: `
<h5>Warum der Ehepartner NICHT automatisch entscheiden darf</h5>
<p>Ohne Vollmacht bestellt das Gericht im Ernstfall einen Betreuer — das kann auch ein Fremder sein, und selbst der Ehepartner darf (jenseits eines eng begrenzten Not-Vertretungsrechts in Gesundheitsfragen für 6 Monate) weder Konten führen noch Verträge kündigen. Die <strong>Vorsorgevollmacht</strong> verhindert genau das: Eine Person des Vertrauens erhält Handlungsmacht für Gesundheit, Aufenthalt, Vermögen, Post, Behörden — Geltung ab Unterschrift, Einsatz nur im Bedarfsfall (Original-Prinzip: wer das Original hat, kann handeln).</p>
<h5>Das Dokumenten-Trio richtig bauen</h5>
<p>1. <strong>Vorsorgevollmacht</strong>: schriftlich, Aufgabenkreise einzeln ankreuzen/benennen; für Immobiliengeschäfte und Kredite notarielle Form nötig; Banken akzeptieren oft nur eigene Formulare → zusätzlich Bankvollmacht direkt bei der Bank. 2. <strong>Patientenverfügung</strong>: konkrete Behandlungssituationen und -wünsche (Wiederbelebung, Beatmung, künstliche Ernährung, Schmerztherapie) — Textbausteine der Justizministerien nutzen, Pauschalformeln („keine Apparatemedizin“) sind zu unbestimmt. 3. <strong>Betreuungsverfügung</strong> als Fallback: Wer soll Betreuer werden, falls die Vollmacht nicht greift?</p>
<h5>Pflege & Auffindbarkeit</h5>
<p>Registrierung im Zentralen Vorsorgeregister (~20 € einmalig) — Gerichte und Ärzte fragen dort ab. Hinweiskärtchen ins Portemonnaie. Kopien an Bevollmächtigte und Hausarzt. Alle 2 Jahre prüfen, mit Datum neu unterschreiben (zeigt Aktualität des Willens). Bei Konfliktpotenzial in der Familie: zwei Bevollmächtigte mit Einzelvertretung oder klarer Rangfolge benennen.</p>
<h5>Formfehler, die eine Vollmacht wertlos machen</h5>
<table class="ptable"><tr><th>Fehler</th><th>Folge</th></tr>
<tr><td>Nur „Generalvollmacht“ ohne Gesundheits-/Aufenthaltsbefugnis</td><td>Ärzte/Heim erkennen sie nicht an</td></tr>
<tr><td>Immobilie/Kredit ohne notarielle Form</td><td>Grundbuchamt/Bank lehnen ab</td></tr>
<tr><td>Patientenverfügung mit Pauschalformeln</td><td>zu unbestimmt, im Ernstfall unwirksam</td></tr>
<tr><td>Original unauffindbar / nicht registriert</td><td>Bevollmächtigte:r kann nicht handeln</td></tr></table>
<p>Lösung: Aufgabenkreise einzeln benennen, Bankvollmacht zusätzlich direkt bei der Bank, im Vorsorgeregister eintragen.</p>
` },
/* ---------- FREIZEIT ---------- */
hobbys: { h: `
<h5>Warum Erwachsene Hobbys verlieren — und das System dagegen</h5>
<p>Drei Killer: Anspruchsdenken („lohnt nur, wenn ich gut werde“), fehlender fester Slot, Anschaffungs-Hürde. Gegenmittel: <strong>Probierquartal</strong> — 3 Monate, 1 Aktivität, geliehene Ausrüstung, fixer Wochentermin, danach ehrliche Bilanz: Energie gegeben oder gekostet? VHS-Schnupperkurse, Vereins-Probetrainings und Bibliotheks-Ausleihen (auch Instrumente, Werkzeug, Spiele!) machen das Testen fast kostenlos.</p>
<h5>Die Ausgewogenheits-Matrix</h5>
<p>Ideal sind 2–3 Hobbys aus verschiedenen Quadranten: körperlich vs. geistig × allein vs. sozial. Wer nur Sport macht, dem fehlt der Kreativ-Ausgleich; wer nur allein bastelt, dem fehlt das Sozial-Vitamin. Flow-Kriterium: Die Tätigkeit fordert leicht über dem eigenen Können — dann verschwindet die Zeit. Achtung Hobby-Inflation: Ein gepflegtes Hobby schlägt fünf angefangene; Ausrüstungskäufe erst <em>nach</em> 10 aktiven Sessions.</p>
<h5>Hobby trotz vollem Kalender</h5>
<p>Mikro-Format etablieren: 20 Minuten zählen (Skizzieren, Üben, Laufen) — Konsistenz schlägt Session-Länge. Kopplung an bestehende Routinen („nach dem Abendessen 20 Min Gitarre“), Ausrüstung sichtbar lagern (Gitarre an der Wand wird 5× öfter gespielt als im Koffer). Eltern kleiner Kinder: Tandem-Modell — feste Zeiten, in denen jeder Partner ein Zeitfenster bekommt, abwechselnd und verlässlich.</p>
<h5>Kostengünstig anfangen</h5>
<p>Fast jedes Hobby lässt sich nahezu gratis testen: Sportvereine bieten Probetrainings, VHS-Schnupperkurse kosten wenig, und Büchereien verleihen längst mehr als Bücher — vielerorts Instrumente, Werkzeug, Spiele, Saatgut, sogar Energiemessgeräte. Gebrauchtmärkte und Verschenk-Gruppen liefern die Erstausrüstung. Regel: Geld erst nach zehn aktiven Sessions ausgeben — dann weißt du, ob es bleibt. So wird aus „teures Hobby“ ein gutes Geschäft fürs Wohlbefinden.</p>
` },

ehrenamt: { h: `
<h5>Das passende Engagement finden</h5>
<p>Drei Fragen statt Bauchgefühl: Was kann ich gut (Skills spenden: Buchhaltung, Website, Handwerk)? Wieviel Zeit <em>verlässlich</em> (lieber 2 h/Monat dauerhaft als 10 h einmalig)? Menschen, Tiere, Natur oder Struktur? Anlaufstellen: Freiwilligenagenturen der Städte (vermitteln passgenau), Online-Plattformen, oder direkt: Tafel, Feuerwehr, Sportverein, Hospizdienst, Lesepaten. Reinschnuppern ist überall erwünscht — niemand erwartet Lebensbindung ab Tag 1.</p>
<h5>Rechte & Absicherung im Amt</h5>
<p>Engagierte sind über die Organisation gesetzlich unfallversichert (viele Bereiche) bzw. über Sammelverträge der Bundesländer haftpflicht-/unfallgeschützt — beim Träger konkret nachfragen. <strong>Ehrenamts-/Übungsleiterpauschale</strong>: Aufwandsentschädigungen bis 840 €/Jahr (Ehrenamt) bzw. 3.000 €/Jahr (Übungsleiter, Trainer, Betreuer) steuer- und sozialabgabenfrei. Auslagen (Fahrt, Material) gegen Beleg erstatten lassen ist keine Unverschämtheit, sondern Standard.</p>
<h5>Vereinsvorstand ohne Haftungsfalle</h5>
<p>Vorstände haften bei grober Fahrlässigkeit — Schutzpaket: Vereins-Haftpflicht + D&O-Versicherung (kleines Geld), saubere Kassenprüfung, Beschlüsse protokollieren, Steuerpflichten (Gemeinnützigkeit!) im Blick oder an Steuerberater delegieren. Goldene Regel gegen Ehrenamts-Burnout: Aufgaben mit Enddatum übernehmen („Schatzmeister bis zur nächsten Wahl“), Nein-Sagen üben — wer alles macht, macht es nicht lange.</p>
<h5>Pauschalen auf einen Blick</h5>
<table class="ptable"><tr><th>Pauschale</th><th>Höhe/Jahr</th><th>für</th></tr>
<tr><td>Übungsleiterpauschale</td><td>bis 3.000 €</td><td>Trainer:innen, Ausbilder:innen, Betreuer:innen, Pflegehilfe</td></tr>
<tr><td>Ehrenamtspauschale</td><td>bis 840 €</td><td>Vorstand, Kassenwart, Platzwart u. a.</td></tr></table>
<p>Beide sind steuer- und sozialabgabenfrei und können teils kombiniert werden (nicht für dieselbe Tätigkeit). Bürgergeld-/Leistungsbezug: Übungsleiterpauschale wird oft nicht angerechnet — vorher beim Amt klären.</p>
` },

reisen: { h: `
<h5>Budget-Architektur einer Reise</h5>
<p>Vier Blöcke: Transport, Unterkunft, vor Ort (Essen, Aktivitäten, Lokales), Puffer (10–15 % für Überraschungen). Sparhebel mit größtem Effekt: Reisezeit (Nebensaison −30–50 %), Flexibilität bei Flugtagen (Di/Mi/Sa), Unterkunft mit Küche (halbiert Essenskosten), Städte-Pässe nur bei echter Nutzung rechnen. Frühbucher vs. Last Minute: Pauschal gilt — Schulferienziele früh, flexible Individualreisen können spät punkten. Der Rechner unten macht aus Tagen × Stil ein realistisches Gesamtbudget.</p>
<h5>Die Rechte-Toolbox unterwegs</h5>
<p><strong>Flug</strong> (EU-Verordnung 261): Bei Annullierung/Verspätung &gt;3 h am Ziel 250–600 € Entschädigung (außer außergewöhnliche Umstände) plus Betreuungsleistungen — direkt bei der Airline geltend machen, Portale nehmen Provision. <strong>Pauschalreise</strong>: Mängel sofort vor Ort anzeigen + Frist zur Abhilfe, Minderung nach Rückkehr binnen der Vertragsfristen. <strong>Bahn</strong>: ab 60 Min 25 %, ab 120 Min 50 % Erstattung. Reiserücktrittsversicherung lohnt bei teuren, früh gebuchten Reisen; Auslandsreisekrankenversicherung (~10–20 €/Jahr) ist dagegen Pflichtprogramm für jede Auslandsreise.</p>
<h5>Sicherheits-Setup in 30 Minuten</h5>
<p>Reise- und Sicherheitshinweise des Auswärtigen Amts checken + Krisenvorsorgeliste „Elefand“ bei Fernreisen, Dokumente-Scans in Cloud + an sich selbst gemailt, zwei Zahlungswege getrennt lagern, Notfallnummern (Karten sperren: 116 116) offline notieren, Impfberatung 6–8 Wochen vor Fernreisen. Im Land: Kopie statt Original-Pass am Körper, Taxi-Apps statt Winken, Magenregel „cook it, boil it, peel it or forget it“.</p>
<h5>Offline-Setup in 10 Minuten</h5>
<p>Vor der Abreise: Offline-Karten der Region herunterladen, Übersetzungssprache offline speichern, Boarding-Pässe und Buchungen als PDF und als Screenshot sichern (Akku/Netz fällt im dümmsten Moment aus), wichtige Adressen auf einen Zettel. Ein kleiner Mehrfachstecker und eine Powerbank lösen 90 % aller Lade-Dramen. Zahlungswege trennen: eine Karte am Körper, eine im Hotelsafe.</p>
`, tool: "reise" },

/* ---------- ALTER ---------- */
ruhestand: { h: `
<h5>Der 5-Jahres-Countdown</h5>
<table class="ptable"><tr><th>Wann</th><th>Was</th></tr>
<tr><td>5 Jahre vorher</td><td>Kontenklärung bei der DRV abschließen, Rentenauskunft anfordern, Lücken (Ausbildung, Ausland, Kindererziehung) belegen</td></tr>
<tr><td>3 Jahre</td><td>Strategie wählen: regulär, vorzeitig mit Abschlag, abschlagsfrei nach 45 Jahren, oder länger arbeiten (Zuschlag 0,5 %/Monat!); freiwillige Ausgleichszahlungen ab 50 prüfen (steuerlich absetzbar)</td></tr>
<tr><td>1 Jahr</td><td>Beratungstermin DRV, bAV-Auszahlungsmodalitäten klären (Rate vs. Kapital — Steuer & KV-Beiträge vergleichen!)</td></tr>
<tr><td>3 Monate</td><td><strong>Rentenantrag stellen</strong> — Rente kommt nicht automatisch!</td></tr></table>
<h5>Vorzeitig gehen: die ehrliche Rechnung</h5>
<p>Abschlag 0,3 % pro Monat vor der Regelaltersgrenze — <em>dauerhaft</em>, auch mit 90. Dagegen rechnen: gesparte Beitragsjahre, gewonnene gesunde Jahre, Hinzuverdienst (seit 2023 unbegrenzt möglich). Der Rechner unten zeigt den Effekt aufs Monatsbudget. Teilrente und gleitende Modelle (Teilzeit + Teilrente) sind die unterschätzten Mittelwege.</p>
<h5>Der nicht-finanzielle Teil</h5>
<p>Die Glücksforschung ist eindeutig: Die ersten Monate sind Flitterwochen, danach entscheiden Struktur, Aufgabe und Kontakte. Vor dem Ruhestand aufbauen, nicht danach suchen: Ehrenamt, Enkel-Tage, Verein, Projekt — der Kalender braucht 2–3 feste Anker pro Woche. Paare: Erwartungen explizit abgleichen („24/7 zusammen“ ist für viele Beziehungen Stresstest Nr. 1).</p>
<h5>Die drei Wege in die Rente</h5>
<table class="ptable"><tr><th>Weg</th><th>Effekt</th></tr>
<tr><td>Regelaltersgrenze</td><td>volle Rente ohne Abschlag</td></tr>
<tr><td>Vorzeitig (ab 63 mit 35 Jahren)</td><td>−0,3 %/Monat dauerhaft</td></tr>
<tr><td>Besonders langjährig (45 Jahre)</td><td>abschlagsfrei früher</td></tr>
<tr><td>Später als Regelgrenze</td><td>+0,5 %/Monat Zuschlag</td></tr></table>
<p>Abschläge wirken lebenslang — gegen die gewonnenen gesunden Jahre und den seit 2023 unbegrenzten Hinzuverdienst abwägen. Der Renten-Rechner unten zeigt den Effekt aufs Monatsbudget.</p>
`, tool: "rentenstart" },

pflegegrad: { h: `
<h5>Begutachtung: so entsteht der Pflegegrad</h5>
<p>Der MD bewertet 6 Module: Mobilität (10 %), kognitive/kommunikative Fähigkeiten & Verhalten (15 %), Selbstversorgung (40 %! — Waschen, Anziehen, Essen), Umgang mit Krankheit/Therapie (20 %), Alltagsleben/Kontakte (15 %). Vorbereitung entscheidet: 2 Wochen Pflegetagebuch, alle Diagnosen/Medikamente bereitlegen, den <em>schlechtesten</em> Tag schildern (nicht den Vorzeige-Tag!), Pflegeperson anwesend. Gutachten immer anfordern und prüfen; Widerspruch binnen 1 Monat hat hohe Erfolgsquoten — Pflegeberatung oder Sozialverbände (VdK, SoVD) helfen für kleines Geld.</p>
<h5>Heimkosten verstehen: der Eigenanteil</h5>
<p>Die Pflegekasse zahlt im Heim einen Festbetrag nach Pflegegrad — <em>alles darüber</em> ist Eigenanteil: einrichtungseinheitlicher Pflege-Eigenanteil (EEE, in allen Graden 2–5 gleich!) + Unterkunft & Verpflegung + Investitionskosten + ggf. Ausbildungsumlage. Entlastung: Leistungszuschlag auf den EEE steigt mit der Verweildauer (nach Stufen bis zu 75 %). Realistisch bleiben je nach Region vierstellige Eigenanteile pro Monat — der Rechner unten macht die Lücke konkret.</p>
<h5>Wenn das Geld nicht reicht</h5>
<p>Reihenfolge: eigenes Einkommen/Vermögen (Schonvermögen bleibt) → „Hilfe zur Pflege“ vom Sozialamt. <strong>Kinder haften erst ab 100.000 € Jahresbrutto</strong> (Angehörigen-Entlastungsgesetz) — die Angst vor dem Rückgriff ist meist unbegründet. Schenkungen der letzten 10 Jahre kann das Sozialamt zurückfordern. Alternativen zum Heim immer mitprüfen: ambulanter Dienst + Tagespflege, betreutes Wohnen, Pflege-WGs — oft günstiger und selbstbestimmter.</p>
<h5>Vom Antrag bis zum Bescheid — der Zeitstrahl</h5>
<p>Antrag (formlos, telefonisch) → Pflegekasse schickt Formulare → MD-Begutachtungstermin (in der Regel innerhalb von 5 Wochen) → Bescheid. Leistungen gelten <strong>rückwirkend ab dem Antragsmonat</strong> — deshalb sofort beantragen, nicht erst „wenn alles geklärt ist“. Bei Eilbedürftigkeit (z. B. Entlassung aus dem Krankenhaus) gelten verkürzte Fristen. Gutachten immer anfordern und Punkt für Punkt mit dem Pflegealltag abgleichen; weicht es ab, lohnt der Widerspruch fast immer.</p>
`, tool: "pflege" },

testament: { h: `
<h5>Gesetzliche Erbfolge: die häufigsten Irrtümer</h5>
<p>Irrtum 1: „Mein Ehepartner erbt alles“ — falsch: Neben Kindern erbt er regelmäßig nur die Hälfte (Zugewinngemeinschaft), neben Eltern des Verstorbenen drei Viertel. Irrtum 2: „Unverheiratete Partner erben irgendwann automatisch“ — nie, egal wie lang die Beziehung. Irrtum 3: „Patchwork regelt sich“ — gerade hier entstehen ohne Testament Erbengemeinschaften zwischen Ex-Familien. Konsequenz: Wer von der gesetzlichen Folge abweichen will, <em>braucht</em> ein Testament.</p>
<h5>Testament richtig errichten</h5>
<p>Eigenhändig: <strong>komplett handschriftlich</strong> + Ort, Datum, volle Unterschrift — ein getippter Text mit Unterschrift ist unwirksam! Sicher verwahren: amtliche Verwahrung beim Amtsgericht (~93 € einmalig inkl. Registrierung) garantiert die Eröffnung. Berliner Testament (Ehepaare setzen sich gegenseitig ein, Kinder erben am Ende): praktisch, aber Bindungswirkung nach dem ersten Todesfall und Pflichtteils-/Steuerthemen bedenken. Pflichtteil: Enterbte nächste Angehörige erhalten die Hälfte des gesetzlichen Erbteils als Geldanspruch — ganz „enterben“ geht fast nie.</p>
<h5>Steuern & Gestaltung zu Lebzeiten</h5>
<p>Freibeträge (Ehepartner 500.000 €, je Kind 400.000 €, Enkel 200.000 €) gelten <strong>alle 10 Jahre neu</strong> — frühzeitiges Schenken in Etappen ist das wichtigste Gestaltungsinstrument; Nießbrauch (Schenken + Wohnrecht/Erträge behalten) senkt den Steuerwert zusätzlich. Das selbstgenutzte Familienheim kann an Ehepartner/Kinder unter Bedingungen steuerfrei übergehen. Ab Immobilienvermögen oder Patchwork: 1–2 h Fachanwalt/Notar sparen oft fünfstellige Beträge. Unten: Freibetrags-Check.</p>
<h5>Brauche ich überhaupt ein Testament?</h5>
<table class="ptable"><tr><th>Situation</th><th>Testament nötig?</th></tr>
<tr><td>Unverheiratet mit Partner</td><td>Ja — sonst erbt der Partner nichts</td></tr>
<tr><td>Patchwork / Stiefkinder</td><td>Ja — gesetzliche Folge passt fast nie</td></tr>
<tr><td>Immobilie / Unternehmen im Nachlass</td><td>Ja — Erbengemeinschaft vermeiden</td></tr>
<tr><td>Bestimmte Person bewusst bedenken/ausschließen</td><td>Ja</td></tr>
<tr><td>Verheiratet, Standardfall, gesetzliche Folge gewollt</td><td>oft nein</td></tr></table>
<p>Im Zweifel: ein handschriftliches Testament ist kostenlos und in einer halben Stunde geschrieben — der Freibetrags-Check unten zeigt die steuerliche Seite.</p>
`, tool: "erbe" },

bestattung: { h: `
<h5>Die ersten 48 Stunden — wer was tun muss</h5>
<p>Zu Hause: Arzt rufen (Totenschein), keine Eile danach — Abschiednehmen zu Hause ist mehrere Stunden bis Tage erlaubt (Landesrecht). Dann: Bestatter beauftragen (<strong>vorher 2–3 Angebote</strong> — Preisunterschiede von mehreren tausend Euro für identische Leistung sind normal; niemand muss den erstbesten nehmen). Dokumente suchen: Personalausweis, Geburts-/Heiratsurkunde, Versicherungspolicen, ggf. Bestattungsvorsorge/Verfügung. Bestattungspflicht haben die nächsten Angehörigen — unabhängig vom Erbe!</p>
<h5>Kosten ehrlich aufgeschlüsselt</h5>
<table class="ptable"><tr><th>Posten</th><th>Spanne (Richtwerte)</th></tr>
<tr><td>Bestatter-Grundleistung (Sarg, Versorgung, Transport, Organisation)</td><td>1.500–4.000 €</td></tr>
<tr><td>Friedhofsgebühren (Grab, Beisetzung, Nutzungsrecht 20–30 J.)</td><td>1.000–4.000 €</td></tr>
<tr><td>Krematorium (bei Feuerbestattung)</td><td>300–600 €</td></tr>
<tr><td>Trauerfeier, Redner, Blumen, Karten, Kaffee</td><td>500–3.000 €</td></tr>
<tr><td>Grabstein/Grabplatte</td><td>1.000–5.000 €</td></tr></table>
<p>Günstiger ohne Würdeverlust: Feuerbestattung mit Urnengemeinschafts- oder Baumgrab (pflegefrei!), Trauerfeier im kleinen Rahmen selbst gestalten, Sarg-/Urnenkatalog kritisch nutzen. Bei Mittellosigkeit: Sozialamt übernimmt die „erforderlichen Kosten“ (Sozialbestattung) auf Antrag.</p>
<h5>Vorsorgen heißt entlasten</h5>
<p>Eine Bestattungsverfügung (Wünsche: Art, Ort, Musik, was nicht) + zweckgebundenes Treuhandkonto oder Vorsorgevertrag nimmt Angehörigen die schwersten Entscheidungen in der schlimmsten Woche ab. Sterbegeldversicherungen sind dagegen meist teurer als selbst zurückgelegtes Geld.</p>
<h5>Bestattungsarten & Pflegeaufwand</h5>
<table class="ptable"><tr><th>Art</th><th>Kosten</th><th>Grabpflege</th></tr>
<tr><td>Erdbestattung Wahlgrab</td><td>hoch</td><td>aufwändig</td></tr>
<tr><td>Urne im Reihengrab</td><td>mittel</td><td>mittel</td></tr>
<tr><td>Baumgrab / FriedWald</td><td>mittel</td><td>keine</td></tr>
<tr><td>Urnengemeinschaftsanlage</td><td>niedrig</td><td>keine</td></tr></table>
<p>Pflegefreie Gräber entlasten Hinterbliebene über Jahrzehnte. Der Kosten-Überschlag unten addiert die Hauptposten — Angebote trotzdem immer vergleichen.</p>
` },

trauer: { h: `
<h5>Der Verwaltungs-Marathon — priorisiert</h5>
<p><strong>Woche 1:</strong> Sterbeurkunden (gleich ~10 Exemplare!), Arbeitgeber, Kranken-/Rentenkasse, Lebensversicherung (Fristen teils 72 h für Unfalltod-Klauseln!). <strong>Monat 1:</strong> Rentenantrag Hinterbliebene — das „Sterbevierteljahr“ (3 Monate volle Rente des Verstorbenen) beim Rentenservice der Post beantragen; Konten/Verträge mit Sterbeurkunde + Erbnachweis umstellen oder kündigen (Sonderkündigungsrechte!); Wohnung des Verstorbenen: Mietvertrag endet nicht automatisch — Sonderkündigungsrecht binnen 1 Monats nach Kenntnis. <strong>Monat 2–6:</strong> Nachlass ordnen, Versicherungen anpassen, digitales Erbe (Accounts, Abos, Fotos — Zugangsliste hoffentlich vorhanden).</p>
<h5>Erbe annehmen oder ausschlagen?</h5>
<p>Die 6-Wochen-Frist ab Kenntnis läuft automatisch — wer nichts tut, <em>nimmt an</em>, inklusive aller Schulden. Bei unklarer Lage: schnell Überblick verschaffen (Kontoauszüge, Post, Schufa-Auskunft des Verstorbenen über Nachlassgericht), bei Überschuldung ausschlagen (Amtsgericht, ~30 €, Frist!); bei Unsicherheit nach Annahme: Nachlassverwaltung/-insolvenz begrenzt die Haftung aufs Erbe. Erbschein nur beantragen, wenn Banken/Grundbuch ihn wirklich verlangen (notarielles Testament + Eröffnungsprotokoll genügt oft).</p>
<h5>Trauer ist keine Krankheit — aber sie braucht Raum</h5>
<p>Es gibt keinen Zeitplan und keine richtigen Phasen-Abfolgen; Wellen statt Stufen sind normal, auch nach Jahren. Hilfreich: Rituale (Grabbesuch, Erinnerungstag), über den Verstorbenen sprechen dürfen, Trauergruppen (Hospizvereine, kostenlos) gerade für Verwitwete und verwaiste Eltern. Professionelle Hilfe suchen, wenn nach ~6–12 Monaten Alltag, Schlaf und Selbstfürsorge dauerhaft zusammenbrechen oder Schuldgedanken kreisen — Trauerbegleitung und Therapie schließen sich nicht aus. <em>In akuten Krisen: Telefonseelsorge 0800 111 0 111.</em></p>
<h5>Was Hinterbliebenen finanziell zusteht</h5>
<table class="ptable"><tr><th>Leistung</th><th>Kurz</th></tr>
<tr><td>Sterbevierteljahr</td><td>3 Monate die volle Rente des Verstorbenen für Ehepartner</td></tr>
<tr><td>Witwen-/Witwerrente</td><td>kleine bzw. große Rente je nach Alter/Kindern</td></tr>
<tr><td>Waisenrente</td><td>für Kinder bis 18, in Ausbildung bis 27</td></tr>
<tr><td>Betriebsrente/Lebensversicherung</td><td>Fristen prüfen, Bezugsrecht beachten</td></tr></table>
<p>Anträge laufen über den Rentenservice; das Sterbevierteljahr lässt sich als Vorschuss auszahlen — gerade in den ersten Wochen wichtig.</p>
` }
,
kindgesundheit: { h: `
<h5>Der U- und Impf-Fahrplan</h5>
<table class="ptable"><tr><th>Untersuchung</th><th>Wann</th><th>Schwerpunkt</th></tr>
<tr><td>U1 / U2</td><td>Geburt / Tag 3–10</td><td>Vitalcheck, Stoffwechselscreening, Hörtest</td></tr>
<tr><td>U3–U5</td><td>Woche 4 – Monat 7</td><td>Hüfte (Ultraschall!), Motorik, Beginn Grundimmunisierung (6-fach, Pneumokokken, Rotaviren)</td></tr>
<tr><td>U6 / U7</td><td>1 Jahr / 2 Jahre</td><td>Laufen, erste Worte; MMR+Windpocken-Impfungen</td></tr>
<tr><td>U7a / U8 / U9</td><td>3 / 4 / 5 Jahre</td><td>Sprache, Sehen, Feinmotorik — Schulreife-Vorläufer</td></tr>
<tr><td>J1 (+ U10/U11 als Kassen-Extra)</td><td>12–14 Jahre</td><td>Pubertät, Haltung, Psyche, Impf-Auffrischung (u. a. HPV für alle ab 9!)</td></tr></table>
<h5>Die Fieber-Entscheidungshilfe (nachts um 3)</h5>
<p><strong>Sofort ärztlich</strong> (Klinik/112): Säugling unter 3 Monaten mit Fieber, nicht wegdrückbare rote Flecken (Glastest!), Nackensteifigkeit, Apathie, Atemnot, Krampfanfall, anhaltende Trinkverweigerung. <strong>Zeitnah zum Arzt</strong> (am Tag/116117): Fieber über 3 Tage, schlechter Allgemeinzustand trotz gesenkter Temperatur, Ohren-/Bauchschmerz, Ausschlag. <strong>Zu Hause beobachten:</strong> Kind fiebert, trinkt aber, lässt sich ablenken, hat wache Phasen — dann gilt: Flüssigkeit, leichte Kleidung, Komfort. Fiebermittel dienen dem Wohlbefinden, nicht der Zahl auf dem Thermometer; Dosierung strikt nach Gewicht und ärztlicher/Beipackzettel-Angabe, niemals ASS bei Kindern (Reye-Syndrom).</p>
<h5>Giftnotruf & Unfallprävention</h5>
<p>Giftnotrufzentralen der Länder ins Handy einspeichern — bei Verdacht: kein Erbrechen auslösen, Substanz/Verpackung sichern, anrufen. Statistisch gefährlich sind nicht Fremde, sondern Stürze, Verbrühungen (Wasserkocherkabel!), Knopfzellen, Ertrinken (lautlos, auch im Planschbecken) und Medikamente in Omas Handtasche.</p>
<h5>Kinderkrankengeld konkret</h5>
<p>GKV-versicherte Eltern: bezahlte Freistellung mit ~90 % vom Netto, wenn das Kind unter 12 krank ist (Attest!). Der Rechner zeigt den Tage-Anspruch deiner Konstellation. Tipp: Tage beider Elternteile sind teilweise übertragbar (Arbeitgeber muss zustimmen); Privatversicherte und Beamte haben abweichende Regeln.</p>
<h5>Die Hausapotheke fürs Kind</h5>
<p>Sinnvoller Grundstock (Dosierungen immer nach Gewicht und ärztlicher bzw. Beipackzettel-Angabe): Fieberthermometer, fieber-/schmerzsenkendes Saft- oder Zäpfchenpräparat in der altersgerechten Form, Elektrolytlösung gegen Austrocknung bei Durchfall, Wund-/Heilsalbe, Pflaster und sterile Kompressen, Kochsalz-Nasentropfen, Zeckenzange, Einmalhandschuhe. Wichtige Nummern sichtbar: Kinderarzt, ärztlicher Bereitschaftsdienst 116117, Giftnotruf des Bundeslandes, Notruf 112. Medikamente kühl, trocken und für Kinder unerreichbar lagern, Haltbarkeit zweimal im Jahr prüfen.</p>
`, tool: "kkg" },

kindernaehrung: { h: `
<h5>Beikost-Fahrplan mit Sicherheitsliste</h5>
<p>Start zwischen 5. und 7. Monat nach Reifezeichen, klassisch: mittags Gemüse-Kartoffel-Fleisch-Brei → abends Milch-Getreide → nachmittags Getreide-Obst; bei Baby-led Weaning weiche, greifbare Stücke (gegarte Gemüsesticks, Banane) — Eisen im Blick behalten (Fleisch, Haferflocken, Hülsenfrüchte + Vitamin C). <strong>Tabu unter 1 Jahr:</strong> Honig (Botulismus!), ganze Nüsse, rohe tierische Produkte, Salz-/Zuckerzusatz, Quetsch-Dauernuckeln. <strong>Verschluckbar bis ~4 Jahre:</strong> ganze Weintrauben/Cherrytomaten (vierteln!), Nüsse, harte Bonbons. Wichtig: Frühe, regelmäßige Gabe von Allergenen (Erdnussmus, Ei — verarbeitet, nicht roh) senkt nach heutiger Studienlage das Allergierisiko; bei Neurodermitis/Familienrisiko ärztlich begleiten.</p>
<h5>Die Satter-Methode im Machtkampf-Alltag</h5>
<p>Rollenteilung konsequent leben: Eltern bestimmen Angebot, Zeit, Ort — Kind bestimmt ob und wie viel. Das Skript für den Klassiker „Ich mag das nicht!“: „Okay. Du musst es nicht essen. Es kommt nichts anderes, aber die Kartoffeln magst du ja.“ Ende der Verhandlung — freundlich, gelangweilt, ohne Drama. Kein Nachtisch als Belohnung (adelt Süßes, degradiert Gemüse), kein Teller-leer-Zwang (überschreibt die Sättigungswahrnehmung — der am besten belegte Risikofaktor für späteres Überessen). Neue Lebensmittel: 8–15 neutrale Kontakte, Mini-Portion neben Vertrautem, Eltern essen sichtbar mit Genuss.</p>
<h5>Vegetarisch/vegan aufwachsen?</h5>
<p>Vegetarisch ist mit normaler Sorgfalt gut machbar (Eisen + B12-Quellen über Milch/Ei beachten). Vegan geht nur mit konsequenter Supplementierung (B12 zwingend!, kritisch prüfen: Eisen, Jod, DHA, Kalzium, Vitamin D, Zink) und sollte ernährungsmedizinisch begleitet werden — die Fachgesellschaften sind hier zurückhaltend, weil Fehler im Wachstum teuer sind.</p>
<h5>Die Quetschie-Wahrheit</h5>
<p>Praktisch: ja. Aber: püriertes Obst = Zuckerschuss ohne Kauarbeit, Dauernuckeln umspült die Zähne, Sättigung wird schlechter registriert, und der Preis pro Kilo ist absurd. Regel: Ausnahme für unterwegs, mit Löffel statt Nuckeln, danach Wasser.</p>
<h5>Süßes und Getränke ohne Drama</h5>
<p>Wasser und ungesüßter Tee sind das Standardgetränk; Süßes gehört als normaler, beiläufiger Teil dazu — weder als Belohnung noch als striktes Verbot, denn beides macht es erst recht spannend. Essen taugt nicht als Trostmittel oder Strafe. Vorbild wirkt stärker als jede Regel: Was am Familientisch selbstverständlich gegessen und getrunken wird, prägt am meisten. Der wirksamste „Trick“ sind gemeinsame, entspannte Mahlzeiten ohne Bildschirm und ohne Druck — gegessen wird in guter Gesellschaft mehr und vielfältiger.</p>
` },

erziehungsstile: { h: `
<h5>Die Matrix in drei Alltagssituationen</h5>
<table class="ptable"><tr><th>Situation</th><th>Autoritär</th><th>Permissiv</th><th>Autoritativ ✓</th></tr>
<tr><td>Trotzanfall im Supermarkt</td><td>„Schluss jetzt!“ + Konsequenzdrohung</td><td>Schokoriegel zur Beruhigung</td><td>Gefühl benennen, Grenze halten: „Du bist wütend. Wir kaufen ihn trotzdem nicht.“ Dableiben, aushalten.</td></tr>
<tr><td>Hausaufgaben-Verweigerung</td><td>Sanktion, Kontrolle, Sitzenbleiben-Drohung</td><td>„Dann halt nicht“</td><td>Rahmen setzen (Zeit, Ort), Verantwortung beim Kind lassen, Folgen in der Schule wirken lassen, mit Lehrkraft sprechen</td></tr>
<tr><td>Mediengrenze</td><td>Verbot ohne Erklärung</td><td>unbegrenzt, um Streit zu vermeiden</td><td>Klare Regel + Begründung + gemeinsame Alternativen; Timer statt Eltern als Endgegner</td></tr></table>
<h5>Bindungstypen — und warum sie Eltern entlasten</h5>
<p>Sicher gebunden (~60 %): nutzt Eltern als Basis, exploriert mutig. Unsicher-vermeidend / -ambivalent: Anpassungsstrategien an weniger feinfühlige Umwelten, kein Schicksal — Bindungsmuster sind veränderbar, und entscheidend ist „good enough parenting“: Studien zufolge reicht es, wenn Eltern in einem Bruchteil der Situationen feinfühlig richtig liegen und Brüche <em>reparieren</em>. Der Reparatur-Dreischritt: benennen („Ich habe geschrien“), entschuldigen, Verbindung wiederherstellen — das modelliert genau die Konfliktfähigkeit, die man dem Kind wünscht.</p>
<h5>Konzepte nüchtern: Montessori, Waldorf, Reggio, Pikler</h5>
<p><strong>Montessori:</strong> vorbereitete Umgebung, selbstgewähltes Arbeiten, Altersmischung — gut belegt für Selbstständigkeit; steht und fällt mit echter Material-/Personalqualität. <strong>Waldorf:</strong> Rhythmus, Künste, später Medieneinsatz, anthroposophischer Hintergrund — den sollte man kennen und mögen. <strong>Reggio:</strong> Projekte, Dokumentation, „der Raum als dritter Erzieher“. <strong>Pikler:</strong> achtsame Pflege, freie Bewegungsentwicklung (Krippenalter). Prüffrage überall: Würde das Konzept auch ohne Etikett im Alltag sichtbar sein? Hospitieren entscheidet.</p>
<h5>Taschengeld als Erziehungswerkzeug</h5>
<p>Fester Rhythmus, bedingungslos (kein Noten-/Verhaltens-Bonus — es ist Lerngeld für Geldfehler), ab Schulalter wöchentlich, ab ~10 monatlich. Fehlkäufe nicht retten: Der 5-€-Plastikfehler mit 8 ist die günstigste Finanzbildung des Lebens. Richtwerte im Tool unten.</p>
<h5>Wenn Eltern uneinig sind</h5>
<p>Kinder spüren Spalten sofort und nutzen sie — nicht aus Bosheit, sondern weil Uneinigkeit Unsicherheit erzeugt. Regel: Diskussion über Erziehungsfragen nie vor dem Kind, sondern danach unter vier Augen; nach außen tragen beide dieselbe Entscheidung, auch die nicht ganz geteilte. Ein gemeinsamer Minimalkonsens (drei, vier nicht verhandelbare Regeln) trägt weiter als perfekte Einigkeit in allem. Getrennt erziehende Eltern: dieselben Kernregeln in beiden Haushalten geben dem Kind Halt.</p>
`, tool: "taschengeld" },

entwicklung: { h: `
<h5>Meilenstein-Korridore 0–6 mit Rote-Flaggen-Spalte</h5>
<table class="ptable"><tr><th>Bereich</th><th>Korridor (Mehrheit)</th><th>Abklären, wenn …</th></tr>
<tr><td>Soziales Lächeln</td><td>4–8 Wochen</td><td>mit 3 Monaten kein Blickkontakt/Lächeln</td></tr>
<tr><td>Freies Sitzen</td><td>6–10 Monate</td><td>mit 10 Monaten kein Sitzen, auffällige Asymmetrie jederzeit</td></tr>
<tr><td>Freies Laufen</td><td>10–18 Monate</td><td>mit 18 Monaten kein freies Gehen</td></tr>
<tr><td>Erste Worte / Zweiwortsätze</td><td>10–15 Mon. / 18–26 Mon.</td><td>mit 2 J. unter ~50 Wörtern oder keine Wortkombis („Late Talker“ — Hörtest!), Sprachverlust jederzeit sofort</td></tr>
<tr><td>Sauberkeit tags</td><td>2–4 Jahre</td><td>Druck lohnt nie; Einnässen nach langer Trockenheit abklären</td></tr>
<tr><td>Rollenspiel / „So tun als ob“</td><td>ab ~2 Jahre</td><td>fehlt mit 3 Jahren ganz, kein gemeinsames Zeigen/Interesse-Teilen</td></tr></table>
<p>Goldene Regel: Ein einzelner später Meilenstein ist meist Normvariante — Muster aus mehreren Auffälligkeiten oder Verlust von Gelerntem ist der Abklärungsgrund (Kinderarzt → SPZ/Frühförderstelle; Frühförderung ist kostenlos und braucht keine Diagnose-Odyssee).</p>
<h5>Die Trotzphase im Gehirn — und der 3-Schritte-Umgang</h5>
<p>Was passiert: Der Wille ist da (Autonomiephase nach Erikson), die Impulskontrolle (präfrontaler Kortex) noch Baustelle — der Affektsturm ist neurologisch echt, kein Manipulationsversuch. Begleitung: 1. <strong>Sicherheit & Ruhe</strong> (runtergehen, da sein, wenig Worte — Diskussion im Sturm ist sinnlos), 2. <strong>Gefühl benennen</strong> („Du wolltest das so sehr“ — Co-Regulation baut die spätere Selbstregulation), 3. <strong>Danach</strong> kurz und freundlich die Grenze bestätigen und weitermachen. Vorbeugen: Übergänge ankündigen, Scheinwahl anbieten („rote oder blaue Jacke?“), Hunger/Müdigkeit als Brandbeschleuniger ernst nehmen.</p>
<h5>Piaget & Erikson als Eltern-Spickzettel</h5>
<p>Praktische Übersetzung: Vor ~7 ist Logik-Argumentation begrenzt wirksam (präoperationale Phase — daher wirken Rituale und Geschichten besser als Vorträge); Egozentrismus heißt „kann Perspektive noch nicht wechseln“, nicht „egoistisch“. Grundschulalter = Werksinn: Kompetenzerleben füttern (echte Aufgaben, echtes Zutrauen). Pubertät = Identitätsarbeit: Reibung ist Programm, Beziehung halten schlägt jede Regel-Eskalation.</p>
<h5>U-Untersuchungen als Sicherheitsnetz</h5>
<p>Die kostenlosen Vorsorgeuntersuchungen (U1–U9, J1) fangen Auffälligkeiten bei Hüfte, Hören, Sehen und Sprache früh ab — gerade weil Eltern den eigenen Alltag nicht von außen sehen. Termine konsequent wahrnehmen und eigene Beobachtungen mitbringen; bei einem unsicheren Gefühl gilt die Faustregel aus diesem Kapitel: ein einzelner später Schritt ist meist normal, ein Muster oder der Verlust von Gekonntem gehört abgeklärt — Frühförderung ist kostenlos und niedrigschwellig.</p>
` },

kita: { h: `
<h5>Die Hospitations-Checkliste: 15 Qualitätssignale</h5>
<p>Beim Rundgang beobachten: 1. Erzieherinnen auf Augenhöhe (körperlich!) mit Kindern 2. Kinder vertieft im Spiel statt wartend 3. freundlicher, ruhiger Grundton 4. Trösten statt Abwimmeln 5. Kinderwerke statt Bastel-Uniformität an den Wänden 6. zugängliches Material in Kinderhöhe 7. Außengelände täglich genutzt 8. Essen ohne Zwang 9. Wickeln/Pflege respektvoll angekündigt. Nachfragen: 10. Personalfluktuation der letzten 2 Jahre (die ehrlichste Kennzahl!) 11. realer Betreuungsschlüssel inkl. Krankheit/Urlaub 12. Eingewöhnungsmodell und -dauer 13. Umgang mit Beißen/Konflikten 14. Schließtage 15. Elterngespräche-Rhythmus. Rote Flaggen: „Das machen wir schon immer so“, Handy-Erzieherinnen, weinende Kinder ohne Zuwendung.</p>
<h5>Berliner vs. Münchener Modell</h5>
<p><strong>Berlin:</strong> elternbegleitet, bezugspersonenorientiert — 3 Tage Grundphase, erster Trennungsversuch Tag 4 (Reaktion entscheidet über Tempo), Stabilisierung, Schlussphase; Richtwert 2–4 Wochen. <strong>München:</strong> längere gemeinsame Teilhabe-Phase (Kind und Eltern erleben den ganzen Kita-Alltag), Trennung erst nach ~2 Wochen — sanfter, aufwendiger. Beide gut; entscheidend ist, dass die Kita überhaupt strukturiert eingewöhnt und das Tempo vom Kind nimmt. Praxis-Tipps: Eingewöhnung nie direkt vor dem eigenen Jobstart enden lassen (1–2 Wochen Puffer für Rückschritte/Infekte), Abschiede kurz und ehrlich (nie wegschleichen!), Übergangsobjekt erlauben.</p>
<h5>Der Klageweg zum Platz — Schritt für Schritt</h5>
<p>1. Bedarf schriftlich beim Jugendamt anmelden (Frist je nach Kommune ~3–6 Monate vorher), Nachweis aufheben. 2. Kein Platz zum Stichtag: schriftlich Kapazitätsbescheid verlangen. 3. Widerspruch bzw. Antrag auf einstweilige Anordnung beim Verwaltungsgericht (geht erstaunlich schnell, oft ohne Anwalt machbar). 4. Parallel Selbstbeschaffung dokumentieren: Kosten einer privaten Kita/Tagespflege kann man sich erstatten lassen; auch Verdienstausfall wurde Eltern schon zugesprochen. Allein die Klageandrohung wirkt in vielen Kommunen Wunder.</p>
<h5>Das erste Kita-Jahr: das Infekt-Karussell</h5>
<p>8–12 Infekte im ersten Betreuungsjahr sind normal (Immuntraining, nicht schlechte Kita-Hygiene). Überlebensstrategie: Kinderkrankentage beider Eltern + Großeltern-Backup vorplanen, Arbeitgeber früh briefen, Notfallbetreuungs-Optionen sammeln. Es wird ab Jahr 2 messbar besser.</p>
<h5>Kosten & Gebührenbefreiung</h5>
<p>Kita-Gebühren sind meist einkommensabhängig gestaffelt und unterscheiden sich stark je Kommune; in mehreren Bundesländern ist das letzte Kita-Jahr oder ein bestimmter Stundenumfang beitragsfrei. Geschwisterkinder zahlen häufig reduziert. Bei kleinem Einkommen übernimmt das Jugendamt die Gebühren ganz oder teilweise (Antrag!), und über „Bildung und Teilhabe“ kommt ein Zuschuss zum Mittagessen dazu. Betreuungskosten sind außerdem zu zwei Dritteln als Sonderausgaben absetzbar — Bescheide und Belege aufheben.</p>
` },

einschulung: { h: `
<h5>Schulreife-Selbstcheck: 12 Punkte</h5>
<p>Emotional/sozial (wiegt am schwersten): 1. kann ~20 Min bei einer Sache bleiben 2. erträgt Verlieren/Misserfolg ohne Zusammenbruch 3. löst kleine Konflikte verbal 4. kann sich von Eltern lösen 5. stellt eigene Bedürfnisse mal zurück. Selbstständigkeit: 6. zieht sich allein an (Schleife optional) 7. Toilettengang komplett allein 8. verwaltet eigene Sachen (Brotdose, Jacke) 9. äußert sich verständlich gegenüber fremden Erwachsenen. Kognitiv/motorisch: 10. hält Stift im Dreipunktgriff, schneidet mit Schere 11. erfasst Mengen bis ~5 auf einen Blick, erkennt Reime/Silben 12. hüpft auf einem Bein, balanciert. Mehr als 3–4 klare Lücken → Gespräch mit Kita + Schuleingangsuntersuchung gezielt nutzen.</p>
<h5>Rückstellung: was die Studienlage sagt</h5>
<p>Nüchtern: Jüngste der Klasse haben anfangs leichte Nachteile (Noten, Diagnosen wie ADHS werden bei ihnen häufiger gestellt), die Effekte verblassen meist bis zur Mittelstufe. Rückstellung lohnt vor allem bei emotional-sozialer Unreife — nicht bei rein kognitiven Lücken (die holt Schule auf). „Kann-Kinder“ früh einschulen nur bei klarer Reife auf <em>allen</em> 12 Feldern. Die Entscheidung trifft formal die Schulleitung auf Basis der Schuleingangsuntersuchung — Eltern- und Kita-Einschätzung haben Gewicht: schriftlich einbringen.</p>
<h5>Das Elterngespräch-Skript bei Schulproblemen</h5>
<p>Vorbereiten: konkrete Situationen sammeln (Datum, was passiert), eigenes Ziel klären. Im Gespräch: 1. gemeinsame Basis („Wir wollen beide, dass …“) 2. Beobachtung statt Vorwurf („Mir fällt auf, dass …“ statt „Sie machen …“) 3. Sicht der Lehrkraft wirklich anhören 4. konkrete nächste Schritte + Termin zur Überprüfung vereinbaren, kurz per Mail zusammenfassen. Eskalationsweg erst danach: Klassenleitung → Schulleitung → Schulamt; Elternvertretung als Verbündete.</p>
<h5>Nachteilsausgleich-Wegweiser</h5>
<p>Bei diagnostizierter LRS, Dyskalkulie, ADHS, Autismus oder chronischer Krankheit: Antrag formlos an die Schulleitung (Diagnose von SPZ/Schulpsychologie/Facharzt beilegen), Klassenkonferenz beschließt — möglich sind Zeitzuschläge, mündliche statt schriftliche Leistungen, Hilfsmittel, abweichende Bewertung der Rechtschreibung (Notenschutz, landesabhängig). Wird jährlich überprüft; steht im Zeugnis je nach Land nur beim Notenschutz. Früh beantragen — rückwirkend gibt es nichts.</p>
<h5>Schulweg & Selbstständigkeit üben</h5>
<p>Den Schulweg vor dem ersten Tag mehrfach gemeinsam gehen, gefährliche Stellen benennen, das Kind führen lassen — der sicherste Weg ist oft nicht der kürzeste. Zu Fuß oder mit dem Roller schlägt das „Elterntaxi“: Kinder, die selbst zur Schule kommen, sind wacher, sozialer und unfallseltener, weil weniger Autos vor der Schule stehen. Parallel die kleinen Selbstständigkeiten trainieren (Ranzen packen nach Stundenplan, Brotdose, Jacke) — das entlastet morgens mehr als jede Ermahnung.</p>
` },

weihnachtsmann: { h: `
<h5>Was die Forschung wirklich zeigt</h5>
<p>Die Befunde sind über Jahrzehnte konsistent: Der Glaube an Weihnachtsmann/Christkind erreicht seinen Höhepunkt um 4–6 Jahre, kippt im Schnitt mit etwa 7–8 — angetrieben vom eigenen logischen Denken (konkret-operationale Phase: „Ein Schlitten für ALLE Kinder?“). Befragungen von Kindern und Rückblick-Studien mit Erwachsenen finden: überwiegend neutrale bis positive Erinnerungen, Stolz aufs Selbst-Durchschauen, kein messbarer Vertrauensverlust gegenüber den Eltern. Anhaltende Enttäuschung ist selten und dann meist an aufwendige Täuschungs-Eskalation gekoppelt (gefälschte Beweisfotos, jahrelanges aktives Gegensteuern gegen Zweifel). Faustregel: Das Spiel mitspielen ist unbedenklich — gegen wachsende Zweifel <em>ankämpfen</em> ist der Fehler.</p>
<h5>Das Aufklärungsgespräch als Skript</h5>
<p>Wenn die ernsthafte Direktfrage kommt (Testfrage vs. ernste Frage unterscheiden: „Stimmt's, dass …?“ mit ernstem Gesicht = ernst): 1. Zurückfragen: „Was glaubst du denn?“ — oft hat das Kind die Antwort schon und will Bestätigung. 2. Ehrlich würdigen: „Du hast es herausgefunden — das machen kluge Kinder in deinem Alter.“ 3. Den Zauber umdeuten statt zerstören: „Der Weihnachtsmann ist ein Spiel, das Erwachsene für Kinder spielen, weil Schenken und Geheimnisse Freude machen. Jetzt bist du groß genug, um mitzuspielen.“ 4. Mission geben: Mitwisser-Status für kleine Geschwister, vielleicht selbst einmal Wichteln/Schenken inszenieren. International beliebt ist genau dieses „Beförderungs“-Narrativ (bekannt aus dem viral gegangenen „Now you are a Santa“-Brief) — es verwandelt das Ende des Glaubens in einen Initiationsmoment.</p>
<h5>Zahnfee-Ökonomie & Kita-Spoiler</h5>
<p>Zahnfee: Betrag klein und konsistent halten (1–2 € sind völlig genug — Inflationstreiber sind andere Eltern, nicht die Kinder) und vorab mit dem Umfeld abgleichen, sonst entsteht Zahn-Marktvergleich auf dem Schulhof. Kita-/Schulhof-Spoiler („Den gibt's gar nicht, hat Leon gesagt!“): nicht in Panik dementieren — zurückfragen, was das Kind denkt; hält der Glaube, reicht „Manche glauben dran, manche nicht — was meinst du?“. Und in beide Richtungen Respekt vermitteln: Wir verraten anderen Kindern das Spiel nicht, und wir lachen niemanden aus, der nicht (mehr) glaubt — gleiche Regel gilt für Familien, die das Spiel aus religiösen oder anderen Gründen gar nicht spielen.</p>
<h5>Geschwister verschiedenen Alters</h5>
<p>Die heikelste Lage: Das große Kind hat es durchschaut, das kleine glaubt noch. Bewährt ist, das größere früh und stolz zum „Mitwisser“ zu machen (siehe Aufklärungs-Skript) — mit der klaren Mission, den Zauber fürs kleine Geschwister nicht zu zerstören. Das gibt dem Großen eine Aufwertung statt eines Verlusts und verhindert das genüssliche Ausplaudern. Gleiches Taktgefühl nach außen: Andere Kinder und Familien, die das Spiel anders oder gar nicht spielen, lässt man in Ruhe.</p>
` },
notfall: { h: `
<h5>Der 5-Minuten-Drill: die häufigsten Notfälle</h5>
<table class="ptable"><tr><th>Notfall</th><th>Erkennen</th><th>Handeln</th></tr>
<tr><td>Herzinfarkt</td><td>Druck/Enge hinterm Brustbein &gt;5 Min, Ausstrahlung Arm/Kiefer/Rücken; bei Frauen oft untypisch: Übelkeit, Atemnot, Oberbauch</td><td>112, Oberkörper hoch lagern, beengende Kleidung öffnen, nicht allein lassen — nicht selbst fahren!</td></tr>
<tr><td>Schlaganfall</td><td>FAST: Gesicht, Arme, Sprache</td><td>112 + Zeitpunkt des Beginns nennen (entscheidet über Therapie), nichts zu essen/trinken geben</td></tr>
<tr><td>Verschlucken</td><td>Kann nicht husten/sprechen/atmen</td><td>5× kräftig zwischen die Schulterblätter klopfen → 5× Oberbauch-Kompression (Heimlich), abwechseln; Säuglinge: nur Rückenschläge in Bauchlage auf dem Unterarm</td></tr>
<tr><td>Krampfanfall</td><td>Zuckungen, Bewusstseinsverlust</td><td>Gefahrenzone räumen, NICHTS in den Mund, Zeit stoppen; &gt;5 Min oder erster Anfall → 112; danach stabile Seitenlage</td></tr>
<tr><td>Allergischer Schock</td><td>Nach Stich/Nahrung/Medikament: Schwellung, Atemnot, Kreislauf</td><td>112, Adrenalin-Pen der Person sofort anwenden (Oberschenkel außen, durch die Hose), Beine hoch bei Kreislaufproblemen</td></tr>
<tr><td>Starke Blutung</td><td>spritzend/nicht stillbar</td><td>Druck, Druck, Druck — direkt auf die Wunde, notfalls mit T-Shirt; Glied hochhalten; 112</td></tr></table>
<h5>Kinder-Notfälle gesondert</h5>
<p>Fieberkrampf (sieht dramatisch aus, ist meist harmlos): Kind sichern, Zeit stoppen, beim ersten Mal immer 112/Klinik. Verschlucken von Knopfzellen oder Magneten: immer sofort Klinik — Knopfzellen verätzen die Speiseröhre binnen Stunden. Verbrühung: sofort mit handwarmem (nicht eiskaltem!) Wasser kühlen, nur Kleidung entfernen, die nicht klebt, großflächig → 112. Giftnotruf: Substanz und Menge bereithalten, kein Erbrechen auslösen, keine Milch geben.</p>
<h5>Wenn der Rettungsdienst kommt</h5>
<p>Was die Leitstelle braucht: Wo (Adresse + Stockwerk!), was, wie viele Betroffene, Rückrufnummer — auflegen erst, wenn die Leitstelle es sagt. Bis zum Eintreffen: Tür auf, Licht an, jemand winkt unten, Haustiere weg, Medikamentenliste/Arztbriefe bereitlegen. Und danach sich selbst nicht vergessen: Nach belastenden Einsätzen als Ersthelfer sind Aufwühlung und Schlafprobleme normal — Reden hilft, PSNV-Angebote (psychosoziale Notfallversorgung) stehen auch Ersthelfern offen.</p>
<h5>Vorbereitet sein, bevor es passiert</h5>
<p>Drei Dinge in einer ruhigen Minute erledigen: Erste-Hilfe-Wissen alle paar Jahre auffrischen (Kurse sind günstig, für viele Ehrenämter ohnehin nötig), einen Notfallpass auf dem Sperrbildschirm des Handys einrichten (Blutgruppe, Allergien, Dauermedikamente, Kontakt), und die Standorte des nächsten Defibrillators kennen — kostenlose Apps zeigen sie. Im Ernstfall zählt nicht Perfektion, sondern Handeln: Nichtstun ist der einzige echte Fehler.</p>
` },

patientenrechte: { h: `
<h5>Das Arztgespräch-Skript</h5>
<p>Vorbereitung (5 Min): Hauptanliegen in einem Satz formulieren („Ich bin hier, weil …“), Symptom-Steckbrief (seit wann, wie oft, was verändert es), Medikamentenliste, 3 Fragen notiert. Im Gespräch die 4 Fragen, die Über- wie Unterversorgung verhindern: 1. „Was ist die wahrscheinlichste Ursache — und was die gefährlichste, die wir ausschließen sollten?“ 2. „Welche Optionen gibt es, mit welchen Vor- und Nachteilen?“ 3. „Was passiert, wenn wir erstmal abwarten?“ 4. „Woran merke ich, dass ich wiederkommen muss?“ Abschluss: Verstandenes in eigenen Worten zurückspiegeln („Teach-back“) — deckt Missverständnisse sofort auf. Bei komplexen Diagnosen: Begleitperson mitnehmen, Notizen machen ist völlig üblich.</p>
<h5>Behandlungsfehler-Fahrplan</h5>
<p>1. Verdacht dokumentieren: Gedächtnisprotokoll mit Daten, Namen, Aussagen. 2. Vollständige Akteneinsicht verlangen (Recht!, Kopien gegen Erstattung) — bevor man den Verdacht laut äußert. 3. Krankenkasse einschalten: Sie muss kostenlos unterstützen und kann ein MD-Gutachten beauftragen. 4. Parallel oder alternativ: Gutachterkommission/Schlichtungsstelle der Landesärztekammer (kostenlos, Verfahren ruhen lassen Verjährung oft). 5. Mit Gutachten zum Fachanwalt für Medizinrecht (Erstberatung ~250 €, Rechtsschutz prüfen). Verjährung: 3 Jahre ab Kenntnis von Schaden UND Verursacher. Wichtig fürs Erwartungsmanagement: Beweisen muss grundsätzlich der Patient — bei groben Behandlungsfehlern kehrt sich die Beweislast um.</p>
<h5>ePA & Krankenhaus-Wissen</h5>
<p>ePA steuern: In der Kassen-App lassen sich Zugriffe je Einrichtung begrenzen, einzelne Dokumente verbergen oder der ePA ganz widersprechen — wer sie nutzt, hat erstmals selbst die komplette Befund-Historie. Krankenhaus: Wahlleistungen (Chefarzt, Einzelzimmer) sind teuer und medizinisch selten relevant — entscheidend ist die Fallzahl der Klinik für den konkreten Eingriff (öffentliche Qualitätsberichte!). Beim Entlassen: Entlassmanagement ist Pflicht der Klinik — Entlassbrief, Anschlussrezepte und ggf. Anschluss-Reha müssen organisiert sein, nachhaken lohnt.</p>
<h5>Höflich Nein zu IGeL sagen</h5>
<p>Selbstzahlerleistungen werden oft im Wartezimmer angeboten — Druck ist unzulässig. Ein ruhiger Satz genügt: „Danke, ich möchte das in Ruhe prüfen und hätte gern die Empfehlung schriftlich mit Begründung.“ Vor jeder Zusage auf igel-monitor.de den Nutzen nachsehen. Eine medizinisch notwendige Leistung muss die Kasse zahlen — wird etwas als IGeL angeboten, lohnt die Nachfrage, warum es nicht Kassenleistung ist.</p>
` },

medikamente: { h: `
<h5>Die Hausapotheken-Inventarliste</h5>
<p>Basis: Schmerz-/Fiebermittel (für Erwachsene UND altersgerecht für Kinder), Elektrolytlösung, Nasenspray (max. 7 Tage am Stück!), Mittel gegen Sodbrennen, Antihistaminikum (Allergie/Insektenstich), Wund-Desinfektion, Verbandsmaterial (Pflaster, Kompressen, Binden, Dreieckstuch), Fieberthermometer, Pinzette/Zeckenkarte, Kühlkompresse (im Eisfach), persönliche Dauermedikation als Reserve für ~1 Woche. Lagerung: kühl, trocken, dunkel, abschließbar oder oben — Bad und Küchenfenster sind die schlechtesten Orte. Jahrescheck: abgelaufene Säfte/Salben großzügig entsorgen (Wirkverlust, Keime), Tabletten in Blistern sind toleranter.</p>
<h5>Beipackzettel-Lesekurs</h5>
<p>Reihenfolge fürs Wesentliche: 1. Dosierung & Höchstdauer (gilt für MICH? Alter, Niere, Schwangerschaft) 2. Gegenanzeigen 3. Wechselwirkungen 4. dann erst Nebenwirkungen — mit Übersetzungstabelle: „sehr häufig“ &gt;10 %, „häufig“ 1–10 %, „gelegentlich“ 0,1–1 %, „selten“ &lt;0,1 %. Merksatz: Aufgelistet heißt beobachtet, nicht erwartbar. Apotheker fragen ist der unterschätzte Service — auch zu rezeptfreien Mitteln und Nahrungsergänzung (die in keine offizielle Wechselwirkungsprüfung automatisch einfließt!).</p>
<h5>Die 10 relevantesten Wechselwirkungs-Paare im Alltag</h5>
<p>1. Johanniskraut × Antibabypille/Antidepressiva/Blutverdünner (schwächt ab!) 2. Grapefruit × Statine, manche Blutdruckmittel (verstärkt) 3. Ibuprofen/ASS × Blutverdünner (Blutungsrisiko) 4. Ibuprofen × Blutdrucksenker (schwächt) 5. Antibiotika × Milchprodukte (manche Tetracycline/Chinolone — Abstand 2 h) 6. Schilddrüsenhormon × Kaffee/Kalzium/Eisen (Abstand!) 7. Alkohol × Schmerz-/Schlaf-/Psychopharmaka 8. PPI („Magenschutz“) als Dauerlösung ohne Indikation 9. Kalium-sparende Mittel × Salzersatz 10. Nasenspray-Dauergebrauch → Abhängigkeit der Schleimhaut. Bei 3+ Dauermedikamenten: jährlicher Medikationscheck in der Stammapotheke.</p>
<h5>Lieferengpass-Praxis</h5>
<p>Apotheke darf bei Engpass oft auf wirkstoffgleiche Alternativen ausweichen (Rücksprache läuft im Hintergrund), Notdienst-Apotheken findet man über die 116117-App/aponet; E-Rezepte sind nach Ausstellung begrenzt gültig (i. d. R. 28 Tage zulasten der Kasse) — Folgerezepte rechtzeitig anfordern, viele Praxen haben dafür Online-Formulare.</p>
<h5>Reiseapotheke & Flug</h5>
<p>Auf Reisen ins Handgepäck: Dauermedikamente in Originalverpackung plus Beipackzettel, bei verschreibungspflichtigen Mitteln eine ärztliche Bescheinigung (englisch) — manche Wirkstoffe (z. B. starke Schmerz- oder Schlafmittel) sind in anderen Ländern streng reguliert. Genug Vorrat für die gesamte Reise plus Puffer mitnehmen, da identische Präparate vor Ort oft nicht erhältlich sind. Zeitzonen bei zeitkritischer Medikation (z. B. Schilddrüse) vorher mit der Praxis besprechen.</p>
` },

zaehne: { h: `
<h5>Putzen wie empfohlen — in 90 Sekunden erklärt</h5>
<p>2× täglich 2–3 Minuten, fluoridhaltige Pasta, Systematik statt Schrubben: Außen, innen, Kauflächen — immer gleiche Reihenfolge, sanfter Druck (elektrische Bürste mit Drucksensor nimmt den Hauptfehler raus; Studienlage sieht oszillierende/Schall-Bürsten leicht vorn). Danach <strong>ausspucken, nicht spülen</strong> — der Fluoridfilm arbeitet nach. 1× täglich Zwischenräume VOR dem Putzen: Interdentalbürsten in der individuell passenden Größe (in der Praxis anpassen lassen), Zahnseide nur für engste Kontakte. Zucker-Timing schlägt Zuckermenge: 5 Süßattacken über den Tag sind schlimmer als ein Dessert — Säureangriffe brauchen Pausen.</p>
<h5>Parodontitis-Selbstcheck</h5>
<p>Warnzeichen: Zahnfleischbluten beim Putzen, zurückweichendes Zahnfleisch („länger werdende Zähne“), Mundgeruch, gelockerte Zähne, Schwellungen. Ab 2 Treffern: Parodontalen Screening-Index (PSI) beim Zahnarzt ansprechen — Kassenleistung alle 2 Jahre, die systematische Parodontitis-Behandlung inklusive Nachsorge ist seit 2021 deutlich besser abgedeckt. Risikoverstärker: Rauchen (maskiert sogar das Bluten!), Diabetes, Stress, Schwangerschaft.</p>
<h5>Zahnersatz-Optionen im Kostenvergleich</h5>
<table class="ptable"><tr><th>Option</th><th>Gesamtkosten (Richtwert)</th><th>Bedenken</th></tr>
<tr><td>Brücke (3-gliedrig)</td><td>1.500–2.500 €</td><td>Nachbarzähne werden beschliffen — gesunde Zahnsubstanz geht verloren</td></tr>
<tr><td>Implantat + Krone</td><td>2.500–4.500 €</td><td>Beste Langzeitlösung bei gutem Knochen; Festzuschuss deckt nur den „Regelversorgungs“-Anteil</td></tr>
<tr><td>Modellgussprothese</td><td>700–1.500 €</td><td>günstig, herausnehmbar, Komfort begrenzt</td></tr></table>
<p>Immer: Heil- und Kostenplan einreichen, Vergleichsangebot (auch Zahnkliniken/Unikliniken prüfen), Härtefallregelung bei geringem Einkommen (doppelter Festzuschuss = Regelversorgung praktisch zuzahlungsfrei). Der Rechner unten zeigt den Bonusheft-Effekt in Euro.</p>
<h5>Kinderzähne von Anfang an</h5>
<p>Schon der erste Milchzahn wird geputzt — Karies an Milchzähnen schadet den bleibenden. Die größte vermeidbare Ursache ist die Dauernuckelflasche mit gesüßten oder säurehaltigen Getränken; ungesüßter Tee oder Wasser aus dem Becher ab dem ersten Geburtstag schützt. Fluorid in der für das Alter empfohlenen Form (Zahnpasta-Menge altersgerecht) ist der wirksamste Kariesschutz — die konkrete Dosierung mit Kinderarzt oder Zahnarzt abstimmen. Ab dem ersten Zahn zählt auch der Zahnarztbesuch zur Routine; früh und spielerisch nimmt die Angst.</p>
`, tool: "zahnzuschuss" },

sucht: { h: `
<h5>Selbsttests mit Auswertung</h5>
<p><strong>CAGE (Alkohol):</strong> 1. Schon mal das Gefühl gehabt, weniger trinken zu sollen? 2. Ärgern dich Kommentare anderer über dein Trinken? 3. Schuldgefühle wegen des Trinkens? 4. Schon mal morgens getrunken, um in Gang zu kommen? — 2+ Ja = klärungsbedürftig, professionelle Einschätzung holen. <strong>Fagerström (Nikotin, Kurzform):</strong> Erste Zigarette binnen 30 Min nach dem Aufwachen? Mehr als 20/Tag? Schwerster Verzicht auf die Morgenzigarette? — je mehr Ja, desto höher die körperliche Abhängigkeit und desto sinnvoller Nikotinersatz/Medikamente statt reiner Willenskraft. <strong>Verhaltenssüchte-Kurzcheck:</strong> Kontrollverlust (länger/mehr als geplant), gescheiterte Stoppversuche, Vernachlässigung von Pflichten/Beziehungen, Weitermachen trotz Schaden, Entzugssymptome (Unruhe, Gereiztheit) — 3+ über 12 Monate = Beratungsstelle.</p>
<h5>Der evidenzbasierte Rauchstopp-Plan</h5>
<p><strong>Woche −2:</strong> Stoppdatum festlegen, Kassen-Kurs/App buchen (Kassenleistung bzw. bezuschusst), Nikotinersatz besorgen (Pflaster für die Grundlast + Spray/Kaugummi für Spitzen — kombinierbar und in Studien etwa verdoppelte Erfolgsquote), bei starker Abhängigkeit ärztlich über verschreibungsfähige Medikamente sprechen. <strong>Woche −1:</strong> Auslöser-Tagebuch (wann, wo, mit wem), Ersatzrituale je Auslöser planen, Umfeld informieren, Aschenbecher & Vorräte entsorgen. <strong>Tag X bis Woche 4:</strong> Craving-Wellen dauern 3–5 Minuten — Überbrückungs-Toolkit (Wasser, Gehen, Atemzüge 4-7-8, Anruf); Ausrutscher ≠ Rückfall: analysieren, weitermachen. <strong>Ab Monat 2:</strong> Gewichts-Thema mit Bewegung statt Snacks managen, Ex-Raucher-Identität pflegen („Ich rauche nicht“ statt „Ich darf nicht“).</p>
<h5>Reduktion bei Alkohol — und ihre Grenze</h5>
<p>Funktionierende Taktiken: Konsum protokollieren (allein das senkt!), alkoholfreie Tage fest verankern, Standardsituationen entkoppeln (Feierabend-Ritual ersetzen), alkoholfreie Alternativen griffbereit, Trink-Tempo halbieren (Wasser parallel). Grenze der Selbsthilfe: morgendliches Zittern, Schwitzen, frühere Entzugssymptome, gescheiterte ernsthafte Reduktionsversuche, Trinken heimlich oder gegen Gefühle → ärztlich begleiteter Entzug (ambulant oder stationär — wegen Krampf-/Delir-Risiko nie abrupt allein) plus Entwöhnungstherapie; Suchtberatungsstellen lotsen kostenlos durch Anträge und Wartezeiten, Selbsthilfegruppen verdoppeln die Langzeit-Abstinenzchancen. <em>Anonym & kostenlos: örtliche Suchtberatung (Caritas/Diakonie/Blaues Kreuz), BZgA-Infotelefone, für Angehörige Al-Anon.</em></p>
<h5>Für Angehörige</h5>
<p>Mitbetroffene tragen oft jahrelang mit und zerreiben sich dabei. Drei entlastende Wahrheiten: Du hast die Sucht nicht verursacht, kannst sie nicht kontrollieren und nicht heilen. Hilfreich ist, Konsequenzen nicht abzufedern (Ausreden beim Arbeitgeber, Schulden ausgleichen verlängern das Problem), klare eigene Grenzen zu setzen und die eigene Stabilität zu schützen — auch mit Hilfe. Anlaufstellen für Angehörige gibt es unabhängig von der betroffenen Person, etwa Suchtberatungsstellen und Al-Anon. Bei Kindern in der Familie steht deren Schutz an erster Stelle.</p>
`, tool: "rauchstopp" },

ruecken: { h: `
<h5>Das 15-Minuten-Heimprogramm (6 Übungen)</h5>
<p>Je 2 Sätze, 8–12 Wiederholungen bzw. 30 Sek halten, 3×/Woche: 1. <strong>Glute Bridge</strong> (Rückenlage, Becken heben — Gesäß/unterer Rücken) → Progression: einbeinig. 2. <strong>Bird Dog</strong> (Vierfüßler, diagonal Arm+Bein strecken, Rumpf stabil) → Progression: Ellbogen-Knie unterm Körper zusammenführen. 3. <strong>Seitstütz</strong> auf Knien → Progression: gestreckt, dann mit Beinheben. 4. <strong>Wandrutschen/Kniebeuge</strong> bis schmerzfreier Tiefe → Progression: freie Kniebeuge, Zusatzgewicht (Wasserkisten zählen). 5. <strong>Rudern mit Band</strong> (Theraband um Türklinke — oberer Rücken gegen die Sitzhaltung). 6. <strong>Hüftbeuger-Dehnung</strong> im Ausfallschritt, 2× 30 Sek je Seite. Regel: Muskelkater ja, ausstrahlender oder zunehmender Schmerz nein — dann Übung anpassen, nicht aufgeben.</p>
<h5>Red-Flags-Spickzettel & MRT-Entscheidung</h5>
<p>Sofort ärztlich: neue Lähmung oder Fußheber-Schwäche, Taubheit Reithosen-Bereich, Blasen-/Darmstörung (Notfall: Kauda-Syndrom!), Trauma, Fieber + Rückenschmerz, Tumor-Vorgeschichte, unerklärter Gewichtsverlust, nächtlicher Ruheschmerz, Alter &lt;20/&gt;55 bei Erstauftreten mit Begleitsymptomen. <strong>„Brauche ich ein MRT?“</strong> — Entscheidungshilfe: Ohne Red Flags und ohne therapierelevante Konsequenz (OP-Frage, Nervenkompression mit passender Klinik) ändert ein Bild in den ersten 6 Wochen fast nie die Behandlung, kann aber über Zufallsbefunde Angst und Eingriffe produzieren. Sinnvolle Frage an den Arzt: „Würde das Ergebnis unsere nächsten Schritte ändern?“</p>
<h5>Der Weg in verordneten Reha-Sport</h5>
<p>Funktionstraining (Gerätetraining-nah) und Reha-Sport (Gruppen, z. B. Wirbelsäulengymnastik) verordnet der Arzt auf Formular 56 — Kassen genehmigen üblicherweise 50 Übungseinheiten (18–24 Monate), Anbieter sind Reha-Vereine und Physiopraxen, Eigenkosten: keine. Danach: Übergang in Eigenregie (Fitnessstudio mit Präventionskursen — §20-Kurse bezuschussen Kassen mit 75–100 %). Bei chronischem Schmerz &gt;3 Monate trotz allem: multimodale Schmerztherapie ansprechen (Kombination Medizin + Physio + Psychologie — der wirksamste belegte Ansatz, mit Wartezeit, also früh kümmern).</p>
<h5>Akuter Hexenschuss: die ersten 48 Stunden</h5>
<p>Der wichtigste überholte Mythos: Bettruhe schadet. Besser in Bewegung bleiben, so viel der Schmerz erlaubt, leichte Alltagsaktivität fortsetzen, Wärme nutzen, eine bequeme Entlastungshaltung (z. B. Stufenlagerung) für kurze Pausen. Die allermeisten akuten Kreuzschmerzen ohne Warnzeichen bessern sich binnen Tagen bis weniger Wochen von selbst. Ärztlich abklären bei den oben genannten Red Flags oder wenn nach etwa zwei Wochen keine Besserung eintritt.</p>
` },

chronisch: { h: `
<h5>Der Krankengeld-Zeitstrahl mit allen Fallen</h5>
<table class="ptable"><tr><th>Phase</th><th>Was gilt</th><th>Falle</th></tr>
<tr><td>Woche 1–6</td><td>Lohnfortzahlung 100 % vom Arbeitgeber</td><td>AU lückenlos! Folgebescheinigung spätestens am letzten Werktag der laufenden</td></tr>
<tr><td>Ab Woche 7</td><td>Krankengeld der Kasse: 70 % brutto, max. 90 % netto, gedeckelt</td><td>Kasse „aktiviert“ gern früh Richtung Reha/Rente — Mitwirkungspflichten ernst nehmen, aber Fristen ausschöpfen; bei Aufforderung zum Reha-Antrag (§51) Beratung holen, denn der kann in Rentenantrag umgedeutet werden</td></tr>
<tr><td>Bis Woche 78</td><td>Maximalbezug je Krankheit in 3 Jahren (Lohnfortzahlung zählt mit)</td><td>„Aussteuerung“ danach: nahtlos ALG I beantragen (Nahtlosigkeitsregelung §145 SGB III) — 3 Monate vorher kümmern!</td></tr></table>
<h5>GdB-Antrag optimieren</h5>
<p>1. Vor dem Antrag: Alle behandelnden Ärzte informieren und um aussagekräftige Befundberichte bitten — entscheidend ist die dokumentierte <em>Funktionseinschränkung im Alltag</em>, nicht die Diagnose („kann nicht 30 Min sitzen“ schlägt „Bandscheibenvorfall L4/5“). 2. Alle Leiden angeben, auch die „kleinen“ (Psyche, Schlafapnoe, Migräne — der Gesamt-GdB entsteht aus dem Zusammenwirken). 3. Antrag beim Versorgungsamt (online möglich), Kopien statt Originale. 4. Bescheid prüfen: Einzel-GdB-Werte anfordern, Widerspruch binnen 1 Monat ist oft erfolgreich — Sozialverbände (VdK/SoVD, ~7–10 €/Monat) übernehmen das Verfahren. Ab GdB 50: Steuerpauschbetrag, Zusatzurlaub (5 Tage), Kündigungsschutz-Plus, ggf. 2 Jahre früherer Rentenzugang; ab 30 mit Gleichstellung (Arbeitsagentur): Kündigungsschutz im Job.</p>
<h5>Reha-Antrag mit Formulierungshilfen</h5>
<p>Zuständig ist meist die DRV (G0100-Formulare, Arzt füllt Befundbericht). Erfolgsfaktoren: konkretes Reha-Ziel benennen („Arbeitsfähigkeit als … erhalten“), Alltags- und Arbeitsbeeinträchtigungen plastisch schildern, bisherige erfolglose ambulante Therapien auflisten. Wunsch- und Wahlrecht: Klinik selbst vorschlagen (Zertifizierung + Indikations-Schwerpunkt prüfen). Ablehnung? Widerspruch mit ergänzten Arztberichten — die Quoten drehen sich im Widerspruch häufig. Nach der Reha: Stufenweise Wiedereingliederung über den Entlassbericht direkt anstoßen, BEM-Gespräch konstruktiv nutzen (eigene Vertrauensperson darf mit!). Unten: Krankengeld-Rechner für die Langstrecken-Finanzplanung.</p>
<h5>Am Arbeitsplatz: Hilfen und Nachteilsausgleich</h5>
<p>Chronisch krank heißt nicht automatisch leistungsgemindert — oft fehlen nur die richtigen Hilfen. Das Integrations-/Inklusionsamt fördert technische Ausstattung und Arbeitsplatzanpassungen, bei anerkannter Schwerbehinderung gibt es Zusatzurlaub und besonderen Kündigungsschutz, und das betriebliche Eingliederungsmanagement (BEM) nach längerer Krankheit ist die Bühne, um Arbeitszeit, Aufgaben oder Homeoffice anzupassen. Eine eigene Vertrauensperson darf zu jedem BEM-Gespräch mitkommen.</p>
`, tool: "krankengeld" },
datenschutz: { h: `
<h5>Musterschreiben Auskunft & Löschung</h5>
<p><strong>Auskunft (Art. 15):</strong> „Hiermit beantrage ich Auskunft nach Art. 15 DSGVO über sämtliche zu meiner Person gespeicherten Daten, deren Herkunft, Empfänger und Speicherdauer sowie eine Kopie dieser Daten. Bitte antworten Sie innerhalb der gesetzlichen Monatsfrist.“ — per E-Mail an die im Impressum/Datenschutzerklärung genannte Adresse, Identifikationsdaten (Name, Kundennummer) beilegen, mehr nicht. <strong>Löschung (Art. 17):</strong> „Ich widerrufe sämtliche Einwilligungen und beantrage die Löschung meiner personenbezogenen Daten, soweit keine gesetzlichen Aufbewahrungspflichten entgegenstehen; über erfolgte Löschung bitte ich um Bestätigung.“ Keine oder ausweichende Antwort nach 1 Monat → Beschwerde bei der Landesdatenschutzbehörde (Online-Formular, kostenlos) — die Behörden verfolgen Auskunftsverweigerung inzwischen ernsthaft.</p>
<h5>Der 60-Minuten-Sicherheits-Setup</h5>
<p>Minute 0–20: Passwortmanager installieren (Browser-Import nutzen), Master-Passwort als Passphrase (4–5 zufällige Wörter). Minute 20–40: 2FA aktivieren in dieser Reihenfolge — E-Mail-Hauptkonto, Banking, Apple/Google-ID, PayPal, Social Media; Authenticator-App statt SMS, <strong>Backup-Codes ausdrucken</strong> und zu den Dokumenten legen (der häufigste Selbst-Aussperr-Fehler). Minute 40–60: Passwörter der Top-10-Konten auf Manager-generierte Unikate ändern, alte E-Mail-Weiterleitungen und verknüpfte Apps/Logins („Anmelden mit…“) ausmisten. Danach Kür: automatische Updates überall an, Festplatten-/Handy-Backup einrichten (3-2-1-Regel).</p>
<h5>Smartphone-Berechtigungen & Tracking</h5>
<p>Quartalsweise 10 Minuten: App-Berechtigungen durchgehen (Standort „immer“ → „beim Verwenden“, Mikrofon/Kontakte nur wo plausibel), ungenutzte Apps löschen (jede ist Angriffsfläche), Werbe-ID zurücksetzen/deaktivieren, App-Tracking-Anfragen standardmäßig ablehnen. Browser: ein Tracking-Blocker genügt, Cookie-Banner konsequent „Ablehnen“ (der Button muss gleichwertig erreichbar sein — ist er es nicht, ist das ein Beschwerdegrund).</p>
<h5>Notfallplan: Konto gehackt</h5>
<p>1. Vom sauberen Gerät: Passwort ändern, 2FA neu, alle Sitzungen/Geräte abmelden (Funktion „überall abmelden“). 2. E-Mail-Konto zuerst — dort Weiterleitungsregeln und Wiederherstellungsadressen auf Manipulation prüfen (Klassiker der Angreifer). 3. Verknüpfte Konten und Zahlungsdienste kontrollieren, Bank informieren. 4. Kontakte warnen (Betrugsnachrichten in deinem Namen). 5. Beweise sichern (Screenshots), Anzeige online. 6. Leak-Checker: Welche weiteren Konten nutzen dasselbe Passwort? Alle ändern.</p>
<h5>Kinderfotos und fremde Personen</h5>
<p>Am Recht am eigenen Bild führt kein Weg vorbei: Fotos anderer Erwachsener nur mit deren Einverständnis posten, bei Kindern entscheiden die Eltern — und beim eigenen Nachwuchs lohnt Zurückhaltung („Sharenting“), denn das Netz vergisst nicht und das Kind wurde nie gefragt. Praktisch: Gesichter unkenntlich machen oder nur in geschlossenen Gruppen teilen, Standortdaten aus Bildern entfernen, und in der Familie eine klare Linie verabreden, wer was von den Kindern veröffentlichen darf.</p>
` },

verkehr: { h: `
<h5>Einspruch ja oder nein? Die Entscheidungshilfe</h5>
<p>Einspruch (2 Wochen, formlos, zunächst ohne Begründung möglich) lohnt strukturell bei: drohendem Fahrverbot oder Punkten mit Folgen (Probezeit!), Messungen mit bekannten Problemzonen (Abstand zur Messstelle, mobile Blitzer, Schätzungen), Verjährungs-Chance (3 Monate bis Anhörung/Bescheid), Fahrer-Verwechslung (Anhörungsbogen nie vorschnell ausfüllen — keine Pflicht zur Selbstbezichtigung; Angaben zur Sache freiwillig). Kaum lohnend: einfache Park-/geringe Tempoverstöße ohne Punkte — die Verfahrenskosten bei Misserfolg übersteigen das Bußgeld schnell. Mit Verkehrsrechtsschutz: Akteneinsicht + Messdaten-Prüfung kosten dich nichts — dann fast immer prüfen lassen. Probezeit-Sonderregeln: A-Verstoß (z. B. &gt;20 km/h zu schnell, Rotlicht) = Aufbauseminar + Verlängerung auf 4 Jahre; zweiter A-Verstoß = Verwarnung + Empfehlung verkehrspsychologische Beratung; danach Entzug.</p>
<h5>Unfallabwicklung Schritt für Schritt</h5>
<p>Tag 0: Fotos (Gesamtsituation, Positionen, Schäden, Kennzeichen, Bremsspuren), Unfallbericht ausfüllen, nichts unterschreiben außer Datenaustausch. Tag 1–3: Schaden der GEGNERISCHEN Haftpflicht melden (eigene Kasko nur bei Eigenschuld/Teilschuld nötig — Rückstufung bedenken!). Ab ~1.000 € Schaden: eigenen Gutachter beauftragen (zahlt bei klarer Fremdschuld die Gegenseite — nicht auf den Versicherer-Gutachter verweisen lassen); darunter: Kostenvoranschlag. Ansprüche komplett stellen: Reparatur ODER fiktive Abrechnung (Auszahlung nach Gutachten), Wertminderung, Nutzungsausfall (Tabelle!) oder Mietwagen, Gutachterkosten, Kostenpauschale (~25–30 €), bei Verletzung Schmerzensgeld + Haushaltsführungsschaden. Bei Teilschuld-Diskussion oder Personenschaden: Anwalt — bei Fremdschuld zahlt dessen Honorar die Gegenseite.</p>
<h5>Bußgeld-Schnellcheck</h5>
<p>Der Rechner unten zeigt die Regelsätze des Bußgeldkatalogs für Tempoverstöße (nach Toleranzabzug: meist 3 km/h unter 100, 3 % darüber). Verdoppler im Kopf behalten: Anhänger/LKW, Baustellen-Beschilderung, qualifizierte Tatbestände (Gefährdung, Nässe-Limit).</p>
<h5>Punkte in Flensburg — ab wann wird es eng</h5>
<table class="ptable"><tr><th>Punktestand</th><th>Folge</th></tr>
<tr><td>1–3</td><td>Vormerkung, keine Maßnahme</td></tr>
<tr><td>4–5</td><td>Ermahnung (kostenpflichtig)</td></tr>
<tr><td>6–7</td><td>Verwarnung + Pflichtberatung empfohlen</td></tr>
<tr><td>8</td><td>Entzug der Fahrerlaubnis</td></tr></table>
<p>Punkte verfallen einzeln nach 2,5 / 5 / 10 Jahren je nach Schwere. Ein freiwilliges Fahreignungsseminar baut bei 1–5 Punkten einen Punkt ab (einmal in 5 Jahren).</p>
`, tool: "bussgeld" },

nachbarschaft: { h: `
<h5>Die Eskalationsleiter mit Musterformulierungen</h5>
<p><strong>Stufe 1 — das Tür-Gespräch</strong> (löst die Mehrheit): neutraler Zeitpunkt, Ich-Botschaft, konkretes Anliegen, Lösungsvorschlag. „Mir ist aufgefallen, dass die Musik nachts oft durchdringt — ich muss früh raus. Können wir uns auf 22 Uhr verständigen?“ <strong>Stufe 2 — die freundliche Notiz</strong> (dokumentiert, ohne zu eskalieren): Anliegen + Datum + Gesprächsangebot, Kopie behalten. <strong>Stufe 3 — Vermieter/Verwaltung</strong> (bei Mietern): Lärmprotokoll beilegen, Abhilfe binnen Frist fordern, Mietminderung ankündigen. <strong>Stufe 4 — Schiedsperson/Schlichtungsstelle</strong> der Gemeinde: in vielen Ländern ohnehin Klage-Voraussetzung, Kosten gering, Vergleich ist vollstreckbar! <strong>Stufe 5 — Anwalt/Klage</strong>: nur mit sauberem Protokoll, Zeugen und realistischem Ziel — und im Wissen, dass man danach weiter Wand an Wand wohnt.</p>
<h5>Grenzabstände: der Landesrecht-Wegweiser</h5>
<p>Faustwerte vieler Nachbarrechtsgesetze (verbindlich ist IMMER das eigene Bundesland — Suchwort „Nachbarrechtsgesetz + Land“): Hecken/kleine Sträucher bis 2 m Höhe ≈ 0,5 m Grenzabstand, größere Gehölze/Bäume 1–2 m, stark wachsende Bäume bis 4 m; gemessen ab Stammmitte. <strong>Verjährung beachten:</strong> Beseitigungsansprüche wegen zu geringen Abstands verjähren in den meisten Ländern nach 5–6 Jahren ab Pflanzung/Überschreiten — danach bleibt nur der Rückschnitt-Anspruch auf Überhang. Überhang-Selbsthilfe (§ 910 BGB): erst angemessene Frist setzen, Schnitt fachgerecht, Vogelschutz (1. März–30. Sept.: kein radikaler Hecken-Rückschnitt, Form-/Pflegeschnitt erlaubt), Grenzeinrichtungen (Zaun auf der Grenze) nur gemeinsam ändern.</p>
<h5>Top-10-Mythen im Faktencheck</h5>
<p>1. „1× im Monat laut feiern ist erlaubt“ — nein. 2. „Kinderlärm kann ich verbieten lassen“ — nein, privilegiert. 3. „Wäsche im Garten/Balkon kann der Nachbar untersagen“ — nein. 4. „Laub vom Nachbarbaum muss er entfernen“ — grundsätzlich selbst fegen; nur bei außergewöhnlicher Belastung „Laubrente“ denkbar. 5. „Ich darf eine Kamera auf den Gehweg/Nachbargrund richten“ — nein, Persönlichkeitsrecht (auch Attrappen können unzulässig sein). 6. „Gewohnheitsrecht: Ich ging da immer lang“ — Wegerechte brauchen Grundbuch oder Baulast. 7. „Rauchen auf dem eigenen Balkon ist unbeschränkbar“ — Gerichte haben Zeitfenster-Lösungen gebilligt. 8. „Mein Grundstück, meine Astsäge“ — nicht ohne Frist und nicht zur Unzeit. 9. „Der Zaun gehört dem, der ihn gebaut hat“ — auf der Grenze: gemeinsam. 10. „Bei Streit entscheidet sowieso das Gericht“ — in vielen Ländern erst NACH Pflicht-Schlichtung. <strong>WEG-Sonderfall:</strong> In Eigentümergemeinschaften laufen Konflikte über Hausordnung, Beschlüsse und Verwalter — Beschluss-Anfechtung binnen 1 Monat!</p>
<h5>Ruhezeiten: was wirklich gilt</h5>
<p>Allgemein anerkannt sind Nachtruhe (22–6 Uhr) und vielerorts eine Mittagsruhe; Sonn- und Feiertage sind besonders geschützt. „Zimmerlautstärke“ heißt: außerhalb der Wohnung kaum wahrnehmbar. Aber: Maßgeblich sind Hausordnung und Landes-/Kommunalrecht, nicht das Bauchgefühl. Haushaltsübliche Geräusche (Staubsaugen tagsüber, spielende Kinder) muss man hinnehmen; gezielte Dauerstörungen nicht. Im Streit hilft ein sachliches Lärmprotokoll (Datum, Uhrzeit, Art, Dauer) mehr als jede Eskalation an der Tür.</p>
` },

strafverfahren: { h: `
<h5>Die drei Rollen-Spickzettel</h5>
<p><strong>Beschuldigt:</strong> Personalien ja, sonst der eine Satz: „Ich mache von meinem Schweigerecht Gebrauch und äußere mich nur über meinen Verteidiger.“ Keine Smalltalk-Falle („unter uns…“), keine Handy-Freigabe ohne Beschluss, nichts unterschreiben außer Empfangsbestätigungen. Dann: Anwalt, Akteneinsicht, erst danach gemeinsam entscheiden, ob Einlassung sinnvoll ist. <strong>Zeuge:</strong> Bei Polizei freiwillig (höflich verweisen: „gern nach schriftlicher Ladung der Staatsanwaltschaft“), bei StA/Gericht Pflicht; wahrheitsgemäß, aber „Ich erinnere mich nicht sicher“ ist eine legitime Antwort — Auskunft verweigern darf, wer sich oder Angehörige belasten würde (§ 55 StPO). Zeugenbeistand (Anwalt) ist erlaubt. <strong>Opfer:</strong> Anzeige + Aktenzeichen, eigene Beweissicherung parallel (Screenshots mit URL/Datum, Attest bei Verletzung — Rechtsmedizin dokumentiert auch ohne Anzeige!), Strafantragsfrist 3 Monate bei Antragsdelikten, über Verfahrensausgang Mitteilung beantragen (§ 406d StPO).</p>
<h5>Verteidiger: wer, wann, wer zahlt</h5>
<p>Pflichtverteidiger gibt es nicht erst „wenn man sich keinen leisten kann“, sondern bei notwendiger Verteidigung (drohende Freiheitsstrafe ab bestimmter Schwere, Untersuchungshaft, Berufsverbote, schwierige Lage) — seit der Reform schon im Ermittlungsverfahren bestellbar, und man darf den Anwalt selbst vorschlagen! Kosten trägt zunächst die Staatskasse; bei Verurteilung werden sie zurückgefordert. Wahlverteidiger: Erstgespräch klärt Honorar (Strafsachen oft Stundensatz/Pauschale statt RVG-Minimum). Goldene Frist: Verteidiger VOR der ersten Aussage, nicht vor der Verhandlung.</p>
<h5>Vom Aktenzeichen zum Ausgang</h5>
<p>Ablauf: Anzeige → Ermittlungen (Vernehmungen, Durchsuchung, Gutachten) → StA entscheidet: Einstellung (§ 170 II mangels Tatverdacht; § 153/153a Geringfügigkeit, ggf. gegen Auflage — keine Vorstrafe!), Strafbefehl oder Anklage. Statistisch endet ein Großteil der Verfahren mit Einstellung. <strong>Führungszeugnis-Wahrheiten:</strong> Einstellungen erscheinen nie; Verurteilungen bis 90 Tagessätze (Ersttäter) erscheinen im normalen Führungszeugnis NICHT — „vorbestraft“ im Alltagssinn beginnt erst darüber; das Bundeszentralregister weiß mehr, fragt aber kaum jemand ab. Opfer-Extra: Beim WEISSEN RING gibt es Hilfeschecks für anwaltliche Erstberatung und psychotraumatologische Erstversorgung — unbürokratisch.</p>
<h5>Hausdurchsuchung — Verhalten in fünf Punkten</h5>
<p>1. Ruhe bewahren, nicht widersetzen (das ist strafbar). 2. Durchsuchungsbeschluss zeigen und sich den Tatvorwurf nennen lassen; bei „Gefahr im Verzug“ ohne Beschluss Namen und Dienststelle notieren. 3. Schweigen — kein erklärendes Wort, auch nicht beiläufig. 4. Der Durchsuchung widersprechen (zu Protokoll), nichts freiwillig herausgeben, Sicherstellung dokumentieren lassen (Verzeichnis verlangen!). 5. Sofort Verteidiger anrufen. Aktiv mithelfen muss man nicht; Passwörter herausgeben in der Regel auch nicht.</p>
` },

abzocke: { h: `
<h5>12 aktuelle Maschen mit Original-Wortlaut</h5>
<table class="ptable"><tr><th>Masche</th><th>Typischer Wortlaut / Ablauf</th></tr>
<tr><td>Bank-Phishing</td><td>„Ihr Konto wurde vorübergehend eingeschränkt. Bestätigen Sie Ihre Daten…“</td></tr>
<tr><td>Paket-SMS</td><td>„Ihre Sendung wartet. Zollgebühr 1,99 € hier zahlen:“ (Kleinbetrag = Kartendaten-Ernte)</td></tr>
<tr><td>WhatsApp-Kind</td><td>„Hallo Mama, Handy kaputt, neue Nummer. Kannst du eine Rechnung für mich zahlen?“</td></tr>
<tr><td>Schockanruf</td><td>„Hier Polizei — Ihr Sohn hatte einen tödlichen Unfall. Gegen Kaution…“ (Weinen im Hintergrund, auch KI-Stimme)</td></tr>
<tr><td>Falsche Polizei</td><td>„Einbrecherbande in Ihrer Straße — wir sichern Ihre Wertsachen.“ (Echte Polizei holt NIE Wertsachen ab; 110 erscheint nie als Anrufer-Nummer)</td></tr>
<tr><td>Fake-Shop</td><td>Markenware −60 %, „nur noch heute“, am Ende geht doch nur Vorkasse</td></tr>
<tr><td>Kleinanzeigen-Käufer</td><td>„Ich zahle über den ‚Sicher bezahlen'-Link“ (gefälschte Plattform-Seite fischt Kartendaten)</td></tr>
<tr><td>Support-Popup</td><td>„Ihr PC ist infiziert — rufen Sie Microsoft an“ + Fernwartungs-Software</td></tr>
<tr><td>Romance Scam</td><td>Wochenlange Liebe, dann: Arzt/Ingenieur/Soldat im Ausland braucht Geld für Zoll/Ticket/OP</td></tr>
<tr><td>Anlage-Betrug</td><td>„Garantiert 1 % pro Tag“, Promi-Fake-Werbung, Demo-Konto mit Schein-Gewinnen, Auszahlung nur gegen „Steuer“</td></tr>
<tr><td>Abo-Falle</td><td>„Gratis-Test“ mit Kleingedrucktem — Kündigungsbutton-Pflicht & 14-Tage-Widerruf nutzen</td></tr>
<tr><td>Jobangebot „Finanzagent“</td><td>„Empfangen Sie Zahlungen auf Ihr Konto, behalten Sie 10 %“ = Geldwäsche, strafbar!</td></tr></table>
<h5>Notfall-Fahrplan nach Geldabfluss</h5>
<p><strong>Stunde 0–1:</strong> Bank-Sperrhotline bzw. 116 116 — Überweisung zurückrufen lassen (Echtzeit kaum, Standard manchmal noch stoppbar), Karten sperren, Online-Banking-Passwort ändern. <strong>Stunde 1–24:</strong> Beweise sichern (Screenshots, Nummern, IBAN des Empfängers!), Online-Anzeige bei der Polizei mit allen Daten, bei Kartenzahlung Chargeback über die Bank anstoßen, Lastschriften zurückgeben (8 Wochen Frist). <strong>Tag 2–14:</strong> Verbraucherzentrale für zivilrechtliche Schritte, bei Identitätsmissbrauch zusätzlich Schufa-Meldung; Geldwäsche-Verdachtskonten werden durch schnelle Anzeigen oft eingefroren — Tempo entscheidet über Rückhol-Chancen.</p>
<h5>Rückbuchungs-Rechte je Zahlart</h5>
<p>Lastschrift: 8 Wochen bedingungslos zurück (13 Monate bei fehlendem Mandat). Kreditkarte: Chargeback bei Nichtlieferung/Betrug — Frist je nach Anbieter, schriftlich reklamieren. PayPal & Co.: Käuferschutz binnen 180 Tagen, aber nicht bei „Geld an Freunde“! Überweisung: kein Rückholrecht — nur freiwillige Rückgabe oder Ermittlungserfolg. Gutscheinkarten/Krypto/Bargeldboten: faktisch verloren — deshalb sind sie die Lieblingszahlwege der Täter. <strong>Schutz-Setup für Eltern/Großeltern:</strong> Codewort, Anrufbeantworter als Filter („Wir rufen zurück“), Tageslimit fürs Konto, die Regel „Geldfragen am Telefon = auflegen + Familie anrufen“ — und regelmäßig über neue Maschen sprechen, ohne zu beschämen: Jeder kann Opfer werden, die Skripte sind Profi-Arbeit.</p>
<h5>Die zwei goldenen Schutzregeln</h5>
<p>Erstens: niemals unter Zeitdruck handeln. Jede Masche lebt von künstlicher Dringlichkeit („nur jetzt“, „sonst gesperrt“, „sofort zahlen“) — genau dann auflegen, nicht klicken, eine Nacht drüber schlafen. Zweitens: den Kanal selbst wählen. Nie auf Links, Rückrufnummern oder Anhänge aus der verdächtigen Nachricht reagieren, sondern Bank, Amt oder Anbieter über die selbst herausgesuchte offizielle Nummer kontaktieren. Diese beiden Reflexe entwerten fast jeden Betrugsversuch — und gehören in jedes Gespräch mit älteren Angehörigen.</p>
`, tool: "verjaehrung" },

anwalt: { h: `
<h5>PKH-Selbstcheck & Beratungshilfe</h5>
<p>Prozesskostenhilfe prüft zwei Dinge: <strong>Bedürftigkeit</strong> (einzusetzendes Einkommen nach Abzügen — Faustlage: wer nach Miete, Unterhaltspflichten und Freibeträgen wenig übrig hat, liegt im Voll- oder Ratenbereich) und <strong>Erfolgsaussicht</strong> (keine Mutwilligkeit; das Gericht prüft summarisch). Antrag mit Formular „Erklärung über persönliche und wirtschaftliche Verhältnisse“ + Belegen, am besten durch den Anwalt zusammen mit der Klage. Ehrlich bleiben: Falsche Angaben sind strafbar, und 4 Jahre lang kann das Gericht Nachzahlung verlangen, wenn sich die Verhältnisse bessern (Mitteilungspflicht!). Für den außergerichtlichen Bereich: Beratungshilfeschein beim Amtsgericht (Wohnort), Eigenanteil 15 € — deckt Beratung und oft auch erste Vertretung; Arbeits-, Sozial- und Familienrecht sind die Klassiker.</p>
<h5>Der 3-Stufen-Mahnbrief in drei Tonlagen</h5>
<p><strong>Stufe 1 (freundlich, Tag 0):</strong> „…ist mir aufgefallen, dass die Rechnung Nr. X vom … über … € noch offen ist. Sicher ein Versehen — ich bitte um Ausgleich bis zum [+14 Tage].“ <strong>Stufe 2 (bestimmt, Tag 14):</strong> „…trotz meiner Erinnerung vom … ist kein Zahlungseingang erfolgt. Ich setze hiermit eine letzte Frist bis zum [+10 Tage]. Nach Fristablauf befinden Sie sich in Verzug; Verzugszinsen und Kosten gehen zu Ihren Lasten.“ <strong>Stufe 3 (letzte Frist, Tag 24):</strong> „…kündige ich an, ohne weitere Vorankündigung gerichtliche Schritte (Mahnbescheid) einzuleiten. Frist: [+7 Tage].“ Danach: Online-Mahnantrag (mahngerichte.de) — Gebühr ab ~36 €, trägt am Ende der Schuldner; Widerspricht er nicht: Vollstreckungsbescheid = Titel für 30 Jahre. Wichtig: Verzug tritt spätestens 30 Tage nach Rechnung+Fälligkeit ein; eine Mahnung mit Datum beschleunigt und beweist.</p>
<h5>Schlichtungsstellen-Landkarte</h5>
<p>Banken (Ombudsmann der Verbände — Entscheidungen bis 10.000 € für Banken oft bindend!), Versicherungen (Versicherungsombudsmann, bindend bis 10.000 €), Energie (Schlichtungsstelle Energie), Telekommunikation (Bundesnetzagentur), Reise (söp — Bahn, Flug, Schiff), Ärzte (Gutachterkommissionen), Handwerk (Innungen), Online-Käufe (Universalschlichtungsstelle). Alle: kostenlos für Verbraucher, hemmen die Verjährung, Schriftform genügt. Strategie: Erst Unternehmens-Beschwerde mit Frist (14 Tage), dann Schlichtung — die Erfolgsquoten sind hoch, weil Unternehmen die Verfahren bezahlen. Unten: das Prozesskostenrisiko als Rechner — oft das beste Argument FÜR die Schlichtung.</p>
<h5>Erstberatung: Kosten deckeln</h5>
<p>Für Verbraucher ist die anwaltliche Erstberatung gesetzlich gedeckelt (höchstens 190 € zzgl. USt) — vorher kurz klären: „Berechnen Sie die Erstberatung nach dem gesetzlichen Höchstsatz?“ Wer rechtsschutzversichert ist, lässt vor dem Termin eine Deckungsanfrage stellen (oft macht das die Kanzlei). Folgekosten richten sich nach Streitwert (RVG) oder Honorarvereinbarung — beides vorab schriftlich. Der Prozesskosten-Rechner unten zeigt, was ein Verfahren im Verlustfall kosten kann; das ist meist das stärkste Argument für Schlichtung oder Vergleich.</p>
`, tool: "prozesskosten" },

haftung: { h: `
<h5>Aufsichtspflicht nach Alter — mit Urteils-Beispielen</h5>
<table class="ptable"><tr><th>Alter</th><th>Richtschnur der Gerichte</th></tr>
<tr><td>0–3</td><td>Ständige Aufsicht in Reich-/Sichtweite; Gefahrenquellen (Wasser, Straße, Herd) lückenlos sichern</td></tr>
<tr><td>4–5</td><td>Spielen im gesicherten Umfeld: Kontrolle in kurzen Intervallen (~15–30 Min) genügt; bekannte „Ausbüxer“ enger</td></tr>
<tr><td>6–7</td><td>Draußen spielen ohne Dauerbeobachtung okay, regelmäßige Vergewisserung; Schulweg nach Einübung allein</td></tr>
<tr><td>8–10</td><td>Stundenweise allein zu Hause und unterwegs vertretbar — abhängig von Reife und Umgebung</td></tr>
<tr><td>ab 12</td><td>Weitgehende Selbstständigkeit; Aufsicht wird zur Belehrungs- und Kontrollpflicht (z. B. Internet, gefährliche Hobbys)</td></tr></table>
<p>Beispiele aus der Rechtsprechung: Eltern hafteten NICHT, als ein 5-Jähriger beim 20-minütig unbeaufsichtigten Spielen Autos zerkratzte (Aufsicht in Intervallen genügte) — wohl aber, als Kleinkinder mit erreichbarem Feuerzeug zündelten oder ein bekannt „wilder“ 7-Jähriger unbeaufsichtigt mit dem Rad auf den Gehweg voller Passanten geschickt wurde. Merkformel: Je jünger das Kind, je gefährlicher die Situation, je auffälliger die Vorgeschichte — desto enger die Pflicht. Filesharing-Klassiker: Eltern genügen ihrer Pflicht durch Belehrung über illegale Downloads; anlasslose PC-Überwachung schulden sie nicht.</p>
<h5>Privathaftpflicht-Bausteine zum Abhaken</h5>
<p>☐ Deckungssumme ≥ 10 Mio. € pauschal ☐ <strong>Deliktunfähige Kinder</strong> mitversichert (zahlt, obwohl rechtlich keine Haftung — rettet Nachbarschaft & Familienfrieden) ☐ <strong>Gefälligkeitsschäden</strong> eingeschlossen ☐ <strong>Forderungsausfall</strong> (der unterschätzte Selbstschutz: zahlt, wenn DIR jemand ohne Versicherung und Vermögen Schaden zufügt — inkl. Vollstreckungshilfe) ☐ Schlüsselverlust fremder Schlüssel (privat + beruflich) ☐ Mietsachschäden ☐ geliehene/gemietete Sachen ☐ Ehrenamt/Tagesmutter-Tätigkeiten ☐ Drohnen/E-Scooter-Klarstellung ☐ Auslandsaufenthalte ausreichend lang. Alte Verträge (&gt;5 Jahre) im Zweifel updaten — Neuverträge sind oft besser UND billiger.</p>
<h5>Gefälligkeits-Fallsammlung</h5>
<p>Umzugshelfer lässt den Fernseher fallen → haftet grundsätzlich (Privathaftpflicht mit Gefälligkeitsklausel zahlt; ohne Klausel berufen sich Versicherer auf stillschweigenden Haftungsverzicht — dann bleibt der Freund drauf sitzen). Blumengieß-Nachbar überschwemmt die Wohnung → Haftung ja, gleiche Lösung. Mitfahrgelegenheit mit Unfall → KFZ-Haftpflicht des Fahrers deckt Insassen. Geliehener Akkuschrauber raucht ab → normale Abnutzung nein, Fehlbedienung ja. Kinder-Fahrgemeinschaft → Aufsichts- und Sicherungspflichten (Kindersitz!) liegen beim Fahrer. Moral: Vor großen Gefälligkeiten der Helfenden einmal „Hast du eine Privathaftpflicht?“ fragen — unromantisch, aber freundschaftserhaltend.</p>
<h5>Tiere haften besonders</h5>
<p>Als Tierhalter haftet man verschuldensunabhängig (Gefährdungshaftung) für Schäden, die das Tier anrichtet — auch ohne eigenes Verschulden. Für Hunde ist die Hundehaftpflicht in den meisten Bundesländern Pflicht, für Pferde dringend zu empfehlen; die normale Privathaftpflicht deckt nur Kleintiere wie Katzen oder Kaninchen. Bei „gehüteten“ fremden Tieren (Hundesitting) greift unter Umständen eine Tierhüterhaftung — vorher die Policen beider Seiten klären.</p>
` },
haustiere: { h: `
<h5>Der Eignungs-Selbsttest (12 Fragen, ehrlich!)</h5>
<p>1. Bin ich bereit, 10–18 Jahre täglich Verantwortung zu tragen — auch wenn sich mein Leben ändert (Kind, Umzug, Trennung)? 2. Wer übernimmt bei Krankheit, Urlaub, Dienstreise — habe ich ZWEI Backup-Personen? 3. Trägt mein Budget 100–250 €/Monat plus 2.000 € Notfallreserve? 4. Erlaubt der Mietvertrag das Tier schriftlich? 5. Passt die Energie des Tiers zu meiner (Border Collie ≠ Sofa-Mensch)? 6. Bin ich bei Hund bereit für 3× täglich raus, bei jedem Wetter, Jahre lang? 7. Allergien in Haushalt/Familie getestet? 8. Was passiert mit dem Tier, wenn MIR etwas zustößt (Patenregelung)? 9. Will das ganze Haushalts-Team das Tier — oder nur einer? 10. Schaffe ich Erziehung/Sozialisierung (Hundeschule: Zeit + 200–500 €)? 11. Kann ich Dreck, Haare, zerkratzte Möbel, Erbrochenes nüchtern ertragen? 12. Will ich ein Tier — oder das Bild davon? Bei mehr als 2 unsicheren Antworten: warten, Gassi-Patenschaft im Tierheim testen, Pflegestelle probieren.</p>
<h5>Tierarzt-Kostentabelle (GOT-Richtwerte)</h5>
<table class="ptable"><tr><th>Posten</th><th>Hund</th><th>Katze</th></tr>
<tr><td>Jahres-Check + Impfung</td><td>80–150 €</td><td>70–120 €</td></tr>
<tr><td>Kastration</td><td>250–500 €</td><td>120–250 €</td></tr>
<tr><td>Zahnsanierung (Narkose)</td><td>300–900 €</td><td>250–700 €</td></tr>
<tr><td>Kreuzband-/Fraktur-OP</td><td>1.500–4.000 €</td><td>1.000–2.500 €</td></tr>
<tr><td>Notdienst-Grundgebühr</td><td colspan="2">+ 50 € pauschal, Sätze bis 4-fach — Notfälle sind IMMER teuer</td></tr></table>
<p>Konsequenz: OP-Versicherung (10–25 €/Monat, VOR der ersten Diagnose abschließen) oder eisernes Tierkonto — niemals beides weglassen; „Einschläfern aus Kostengründen“ ist das vermeidbarste Tierdrama.</p>
<h5>Erstausstattung ohne Geldverbrennung & Adoption Schritt für Schritt</h5>
<p>Wirklich nötig (Hund): Leine + Geschirr (anpassen lassen!), 2 Näpfe, Bett, Transportsicherung fürs Auto, Zeckenzange — zusammen &lt; 150 €; Spielzeug-Berge, Kleidung und Smart-Gadgets sind Zubehörhandel-Folklore. Tierheim-Ablauf: 1. Online-Profile sichten, aber vor Ort offen bleiben (die Richtigen stehen selten im Schaufenster). 2. Mehrfach besuchen, Gassi-/Kennenlern-Termine. 3. Ehrlicher Selbstauskunftsbogen + Vorkontrolle zu Hause (normal, keine Schikane). 4. Schutzvertrag lesen (Rückgabeklausel = Sicherheitsnetz). 5. Eingewöhnung: 3-3-3-Faustregel — 3 Tage Schock, 3 Wochen Ankommen, 3 Monate echtes Zuhause; Reizarmut und Routine schlagen Action-Programm.</p>
<h5>Reise & Unterbringung mitdenken</h5>
<p>Vor der Anschaffung ehrlich klären, was im Urlaub passiert: Pension (Hund 20–35 €/Tag, Katze günstiger, gute Plätze früh ausgebucht), vertraute Betreuungsperson zu Hause (am stressärmsten fürs Tier) oder Mitnahme (Transport, Einreiseregeln, EU-Heimtierausweis, Tollwutimpfung). Manche Tiere reisen schlecht — das gehört in die Anschaffungsentscheidung, nicht erst in die Urlaubsplanung. Zwei verlässliche Backup-Personen sind kein Luxus, sondern Voraussetzung.</p>
`, tool: "haustier" },

garten: { h: `
<h5>Anbauplan fürs erste Jahr (Monat für Monat)</h5>
<table class="ptable"><tr><th>Monat</th><th>Balkon & Beet</th></tr>
<tr><td>Feb–März</td><td>Planen, Erde & Töpfe besorgen; ab Ende März: Schnittsalat, Radieschen, Spinat direkt säen (vertragen Kälte)</td></tr>
<tr><td>April</td><td>Kräuter pflanzen (Schnittlauch, Petersilie; Basilikum erst Mai!), Kartoffeln in Kübel legen, Erbsen säen</td></tr>
<tr><td>Mitte Mai</td><td>NACH den Eisheiligen: Tomaten, Paprika, Zucchini, Gurken als Jungpflanzen setzen — der wichtigste Termin des Gartenjahres</td></tr>
<tr><td>Juni–Aug</td><td>Ernten + nachsäen (Salat alle 3 Wochen), Tomaten ausgeizen & regelmäßig gleichmäßig gießen (Platzschutz), mulchen</td></tr>
<tr><td>Sept–Okt</td><td>Feldsalat & Spinat für den Winter säen, Knoblauch stecken, Ernte-Bilanz: Was kommt nächstes Jahr weg/dazu?</td></tr>
<tr><td>Nov–Jan</td><td>Beete mulchen statt umgraben, Werkzeug pflegen, Saatgut-Tausch, Kataloge & Vorfreude</td></tr></table>
<h5>Schrebergarten ohne Ablöse-Falle</h5>
<p>Die Ablöse zahlt man für Laube, Bäume und Anlagen des Vorpächters — Pflicht ist eine <strong>Wertermittlung durch den Verein/Verband</strong> (Gutachter-Protokoll verlangen!): Mondpreise „unter der Hand“ sind unzulässig und verhandelbar. Vorher prüfen: Zustand der Laube (Feuchte! Strom? legal gebaut?), Altlasten (asbesthaltige Dächer = teure Entsorgung), Baumbestand (Fällungen kosten), Vereinssatzung (Gemeinschaftsstunden, Bauregeln, Tierhaltung, Übernachtungs-Praxis). Rote Flaggen: Druck („drei andere Interessenten“), keine Wertermittlung, Barzahlung ohne Quittung. Geduld zahlt sich aus — im Herbst/Winter werden Gärten günstiger abgegeben als im Mai.</p>
<h5>Mischkultur-Spickzettel & Urlaubs-Bewässerung</h5>
<p>Gute Nachbarn: Tomate+Basilikum, Möhre+Zwiebel (vertreiben gegenseitig Fliegen), Salat+Radieschen, Gurke+Dill, Kohl+Sellerie. Schlechte: Tomate+Kartoffel (Krautfäule!), Zwiebel+Bohne, Kohl+Kohl (Fruchtfolge: 3 Jahre Pause). <strong>Gießen im Urlaub — drei Systeme:</strong> 1. Low-Tech: Tonkegel/Olla-Töpfe + große Wasserflaschen (zuverlässig für 3–7 Tage, ~3 €/Topf). 2. Tröpfchenbewässerung mit Zeitschaltuhr am Wasserhahn (Balkon-Sets ab 30–60 €, wochenlang autark — vorher 1 Woche Probelauf!). 3. Die Nachbarschafts-Währung: Gießdienst gegen Ernteanteil — funktioniert seit Generationen und baut nebenbei das Netzwerk aus dem Nachbarschafts-Artikel.</p>
<h5>Giftpflanzen, wenn Kinder oder Tiere mitgärtnern</h5>
<p>Hübsch, aber heikel: Eibe, Fingerhut, Goldregen, Engelstrompete, Maiglöckchen, Herbstzeitlose, Oleander und Rizinus gehören nicht in erreichbare Nähe kleiner Kinder; für Katzen sind zusätzlich Lilien hochgiftig, für Hunde u. a. Trauben/Rosinen und Avocado im Beet. Faustregel: Unbekanntes nicht in Mundnähe, Beeren-Naschen nur bei sicher bestimmten Arten. Giftnotruf des Bundeslandes ins Handy — bei Verdacht Pflanze/Teil sichern und anrufen, kein Erbrechen auslösen.</p>
` },

digitalbalance: { h: `
<h5>Das 4-Wochen-Rückeroberungs-Programm</h5>
<p><strong>Woche 1 — Messen & Verstehen:</strong> nichts ändern, nur Bildschirmzeit-Report täglich ansehen + notieren, WANN und WARUM gegriffen wird (Langeweile? Aufschieben? Übergänge?). <strong>Woche 2 — Architektur:</strong> Benachrichtigungs-Großputz, Social-Apps von Homescreen + Log-out, Graustufen ab 21 Uhr, Ladeplatz raus aus dem Schlafzimmer, Wecker kaufen. <strong>Woche 3 — Ersatz installieren:</strong> für jeden Haupt-Trigger eine Alternative platzieren (Buch neben Sofa, Podcast für Pendeln, 10-Min-Spaziergang als Pausen-Default); ein App-Limit auf den größten Zeitfresser. <strong>Woche 4 — Verankern:</strong> einen medienfreien Tagesanker fix machen (Mahlzeiten ODER erste Stunde), Wochen-Review: Report vergleichen, was bleibt, was war zu streng? Realistisches Ziel: −30–50 % beim Hauptzeitfresser, nicht digitale Askese.</p>
<h5>App-für-App-Friktion</h5>
<p>Instagram/TikTok: Log-out nach Nutzung + nur Browser-Version (spürbar unbequemer = seltener); YouTube: Autoplay aus, Startseiten-Feed per Browser-Erweiterung leeren, Abos gezielt statt Empfehlungs-Strudel; News: 2 feste Zeiten, eine Qualitätsquelle als App — Push nur für echte Eilmeldungen; Messenger: Gruppen stumm, „Zuletzt online“ aus (nimmt Antwortdruck), feste Antwort-Slots statt Dauerbereitschaft; Mail privat: 2×/Tag reicht; Spiele mit Energie-/Streak-Mechanik: Streak bewusst EINMAL reißen lassen — der Bann bricht erstaunlich vollständig.</p>
<h5>Doomscrolling-Notbremsen & Familienregeln</h5>
<p>Akut-Tricks, wenn der Daumen schon scrollt: laut benennen („Ich doomscrolle gerade“ — Metakognition unterbricht Autopilot), Handy in die andere Hand (stört das motorische Muster), 3 tiefe Atemzüge + eine konkrete Alternative starten, App-Timer als Stoppschild akzeptieren statt wegklicken. <strong>Familienregeln, die halten:</strong> Regeln gelten für ALLE (Eltern-Doppelmoral ist der Hauptgrund fürs Scheitern), Geräte-Garage im Flur ab 20 Uhr, medienfreie Zonen (Esstisch, Schlafzimmer) statt Minuten-Feilschen, gemeinsame Medienzeit aufwerten (Familienfilm zählt anders als paralleles Scrollen) — und bei Teenagern: Interesse vor Kontrolle, Mitsprache bei den Regeln erhöht die Einhaltung dramatisch.</p>
<h5>Konzentration zurückgewinnen</h5>
<p>Dauerablenkung verlernt das lange Bei-der-Sache-Bleiben. Gegentraining: täglich ein bewusster Block ohne Unterbrechung (Handy außer Reichweite, Tabs zu, ein einziges Ziel), zu Beginn 25 Minuten, später länger. Übergänge und Wartezeiten nicht reflexhaft mit dem Bildschirm füllen — Langeweile aushalten ist die Voraussetzung für eigene Gedanken. Wer morgens die erste Stunde bildschirmfrei hält, startet messbar fokussierter in den Tag.</p>
` },

sportverein: { h: `
<h5>Der Motivationstyp-Test</h5>
<p>Je Frage A/B/C notieren: 1. Ich sage Termine eher ab, wenn … A) niemand auf mich wartet B) sie unflexibel sind C) es nichts zu gewinnen gibt. 2. Frühere Sport-Hochphasen hatten … A) feste Gruppen/Trainer B) freie Zeiteinteilung C) Wettkämpfe/Ziele. 3. Nach 3 Wochen Routine brauche ich … A) Menschen, die mich vermissen B) Abwechslung ohne Zwang C) messbaren Fortschritt. 4. Peinlich wäre mir … A) gar nichts in der Gruppe B) Beobachtetwerden im Kurs C) Verlieren. <strong>Mehrheit A = Sozialtyp:</strong> Verein, feste Kurse, Laufgruppe — Verbindlichkeit ist dein Treibstoff. <strong>Mehrheit B = Autonomietyp:</strong> Studio mit Plan, Heimtraining mit Programm, Schwimmen/Laufen solo — aber baue EINEN Fixpunkt ein (Personal Training monatlich, Online-Programm mit Check-ins). <strong>Mehrheit C = Wettkampftyp:</strong> Verein mit Liga, Volkslauf-Anmeldung als Deadline, Kletter-Grade, Trackings — melde dich JETZT für ein Event in 12 Wochen an.</p>
<h5>Studio-Vertrags-Checkliste vor der Unterschrift</h5>
<p>☐ Laufzeit & Kündigungsfrist (nach Erstlaufzeit monatlich kündbar — Gesetz!) ☐ Gesamtpreis-Ehrlichkeit: Startpaket? Zwangs-„Servicepauschale“ jährlich? Getränke-/Solarium-Module abwählbar? ☐ Ruhezeiten-Option bei Krankheit/Schwangerschaft schriftlich ☐ Umzugs-Sonderkündigung geregelt ☐ Probetraining + Stoßzeiten-Besuch gemacht (18 Uhr Dienstag zeigt die Wahrheit) ☐ Kursplan real verfügbar oder ewig ausgebucht? ☐ Keine Vorkasse für 12+ Monate. Verhandeln ist normal: Startpaket erlassen, Monat gratis, Kündigungs-Rückzieher werden fast immer bepreist — Stichtag in den Kalender!</p>
<h5>Das 8-Wochen-Comeback nach langer Pause</h5>
<p>Woche 1–2: nur Gewöhnung — 3× 20–30 Min zügiges Gehen/lockeres Radeln + 1 Mini-Kraftblock (Kniebeuge, Wand-Liegestütz, je 2×10). Woche 3–4: 3× 30–40 Min, Kraft auf 2 Blöcke, erste Belastungssteigerung NUR bei beschwerdefreier Vorwoche (10-%-Regel). Woche 5–6: eine Einheit „etwas fordernd“ (zügige Intervalle im Gehen/Laufen 5× 1 Min), Kraft 2× ganzkörperlich. Woche 7–8: Zielformat testen (Vereins-Probetraining, 5-km-Lauf in Wohlfühltempo, erster Kurs). Warnregeln: Schmerz ≠ Muskelkater → Pause & ggf. abklären; Schwindel/Brustdruck/untypische Atemnot → sofort Abbruch und ärztlich; ab 35–40 mit Risikofaktoren (Blutdruck, Rauchen, Familiengeschichte) Check-up VOR Woche 1. <strong>Unterschätzte Erwachsenen-Sparten im Verein:</strong> Volleyball-Hobbygruppen, Badminton, Tischtennis, Rudern (Anfängerkurse 50+ üblich!), Leichtathletik-Senioren, Tanzen, Klettern, Bogenschießen, Wandern — Probetraining kostet nur die Überwindung.</p>
<h5>Kosten: der Verein schlägt fast alles</h5>
<p>Preislich ist der Verein konkurrenzlos: Jahresbeiträge liegen häufig im Bereich weniger Euro pro Monat, oft mit mehreren Sparten und Trainerstunden inklusive — ein Bruchteil eines Studiovertrags, dazu Gemeinschaft und (über den Verein) Sportversicherung. Für Kinder, Geringverdiener und Leistungsbeziehende übernehmen „Bildung und Teilhabe“ und kommunale Fonds den Beitrag ganz oder teilweise. Wer Bewegung dauerhaft will, fängt am besten dort an, wo Verbindlichkeit und Kosten beide stimmen.</p>
` },

kreativ: { h: `
<h5>Instrument-Wahlhilfe für Erwachsene</h5>
<table class="ptable"><tr><th>Instrument</th><th>Erste Erfolge</th><th>Bedenken</th></tr>
<tr><td>Ukulele</td><td>1–2 Wochen (3 Akkorde = 100 Songs)</td><td>der unterschätzte Königsweg für Späteinsteiger, ~50–80 €</td></tr>
<tr><td>Gitarre</td><td>4–8 Wochen bis Lagerfeuer-Basis</td><td>Fingerschmerz-Tal in Woche 2–4 aushalten; Westerngitarre mit niedriger Saitenlage kaufen</td></tr>
<tr><td>Klavier/Keyboard</td><td>sofort schöne Töne, Monate bis Beidhändigkeit</td><td>Keyboard mit Anschlagdynamik ab ~150 € reicht für Jahr 1</td></tr>
<tr><td>Cajon/Percussion</td><td>1 Abend</td><td>sofort gruppentauglich, ideal für „Unmusikalische“</td></tr>
<tr><td>Gesang/Chor</td><td>sofort</td><td>Instrument immer dabei; Chöre nehmen fast alle — Stimmbildung inklusive</td></tr>
<tr><td>Geige/Blasinstrumente</td><td>Monate (Tonbildung!)</td><td>nur mit Unterricht und Leidensbereitschaft — dafür tiefe Befriedigung</td></tr></table>
<h5>Der 90-Tage-Plan (Beispiel Gitarre / übertragbar)</h5>
<p>Tage 1–30 — Fundament: 15–20 Min täglich, NUR 4 Dinge: Haltung, 4 Akkorde (G, C, D, Em), sauberer Wechsel, einfaches Schlagmuster; Erfolgskriterium: 1 Song holprig durchspielen. Tage 31–60 — Repertoire: 5 Songs, Wechsel flüssiger (Metronom-App langsam!), Barré anfangen (F) ohne Frust-Dogma; wöchentlich 1× mit Aufnahme kontrollieren (Fortschritt hören = Motivation). Tage 61–90 — Öffentlichkeit light: 1 Song auswendig + vor 1–2 Menschen spielen, Unterrichtsstunde zur Fehlerkorrektur, nächstes 90-Tage-Ziel setzen. Zeichnen-Variante: 30 Tage Grundformen/Schraffur-Drills → 30 Tage Gegenstände nach Referenz → 30 Tage ein Motivthema in Serie. Schreiben: 30× 200 Wörter Morgenseiten → 30 Tage Szenen-Übungen → 30 Tage eine Kurzgeschichte in Etappen + 1 Feedback-Leser.</p>
<h5>Übe-Wissenschaft & Lampenfieber</h5>
<p>Deliberate Practice kurzgefasst: am Rand des Könnens üben (nicht das Beherrschte wiederholen), in kleinste Einheiten zerlegen (NUR der eine Akkordwechsel, 2 Minuten), sofortiges Feedback (Aufnahme, Spiegel, Lehrer), Schlaf konsolidiert — deshalb schlagen 6× 20 Min die Sonntags-Session. Fehlerkultur: Fehler laut begrüßen („gefunden!“) statt zusammenzucken — Anspannung ist der Feind der Feinmotorik. <strong>Auftritts-Angst entschärfen:</strong> Exposition in Treppenstufen (allein aufnehmen → 1 Person → 3 Personen → offene Bühne), 4-7-8-Atmung vor dem Start, Fokus vom „Wie wirke ich“ aufs „Was gebe ich“ verschieben, und das Profi-Geheimnis akzeptieren: Lampenfieber verschwindet nie ganz — es wird Begleiter statt Gegner.</p>
<h5>Kreativ werden ohne Budget</h5>
<p>Der Einstieg kostet fast nichts: Büchereien verleihen vielerorts Instrumente, Werkzeug und Nähmaschinen, Volkshochschulen bieten günstige Schnupperkurse, und für Musik, Bild und Schrift gibt es kostenlose Software und Tutorials in Hülle und Fülle. Materialreste aus Kleinanzeigen und Gebrauchtinstrumente senken die Hürde weiter. Die teuerste Ausrüstung ersetzt nicht die zehn Minuten täglich — also erst anfangen, dann (vielleicht) aufrüsten.</p>
` },

soziales: { h: `
<h5>Der Netzwerk-Audit (20 Minuten, 1× im Jahr)</h5>
<p>Drei Spalten: <strong>Energiespender</strong> (nach Kontakt fühle ich mich besser), <strong>Neutrale</strong>, <strong>Energieräuber</strong> (Dauerkritik, Einbahnstraßen-Nehmen, Konkurrenz-Sticheleien). Dann drei ehrliche Fragen: Wen aus Spalte 1 vernachlässige ich aus reiner Logistik? (→ Ritual einrichten.) Welche Spalte-3-Kontakte pflege ich nur aus Gewohnheit oder Schuldgefühl? (→ dosieren, nicht dramatisch „trennen“ — Frequenz senken genügt meist.) Und die unbequemste: In welcher Spalte stehe ICH wohl bei anderen? Wichtig: Der Audit ist kein Ausmisten von Menschen in Krisen — ein Freund in der Depression ist kein „Energieräuber“, sondern ein Freund in der Depression; das Kriterium ist das Dauer-Muster über Jahre, nicht die Phase.</p>
<h5>Initiativen-Skripte ohne Awkwardness</h5>
<p>Wiederbelebung nach langer Funkstille: „Ich habe gerade an [konkrete gemeinsame Erinnerung] gedacht und musste grinsen. Wie geht's dir eigentlich? Lust auf einen Kaffee in den nächsten Wochen?“ — keine Entschuldigungs-Arie für das Schweigen (beide haben geschwiegen). Vom Bekannten zum Freund: nach dem 3.–4. Gruppenkontakt das Einzel-Angebot — „Du hattest von [Thema] erzählt — ich wollte da eh mal hin. Zusammen?“ Konkret schlägt vage: „Donnerstag oder Samstag?“ statt „irgendwann mal“. Nach dem Treffen der unterschätzte Verstärker: kurze Nachricht „War richtig gut heute — gern wieder.“ Die Drei-Initiativen-Regel gegen das Grübeln: dreimal konkret eingeladen ohne jede Gegeninitiative oder Alternativvorschlag → Energie woanders investieren, ohne Groll.</p>
<h5>Rushhour-Edition & 10-Jahres-Strategie</h5>
<p><strong>Eltern kleiner Kinder:</strong> Freundschaft an den Alltag andocken statt zusätzlich stemmen — Spielplatz-Verabredungen mit den Eltern, die man mag; Familien-Sonntagessen im Wechsel; der „Parallel-Hangout“ (zusammen kochen/werkeln, Kinder wuseln) zählt voll; Paar-Freundschaften brauchen zusätzlich Einzel-Drähte (sonst stirbt der Kontakt bei Trennung der anderen mit). <strong>Die 10-Jahres-Strategie gegen Einsamkeit im Alter</strong> beginnt mit 50, nicht mit 75: 2–3 Strukturen aufbauen, die nicht vom Job abhängen (Verein, Chor, Ehrenamt, Stammtisch), jüngere Kontakte bewusst pflegen (Mehrgenerationen-Effekt: Nachbarskinder, Vereinsjugend, Mentoring), Rituale schriftlich verankern (der Januar-Wandertag findet statt, Punkt), Wohnortwahl im Alter nach Menschen-Nähe statt nur Landschaft — und die Initiativen-Muskeln nie einrosten lassen: Wer mit 60 noch einlädt, wird mit 80 noch eingeladen.</p>
<h5>Qualität schlägt Quantität</h5>
<p>Man braucht keinen großen Freundeskreis, um nicht einsam zu sein — ein, zwei verlässliche, vertraute Beziehungen tragen mehr als zwanzig lose Kontakte. Wer sich einsam fühlt, ist nicht „schlecht im Netzwerken“, sondern Mensch in einer Lebensphase; entscheidend ist, in die wenigen tragenden Verbindungen zu investieren (Verlässlichkeit, echtes Zuhören, gemeinsame Rituale) statt Kontakte zu sammeln. Tiefe entsteht durch Wiederholung und Verletzlichkeit, nicht durch Reichweite.</p>
` },

auszeit: { h: `
<h5>Brückentage-Architektur</h5>
<p>Das Prinzip: Urlaubstage an Feiertags-Cluster docken — die Klassiker: Weihnachten/Neujahr (3–4 Urlaubstage = 10–12 freie Tage), Ostern (4 = 10), Mai-Feiertage und Himmelfahrt/Pfingsten (je 4 = 9–12, in günstigen Jahren Ketten von 16+ Tagen mit 8 Urlaubstagen), 3. Oktober & 1. November je nach Bundesland. Strategie: Im NOVEMBER fürs Folgejahr planen (bevor die Kollegen es tun), Feiertage des eigenen Bundeslands in den Kalender, 2 lange Blöcke + 2–3 verlängerte Wochenenden mischen — Erholungsforschung zeigt: mehrere kürzere Auszeiten schlagen den einen Mammut-Urlaub beim Erholungseffekt, der nach 1–2 Wochen zurück im Job ohnehin verfliegt; was bleibt, ist Vorfreude — und die ist planbar.</p>
<h5>Das Zeitwertkonto-Modell durchgerechnet</h5>
<p>Beispiel „9 Monate arbeiten, 3 Monate frei bei durchgehend 75 % Gehalt“: Brutto 4.000 € → 12 Monate je 3.000 € ausgezahlt, Differenz fließt ins Wertguthaben und finanziert die Freistellung — durchgehend sozialversichert (KV! Rente!), Urlaubsanspruch und Betriebszugehörigkeit laufen weiter, Rückkehr ist vertraglich der Normalfall. Varianten: Ansparen über 2–3 Jahre für 6 Monate, Überstunden/Bonus einzahlen. Ohne formales Zeitwertkonto geht die einfache Schwester: unbezahlter Sonderurlaub — dann selbst checken: freiwillige GKV (Mindestbeitrag ~230 €/Monat) oder Familienversicherung, Rentenlücke (freiwillige Beiträge optional), kein Gehalt = vorher ansparen. Steuerbonus nebenbei: Im Auszeit-Jahr sinkt das zu versteuernde Einkommen — die Progression schenkt einen Teil zurück.</p>
<h5>Der Sabbatical-Pitch & die Wiedereinstiegs-Checkliste</h5>
<p><strong>Pitch-Aufbau (1 Seite):</strong> 1. Wunsch + Zeitraum in der Nebensaison („März–Juni, nach Projektabschluss X“). 2. Vertretungsplan mit Namen und Übergabe-Doku-Zusage. 3. Was die Firma gewinnt (gehaltene Fachkraft, frische Energie, ggf. erworbene Skills/Sprache). 4. Vorschlag des Modells (Zeitwertkonto/unbezahlt) + Bitte um schriftliche Rückkehrvereinbarung auf gleichwertige Position. Timing: 6–12 Monate vorher, nach einem Erfolg, nie im Krisenquartal. <strong>Wiedereinstieg:</strong> ☐ Rückkehrdatum + erste Woche geblockt (Übergaben lesen, 1:1s, KEIN Großprojekt ab Tag 1) ☐ 3 Monatsgehälter Puffer unangetastet ☐ Verträge/Versicherungen reaktiviert ☐ Erkenntnis-Termin mit sich selbst: Was nehme ich strukturell mit (Arbeitszeit? Rolle? Prioritäten?) — sonst frisst der Alltag das Sabbatical in 6 Wochen. Unten: der Spar-Rechner vom Wunschdatum rückwärts.</p>
<h5>Auch kleine Auszeiten zählen</h5>
<p>Nicht jede Pause braucht drei Monate. Forschung zur Erholung zeigt: Regelmäßige kleine Unterbrechungen — ein verlängertes Wochenende im Quartal, ein fester freier Nachmittag, echter Feierabend ohne Diensthandy — wirken nachhaltiger als der eine Mammuturlaub, dessen Effekt nach ein, zwei Wochen verflogen ist. Wer auf das große Sabbatical noch spart, baut die kleinen Auszeiten schon jetzt fest ein; sie sind die Probeläufe und halten bis dahin die Energie oben.</p>
`, tool: "sabbatical" },
auslandszeit: { h: `
<h5>Die Format-Entscheidungsmatrix</h5>
<table class="ptable"><tr><th>Format</th><th>Alter</th><th>Eigenkosten</th><th>Stärke</th></tr>
<tr><td>Erasmus+ Semester</td><td>Studierende</td><td>gering (Zuschuss + Gebührenerlass)</td><td>Studium läuft weiter, Anrechnung</td></tr>
<tr><td>Auslands-BAföG-Studium</td><td>Studierende</td><td>gering–mittel</td><td>weltweite Ziele, Gebührenzuschuss</td></tr>
<tr><td>Work & Travel</td><td>18–30/35</td><td>Startkapital 3–5 T€, dann selbsttragend</td><td>maximale Freiheit, Englisch im Alltag</td></tr>
<tr><td>Au-pair</td><td>18–26</td><td>fast null (Kost, Logis, Taschengeld)</td><td>Familienanschluss, Sprache intensiv</td></tr>
<tr><td>weltwärts/ESK/FSJ-Ausland</td><td>18–28 (ESK bis 30)</td><td>fast null (gefördert!)</td><td>Sinn + Struktur, starkes Lebenslauf-Signal</td></tr>
<tr><td>Auslandspraktikum/Azubi-Austausch</td><td>Azubis & Berufstätige</td><td>gering (Erasmus+ Berufsbildung)</td><td>fachlich verwertbar, auch kurz (2–12 Wochen)</td></tr></table>
<h5>Der 12-Monats-Countdown</h5>
<p>M −12: Format + 2 Zielländer festlegen, Visa-Kontingente und Bewerbungsfristen notieren (Japan/Kanada-WHV: sofort!). M −9: Förderanträge (Auslands-BAföG ans zuständige Sonder-Amt, Erasmus übers International Office, weltwärts-Bewerbung), Sprachnachweis-Termin buchen falls nötig. M −6: Visum beantragen, Flug mit flexiblem Rückflug, Auslandskrankenversicherung vergleichen (Langzeit-Tarife 1–2 €/Tag, VOR Abreise!). M −3: Learning Agreement/Praktikumsvertrag unterschreiben lassen, Untermieter für Zimmer (Vermieter-Erlaubnis!), Konto mit gebührenfreier Auslandskarte, internationale Führerschein, Impfcheck. M −1: Vollmacht + Post-Lösung, Verträge pausieren, Dokumenten-Scans in die Cloud, Notfallkontakte. Unterwegs: Erlebnisse monatlich in 3 Lebenslauf-Bullets übersetzen — nach der Rückkehr erinnert man nur noch Strände.</p>
<h5>Geld verdienen unterwegs & Rückkehr</h5>
<p>Working-Holiday-Klassiker: Farmarbeit/Erntehilfe (oft mit Unterkunft, in Australien teils Visa-Verlängerungs-relevant), Hostel-Arbeit gegen Bett + Lohn, Gastro/Tourismus in Saisonorten, Umzugs-/Lagerjobs in Städten — Steuernummer des Gastlands zuerst (TFN/IRD/SIN), Lohn nur aufs eigene Konto, Steuererstattung bei Ausreise mitnehmen! Au-pair: Taschengeld-Richtwerte des Gastlands kennen, Wochenstunden und freie Tage vertraglich. Rückkehr: Innerhalb der ersten 2 Wochen GKV reaktivieren (Anwartschaft oder neue Mitgliedschaft), Anmeldung, Anrechnungs-Unterlagen einreichen — und im Lebenslauf die Drei-Satz-Story formulieren: Was, welche Verantwortung, was bleibt (Sprache B2, Selbstorganisation, konkrete Anekdote fürs Vorstellungsgespräch).</p>
<h5>Versicherungslücke vermeiden</h5>
<p>Der teuerste Anfängerfehler ist die Kranken­versicherungs-Lücke. Wer gesetzlich versichert ist und das Land länger verlässt, klärt vor der Abreise: ruht der Schutz (dann Anwartschaft abschließen, sonst droht beim Wiedereinstieg eine Beitragslücke) oder bleibt er bestehen? Zusätzlich immer eine Auslandskrankenversicherung für die gesamte Dauer (Langzeittarife, vor Abreise abschließen) — die normale Reisepolice deckt nur wenige Wochen. Nach der Rückkehr GKV in den ersten zwei Wochen reaktivieren.</p>
` },

aufstieg: { h: `
<h5>Die Kostenrechnung am Beispiel (Industriemeister, berufsbegleitend)</h5>
<p>Lehrgang 6.500 € + Prüfungsgebühren 800 € + Literatur/Fahrten 700 € = 8.000 € Bruttokosten. Aufstiegs-BAföG: 50 % Zuschuss auf Lehrgang+Prüfung (3.650 € geschenkt), Rest als KfW-Darlehen — nach bestandener Prüfung werden davon 50 % erlassen (weitere ~1.825 € geschenkt). Verbleibender Eigenanteil: ~2.500 €, zinsgünstig gestreckt. Dazu: Meisterprämie des Bundeslands (wo vorhanden 1.000–3.000 €) und Steuer — sämtliche Kosten sind Werbungskosten, bei 30 % Grenzsteuersatz kommen mehrere hundert Euro zurück. Realistischer Netto-Eigenanteil: oft unter 1.500 € für einen Bachelor-gleichwertigen Abschluss mit 10–25 % Gehaltssprung. Vollzeit-Variante: schneller, plus Unterhaltsbeitrag vom Amt, aber Einkommensausfall gegenrechnen.</p>
<h5>Entscheidungsbaum & Prüfungsstruktur</h5>
<p>Vollzeit, wenn: Arbeitgeberwechsel ohnehin geplant, Rücklagen für 6–12 Monate, Lerntyp „Immersion“. Berufsbegleitend, wenn: Arbeitgeber zahlt mit/braucht dich, Familie planbar belastbar, Disziplin für 2 Abende + Samstag über 2+ Jahre. Fernlehrgang nur mit fester Lerngruppe und Prüfungs-Präsenzphasen. Die Prüfung (Beispiel IHK): fachrichtungsübergreifender + handlungsspezifischer Teil, Projektarbeit/Fachgespräch, dazu AEVO (Ausbildereignung) — meist vorgezogen ablegbar: tun! Die typischen Durchfaller-Fehler: AEVO aufgeschoben, alte Prüfungen nicht trainiert (siehe Lern-Artikel: Übungsklausuren!), Projektarbeit-Thema zu groß gewählt, Zeitmanagement im handlungsspezifischen Teil. Wiederholen ist normal und zweimal möglich — einzelne Teile, nicht alles.</p>
<h5>Danach: Selbstständigkeit oder Hochschule</h5>
<p>Meister im zulassungspflichtigen Handwerk = Eintrag in die Handwerksrolle = eigener Betrieb möglich (plus Ausbilden eigener Azubis — das Nachwuchs-Argument im Fachkräftemangel). Betriebsübernahme schlägt Neugründung oft: Nachfolgebörsen der Kammern listen Betriebe ohne Nachfolger, Kaufpreis verhandelbar, Kundenstamm inklusive — Beratung der Kammer ist kostenlos. Hochschulweg: Mit DQR-6-Abschluss bundesweit Studienberechtigung; manche Hochschulen rechnen Fortbildungsinhalte sogar auf ein BWL-/Ingenieur-Studium an. Und nach oben: Geprüfter Betriebswirt (DQR 7) als Master-Pendant — das Aufstiegs-BAföG fördert auch die zweite Stufe erneut.</p>
<h5>Eigenanteil selbst rechnen</h5>
<p>Der Rechner unten zeigt aus den Lehrgangs- und Prüfungsgebühren, was nach Zuschuss und Darlehenserlass real übrig bleibt — meist nur rund ein Viertel der Gebühren, gestreckt und zinsgünstig. Material, Fahrten und Literatur kommen hinzu, sind aber als Werbungskosten absetzbar; eine eventuelle Meisterprämie des Bundeslandes senkt die Last weiter.</p>
` },

lernen: { h: `
<h5>Der 6-Wochen-Prüfungsplan (Vorlage)</h5>
<table class="ptable"><tr><th>Woche</th><th>Fokus</th><th>Anteil Abrufen</th></tr>
<tr><td>6–5 vorher</td><td>Stoff sichten, in 8–12 Themenblöcke teilen, Karteikarten anlegen WÄHREND des Durcharbeitens</td><td>30 %</td></tr>
<tr><td>4–3</td><td>Blöcke lernen (je 2–3 Tage), tägliche Karten-Wiederholung, erste alte Prüfung „offen“ lösen</td><td>50 %</td></tr>
<tr><td>2</td><td>Schwächen aus Klausur Nr. 1 gezielt schließen, 2. Übungsklausur unter Echtbedingungen</td><td>70 %</td></tr>
<tr><td>1</td><td>NUR Wiederholung: Karten, 3. Klausur, Eselsbrücken-Blatt; keine neuen Themen!</td><td>90 %</td></tr>
<tr><td>Letzte 2 Tage</td><td>Leichtes Wiederholen, Logistik (Weg, Ausweis, erlaubte Hilfsmittel), Schlaf vor Stoff</td><td>—</td></tr></table>
<h5>Spaced Repetition richtig einstellen</h5>
<p>Karten-Prinzipien: eine Frage pro Karte (atomar!), eigene Worte statt Buch-Copy, Bilder/Beispiele auf die Rückseite, „Warum“-Karten zusätzlich zu „Was“-Karten. App-Standardintervalle (1–3–7–14–30 Tage) passen für die meisten; bei nahem Prüfungstermin Intervalle stauchen. Die unbequeme Regel: Karten, die man „eigentlich weiß“, ehrlich als gewusst/nicht gewusst bewerten — Selbstbetrug ist der Hauptgrund, warum Apps „nicht funktionieren“. 15–20 Min tägliche Wiederholung schlagen jede Wochenend-Session; neue Karten auf ~20/Tag deckeln, sonst erdrückt der Stapel.</p>
<h5>Blackout-Protokoll & Mythen-Ranking</h5>
<p><strong>Blackout im Ernstfall:</strong> 1. Stift weglegen, 10 Sek Ausatmen-betont atmen (4 ein / 6 aus, dreimal). 2. Zur leichtesten Aufgabe springen — Erfolg reaktiviert. 3. Zum Blackout-Thema alles hinschreiben, was assoziiert ist (Brainstorm löst Blockade). 4. Nach 10 Min zurückkehren; bei mündlich: „Darf ich kurz strukturieren?“ + laut gliedern. <strong>Wirksamkeits-Ranking der Forschung:</strong> Sehr wirksam: Selbsttest/Übungsklausuren, verteiltes Lernen. Mittel: Selbsterklären, Wechsel der Aufgabentypen (Interleaving). Gering: Markieren, Wiederlesen, Zusammenfassen ohne Abruf. Mythos: Lerntypen (visuell/auditiv) — die Passung zum STOFF zählt, nicht zum Typ; Mozart-Effekt; „Nachts lernt man besser“ (Schlafdefizit löscht mehr, als die Stunden bringen).</p>
<h5>Gegen Aufschieben: die Anfang-Tricks</h5>
<p>Aufschieben ist selten Faulheit, meist Aufgaben-Unschärfe oder Angst vor dem großen Berg. Gegenmittel: die nächste Handlung winzig machen („Buch aufschlagen, eine Karte schreiben“) — die 5-Minuten-Regel überlistet die Anlauf-Hürde, der Rest folgt fast von selbst. Feste Startzeit + fester Ort schaffen einen Reflex; Handy in anderen Raum; nach 25 Minuten Arbeit 5 Minuten Pause (Pomodoro). Tagesziel als erledigbare Liste, nicht als Stimmung.</p>
` },

sprachen: { h: `
<h5>Der 6-Monats-Plan zu B1 (30–45 Min/Tag)</h5>
<p><strong>Monat 1–2 (A0→A2-Basis):</strong> täglich 15 Min App/Kurs + 15 Min Frequenz-Vokabeln (Ziel: 600 Wörter), ab Woche 2 der erste Tandem-/Lehrer-Termin (ja, mit 50 Wörtern — Skript unten); Input: Lerner-Podcasts beim Pendeln. <strong>Monat 3–4 (A2 festigen):</strong> Sprechtermine auf 2×/Woche, Serien mit Zielsprachen-Untertiteln (gleiche Folge 2× schauen!), Schreiben beginnen (3 Sätze Tagebuch, Korrektur via Tandem), Vokabeln Richtung 1.200. <strong>Monat 5–6 (B1-Schwelle):</strong> erste Original-Inhalte (YouTube, einfache Artikel), Sprechthemen vorbereiten (über sich, Beruf, Meinung zu Alltagsthemen — die B1-Prüfungsklassiker), Probeprüfung des Ziel-Zertifikats. Wochenstruktur als Anker: Mo/Mi/Fr App+Karten, Di/Do Sprechen, Sa Input-Session, So frei — Konstanz schlägt Intensität.</p>
<h5>Tandem & Lehrer optimal nutzen</h5>
<p>Tandem finden: Apps (Tandem, HelloTalk), VHS-Börsen, Uni-Aushänge, lokale Sprachcafés — Regel: Zeit fair halbieren (25/25 Min pro Sprache, Timer!), Themen vorab schicken. <strong>Erster-Termin-Skript für Anfänger:</strong> Vorstellen (Name, Stadt, Beruf — 5 Sätze auswendig), 10 vorbereitete Fragen an den Partner, die Erlaubnis-Ansage: „Bitte korrigiere nur die wichtigsten Fehler, ich will erstmal flüssig werden.“ Online-Lehrer (Plattformen ab ~10–15 €/h): Probestunden bei 3 Lehrern, dann festlegen — Kontinuität schlägt Lehrer-Hopping; Hausaufgabe immer einfordern. Lehrer für Struktur + Tandem für Mut ist die ideale Kombination.</p>
<h5>Das B1-Plateau durchbrechen & Zertifikate</h5>
<p>Ab B1 stagnieren viele: Der Alltag funktioniert, der Druck fehlt. Gegenmittel: Komfortzonen-Rotation (neue Themenfelder: Nachrichten, Beruf, Humor), „Domänen-Sprints“ (2 Wochen nur ein Thema in allen Kanälen), Schreiben mit Korrektur erzwingt Präzision, Original-Tempo-Inhalte ohne Untertitel als Belastungstraining — und ein Zertifikat mit Datum als künstlicher Druck. <strong>Zertifikate im Vergleich:</strong> Goethe/telc (Deutsch bzw. telc mehrsprachig — Behörden & Einbürgerung), IELTS/TOEFL (englischsprachige Unis; IELTS auch Auswanderung), Cambridge (zeitlich unbegrenzt gültig, Arbeitgeber-Klassiker), DELE (Spanisch, unbefristet), DELF/DALF (Französisch, unbefristet). Fürs Berufs-Signal reicht oft B2-Nachweis; Unis verlangen meist spezifische Tests — erst Zielinstitution fragen, dann buchen.</p>
<h5>Vokabeln, die wirklich kleben</h5>
<p>Drei Prinzipien schlagen jedes stundenlange Listenpauken: nach Häufigkeit lernen (die ersten rund 1.000 Wörter decken einen Großteil der Alltagssprache), immer im Kontext (ganze Beispielsätze statt nackter Paare) und in wachsenden Abständen wiederholen (Spaced Repetition). 15 Minuten täglich mit einer Karteikarten-App bringen mehr als die Wochenend-Session, und selbst gemachte Karten mit eigenem Beispiel sitzen besser als fertige Pakete. Aktiv abrufen statt nur wiedererkennen — das ist der ganze Trick.</p>
` },

fernstudium: { h: `
<h5>Anbieter-Vergleich nüchtern</h5>
<table class="ptable"><tr><th>Modell</th><th>Gesamtkosten</th><th>Für wen</th></tr>
<tr><td>FernUni Hagen (staatlich)</td><td>~1.500–3.000 €</td><td>Selbstorganisierte mit akademischem Anspruch und Geduld für schlanke Betreuung</td></tr>
<tr><td>Private Fernhochschulen</td><td>10.000–17.000 €</td><td>Wer Didaktik, App-Lernen, flexible Prüfungen und Betreuung kauft — und den Preis steuerlich nutzt</td></tr>
<tr><td>Berufsbegleitend an staatl. FH (Abend/Wochenende)</td><td>0–6.000 €</td><td>Wer Präsenz-Struktur und Kommilitonen vor Ort braucht — der unterschätzte Mittelweg</td></tr>
<tr><td>Akademie-Zertifikate / „Nano-Degrees“</td><td>100–3.000 €</td><td>Skill-Updates ja — aber KEIN Hochschulabschluss; nicht von Titeln blenden lassen</td></tr></table>
<h5>Der Anrechnungs-Fahrplan</h5>
<p>1. VOR Bewerbung: Modulhandbuch des Zielstudiengangs laden, eigene Nachweise sammeln (Ausbildungszeugnis, IHK-Fortbildungen, Arbeitszeugnisse mit Tätigkeitsbeschreibung, Zertifikate). 2. Anrechnungsantrag bei der Hochschule — zwei Wege: pauschal (Kooperationen, z. B. Fachwirt → festes Modulpaket, oft 30–60 ECTS!) und individuell (Gleichwertigkeitsprüfung je Modul). 3. Hart verhandeln lohnt: Jedes anerkannte Modul spart Gebühren UND Monate; private Anbieter werben mit Anrechnung — schriftliche Zusage VOR Vertragsschluss geben lassen. 4. Aufstiegsstipendium parallel prüfen (Berufserfahrene mit Note ≤1,9 o. ä. Leistungsnachweis: ~3.045 €/Jahr berufsbegleitend, kein Einkommens-Malus) — Bewerbung VOR oder im ersten Studienjahr.</p>
<h5>Zeitbudget & Steuer-Rechnung</h5>
<p><strong>Wochenplan-Realität</strong> (Bachelor neben Vollzeit, Regelzeit ×1,5 = ca. 5–6 Jahre): Di + Do je 2 h abends, Sa 4–5 h, So 2 h Wiederholung = ~12–15 h — mehr ist mit Familie selten dauerhaft; Klausurphasen brauchen zusätzlich Urlaubstage. Frühwarnsystem: Zwei Module in Folge geschoben = Pensum senken (Teilzeitmodell), nicht heimlich anhäufen. <strong>Steuer:</strong> Nach Ausbildung/Erststudium sind alle Kosten Werbungskosten — Gebühren, Fahrten zu Präsenzen, Prüfungen, Laptop, Fachliteratur, anteilig Arbeitszimmer; bei 12.000 € Gesamtgebühren und 30 % Grenzsteuersatz holt die Steuererklärung ~3.600 € zurück, verteilt über die Jahre. Verlustvortrag nutzen, falls das Einkommen während des Studiums niedrig ist.</p>
<h5>Die Abbrecher-Fallen</h5>
<p>Fernstudien haben hohe Abbruchquoten — fast immer aus denselben Gründen: kein fester Lernrhythmus, Isolation (keine Lerngruppe), zu viele Module gleichzeitig, aufgeschobene erste Prüfung. Gegenmittel: realistische Modulzahl (lieber Teilzeit), virtuelle Lerngruppe ab Woche 1, die erste Prüfung früh ansetzen (ein Erfolg trägt Monate), und Präsenz-/Klausurtermine als Fixpunkte in den Kalender. Wer nach zwei geschobenen Modulen das Pensum senkt statt anzuhäufen, bleibt dabei.</p>
` },

wg: { h: `
<h5>Vertragsmodelle mit Auszugs-Szenarien</h5>
<p><strong>Modell 1 — alle Hauptmieter:</strong> Auszug nur durch Mietaufhebungs-/Nachtragsvereinbarung mit Vermieter UND Mitbewohnern; Klausel vorab in den Vertrag verhandeln („Vermieter stimmt dem Austausch von Mietern zu, sofern zumutbar“). Gesamtschuld heißt: Zahlt Mitbewohner X nicht, darf der Vermieter ALLES von dir fordern — interner Ausgleich ist dann dein Problem. <strong>Modell 2 — Untermiete:</strong> Untermieter kündigt mit gesetzlicher Frist nur gegenüber dem Hauptmieter; Hauptmieter trägt das Leerstandsrisiko und haftet allein gegenüber dem Vermieter — dafür bestimmt er Regeln und Nachzüger. Kündigungsschutz des Untermieters bei möblierten Zimmern in der Hauptmieter-Wohnung ist stark reduziert (kurze Fristen!). <strong>Modell 3 — Einzelverträge:</strong> jeder haftet nur für sich, Gemeinschaftsflächen-Regeln über die Hausordnung; Nachteil: Vermieter castet die Mitbewohner, die Chemie wird Glückssache.</p>
<h5>Untermietvertrag & Finanz-Toolbox</h5>
<p>Untermietvertrag-Minimum: Parteien, Zimmer + Mitbenutzung (qm/Räume aufzählen), Miete inkl./exkl. Nebenkosten-Pauschale (Pauschale vereinbaren — spitzes Abrechnen in WGs ist Krieg), Kaution, Befristung MIT Grund oder unbefristet, Vermieter-Erlaubnis als Anlage, Übergabeprotokoll. <strong>Finanz-Toolbox:</strong> Gemeinschaftskonto (echtes Gemeinschaftskonto nur bei Langzeit-WGs — sonst Unterkonto eines Bewohners + App wie Splitwise-Logik), monatliche Fix-Umlage (Internet, Strom-Abschlag, Putzmittel-Topf 10–20 €), Nachzahlungs-Formel: Jahresabrechnung anteilig nach bewohnten Monaten × Kopfteil — beim Auszug Rückstellung einbehalten (1 Monats-NK-Anteil) bis zur nächsten Abrechnung, schriftlich quittiert. Anschaffungs-Inventar mit Kaufpreis und Eigentümer führen; Gemeinschaftskäufe beim Auszug: Zeitwert-Auszahlung oder Mitnahme nach Liste.</p>
<h5>Das Konfliktgespräch-Skript</h5>
<p>Putz-Klassiker: nicht „Du putzt nie“, sondern System-Frage — „Der Plan funktioniert offenbar für keinen von uns. Optionen: neuer Rhythmus, Aufgaben tauschen, oder Putzkraft für 2×/Monat auf alle umlegen (~10–15 €/Person). Was passt dir?“ (Die Putzkraft-Option löst erstaunlich viele Dauerkonflikte für den Preis von zwei Cocktails.) Dauergast-Klassiker: Fakten + Grenze + Angebot — „Partner Y ist jetzt 5 Nächte/Woche hier; das verändert Bad, Küche, Nebenkosten. Ab 3+ Nächten regelmäßig sollten wir über NK-Beteiligung reden — oder ihr verbringt mehr Zeit bei ihm/ihr.“ Lärm: konkrete Zeiten statt Charakterurteile. Meta-Regel für alle Fälle: binnen 72 h ansprechen (Groll gärt), unter vier Augen zuerst, WG-Sitzung nur für System-Fragen — und einmal im Quartal ein gemeinsames Essen, das keines der Probleme bespricht: Beziehungs-Konto füllen, von dem Konflikte abheben.</p>
<h5>Anmeldung nicht vergessen</h5>
<p>Wer in die WG einzieht, muss sich beim Einwohnermeldeamt anmelden (Frist meist zwei Wochen) — dafür braucht es die Wohnungsgeberbestätigung des Vermieters bzw. Hauptmieters. Das ist Pflicht, keine Kür: Ohne Meldeadresse stocken Konto, Job und Behördenpost. Bei der Untermiete stellt der Hauptmieter die Bestätigung aus. Praktisch: Vermieter-Erlaubnis zur Untervermietung schriftlich einholen (auf sie besteht oft ein Anspruch bei berechtigtem Interesse) und die Bestätigung gleich beim Einzug mitnehmen.</p>
` },

weg: { h: `
<h5>Die Jahresabrechnung Zeile für Zeile</h5>
<p>Prüfreihenfolge: 1. <strong>Gesamtkosten vs. Wirtschaftsplan</strong> — Abweichungen >10 % je Position erklären lassen. 2. <strong>Verteilerschlüssel</strong> — stimmt er mit Teilungserklärung überein (Miteigentumsanteile vs. Wohnfläche vs. Einheiten)? Falscher Schlüssel ist der häufigste Anfechtungsgrund. 3. <strong>Rücklagen-Ausweis</strong> — Zuführung wie beschlossen? Stand plausibel? Rücklage darf nicht für laufende Kosten „geliehen“ werden. 4. <strong>Heizkosten</strong> — verbrauchsabhängige Abrechnung (50–70 % Verbrauch) nach Heizkostenverordnung? 5. <strong>Einzelabrechnung</strong> — eigene Vorauszahlungen korrekt? Bei Vermietung: umlagefähige Posten sauber getrennt ausgewiesen (sonst zahlt man die Mieter-Abrechnung aus eigener Tasche)? Belegeinsicht beim Verwalter ist Recht — Termin verlangen, Stichproben (größte Posten + Auffälligkeiten).</p>
<h5>Beschluss-Kunde & Anträge stellen</h5>
<p>Seit der WEG-Reform gilt: einfache Mehrheit der abgegebenen Stimmen für die meisten Beschlüsse — auch bauliche Veränderungen; ABER Kostentragung differenziert (wer zustimmt/profitiert zahlt, bei Zweidrittel-Mehrheit + amortisierbaren Maßnahmen alle). Privilegierte Maßnahmen (Anspruch auf Gestattung auf eigene Kosten!): Ladesäule, Barrierefreiheit, Einbruchschutz, Glasfaser. <strong>Eigenen Antrag durchbringen:</strong> 1. Vorgespräch mit Verwalter + 2–3 Miteigentümern (Mehrheiten entstehen vor der Versammlung). 2. Antrag mit Beschlusstext-VORSCHLAG fristgerecht zur Tagesordnung einreichen (konkret: Maßnahme, Kostenrahmen, Finanzierung, Vergabe). 3. In der Versammlung: 3 Angebote präsentieren statt Grundsatzdebatte. Anfechtung von Fehl-Beschlüssen: 1 Monat Klagefrist, 2 Monate Begründung — Fristen sind hier alles.</p>
<h5>Verwalterwechsel & Warnzeichen beim Kauf</h5>
<p><strong>Wechsel-Fahrplan:</strong> Unzufriedenheit dokumentieren (unbeantwortete Anfragen, Abrechnungsfehler, keine Angebote) → Mitstreiter sammeln (Eigentümerliste!) → 3 Vergleichsangebote neuer Verwalter einholen → Tagesordnungspunkte beantragen: Abberufung + Neubestellung + Vertragsende (Abberufung ist seit Reform jederzeit möglich, Vertrag endet spätestens 6 Monate danach) → zertifizierten Verwalter wählen (Anspruch der Eigentümer!). <strong>Sonderumlagen-Frühwarnzeichen vor dem Kauf:</strong> Rücklage unter ~15–20 €/m² Gesamtfläche bei Baujahr 1960–1990, Protokoll-Formeln wie „wurde zurückgestellt“ bei Dach/Heizung/Strängen, Verwalter seit >15 Jahren ohne Ausschreibung, Heizung >25 Jahre ohne Rückstellungs-Plan, anhängige Klagen, hohe Eigentümer-Fluktuation. Jedes Warnzeichen ist ein Preisverhandlungs-Argument — oder ein Rückzugsgrund.</p>
<h5>Wenn die Sonderumlage kommt</h5>
<p>Große Reparaturen (Dach, Heizung, Stränge) sprengen oft die Rücklage und führen zu Sonderumlagen von mehreren tausend Euro je Einheit. Optionen statt Schreck: Ratenzahlung über die Gemeinschaft beschließen, seit der Reform kann die WEG als Verband auch selbst einen Kredit aufnehmen (Beschluss nötig), und steuerlich sind bei vermieteten Wohnungen die Handwerkerleistungen absetzbar. Wer früh in eine ausreichende Rücklage einzahlt (Richtwert grob 15–25 €/m²/Jahr je nach Alter), erlebt solche Schläge seltener.</p>
` },

sanierung: { h: `
<h5>Beispielhaus durchgerechnet (EFH 140 m², Bj. 1975)</h5>
<table class="ptable"><tr><th>Maßnahme</th><th>Kosten</th><th>Förderung (Richtwert)</th><th>Einsparung/Jahr</th></tr>
<tr><td>Energieberatung + iSFP</td><td>~1.500–2.500 €</td><td>großzügig bezuschusst</td><td>— (schaltet iSFP-Bonus frei)</td></tr>
<tr><td>Oberste Geschossdecke dämmen</td><td>3.000–6.000 €</td><td>15–20 % (BEG EM + iSFP-Bonus)</td><td>5–10 % Heizenergie</td></tr>
<tr><td>Kellerdecke (Eigenleistung möglich)</td><td>1.500–4.000 €</td><td>15–20 %</td><td>3–6 %</td></tr>
<tr><td>Fenster (3-fach)</td><td>15.000–25.000 €</td><td>15–20 %</td><td>8–12 %</td></tr>
<tr><td>Fassade (WDVS)</td><td>30.000–60.000 €</td><td>15–20 %</td><td>15–25 %</td></tr>
<tr><td>Wärmepumpe</td><td>25.000–40.000 €</td><td>Grund- + Boni, je nach Lage erheblich (gedeckelt)</td><td>variabel; weg von Öl/Gas-Preisrisiko</td></tr></table>
<p>Lesart: Hülle zuerst senkt die nötige Heizlast — die Wärmepumpe wird kleiner, günstiger, effizienter. Alle Zahlen sind Richtwerte; Förderkonditionen ändern sich — IMMER tagesaktuell bei BAFA/KfW prüfen, Antrag vor Auftrag.</p>
<h5>Wärmepumpe im Altbau: die Machbarkeits-Checkliste</h5>
<p>☐ Heizlastberechnung (raumweise!) statt Daumenwert ☐ Test-Winter: Vorlauftemperatur am bestehenden Kessel auf 50–55 °C begrenzen — bleibt es warm, ist das Haus WP-tauglich ☐ Einzelne zu kleine Heizkörper gegen Niedertemperatur-/größere tauschen statt Fußbodenheizungs-Komplettmythos ☐ Aufstellort (Schall! Abstand zum Nachbarn — Landesrecht) ☐ Stromanschluss/Zählerkonzept (WP-Tarif) ☐ hydraulischer Abgleich eingepreist ☐ Kombination mit PV rechnen (Eigenverbrauch hebt die Wirtschaftlichkeit) ☐ Angebote mit Jahresarbeitszahl-Prognose vergleichen, nicht nur Preis. Rote Flagge: Anbieter, der ohne Heizlastberechnung „passt schon“ verkauft.</p>
<h5>Zuschuss vs. Steuerbonus & Handwerker-Akquise</h5>
<p>Faustregel: Bei hohen Förderquoten (Heizungstausch, mit iSFP-Bonus) schlägt der BAFA/KfW-Zuschuss den Steuerbonus deutlich; bei kleineren Einzelmaßnahmen ohne Beratung kann der Steuerweg (§ 35c EStG: 20 % auf max. 200.000 €, verteilt über 3 Jahre, direkt von der Steuerschuld) bequemer und ähnlich wertvoll sein — beides für DIESELBE Maßnahme geht nicht: vorher rechnen. <strong>Handwerker finden in Mangelzeiten:</strong> Winterhalbjahr anfragen (Auftragslöcher), über den Energieberater (Netzwerk!), Innungslisten, konkrete Leistungsverzeichnisse versenden statt „bitte Angebot für Dämmung“ (seriöse Betriebe antworten auf präzise Anfragen zuerst), Anzahlung max. 10–30 % gegen Sicherheit, Festpreis mit Leistungsdatum — und 6–12 Monate Vorlauf als Normalfall einplanen, nicht als Ärgernis.</p>
<h5>Eigenanteil selbst rechnen</h5>
<p>Vor jeder Maßnahme lohnt der nüchterne Vergleich: Zuschuss-Weg (BAFA/KfW) gegen Steuerbonus nach § 35c. Der Rechner unten zeigt aus den Maßnahmenkosten und der erwarteten Förderquote den Eigenanteil und stellt ihn dem Steuerbonus gegenüber — beides für dieselbe Maßnahme geht nicht. Die wichtigste Regel bleibt: erst Energieberatung und Antrag, dann der Auftrag, sonst entfällt die Förderung.</p>
` },

einrichten: { h: `
<h5>Erstausstattungs-Plan mit Preisspannen (gebraucht / neu)</h5>
<table class="ptable"><tr><th>Raum</th><th>Kern</th><th>gebraucht</th><th>neu solide</th></tr>
<tr><td>Schlafen</td><td>Matratze (NEU!), Lattenrost, Bettgestell, Kleiderstange/Schrank</td><td>150–400 € (ohne Matratze)</td><td>700–1.500 €</td></tr>
<tr><td>Wohnen</td><td>Sofa, Tisch, Regal, 3 Lichtquellen, Teppich</td><td>200–500 €</td><td>1.200–2.500 €</td></tr>
<tr><td>Küche</td><td>Grundgeräte, Topf-Set, 1 gutes Messer, Basis-Geschirr</td><td>150–600 € (Küchen-Mitnahme!)</td><td>2.000–6.000 €</td></tr>
<tr><td>Arbeit</td><td>Stuhl (Priorität!), Tisch, Lampe</td><td>100–300 € (Büroauflösungen: Top-Stühle für 80–150 €)</td><td>500–1.200 €</td></tr>
<tr><td>Bad/Flur</td><td>Spiegel, Stauraum, Garderobe</td><td>50–150 €</td><td>200–500 €</td></tr></table>
<p>Gesamtspanne erste Wohnung: 800–1.500 € klug gebraucht vs. 5.000 €+ neu — die Differenz ist ein halber Notgroschen.</p>
<h5>Die 10 Proportions-Regeln</h5>
<p>1. Teppich: Vorderfüße aller Sitzmöbel drauf (Wohnzimmer meist ≥160×230). 2. Bildmitte ~145 cm, über Sofa: Breite ≥ ⅔ der Sofabreite (oder Galerie-Gruppe). 3. Vorhangstange 10–20 cm über Fensterrahmen, deckennah = Raum wächst; Vorhang bis Boden. 4. Couchtisch ~⅔ der Sofalänge, Sitzhöhe ±5 cm. 5. Pendelleuchte über Esstisch: Unterkante ~75 cm über Platte. 6. Laufwege 60–80 cm freihalten — lieber ein Möbel weniger. 7. Ein großes Statement pro Raum schlägt fünf Kleinteile (Bild, Pflanze, Leuchte). 8. Höhenstaffelung bei Deko: Dreiergruppen, ungerade Zahlen. 9. Dunkle/schwere Möbel nach unten, Luft nach oben (Wandregale statt zweiter Kommode). 10. Erst leeren, dann stylen: Jede Oberfläche zu 60 % frei — der billigste „teure Look“ der Welt.</p>
<h5>Gebraucht-Kauf-Checklisten & kleine Räume</h5>
<p><strong>Sofa:</strong> Gestell verwindungssteif (anheben/rütteln), Polsterkerne nicht durchgesessen (Sitzprobe 5 Min!), Gerüche (Rauch/Tier = bleibt), Maße + Treppenhaus VOR Abholung, Transport einkalkulieren. <strong>Schrank:</strong> Massivholz/zerlegbar bevorzugen, Rückwand & Scharniere prüfen, Innenmaß fürs eigene Zeug messen. <strong>Matratze grundsätzlich neu</strong> (Hygiene, Liegejahre unsichtbar) — Budget-Tipp: Testsieger-Mittelklasse 250–450 € statt 1.500-€-Marketing. <strong>Kleine Räume groß wohnen:</strong> helle Wände + EIN dunkler Akzent, Spiegel gegenüber Fenster, multifunktionale Möbel (Bett mit Stauraum, Klapptisch), Vertikale nutzen (deckenhohe Regale schlank statt breite Sideboards), wenige große statt vieler kleiner Teile, Vorhänge = Zimmertrenner für Zonen — und die radikalste Quadratmeter-Quelle bleibt: weniger besitzen (siehe Haushalts-Artikel).</p>
<h5>Reihenfolge: was zuerst</h5>
<p>Nicht alles auf einmal kaufen — in dieser Reihenfolge wohnt es sich vom ersten Tag an gut: zuerst ein gutes Bett mit neuer Matratze und ein vernünftiger (Arbeits-)Stuhl, denn dort verbringt man die meiste Zeit; dann eine Sitzgelegenheit und drei Lichtquellen pro Raum (nie nur die Deckenlampe); danach Stauraum und Esstisch; Deko und das „richtige“ Sofa zuletzt, wenn man den Raum kennt. So verteilt sich die Ausgabe, und Fehlkäufe in der ersten Euphorie bleiben aus.</p>
` },

einbruchschutz: { h: `
<h5>Der Schwachstellen-Rundgang (30 Minuten, von außen denken)</h5>
<p>Wie ein Täter ums Objekt gehen: ☐ Erdgeschoss-Fenster & Terrassentür — Standard-Beschläge? (Hebelversuch-Schutz fehlt bei den meisten Bestandsfenstern) ☐ Kellerfenster/-schächte ungesichert? ☐ Haustür: Glaseinsatz neben dem Schloss? Profilzylinder übersteht? Schließblech verschraubt? ☐ Aufstiegshilfen herumstehend (Mülltonnen, Leitern, Gartenmöbel → wegschließen!) ☐ Sichtschutz, der Täter verdeckt (hohe Hecke vorm EG-Fenster = Arbeitsruhe für Einbrecher) ☐ Beleuchtung mit Bewegungsmelder an Zugängen ☐ Wohnungstür im MFH: Mehrfachverriegelung? Weitwinkelspion? ☐ „Wir sind im Urlaub“-Signale (überquellender Briefkasten, dauerhaft dunkle Fenster, Zettel an der Tür). Jeden Punkt fotografieren → Prioritätenliste: EG & Keller vor OG, Mechanik vor Elektronik.</p>
<h5>Nachrüst-Kosten & Förderung je Maßnahme</h5>
<table class="ptable"><tr><th>Maßnahme</th><th>Kosten (Richtwert, montiert)</th></tr>
<tr><td>Abschließbare Fenstergriffe</td><td>20–50 €/Fenster (Eigenleistung gut machbar)</td></tr>
<tr><td>Pilzkopf-Nachrüstung / Aufschraubsicherungen</td><td>100–300 €/Fenster</td></tr>
<tr><td>Querriegelschloss Wohnungstür</td><td>300–600 €</td></tr>
<tr><td>Tür: Schutzbeschlag + Zylinder mit Not-/Gefahrenfunktion</td><td>150–400 €</td></tr>
<tr><td>Neue RC2-Haustür</td><td>1.500–4.000 €</td></tr>
<tr><td>Alarmanlage (zertifiziert, klein)</td><td>1.000–3.000 €</td></tr></table>
<p>KfW fördert Einbruchschutz im Programm „Altersgerecht Umbauen“ (Zuschuss-Fenster beachten, Antrag vor Beginn); Mieter dürfen mit Vermieter-Zustimmung nachrüsten — Kostenteilung verhandeln (Wertsteigerung!), Rückbau-Vereinbarung schriftlich. Polizeiliche Beratungsstelle nennt geprüfte Produkte (DIN-geprüft) und Errichter-Listen — vor dem Baumarkt-Kauf anrufen.</p>
<h5>Mieter-Edition & Wertsachen-Dokumentation</h5>
<p><strong>Ohne Bohren/Vermieter sofort möglich:</strong> Tür-Zusatzschloss zum Klemmen (begrenzt, aber besser als nichts), Fenstergriff-Tausch (alte Griffe aufheben), Zeitschaltuhren, smarte Leuchten, Türspion-Alternativen (Kamera-Klingel nur mit Blick AUF den eigenen Eingangsbereich!), Nachbarn-Netzwerk (gegenseitig Briefkasten + Rollladen-Dienst — die Anwesenheits-Simulation aus Menschenhand). <strong>Wertsachen-Doku in 45 Minuten:</strong> Raum für Raum filmen (Schränke öffnen!), Wertgegenstände einzeln fotografieren mit Rechnung/Seriennummer daneben, Liste mit Kaufjahr + Neuwert als Tabelle, alles verschlüsselt in die Cloud + auf USB zu den Dokumenten — im Schadenfall verkürzt das die Hausrat-Regulierung von Monaten auf Wochen und verhindert die typische Unterschätzung (Haushalts-Neuwert wird fast immer 30–50 % zu niedrig getippt: Faustwert 650–700 €/m² Wohnfläche als Versicherungssumme).</p>
<h5>Nach einem Einbruch — die ersten Schritte</h5>
<p>110 anrufen und nichts verändern, bis die Spurensicherung da war (so schwer es fällt). Erst danach aufräumen. Den Schaden zeitnah der Hausratversicherung melden und die Stehlgutliste mit der vorbereiteten Wertsachen-Dokumentation abgleichen — wer Fotos und Belege hat, wird schneller und vollständiger reguliert. Gestohlene Ausweise/Karten sofort sperren (116 116), bei Schlüsselverlust Schließanlage tauschen. An die psychische Seite denken: Das verletzte Sicherheitsgefühl ist normal — der Weiße Ring und Beratungsstellen helfen kostenlos.</p>
` },
wohnenalter: { h: `
<h5>Der Wohn-Check (die kritischsten der 25 Punkte)</h5>
<p><strong>Zugang & Wege:</strong> ☐ Eingang stufenlos oder rampenfähig ☐ Geländer beidseitig an jeder Treppe ☐ Türbreiten ≥80 cm (Rollator!) ☐ Schwellen unter 2 cm. <strong>Bad (der Entscheider):</strong> ☐ bodengleiche Dusche mit Sitzoption ☐ Haltegriffe an WC & Dusche ☐ rutschhemmender Boden ☐ Tür nach AUSSEN öffnend (ein Sturz blockiert sonst die Rettung!). <strong>Alltag:</strong> ☐ Schlafen + Bad auf einer Ebene machbar ☐ Küche ohne Bück-/Kletterzwang fürs Tägliche ☐ Nachtweg Bett→Bad mit Bewegungsmelder-Licht ☐ Stolperfallen weg (lose Teppiche, Kabel) ☐ Hausnotruf-Lösung (ab Pflegegrad bezuschusst). <strong>Umfeld:</strong> ☐ Lebensmittel, Arzt, Apotheke fußläufig/ÖPNV ☐ soziale Anker im Viertel ☐ Aufzug vorhanden/nachrüstbar. Jedes Nein ist ein Projekt — vor 75 abarbeiten oder Umzug ernsthaft prüfen.</p>
<h5>Betreutes Wohnen: Verträge richtig lesen</h5>
<p>Zwei Verträge auseinanderhalten: MIETvertrag (normales Mietrecht) + BETREUUNGSvertrag (Servicepauschale). Prüffragen: Was deckt die Grundpauschale konkret (Notruf? Hausmeister? Beratung?), was kostet je Abruf extra (Pflege, Essen, Begleitung — Preisliste geben lassen)? Ist der Betreuungsvertrag separat kündbar? Was passiert bei Pflegebedürftigkeit — Verbleib garantiert oder Auszugsklausel? Freie Pflegedienst-Wahl gesichert? Pauschalen-Erhöhungsmechanik? Wartelisten guter Anlagen: 1–3 Jahre — anmelden kostet nichts. Rote Flaggen: „Service nach Verfügbarkeit“, Pflege-Zwangsbindung an den Hausdienst, Einstandszahlungen ohne klare Gegenleistung.</p>
<h5>Teilverkauf, Leibrente, Umkehrhypothek — kritisch verglichen</h5>
<p><strong>Teilverkauf:</strong> Anbieter kauft z. B. 30 % — fortan Nutzungsentgelt (faktisch Miete aufs eigene Haus, oft 3–5 %/Jahr auf den verkauften Anteil), weiterhin ALLE Instandhaltungskosten, beim Endverkauf Abwicklungsgebühren: meist das teuerste Modell, Verbraucherzentralen raten überwiegend ab. <strong>Leibrente:</strong> Verkauf gegen lebenslange Rente + Wohnrecht — seriös möglich, aber Rechenwerk prüfen (Wohnrecht im GRUNDBUCH absichern, Rentengarantiezeit für Erben). <strong>Umkehrhypothek:</strong> Kredit aufs Haus, Rückzahlung aus dem Nachlass — Zinsen kumulieren kräftig. <strong>Die unspektakuläre Konkurrenz schlägt oft alle drei:</strong> normaler Verkauf + Komfort-Mietwohnung (Kapital liquide, keine Instandhaltung) oder klassischer Bankkredit bei kleinerem Bedarf. Eisenregel: nichts ohne unabhängige Beratung (Verbraucherzentrale, Honorarberater).</p>
<h5>Umbau jetzt durchrechnen</h5>
<p>Barrierearmes Umbauen ist seltener so teuer wie befürchtet, weil mehrere Töpfe zusammenkommen: ein Zuschuss der Pflegekasse je Maßnahme ab Pflegegrad 1, KfW-Mittel für Barrierereduzierung und die steuerliche Absetzbarkeit der Handwerkerlöhne. Der Rechner unten zeigt aus den Umbaukosten den ungefähren Eigenanteil. Wichtig: Anträge stellen, bevor der erste Handwerker kommt — nachträglich gibt es die Förderung meist nicht.</p>
` },

gesundaltern: { h: `
<h5>Kraft & Gleichgewicht 60+: das 20-Minuten-Heimprogramm</h5>
<p>3×/Woche, je 2 Sätze: 1. <strong>Aufstehen vom Stuhl ohne Hände</strong> (8–12× — die wichtigste Übung des Alters: sie IST die Alltagsfunktion) → Progression: langsam absenken, später Rucksack. 2. <strong>Wadenheben</strong> an der Küchenzeile (12–15×) → einbeinig. 3. <strong>Wandliegestütz</strong> (8–12×) → Tischkante → Boden auf Knien. 4. <strong>Hüftheben</strong> im Liegen (10×). 5. <strong>Tandemstand</strong> (Füße in Linie, 30 Sek je Seite, anfangs mit Festhalten) → Augen zu → Einbeinstand. 6. <strong>Linien-Gehen</strong> Ferse-an-Spitze durch den Flur. Sicherheit: stabile Lehne in Reichweite, Schuhe statt Socken. Der Vereins-/Reha-Sport-Weg (verordnet, kostenlos) liefert dasselbe mit Gesellschaft — doppelter Schutzfaktor.</p>
<h5>Demenz-Prävention: der Umsetzungsplan</h5>
<p>Die beeinflussbaren Faktoren der Forschung in Alltagsform: ☐ <strong>Hören:</strong> Test ab 60 alle 2 Jahre, Geräte konsequent TRAGEN (unbehandelte Schwerhörigkeit ist ein Top-Risikofaktor — sie isoliert und beschleunigt Abbau). ☐ <strong>Blutdruck & Diabetes:</strong> Zielwerte mit Arzt, Heimmessgerät, Medikamenten-Treue. ☐ <strong>Bewegung:</strong> 150 Min + Kraft. ☐ <strong>Sozial + Neu:</strong> wöchentlich mindestens ein Menschen-Termin UND jährlich eine echte neue Fertigkeit — Tanzen ist der Vierfach-Treffer (Bewegung, Musik, Sozialkontakt, Lernen); Kreuzworträtsel allein reichen nicht. ☐ <strong>Rauchen/Alkohol</strong> reduzieren wirkt aufs Gehirn doppelt. ☐ <strong>Sehen, Gewicht, Schlaf</strong> behandeln statt hinnehmen. Ehrliche Botschaft: Prävention senkt Risiko und verschiebt Beginn — keine Garantie, aber der größte verfügbare Hebel.</p>
<h5>Medikamenten-Check & Mobilitäts-Plan B</h5>
<p><strong>Der Brown-Bag-Termin:</strong> Einmal jährlich ALLE Mittel (auch rezeptfreie + Nahrungsergänzung) in eine Tüte und zu Hausarzt oder Apotheke (Medikationsanalyse, teils Kassenleistung): Brauche ich noch alles? Wechselwirkungen? Macht etwas schwindelig/sturzgefährlich (Schlafmittel! Blutdruck-Übertherapie!)? Gibt es im Alter ungeeignete Wirkstoffe (Priscus-Liste)? Ab 5 Dauermedikamenten Pflicht-Routine. <strong>Mobilitäts-Plan B ohne Auto</strong> — VOR dem Führerschein-Abschied aufbauen: Senioren-ÖPNV-Tickets, Rufbusse/Anrufsammeltaxi, Bürgerbusse, Einkaufs-Tandems in der Nachbarschaft, Lieferdienste fürs Schwere, E-Bike/Dreirad als Zwischenstufe — und die Taxi-Rechnung: Versicherung+Steuer+Werkstatt eines Altwagens finanzieren erstaunlich viele Taxifahrten. Wer den Plan B kennt, gibt den Schlüssel leichter und rechtzeitig ab.</p>
<h5>Kontakte sind Medizin</h5>
<p>Einsamkeit wirkt im Alter wie ein eigener Risikofaktor — vergleichbar mit Rauchen, mit messbaren Folgen für Herz, Immunsystem und Gedächtnis. Deshalb gehört der soziale Kalender zur Gesundheitsvorsorge: feste wöchentliche Anker (Verein, Ehrenamt, Chor, Stammtisch, Enkel-Tag), neue Kontakte aktiv knüpfen statt auf Einladungen warten, und digitale Brücken (Videoanruf) als Ergänzung, nicht als Ersatz. Wer früh ein tragfähiges Netz aufbaut, ist gegen die Verluste, die das Alter mit sich bringt, deutlich besser gewappnet.</p>
` },

grosseltern: { h: `
<h5>Das Regel-Gespräch: 8 Themen vorab klären</h5>
<p>1. <strong>Essen & Süßes:</strong> Verwöhn-Spielraum vs. Tabu (Allergien absolut!). 2. <strong>Medien:</strong> Die Eltern-Linie gilt — Ausnahmen benennen statt heimlich gewähren. 3. <strong>Schlaf & Rituale</strong> bei Übernachtungen übernehmen. 4. <strong>Sicherheit:</strong> Autositz-Standards, Treppen/Teich, Medikamente wegschließen (Großeltern-Haushalte sind Vergiftungs-Hotspot!). 5. <strong>Disziplin:</strong> Wer setzt Grenzen wie — was ist No-Go? 6. <strong>Fotos & Social Media:</strong> Eltern entscheiden über Kinderbilder im Netz. 7. <strong>Geschenke:</strong> Budget-Rahmen — Depot-Dauerauftrag als Alternative anbieten. 8. <strong>Kanal für Bedenken:</strong> direkt, unter vier Augen, nie übers Kind. Format: jährlich beim Kaffee OHNE Anlass — Anlass-Gespräche sind schon Konflikt-Gespräche. Großeltern-Selbstverpflichtung: Erziehungs-Updates nicht als Kritik an der eigenen Vergangenheit lesen — Wissen ändert sich, Liebe nicht.</p>
<h5>Betreuung formalisieren: Steuer & Rente</h5>
<p><strong>Fahrtkosten:</strong> Eltern können Großeltern Fahrtkosten erstatten (0,30 €/km, schriftliche Vereinbarung + Überweisung) und als Kinderbetreuungskosten absetzen (zwei Drittel, bis 4.000 €/Kind/Jahr) — auch bei unentgeltlicher Betreuung! <strong>Bezahlte Betreuung:</strong> fremdüblicher Mini-Vertrag macht sie absetzbar; die Minijob-Anmeldung der Oma im Eltern-Haushalt ist die saubere Variante mit Unfallschutz. <strong>Rentenpunkte:</strong> Kindererziehungszeiten sind auf überwiegend erziehende Großeltern übertragbar (enge Voraussetzungen — DRV beraten lassen). Fürs Familienklima: Formalisierung offen besprechen — sie ist Wertschätzung und Absicherung, kein Misstrauen.</p>
<h5>Umgangsrecht nüchtern & Fern-Rituale je Alter</h5>
<p><strong>§ 1685 BGB in der Praxis:</strong> Das Großeltern-Umgangsrecht setzt voraus, dass der Umgang dem Kindeswohl DIENT — Gerichte verneinen das regelmäßig, wenn der Eltern-Großeltern-Konflikt das Kind in Loyalitätsnot bringt: Wer klagt, beweist oft genau den Konflikt, der den Anspruch kostet. Alternativen in Reihenfolge: Friedensangebot („Was bräuchtet ihr von uns?“ — zuhören, nicht verteidigen) → vermittelnde Dritte → Familienberatung/Mediation (Jugendamt vermittelt kostenlos) → erst dann anwaltliche Einschätzung. Brücken offenhalten: Karten an die Enkel weiter schicken — ohne Konflikt-Botschaften. <strong>Fern-Rituale:</strong> 1–3 J.: kurze Video-Calls mit immer gleichem Lied/Kuscheltier (Wiedererkennung!). 3–6: Vorlesen per Video (Buch doppelt kaufen), Foto-Schnitzeljagd. 6–10: Brieffreundschaft mit Kleinkram, gemeinsames Online-Spiel, „Oma-Akademie“ per Call. Teenager: Sprachnachrichten statt Anruf-Pflicht, ihr Interesse ernst nehmen (das Gaming erklären lassen!), das Depot gemeinsam anschauen — Verlässlichkeit schlägt Frequenz.</p>
<h5>Wenn die Hilfe zu viel wird</h5>
<p>Großeltern-Unterstützung ist ein Geschenk — und darf Grenzen haben. Verlässliche, aber begrenzte Zusagen („dienstags und ein Wochenende im Monat“) tragen länger als ein grenzenloses Ja, das in Erschöpfung und Groll endet. Ein offenes Wort über das eigene Maß ist kein Liebesentzug, sondern Voraussetzung dafür, dass die Hilfe Freude bleibt. Und umgekehrt: Eltern sollten verlässliche Großeltern-Zeit nicht als Selbstverständlichkeit behandeln, sondern als das, was sie ist — gelebte Familie.</p>
` },

auswandernrente: { h: `
<h5>Die Länder-Kriterienliste (vor jeder Besichtigung)</h5>
<p>☐ <strong>Krankenversicherung:</strong> EU mit S1-Verfahren (GKV-Schutz auf Leistungsniveau des GASTLANDS — Wartezeiten, Zuzahlungen prüfen) vs. Drittland (privater internationaler Tarif: Prämienverlauf im Alter zeigen lassen — 80-Jährige zahlen ein Vielfaches). ☐ <strong>Doppelbesteuerungsabkommen:</strong> Wer besteuert die Rente, wie hoch ist sie NETTO? ☐ <strong>Residenz-Regeln:</strong> EU-Freizügigkeit vs. Rentner-Visa (Einkommensnachweise). ☐ <strong>Gesundheitssystem real:</strong> Klinik-Dichte der Zielregion, verständliche Ärzte, Notfall-Distanzen. ☐ <strong>Lebenskosten ehrlich:</strong> Expat-Viertel-Preise, Importwaren, Klimakosten. ☐ <strong>Erreichbarkeit:</strong> Direktflüge, Enkel-Besuche in beide Richtungen. ☐ <strong>Sprache & Community</strong> (deutschsprachige Strukturen als Start, nicht als Käfig). ☐ <strong>Pflege-Infrastruktur</strong> und <strong>Eigentumsrechte für Ausländer</strong>.</p>
<h5>Der Wegzugs-Fahrplan in 12 Schritten</h5>
<p>1. Probewohnen Nebensaison (3+ Monate — der Februar zeigt die Wahrheit). 2. Steuerberatung DBA + DRV-Beratungstermin. 3. KV-Lösung SCHRIFTLICH fixieren. 4. Wohnung in D vermieten statt verkaufen (Rückkehroption!). 5. Rentenservice informieren, deutsches Konto behalten. 6. Vollmacht für Vertrauensperson in D (Post, Behörden, Notfälle). 7. Ab-/Anmeldung, Aufenthaltsstatus. 8. Verträge kündigen/anpassen (Haftpflicht mit Auslandsdeckung!). 9. Führerschein-Umschreibung/international. 10. Gesundheits-Dossier übersetzen (Wirkstoffnamen, nicht Markennamen!). 11. Testament prüfen: EU-Erbrechtsverordnung — der WOHNSITZ bestimmt das Erbrecht; Rechtswahl „deutsches Recht“ im Testament erklären! 12. Lebensbescheinigungs-Routine + jährlicher Steuer-Check.</p>
<h5>KV-Optionen im Detail & der Rückkehr-Plan</h5>
<p><strong>EU/S1:</strong> Pflichtversicherte Rentner (KVdR) erhalten Sachleistungen im Wohnsitzland; Behandlung bei D-Besuchen bleibt möglich — der Komfort-Hybrid. <strong>Anwartschaftsversicherung:</strong> kleine Prämie hält die Rückkehr-Tür in die bisherige Versicherung offen — für Drittland-Auswanderer fast Pflicht. <strong>Privat international:</strong> Beitragsentwicklung 70+, Ausschlüsse (Bestandsleiden!) vor Unterschrift sezieren. <strong>Rückkehr-Plan als Sicherheitsnetz:</strong> Auslöser vorab definieren (Pflegebedürftigkeit, Tod des Partners, Diagnose), Rückkehr-Reserve unangetastet (Umzug + 6 Monate D-Lebenskosten), vermietete Wohnung mit Eigenbedarfs-Perspektive — Auswandern mit Rückfahrkarte ist kein halbherziges Auswandern, sondern erwachsenes.</p>
<h5>Der häufigste Irrtum</h5>
<p>„Im Ausland zahle ich keine deutsche Steuer mehr“ stimmt für die gesetzliche Rente oft nicht: Welcher Staat die Rente besteuert, regelt das jeweilige Doppelbesteuerungsabkommen — viele weisen das Besteuerungsrecht weiter Deutschland zu, teils mit beschränkter Steuerpflicht ohne Grundfreibetrag. Vor dem Wegzug einmal konkret durchrechnen lassen, was netto ankommt; die Differenz entscheidet manchmal über das Zielland.</p>
` },

demenz: { h: `
<h5>Warnzeichen & Abklärungs-Fahrplan</h5>
<p><strong>Die 10 Warnzeichen</strong> (Häufung über Monate zählt): 1. Gedächtnislücken, die den Alltag stören 2. Vertrautes misslingt (Kochen, Überweisung, Geräte) 3. Wortfindungs-/Sprachprobleme über Namen hinaus 4. Zeit-/Orts-Desorientierung 5. Urteilsvermögen lässt nach (Haustürgeschäfte!) 6. Verlegen + Beschuldigen 7. Rückzug 8. Wesensveränderung (Misstrauen, Apathie) 9. Antriebsverlust 10. Planen/Zahlen misslingen. <strong>Fahrplan:</strong> Hausarzt MIT Angehörigen-Begleitung (vorher konkrete Beispiele notieren — Betroffene kompensieren im Gespräch brillant!) → Basis-Labor + Screening (Uhrentest, MoCA) → Gedächtnisambulanz/Neurologie: Bildgebung + Ausschluss behandelbarer Ursachen (Schilddrüse, B12, Depression als „Pseudodemenz“, Medikamente). Befund schriftlich geben lassen; Zweitmeinung ist legitim.</p>
<h5>Die ersten 90 Tage: der Rechts- und Finanz-Ordner</h5>
<p><strong>Sofort (Geschäftsfähigkeit nutzen!):</strong> Vorsorgevollmacht + Patientenverfügung + Bankvollmachten — im Zweifel mit ärztlicher Bestätigung der Geschäftsfähigkeit zum Notar (schützt die Vollmacht vor späterer Anfechtung); Konten-/Vertragsübersicht, Online-Zugänge dokumentieren. <strong>Monat 1–2:</strong> Pflegegrad beantragen (kognitive Module zählen voll — Pflegetagebuch!), Schwerbehindertenausweis (Demenz gibt GdB + Merkzeichen), Pflegeberatung nach § 7a (Rechtsanspruch!), Entlastungsbetrag aktivieren, Wohnung sichern (Herd-Abschaltung). <strong>Monat 3:</strong> Fahreignung ärztlich klären — fair, aber konsequent (Mobilitäts-Plan B!), Finanzen vereinfachen (Daueraufträge statt Bargeld-Chaos, Konto-Limits — Demenzkranke sind Schockanruf-Zielgruppe Nr. 1), Familienrat: Versorgungs-Rollen und Finanzierung verteilen, BEVOR die Krise sie verteilt.</p>
<h5>Validation: Kommunikation mit Beispieldialogen</h5>
<p>Prinzip: Die emotionale Wahrheit gilt — die Fakten-Korrektur verliert jede Debatte. <strong>„Ich muss zur Arbeit!“</strong> (mit 85): nicht „Du bist seit 20 Jahren Rentner!“, sondern: „Du warst immer so zuverlässig. Was war das Schönste an deiner Arbeit?“ — Gefühl würdigen, dann umlenken („Vorher trinken wir einen Kaffee“). <strong>„Wo ist meine Mutter?“</strong>: nicht „Die ist seit 30 Jahren tot“ (löst jedes Mal frische Trauer aus), sondern: „Du vermisst sie. Was hat sie immer gekocht?“ <strong>„Ihr habt mein Geld gestohlen!“</strong>: nicht verteidigen — „Das wäre schlimm, das suchen wir zusammen“ (Verstecke merken!). Techniken: langsam, von vorn ansprechen, eine Botschaft pro Satz, Musik der Jugendjahre als Notfall-Anker — sie erreicht Menschen noch in späten Stadien. <strong>Angehörigen-Schutzplan:</strong> Tagespflege 2–3 Tage/Woche normalisieren BEVOR sie „nötig“ wirkt, Verhinderungspflege-Budget jährlich verbrauchen, Angehörigengruppe der Alzheimer-Gesellschaft (kostenlos), eigene Arzttermine halten — und die Doppel-Erlaubnis: wütend sein dürfen UND lieben. Beides zugleich ist der Normalzustand dieser Krankheit.</p>
<h5>Pflegeleistungen im Blick</h5>
<p>Demenz wird bei der Begutachtung voll gewertet — die kognitiven Module wiegen schwer, ein Pflegegrad ist daher oft früher erreichbar, als Angehörige denken. Daran hängen Entlastungsbetrag, Tages- und Verhinderungspflege, Zuschüsse fürs Wohnen und Pflegegeld. Der Pflege-Überblick unten zeigt die Größenordnung der Leistungen je Grad; die kostenlose Pflegeberatung nach § 7a hilft, sie auch wirklich abzurufen, bevor Budgets ungenutzt verfallen.</p>
` },
konflikt: { h: `
<h5>Das Mobbing-Tagebuch mit Beweis-Logik</h5>
<p>Format je Eintrag: Datum/Uhrzeit/Ort — Vorfall WÖRTLICH und konkret („A sagte vor dem Team: ‚…‘“ statt „A war gemein“) — Zeugen — eigene Reaktion — unmittelbare Folge (Aufgabe entzogen, bloßgestellt, krankgemeldet). Anlagen sammeln: E-Mails, Kalendereinträge, Atteste mit Belastungsbezug. Warum die Pedanterie: Vor HR und Gericht zählt das MUSTER (Systematik über Zeit) — zehn präzise Einträge schlagen hundert vage Erinnerungen; zeitnahe private Aufzeichnungen sind verwertbar und disziplinieren nebenbei die eigene Wahrnehmung (auch das schützt: nicht jeder schlechte Monat ist Mobbing).</p>
<h5>Das 4-Schritte-Gespräch & die Eskalationsleiter</h5>
<p><strong>Beim lösbaren Konflikt</strong> (Kollege übergeht dich bei Abstimmungen): 1. Beobachtung ohne Wertung: „In den letzten drei Meetings fielen Entscheidungen zu X ohne mich.“ 2. Wirkung: „Ich arbeite dadurch auf veralteter Basis.“ 3. Bedürfnis: „Ich brauche die Infos vor der Umsetzung.“ 4. Konkrete Bitte: „Nimm mich in den Verteiler, gib mir bei Änderungen 24 h.“ — dann schweigen und zuhören. <strong>Eskalationsleiter mit Rechtsbezug:</strong> Stufe 1 Direktgespräch (dokumentieren) → Stufe 2 Führungskraft/HR mit Tagebuch-Auszug, konkreter Abhilfe-Forderung und Frist (Fürsorgepflicht!) → Stufe 3 Betriebsrats-Beschwerde (§§ 84/85 BetrVG) bzw. AGG-Beschwerde bei Diskriminierungsmerkmal (Achtung: Entschädigungs-Frist 2 Monate!) → Stufe 4 Fachanwalt (Unterlassung, Schmerzensgeld, ggf. Strafanzeige) — parallel BEM nach 6 Wochen Krankheit nutzen und Versetzung formal beantragen.</p>
<h5>Die Exit-Strategie aus Stärke</h5>
<p>Wenn das System sich nicht ändert (realistisch bei verfestigtem Bossing): 1. <strong>Zwischenzeugnis JETZT</strong> anfordern („zur Standortbestimmung“ — Anspruch bei berechtigtem Interesse), wohlgesonnene Referenzgeber aktivieren. 2. <strong>Aus Anstellung bewerben</strong> (bessere Position, kein Sperrzeit-Druck) — Bewerbungs-Slots wie Arzttermine schützen. 3. <strong>Verhandelter Abgang:</strong> Aufhebungsvertrag nur mit Abfindung + Freistellung + Zeugnisnote + Sprachregelung; Sperrzeit-Risiko vorher mit der Arbeitsagentur klären — dokumentiertes Mobbing kann „wichtiger Grund“ sein und die Sperrzeit verhindern. 4. <strong>Sauber schließen:</strong> professionelle Übergabe, Tagebuch aufheben, und im nächsten Vorstellungsgespräch neutral rahmen („ich suche ein Umfeld mit X“) — Bitterkeit kostet Angebote, die Lektion nicht.</p>
<h5>Wann es KEIN Mobbing ist</h5>
<p>Nicht jeder Konflikt ist Mobbing — und die Abgrenzung schützt vor falschen Weichenstellungen. Ein einzelner harscher Streit, sachliche Kritik an der Leistung, eine unbequeme Umstrukturierung oder ein cholerischer Chef, der alle gleich schlecht behandelt, sind belastend, aber rechtlich kein Mobbing. Das setzt ein <em>systematisches, gegen eine Person gerichtetes</em> Anfeinden über längere Zeit voraus. Diese nüchterne Prüfung hilft, Energie richtig zu lenken: manche Konflikte löst ein gutes Gespräch, andere ein Abteilungswechsel — und nur wenige brauchen den juristischen Weg.</p>
` },

teilzeit: { h: `
<h5>Ansprüche & Fristen auf einen Blick</h5>
<table class="ptable"><tr><th>Modell</th><th>Voraussetzungen</th><th>Kern</th></tr>
<tr><td>Teilzeit unbefristet (§ 8 TzBfG)</td><td>Betrieb &gt;15 MA, 6 Mon. dabei, Antrag 3 Mon. vorher</td><td>Ablehnung nur aus betrieblichen Gründen — reagiert der AG nicht form- und fristgerecht, gilt Zustimmung!</td></tr>
<tr><td>Brückenteilzeit (§ 9a)</td><td>Betrieb &gt;45 MA, 6 Mon. dabei, 1–5 Jahre befristet</td><td>RÜCKKEHR-Garantie auf alte Stunden — die Lösung gegen die Teilzeitfalle</td></tr>
<tr><td>Elternzeit-Teilzeit (§ 15 BEEG)</td><td>Betrieb &gt;15 MA, 15–32 h/Woche</td><td>eigener Anspruch, Ablehnung nur aus dringenden Gründen (hohe Hürde)</td></tr>
<tr><td>Pflegezeit / Familienpflegezeit</td><td>Betrieb &gt;15 / &gt;25 MA</td><td>bis 6 Mon. ganz/teilweise raus bzw. bis 24 Mon. reduziert (min. 15 h), Kündigungsschutz, zinsloses Darlehen möglich</td></tr>
<tr><td>Aufstockung (§ 9)</td><td>Teilzeitkraft mit Wunsch</td><td>bevorzugte Berücksichtigung bei freien Stellen — Wunsch schriftlich hinterlegen</td></tr></table>
<h5>Der Antrag mit Aufgaben-Abgabe-Anlage</h5>
<p>Anschreiben-Kern: „…beantrage ich gemäß § 9a TzBfG die Verringerung von 40 auf 30 Wochenstunden, befristet vom 01.03. bis [+2 Jahre], Verteilung Mo–Do je 7,5 h. Ich bitte um Erörterung und schriftliche Entscheidung bis [Frist].“ <strong>Anlage Aufgaben-Matrix</strong> (das eigentliche Verhandlungsdokument): Spalte 1 aktuelle Aufgaben mit Zeitanteil, Spalte 2 Vorschlag (behalte ich / gebe ab an X / entfällt / wird gebündelt), Spalte 3 Übergabeplan. Wirkung: Der Arbeitgeber sieht Lösung statt Problem — und schriftlich steht, dass 30 Stunden auch 30 Stunden Last bedeuten. Plus Review-Klausel („nach 3 Monaten gemeinsame Überprüfung von Zuschnitt und Erreichbarkeit“) und Erreichbarkeits-Satz: „An freien Tagen besteht keine Erreichbarkeitspflicht.“</p>
<h5>Netto-/Renten-Rechnung & fortgeschrittene Modelle</h5>
<p><strong>Beispiel 4.000 € brutto, 40→30 h:</strong> Brutto −25 %, Netto sinkt dank Progression nur ~20–22 % — die gewonnene Stunde ist „billiger“ als gedacht (Netto-Rechner im Gehalts-Artikel). Langfrist-Effekte: Rentenpunkte sinken proportional (5 Jahre Brücke: überschaubar; 20 Jahre Dauerteilzeit: substanziell — Ausgleich über Depot-Sparrate oder freiwillige DRV-Beiträge), bAV konstant halten verhandeln, und Lohnersatzleistungen (Elterngeld! ALG!) bemessen sich am REDUZIERTEN Netto — Timing vor geplanter Elternzeit bedenken. <strong>Fortgeschritten:</strong> 4-Tage-Woche komprimiert vs. echte 80 %, Jobsharing für Führung (Tandem-Bewerbung mit Übergabe-Ritual als Erfolgsfaktor), Jahresarbeitszeit für Saisonberufe, Sabbatical-Brücke für befristete Lebensphasen statt Dauerreduktion.</p>
<h5>Netto selbst rechnen</h5>
<p>Weniger Stunden heißt nicht proportional weniger Netto: Dank der Steuerprogression sinkt das Netto langsamer als das Brutto — die abgegebene Stunde ist „günstiger“, als die Prozentzahl vermuten lässt. Der Rechner unten zeigt aus Vollzeit-Brutto und Wunschstunden das anteilige Brutto, eine Netto-Schätzung und den Stundenlohn. Den langfristigen Renteneffekt im Hinterkopf behalten und bei Dauerteilzeit über eine kleine Ausgleichs-Sparrate nachdenken.</p>
` },

nebenjob: { h: `
<h5>Minijob vs. Midijob vs. Werkstudent: der Netto-Vergleich</h5>
<table class="ptable"><tr><th>Modell</th><th>Abzüge (AN-Seite)</th><th>Optimal für</th></tr>
<tr><td>Minijob neben Hauptjob</td><td>~0 (bzw. 3,6 % RV — behalten!)</td><td>kleiner stabiler Zuverdienst; Grenze beachten — Überschreiten macht alles SV-pflichtig</td></tr>
<tr><td>Midijob (Übergangsbereich bis ~2.000 €)</td><td>gleitend reduzierte SV bei VOLLEN Leistungsansprüchen</td><td>größerer Nebenerwerb/Teilzeit-Lagen — oft mehr Netto UND mehr Rente als die Minijob-Klemme</td></tr>
<tr><td>Werkstudent</td><td>nur RV-Anteil, Steuer nach Klasse</td><td>Studierende ab ~600 €/Monat: schlägt Minijob deutlich; 20-h-Grenze in der Vorlesungszeit</td></tr>
<tr><td>Kurzfristige Beschäftigung</td><td>SV-frei (max. 3 Monate/70 Tage im Jahr)</td><td>Ferien-/Saisonjobs, nicht berufsmäßig</td></tr></table>
<h5>Das Nebengewerbe-Starterpaket</h5>
<p><strong>Einordnen:</strong> Freiberufler (Katalogberufe, kreativ-wissenschaftlich: nur ELSTER-Fragebogen, keine Gewerbeanmeldung/IHK) vs. Gewerbe (Handel, Vermittlung, Handwerk: Gewerbeamt 20–60 €, IHK-Grundbeitrag für Kleingewerbe oft ermäßigt/befreit). <strong>Kleinunternehmer-Entscheidung:</strong> unterhalb der Umsatzgrenze keine USt = weniger Bürokratie; Verzicht lohnt nur bei B2B-Kunden mit nennenswerter Vorsteuer. <strong>Buchhaltung minimal:</strong> separates Unterkonto, monatliche Einnahmen-Ausgaben-Tabelle, Belege als Quartals-Fotoordner, EÜR mit der Steuererklärung. <strong>Pflichten-Radar:</strong> Krankenkasse informieren (nebenberuflich-Status schriftlich bestätigen lassen — Faustzeichen: unter ~20 h/Woche und Einkommen unter dem Hauptjob), Impressum bei Online-Auftritt, Berufshaftpflicht je nach Tätigkeit; Wachstums-Schwellen kennen: hauptberuflich-Einstufung (KV!), Gewerbesteuer-Freibetrag 24.500 € Gewinn, Kleinunternehmer-Grenze.</p>
<h5>Rentner-Zuverdienst & Haushaltshilfe legal</h5>
<p><strong>Rentner:</strong> Hinzuverdienst ist auch bei vorgezogener Rente unbegrenzt (seit 2023) — aber Lohn + Rente werden zusammen versteuert (Steuererklärungspflicht!), und je nach Konstellation fallen KV/PV-Beiträge an. Wer ÜBER der Regelaltersgrenze weiterarbeitet, steigert die Rente doppelt: 0,5 % Zuschlag pro Aufschub-Monat plus weitere Beiträge — Arbeiten 67+ ist rentenmathematisch erstaunlich attraktiv; der Minijob bleibt die unkomplizierte Variante. <strong>Haushaltshilfe in 10 Minuten legal (Haushaltsscheck):</strong> Online-Anmeldung bei der Minijob-Zentrale, ~15 % Pauschalabgaben — dafür Unfallschutz der Hilfe (Sturz beim Fensterputzen = sonst dein Regress-Risiko!), 20 % Steuerbonus (max. 510 €/Jahr direkt von der Steuerschuld — holt die Abgaben fast komplett zurück) und Rechtssicherheit statt Schwarzarbeits-Bußgeld. Win-win-Argument: Rentenpunkte und Absicherung für sie, Bonus für dich.</p>
<h5>Erst beim Arbeitgeber anzeigen</h5>
<p>Eine Nebentätigkeit muss man dem Hauptarbeitgeber in der Regel anzeigen; verbieten kann er sie nur, wenn berechtigte Interessen berührt sind — vor allem Konkurrenztätigkeit beim Wettbewerber oder eine Belastung, die die Hauptleistung beeinträchtigt. Hartе Grenze ist das Arbeitszeitgesetz: Haupt- und Nebenjob zusammen dürfen die Höchstarbeitszeit und die Ruhezeiten nicht sprengen. Im Urlaub und während einer Krankschreibung ist eine Nebentätigkeit, die dem Erholungs- bzw. Genesungszweck zuwiderläuft, unzulässig.</p>
` },

sozialleistungen: { h: `
<h5>Die Leistungs-Landkarte</h5>
<table class="ptable"><tr><th>Leistung</th><th>Zuständig</th><th>Typischer Rahmen</th></tr>
<tr><td>Wohngeld / Lastenzuschuss</td><td>Wohngeldstelle Kommune</td><td>sehr variabel, oft 100–400 €+/Monat; 12 Monate Bewilligung</td></tr>
<tr><td>Kinderzuschlag + Bildung & Teilhabe</td><td>Familienkasse</td><td>bis ~290 €+/Kind + Schulbedarf, Mittagessen, 15 €/Mon. Verein, Kita-Befreiung</td></tr>
<tr><td>Bürgergeld</td><td>Jobcenter</td><td>Regelsatz + angemessene Warmmiete + KV; Erwerbstätigen-Freibeträge</td></tr>
<tr><td>Unterhaltsvorschuss</td><td>Jugendamt</td><td>altersgestaffelt bis 18 — ohne Einkommensprüfung des Alleinerziehenden</td></tr>
<tr><td>Grundsicherung Alter/EM</td><td>Sozialamt</td><td>Bürgergeld-Logik; Kinder-Rückgriff erst ab 100.000 € Brutto</td></tr>
<tr><td>Befreiungen & Sozialtarife</td><td>Beitragsservice, Anbieter</td><td>Rundfunk, ÖPNV-Sozialticket, Stromspar-Check</td></tr></table>
<h5>Drei Haushalte durchgerechnet (Richtwerte!)</h5>
<p><strong>Alleinerziehend, 1 Kind (8), 1.400 € netto, Miete warm 750 €:</strong> Kindergeld + Unterhalt/UVG ~300 € + Kinderzuschlag-Prüfung (gute Chancen, inkl. BuT und Kita-Befreiung) + Wohngeld parallel + Steuerklasse-II-Entlastungsbetrag — Gesamtplus gegenüber Nichtbeantragen oft 400–700 €/Monat. <strong>Familie, 2 Kinder, Alleinverdiener 2.400 € netto, Miete 1.050 €:</strong> der klassische KiZ+Wohngeld-Fall — die Kombination schlägt meist aufstockendes Bürgergeld und vermeidet dessen Vermögensregime. <strong>Rentnerin, 950 € Rente, Miete 580 €:</strong> Wohngeld UND Grundsicherung prüfen — viele Ältere verzichten aus Scham oder Angst vor Kinder-Rückgriff: unter 100.000 € Jahresbrutto der Kinder unbegründet; dazu Rundfunkbefreiung. Moral: immer KOMBINATIONEN rechnen — Einzelleistungs-Denken verschenkt Geld.</p>
<h5>Antrags-Checkliste & Widerspruchs-Baukasten</h5>
<p><strong>Universal-Unterlagen-Paket</strong> (einmal als Scan-Set anlegen): Ausweis, Mietvertrag + aktuelle Miete, Einkommensnachweise 3–6 Monate, Kontoauszüge 3 Monate (sensible Buchungstexte schwärzen ist teils zulässig, Beträge sichtbar), KV-Nachweis, Geburtsurkunden. Eingang IMMER dokumentieren (Online-Bestätigung, Einwurf mit Zeuge), unvollständig einreichen wahrt die Frist — Leistungen gelten ab Antragsmonat! <strong>Widerspruchs-Baukasten:</strong> Absatz 1 Formalia: „Hiermit lege ich Widerspruch gegen den Bescheid vom … (Az. …) ein. Die Begründung folgt binnen 14 Tagen.“ (Frist sofort gewahrt!) Absatz 2 Begründungs-Klassiker: Einkommen falsch berechnet, Wohnkosten gekürzt ohne Kostensenkungsaufforderung, Mehrbedarfe vergessen (Alleinerziehung, Schwangerschaft, Ernährung), Vermögens-Fehlbewertung (Schonvermögen!). Absatz 3 Anlagen nummeriert. Hilfe: Sozialverbände (VdK/SoVD ~7–10 €/Monat inkl. Vertretung), Sozialberatungen, Beratungshilfeschein — die Widerspruchs-Erfolgsquoten im Sozialrecht sind hoch genug, dass sich Wehren statistisch fast immer lohnt.</p>
<h5>Scham ist der teuerste Ratgeber</h5>
<p>Ein großer Teil der zustehenden Leistungen wird nie abgerufen — aus Unkenntnis oder Scham. Dabei sind Wohngeld, Kinderzuschlag oder Grundsicherung kein Almosen, sondern beitrags- und steuerfinanzierte Ansprüche, für die man jahrelang eingezahlt hat. Wer unsicher ist, lässt einmal kostenlos rechnen (Sozialberatung, Verbände, Online-Rechner der Behörden) und beantragt im Zweifel — abgelehnt werden kostet nichts, nicht beantragen kostet jeden Monat.</p>
` },

kindersparen: { h: `
<h5>Kind- vs. Eltern-Depot: die Entscheidungstabelle</h5>
<table class="ptable"><tr><th>Kriterium</th><th>Depot auf Kindsnamen</th><th>Depot auf Elternnamen</th></tr>
<tr><td>Steuer</td><td>eigener Sparerpauschbetrag + NV-Bescheinigung = praktisch steuerfreies Wachstum</td><td>belastet Eltern-Freibeträge, Abgeltungsteuer</td></tr>
<tr><td>Kontrolle ab 18</td><td>Kind verfügt voll — rechtlich bindend</td><td>Eltern bestimmen Zeitpunkt & Zweck der Übergabe</td></tr>
<tr><td>BAföG</td><td>zählt als KINDES-Vermögen (Freibetrag ~15.000 € — darüber Anrechnung)</td><td>Elternvermögen ist BAföG-irrelevant</td></tr>
<tr><td>Schenkung/Erbplanung</td><td>Einzahlungen sind Schenkungen — Freibeträge riesig (400 T€ Eltern / 200 T€ Großeltern je 10 Jahre)</td><td>Übertrag später gestaltbar</td></tr>
<tr><td>Schutz</td><td>Kindesvermögen ist von Eltern-Risiken getrennt; Eltern dürfen es NICHT für sich verwenden (Vermögenssorge!)</td><td>unterliegt Eltern-Risiken (Pfändung, Bedürftigkeitsprüfung)</td></tr></table>
<p>Faustregel: Normalfall + Steueroptimierung → Kindsdepot; absehbar hohe Summen Richtung BAföG-Grenze oder starker Kontrollwunsch → Elterndepot — oder Mischung: Sockel beim Kind, Aufbau bei den Eltern.</p>
<h5>Das 30-Minuten-Setup & die NV-Bescheinigung</h5>
<p>1. Broker mit kostenlosem Junior-Depot (beide Sorgeberechtigte legitimieren — Ausweise + Geburtsurkunde; bei getrennter Sorge: beide Unterschriften). 2. Sparplan ab 25–50 € auf EINEN thesaurierenden Welt-ETF (Kriterien im ETF-Artikel) — Themen-ETF-Spielereien fürs Kind sein lassen. 3. Freistellungsauftrag auf Kindsnamen UND <strong>NV-Bescheinigung</strong> beim Finanzamt beantragen: Da das Kind außer Kapitalerträgen kein Einkommen hat, bleiben Erträge bis Grundfreibetrag + Pauschbetrag steuerfrei — die Bescheinigung (3 Jahre gültig) beim Broker hinterlegen, dann wird gar keine Steuer abgeführt. 4. Zugänge in den Lebensordner; jährlich 10 Minuten: Sparrate prüfen, Geburtstagsgeld nachschießen. Finger weg von Ausbildungsversicherungen und „Kinder-Policen“ — Kostenfresser mit Mini-Rendite, der Klassiker am Wochenbett-Vertriebstisch.</p>
<h5>Großeltern-Strategien & der 18. Geburtstag</h5>
<p>Großeltern sind steuerlich die idealen Schenker (200.000 € je Enkel alle 10 Jahre): Der Geburtstags-Dauerauftrag ins Junior-Depot schlägt jeden Spielzeugberg — und die Absprache verhindert das Konto-Wirrwarr aus fünf Sparbüchern bei drei Banken; größere Einmalbeträge dokumentieren (formlose Schenkungsnotiz mit Datum reicht im Normalfall). Zweckschenkungen (Ausbildung, Führerschein) lieber direkt an den Anbieter zahlen. <strong>Die Sportwagen-Angst entschärfen:</strong> Wer Kontrolle über 18 hinaus will, braucht das Eltern-Depot — beim Kindsdepot ist Vertrauen Teil des Konzepts; die wirksamste Versicherung ist Finanzbildung: ab ~12 das Depot gemeinsam anschauen („Kurssturz = der Sparplan kauft billig ein“), ab 16 echtes Budget aufs Jugendkonto. Studien und Erfahrung zeigen: Früh eingebundene Kinder verprassen selten — verheimlichtes Geld dagegen oft. Unten: der Rechner, was die Sparrate bis zum 18. Geburtstag ergibt.</p>
<h5>Wofür und wie viel?</h5>
<p>Realistische Ziele machen das Sparen leichter: ein Startkapital für Ausbildung, Studium, erste Wohnung oder den Führerschein — nicht der große Wurf, sondern Verlässlichkeit. Schon eine kleine monatliche Rate über 18 Jahre wird durch den Zinseszins erstaunlich groß, und Geburtstags- und Weihnachtsgeld lässt sich gezielt nachschießen. Wichtiger als die perfekte Summe ist der frühe, automatische Start; der Rechner unten zeigt, was die eigene Rate bis zum 18. Geburtstag ergibt.</p>
`, tool: "kindsparplan" }
};
const BUECHER = {
abschluesse: [
 {t:"Mindset", a:"Carol Dweck", i:"Die Psychologin zeigt: Wer Fähigkeiten als entwickelbar begreift (Growth Mindset) statt als festgelegt, lernt nach Rückschlägen weiter — die mentale Grundlage jedes nachgeholten Abschlusses."},
 {t:"Die 1%-Methode", a:"James Clear", i:"Große Bildungsziele scheitern an großen Plänen: Clear argumentiert, dass identitätsbasierte Mini-Gewohnheiten (täglich 20 Minuten lernen, weil ich ein Lernender bin) jede Willenskraft-Strategie schlagen."}],
ausb_studium: [
 {t:"So gut, dass sie dich nicht ignorieren können", a:"Cal Newport", i:"Newports Kernthese gegen den Passion-Mythos: Nicht der Traumberuf macht zufrieden, sondern seltene Fähigkeiten, die man systematisch aufbaut — egal ob über Ausbildung oder Studium."},
 {t:"Durchstarten zum Traumjob", a:"Richard N. Bolles", i:"Der Klassiker der Berufswahl: Selbstinventur vor Stellensuche — wer seine übertragbaren Fähigkeiten, Lieblingsthemen und Arbeitsbedingungen kennt, wählt den Weg, nicht das Etikett."}],
studienfin: [
 {t:"Das einzige Buch, das du über Finanzen lesen solltest", a:"Thomas Kehl & Mona Linke", i:"Der Finanzfluss-Gründer erklärt die Grundmechanik junger Finanzen: Humankapital ist das größte Vermögen Studierender — und früh investierte Kleinbeträge schlagen später große."},
 {t:"Über die Psychologie des Geldes", a:"Morgan Housel", i:"Housels Kernidee: Finanzieller Erfolg ist Verhalten, nicht Intelligenz — wer in knappen Studienjahren Sparverhalten lernt, besitzt die wichtigste Fähigkeit fürs ganze Leben."}],
weiterbildung: [
 {t:"Deep Work", a:"Cal Newport", i:"Konzentrierte, ablenkungsfreie Arbeit ist die Schlüsselqualifikation der Wissensökonomie — Newport liefert das Argument, warum Lernzeit-Blöcke wertvoller sind als jedes Zertifikat nebenbei."},
 {t:"Die 1%-Methode", a:"James Clear", i:"Clears Habit-Stacking macht aus Weiterbildung Alltag: neue Lerngewohnheiten an bestehende Routinen koppeln, Umgebung gestalten, Fortschritt sichtbar machen."}],
privatbildung: [
 {t:"Neues Lernen", a:"Benedict Carey", i:"Der Wissenschaftsjournalist räumt mit Lernmythen auf: Vergessen ist Teil des Lernens, Abwechslung schlägt Routine, und Selbsttests sind das wirksamste Werkzeug — Wissenschaft statt Schulweisheit."},
 {t:"Die Kunst des guten Lebens", a:"Rolf Dobelli", i:"52 Denkwerkzeuge für den Alltag: Dobelli destilliert Psychologie und Philosophie zu mentalen Modellen — privates Lernen als Weg zu besseren Entscheidungen statt Faktensammeln."}],
auslandszeit: [
 {t:"Die 4-Stunden-Woche", a:"Timothy Ferriss", i:"Ferriss' Mini-Ruhestände statt aufgeschobenem Leben: Auslandszeiten sind planbar und finanzierbar, wenn man Geografie-Arbitrage und klare Deadlines nutzt — provokant, aber der Mut-Klassiker."},
 {t:"Über die Psychologie des Geldes", a:"Morgan Housel", i:"Housels Kapitel über Freiheit als höchste Dividende: Geld ist am wertvollsten, wenn es Zeit und Optionen kauft — die ökonomische Rechtfertigung jedes Auslandsjahrs."}],
aufstieg: [
 {t:"So gut, dass sie dich nicht ignorieren können", a:"Cal Newport", i:"Karrierekapital schlägt Leidenschaft: Newports Logik erklärt, warum Meister und Fachwirte mit seltenen, nachgefragten Fähigkeiten oft zufriedener und gefragter sind als Generalisten mit Abschluss."},
 {t:"Mindset", a:"Carol Dweck", i:"Dwecks Forschung zu Prüfungsangst und Durchhalten: Wer Fehler als Lernsignal liest, übersteht die Meisterprüfungs-Durststrecke — das mentale Rüstzeug zur Aufstiegsfortbildung."}],
lernen: [
 {t:"Neues Lernen", a:"Benedict Carey", i:"Careys Synthese der Lernforschung: verteiltes Lernen, Selbsttests und sogar strategische Pausen schlagen Marathon-Sessions — das wissenschaftliche Fundament jedes Prüfungsplans."},
 {t:"Mindset", a:"Carol Dweck", i:"Die Growth-Mindset-Studien zeigen: Die Bewertung von Fehlern entscheidet über Lernerfolg — wer Klausur-Patzer als Daten statt als Urteil liest, verbessert sich messbar schneller."}],
sprachen: [
 {t:"Sprachenlernen leichtgemacht", a:"Vera F. Birkenbihl", i:"Birkenbihls gehirn-gerechte Methode: Verstehen vor Sprechen, De-Kodieren statt Vokabelpauken — ihr Ansatz erklärt, warum stures Listen-Lernen scheitert und Kontext gewinnt."},
 {t:"Fluent Forever", a:"Gabriel Wyner", i:"Der Opernsänger, der sechs Sprachen lernte: Aussprache zuerst, Bilder statt Übersetzungen auf Karteikarten, Spaced Repetition als Motor — das System hinter schnellem Spracherwerb."}],
fernstudium: [
 {t:"Deep Work", a:"Cal Newport", i:"Fernstudium ist ein Deep-Work-Projekt: Newports Rituale (feste Blöcke, Shutdown-Routine, Ablenkungs-Architektur) sind die Überlebensausrüstung gegen die hohe Abbruchquote."},
 {t:"Die 1%-Methode", a:"James Clear", i:"Clears Plateau des latenten Potenzials erklärt das Tal im 3. Semester: Ergebnisse hinken Gewohnheiten hinterher — wer Systeme statt Ziele baut, übersteht die Durststrecke."}],
bewerbung: [
 {t:"Das große Hesse/Schrader Bewerbungshandbuch", a:"Jürgen Hesse & Hans Christian Schrader", i:"Das deutsche Standardwerk: Bewerbung als Marketing in eigener Sache — von der Stellenanzeigen-Analyse bis zur Ergebnis-Formulierung im Lebenslauf, mit hunderten Mustern."},
 {t:"Durchstarten zum Traumjob", a:"Richard N. Bolles", i:"Bolles' meistverkaufter Karriere-Ratgeber dreht die Logik um: Der verdeckte Stellenmarkt läuft über Menschen, nicht Portale — Netzwerk-Recherche schlägt Massenbewerbung."}],
vorstellung: [
 {t:"Kompromisslos verhandeln", a:"Chris Voss", i:"Der Ex-FBI-Verhandler überträgt Geiselnahme-Taktiken auf Gespräche: taktische Empathie, kalibrierte Fragen und das hörbare Spiegeln — Werkzeuge, die auch im Interview Souveränität erzeugen."},
 {t:"Das große Hesse/Schrader Bewerbungshandbuch", a:"Jürgen Hesse & Hans Christian Schrader", i:"Die Interview-Kapitel sezieren jede Standardfrage nach ihrer Absicht — wer die Prüflogik hinter 'Stärken und Schwächen' versteht, antwortet strategisch statt auswendig."}],
arbeitsvertrag: [
 {t:"Das Harvard-Konzept", a:"Roger Fisher & William Ury", i:"Der Verhandlungsklassiker: hart in der Sache, weich zu den Menschen — Interessen statt Positionen verhandeln macht auch Vertragsklauseln (Versetzung, Bindung) zur Win-win-Frage."},
 {t:"Ich arbeite in einem Irrenhaus", a:"Martin Wehrle", i:"Der Karrierecoach entlarvt Büro-Absurditäten und Vertrags-Fallen mit Humor — und schärft den Blick dafür, welche Klauseln Alltag werden und welche nur Drohkulisse sind."}],
gehalt: [
 {t:"Kompromisslos verhandeln", a:"Chris Voss", i:"Voss' Ankertechniken und das kalibrierte 'Wie soll ich das machen?' verschieben Gehaltsgespräche: Wer die Gegenseite Probleme lösen lässt, statt zu fordern, verhandelt härter als jeder Fordernde."},
 {t:"Das Harvard-Konzept", a:"Roger Fisher & William Ury", i:"Das BATNA-Prinzip — die beste Alternative zur Verhandlung — ist die wahre Quelle von Verhandlungsmacht: Wer ein Gegenangebot hat, verhandelt anders. Wer keines hat, sollte eins beschaffen."}],
kuendigung: [
 {t:"Ich arbeite in einem Irrenhaus", a:"Martin Wehrle", i:"Wehrles Insiderblick auf Trennungsprozesse: Wie Arbeitgeber Kündigungen vorbereiten, was Abfindungs-Signale sind — und warum die ersten 72 Stunden über die Verhandlungsposition entscheiden."},
 {t:"Über die Psychologie des Geldes", a:"Morgan Housel", i:"Housels Sicherheitsmarge-Denken: Der Notgroschen ist kein totes Geld, sondern gekaufte Verhandlungsmacht — wer 6 Monate überbrücken kann, unterschreibt keinen schlechten Aufhebungsvertrag."}],
selbststaendig: [
 {t:"Der Weg zur finanziellen Freiheit", a:"Bodo Schäfer", i:"Schäfers Unternehmer-Kapitel: Einkommen entkoppeln von Zeit, Rücklagen-Disziplin vor Wachstum — motivierender Klassiker mit dem nötigen Körnchen Salz beim Renditeversprechen."},
 {t:"Die 4-Stunden-Woche", a:"Timothy Ferriss", i:"Ferriss' Muse-Konzept: kleine, automatisierbare Geschäftsmodelle testen, bevor man kündigt — Validierung mit Mini-Budget statt Businessplan-Romantik."}],
neuorientierung: [
 {t:"Durchstarten zum Traumjob", a:"Richard N. Bolles", i:"Die Flower-Übung des Klassikers inventarisiert übertragbare Fähigkeiten systematisch — das Werkzeug, um Brückenrollen zwischen altem und neuem Berufsfeld zu finden."},
 {t:"So gut, dass sie dich nicht ignorieren können", a:"Cal Newport", i:"Newport warnt vor dem Passion-Sprung ins Ungewisse: Karrierekapital mitnehmen statt bei null anfangen — die Strategie hinter jedem gelungenen Quereinstieg."}],
konflikt: [
 {t:"Ich arbeite in einem Irrenhaus", a:"Martin Wehrle", i:"Wehrle beschreibt die Anatomie toxischer Arbeitsumfelder von innen — und liefert die nüchterne Erkenntnis: Manche Systeme ändert man nicht, man dokumentiert und verlässt sie geordnet."},
 {t:"Das Harvard-Konzept", a:"Roger Fisher & William Ury", i:"Menschen und Probleme trennen — das Harvard-Prinzip ist die Blaupause des 4-Schritte-Gesprächs: Beobachtung statt Vorwurf öffnet Lösungen, wo Schuldzuweisung Fronten zementiert."}],
teilzeit: [
 {t:"Deep Work", a:"Cal Newport", i:"Newports unbequeme Wahrheit für Teilzeit-Verhandlungen: Wertvoll ist konzentrierter Output, nicht Anwesenheit — wer Deep-Work-Ergebnisse vorweist, verhandelt Stunden aus einer Position der Stärke."},
 {t:"Die 4-Stunden-Woche", a:"Timothy Ferriss", i:"Ferriss' Pareto-Radikalität: 20 % der Aufgaben liefern 80 % des Werts — die intellektuelle Munition für jede Aufgaben-Abgabe-Matrix im Reduktionsantrag."}],
nebenjob: [
 {t:"Der Weg zur finanziellen Freiheit", a:"Bodo Schäfer", i:"Schäfers zweites Standbein-Doktrin: Nebeneinkommen ist Risikostreuung fürs Humankapital — und der Test, ob aus einer Fähigkeit ein Geschäft werden kann, bevor man alles darauf setzt."},
 {t:"Das einzige Buch, das du über Finanzen lesen solltest", a:"Thomas Kehl & Mona Linke", i:"Die Finanzfluss-Autoren rechnen vor, was Zusatzeinkommen wirklich bringt: Erst die Sparquote des Nebenjobs — investiert statt verkonsumiert — macht den Unterschied im Vermögensaufbau."}],
budget: [
 {t:"Über die Psychologie des Geldes", a:"Morgan Housel", i:"Housels berühmteste Einsicht: Vermögen ist das, was man NICHT sieht — gespartes Geld statt gezeigtem Konsum. Budgetieren ist angewandte Psychologie, nicht Mathematik."},
 {t:"Das einzige Buch, das du über Finanzen lesen solltest", a:"Thomas Kehl & Mona Linke", i:"Das Kontenmodell-Kapitel der Finanzfluss-Macher: Automatisierung schlägt Disziplin — wer Sparen zur Voreinstellung macht, budgetiert ohne Willenskraft."}],
notgroschen: [
 {t:"Über die Psychologie des Geldes", a:"Morgan Housel", i:"Housels Raum-für-Fehler-Prinzip: Der Puffer ist keine Renditebremse, sondern das, was einen im Spiel hält, wenn das Leben würfelt — Überleben schlägt Optimierung."},
 {t:"Ihre Finanzen fest im Griff", a:"Hartmut Walz", i:"Der Verhaltensökonom seziert, warum Menschen Liquidität unterschätzen und Renditejagd überschätzen — sein nüchterner Dreischichten-Aufbau beginnt genau beim Notgroschen."}],
etf: [
 {t:"Souverän investieren mit Indexfonds und ETFs", a:"Gerd Kommer", i:"Das deutsche Standardwerk des passiven Investierens: Kommer belegt mit Daten, warum prognosefreies Welt-Investieren aktive Strategien langfristig schlägt — und wie man das Weltportfolio baut."},
 {t:"Über die Psychologie des Geldes", a:"Morgan Housel", i:"Housels Volatilitäts-These: Kursschwankungen sind die Eintrittsgebühr für Aktienrenditen, keine Strafe — wer das akzeptiert, verkauft im Crash nicht und gewinnt durch Sitzenbleiben."}],
steuern: [
 {t:"Ihre Finanzen fest im Griff", a:"Hartmut Walz", i:"Walz ordnet Steueroptimierung nüchtern ein: erst Kosten und Risiken im Griff, dann Steuern — und warnt vor Produkten, die nur wegen des Steuervorteils existieren."},
 {t:"Das einzige Buch, das du über Finanzen lesen solltest", a:"Thomas Kehl & Mona Linke", i:"Die Steuer-Basics für Anleger verständlich: Pauschbeträge, Freistellungsauftrag, Vorabpauschale — das Kapitel nimmt der Steuererklärung den Schrecken."}],
versicherungen: [
 {t:"Ihre Finanzen fest im Griff", a:"Hartmut Walz", i:"Walz' eiserne Trennung: Versichern und Sparen nie mischen — seine Analyse kapitalbildender Policen ist die fundierteste Abrechnung mit dem deutschen Lieblingsfehler."},
 {t:"Das einzige Buch, das du über Finanzen lesen solltest", a:"Thomas Kehl & Mona Linke", i:"Die Prioritätenpyramide der Versicherungen: existenzielle Risiken zuerst, Bagatellen selbst tragen — mit konkreten Kriterien für Haftpflicht und BU."}],
vorsorge: [
 {t:"Souverän investieren mit Indexfonds und ETFs", a:"Gerd Kommer", i:"Kommers Entnahme- und Lebenszyklus-Kapitel: Wie sich die Aktienquote über Jahrzehnte steuern lässt und warum Inflation der eigentliche Gegner der Altersvorsorge ist."},
 {t:"Über die Psychologie des Geldes", a:"Morgan Housel", i:"Der Zinseszins als achtes Weltwunder, richtig erzählt: Housels Buffett-Analyse zeigt, dass DAUER der entscheidende Faktor ist — Altersvorsorge belohnt den frühen Start exponentiell."}],
schulden: [
 {t:"Der Weg zur finanziellen Freiheit", a:"Bodo Schäfer", i:"Schäfers Schuldenkapitel ist Motivationsliteratur mit System: parallele Tilgung und Vermögensaufbau, Konsumkredit-Stopp — die psychologische Anleitung zum Schuldenausstieg."},
 {t:"Die 1%-Methode", a:"James Clear", i:"Schuldenabbau ist Gewohnheitsarbeit: Clears Umgebungsdesign (Karten einfrieren, Automatisierung, sichtbarer Fortschritt) übersetzt Tilgungspläne in durchhaltbares Verhalten."}],
schufa: [
 {t:"Das einzige Buch, das du über Finanzen lesen solltest", a:"Thomas Kehl & Mona Linke", i:"Bonität als Vermögenswert: Die Autoren erklären, wie Score-Mechanik, Konditionsanfragen und Datenhygiene über Kreditkosten entscheiden — Finanzbildung jenseits des Depots."},
 {t:"Ihre Finanzen fest im Griff", a:"Hartmut Walz", i:"Walz über Informationsasymmetrien im Finanzsystem: Wer seine Daten kennt und kontrolliert (Auskunftsrechte!), verhandelt mit Banken auf Augenhöhe."}],
sozialleistungen: [
 {t:"Über die Psychologie des Geldes", a:"Morgan Housel", i:"Housels Demut-These: Niemand ist verrückt — finanzielle Lagen entstehen aus Umständen und Zufall. Die Entstigmatisierung, die es braucht, um zustehende Leistungen abzurufen."},
 {t:"Ihre Finanzen fest im Griff", a:"Hartmut Walz", i:"Walz' Systematik der Existenzsicherung: Erst das Fundament aus Absicherung und Ansprüchen, dann alles andere — Sozialleistungen sind Teil der Finanzarchitektur, kein Makel."}],
kindersparen: [
 {t:"Souverän investieren mit Indexfonds und ETFs", a:"Gerd Kommer", i:"Kommers Daten zum Anlagehorizont: Je länger die Frist, desto kleiner das Aktienrisiko historisch — 18 Jahre Kinderdepot sind der Idealfall des passiven Investierens."},
 {t:"Der Weg zur finanziellen Freiheit", a:"Bodo Schäfer", i:"Schäfer schrieb mit 'Ein Hund namens Money' auch DEN Kinder-Finanzklassiker — seine Kernidee: Geldbildung ist Erziehungsaufgabe, und das Depot ist das Lehrbuch."}]
};
window.LW_DATA={KATS:KATS,PHASEN:PHASEN,SITS:SITS,ARTIKEL:ARTIKEL,PREM_DETAIL:PREM_DETAIL,BUECHER:BUECHER};
/* Interaktive Vertiefungen: neue Rechner an passende Artikel binden */
try{ var _PD=PREM_DETAIL; if(_PD.vertraege)_PD.vertraege.tool="verzug"; if(_PD.teilzeit)_PD.teilzeit.tool="teilzeit"; if(_PD.wg)_PD.wg.tool="wgmiete"; if(_PD.versicherungen)_PD.versicherungen.tool="burente"; if(_PD.selbststaendig)_PD.selbststaendig.tool="stundensatz"; if(_PD.heirat)_PD.heirat.tool="ehesplitting"; if(_PD.trennung)_PD.trennung.tool="kindesunterhalt"; if(_PD.pflegeang)_PD.pflegeang.tool="pflege"; if(_PD.krankenvers)_PD.krankenvers.tool="krankengeld"; if(_PD.erziehung)_PD.erziehung.tool="taschengeld"; if(_PD.bestattung)_PD.bestattung.tool="bestatt"; if(_PD.aufstieg)_PD.aufstieg.tool="aufstiegsbafoeg"; if(_PD.wohnenalter)_PD.wohnenalter.tool="wohnumbau"; if(_PD.sanierung)_PD.sanierung.tool="sanierung"; if(_PD.teilzeit)_PD.teilzeit.tool="teilzeit"; if(_PD.demenz)_PD.demenz.tool="pflege"; if(_PD.kindersparen && !_PD.kindersparen.tool)_PD.kindersparen.tool="kindsparplan"; }catch(e){}
