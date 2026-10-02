import { createRng, shuffle, take } from '../../core/rng.js';

function pickOptions(item, pool, rng, count) {
  const sameCategory = pool.filter((x) => x.id !== item.id && x.category === item.category);
  const elsewhere = pool.filter((x) => x.id !== item.id && x.category !== item.category);
  const fillers = [...shuffle(sameCategory, rng), ...shuffle(elsewhere, rng)].slice(0, count - 1);
  return shuffle([item.meaningVi, ...fillers.map((x) => x.meaningVi)], rng);
}

export function createRound({ items, difficulty, seed }) {
  const rng = createRng(seed);
  const { questions, options } = difficulty.settings;
  if (items.length < Math.max(questions, options)) {
    throw new Error(`word-quiz needs ${Math.max(questions, options)} items but the content pool only has ${items.length}`);
  }

  return {
    kind: 'word-quiz',
    seed,
    difficulty: difficulty.id,
    items: take(items, questions, rng).map((item) => ({
      id: item.id,
      word: item.word,
      answer: item.meaningVi,
      options: pickOptions(item, items, rng, options),
    })),
  };
}

export function gradeRound({ round, answers }) {
  if (!answers || typeof answers !== 'object') {
    throw new TypeError('word-quiz.gradeRound requires { round, answers } — got no answer set');
  }
  return round.items.map((item) => ({
    wordId: item.id,
    correct: answers[item.id] === item.answer,
    expected: item.answer,
    given: answers[item.id] ?? null,
  }));
}

export function isComplete(round, answers = {}) {
  return round.items.every((item) => answers[item.id] !== undefined);
}
