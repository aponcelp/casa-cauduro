import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Locale } from "@/lib/locale";

const ROOT = path.join(process.cwd(), "content");

export type ContentKind = "obra" | "casa" | "cartelera" | "tienda" | "pages";

export type ContentFrontmatter = {
  title: string;
  year?: number | string;
  medium?: string;
  precio_mxn?: number;
  disponible?: boolean;
  imagen?: string;
  categoria?: string;
  starts?: string;
  ends?: string;
  venue?: string;
};

export type ContentDoc = {
  slug: string;
  locale: Locale;
  fallback: boolean;
  frontmatter: ContentFrontmatter;
  body: string;
};

function fileFor(kind: ContentKind, slug: string, locale: Locale): string {
  const name = locale === "en" ? `${slug}.en.mdx` : `${slug}.mdx`;
  return path.join(ROOT, kind, name);
}

export function listSlugs(kind: ContentKind): string[] {
  const dir = path.join(ROOT, kind);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx") && !file.endsWith(".en.mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function readDoc(
  kind: ContentKind,
  slug: string,
  locale: Locale,
): ContentDoc | null {
  const preferred = fileFor(kind, slug, locale);
  const canonical = fileFor(kind, slug, "es");
  const file = fs.existsSync(preferred)
    ? preferred
    : fs.existsSync(canonical)
      ? canonical
      : null;
  if (!file) return null;

  const raw = fs.readFileSync(file, "utf8");
  const parsed = matter(raw);
  const data = parsed.data as ContentFrontmatter;

  return {
    slug,
    locale,
    fallback: file !== preferred,
    frontmatter: {
      title: data.title ?? slug,
      year: data.year,
      medium: data.medium,
      precio_mxn: data.precio_mxn,
      disponible: data.disponible,
      imagen: data.imagen,
      categoria: data.categoria,
      starts: data.starts,
      ends: data.ends,
      venue: data.venue,
    },
    body: parsed.content.trim(),
  };
}

export function listDocs(kind: ContentKind, locale: Locale): ContentDoc[] {
  return listSlugs(kind)
    .map((slug) => readDoc(kind, slug, locale))
    .filter((doc): doc is ContentDoc => doc !== null);
}
