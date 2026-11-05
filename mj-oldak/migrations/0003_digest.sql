-- Digest: rejestr artykułów już rozesłanych (idempotencja wysyłki)
-- Apply: npx wrangler d1 execute mj-oldak-newsletter --remote --file=migrations/0003_digest.sql

CREATE TABLE IF NOT EXISTS digest_log (
  slug TEXT PRIMARY KEY,
  title TEXT,
  link TEXT,
  sent_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_digest_sent_at ON digest_log(sent_at);

-- Dostarczenia per odbiorca: pozwala wznawiać wysyłkę po limicie dziennym Resenda
-- bez podwójnych maili do tych, którzy już dostali.
CREATE TABLE IF NOT EXISTS digest_deliveries (
  slug TEXT NOT NULL,
  email TEXT NOT NULL,
  sent_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (slug, email)
);

CREATE INDEX IF NOT EXISTS idx_deliveries_email ON digest_deliveries(email);

-- Historia przebiegów (ile osób dostało, ile błędów) — do diagnozy
CREATE TABLE IF NOT EXISTS digest_runs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  started_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  articles INTEGER NOT NULL DEFAULT 0,
  recipients INTEGER NOT NULL DEFAULT 0,
  sent INTEGER NOT NULL DEFAULT 0,
  failed INTEGER NOT NULL DEFAULT 0,
  note TEXT
);
