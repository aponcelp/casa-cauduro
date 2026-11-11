import { NextResponse } from "next/server";
import { readDoc } from "@/lib/content";
import { stripeConfigured } from "@/lib/stripe";

export async function POST(request: Request) {
  if (!stripeConfigured()) {
    return NextResponse.json(
      { error: "Stripe is not configured" },
      { status: 503 },
    );
  }

  const { slug } = (await request.json()) as { slug?: string };
  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }

  const product = readDoc("tienda", slug, "es");
  if (!product || product.frontmatter.disponible === false) {
    return NextResponse.json({ error: "Unavailable" }, { status: 404 });
  }

  return NextResponse.json(
    {
      error:
        "Stripe Checkout session creation is stubbed. Wire stripe.checkout.sessions.create with STRIPE_SECRET_KEY.",
    },
    { status: 501 },
  );
}
