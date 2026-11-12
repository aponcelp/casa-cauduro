import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { upsertBooking } from "@/lib/bookings";
import { getStripe } from "@/lib/stripe";

export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const stripe = getStripe();
  const raw = await request.text();

  let event: Stripe.Event;
  if (secret) {
    const signature = request.headers.get("stripe-signature");
    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 401 });
    }
    try {
      event = stripe.webhooks.constructEvent(raw, signature, secret);
    } catch {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }
  } else {
    event = JSON.parse(raw) as Stripe.Event;
  }

  if (
    event.type === "checkout.session.completed" ||
    event.type === "checkout.session.async_payment_succeeded"
  ) {
    const session = event.data.object as Stripe.Checkout.Session;
    await upsertBooking({
      source: "stripe",
      externalId: session.id,
      slotStart: null,
      partySize: null,
      payerEmail: session.customer_details?.email ?? session.customer_email,
      amount: session.amount_total,
      currency: session.currency,
      status: event.type,
      raw: session,
    });
  }

  return NextResponse.json({ ok: true });
}
