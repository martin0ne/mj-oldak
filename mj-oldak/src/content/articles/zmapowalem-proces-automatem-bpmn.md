---
title: "Od opisu procesu do gotowego pliku .bpmn — skill analityka w Claude Code"
slug: "zmapowalem-proces-automatem-bpmn"
cover: "/articles/covers/zmapowalem-proces-automatem-bpmn.png"
coverAlt: "Od opisu procesu do gotowego pliku .bpmn — skill analityka w Claude Code — MJ.OLDAK"
excerpt: "Opisujesz proces słowami, dostajesz model AS-IS/TO-BE jako ASCII, reguły bramek, edge case'y i realny plik .bpmn z auto-layoutem, który otwiera się wprost w bpmn.io. Bez klikania współrzędnych XML."
publishedAt: 2026-06-17
author: "Marcin Ołdak"
category: "case-study"
tags: ["build", "tutorial"]
readingTime: 6
featured: false
draft: false
lang: "pl"
translationKey: "process-mapper-bpmn"
metaTitle: "Skill BA w Claude Code: opis procesu → plik .bpmn"
metaDescription: "Jak zbudowałem skill analityka biznesowego: opis procesu zamienia w model AS-IS/TO-BE, reguły bramek, edge case'y i gotowy plik .bpmn do bpmn.io."
keywords: ["analityk biznesowy", "BPMN", "mapowanie procesów", "Claude Code", "bpmn.io", "AS-IS TO-BE", "BA", "automatyzacja"]
---

Zrozumienie większego, nieznanego procesu to zwykle godziny klikania w narzędziu modelującym — albo ręczne pisanie BPMN XML z poprawnymi współrzędnymi, co jest podatne na błędy i przepisuje się od zera za każdym razem. Zbudowałem skill, który to skraca: opisujesz proces słowami, a dostajesz model AS-IS/TO-BE jako ASCII, reguły każdej bramki, edge case'y — i **realny plik `.bpmn` z auto-layoutem, który otwierasz wprost w bpmn.io**.

## O co chodzi

`process-mapper` to skill w Claude Code, który zamienia opisany proces na komplet artefaktów analityka biznesowego (BA). Pozycjonuję go jasno: to **akcelerator do większych procesów, nie zamiennik** ręcznej nauki modelowania. Manualne dłubanie w bpmn.io zostaje moją ścieżką nauki BA — skill tylko skaluje samą analizę.

Rdzeń generuje się zawsze, jako tekst:

- **AS-IS** — stan obecny, z bottleneckami i pętlami reworku.
- **TO-BE** — stan docelowy, z jawnym podziałem: ⚙️ service task (automat/AI) kontra 👤 user task (człowiek).
- **Reguły każdej bramki** — warunek i nazwana każda ścieżka wyjścia.
- **Edge case'y** — co się psuje i jak proces to łapie.
- **Aktorzy + swimlanes** — kto wykonuje który krok (lane na aktora/system).

Świadomie wszystko leci jako **ASCII plus plik `.bpmn`, nigdy jako mermaid ani renderowany widget**. Powód jest praktyczny: renderowane diagramy nie ładują się w moim środowisku — pokazują się jako puste. ASCII ładuje się zawsze, a `.bpmn` to twardy, edytowalny artefakt. Kierunek całości jest zawodowy: nauka i portfolio pod etat junior BA / AI BA.

## Pod maską

Plik `.bpmn` powstaje przez skrypt `build_bpmn.py`. Karmisz go prostym, deklaratywnym specem JSON — dwa klucze, `elements` i `flows` — a skrypt składa z tego poprawny BPMN 2.0 XML z auto-layoutem DI. Wspiera 6 typów elementów, mapowanych na elementy BPMN:

```text
start    → startEvent
end      → endEvent
task     → task
service  → serviceTask
user     → userTask
gateway  → exclusiveGateway
```

Najciekawszy jest **auto-layout**, bo to on eliminuje ręczne liczenie współrzędnych. Algorytm rangowania longest-path (kolejność topologiczna Kahna z propagacją najdłuższej ścieżki) wylicza kolumnę każdego węzła jako odległość od startu. Węzły o tej samej randze rozkłada w pionie wokół linii bazowej, ze stałymi odstępami: 160 px w poziomie, 120 px w pionie. Na tej podstawie generuje `BPMNShape` (z `dc:Bounds`) i `BPMNEdge` (z `di:waypoint`) — czyli całą warstwę graficzną, której bpmn.io potrzebuje, żeby cokolwiek narysować.

