#!/usr/bin/env python3
"""gen-report-figures.py — plansze danych do raportów: skrypt → HTML+SVG → PNG (Chromium).

Zasady (anti-ai-web-design: plansze generowane z danych, nie malowane):
- wymiar = wartość: szerokość/słupek liczony z danych, zero "na oko",
- na planszy: mono kicker (FIG. N), tytuł serif, wartość przy słupku,
  stopka ze źródłem + rokiem (status źródeł NA rysunku, nie w stopce PDF),
- paleta think-tank B/W: canvas #fbfbfa, atrament #111, linie #eaeaea,
- guardy (assert) przed renderem: wartości > 0, skala, obecność markerów.

Użycie:  python3 scripts/gen-report-figures.py   (potem regeneracja PDF)
Wyjście:  public/reports/figures/fig-{i,ii,iii}-*.png
"""
import importlib.util
import pathlib
import subprocess
import sys

HERE = pathlib.Path(__file__).resolve().parent
REPO = HERE.parent
OUT = REPO / "public/reports/figures"
OUT.mkdir(parents=True, exist_ok=True)

# @font-face prosto z repo strony (ta sama metoda co gen-report-pdf)
spec = importlib.util.spec_from_file_location("grp", HERE / "gen-report-pdf.py")
assert spec and spec.loader, "brak gen-report-pdf.py"
grp = importlib.util.module_from_spec(spec)
spec.loader.exec_module(grp)
FONTS = grp.font_faces()

W, H = 1240, 700  # 16:9-ish; render @2x

PAGE = """<!doctype html><html lang="pl"><head><meta charset="utf-8"><style>
{fonts}
* {{ box-sizing: border-box; }}
html, body {{ margin:0; padding:0; width:{w}px; height:{h}px; overflow:hidden; }}
body {{ background:#fbfbfa; font-family:'Geist', system-ui, sans-serif; color:#2f3437; padding:34px 40px 28px; }}
.kicker {{ font-family:'Geist Mono', ui-monospace, monospace; font-size:13px; letter-spacing:.14em;
  text-transform:uppercase; color:#787774; display:flex; justify-content:space-between; }}
h1 {{ font-family:'Newsreader', Georgia, serif; font-weight:700; font-size:30px; color:#111;
  margin:10px 0 4px; letter-spacing:-0.01em; }}
.sub {{ font-family:'Newsreader', Georgia, serif; font-style:italic; font-size:16px; color:#787774; margin:0 0 14px; }}
svg {{ display:block; }}
.foot {{ position:absolute; left:40px; right:40px; bottom:24px; display:flex; justify-content:space-between;
  font-family:'Geist Mono', ui-monospace, monospace; font-size:12px; letter-spacing:.08em;
  text-transform:uppercase; color:#787774; border-top:1px solid #eaeaea; padding-top:10px; }}
</style></head><body>
<div class="kicker"><span>{fig_no}</span><span>MJ.OLDAK · 20.10.2026</span></div>
<h1>{title}</h1>
<p class="sub">{sub}</p>
{svg}
<div class="foot"><span>{source}</span><span>mjoldak.pl</span></div>
</body></html>"""


def _pl(v: float) -> str:
    return f"{v:.1f}".replace(".", ",")


