#!/usr/bin/env python3
"""gen-report-pdf.py — MD raportu → HTML (styl mjoldak.pl) → PDF (headless Chromium).

Użycie:
    python3 scripts/gen-report-pdf.py docs/RAPORT-X.md [--kicker "RAPORT ANALITYCZNY"]

- Fonty: @font-face kopiowane z src/styles (Newsreader/Geist/Geist Mono, unicode-range
  z latin-ext — polskie znaki działają), url(/fonts/...) → ../public/fonts/...
- HTML trafia obok MD, PDF → public/reports/.
- Regeneracja = ten sam skrypt (MD = źródło prawdy, nie edytuj HTML-a).
"""
import argparse
import html
import pathlib
import re
import subprocess
import sys

REPO = pathlib.Path(__file__).resolve().parent.parent
FONTS_CSS = [REPO / "src/styles/brand-fonts.css", REPO / "src/styles/global.css"]


def font_faces() -> str:
    blocks, seen = [], set()
    pat = re.compile(r"@font-face\s*\{[^}]+\}")
    for f in FONTS_CSS:
        if not f.exists():
            continue
        for b in pat.findall(f.read_text(encoding="utf-8")):
            if not any(name in b for name in ("Newsreader", "'Geist'", "'Geist Mono'")):
                continue
            b = b.replace("url(/fonts/", "url(../public/fonts/")
            if b not in seen:
                seen.add(b)
                blocks.append(b)
    if not blocks:
        sys.exit("BRAK @font-face — sprawdź src/styles/")
    return "\n".join(blocks)


def inline(t: str) -> str:
    t = html.escape(t, quote=False)
    t = re.sub(r"`([^`]+)`", r"<code>\1</code>", t)
    t = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", t)
    t = re.sub(r"(?<!\*)\*([^*\n]+)\*(?!\*)", r"<em>\1</em>", t)
    return t


def md_to_html(md: str) -> str:
    lines = md.splitlines()
    out, i = [], 0
    while i < len(lines):
        ln = lines[i]
        if ln.startswith("```"):
            out.append("<pre><code>")
            i += 1
            while i < len(lines) and not lines[i].startswith("```"):
                out.append(html.escape(lines[i]))
                i += 1
            out.append("</code></pre>")
            i += 1
            continue
        if ln.startswith("# "):
            out.append(f"<h1>{inline(ln[2:])}</h1>")
        elif ln.startswith("## "):
            out.append(f"<h2>{inline(ln[3:])}</h2>")
        elif ln.startswith("### "):
            out.append(f"<h3>{inline(ln[4:])}</h3>")
        elif ln.startswith("|"):
            block = []
            while i < len(lines) and lines[i].startswith("|"):
                block.append(lines[i])
                i += 1
            i -= 1
            rows = [r for r in block if not re.match(r"^\|[\s:\-|]+\|$", r)]
            out.append("<table><thead>")
            hdr = [c.strip() for c in rows[0].strip("|").split("|")]
            out.append("<tr>" + "".join(f"<th>{inline(c)}</th>" for c in hdr) + "</tr></thead><tbody>")
            for r in rows[1:]:
                cells = [c.strip() for c in r.strip("|").split("|")]
                out.append("<tr>" + "".join(f"<td>{inline(c)}</td>" for c in cells) + "</tr>")
            out.append("</tbody></table>")
        elif re.match(r"^- ", ln):
            out.append("<ul>")
            while i < len(lines) and re.match(r"^- ", lines[i]):
                out.append(f"<li>{inline(lines[i][2:])}</li>")
                i += 1
            i -= 1
            out.append("</ul>")
        elif re.match(r"^\d+\. ", ln):
            out.append("<ol>")
            while i < len(lines) and re.match(r"^\d+\. ", lines[i]):
                num = re.sub(r"^\d+\. ", "", lines[i])
                out.append(f"<li>{inline(num)}</li>")
                i += 1
            i -= 1
            out.append("</ol>")
        elif ln.startswith("> "):
            out.append(f"<blockquote>{inline(ln[2:])}</blockquote>")
        elif ln.strip() == "---":
            out.append("<hr>")
        elif ln.strip():
            out.append(f"<p>{inline(ln)}</p>")
        i += 1
    return "\n".join(out)


