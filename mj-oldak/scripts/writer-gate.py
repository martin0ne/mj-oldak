#!/usr/bin/env python3
"""writer-gate.py — bramka redakcyjna: łapie AI-slop (marketingowy bez treści).

UŻYCIE:
    python3 scripts/writer-gate.py plik.md            # jeden plik
    python3 scripts/writer-gate.py src/content/       # katalog .md
    python3 scripts/writer-gate.py plik.md --json     # maszynowo
    ... | python3 scripts/writer-gate.py -            # stdin

Zwraca akapity = slop (exit1 = znaleziono). Koszt: ~$0.0000084/skanowany akapit
(xiaomi/mimo-v2.6-flash, reasoning off,1000 akapitów ≈ $0.008).

Wzorzec „System One / Jev jako SPECYFIKACJA": jedno forward pytań z criteria,
jedna odpowiedź, zero reasoning. Pełne pułapki → skill `decision-gates`.
"""
import json, re, sys, pathlib, urllib.request

MODEL = "xiaomi/mimo-v2.6-flash"
API = "https://openrouter.ai/api/v1/chat/completions"
SPEC = (
    "You are a strict editorial gate. Given one paragraph, decide if it is generic "
    "AI-generated marketing filler (slop) or concrete writing.\n"
    "Answer with EXACTLY: slop=tak OR slop=nie\n"
    "slop=tak when: buzzwords, empty promises, no concrete facts — e.g. seamless, "
    "elevate, unlock potential, dynamiczny świat, przełomowe rozwiązanie, "
    "w dzisiejszych czasach, comprehensive, cutting-edge.\n"
    "slop=nie when: real names, dates, numbers, sources, plain honest statements, "
    "specific scenes or measured results.\n"
    "One line, no explanation."
)


def key() -> str:
    for line in (pathlib.Path.home() / ".hermes/.env").read_text().splitlines():
        if line.startswith("OPENROUTER_API_KEY="):
            return line.split("=", 1)[1].strip().strip('"').strip("'")
    raise SystemExit("brak OPENROUTER_API_KEY w ~/.hermes/.env")


def gate(par: str, k: str, timeout: int = 45) -> tuple[str, float, float]:
    """(tak/nie, ms, koszt $) — jeden HTTP, reasoning off (patrz skill: bez tego content=None)."""
    body = json.dumps({
        "model": MODEL,
        "messages": [{"role": "system", "content": SPEC},
                     {"role": "user", "content": f"PARAGRAPH: {par[:1200]}"}],
        "temperature": 0, "max_tokens": 12,
        "reasoning": {"enabled": False},
    }).encode()
    req = urllib.request.Request(API, data=body, headers={
        "Authorization": f"Bearer {k}", "Content-Type": "application/json"})
    import time
    t0 = time.time()
    with urllib.request.urlopen(req, timeout=timeout) as r:
        data = json.loads(r.read())
    ms = (time.time() - t0) * 1000
    out = data["choices"][0]["message"].get("content") or ""
    u = data.get("usage", {})
    cost = u.get("prompt_tokens", 0) / 1e6 * 0.10 + u.get("completion_tokens", 0) / 1e6 * 0.28
    m = re.search(r"slop\s*=\s*(tak|nie)", out, re.I)  # parser: szukaj W CAŁOŚCI, nie po liniach
    return (m.group(1).lower() if m else "niepewne"), ms, cost


def paragraphs(text: str) -> list[str]:
    # akapity bez nagłówków/kodu/krótkich (min60 znaków = ma sens dla bramki)
    out, buf = [], []
    for line in text.splitlines():
        if not line.strip() or line.lstrip().startswith(("#", "```", "|", "-", "* ", "<")):
            if buf:
                out.append(" ".join(buf)); buf = []
            continue
        buf.append(line.strip())
        if len(" ".join(buf)) > 400:
            out.append(" ".join(buf)); buf = []
    if buf:
        out.append(" ".join(buf))
    return [p for p in out if len(p) >= 60]


def main() -> int:
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    as_json = "--json" in sys.argv
    if not args:
        raise SystemExit("podaj plik .md, katalog albo - (stdin)")
    src = args[0]
    files: list[pathlib.Path] = []
    if src == "-":
        import tempfile
        tmp = pathlib.Path(tempfile.gettempdir()) / "gate-stdin.md"
        tmp.write_text(sys.stdin.read()); files = [tmp]
    else:
        p = pathlib.Path(src)
        files = [p] if p.is_file() else sorted(p.rglob("*.md"))

    k, hits, scanned, cost = key(), [], 0, 0.0
    for f in files:
        if "node_modules" in str(f) or "/dist/" in str(f):
            continue
        try:
            text = f.read_text(encoding="utf-8", errors="ignore")
        except Exception:
            continue
        for par in paragraphs(text):
            verdict, _ms, c = gate(par, k)
            scanned += 1
            cost += c
            if verdict == "tak":
                hits.append({"file": str(f), "excerpt": par[:160], "verdict": verdict})

    if as_json:
        print(json.dumps({"scanned": scanned, "cost_usd": round(cost, 6), "slop": hits},
                         ensure_ascii=False, indent=1))
    else:
        for h in hits:
            print(f"SLOP | {pathlib.Path(h['file']).name} | {h['excerpt']}")
        print(f"---\nskanowanych akapitów: {scanned} | slop: {len(hits)} | koszt: ${cost:.6f}")
    return 1 if hits else 0


if __name__ == "__main__":
    sys.exit(main())
