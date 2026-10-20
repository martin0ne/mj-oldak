# Granice AI w praktyce: prywatność, prawa i zgodność — przegląd literatury

*przegląd syntezy researchu granic AI dla studentów, pracowników i mikroprzedsiębiorców (PL/EU, 2024–2026)*

## TL;DR

Przegląd podjętych źródeł wskazuje, że ramy prawne dotyczące AI są już operationalne: AI Act wszedł w życie 2024-08-02, stosuje się zasadniczo od 2026-08-02, a obowiązki transparentnościowe z art. 50 działają od tej daty [EU Reg 2024/1689]. RODO applies equally to AI prompts — wrzucanie danych osobowych do publicznego czatu jest przetwarzaniem danych osobowych i wymaga podstawy prawnej, minimalizacji, informacji osobom i umowy DPA [EDPB Opinion 28/2024]. Kwestia autorstwa utworow generowanych przez AI pozostaje niepewna w trybie interpretacyjnym; EUIPO (2025) wskazujesilna zasade ludzkiego wkładu twórczego [EUIPO Report, 2025]. Wykrywarki AI (np. Turnitin) przyznają się do high false-positive rate i nie są dopuszczalne jako jedyna podstawa negatywnej decyzji akademickiej [Turnitin Guides, 2024–2025]. Najbardziej udokumentowane sankcje za AI w 2024–2026 dotyczą prawników w USA za halucynowane cytatów w aktach sądowych; karane grzywnami do $2500 i zawieszeniami zawodowymi [Reuters, 2026].

## Tezy

### Teza 1: AI Act — rozdział obowiązkow na role ma znaczenie operacyjne

Rozporządzenie UE 2024/1689 rozróżnia trzy role: dostawca (deweloper modelu/aplikacji), deployer (podmiot wdrażający system AI pod własną kontrolą) i użytkownik końcowy. Dla zwykłej osoby, studenta czy freelancera najistotniejsze są obowiązki transparentnościowe, nie techniczne [EC Digital Strategy, 2026]:

- **Chatbot disclosure** (art. 50): osoba rozmawiająca z chatbotem musi wiedzieć, że kontaktuje się z AI, chyba że wynika to wyraźnie z kontekstu. Obowiązuje od 2026-08-02.
- **Deepfake disclosure**: publikacja realistycznie wyglądającego deepfake'a wymaga wyraźnego ujawnienia sztucznie wygenerowanego charakteru. Dotyczy materialów o sprawach publicznych.
- **Oznaczenie maszynowe**: obowiązek technicznego oznaczania syntetycznych wyników w formie czytelnej maszynowo dotyczy głównie dostawców narzędzi, nie osoby publikującej pojedynczy post. Przejściowy termin dla istniejących systemów: 2 grudnia 2026 r. [CSA Research Note, 2026-07-29]

Harmonogram przyszłych obowiązków wysokiego ryzyka: wiele systemów z załącznika III (rekrutacja, edukacja, scoring kredytowy) zacznie obowiązywać od 2026-12-02, a systemy będące elementem regulowanych produktów — od 2026-08-02 [EC Regulatory Framework, 2026].

### Teza 2: Wklejanie danych do publicznego AI = przetwarzanie danych osobowych — RODO nie robi wyjątku dla promptów

Europejska Rada Ochrony Danych w opinii 28/2024 potwierdziła, że modele AI nie działają poza ramami standardowych zasad RODO: legalność, rzetelność, przejrzystość, minimalizacja danych, ograniczenie celu i rozliczalność [EDPB Opinion 28/2024, 2024].

W praktyce dzieli się dane na trzy kategorie:

