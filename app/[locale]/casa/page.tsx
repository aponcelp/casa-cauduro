import Image from "next/image";
import Link from "next/link";
import { MediaFrame } from "@/components/media-frame";
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
    <PageShell locale={locale} path="/casa" bleed>
      <section className="relative min-h-[70svh] overflow-hidden bg-[#1a1814] text-[#e7e3dc]">
        <Image
          src="/media/casa_img_entrada.jpg"
          alt=""
          fill
          priority
          className="object-cover opacity-70"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#1a1814]/40" />
        <div className="relative mx-auto flex min-h-[70svh] w-full max-w-6xl flex-col justify-end px-5 pb-14 pt-28 sm:px-8">
          <h1 className="font-serif text-5xl sm:text-6xl">{t.casa.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#e7e3dc]/90">
            {t.casa.intro}
          </p>
          <Link
            href={publicPath(locale, "/visita")}
            className="mt-8 inline-flex w-fit bg-[#8c3b2a] px-5 py-3 text-xs tracking-[0.18em] uppercase"
          >
            {t.casa.cta}
          </Link>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room) => (
            <li key={room.slug}>
              <Link
                href={publicPath(locale, `/casa/${room.slug}`)}
                className="group block"
              >
                {room.frontmatter.imagen ? (
                  <MediaFrame
                    src={room.frontmatter.imagen}
                    alt={room.frontmatter.title}
                    className="transition duration-500 group-hover:opacity-90"
                  />
                ) : null}
                <h2 className="mt-3 font-serif text-2xl">
                  {room.frontmatter.title}
                </h2>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </PageShell>
  );
}
