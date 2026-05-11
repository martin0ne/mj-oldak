-- Contact form submissions schema (RODO Art. 13 + lead tracking + rate limiting)
-- Apply: wrangler d1 execute mj-oldak-newsletter --remote --file=migrations/0002_contact_submissions.sql

CREATE TABLE IF NOT EXISTS contact_submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,                  -- imię + biuro (np. "Anna Kowalska, Biuro XYZ")
  email TEXT NOT NULL,
  message TEXT NOT NULL,               -- 1-zdaniowy temat / opis problemu
  ip TEXT,                             -- consent log + rate limiting
  user_agent TEXT,                     -- consent log
  source TEXT,                         -- form location (/, /artykuly/[slug], etc.)
  consent_version TEXT NOT NULL,       -- privacy policy version at time of consent
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  status TEXT NOT NULL DEFAULT 'new',  -- new | processed | spam | replied | archived
  reply_at TEXT,                       -- ISO timestamp first response
  notes TEXT                           -- internal notes (po odpowiedzi)
);

CREATE INDEX IF NOT EXISTS idx_contact_email ON contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contact_created ON contact_submissions(created_at);
CREATE INDEX IF NOT EXISTS idx_contact_ip_created ON contact_submissions(ip, created_at);
CREATE INDEX IF NOT EXISTS idx_contact_status ON contact_submissions(status);
