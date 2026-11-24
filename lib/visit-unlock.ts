import { cookies } from "next/headers";
import { getStripe, stripeConfigured } from "@/lib/stripe";

export const VISIT_PRODUCT_SLUG = "visita-guiada";
export const VISIT_UNLOCK_COOKIE = "cc_visita_unlock";
/** How long Cal.com stays unlocked after a successful visit payment. */
export const VISIT_UNLOCK_MAX_AGE_SEC = 60 * 60 * 24 * 7; // 7 days

export type VisitSessionCheck = {
  paid: boolean;
  sessionId: string | null;
  email: string | null;
};

/** True when Stripe Checkout session is a paid visita SKU. */
export async function verifyVisitCheckoutSession(
  sessionId: string,
): Promise<VisitSessionCheck> {
  if (!stripeConfigured() || !sessionId.startsWith("cs_")) {
    return { paid: false, sessionId: null, email: null };
  }

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const isVisit = session.metadata?.source === "visita";
    const paid =
      isVisit &&
      (session.payment_status === "paid" ||
        session.payment_status === "no_amount_required");

    return {
      paid: Boolean(paid),
      sessionId: paid ? session.id : null,
      email: session.customer_details?.email ?? session.customer_email ?? null,
    };
  } catch {
    return { paid: false, sessionId: null, email: null };
  }
}

export function unlockCookieOptions(sessionId: string) {
  // Vercel preview/production are always HTTPS; keep cookies Secure there.
  const secure =
    process.env.NODE_ENV === "production" ||
    Boolean(process.env.VERCEL);
  return {
    name: VISIT_UNLOCK_COOKIE,
    value: sessionId,
    httpOnly: true,
    secure,
    sameSite: "lax" as const,
    path: "/",
    maxAge: VISIT_UNLOCK_MAX_AGE_SEC,
  };
}

/** Server-side: cookie present and Stripe still says paid. */
export async function visitIsUnlocked(): Promise<boolean> {
  const jar = await cookies();
  const sessionId = jar.get(VISIT_UNLOCK_COOKIE)?.value;
  if (!sessionId) return false;
  const check = await verifyVisitCheckoutSession(sessionId);
  return check.paid;
}
