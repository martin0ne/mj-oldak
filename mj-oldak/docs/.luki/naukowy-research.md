# Luka 1 — Przekład publicznie opublikowanych polskich zasad/wytycznych AI na uczelniach

## Co sprawdzono (źródła)

| # | Źródło | URL | Rok |
|---|--------|-----|-----|
| 1 | UW – Wytyczne dotyczące korzystania z AI w procesie kształcenia | <https://urk.uw.edu.pl/wytyczne_sztuczna_inteligencja/> | 2023-12-08 |
| 2 | UJ – Zarządzenie nr 115 Rektora UJ o narzędziach AI w dydaktyce | <https://bip.uj.edu.pl/documents/1384597/42534133/AI_based_tools_in_the_teaching_process_115_2025.pdf> | 2025-11-27 |
| 3 | SGH Warszawa – Zarządzenie nr 5 Rektora SGH (zasady wykorzystania AI przy pracach pisemnych) | <https://www.sgh.waw.pl/wyciag-z-zasad-wykorzystania-ai-przy-przygotowaniu-prac-pisemnych> | 2024-02-05 |
| 4 | UMK Toruń – Wytyczne Rektora w zakresie stosowania systemów AI | <https://www.fizyka.umk.pl/panel/wp-content/uploads/Sztuczna_inteligencja-WytyczneRektora-PO.1.2024.pdf> | 2024-01-16 |
| 5 | Politechnika Poznańska – procedura prac dyplomowych (wywołana w raporcie DELAB UW, 2025) | <https://creef.put.poznan.pl/procedura> | 2025 |

## Co domknięte (twierdzenia gotowe do raportu)

Na sześciu dużych uczelniach sprawdzonych celowo (UW, UJ, AGH, PW, UŁ, UWr, SGH, UMK) oficjalne zasady AI istnieją jako dokumenty wydana przez rektora lub radę wydziału jedynie na **UW** (Wytyczne z 8 XII 2023, uchwała Rady Kształcenia), **UJ** (Zarządzenie nr 115 z 27 XI 2025, regulujące dopuszczalne/niedopuszczalne użycie AI w pracy twórczej i wymóg deklaracji), **SGH** (Zarządzenie nr 5 z 5 II 2024, zakaz generowania całości pracy, obowiązek sekcji deklarującej użyte narzędzia) oraz **UMK** (Wytyczne z 16 I 2024). Pozostałe badane uczelnie (AGH, PW, UWr, UŁ) nie publikują jednolitych, ogólnoustrojowych wytycznych AI w swojej infrastrukturze BIP/dydaktyki — zasady przyjmowane są ad hoc przez poszczególnych prowadzących lub wydziały [UW, 2023; UJ, 2025; SGH, 2024; UMK, 2024]. Raport DELAB UW (2025) potwierdza tę rozproszoność, notując że praktyka decydująco różni się między prowadzącymi nawet na tym samym kierunku [UW DELAB raport, 2025].

## Co zostaje jako brak dalszej wiedzy

Żadne badanie nie mierzy, ile z ~400 polskich uczelni wyższych posiada formalne zasady AI. Nie wiemy więc skali pokrycia systemowego vs ad-hoc.

---

# Luka 2 — Skala incydentów wycieku przez AI w polskich firmach (proxy twardy)

## Co sprawdzono (źródła)

| # | Źródło | URL | Rok |
|---|--------|-----|-----|
| 6 | UODO – Sprawozdanie z działalności Prezesa UODO w roku 2024 | <https://uodo.gov.pl/pl/138/3857> | 2024 |
| 7 | X/UODOgov_pl — sprawozdanie za 2025 r. (22 435 naruszeń) | <https://x.com/UODOgov_pl/status/2098054733588037666> | 2025 |
| 8 | CERT Polska – Raport roczny 2025 | <https://cert.pl/uploads/docs/Raport_CP_2025.pdf> | 2025 |
| 9 | NASK/CERT Polska newsroom — prawie 2 tys. zgłoszeń dziennie | <https://www.nask.pl/aktualnosci/prawie-2-tys-zgloszen-kazdego-dnia-raport-cert-polska-za-2025-rok> | 2026-04 |
| 10 | ENISA Threat Landscape 2025 | <https://www.enisa.europa.eu/publications/enisa-threat-landscape-2025> | 2025-10 |
| 11 | ENISA Threat Landscape 2026 (okres styczeń–grudzień 2025) | <https://www.enisa.europa.eu/publications/enisa-threat-landscape-2026> | 2026 |

