export const POINTS = Object.freeze({ correct: 10, incorrect: -2 });
export const DIFFICULTY_MULTIPLIER = Object.freeze({ easy: 1, normal: 1.5, hard: 2 });

// One shape for every game's outcome, so scoring, XP, streaks and the weak-word
// list are written once. A game that returns anything else cannot be added to
// the registry without breaking the player layer.
export function buildGameResult({ game, difficulty, seed, attempts, elapsedMs }) {
  if (!Array.isArray(attempts)) {
    throw new Error(`${game}: attempts must be an array`);
  }
  const total = attempts.length;
  const correct = attempts.filter((a) => a.correct).length;
  const wrong = total - correct;
  const multiplier = DIFFICULTY_MULTIPLIER[difficulty] ?? 1;
  const raw = (correct * POINTS.correct + wrong * POINTS.incorrect) * multiplier;

  return {
    game,
    difficulty,
    seed,
    score: Math.max(0, Math.round(raw)),
    correct,
    wrong,
    accuracy: total === 0 ? 0 : Math.round((correct / total) * 100),
    elapsedMs: Math.max(0, Math.round(elapsedMs ?? 0)),
    xp: Math.max(0, Math.round(raw / 10)),
    wordOutcomes: attempts
      .filter((a) => a.wordId)
      .map((a) => ({ wordId: a.wordId, correct: Boolean(a.correct) })),
  };
}

// Level n costs 100x more than the one before it, so the curve stays visible
// in-game instead of living in a table someone has to extend by hand.
export function levelForXp(totalXp) {
  const xp = Math.max(0, Math.round(totalXp ?? 0));
  let level = 1;
  let remaining = xp;
  let need = 100;
  while (remaining >= need) {
    remaining -= need;
    level += 1;
    need = 100 * level;
  }
  return { level, xpIntoLevel: remaining, xpForNextLevel: need };
}

// A streak that survives a day skipping is a streak nobody believes in.
export function nextStreak(previous, lastPlayedOn, today) {
  if (!lastPlayedOn) return 1;
  if (lastPlayedOn === today) return Math.max(1, previous || 1);
  const gap = (Date.parse(`${today}T00:00:00Z`) - Date.parse(`${lastPlayedOn}T00:00:00Z`)) / 86400000;
  return gap === 1 ? (previous || 0) + 1 : 1;
}
