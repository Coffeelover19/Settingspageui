Überarbeitete Zieldokumentation für den UI-Designer
Kolai Settings / Admin Panel im Langdock-inspirierten Overlay-Sidebar-Modell
1. Zielbild

Die Settings von Kolai sollen künftig nicht mehr als Hauptfläche mit Tabs innerhalb der bestehenden App-Navigation gebaut werden, sondern als eigener Settings-Modus.

Beim Klick auf das Zahnrad passiert Folgendes:

die bisherige linke Kolai-Navigation wird visuell ersetzt / überlagert
links erscheint eine neue Settings-Sidebar
rechts daneben erscheint die Settings-Arbeitsfläche
die horizontale Reiterlogik entfällt als primäre Navigation vollständig
die gesamte Experience soll sich wie ein eigenständiger Admin-/Settings-Bereich innerhalb derselben App anfühlen

Das alte Grundmodell war „persistente Kolai-Sidebar + Settings-Content + horizontale Tabs“. Dieses Modell wird jetzt bewusst verlassen.

Designziel in einem Satz

Kolai Settings sollen wie ein ruhiger, hochwertiger, professioneller Admin-Modus mit eigener linker Navigationsleiste wirken, der die normale App-Navigation temporär ersetzt und alle vorhandenen Settings in einer skalierbaren vertikalen Struktur organisiert.

2. Was sich gegenüber der alten Dokumentation ändert

Die alte Dokumentation war logisch sauber für ein Tab-System, aber für das neue Zielbild zu flach. Sie ging von sieben gleichrangigen Reitern aus: User Profile, Org Management, SMB Config, Monitoring, Billing, Permissions und Feature Gating.

Für das neue Zielbild ändern sich drei Dinge:

Erstens: Navigation

Vorher:

horizontale Reiter oben
bestehende App-Sidebar bleibt sichtbar

Neu:

keine primäre Top-Tab-Leiste mehr
linke Settings-Sidebar ist die Hauptnavigation
App-Sidebar wird im Settings-Modus überdeckt
Zweitens: Inhaltsstruktur

Vorher:

7 Reiter auf derselben Ebene

Neu:

7 Seiten bleiben inhaltlich erhalten
sie werden aber in einer neuen vertikalen Reihenfolge und Gruppierungslogik organisiert
Drittens: Scope-Bereinigung

Aus dem zuvor vorgeschlagenen erweiterten Modell werden Dinge entfernt, die ihr derzeit nicht braucht:

Sicherheit
Erste Schritte
Darstellung / Branding
Onboarding
Konnektoren als eigener Navigationspunkt
3. Final empfohlene Navigationsstruktur
Linke Settings-Sidebar

Die neue Sidebar soll schmal, ruhig, klar gegliedert und stark scanbar sein.
Nicht zu viele Gruppen, nicht zu viele Unterebenen.

Finale Struktur

Persönlich

User Profile

Organisation

Org Management
Billing

System

SMB Config
Monitoring

Zugriff

Permissions
Feature Gating

Das ist bewusst kompakter als mein vorheriger Vorschlag und bleibt nah an euren real vorhandenen Inhalten. Es übernimmt das Sidebar-Prinzip, ohne künstlich neue Navigationspunkte zu erfinden.

4. Warum genau diese Gruppierung sinnvoll ist
Persönlich

User Profile ist klar der persönliche Bereich. Die bestehende Spezifikation sagt ausdrücklich, dass sich dieser Bereich nicht technisch, nicht administrativ und nicht überladen anfühlen soll und persönliche Informationen, Präferenzen und Profilbild bündelt.

Organisation

Org Management und Billing gehören zusammen, weil beide den deploymentweiten Rahmen definieren:

Org Management setzt Allowed Sets und Limits für Modelle und Prompt-Standards.
Billing zeigt Subscription-, Lizenz- und Kostenlogik, aber bewusst lesend und ohne operative Rechteverwaltung.
System

SMB Config und Monitoring gehören zusammen, weil sie am ehesten den Charakter „Betrieb / Systemsteuerung / technische Administration“ haben:

SMB Config ist ein klar technischer Utility-Screen mit Tree, Regeln und Statuslogik.
Monitoring ist ein managementorientiertes Betriebs- und Nutzungsdashboard mit Pipelines, Health und Warnungen.
Zugriff

