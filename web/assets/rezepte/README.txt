HeiBen Kulinarik — Rezeptbilder
================================
Hier kommen die Rezeptfotos hinein. Pro Rezept genau eine Datei.

Dateiname  = Rezept-ID + ".jpg"   (siehe _dateiliste.csv)
Beispiel   : tav-kosi.jpg, b-uf-bourguignon.jpg
Format     : JPG
Seitenverh.: 3:2 quer, 1600 x 1067 px (bis 1920 x 1280), unter ~300 KB
Motiv      : Gericht mittig mit Rand (wird auf 21:9 / 16:9 / 4:3 zugeschnitten),
             kein Text, kein Logo im Bild.

Sobald eine Datei mit passendem Namen hier liegt, erscheint sie automatisch auf
der Übersicht und der Rezeptseite. Fehlt eine Datei, bleibt der Platzhalter stehen.
Keine Änderung im Code nötig.

Die IDs sind unveränderlich, auch wo sie Sonderzeichen verloren haben
(Tiramisù -> tiramis.jpg, Ćevapi -> evapi.jpg). An ihnen haengen Deep-Links,
Merklisten und Suchindex. Namen nie abtippen, immer aus _dateiliste.csv nehmen.

Erzeugen und uebernehmen
------------------------
_dateiliste.csv, _prompts.jsonl und chargen/ neu bauen:
    cd web && python3 ../tools/gen_bildprompts.py

Erzeugte Bilder pruefen, ohne etwas abzulegen:
    python3 tools/import_rezeptbilder.py <ordner> --pruefen

Uebernehmen und Stand melden:
    python3 tools/import_rezeptbilder.py <ordner>

Stand allein:
    python3 tools/import_rezeptbilder.py

Vollstaendige Planung: BILDPLAN.md im Projektstamm.
