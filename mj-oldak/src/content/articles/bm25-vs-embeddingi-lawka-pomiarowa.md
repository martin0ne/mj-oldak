---
title: "BM25 kontra embeddingi: mała ławka, która pokazuje, że semantyka bywa krucha"
slug: "bm25-vs-embeddingi-lawka-pomiarowa"
cover: "/articles/covers/bm25-vs-embeddingi-lawka-pomiarowa.png"
coverAlt: "BM25 kontra embeddingi: mała ławka, która pokazuje, że semantyka bywa krucha — MJ.OLDAK"
excerpt: "Embeddingi rozumieją znaczenie, więc zawsze wygrywają z wyszukiwaniem po słowach? Zbudowałem ławkę pomiarową, która pokazuje czarno na białym, że to nieprawda — i kiedy semantyka pada."
publishedAt: 2026-06-17
author: "Marcin Ołdak"
category: "case-study"
tags: ["build", "tutorial"]
readingTime: 6
featured: false
draft: false
lang: "pl"
translationKey: "bm25-vs-embeddings"
metaTitle: "BM25 vs embeddingi — ławka pomiarowa retrievalu RAG"
metaDescription: "Zbudowałem ławkę BM25 vs embeddingi na jednym korpusie. Wynik: semantyka bywa krucha — na rzadkim kodzie spudłowała całkowicie. Produkcja = hybryda + pomiar."
keywords: ["BM25", "embeddingi", "RAG", "wyszukiwanie semantyczne", "retrieval", "nomic-embed", "ławka pomiarowa", "hybryda retrievalu"]
faq:
  - q: "Czym jest ławka pomiarowa BM25 vs embeddingi?"
    a: "To ławka porównawcza, nie produkt — stawia BM25 (wyszukiwanie po słowach) przeciw embeddingom (wyszukiwanie po znaczeniu) na jednym wspólnym korpusie i 9 pytaniach testowych, a dla każdego pytania wystawia werdykt: kto trafił lepiej, czy remis. Kod jest publiczny na licencji MIT, napisany w czystym Pythonie bez zależności."
  - q: "Czym różni się BM25 od embeddingów?"
    a: "BM25 to wyszukiwanie leksykalne, po słowach — świetne na rzadki, konkretny token: kod, symbol, nazwę pola. Embeddingi to wyszukiwanie semantyczne, po znaczeniu — tekst jest zamieniany na wektory, więc parafraza dalej trafia w sedno."
  - q: "Czy embeddingi zawsze wygrywają z wyszukiwaniem po słowach?"
    a: "Nie — to mit. Na zapytaniu o rzadki kod WIS embeddingi nie wciągnęły właściwego dokumentu nawet do top-3, a BM25 dał go na 1. miejscu: rzadki token o wysokim IDF tonie w gęstym klastrze dokumentów o stawkach, bo embeddingi rozkładają podobieństwo po całym klastrze i gubią cel."
  - q: "Kiedy embeddingi wygrywają z BM25?"
    a: "Przy parafrazach, które nie dzielą słów kluczowych z dokumentem. W ławce pytanie „pismo zmieniające wartość transakcji gdy klient oddał produkt” nie miało wspólnych słów z dokumentem o fakturze korygującej — BM25 nie trafił wcale, a embeddingi złapały sens i dały dokument w top-3."
  - q: "Jakie wyniki dała ławka BM25 vs embeddingi?"
    a: "Na 9 zapytaniach (top-k=3, lokalny model nomic-embed-text-v1.5) wyszło: 6 remisów, 1 wygrana BM25 i 2 wygrane embeddingów. Najczęściej obie metody radzą sobie tak samo — ciekawie robi się dopiero na skrajach."
  - q: "Czego użyć w produkcyjnym RAG — BM25 czy embeddingów?"
    a: "Hybrydy: łącz słowa i znaczenie, dołóż zestaw pytań testowych i mierz na realnym korpusie. Embeddingi są mocne, ale kruche i zależne od sformułowania — opłacają się tam, gdzie użytkownicy mówią różnym językiem, a nie tam, gdzie liczy się twardy, unikalny kod."
