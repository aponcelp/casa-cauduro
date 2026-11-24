import { NextResponse } from "next/server";
import { readDoc, type ContentKind } from "@/lib/content";
import { getStripe, siteUrl, stripeConfigured } from "@/lib/stripe";
import { VISIT_PRODUCT_SLUG } from "@/lib/visit-unlock";

type CheckoutKind = "tienda" | "visita";

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

  const body = (await request.json()) as {
    slug?: string;
    locale?: string;
    kind?: CheckoutKind;
  };
  const kind: CheckoutKind = body.kind === "visita" ? "visita" : "tienda";
  const slug = body.slug ?? (kind === "visita" ? VISIT_PRODUCT_SLUG : undefined);
  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }

  const contentKind: ContentKind = kind === "visita" ? "visita" : "tienda";
  const product = readDoc(contentKind, slug, "es");
  if (!product || product.frontmatter.disponible === false) {
    return NextResponse.json({ error: "Unavailable" }, { status: 404 });
  }

  const amountMxn = product.frontmatter.precio_mxn;
  if (!amountMxn || amountMxn <= 0) {
    return NextResponse.json(
      {
        error:
          kind === "visita"
            ? "Visit product has no precio_mxn — set it in content/visita/"
            : "This piece has no precio_mxn yet — inquire at tienda@cauduro.com",
      },
      { status: 400 },
    );
  }

  const origin = siteUrl();
  const localePrefix = body.locale === "en" ? "/en" : "";
  const locale = body.locale === "en" ? "en" : "es";
  const stripe = getStripe();

  if (kind === "visita") {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      locale: "es",
      customer_creation: "if_required",
      success_url: `${origin}/api/stripe/visit-success?session_id={CHECKOUT_SESSION_ID}&locale=${locale}`,
      cancel_url: `${origin}${localePrefix}/visita?checkout=cancel`,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "mxn",
            unit_amount: Math.round(amountMxn * 100),
            product_data: {
              name: product.frontmatter.title,
              description:
                product.frontmatter.medium ?? "Visita guiada Casa Cauduro",
            },
          },
        },
      ],
      metadata: {
        slug,
        source: "visita",
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

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    locale: "es",
    customer_creation: "if_required",
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
  });

  if (!session.url) {
    return NextResponse.json(
      { error: "Stripe did not return a Checkout URL" },
      { status: 502 },
    );
  }

  return NextResponse.json({ url: session.url });
}
