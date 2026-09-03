import nodemailer from "nodemailer";

export function isSmtpConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

export async function sendContactEmail({ name, email, message }) {
  if (!isSmtpConfigured()) return { sent: false, reason: "SMTP not configured" };

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_TO || process.env.SMTP_USER,
    replyTo: email,
    subject: `New portfolio message from ${name}`,
    text: `${message}\n\nFrom: ${name} <${email}>`,
    html: `<p>${message.replace(/\n/g, "<br/>")}</p><p>From: <strong>${name}</strong> &lt;${email}&gt;</p>`,
  });

  return { sent: true };
}
