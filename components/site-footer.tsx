import Link from "next/link";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";
import { publicPath } from "@/lib/locale";

const WHATSAPP = "https://wa.me/527779866155";
const INSTAGRAM = "https://instagram.com/estudiocauduro";
const FACEBOOK = "https://facebook.com/casaestudiorafaelcauduro";

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <footer className="mt-auto border-t border-[#d4cfc6]">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-xs tracking-wide text-[#5c574f] sm:flex-row sm:items-center sm:justify-between">
        <p>{t.siteName}</p>
        <nav className="flex flex-wrap gap-4">
          <Link href={publicPath(locale, "/biografia")}>{t.nav.biografia}</Link>
          <Link href={publicPath(locale, "/terminos")}>{t.footer.terms}</Link>
          <Link href={publicPath(locale, "/privacidad")}>
            {t.footer.privacy}
          </Link>
          <a href={WHATSAPP} rel="noreferrer" target="_blank">
            {t.footer.support}
          </a>
          <a href={INSTAGRAM} rel="noreferrer" target="_blank">
            {t.footer.instagram}
          </a>
          <a href={FACEBOOK} rel="noreferrer" target="_blank">
            {t.footer.facebook}
          </a>
        </nav>
      </div>
    </footer>
  );
}
