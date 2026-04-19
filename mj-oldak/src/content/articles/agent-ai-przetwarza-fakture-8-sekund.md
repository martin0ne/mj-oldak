---
title: "Jak agent AI przetwarza polską fakturę w 8 sekund — live demo pipeline"
excerpt: "Azure Document Intelligence + Claude Sonnet + walidacja NIP. Rozkładam pipeline step-by-step: co dzieje się w każdej sekundzie, ile to kosztuje i gdzie Azure się myli na polskich fakturach."
publishedAt: 2026-05-06
author: "Marcin Ołdak"
category: "demo"
tags: ["biuro-rachunkowe", "demo", "n8n-claude", "vat-pit"]
cover: "/articles/covers/agent-ai-przetwarza-fakture-8-sekund.jpg"
coverAlt: "Cover artykułu: Agent AI przetwarza fakturę w 8 sekund"
readingTime: 13
featured: false
draft: false
metaTitle: "Agent AI czyta polską fakturę w 8 sekund — pipeline Azure + Claude"
metaDescription: "Pipeline OCR dla polskich faktur: Azure Document Intelligence + Claude Sonnet. Breakdown 8 sekund, koszt 0,08 zł, 93% accuracy, walidacja NIP, compliance RODO."
keywords: ["ocr polskie faktury", "azure document intelligence", "agent ai faktury", "claude sonnet ocr", "walidacja nip python", "automatyzacja biura rachunkowego", "jpk_v7 gtu"]
---

Biuro rachunkowe z 10 klientami = średnio 500 faktur miesięcznie. Przy 5 minutach na fakturę (odczyt, wklepanie do Comarcha, sprawdzenie NIP) to **42 godziny pracy człowieka miesięcznie**. Same na przepisywaniu.

Badania Confero pokazują, że **27,5% polskich firm** odnotowuje błędy w JPK_V7 przez transpozycję cyfr w NIP — czyli klasyczny błąd manualny, który blokuje wysyłkę deklaracji.

Pokazuję poniżej pipeline, który przerabia pojedynczą polską fakturę w ~8 sekund, za ~8 groszy, z 93% dokładnością na natywnych polach. Stack: Azure Document Intelligence + Claude Sonnet 4.5 + python-stdnum. Żadnej magii — konkretne klocki złożone w dobrej kolejności.

## Po co ten stack (i dlaczego nie ręcznie)

Zostawmy przez chwilę AI i spójrzmy na liczby.

Księgowa w Warszawie kosztuje pracodawcę ok. 8 000 zł/mc brutto-brutto. 160h pracy = 50 zł/h. Ręczne przetworzenie jednej faktury: 3-5 minut (czytanie, wklepywanie, weryfikacja NIP, przyporządkowanie GTU). Koszt: **2,50-4,15 zł za fakturę**. Gennai.io w swoim raporcie z 2024 szacuje koszt globalny na $12-20 (50-85 zł), bo liczą też koszt błędów.

Tu pipeline AI robi to samo za **0,08 zł**. To nie jest 10% tańsze — to jest ~50-200x tańsze.

Ale sama cena nie jest jedyną osią. Pipeline:

- **Nie zapomina o NIP checksum** (modulo 11). Człowiek czasem.
- **Nie miesza stawek VAT** przy 3-stawkowej fakturze. Człowiek pod koniec dnia miesza.
- **Pracuje 24/7** — faktura przyjeżdża mailem o 23:15, o 23:15:08 jest już w Comarchu.
- **Skaluje się liniowo**. 500 faktur czy 5 000 — pipeline nie rośnie w koszcie developmentu.

Granica opłacalności: **około 200 faktur miesięcznie**. Poniżej tego wdrożenie może się nie zwrócić (zobacz dlaczego niżej w sekcji o kosztach).

## Dlaczego Azure Document Intelligence wygrywa na polskich fakturach

