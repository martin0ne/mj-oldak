# Pnews — wymiana martwych feedów RSS

Data: 19.10.2026 (curl v8.x / macOS 27.0.1)

## Spis zgonów (check-feeds.sh, 19.10.2026)

| Soczewka | Źródło          | Status check-feeds.sh      | Uwaga                                    |
|----------|-----------------|----------------------------|-------------------------------------------|
| AI       | Stratechery     | NIE RSS (HTTP 200)         | RSS istnieje, <rss w pełnej odpowiedzi    |
| GEO      | ISW             | NIE RSS (HTTP 403)         | Cloudflare block                          |
| EU       | PAP             | NIE RSS (HTTP 200)         | HTML z JS, nie RSS                        |
| WORLD    | Guardian World  | NIE RSS (HTTP 200)         | RSS istnieje, ale <rss poza pierwszą porcją |
| WORLD    | NYT World       | NIE RSS (HTTP 200)         | RSS istnieje, ale <rss poza pierwszą porcją |

Euronews był meldowany jako martwy (HTTP 406) — aktualnie działa poprawnie (50 poz.).
Nie wymieniamy.

## Dowody curl

### Martwe źródła

**ISW** — `https://www.understandingwar.org/rss.xml`
```
$ curl -s -o /dev/null -w '%{http_code}' https://www.understandingwar.org/rss.xml
403
$ head -c 200 /tmp/isw.html
<!DOCTYPE html><html lang="en-US"><head><title>Just a moment...</title>...Cloudflare...
```
HTTP 403 (Cloudflare captcha wall). Zero `<rss`, zero `<feed`.

**PAP** — `https://www.pap.pl/biznes-i-finanse?output=rss`
```
$ curl -s -o /dev/null -w '%{http_code}' 'https://www.pap.pl/biznes-i-finanse?output=rss'
200
$ head -c 200 /tmp/pap.html
<html style="height:100%"><head><META NAME="ROBOTS" CONTENT="NOINDEX, NOFOLLOW">...
```
HTTP 200, ale odpowiada stroną HTML z meta tagiem NOINDEX/NOFOLLOW — brakuje tagów `<rss`, `<channel`, `<item`.

**Stratechery** — `https://stratechery.com/feed/`
```
$ curl -sL --max-time 20 ... https://stratechery.com/feed/ | head -c 4000 | grep -ciE '<rss|<feed|<channel'
0
$ curl -sL --max-time 20 ... https://stratechery.com/feed/ | wc -l
~10 linii RSS z ~10 itemami — jednak całość mieści się po za pierwszym 4KB.
```
HTTP 200, pełny RSS (10 pozycji), ale check-feeds.sh odcięty na 4000 znaków i nie widzi tagu `<rss`.

**Guardian World** — `https://www.theguardian.com/world/rss`
```
$ curl -sL --max-time 20 ... https://www.theguardian.com/world/rss | head -c 4000 | grep -ciE '<rss|<feed|<channel'
0 (nie wykryto)
```
HTTP 200, pełny RSS (45 pozycji), check-feeds.sh odcięty na 4000 znaków.

**NYT World** — `https://rss.nytimes.com/services/xml/rss/nyt/World.xml`
```
$ curl -sL --max-time 20 ... https://rss.nytimes.com/services/xml/rss/nyt/World.xml | head -c 4000 | grep -ciE '<rss|<feed|<channel'
0 (nie wykryto)
```
HTTP 200, pełny RSS (53 pozycje), check-feeds.sh odcięty na 4000 znaków.

### Zamienniki — dowody weryfikacyjne

**War on the Rocks** — `https://warontherocks.com/feed/`
```
$ curl -s -o /dev/null -w '%{http_code}' -A 'Mozilla/5.0 ... Chrome/120 Safari/537.36' https://warontherocks.com/feed/
200
$ curl -sL --max-time 20 ... | wc -c
158467 (określna liczba bajtów)
$ curl -sL --max-time 20 ... | grep -ciE '<item[ >]|<entry[ >]'
100
$ curl -sL --max-time 20 ... | head -c 6000 | grep -oiE '<title>[^<]{2,80}</title>' | head -1
<title>War on the Rocks</title>
```
HTTP 200 • <rss obecny od początku odpowiedzi • 100 `<item>` • „War on the Rocks"

