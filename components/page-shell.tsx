import { SiteHeader } from "@/components/site-header";
import type { Locale } from "@/lib/locale";

export function PageShell({
  locale,
  path,
  children,
  bleed = false,
}: {
  locale: Locale;
  path: string;
  children: React.ReactNode;
  bleed?: boolean;
}) {
  if (bleed) {
    return (
      <>
        <SiteHeader locale={locale} path={path} transparent />
        <main className="flex-1">{children}</main>
      </>
    );
  }

  return (
    <>
      <SiteHeader locale={locale} path={path} />
      <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-14 sm:px-8 sm:py-16">
        {children}
      </main>
    </>
  );
}
