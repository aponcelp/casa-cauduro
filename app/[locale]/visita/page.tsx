import { CalEmbed } from "@/components/cal-embed";
import { MdxBody } from "@/components/mdx-body";
import { PageShell } from "@/components/page-shell";
import { calEmbedUrl } from "@/lib/calcom";
import { readDoc } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";
import { parseLocale } from "@/lib/locale";

export default async function VisitaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = parseLocale((await params).locale);
  const t = getDictionary(locale);
  const page = readDoc("pages", "visita", locale);
  const embed = calEmbedUrl();

  return (
    <PageShell locale={locale} path="/visita">
      <h1 className="font-serif text-4xl">{t.visita.title}</h1>
      <p className="mt-4 max-w-2xl text-[#3f3b35]">{t.visita.intro}</p>
      {page ? (
        <div className="mt-10">
          <MdxBody source={page.body} />
        </div>
      ) : null}
      {embed ? (
        <CalEmbed url={embed} />
      ) : (
        <p className="mt-10 max-w-xl text-sm text-[#5c574f]">
          {t.visita.embedMissing}
        </p>
      )}
      <p className="mt-8">
        <a
          href="https://wa.me/527779866155"
          className="text-sm underline underline-offset-4"
        >
          {t.visita.whatsapp}
        </a>
      </p>
    </PageShell>
  );
}