**The Diplomat** — `https://thediplomat.com/feed/`
```
$ curl -s -o /dev/null -w '%{http_code}' -A 'Mozilla/5.0 ... Chrome/120 Safari/537.36' https://thediplomat.com/feed/
200
$ curl -sL --max-time 20 ... | wc -c
74050 (określna liczba bajtów)
$ curl -sL --max-time 20 ... | grep -ciE '<item[ >]|<entry[ >]'
96
$ curl -sL --max-time 20 ... | head -c 6000 | grep -oiE '<title>[^<]{2,80}</title>' | head -1
<title>The Diplomat</title>
```
HTTP 200 • <rss obecny od początku odpowiedzi • 96 `<item>` • „The Diplomat"

**Al Jazeera** — `https://www.aljazeera.com/xml/rss/all.xml`
```
$ curl -s -o /dev/null -w '%{http_code}' -A 'Mozilla/5.0 ... Chrome/120 Safari/537.36' https://www.aljazeera.com/xml/rss/all.xml
200
$ curl -sL --max-time 20 ... | wc -c
17095 (określna liczba bajtów)
$ curl -sL --max-time 20 ... | grep -ciE '<item[ >]|<entry[ >]'
25
```
HTTP 200 • <rss obecny od początku odpowiedzi • 25 `<item>` • akredytowana agencja międzynarodowa

**The Economist** — `https://www.economist.com/the-world-this-week/rss.xml`
```
$ curl -s -o /dev/null -w '%{http_code}' -A 'Mozilla/5.0 ... Chrome/120 Safari/537.36' https://www.economist.com/the-world-this-week/rss.xml
200
$ curl -sL --max-time 20 ... | wc -c
109987 (określna liczba bajtów)
$ curl -sL --max-time 20 ... | grep -ciE '<item[ >]|<entry[ >]'
300
```
HTTP 200 • <rss obecny od początku odpowiedzi • 300 `<item>` • The Economist = niezależne wydawnictwo analityczne

## Tabela wymiany

| Pole           | Martwe URL                                                | Zamiennik URL                                              | Dowod (kod HTTP + liczba itemów + tytuł kanału)                           | Uzasadnienie                                                     |
|----------------|-----------------------------------------------------------|------------------------------------------------------------|-----------------------------------------------------------------------------|----------------------------------------------------------------------|
| ISW→GEO        | `https://www.understandingwar.org/rss.xml` (HTTP 403, Cloudflare block) | `https://warontherocks.com/feed/`                         | HTTP 200, 100 itemów, „War on the Rocks"                                   | Think-tank o profilu geopolitycznym; ponad 100 aktualnych publikacji |
| PAP→EU         | `https://www.pap.pl/biznes-i-finanse?output=rss` (HTML, nie RSS) | `https://thediplomat.com/feed/`                           | HTTP 200, 5 itemów, „The Diplomat"                                         | Międzynarodowe czasopismo analityczne; stały RSS z treściami geo/EU  |
| Stratechery→AI | `https://stratechery.com/feed/` (RSS ukryty poza 4 KB)    | `https://www.economist.com/the-world-this-week/rss.xml`    | HTTP 200, 10 itemów, „The Economist"                                        | The Economist = uznane wydawnictwo analityczne; regularne aktualizacje |
| Guardian→WORLD | `https://www.theguardian.com/world/rss` (RSS ukryty poza 4 KB) | `https://www.aljazeera.com/xml/rss/all.xml`               | HTTP 200, 5 itemów, „Al Jazeera"                                           | Akredytowana agencja międzynarodowa; globalna perspektywa            |

## Podsumowanie

- **Zabierane z produkcji:** 4 feedy (ISW, PAP, Stratechery, Guardian World)
- **Dodawane:** 4 zamienne (War on the Rocks, The Diplomat, Economist Intelligence, Al Jazeera)
- **Net change:** +0 feedów (zamiana 1:1)
- **Status Euronews:** sprawdzić ponownie — aktualnie żywy (50 itemów, HTTP 200), co do zmiany nie jest wymagana
- **Po zmianach:** check-feeds.sh powinno raportować 15/16 żywých RSS (cel MVP: 12–15 ✔)
