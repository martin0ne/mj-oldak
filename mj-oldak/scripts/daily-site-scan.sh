#!/bin/bash
# daily-site-scan.sh — codzienny skan stron MJ.OLDAK (14.10.2026)
# Część deterministiczna routine'y „zespołu agentów": skanuje LIVE + repo,
#pisze raport do reports/, zwraca liczbę findingów 🔴 jako exit code.
# Agent (cron) czyta raport, komentuje i decyduje o wysyłce.
set -uo pipefail

REPO="$(cd "$(dirname "$0")/.." && pwd)"
OUT_DIR="$REPO/reports"
mkdir -p "$OUT_DIR"
OUT="$OUT_DIR/site-scan-$(date +%Y-%m-%d).md"
LIVE="https://www.mjoldak.pl"
DEMO="https://demo.mjoldak.pl"
RED=0; WARN=0

{
  echo "# Site scan — $(date '+%Y-%m-%d %H:%M')"
  echo
  echo "## 1. Dostępność (HTTP)"
} > "$OUT"

check_http() {
  local url="$1" label="$2" code
  code=$(curl -s -o /dev/null -w '%{http_code}' -L --max-time 20 "$url" || echo 000)
  if [ "$code" = "200" ]; then
    echo "- ✅ $label → $code" >> "$OUT"
  else
    echo "- 🔴 $label → $code ($url)" >> "$OUT"; RED=$((RED+1))
  fi
}

# Uwaga: hosting serwuje fallback (index.html) z kodem 200 dla ścieżek bez pliku —
# same kody 200 kłamią, więc KAŻDA ścieżka dostaje asercję treści.
check_page() {
  local url="$1" label="$2" marker="$3"
  local html; html=$(curl -s -L --retry 2 --retry-delay 1 --retry-all-errors --max-time 25 "$url" || true)
  if [ -z "$html" ]; then echo "- 🔴 $label → brak odpowiedzi ($url)" >> "$OUT"; RED=$((RED+1)); return; fi
  local hits; hits=$(printf '%s' "$html" | grep -cF "$marker" || true)
  if [ "$hits" = "0" ]; then
    sleep 2
    html=$(curl -s -L --retry 2 --retry-delay 1 --retry-all-errors --max-time 25 "$url" || true)
    hits=$(printf '%s' "$html" | grep -cF "$marker" || true)
  fi
  if [ "${hits:-0}" != "0" ]; then
    echo "- ✅ $label → 200 + treść OK" >> "$OUT"
  else
    echo "- 🔴 $label → ODPOWIEDŹ BEZ TREŚCI (fallback? blokada? — $url)" >> "$OUT"; RED=$((RED+1))
  fi
}
check_page "$LIVE/"  "mjoldak.pl (home)"   "Marcin J. Ołdak"
check_page "$LIVE/artykuly/"     "blog /artykuly/" "artykuly"
check_page "$LIVE/polityka-prywatnosci/" "polityka prywatności" "Administratorem"
check_page "$LIVE/sitemap-index.xml" "sitemap-index.xml" "<sitemapindex"
check_page "$LIVE/robots.txt"    "robots.txt"         "User-agent"
check_page "$DEMO/"              "demo.mjoldak.pl"    "AI dla MŚP"
# strony z gauge'a — żyją dopiero po pushu gałęzi (warn, nie red)
check_page_or_warn() {
  local url="$1" label="$2" marker="$3"
  local html; html=$(curl -s -L --retry 2 --retry-delay 1 --retry-all-errors --max-time 20 "$url" || true)
  if [ "$(printf '%s' "$html" | grep -cF "$marker" || true)" != "0" ]; then echo "- ✅ $label → live" >> "$OUT"
  else echo "- ⚠️ $label → brak (niepushowane — push czeka)" >> "$OUT"; WARN=$((WARN+1)); fi
}
check_page_or_warn "$LIVE/demy/"      "/demy/"      "Cztery dema"
check_page_or_warn "$LIVE/newsletter/" "/newsletter/" "raz w miesiącu"

