#!/bin/bash
# verify-refresh.sh — bramka bezpieczeństwa PRZED pushem mjoldak.pl
# Użycie: bash scripts/verify-refresh.sh [--mobile]
# Exit 0 = czysto, exit 1 = blokada (nie pushować!)
set -eu
cd "$(dirname "$0")/.."

FAIL=0
note() { echo "── $1"; }

note "1/5 build Astro"
npm run build >/tmp/mjo-verify-build.log 2>&1 || { echo "BUILD FAILED (log: /tmp/mjo-verify-build.log)"; exit 1; }
echo "   OK: $(grep -c '' /tmp/mjo-verify-build.log) linii, $(grep -o '[0-9]* page(s) built' /tmp/mjo-verify-build.log | tail -1)"

note "2/5 stare kolory Coastal (musi być 0)"
OLD=$(grep -rliE "E4DBCD|CAC2AE|0D1B32|4F8EBA|C87E3B|202,194,174|200,126,59" dist --include='*.html' --include='*.css' 2>/dev/null | wc -l | tr -d ' ' || true)
echo "   plików ze starymi kolorami: $OLD"
[ "$OLD" -eq 0 ] || FAIL=1

note "3/5 emoji w dist (musi być 0)"
EMO=$(python3 -c "import re,glob; print(sum(len(re.findall(r'[\U0001F300-\U0001FAFF]', open(f,encoding='utf-8',errors='ignore').read())) for f in glob.glob('dist/**/*.html', recursive=True)))")
echo "   emoji: $EMO"
[ "$EMO" -eq 0 ] || FAIL=1

note "4/5 obce skrypty (CJK/cyrylica) w src i dist (musi być 0)"
BAD=$(python3 -c "
import re, glob
pat = re.compile(r'[\u3000-\u9fff\uff00-\uffef\u0400-\u04FF]')
n = 0
for f in glob.glob('src/**/*.astro', recursive=True) + glob.glob('src/**/*.jsx', recursive=True) + glob.glob('dist/**/*.html', recursive=True):
    try: n += len(pat.findall(open(f, encoding='utf-8', errors='ignore').read()))
    except: pass
print(n)")
echo "   obcych znaków: $BAD"
[ "$BAD" -eq 0 ] || FAIL=1

note "5/5 fingerprinty AI-slop (tylko raport)"
PULSE=$(grep -rlo 'animate-pulse' src 2>/dev/null | wc -l | tr -d ' ' || true)
GRAD=$(grep -rloE 'linear-gradient|radial-gradient' src 2>/dev/null | wc -l | tr -d ' ' || true)
PILL=$(grep -ro 'rounded-full' src 2>/dev/null | wc -l | tr -d ' ' || true)
echo "   animate-pulse: $PULSE plików | gradienty: $GRAD plików | rounded-full: $PILL wystąpień"

if [ "${1:-}" = "--mobile" ]; then
  note "6/6 mobile 390 (playwright)"
  uv run --with playwright python - <<'PY' || FAIL=1
from playwright.sync_api import sync_playwright
import subprocess, time, signal, os
srv = subprocess.Popen(["python3","-m","http.server","8792","--directory","dist"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
time.sleep(1.5)
try:
    with sync_playwright() as p:
        b = p.chromium.launch(headless=True, channel="chrome")
        pg = b.new_page(viewport={"width":390,"height":844})
        pg.goto("http://127.0.0.1:8792/", wait_until="networkidle", timeout=45000)
        sw, iw = pg.evaluate("document.documentElement.scrollWidth"), pg.evaluate("window.innerWidth")
        print(f"   scrollWidth {sw} / innerWidth {iw}:", "OK" if sw <= iw else "PRZECIECIE")
        b.close()
        raise SystemExit(0 if sw <= iw else 1)
finally:
    srv.send_signal(signal.SIGTERM)
PY
fi

echo
[ "$FAIL" -eq 0 ] && echo "WERYFIKACJA: PASS — można prosić o push" || echo "WERYFIKACJA: FAIL — NIE pushować"
exit $FAIL
