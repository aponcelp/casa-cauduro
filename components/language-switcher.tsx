import Link from "next/link";
import type { Locale } from "@/lib/locale";
import { publicPath } from "@/lib/locale";
import { getDictionary } from "@/lib/i18n";

export function LanguageSwitcher({
  locale,
  path,
}: {
  locale: Locale;
  path: string;
}) {
  const t = getDictionary(locale);

  return (
    <p className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase">
      <Link
        href={publicPath("es", path)}
        className={
          locale === "es"
            ? "text-[#8c3b2a]"
            : "text-[#5c574f] hover:text-[#1a1814]"
        }
        hrefLang="es"
      >
        {t.language.es}
      </Link>
      <span aria-hidden>/</span>
      <Link
        href={publicPath("en", path)}
        className={
          locale === "en"
            ? "text-[#8c3b2a]"
            : "text-[#5c574f] hover:text-[#1a1814]"
        }
        hrefLang="en"
      >
        {t.language.en}
      </Link>
    </p>
  );
}
