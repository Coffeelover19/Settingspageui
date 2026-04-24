# Media UI Brief für UI-Generierung

## Kurzbeschreibung

Entwerfe für unsere Wissensmanagement-Plattform einen neuen Bereich **„Media“** als eigene Kategorie in der linken Hauptnavigation.  
Die Funktionslogik soll sich an der **Funktionsweise von Leonardo AI** orientieren, **nicht am Look**: also klare Trennung von Eingabe und Ergebnis, geführte Workflows für Bildgenerierung und Bildbearbeitung, Mehrbild-Referenzen, lokale Bildbearbeitung per Maskierung und ein separater Upscaling-Flow.

Das Ziel ist **kein verspieltes AI-Showcase**, sondern ein **modernes, ruhiges, praktisches Arbeitsinterface** innerhalb einer Wissensplattform.  
Die Oberfläche soll **lean, logisch, hochwertig und produktiv** wirken.  
Alles Wichtige soll mit **möglichst wenig Klicks** erreichbar sein.  
Spätestens im **dritten Klick** soll der Nutzer in der letzten relevanten Ebene sein.  
Die bestehende Plattformlogik soll fortgeführt werden: **Sidebar als zentraler Einstiegspunkt**, klar strukturierte Arbeitsbereiche, Vorlagen-/Template-Denke und saubere Trennung von Eingabe, Kontext und Ergebnis. :contentReference[oaicite:0]{index=0} :contentReference[oaicite:1]{index=1}

---

## Übergeordnete UX-Ziele

- Die Oberfläche soll **modern**, aber **nicht künstlich oder generisch AI-typisch** wirken.
- Sie soll **wenig Kacheln** verwenden.
- Sie soll sich wie ein **professioneller Arbeitsbereich** anfühlen, nicht wie ein Demo-Tool.
- Sie soll **visuell ruhig** sein: klare Typografie, gute Abstände, wenige Akzentfarben, wenig dekorative Elemente.
- Sie soll **rational aufgebaut** sein: Nutzer verstehen sofort, was links passiert und was rechts passiert.
- Sie soll **stabile Orientierung** bieten: keine sprunghafte UI, keine ständig wechselnden Raumlogiken.
- Sie soll **Progressive Disclosure** nutzen: Erst das Relevante zeigen, Details nur bei Bedarf.
- Sie soll **Recognition over Recall** unterstützen: klare Begriffe statt technischer KI-Sprache.
- Sie soll sich in die bestehende Plattform einfügen, in der die Navigation über die Sidebar und strukturierte Arbeitsbereiche organisiert ist. :contentReference[oaicite:2]{index=2}

---

## Grundprinzip der gesamten Media-Oberfläche

Die Media-Oberfläche folgt einer festen und immer gleichbleibenden Regel:

- **Links = Input**
- **Rechts = Output**

Diese Regel gilt für die Hauptmodi **Erstellen** und **Bearbeiten**.  
Beim **Upscaling** gilt dieselbe Denkrichtung in reduzierter Form.

Das ist ein zentrales UX-Prinzip dieser Oberfläche.  
Der Nutzer soll nie rätseln müssen, wo er etwas eingibt und wo er das Ergebnis sieht.

---

## Position in der Plattform

- In der linken globalen Sidebar gibt es einen neuen Haupteintrag: **Media**
- Klick auf **Media** öffnet im Hauptbereich den Media-Workspace
- Media ist **kein Untertool**, sondern ein vollwertiger Bereich innerhalb der Plattform
- Media soll sich in die Logik bestehender Arbeitsbereiche einfügen: klarer Einstieg, nachvollziehbare Struktur, wiederkehrende UI-Muster, Template-/Vorlagenfähigkeit :contentReference[oaicite:3]{index=3}

---

## Informationsarchitektur von Media

Der Bereich **Media** hat drei Hauptmodi:

1. **Erstellen**
2. **Bearbeiten**
3. **Upscaling**

Davon sind **Erstellen** und **Bearbeiten** die primären Arbeitsmodi.  
**Upscaling** ist eine ergänzende, eigenständige Spezialfunktion.

