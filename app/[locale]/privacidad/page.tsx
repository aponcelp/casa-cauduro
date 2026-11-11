import { notFound } from "next/navigation";
import { MdxBody } from "@/components/mdx-body";
import { PageShell } from "@/components/page-shell";
import { readDoc } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";
import { parseLocale } from "@/lib/locale";

export default async function PrivacidadPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = parseLocale((await params).locale);
  const t = getDictionary(locale);
  const page = readDoc("pages", "privacidad", locale);
  if (!page) notFound();

  return (
    <PageShell locale={locale} path="/privacidad">
      <h1 className="font-serif text-4xl">
        {page.frontmatter.title || t.legal.privacy}
      </h1>
      <div className="mt-10">
        <MdxBody source={page.body} />
      </div>
    </PageShell>
  );
}