Permissions und Feature Gating müssen nebeneinander stehen, aber klar getrennt bleiben:

Permissions beantwortet: Was darf ein User oder eine Gruppe tun? inklusive Lizenzzuweisung.
Feature Gating beantwortet: Sieht der User das Feature überhaupt?

Diese Trennung ist fachlich zentral und muss im UI sichtbar bleiben.

5. Neue Seitenreihenfolge in der Sidebar

Ich würde die finale Reihenfolge so bauen:

User Profile
Org Management
Billing
SMB Config
Monitoring
Permissions
Feature Gating
Begründung

Diese Reihenfolge folgt weiterhin eurer alten Logik „von persönlich zu organisatorisch zu operativ“, nur jetzt eben in einer Sidebar statt in Tabs. Die alte Dokumentation begründet die Reihenfolge genau so: zuerst persönlicher Bereich, dann Organisationsrahmen, dann Systemkonfiguration, dann Betrieb/KPIs, dann Governance/Access.

6. Gesamtlayout der neuen Settings-Ansicht
6.1 Shell-Struktur
Links

Die neue Settings-Sidebar.

Rechts

Die Content-Area der jeweils aktiven Seite.

Kein zusätzlicher Top-Tab-Bereich

Die alte horizontale Reiterleiste entfällt. Stattdessen gibt es pro Seite nur noch:

Seitentitel
Untertitel / Beschreibung
optionale Summary-Zeile
Hauptinhalt

Das passt auch zu eurem alten einheitlichen Seitenmuster: Header, Summary, Hauptinhalt, Save-Logik. Dieses Muster bleibt erhalten, nur die Top-Navigation ändert sich.

6.2 Empfohlene Breiten
Settings-Sidebar

ca. 248–280 px

Content-Area

fluid, aber mit sinnvoller Maximalbreite von ca. 1280–1360 px für große Screens. Diese Größenordnung war bereits für die alte Settings-Fläche empfohlen und kann beibehalten werden.

6.3 Header-Muster jeder Seite

Jede Seite folgt diesem Muster:

1. Page Header
Titel
1 Satz Beschreibung
2. Optionaler Top Block
kurze KPI-Zusammenfassung
Meta-Info
Status
Save-Indikator
3. Hauptinhalt
Cards
Panels
Split-Layout
Tabellen nur dort, wo wirklich nötig
4. Save-Logik
sofort speichern bei kleinen Präferenzen
Save-Bar bei komplexeren Änderungen

Genau dieses Muster war bereits in der alten Settings-Seitenlogik definiert und sollte erhalten bleiben.

7. Sidebar-Design im Detail
7.1 Charakter

Die Sidebar soll:

ruhig
administrativ
hochwertig
nicht zu verspielt
sehr scanbar

Die alte Designrichtung bleibt gültig: professionell, modern, klar, ruhig, mit kontrolliertem White Space und subtilen Oberflächen.

7.2 Aufbau

Oben:

Zurück zur App
optional kleines Settings-Label
optional Workspace-/Deployment-Name

Darunter:

vertikale Navigationsliste
Gruppentitel in kleiner, ruhiger Typografie
darunter die Items

Unten:

optional kleiner Footer-Bereich mit Versionshinweis oder Deployment-Meta
keine zweite Navigationswelt dort eröffnen
7.3 Zustände

Pro Nav-Item:

default
hover
active
disabled
optional attention state bei Fehlern / Warnungen / ungespeicherten Änderungen
Active State

Der aktive Eintrag sollte:

klar markiert
leicht gefüllt
weich gerundet
deutlich, aber nicht aggressiv sein
8. Visuelle Gesamtstilistik

Die Stilprinzipien aus der alten Dokumentation können fast vollständig bleiben:

Hauptaußenabstände 24–32 px
Card Padding 24 px
große Abschnittsabstände 32 px
Controls innerhalb Cards 12–16 px
Radius ca. 16 px
sehr subtile Borders
weiche, niedrige Shadows
Soft-Glass nur sparsam bei Headern, Summary-Flächen, Drawern und Modals
nicht bei dichten Formularen, Permissions oder SMB Tree.
Light Mode
sehr helles Grau als Fläche
weiße bis minimal getönte Cards
dunkles Grau statt hartes Schwarz
Kolai-Blau als Primärakzent
Dark Mode
tiefes Anthrazit
Cards leicht heller
feine Borders
nicht einfach invertiert, sondern gleichwertig hochwertig
9. Detaildokumentation pro Seite
9.1 User Profile
Rolle der Seite

