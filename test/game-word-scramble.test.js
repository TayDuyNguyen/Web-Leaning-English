import assert from 'node:assert/strict';
import test from 'node:test';

import { createRound, gradeRound, isComplete, normalizeAnswer } from '../src/games/word-scramble/logic.js';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const items = Array.from({ length: 12 }, (_, i) => ({
  id: `w${i}`,
  word: `travel${i}`,
  meaningVi: `nghia${i}`,
  level: 'A1',
}));

const normal = { id: 'normal', seconds: 45, minItems: 6, settings: { words: 6 } };

test('a round holds the requested number of words', () => {
  assert.equal(createRound({ items, difficulty: normal, seed: 2 }).items.length, 6);
});

test('scrambled letters are never the answer', () => {
  const round = createRound({ items, difficulty: normal, seed: 77 });
  for (const item of round.items) {
    assert.notEqual(item.letters, item.word.toLowerCase(), `"${item.word}" came out unscrambled`);
    assert.equal([...item.letters].sort().join(''), item.word.toLowerCase().split('').sort().join(''));
  }
});

// The invariant above is asserted against the real word list too, because a
// palindrome or a two-letter word in content/ would silently hand out free points.
test('every authored word survives scrambling without becoming itself', () => {
  const root = fileURLToPath(new URL('../src/content/vocabulary', import.meta.url));
  const words = [];
  for (const level of readdirSync(root)) {
    for (const file of readdirSync(join(root, level))) {
      for (const entry of JSON.parse(readFileSync(join(root, level, file), 'utf8'))) words.push(entry.word);
    }
  }
  const round = createRound({
    items: words.map((word, i) => ({ id: `x${i}`, word, meaningVi: word, level: 'A1' })),
    difficulty: { id: 'd', seconds: 0, minItems: 1, settings: { words: words.length } },
    seed: 4242,
  });
  for (const item of round.items) {
    assert.notEqual(item.letters, item.word.toLowerCase(), `"${item.word}" cannot be scrambled`);
  }
});

test('answers ignore case and stray spaces', () => {
  const round = createRound({ items, difficulty: normal, seed: 5 });
  const first = round.items[0];
  const graded = gradeRound({ round, answers: { [first.id]: `  ${first.word.toUpperCase()}  ` } });
  assert.equal(graded[0].correct, true);
});

test('blank answers are wrong and still counted', () => {
  const round = createRound({ items, difficulty: normal, seed: 6 });
  const graded = gradeRound({ round, answers: {} });
  assert.equal(graded.length, round.items.length);
  assert.ok(graded.every((a) => !a.correct));
  assert.ok(!isComplete(round, {}));
});

test('isComplete needs every box filled', () => {
  const round = createRound({ items, difficulty: normal, seed: 8 });
  const answers = Object.fromEntries(round.items.map((i) => [i.id, i.word]));
  assert.ok(isComplete(round, answers));
  delete answers[round.items[0].id];
  assert.ok(!isComplete(round, answers));
});

test('normalizeAnswer collapses whitespace and case', () => {
  assert.equal(normalizeAnswer('  HoTel  '), 'hotel');
  assert.equal(normalizeAnswer(undefined), '');
});

test('a pool smaller than the difficulty is a hard error', () => {
  assert.throws(() => createRound({ items: items.slice(0, 3), difficulty: normal, seed: 1 }), /needs 6 words but the content pool only has 3/);
});

test('grading without an answer set throws instead of scoring a blank sheet', () => {
  const round = createRound({ items, difficulty: normal, seed: 1 });
  assert.throws(() => gradeRound({ round }), /requires \{ round, answers \}/);
});
