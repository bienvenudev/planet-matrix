import { Resend } from "resend";

// Handles POST submissions from the Book a Demo form (`/demo`).
// Sends the submission to the team via Resend and auto-replies to the submitter.
// Requires RESEND_API_KEY in the environment (see .env.local).

const TO = "Jaberjameel00@gmail.com";
const FROM = "info@planet-matrix.com";

// Absolute base URL so the logo resolves in email clients (override per env).
const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.planet-matrix.com"
).replace(/\/$/, "");
const LOGO_URL = `${SITE_URL}/PlanetMatrix-Logo-light.png`;
const SOCIALS = {
  linkedin: "https://www.linkedin.com/company/planetmatrix",
  instagram: "https://www.instagram.com/planetmatrix1",
  website: SITE_URL,
  email: "info@planet-matrix.com",
};

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

const FONT = "'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

// ── Brand footer / signature — dark band with socials + contact ──────────────
function footerHtml() {
  const link = (href: string, label: string) =>
    `<a href="${href}" style="color:#c8b6ff;text-decoration:none;font-weight:600;">${label}</a>`;
  return `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
  <tr><td style="font-family:${FONT};">
    <div style="font-size:17px;font-weight:700;color:#ffffff;letter-spacing:-0.01em;">Planet<span style="color:#b97bff;">Matrix</span></div>
    <div style="font-size:12.5px;color:#8f87b5;margin-top:3px;">One Platform. All Your ESG. Infinite Impact.</div>
    <div style="margin-top:14px;font-size:12.5px;">
      ${link(SOCIALS.linkedin, "LinkedIn")}
      <span style="color:#4b4470;padding:0 7px;">•</span>
      ${link(SOCIALS.instagram, "Instagram")}
      <span style="color:#4b4470;padding:0 7px;">•</span>
      ${link(SOCIALS.website, "planet-matrix.com")}
    </div>
    <div style="margin-top:10px;font-size:12.5px;">
      <a href="mailto:${SOCIALS.email}" style="color:#8f87b5;text-decoration:none;">${SOCIALS.email}</a>
    </div>
  </td></tr>
</table>`;
}

// ── Full email-client-safe shell: dark header w/ logo, accent strip,
//    white body, dark signature footer ────────────────────────────────────────
function emailShell(preheader: string, bodyHtml: string) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="color-scheme" content="light only">
  <meta name="supported-color-schemes" content="light">