User Profile ist der persönliche Bereich des Users.
Er soll nicht technisch, nicht administrativ und nicht überladen wirken. Er dient dazu, persönliche Informationen einzusehen, Präferenzen zu verwalten und das Profilbild zu steuern.

Seitenaufbau
Abschnitt A — Persönliche Informationen

Read-only Info-Card mit:

Vorname
Nachname
Username / Anzeigename
E-Mail
interne User ID
Microsoft AD-ID

Die Spezifikation empfiehlt ausdrücklich eine read-only Info-Card statt großer Edit-Form und einen Hinweis, dass manche Felder aus Microsoft Active Directory übernommen werden und hier nicht änderbar sind.

Abschnitt B — Persönliche Präferenzen

Enthält:

Sprache
Modellpräferenzen
Sprache
bei wenigen Sprachen als Segmented Control
aktuell empfohlen: Deutsch | English
direkt speicherbar
Modellpräferenzen

Der Modellbereich bleibt wie dokumentiert und ist wichtig:

Standardmodell
Modellfamilien
Einzelmodelle

Wichtig ist die Abhängigkeit:

Dropdown 1 = Modellfamilien
Dropdown 2 = Einzelmodelle
Einzelmodelle werden durch Modellfamilien gefiltert
Standardmodell darf nur aus den ausgewählten Einzelmodellen stammen.
Abschnitt C — Profilbild
großer Avatar Preview
Status: aus Microsoft-Profil / kein Microsoft-Profilbild / eigenes Bild
Upload / Ersetzen / Entfernen / Zurücksetzen.
Save-Logik
Sprache: direkt speichern
Profilbild: direkt speichern
Modellpräferenzen: Save-Bar oder Card-Footer mit Speichern / Verwerfen.
UI-Gefühl
freundlich
ruhig
wenig visuelle Komplexität
Cards statt Tabellen
kein Admin-Konsole-Gefühl.
9.2 Org Management
Rolle der Seite

Org Management definiert den organisationsweiten Rahmen.
Was hier erlaubt ist, darf in User Settings auftauchen; was hier nicht freigegeben ist, darf dort nicht auswählbar sein. User Settings sind also immer nur ein Subset der Organisationsvorgaben.

Scope

Die Seite bleibt bewusst klein und enthält nur:

Model Policies
Prompt Standards.
Seitenaufbau
Abschnitt A — Model Policies

Multi-Select für Modellfamilien
Multi-Select für Einzelmodelle

Regeln:

Einzelmodelle hängen von den gewählten Familien ab
beim Entfernen einer Familie verschwinden deren Modelle aus der Auswahl
im User Profile dürfen nur die hier freigegebenen Familien und Modelle erscheinen.
Abschnitt B — Prompt Standards

Aktuell nur:

maximale Anzahl Labels pro Prompt-Vorlage als Number Input / Stepper
kurzer Hilfetext, dass diese Begrenzung deploymentweit gilt.
UI-Gefühl
strategisch
rahmensetzend
reduziert
keine Tabellenwüste
keine User-Verwaltung
keine Permissions
keine Feature-Gates.
9.3 Billing
Rolle der Seite

Billing ist ein lesender Subscription- und Cost-Overview-Bereich für Admins und Owners.
Er beantwortet:

welches Setup / welche Vertragslogik gilt
welche Pakete aktiv sind
wie viele Lizenzen gekauft, vergeben, frei sind
welche Inklusivkontingente gelten
welche zusätzlichen monatlichen Kosten anfallen.

Billing ist explizit nicht:

Rechnungsarchiv
Zahlungsabwicklung
Vertragsänderung im UI
operative Lizenzverwaltung im Detail.
Seitenaufbau
Abschnitt A — Subscription Summary

KPI-Reihe mit:

Deployment-Typ
Abrechnungsmodell
aktive Pakete
gebuchte Lizenzen
vergebene Lizenzen
Zusatzkosten aktueller Monat.
Abschnitt B — Vertragslogik

