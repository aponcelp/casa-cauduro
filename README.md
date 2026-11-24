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
| Stripe Checkout | International cards for the shop and prepaid visits (`POST /api/stripe/checkout`). Not Mercado Pago. |
| WhatsApp `+52 777 986 6155` | Support and day-of, not checkout. |

Sentry can wait. No Shopify, Webflow, Sanity, or patron accounts.

## Local

```bash
cp .env.example .env.local
# Paste Stripe test keys (sk_test_ / pk_test_), Cal.com event URL,
# and PostHog NEXT_PUBLIC_POSTHOG_KEY when the project token is ready
npm install
npm run dev
```

Public URLs (proxy rewrites into `app/[locale]/…`):

- `/` home · `/en` English home
- `/casa` `/obra` `/visita` `/cartelera` `/tienda` `/contacto` `/biografia` `/terminos` `/privacidad`
- `/es` redirects to `/`

`npm run build` before a PR.

## Visita (prepaid Stripe → Cal.com)

1. Price lives in `content/visita/visita-guiada.mdx` (`precio_mxn`).
2. **/visita** shows the price and **Pagar y agendar** (Stripe Checkout, `kind: "visita"`).
3. Success hits `/api/stripe/visit-success`, verifies the paid session, sets an httpOnly unlock cookie, then redirects to `/visita`.
4. Only then is the Cal.com embed shown. Without payment the calendar stays locked.
5. `NEXT_PUBLIC_CALCOM_EMBED_URL` is the public booking link (`?embed=true` preferred). When missing, unlocked visitors see a friendly WhatsApp fallback — no env var names in visitor copy. WhatsApp stays support-only.

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
| `NEXT_PUBLIC_POSTHOG_KEY` | PostHog project API key (`phc_…`). Required on Production |
| `NEXT_PUBLIC_POSTHOG_HOST` | Ingestion host (US default `https://us.i.posthog.com`; EU `https://eu.i.posthog.com`) |

### PostHog (Vercel)

1. Create or pick a PostHog project for Casa Cauduro (org plan may limit you to one project).
2. Copy **Project API Key** (`phc_…`) and region host from Project settings.
3. In Vercel → `casa-cauduro` → Settings → Environment Variables, set for **Production** and **Preview**:
   - `NEXT_PUBLIC_POSTHOG_KEY` = `phc_…`
   - `NEXT_PUBLIC_POSTHOG_HOST` = `https://us.i.posthog.com` (or EU host)
4. Redeploy Production after saving env vars.
5. Verify in PostHog **Activity / Live**: `$pageview` with `locale` `es` or `en`, plus `cta_click` when you tap CTAs (`home_visita`, `tienda_buy`, `contact_submit`, WhatsApp, language switch). Autocapture is on for other clicks.

Until the key is set, the SDK no-ops (no invented tokens in git or Vercel).

Routes:

- `/visita` shows price → Stripe pay → unlock cookie → Cal.com embed
- `POST /api/stripe/checkout` creates Checkout (tienda with shipping, or `kind: "visita"`)
- `GET /api/stripe/visit-success` verifies payment and sets the unlock cookie
- `POST /api/webhooks/calcom` → `upsertBooking` → Supabase `bookings`
- `POST /api/webhooks/stripe` → same table (`visita_prepaid:…` for visit SKUs)
- `POST /api/contact` → stub toward `estudio@cauduro.com`

SQL: `supabase/schema.sql`.

## Deploy

GitHub `aponcelp/casa-cauduro`. Framework: **Next.js**. Connect the repo to Vercel, set env vars above, point `cauduro.com`, paste PostHog key on Production when ready. Preview deploys per branch. `main` is production.
