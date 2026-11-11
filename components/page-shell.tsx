import { SiteHeader } from "@/components/site-header";
import type { Locale } from "@/lib/locale";

export function PageShell({
  locale,
  path,
  children,
}: {
  locale: Locale;
  path: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader locale={locale} path={path} />
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-16">{children}</main>
    </>
  );
}
