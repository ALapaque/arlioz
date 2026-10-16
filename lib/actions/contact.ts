'use server';

export type ContactState =
  | { status: 'idle' }
  | { status: 'success' }
  | { status: 'error'; code: 'invalid' | 'not_configured' | 'failed' };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function text(formData: FormData, key: string, max = 2000): string {
  const value = formData.get(key);
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Contact form submission. Sends an e-mail through Resend's REST API when
 * `RESEND_API_KEY` and `CONTACT_TO_EMAIL` are configured; otherwise reports
 * that the form is not active so the visitor can write directly.
 */
export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: real users never fill this hidden field.
  if (text(formData, 'website')) return { status: 'success' };

  const name = text(formData, 'name', 120);
  const company = text(formData, 'company', 120);
  const email = text(formData, 'email', 200);
  const message = text(formData, 'message', 4000);
  const need = text(formData, 'need', 10);
  const locale = text(formData, 'locale', 2) === 'en' ? 'en' : 'fr';

  if (name.length < 2 || !EMAIL_RE.test(email) || message.length < 10) {
    return { status: 'error', code: 'invalid' };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) return { status: 'error', code: 'not_configured' };

  const from = process.env.CONTACT_FROM_EMAIL ?? 'Arlioz <onboarding@resend.dev>';
  const needLabel: Record<string, string> = {
    dev: 'Développement',
    rgpd: 'Conseil RGPD',
    both: 'Développement + RGPD',
  };
  const subject = `[arlioz.be] ${needLabel[need] ?? 'Contact'} — ${name}${company ? ` (${company})` : ''}`;
  const html = `
    <p><strong>Nom :</strong> ${escapeHtml(name)}</p>
    <p><strong>Société :</strong> ${escapeHtml(company || '—')}</p>
    <p><strong>E-mail :</strong> ${escapeHtml(email)}</p>
    <p><strong>Besoin :</strong> ${escapeHtml(needLabel[need] ?? need)}</p>
    <p><strong>Langue :</strong> ${locale}</p>
    <p><strong>Message :</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
  `;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to: [to], reply_to: email, subject, html }),
    });
    if (!response.ok) return { status: 'error', code: 'failed' };
    return { status: 'success' };
  } catch {
    return { status: 'error', code: 'failed' };
  }
}
