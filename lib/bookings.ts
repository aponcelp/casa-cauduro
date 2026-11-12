import { insertBooking } from "@/lib/supabase";

export type BookingSource = "cal.com" | "getyourguide" | "expedia" | "stripe";

export type BookingInput = {
  source: BookingSource;
  externalId: string;
  slotStart: string | null;
  partySize: number | null;
  payerEmail: string | null;
  amount: number | null;
  currency: string | null;
  status: string;
  raw: unknown;
};

/** Copy a third-party booking into the Supabase table we own. */
export async function upsertBooking(input: BookingInput): Promise<void> {
  await insertBooking(input);
}
