---
title: "Czemu twój chatbot zmyśla (i co RAG ma z tym wspólnego)"
slug: "czemu-chatbot-zmysla-rag"
cover: "/articles/covers/czemu-chatbot-zmysla-rag.png"
coverAlt: "Czemu twój chatbot zmyśla (i co RAG ma z tym wspólnego) — MJ.OLDAK"
excerpt: "Chatbot nie kłamie — generuje najbardziej prawdopodobny tekst, a nie prawdę. Po ludzku o halucynacjach i o tym, jak RAG je ogranicza, doklejając źródła zanim model odpowie."
publishedAt: 2026-06-17
author: "Marcin Ołdak"
category: "edukacja"
tags: ["tutorial"]
readingTime: 5
featured: false
draft: false
lang: "pl"
translationKey: "chatbot-hallucination-rag"
metaTitle: "Czemu chatbot zmyśla — halucynacje i RAG po ludzku"
metaDescription: "Dlaczego chatboty AI zmyślają i czym jest halucynacja — bez żargonu. Jak RAG ogranicza zmyślanie, doklejając źródła zanim model odpowie. Z realnego buildu."
keywords: ["halucynacje AI", "czemu chatbot zmyśla", "RAG", "co to jest RAG", "chatbot AI", "grounding"]
---

Każdy, kto chwilę pobawił się chatbotem, widział to samo: pewna siebie, gładka odpowiedź — i kompletna bzdura. Wymyślony przepis, nieistniejący artykuł ustawy, książka, której nikt nie napisał. To nie jest błąd, który "naprawią w następnej wersji". To wynika z tego, **jak ten model w ogóle działa** — i właśnie dlatego da się to ograniczyć.

## Skąd się bierze zmyślanie

Model językowy nie ma w środku bazy faktów, którą sprawdza. Robi jedną rzecz: **przewiduje najbardziej prawdopodobne następne słowo**, potem kolejne, i kolejne. Uczył się tego na ogromnej ilości tekstu, więc te przewidywania zwykle brzmią sensownie. Ale "brzmi sensownie" to nie to samo co "jest prawdą".

Stąd fachowa nazwa: **halucynacja**. Model nie kłamie w ludzkim sensie — on nawet nie wie, że coś zmyśla. Po prostu wygenerował tekst, który **statystycznie pasuje**, a tak się złożyło, że treść jest nieprawdziwa.

Najlepiej widać to przy szczegółach. Zapytaj o dokładny numer paragrafu, datę albo cytat — czyli o rzecz, której nie da się "zgadnąć ze stylu". Model i tak coś poda, bo jego zadaniem jest dokończyć zdanie, a nie odpowiedzieć "nie wiem". I to "coś" wygląda dokładnie tak samo pewnie jak prawdziwa odpowiedź.

Praktyczny przykład: pytasz o termin złożenia jakiejś deklaracji. Prawidłowa data i data zmyślona brzmią identycznie — obie to po prostu "dzień miesiąca". Model nie ma sygnału, który by go zatrzymał na złej; po prostu wybiera tę, która statystycznie pasuje do reszty zdania. Dlatego nie da się "poznać po tonie", czy odpowiedź jest prawdziwa. Pewność modelu nie mówi nic o jego trafności — i to jest sedno problemu, gdy stawką jest decyzja klienta albo zapis w umowie.

## Co robi RAG

**RAG** (z angielskiego *retrieval-augmented generation*) to prosty pomysł na obejście tego problemu: zanim każesz modelowi odpowiedzieć, **najpierw znajdź odpowiednie fragmenty źródeł** — w twoich dokumentach, bazie wiedzy, regulacjach — i **doklej mu je do pytania**. Potem mówisz: odpowiedz **tylko na podstawie tego, co dostałeś**.

To po angielsku nazywa się **grounding** — "uziemienie" odpowiedzi w realnym tekście, zamiast w pamięci modelu.

Analogia: to różnica między egzaminem **z pamięci** a egzaminem **z otwartą książką**. Z pamięci student powie cokolwiek, byle pewnie. Z otwartą książką ma przed sobą konkretny fragment i odpowiada z niego. RAG zamienia chatbota z pierwszego trybu w drugi.

Ma to dwie konsekwencje, które robią różnicę w praktyce. Po pierwsze, model opiera odpowiedź przede wszystkim na **twoich** dokumentach, a nie na ogólnej wiedzy z internetu — więc może znać twoje procedury, których nigdzie indziej nie ma. Po drugie, skoro odpowiedź pochodzi z konkretnego fragmentu, da się **pokazać, z którego** — a to znaczy, że da się ją sprawdzić, zamiast brać na słowo.

## Czemu to nie magia

Tylko uwaga — to nie jest czarodziejska różdżka. RAG **przesuwa** problem, nie kasuje go.

Bo jakość odpowiedzi jest **dokładnie tak dobra, jak jakość znalezionych fragmentów**. Jak system doklei modelowi nie ten fragment co trzeba — albo nie znajdzie nic sensownego — to model dalej zmyśli, tyle że teraz "z otwartą, ale złą książką". Cały ciężar przenosi się więc na **retrieval**: jak właściwie szukasz w tych dokumentach.

A szukać można po **słowach** (dosłowne dopasowanie) albo po **znaczeniu** (parafraza, synonim). Każde z osobna ma dziury: szukanie po słowach gubi pytanie zadane innymi słowami niż dokument, a szukanie po znaczeniu potrafi przeoczyć rzadki, dosłowny termin — numer, symbol, nazwę pola. To dlatego dobry RAG nie wybiera jednej metody, tylko je łączy — i mierzy na realnych pytaniach, czy faktycznie znajduje to, co trzeba.

Innymi słowy: RAG nie kasuje halucynacji magicznie. Daje ci za to dwie dźwignie, których goły chatbot nie ma — **uziemienie w źródle** i **możliwość weryfikacji** — pod warunkiem, że dobrze rozwiążesz wyszukiwanie.

## Dalej

Jeśli chcesz zobaczyć, jak to wygląda w praktyce — z odpowiedziami, które pokazują **konkretny plik i linię** źródła, i z uczciwym wynikiem, gdzie pojedyncza metoda zawodzi — opisałem cały build krok po kroku: [jak zbudowałem taki RAG z cytatami plik:linia](/artykuly/wyszukiwarka-dokumentow-ktora-nie-zmysla/).
