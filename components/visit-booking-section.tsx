import { CalEmbed } from "@/components/cal-embed";
import { VisitPayButton } from "@/components/visit-pay-button";
import { calEmbedIsPlaceholder, calEmbedUrl } from "@/lib/calcom";
import { readDoc } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";
import { stripeConfigured } from "@/lib/stripe";
import {
  VISIT_PRODUCT_SLUG,
  visitIsUnlocked,
} from "@/lib/visit-unlock";

export function VisitBookingFallback({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <div className="mt-12 max-w-xl border-t border-[#d4cfc6] pt-10">
      <p className="text-xs tracking-[0.18em] uppercase text-[#5c574f]">
        {t.visita.priceLabel}
      </p>
      <p className="mt-4 text-sm text-[#5c574f]">{t.visita.payLocked}</p>
      <div className="mt-10 border border-dashed border-[#d4cfc6] bg-[#f3efe8]/60 px-5 py-16 text-center">
        <p className="text-sm tracking-[0.14em] uppercase text-[#5c574f]">
          {t.visita.book}
        </p>
      </div>
    </div>
  );
}

export async function VisitBookingSection({
  locale,
  searchParams,
}: {
  locale: Locale;
  searchParams: Promise<{ checkout?: string; session_id?: string }>;
}) {
  const query = await searchParams;
  const t = getDictionary(locale);
  const product = readDoc("visita", VISIT_PRODUCT_SLUG, locale);
  const embed = calEmbedUrl();
  const placeholder = calEmbedIsPlaceholder();
  const unlocked = await visitIsUnlocked();
  const price = product?.frontmatter.precio_mxn;
  const checkout = query.checkout;

  return (
    <>
      <div className="mt-12 max-w-xl border-t border-[#d4cfc6] pt-10">
        <p className="text-xs tracking-[0.18em] uppercase text-[#5c574f]">
          {t.visita.priceLabel}
        </p>
        {price ? (
          <p className="mt-2 font-serif text-3xl">
            MXN {price.toLocaleString("es-MX")}
          </p>
        ) : null}
        {product?.frontmatter.medium ? (
          <p className="mt-2 text-sm text-[#5c574f]">
            {product.frontmatter.medium}
          </p>
        ) : null}

        {checkout === "cancel" ? (
          <p className="mt-4 text-sm text-[#5c574f]">{t.visita.cancelled}</p>
        ) : null}
        {checkout === "unpaid" || checkout === "missing_session" ? (
          <p className="mt-4 text-sm text-[#8c3b2a]">{t.visita.unpaid}</p>
        ) : null}

        {unlocked ? (
          <p className="mt-6 text-sm text-[#3d5a3d]">{t.visita.unlocked}</p>
        ) : (
          <>
            <p className="mt-4 text-sm leading-6 text-[#5c574f]">
              {t.visita.payLocked}
            </p>
            <VisitPayButton
              locale={locale}
              label={t.visita.payCta}
              disabledLabel={t.visita.stripeMissing}
              configured={stripeConfigured()}
            />
          </>
        )}
      </div>

      {unlocked ? (
        placeholder ? (
          <p className="mt-10 max-w-2xl text-base leading-7 text-[#5c574f]">
            {t.visita.embedMissing}
          </p>
        ) : (
          <CalEmbed url={embed} />
        )
      ) : (
        <div className="mt-10 border border-dashed border-[#d4cfc6] bg-[#f3efe8]/60 px-5 py-16 text-center">
          <p className="text-sm tracking-[0.14em] uppercase text-[#5c574f]">
            {t.visita.book}
          </p>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#5c574f]">
            {t.visita.payLocked}
          </p>
        </div>
      )}
    </>
  );
}
