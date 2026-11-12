import type { Locale } from "@/lib/locale";
import { en } from "./en";
import { es } from "./es";

const dictionaries = { es, en } as const;

export type Dictionary = (typeof dictionaries)[Locale];

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
