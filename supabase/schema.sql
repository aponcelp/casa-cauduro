-- System of record for visits. Cal.com (and later OTAs) copy rows here.
-- Apply in the Supabase SQL editor. No auth on the public site.

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  source text not null,
  external_id text not null,
  slot_start timestamptz,
  party_size integer,
  payer_email text,
  amount numeric,
  currency text,
  status text not null,
  raw jsonb,
  created_at timestamptz not null default now(),
  unique (source, external_id)
);

alter table public.bookings enable row level security;