Die Modusauswahl soll **oben im Inhaltsbereich** oder direkt unter dem Page Header liegen, nicht als überladene Startseite mit vielen Karten.

---

## Page Header von Media

Der Kopfbereich der Seite soll sehr reduziert sein.

### Inhalt
- Titel: **Media**
- kurze Unterzeile mit 1 Satz, z. B.:
  - „Bilder erstellen, bearbeiten und verbessern.“
- direkt darunter oder rechts davon:
  - Modusauswahl: **Erstellen / Bearbeiten / Upscaling**

### Wichtig
- kein Hero-Bereich
- kein Marketingtext
- keine große bunte Introfläche
- keine Dashboard-Optik

Die Seite soll wie eine **Werkbank** wirken, nicht wie eine Landing Page.

---

# Modus 1: Erstellen

## Ziel des Modus

Im Modus **Erstellen** erzeugt der Nutzer neue Bilder auf Basis von:

- Textprompt
- bis zu **10 hochgeladenen Bildern**
- optionalen Referenzen / Guidance
- optionalen Presets / Vorlagen / Blueprints
- Format- und Qualitätsparametern

Die Logik ist hier ähnlich wie bei Leonardo AI in der **Funktionsweise**:
- Nutzer gibt Prompt + Bildreferenzen + Steuerparameter ein
- das System verarbeitet daraus neue Ergebnisse
- Referenzbilder sind echte Eingaben, keine bloßen Anhänge

---

## Layout im Modus Erstellen

### Linke Seite = Input
Die linke Seite ist das Eingabepanel.

### Rechte Seite = Output
Die rechte Seite zeigt:
- aktuelle Ergebnisse
- Varianten
- große Bildvorschau
- Folgeaktionen

---

## Struktur der linken Seite im Modus Erstellen

Die linke Seite soll vertikal, ruhig und logisch aufgebaut sein.

### Reihenfolge der Bereiche

1. **Prompt**
2. **Bilder hinzufügen**
3. **Referenz-/Bildlogik**
4. **Preset / Stil / Vorlage**
5. **Format / Ausgabeparameter**
6. **Generate CTA**
7. **Erweiterte Einstellungen**

---

## Bereich: Prompt

Der Prompt ist der semantische Hauptanker.

### Anforderungen
- großes, klares Eingabefeld
- gute Lesbarkeit
- genug Höhe für längere Beschreibungen
- nicht miniaturhaft
- direkte Nähe zu den Referenzbildern

### Ziel
Der Prompt beschreibt:
- Absicht
- Szene
- gewünschtes Ergebnis
- Kontext der Referenzbilder

---

## Bereich: Bilder hinzufügen

Im Modus **Erstellen** müssen bis zu **10 Bilder** hochgeladen werden können.

### UX-Anforderungen
- klarer Uploadbereich mit Drag & Drop
- Button zum Dateiauswählen
- deutlich sichtbarer Hinweis: **max. 10 Bilder**
- Bilder erscheinen danach als **kompakte Vorschau-Thumbnails**
- keine riesigen Cards
- keine unruhige Galerieoptik

### Verhalten
- Bilder können entfernt werden
- Bilder können ersetzt werden
- Reihenfolge sollte änderbar sein
- Anzahl der aktuell geladenen Bilder soll klar sichtbar sein

### Wichtig
Diese Bildvorschauen sind kein dekorativer Bereich, sondern ein funktionaler Teil der Eingabe.

---

## Bereich: Referenz-/Bildlogik

Da die Bild-Inputs mehr als normale Uploads sind, soll es einen optionalen Bereich geben, in dem die Verwendungslogik der Bilder gesteuert werden kann.

### Dieser Bereich soll standardmäßig simpel sein
Zunächst nur:
- „Referenzbilder verwenden“

### Optional erweiterbar
Falls geöffnet:
- Stil-Referenz
- Charakter-Referenz
- Inhalts-/Kompositions-Referenz

### Wichtig
Das ist **Funktionslogik wie bei Leonardo AI**, aber reduziert und sauber eingebettet.  
Nicht als dominantes Feature oben auf der Seite, sondern als sinnvoller Teil des Erstellen-Flows.

---