---

Powszechny mit brzmi: "embeddingi rozumieją znaczenie, więc zawsze biją wyszukiwanie po słowach". Zbudowałem małą ławkę pomiarową, która stawia BM25 (słowa) przeciw embeddingom (znaczenie) na jednym korpusie — i na zapytaniu o rzadki kod **WIS** embeddingi spudłowały całkowicie, podczas gdy BM25 trafił od razu w punkt.

## O co chodzi

To nie jest produkt — to **ławka porównawcza**. Bierze dwa sposoby szukania, jeden wspólny korpus i 9 pytań testowych, a potem dla każdego pytania wystawia werdykt: kto trafił lepiej — BM25, embeddingi, czy remis.

Dwie metody, które zwykle stawia się przeciwko sobie:

- **BM25** — wyszukiwanie **leksykalne**, po słowach. Świetne na rzadki, konkretny token: kod, symbol, nazwę pola.
- **Embeddingi** — wyszukiwanie **semantyczne**, po znaczeniu. Tekst zamieniany na wektory, więc parafraza dalej trafia w sedno.

Cały kod to czysty Python (biblioteka standardowa), zero zależności — bez numpy, bez SDK. Embeddingi liczone są **lokalnie** przez LM Studio (przez `urllib`), więc dane nie wychodzą z maszyny i koszt to 0 PLN. Korpus jest syntetyczny i bez danych osobowych: 12 krótkich dokumentów o tematyce księgowej (JPK_V7, KSeF, VAT, ZUS, CIT, korekty faktur, WIS, stawki), pociętych na 23 fragmenty. Zbiór testowy to 9 zapytań — 5 z twardymi terminami ("exact") i 4 parafrazy — każde z oczekiwanym plikiem docelowym.

Żeby porównanie było **uczciwe**, oba retrievale tną korpus identycznie: tym samym modułem chunkującym, dzielącym po nagłówkach z limitem 50 linii / 450 słów i z provenance (plik + zakres linii). Jak nie zrównasz wejścia, mierzysz przypadek, nie metodę.

## Pod maską

**BM25** to własna implementacja (k1=1.5, b=0.75) z jednym uproszczeniem pod polską fleksję: rozszerzaniem terminów po wspólnym prefiksie minimum 5 znaków. To świadomie nie jest pełny stemmer — tania heurystyka, jawnie oznaczona w kodzie jako uproszczenie.

**Embeddingi** liczy lokalny model `nomic-embed-text-v1.5` (768 wymiarów). Podobieństwo kosinusowe napisałem od zera, czystym Pythonem, bez numpy. Jest tu pułapka, którą łatwo przegapić: nomic wymaga **prefiksów zadania** — dokumenty embedować trzeba z przedrostkiem `search_document: `, a zapytania z `search_query: `. Bez tego jakość retrievalu spada; w kodzie jest to obsłużone i opisane jako "gotcha".

Wektory są cache'owane na dysku z manifestem opartym na hashu treści fragmentu — każda zmiana korpusu (granic albo treści) unieważnia cache i wymusza ponowne policzenie. Jest też tryb offline (`EMBED_MOCK=1`): deterministyczne pseudo-wektory z hasha SHA1, **jawnie oznaczone jako NIE-semantyczne**, tylko do przetestowania pipeline'u bez LM Studio — a raport w tym trybie dostaje wyraźne ostrzeżenie, żeby nie brać go za realny wynik.

Harness mierzy dla każdego pytania **rank** oczekiwanego dokumentu w top-k obu metod i wystawia werdykt:

```text
pytanie ──┬──> BM25 (po słowach)      ──> rank oczekiwanego dokumentu
          └──> embeddingi (po sensie) ──> rank oczekiwanego dokumentu
                         │
                         └──> werdykt: BM25 / embeddingi / remis / oba pudłują
```