## Co domknięte (twierdzenia gotowe do raportu)

Polskie statystyki UODO notują wzrost zgłoszeń naruszeń ochrony danych osobowych z 14 842 w 2024 do 22 435 w 2025 (+51%) [UODO, 2024; UODO, 2025]; CERT Polska odnotował 260 783 unikalnych incydentów bezpieczeństwa w Polsce w 2025 (+152% r/r), z czego 97% stanowiły oszustwa komputerowe [CERT Polska, 2025]. ENISA TLT 2025 wykazuje, że wsparcie AI w phishingu wynosi ponad 80% wszystkich kampanii inżynierii społecznej na świecie [ENISA TLT 2025, s. 2], a ENISA TLT 2026 powtórzyła ten trend, wskazując emerging AI models as facilitating malicious activity [ENISA TLT 2026]. Niemniej żaden z tych raportów nie segreguje wycieków według przyczyny „wklejenie danych do publicznego czatu/chatbotu AI" — nie ma publicznie opisanych przypadków wycieku danych bezpośrednio spowodowanego takim działaniem w polskich firmach w badanym materiale [UODO sprawozdania, 2024–2025; CERT Polska, 2025]. Brak jest też danych o skali shadow-AI w polskich organizacjach — ani UODO, ani CERT Polska nie gromadzą kategorii etykietowanej „incydent spowodowany genAI".

## Co zostaje jako brak dalszej wiedzy

Brak jakichkolwiek danych ilościowych o skali wycieków przez AI w PL — zero incident reports z etykietą AI/data-leak w UODO czy CERT. Jest to luka pomiarowa, nie dowód braku ryzyka.

---

# Luka 3 — Empiryczne dane o zgodności DPA z RODO w praktyce (kontekst AI)

## Co sprawdzono (źródła)

| # | Źródło | URL | Rok |
|---|--------|-----|-----|
| 12 | EDPB — Coordinated Enforcement Framework (CEF): chmura publiczna 2023 | <https://www.edpb.europa.eu/news/news/2023/cef-2023-edpb-launches-coordinated-enforcement-cloud-services-public-sector_en> | 2023 |
| 13 | EDPB — CEF: Data Protection Officers 2024 | <https://www.edpb.europa.eu/news/news/2024/cef-2024-edpb-launches-coordinated-enforcement-action-designation-and-position-data-protection-officers_en> | 2024 |
| 14 | EDPB — CEF: prawo dostępu (right of access) 2025 | <https://www.edpb.europa.eu/news/news/2025/cef-2024-edpb-identifies-challenges-full-implementation-right-access_en> | 2025 |
| 15 | EDPB — CEF: prawo do usunięcia (right to erasure) 2025/2026 | <https://www.edpb.europa.eu/news/news/2025/cef-2025-launch-coordinated-enforcement-right-erasure_en> | 2026-02 |
| 16 | EDPB — CEF: transparentność i obowiązek informacyjny 2026 | <https://www.edpb.europa.eu/news/cef-2026-edpb-launches-coordinated-enforcement-action-on-transparency-and-information_en> | 2026-03 |
| 17 | UODO — Checklisty pytań wstępnych weryfikujących zgodność AI z RODO | <https://gdpr.pl/jak-wdrazac-ai-zgodnie-z-rodo-prezes-uodo-opublikowal-listy-pytan-wstepnych> / <https://uodo.gov.pl/pl/138/4533> | 2026-08 |

## Co domknięte (twierdzenia gotowe do raportu)