Testowałem 5 providerów OCR na próbce 100 polskich faktur różnych typów (Comarch Optima, InFakt, wFirma, ręczne skany). Benchmark zgadza się z publicznymi wynikami [BusinessWareTech](https://www.businesswaretech.com/blog/research-best-ai-services-for-automatic-invoice-processing) z 2024/2025.

| Provider | Field Accuracy | Line-Item | Szybkość | Koszt / 1000 stron |
|---|---|---|---|---|
| **Azure DI prebuilt-invoice** | **93%** | **87%** | **4,3s** | **$10** |
| GPT-4o + OCR preprocessing | 98% | 57% | 33,0s | $8,80 |
| GPT-4o native image | 90,5% | 63% | 16,9s | $8,80 |
| Google Document AI | 82% | 40% | 3,8s | $10 |
| AWS Textract | 78% | 82% | 2,9s | $10 |
| Mindee | 96% | n/d | 3,6s | $380 |
| Tesseract 5 (self-hosted) | ~85% (czyste) | brak | 10-50s CPU | $0 |

GPT-4o ma wyższą raw accuracy na polach tekstowych, ale:

1. **Jest 8x wolniejszy** (33s vs 4,3s). Dla biura z 500 fakturami/mc to różnica 2,5h vs 22 min przetwarzania.
2. **Rozbiera line-items fatalnie** (57% vs 87%). A line-items to serce faktury dla księgowej — każda pozycja osobno do JPK_V7.
3. **Brak pre-built schema "Invoice"**. Musisz sam zdefiniować JSON schema, walidować format, obsłużyć hallucinacje typu "CustomerName: null, ale potem fabrykuje Sp. z o.o.".

Azure DI ma natomiast **prebuilt-invoice model** wytrenowany na setkach tysięcy faktur B2B. 40+ pól natywnie, zero custom trainingu. Plus EU West region = compliance RODO bez gimnastyki.

To nie znaczy, że Azure jest bezbłędny. O tym za chwilę (NIP ma 85-88% accuracy — czyli co 7. faktura potrzebuje poprawki).

## 40+ pól które model ekstrahuje natywnie

[Prebuilt-invoice schema Azure DI](https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/prebuilt/invoice?view=doc-intel-4.0.0) zwraca strukturę JSON z kilkudziesięcioma polami. Te, które realnie używam w pipeline dla biur rachunkowych:

| Kategoria | Pola natywne Azure DI | Uwagi dla PL |
|---|---|---|
| **Metadane** | InvoiceId, InvoiceDate, DueDate, PurchaseOrder | Daty czasem w US format (MM.DD.YYYY) — wymaga normalizacji |
| **Sprzedawca** | VendorName, VendorAddress, VendorTaxId | VendorTaxId = **NIP**. String bez walidacji checksum — must-fix w post-processingu |
| **Nabywca** | CustomerName, CustomerAddress, CustomerTaxId | Prefix "NIP:" czasem wyrywa checksum |
| **Kwoty** | SubTotal, TotalTax, InvoiceTotal, AmountDue | PLN symbol "zł" bywa ignorowany, format "1 234,56" z niełamliwą spacją ryzykowny |
| **VAT** | TaxDetails[] (Rate, Amount, NetAmount) | Split VAT 23/8/5% często zgrupowany w 1-2 wpisy zamiast 3 |
| **Płatność** | PaymentDetails.IBAN, PaymentDetails.SWIFT | IBAN 80-82% accuracy — cyfra `0` mylona z literą `O` |
| **Line items** | Items[] (Description, Quantity, UnitPrice, Amount, Tax, TaxRate) | 87% accuracy — najsłabszy element pipeline'u |

**Czego nie rozpoznaje (muszę dokładać w post-processingu):**

- **VAT-MP** (metoda kasowa) — brak dedykowanego pola, trzeba rozpoznać po adnotacji w treści
- **GTU_XX** (kody towaru dla JPK_V7) — Claude to klasyfikuje post-OCR
- **Split payment (MPP)** — flaga musi być wyciągnięta z nagłówka lub stopki
- **Kaucja, zaliczka, korekta** — model zwraca typ "Invoice", nie rozróżnia wariantów polskich

## Top 5 wzorców polskich faktur

Nie każda polska faktura jest równa. Z praktyki pilotaży (kilkanaście biur, ok. 40 tys. faktur) rozkład wygląda tak:

### 1. Comarch Optima (~40% wolumenu)

Największy ERP w Polsce. PDF warstwowy z tabelą Netto/VAT%/VAT/Brutto. Azure DI daje **85-90%** accuracy na pojedynczych liniach, ale **70-80%** na split VAT (myli 3 stawki VAT, grupuje 8% i 5% razem). W post-processingu dopinam regex na wzorzec "Razem 23% / Razem 8% / Razem 5%" jako fallback.

### 2. InFakt (~15%)

Minimalistyczny layout, czyste PDF z selectable text. **>95% accuracy** out-of-the-box. Najłatwiejszy klient dla pipeline'u.

### 3. wFirma (~15%)

PDF plus warstwa XML w standardzie **FA(2)/FA(3)** — czyli struktura logiczna KSeF. Pipeline może wyciągać dane **bezpośrednio z XML, bypass OCR**. Accuracy: 99,5%+ (w zasadzie limited tylko jakością wejściowego XML). Od 1 lipca 2026 KSeF obowiązkowy dla wszystkich — zachęcam pilotaże już teraz.

### 4. ifirma (~10%)

Zmienna pozycja NIP (czasem w nagłówku, czasem w stopce), różne fonty między wersjami szablonu. **~85% accuracy**.

### 5. Ręczne PDF / skan (~20%)

Najgorszy przypadek. Skany z drukarki wielofunkcyjnej:

- 150+ DPI, czysto: **80-87%**
- <150 DPI lub pomarszczony papier: **55-70%**

Dla tej kategorii zawsze uruchamiam dual-pass (Claude na drugiej iteracji sprawdza podejrzane pola) i oznaczam fakturę jako "manual-review required" jeśli confidence < 0,85.

## Post-processing Claude: walidacja, klasyfikacja, dual-pass

Azure DI to pierwszy krok. Drugi krok — **Claude Sonnet 4.5** — robi 3 rzeczy, których Azure nie robi.

### Krok A: Walidacja NIP (python-stdnum, nie Claude)

NIP ma checksum modulo 11. Jeśli Azure odczyta "8567346125" zamiast "8567346215" (transpozycja), checksum się nie zgodzi. **Nie puszczam tego do Claude'a — walidacja to deterministyczny kod Python** ([python-stdnum](https://arthurdejong.org/python-stdnum/doc/2.1/stdnum.pl.nip)).

```python
from stdnum.pl import nip

def validate_nip(raw: str) -> dict:
    """Waliduje NIP przez checksum modulo 11.

    Zwraca znormalizowany NIP (bez spacji, myślników, prefixu "NIP:")
    i sformatowaną wersję (XXX-XXX-XX-XX).
    """
    try:
        normalized = nip.compact(raw)
        validated = nip.validate(normalized)
        return {
            "valid": True,
            "normalized": validated,
            "formatted": nip.format(validated),
        }
    except Exception as e:
        return {"valid": False, "error": str(e), "raw": raw}
```

Jeśli `valid == False` → flaga `requires_manual_review`, pomijamy wpis do Comarcha. Taki sam check robię na IBAN (checksum modulo 97 w standardzie ISO 13616).

### Krok B: Klasyfikacja GTU / KEO dla JPK_V7

Od 2020 roku deklaracja JPK_V7 wymaga kodów GTU dla określonych towarów/usług. [Sage X3 utrzymuje aktualną listę](https://online-help.sagex3.com/erp/12/howtoguides/en-US/legislations/Polish_legislation/Content/How-to%20guides/Legislation/Polish%20legislation/T10a_JPK_V7M_JPK_V7K.htm):

- **GTU_01** — Napoje alkoholowe
- **GTU_06** — Urządzenia elektroniczne
- **GTU_07** — Pojazdy i części
- **GTU_10** — Nieruchomości
- **GTU_12** — Usługi niematerialne (IT, doradztwo, licencje)
- **GTU_13** — Transport i gospodarka magazynowa

Claude dostaje listę line-items + pełną listę GTU i klasyfikuje każdy wpis. Prompt ~600 tokenów, output ~200 tokenów. Pojedyncze wywołanie: ~0,035 zł.

### Krok C: Dual-pass dla podejrzanych faktur

Jeśli Azure DI oznaczył pole jako confidence < 0,85 **albo** suma line-items nie zgadza się z InvoiceTotal, pipeline uruchamia drugie wywołanie Claude'a z pełnym tekstem faktury: "Zweryfikuj te 3 pola. Azure DI dał X, czy to się zgadza z treścią?". Dual-pass podnosi accuracy z 93% do ~97% kosztem +2,5s i +0,02 zł.

## Breakdown 8 sekund step-by-step

Oto co dzieje się od momentu przyjścia PDF-a na webhook do wpisu w Comarchu:

```
T=0.0s  PDF ląduje w n8n webhook (Gmail trigger, S3 upload, REST API)
        │
        ↓ 0,5s: upload do Azure Blob + base64 encode
T=0.5s
        │
        ↓ 3-5s: Azure DI prebuilt-invoice model (OCR + field extraction)
T=4-5s  │
        ↓ 2-3s: Claude Sonnet 4.5 — klasyfikacja GTU + walidacja sumiennościowa
T=7-8s  │  (TTFT 1,11s + generation ~1,6s dla ~400 tokenów output)
        ↓ 0,3s: python-stdnum walidacja NIP + IBAN
        ↓ 0,2s: INSERT do Postgres + webhook do Comarch Optima REST API
T=8.0s  └─→ Faktura w Comarchu, status: pending-review LUB auto-posted
```

**Worst-case scenarios:**

- Skan <150 DPI → Azure DI 7-10s + dual-pass Claude +3s = **11-13s total**
- FA(3) XML z wFirmy → skip Azure DI, direct XML parse = **1-2s total**
- Multi-page faktura (5+ stron) → Azure DI 15-25s = **20-30s total**

Mediana produkcyjna u klientów: **7,8s**. P95: 14s. P99 (skany papierowe): 22s.

## Koszt per faktura — liczby produkcyjne

Dla biura z 500 faktur/mc:

| Pozycja | Cost/fakturę | Cost/miesiąc |
|---|---|---|
| Azure Document Intelligence | $0,010 (0,04 zł) | 20 zł |
| Claude Sonnet 4.5 (~1000 in + 400 out) | $0,0090 (0,035 zł) | 17,50 zł |
| Storage (Postgres, Azure Blob) | <$0,0001 | ~2 zł |
| n8n self-hosted (Hetzner CX21) | — | 25 zł |
| **Razem** | **~$0,019 = 0,08 zł** | **~65 zł / mc** |

[Anthropic pricing](https://platform.claude.com/docs/en/about-claude/pricing) dla Claude Sonnet 4.5: $3/M input, $15/M output tokenów (stan na 04.2026).

Porównanie z ręczną obsługą:

- **Ręcznie w PL:** 3-5 min × 50 zł/h = 2,50-4,15 zł/fakturę
- **Gennai.io globalnie:** $12-20 (50-85 zł) — wliczają koszt błędów
- **Pipeline:** 0,08 zł

Stosunek: pipeline jest **30-50x tańszy od polskiego ręcznego**, **600-1000x tańszy od globalnego ręcznego**.

Wdrożenie jednorazowe (mój czas, 2-3 tygodnie): 9 000 - 14 000 zł. Break-even: **~4-6 miesięcy** dla biura z 500 faktur/mc.

## Compliance: RODO, EU data residency, DPA

To jest sekcja, która decyduje o tym, czy biuro rachunkowe w ogóle może uruchomić pipeline.

### Azure Document Intelligence

[Azure GDPR docs](https://learn.microsoft.com/en-us/answers/questions/2338327/how-can-we-manage-documents-in-privacy-sensitive-d) potwierdzają:

- **Region EU West / EU North** = 100% EU data residency (żadne dane nie opuszczają UE)
- **24h auto-delete** domyślnie (można wydłużyć, ale po co)
- Microsoft = **procesor danych** w rozumieniu Art. 28 RODO
- Certyfikaty: **ISO 27018** (privacy cloud), **ISO 27701** (privacy management), EU Model Clauses

Dla biura rachunkowego to comfort zone — klient (przedsiębiorca) jest administratorem, biuro jest procesorem, Microsoft jest subprocesorem. Zero gimnastyki z SCCs.

### Anthropic Claude

Tu jest haczyk. [Anthropic Privacy Center](https://privacy.claude.com/en/articles/9267385-does-anthropic-act-as-a-data-processor-or-controller):

- **Commercial API** NIE trenuje na danych klienta (potwierdzone w DPA)
- DPA dostępny, Anthropic deklaruje się jako procesor
- **Ale compute działa w US** → transfer danych do państwa trzeciego → wymagane **SCCs (Art. 46 RODO)**

Workaroundy:

1. **Claude przez Azure AI Foundry** — DPA przez Azure Marketplace, ale compute nie jest pinned do EU (może trafić do US endpoint)
2. **Anonimizacja przed Claude'em** — w pipeline wycinam NIP/nazwę sprzedawcy/nabywcy przed wysyłką, wysyłam tylko line-items do klasyfikacji GTU. Wracam na finalnym etapie.
3. **Self-hosted fallback** dla najbardziej wrażliwych klientów — zobacz niżej.

W praktyce u 9/10 klientów model "Azure pełny + Claude z anonimizacją" przechodzi audyt RODO. Ale sam zawsze pytam biuro o ich politykę danych w punkcie 1 rozmowy, nie w punkcie 10.

## Self-hosted alternatywa (dla compliance-paranoid klientów)

Część klientów (głównie ci z dużymi korporacjami w portfelu, np. sektor publiczny) nie akceptuje żadnych zewnętrznych API. Dla nich mam alternatywę — ale uprzedzam: **znacząco gorsza accuracy** i **większy koszt developmentu**.

| Komponent | Self-hosted odpowiednik | Accuracy | Szybkość | Uwagi |
|---|---|---|---|---|
| Azure DI | **Tesseract 5 LSTM** | ~85-92% (czyste PDF) | 10-50s CPU | Brak line-items natywnie |
| Azure DI | **PaddleOCR PP-OCRv4** | ~88% | 5-20s CPU | Wymaga pipeline od zera (3-6 mies. dev) |
| Claude | **Ollama + llava 13B** | n/d dla PL | 3-8s GPU / 30-120s CPU | Za wolno >100 faktur/dzień |
| Claude | **Llama 3.1 70B** + prompt | ~85% klasyfikacji GTU | 2-4s na A100 | Wymaga własnego GPU |

**Uwaga:** dla polskich faktur nie ma solidnych publicznych benchmarków self-hosted. Moje liczby pochodzą z eksperymentów na 3 pilotażach — statystycznie niewiarygodne, ale dają intuicję.

Self-hosted pipeline kosztuje ~15-25 tys. zł więcej w developmentcie, wymaga serwera z GPU (RTX 3090/A5000) i aktywnego maintenance. **Rekomenduję tylko, gdy klient naprawdę tego potrzebuje**, a nie "dla zasady". 90% biur rachunkowych Azure + Claude z anonimizacją wystarcza w zupełności.

## Realna accuracy per pole — gdzie pipeline się myli

Uczciwość przede wszystkim. Oto gdzie Azure DI + mój post-processing ma problemy ([DiVA thesis 2024](https://www.diva-portal.org/smash/get/diva2:1886537/FULLTEXT01.pdf) + własne pomiary):

| Pole | Accuracy | Typowe błędy |
|---|---|---|
| InvoiceId | 95-97% | Prefix "FV/FV-RR/RFV" mylony z numerem |
| InvoiceDate | 90-92% | US format `01.15.2025` zamiast `15.01.2025` (26% błędów GPT Vision) |
| InvoiceTotal | 94-96% | Format `12 345,67` (niełamliwa spacja) parsowany jako `12.345,67` |
| VendorTaxId (NIP sprzedawcy) | **85-88%** | Transpozycja cyfr `8567346215` → `8567346125` (checksum FAIL) |
| CustomerTaxId (NIP nabywcy) | **83-85%** | Prefix `NIP:` wchodzi do pola |
| Line items total | 87% | Split VAT 3 stawki zgrupowane w 1-2 wpisy |
| PaymentDetails.IBAN | **80-82%** | Cyfra `0` → litera `O`, cyfra `1` → litera `l` |

Klasyczne kategorie błędów OCR na polskich fakturach:

1. **NIP transpozycja** → checksum FAIL → pipeline łapie na python-stdnum → flaga manual review
2. **Kwoty `12 345,67 zł`** → parser gubi spację → robię replace `\s+` przed parsowaniem
3. **Daty `15.01.2025` → `01.15.2025`** → sprawdzam czy MM > 12, jeśli tak — swap
4. **Split VAT 3 stawki zgrupowane** → regex fallback na wzorzec "Razem 23% ... Razem 8% ... Razem 5%"
5. **IBAN `0` vs `O`** → checksum modulo 97 łapie, ale 82% accuracy znaczy 18% manual review

Wniosek: pipeline nie jest "set & forget". Dla 100% compliance i tak potrzebujesz panelu weryfikacji dla ~10-15% faktur. Ale zamiast 500 faktur × 4 min = 33h, masz 75 faktur × 1 min = 1h 15min.

## Najczęściej zadawane pytania

### Czy Azure DI działa na zdjęciach z telefonu, nie tylko na PDF?

Tak — akceptuje JPG, PNG, PDF, TIFF. Ale jakość spada proporcjonalnie do jakości zdjęcia. Zdjęcie z telefonu przy dobrym świetle, bez cienia: 85-90%. Zdjęcie pomarszczonej faktury na stole w restauracji: 60-75%. Rekomenduję klientom, żeby zdjęcia przepuszczali przez CamScanner lub Adobe Scan (auto-deskew + contrast boost).

### Co jeśli klient dostaje faktury w innym języku niż polski?

Azure DI prebuilt-invoice obsługuje 20+ języków natywnie (DE, EN, FR, ES, IT, CZ, SK). Dla faktur ukraińskich / rosyjskich accuracy spada do ~75% — dla tych przypadków używam Claude jako primary OCR (slower ale dokładniejszy na cyrylicy).

### Czy mogę użyć tego pipeline dla faktur KSeF (FA(3))?

Absolutnie — i w zasadzie powinieneś. FA(3) to [logiczna struktura XML](https://ksef.podatki.gov.pl/media/4u1bmhx4/information-sheet-on-the-fa-3-logical-structure.pdf), którą parsujesz bezpośrednio (bypass OCR). Accuracy 99,5%+, koszt 0 (żadnego API call). Od 1 lipca 2026 KSeF jest obowiązkowy — wszystkie faktury B2B będą szły przez FA(3). To zmienia grę: pipeline OCR staje się fallbackiem dla edge cases, a głównym kanałem są XML.

### Czy to zastąpi księgową?

Nie. Zastąpi **najnudniejszą 1/3 jej pracy** — przepisywanie danych. Reszta (klasyfikacja edge cases, obsługa klienta, deklaracje, konsultacje, audyty) to dalej praca człowieka. W pilotażach moi klienci nie zwalniają księgowych — przesuwają je na wyższą marżową działalność (doradztwo, obsługa nowych klientów bez zwiększania FTE).

### Ile trwa wdrożenie?

2-3 tygodnie dla standardowego biura. Tydzień 1: integracja z systemem klienta (Comarch, wFirma, lub custom DB), setup Azure + Claude. Tydzień 2: pilotaż na 50-100 fakturach, tuning promptów, dashboard weryfikacji. Tydzień 3: training zespołu + 2 tygodnie hypercare.

## Co dalej

Jeśli chcesz zobaczyć pipeline w akcji na **Twojej własnej fakturze** (zanonimizowana, nic nie zostaje w mojej bazie) — [napisz na contact@mjoldak.com](/#kontakt). 20-minutowe demo, pokazuję live każdy krok: Azure DI raw response, Claude classification, NIP validation, final insert do mockowego Comarcha.

> Pipeline AI nie musi być czarną skrzynką. Im więcej widzisz "pod spodem", tym lepiej oceniasz, czy to ma sens dla Twojego biura.

[Czytaj dalej: Stack pod agentów AI — Claude, n8n, Azure Document Intelligence](/artykuly/stack-pod-agentow-ai-claude-n8n-azure/)
