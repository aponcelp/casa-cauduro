import { notFound } from "next/navigation";
import { BuyButton } from "@/components/buy-button";
import { MdxBody } from "@/components/mdx-body";
import { PageShell } from "@/components/page-shell";
import { listSlugs, readDoc } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";
import { locales, parseLocale } from "@/lib/locale";

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
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        {product.frontmatter.imagen ? (
          <img
            src={product.frontmatter.imagen}
            alt={product.frontmatter.title}
            className="aspect-[3/4] w-full object-cover bg-[#ddd7cc]"
          />
        ) : null}
        <div>
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
        />
      ) : (
        <p className="mt-6 text-sm">{t.tienda.unavailable}</p>
      )}
        </div>
      </div>
    </PageShell>
  );
}