Dwie decyzje projektowe są celowe. Po pierwsze, **lanes i pools nie są generowane** — dorysowuję je ręcznie w bpmn.io, bo to też ćwiczenie BA. Po drugie, skrypt **waliduje wejście**: brak klucza `elements` lub `flows` kończy go twardym błędem, zamiast wypluć śmieci.

Druga warstwa dyscypliny siedzi w samej analizie, nie w kodzie. Każda bramka musi mieć **co najmniej dwie nazwane ścieżki wyjścia** — gateway bez etykiet traktuję jako błąd, bo to znak, że proces nie jest domyślany do końca. I jest stała checklista edge case'ów przy TO-BE, którą przechodzę za każdym razem:

```text
- błąd / wyjątek      → retry, ścieżka błędu, eskalacja
- brak danych         → walidacja
- niska pewność       → bramka na confidence → korekta człowieka (human-in-the-loop)
- odrzucenie          → pętla powrotna
- duplikat            → deduplikacja
- timeout             → brak odpowiedzi
- compliance          → gdzie człowiek powinien zatwierdzać (praktyka compliance, RODO art. 22)
```

## Co z tego masz

Najważniejsze, co ten skill pokazuje, to **dojrzałość BA, nie ładny obrazek**. Model nie kończy się na happy path: każda ścieżka bramki jest nazwana, edge case'y są przepracowane, a human-in-the-loop jest wbudowany tam, gdzie człowiek musi zostać w pętli (niska pewność, compliance). To różnica między „narysowałem schemat" a „przemyślałem proces".

Drugie — most do realnych narzędzi. Na żądanie skill dorzuca moduły opcjonalne: **UML jako ASCII** (sequence i/lub class), **user stories Jira-ready** w formacie „Jako [rola] chcę [cel] aby [wartość]" z kryteriami akceptacji „Given / When / Then", oraz **mapowanie pól API** (źródło → cel → reguła transformacji + obsługa braków). Stories są projektowane pod konektor Atlassian (gotowe do założenia jako issue), a wzór mapowania pól wprost odwołuje się do pipeline'u mojego produktu OCR (Azure DI → schema → eksport, np. NIP, data, kwota).

Trzecie — to **deterministyczna automatyzacja tam, gdzie była żmudna ręczna robota** (generowanie XML), ale ze świadomym zachowaniem nauki manualnej. Skrypt robi to, co maszyna robi lepiej (poprawne współrzędne i waypointy), a ja zostaję przy tym, co buduje kompetencję (modelowanie, lanes). Efekt jest pokazywalny: komplet BRD + `.bpmn` + stories jednego produktu to „teczka BA" — materiał wprost na rozmowę rekrutacyjną.

## Dowód

Na razie bez publicznego repo — skill żyje lokalnie jako skill Claude Code (`~/.claude/skills/process-mapper`), więc dowodem jest technika i działający artefakt, nie link na GitHub.

Sprawdziłem, że generator faktycznie działa. Na przykładowym specu „Obsługa faktury" (7 elementów + 7 flows) wyprodukował plik `.bpmn`, który jest poprawnie sformułowanym (well-formed) BPMN 2.0 XML — potwierdzone parserem — z elementami `sequenceFlow`, `BPMNShape` (`dc:Bounds`) i `BPMNEdge` (`di:waypoint`). Czyli gotowy do otwarcia w bpmn.io. Tak wygląda wejście i wyjście jednej bramki:

```text
spec (JSON):
  {"id": "gw", "type": "gateway", "name": "Pewność wysoka?"}
  {"from": "gw", "to": "fix", "label": "Nie"}
  {"from": "gw", "to": "ok",  "label": "Tak"}

.bpmn (fragment):
  <bpmn:exclusiveGateway id="gw" name="Pewność wysoka?" .../>
  <bpmn:sequenceFlow ... sourceRef="gw" targetRef="fix" name="Nie" />
  <bpmn:sequenceFlow ... sourceRef="gw" targetRef="ok"  name="Tak" />
  <bpmndi:BPMNShape ...><dc:Bounds x="..." y="..." width="50" height="50" /></bpmndi:BPMNShape>
```

Uczciwa uwaga: zweryfikowałem well-formedness XML i obecność warstwy DI, ale nie otwierałem pliku wizualnie w bpmn.io — więc nie twierdzę o „idealnym layoucie", tylko o poprawnym, otwieralnym artefakcie.

Jeśli interesuje cię, jak takie skille i narzędzia osadzają się w szerszym obrazie adopcji AI, pisałem o tym przy okazji danych: [co dane mówią o adopcji AI — Polska vs UE](/artykuly/co-dane-mowia-o-adopcji-ai-polska-vs-ue/).
