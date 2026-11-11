import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { listDocs } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";
import { parseLocale, publicPath } from "@/lib/locale";

export default async function CarteleraPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = parseLocale((await params).locale);
  const t = getDictionary(locale);
  const shows = listDocs("cartelera", locale);

  return (
    <PageShell locale={locale} path="/cartelera">
      <h1 className="font-serif text-4xl">{t.cartelera.title}</h1>
      <p className="mt-4 max-w-2xl text-[#3f3b35]">{t.cartelera.intro}</p>
      <ul className="mt-12 space-y-8">
        {shows.map((show) => (
          <li key={show.slug}>
            <Link href={publicPath(locale, `/cartelera/${show.slug}`)}>
              <h2 className="font-serif text-2xl">{show.frontmatter.title}</h2>
              <p className="mt-1 text-sm text-[#5c574f]">
                {[show.frontmatter.venue, show.frontmatter.starts, show.frontmatter.ends]
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
