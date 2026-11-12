import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";
import { publicPath } from "@/lib/locale";

const WHATSAPP =
  "https://wa.me/527779866155?text=Hola,%20me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n";
const INSTAGRAM = "https://www.instagram.com/estudiocauduro";
const FACEBOOK = "https://www.facebook.com/casaestudiorafaelcauduro";

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <footer className="mt-auto border-t border-[#d4cfc6] bg-[#1a1814] text-[#e7e3dc]">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 sm:px-8 md:flex-row md:items-end md:justify-between">
        <div className="space-y-4">
          <Image
            src="/media/logo_cauduro_foot.png"
            alt={t.siteName}
            width={160}
            height={64}
            className="h-12 w-auto"
          />
          <p className="max-w-sm text-sm leading-6 text-[#bdb6ab]">
            {t.siteName}
            <br />
            Cuernavaca, Morelos, México
          </p>
          <p className="text-xs text-[#8a8378]">{t.footer.rights}</p>
        </div>
        <nav className="flex flex-wrap gap-x-5 gap-y-3 text-xs tracking-[0.16em] uppercase text-[#bdb6ab]">
          <Link href={publicPath(locale, "/obra")}>{t.nav.obra}</Link>
          <Link href={publicPath(locale, "/casa")}>{t.nav.casa}</Link>
          <Link href={publicPath(locale, "/visita")}>{t.nav.visita}</Link>
          <Link href={publicPath(locale, "/tienda")}>{t.nav.tienda}</Link>
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
