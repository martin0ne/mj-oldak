/**
 * MJ.OLDAK leads webhook — Google Apps Script (Web App)
 *
 * POST endpoint przyjmujący leady ze strony mjoldak.pl (Footer.jsx):
 *   1. Append wiersz do tej Spreadsheet ("Leads" sheet)
 *   2. Wyślij email notification do NOTIFICATION_EMAIL (z reply-to lead.email)
 *
 * Wszystko w jednym handler — zero zewnętrznych SaaS (NIE EmailJS).
 * CORS-safe (text/plain bypass preflight), honeypot bot defense, schema validation.
 *
 * Setup w docs/LEADS_SETUP.md.
 *
 * Wersja: 1.1 (2026-05-06) — dorzucono email notification via MailApp
 */

const SHEET_NAME = 'Leads';
const NOTIFICATION_EMAIL = 'biuro@mjoldak.pl';
const HEADER_ROW = [
  'Timestamp', 'Name', 'Email', 'Message',
  'Source', 'Status', 'User Agent', 'Referrer'
];

// Limity per-pole (defense przeciw nadmiernym payloadom)
const FIELD_LIMITS = {
  name: 200,
  email: 200,
  message: 5000,
  source: 300,
  user_agent: 500,
  referrer: 500
};

/**
 * Health-check endpoint — useful do verify deploymentu PRZED konfiguracją frontu.
 * Otwórz Web App URL w przeglądarce — powinieneś zobaczyć JSON status.
 */
function doGet() {
  return jsonResponse({
    status: 'ok',
    service: 'mjoldak-leads-webhook',
    version: '1.0',
    sheet: SHEET_NAME,
    timestamp: new Date().toISOString()
  });
}

/**
 * Główny handler — POST z payload JSON od Footer.jsx fetch().
 */
function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({ status: 'error', error: 'no_payload' });
    }

    const data = JSON.parse(e.postData.contents);

    // Honeypot: jeśli bot wypełni ukryte pole 'website', pretend success bez zapisu
    if (data.website && String(data.website).length > 0) {
      console.log('Honeypot triggered — bot dropped silently');
      return jsonResponse({ status: 'ok', note: 'silently_dropped' });
    }

    // Validation required fields
    if (!data.name || !data.email || !data.message) {
      return jsonResponse({ status: 'error', error: 'missing_required_fields' });
    }

    // Trim + truncate to limits (defense)
    const row = [
      new Date().toISOString(),
      truncate(data.name, FIELD_LIMITS.name),
      truncate(data.email, FIELD_LIMITS.email),
      truncate(data.message, FIELD_LIMITS.message),
      truncate(data.source || 'unknown', FIELD_LIMITS.source),
      'NEW',
      truncate(data.user_agent || '', FIELD_LIMITS.user_agent),
      truncate(data.referrer || '', FIELD_LIMITS.referrer)
    ];

    const sheet = getOrCreateSheet();
    sheet.appendRow(row);

    // Notification email — fail-tolerant (Sheet append is primary; mail is bonus)
    let emailSent = false;
    try {
      sendNotificationEmail(row);
      emailSent = true;
    } catch (mailErr) {
      console.error('Mail send failed (Sheet append succeeded):', mailErr);
    }

    return jsonResponse({
      status: 'ok',
      timestamp: row[0],
      row_count: sheet.getLastRow() - 1, // exclude header
      email_sent: emailSent
    });

  } catch (err) {
    console.error('doPost error:', err);
    return jsonResponse({
      status: 'error',
      error: String(err)
    });
  }
}

/**
 * Tworzy "Leads" sheet z headerem jeśli nie istnieje. Idempotent.
 */
/**
 * Notification email — wysyła info o nowym leadzie do NOTIFICATION_EMAIL.
 * replyTo ustawione na lead.email → klikiem Reply w mailu odpowiadasz bezpośrednio klientowi.
 */
function sendNotificationEmail(row) {
  const timestamp = row[0];
  const name = row[1];
  const email = row[2];
  const message = row[3];
  const source = row[4];
  const status = row[5];
  const userAgent = row[6];
  const referrer = row[7];

  const subject = '[MJ.OLDAK] Nowy lead — ' + name;
  const body = [
    'Nowy lead ze strony mjoldak.pl:',
    '',
    'Imię:       ' + name,
    'Email:      ' + email,
    'Wiadomość:',
    message,
    '',
    '--- Metadata ---',
    'Timestamp:  ' + timestamp,
    'Source:     ' + source,
    'Status:     ' + status,
    'User Agent: ' + userAgent,
    'Referrer:   ' + referrer,
    '',
    'Klik Reply w tej wiadomości = odpowiedź leci bezpośrednio do klienta (' + email + ').',
    'Pełen log w Google Sheet "MJ.OLDAK Leads".'
  ].join('\n');

  MailApp.sendEmail({
    to: NOTIFICATION_EMAIL,
    subject: subject,
    body: body,
    replyTo: email,
    name: 'MJ.OLDAK Leads Webhook'
  });
}

function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADER_ROW);
    sheet.getRange(1, 1, 1, HEADER_ROW.length)
      .setFontWeight('bold')
      .setBackground('#f0f0f0');

    // Column widths dla czytelności
    sheet.setColumnWidth(1, 180); // Timestamp
    sheet.setColumnWidth(2, 150); // Name
    sheet.setColumnWidth(3, 220); // Email
    sheet.setColumnWidth(4, 400); // Message
    sheet.setColumnWidth(5, 200); // Source
    sheet.setColumnWidth(6, 130); // Status
    sheet.setColumnWidth(7, 250); // User Agent
    sheet.setColumnWidth(8, 200); // Referrer

    sheet.setFrozenRows(1);
  }

  return sheet;
}

function truncate(value, maxLen) {
  const str = String(value || '');
  return str.length > maxLen ? str.slice(0, maxLen) : str;
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
