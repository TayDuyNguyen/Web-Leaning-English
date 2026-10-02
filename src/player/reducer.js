import { levelForXp, nextStreak } from '../core/scoring.js';

export const PROFILE_VERSION = 1;

export function emptyProfile() {
  return { version: PROFILE_VERSION, xp: 0, streak: 0, lastPlayedOn: null, gamesPlayed: 0, best: {}, mastery: {} };
}

// One reducer for both the localStorage and the Supabase store. Two implementations
// of "what does a win do to my XP" is how a player ends up with different numbers on
// their phone and their laptop.
export function applyResult(profile, result, today) {
  const base = profile ?? emptyProfile();
  const mastery = { ...base.mastery };

  for (const outcome of result.wordOutcomes) {
    const current = mastery[outcome.wordId] ?? { correct: 0, wrong: 0 };
    mastery[outcome.wordId] = outcome.correct
      ? { ...current, correct: current.correct + 1 }
      : { ...current, wrong: current.wrong + 1 };
  }

  return {
    version: PROFILE_VERSION,
    xp: base.xp + result.xp,
    streak: nextStreak(base.streak, base.lastPlayedOn, today),
    lastPlayedOn: today,
    gamesPlayed: base.gamesPlayed + 1,
    best: { ...base.best, [result.game]: Math.max(base.best?.[result.game] ?? 0, result.score) },
    mastery,
  };
}

// A word answered wrong before and never recovered is the one worth reserving a
// game slot for, so wrong answers rank above untested words.
export function weakestWords(profile, limit = 5) {
  return Object.entries(profile?.mastery ?? {})
    .map(([wordId, counts]) => ({ wordId, ...counts, total: counts.correct + counts.wrong }))
    .filter((entry) => entry.wrong > 0)
    .sort((a, b) => b.wrong - a.wrong || a.correct - b.correct)
    .slice(0, limit);
}

export function progress(profile) {
  const xp = profile?.xp ?? 0;
  const level = levelForXp(xp);
  return { ...level, totalXp: xp, gamesPlayed: profile?.gamesPlayed ?? 0, streak: profile?.streak ?? 0 };
}
