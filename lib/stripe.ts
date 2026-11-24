import Stripe from "stripe";

/**
 * Accept standard secret keys (sk_), restricted keys (rk_), and
 * restricted client secrets (rkcs_) from Stripe Dashboard / Connect.
 * Reject empty values and .env.example placeholders.
 */
export function stripeConfigured(): boolean {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key || key.includes("REPLACE")) return false;
  return /^(sk|rk|rkcs)_(test|live)_/.test(key);
}

export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) {
    throw new Error("Stripe secret key is missing");
  }
  return new Stripe(key);
}

export function siteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000")
  );
}
