import { NextResponse } from "next/server";
import { upsertBooking } from "@/lib/bookings";

export async function POST(request: Request) {
  const secret = process.env.CALCOM_WEBHOOK_SECRET;
  if (secret) {
    const header = request.headers.get("x-cal-signature-256");
    if (!header) {
      return NextResponse.json({ error: "Missing signature" }, { status: 401 });
    }
  }

  const payload = (await request.json()) as {
    triggerEvent?: string;
    payload?: {
      uid?: string;
      startTime?: string;
      attendees?: { email?: string }[];
      metadata?: { partySize?: number };
    };
  };

  const booking = payload.payload;
  await upsertBooking({
    source: "cal.com",
    externalId: booking?.uid ?? "unknown",
    slotStart: booking?.startTime ?? null,
    partySize: booking?.metadata?.partySize ?? null,
    payerEmail: booking?.attendees?.[0]?.email ?? null,
    amount: null,
    currency: "mxn",
    status: payload.triggerEvent ?? "unknown",
    raw: payload,
  });

  return NextResponse.json({ ok: true });
}
