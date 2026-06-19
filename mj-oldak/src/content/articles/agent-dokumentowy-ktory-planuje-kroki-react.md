---
title: "Agent dokumentowy, który sam planuje, czego szukać i co czytać (ReAct)"
slug: "agent-dokumentowy-ktory-planuje-kroki-react"
cover: "/articles/covers/agent-dokumentowy-ktory-planuje-kroki-react.png"
coverAlt: "Agent dokumentowy, który sam planuje, czego szukać i co czytać (ReAct) — MJ.OLDAK"
excerpt: "Zwykły RAG szuka raz i odpowiada. agent-flow działa w pętli myśl→narzędzie→obserwacja: sam decyduje, czego szukać i co przeczytać dalej, a każde twierdzenie w raporcie ma cytat plik:linia. Plus bramka akceptacji dla człowieka."
publishedAt: 2026-06-17
author: "Marcin Ołdak"
category: "case-study"
tags: ["build", "tutorial"]
readingTime: 7
featured: false
draft: false
lang: "pl"
translationKey: "agent-flow-react"
metaTitle: "Agent dokumentowy ReAct, który sam planuje kroki"
metaDescription: "agent-flow: wieloetapowy agent ReAct nad folderem dokumentów. Sam planuje wyszukiwanie i czytanie, cytuje plik:linia, ma bramkę akceptacji dla człowieka."
keywords: ["agent AI", "ReAct", "agentic AI", "RAG", "BM25", "cytaty plik:linia", "human-in-the-loop", "agent dokumentowy"]
---

Zwykły RAG w podstawowej postaci robi jedno: szuka raz i odpowiada. Agentowy workflow daje modelowi coś więcej — pozwala mu **samemu zaplanować kolejne kroki**. `agent-flow` jest tym drugim: pętla ReAct (myśl→narzędzie→obserwacja) nad folderem dokumentów, na końcu raport, w którym **każde twierdzenie ma cytat plik:linia** — plus bramka, na której człowiek może zatwierdzić każde wywołanie narzędzia.

Najkrócej, co on robi: pytasz „jaka jest ścieżka akceptacji faktury powyżej progu?", a agent **sam** przeszukuje folder, czyta właściwe pliki i składa odpowiedź z cytatami — zamiast strzelać z jednego zapytania. I tak, używa prawdziwego modelu AI (domyślnie Claude) — to nie jest „agent bez AI".

## O co chodzi

