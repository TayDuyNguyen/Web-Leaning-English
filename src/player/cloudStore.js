import { applyResult, emptyProfile, PROFILE_VERSION } from './reducer.js';

// The cloud rows are split (player_stats + word_mastery) precisely so "which words
// am I bad at" is a SELECT instead of a JSON parse in JavaScript. That is the whole
// reason this store exists rather than the local blob being uploaded as-is.
function toProfile(statsRow, masteryRows) {
  if (!statsRow) return emptyProfile();
  const mastery = {};
  for (const row of masteryRows) {
    mastery[row.word_id] = { correct: row.correct_count, wrong: row.incorrect_count };
  }
  return {
    version: PROFILE_VERSION,
    xp: statsRow.xp,
    streak: statsRow.streak,
    lastPlayedOn: statsRow.last_played_on,
    gamesPlayed: statsRow.games_played,
    best: statsRow.best_scores ?? {},
    mastery,
  };
}

export function createCloudStore(client, userId) {
  async function read() {
    const [stats, mastery] = await Promise.all([
      client.from('player_stats').select('*').eq('user_id', userId).maybeSingle(),
      client.from('word_mastery').select('word_id,correct_count,incorrect_count').eq('user_id', userId),
    ]);
    if (stats.error) throw stats.error;
    if (mastery.error) throw mastery.error;
    return toProfile(stats.data, mastery.data ?? []);
  }

  async function write(profile) {
    const { error } = await client.from('player_stats').upsert({
      user_id: userId,
      xp: profile.xp,
      streak: profile.streak,
      last_played_on: profile.lastPlayedOn,
      games_played: profile.gamesPlayed,
      best_scores: profile.best,
    });
    if (error) throw error;
    return profile;
  }

  async function record(result, today) {
    const { error: resultError } = await client.from('game_results').insert({
      user_id: userId,
      game: result.game,
      difficulty: result.difficulty,
      seed: result.seed,
      score: result.score,
      xp_earned: result.xp,
      correct_count: result.correct,
      wrong_count: result.wrong,
      accuracy: result.accuracy,
      elapsed_ms: result.elapsedMs,
    });
    if (resultError) throw resultError;

    // An upsert would replace the counters with this one round's 0/1 and wipe every
    // past attempt, so mastery goes through a SQL function that increments instead.
    if (result.wordOutcomes.length > 0) {
      const { error } = await client.rpc('record_word_mastery', {
        p_words: result.wordOutcomes.map((outcome) => ({
          word_id: outcome.wordId,
          correct: outcome.correct,
        })),
      });
      if (error) throw error;
    }

    // Recomputed after the writes so the profile mirrors the rows rather than the
    // value this client thought it had before the round.
    return write(applyResult(await read(), result, today));
  }

  return { kind: 'cloud', read, write, record };
}
