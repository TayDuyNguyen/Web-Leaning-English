create table if not exists public.profiles (
  id uuid primary key references auth.users on delete cascade,
  theme text not null default 'dark',
  player_level integer not null default 1,
  player_xp integer not null default 0,
  game_timer_limit integer not null default 10,
  updated_at timestamp with time zone not null default timezone('utc'::text, now())
);

alter table public.profiles enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
  on public.profiles for insert
  with check (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create table if not exists public.topic_scores (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  topic_id text not null,
  scores_data jsonb not null,
  updated_at timestamp with time zone not null default timezone('utc'::text, now()),
  unique (user_id, topic_id)
);

alter table public.topic_scores enable row level security;

drop policy if exists "topic_scores_all_own" on public.topic_scores;
create policy "topic_scores_all_own"
  on public.topic_scores for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create table if not exists public.custom_vocab (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  client_id text not null,
  word text not null,
  meaning text not null,
  options text[] not null,
  mastery integer not null default 0,
  correct_count integer not null default 0,
  incorrect_count integer not null default 0,
  created_at timestamp with time zone not null default timezone('utc'::text, now()),
  updated_at timestamp with time zone not null default timezone('utc'::text, now()),
  unique (user_id, client_id)
);

alter table public.custom_vocab enable row level security;

drop policy if exists "custom_vocab_all_own" on public.custom_vocab;
create policy "custom_vocab_all_own"
  on public.custom_vocab for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create table if not exists public.custom_grammar (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  client_id text not null,
  question text not null,
  options text[] not null,
  answer text not null,
  explanation text,
  mastery integer not null default 0,
  correct_count integer not null default 0,
  incorrect_count integer not null default 0,
  created_at timestamp with time zone not null default timezone('utc'::text, now()),
  updated_at timestamp with time zone not null default timezone('utc'::text, now()),
  unique (user_id, client_id)
);

alter table public.custom_grammar enable row level security;

drop policy if exists "custom_grammar_all_own" on public.custom_grammar;
create policy "custom_grammar_all_own"
  on public.custom_grammar for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create table if not exists public.custom_sentences (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  client_id text not null,
  vietnamese text not null,
  english text not null,
  mastery integer not null default 0,
  correct_count integer not null default 0,
  incorrect_count integer not null default 0,
  created_at timestamp with time zone not null default timezone('utc'::text, now()),
  updated_at timestamp with time zone not null default timezone('utc'::text, now()),
  unique (user_id, client_id)
);

alter table public.custom_sentences enable row level security;

drop policy if exists "custom_sentences_all_own" on public.custom_sentences;
create policy "custom_sentences_all_own"
  on public.custom_sentences for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create table if not exists public.custom_vocab_packs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  client_id text not null,
  name text not null,
  items jsonb not null default '[]'::jsonb,
  created_at timestamp with time zone not null default timezone('utc'::text, now()),
  updated_at timestamp with time zone not null default timezone('utc'::text, now()),
  unique (user_id, client_id)
);

alter table public.custom_vocab_packs enable row level security;

drop policy if exists "custom_vocab_packs_all_own" on public.custom_vocab_packs;
create policy "custom_vocab_packs_all_own"
  on public.custom_vocab_packs for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create table if not exists public.custom_grammar_packs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  client_id text not null,
  name text not null,
  items jsonb not null default '[]'::jsonb,
  created_at timestamp with time zone not null default timezone('utc'::text, now()),
  updated_at timestamp with time zone not null default timezone('utc'::text, now()),
  unique (user_id, client_id)
);

alter table public.custom_grammar_packs enable row level security;

drop policy if exists "custom_grammar_packs_all_own" on public.custom_grammar_packs;
create policy "custom_grammar_packs_all_own"
  on public.custom_grammar_packs for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create table if not exists public.custom_sentence_packs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  client_id text not null,
  name text not null,
  items jsonb not null default '[]'::jsonb,
  created_at timestamp with time zone not null default timezone('utc'::text, now()),
  updated_at timestamp with time zone not null default timezone('utc'::text, now()),
  unique (user_id, client_id)
);

alter table public.custom_sentence_packs enable row level security;

drop policy if exists "custom_sentence_packs_all_own" on public.custom_sentence_packs;
create policy "custom_sentence_packs_all_own"
  on public.custom_sentence_packs for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
