const nodemailer = require('nodemailer');

function createTransporter() {
  const host = process.env.SMTP_HOST;
  if (!host) return null;

  const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
  const secure = String(process.env.SMTP_SECURE || 'false') === 'true';

  const auth = process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth,
  });
}

async function sendContactNotification(item) {
  const transporter = createTransporter();
  if (!transporter) {
    console.info('SMTP not configured; skipping email notification');
    return;
  }

  const from = process.env.EMAIL_FROM || process.env.SMTP_USER || 'no-reply@orbitorx.local';
  const to = process.env.EMAIL_TO || process.env.EMAIL_FROM || process.env.SMTP_USER;
  if (!to) {
    console.info('No recipient configured (EMAIL_TO); skipping email');
    return;
  }

  const subject = `OrbitorX: new contact from ${item.email}`;
  const text = [
    `New contact submitted`,
    `ID: ${item.id}`,
    `Name: ${item.name || ''}`,
    `Email: ${item.email}`,
    `Message:`,
    item.message,
    `Received: ${item.createdAt}`,
  ].join('\n\n');

  const html = `<p><strong>New contact submitted</strong></p>
    <ul>
      <li><strong>ID:</strong> ${item.id}</li>
      <li><strong>Name:</strong> ${item.name || ''}</li>
      <li><strong>Email:</strong> ${item.email}</li>
      <li><strong>Received:</strong> ${item.createdAt}</li>
    </ul>
    <p><strong>Message:</strong></p>
    <p>${(item.message || '').replace(/\n/g, '<br/>')}</p>`;

  await transporter.sendMail({ from, to, subject, text, html });
}

module.exports = { sendContactNotification };
