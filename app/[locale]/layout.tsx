import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { isLocale } from "@/lib/locale";

export function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <div lang={locale} className="flex min-h-full flex-col">
      {children}
      <SiteFooter locale={locale} />
    </div>
  );
}
