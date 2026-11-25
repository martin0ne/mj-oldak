-- Panel administratora newslettera: dziennik akcji (kto, kiedy, co zrobił)
-- Apply: npx wrangler d1 execute mj-oldak-newsletter --remote --file=migrations/0004_admin_audit.sql

CREATE TABLE IF NOT EXISTS admin_audit_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  actor TEXT NOT NULL,              -- email administratora z Cloudflare Access (lokalnie: dev-bypass)
  action TEXT NOT NULL,             -- newsletter.unsubscribe | newsletter.resend_pdf | newsletter.export
  outcome TEXT NOT NULL DEFAULT 'ok', -- ok | error (Resend odrzucił, błąd serwera)
  subscriber_id INTEGER,            -- id z subscribers; NULL dla eksportu (dotyczy filtra, nie osoby)
  detail TEXT                       -- krótki kontekst bez treści maili (filtry eksportu, status Resenda)
);

CREATE INDEX IF NOT EXISTS idx_admin_audit_created ON admin_audit_log(created_at);
CREATE INDEX IF NOT EXISTS idx_admin_audit_subscriber ON admin_audit_log(subscriber_id);
