---
title: "Trzy wąskie gardła demokratyzacji AI: compute, wagi, kapitał"
slug: "trzy-waskie-gardla-demokratyzacji-ai"
excerpt: "Otwarte wagi obiecują, że AI stanie się dobrem wspólnym. Sprawdziłem, kto podpisał się pod tą obietnicą w 2026 roku, kto jej nie podpisał i co z tego wynika dla firmy, która buduje na cudzych API."
publishedAt: 2026-10-15
author: "Marcin Ołdak"
category: "edukacja"
tags: ["analiza"]
readingTime: 7
featured: false
draft: true
lang: "pl"
metaTitle: "Trzy wąskie gardła demokratyzacji AI — compute, wagi, kapitał"
metaDescription: "Otwarte wagi obiecują demokratyzację AI. Sprawdziłem, kto podpisał się pod tą obietnicą w 2026 roku, a kto nie — i co z tego wynika dla Twojej firmy."
keywords: ["otwarte wagi AI", "open weights", "demokratyzacja sztucznej inteligencji", "Anthropic IPO", "łańcuch dostaw AI", "centre danych"]
---

# Trzy wąskie gardła demokratyzacji AI

Film o tym, jak AI rozwiązała setki problemów matematycznych, kończy się zdaniem,
które nie jest o matematyce: **setki wyników, z których każdy kosztował około trzech
godzin obliczeń, powstało w modelu, którego nie masz** — „to duży klub, a my do niego
nie należymy". Autor nie prosi o litość. Prosi o otwarte wagi.

To jest najważniejsze zdanie całego filmu, bo odsłania, o czym tak naprawdę jest
rozmowa o „demokratyzacji AI". Nie jest ona o modelach. Jest o **trzech wąskich
gardłach**, które stoją przed każdym, kto chce zbudować coś własnego.

## Gardło pierwsze: compute

Żeby wytrenować model na poziomie frontier, potrzebujesz mocy obliczeniowej, która
dzisiaj jest towarem dostępnym w jednym miejscu. W listopadzie 2025 roku Anthropic
ogłosił zobowiązanie do **do jednego gigawata mocy obliczeniowej** na systemach
NVIDIA Grace Blackwell i Vera Rubin; tego samego dnia NVIDIA zobowiązała się
zainwestować w firmę **do 10 miliardów dolarów**, a Microsoft **do 5 miliardów**
(18.11.2025, blog Microsoftu).

Sam chip to dopiero początek. Ścieżka od piasku do centrum danych przechodzi przez
dwa punkty: **fabrykę na Tajwanie** i **maszyny litograficzne z Holandii**. Żadnego
z tych dwóch miejsc nie da się przyspieszyć ustawą.

Wniosek jest prosty: **moc obliczeniowa nie jest tanią surowością, tylko kartą
przejścia.** Firmy bez niej kupują dostęp — i za każdy razem płacą cudzą marżą.

## Gardło drugie: wagi

Tu robi się ciekawie, bo to jedyne z trzech gardeł, które da się otworzyć decyzją,
a nie kapitałem.

W lipcu 2026 roku **25 amerykańskich firm technologicznych** — w tym Microsoft, Meta,
NVIDIA, IBM i Palantir — opublikowało wspólny list do decydentów z apelem, by nie
ograniczać **otwartych wag (open-weight)**. Argumenty listu są praktyczne: otwarte
wagi poszerzają dostęp do gospodarki AI, wzmacniają konkurencję, dają klientom kontrolę
nad danymi i modelami, a także poprawiają bezpieczeństwo, bo **„opieranie się
wyłącznie na zamkniętych modelach nie jest z natury bezpieczne"** i skupianie
zaawansowanej AI w kilku laboratoriach tworzy punkty awarii (CNBC, 24.07.2026).

Podpisał się pod tym niemal każdy. **Pod listem nie podpisał się Anthropic**
(SmarterX, 28.07.2026) — ta sama spółka, która **w listopadzie 2026 roku idzie na
giełdę na Nasdaq z wyceną ponad 2 biliony dolarów** (Reuters, 28.09.2026;
przesunięcie na listopad: Motley Fool, 06.10.2026). Dla porównania: w maju 2026
roku jej wycena wynosiła 965 miliardów dolarów.