| Kategoria | Przykłady | Ryzyko |
|---|---|---|
| Zielona (bezpieczniejsze) | Własny szkic bez danych ID; zanonimizowany opis problemu; dane publiczne; syntetyczne/testowe | Niskie |
| Żółta (tylko po sprawdzeniu) | Fragment umowy usunięty po stronie, tabela sprzedaży po agregacji | Średnie — wymagana analiza RODO |
| Czerwona (nie wklejać) | Imiona+nazwiska+ocena/wynagrodzenie; PESEL/dokumenty; CV/platcy; dokumentacja medyczna; kod źródłowy/firmy poufne | Wysokie — naruszenie RODO/art. 33 jeśli wyciek |

„No training" opcja w planie Business/API nie znaczy „brak przetwarzania". Dane mogą być przechowywane przez okres retencji, przetwarzane dla bezpieczeństwa, przez podwykonawców lub w różnych regionach. Trzeba czytać warunki danego produktu [OpenAI Business Data, 2026; Anthropic Privacy, 2026].

Kara włoskiego Garante wobec OpenAI (15 mln EUR, grudzień 2024) została uchylona przez sąd w Rzymie (marzec 2026) z powodów proceduralno-jurysdykcyjnych. Sprawa pokazuje, że generative AI nie działa poza RODO, ale nie należy jej przedstawiać jako obowiązującej, prawomocnej kary merytorycznej [Reuters, 2026-03-19].

### Teza 3: Autorstwo AI — pole interpretacji, zasada „ludzki wkład twórczy" dominuje

Na poziomie UE nie powstało odrębne proste prawo autorskie „dla dzieł AI". Analizy EUIPO wskazują, że kluczowy pozostaje wymóg ludzkiej twórczości: wybór, układ, redakcja, argumentacja i oryginalne decyzje autora [EUIPO Study on GenAI and Copyright, 2025].

Czysto automatyczny output może nie być utworem chronionym prawem autorskim. Szansa na ochronę rośnie, gdy człowiek dokonuje istotnych twórczych wyborów: opracowuje koncepcję, selekcjonuje, łączy elementy, redaguje, aranżuje i zmienia wynik [CMS Law EUIPO analysis, 2025].

Dla polskiego pracownika: art. 12 ustawy o prawie autorskim i prawach pokrewnych — dzieło stworzone w ramach obowiązków zwykle służy pracodawcy po przyjęciu utworu. To nie oznacza, że pracodawca „posiada wszystko, co pracownik kiedykolwiek wygeneruje" — kluczowe: zakres obowiązków, umowa, NDA i czy wynik ma twórczy, ludzki charakter [Gofin/lexlege.art.12, 2025].

### Teza 4: Detektory AI nie są wiarygodne jako jedyna podstawa oceny uczciwości akademickiej

Turnitin sam przyznaje, że jego wskaźnik wykrywania AI może się mylić i nie powinien być jedyną podstawą negatywnej decyzji wobec studenta. Wyniki od 1 do 19 procent są oznaczone gwiazdką, bez konkretnej wartości procentowej, ponieważ ryzyko fałszywych pozytywów jest duże [Turnitin AI Writing Detection Model, 2024–2025].

Badania polsko-słoweńskie cytowane przez Uniwersytet Warszawski (2025) wykazały, że prowadzący za bardziej skuteczne niż programy detekcyjne uznawali rozmowę ze studentem, obserwację etapów pracy, zadania ustne i kontrolę procesu. Samo oprogramowanie AI-detection stosowała mniejszość badanych, a jego ograniczona skuteczność wyraźnie zaznaczona [UW Serwis Naukowy, 2025].

### Teza 5: Najbardziej udokumentowane sankcje w 2024–2026 dotyczą prawników za halucynowane cytatów w dokumentach sądowych