## Co z tego wynika

Realny przebieg (top-k=3, `nomic-embed-text-v1.5`) na 9 zapytaniach: **6 remisów, 1 wygrana BM25, 2 wygrane embeddingów**. Czyli najczęściej obie metody radzą sobie tak samo — ciekawie robi się na skrajach.

**Kiedy embeddingi padają.** Zapytanie "WIS stawka podatku dla towaru lub usługi": embeddingi nie wciągnęły właściwego dokumentu nawet do top-3 (rank = None), a BM25 dał go na 1. miejscu. Mechanizm jest jawnie zdiagnozowany: rzadki kod o wysokim IDF (WIS) tonie w gęstym klastrze kilku dokumentów o stawkach. Embeddingi rozkładają podobieństwo po całym klastrze i gubią target — BM25 wyłapuje rzadki token bez mrugnięcia.

**Kiedy embeddingi wygrywają.** Parafraza, która nie dzieli słów kluczowych z dokumentem: "pismo zmieniające wartość transakcji gdy klient oddał produkt" → dokument o fakturze korygującej. Tu BM25 ma rank None (brak wspólnych słów = brak trafienia), a embeddingi łapią sens i dają dokument w top-3.

To jest cała pointa tej ławki: embeddingi są mocne, ale **kruche i zależne od sformułowania**. Semantyka opłaca się tam, gdzie użytkownicy mówią różnym językiem — a nie tam, gdzie liczy się twardy, unikalny kod. Wniosek na produkcję jest więc nie "doklej embeddingi", tylko: **hybryda (słowa + znaczenie) + zestaw pytań testowych + pomiar na realnym korpusie**. Ławka uczy dokładnie tego osądu — kiedy semantyka jest warta zachodu, a kiedy BM25 wystarczy.

Jest jeszcze sygnał skalowania zapisany wprost w kodzie: kosinus liczę brute-force po wszystkich wektorach, co przy setkach fragmentów jest banalnie szybkie. Realna baza wektorowa z indeksem ANN (FAISS / Chroma / sqlite-vec) zaczyna się opłacać od kilkudziesięciu tysięcy wektorów w górę, a przy setkach tysięcy staje się praktycznie konieczna — i tu interfejs jest tak wydzielony, że podmiana składnicy nie rusza reszty. To rekomendacja projektowa, nie zmierzony benchmark.

## Dowód

Kod jest publiczny, licencja MIT: [github.com/martin0ne/rag-lexical-vs-semantic](https://github.com/martin0ne/rag-lexical-vs-semantic). Nie powstał "na czuja" — repo ma **19 testów** (unittest) pokrywających chunking, BM25, embeddingi (unit + indeks + smoke test na żywo), korpus i sam harness; test live jest automatycznie pomijany, gdy LM Studio jest offline. Korpus nie zawiera danych osobowych, commity idą z adresu noreply, a `.gitignore` wycina cache i śmieci.

Odpalisz to w dwóch trybach: `EMBED_MOCK=1 python3 compare.py` działa offline (ale to NIE-semantyczny atrapowy wynik), a realną tezę zobaczysz dopiero z włączonym LM Studio.

Ta ławka to soczewka, nie produkt. Jeśli chcesz zobaczyć, jak ten wniosek — "łącz słowa i znaczenie" — wygląda już wdrożony w działającym asystencie z cytatami plik:linia, opisałem cały build osobno: [jak zbudowałem wyszukiwarkę po dokumentach, która nie zmyśla](/artykuly/wyszukiwarka-dokumentow-ktora-nie-zmysla/). A jeśli interesuje cię, *czemu* w ogóle warto uziemiać model w źródle: [czemu chatbot zmyśla i co RAG ma z tym wspólnego](/artykuly/czemu-chatbot-zmysla-rag/).
