"use client";

import { useState } from "react";
import { trackCta } from "@/lib/analytics";
import type { Dictionary } from "@/lib/i18n";

export function ContactForm({
  copy,
  locale,
}: {
  copy: Dictionary["contacto"];
  locale: string;
}) {
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Named CTA only — never send name/email/message to PostHog.
    trackCta("contact_submit", { locale });
    const form = event.currentTarget;
    const body = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setStatus(response.ok ? "sent" : "error");
      if (response.ok) form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-10 max-w-md space-y-4">
      <label className="block text-sm">
        {copy.name}
        <input
          required
          name="name"
          autoComplete="name"
          className="mt-1 w-full border border-[#d4cfc6] bg-transparent px-3 py-2"
        />
      </label>
      <label className="block text-sm">
        {copy.email}
        <input
          required
          type="email"
          name="email"
          autoComplete="email"
          className="mt-1 w-full border border-[#d4cfc6] bg-transparent px-3 py-2"
        />
      </label>
      <label className="block text-sm">
        {copy.message}
        <textarea
          required
          name="message"
          rows={5}
          className="mt-1 w-full border border-[#d4cfc6] bg-transparent px-3 py-2"
        />
      </label>
      <button
        type="submit"
        data-ph-cta="contact_submit"
        className="border border-[#8c3b2a] px-5 py-2 text-xs tracking-[0.18em] uppercase text-[#8c3b2a] hover:bg-[#8c3b2a] hover:text-[#e7e3dc]"
      >
        {copy.send}
      </button>
      {status === "sent" ? (
        <p className="text-sm">{copy.sent}</p>
      ) : status === "error" ? (
        <p className="text-sm text-[#8c3b2a]">{copy.error}</p>
      ) : null}
    </form>
  );
}
