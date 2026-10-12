---
title: "Solar EU punk: co naprawdę wiemy o domowej rynni słonecznej — analiza z źródłami"
excerpt: "Rozłożyliśmy domową rynnę paraboliczną na części: ile słońca mamy w Polsce (zmierzone), jaka geometria działa, ile to kosztuje dziś, co mówi prawo i kiedy termalny wygrywa z pompą ciepła. Z jawnymi lukami."
publishedAt: 2026-10-12
author: "Marcin Ołdak"
category: "edukacja"
tags: ["analiza", "solar"]
readingTime: 9
featured: false
draft: true
metaTitle: "Solar EU punk — domowa rynna słoneczna: dane, koszty, prawo (2026)"
metaDescription: "Analiza domowej rynny parabolicznej dla Polski: DNI z PVGIS, geometria 1,5 m², ceny BOM z 12.10.2026, prawo (art. 29 PB, wyrób budowlany), punkt zderzenia z pompą ciepła."
keywords: ["solar termalny dom", "rynna paraboliczna", "kolektor słoneczny DIY", "solar punk", "magazyn ciepła"]
faq:
  - q: "Ile słońca jest w Polsce na rynnę paraboliczną?"
    a: "Wrocław 1234,26 kWh/m²/rok i Warszawa 1124,46 kWh/m²/rok bezpośredniego promieniowania (DNI) za 2020 — PVGIS 5.2 MRcalc, pobrane 12.10.2026. Zimowe miesiące dają ułamek wiosennego kwietnia."
  - q: "Czy domowa rynna słoneczna opłaca się w Polsce?"
    a: "Jako oszczędność na CWU zwykle nie — przy 600 kWh ciepła rocznie to około 184 zł/oszczędności wobec pompy ciepła (COP 3). Wygrywa jako projekt edukacyjny, badawczy lub przy wysokiej temperaturze procesu."
  - q: "Czy legalnie postawię rynnę na posesji?"
    a: "Wolno stojący kolektor słoneczny: bez pozwolenia, bez zgłoszenia, bez projektu budowlanego (art. 29 ust. 4 pkt 3 lit. c Prawa budowlanego). Sprzedaż zestawu to już inny reżim — wyrób budowlany i/lub maszyna."
---

# Solar EU punk: co naprawdę wiemy o domowej rynni słonecznej

Słowo „solarpunk" zwykle kończy się na ilustracji z jaskrawymi roślinami i lustrem.
Postanowiliśmy sprawdzić, ile w tym jest inżynierii. Poniżej komplet tego, co udało
się ustalić w jednym dniu: ile słońca naprawdę mamy, jak powinna wyglądać rynna,
ile kosztują części w polskich sklepach (ceny z 12 października 2026), co na to
prawo i — najważniejsze — kiedy to ma sens, a kiedy nie. Z jawnymi lukami, bo
uczciwa analiza zaczyna się od przyznania, czego nie wiemy.

## 1. Ile słońca mamy w Polsce

Najważniejszy parametr dla rynny parabolicznej to nie „nasłonecznienie" w ogóle,
tylko **bezpośrednie promieniowanie normalne (DNI)** — bo tylko ono da się
skupić lustrem. Zmierzyliśmy je dla dwóch miast (PVGIS 5.2 MRcalc, baza
PVGIS-SARAH2, rok 2020, pobrano 12.10.2026; własne zapytanie API, zgodne co do
grosza z drugim, niezależnym przebiegiem):

| | Wrocław | Warszawa |
|---|---:|---:|
| **Suma DNI 2020** | **1234,26 kWh/m²** | **1124,46 kWh/m²** |
| Kwiecień (miesiąc szczytowy) | 200,07 | 185,92 |
| Styczeń | 66,01 | 35,70 |
| Październik–luty (pięć miesięcy) | ok. 216 łącznie | ok. 169 łącznie |

To nie jest to samo co promieniowanie globalne na płaszczyźnie 35° (Wrocław
1426,3 kWh/m²/rok, Warszawa 1341,6 — ten sam PVGIS, nasza własna seria godzinowa,
pobrane 12.10.2026). Dwa różne parametry: globalne — dla fotowoltaiki; DNI —
dla koncentratora.

**Wniosek praktyczny:** rynna pracuje dobrze wiosną i latem, a zima daje ułamek.
Przy sprawności projektowej 40% (patrz niżej) rynna o aperturze 1,5 m² daje
w kwietniu we Wrocławiu około 4 kWh energii dziennie, a w styczniu około 1,3 kWh
(rachunek własny: DNI miesięczne ÷ dni × 1,5 m² × 0,40). Zimowy podgrzew wody
bez magazynu i bez wspomagania to mrzonka.

## 2. Jaka rynna — geometria i tolerancje

