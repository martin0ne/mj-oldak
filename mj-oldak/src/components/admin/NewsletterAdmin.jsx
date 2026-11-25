import { useCallback, useEffect, useRef, useState } from 'react';

// Panel /admin/newsletter. Statyczna strona + dane z /admin/api/newsletter/*.
// Zero zapisu treści maili: panel tylko czyta subscribers i zleca akcje, Resend wysyła.

const STATUS_LABELS = {
    all: 'Wszyscy',
    confirmed: 'Potwierdzeni',
    pending: 'Oczekujący',
    unsubscribed: 'Wypisani',
};

const ACTION_LABELS = {
    'newsletter.unsubscribe': 'wypis',
    'newsletter.resend_pdf': 'wysyłka PDF',
    'newsletter.export': 'eksport CSV',
};

function parseStamp(value) {
    if (!value) return null;
    // D1: CURRENT_TIMESTAMP daje "YYYY-MM-DD HH:MM:SS" bez strefy, a to jest UTC.
    const iso = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(value) ? `${value.replace(' ', 'T')}Z` : value;
    const d = new Date(iso);
    return Number.isNaN(d.getTime()) ? null : d;
}

const dateFmt = new Intl.DateTimeFormat('pl-PL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Warsaw',
});

function formatStamp(value) {
    const d = parseStamp(value);
    return d ? dateFmt.format(d) : '-';
}

