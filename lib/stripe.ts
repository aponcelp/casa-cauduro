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

/** Canonical public site URL (production). Prefer requestOrigin for Checkout return URLs. */
export function siteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000")
  );
}

/**
 * Origin for Stripe success/cancel redirects and post-pay redirects.
 * Uses the incoming Host so preview deploys stay on the preview hostname
 * instead of NEXT_PUBLIC_SITE_URL (production).
 */
export function requestOrigin(request: Request): string {
  const forwardedHost = request.headers.get("x-forwarded-host")?.split(",")[0]?.trim();
  const host =
    forwardedHost ||
    request.headers.get("host")?.split(",")[0]?.trim() ||
    process.env.VERCEL_URL?.replace(/^https?:\/\//, "");

  if (host) {
    const forwardedProto = request.headers
      .get("x-forwarded-proto")
      ?.split(",")[0]
      ?.trim();
    const proto =
      forwardedProto ||
      (host.includes("localhost") || host.startsWith("127.")
        ? "http"
        : "https");
    return `${proto}://${host}`.replace(/\/$/, "");
  }

  return siteUrl();
}
