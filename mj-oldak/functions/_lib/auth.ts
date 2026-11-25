// Weryfikacja Cloudflare Access dla panelu /admin.
//
// Access blokuje żądania już na brzegu, ale panel sprawdza podpis JWT samodzielnie.
// Powód: literówka w polityce albo wyłączona aplikacja Access nie może odsłonić listy
// subskrybentów. Brak konfiguracji = panel zwraca 503, nigdy danych.
//
// Zmienne (Pages → Settings → Variables and Secrets):
//   ACCESS_TEAM_DOMAIN = <zespol>.cloudflareaccess.com
//   ACCESS_AUD         = Audience Tag aplikacji Access dla /admin
//   ADMIN_DEV_BYPASS   = "1" tylko do pracy lokalnej; poza localhost jest ignorowane

export interface AdminEnv {
  DB: D1Database;
  RESEND_API_KEY?: string;
  NEWSLETTER_FROM_EMAIL?: string;
  PUBLIC_SITE_URL?: string;
  NEWSLETTER_PDF_URL?: string;
  NEWSLETTER_PDF_NAME?: string;
  RESEND_API_URL?: string;
  ACCESS_TEAM_DOMAIN?: string;
  ACCESS_AUD?: string;
  ADMIN_DEV_BYPASS?: string;
}

export type AdminAuthResult = { ok: true; actor: string } | { ok: false; response: Response };

const JWKS_TTL_MS = 10 * 60 * 1000;
let jwksCache: { domain: string; at: number; keys: Map<string, JsonWebKey> } | null = null;

export async function requireAdmin(request: Request, env: AdminEnv): Promise<AdminAuthResult> {
  const host = new URL(request.url).hostname;
  const isLocal = host === 'localhost' || host === '127.0.0.1' || host === '[::1]';

  if (env.ADMIN_DEV_BYPASS === '1' && isLocal) {
    return { ok: true, actor: 'dev-bypass@localhost' };
  }

  const teamDomain = (env.ACCESS_TEAM_DOMAIN || '')
    .trim()
    .replace(/^https?:\/\//, '')
    .replace(/\/+$/, '');
  const aud = (env.ACCESS_AUD || '').trim();

  if (!teamDomain || !aud) {
    return {
      ok: false,
      response: json({ error: 'Panel nie jest podłączony do Cloudflare Access.' }, { status: 503 }),
    };
  }

  const token = readAccessToken(request);
  if (!token) {
    return { ok: false, response: json({ error: 'Brak tokenu Cloudflare Access.' }, { status: 401 }) };
  }

  try {
    const claims = await verifyAccessJwt(token, teamDomain, aud);
    const email = String(claims.email || '').trim().toLowerCase();
    if (!email) {
      return { ok: false, response: json({ error: 'Token nie zawiera adresu email.' }, { status: 403 }) };
    }
    return { ok: true, actor: email };
  } catch (e) {
    console.error('access jwt rejected', String(e).slice(0, 200));
    return { ok: false, response: json({ error: 'Token Cloudflare Access jest nieprawidłowy.' }, { status: 401 }) };
  }
}

export function json(body: unknown, init: ResponseInit = {}): Response {
  return Response.json(body, {
    ...init,
    headers: { 'Cache-Control': 'no-store', ...(init.headers || {}) },
  });
}

function readAccessToken(request: Request): string | null {
  const header = request.headers.get('cf-access-jwt-assertion');
  if (header && header.trim()) return header.trim();
  const cookie = request.headers.get('cookie') || '';
  const match = /(?:^|;\s*)CF_Authorization=([^;]+)/.exec(cookie);
  return match ? decodeURIComponent(match[1]) : null;
}

interface AccessClaims {
  email?: string;
  aud?: string | string[];
  exp?: number;
  nbf?: number;
}

async function verifyAccessJwt(token: string, teamDomain: string, aud: string): Promise<AccessClaims> {
  const parts = token.split('.');
  if (parts.length !== 3) throw new Error('malformed token');

  const header = JSON.parse(b64urlToText(parts[0])) as { alg?: string; kid?: string };
  if (header.alg !== 'RS256' || !header.kid) throw new Error('unsupported alg');

  const key = (await loadJwks(teamDomain)).get(header.kid);
  if (!key || !key.n || !key.e) throw new Error('unknown kid');

  const cryptoKey = await crypto.subtle.importKey(
    'jwk',
    { kty: 'RSA', n: key.n, e: key.e, alg: 'RS256', ext: true },
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['verify']
  );

  const valid = await crypto.subtle.verify(
    'RSASSA-PKCS1-v1_5',
    cryptoKey,
    b64urlToBytes(parts[2]),
    new TextEncoder().encode(`${parts[0]}.${parts[1]}`)
  );
  if (!valid) throw new Error('bad signature');

  const claims = JSON.parse(b64urlToText(parts[1])) as AccessClaims;
  const now = Math.floor(Date.now() / 1000);
  if (typeof claims.exp !== 'number' || claims.exp <= now) throw new Error('expired');
  if (typeof claims.nbf === 'number' && claims.nbf > now + 60) throw new Error('not yet valid');

  const audiences = Array.isArray(claims.aud) ? claims.aud : [claims.aud];
  if (!audiences.includes(aud)) throw new Error('aud mismatch');

  return claims;
}

async function loadJwks(teamDomain: string): Promise<Map<string, JsonWebKey>> {
  if (jwksCache && jwksCache.domain === teamDomain && Date.now() - jwksCache.at < JWKS_TTL_MS) {
    return jwksCache.keys;
  }

  const resp = await fetch(`https://${teamDomain}/cdn-cgi/access/certs`, { cf: { cacheTtl: 300 } });
  if (!resp.ok) throw new Error(`jwks ${resp.status}`);

  const body = (await resp.json()) as { keys?: (JsonWebKey & { kid?: string })[] };
  const keys = new Map<string, JsonWebKey>();
  for (const key of body.keys || []) {
    if (key.kid) keys.set(key.kid, key);
  }
  if (keys.size === 0) throw new Error('jwks empty');

  jwksCache = { domain: teamDomain, at: Date.now(), keys };
  return keys;
}

function b64urlToBytes(value: string): Uint8Array<ArrayBuffer> {
  const b64 = value.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(value.length / 4) * 4, '=');
  const bin = atob(b64);
  const out = new Uint8Array(new ArrayBuffer(bin.length));
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

function b64urlToText(value: string): string {
  return new TextDecoder().decode(b64urlToBytes(value));
}
