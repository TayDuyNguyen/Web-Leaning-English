import { createRng, take } from '../../core/rng.js';

export function normalizeAnswer(value) {
  return String(value ?? '').trim().toLowerCase().replace(/\s+/g, ' ');
}

// A scramble that lands back on the original word is a free point, so the shuffle
// retries and, as a last resort, reverses — which differs for every word of length
// two or more that is not a palindrome.
function scramble(word, rng) {
  const target = word.toLowerCase();
  const letters = [...target];
  if (letters.length < 3) return target;

  for (let attempt = 0; attempt < 12; attempt += 1) {
    const shuffled = [...letters];
    for (let i = shuffled.length - 1; i > 0; i -= 1) {
      const j = Math.floor(rng() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const candidate = shuffled.join('');
    if (candidate !== target) return candidate;
  }
  return [...letters].reverse().join('');
}

export function createRound({ items, difficulty, seed }) {
  const rng = createRng(seed);
  const need = difficulty.settings.words;
  if (items.length < need) {
    throw new Error(`word-scramble needs ${need} words but the content pool only has ${items.length}`);
  }

  return {
    kind: 'word-scramble',
    seed,
    difficulty: difficulty.id,
    items: take(items, need, rng).map((item) => ({
      id: item.id,
      word: item.word,
      meaningVi: item.meaningVi,
      letters: scramble(item.word, rng),
    })),
  };
}

// `answers` maps item id to what the player typed. Empty means wrong, not skipped —
// the same rule word-match uses, so the two games cannot be gamed differently.
export function gradeRound({ round, answers }) {
  if (!answers || typeof answers !== 'object') {
    throw new TypeError('word-scramble.gradeRound requires { round, answers } — got no answer set');
  }
  return round.items.map((item) => ({
    wordId: item.id,
    correct: normalizeAnswer(answers[item.id]) === item.word.toLowerCase(),
    expected: item.word,
    given: answers[item.id] ?? '',
  }));
}

export function isComplete(round, answers = {}) {
  return round.items.every((item) => normalizeAnswer(answers[item.id]) !== '');
}