Modelowa rynna, którą proponujemy jako punkt startowy: **absorber 18 mm
(odpowiada rurze DN15), apertura 0,85 × 1,77 m (1,5 m² powierzchni łapania),
ogniskowa ok. 0,253 m, kąt obrzeża 80°**. Min. trzy żebra szablonowe przy
wycinaniu profilu — błąd profilu zjada sprawność szybciej niż wszystko inne
(analiza optyczna raportu, źródło: repozytorium KAUST, dostęp 12.10.2026).

Dwa progi tolerancji, które trzeba zapamiętać: **przesunięcie odbiornika
o 5 cm = ok. 37% strat optycznych**; **błąd śledzenia 16 mrad (ok. 0,92°) =
ok. 50% strat** (te same analizy KAUST). Statyczna rynna o koncentracji ~15:
przy Słońcu zmieniającym pozycję o ok. 15° na godzinę jest w okolicy poprawnego
ustawienia przez kilka minut dziennie — strata powyżej 90%. **Bez trackingu
rynnę o tej koncentracji po prostu nie ma co budować** (albo zmienia się
geometrię na niskokoncentracyjną/CPC).

Sprawność: **40% przyjmujemy do projektu, 35% to minimum prototypu, 50% to cel
testu**. Punktem odniesienia jest badanie rynny o koncentracji 13,93
(szerokość 1,2 m, rura 26 mm, osłona szklana 50 mm), które przy napromienieniu
ok. 750 W/m² osiągnęło 55% sprawności mierzonej (Materials 2021, badanie
eksperymentalne cytowane w naszym raporcie — do pełne odczytania w źródle
pierwotnym przed publikacją liczby jako twardej).

Najtańszy tracker: siłownik liniowy 12 V **79–159 zł** (Allegro, dostęp
12.10.2026) plus sterownik różnicowy pompy **189 zł** (Ceneo, 12.10.2026);
pełna rekomendacja z raportu: sterowanie zegarowe + dwa LDR jako korekta +
krańcówki + pomiar prądu silnika + osobne wejście odogniskowania + pozycja
„park" przy wietrze.

## 3. Ile to kosztuje dziś (ceny: 12.10.2026)

| Pozycja | Cena | Źródło |
|---|---:|---|
| Szkło float 4 mm | 78,64 zł/m² | Viyar (cena do potwierdzenia — konfigurator nieoddający ceny w prostym pobraniu) |
| Rura miedziana DN20 miękka 22×1 | 36,78 zł/mb (min. krąg 25 m = 919,50 zł) | Euroterm24 |
| Rura miedziana twarda 22 mm, odcinek 1 m | 71,49 zł/mb | Leroy Merlin |
| Rura miedziana DN15 | 34,20 zł/mb | Instal-Hurt Tychy |
| Blacha stalowa S235 2 mm (arkusz 2 m²) | 36,44 zł/m² | Metallco |
| Wełna mineralna 100 mm | 30,50 zł/m² | Bednarek |
| Glikol propylenowy solarny 20 l | 159 zł | Chemsklep |
| Pompa obiegowa 12/24 V (Lowara D5-38/700B) | 789,47 zł | Aquatuning (cena zweryfikowana na stronie 12.10) |
| Grupa armatury solarnej 1″ | 785 zł (układ zamknięty!) | Nordic Tec |
| Transport: zbiornik 105 kg / paczka szkła 2–2,5 m | 220 zł / 150–250 zł | Kotłospaw / Szkło Dekoracyjne |

Dwie pozycje kupuje się „na zapytanie": **reflektor Alanod MIRO-SUN**
(reflektancja 90±3%, ale MOQ producenta 300 kg — dla kilkunastu zestawów trzeba
dystrybutora lub zakupu wspólnego) i **osłona borokrzemowa** ( Continental Trade
ma rury OD 45–55 mm, wycena indywidualna).

**Największe znalezisko F3 to luka:** w polskich sklepach **nie ma publicznie
wycenionego otwartego, izolowanego zbiornika 500 l**. Wszystkie dostępne bufory
to konstrukcje ciśnieniowe (3 bar za 5060 zł, 5 bar za 3399 zł), a otwarty
zbiornik 500 l jest dostępny wyłącznie na zapytanie (np. Daikin EKHWP-PB).
Werdykt kosztowy: **kompletny, udokumentowany zestaw nie schodzi poniżej
3 000 zł** — ta kwota to realny próg dla samego zestawu materiałowego bez
zbiornika, montażu i dokumentacji.

## 4. Co mówi prawo (Polska, stan na 12.10.2026)

- **Postawienie na posesji:** wolno stojący kolektor słoneczny — **bez
  pozwolenia, bez zgłoszenia, nawet bez projektu budowlanego** (art. 29 ust. 4
  pkt 3 lit. c Prawa budowlanego, Dz.U. 2026 poz. 524; potwierdzenie organu:
  pismo MRiT DAB-II.053.10.2021 z 10.09.2021). Zwolnienie dotyczy „instalowania"
  — osobna konstrukcja (fundament, wiata) to już osobna kwalifikacja.
