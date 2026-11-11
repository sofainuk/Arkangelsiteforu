import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Payload = Record<string, unknown>;

const MAX = 3000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim().slice(0, MAX) : "";
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Honeypot: real visitors never fill this.
  if (clean(body.website)) {
    return NextResponse.json({ ok: true, delivered: false });
  }

  const type = body.type === "institutional" ? "institutional" : "individual";
  const name = clean(type === "institutional" ? body.organisation : body.fullName);
  const email = clean(body.email);

  if (!name || !EMAIL_RE.test(email) || body.consent !== true) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 422 });
  }

  const enquiry = {
    type,
    lang: body.lang === "ar" ? "ar" : "en",
    fullName: clean(body.fullName),
    designation: clean(body.designation),
    specialty: clean(body.specialty),
    hospital: clean(body.hospital),
    organisation: clean(body.organisation),
    lead: clean(body.lead),
    participants: clean(body.participants),
    email,
    phone: clean(body.phone),
    dates: clean(body.dates),
    message: clean(body.message),
    submittedAt: new Date().toISOString(),
  };

  const endpoint = process.env.FORM_ENDPOINT;
  if (!endpoint) {
    // No form service connected yet: accept the enquiry (demo mode).
    console.info("[enquiry] received (FORM_ENDPOINT not set):", enquiry.type, enquiry.email);
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ ...enquiry, _subject: `New ${type} enquiry: ${name}`, _replyto: email }),
    });
    if (!res.ok) {
      return NextResponse.json({ ok: false, error: "upstream" }, { status: 502 });
    }
    return NextResponse.json({ ok: true, delivered: true });
  } catch {
    return NextResponse.json({ ok: false, error: "network" }, { status: 502 });
  }
}