## Bereich: Preset / Stil / Vorlage

Der Nutzer soll zwischen zwei Arten des Starts wählen können:

- **Freie Erstellung**
- **Mit Vorlage starten**

### Ziel
Vorlagen / Blueprints sollen wie strukturierte Workflows funktionieren, nicht wie dekorative Template-Galerien.

### UX-Empfehlung
- kein großer Card-Marktplatz
- lieber kompakte Liste oder geordnetes Auswahlpanel
- Templates werden als nützliche Startpunkte verstanden, nicht als laute Oberfläche

---

## Bereich: Format / Ausgabeparameter

Dieser Block enthält nur die wichtigsten, produktionsnahen Parameter.

### Sichtbar standardmäßig
- Seitenverhältnis
- Qualitätsstufe
- Anzahl der Ergebnisse
- ggf. Stil / Modus

### Versteckt unter erweitert
- technische Feineinstellungen
- Seed
- Negative Prompt
- weitere Spezialparameter

---

## Bereich: Generate CTA

Die primäre Aktion soll klar und ruhig platziert sein.

### Anforderungen
- klarer Hauptbutton
- optisch dominant, aber nicht übertrieben
- immer am Ende der Inputkette
- Nutzer versteht: hier wird die Eingabe in Output überführt

---

## Rechte Seite im Modus Erstellen

Die rechte Seite ist die Ergebnisfläche.

### Inhalt
- großes Hauptbild oder Haupt-Preview
- Varianten daneben oder darunter
- Platz für Folgeaktionen

### Wichtig
Die rechte Seite ist kein Metadatenfriedhof.  
Sie ist visuell für Bilder da.

### Sekundär möglich
- kleine Prompt-Zusammenfassung
- Hinweise zu Preset / Vorlage
- einfache Aktionen:
  - weiter bearbeiten
  - upscalen
  - erneut generieren

---

# Modus 2: Bearbeiten

## Ziel des Modus

Der Bearbeiten-Modus ist **kein klassischer Single-Image-Editor**, sondern ein hybrider Bildbearbeitungs-Flow mit einem großen Hauptbild und zusätzlichen Quellbildern.

Der Nutzer bearbeitet ein vorhandenes Bild auf zwei Arten:

1. **Nur mit Text**
2. **Mit Bereichsauswahl / Maskierung**

---

## Zentrale Funktionslogik von Bearbeiten

Es gibt immer:

- **ein großes Hauptbild**, das bearbeitet werden soll
- **kleinere Zusatzbilder**, aus denen visuelle Informationen entnommen werden können
- einen Prompt zur Änderungsbeschreibung
- optional eine lokale Bereichsauswahl

Das Hauptbild ist visuell dominant.  
Die Zusatzbilder sind klar als **Quellbilder** erkennbar.

---

## Layout im Modus Bearbeiten

### Linke Seite = Input
Die linke Seite enthält:
- Bearbeitungsmodus
- Hauptbild
- Zusatzbilder
- Prompt
- ggf. Maskierungstools

### Rechte Seite = Output
Die rechte Seite zeigt:
- bearbeitete Varianten
- Ergebnisvorschau
- Vergleich zum letzten Zustand

---

## Wichtigste Layoutregel im Bearbeiten-Modus

Obwohl links der Input liegt, soll das **große Hauptbild** innerhalb des linken Bereichs sehr prominent dargestellt werden.

### Warum?
Weil das zu bearbeitende Bild der zentrale Gegenstand der Bearbeitung ist.  
Es ist nicht Ergebnis, sondern Teil der Eingabe.

---

## Struktur der linken Seite im Modus Bearbeiten

### Reihenfolge

1. **Bearbeitungsmodus wählen**
2. **Hauptbild laden**
3. **Zusatzbilder laden**
4. **optional Maskierung**
5. **Prompt**
6. **Anwenden CTA**

---

## Bereich: Bearbeitungsmodus wählen

Ganz oben im linken Bereich gibt es einen klaren Umschalter:

- **Nur mit Text**
- **Mit Bereichsauswahl**

### Ziel
Der Nutzer soll sofort verstehen, welche Art der Bearbeitung aktiv ist.

