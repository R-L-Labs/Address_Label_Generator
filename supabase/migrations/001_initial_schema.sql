-- Users (managed by Supabase Auth, extend with profile)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  display_name text,
  stripe_customer_id text,
  subscription_status text default 'free', -- 'free', 'pro', 'cancelled'
  subscription_id text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Saved return addresses
create table public.return_addresses (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  label text, -- e.g. "Personal", "R&L Labs LLC"
  name text,
  line1 text not null,
  line2 text,
  city text not null,
  state text not null,
  zip text not null,
  country text default 'US',
  is_default boolean default false,
  created_at timestamptz default now()
);

-- Print history / order log
create table public.print_log (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  recipient_name text,
  recipient_address text not null,
  return_address_id uuid references public.return_addresses(id),
  label_size text default '6x4',
  source text, -- 'manual', 'tcgplayer', 'ebay'
  printed_at timestamptz default now()
);

-- Enable Row Level Security
alter table public.profiles enable row level security;
alter table public.return_addresses enable row level security;
alter table public.print_log enable row level security;

-- RLS policies: users can only access their own data
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can view own return addresses"
  on public.return_addresses for select
  using (auth.uid() = user_id);

create policy "Users can insert own return addresses"
  on public.return_addresses for insert
  with check (auth.uid() = user_id);

create policy "Users can update own return addresses"
  on public.return_addresses for update
  using (auth.uid() = user_id);

create policy "Users can delete own return addresses"
  on public.return_addresses for delete
  using (auth.uid() = user_id);

create policy "Users can view own print log"
  on public.print_log for select
  using (auth.uid() = user_id);

create policy "Users can insert own print log"
  on public.print_log for insert
  with check (auth.uid() = user_id);