| Przypadek | Rok | Sankcja | Lekcja |
|---|---|---|---|
| Piąty Okręg Apelacyjny (USA) | 2026 | $2500 grzywna za fikcyjnych cytatów | Sprawdz każde źródlo pierwotne [Reuters, 2026-02-18] |
| Dziewiąty Okręg Apelacyjny (USA) | 2026 | $2500 każdy + 6 mies. zawieszenia | „To była literówka" nie zastępuje kontroli przed publikacją [Reuters, 2026-06-03] |
| Wadsworth v. Walmart | 2025 | Sankcje za 8 fałszywych spraw | Nawet wewnętrzne/firmowe AI halucynuje [Layer 3 Labs, 2025] |
| Coomer v. Lindell | 2025 | Sankcje za halucynowane orzeczenia | Presja czasu nie zwalnia z obowiązku weryfikacji [Layer 3 Labs, 2025] |

Nie znaleziono wiarygodnie udokumentowanych kar w Polsce w latach 2024–2026 dokładnie za „pracownik wkleił prompt do AI i wyciekły dane". To nie znaczy, że ryzyko nie istnieje — oznacza tylko, że w materiale analizowanym oddziela realne ryzyko operacyjne od nieudokumentowanych historii.

## Czego NIE wiemy

**Luka 1: Brak polskich regulaminów AI na uczelniach.** Nie istnieje jedno ogólnopolskie „wolno"/„zakaz AI na studiach". Rzadziej spotykane zasady różnią się między uczelniami, wydziałami i nawet poszczególnymi prowadzącymi [UW/DELAB raport, 2025; Politechnika Poznańska, 2025]. Nie znaleziono podstaw, aby twierdzić, że każda polska uczelnia wymaga identycznej deklaracji AI.

**Luka 2: Skala incydentów w PL firmach.** Brak publicznie dostępnych, opisowanych przypadków wycieku danych przez AI w polskich firmach (poza ewentualnymi doniesieniami medialnymi nie objętymi researchem). Firmy nie raportują takich incydentów ze względów reputacyjnych i prawnych.

**Luka 3: Zgodnosc DPA z RODO w praktyce.** Nie ma empirycznych danych, ile organizacji faktycznie wnioskuje sprawne DPA przy AI, ani ile z nich jest zgodnych z wymaganiami RODO w pełnym zakresie.

**Luka 4: Efektywność detektorów na polskich tekstach.** Turnitin jest testowany na angielskojęzycznych korpusach. Efektywność na corpusach polskich (specyfika językowa, styl akademicki) nie jest szeroko udokumentowana.

**Luka 5: Konkretne konsekwencje prawne dla freelancerów/JDG.** Ramy AI Act i RODO są jasne na poziomie zasady, ale mało precedensów na poziom konkretnego freelancera stosującego ChatGPT/Claude do codziennej pracy biznesowej (marketing, raporty, komunikacja z klientem).

## Metodyka — SIFT

Proces syntezy zalożony na czterech krokach SIFT (Selected Information Framing & Tying):

1. **Selection**: Zebrane zostały dwa pliki Deep Research z Downloads/: „Granice w praktyce_ prywatność.pdf" (1 029 421 B, 424 linie, źródła pierwotne: akty prawne EU, UODO, EROB, regulaminy uczelni, wyroki, raporty) oraz „What are the latest research trends in technology.pdf" (463 871 B, supplementary context). Dodatkowe fragmenty z promptów OSNOWA wykorzystano wyłącznie do kontekstu metodologicznego.

2. **Interpretation**: Treść Grandios przeanalizowano jako operationalny przewodnik prawny — nie kanon teoretyczny. Kluczowe rozróżnienie: prawo vs interpretacja vs praktyka rynkowa. Każdy claim jest linkowany do źródła z rokiem.

3. **Framing**: Raport ułożony w strukturze przeglądu literatury naukowej: tezy z cytowaniami → luka wiedzy → metodyka. Styl mjoldak.pl — bezpośredni, faktograficzny, zero hype frazesów.

4. **Tying**: Syntetyzowano z kontekstem broader tech trends (local AI, inference efficiency, privacy-preserving systems — z PDF trends, 2026), aby osadzić problemy prawne w szerszym kierunku rozwojowym technologii: prace nad small/local/on-device models i privacy-preserving ML directly address data minimization challenges at the infrastructure level [IEEE Survey, 2026; Frontiers Robot., 2026].

