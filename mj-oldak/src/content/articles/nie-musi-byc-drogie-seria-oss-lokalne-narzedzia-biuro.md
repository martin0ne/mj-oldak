---
title: "Nie musi być drogie, trudne ani niebezpieczne: cztery lokalne narzędzia dla polskiego biura"
slug: "nie-musi-byc-drogie-seria-oss-lokalne-narzedzia-biuro"
excerpt: "Cztery darmowe narzędzia na licencji MIT: faktury PDF do rejestru, terminarz płatności, audyt JPK, kalibracja monitorów. Wszystko lokalnie, zero chmury. Zanim je pokazałem, przetestowały je persony — i jedno narzędzie złapały na kłamstwie."
publishedAt: 2026-10-26
cover: "/articles/covers/nie-musi-byc-drogie-seria-oss-lokalne-narzedzia-biuro.png"
coverAlt: "Cztery karty narzędzi serii OSS z ocenami person i liczbą testów — MJ.OLDAK"
author: "Marcin Ołdak"
category: "edukacja"
tags: ["build", "automatyzacja", "biuro-rachunkowe", "tutorial", "koszty"]
readingTime: 8
featured: false
draft: false
lang: "pl"
metaTitle: "Cztery darmowe lokalne narzędzia dla polskiego biura — teza serii OSS"
metaDescription: "Cztery darmowe lokalne narzędzia dla biura i MŚP: faktury, terminarz, audyt JPK, monitory. MIT, zero chmury, przetestowane personami przed publikacją."
keywords: ["darmowe narzędzia dla firmy", "JPK V7 walidacja offline", "KSeF FA(3)", "terminarz płatności", "faktury PDF do rejestru", "local-first", "open source dla MŚP"]
faq:
  - q: "Czy te narzędzia zastępują program księgowy?"
    a: "Nie. To kontrola drugiej pary oczu: walidacja plików, podgląd rejestrów, terminarz. Rozliczenia podatkowe zostają w programie księgowym lub u księgowej; narzędzia same to komunikują (lint nie jest doradcą podatkowym)."
  - q: "Czy dane wychodzą z komputera?"
    a: "W projekcie założono zero chmury, zero kont, zero telemetrii; schematy Ministerstwa Finansów są lokalnymi kopiami. Uczciwie: jako użytkownik nie-programista nie zweryfikujesz tego sam, dlatego w artykule opisuję, co sprawdzić i dlaczego persony testowały najpierw na plikach fikcyjnych."
  - q: "Ile to kosztuje?"
    a: "Zero złotych. Kod na GitHubie na licencji MIT, dane zostają na dysku użytkownika. Płatne fakturowanie w chmurze kosztuje u vendorów 4,99–19,90 zł miesięcznie (cenniki 2026), ale nasz wyróżnik to nie cena, a lokalność i brak limitów."
---

