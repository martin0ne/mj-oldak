---
title: "OpenShell: NVIDIA stawia agenta AI w klatce — testujemy na własnej maszynie"
slug: "openshell-nvidia-secure-runtime"
translationKey: "openshell-nvidia"
excerpt: "Agent AI ma czytać pliki, wołać API i używać narzędzi — ale nie musi przy tym widzieć Twoich kluczy ani całej sieci. Zainstalowaliśmy OpenShell od NVIDIA na macOS bez Dockera i sprawdziliśmy, co z tej obietnicy działa naprawdę."
publishedAt: 2026-11-12
author: "Marcin Ołdak"
category: "case-study"
tags: [tutorial]
cover: "/articles/covers/openshell-nvidia-secure-runtime.png"
coverAlt: "Okładka: OpenShell — bezpieczny runtime dla agentów AI, test na macOS"
readingTime: 8
featured: false
draft: true
lang: pl
metaTitle: "OpenShell (NVIDIA) — test bezpiecznego runtime dla agentów AI"
metaDescription: "Testujemy OpenShell 0.1.8 na macOS: sandbox microVM, polityki YAML, formalna weryfikacja dostępu i blokowanie ruchu agenta."
keywords: ["OpenShell", "NVIDIA", "agent security", "AI governance", "sandbox", "microVM", "policy as code"]
---

Agent, któremu dajesz dostęp do plików i internetu, jest jak pracownik z kluczami do wszystkich drzwi i bez kamer. Do tej pory rozwiązania „sandbox dla agenta" kończyły się zwykle na: zaufaj albo odmów wszystkiego. NVIDIA w marcu 2026 wydała OpenShell — open-source'owy runtime, który ma dać agentom realne możliwości przy twardych, audytowalnych granicach. Przetestowaliśmy go na własnym macOS (Apple Silicon, bez Dockera). Poniżej to, co się okazało — w tym jedno twierdzenie z materiałów, którego nie potwierdziliśmy.

## Co to jest OpenShell

OpenShell to środowisko uruchomieniowe dla agentów AI złożone z czterech elementów:

- **Sandbox** — odizolowane środowisko pracy agenta (kontener albo mikro-VM), z egzekucją polityki na poziomie jądra: każdy dostęp do pliku, syscalł i połączenie sieciowe przechodzi przez kontrolę.
- **Gateway** — płaszczyzna sterowania: zarządza sandboxami, politykami i uwierzytelnianiem.
- **Polityki YAML** — deklaratywnie opisujesz, co agent może: które ścieżki czytać, które hosty i metody HTTP wołać, jakie binarki mogą korzystać z sieci. Domyślnie wszystko zablokowane (deny-by-default), dostęp otwierasz regułami.
- **Prover** — formalna weryfikacja: zanim zatwierdzisz nową politykę, solver sprawdza, czy przypadkiem nie otwiera czegoś więcej, niż deklaruje. Dostajesz odpowiedź `within_boundary` albo `exceeds_boundary` z konkretnym kontrprzykładem.

Najciekawszy pomysł: **agent nigdy nie widzi prawdziwych kluczy API**. OpenShell wstrzykuje je tylko do żądań skierowanych na zaakceptowane endpointy. Agent może korzystać z GitHuba czy bazy danych, nie mając dostępu do tokena w czystej postaci.

