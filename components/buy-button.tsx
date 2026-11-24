"use client";

import { useState } from "react";

export function BuyButton({
  slug,
  locale,
  label,
  disabledLabel,
  configured,
}: {
  slug: string;
  locale: string;
  label: string;
  disabledLabel: string;
  configured: boolean;
}) {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  if (!configured) {
    return <p className="mt-6 text-sm text-[#5c574f]">{disabledLabel}</p>;
  }

  async function checkout() {
    setPending(true);
    setError(null);
    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, locale }),
      });
      const data = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !data.url) {
        setError(data.error ?? "Checkout failed");
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Checkout failed");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="mt-6">
      <button
        type="button"
        onClick={checkout}
        disabled={pending}
        className="border border-[#8c3b2a] bg-[#8c3b2a] px-5 py-3 text-xs tracking-[0.18em] uppercase text-[#e7e3dc] hover:bg-transparent hover:text-[#8c3b2a] disabled:opacity-50"
      >
        {pending ? "…" : label}
      </button>
      {error ? <p className="mt-2 text-sm text-[#8c3b2a]">{error}</p> : null}
    </div>
  );
}
