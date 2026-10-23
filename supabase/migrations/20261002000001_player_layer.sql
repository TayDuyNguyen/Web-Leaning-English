-- ---------------------------------------------------------------------------
-- Player layer for the game architecture.
--
-- Replaces the old topic_scores table, which stored a whole progress history as
-- one opaque JSON blob and therefore could not answer "which words does this
-- learner keep missing" without downloading and parsing it in JavaScript.
--
-- Apply with `supabase db push`, or paste into the Supabase SQL editor.
-- ---------------------------------------------------------------------------

create table if not exists public.player_stats (
  user_id uuid primary key references auth.users on delete cascade,
  xp integer not null default 0,
  streak integer not null default 0,
  last_played_on date,
  games_played integer not null default 0,
  best_scores jsonb not null default '{}'::jsonb,
  updated_at timestamp with time zone not null default timezone('utc'::text, now())
);

create table if not exists public.game_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  game text not null,
  difficulty text not null,
  seed bigint not null,
  score integer not null,
  xp_earned integer not null,
  correct_count integer not null,
  wrong_count integer not null,
  accuracy integer not null,
  elapsed_ms integer not null default 0,
  played_at timestamp with time zone not null default timezone('utc'::text, now())
);

create index if not exists game_results_user_recent
  on public.game_results (user_id, played_at desc);

create table if not exists public.word_mastery (
  user_id uuid not null references auth.users on delete cascade,
  word_id text not null,
  correct_count integer not null default 0,
  incorrect_count integer not null default 0,
  updated_at timestamp with time zone not null default timezone('utc'::text, now()),
  primary key (user_id, word_id)
);

alter table public.player_stats enable row level security;
alter table public.game_results enable row level security;
alter table public.word_mastery enable row level security;

drop policy if exists "player_stats_all_own" on public.player_stats;
create policy "player_stats_all_own" on public.player_stats for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "game_results_all_own" on public.game_results;
create policy "game_results_all_own" on public.game_results for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "word_mastery_all_own" on public.word_mastery;
create policy "word_mastery_all_own" on public.word_mastery for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- An upsert from the client would replace the counters with this single round's
-- 0/1 and erase every past attempt. Incrementing has to happen in SQL, where the
-- previous value is visible.
create or replace function public.record_word_mastery(p_words jsonb)
returns void
language plpgsql
security invoker
as $$
declare
  entry jsonb;
  hit boolean;
begin
  if auth.uid() is null then
    raise exception 'record_word_mastery requires an authenticated user';
  end if;

  for entry in select * from jsonb_array_elements(p_words)
  loop
    hit := coalesce((entry->>'correct')::boolean, false);
    insert into public.word_mastery as row (user_id, word_id, correct_count, incorrect_count)
    values (auth.uid(), entry->>'word_id', case when hit then 1 else 0 end, case when hit then 0 else 1 end)
    on conflict (user_id, word_id) do update
      set correct_count = row.correct_count + excluded.correct_count,
          incorrect_count = row.incorrect_count + excluded.incorrect_count,
          updated_at = timezone('utc'::text, now());
  end loop;
end;
$$;

revoke execute on function public.record_word_mastery(jsonb) from anon;
revoke execute on function public.record_word_mastery(jsonb) from public;
grant execute on function public.record_word_mastery(jsonb) to authenticated;
