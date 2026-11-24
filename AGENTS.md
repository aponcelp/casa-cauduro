<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Casa Cauduro — agent notes (cousin / Claude Code)

This repo **is** the CMS. Do not add Sanity, Webflow, Shopify, or a staff login.

## Languages

- Spanish is canonical: `content/**/slug.mdx`
- English sibling: `content/**/slug.en.mdx`
- Public URLs: Spanish `/obra/slug`, English `/en/obra/slug`
- UI chrome (nav, buttons) lives in `lib/i18n/es.ts` and `lib/i18n/en.ts`
- Do not machine-translate legal pages into production without a human pass

## Add an obra

1. `content/obra/<slug>.mdx` with frontmatter `title`, `year`, `medium`, `categoria`, `imagen`, `disponible`
2. `categoria` one of: `murales` | `gran-formato` | `vidrio` | `dibujo` | `giclees` | `escultorico`
3. Unique works: no Buy button (inquiry only). Giclées/books belong in `content/tienda/`
4. English: same slug + `.en.mdx`

## Add a show (cartelera)

`content/cartelera/<slug>.mdx` with `title`, `venue`, `starts`, `ends`. First real entry: MAQRO *Desafiando la realidad*, 18 sep 2026 – 17 ene 2027.

## Add a product

`content/tienda/<slug>.mdx` with `precio_mxn` and `disponible`. Comprar → Stripe Checkout (`app/api/stripe/checkout`). Pickup vs ship is a Checkout field later.

## Add a casa room

`content/casa/<slug>.mdx`. Photography-first; keep chrome quiet.

## Images

Web-sized JPEG/WebP in `public/media/`. Point `imagen` at `/media/filename.jpg`. No camera originals, no Git LFS dump.

## Visits

Copy in `content/pages/visita.mdx`. Slots: Cal.com embed via `NEXT_PUBLIC_CALCOM_EMBED_URL`. Each booking must land in Supabase (`supabase/schema.sql`, webhook `app/api/webhooks/calcom`). WhatsApp is support only.

## Do not

- Revive a bundled 22 MB HTML page as runtime
- Charge with Mercado Pago
- Store bookings only in Cal.com
- Invent secrets; use `.env.example` names
