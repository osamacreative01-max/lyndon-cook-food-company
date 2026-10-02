/**
 * Server-only enquiry email delivery.
 *
 * - Secrets are read from environment variables inside the route handler and are
 *   never imported into a client bundle (`server-only` is enforced by the
 *   `"server-only"` import in the API route that calls this module).
 * - The From address is the company domain; the visitor's address is only ever
 *   used as Reply-To, after control characters have been stripped.
 * - Message bodies are plain text. No user input is ever placed in a header
 *   without passing through `headerSafe()`.
 */

import nodemailer from "nodemailer";

import { headerSafe, type EnquiryData } from "@/lib/enquiry";
import { SITE } from "@/lib/site";

export type EmailResult = { sent: boolean; provider: "smtp" | "none" };

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildText(data: EnquiryData): string {
  return [
    "New website enquiry",
    "",
    `Name:          ${data.name}`,
    `Organisation: ${data.organisation}`,
    `Email:         ${data.email}`,
    `Telephone:     ${data.telephone || "-"}`,
    "",
    `Buyer type:        ${data.buyerType || "-"}`,
    `Products:          ${data.products || "-"}`,
    `Quantity:          ${data.quantity || "-"} ${data.quantityUnit || ""}`.trim(),
    `Destination:       ${data.destination || "-"}`,
    `Delivery schedule: ${data.deliverySchedule || "-"}`,
    "",
    "Specification / message:",
    data.message || "-",
    "",
    "---",
    `Sent from ${SITE.url}/enquire/`,
  ].join("\n");
}

function buildHtml(data: EnquiryData): string {
  const row = (label: string, value: string) => `
      <tr>
        <th align="left" style="padding:8px 16px 8px 0;color:#084B50;font:600 14px Arial,Helvetica,sans-serif;white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</th>
        <td style="padding:8px 0;color:#234446;font:400 14px Arial,Helvetica,sans-serif;vertical-align:top;">${escapeHtml(value) || "&mdash;"}</td>
      </tr>`;

  return `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:24px;background:#F7F3EB;">
    <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e5ded1;">
      <div style="background:#084B50;padding:20px 24px;">
        <p style="margin:0;color:#ffffff;font:600 18px Georgia,'Times New Roman',serif;">The Lyndon Cook</p>
        <p style="margin:6px 0 0;color:#B97C4C;font:400 12px Arial,Helvetica,sans-serif;letter-spacing:0.14em;text-transform:uppercase;">New website enquiry</p>
      </div>
      <div style="padding:8px 24px 20px;">
        <table style="width:100%;border-collapse:collapse;">${[
          row("Name", data.name),
          row("Organisation", data.organisation),
          row("Email", data.email),
          row("Telephone", data.telephone),
          row("Buyer type", data.buyerType),
          row("Products", data.products),
          row("Quantity", [data.quantity, data.quantityUnit].filter(Boolean).join(" ")),
          row("Destination", data.destination),
          row("Delivery schedule", data.deliverySchedule),
        ].join("")}
        </table>
        <h2 style="margin:20px 0 8px;color:#084B50;font:600 15px Arial,Helvetica,sans-serif;">Specification / message</h2>
        <p style="margin:0;color:#234446;font:400 14px/1.6 Arial,Helvetica,sans-serif;white-space:pre-wrap;">${escapeHtml(data.message) || "&mdash;"}</p>
        <p style="margin:24px 0 0;padding-top:16px;border-top:1px solid #e5ded1;color:#5a6f70;font:400 12px Arial,Helvetica,sans-serif;">
          Sent from ${escapeHtml(SITE.url)}/enquire/
        </p>
      </div>
    </div>
  </body>
</html>`;
}

export function isEmailConfigured(): boolean {
  return Boolean(
    process.env.EMAIL_SERVER_HOST && process.env.EMAIL_SERVER_USER && process.env.EMAIL_SERVER_PASSWORD
  );
}

/**
 * Sends the enquiry notification. Returns `sent: false` when email is not
 * configured, which the route handler treats as an infrastructure failure so
 * the visitor is not shown a false success message.
 */
export async function sendEnquiryEmail(
  data: EnquiryData
): Promise<EmailResult> {
  if (!isEmailConfigured()) {
    return { sent: false, provider: "none" };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: Number(process.env.EMAIL_SERVER_PORT ?? 587),
    secure: process.env.EMAIL_SERVER_SECURE === "true",
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });

  // A single line of context helps triage without relying on visitor prose.
  const subject = [
    "Website enquiry",
    headerSafe(data.products) || "General",
    `- ${headerSafe(data.organisation)}`,
  ].join(": ");

  await transporter.sendMail({
    from: process.env.ENQUIRY_FROM ?? `"${SITE.name}" <${SITE.email}>`,
    to: process.env.ENQUIRY_TO ?? SITE.email,
    replyTo: headerSafe(data.email),
    subject,
    text: buildText(data),
    html: buildHtml(data),
  });

  return { sent: true, provider: "smtp" };
}

/** Optional second destination (CRM / webhook). Never logs visitor content. */
export async function forwardEnquiryWebhook(
  data: EnquiryData
): Promise<boolean> {
  const url = process.env.ENQUIRY_WEBHOOK_URL;
  if (!url) return false;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: SITE.domain,
        receivedAt: new Date().toISOString(),
        enquiry: {
          name: headerSafe(data.name),
          organisation: headerSafe(data.organisation),
          email: headerSafe(data.email),
          telephone: headerSafe(data.telephone),
          buyerType: data.buyerType,
          products: headerSafe(data.products),
          quantity: headerSafe(data.quantity),
          quantityUnit: data.quantityUnit,
          destination: headerSafe(data.destination),
          deliverySchedule: data.deliverySchedule,
          message: data.message,
        },
      }),
      cache: "no-store",
    });
    return response.ok;
  } catch {
    return false;
  }
}
