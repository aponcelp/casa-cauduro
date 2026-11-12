/** Public Cal.com booking URL for the visita embed. Override in env. */
const FALLBACK_EMBED =
  "https://cal.com/casacauduro/visita-guiada?embed=true&theme=light";

export function calEmbedUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_CALCOM_EMBED_URL?.trim();
  if (fromEnv && !fromEnv.includes("REPLACE")) {
    return fromEnv;
  }
  return FALLBACK_EMBED;
}

export function calEmbedIsPlaceholder(): boolean {
  const fromEnv = process.env.NEXT_PUBLIC_CALCOM_EMBED_URL?.trim();
  return !fromEnv || fromEnv.includes("REPLACE");
}