Wyobraź sobie agenta, który dostaje pytanie i folder z dokumentami, ale **nie odpowiada od razu**. Najpierw się zastanawia, potem wybiera narzędzie (np. „przeszukaj dokumenty"), patrzy na wynik, znowu się zastanawia — i tak w kółko, aż uzna, że ma dość, żeby napisać raport. To jest **ReAct**: think → pick a tool → observe → repeat → report. Różnica wobec zwykłego RAG-a jest taka, że tu agent **sam decyduje**, czego szukać i co przeczytać dalej, a nie jedzie po sztywnym pipelinie.

To nie jest demo akademickie. Cały agent to **jeden plik Pythona** (`agent.py`, 225 linii) plus moduł wyszukiwania (`retrieval.py`, 115 linii) — czysta biblioteka standardowa, **zero frameworka agentowego**. Da się przeczytać w kilkanaście minut i zrozumieć dokładnie, co się dzieje na każdym kroku. Backend LLM jest wymienny: agent po prostu woła dowolne CLI, które czyta prompt ze standardowego wejścia i zwraca odpowiedź (ustawiasz to zmienną `AGENTFLOW_LLM_CMD`, domyślnie `claude -p`).

W repo jest gotowy przykład: pytanie o akceptację faktury nad korpusem 3 plików. Agent listuje pliki, raz przeszukuje, kończy — i cytuje **dwa pliki polityki naraz**, bo pełna odpowiedź wymagała połączenia dwóch źródeł: ścieżki akceptacji z `invoicing-policy.md` i progów kwotowych z `delegation-matrix.md`. Agent sam uznał, że potrzebuje obu, i pokazał oba źródła.

## Pod maską

Agent ma do dyspozycji dokładnie **cztery akcje**: `list_files`, `search_docs`, `read_file` i `finish`. `finish` to jedyny sposób, żeby zakończyć pętlę. Kontrakt z modelem jest prosty: na każdym kroku model zwraca **jeden obiekt JSON** w formie `{"thought", "action", "args"}`, a agent parsuje pierwszy poprawny JSON z kluczem `action` i odpala odpowiednie narzędzie.

```text
pytanie + folder dokumentów
        │
        ▼
   ┌─────────────────────────────┐
   │  myśl (thought)             │ ◄──┐
   │  wybór akcji (action+args)  │    │
   └──────────────┬──────────────┘    │
                  ▼                    │
   list_files / search_docs / read_file
                  │                    │
                  ▼                    │
        obserwacja (wynik) ───────────┘
                  │
                  ▼  (gdy agent uzna, że ma dość)
              finish → raport z cytatami plik:linia + sekcja "## Sources"
```

**Wyszukiwanie** to leksykalne **BM25** (k1=1.5, b=0.75) nad indeksem w pamięci — bez embeddingów, bez zewnętrznych zależności. Z jednym smaczkiem pod języki fleksyjne: scorer ma dopasowanie po wspólnym prefiksie (≥5 znaków, w obie strony), żeby tanio tolerować odmianę słów — zrobione z myślą o polskim. `search_docs` zwraca fragmenty otagowane jako `plik:start-end`, a każdy taki cytat ląduje w zbiorze cytowań — to jest fundament uziemienia.

Bo grounding nie jest tu „obietnicą", tylko **regułą wymuszoną w prompcie**: cytuj każde twierdzenie jako `(plik:start-end)`, nigdy nie wymyślaj, powiedz wprost, gdy korpus nie zawiera odpowiedzi, i zakończ raport sekcją `## Sources`.

Do tego warstwa bezpieczeństwa i odporności:

- **`read_file` w piaskownicy** — rozwija ścieżkę do absolutnej i zwraca `DENIED`, gdy plik jest poza folderem korpusu. Nie da się nim wyjść poza dokumenty.
- **Budżet kroków** — domyślnie 8 kroków, plus jeden zarezerwowany, żeby przy wyczerpaniu budżetu **wymusić** finalny raport. Pętla nie może się zapętlić w nieskończoność.
- **Naprawa zepsutego JSON-a** — jeśli model zwróci coś nieparsowalnego, jest jedna próba naprawy. Jak dalej nie da rady, run pada z `model kept returning unparseable output`.
- **Limity długości** — obserwacje wpychane z powrotem do modelu są ucinane powyżej 6000 znaków, a pojedynczy odczyt pliku jest ograniczony do 200 linii.

I część, która z tego robi narzędzie do realnej pracy — **bramka akceptacji** (`--approve`). Zatrzymuje agenta **przed każdym wywołaniem narzędzia** (nie przed `finish`). Recenzent może zatwierdzić, wyjść albo odrzucić z komentarzem — a ten komentarz wraca do agenta jako obserwacja, czyli **steruje jego następnym krokiem**. To dokładnie ten wzorzec „AI proponuje, człowiek podpisuje", którego używam w produkcyjnych narzędziach do księgowości.

## Co z tego masz

To, co ten projekt pokazuje wprost, to **agentowa orkiestracja, którą da się przeczytać**: planowanie kroków, dispatch narzędzi, reguły uziemienia i human-in-the-loop — wszystko w dwóch plikach standardowej biblioteki. Dla rekrutera pod „agentic AI" to widoczny dowód, że rozumiem, czym agent różni się od pojedynczego zapytania do modelu. Dla firmy — to wzorzec, w którym automat nie podejmuje decyzji za człowieka, tylko przygotowuje robotę do podpisu.

Najuczciwsza rzecz: **zakres jest świadomie wąski**. Jeden agent, narzędzia po kolei. **Orkiestracja wielu agentów jest celowo poza zakresem** tego repo — i tak to opisałem. To nie brak, to decyzja: mały, czytelny artefakt zamiast frameworka, którego nikt nie przejrzy.

Da się też **przetestować bez dostępu do API** — to tryb **wyłącznie testowy, a nie sposób, w jaki agent normalnie działa** (w realnym użyciu woła prawdziwy model). Repo ma deterministyczny mock LLM, który odtwarza ustaloną sekwencję ReAct (`search_docs` → `read_file` → `finish`), więc całą pętlę odpala się w CI bez ani jednego wywołania modelu. Pięć testów pilnuje: provenance wyszukiwania, uczciwości przy braku trafień, odmowy wyjścia poza korpus, odczytu w korpusie i pełnej pętli agenta na mocku.

## Dowód

Kod jest publiczny: [github.com/martin0ne/agent-flow](https://github.com/martin0ne/agent-flow), licencja MIT. Wymaga Pythona 3.9+ i dowolnego CLI do LLM (domyślnie Claude Code CLI, `claude -p`).

Najszybciej zobaczysz to tak: odtwórz przykład z `examples/sample-docs` i porównaj z zacommitowanym `examples/sample-report.md` oraz pełnym śladem kroków w `examples/sample-trace.json` — tam widać czarno na białym, że agent sam wybrał, co robić na każdym kroku (krok 1 `list_files`, krok 2 `search_docs`, krok 3 `finish`). Potem odpal pięć testów: `python3 -m unittest discover tests -v`. A backend zmienisz jedną zmienną środowiskową (`AGENTFLOW_LLM_CMD`) — na lokalny model albo na deterministyczny mock.

Jeśli chcesz najpierw zrozumieć warstwę pod spodem — samo wyszukiwanie z cytatami plik:linia, na którym stoi grounding — opisałem osobny build krok po kroku: [wyszukiwarka po dokumentach, która nie zmyśla](/artykuly/wyszukiwarka-dokumentow-ktora-nie-zmysla/). To osobne repo; `agent-flow` jest warstwą wyżej — planowaniem kroków, a nie pojedynczym wywołaniem retrievalu.
