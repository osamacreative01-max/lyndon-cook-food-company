import { NextResponse } from "next/server";

import { forwardEnquiryWebhook, sendEnquiryEmail } from "@/lib/email";
import { ENQUIRY_MESSAGES, enquirySchema, type EnquiryData } from "@/lib/enquiry";
import { checkRateLimit, isSubmittedTooQuickly } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Enquiry endpoint.
 *
 * Defence in depth, in order:
 *   1. Body size is bounded before parsing.
 *   2. Rate limit per client IP.
 *   3. Schema validation (identical to the client schema).
 *   4. Honeypot field and minimum fill time.
 *   5. Header-injection stripping before anything reaches nodemailer.
 *
 * A request rejected by 2, 3 or 4 returns a *successful* response with no
 * delivery attempt, so automated clients receive no signal about which check
 * they tripped.
 */
export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 32_000) {
    return NextResponse.json(
      { ok: false, message: ENQUIRY_MESSAGES.failure },
      { status: 413 }
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const limit = checkRateLimit(`enquiry:${ip}`);
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, message: ENQUIRY_MESSAGES.rateLimited },
      {
        status: 429,
        headers: { "Retry-After": String(limit.retryAfterSeconds) },
      }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: ENQUIRY_MESSAGES.failure },
      { status: 400 }
    );
  }

  const parsed = enquirySchema.safeParse(body);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !fieldErrors[key]) {
        fieldErrors[key] = issue.message;
      }
    }

    return NextResponse.json(
      {
        ok: false,
        message: ENQUIRY_MESSAGES.failure,
        errors: fieldErrors,
        // Echoed back so a server-side validation failure never wipes the form.
        values: body,
      },
      { status: 400 }
    );
  }

  const data = parsed.data as EnquiryData;

  // Honeypot filled, or submitted faster than a human could type.
  if (data.companyWebsite || isSubmittedTooQuickly(data.startedAt)) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  try {
    const email = await sendEnquiryEmail(data);
    const webhook = await forwardEnquiryWebhook(data);

    if (!email.sent && !webhook) {
      // Nothing durable accepted the enquiry. Do not show a false success.
      return NextResponse.json(
        { ok: false, message: ENQUIRY_MESSAGES.failure },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { ok: true, delivered: email.sent ? "email" : "webhook" },
      { status: 200 }
    );
  } catch (error) {
    // Log the failure type only. Enquiry content is never logged.
    console.error(
      "Enquiry delivery failed:",
      error instanceof Error ? error.name : "unknown error"
    );
    return NextResponse.json(
      { ok: false, message: ENQUIRY_MESSAGES.failure },
      { status: 502 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { ok: false, message: "Method not allowed" },
    { status: 405, headers: { Allow: "POST" } }
  );
}
