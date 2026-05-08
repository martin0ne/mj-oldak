-- Newsletter compliance schema (RODO Art. 13 + PKE Art. 398 double opt-in)
-- Apply: wrangler d1 execute mj-oldak-newsletter --remote --file=migrations/0001_newsletter.sql

CREATE TABLE IF NOT EXISTS subscribers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  confirmed_at TEXT,                -- ISO timestamp; NULL until double opt-in confirmed
  ip TEXT,                          -- consent log (RODO accountability)
  user_agent TEXT,                  -- consent log
  source TEXT,                      -- form location (/, /artykuly/, etc.)
  consent_version TEXT,             -- privacy policy version at time of consent
  unsubscribe_token TEXT NOT NULL,  -- UUID for one-click unsubscribe
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  unsubscribed_at TEXT              -- ISO timestamp; NULL = active
);

CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);
CREATE INDEX IF NOT EXISTS idx_subscribers_confirmed ON subscribers(confirmed_at) WHERE confirmed_at IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_subscribers_unsub_token ON subscribers(unsubscribe_token);

-- Confirmation tokens (24h TTL for PKE double opt-in)
CREATE TABLE IF NOT EXISTS confirmation_tokens (
  uuid TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_tokens_email ON confirmation_tokens(email);
CREATE INDEX IF NOT EXISTS idx_tokens_expires ON confirmation_tokens(expires_at);