- **Sprzedaż zestawu:** kolektory są w krajowym wykazie wyrobów budowlanych
  (załącznik nr 1 do rozporządzenia o deklarowaniu właściwości użytkowych,
  Dz.U. 2023 poz. 873) — „Zestawy/systemy do ogrzewania słonecznego". Czyli:
  ścieżka europejska (norma zharmonizowana/ocena techniczna) albo krajowa
  (KDWU + znak budowlany).
- **Tracker z napędem = maszyna** nawet do użytku własnego (dyrektywa
  2006/42/WE, art. 2 lit. i: „for his own use" też jest producentem) —
  dokumentacja, ocena ryzyka, deklaracja, CE. Ręczne ustawianie = poza reżimem.
- **PED (urządzenia ciśnieniowe):** „otwarty" to nie kategoria — liczy się PS.
  System bez przekroczenia zakresu art. 1 ust. 1 jest poza dyrektywą, ale trzeba
  policzyć ciśnienie hydrostatyczne i pamiętać o zaworach, niedrożnościach i pompie.
- **Rejestry:** „Ewidencja ZUEP" nie istnieje jako oficjalna nazwa — dla
  wprowadzających sprzęt elektryczny i elektroniczny właściwy jest **Rejestr BDO**.

## 5. Kiedy się opłaca — punkt zderzenia

Średnia cena energii elektrycznej dla gospodarstwa domowego z dystrybucją:
**0,92 zł/kWh w 2025 r.** (URE, komunikat z 2026 r., dostęp 12.10.2026).
Przy 600 kWh użytecznego ciepła rocznie (scenariusz, nie prognoza):

- wobec grzałki: ok. 552 zł oszczędności rocznie;
- wobec pompy ciepła z COP 3: ok. **184 zł rocznie**.

Maksimum rozsądnego nakładu 10-letniego: **ok. 1840 zł wobec pompy ciepła**
(bez dyskonta i serwisu). Dla porównania: gotowy zestaw PV 2,64 kWp kupisz
od ok. 4998 zł (Leroy Merlin, 12.10.2026), bojler elektryczny 100 l od 938 zł.
**Wniosek: seryjny zestaw termalny za 4–6 tys. zł nie wygrywa finansowo
z istniejącą pompą ciepła** — wygrywa wtedy, gdy potrzebna jest wysoka
temperatura procesu, gdy kolektor powstaje bardzo tanio (projekt własny)
albo gdy ciepło jest zużywane bezpośrednio w godzinach słonecznych. Termalny
to projekt z wartością edukacyjną i badawczą, nie oszczędnością roku.

## 6. Czego nie wiemy (luki jawne)

1. **Miesięczny wzór strat 814/2013** (ekoprojekt zbiorników) — w tekście
   rozporządzenia to obrazek; wyciągnięcie wzoru do rejestru wymaga ręcznego
   odczytu w EUR-Lex. Wyliczenie raportu: dla 500 l limit ok. 2,8 kWh/24 h
   (ok. 10,7% energii względem otoczenia) — do potwierdzenia wzorem.
2. **Średnia wieloletnia DNI** — podane wartości to rok 2020 (SARAH2);
   dla średniej 2005–2023 trzeba SARAH3 — nie mieszamy baz w jednej tabeli.
3. **Cena szkła 4 mm za m²** — do potwierdzenia w konfiguratorze Viyar.
4. **Otwarty zbiornik 500 l z ceną** — luka rynkowa; alternatywy: zapytanie
   do producenta, stal nierdzewna na wymiar, magazyn w piasku (patrz niżej).
5. **Reflektor z deklarowaną reflektancją w małej serii** — MOQ producenta
   blokuje zakup detaliczny.

## 7. Po co ta analiza

Nie sprzedajemy zestawów. Publikujemy, bo ta wiedza w polskim Internecie jest
rozproszona: liczby są w angielskich repo, ceny w sklepach, prawo w Dzienniku
Ustaw — a osobno tego nikt nie złożył. Wariant z magazynem wodnym jest tylko
jednym z wariantów: ciepło da się trzymać w **piasku** (brak glikolu, brak
zamarzania, odporność na stagnację >100 °C, np. rozwiązanie Polar Night Energy
z Finlandii), co znika problem „co zrobić z nadmiarem ciepła" w upalny dzień.

Jeśli budujesz coś podobnego, analiza jest otwarta — korekty z podanym źródłem
i datą są mile widziane. A jeśli szukasz rzetelnego startu w AI, zapraszam
do pozostałych artykułów na tym blogu.

---

*Wszystkie ceny: dostęp 12.10.2026. Dane PVGIS: pobrane 12.10.2026 (rok 2020,
PVGIS-SARAH2). Podstawa prawna: Dz.U. 2026 poz. 524, Dz.U. 2023 poz. 873,
Dz.U. 2016 poz. 1036, dyrektywy 2006/42/WE, 2014/68/UE, rozporządzenia 812/2013
i 814/2013. Analiza wykonana w ramach think-tank solar EU punk.*
