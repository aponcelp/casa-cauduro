import { notFound } from "next/navigation";
import { MdxBody } from "@/components/mdx-body";
import { PageShell } from "@/components/page-shell";
import { listSlugs, readDoc } from "@/lib/content";
import { locales, parseLocale } from "@/lib/locale";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    listSlugs("cartelera").map((slug) => ({ locale, slug })),
  );
}

export default async function CarteleraShowPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const locale = parseLocale(raw);
  const show = readDoc("cartelera", slug, locale);
  if (!show) notFound();

  return (
    <PageShell locale={locale} path={`/cartelera/${slug}`}>
      <h1 className="font-serif text-4xl">{show.frontmatter.title}</h1>
      <p className="mt-3 text-sm text-[#5c574f]">
        {[show.frontmatter.venue, show.frontmatter.starts, show.frontmatter.ends]
          .filter(Boolean)
          .join(" · ")}
      </p>
      <div className="mt-10">
        <MdxBody source={show.body} />
      </div>
    </PageShell>
  );
}