## Źródła pełne

1. **EU Regulation 2024/1689 (AI Act)** — CELEX:32024R1689. Wejście w życie 2024-08-02, stosowanie zasadnicze 2026-08-02. eur-lex.europa.eu. [2024]
2. **EC Guidelines on AI transparency obligations** — digital-strategy.ec.europa.eu. [2026]
3. **CSA Research Note: EU AI Act Article 50 Transparency** — cloudsecurityalliance.org. [2026-07-29]
4. **EDPB Opinion 28/2024 — Data protection aspects related to AI** — edpb.europa.eu. [2024]
5. **OpenAI Business Data policies** — openai.com/business-data/. [2026]
6. **Anthropic Privacy & Data Handling** — privacy.claude.com. [2026]
7. **Google Workspace Gemini & AI policies** — workspace.google.com/blog/intl/en_za/lp/solutions/ai/. [2024–2025]
8. **UW DELAB — Generatywna AI na UW: dobre praktyki** — bid.uw.edu.pl/generatywna-ai-na-uw-dobre-praktyki-raport-delab-uw/. [2025]
9. **Politechnika Poznańska — procedura prac dyplomowych** — creef.put.poznan.pl/procedura. [2025]
10. **Turnitin AI Writing Detection — model i guidelines** — guides.turnitin.com/hc/en-us/articles/28294949544717-AI-writing-detection-model. [2024–2025]
11. **UW Serwis Naukowy — nauczyciele academicy vs ChatGPT** — serwisnaukowy.uw.edu.pl/czy-da-sie-wykryc-prace-napisana-przez-ai-nauczyciele-akademicy-vs-chatgpt/. [2025]
12. **EUIPO — GenAI from a copyright perspective** — euipo.europa.eu/en/publications/genai-from-a-copyright-perspective-2025. [2025]
13. **EUIPO — Generative AI and copyright (study)** — euipo.europa.eu/en/news/euipo-releases-study-on-generative-artificial-intelligence-and-copyright. [2025]
14. **CMS Law — EUIPO unpacks copyright risks** — cms.law/en/fra/legal-updates/euipo-unpacks-copyright-risks-in-the-age-of-genai. [2025]
15. **Polska ustawa o prawie autorskim — art. 12** — przepisy.gofin.pl / lexlege.pb.pl. [2025]
16. **Reuters — US appeals court sanctions lawyer for AI hallucinations ($2500)** — reuters.com/legal/government/us-appeals-court-orders-lawyer-pay-2500-over-ai-hallucinations-brief. [2026-02-18]
17. **Reuters — US appeals court sanctions lawyers over AI hallucinations (second case)** — reuters.com/legal/litigation/us-appeals-court-sanctions-lawyers-over-ai-hallucinations-lack-candor-2026-06-03/. [2026-06-03]
18. **Layer 3 Labs — Lawyers sanctioned for AI hallucinations** — layer3labs.io/guides/lawyers-sanctioned-for-ai-hallucinations. [2025]
19. **Reuters — Italian court scraps €15M OpenAI fine** — reuters.com/technology/italian-court-scraps-15-million-euro-privacy-watchdog-fine-chatgpt-maker-open-ai-2026-03-19/. [2026-03-19]
20. **Research Trends 2026 — technology & CS survey** — compiled ~2026-10-14. Source: downloads PDF. Topics: AI agents, small/local models, inference efficiency, embodied AI, post-quantum crypto, privacy-preserving systems.
21. **IEEE Survey — Small language models 2026** — ieeexplore.ieee.org/document/11434122/. [2026]
22. **Frontiers in Robotics — generative robot learning 2026** — frontiersin.org/articles/10.3389/frobt.2026.1905499/full. [2026]
