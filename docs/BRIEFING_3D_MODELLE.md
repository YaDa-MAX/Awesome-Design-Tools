# Briefing — fotorealistische 3D-Modelle für HeiBen Wohnen

Dieses Dokument richtet sich an eine 3D-Gestalterin oder einen 3D-Gestalter und beschreibt, in welcher Form die Möbelmodelle zu liefern sind, damit sie ohne Nacharbeit in den bestehenden Konfigurator passen. Die technische Aufnahme der Modelle ist in der Software bereits vorbereitet; geliefert werden müssen ausschließlich die Modelldateien nach den folgenden Vorgaben.

## Dateiformat

Jedes Möbelstück ist als einzelne Datei im Format GLB zu liefern, also der binären, in sich geschlossenen Variante von glTF, bei der Geometrie, Materialien und Texturen in einer Datei stecken. Die Materialien sind im physikalisch basierten Verfahren anzulegen, dem heutigen Industriestandard, wie ihn Blender, Unreal und Unity verwenden. Wo es das Werkzeug zulässt, ist die Geometrie mit Draco zu komprimieren, um die Dateigröße gering zu halten.

## Größe und Geschwindigkeit

Da die Modelle im Browser und auf Mobilgeräten geladen werden, zählt schlanke Geometrie mehr als maximale Detailtreue. Als Richtwert sollte eine Datei inklusive Texturen unter etwa fünfzehn Megabyte bleiben, für mobile Nutzung idealerweise unter acht. Es ist mittlere Polygondichte anzustreben — fein genug, dass Stoffstruktur und Holzmaserung klar erkennbar sind, aber sparsam genug, dass das Modell auf einem Mobilgerät in ein bis zwei Sekunden lädt. Texturen sind, wo möglich, als komprimierte Bilder mit Kantenlängen bis etwa zweitausend Pixeln anzulegen.

## Maße und Ausrichtung

Jedes Modell ist in realistischen Maßen in Metern zu modellieren und so auszurichten, dass es mit der Unterseite auf der Bodenebene steht, also bei der Höhe null beginnt, und in der Grundfläche mittig zum Ursprung zentriert ist. Die Blickrichtung nach vorn ist einheitlich zu halten. Die Software passt die Größe beim Laden zwar an die hinterlegte Stellfläche an, doch je näher das Modell schon an den realen Maßen liegt, desto besser das Ergebnis. Die maßgeblichen Stellflächen und Standardmaße je Möbelstück liefert HeiBen aus dem Konfigurator als begleitende Liste mit.

## Farb- und Materialvarianten

Der Konfigurator erlaubt es, an jedem Stück die Hauptfläche umzufärben — etwa den Bezugsstoff eines Sofas oder das Holz eines Tisches. Damit das auch bei den echten Modellen funktioniert, sind die umfärbbaren Flächen eindeutig zu kennzeichnen, indem das betreffende Material oder Netz im Namen das Wort „primary" trägt. Flächen, die ihre feste Farbe behalten sollen, etwa Holzbeine unter einem Stoffsofa, bleiben davon unberührt. Wo das Werkzeug es unterstützt, ist alternativ die glTF-Erweiterung für Materialvarianten zu verwenden, die mehrere Ausführungen in einer Datei hinterlegt, ohne das Modell zu vervielfältigen.

## Benennung der Dateien

Die Dateien sind nach einem einfachen, einheitlichen Schema zu benennen, das den Inhalt erkennbar macht, etwa „sofa-veedel.glb" oder „esstisch-tafel.glb" — also kleingeschrieben, ohne Umlaute und Leerzeichen, mit Bindestrichen getrennt. Diese Namen trägt HeiBen anschließend in der Verwaltung beim jeweiligen Produkt in das vorgesehene Feld ein, woraufhin das echte Modell automatisch erscheint.

## Empfohlene Reihenfolge

Es empfiehlt sich, mit zwei oder drei repräsentativen Stücken zu beginnen — etwa dem Sofa und dem Esstisch —, sie vollständig nach diesen Vorgaben zu liefern und im Konfigurator zu prüfen, bevor das ganze Sortiment umgesetzt wird. So lässt sich an einem kleinen Satz klären, ob Aussehen, Maßstab, Farbumschaltung und Ladegeschwindigkeit den Erwartungen entsprechen.

## Was HeiBen beisteuert

HeiBen liefert je Möbelstück die gewünschten Maße und die Stellfläche, die zugehörige Materialgruppe — also ob es sich um ein Stoff-, Holz- oder Metallstück handelt — sowie auf Wunsch Referenzfotos oder die prozeduralen Platzhalter aus dem Konfigurator als Anhaltspunkt für Form und Proportion.