EDPB prowadzi cykl co rok akcji koordynowanych (CEF), dotąd koncentrując się na (1) chmurze w sektorze publicznym, (2) DPO, (3) prawie dostępu, (4) prawie do usunięcia — i od 2026 na obowiązkach transparentności [EDPB CEF, 2023–2026]. Żadna z tych akcji nie była dedykowana tematyce AI/DPIA przy generatywnej AI. W Polsce Prezes UODO w sierpniu 2026 opublikował cztery checklisty pytań wstępnych (26 pytań dla MŚP, 35 dla sektora publicznego, 48 dla organizacji trenujących własne modele AI, 73 wersja rozszerzona) mające służyć wstępnej ocenie zgodności przed wdrożeniem systemu [UODO checklista, 2026-08]. Badanie wewnętrzne UODO wskazuje, że ok. połowa podmiotów nie dostrzega związku między AI a przetwarzaniem danych osobowych, a 95,9% uważa się za nieprzygotowane do wdrażania AI zgodnie z RODO [UODO survey, cyt. gdpr.pl, 2026]. Nie ma jednak żadnych publicznych danych o liczbie wniosków DPA specyficznie związanych z wdrożeniami AI w UE/PL.

## Co zostaje jako brak dalszej wiedzy

Brak empirycznego wskaźnika: ile organizacji wnioskuje DPA przy AI, ile z nich przechodzi art. 35 evaluation w pełni i jaka jest stopa niezgodności. Istnieje tylko proxy jakościowe (checklista UODO + badanie 95,9% niegotowości).

---

# Luka 4 — Efektywność detektorów AI na tekstach polskich

## Co sprawdzono (źródła)

| # | Źródło | URL | Rok |
|---|--------|-----|-----|
| 18 | Järvenoja et al. (2026) — Who wrote this? Evaluating reliability of AI detection tools (Turnitin, GPTZero, Copyleaks, Pangram) | <https://link.springer.com/article/10.1007/s40979-026-00226-w> | 2026 |
| 19 | Weber-Wulff et al. (2023) — Testing 14 detection tools on human, AI, translated, edited, paraphrased text | <https://doi.org/10.1007/s40979-023-00146-z> | 2023 |
| 20 | PMC/NMC study (2024) — GPTZero, ZeroGPT, CorrectorApp on 1 000 academic texts (English scientific abstracts) | <https://pmc.ncbi.nlm.nih.gov/articles/PMC12331776/> | 2024 |
| 21 | Malik & Amjad (2025) — Journal of Applied Learning & Testing, 8(1), Turnitin/GPTZero/ZeroGPT/Writer detecting ChatGPT/Perplexity/Gemini | <https://doi.org/10.37074/jalt.2025.8.1.9> | 2025 |
| 22 | Liang et al. (Stanford, 2023) — Detectors misclassifying >50% non-native TOEFL essays | <https://doi.org/10.1016/j.patter.2023.100779> | 2023 |

## Co domknięte (twierdzenia gotowe do raportu)

Nie istnieje żaden udokumentowany, peer-reviewed test skuteczności detektorów AI (Turnitin, GPTZero, Copyleaks, InferKit itp.) przeprowadzony na korpusie tekstów po polsku. Wszystkie znaczące niezależne badania używają korpusów anglojęzycznych: Järvenoja et al. (2026) testowała 4 detektory na szwedzkich/master thesisach [Järvenoja, 2026]; Weber-Wulff et al. (2023) testowały 14 narzędzi na amerykańskich college essayach [Weber-Wulff, 2023]; NMC study testowała na angielskich naukowych abstraktach [NMC, 2024]; Liang et al. (2023) wykazały >50% false positive rate na essayach ESL/EFL [Liang, 2023]. Specyfika językowa polszczyzny (inny poziom perplexity, inne wzorce składniowe niż w j. angielskim) oznacza, że wyniki badań angielskojęzycznych **nie generalizują automatycznie** na teksty polskie. Jednocześnie Turnitin przyznaje, że jego wskaźnik AI Writing Detection ma wysoki false-positive rate i nie powinien być jedyną podstawą negatywnej decyzji akademickiej [Turnitin Guides, 2024–2025].

## Co zostaje jako brak dalszej wiedzy

Konkretny brak: zero testów detektorów na polskojęzycznych pracach akademickich. To fundamentalna luka — detektory mogą zachowywać się inaczej na innych językach, a brak walidacji uniemożliwia ocenę ryzyka fałszywych positives w polskiej praktyce akademickiej.

---

# Luka 5 — Konsekwencje prawne dla freelancerów/JDG stosujących AI

## Co sprawdzono (źródła)

