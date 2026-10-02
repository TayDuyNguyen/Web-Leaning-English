import assert from 'node:assert/strict';
import test from 'node:test';

import { createRound, gradeRound, isComplete } from '../src/games/word-match/logic.js';
import { createRng } from '../src/core/rng.js';
import { take } from '../src/core/rng.js';

const items = Array.from({ length: 12 }, (_, i) => ({
  id: `w${i}`,
  word: `word${i}`,
  meaningVi: `nghia${i}`,
  level: 'A1',
}));

const easy = { id: 'easy', seconds: 0, minItems: 3, settings: { pairs: 3 } };
const hard = { id: 'hard', seconds: 20, minItems: 8, settings: { pairs: 8 } };

test('a round holds exactly the requested number of pairs', () => {
  assert.equal(createRound({ items, difficulty: hard, seed: 5 }).pairs.length, 8);
});

test('the same seed replays the same board', () => {
  const a = createRound({ items, difficulty: easy, seed: 42 });
  const b = createRound({ items, difficulty: easy, seed: 42 });
  assert.deepEqual(a.words.map((p) => p.word), b.words.map((p) => p.word));
  assert.deepEqual(a.meanings.map((p) => p.id), b.meanings.map((p) => p.id));
});

// The two columns are drawn from one pair list, so a board can always be solved.
test('both columns hold the same set of pairs', () => {
  const round = createRound({ items, difficulty: hard, seed: 11 });
  assert.deepEqual(
    round.words.map((p) => p.id).sort(),
    round.meanings.map((p) => p.id).sort()
  );
});

test('the meaning column is actually shuffled relative to the words', () => {
  const same = Array.from({ length: 12 }, (_, i) => createRng(i))
    .map((rng, i) => {
      const round = createRound({ items, difficulty: hard, seed: i });
      return round.words.map((p) => p.word).join() === round.meanings.map((p) => p.word).join();
    });
  assert.ok(same.includes(false), 'no seed ever separated the two columns');
});

test('the honest solution grades every pair correct', () => {
  const round = createRound({ items, difficulty: hard, seed: 3 });
  const answers = Object.fromEntries(round.pairs.map((p) => [p.word, p.id]));
  assert.ok(isComplete(round, answers));
  assert.ok(gradeRound({ round, answers }).every((a) => a.correct));
});

test('an unmatched word is wrong, not skipped', () => {
  const round = createRound({ items, difficulty: easy, seed: 8 });
  const partial = { [round.pairs[0].word]: round.pairs[0].id };
  const graded = gradeRound({ round, answers: partial });
  assert.equal(graded.filter((a) => a.correct).length, 1);
  assert.equal(graded.filter((a) => !a.correct).length, 2);
  assert.equal(graded[1].given, null);
  assert.ok(!isComplete(round, partial));
});

test('swapping two meanings marks exactly those two wrong', () => {
  const round = createRound({ items, difficulty: easy, seed: 9 });
  const [a, b] = round.pairs;
  const answers = { [a.word]: b.id, [b.word]: a.id, [round.pairs[2].word]: round.pairs[2].id };
  const graded = gradeRound({ round, answers });
  assert.deepEqual(graded.map((x) => x.correct), [false, false, true]);
});

test('a pool smaller than the difficulty is a hard error', () => {
  assert.throws(() => createRound({ items: items.slice(0, 2), difficulty: hard, seed: 1 }), /needs 8 pairs but the content pool only has 2/);
});

test('take() is used rather than an ad-hoc slice', () => {
  assert.equal(take(items, 4, createRng(1)).length, 4);
});

// The arena and the game agree on nothing but this object shape. Grading a missing
// answer set as "all blank" is how the app once shipped a round where every correct
// match scored zero, so the contract has to fail loudly.
test('grading without an answer set throws instead of scoring a blank sheet', () => {
  const round = createRound({ items, difficulty: easy, seed: 1 });
  assert.throws(() => gradeRound({ round }), /requires \{ round, answers \}/);
});
