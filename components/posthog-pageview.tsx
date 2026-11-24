"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import posthog from "posthog-js";
import { isPostHogConfigured } from "@/lib/posthog";

function localeFromPath(pathname: string): "es" | "en" {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "es";
}

function PostHogPageViewInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!isPostHogConfigured() || !pathname) return;

    const locale = localeFromPath(pathname);
    let url = window.origin + pathname;
    const query = searchParams?.toString();
    if (query) url += `?${query}`;

    posthog.capture("$pageview", {
      locale,
      $current_url: url,
    });
  }, [pathname, searchParams]);

  return null;
}

/** Captures $pageview on ES/EN App Router navigations. No PII. */
export function PostHogPageView() {
  return (
    <Suspense fallback={null}>
      <PostHogPageViewInner />
    </Suspense>
  );
}
