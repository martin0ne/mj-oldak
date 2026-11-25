// Warstwa danych panelu /admin/newsletter.
// Czyta istniejącą tabelę subscribers bez zmiany jej kształtu: zero nowych pól z danymi osobowymi.
// Jedyne co dopisujemy, to admin_audit_log (kto, kiedy, jaka akcja) z migrations/0004_admin_audit.sql.

export type AuditAction = 'newsletter.unsubscribe' | 'newsletter.resend_pdf' | 'newsletter.export';

export interface SubscriberRow {
  id: number;
  email: string;
  confirmed_at: string | null;
  unsubscribed_at: string | null;
  created_at: string;
  source: string | null;
  consent_version: string | null;
  unsubscribe_token: string;
}

export type StatusFilter = 'all' | 'confirmed' | 'pending' | 'unsubscribed';

export interface ListParams {
  q: string;
  status: StatusFilter;
  page: number;
  per: number;
}

export interface SubscriberListItem {
  id: number;
  email: string;
  status: 'potwierdzony' | 'oczekuje' | 'wypisany';
  created_at: string;
  confirmed_at: string | null;
  unsubscribed_at: string | null;
  source: string | null;
  consent_version: string | null;
}

export const PER_DEFAULT = 25;
export const PER_MAX = 100;

export function parseStatus(value: string | null): StatusFilter {
  return value === 'confirmed' || value === 'pending' || value === 'unsubscribed' ? value : 'all';
}

export function parseListParams(url: URL): ListParams {
  const q = (url.searchParams.get('q') || '').trim().slice(0, 200);
  const status = parseStatus(url.searchParams.get('status'));
  const rawPage = Number.parseInt(url.searchParams.get('page') || '1', 10);
  const rawPer = Number.parseInt(url.searchParams.get('per') || String(PER_DEFAULT), 10);
  const page = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1;
  const per = Number.isFinite(rawPer) ? Math.min(Math.max(rawPer, 10), PER_MAX) : PER_DEFAULT;
  return { q, status, page, per };
}

function statusClause(status: StatusFilter): string {
  if (status === 'confirmed') return 'confirmed_at IS NOT NULL AND unsubscribed_at IS NULL';
  if (status === 'pending') return 'confirmed_at IS NULL AND unsubscribed_at IS NULL';
  if (status === 'unsubscribed') return 'unsubscribed_at IS NOT NULL';
  return '1 = 1';
}

/** LIKE z jawnym ESCAPE, żeby znak % w wyszukiwaniu nie rozszerzał wyniku. */
function likePattern(q: string): string {
  const escaped = q.replace(/[\\%_]/g, (c) => `\\${c}`);
  return `%${escaped}%`;
}

function whereSql({ q, status }: ListParams): { sql: string; binds: string[] } {
  const parts = [statusClause(status)];
  const binds: string[] = [];
  if (q) {
    parts.push("email LIKE ? ESCAPE '\\'");
    binds.push(likePattern(q.toLowerCase()));
  }
  return { sql: parts.join(' AND '), binds };
}

export function statusOf(row: { confirmed_at: string | null; unsubscribed_at: string | null }): SubscriberListItem['status'] {
  if (row.unsubscribed_at) return 'wypisany';
  return row.confirmed_at ? 'potwierdzony' : 'oczekuje';
}

function toItem(row: SubscriberRow): SubscriberListItem {
  return {
    id: row.id,
    email: row.email,
    status: statusOf(row),
    created_at: row.created_at,
    confirmed_at: row.confirmed_at,
    unsubscribed_at: row.unsubscribed_at,
    source: row.source || null,
    consent_version: row.consent_version || null,
  };
}

export interface Counts {
  total: number;
  confirmed: number;
  pending: number;
  unsubscribed: number;
}

export async function getCounts(db: D1Database): Promise<Counts> {
  const row = await db
    .prepare(
      `SELECT
         COUNT(*) AS total,
         SUM(CASE WHEN confirmed_at IS NOT NULL AND unsubscribed_at IS NULL THEN 1 ELSE 0 END) AS confirmed,
         SUM(CASE WHEN confirmed_at IS NULL AND unsubscribed_at IS NULL THEN 1 ELSE 0 END) AS pending,
         SUM(CASE WHEN unsubscribed_at IS NOT NULL THEN 1 ELSE 0 END) AS unsubscribed
       FROM subscribers`
    )
    .first<{ total: number; confirmed: number | null; pending: number | null; unsubscribed: number | null }>();

  return {
    total: Number(row?.total || 0),
    confirmed: Number(row?.confirmed || 0),
    pending: Number(row?.pending || 0),
    unsubscribed: Number(row?.unsubscribed || 0),
  };
}

export interface SubscriberList {
  items: SubscriberListItem[];
  counts: Counts;
  filtered: number;
  page: number;
  per: number;
  pages: number;
  q: string;
  status: StatusFilter;
}

export async function listSubscribers(db: D1Database, params: ListParams): Promise<SubscriberList> {
  const where = whereSql(params);

  const filteredRow = await db
    .prepare(`SELECT COUNT(*) AS n FROM subscribers WHERE ${where.sql}`)
    .bind(...where.binds)
    .first<{ n: number }>();
  const filtered = Number(filteredRow?.n || 0);

  const pages = Math.max(1, Math.ceil(filtered / params.per));
  const page = Math.min(params.page, pages);
  const offset = (page - 1) * params.per;

  const { results } = await db
    .prepare(
      `SELECT id, email, confirmed_at, unsubscribed_at, created_at, source, consent_version, unsubscribe_token
       FROM subscribers
       WHERE ${where.sql}
       ORDER BY datetime(created_at) DESC, id DESC
       LIMIT ? OFFSET ?`
    )
    .bind(...where.binds, params.per, offset)
    .all<SubscriberRow>();

  return {
    items: (results || []).map(toItem),
    counts: await getCounts(db),
    filtered,
    page,
    per: params.per,
    pages,
    q: params.q,
    status: params.status,
  };
}