</head>
<body style="margin:0;padding:0;background:#f1eefb;-webkit-font-smoothing:antialiased;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${esc(preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f1eefb;">
    <tr><td align="center" style="padding:30px 14px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0"
             style="width:600px;max-width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 14px 44px rgba(40,18,90,0.14);">

        <!-- Header: dark purple gradient + logo -->
        <tr><td style="background-color:#160c33;background-image:linear-gradient(135deg,#1c0e45,#0c0620);padding:24px 32px;">
          <img src="${LOGO_URL}" alt="PlanetMatrix" width="184"
               style="display:block;border:0;outline:none;text-decoration:none;height:auto;" />
        </td></tr>

        <!-- Accent strip -->
        <tr><td style="height:4px;line-height:4px;font-size:0;background-color:#7c3aed;
                        background-image:linear-gradient(90deg,#7c3aed,#b97bff,#7c3aed);">&nbsp;</td></tr>

        <!-- Body -->
        <tr><td style="padding:34px 32px 30px;font-family:${FONT};color:#1a1130;line-height:1.6;">
          ${bodyHtml}
        </td></tr>

        <!-- Footer: dark brand band -->
        <tr><td style="background-color:#0c0620;padding:24px 32px;">${footerHtml()}</td></tr>
      </table>

      <!-- Legal micro-copy -->
      <p style="font-family:${FONT};color:#9a93b8;font-size:11px;line-height:1.6;margin:16px 8px 0;max-width:600px;">
        © 2026 PlanetMatrix, Inc.<br/>
        You're receiving this because you requested a demo at planet-matrix.com.
      </p>
    </td></tr>
  </table>
</body></html>`;
}

// ── Route handler ─────────────────────────────────────────────────────────────
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

  if (!firstName || !lastName || !email || !company) {
    return Response.json(
      { error: "Please provide your name, email, and company." },
      { status: 400 },
    );
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set.");
    return Response.json(
      { error: "Email service is not configured." },
      { status: 500 },
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const fullName = `${firstName} ${lastName}`.trim();

  // ── Plain-text rows (shared) ──────────────────────────────────────────────
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
    rows.map(([l, v]) => `${l}: ${v || "—"}`).join("\n") +
    `\n\nMessage:\n${message || "—"}\n`;

  // ── Striped data rows for HTML table ─────────────────────────────────────
  const detailRows = rows
    .map(([label, value], i) => {
      const bg = i % 2 ? "#faf9fe" : "#ffffff";
      return `<tr>
        <td style="padding:11px 16px;background:${bg};border-bottom:1px solid #efecf8;color:#6b6386;font-size:13px;vertical-align:top;white-space:nowrap;">${esc(label)}</td>
        <td style="padding:11px 16px;background:${bg};border-bottom:1px solid #efecf8;color:#1a1130;font-size:13px;font-weight:600;">${esc(value) || "—"}</td>
      </tr>`;
    })
    .join("");

  // ── Team notification body ────────────────────────────────────────────────
  const teamBody = `
    <span style="display:inline-block;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;
                 color:#7c3aed;background:#f0e6fb;border:1px solid #e3d6fb;border-radius:999px;padding:5px 12px;">
      New demo request
    </span>
    <h1 style="margin:16px 0 6px;font-size:22px;font-weight:800;letter-spacing:-0.02em;color:#1a1130;">${esc(company)}</h1>
    <p style="margin:0 0 22px;color:#6b6386;font-size:14px;">${esc(fullName)} just requested a demo on planet-matrix.com.</p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
           style="border:1px solid #efecf8;border-radius:12px;overflow:hidden;">
      ${detailRows}
    </table>

    <p style="margin:24px 0 8px;font-size:12px;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;color:#6b6386;">Message</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
      <td style="border-left:3px solid #7c3aed;background:#f6f3fd;border-radius:0 10px 10px 0;
                 padding:14px 16px;color:#3a3357;font-size:14px;white-space:pre-wrap;">${esc(message) || "—"}</td>
    </tr></table>

    <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:26px;"><tr>
      <td style="border-radius:10px;background-color:#7c3aed;">
        <a href="mailto:${esc(email)}?subject=Re%3A%20Your%20PlanetMatrix%20demo%20request"
           style="display:inline-block;padding:12px 24px;color:#ffffff;font-size:14px;
                  font-weight:600;text-decoration:none;font-family:${FONT};">
          Reply to ${esc(firstName)} &rarr;
        </a>
      </td>
    </tr></table>`;

  const html = emailShell(
    `New demo request from ${fullName} · ${company}`,
    teamBody,
  );

  // ── 1. Notify the team (must succeed) ────────────────────────────────────
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
      console.error("Resend team notify failed:", error);
      return Response.json(
        { error: "Failed to send your request." },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("Unexpected error sending team notify:", err);
    return Response.json(
      { error: "Failed to send your request." },
      { status: 502 },
    );
  }

  // ── Auto-reply body ───────────────────────────────────────────────────────
  const summaryRows: [string, string | undefined][] = [
    ["Company", company],
    ["Type", companyType],
    ["Country", country],
    ["Top priority", priority],
    ["Preferred language", language],
  ];

  const summaryHtml = summaryRows
    .map(([label, value], i) => {
      const bg = i % 2 ? "#faf9fe" : "#ffffff";
      return `<tr>
        <td style="padding:10px 16px;background:${bg};border-bottom:1px solid #efecf8;color:#6b6386;font-size:13px;white-space:nowrap;">${label}</td>
        <td style="padding:10px 16px;background:${bg};border-bottom:1px solid #efecf8;color:#1a1130;font-size:13px;font-weight:600;">${esc(value) || "—"}</td>
      </tr>`;
    })
    .join("");

  const replyBody = `
    <h1 style="margin:0 0 8px;font-size:22px;font-weight:800;letter-spacing:-0.02em;color:#1a1130;">
      Thank you, ${esc(firstName)}!
    </h1>
    <p style="margin:0 0 20px;color:#6b6386;font-size:15px;line-height:1.7;">
      We've received your demo request and a member of our team will be in touch within
      <strong style="color:#1a1130;">24 hours</strong> to schedule your call.
    </p>

    <p style="margin:0 0 10px;font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#6b6386;">
      Your submission summary
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
           style="border:1px solid #efecf8;border-radius:12px;overflow:hidden;margin-bottom:24px;">
      ${summaryHtml}
    </table>

    ${
      message
        ? `
    <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;color:#6b6386;">Your message</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
      <td style="border-left:3px solid #7c3aed;background:#f6f3fd;border-radius:0 10px 10px 0;
                 padding:14px 16px;color:#3a3357;font-size:14px;white-space:pre-wrap;">${esc(message)}</td>
    </tr></table>
    `
        : ""
    }

    <p style="margin:24px 0 4px;font-size:14px;color:#6b6386;">
      In the meantime, feel free to reply to this email with any questions.
    </p>
    <p style="margin:0;font-size:14px;color:#6b6386;">
      Best regards,<br/>
      <strong style="color:#1a1130;">The PlanetMatrix Team</strong>
    </p>`;

  const replyText =
    `Hi ${firstName},\n\n` +
    `Thank you for requesting a demo of PlanetMatrix! We've received your request and a member of our team will be in touch within 24 hours to schedule your call.\n\n` +
    `Your submission summary:\n` +
    summaryRows.map(([l, v]) => `• ${l}: ${v || "—"}`).join("\n") +
    `\n\nYour message:\n${message || "—"}\n\n` +
    `In the meantime, just reply to this email if you have any questions.\n\n` +
    `Best regards,\nThe PlanetMatrix Team`;

  const replyHtml = emailShell(
    "We've received your demo request — you'll hear from us within 24 hours.",
    replyBody,
  );

  // ── 2. Auto-reply to submitter (best-effort) ──────────────────────────────
  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: email,
      replyTo: FROM,
      subject: "We've received your demo request",
      text: replyText,
      html: replyHtml,
    });
    if (error) console.error("Resend auto-reply failed:", error);
  } catch (err) {
    console.error("Unexpected error sending auto-reply:", err);
  }

  return Response.json({ ok: true });
}
