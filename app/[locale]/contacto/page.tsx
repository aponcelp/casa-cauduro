import { ContactForm } from "@/components/contact-form";
import { PageShell } from "@/components/page-shell";
import { getDictionary } from "@/lib/i18n";
import { parseLocale } from "@/lib/locale";

export default async function ContactoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = parseLocale((await params).locale);
  const t = getDictionary(locale);

  return (
    <PageShell locale={locale} path="/contacto">
      <h1 className="font-serif text-4xl">{t.contacto.title}</h1>
      <p className="mt-4 max-w-xl text-[#3f3b35]">{t.contacto.intro}</p>
      <ContactForm copy={t.contacto} />
    </PageShell>
  );
}