{
  echo
  echo "## 2. Fingerprinty AI-slop na LIVE (home)"
} >> "$OUT"
HOME_HTML=$(curl -s -L --max-time 25 "$LIVE/" || true)
for pat in "animate-pulse" "linear-gradient" "radial-gradient" "CDATA" "Wrocław"; do
  n=$(printf '%s' "$HOME_HTML" | grep -o "$pat" | wc -l | tr -d ' ')
  if [ "$n" = "0" ]; then echo "- ✅ $pat: 0" >> "$OUT"
  else echo "- ⚠️ $pat: $n wystąpień" >> "$OUT"; WARN=$((WARN+1)); fi
done
emoji=$(printf '%s' "$HOME_HTML" | python3 -c "
import sys
t = sys.stdin.read()
hits = sum(1 for ch in t if 0x1F300 <= ord(ch) <= 0x1FAFF or 0x2600 <= ord(ch) <= 0x27BF)
print(hits)")
echo "- ${emoji:+$([ "$emoji" = "0" ] && echo '✅' || echo '⚠️')} emoji: $emoji" >> "$OUT"
[ "$emoji" != "0" ] && WARN=$((WARN+1))

{
  echo
  echo "## 3. Prawo (regresja gate'ów)"
} >> "$OUT"
code=$(curl -s -o /dev/null -w '%{http_code}' --max-time 15 -X POST -H 'Content-Type: application/json' -d '{}' "$LIVE/api/newsletter/subscribe" || echo 000)
if [ "$code" = "400" ]; then echo "- ✅ newsletter bez zgody → 400 (blokuje)" >> "$OUT"
else echo "- 🔴 newsletter bez zgody → $code (oczekiwane 400!)" >> "$OUT"; RED=$((RED+1)); fi
code=$(curl -s -o /dev/null -w '%{http_code}' --max-time 15 -X POST -H 'Content-Type: application/json' -d '{}' "$LIVE/api/contact/submit" || echo 000)
if [ "$code" = "400" ]; then echo "- ✅ kontakt bez zgody → 400 (blokuje)" >> "$OUT"
else echo "- 🔴 kontakt bez zgody → $code (oczekiwane 400!)" >> "$OUT"; RED=$((RED+1)); fi

{
  echo
  echo "## 4. Repo vs live (drift)"
} >> "$OUT"
if git -C "$REPO" rev-parse --abbrev-ref HEAD >/dev/null 2>&1; then
  BR=$(git -C "$REPO" rev-parse --abbrev-ref HEAD)
  git -C "$REPO" fetch origin --quiet 2>/dev/null || true
  AHEAD=$(git -C "$REPO" rev-list --count origin/main..HEAD 2>/dev/null || echo '?')
  LIVEC=$(git -C "$REPO" rev-parse --short origin/main 2>/dev/null || echo '?')
  echo "- gałąź: $BR · $AHEAD commity przede mną względem origin/main ($LIVEC = live)" >> "$OUT"
  if [ "$AHEAD" != "0" ] && [ "$AHEAD" != "?" ]; then
    echo "- ⚠️ praca na gałęzi nie jest na żywo — push czeka ($AHEAD)" >> "$OUT"; WARN=$((WARN+1))
  fi
fi

{
  echo
  echo "## 5. Świeżość treści"
} >> "$OUT"
ART=$(curl -s -L --max-time 20 "$LIVE/artykuly/" | grep -o 'href="/artykuly/[^"]*"' | sort -u | wc -l | tr -d ' ')
echo "- artykułów na liście bloga live: ${ART:-?}" >> "$OUT"
HOMENEW=$(curl -s -L --max-time 20 "$LIVE/" | grep -cF "Działam niezależnie" || true)
if [ "${HOMENEW:-0}" != "0" ]; then echo "- ✅ live niesie narrację 2026 (Działam niezależnie)" >> "$OUT"
else echo "- ⚠️ live BEZ narracji 2026 — stara wersja na produkcji" >> "$OUT"; WARN=$((WARN+1)); fi

{
  echo
  echo "---"
  echo "SUMMARY: 🔴 $RED · ⚠️ $WARN"
} >> "$OUT"

echo "$OUT"
exit "$RED"
