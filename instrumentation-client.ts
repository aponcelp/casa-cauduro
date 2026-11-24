import posthog from "posthog-js";
import { posthogHost, posthogKey } from "@/lib/posthog";

/**
 * Official Next.js App Router client init (posthog-js).
 * @see https://posthog.com/docs/libraries/next-js
 *
 * No-ops until NEXT_PUBLIC_POSTHOG_KEY is set (Vercel / .env.local).
 * Do not hard-code a project token here.
 */
const key = posthogKey();
if (key) {
  posthog.init(key, {
    api_host: posthogHost(),
    defaults: "2026-08-30",
    // Manual $pageview in PostHogPageView so we can attach locale (es|en).
    capture_pageview: false,
    capture_pageleave: true,
    autocapture: true,
    person_profiles: "identified_only",
  });
}
