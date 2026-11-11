import Link from "next/link";
import { RcMonogram } from "@/components/rc-monogram";
import { LanguageSwitcher } from "@/components/language-switcher";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";
import { publicPath } from "@/lib/locale";

const NAV = [
  ["casa", "/casa"],
  ["obra", "/obra"],
  ["visita", "/visita"],
  ["cartelera", "/cartelera"],
  ["tienda", "/tienda"],
  ["contacto", "/contacto"],
] as const;

export function SiteHeader({
  locale,
  path,
}: {
  locale: Locale;
  path: string;
}) {
  const t = getDictionary(locale);

  return (
    <header className="border-b border-[#d4cfc6]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-5">
        <Link
          href={publicPath(locale, "/")}
          className="flex items-center gap-3 text-sm tracking-[0.18em] uppercase"
        >
          <RcMonogram />
          <span className="hidden sm:inline">{t.shortName}</span>
        </Link>
        <nav className="flex flex-1 flex-wrap items-center justify-end gap-x-4 gap-y-2 text-[0.7rem] tracking-[0.18em] uppercase">
          {NAV.map(([key, href]) => (
            <Link
              key={key}
              href={publicPath(locale, href)}
              className="text-[#3f3b35] hover:text-[#8c3b2a]"
            >
              {t.nav[key]}
            </Link>
          ))}
        </nav>
        <LanguageSwitcher locale={locale} path={path} />
      </div>
    </header>
  );
}
