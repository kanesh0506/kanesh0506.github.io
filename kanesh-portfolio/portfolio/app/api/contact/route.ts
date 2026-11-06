import { NextResponse } from "next/server";

export const runtime = "nodejs";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const clean = (value: unknown, max: number) => (typeof value === "string" ? value.trim().slice(0, max) : "");

/**
 * Contact form endpoint.
 * - Validates input and drops honeypot submissions.
 * - Sends via Resend when RESEND_API_KEY and CONTACT_TO_EMAIL are set.
 * - Otherwise returns 503 "not_configured" so the UI can say plainly that nothing was sent.
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  // Honeypot: bots fill the hidden field. Pretend success without sending anything.
  if (clean(body.company, 200)) return NextResponse.json({ ok: true });

  const name = clean(body.name, 100).replace(/[\r\n]+/g, " ");
  const email = clean(body.email, 200);
  const message = clean(body.message, 5000);

  if (!name || !emailRe.test(email) || message.length < 10) {
    return NextResponse.json({ error: "invalid_input" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) return NextResponse.json({ error: "not_configured" }, { status: 503 });

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
        to: [to],
        reply_to: email,
        subject: `Portfolio message from ${name}`,
        text: `${message}\n\n— ${name} <${email}>`,
      }),
    });
    if (!res.ok) return NextResponse.json({ error: "send_failed" }, { status: 502 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }
}
