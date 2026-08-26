import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

const clean = (value, maxLength) => String(value || '').trim().slice(0, maxLength);
const escapeHtml = (value) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

export async function POST(request) {
  try {
    const { name: rawName, email: rawEmail, message: rawMessage } = await request.json();
    const name = clean(rawName, 120);
    const email = clean(rawEmail, 160);
    const message = clean(rawMessage, 4000);

    if (!name || !email || !message) {
      return Response.json({ error: 'Please complete every field.' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, CONTACT_TO, CONTACT_FROM } = process.env;
    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !CONTACT_TO) {
      console.error('Contact SMTP configuration is incomplete.');
      return Response.json({ error: 'Email service is not configured yet.' }, { status: 503 });
    }

    const port = Number(SMTP_PORT || 587);
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure: SMTP_SECURE ? SMTP_SECURE === 'true' : port === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replaceAll('\n', '<br />');

    await transporter.sendMail({
      from: CONTACT_FROM || SMTP_USER,
      to: CONTACT_TO,
      replyTo: email,
      subject: `Nexbash website query from ${name}`,
      text: `Name: ${name}\nReply email: ${email}\n\nQuery:\n${message}`,
      html: `<h2>New Nexbash website query</h2><p><strong>Name:</strong> ${safeName}</p><p><strong>Reply email:</strong> ${safeEmail}</p><p><strong>Query:</strong><br />${safeMessage}</p>`,
    });

    return Response.json({ ok: true });
  } catch (error) {
    console.error('Contact email failed:', error);
    return Response.json({ error: 'Unable to send your query right now. Please try again.' }, { status: 500 });
  }
}
