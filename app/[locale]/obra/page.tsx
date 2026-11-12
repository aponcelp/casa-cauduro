import Link from "next/link";
import { MediaFrame } from "@/components/media-frame";
import { PageShell } from "@/components/page-shell";
import { listDocs } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";
import { parseLocale, publicPath } from "@/lib/locale";

const ORDER = [
  "murales",
  "gran-formato",
  "vidrio",
  "dibujo",
  "giclees",
  "escultorico",
] as const;

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
      <h1 className="font-serif text-4xl sm:text-5xl">{t.obra.title}</h1>
      <p className="mt-4 max-w-2xl text-[#3f3b35] leading-7">{t.obra.intro}</p>
      <nav className="mt-8 flex flex-wrap gap-3 text-[0.65rem] tracking-[0.2em] uppercase text-[#8c3b2a]">
        {ORDER.map((cat) => (
          <a key={cat} href={`#${cat}`}>
            {t.obra.categories[cat]}
          </a>
        ))}
      </nav>

      {ORDER.map((cat) => {
        const items = works.filter((w) => w.frontmatter.categoria === cat);
        if (!items.length) return null;
        return (
          <section key={cat} id={cat} className="mt-16 scroll-mt-24">
            <h2 className="font-serif text-3xl">{t.obra.categories[cat]}</h2>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((work) => (
                <li key={work.slug}>
                  <Link
                    href={publicPath(locale, `/obra/${work.slug}`)}
                    className="group block"
                  >
                    {work.frontmatter.imagen ? (
                      <MediaFrame
                        src={work.frontmatter.imagen}
                        alt={work.frontmatter.title}
                        className="transition duration-500 group-hover:opacity-90"
                      />
                    ) : null}
                    <h3 className="mt-3 font-serif text-xl">
                      {work.frontmatter.title}
                    </h3>
                    <p className="mt-1 text-sm text-[#5c574f]">
                      {[work.frontmatter.year, work.frontmatter.medium]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </PageShell>
  );
}
