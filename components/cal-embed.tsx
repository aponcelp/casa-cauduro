"use client";

import { useEffect, useId } from "react";

/**
 * Responsive Cal.com embed. Pass a full booking URL
 * (https://cal.com/user/event) via NEXT_PUBLIC_CALCOM_EMBED_URL.
 */
export function CalEmbed({ url }: { url?: string }) {
  const id = useId().replace(/:/g, "");

  useEffect(() => {
    if (!url) return;
    const existing = document.querySelector(
      'script[data-cal-embed="true"]',
    ) as HTMLScriptElement | null;
    if (existing) return;
    const script = document.createElement("script");
    script.src = "https://app.cal.com/embed/embed.js";
    script.async = true;
    script.dataset.calEmbed = "true";
    document.body.appendChild(script);
  }, [url]);

  if (!url) return null;

  const src = url.includes("?") ? `${url}&embed=true` : `${url}?embed=true`;

  return (
    <div className="mt-10 w-full overflow-hidden border border-[#d4cfc6] bg-white">
      <iframe
        id={`cal-embed-${id}`}
        title="Reservar visita — Cal.com"
        src={src}
        className="min-h-[720px] w-full border-0"
        loading="lazy"
        allow="payment *"
      />
    </div>
  );
}
