---
title: "Zbudowałem wyszukiwarkę po dokumentach, która nie zmyśla — oto jak"
slug: "wyszukiwarka-dokumentow-ktora-nie-zmysla"
cover: "/articles/covers/wyszukiwarka-dokumentow-ktora-nie-zmysla.png"
coverAlt: "Zbudowałem wyszukiwarkę po dokumentach, która nie zmyśla — oto jak — MJ.OLDAK"
excerpt: "RAG, który zamiast wymyślać odpowiedzi, pokazuje plik i linię, z której je wziął. Jak działa hybryda BM25 + embeddingi + RRF i dlaczego pojedyncza metoda zawodzi."
publishedAt: 2026-06-17
author: "Marcin Ołdak"
category: "case-study"
tags: ["build", "tutorial"]
readingTime: 6
featured: true
draft: false
lang: "pl"
translationKey: "docs-qa-rag"
metaTitle: "Wyszukiwarka po dokumentach, która nie zmyśla — RAG"
metaDescription: "Jak zbudowałem RAG z cytatami plik:linia: hybryda BM25 + embeddingi + RRF, walidacja cytatów w kodzie. Uczciwy wynik 9/9 i dlaczego pojedyncza metoda zawodzi."
keywords: ["RAG", "BM25", "embeddingi", "RRF", "wyszukiwanie semantyczne", "halucynacje AI", "asystent wiedzy"]
---

Zwykły chatbot zapytany o twoje dokumenty często wygląda na pewnego siebie i mówi coś, czego w dokumentach nie ma. Zbudowałem coś odwrotnego: zadajesz pytanie po polsku, dostajesz odpowiedź — i **dokładnie ten plik i tę linię, z której odpowiedź pochodzi**.

## O co chodzi

Wyobraź sobie **asystenta wiedzy**, który zna twoje dokumenty: regulacje, procedury wewnętrzne, umowy, dokumentację. Pytasz go normalnym językiem — "jaka jest procedura przy reklamacji powyżej 5 tysięcy?" — a on nie tylko odpowiada, ale pokazuje, **skąd to wie**: nazwa pliku, konkretne linie.

To różnica między "ufaj mi na słowo" a "sprawdź sobie sam". W biurze rachunkowym czy w banku to nie jest detal — to warunek, żeby w ogóle używać takiego narzędzia. Jak odpowiedź dotyczy terminu podatkowego albo zapisu w umowie, nikt nie zaryzykuje decyzji na podstawie tekstu, którego nie da się zweryfikować. Cytat **plik:linia** zamienia "ładnie brzmiącą odpowiedź" w coś, co możesz kliknąć i przeczytać u źródła.

## Pod maską

Pod spodem siedzą dwa różne sposoby szukania, które zwykle stawia się przeciwko sobie. U mnie pracują razem.

- **BM25** to wyszukiwanie **leksykalne** — po słowach. Świetne, gdy w pytaniu pada rzadki, konkretny token: numer artykułu, nazwa pola, symbol. Gubi się, gdy zapytasz o to samo innymi słowami.
- **Embeddingi** to wyszukiwanie **semantyczne** — po znaczeniu. Lokalny model (`nomic-embed-text-v1.5`, odpalany przez LM Studio) zamienia tekst na **wektor 768 liczb — współrzędne jego znaczenia** (podobne znaczenie → podobne liczby, leżą blisko siebie), więc parafraza dalej trafia w sedno. Za to potrafi przeoczyć rzadkie, dosłowne słowo, którego "znaczeniowo" nie czuje.

Każda metoda zwraca własny ranking. Łączę je przez **RRF (Reciprocal Rank Fusion)** — fuzję rang, która nie potrzebuje porównywalnych "wyników punktowych", tylko pozycji na obu listach. Fragment, który jest wysoko u jednej albo u drugiej metody, ląduje wysoko w finalnym wyniku.

```text
pytanie
  ├──> BM25 (po słowach)      ──> ranking A
  └──> embeddingi (po sensie) ──> ranking B
                 │
                 └──> RRF (fuzja rang) ──> top fragmenty
                                │
                                └──> odpowiedź + cytat plik:linia
```

Kluczowy detal, przez który to się nie zmyśla: **cytat jest walidowany w kodzie, nie obiecany przez model.** W trybie asystenta model pisze odpowiedź naturalnym językiem, ale przypisany cytat program sprawdza programatycznie — czy ten plik i te linie faktycznie istnieją i zawierają to, na co się powołuje. Jest też tryb **ekstraktywny**, który w ogóle nie generuje prozy, tylko zwraca dosłowne fragmenty.

Całość jest zaprojektowana na **degradację zamiast wywrotki**: jak padną embeddingi, schodzi na sam BM25; jak padnie LLM, schodzi na tryb ekstraktywny — i każdy taki spadek jest **adnotowany**, żebyś wiedział, w jakim trybie dostałeś odpowiedź. Bez zewnętrznych zależności (czysta biblioteka standardowa), licencja MIT.

## Co z tego masz

Najważniejsza i najbardziej uczciwa rzecz: **hybryda nie "zawsze wygrywa".** Nie o to chodzi. Chodzi o **odporność**.

Na zestawie testowym całość trafiła w **9/9 zapytań w top-k**. Ciekawe jest *dlaczego*: samo BM25 raz gubiło parafrazę (pytanie sformułowane innymi słowami niż dokument), same embeddingi raz gubiły rzadki token (dosłowne, nietypowe słowo). Żadna pojedyncza metoda nie była bezbłędna. Dopiero **RRF trzymał oba przypadki w top-k** — bo wystarczyło, że jeden z dwóch silników złapał fragment.

Wniosek, jak budujesz RAG na produkcję: nie wybieraj "lepszej" metody. Łącz **słowa + znaczenie**, miej **zestaw pytań testowych** odzwierciedlający realne zapytania i **mierz** trafienia. Inaczej trafisz na dzień, w którym twój jedyny silnik akurat zgubi pytanie, którego nie przewidziałeś.

## Dowód

Kod jest publiczny: [github.com/martin0ne/docs-qa](https://github.com/martin0ne/docs-qa). Nie powstał "na czuja" — najpierw specyfikacja, potem adversarialny review (celowe szukanie dziur w założeniach), a implementacja w stylu TDD: **47 testów**, które pilnują m.in. tego, że walidacja cytatów faktycznie odrzuca cytat, którego nie ma w źródle.

Jeśli zastanawiasz się, *dlaczego* chatboty w ogóle zmyślają i co RAG ma z tym wspólnego — wyjaśniam to bez żargonu w osobnym tekście: [czemu chatboty zmyślają](/artykuly/czemu-chatbot-zmysla-rag/).