def bars_vertical(items, unit, max_val, w, h, pl_label="Polska", ue_label="UE-27"):
    """Grupowane słupki pionowe: items = [(etykieta, pl, ue), ...]. Wysokość = wartość/skala."""
    assert all(pl >= 0 and ue >= 0 for _, pl, ue in items)
    scale = h / max_val
    n = len(items)
    gw = w / n           # szerokość grupy
    bw = gw * 0.26       # słupek
    gap = gw * 0.06
    parts = []
    # linia siatki co 10 jednostek
    tick = 10 if max_val <= 40 else 5000
    v = tick
    while v < max_val:
        y = h - v * scale
        parts.append(f'<line x1="0" y1="{y:.1f}" x2="{w}" y2="{y:.1f}" stroke="#eaeaea" stroke-width="1"/>')
        parts.append(f'<text x="{w+6}" y="{y+4:.1f}" font-size="12" fill="#787774" font-family="Geist Mono, monospace">{v}</text>')
        v += tick
    parts.append(f'<line x1="0" y1="{h}" x2="{w}" y2="{h}" stroke="#111" stroke-width="1.5"/>')
    for i, (lab, pl, ue) in enumerate(items):
        cx = gw * i + gw / 2
        x1 = cx - bw - gap / 2
        x2 = cx + gap / 2
        ph, uh = pl * scale, ue * scale
        parts.append(f'<rect x="{x1:.1f}" y="{h-ph:.1f}" width="{bw:.1f}" height="{ph:.1f}" fill="#111"/>')
        parts.append(f'<rect x="{x2:.1f}" y="{h-uh:.1f}" width="{bw:.1f}" height="{uh:.1f}" fill="#fbfbfa" stroke="#111" stroke-width="1.5"/>')
        parts.append(f'<text x="{x1+bw/2:.1f}" y="{h-ph-8:.1f}" font-size="15" font-weight="600" fill="#111" text-anchor="middle" font-family="Geist, sans-serif">{_pl(pl)}</text>')
        parts.append(f'<text x="{x2+bw/2:.1f}" y="{h-uh-8:.1f}" font-size="15" fill="#2f3437" text-anchor="middle" font-family="Geist, sans-serif">{_pl(ue)}</text>')
        parts.append(f'<text x="{cx:.1f}" y="{h+26:.0f}" font-size="14" fill="#111" text-anchor="middle" font-family="Geist, sans-serif">{lab}</text>')
    # legenda
    ly = h + 46
    parts.append(f'<rect x="0" y="{ly-11}" width="14" height="14" fill="#111"/>')
    parts.append(f'<text x="20" y="{ly}" font-size="13" fill="#2f3437" font-family="Geist, sans-serif">{pl_label}</text>')
    parts.append(f'<rect x="110" y="{ly-11}" width="14" height="14" fill="#fbfbfa" stroke="#111" stroke-width="1.5"/>')
    parts.append(f'<text x="130" y="{ly}" font-size="13" fill="#2f3437" font-family="Geist, sans-serif">{ue_label}</text>')
    return f'<svg width="{w}" height="{ly+14}" viewBox="0 0 {w+60} {ly+14}">{"".join(parts)}</svg>', ly + 14


def bars_range(rows, lo, hi, w, h, step, unit_suffix):
    """Poziome przedziały min–max z markerem opt. rows = [(etykieta, min, opt, max)]."""
    assert all(0 < mn <= op <= mx for _, mn, op, mx in rows)
    span = hi - lo
    x = lambda v: (v - lo) / span * w
    parts = []
    # oś z etykietą początku (6 tys.) i zapasem po prawej, żeby „20 tys." się nie ucinał
    parts.append(f'<line x1="0" y1="0" x2="0" y2="{h-24}" stroke="#eaeaea"/>')
    parts.append(f'<text x="0" y="{h-6}" font-size="12" fill="#787774" font-family="Geist Mono, monospace">{lo//1000} tys.</text>')
    v = lo + step
    while v <= hi:
        parts.append(f'<line x1="{x(v):.0f}" y1="0" x2="{x(v):.0f}" y2="{h-24}" stroke="#eaeaea"/>')
        if v < hi:
            parts.append(f'<text x="{x(v):.0f}" y="{h-6}" font-size="12" fill="#787774" text-anchor="middle" font-family="Geist Mono, monospace">{v//1000} tys.</text>')
        else:
            parts.append(f'<text x="{x(v):.0f}" y="{h-6}" font-size="12" fill="#787774" text-anchor="end" font-family="Geist Mono, monospace">{v//1000} tys.</text>')
        v += step
    rh = (h - 34) / len(rows)
    for i, (lab, mn, op, mx) in enumerate(rows):
        cy = rh * i + rh / 2
        y = cy - 9
        parts.append(f'<text x="0" y="{cy-16:.0f}" font-size="13.5" fill="#111" font-family="Geist, sans-serif">{lab}</text>')
        parts.append(f'<line x1="{x(mn):.0f}" y1="{cy:.0f}" x2="{x(mx):.0f}" y2="{cy:.0f}" stroke="#111" stroke-width="7" stroke-linecap="butt"/>')
        parts.append(f'<circle cx="{x(op):.0f}" cy="{cy:.0f}" r="7" fill="#fbfbfa" stroke="#111" stroke-width="2.5"/>')
        parts.append(f'<text x="{x(mx)+12:.0f}" y="{cy+5:.0f}" font-size="13" fill="#2f3437" font-family="Geist Mono, monospace">{mn//1000}–{mx//1000}{unit_suffix}</text>')
    return f'<svg width="{w}" height="{h}" viewBox="0 0 {w} {h}">{"".join(parts)}</svg>'