TEMPLATE = """<!doctype html>
<html lang="pl">
<head>
<meta charset="utf-8">
<title>{title}</title>
<style>
{fonts}
@page {{ size: A4; margin: 16mm 15mm 18mm; }}
:root {{ --ink: #111111; --body: #2f3437; --muted: #787774; --line: #eaeaea; }}
* {{ box-sizing: border-box; }}
html, body {{ margin: 0; padding: 0; }}
body {{
  font-family: 'Geist', system-ui, sans-serif;
  font-size: 10.5pt; line-height: 1.55; color: var(--body);
  background: #ffffff; -webkit-print-color-adjust: exact;
}}
header.report {{ border-bottom: 2px solid var(--ink); padding-bottom: 10mm; margin-bottom: 8mm; }}
.kicker {{
  font-family: 'Geist Mono', ui-monospace, monospace; font-size: 8pt;
  letter-spacing: .14em; text-transform: uppercase; color: var(--muted);
  display: flex; justify-content: space-between; margin-bottom: 6mm;
}}
h1 {{
  font-family: 'Newsreader', Georgia, serif; font-weight: 700;
  font-size: 25pt; line-height: 1.12; color: var(--ink); margin: 0 0 5mm;
  letter-spacing: -0.01em;
}}
.standfirst {{
  font-family: 'Newsreader', Georgia, serif; font-style: italic;
  font-size: 12pt; line-height: 1.45; color: var(--muted); margin: 0;
}}
h2 {{
  font-family: 'Newsreader', Georgia, serif; font-weight: 700;
  font-size: 15pt; color: var(--ink); margin: 8mm 0 2.5mm;
  border-top: 1px solid var(--ink); padding-top: 3mm;
  break-after: avoid;
}}
h3 {{ font-size: 10.5pt; font-weight: 600; color: var(--ink); margin: 5mm 0 1.5mm; break-after: avoid; }}
p {{ margin: 0 0 2.6mm; orphans: 3; widows: 3; }}
strong {{ color: var(--ink); }}
em {{ color: var(--body); }}
ul, ol {{ margin: 0 0 3mm; padding-left: 5mm; }}
li {{ margin-bottom: 1.4mm; }}
table {{ width: 100%; border-collapse: collapse; margin: 2mm 0 4mm; font-size: 9pt; break-inside: avoid; }}
th {{
  font-family: 'Geist Mono', ui-monospace, monospace; font-size: 7.5pt;
  text-transform: uppercase; letter-spacing: .08em; text-align: left;
  color: var(--ink); border-bottom: 1px solid var(--ink);
  padding: 2mm 2.5mm 1.6mm 0; vertical-align: bottom;
}}
td {{ border-bottom: 1px solid var(--line); padding: 1.8mm 2.5mm 1.8mm 0; vertical-align: top; }}
td:last-child, th:last-child {{ padding-right: 0; }}
code {{
  font-family: 'Geist Mono', ui-monospace, monospace; font-size: 8.5pt;
  background: #f4f4f3; padding: 0 0.3em; border-radius: 2px;
}}
pre {{ background: #f4f4f3; padding: 3.5mm; border-radius: 4px; overflow-x: hidden;
  font-size: 8.5pt; line-height: 1.45; break-inside: avoid; }}
pre code {{ background: none; padding: 0; font-size: 8.5pt; }}
blockquote {{
  margin: 3mm 0; padding: 0 0 0 4mm; border-left: 2px solid var(--ink);
  font-family: 'Newsreader', Georgia, serif; font-style: italic; font-size: 11pt;
}}
hr {{ border: none; border-top: 1px solid var(--line); margin: 6mm 0; }}
a {{ color: var(--ink); text-decoration: underline; text-underline-offset: 2px; }}
footer.report {{
  margin-top: 10mm; padding-top: 3mm; border-top: 1px solid var(--line);
  font-family: 'Geist Mono', ui-monospace, monospace; font-size: 7.5pt;
  letter-spacing: .1em; text-transform: uppercase; color: var(--muted);
  display: flex; justify-content: space-between;
}}
</style>
</head>
<body>
<header class="report">
  <div class="kicker"><span>{kicker}</span><span>MJ.OLDAK · {date}</span></div>
  <h1>{title}</h1>
  {stand}
</header>
{body}
<footer class="report"><span>mjoldak.pl</span><span>źródła — w tekście</span></footer>
</body>
</html>
"""


def build(md_path: pathlib.Path, kicker: str) -> tuple[pathlib.Path, pathlib.Path]:
    md = md_path.read_text(encoding="utf-8")
    m = re.match(r"# (.+)", md)
    title = m.group(1).strip() if m else md_path.stem
    sm = re.search(r"^\*(.+)\*$", md, re.M)
    stand = f'<p class="standfirst">{inline(sm.group(1))}</p>' if sm else ""
    body_md = md[m.end():] if m else md
    if sm:
        body_md = body_md.replace(sm.group(0), "", 1)
    html_doc = TEMPLATE.format(
        fonts=font_faces(), title=html.escape(title),
        kicker=html.escape(kicker), date="20.10.2026",
        stand=stand, body=md_to_html(body_md),
    )
    html_path = md_path.with_suffix(".html")
    html_path.write_text(html_doc, encoding="utf-8")
    pdf_path = REPO / "public/reports" / (md_path.stem.lower() + ".pdf")
    pdf_path.parent.mkdir(parents=True, exist_ok=True)

    chrome = next((pathlib.Path.home() / ".hermes/tools").glob(
        "chromium-*/chrome-mac-arm64/*.app/Contents/MacOS/*"), None)
    if not chrome:
        sys.exit("BRAK chromium (playwright tools)")
    subprocess.run([str(chrome), "--headless", "--disable-gpu",
                    "--no-pdf-header-footer", f"--print-to-pdf={pdf_path}",
                    f"file://{html_path}"], check=True, capture_output=True, timeout=120)
    return html_path, pdf_path


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("md")
    ap.add_argument("--kicker", default="RAPORT")
    a = ap.parse_args()
    h, p = build(pathlib.Path(a.md).resolve(), a.kicker)
    print(f"HTML: {h} ({h.stat().st_size} B)")
    print(f"PDF:  {p} ({p.stat().st_size} B)")


if __name__ == "__main__":
    main()
