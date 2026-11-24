export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function parseLocale(value: string | undefined): Locale {
  return value && isLocale(value) ? value : defaultLocale;
}

/** Public URL for a path. Spanish has no prefix; English is `/en/…`. */
export function publicPath(locale: Locale, path = "/"): string {
  const clean = path === "/" ? "/" : path.startsWith("/") ? path : `/${path}`;
  if (locale === "en") {
    return clean === "/" ? "/en" : `/en${clean}`;
  }
  return clean;
}

export function switchLocalePath(locale: Locale, path: string): string {
  return publicPath(locale === "es" ? "en" : "es", path);
}
