import Image from "next/image";
import { CalEmbed } from "@/components/cal-embed";
import { CtaAnchor } from "@/components/cta-link";
import { MdxBody } from "@/components/mdx-body";
import { PageShell } from "@/components/page-shell";
import { calEmbedIsPlaceholder, calEmbedUrl } from "@/lib/calcom";
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
  const placeholder = calEmbedIsPlaceholder();

  return (
    <PageShell locale={locale} path="/visita" bleed>
      <section className="relative min-h-[55svh] overflow-hidden bg-[#1a1814] text-[#e7e3dc]">
        <Image
          src="/media/casa_img_hero_estudio.webp"
          alt=""
          fill
          priority
          className="object-cover opacity-65"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1814] via-[#1a1814]/50 to-transparent" />
        <div className="relative mx-auto flex min-h-[55svh] w-full max-w-6xl flex-col justify-end px-5 pb-12 pt-28 sm:px-8">
          <h1 className="font-serif text-4xl sm:text-6xl">{t.visita.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#e7e3dc]/90">
            {t.visita.intro}
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8">
        {page ? (
          <div className="max-w-3xl">
            <MdxBody source={page.body} />
          </div>
        ) : null}
        {placeholder ? (
          <p className="mt-10 max-w-2xl text-base leading-7 text-[#5c574f]">
            {t.visita.embedMissing}
          </p>
        ) : (
          <CalEmbed url={embed} />
        )}
        <p className="mt-8">
          <CtaAnchor
            cta="visita_whatsapp"
            locale={locale}
            href="https://wa.me/527779866155?text=Hola,%20quiero%20informaci%C3%B3n%20sobre%20las%20visitas%20guiadas%20a%20la%20Casa%20Estudio"
            className="text-sm underline underline-offset-4"
            rel="noreferrer"
            target="_blank"
          >
            {t.visita.whatsapp}
          </CtaAnchor>
        </p>
      </section>
    </PageShell>
  );
}
