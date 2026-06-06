import { Resend } from "resend";

// Handles POST submissions from the Book a Demo form (`/demo`).
// Sends the submission to info@planet-matrix.com via Resend.
// Requires RESEND_API_KEY in the environment (see .env.local).

const TO = "cbienvenu007@gmail.com";
const FROM = "info@planet-matrix.com";

type DemoRequest = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  jobTitle?: string;
  company?: string;
  companyType?: string;
  country?: string;
  priority?: string;
  language?: string;
  message?: string;
  optIn?: string;
};

const esc = (v: unknown) =>
  String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

export async function POST(request: Request) {
  let body: DemoRequest;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const {
    firstName,
    lastName,
    email,
    phone,
    jobTitle,
    company,
    companyType,
    country,
    priority,
    language,
    message,
    optIn,
  } = body ?? {};

  // Minimum fields needed to make the lead actionable.
  if (!firstName || !lastName || !email || !company) {
    return Response.json(
      { error: "Please provide your name, email, and company." },
      { status: 400 }
    );
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set — cannot send demo request email.");
    return Response.json(
      { error: "Email service is not configured." },
      { status: 500 }
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const fullName = `${firstName} ${lastName}`.trim();

  const rows: [string, string | undefined][] = [
    ["Name", fullName],
    ["Work email", email],
    ["Phone", phone],
    ["Company", company],
    ["Job title", jobTitle],
    ["Company type", companyType],
    ["Country / Region", country],
    ["Top priority", priority],
    ["Preferred language", language],
    ["Marketing opt-in", optIn],
  ];

  const text =
    `New demo request from planet-matrix.com\n\n` +
    rows.map(([label, value]) => `${label}: ${value || "—"}`).join("\n") +
    `\n\nMessage:\n${message || "—"}\n`;

  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#1a1130;line-height:1.6">
      <h2 style="margin:0 0 16px">New Demo Request</h2>
      <p style="margin:0 0 16px;color:#555">A new demo request was submitted on planet-matrix.com.</p>
      <table style="border-collapse:collapse;width:100%;max-width:520px">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding:6px 12px 6px 0;color:#777;vertical-align:top;white-space:nowrap">${esc(
              label
            )}</td>
            <td style="padding:6px 0;font-weight:600">${esc(value) || "—"}</td>
          </tr>`
          )
          .join("")}
      </table>
      <p style="margin:20px 0 4px;color:#777">Message</p>
      <p style="margin:0;white-space:pre-wrap">${esc(message) || "—"}</p>
    </div>`;

  // 1. Notify the team. This is the email that must succeed.
  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `New Demo Request — ${company} (${fullName})`,
      text,
      html,
    });

    if (error) {
      console.error("Resend failed to send demo request:", error);
      return Response.json({ error: "Failed to send your request." }, { status: 502 });
    }
  } catch (err) {
    console.error("Unexpected error sending demo request:", err);
    return Response.json({ error: "Failed to send your request." }, { status: 502 });
  }

  // 2. Auto-reply to the submitter (best-effort — a failure here must not
  //    fail the request, since the lead has already been captured above).
  const replyText =
    `Hi ${firstName},\n\n` +
    `Thank you for requesting a demo of PlanetMatrix! We've received your request and a member of our team will be in touch within 24 hours to schedule your call.\n\n` +
    `Here's a quick summary of what you sent us:\n` +
    `• Company: ${company}\n` +
    `• Top priority: ${priority || "—"}\n` +
    `• Preferred language: ${language || "—"}\n\n` +
    `Your message:\n${message || "—"}\n\n` +
    `In the meantime, just reply to this email if you have any questions.\n\n` +
    `Best regards,\nThe PlanetMatrix Team`;

  const replyHtml = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#1a1130;line-height:1.6">
      <p>Hi ${esc(firstName)},</p>
      <p>Thank you for requesting a demo of PlanetMatrix! We've received your request and a member of our team will be in touch within 24 hours to schedule your call.</p>
      <p style="margin-bottom:4px"><strong>Here's a quick summary of what you sent us:</strong></p>
      <ul style="margin-top:0">
        <li>Company: ${esc(company)}</li>
        <li>Top priority: ${esc(priority) || "—"}</li>
        <li>Preferred language: ${esc(language) || "—"}</li>
      </ul>
      <p style="margin-bottom:4px"><strong>Your message:</strong></p>
      <p style="margin-top:0;white-space:pre-wrap">${esc(message) || "—"}</p>
      <p>In the meantime, just reply to this email if you have any questions.</p>
      <p>Best regards,<br />The PlanetMatrix Team</p>
    </div>`;

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: email,
      replyTo: FROM,
      subject: "We've received your demo request",
      text: replyText,
      html: replyHtml,
    });
    if (error) console.error("Resend failed to send auto-reply:", error);
  } catch (err) {
    console.error("Unexpected error sending auto-reply:", err);
  }

  return Response.json({ ok: true });
}
