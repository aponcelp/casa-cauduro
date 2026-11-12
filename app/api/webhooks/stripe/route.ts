import { NextResponse } from "next/server";
import { upsertBooking } from "@/lib/bookings";

export async function POST(request: Request) {
  const payload = await request.json();
  const id = (payload as { id?: string }).id ?? "unknown";

  await upsertBooking({
    source: "stripe",
    externalId: id,
    slotStart: null,
    partySize: null,
    payerEmail: null,
    amount: null,
    currency: null,
    status: (payload as { type?: string }).type ?? "unknown",
    raw: payload,
  });

  return NextResponse.json({ ok: true, stub: true });
}
