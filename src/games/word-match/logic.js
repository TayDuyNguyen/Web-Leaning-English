import { createRng, shuffle, take } from '../../core/rng.js';

// Both columns are drawn from the same `pairs` array, so a match can never be
// unsolvable. Shuffling them independently is what makes the two sides disagree.
export function createRound({ items, difficulty, seed }) {
  const rng = createRng(seed);
  const need = difficulty.settings.pairs;
  if (items.length < need) {
    throw new Error(`word-match needs ${need} pairs but the content pool only has ${items.length}`);
  }

  const pairs = take(items, need, rng).map((item) => ({
    id: item.id,
    word: item.word,
    meaningVi: item.meaningVi,
  }));

  return {
    kind: 'word-match',
    seed,
    difficulty: difficulty.id,
    pairs,
    words: shuffle(pairs, rng),
    meanings: shuffle(pairs, rng),
  };
}

// `answers` maps a word to the meaning id the player paired it with. Unmatched
// words are graded wrong rather than dropped: a timeout must not score better than
// an honest attempt. The key name is part of the arena<->game contract, so a missing
// `answers` throws instead of quietly grading a blank sheet as zero.
export function gradeRound({ round, answers }) {
  if (!answers || typeof answers !== 'object') {
    throw new TypeError('word-match.gradeRound requires { round, answers } — got no answer set');
  }
  return round.pairs.map((pair) => ({
    wordId: pair.id,
    correct: answers[pair.word] === pair.id,
    expected: pair.meaningVi,
    given: answers[pair.word] ?? null,
  }));
}

export function isComplete(round, assignments = {}) {
  return round.pairs.every((pair) => assignments[pair.word] !== undefined);
}
