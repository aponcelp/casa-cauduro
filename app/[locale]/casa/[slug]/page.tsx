import { notFound } from "next/navigation";
import { MdxBody } from "@/components/mdx-body";
import { PageShell } from "@/components/page-shell";
import { listSlugs, readDoc } from "@/lib/content";
import { locales, parseLocale } from "@/lib/locale";

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

  return (
    <PageShell locale={locale} path={`/casa/${slug}`}>
      <h1 className="font-serif text-4xl">{room.frontmatter.title}</h1>
      <div className="mt-10">
        <MdxBody source={room.body} />
      </div>
    </PageShell>
  );
}
