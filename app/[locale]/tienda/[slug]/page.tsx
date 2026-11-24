import { notFound } from "next/navigation";
import { BuyButton } from "@/components/buy-button";
import { MdxBody } from "@/components/mdx-body";
import { PageShell } from "@/components/page-shell";
import { listSlugs, readDoc } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";
import { locales, parseLocale } from "@/lib/locale";
import { stripeConfigured } from "@/lib/stripe";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    listSlugs("tienda").map((slug) => ({ locale, slug })),
  );
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const locale = parseLocale(raw);
  const product = readDoc("tienda", slug, locale);
  if (!product) notFound();
  const t = getDictionary(locale);
  const canBuy = product.frontmatter.disponible !== false;

  return (
    <PageShell locale={locale} path={`/tienda/${slug}`}>
      <h1 className="font-serif text-4xl">{product.frontmatter.title}</h1>
      {product.frontmatter.precio_mxn ? (
        <p className="mt-3 text-sm">MXN {product.frontmatter.precio_mxn}</p>
      ) : null}
      <div className="mt-10">
        <MdxBody source={product.body} />
      </div>
      {canBuy ? (
        <BuyButton
          slug={slug}
          label={t.tienda.buy}
          disabledLabel={t.tienda.stripeMissing}
          configured={stripeConfigured()}
        />
      ) : (
        <p className="mt-6 text-sm">{t.tienda.unavailable}</p>
      )}
    </PageShell>
  );
}
