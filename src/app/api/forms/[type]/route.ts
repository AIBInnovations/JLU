import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

type Primitive = string | number | boolean | null | undefined;
type Payload = Record<string, Primitive | Primitive[] | Record<string, Primitive>>;

const FORM_LABELS: Record<string, string> = {
  enquiry: "Course Enquiry",
  "anti-ragging": "Anti-Ragging Report",
  apply: "Admission Application",
  scholarship: "Scholarship Application",
  freeship: "Chancellor Freeship Application",
  "loan-assistance": "Loan Assistance Request",
  advisor: "Advisor Consultation Booking",
  "international-office": "International Office Enquiry",
  "student-clubs": "Student Club Interest",
  "campus-visit": "Campus Visit Booking",
};

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatValue(value: unknown): string {
  if (value === null || value === undefined || value === "") return "<em>—</em>";
  if (Array.isArray(value)) return value.map(formatValue).join(", ");
  if (typeof value === "object") {
    const rows = Object.entries(value as Record<string, unknown>)
      .map(([k, v]) => `<div><strong>${escapeHtml(k)}:</strong> ${formatValue(v)}</div>`)
      .join("");
    return `<div style="padding-left:12px;border-left:2px solid #eee;">${rows}</div>`;
  }
  return escapeHtml(value);
}

function buildHtml(label: string, payload: Payload): string {
  const rows = Object.entries(payload)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;vertical-align:top;font-weight:600;width:220px;">${escapeHtml(
          k
        )}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">${formatValue(v)}</td></tr>`
    )
    .join("");

  return `<!doctype html>
<html><body style="font-family:Arial,sans-serif;color:#222;">
  <h2 style="margin:0 0 12px;">New ${escapeHtml(label)}</h2>
  <p style="margin:0 0 16px;color:#555;">Received ${escapeHtml(new Date().toLocaleString())}</p>
  <table style="border-collapse:collapse;width:100%;max-width:720px;">${rows}</table>
</body></html>`;
}

function getTransport() {
  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    throw new Error("SMTP env vars missing");
  }
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT || 465),
    secure: SMTP_SECURE !== "false",
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

export async function POST(
  req: NextRequest,
  ctx: { params: Promise<{ type: string }> }
) {
  const { type } = await ctx.params;
  const label = FORM_LABELS[type];
  if (!label) {
    return NextResponse.json({ error: "Unknown form type" }, { status: 400 });
  }

  let payload: Payload;
  try {
    payload = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const transport = getTransport();
  const to = process.env.MAIL_TO || process.env.SMTP_USER!;
  const fromAddr = process.env.MAIL_FROM || process.env.SMTP_USER!;
  const fromName = process.env.MAIL_FROM_NAME || "JLU Forms";

  try {
    await transport.sendMail({
      from: `"${fromName}" <${fromAddr}>`,
      to,
      subject: `[JLU] ${label}`,
      html: buildHtml(label, payload),
      replyTo:
        typeof payload.email === "string" && payload.email ? payload.email : undefined,
    });
  } catch (err) {
    console.error("sendMail failed", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