/** Wiersze pod eksport CSV: cały bieżący filtr, bez stronicowania. */
export async function exportRows(db: D1Database, params: ListParams): Promise<SubscriberListItem[]> {
  const where = whereSql(params);
  const { results } = await db
    .prepare(
      `SELECT id, email, confirmed_at, unsubscribed_at, created_at, source, consent_version, unsubscribe_token
       FROM subscribers
       WHERE ${where.sql}
       ORDER BY datetime(created_at) DESC, id DESC`
    )
    .bind(...where.binds)
    .all<SubscriberRow>();

  return (results || []).map(toItem);
}

export async function getSubscriber(db: D1Database, id: number): Promise<SubscriberRow | null> {
  return db
    .prepare(
      `SELECT id, email, confirmed_at, unsubscribed_at, created_at, source, consent_version, unsubscribe_token
       FROM subscribers WHERE id = ?`
    )
    .bind(id)
    .first<SubscriberRow>();
}

/**
 * Wypis z panelu: ta sama semantyka co publiczny jednoklikowy link. Ustawia unsubscribed_at,
 * nie kasuje wiersza (dziennik zgód zostaje), idempotentny. Dodatkowo czyści oczekujące tokeny
 * potwierdzenia, żeby stary link z maila nie przywrócił subskrypcji po wypisie.
 */
export async function unsubscribeSubscriber(
  db: D1Database,
  row: SubscriberRow,
  nowIso: string
): Promise<{ changed: boolean; tokensRemoved: number }> {
  const update = await db
    .prepare('UPDATE subscribers SET unsubscribed_at = ? WHERE id = ? AND unsubscribed_at IS NULL')
    .bind(nowIso, row.id)
    .run();

  const tokens = await db
    .prepare('DELETE FROM confirmation_tokens WHERE email = ?')
    .bind(row.email)
    .run();

  return {
    changed: (update.meta?.changes || 0) > 0,
    tokensRemoved: tokens.meta?.changes || 0,
  };
}

export interface AuditEntry {
  id: number;
  created_at: string;
  actor: string;
  action: string;
  outcome: string;
  subscriber_id: number | null;
  detail: string | null;
}

export async function logAudit(
  db: D1Database,
  entry: {
    actor: string;
    action: AuditAction;
    outcome?: 'ok' | 'error';
    subscriberId?: number | null;
    detail?: string | null;
  }
): Promise<void> {
  await db
    .prepare('INSERT INTO admin_audit_log (actor, action, outcome, subscriber_id, detail) VALUES (?, ?, ?, ?, ?)')
    .bind(
      entry.actor,
      entry.action,
      entry.outcome || 'ok',
      entry.subscriberId ?? null,
      entry.detail ? entry.detail.slice(0, 300) : null
    )
    .run();
}

/** Czy w ostatnich `seconds` sekundach poszła już udana wysyłka do tego subskrybenta. */
export async function recentSuccessfulResend(
  db: D1Database,
  subscriberId: number,
  seconds: number
): Promise<string | null> {
  const row = await db
    .prepare(
      `SELECT created_at FROM admin_audit_log
       WHERE action = 'newsletter.resend_pdf' AND subscriber_id = ? AND outcome = 'ok'
         AND created_at > datetime('now', ?)
       ORDER BY id DESC LIMIT 1`
    )
    .bind(subscriberId, `-${Math.max(1, Math.floor(seconds))} seconds`)
    .first<{ created_at: string }>();
  return row?.created_at || null;
}

export async function recentAudit(db: D1Database, limit = 20): Promise<AuditEntry[]> {
  const { results } = await db
    .prepare(
      `SELECT id, created_at, actor, action, outcome, subscriber_id, detail
       FROM admin_audit_log ORDER BY id DESC LIMIT ?`
    )
    .bind(Math.min(Math.max(limit, 1), 100))
    .all<AuditEntry>();
  return results || [];
}

const CSV_HEADER = ['email', 'status', 'created_at', 'confirmed_at', 'unsubscribed_at', 'source', 'consent_version'];

function csvCell(value: string | null): string {
  const raw = value == null ? '' : String(value);
  // Excel/Sheets: komórka zaczynająca się od = + - @ bywa formułą. Apostrof neutralizuje.
  const safe = /^[=+\-@\t\r]/.test(raw) ? `'${raw}` : raw;
  return `"${safe.replace(/"/g, '""')}"`;
}

export function toCsv(rows: SubscriberListItem[]): string {
  const lines = [CSV_HEADER.join(',')];
  for (const row of rows) {
    lines.push(
      [
        csvCell(row.email),
        csvCell(row.status),
        csvCell(row.created_at),
        csvCell(row.confirmed_at),
        csvCell(row.unsubscribed_at),
        csvCell(row.source),
        csvCell(row.consent_version),
      ].join(',')
    );
  }
  // BOM, bo Excela w polskim Windows bez niego pokazuje krzaki zamiast ą/ę/ł.
  return `\uFEFF${lines.join('\r\n')}\r\n`;
}
