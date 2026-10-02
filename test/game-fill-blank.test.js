import assert from 'node:assert/strict';
import test from 'node:test';

import { BLANK, createRound, gradeRound, isComplete } from '../src/games/fill-blank/logic.js';

const TRAVEL = ['trip', 'tour', 'voyage', 'crossing'];
const WORK = ['salary', 'contract', 'deadline', 'colleague'];
const OBJECTS = ['luggage', 'passport', 'hotel', 'mirror'];

const items = [...TRAVEL, ...WORK, ...OBJECTS].map((word, index) => ({
  id: `i${index}`,
  word,
  meaningVi: `meaning-${word}`,
  level: 'A1',
  category: index < 4 ? 'travel' : index < 8 ? 'work' : 'objects',
  example: `The ${word} arrived on time.`,
}));

const easy = { id: 'easy', seconds: 0, minItems: 4, settings: { questions: 4, options: 4 } };
const hard = { id: 'hard', seconds: 30, minItems: 8, settings: { questions: 8, options: 4 } };
const every = { id: 'every', seconds: 0, minItems: 12, settings: { questions: 12, options: 4 } };

test('every sentence actually has a gap and hides the answer', () => {
  const round = createRound({ items, difficulty: hard, seed: 2 });
  assert.equal(round.items.length, 8);
  for (const item of round.items) {
    assert.ok(item.text.includes(BLANK), `${item.id}: no blank in "${item.text}"`);
    assert.ok(!item.text.toLowerCase().includes(item.word.toLowerCase()), `${item.id}: the answer is still visible`);
  }
});

test('an inflected form is blanked whole while the answer stays the lemma', () => {
  const pool = [
    { id: 'infl', word: 'consequence', meaningVi: 'hệ quả', level: 'B1', category: 'abstract', example: 'Missing it had serious consequences.' },
    ...items.slice(0, 3),
  ];
  const round = createRound({ items: pool, difficulty: easy, seed: 5 });
  assert.equal(round.items.find((x) => x.id === 'infl').text, `Missing it had serious ${BLANK}.`);
});

test('options hold the answer exactly once with no duplicates', () => {
  const round = createRound({ items, difficulty: hard, seed: 9 });
  for (const item of round.items) {
    assert.equal(item.options.length, 4);
    assert.equal(item.options.filter((o) => o === item.word).length, 1);
    assert.equal(new Set(item.options).size, 4);
  }
});

// Each category holds four words, so a question's three distractors can all come from
// its own topic. If the "prefer same category" ordering broke, this fails.
test('distractors come from the question topic whenever that topic can supply them', () => {
  const byCategory = { travel: TRAVEL, work: WORK, objects: OBJECTS };
  const round = createRound({ items, difficulty: every, seed: 4 });
  assert.equal(round.items.length, 12);
  for (const item of round.items) {
    const category = items.find((x) => x.id === item.id).category;
    const distractors = item.options.filter((o) => o !== item.word);
    assert.deepEqual(distractors.slice().sort(), byCategory[category].filter((w) => w !== item.word).sort());
  }
});

test('the honest answer sheet grades full marks', () => {
  const round = createRound({ items, difficulty: hard, seed: 11 });
  const answers = Object.fromEntries(round.items.map((i) => [i.id, i.word]));
  assert.ok(isComplete(round, answers));
  assert.ok(gradeRound({ round, answers }).every((a) => a.correct));
});

test('a wrong option is graded wrong and reports what was given', () => {
  const round = createRound({ items, difficulty: easy, seed: 13 });
  const first = round.items[0];
  const wrong = first.options.find((o) => o !== first.word);
  const graded = gradeRound({ round, answers: { [first.id]: wrong } });
  assert.equal(graded[0].correct, false);
  assert.equal(graded[0].given, wrong);
  assert.equal(graded[0].expected, first.word);
});

test('unanswered questions count as wrong, not skipped', () => {
  const round = createRound({ items, difficulty: easy, seed: 17 });
  const graded = gradeRound({ round, answers: {} });
  assert.equal(graded.length, round.items.length);
  assert.ok(graded.every((a) => !a.correct));
});

test('grading without an answer set throws instead of scoring a blank sheet', () => {
  const round = createRound({ items, difficulty: easy, seed: 1 });
  assert.throws(() => gradeRound({ round }), /requires \{ round, answers \}/);
});

test('a pool too small for the questions or the options is a hard error', () => {
  assert.throws(() => createRound({ items: items.slice(0, 3), difficulty: easy, seed: 1 }), /needs 4 items/);
  assert.throws(() => createRound({ items: items.slice(0, 5), difficulty: hard, seed: 1 }), /needs 8 items/);
  // Fewer questions than options: the option list, not the question count, binds.
  assert.throws(
    () => createRound({ items: items.slice(0, 5), difficulty: { id: 'd', seconds: 0, minItems: 1, settings: { questions: 2, options: 6 } }, seed: 1 }),
    /needs 6 items/
  );
});
