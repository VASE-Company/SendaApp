-- SendaApp initial schema
create extension if not exists pgcrypto;

create table if not exists public.habits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  label text not null,
  done boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.checkins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  mood int not null check (mood between 1 and 5),
  risk_level text not null check (risk_level in ('low','medium','high')),
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.accountability_contacts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  name text not null,
  role text not null,
  created_at timestamptz not null default now()
);

alter table public.habits enable row level security;
alter table public.checkins enable row level security;
alter table public.accountability_contacts enable row level security;

-- Basic owner-only policies (requires Supabase Auth user id in user_id)
create policy if not exists "habits owner select" on public.habits for select using (auth.uid() = user_id);
create policy if not exists "habits owner insert" on public.habits for insert with check (auth.uid() = user_id);
create policy if not exists "habits owner update" on public.habits for update using (auth.uid() = user_id);

create policy if not exists "checkins owner select" on public.checkins for select using (auth.uid() = user_id);
create policy if not exists "checkins owner insert" on public.checkins for insert with check (auth.uid() = user_id);

create policy if not exists "contacts owner select" on public.accountability_contacts for select using (auth.uid() = user_id);
create policy if not exists "contacts owner insert" on public.accountability_contacts for insert with check (auth.uid() = user_id);
