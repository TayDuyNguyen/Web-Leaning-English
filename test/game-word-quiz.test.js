import assert from 'node:assert/strict';
import test from 'node:test';

import { createRound, gradeRound, isComplete } from '../src/games/word-quiz/logic.js';

const TRAVEL = ['trip', 'tour', 'voyage', 'crossing'];
const WORK = ['salary', 'contract', 'deadline', 'colleague'];
const OBJECTS = ['luggage', 'passport', 'hotel', 'mirror'];

const items = [...TRAVEL, ...WORK, ...OBJECTS].map((word, index) => ({
  id: `q${index}`,
  word,
  meaningVi: `nghia-${word}`,
  level: 'A1',
  category: index < 4 ? 'travel' : index < 8 ? 'work' : 'objects',
  example: `The ${word} arrived on time.`,
}));

const easy = { id: 'easy', seconds: 0, minItems: 5, settings: { questions: 5, options: 4 } };
const hard = { id: 'hard', seconds: 20, minItems: 12, settings: { questions: 12, options: 4 } };

test('a round asks the requested number of questions', () => {
  assert.equal(createRound({ items, difficulty: easy, seed: 1 }).items.length, 5);
});

test('the same seed replays the same quiz', () => {
  const a = createRound({ items, difficulty: hard, seed: 77 });
  const b = createRound({ items, difficulty: hard, seed: 77 });
  assert.deepEqual(a.items, b.items);
});

test('options are the right size, unique, and hold the answer once', () => {
  const round = createRound({ items, difficulty: hard, seed: 3 });
  for (const item of round.items) {
    assert.equal(item.options.length, 4);
    assert.equal(item.options.filter((o) => o === item.answer).length, 1);
    assert.equal(new Set(item.options).size, 4);
  }
});

test('the options are meanings, so the English question word never leaks into them', () => {
  const round = createRound({ items, difficulty: hard, seed: 4 });
  for (const item of round.items) {
    assert.ok(!item.options.includes(item.word), `${item.id}: the question word appeared as an option`);
    assert.ok(item.options.every((o) => o.startsWith('nghia-')));
  }
});

// Same reasoning as fill-blank: four words per topic means a question's three
// distractors can all belong to that topic, so the preference is observable.
test('distractors are drawn from the question topic when it can supply them', () => {
  const byCategory = { travel: TRAVEL, work: WORK, objects: OBJECTS };
  const round = createRound({ items, difficulty: hard, seed: 8 });
  for (const item of round.items) {
    const source = items.find((x) => x.id === item.id);
    const expected = byCategory[source.category]
      .filter((w) => w !== source.word)
      .map((w) => `nghia-${w}`)
      .sort();
    assert.deepEqual(item.options.filter((o) => o !== item.answer).sort(), expected);
  }
});

test('the honest answer sheet grades full marks', () => {
  const round = createRound({ items, difficulty: hard, seed: 12 });
  const answers = Object.fromEntries(round.items.map((i) => [i.id, i.answer]));
  assert.ok(isComplete(round, answers));
  assert.ok(gradeRound({ round, answers }).every((a) => a.correct));
});

test('a wrong meaning is graded wrong and reported', () => {
  const round = createRound({ items, difficulty: easy, seed: 15 });
  const first = round.items[0];
  const wrong = first.options.find((o) => o !== first.answer);
  const graded = gradeRound({ round, answers: { [first.id]: wrong } });
  assert.deepEqual(
    { correct: graded[0].correct, given: graded[0].given, expected: graded[0].expected },
    { correct: false, given: wrong, expected: first.answer }
  );
});

test('unanswered questions count as wrong, not skipped', () => {
  const round = createRound({ items, difficulty: easy, seed: 16 });
  const graded = gradeRound({ round, answers: {} });
  assert.equal(graded.length, round.items.length);
  assert.ok(graded.every((a) => !a.correct));
  assert.ok(!isComplete(round, {}));
});

test('grading without an answer set throws instead of scoring a blank sheet', () => {
  const round = createRound({ items, difficulty: easy, seed: 1 });
  assert.throws(() => gradeRound({ round }), /requires \{ round, answers \}/);
});

test('a pool too small for the questions or the options is a hard error', () => {
  assert.throws(() => createRound({ items: items.slice(0, 3), difficulty: easy, seed: 1 }), /needs 5 items/);
  assert.throws(() => createRound({ items: items.slice(0, 3), difficulty: hard, seed: 1 }), /needs 12 items/);
});
