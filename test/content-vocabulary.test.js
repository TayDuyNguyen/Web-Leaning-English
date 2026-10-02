import assert from 'node:assert/strict';
import test from 'node:test';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { levelFromFolder, validateVocabularyCollection } from '../src/core/contentSchema.js';

const ROOT = fileURLToPath(new URL('../src/content/vocabulary', import.meta.url));

function loadAll() {
  const items = [];
  for (const folder of readdirSync(ROOT).sort()) {
    const level = levelFromFolder(folder);
    const dir = join(ROOT, folder);
    for (const file of readdirSync(dir).sort()) {
      if (!file.endsWith('.json')) continue;
      items.push(...validateVocabularyCollection(JSON.parse(readFileSync(join(dir, file), 'utf8')), { source: `${level}/${file}`, level }));
    }
  }
  return items;
}

const items = loadAll();

test('there is enough content to play with', () => {
  assert.ok(items.length >= 60, `only ${items.length} vocabulary items authored`);
});

// Hard and normal difficulties need 6-8 items from a single level, so a level with a
// handful of words would grey out most of the lobby without anyone noticing.
test('each authored level has enough words for the hardest difficulty', () => {
  const byLevel = new Map();
  for (const item of items) byLevel.set(item.level, (byLevel.get(item.level) ?? 0) + 1);
  for (const [level, count] of byLevel) {
    assert.ok(count >= 12, `level ${level} has only ${count} words`);
  }
});

test('ids are unique across the whole content tree', () => {
  const seen = new Set();
  for (const item of items) {
    assert.ok(!seen.has(item.id), `duplicate id "${item.id}"`);
    seen.add(item.id);
  }
});

// word-match keys a player's answer by the word text, so two items sharing a word
// would make a board with two identical-looking tiles and one correct pairing.
test('word text is unique across the whole content tree', () => {
  const seen = new Map();
  for (const item of items) {
    const key = item.word.toLowerCase();
    assert.ok(!seen.has(key), `"${item.word}" appears in both ${seen.get(key)} and ${item.id}`);
    seen.set(key, item.id);
  }
});

test('every item carries the fields the games read', () => {
  for (const item of items) {
    assert.ok(item.word.length > 1, `${item.id}: word too short to scramble`);
    assert.ok(item.meaningVi.length > 0);
    assert.ok(['A1', 'A2', 'B1', 'B2', 'C1'].includes(item.level));
  }
});

test('a file whose items disagree with its folder is rejected', () => {
  assert.throws(
    () => validateVocabularyCollection([{ id: 'x', word: 'abc', meaning_vi: 'x', level: 'B2' }], { source: 't', level: 'A1' }),
    /does not match its folder/
  );
});

test('every problem in a file is reported at once', () => {
  const raw = [{ id: 'a', word: '', meaning_vi: '', level: 'A1' }, { id: 'a', word: 'ok', meaning_vi: 'ok', level: 'A1' }];
  assert.throws(
    () => validateVocabularyCollection(raw, { source: 't', level: 'A1' }),
    (error) => /missing "word"/.test(error.message) && /duplicate id/.test(error.message) && /3 problem/.test(error.message)
  );
});
