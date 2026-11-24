/** Client-safe PostHog env helpers. Never hard-code a project token. */

export function posthogKey(): string | undefined {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY?.trim();
  if (!key || key.includes("REPLACE_ME")) return undefined;
  return key;
}

export function posthogHost(): string {
  return (
    process.env.NEXT_PUBLIC_POSTHOG_HOST?.trim() || "https://us.i.posthog.com"
  );
}

export function isPostHogConfigured(): boolean {
  return Boolean(posthogKey());
}
