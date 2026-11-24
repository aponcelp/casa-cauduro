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
    listSlugs("casa").map((slug) => ({ locale, slug })),
  );
}

export default async function CasaPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const locale = parseLocale(raw);
  const room = readDoc("casa", slug, locale);
  if (!room) notFound();
  const t = getDictionary(locale);

  return (
    <PageShell locale={locale} path={`/casa/${slug}`}>
      <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
        {room.frontmatter.imagen ? (
          <MediaFrame
            src={room.frontmatter.imagen}
            alt={room.frontmatter.title}
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        ) : null}
        <div>
          <h1 className="font-serif text-4xl sm:text-5xl">
            {room.frontmatter.title}
          </h1>
          <div className="mt-8">
            <MdxBody source={room.body} />
          </div>
          <Link
            href={publicPath(locale, "/visita")}
            className="mt-10 inline-block bg-[#8c3b2a] px-5 py-3 text-xs tracking-[0.18em] uppercase text-[#e7e3dc]"
          >
            {t.casa.cta}
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
