import Link from "next/link";
import { MediaFrame } from "@/components/media-frame";
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
      <h1 className="font-serif text-4xl sm:text-5xl">{t.cartelera.title}</h1>
      <p className="mt-4 max-w-2xl text-[#3f3b35]">{t.cartelera.intro}</p>
      <ul className="mt-12 grid gap-10 lg:grid-cols-2">
        {shows.map((show) => (
          <li key={show.slug}>
            <Link
              href={publicPath(locale, `/cartelera/${show.slug}`)}
              className="group block"
            >
              {show.frontmatter.imagen ? (
                <MediaFrame
                  src={show.frontmatter.imagen}
                  alt={show.frontmatter.title}
                  className="transition duration-500 group-hover:opacity-90"
                />
              ) : null}
              <p className="mt-4 text-xs tracking-[0.2em] uppercase text-[#8c3b2a]">
                {t.cartelera.current}
              </p>
              <h2 className="mt-2 font-serif text-3xl">
                {show.frontmatter.title}
              </h2>
              <p className="mt-2 text-sm text-[#5c574f]">
                {[
                  show.frontmatter.venue,
                  show.frontmatter.starts,
                  show.frontmatter.ends,
                ]
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
