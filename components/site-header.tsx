import Image from "next/image";
import Link from "next/link";
import { LanguageSwitcher } from "@/components/language-switcher";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";
import { publicPath } from "@/lib/locale";

const NAV = [
  ["obra", "/obra"],
  ["casa", "/casa"],
  ["visita", "/visita"],
  ["cartelera", "/cartelera"],
  ["tienda", "/tienda"],
  ["contacto", "/contacto"],
] as const;

export function SiteHeader({
  locale,
  path,
  transparent = false,
}: {
  locale: Locale;
  path: string;
  transparent?: boolean;
}) {
  const t = getDictionary(locale);

  return (
    <header
      className={
        transparent
          ? "absolute inset-x-0 top-0 z-20 text-[#e7e3dc]"
          : "border-b border-[#d4cfc6] bg-[#e7e3dc]/text-[#1a1814]"
      }
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <Link
          href={publicPath(locale, "/")}
          className="flex items-center gap-3"
        >
          <Image
            src="/media/logo_cauduro_t.png"
            alt={t.siteName}
            width={120}
            height={48}
            className={`h-10 w-auto ${transparent ? "brightness-0 invert" : ""}`}
            priority
          />
          <span className="hidden text-[0.65rem] tracking-[0.28em] uppercase sm:block">
            {t.tagline}
          </span>
        </Link>
        <nav className="flex flex-1 flex-wrap items-center justify-end gap-x-3 gap-y-2 text-[0.65rem] tracking-[0.2em] uppercase sm:gap-x-5">
          {NAV.map(([key, href]) => (
            <Link
              key={key}
              href={publicPath(locale, href)}
              className={
                transparent
                  ? "opacity-90 hover:opacity-100"
                  : "text-[#3f3b35] hover:text-[#8c3b2a]"
              }
            >
              {t.nav[key]}
            </Link>
          ))}
          <LanguageSwitcher locale={locale} path={path} />
        </nav>
      </div>
    </header>
  );
}
