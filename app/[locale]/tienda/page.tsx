import Link from "next/link";
import { MediaFrame } from "@/components/media-frame";
import { PageShell } from "@/components/page-shell";
import { listDocs } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";
import { parseLocale, publicPath } from "@/lib/locale";

export default async function TiendaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = parseLocale((await params).locale);
  const t = getDictionary(locale);
  const products = listDocs("tienda", locale);

  return (
    <PageShell locale={locale} path="/tienda">
      <h1 className="font-serif text-4xl sm:text-5xl">{t.tienda.title}</h1>
      <p className="mt-4 max-w-2xl text-[#3f3b35] leading-7">{t.tienda.intro}</p>
      <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <li key={product.slug}>
            <Link
              href={publicPath(locale, `/tienda/${product.slug}`)}
              className="group block"
            >
              {product.frontmatter.imagen ? (
                <MediaFrame
                  src={product.frontmatter.imagen}
                  alt={product.frontmatter.title}
                  className="transition duration-500 group-hover:opacity-90"
                />
              ) : null}
              <h2 className="mt-3 font-serif text-2xl">
                {product.frontmatter.title}
              </h2>
              <p className="mt-1 text-sm text-[#5c574f]">
                {product.frontmatter.precio_mxn
                  ? `MXN ${product.frontmatter.precio_mxn}`
                  : t.tienda.inquire}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
