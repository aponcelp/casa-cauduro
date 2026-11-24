import posthog from "posthog-js";
import { isPostHogConfigured } from "@/lib/posthog";

/** Named CTA ids — no PII. Use these to verify buttons in PostHog Live. */
export type CtaId =
  | "home_visita"
  | "home_obra"
  | "casa_visita"
  | "tienda_buy"
  | "contact_submit"
  | "visita_whatsapp"
  | "footer_whatsapp"
  | "language_switch";

type CtaProps = {
  locale?: string;
  href?: string;
  slug?: string;
  target_locale?: string;
};

/**
 * Capture a named CTA click. Props must stay non-PII (no name, email, phone, message).
 */
export function trackCta(cta: CtaId, props: CtaProps = {}): void {
  if (!isPostHogConfigured() || typeof window === "undefined") return;
  posthog.capture("cta_click", {
    cta,
    ...props,
  });
}
