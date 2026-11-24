import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { listDocs } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";
import { parseLocale, publicPath } from "@/lib/locale";

export default async function ObraIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = parseLocale((await params).locale);
  const t = getDictionary(locale);
  const works = listDocs("obra", locale);

  return (
    <PageShell locale={locale} path="/obra">
      <h1 className="font-serif text-4xl">{t.obra.title}</h1>
      <p className="mt-4 max-w-2xl text-[#3f3b35]">{t.obra.intro}</p>
      <ul className="mt-12 grid gap-8 sm:grid-cols-2">
        {works.map((work) => (
          <li key={work.slug}>
            <Link
              href={publicPath(locale, `/obra/${work.slug}`)}
              className="block"
            >
              <p className="text-xs tracking-[0.18em] uppercase text-[#8c3b2a]">
                {work.frontmatter.categoria
                  ? t.obra.categories[
                      work.frontmatter.categoria as keyof typeof t.obra.categories
                    ] ?? work.frontmatter.categoria
                  : null}
              </p>
              <h2 className="mt-2 font-serif text-2xl">
                {work.frontmatter.title}
              </h2>
              <p className="mt-1 text-sm text-[#5c574f]">
                {[work.frontmatter.year, work.frontmatter.medium]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
