#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
OUT="$SCRIPT_DIR/../../public/social"
mkdir -p "$OUT"

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
HTML="file://$SCRIPT_DIR/index.html"

if [ ! -f "$CHROME" ]; then
  echo "ERROR: Chrome not found at $CHROME"
  exit 1
fi

SLIDES=("slide-1" "slide-2" "slide-3" "slide-4" "slide-5" "square-aiact" "quote-aiact")

for id in "${SLIDES[@]}"; do
  echo "→ rendering $id"
  "$CHROME" \
    --headless=new \
    --disable-gpu \
    --hide-scrollbars \
    --no-sandbox \
    --window-size=1080,1080 \
    --virtual-time-budget=3000 \
    --allow-file-access-from-files \
    --screenshot="$OUT/$id.png" \
    "$HTML#$id" 2>/dev/null
done

echo ""
echo "✓ Generated ${#SLIDES[@]} PNGs in $OUT"
ls -lh "$OUT"
