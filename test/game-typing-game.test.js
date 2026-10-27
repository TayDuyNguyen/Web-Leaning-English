import assert from 'node:assert/strict';
import test from 'node:test';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  advance,
  createRound,
  gradeRound,
  isComplete,
  outcomeOf,
  pickTarget,
  splitMilestones,
  spreadInitials,
} from '../src/games/typing-game/logic.js';

const items = Array.from({ length: 20 }, (_, i) => ({
  id: `w${i}`,
  word: `travel${i}`,
  meaningVi: `nghia${i}`,
  level: 'A1',
}));

const normal = { id: 'normal', seconds: 0, minItems: 10, settings: { words: 10, lives: 3 } };

test('a round holds the requested number of words', () => {
  assert.equal(createRound({ items, difficulty: normal, seed: 3 }).items.length, 10);
});

test('the same seed replays the same board and a different seed does not', () => {
  const first = createRound({ items, difficulty: normal, seed: 11 });
  const again = createRound({ items, difficulty: normal, seed: 11 });
  const other = createRound({ items, difficulty: normal, seed: 12 });

  assert.deepEqual(first.items, again.items);
  assert.notDeepEqual(
    first.items.map((item) => item.id),
    other.items.map((item) => item.id)
  );
});

test('words spawn in order, land after they spawn, and stay inside the lanes', () => {
  const round = createRound({ items, difficulty: normal, seed: 4 });

  for (const [index, item] of round.items.entries()) {
    assert.ok(item.landAtMs > item.spawnAtMs, `${item.word} lands before it appears`);
    assert.ok(item.lane >= 0 && item.lane < round.lanes, `${item.word} is in lane ${item.lane}`);
    if (index > 0) {
      assert.ok(item.spawnAtMs > round.items[index - 1].spawnAtMs, `${item.word} spawns out of order`);
    }
  }
  assert.equal(round.endsAtMs, Math.max(...round.items.map((item) => item.landAtMs)));
});

test('each milestone is faster than the one before it', () => {
  const round = createRound({ items, difficulty: { ...normal, settings: { words: 12, milestones: 3 } }, seed: 9 });
  const paces = round.milestones.map((milestone) => milestone.paceMs);

  assert.equal(paces.length, 3);
  for (let index = 1; index < paces.length; index += 1) {
    assert.ok(paces[index] < paces[index - 1], 'a later milestone must not be slower');
  }
  assert.equal(
    round.milestones.reduce((total, milestone) => total + milestone.words, 0),
    12
  );
});

test('the remainder of a split goes to the earliest milestones', () => {
  assert.deepEqual(splitMilestones(10, 3), [4, 3, 3]);
  assert.deepEqual(splitMilestones(16, 4), [4, 4, 4, 4]);
  assert.deepEqual(splitMilestones(6, 2), [3, 3]);
  assert.deepEqual(splitMilestones(3, 9), [1, 1, 1]);
});

test('neighbouring words do not share a first letter while a different letter is left', () => {
  const words = ['apple', 'ant', 'berry', 'bread', 'cherry', 'cake'].map((word, index) => ({ id: `w${index}`, word }));
  const ordered = spreadInitials(words);

  assert.equal(ordered.length, words.length);
  for (let index = 1; index < ordered.length; index += 1) {
    assert.notEqual(
      ordered[index].word[0],
      ordered[index - 1].word[0],
      `"${ordered[index - 1].word}" and "${ordered[index].word}" both start with the same letter`
    );
  }
});

test('the lock goes to the word closest to the deck', () => {
  const words = [
    { id: 'a', word: 'sugar', landAtMs: 5000 },
    { id: 'b', word: 'shadow', landAtMs: 2000 },
    { id: 'c', word: 'travel', landAtMs: 1000 },
  ];

  assert.equal(pickTarget({ words, key: 's' }).id, 'b');
  assert.equal(pickTarget({ words, key: 'x' }), null);
});

test('a keystroke extends a matching prefix and a wrong letter resets it', () => {
  assert.deepEqual(advance({ word: 'hotel', typed: 'ho', key: 't' }), { typed: 'hot', done: false, wrong: false });
  assert.deepEqual(advance({ word: 'hotel', typed: 'hot', key: 'x' }), { typed: '', done: false, wrong: true });
  assert.deepEqual(advance({ word: 'hotel', typed: 'hote', key: 'l' }), { typed: 'hotel', done: true, wrong: false });
});

test('a word can be typed letter by letter to completion', () => {
  const word = 'schedule';
  let typed = '';
  for (const letter of word) {
    const step = advance({ word, typed, key: letter });
    assert.equal(step.wrong, false);
    typed = step.typed;
  }
  assert.equal(typed, word);
});

test('only words the player actually saw are graded', () => {
  const round = createRound({ items, difficulty: normal, seed: 21 });
  const [first, second] = round.items;

  const graded = gradeRound({
    round,
    answers: { [first.id]: first.word, [second.id]: '' },
  });

  assert.equal(graded.length, 2, 'queued words must not be graded');
  assert.equal(graded[0].correct, true);
  assert.equal(graded[1].correct, false);
  assert.equal(graded[1].given, '');
  assert.ok(!isComplete(round, { [first.id]: first.word }));
});

test('a missed word is wrong even though its answer is empty', () => {
  const round = createRound({ items, difficulty: normal, seed: 22 });
  const graded = gradeRound({ round, answers: { [round.items[0].id]: '' } });
  assert.equal(graded[0].correct, false);
  assert.equal(graded[0].expected, round.items[0].word);
});

test('grading without an answer set throws instead of scoring a blank board', () => {
  const round = createRound({ items, difficulty: normal, seed: 5 });
  assert.throws(() => gradeRound({ round }), /requires \{ round, answers \}/);
});

test('a pool smaller than the difficulty is a hard error', () => {
  assert.throws(
    () => createRound({ items: items.slice(0, 4), difficulty: normal, seed: 1 }),
    /needs 10 words but the content pool only has 4/
  );
});

test('a cleared board with a life left is a win, an empty life bar is a loss', () => {
  assert.equal(outcomeOf({ lives: 2, answered: 10, total: 10 }), 'won');
  assert.equal(outcomeOf({ lives: 0, answered: 10, total: 10 }), 'lost');
  assert.equal(outcomeOf({ lives: 1, answered: 4, total: 10 }), null);
});

// The stage listens for characters, so a word the keyboard cannot produce would be
// unplayable rather than merely misspelled. This is the same guard word-scramble puts
// on authored words never scrambling to themselves.
test('every authored word can be typed on a latin keyboard', () => {
  const root = fileURLToPath(new URL('../src/content/vocabulary', import.meta.url));
  const words = [];
  for (const level of readdirSync(root)) {
    for (const file of readdirSync(join(root, level))) {
      for (const entry of JSON.parse(readFileSync(join(root, level, file), 'utf8'))) words.push(entry.word);
    }
  }

  const untypeable = words.filter((word) => !/^[a-z'-]+$/.test(word));
  assert.deepEqual(untypeable, [], 'these words contain characters the stage cannot receive');

  const round = createRound({
    items: words.map((word, index) => ({ id: `x${index}`, word, meaningVi: word, level: 'A1' })),
    difficulty: { id: 'd', seconds: 0, minItems: 1, settings: { words: words.length } },
    seed: 4242,
  });
  for (const item of round.items) {
    let typed = '';
    for (const letter of item.word) typed = advance({ word: item.word, typed, key: letter }).typed;
    assert.equal(typed, item.word, `"${item.word}" cannot be typed to completion`);
  }
});