Read-only Card mit:

Deployment-Typ
Kostenlogik
Abrechnungszeitraum
Datenquelle / letzter Sync optional

Wichtig: Billing soll config-getrieben angezeigt werden, nicht hartcodiert.

Abschnitt C — Pakete & Module

List Rows oder Cards mit:

Paketname
Status
Preislogik
Kurzbeschreibung
optionale Details.
Abschnitt D — Lizenzen
gebucht
vergeben
frei
optional AD-User gesamt
Belegungsbalken
read-only Preview lizenzierter Nutzer
CTA in Permissions / Access.
Abschnitt E — Inklusivkontingente

Prominent mit Progress Bars:

Tokens
Document Intelligence
weitere deploymentabhängige Kontingente.
Abschnitt F — Zusätzliche monatliche Kosten
Gesamtsumme
Breakdown nach Kostenarten
keine Rechnungsoptik.
Zeitraum

Oben rechts:

Aktueller Monat
Letzter Monat.
UI-Gefühl
kaufmännisch ruhig
scanbar
keine operative Access-Maske
keine Finanzbuchhaltungs-Optik
9.4 SMB Config
Rolle der Seite

SMB Config ist ein technischer Verwaltungsbildschirm für Include/Exclude-Regeln auf Dateisystempfaden. Fokus ist Konfiguration und Nachvollziehbarkeit, nicht Dateioperationen. Es gibt explizit keine Umbenennen-/Löschen-/Upload-/Download-Logik.

Seitenaufbau
Zone A — Tree Panel links
lazy geladener Ordnerbaum
Expand/Collapse
pro Node: Name, Statusindikator, Include/Exclude-Aktionen.
Zone B — Kontext-/Scope-Controls oben
Kontext auswählen
optional Jump-to-path
optional Show only configured paths.
Zone C — Rules / Selected Paths rechts

Source of Truth mit:

Include/Exclude
Pfad
Scope
Entfernen/Deaktivieren.
Footer / Sticky Bar
Unsaved changes
Review changes
Apply/Save
Discard.
Interaktionslogik

Pro Pfad:

Include subtree
Exclude subtree
optional Clear explicit rule

Wichtig:

Klick setzt zunächst nur Pending State
erst Review und Save übernehmen die Änderung.
Statuslogik

Regelmodell:

Rules statt dauerhafter Node-Markierung
deepest wins
effectiveState basiert auf spezifischster passenden Regel
Partial-Zustände bei Eltern mit abweichenden Kindern.
Visuelle Logik
vertikale Status-Leiste am Node
grün = included
rot = excluded
gemischt = partial
grau = neutral
kleine Icons
Actions sichtbar, nicht tief versteckt.
UI-Gefühl
technischer
sachlich
robust
weniger soft als andere Seiten
9.5 Monitoring
Rolle der Seite

Monitoring ist ein managementorientiertes Betriebs- und Nutzungsdashboard. Es soll nicht wie eine reine DevOps-Konsole wirken, sondern Produktnutzung, Pipelines, System Health, Warnungen und Feedback sichtbar machen.

Seitenstruktur

Die Spezifikation empfiehlt fünf Hauptbereiche:

Executive Summary
Produktnutzung
Pipelines & Datenverarbeitung
System Health & Warnungen
Feedback & Qualitätsindikatoren.
Zeitlogik

Oben rechts:

Heute
Letzte 7 Tage
Aktueller Monat
Letzter Monat
Letzte 3 Monate.
Detailaufbau
Abschnitt A — Executive Summary

Top KPIs:

aktive Nutzer
Chats
Dokumente analysiert
Dokumente offen
Systemstatus
offene Warnungen
neues Feedback
offene Feedback-Fälle.
Abschnitt B — Produktnutzung

Cluster:

User Activity
Chat Activity
Feature Adoption.
Abschnitt C — Pipelines & Datenverarbeitung
Dokumentenpipeline
Kontext-/Quellen-Pipeline
Status der Datenquellen
Rückstau / Fehler / Importprobleme.
Abschnitt D — System Health & Warnungen
Overall Health
offene Warnungen
letzte Incidents
Fehlstatus in Pipelines.
Abschnitt E — Feedback & Qualität
neues Feedback
offenes Feedback
geschlossene Fälle
qualitative Signale.
Visualisierung
Liniencharts für Verläufe
horizontale Balken für Vergleiche
Donuts nur sparsam
Event-/Statuslisten für Warnungen.
Wichtige Anpassung an deinen Scope