### Wichtig
Keine technische KI-Sprache verwenden.  
Nicht „Global Edit“ und „Localized Inpainting“.  
Die Begriffe müssen direkt verständlich sein.

---

## Bereich: Hauptbild

Das Hauptbild ist groß und dominant.

### Anforderungen
- große Bildfläche
- klare Rahmung
- genügend Platz zum Arbeiten
- im Maskierungsmodus mit Maskenoverlay nutzbar

---

## Bereich: Zusatzbilder

Die Zusatzbilder sind kleiner als das Hauptbild und stehen **daneben**, nicht weit entfernt.

### Empfohlene Anordnung
- großes Hauptbild links innerhalb des Inputbereichs
- direkt daneben eine schmale vertikale Spalte mit kleinen Zusatzbildern

### Warum diese Anordnung
So versteht der Nutzer sofort:
- das ist mein Ausgangsbild
- das sind die Bilder, aus denen etwas übernommen wird

---

## Regeln für Zusatzbilder im Bearbeiten-Modus

### Wenn „Nur mit Text“ aktiv ist:
- bis zu **4 Zusatzbilder**

### Wenn „Mit Bereichsauswahl“ aktiv ist:
- maximal **2 Zusatzbilder**

### Bedeutung
- Textbasierte Bearbeitung darf breiter inspiriert werden
- Maskierte Bearbeitung bleibt bewusst fokussierter und kontrollierter

---

## Bereich: Prompt im Bearbeiten-Modus

Der Prompt soll **nah am Bild** sein.

### Platzierung
- unter dem Hauptbild
- oder unter der gesamten Bildgruppe

### Ziel
Die Bearbeitungsanweisung entsteht aus dem direkten Blick auf das Bild.  
Die Eingabe darf deshalb nicht weit vom Bildbereich entfernt sein.

### Inhalt des Prompts
- was geändert werden soll
- was eingefügt werden soll
- was ersetzt werden soll
- welche Eigenschaften aus den Zusatzbildern übernommen werden sollen

---

## Modus „Nur mit Text“

Dies ist der schnellere Bearbeitungsflow.

### Eigenschaften
- kein Maskierungswerkzeug sichtbar
- Hauptbild + bis zu 4 Zusatzbilder
- Bearbeitung rein über Prompt
- sinnvoll für globale oder semantische Anpassungen

### UX-Ziel
Schnell, direkt, wenig Reibung.

---

## Modus „Mit Bereichsauswahl“

Dies ist der präzisere Bearbeitungsflow.

### Eigenschaften
- Maskierungswerkzeug aktiv
- Hauptbild + maximal 2 Zusatzbilder
- Prompt bezieht sich auf den markierten Bereich
- geeignet für lokales Einfügen, Ersetzen oder gezielte Änderungen

### UX-Ziel
Maximale Kontrolle bei lokalem Editieren.

---

## Bereich: Maskierung

Maskierung ist keine eigene Hauptnavigation, sondern eine **präzise Variante innerhalb von Bearbeiten**.

### Sichtbar nur wenn „Mit Bereichsauswahl“ aktiv ist

### Werkzeuge
- Bereich markieren
- Maske löschen
- ggf. invertieren
- ggf. weichzeichnen / soften

### Wichtig
Diese Werkzeuge sollen nur erscheinen, wenn relevant.  
Nicht dauerhaft sichtbar.

---

## Rechte Seite im Modus Bearbeiten

Die rechte Seite zeigt den Output der Bearbeitung.

### Inhalt
- große Ergebnisvorschau
- Varianten
- optional vorher / nachher
- Folgeaktionen

### Ziel
Der Nutzer sieht rechts sofort, wie sich seine Bearbeitung auswirkt.

### Sekundär möglich
- Versionen
- letzte Iteration
- einfache Übernahmeaktion

---

# Modus 3: Upscaling

## Ziel des Modus

Upscaling ist ein **eigener Nachbearbeitungs-Flow**.  
Nicht Teil des Erstellen-Modus, nicht Teil des Bearbeiten-Modus.

