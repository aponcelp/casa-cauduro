import { notFound } from "next/navigation";
import { MediaFrame } from "@/components/media-frame";
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
      <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
        {show.frontmatter.imagen ? (
          <MediaFrame
            src={show.frontmatter.imagen}
            alt={show.frontmatter.title}
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        ) : null}
        <div>
          <h1 className="font-serif text-4xl sm:text-5xl">
            {show.frontmatter.title}
          </h1>
          <p className="mt-3 text-sm text-[#5c574f]">
            {[
              show.frontmatter.venue,
              show.frontmatter.starts,
              show.frontmatter.ends,
            ]
              .filter(Boolean)
              .join(" · ")}
          </p>
          <div className="mt-8">
            <MdxBody source={show.body} />
          </div>
        </div>
      </div>
    </PageShell>
  );
}