Da du Konnektoren als eigenen Navigationspunkt rausnehmen willst, tauchen sie hier nicht mehr als eigener Hauptbereich der Navigation auf. Falls Datenquellenstatus später im Monitoring angezeigt wird, dann nur als Teil des Pipelines-/Health-Bereichs, nicht als eigener Menüpunkt.

9.6 Permissions
Rolle der Seite

Permissions ist der operative Rechte- und Entitlements-Bildschirm.
Er beantwortet:

was ein User oder eine Gruppe innerhalb sichtbarer Funktionen tun darf
welche User überhaupt eine Lizenz haben.
Grundprinzip

Permissions soll keine Checkbox-Wüste sein. Die Seite ist aufgebaut aus:

Subjekt
Lizenzstatus
kategorisierte Rechte
effektive Rechteauflösung.
Neue wichtige Anpassung

In den alten Clustern wurden „Projekte & Kontexte“ zusammen genannt. Für die neue IA sollen sie getrennt werden.

Also neu:
Chat & Collaboration
Projekte
Kontexte
Prompt Assets
Admin-nahe Rechte

Das ist inhaltlich sauberer und passt auch besser zu deiner Vorgabe, dass Kontexte getrennt von Projekten geführt werden sollen. Die alte Permissions-Logik behandelt beide bereits als eigene Ressourcen; ich ziehe das jetzt bis in die UI-Struktur durch.

Seitenaufbau
Linke Spalte — Subjekt-Auswahl
Switch Users / Groups
Suche
Filter
Liste mit AD-/lokal-Badges.
Oberer Hauptblock — Licenses & Entitlements
gebucht
vergeben
frei
User-Liste zur Lizenzzuweisung
Hinweis bei fehlenden freien Lizenzen.
Mittlerer Hauptblock — Permission-Bereiche

Jede Kategorie als Card oder Accordion.

A — Chat & Collaboration
Chat nutzen
Group Chats nutzen
Chat-Historie sehen
Prompts teilen
Feedback senden.
B — Projekte
Projekte sehen
Projekte erstellen
Projekte bearbeiten
Projekte teilen
Projektverwaltung
C — Kontexte
Kontexte sehen
Kontexte auswählen
Kontexte erweitern
Kontexte teilen
Kontext-Freigaben verwalten
später: Zugriff auf bestimmte Kontexte / Kontexttypen. Die alte Spezifikation bereitet genau diese spätere Skalierung bereits vor.
D — Prompt Assets
Prompt-Vorlagen sehen
Prompt-Vorlagen erstellen
Prompt-Vorlagen teilen
Prompt-Vorlagen administrieren.
E — Admin-nahe Rechte
User verwalten
Gruppen verwalten
Permissions verwalten
Billing sehen
Monitoring sehen.
Rechtezustände
Inherited
Allow
Deny

Mit sichtbarer Herkunft:

inherited from group x
explicit user override.
Rechteauflösung

Rechts oder im Drawer:

Effective Permissions
finale Wirkung
Quelle
Lizenzstatus.
UI-Gefühl
präzise
kontrolliert
nachvollziehbar
systemisch
9.7 Feature Gating
Rolle der Seite

Feature Gating ist vollständig unabhängig von Permissions.
Es beantwortet nur:
Soll ein Feature für Deployment oder einzelnen User sichtbar sein?
Nicht: Was darf der User innerhalb des Features tun?

Wichtige Korrektur für deinen Scope

Die alte Clusterung enthielt auch Connector Features. Da du Konnektoren als eigenen Scope jetzt rausnimmst, wird das bereinigt.

Neue Cluster für Feature Gating
1. Chat Core
Chat
Group Chats
Sharing
Feedback. Der alte Cluster bleibt erhalten.
2. Prompting & Assets
Prompt-Vorlagen
Prompt-Bibliothek
gespeicherte Prompts.
3. Projekte
Projekte
Projektübersicht
Projektverwaltung
4. Kontexte
Kontext-Auswahl
zusätzliche Kontexte
Kontexte-Verwaltung

