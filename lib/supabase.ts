import type { BookingInput } from "@/lib/bookings";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function insertBooking(input: BookingInput): Promise<void> {
  if (!url || !serviceKey) {
    console.info("[supabase] skipped upsertBooking (env not set)", {
      source: input.source,
      externalId: input.externalId,
    });
    return;
  }

  const response = await fetch(`${url}/rest/v1/bookings`, {
    method: "POST",
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=minimal",
    },
    body: JSON.stringify({
      source: input.source,
      external_id: input.externalId,
      slot_start: input.slotStart,
      party_size: input.partySize,
      payer_email: input.payerEmail,
      amount: input.amount,
      currency: input.currency,
      status: input.status,
      raw: input.raw,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Supabase bookings upsert failed: ${response.status} ${text}`);
  }
}
