"use client";

import { useEffect } from "react";
import { posthogHost, posthogKey } from "@/lib/posthog";

export function PostHogProvider() {
  useEffect(() => {
    const key = posthogKey();
    if (!key || typeof window === "undefined") return;
    if (window.posthog) return;

    const script = document.createElement("script");
    script.async = true;
    script.src = `${posthogHost().replace(/\/$/, "")}/static/array.js`;
    script.onload = () => {
      window.posthog?.init?.(key, {
        api_host: posthogHost(),
        person_profiles: "identified_only",
      });
      window.posthog?.capture?.("pageview", {
        language: document.documentElement.lang,
      });
    };
    document.head.appendChild(script);
  }, []);

  return null;
}

declare global {
  interface Window {
    posthog?: {
      init?: (key: string, options: Record<string, unknown>) => void;
      capture?: (event: string, properties?: Record<string, unknown>) => void;
    };
  }
}
