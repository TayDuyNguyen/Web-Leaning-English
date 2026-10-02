import { createRng, shuffle, take } from '../../core/rng.js';

export const BLANK = '______';

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// An inflected form in the sentence ("consequences") is blanked whole while the
// answer stays the lemma ("consequence"), which is what a vocabulary drill should
// ask for. content-vocabulary.test.js guarantees every example contains its
// headword, so a sentence with no gap cannot reach here.
function blankOut(example, word) {
  return example.replace(new RegExp(`\\b${escapeRegExp(word)}\\w*\\b`, 'i'), BLANK);
}

// Distractors come from the same pool the questions do, preferring the same topic
// so "salary / deadline / contract" is a real decision and "salary / umbrella /
// mirror" is not. The answer is always included and then shuffled in.
function pickOptions(item, pool, rng, count) {
  const sameCategory = pool.filter((x) => x.id !== item.id && x.category === item.category);
  const elsewhere = pool.filter((x) => x.id !== item.id && x.category !== item.category);
  const fillers = [...shuffle(sameCategory, rng), ...shuffle(elsewhere, rng)].slice(0, count - 1);
  return shuffle([item.word, ...fillers.map((x) => x.word)], rng);
}

export function createRound({ items, difficulty, seed }) {
  const rng = createRng(seed);
  const { questions, options } = difficulty.settings;
  // One bound, not two: a question needs `questions` items to ask about and `options`
  // distinct words to build its list, so the pool must satisfy whichever is larger.
  const need = Math.max(questions, options);
  if (items.length < need) {
    throw new Error(`fill-blank needs ${need} items but the content pool only has ${items.length}`);
  }

  return {
    kind: 'fill-blank',
    seed,
    difficulty: difficulty.id,
    items: take(items, questions, rng).map((item) => ({
      id: item.id,
      word: item.word,
      meaningVi: item.meaningVi,
      text: blankOut(item.example, item.word),
      options: pickOptions(item, items, rng, options),
    })),
  };
}

export function gradeRound({ round, answers }) {
  if (!answers || typeof answers !== 'object') {
    throw new TypeError('fill-blank.gradeRound requires { round, answers } — got no answer set');
  }
  return round.items.map((item) => ({
    wordId: item.id,
    correct: answers[item.id] === item.word,
    expected: item.word,
    given: answers[item.id] ?? null,
  }));
}

export function isComplete(round, answers = {}) {
  return round.items.every((item) => answers[item.id] !== undefined);
}