Hier erfolgt bewusst die Trennung von Projekte und Kontexte, die vorher noch gemeinsam unter „Kontext & Wissen“ gruppiert waren.

5. Model & AI Controls
Modellwahl
Reasoning
Spezialmodelle / modellnahe Features.
6. Systemnahe Features
SMB / Filesystem Zugriff
Nur wenn ihr diesen Punkt wirklich als sichtbares Produktfeature für Admins im Frontend toggeln wollt; ansonsten ganz weglassen.
Gating-Logik
Deployment Default: On / Off
User Override: Default / On / Off
User Override gewinnt.
UI-Aufbau
Hauptfläche

Feature-Katalog als Liste oder Card-Ansicht.

Pro Feature:

Name
Kurzbeschreibung
Cluster
Deployment Toggle
Badge mit Anzahl User Overrides
optional Abhängigkeiten.
Rechte Seite / Drawer

Bei Klick auf ein Feature:

Suchfeld
Filter nach Gruppen
Userliste
pro User 3-State-Control
optional Gruppenoverride.
Starke UX-Elemente
Deployment default sichtbar
Anzahl Overrides sichtbar
Effective visibility
Preview as user.
Abhängigkeiten

Wenn Parent-Feature off ist:

Childs nicht löschen
aber als abhängig / derzeit nicht erreichbar markieren.
UI-Gefühl
produktnah
katalogartig
strategisch
keine Checkboxen
kein Mischscreen mit Permissions.
10. Kontexte und Projekte: verbindliche Trennung im neuen System

Das ist einer der wichtigsten inhaltlichen Umbauten.

In den alten Texten wurden Projekte und Kontexte mehrfach gemeinsam gedacht:

in Permissions als „Projekte & Kontexte“
in Feature Gating unter „Kontext & Wissen“

Für das neue Zielbild gilt ab jetzt verbindlich:

Projekte

sind ein eigener Produkt- und Rechtebereich

Kontexte

sind ein eigener Produkt- und Rechtebereich

Konsequenzen für den Designer
eigene Rechtekategorien
eigene Feature-Gating-Cluster
nicht in derselben Card zusammenfassen
nicht in derselben Accordion-Section zusammenfassen
nicht sprachlich als ein Feature behandeln

Diese Trennung erhöht die fachliche Klarheit sofort.

11. Dinge, die der Designer ausdrücklich nicht bauen soll
keine persistente App-Sidebar zusätzlich zur Settings-Sidebar
keine horizontale Reiter-Navigation als primäre Settings-Navigation
keine künstlichen Menüpunkte ohne realen Scope
keine Security-Seite
keine Erste-Schritte-Seite
keine Darstellung-/Branding-Seite
keine Onboarding-Seite
keine Konnektoren-Seite als eigener Menüpunkt
keine Vermischung von Feature Gating und Permissions
keine Vermischung von Projekte und Kontexte
keine Rechnungsoptik in Billing
keine DevOps-Überladung in Monitoring
keine Checkbox-Wüste in Permissions
kein Toggle-Board ohne Override-Logik in Feature Gating

Diese Verbote leiten sich direkt aus den bestehenden Spezifikationen für Billing, Permissions, Feature Gating, Monitoring und User Profile ab.

12. Finales Zielkonzept für den Designer
In einem Satz

Kolai Settings sollen als eigener Overlay-Settings-Modus mit linker Sidebar umgesetzt werden, der die normale App-Navigation visuell ersetzt und die real vorhandenen Settings in sieben klar getrennte Bereiche organisiert: User Profile, Org Management, Billing, SMB Config, Monitoring, Permissions und Feature Gating.

In UI/UX-Sprache

Der Designer soll eine Admin-Erfahrung gestalten, die:

ruhig
hochwertig
professionell
modern
klar gegliedert
nicht überladen
skalierbar
ist und dabei die vorhandenen Inhalte nicht neu erfindet, sondern sauber neu ordnet.

Wenn du willst, formatiere ich dir das im nächsten Schritt direkt als saubere Designer-Spezifikation mit exakt einheitlichem Aufbau pro Seite — also so, dass du es 1:1 in Notion, Confluence oder Figma-Annotations übernehmen kannst.