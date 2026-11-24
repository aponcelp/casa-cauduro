"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { trackCta, type CtaId } from "@/lib/analytics";

type LinkProps = ComponentProps<typeof Link>;

/** Internal Link that fires a named `cta_click` (no PII). */
export function CtaLink({
  cta,
  locale,
  onClick,
  ...props
}: LinkProps & { cta: CtaId; locale?: string }) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        trackCta(cta, {
          locale,
          href: typeof props.href === "string" ? props.href : undefined,
        });
        onClick?.(event);
      }}
    />
  );
}

/** External / WhatsApp anchor that fires a named `cta_click` (no PII). */
export function CtaAnchor({
  cta,
  locale,
  href,
  className,
  children,
  onClick,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  cta: CtaId;
  locale?: string;
  href: string;
}) {
  return (
    <a
      {...rest}
      href={href}
      className={className}
      onClick={(event) => {
        trackCta(cta, { locale, href });
        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}