| # | Źródło | URL | Rok |
|---|--------|-----|-----|
| 23 | UODO — Skarga na ChatGPT/OpenAI (rozpoznawana od 20 IX 2023) | <https://uodo.gov.pl/pl/138/2823> | 2023-09 |
| 24 | Garante Italiano — kary OpenAI €15 mln (uchylona przez sąd w Rzymie marzec 2026) | <https://reuters.com/technology/italian-court-scraps-15-million-euro-privacy-watchdog-fine-chatgpt-maker-open-ai-2026-03-19/> | 2026-03 |
| 25 | UODO — Checklisty wstępne AI+RODO (4 wersje: MŚP/26pyć, Publiczny/35pyć, Zero/48pyć, Rozszerzona/73pyć) | <https://uodo.gov.pl/pl/138/4533> / <https://gdpr.pl/jak-wdrazac-ai-zgodnie-z-rodo-prezes-uodo-opublikowal-listy-pytan-wstepnych> | 2026-08 |
| 26 | DLA Piper GDPR Fines Survey Jan 2025 (brak case'u JDG/freelancer AI leak) | <https://www.dlapiper.com/en/insights/publications/2025/01/dla-piper-gdpr-fines-and-data-breach-survey-january-2025> | 2025 |
| 27 | DataGuidance — Poland: UODO publishes initial questions for assessing AI under GDPR | <https://www.dataguidance.com/news/poland-uodo-publishes-initial-questions-assessing-ai> | 2026-08 |

## Co domknięte (twierdzenia gotowe do raportu)

W Polsce Prezes UODO w dniu 20 IX 2023 rozpoczął postępowanie w sprawie ChatGPT/OpenAI dotyczące naruszenia RODO (skarga dotycząca wygenerowania nieprawdziwych informacji o skarżącym, braku odpowiedzi na żądania sprostowania, braku jasnych zasad prywatności) [UODO, 2023-09]. W sierpniu 2026 UODO opublikowało cztery checklisty wstępne (od 26 pytań dla MŚP do 73 pytań wersji rozszerzonej) wspierające pre-wdrożenową ocenę zgodności AI z RODO, skierowane m.in. do właścicieli JDG i mikroprzedsiębiorców [UODO checklista, 2026-08; DataGuidance, 2026-08]. Na poziomie europejskim jedyną udokumentowaną karą za przetwarzania danych związanego z genAI pozostaje włoska kara OpenAI (€15 mln) — która została uchylona przez Sąd Okręgowy w Rzymie w marcu 2026 z powodów proceduralno-jurysdykcyjnych, nie merytorycznych [Reuters, 2026-03-19]. W analizowanym materiale nie znaleziono żadnych decyzji, sankcji ani wyroków sądowych w Polsce (ani w UE) odnoszących się wprost do konkretnego freelancera/JDG stosującego ChatGPT/Claude w codziennej pracy biznesowej (marketing, raportowanie, komunikacja z klientem). Nie ma precedensów prawnych dla tej grupy.

## Co zostaje jako brak dalszej wiedzy

Brak precedensów prawnosądowych i administracyjnych (kar, decyzji, postanowień) dotyczących konkretnych freelancerów/JDG używających genAI. Brak jest także orzeczeń bezpośrednio o freelancerze wklejającym prompt do chatbota i wynikającym z tego naruszeniu RODO. Istnieją wytyczne (checklista UODO, 2026), ale zero sankcji — to może oznaczać albo niską widoczność incydentów, albo brak kontroli, albo brak zgłoszeń.

---

# WERDYKT: DO DOSTROJENIA (3)

Szczególne luki wymagające dodatkowego researchu przed publikacją:

1. **Luka 4 (detektory na PL)** — krytyczna: zero badań polskojęzycznych. Należy dodać caveat metodologiczny lub wskazać benchmarki multilanguage jeśli znajdą się badania cross-lingual.
2. **Luka 2 (incydenty AI-leak w PL firmach)** — brak danych pomiarowych. Status: jawny brak zamiast domniemywania. Można uzupełnić ankietą branżową lub cytatami z raportów shadow-AI.
3. **Luka 1 (skalowość uczelniane AI policy)** — przebadano 8/≈400 uczelni. Powinien pojawić się explicit `n=8` caveat, a nie sugerować reprezentatywności wyników.

Łączna ocena: **DO DOSTROJENIA (3)** — raport wymaga trzech uwag o zakresie badawczym (n=8, n=0 dla detektorów PL, brak kategorii AI-leak w UODO), potem gotowy do recenzentów.