Nie ma w tym nic dramatycznego — jest w tym strategiczna spójność. Firma, która
sprzedaje dostęp do zamkniętego modelu, **nie może równocześnie opowiadać się za tym,
żeby dostęp był otwarty**. To nie jest hipokryzja, to jest model biznesowy.

Ważne jest co innego: **obietnica demokratyzacji nie jest testem technologicznym,
tylko testem podpisów.** Można ją sprawdzić w pięć minut, patrząc na listę, kto
podpisał.

## Gardło trzecie: kapitał

Trzecie gardło jest najtwardsze, bo dotyczy nie technologii, tylko tego, kto za nią
płaci i pod jakim warunkiem.

Wejście Anthropic na giełdę oznacza, że firma z **klauzulą public benefit
corporation** — deklaracją, że promuje „odpowiedzialny rozwój zaawansowanej AI
w długoterminowym dobru ludzkości" — od tego momentu rozlicza się z **akcjonariuszy**.
A w Delaware pytanie o ten benefit może wnieść wyłącznie akcjonariusz.

To zmienia sens każdej deklaracji o „spowolnieniu wyścigu". Firma, której wycena
rośnie o ponad 100 procent w pięć miesięcy, **nie spowalnia — ona przyspiesza, bo
właśnie za to płaci pieniądz, który zebrała**.

## Co z tego wynika dla firmy, która buduje na cudzych API

Po polsku i bez otoczki: **każda firma software'owa korzystająca dziś z modeli
frontierowych stoi w tych samych trzech gardłach, tylko że czyjeś.**

- Kupujesz **compute** w cenie subskrypcji — czyjeś wąskie gardło.
- Kupujesz **wagi** w cenie API — czyjeś wąskie gardło, otwierane decyzją dostawcy,
  nie Twoją.
- Kupujesz **dostęp** za kapitał, który nie jest Twój — czyjeś wąskie gardło.

To nie jest powód, żeby przestać używać AI. To jest powód, żeby wiedzieć, **które
z tych trzech rzeczy masz własne**. Model, na którym pracujesz, możesz wymienić w tydzień.
Dane, proces i umiejętność zbudowania czegoś na otwartych wagach — wymieniają się
znacznie wolniej.

Rynek już to widzi. Puls Biznesu opisuje spadek wycen polskich software house'ów
sformułowaniem, które pasuje do tego tekstu jak ulał: **„moc wytwórcza to już
przeszłość"** — inwestorzy nie chcą już płacić za wynajem czasu programistów, tylko
za niszę. RevenueBase naliczył we wrześniu 2026 roku **76 firm programistycznych
zasilanych AI z siedzibą w Warszawie** i publikuje listę 25 największych.

Wszystkie one stoją w tych samych trzech gardłach.

## Nasze zdanie

Pytanie „czy AI jest niebezpieczna" jest źle postawione — prowadzi do rozmowy o
prognozach, których nikt nie potrafi zweryfikować. Prawidłowe pytanie brzmi:
**co jest Twoje, a co kupujesz cudze, i na jak długo.**

Demokratyzacja nie przyjdzie z deklaracji. Przyjdzie — jeśli w ogóle — z jednej
rzeczy, którą da się policzyć: **ile systemów działa dzisiaj na wagach, które możesz
pobrać i uruchomić sam, bez pytania nikogo o zgodę.**

Ta liczba jest jedyną uczciwą miarą tego, czy słowo „demokratyzacja" cokolwiek znaczy.

---

**Źródła:** blog Microsoftu, 18.11.2025 (partnerstwo Microsoft/NVIDIA/Anthropic,
1 GW, 10 i 5 mld USD) · CNBC, 24.07.2026 (list 25 firm za otwartymi wagami) ·
SmarterX, 28.07.2026 (brak podpisu Anthropic) · Reuters, 28.09.2026 (prospekt IPO,
wycena >2 bln USD, 965 mld USD w maju 2026) · Motley Fool/Yahoo, 06.10.2026
(przesunięcie IPO na listopad) · Puls Biznesu, 2026 (wyceny polskich software
house'ów) · RevenueBase, IX 2026 (76 firm AI w Warszawie) · Two Minute Papers,
13.10.2026 — materiał wtórny, twierdzenie „około 3 godziny obliczeń na wynik"
**niezweryfikowane**, nie używać jako liczby źródłowej.
