import Image from "next/image";
import Link from "next/link";
import { MediaFrame } from "@/components/media-frame";
import { PageShell } from "@/components/page-shell";
import { listDocs } from "@/lib/content";
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
  const shows = listDocs("cartelera", locale).slice(0, 1);
  const featured = listDocs("obra", locale)
    .filter((d) =>
      ["murales", "gran-formato", "escultorico"].includes(
        d.frontmatter.categoria ?? "",
      ),
    )
    .slice(0, 3);
  const rooms = listDocs("casa", locale).slice(0, 4);

  return (
    <PageShell locale={locale} path="/" bleed>
      <section className="relative min-h-[100svh] overflow-hidden bg-[#1a1814] text-[#e7e3dc]">
        <Image
          src="/media/casa_img_hero_rafael_sentado.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="anim-hero-zoom object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1814] via-[#1a1814]/55 to-transparent" />
        <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 sm:px-8 sm:pb-20">
          <p className="anim-fade-up text-xs tracking-[0.28em] uppercase text-[#c4b5a5]">
            {t.home.kicker}
          </p>
          <h1 className="anim-fade-up-delay mt-4 font-serif text-5xl leading-[1.05] sm:text-7xl">
            {t.home.title}
          </h1>
          <p className="anim-fade-up-delay-2 mt-5 max-w-xl font-serif text-2xl italic text-[#e7e3dc]/sm:text-3xl">
            {t.home.hook}
          </p>
          <div className="anim-fade-up-delay-2 mt-10 flex flex-wrap gap-3">
            <Link
              href={publicPath(locale, "/visita")}
              className="bg-[#8c3b2a] px-5 py-3 text-xs tracking-[0.18em] uppercase text-[#e7e3dc]"
            >
              {t.home.ctaVisita}
            </Link>
            <Link
              href={publicPath(locale, "/obra")}
              className="border border-[#e7e3dc]/70 px-5 py-3 text-xs tracking-[0.18em] uppercase"
            >
              {t.home.ctaObra}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <p className="max-w-3xl text-lg leading-8 text-[#3f3b35] sm:text-xl">
          {t.home.lead}
        </p>
        <p className="mt-8 font-serif text-2xl italic text-[#8c3b2a]">
          {t.home.quote}
        </p>
      </section>

      <section className="border-t border-[#d4cfc6] bg-[#dfd9d0]">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <div className="flex items-end justify-between gap-6">
            <h2 className="font-serif text-3xl sm:text-4xl">
              {t.home.sectionObra}
            </h2>
            <Link
              href={publicPath(locale, "/obra")}
              className="text-xs tracking-[0.18em] uppercase text-[#8c3b2a]"
            >
              {t.home.ctaObra}
            </Link>
          </div>
          <ul className="mt-10 grid gap-6 sm:grid-cols-3">
            {featured.map((work) => (
              <li key={work.slug}>
                <Link
                  href={publicPath(locale, `/obra/${work.slug}`)}
                  className="group block"
                >
                  {work.frontmatter.imagen ? (
                    <MediaFrame
                      src={work.frontmatter.imagen}
                      alt={work.frontmatter.title}
                      className="transition duration-700 group-hover:opacity-90"
                    />
                  ) : null}
                  <p className="mt-3 text-[0.65rem] tracking-[0.2em] uppercase text-[#8c3b2a]">
                    {work.frontmatter.categoria
                      ? t.obra.categories[
                          work.frontmatter
                            .categoria as keyof typeof t.obra.categories
                        ]
                      : null}
                  </p>
                  <h3 className="mt-1 font-serif text-xl">
                    {work.frontmatter.title}
                  </h3>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <div className="grid items-end gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl">
              {t.home.sectionCasa}
            </h2>
            <p className="mt-5 max-w-xl text-[#3f3b35] leading-7">
              {t.casa.intro}
            </p>
            <Link
              href={publicPath(locale, "/visita")}
              className="mt-8 inline-block border border-[#8c3b2a] bg-[#8c3b2a] px-5 py-3 text-xs tracking-[0.18em] uppercase text-[#e7e3dc]"
            >
              {t.casa.cta}
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {rooms.map((room) =>
              room.frontmatter.imagen ? (
                <Link
                  key={room.slug}
                  href={publicPath(locale, `/casa/${room.slug}`)}
                >
                  <MediaFrame
                    src={room.frontmatter.imagen}
                    alt={room.frontmatter.title}
                    ratio="square"
                    sizes="25vw"
                  />
                </Link>
              ) : null,
            )}
          </div>
        </div>
      </section>

      {shows[0] ? (
        <section className="border-t border-[#d4cfc6] bg-[#1a1814] text-[#e7e3dc]">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:items-center">
            {shows[0].frontmatter.imagen ? (
              <MediaFrame
                src={shows[0].frontmatter.imagen}
                alt={shows[0].frontmatter.title}
                ratio="photo"
                sizes="50vw"
              />
            ) : null}
            <div>
              <p className="text-xs tracking-[0.22em] uppercase text-[#c4b5a5]">
                {t.cartelera.current}
              </p>
              <h2 className="mt-3 font-serif text-4xl">
                {shows[0].frontmatter.title}
              </h2>
              <p className="mt-4 text-[#bdb6ab]">
                {shows[0].frontmatter.venue}
              </p>
              <p className="mt-2 text-sm text-[#8a8378]">
                {[shows[0].frontmatter.starts, shows[0].frontmatter.ends]
                  .filter(Boolean)
                  .join(" — ")}
              </p>
              <Link
                href={publicPath(locale, `/cartelera/${shows[0].slug}`)}
                className="mt-8 inline-block text-xs tracking-[0.18em] uppercase text-[#e7e3dc] underline underline-offset-4"
              >
                {t.common.more}
              </Link>
            </div>
          </div>
        </section>
      ) : null}
    </PageShell>
  );
}
