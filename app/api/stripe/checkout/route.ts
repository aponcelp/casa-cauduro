import { NextResponse } from "next/server";
import { readDoc } from "@/lib/content";
import { getStripe, siteUrl, stripeConfigured } from "@/lib/stripe";

export async function POST(request: Request) {
  if (!stripeConfigured()) {
    return NextResponse.json(
      {
        error:
          "Stripe is not configured. Set STRIPE_SECRET_KEY=sk_test_… in .env.local",
      },
      { status: 503 },
    );
  }

  const body = (await request.json()) as { slug?: string; locale?: string };
  const slug = body.slug;
  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }

  const product = readDoc("tienda", slug, "es");
  if (!product || product.frontmatter.disponible === false) {
    return NextResponse.json({ error: "Unavailable" }, { status: 404 });
  }

  const amountMxn = product.frontmatter.precio_mxn;
  if (!amountMxn || amountMxn <= 0) {
    return NextResponse.json(
      {
        error:
          "This piece has no precio_mxn yet — inquire at tienda@cauduro.com",
      },
      { status: 400 },
    );
  }

  const origin = siteUrl();
  const localePrefix = body.locale === "en" ? "/en" : "";
  const stripe = getStripe();

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    success_url: `${origin}${localePrefix}/tienda/${slug}?checkout=success`,
    cancel_url: `${origin}${localePrefix}/tienda/${slug}?checkout=cancel`,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "mxn",
          unit_amount: Math.round(amountMxn * 100),
          product_data: {
            name: product.frontmatter.title,
            description: product.frontmatter.medium ?? "Giclée Casa Cauduro",
            images: product.frontmatter.imagen
              ? [`${origin}${product.frontmatter.imagen}`]
              : undefined,
          },
        },
      },
    ],
    metadata: {
      slug,
      source: "tienda",
    },
  });

  if (!session.url) {
    return NextResponse.json(
      { error: "Stripe did not return a Checkout URL" },
      { status: 502 },
    );
  }

  return NextResponse.json({ url: session.url });
}
