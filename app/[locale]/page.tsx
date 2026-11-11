import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { getDictionary } from "@/lib/i18n";
import { parseLocale, publicPath } from "@/lib/locale";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = parseLocale(raw);
  const t = getDictionary(locale);

  return (
    <PageShell locale={locale} path="/">
      <p className="text-xs tracking-[0.28em] uppercase text-[#8c3b2a]">
        {t.home.kicker}
      </p>
      <h1 className="mt-4 max-w-xl font-serif text-5xl leading-tight sm:text-6xl">
        {t.home.title}
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-8 text-[#3f3b35]">
        {t.home.lead}
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          href={publicPath(locale, "/visita")}
          className="border border-[#8c3b2a] bg-[#8c3b2a] px-5 py-2 text-xs tracking-[0.18em] uppercase text-[#e7e3dc]"
        >
          {t.home.ctaVisita}
        </Link>
        <Link
          href={publicPath(locale, "/obra")}
          className="border border-[#8c3b2a] px-5 py-2 text-xs tracking-[0.18em] uppercase text-[#8c3b2a]"
        >
          {t.home.ctaObra}
        </Link>
      </div>
    </PageShell>
  );
}