def render(name: str, html_doc: str, marker: str):
    assert marker in html_doc, f"marker {marker} nieobecny w HTML"
    src = OUT / f"{name}.html"
    src.write_text(html_doc, encoding="utf-8")
    png = OUT / f"{name}.png"
    chrome = next((pathlib.Path.home() / ".hermes/tools").glob(
        "chromium-*/chrome-mac-arm64/*.app/Contents/MacOS/*"), None)
    if not chrome:
        sys.exit("BRAK chromium")
    subprocess.run([str(chrome), "--headless", "--disable-gpu", "--hide-scrollbars",
                    "--force-device-scale-factor=2", f"--window-size={W},{H}",
                    f"--screenshot={png}", f"file://{src}"], check=True, capture_output=True, timeout=120)
    size = png.stat().st_size
    assert size > 15_000, f"{png.name} za mały: {size} B"
    print(f"OK {png} ({size} B)")


def main():
    # FIG. I — Eurostat: adopcja AI PL vs UE (dane z receipta isoc_eb_ai, pobr. 15.10.2026)
    svg1, h1 = bars_vertical(
        [("Firmy 10–49 osób", 5.8, 17.0), ("Firmy 50–249 osób", 14.8, 30.4)],
        unit="%", max_val=32, w=1100, h=340)
    doc1 = PAGE.format(fonts=FONTS, w=W, h=H, fig_no="FIG. I · adopcja AI",
                       title="Polskie firmy nie przegrywają ceną. Przegrywają decyzją.",
                       sub="Użycie technologii AI, 2025 — Polska vs UE-27 (%)",
                       svg=svg1,
                       source="Eurostat isoc_eb_ai · rok 2025 · pobr. 15.10.2026")
    render("fig-i-adopcja-ai", doc1, "17,0")

    # FIG. II — widełki płac (Verita/JJIT + Hays 2026)
    rows = [
        ("Data Analyst — UoP brutto", 7900, 14645, 18000),
        ("Analityk Danych — instytucje finansowe", 10000, 13000, 15000),
        ("Analityk Finansowy", 12000, 14000, 15000),
        ("Analityk Biznesowy", 13000, 15000, 18000),
    ]
    svg2 = bars_range(rows, lo=6000, hi=20000, w=1060, h=310, step=2000, unit_suffix=" tys.")
    doc2 = PAGE.format(fonts=FONTS, w=W, h=H, fig_no="FIG. II · wynagrodzenia",
                       title="Widełki analityka w Polsce, 2026",
                       sub="Min – opt – max, PLN/mies. (kropka = opt)",
                       svg=svg2,
                       source="Verita HR × JustJoinIT 2026 · Hays Raport płacowy 2026")
    render("fig-ii-widelki", doc2, "18 tys.")

    # FIG. III — UODO: naruszenia 2024 → 2025 (skala proporcjonalna)
    a, b = 14842, 22435
    assert b > a
    svg3, h3 = bars_vertical([("Zgłoszone naruszenia danych w PL", a, b)],
                             unit="", max_val=24000, w=760, h=330,
                             pl_label="2024", ue_label="2025")
    doc3 = PAGE.format(fonts=FONTS, w=W, h=H, fig_no="FIG. III · naruszenia danych",
                       title="Naruszenia danych w Polsce rosną: +51% w rok",
                       sub="Zgłoszenia do Prezesa UODO: 14 842 (2024) → 22 435 (2025)",
                       svg=svg3,
                       source="UODO, sprawozdania 2024 i 2025 · odczyt 20.10.2026")
    render("fig-iii-naruszenia", doc3, "22 435")


if __name__ == "__main__":
    main()