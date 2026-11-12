import { notFound } from "next/navigation";
import { BuyButton } from "@/components/buy-button";
import { MediaFrame } from "@/components/media-frame";
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
      <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
        {product.frontmatter.imagen ? (
          <MediaFrame
            src={product.frontmatter.imagen}
            alt={product.frontmatter.title}
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        ) : null}
        <div>
          <h1 className="font-serif text-4xl sm:text-5xl">
            {product.frontmatter.title}
          </h1>
          {product.frontmatter.medium ? (
            <p className="mt-3 text-sm text-[#5c574f]">
              {product.frontmatter.medium}
            </p>
          ) : null}
          {product.frontmatter.precio_mxn ? (
            <p className="mt-4 text-lg">
              MXN {product.frontmatter.precio_mxn.toLocaleString("es-MX")}
            </p>
          ) : null}
          <div className="mt-8">
            <MdxBody source={product.body} />
          </div>
          {canBuy ? (
            <BuyButton
              slug={slug}
              locale={locale}
              label={t.tienda.buy}
              disabledLabel={t.tienda.stripeMissing}
              configured={stripeConfigured()}
            />
          ) : (
            <p className="mt-6 text-sm">{t.tienda.unavailable}</p>
          )}
        </div>
      </div>
    </PageShell>
  );
}
