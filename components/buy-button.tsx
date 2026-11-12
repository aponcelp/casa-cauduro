"use client";

import { useState } from "react";

export function BuyButton({
  slug,
  label,
  disabledLabel,
}: {
  slug: string;
  label: string;
  disabledLabel: string;
}) {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function checkout() {
    setPending(true);
    setError(null);
    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      const data = (await response.json()) as { url?: string; error?: string };
      if (response.status === 503) {
        setError(disabledLabel);
        return;
      }
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
        className="border border-[#8c3b2a] px-5 py-2 text-xs tracking-[0.18em] uppercase text-[#8c3b2a] hover:bg-[#8c3b2a] hover:text-[#e7e3dc] disabled:opacity-50"
      >
        {label}
      </button>
      {error ? <p className="mt-2 text-sm text-[#8c3b2a]">{error}</p> : null}
    </div>
  );
}
