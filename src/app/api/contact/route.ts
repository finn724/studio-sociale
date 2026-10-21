import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contact-schema";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form and try again.", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  // Honeypot: real visitors never fill this hidden field.
  if (parsed.data.company) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !to) {
    console.error("Missing RESEND_API_KEY or CONTACT_TO_EMAIL env vars.");
    return NextResponse.json(
      { error: "The contact form isn't configured yet. Please email us directly." },
      { status: 500 }
    );
  }

  const { name, brand, email, handle, interests, message } = parsed.data;

  try {
    const resend = new Resend(apiKey);
    const from = process.env.CONTACT_FROM_EMAIL || "Studio Socialé <onboarding@resend.dev>";
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `New inquiry from ${name} (${brand})`,
      text: [
        `Name: ${name}`,
        `Brand/business: ${brand}`,
        `Email: ${email}`,
        `Instagram/TikTok handle: ${handle || "—"}`,
        `Interested in: ${interests.join(", ")}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Something went wrong sending your message. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form send failed:", err);
    return NextResponse.json(
      { error: "Something went wrong sending your message. Please try again." },
      { status: 500 }
    );
  }
}
