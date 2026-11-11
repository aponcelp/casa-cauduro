import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { listDocs } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";
import { parseLocale, publicPath } from "@/lib/locale";

export default async function CasaIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = parseLocale((await params).locale);
  const t = getDictionary(locale);
  const rooms = listDocs("casa", locale);

  return (
    <PageShell locale={locale} path="/casa">
      <h1 className="font-serif text-4xl">{t.casa.title}</h1>
      <p className="mt-4 max-w-2xl text-[#3f3b35]">{t.casa.intro}</p>
      <ul className="mt-12 space-y-6">
        {rooms.map((room) => (
          <li key={room.slug}>
            <Link
              href={publicPath(locale, `/casa/${room.slug}`)}
              className="font-serif text-2xl hover:text-[#8c3b2a]"
            >
              {room.frontmatter.title}
            </Link>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
