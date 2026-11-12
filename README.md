# Casa Estudio Rafael Cauduro

House-museum site for [cauduro.com](https://cauduro.com). Next.js App Router on Vercel. Spanish at `/`, English at `/en/`. Editorial truth is Markdown/MDX in git — the cousin edits with Claude Code, not a CMS dashboard.

Photography-first: beige `#e7e3dc`, rust **RC** monogram. Casa Luis Barragán is the analog.

## Stack (locked)

| Piece | Role |
| --- | --- |
| Next.js (App Router) on Vercel | Site. `main` is production. |
| MDX in `content/` | CMS. `slug.mdx` Spanish canonical, `slug.en.mdx` English sibling. |
| PostHog | Analytics on the live site (pageviews, language, visita, tienda). |
| Cal.com | Prepaid “Visita guiada Casa Estudio”. Duration and blackouts live there. |
| Supabase `bookings` | System of record we own. Cal.com webhook copies each booking. |
| Stripe Checkout | International cards for visits and the shop. Not Mercado Pago. |
| WhatsApp `+52 777 986 6155` | Support and day-of, not checkout. |

Sentry can wait. No Shopify, Webflow, Sanity, or patron accounts.

## Local

```bash
cp .env.example .env.local   # names only; no secrets in git
npm install
npm run dev
```

Public URLs (proxy rewrites into `app/[locale]/…`):

- `/` home · `/en` English home
- `/casa` `/obra` `/visita` `/cartelera` `/tienda` `/contacto` `/biografia` `/terminos` `/privacidad`
- `/es` redirects to `/`

`npm run build` before a PR.

## Content (the cousin path)

See [AGENTS.md](./AGENTS.md). Short version:

1. Add `content/obra/mi-obra.mdx` (and `mi-obra.en.mdx`).
2. Put a web-sized JPEG/WebP in `public/media/` and set `imagen`.
3. Frontmatter: `title`, `year`, `medium`, `precio_mxn`, `disponible`, `imagen`, `categoria`.
4. Open a branch, preview on Vercel, merge to `main`.

Camera originals stay out of git.

## Integrations

Env names are in `.env.example`. Set them in Vercel (Production + Preview):

| Var | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (e.g. `https://casa-cauduro.vercel.app`) |
| `NEXT_PUBLIC_CALCOM_EMBED_URL` | Cal.com event URL, e.g. `https://cal.com/you/visita-guiada` |
| `CALCOM_WEBHOOK_SECRET` | Optional; verifies `POST /api/webhooks/calcom` |
| `STRIPE_SECRET_KEY` | Stripe secret (`sk_test_…` first) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable (`pk_test_…`) |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret for `/api/webhooks/stripe` |
| `NEXT_PUBLIC_SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` | Bookings table we own |
| `NEXT_PUBLIC_POSTHOG_KEY` | Required on the live site |

Routes:

- `/visita` embeds Cal.com when `NEXT_PUBLIC_CALCOM_EMBED_URL` is set
- `POST /api/stripe/checkout` creates a real Checkout Session (MXN, shipping vs pickup)
- `POST /api/webhooks/calcom` → `upsertBooking` → Supabase `bookings`
- `POST /api/webhooks/stripe` → same table for paid Checkout
- `POST /api/contact` → stub toward `estudio@cauduro.com`

SQL: `supabase/schema.sql`.

## Deploy

GitHub `aponcelp/casa-cauduro`. Framework: **Next.js**. Connect the repo to Vercel, set env vars above, point `cauduro.com`, add PostHog on production. Preview deploys per branch.