Die Funktionsweise orientiert sich an Leonardo AI:
- bestehendes Bild wählen
- Qualität / Auflösung verbessern
- optional per Prompt beeinflussen
- Vorher/Nachher vergleichen

---

## Layout im Modus Upscaling

Auch hier gilt die Grundlogik:

- **Links = Input**
- **Rechts = Output**

### Links
- Bild wählen / hochladen
- Upscaling-Parameter
- CTA

### Rechts
- Vorher/Nachher-Vergleich
- Ergebnis
- Varianten oder Exportoptionen

---

## Struktur der linken Seite im Upscaling-Modus

### Reihenfolge
1. Bild auswählen
2. Upscaling-Stufe
3. Stil / Stärke
4. optional Fokus-Prompt
5. Upscale CTA
6. erweiterte Optionen

### Wichtig
Dieser Modus soll schlanker sein als Erstellen und Bearbeiten.

---

## Rechte Seite im Upscaling-Modus

### Inhalt
- großer Vorher/Nachher-Bereich
- Vergleich per Slider oder klar getrennte Preview
- Fokus auf sichtbar verbesserter Qualität

### Ziel
Der Nutzen muss sofort erfassbar sein.

---

# Klicktiefe und Navigation

## Regel
Spätestens im **dritten Klick** muss der Nutzer in der letzten sinnvollen Ebene sein.

### Gewünschte Ebenen
1. Klick: **Media**
2. Klick: **Erstellen / Bearbeiten / Upscaling**
3. Klick: **Detailmodus / Bereichsauswahl / Vorlage / Guidance / Advanced**

### Wichtig
Es soll keine tiefe Verschachtelung geben.  
Keine langen Untermenüs.  
Keine unendlichen Flyouts.

---

# Visuelle Richtung

## Allgemeiner Stil

Die Oberfläche soll:

- modern
- hochwertig
- ruhig
- minimal
- professionell

wirken.

## Vermeiden
- zu viele Cards
- bunte Kachelwände
- verspielte AI-Optik
- zu viele Badges
- Neon / Glows / übertriebene Effekte
- generische Dribbble-Ästhetik

## Stattdessen einsetzen
- klare Typografie
- gute Abstände
- ruhige Flächen
- wenige visuelle Muster
- eine saubere Akzentfarbe
- klare Hierarchie
- gut lesbare Labels

---

# Psychologische UX-Prinzipien, die die Oberfläche einhalten soll

## 1. Recognition over Recall
Nutzer sollen Optionen erkennen, nicht technische Begriffe entschlüsseln müssen.

## 2. Progressive Disclosure
Nur das zeigen, was im aktuellen Modus relevant ist.

## 3. Spatial Stability
Die Raumlogik bleibt stabil:
- links Input
- rechts Output

## 4. Perceived Control
Besonders im Bearbeiten-Modus muss der Nutzer das Gefühl haben:
- ich weiß, was ich ändere
- ich ändere gezielt
- nichts passiert zufällig

## 5. Niedrige kognitive Last
Keine gleichzeitige Anzeige aller Spezialfeatures.

## 6. Klare Priorisierung
Erstellen und Bearbeiten sind die Hauptmodi.  
Upscaling ist ergänzend.

---

# Was die UI nicht sein soll

- keine Leonardo-Kopie im Look
- kein AI-Spielzeug
- keine Template-Landingpage mit vielen bunten Karten
- kein überladenes Studio mit 20 offenen Panels
- kein generisches „alles auf einmal“-Interface

---

# Was die UI sein soll

Ein **ruhiger, moderner, produktiver Media-Workspace** innerhalb einer Wissensmanagement-Plattform, mit:

- klarer linker Eingabeseite
- klarer rechter Ergebnisseite
- starkem Erstellen-Modus mit bis zu 10 Referenzbildern
- starkem Bearbeiten-Modus mit großem Hauptbild und kleineren Quellenbildern
- zwei klaren Bearbeitungsvarianten:
  - nur mit Text
  - mit Bereichsauswahl
- separatem Upscaling-Flow
- logischer Klicktiefe
- hoher Kontrolle
- geringer visueller Lautstärke
- professionellem, nicht künstlich wirkendem Gesamtgefühl