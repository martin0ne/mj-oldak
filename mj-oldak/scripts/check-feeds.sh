#!/usr/bin/env bash
# check-feeds.sh — sprawdza feedy RSS dla /pnews/ PRZED pierwszym buildem.
# Reguła PNEWS-WARSTWA.md §3: „do weryfikacji żywo przed pierwszym buildem".
# Usage: bash scripts/check-feeds.sh
set -uo pipefail

FEEDS=(
  # --- AI ---
  "AI|spidersweb|https://spidersweb.pl/feed/"
  "AI|benchmark|https://www.benchmark.pl/rss.xml"
  "AI|techcrunch-ai|https://techcrunch.com/category/artificial-intelligence/feed/"
  "AI|theverge-ai|https://www.theverge.com/rss/ai-artificial-intelligence/index.xml"
  "AI|wired-ai|https://www.wired.com/feed/tag/ai/latest/rss"
  "AI|ars-tech|https://feeds.arstechnica.com/arstechnica/technology-lab"
  "AI|venturebeat-ai|https://venturebeat.com/category/ai/feed/"
  "AI|niebezpiecznik|https://niebezpiecznik.pl/feed/"
  # --- GEO ---
  "GEO|biznesalert|https://biznesalert.pl/feed/"
  "GEO|money|https://www.money.pl/rss/"
  "GEO|wnp|https://www.wnp.pl/rss/"
  "GEO|cyberdefence24|https://cyberdefence24.pl/feed"
  "GEO|defence24|https://www.defence24.pl/feed"
  "GEO|isw|https://www.understandingwar.org/rss.xml"
  # --- EU ---
  "EU|europarl|https://www.europarl.europa.eu/rss/doc/press-releases/pl.xml"
  "EU|euronews|https://www.euronews.com/rss"
  "EU|bankier|https://www.bankier.pl/rss"
  "EU|pap|https://www.pap.pl/biznes-i-finanse?output=rss"
  # --- WORLD ---
  "WORLD|bbc-world|http://feeds.bbci.co.uk/news/world/rss.xml"
  "WORLD|bbc-tech|http://feeds.bbci.co.uk/news/technology/rss.xml"
  "WORLD|nyt-world|https://rss.nytimes.com/services/xml/rss/nyt/World.xml"
  "WORLD|npr-world|https://feeds.npr.org/1001/rss.xml"
)

printf "%-6s %-14s %6s  %s\n" "SOCZ" "ŹRÓDŁO" "POZ." "TYTUŁ KANAŁU"
printf -- "---------------------------------------------------------------------------\n"

OK=0; TOTAL=0
for row in "${FEEDS[@]}"; do
  IFS='|' read -r lens name url <<<"$row"
  TOTAL=$((TOTAL + 1))
  UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36"
  body=$(curl -sL --max-time 20 -A "$UA" "$url" 2>/dev/null)
  code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 20 -A "$UA" "$url" 2>/dev/null)

  if [ -z "$body" ]; then
    printf "%-6s %-14s %6s  MARTWY (HTTP %s)\n" "$lens" "$name" "-" "$code"
    continue
  fi
  if ! echo "$body" | head -c 4000 | grep -qiE '<rss|<feed|<channel'; then
    printf "%-6s %-14s %6s  NIE RSS (HTTP %s)\n" "$lens" "$name" "-" "$code"
    continue
  fi
  items=$(echo "$body" | grep -ciE '<item[ >]|<entry[ >]' || echo 0)
  title=$(echo "$body" | head -c 6000 | grep -oiE '<title>[^<]{2,80}</title>' | head -1 | sed -E 's/<\/?title>//g' | tr -s ' ')
  if [ "${items:-0}" -eq 0 ]; then
    printf "%-6s %-14s %6s  RSS BEZ POZYCJI\n" "$lens" "$name" "0"
    continue
  fi
  OK=$((OK + 1))
  printf "%-6s %-14s %6s  %s\n" "$lens" "$name" "$items" "${title:-bez tytułu}"
done

printf -- "---------------------------------------------------------------------------\n"
echo "ŻYWYCH RSS: $OK / $TOTAL"
echo "Cel MVP: 12–15 sprawdzonych (PNEWS-WARSTWA.md §5)"