Sześćdziesiąt dziewięć procent biur rachunkowych nie rozpoczęło przygotowań do KSeF. Wynik dał raport Symfonii jeszcze w 2025 roku, kiedy obowiązek był już na horyzoncie ([Business Insider, 2025](https://businessinsider.com.pl/prawo/podatki/raport-69-proc-biur-rachunkowych-niegotowych-na-ksef/m50y0yc)). To nie jest problem „kiedyś". To jest problem na biurku księgowej, która dziś otwiera maila od klienta z plikiem JPK i patrzy na niego tak samo jak ty na fakturę w obcym języku.

Teza tej serii jest prosta: **dobre narzędzie biurowe nie musi być drogie, trudne ani niebezpieczne. Może być pożyteczne.** Drogo — bo płatne fakturowanie w chmurze zaczyna się od 4,99 zł miesięcznie (Comarch Betterfly eFaktury Plus, cennik 2026), a kończy na 19,90 zł (inFakt Faktury, cennik 2026); to nie jest majątek, ale to też nie jest zero, i zawsze jest w chmurze. Trudnie — bo „zainstaluj i używaj" w praktyce znaczy: venv, pip, terminal, ściana angielskiego. Niebezpiecznie — bo „bezpieczne i lokalne" piszą wszyscy, a połowa kłamie.

Zbudowałem więc cztery narzędzia, które spełniają trzy warunki naraz: zero złotych (MIT, kod na GitHubie), zero chmury (dane zostają na dysku) i możliwe do otwarcia przez człowieka, który terminala nigdy nie widział na własne oczy. A potem, zanim cokolwiek opublikowałem, dałem je na testy ludziom, dla których je pisałem.

## Cztery narzędzia

| Narzędzie | Do czego | Repo | Testy person |
|---|---|---|---|
| **faktury-do-rejestru** | faktury PDF z folderu → rejestr CSV/XLSX; wystawienie faktury PDF; XML FA(3) do KSeF z lokalną walidacją | [martin0ne/faktury-do-rejestru](https://github.com/martin0ne/faktury-do-rejestru) | Ania (asystentka): 7 → 9 |
| **terminarz-platnosci** | rejestr → kartka „co płacę w tym tygodniu", przeterminowane na czerwono, PDF na biurko | [martin0ne/terminarz-platnosci](https://github.com/martin0ne/terminarz-platnosci) | Marek (JDG): 7 → 8 |
| **jpk-viewer-lint** | przegląd i weryfikacja JPK_V7 offline: XSD, kontrole krzyżowe, eksport XLSX/PDF | [martin0ne/jpk-viewer-lint](https://github.com/martin0ne/jpk-viewer-lint) | Kasia (księgowa): 6 → 8 |
| **color-sync-kit** | kalibracja i wyrównanie kolorów monitorów bez kalibratora, telefonem i AI | [martin0ne/color-sync-kit](https://github.com/martin0ne/color-sync-kit) | opisany osobno ([poprzedni artykuł](/artykuly/dwa-monitory-jeden-kolor-ai-w-telefonie/)) |

Łańcuch działa jako całość: faktury z maili → rejestr → terminarz płatności → audyt JPK. Jedno wyjście jest wejściem następnego narzędzia, więc nic nie przepisuje się drugi raz.

## Jak to testowałem: nie audyt kodu, tylko persony

Kod sprawdzają linterzy. Człowieka sprawdzają tylko ludzie. Każde narzędzie dostało na test trzy persony; każda z nich złapała coś, czego ja bym nie znalazł.

**Kasia, 41, księgowa z 15-letnim stażem.** Jej pierwsze spotkanie z terminalem to przepisanie komendy znak po znaku „w okienko, którego nie rozumiem, i modlić się, że nic nie zepsuję". Ale to ona złapała rzecz, która mogła zabić narzędzie na starcie: na **poprawnym** pliku JPK z fakturą kasową FP lint wywalił warning „różnica = 230,00 zł". Jej zdanie: „Różnica 230 zł na pliku, który jest spójny!". I dalej: „zaufanie buduje się latami, a psuje jednym fałszywym alarmem". W jej biurze taki warning oznacza telefon do klienta z paniką w środę rano. Narzędzie kłamało: kontrola istniała, ale liczyła po dwóch różnych podstawach (deklaracja liczyła FP, suma ewidencji nie) i wołała „różnica!", gdzie różnicy nie było.

**Marek, 47, jednoosobowa firma instalacyjna z Ząbek.** Faktury kosztowe siedzą w mailach, terminal to obca planeta. Jego pytanie kwalifikujące narzędzie: „czy mój syn mi to zrobi w 10 minut, czy się będzie wściekał?". To on w drugiej rundzie przyłapał README na kłamstwie: skopiował reklamowaną komendę „cały łańcuch w dwóch komendach" 1:1 i dostał surowy błąd argparse. Jego werdykt jest lepszy niż każdy mój audyt: „ta komenda musi być przetestowana przez wklejenie, nie przez pamięć". README nieprzetestowany wklejeniem to dokument, który kłamie w najbardziej reklamowanym miejscu.

**Ania, 26, asystentka agencji w Pradze.** „Czarne okno" widziała tylko w filmach. Wpisała literówkę `czytanie` zamiast `czytaj`. Program **zadziałał**. „To mnie PRZERAZIŁO bardziej niż błąd". Potem test kontrolny: kompletny bełkot `xyzzy`. Też zadziałał i coś policzył. Narzędzie, które przyjmuje jakiekolwiek słowo i idzie w swoje, jest dla nietechnika czarnoksięstwem: nie wiesz, kiedy robi to, co myślisz, że robi.

Wszystkie trzy testy szły po realnych uruchomieniach, nie po deklaracjach. Przykładowy przebieg z dzisiejszego dnia, od instalacji do audytu JPK: instalacja sprawdza się jedną komendą kontrolną („instalacja OK"), terminarz na 30-fakturowym rejestrze pokazuje „2026-10-20 (6 dni po terminie) FV/2026/10/001 Hurtownia Testowa S.A. 2 411,20 zł" i sumę 16 091,20 zł wraz z przeterminowanymi, a komunikat błędu JPK mówi po księgowemu: „pozycja 1 ewidencji zakupu: K_43 (podatek naliczony z nabycia pozostałych towarów i usług) — nieoczekiwany element; oczekiwano: K_42, K_44…". Kasia o takiej stopce „CZEGO NIE SPRAWDZONO": „Zdarza się raz na sto narzędzi".

## Co naprawiliśmy — klasy błędów, których audyt kodu nie widzi

Linter nie wykryje żadnej z poniższych klasy, bo kod formalnie działa. Wykryła je osoba, która używa narzędzia jak człowiek:

- **Kontrola, która kłamie.** Warning FP na poprawnym pliku. Naprawa: porównanie po tej samej podstawie (wykluczenie FP czytane ze schematu MF, nie zgadywane), a przy prawdziwej różnicy dopisek „różnica może wynikać z faktur FP lub korekt — sprawdź typ dokumentu". Kasia w rundzie 2 na tym samym pliku: zero fałszywego alarmu, przy wymuszonej różnicy 500 zł i dopisek, o który prosiła. Jej werdykt: „To jest przypadek wzorcowy."
- **README nieprzetestowany wklejeniem.** Zepsuta komenda łańcucha. Poprawiona i dodana do testów.
- **Milczące działanie po bełkocie.** Literówki komend i wymyślone flagi przechodziły cicho albo robiły coś innego. Teraz: „BŁĄD: nieznana komenda: czytanie (masz na myśli „czytaj"?)", kod wyjścia 1, nic się nie zapisuje. Ania, runda 2, po teście: „PŁACZU Z RADOŚCI."
- **Komunikat, który kłamie o sytuacji.** Pusty folder dostawał komunikat „podaj --katalog", mimo że folder był podany. Teraz: „folder /tmp/ania2/pusty nie zawiera plików PDF". Prawda o sytuacji zamiast formalnie poprawnego bełkotu.
- **Dane-niewidka.** Rejestr zapisywał się do domyślnego folderu, o którym README milczał. Teraz ścieżka jest i w README, i w wyniku komendy: „OK: dopisano 2/2 faktur -> /tmp/ania2/moj-rejestr.csv".

Efekt re-testu: Kasia 6 → 8, Marek 7 → 8, Ania 7 → 9. Ania to podsumowała najlepiej: jej ryzyko zeszło „z «wieczór mogę stracić» na «gorszy przypadek to 5 minut szukania i mail do autora»". W jpk-viewer-lint testy urosły z 22 do 43 i wszystkie przechodzą (43/43 PASS na świeżym venv).

Zostają rzeczy, których nie naprawiłem i wiem o nich: terminal i CLI to nadal bariera dla księgowych (prośba Kasi o „przeciągnij plik → wynik" czeka), README wciąż częściowo mówi do programisty, a faktury w mailach, ostatnia mila Marka, nie mają w README recepty krok po kroku. Stąd oceny 8/10, nie 10/10, właśnie dlatego.

## Liczby rynku — i uczciwe dziury

Każda liczba poniżej ma źródło. Gdzie pomiaru nie ma, piszę, że nie ma.

- **2 367 000 mikroprzedsiębiorstw** (do 9 osób) w Polsce w 2024, wzrost o 66 tysięcy rok do roku; 96 procent wszystkich firm; około 78 procent jednoosobowe (GUS 2024, przez [FilaryBiznesu, 06.2026](https://filarybiznesu.pl/polska-ma-ponad-2-miliony-mikrofirm-wiekszosc-z-nich-wciaz-liczy-podatki-w-excelu/s30176)). To jest populacja, dla której piszę: firma, w której księgowość robi jeden człowiek między robocą a robocą.
- **69 procent biur rachunkowych niegotowych na KSeF** (Symfonia, przez [Business Insider, 2025](https://businessinsider.com.pl/prawo/podatki/raport-69-proc-biur-rachunkowych-niegotowych-na-ksef/m50y0yc)). jpk-viewer-lint trafia dokładnie w to okno: sprawdzenie pliku offline zanim poleci na urząd.
- **Cenniki fakturowania 2026:** Comarch Betterfly eFaktury darmowe do 10 dokumentów miesięcznie, Plus 4,99 zł; iFirma Faktura+ 12,50 zł; inFakt Faktury 19,90 zł (cenniki vendorów, odczyt 26.10.2026; wFirma cennika publicznie nie podaje). Fakturownia ma plan Micro za **0 zł** miesięcznie przy 3 fakturach na miesiąc ([fakturownia.pl/cennik, 2026](https://fakturownia.pl/cennik)). Uczciwie: darmowe alternatywy istnieją, ale w chmurze i z limitami. Nasz wyróżnik nie jest ceną, tylko lokalnością i brakiem limitu.
- **e-Doręczenia: 34 miliony pism** wysłanych cyfrowo i około 2 miliony zarejestrowanych podmiotów (stan 10.2025), a do 2029 roku obejmie całą gospodarkę ([gov.pl/MC, 08.10.2025](https://www.gov.pl/web/cyfryzacja/ponad-34-mln-pism-wyslanych-cyfrowo-e-doreczenia-rosna-w-sile)). To jest skala następnego narzędzia z serii.
- Na fakturach MŚP zapisywano w 2025 roku przeciętnie około 14 dni na przelew (13,7 dnia, 54,4 procent faktur z odroczonym terminem; dane vendora Faktura.pl, Q2 2025; liczba opisuje faktury, nie realne płatności).

A teraz dziury, wprost:

- „Wielkość mikrofirm wciąż liczy w Excelu": **nie ma pomiaru**. Opisuję to jako obserwację kwalitatywną z danych vendorów, nie jako fakt statystyczny.
- Ile godzin tygodniowo asystentka traci na dokumenty: **nie ma pomiaru**. Ania w teście przepisywała ręcznie „godzinę tygodniowo"; to jedna osoba, nie statystyka.
- Płace księgowych biur rachunkowych — **nie ma liczby**: żaden dostępny materiał nie wydziela tej grupy z całości rynku. Teza „automatyzacja za 200 zł miesięcznie się opłaca" bez stawki godzinowej nie da się uczciwie napisać, więc jej nie piszę.

## Tor edukacji: dokąd to zmierza

Narzędzia są stopniem zero. Drabina idzie wyżej i też kosztuje zero złotych (Hermes jest open source, LM Studio jest darmowy, modele lokalne są darmowe):

1. **Gotowe narzędzia** — odpalasz `czytaj` / `przeglad` / `sprawdz`. Uczysz się terminala i „gdzie leży mój plik".
2. **AI na własnym dysku** — LM Studio + model embeddingowy: szukanie po własnych plikach lokalnie (mierzony czas: 0,07 sekundy na zdanie). Uczysz się, czym jest model i że lokalne nie znaczy słabe w każdym zadaniu.
3. **Agent jako hub** — Hermes na życzenie odpala narzędzia: „przejdź faktury z ~/Faktury". Uczysz się promptu jako polecenia pracy i weryfikacji wyniku: AI liczy sumy, człowiek ocenia.
4. **Pełna lokalność** — Hermes ↔ LM Studio, granice lokalnych modeli poznane na własnych przykładach.
5. **PRO: płatne API** — ten sam agent, mocniejszy mózg (OpenRouter albo Portal); decyzja „co wysyłam, po co, za ile" podjęta świadomie, po własnych doświadczeniach z kroków 1–4. To jest moment, w którym płacenie za moc przestaje być marketingiem.
6. **Sam budujesz** — własny skrypt na wzorcach z serii: idempotentny, z dry-runem, z czytelnymi błędami.

Wpięte w każdy stopień to samo pytanie, które persony zadawały nieświadomie: **co ta konfiguracja wysyła i gdzie?** Oraz zasada z serii, którą narzędzia już egzekwują komunikatami: AI przygotowuje plik i walidację, wysyłka do urzędu jest ręczna, najpierw w środowisku testowym Ministerstwa Finansów. I samookres: lokalne modele po polsku są słabe do generowania tekstu, mocne są w embeddingach i klasyfikacji krótkiej; gdzie nie mam pomiaru, nie deklaruję.

## Co dalej

Dwa rzeczy, w tej kolejności:

- **Narzędzie nr 5: e-Doręczenia.** Skala jest zmierzona (34 miliony pism, 2 miliony podmiotów, do 2029 cała gospodarka), harmonogram grup podmiotów idzie z ustawy; budowa dopiero po odczytaniu terminów z rejestru.
- **Pomiar na realnych plikach.** Wszystkie testy szły na fixturach i syntetykach; Kasia słusznie zaznaczyła, że kilkusetwierszowy PDF od realnego klienta to inny test. Jeśli prowadzisz biuro albo firmę i chcesz z tym pomóc: przygotuj zanonimizowany plik JPK albo paczkę faktur, przepuść przez narzędzie i napisz, co zgrzyta. Każdy realny plik, który wróci z uwagami, trafia do testów przed kolejnym wydaniem.

## Wsparcie (i pełna przejrzystość)

Jeśli chcesz postawić Hermesa u siebie i wolisz, żeby ktoś go hostował, działał i aktualizował
za Ciebie — istnieje usługa FlyHermes Pro: hosted Hermes Agent z dołączonymi kredytami AI,
Bez serwera i kluczy API; 49 USD/mies. albo 39 USD/mies. rozliczane rocznie ([flyhermes.ai, cennik 2026](https://flyhermes.ai/?via=marcin)).
Sam Hermes jest darmowy i open source — sam hostowanie kosztuje i wymaga ogarnięcia serwera,
dlatego taka usługa ma sens dla kogoś, kto nie chce tego robić samemu.
**Uczciwie: to link partnerski** — jeśli coś kupisz przez niego, dostaję prowizję
(20% od płatności, [program afiliacyjny FlyHermes, 2026](https://flyhermes.ai/?via=marcin)).
Nie zmienia to ceny, którą płacisz.

To samo z [Nous Portal](https://portal.nousresearch.com/r/martin0ne) — subskrypcja z dostępem do modeli
w jednym miejscu (link polecający: 15 USD kredytów dla Ciebie po pierwszej opłacie,
10 USD dla mnie). Także w pełni oznaczone jako link polecający.

Repozytoria czterech narzędzi są i pozostają neutralne — bez linków afiliacyjnych,
bez trackingu. Reflinki żyją tylko tutaj, w artykułach.

## TL;DR

- Cztery darmowe narzędzia (MIT, zero chmury): faktury PDF → rejestr, terminarz płatności, audyt JPK offline, kalibracja monitorów. Kod na GitHubie, łańcuch działa jako całość.
- Przed publikacją testowały je persony (księgowa, JDG, asystentka) i złapały narzędzie na kłamstwie (fałszywy alarm 230 zł na poprawnym JPK) i README na nieprzetestowanej komendzie. Po naprawach i re-teście: 6→8, 7→8, 7→9.
- Teza: pożyteczne nie musi być drogie (fakturowanie w chmurze: 4,99–19,90 zł miesięcznie u vendorów), trudne ani niebezpieczne. Trudna część to nie kod — to uczciwość wobec człowieka, który komendy kopiuje z README.
- Dalej: e-Doręczenia (34 miliony pism to skala problemu) i pomiar na realnych plikach; zaproszenie dla czytelników jest otwarte.