export default function NewsletterAdmin() {
    const [q, setQ] = useState('');
    const [status, setStatus] = useState('all');
    const [page, setPage] = useState(1);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [notice, setNotice] = useState('');
    const [busyId, setBusyId] = useState(null);
    const [audit, setAudit] = useState([]);
    const debounceRef = useRef(null);

    const load = useCallback(
        async (signal) => {
            setLoading(true);
            setError('');
            try {
                const params = new URLSearchParams({ status, page: String(page) });
                if (q.trim()) params.set('q', q.trim());
                const resp = await fetch(`/admin/api/newsletter/subscribers?${params}`, {
                    credentials: 'same-origin',
                    signal,
                });
                const body = await resp.json().catch(() => ({}));
                if (!resp.ok) throw new Error(body.error || `HTTP ${resp.status}`);
                setData(body);
            } catch (e) {
                if (e.name === 'AbortError') return;
                setError(e.message || 'Nie udało się wczytać listy.');
            }
            // Przerwane żądanie nie może zgasić wskaźnika nowszemu, które właśnie wystartowało.
            if (!signal?.aborted) setLoading(false);
        },
        [q, status, page]
    );

    const loadAudit = useCallback(async () => {
        try {
            const resp = await fetch('/admin/api/newsletter/audit?limit=15', { credentials: 'same-origin' });
            if (!resp.ok) return;
            const body = await resp.json();
            setAudit(Array.isArray(body.entries) ? body.entries : []);
        } catch {
            /* dziennik jest dodatkiem, brak wpisów nie blokuje panelu */
        }
    }, []);

    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        const controller = new AbortController();
        debounceRef.current = setTimeout(() => load(controller.signal), q ? 300 : 0);
        return () => {
            clearTimeout(debounceRef.current);
            controller.abort();
        };
    }, [load, q]);

    useEffect(() => {
        loadAudit();
    }, [loadAudit]);

    const act = async (id, action, confirmText) => {
        if (!window.confirm(confirmText)) return;
        setBusyId(id);
        setError('');
        setNotice('');
        try {
            const resp = await fetch(`/admin/api/newsletter/${action}`, {
                method: 'POST',
                credentials: 'same-origin',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
            });
            const body = await resp.json().catch(() => ({}));
            if (!resp.ok) throw new Error(body.error || `HTTP ${resp.status}`);
            setNotice(body.message || 'Gotowe.');
            await load();
            await loadAudit();
        } catch (e) {
            setError(e.message || 'Akcja się nie powiodła.');
        } finally {
            setBusyId(null);
        }
    };

    const exportHref = (() => {
        const params = new URLSearchParams({ status });
        if (q.trim()) params.set('q', q.trim());
        return `/admin/api/newsletter/export?${params}`;
    })();

    const counts = data?.counts;
    const items = data?.items || [];

    return (
        <div className="admin">
            <header className="admin-head">
                <div>
                    <p className="kicker">Panel · newsletter</p>
                    <h1>Subskrybenci</h1>
                </div>
                <div className="who">
                    <span className="dot" aria-hidden="true" />
                    <span>{data?.actor || 'weryfikacja Cloudflare Access'}</span>
                </div>
            </header>

            <div className="stats">
                <Stat label="Wszyscy" value={counts?.total} />
                <Stat label="Potwierdzeni" value={counts?.confirmed} tone="ok" />
                <Stat label="Oczekujący" value={counts?.pending} />
                <Stat label="Wypisani" value={counts?.unsubscribed} tone="muted" />
            </div>

            <div className="toolbar">
                <label className="search">
                    <span className="sr">Szukaj po adresie email</span>
                    <input
                        type="search"
                        value={q}
                        onChange={(e) => {
                            setQ(e.target.value);
                            setPage(1);
                        }}
                        placeholder="Szukaj po adresie email"
                        autoComplete="off"
                    />
                </label>

                <div className="filters" role="group" aria-label="Filtr statusu">
                    {Object.entries(STATUS_LABELS).map(([key, label]) => (
                        <button
                            key={key}
                            type="button"
                            className={status === key ? 'chip on' : 'chip'}
                            aria-pressed={status === key}
                            onClick={() => {
                                setStatus(key);
                                setPage(1);
                            }}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                <a className="export" href={exportHref} download>
                    Eksport CSV ({data?.filtered ?? 0})
                </a>
            </div>

            {error && (
                <p className="banner bad" role="alert">
                    {error}
                </p>
            )}
            {notice && (
                <p className="banner good" role="status">
                    {notice}
                </p>
            )}

            <div className="table-wrap" aria-busy={loading}>
                <table>
                    <thead>
                        <tr>
                            <th scope="col">Email</th>
                            <th scope="col">Status</th>
                            <th scope="col">Zapis</th>
                            <th scope="col">Potwierdzenie</th>
                            <th scope="col">Źródło</th>
                            <th scope="col">Zgoda</th>
                            <th scope="col">Akcje</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!loading && items.length === 0 && (
                            <tr>
                                <td colSpan={7} className="empty">
                                    Brak wyników dla tego filtra.
                                </td>
                            </tr>
                        )}
                        {items.map((row) => {
                            const confirmed = row.status === 'potwierdzony';
                            return (
                                <tr key={row.id}>
                                    <td className="email">{row.email}</td>
                                    <td>
                                        <span className={`pill ${row.status}`}>{row.status}</span>
                                    </td>
                                    <td className="mono">{formatStamp(row.created_at)}</td>
                                    <td className="mono">{formatStamp(row.confirmed_at)}</td>
                                    <td className="mono dim">{row.source || '-'}</td>
                                    <td className="mono dim">{row.consent_version || '-'}</td>
                                    <td className="actions">
                                        <button
                                            type="button"
                                            className="btn small"
                                            disabled={busyId === row.id || !confirmed}
                                            title={confirmed ? 'Wyślij mail z PDF-em' : 'Tylko dla potwierdzonych adresów'}
                                            onClick={() =>
                                                act(
                                                    row.id,
                                                    'resend-pdf',
                                                    `Wysłać ponownie mail z PDF-em do ${row.email}?`
                                                )
                                            }
                                        >
                                            Wyślij PDF
                                        </button>
                                        <button
                                            type="button"
                                            className="btn small danger"
                                            disabled={busyId === row.id || row.status === 'wypisany'}
                                            title="Wypisz jednym klikiem, tak jak publiczny link"
                                            onClick={() =>
                                                act(
                                                    row.id,
                                                    'unsubscribe',
                                                    `Wypisać ${row.email}? Subskrypcja zostanie wyłączona, wiersz zostaje w dzienniku zgód.`
                                                )
                                            }
                                        >
                                            Wypisz
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                        {loading && (
                            <tr>
                                <td colSpan={7} className="empty">
                                    Wczytuję…
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="pager">
                <span className="dim">
                    {data
                        ? `${data.filtered} ${data.filtered === 1 ? 'adres' : 'adresów'}, strona ${data.page} z ${data.pages}`
                        : '…'}
                </span>
                <div className="pager-buttons">
                    <button
                        type="button"
                        className="btn small"
                        disabled={!data || data.page <= 1 || loading}
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                    >
                        Poprzednia
                    </button>
                    <button
                        type="button"
                        className="btn small"
                        disabled={!data || data.page >= data.pages || loading}
                        onClick={() => setPage((p) => p + 1)}
                    >
                        Następna
                    </button>
                </div>
            </div>

            <section className="audit">
                <h2>Ostatnie akcje</h2>
                {audit.length === 0 ? (
                    <p className="dim small">Brak zapisanych akcji.</p>
                ) : (
                    <ul>
                        {audit.map((entry) => (
                            <li key={entry.id} className={entry.outcome === 'error' ? 'failed' : undefined}>
                                <span className="mono">{formatStamp(entry.created_at)}</span>
                                <span className="actor">{entry.actor}</span>
                                <span className="what">
                                    {ACTION_LABELS[entry.action] || entry.action}
                                    {entry.outcome === 'error' && <span className="tag-bad"> nieudane</span>}
                                </span>
                                {entry.detail && <span className="dim detail">{entry.detail}</span>}
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
}

function Stat({ label, value, tone }) {
    return (
        <div className={`stat ${tone || ''}`}>
            <span className="stat-label">{label}</span>
            <span className="stat-value">{value == null ? '…' : value}</span>
        </div>
    );
}