Kontekst, którego często brakuje w skrótach: OpenShell jest częścią większej platformy NVIDIA (Open Agent Safety Platform — obok sprzętowego watchdog'a Sentry na DPU BlueField-4 i systemów Vera), a projekt **przechodzi pod skrzydła CNCF** (organizacja `ai-openshell`). NemoClaw — wzmocniona wersja runtime'u dla agentów — buduje na OpenShell mechanizmy Landlock/seccomp. Microsoft w swoim MXC używa OpenShell do zaawansowanych kontroli sieci i audytu w formacie OCSF. To wygląda na kandydata na standard, a nie na kolejny zamknięty produkt.

## Co zrobiliśmy: macOS, Apple Silicon, bez Dockera

Przeprowadziliśmy pełny przebieg na macOS 27 (M2, arm64), 12 listopada 2026, na wersji **0.1.8** (wydanej 10.11.2026). Wyniki:

1. **Instalacja:** `brew install openshell` przechodzi bez problemu (0.1.8). Uwaga: brew nie instaluje drivera VM — binarkę `openshell-driver-vm` trzeba dobrać z assets wydania v0.1.8 i położyć w `~/.local/libexec/openshell/` (sumy kontrolne SHA-256 się zgadzają).
2. **Gateway:** startuje lokalnie na `127.0.0.1:17670` z driverem `vm` (Apple Hypervisor — bez Dockera, bez Kontenerów). Wymaga jawnie: `OPENSHELL_COMPUTE_DRIVER=vm`, wyłączenia TLS (`OPENSHELL_DISABLE_TLS=true` — tylko do testów lokalnych) i wpisu `allow_unauthenticated_users = true` w configu TOML.
3. **Podpisywanie sandboxów:** `sandbox create` bez kluczy odrzuca żądanie — potrzebne są klucze Ed25519 (`signing.pem`, `public.pem`, `kid`) pod `~/.local/state/openshell/tls/jwt/`. Generujemy je `openssl genpkey -algorithm ED25519` (uwaga: systemowy openssl na macOS tego nie umie — działa openssl@3 z Homebrew).
4. **Sandbox:** `sandbox create` pobiera obraz `nvcr.io/nvidia/base/ubuntu:24.04` (512 MB), uruchamia mikro-VM, stan przechodzi do **Ready**. W środku: `Linux 6.12.109 aarch64`, osobny użytkownik `ubuntu` (uid 1000).
5. **Egress:** próba połączenia z sandboxa na `1.1.1.1:443` — **BLOCKED**. Domyślnie agent nie ma żadnego dostępu sieciowego. Dokładnie to, co obiecują dokumenty.
6. **Prover:** dla pary polityk (granica: pełny dostęp do GitHub API; kandydat: to samo + nowy host) prover zwrócił `exceeds_boundary` z kontrprzykładem wskazującym dokładnie dodany host (`evil.example.com:443`, metoda GET). Kandydat zawarty w granicy → `within_boundary`.

Całość, od zera do działającego sandboxa z polityką, zajęła nam kilkanaście minut — w tym czas na znalezienie powyższych pułapek.

## Co to zmienia dla małych firm i biur

Argumenty, które realnie da się postawić klientowi po tym teście:

- **Agent nie dostaje kluczy.** Nawet jeśli model dostanie prompt injection i „zechcieć" wykradnąć sekret, sekretu nie ma w jego zasięgu — OpenShell dokłada go tylko do ruchu na zaakceptowany endpoint.
- **Domyślnie nic nie wychodzi na zewnątrz.** Każde połączenie musi mieć regułę: host, port, protokół, metoda, ścieżka, a nawet konkretna binarka, która może ten ruch wykonać.
- **Zmiany uprawnień są weryfikowalne formalnie,** a nie „oczywiste na oko" — prover pokaże kontrprzykład, zanim otworzysz agentowi nowy obszar.
- **Ślad audytowy** — decyzje allow/deny są logowane; w integracji z Microsoft MXC w formacie OCSF, gotowym do wciągnięcia do narzędzi SIEM.

Dla biur rachunkowych i MŚP to przekłada się na konkretną ofertę: wdrożenie agenta AI z granicami dostępu opisanymi na piśmie, testowalnymi i audytowalnymi — zamiast „zaufaj nam, działa w chmurze".

## Ograniczenia, o których trzeba powiedzieć wprost

- **To wersja 0.1.x.** Aktywnie rozwijana (releasy co tydzień, repo liczy 21 481 gwiazdek i 657 otwartych issue na dzień 12.11.2026), ale API i zachowania jeszcze się zmienią. Na produkcję klienta — nie teraz.
- **macOS nie jest „one-command".** Pięć kroków ręcznie (instalacja, driver VM, klucze, config, start). Na Linuksie jest prościej (paczki .deb/.rpm), Windows dopiero przez WSL2 (eksperymentalnie) albo MXC.
- **Prover pokrywa pięć domen:** filesystem, network L4, network REST, procesy, Landlock. Polityki sieciowe potrafią opisywać MCP i GraphQL, ale poza zakresem provera formalnej gwarancji nie dostaniesz — tam zostaje zwykła ewaluacja reguł.
- **Telemetria domyślnie włączona** — przy wdrożeniach u klienta trzeba to świadomie skonfigurować i opisać w polityce prywatności.

## Werdykt

**Testować: tak. Wdrażać klientom na produkcji: jeszcze nie.**

OpenShell jako fundament warstwy bezpieczeństwa agentów ma sens zwłaszcza tam, gdzie agent dostaje dostęp do realnych systemów: plików firmowych, API, automatyzacji. Polityki jako kod + formalna weryfikacja + wstrzykiwanie kluczy na endpoint to obecnie najciekawszy zestaw w otwartej strefie — i przechodząc do CNCF, ma spore szanse stać się wspólnym mianownikiem branży. Nasz plan: budować na tym wewnętrzne standardy wdrożeń agentów i wrócić z case study, gdy zestaw dojrzyje do produkcji.

## Spróbuj sam (macOS Apple Silicon, ~15 minut)

```sh
# 1. Instalacja CLI
brew install openshell

# 2. Driver VM (brew go nie instaluje — bierz z release i zweryfikuj SHA-256)
mkdir -p ~/.local/libexec/openshell
curl -L -o /tmp/dvm.tar.gz \
  https://github.com/NVIDIA/OpenShell/releases/download/v0.1.8/openshell-driver-vm-aarch64-apple-darwin.tar.gz
shasum -a 256 /tmp/dvm.tar.gz   # porównaj z openshell-checksums-sha256.txt w release
tar -xzf /tmp/dvm.tar.gz -C ~/.local/libexec/openshell

# 3. Klucze podpisu sandboxów (Ed25519)
S=~/.local/state/openshell/tls/jwt; mkdir -p $S
O=/opt/homebrew/opt/openssl@3/bin/openssl   # systemowy openssl na macOS nie umie Ed25519
$O genpkey -algorithm ED25519 -out $S/signing.pem
$O pkey -in $S/signing.pem -pubout -out $S/public.pem
python3 -c "import secrets; print(secrets.token_hex(16))" > $S/kid

# 4. Config gatewaya (gateway.toml):
#    [openshell]
#    version = 2
#    [openshell.gateway.auth]
#    allow_unauthenticated_users = true

# 5. Start gatewaya i sandbox
OPENSHELL_COMPUTE_DRIVER=vm OPENSHELL_DISABLE_TLS=true \
  OPENSHELL_LOCAL_TLS_DIR=~/.local/state/openshell/tls \
  openshell-gateway --config gateway.toml
openshell sandbox create --name demo
openshell sandbox exec demo -- uname -a
```

Pełny zapis naszego testu (z pułapkami i wynikami pośrednimi) trzymamy w notesie roboczym; polityki przykładowe z testu provera są do wzięcia poniżej artykułu jako załączniki.

---

*Metoda: własny test na macOS 27 (M2, arm64) 12.11.2026, OpenShell 0.1.8; liczby repo z GitHub API (12.11.2026); porównanie runtime'ów wg raportu CSA „Agent Containment Runtimes Compared" (27.10.2026); dokumentacja docs.nvidia.com/openshell. Artykuł przygotowany z agentem AI, każdy fakt techniczny zweryfikowany wykonaniem.*
