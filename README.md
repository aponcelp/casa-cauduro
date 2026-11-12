# Casa Estudio Rafael Cauduro

House-museum site for [cauduro.com](https://cauduro.com). Next.js App Router on Vercel. Spanish at `/`, English at `/en/`. Editorial truth is Markdown/MDX in git — the cousin edits with Claude Code, not a CMS dashboard.

Photography-first recreation of the saved site ([original preview](https://casa-cauduro-original-preview.vercel.app)): beige `#e7e3dc`, rust accents, full-bleed heroes, responsive (no fixed mock frame). Casa Luis Barragán is the analog.

## Stack (locked)

| Piece | Role |
| --- | --- |
| Next.js (App Router) on Vercel | Site. `main` is production. |
| MDX in `content/` | CMS. `slug.mdx` Spanish canonical, `slug.en.mdx` English sibling. |
| PostHog | Analytics on the live site (pageviews, language, visita, tienda). |
| Cal.com | Prepaid “Visita guiada Casa Estudio” embed on `/visita`. |
| Supabase `bookings` | System of record we own. Cal.com webhook copies each booking. |
| Stripe Checkout | International cards for the shop (`POST /api/stripe/checkout`). Not Mercado Pago. |
| WhatsApp `+52 777 986 6155` | Support and day-of, not checkout. |

Sentry can wait. No Shopify, Webflow, Sanity, or patron accounts.

## Local

```bash
cp .env.example .env.local
# Paste Stripe test keys (sk_test_ / pk_test_) and your Cal.com event URL
npm install
npm run dev
```

Public URLs (proxy rewrites into `app/[locale]/…`):

- `/` home · `/en` English home
- `/casa` `/obra` `/visita` `/cartelera` `/tienda` `/contacto` `/biografia` `/terminos` `/privacidad`
- `/es` redirects to `/`

`npm run build` before a PR.

## Visita (Cal.com)

`NEXT_PUBLIC_CALCOM_EMBED_URL` is the public booking link (with `?embed=true` preferred). Until set, `/visita` loads a placeholder Cal.com URL so the iframe is present — replace it with the real prepaid event. WhatsApp stays support-only.

## Tienda (Stripe Checkout)

Products in `content/tienda/` with `precio_mxn` and `disponible`. **Comprar** calls `POST /api/stripe/checkout`, which creates a Stripe Checkout Session in test or live mode from `STRIPE_SECRET_KEY`. Without a real `sk_test_…` / `sk_live_…` key, the button shows the missing-config message.

## Content (the cousin path)

Elena works on the `elena` branch.

See [AGENTS.md](./AGENTS.md). Short version:

1. Add `content/obra/mi-obra.mdx` (and `mi-obra.en.mdx`).
2. Put a web-sized JPEG/WebP in `public/media/` and set `imagen`.
3. Frontmatter: `title`, `year`, `medium`, `precio_mxn`, `disponible`, `imagen`, `categoria`.
4. Open a branch, preview on Vercel, merge to `main`.

Camera originals stay out of git. Bundle source: `Casa Cauduro - Sitio web.html` / [original preview](https://casa-cauduro-original-preview.vercel.app).

## Other integrations

Env names are in `.env.example`. Routes:

- `POST /api/webhooks/calcom` → `upsertBooking` → Supabase `bookings`
- `POST /api/webhooks/stripe` → same table for paid Checkout
- `POST /api/contact` → stub toward `estudio@cauduro.com`

SQL: `supabase/schema.sql`.

## Deploy

GitHub `aponcelp/casa-cauduro`. Connect the repo to Vercel, set `cauduro.com`, add PostHog on production. Preview deploys per branch.
