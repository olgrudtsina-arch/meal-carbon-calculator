-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor → New query)

create table if not exists meal_logs (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  date          date not null,
  meal_type     text not null check (meal_type in ('breakfast','lunch','dinner','snack')),
  food_id       text not null,
  food_name     text not null,
  quantity_grams numeric(8,1) not null check (quantity_grams > 0),
  carbon_kg     numeric(10,6) not null check (carbon_kg >= 0),
  created_at    timestamptz not null default now()
);

-- Row-level security: users can only see and modify their own rows
alter table meal_logs enable row level security;

create policy "Users can select their own meal logs"
  on meal_logs for select
  using (auth.uid() = user_id);

create policy "Users can insert their own meal logs"
  on meal_logs for insert
  with check (auth.uid() = user_id);

create policy "Users can delete their own meal logs"
  on meal_logs for delete
  using (auth.uid() = user_id);

-- Index for fast date-range queries per user
create index if not exists meal_logs_user_date on meal_logs (user_id, date desc);
