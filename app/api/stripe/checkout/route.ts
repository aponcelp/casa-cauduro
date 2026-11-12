import { NextResponse } from "next/server";
import { readDoc } from "@/lib/content";
import { getStripe, siteUrl, stripeConfigured } from "@/lib/stripe";

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

  const precio = product.frontmatter.precio_mxn;
  if (!precio || precio <= 0) {
    return NextResponse.json(
      { error: "Product has no precio_mxn" },
      { status: 400 },
    );
  }

  const origin = siteUrl();
  const stripe = getStripe();

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    locale: "es",
    customer_creation: "if_required",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "mxn",
          unit_amount: Math.round(precio * 100),
          product_data: {
            name: product.frontmatter.title,
            description: "Casa Estudio Rafael Cauduro — tienda",
            ...(product.frontmatter.imagen
              ? { images: [`${origin}${product.frontmatter.imagen}`] }
              : {}),
          },
        },
      },
    ],
    shipping_address_collection: {
      allowed_countries: ["MX", "US", "CA", "ES"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 0, currency: "mxn" },
          display_name: "Recoger en la visita / casa",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 1 },
            maximum: { unit: "business_day", value: 14 },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 25000, currency: "mxn" },
          display_name: "Envío a domicilio (MXN 250 — estimado)",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 5 },
            maximum: { unit: "business_day", value: 15 },
          },
        },
      },
    ],
    metadata: {
      slug,
      source: "tienda",
    },
    success_url: `${origin}/tienda/${slug}?paid=1`,
    cancel_url: `${origin}/tienda/${slug}?canceled=1`,
  });

  if (!session.url) {
    return NextResponse.json(
      { error: "Checkout session missing url" },
      { status: 500 },
    );
  }

  return NextResponse.json({ url: session.url });
}
