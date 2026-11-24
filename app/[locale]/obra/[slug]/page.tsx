import { notFound } from "next/navigation";
import { MdxBody } from "@/components/mdx-body";
import { PageShell } from "@/components/page-shell";
import { listSlugs, readDoc } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";
import { locales, parseLocale } from "@/lib/locale";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    listSlugs("obra").map((slug) => ({ locale, slug })),
  );
}

export default async function ObraPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const locale = parseLocale(raw);
  const work = readDoc("obra", slug, locale);
  if (!work) notFound();
  const t = getDictionary(locale);

  return (
    <PageShell locale={locale} path={`/obra/${slug}`}>
      <p className="text-xs tracking-[0.18em] uppercase text-[#8c3b2a]">
        {work.frontmatter.categoria}
      </p>
      <h1 className="mt-3 font-serif text-4xl">{work.frontmatter.title}</h1>
      <p className="mt-3 text-sm text-[#5c574f]">
        {[work.frontmatter.year, work.frontmatter.medium]
          .filter(Boolean)
          .join(" · ")}
      </p>
      <div className="mt-10">
        <MdxBody source={work.body} />
      </div>
      <p className="mt-10 text-sm">{t.obra.inquire}: estudio@cauduro.com</p>
    </PageShell>
  );
}
