# DRAFT dopisu toru Data Engineering do profilu idealnego kandydata (PLINIUS-2) — noc 2026-11-09

**Status:** DRAFT — NIE aplikowane do profilu, decyzja Marcin rano. Zero wysyłek w tej sesji.

**Źródła prawd liczb:**
- korpus ofert: `~/Desktop/Aplikacje-CV/2026-11-09-SCRAPING/oferty-scoring.json` (scraping 09.11, `~/.hermes/cache/scratch/scrape-run-2026-11-09.py`; źródła himalayas 133 + jobicy 33)
- drafty case'ów: `docs/.review/NOC-2026-11-09-cato-casestudy-drafts.md` (CATO-2, tej samej nocy)
- standardy: `Atomic/AI-wiki/projects/Agencja AI/research/2026-11-09 — EVAL-DR2-metodyka-dowod.md`
- profil bazowy: `Atomic/AI-wiki/projects/Rekrutacja/profil-idealnego-kandydata.md` (v1, 12.06.2026)
- klasyfikacja luk: skill `case-study-builder` (A strukturalne / B zamykane budowaniem / C do podciągnięcia)

**Metoda liczenia:** regex case-insensitive po `rola + opis` każdej oferty; metryka = **liczba ofert zawierających frazę** (nie suma wystąpień). Korpus ma **166 ofert, z czego 133 z treścią opisu** (33 jobicy mają tylko tytuł — nie wchodzą do licznika, frazy liczby są więc „z 133"). Żadna liczba poniżej nie pochodzi z pamięci; konteksty wysokich wyników zweryfikowane wycinkami tekstu.

---

## 1. Keywordy data-engineering w korpusie 166 ofert — TOP 15 z liczbami

| # | Keyword | Oferty z frazą | Udział (z 133 z treścią) | Uwaga uczciwościowa |
|--:|---|--:|--:|---|
| 1 | testy / CI-CD (testing, unit test, CI/CD) | 43 | 32,3% | wzorzec szeroki — obejmuje QA/software, nie tylko dane |
| 2 | dashboardy / wizualizacja / reporting | 37 | 27,8% | realne, rolach analitycznych |
| 3 | pipeline (każdy kontekst) | 23 | 17,3% | w tym sales/project pipeline; **ścisłe „data pipeline" = 2** |
| 4 | API (integracje) | 22 | 16,5% | realne, głównie integracje systemów |
| 5 | Python | 16 | 12,0% | realne |
| 6 | SQL | 10 | 7,5% | realne — zweryfikowane kontekstami (analizy, raportowanie) |
| 7 | bazy danych (database/PostgreSQL/MySQL) | 10 | 7,5% | nachodzi na SQL — czytać razem |
| 8 | governance (szerokie) | 22 | 16,5% | głównie compliance firmowy; data/AI governance ścisłe = 6 |
| 9 | cloud (Azure/AWS/GCP) | 9 | 6,8% | realne |
| 10 | Git / version control | 8 | 6,0% | realne |
| 11 | ML (machine learning) | 7 | 5,3% | realne |
| 12 | data quality | 6 | 4,5% | realne — wszystkie w rolach analitycznych |
| 13 | data modeling | 4 | 3,0% | realne |
| 14 | ETL + narzędzia DE (Airflow/dbt/Spark/Databricks/Snowflake/Kafka) | 3 | 2,3% | Airflow 1, dbt 1, Kafka 1, Snowflake 1, Databricks 1, Spark 0 |
| 15 | ETL (samo słowo) | 1 | 0,8% | — |

**Zera, które mówią najwięcej:** DuckDB **0**, Spark **0**, parquet **0**, data lake **0**, tytuł „data engineer" w korpusie **0** (analityk/analyst 9, business analyst 3, AI engineer 1).

**Korekta z weryfikacji kontekstów (ważna):**
- „reproducibility" — **0 realnych wystąpień**. 10 dopasowań to boilerplate ogłoszeń AI-trainerów/QA („capture reproducible error traces", „reproducible steps"). Słowo z DR2/metodyki NIE żyje w języku ogłoszeń; rynek mówi na to „testing", „CI/CD", „version control".
- „pipeline" — 23 na 133 brzmi mocno, ale to głównie „sales pipeline", „project pipeline", „CI pipeline", „agentic pipelines". Twarde „data pipeline" = **2 oferty**.

**Wniosek z korpusu (1):** korpus NIE jest próbką rynku data engineering — został pobrany zapytaniami pod AI/adopcję/automatyzację i pokazuje DE wyłącznie jako **wymaganie drugorzędne w rolach AI-core/analitycznych** (SQL 10, Python 16, data quality 6). Ofert data-flavored: **22** (13,3% korpusu; 2 po tytule, 20 po treści). Wniosek o częstotliwościach DE na rynku czystym trzeba brać z portali (sekcja 2), nie z tego korpusu.

## 2. Sygnał z portali (justjoin.it / nofluffjobs) — czy tor data wymaga innych kompetencji niż AI-core

Zgodnie z rozróżnieniem DR2: **publiczny sygnał rekrutacyjny, nie pomiar rynku.** Przejrzane realne ogłoszenia (09.11, wyszukiwarka — tytuły + full text wymagań):

- justjoin.it: Jit Team Data Engineer (Gdańsk, Java/Beam/BigQuery, SQL MySQL+BigQuery); emagine Data Engineer ×2 (Warszawa/Gdańsk — DWH, ETL SSIS/Snowflake, SQL T-SQL, Python, Airflow, CI/CD Bamboo/Jenkins, **3+ lata**; drugie: Snowflake/dbt/Airflow, **5+ lat**); SII Senior Data Engineer (GCP, BigQuery, Terraform, Docker/K8s, **5+ lat**); Itransition Middle DE (Python+data libs, ETL/ELT REST/GraphQL/dbt, Airflow, Snowflake, data quality i walidacja).
- nofluffjobs: XTB Data Engineer (MS SQL/SSIS, Spark/PySpark, GitLab, DWH modeling, data quality + monitoring + **pipeline reliability**, CI/CD, **3+ lata**); CodiLime Data Engineer (Python inżyniersko: typing, testable by construction, pytest, ETL/ELT produkcyjne „not just scripts or notebooks", Snowflake+dbt, Airflow, Docker/K8s/CI, Git, EN C1; stack zawiera **DuckDB**; wymaganie: **AI coding assistants — Claude Code/Cursor na co dzień**; nice-to-have: LLM/agentic AI); DS STREAM Data Engineer GCP (Spark, Airflow, dbt, BigQuery, CI/CD, **3+ lata**).

**Odpowiedź (2): TAK — tor data wymaga innego, cięższego inżyniersko zestawu.** Rdzeń czystego DE: SQL+Python zaawansowane, ETL/ELT produkcyjne, orkiestracja (Airflow/dbt), modelowanie DWH (Snowflake/BigQuery), Spark, chmura, CI/CD + dyscyplina testów, Docker/K8s/IaC, Git, EN B2-C1 — plus **staż 3+/5+ lat** w niemal każdej ofercie. Profil AI-core (LLM w praktyce, n8n, adopcja, stakeholder, translacja biznes-tech) pokrywa z tego **praktycznie nic** poza EN i komunikacją. Punkt styku, który się pojawia: CodiLime wymaga codziennej pracy z AI coding assistants i ma LLM/agentic jako nice-to-have — rola hybrydowa data+AI istnieje i to ona jest w lidze Marcina, nie czysty DE.

## 3. DRAFT sekcji „Tor Data" do profilu (do wklejenia — decyzja Marcin)

### 3.1 Cel toru — które role

Tor data celuje w **role hybrydowe AI+data w lidze mid**, nie w czystego Data Engineera:

- Analityk danych / Data Analyst z AI w rdzeniu (SQL + Python + dashboardy + automatyzacja),
- AI Business Analyst na danych (translacja dane-decyzja — Case B to dowód),
- AI Automation/Agentic Consultant z warstwą danych (pipeline'y, integracje API).

Czysty Data Engineer (portalowa liga: DWH/Spark/chmura/K8s, staż 3-5 lat) — **poza ligą docelową**; tam bariera stażu uderza najmocniej, a dowody bez produkcyjnej chmury nie konkurują.

### 3.2 Must-have toru — z częstotliwością

> Uwaga metodologiczna: częstotliwości z korpusu 166 ofert pobranego pod AI/adopcję — to **dolne ograniczenie** dla rynku analityczno-data; na portalach w rolach czysto data SQL/Python/ETL występują niemal zawsze (sygnał, nie pomiar). Kolejność wg siły sygnału w korpusie:

| Kompetencja | Jak częsta (korpus) | Sygnał portali |
|---|---|---|
| **Python (analiza, skrypty)** | 16/133 (12,0%) | w rolach data: niemal zawsze |
| **SQL** | 10/133 (7,5%) | w rolach data: niemal zawsze |
| **Dashboardy / wizualizacja / reporting** | 37/133 (27,8%) | częsta (Power BI/Tableau) |
| **Integracje API** | 22/133 (16,5%) | częsta |
| **Testy / CI-CD** | 43/133 (32,3%, szerokie) | w DE: dyscyplina testów jako must-have |
| **Data quality + rozliczanie odrzutów** | 6/133 (4,5%) | częsta jako „data quality, monitoring, reliability" |
| **Chmura (Azure/AWS/GCP)** | 9/133 (6,8%) | w DE: niemal zawsze |
| **Git / version control** | 8/133 (6,0%) | niemal zawsze |
| **Data modeling / DWH** | 4/133 (3,0%) | częsta |
| **Orkiestracja (Airflow/dbt/ETL)** | 3/133 (2,3%) | w DE: niemal zawsze |

### 3.3 Pokrycie istniejącymi case'ami

| Case | Pokrywa (keywordy z ofert) | Nie pokrywa |
|---|---|---|
| **A — taxi data-quality** (DuckDB, 9,55 mln wierszy) | SQL/DuckDB jako narzędzie dowodu, data quality (6), data cleaning, praca na skali, bilans odrzutów — po naprawie: walidacje jako kod (asercja bilansu), co jest dokładnie tym, czego chcą oferty („data quality, monitoring") | orkiestracja/ETL produkcyjny, chmura, CI/CD, DWH modeling; DuckDB = 0 w ofertach — narzędzie dowodu, nie keyword sprzedażowy |
| **B — benchmark GUS+Eurostat+NBP** (9 endpointów) | **API integracje (22)**, data quality, data-driven decision, benchmarking; manifest źródeł = praktyka reproducibility w rozumieniu DR2 (po domknięciu: snapshot/ETag, pole „pobrano" ≠ „updated", wersje kodu i środowiska) | SQL (dane idą API→JSON→Python), modelowanie DWH, chmura |
| **C — AI-engineering** (jeśli SENeca-2 dopisze) | LLM/agentic (17/20) — **most między torami**: dokładnie wzorzec CodiLime (data engineer + AI coding assistants + LLM nice-to-have) | brak — Case C jest mostem, nie nowym filarem |

### 3.4 Luki toru data — klasyfikacja skilla case-study-builder

**(A) STRUKTURALNE — nie zamkniesz budowaniem, obchodzisz narracją:**
- staż 3+/5+ lat w czystych rolach DE (emagine 3+/5+, SII 5+, XTB 3+) — jak w profilu bazowym, tylko twardziej;
- produkcyjna chmura/K8s w dowodach — częściowo strukturalna (dostęp/koszt). DR2 H1 daje obronę: lokalny, automatyczny i **testowany** pipeline dowodzi części kompetencji data-engineering bez chmury/Airflow/CI — nie trzeba inventować infrastruktury, trzeba domknąć jakość. Nie udawać chmury w CV.

**(B) ZAMYKANE BUDOWANIEM (kandydaci na skille/naprawy):**
- testy jako kod — pytest + walidacje danych + **asercja bilansu odrzutów w Case A** (naprawa już zaplanowana w CATO, werdykt A: NIE gotowy bez niej);
- requirements/lockfile + wersjonowanie środowiska (DR2 pkt 2: „brak wersjonowania środowiska");
- snapshoty odpowiedzi HTTP (ETag, pole „pobrano" odrębne od „updated" — DR2 pkt 3, naprawa manifestu Case B);
- orkiestracja istniejącego pipeline'u — jeden DAG (Airflow/Dagster/Prefect lokalnie) na Case A lub B; zamienia „skrypt" w „pipeline" w języku ofert;
- SQL analityczny (CTE, window functions) na zbiorze większym niż Case A — domyka „SQL" jako keyword z dowodem.

**(C) DO PODCIĄGNIĘCIA (trening, nie narzędzie; dopiero po decyzji o torze):**
- Spark/Kafka (praca strumieniowa i skala ponad RAM) — trening na danych publicznych;
- IaC/Terraform, certyfikat chmurowy — koszt/czas spore, zwrot niepewny przy torze hybrydowym;
- EN C1 — luka wspólna z profilem bazowym (mock-interviews, Strategia v2 M2).

## 4. Pytanie otwarte: tor data OBOK AI-core czy ZAMIENIA część AI-core?

**Rekomendacja: OBOK — jako podtor wzmacniający AI-core, nie zamiana.** W tym samym korpusie ofert sygnały AI-core są 3-7 razy częstsze niż rdzeń DE (automatyzacja 44 vs SQL 10, data quality 6, data pipeline 2), a portale pokazują, że czysty DE to liga 3-5 lat stażu plus produkcyjna chmura — czyli dokładnie tam, gdzie bariera stażu (luka A) boli najbardziej. Tor data jako podtor dodaje to, czego AI-core nie dowodzi (SQL, API, jakość danych, „translacja dane-decyzja" — Cases A/B już to robią), bez oddawania najczęstszych sygnałów rynku, na które profil jest zbudowany.

*(Decyzja: Marcin. Dopisane case'y A/B/C pozostają bez zmian niezależnie od decyzji — zmienia się tylko, pod którym tornem stoją na stronie.)*

## 5. Samoskan (wykonany)

- znaki spoza alfabetu PL/ASCII (CJK, cyrylica, sklejki): **0** — skan programowy całego pliku;
- markery AI-slopu („warto zauważyć", „kluczowe jest", „niezwykle", „podkreślić", „essentially", „delve"): **0 w treści** — jedyna obecność tych fraz to ta lista; przy powtórce skanu wykluczyć sekcję samoskanu z korpusu;
- znaki w zakresie 0x0400-0x9FFF: wyłącznie typografia (myślnik 0x2014, cudzysłów 0x201E, strzałka 0x2192, ≠ 0x2260) — cyrylicy/CJK **0**;
- nazwy własne przeczytane listą: DuckDB, Airflow, dbt, Snowflake, BigQuery, Spark, PySpark, Kafka, Databricks, Terraform, Kubernetes, GitLab, SSIS, BMC Helix, SAFe, Dagster, Prefect, pytest, FastAPI, LangGraph, CrewAI, AutoGen, Vertex AI, JSON-stat, GUS BDL, NBP, Eurostat — bez sklejek;
- wszystkie liczby w tym pliku pochodzą z: oferty-scoring.json (policzone regexem, konteksty zweryfikowane), Draftu CATO-2, EVAL-DR2, profilu v1, ogłoszeń portalowych z sekcji 2 (z URL-ami).
