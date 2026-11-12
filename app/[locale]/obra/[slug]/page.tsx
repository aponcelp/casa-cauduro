import Link from "next/link";
import { notFound } from "next/navigation";
import { MediaFrame } from "@/components/media-frame";
import { MdxBody } from "@/components/mdx-body";
import { PageShell } from "@/components/page-shell";
import { listSlugs, readDoc } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";
import { locales, parseLocale, publicPath } from "@/lib/locale";

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
  const cat = work.frontmatter.categoria as
    | keyof typeof t.obra.categories
    | undefined;

  return (
    <PageShell locale={locale} path={`/obra/${slug}`}>
      <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
        {work.frontmatter.imagen ? (
          <MediaFrame
            src={work.frontmatter.imagen}
            alt={work.frontmatter.title}
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="w-full"
          />
        ) : null}
        <div>
          <p className="text-xs tracking-[0.18em] uppercase text-[#8c3b2a]">
            {cat ? t.obra.categories[cat] : work.frontmatter.categoria}
          </p>
          <h1 className="mt-3 font-serif text-4xl sm:text-5xl">
            {work.frontmatter.title}
          </h1>
          <p className="mt-3 text-sm text-[#5c574f]">
            {[work.frontmatter.year, work.frontmatter.medium]
              .filter(Boolean)
              .join(" · ")}
          </p>
          <div className="mt-8">
            <MdxBody source={work.body} />
          </div>
          <p className="mt-10 text-sm">
            {t.obra.inquire}:{" "}
            <a className="underline underline-offset-4" href="mailto:estudio@cauduro.com">
              estudio@cauduro.com
            </a>
          </p>
          <Link
            href={publicPath(locale, "/obra")}
            className="mt-8 inline-block text-xs tracking-[0.18em] uppercase text-[#8c3b2a]"
          >
            ← {t.obra.title}
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
