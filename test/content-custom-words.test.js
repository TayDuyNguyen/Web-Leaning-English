import assert from 'node:assert/strict';
import test from 'node:test';

import {
  CUSTOM_WORDS_KEY,
  CUSTOM_WORDS_LIMIT,
  MAX_WORD_LENGTH,
  addCustomWords,
  clearCustomWords,
  clearCustomWordsForLevel,
  customWordId,
  customWordsForLevel,
  parseCustomWords,
  readCustomWords,
  removeCustomWord,
  writeCustomWords,
} from '../src/content/customWords.js';

function memoryStorage() {
  const map = new Map();
  return {
    getItem: (key) => (map.has(key) ? map.get(key) : null),
    setItem: (key, value) => map.set(key, String(value)),
  };
}

test('a pasted list becomes playable items, one per line', () => {
  const { items, errors } = parseCustomWords('wallet = ví\nticket: vé\ncheck-in\tnhận phòng', { level: 'A1' });

  assert.deepEqual(errors, []);
  assert.deepEqual(
    items.map((item) => [item.word, item.meaningVi, item.level, item.category]),
    [
      ['wallet', 'ví', 'A1', 'custom'],
      ['ticket', 'vé', 'A1', 'custom'],
      ['check-in', 'nhận phòng', 'A1', 'custom'],
    ]
  );
  assert.deepEqual(items[0], {
    id: 'own-a1-wallet',
    word: 'wallet',
    meaningVi: 'ví',
    level: 'A1',
    category: 'custom',
    example: '',
    collocations: [],
  });
});

test('words are lowercased and meanings are collapsed, so "Wallet  =  Ví  tiền" is one word', () => {
  const { items } = parseCustomWords('Wallet =   Ví   tiền  ', { level: 'A2' });
  assert.equal(items.length, 1);
  assert.equal(items[0].word, 'wallet');
  assert.equal(items[0].meaningVi, 'Ví tiền');
  assert.equal(items[0].id, 'own-a2-wallet');
});

test('every bad line is reported with its number instead of silently disappearing', () => {
  const { items, errors } = parseCustomWords(
    ['wallet = ví', 'không có dấu phân cách', 'look after = chăm sóc', 'café = quán', 'ticket =', 'wallet = ví khác'].join('\n'),
    { level: 'A1' }
  );

  assert.equal(items.length, 1);
  assert.deepEqual(
    errors.map((problem) => problem.line),
    [2, 3, 4, 5, 6]
  );
  assert.match(errors[0].message, /thiếu dấu/);
  assert.match(errors[1].message, /chữ thường/);
  assert.match(errors[2].message, /chữ thường/);
  assert.match(errors[3].message, /nghĩa/);
  assert.match(errors[4].message, /đã có/);
});

test('a word already taught at this level is refused, so one word never appears twice', () => {
  const { items, errors } = parseCustomWords('Wallet = ví', { level: 'A1', taken: ['wallet', 'mirror'] });
  assert.deepEqual(items, []);
  assert.equal(errors.length, 1);
  assert.match(errors[0].message, /đã có/);
});

test('empty lines and comments are skipped, and a word may contain an apostrophe', () => {
  const { items, errors } = parseCustomWords('# ghi chú\n\no\'clock = đúng giờ\n\n', { level: 'A1' });
  assert.deepEqual(errors, []);
  assert.equal(items.length, 1);
  assert.equal(items[0].word, "o'clock");
  assert.equal(customWordId('A1', "o'clock"), "own-a1-o'clock");
});

test('an unknown level is a programming error, not a bad paste', () => {
  assert.throws(() => parseCustomWords('wallet = ví', { level: 'D1' }), /unknown level/);
  assert.throws(() => parseCustomWords('wallet = ví', {}), /unknown level/);
});

test('storage round-trips, merges by id and keeps the latest meaning', () => {
  const storage = memoryStorage();
  const first = addCustomWords(parseCustomWords('wallet = ví', { level: 'A1' }).items, storage);
  assert.equal(first.length, 1);

  const second = addCustomWords(parseCustomWords('wallet = ví da\nticket = vé', { level: 'A1' }).items, storage);
  assert.equal(second.length, 2);
  assert.equal(second.find((item) => item.word === 'wallet').meaningVi, 'ví da');
  assert.equal(readCustomWords(storage).length, 2);

  assert.equal(customWordsForLevel('A1', storage).length, 2);
  assert.equal(customWordsForLevel('B1', storage).length, 0);
});

test('damaged storage cannot break the app: bad JSON, bad words and unknown levels are dropped', () => {
  const storage = memoryStorage();
  storage.setItem(CUSTOM_WORDS_KEY, '{not json');
  assert.deepEqual(readCustomWords(storage), []);

  storage.setItem(
    CUSTOM_WORDS_KEY,
    JSON.stringify([
      { word: 'wallet', meaningVi: 'ví', level: 'A1' },
      { word: 'look after', meaningVi: 'chăm sóc', level: 'A1' },
      { word: 'ticket', meaningVi: 'vé', level: 'ZZ' },
      { word: 'WALLET', meaningVi: 'ví da', level: 'A1' },
      null,
      'nonsense',
    ])
  );

  const items = readCustomWords(storage);
  assert.equal(items.length, 1);
  assert.equal(items[0].id, 'own-a1-wallet');
});

test('remove and clear only touch the notebook', () => {
  const storage = memoryStorage();
  addCustomWords(parseCustomWords('wallet = ví\nticket = vé', { level: 'A1' }).items, storage);

  const left = removeCustomWord('own-a1-wallet', storage);
  assert.deepEqual(left.map((item) => item.word), ['ticket']);

  assert.deepEqual(clearCustomWords(storage), []);
  assert.deepEqual(readCustomWords(storage), []);
});

test('the notebook is capped so one paste cannot grow storage without bound', () => {
  const storage = memoryStorage();
  // Every word must be [a-z'-] only, so the counter is written in letters.
  const letters = (value) => {
    let out = '';
    let left = value;
    do {
      out = String.fromCharCode(97 + (left % 26)) + out;
      left = Math.floor(left / 26) - 1;
    } while (left >= 0);
    return out;
  };
  const lines = Array.from({ length: CUSTOM_WORDS_LIMIT + 20 }, (_, index) => `w${letters(index)} = nghĩa ${index}`).join('\n');
  const { items, errors } = parseCustomWords(lines, { level: 'A1' });

  assert.equal(errors.length, 0);
  addCustomWords(items, storage);
  assert.equal(readCustomWords(storage).length, CUSTOM_WORDS_LIMIT);
});

test('a word longer than a tile can show is refused, at the limit or above', () => {
  const tooLong = 'pneumonoultramicroscopicsilicovolcanoconiosis';
  const atLimit = 'b'.repeat(MAX_WORD_LENGTH);
  const { items, errors } = parseCustomWords(`${tooLong} = quá dài\n${atLimit} = vừa đủ`, { level: 'A1' });

  assert.deepEqual(items.map((item) => item.word), [atLimit]);
  assert.equal(errors.length, 1);
  assert.equal(errors[0].line, 1);
  assert.match(errors[0].message, new RegExp(String(MAX_WORD_LENGTH)));
});

test('storage drops a word longer than a tile can show instead of rendering a broken round', () => {
  const storage = memoryStorage();
  storage.setItem(
    CUSTOM_WORDS_KEY,
    JSON.stringify([
      { word: 'a'.repeat(MAX_WORD_LENGTH + 1), meaningVi: 'quá dài', level: 'A1' },
      { word: 'a'.repeat(MAX_WORD_LENGTH), meaningVi: 'vừa đủ', level: 'A1' },
    ])
  );

  assert.deepEqual(
    readCustomWords(storage).map((item) => item.word),
    ['a'.repeat(MAX_WORD_LENGTH)]
  );
});

test('clearing one level leaves the other levels alone', () => {
  const storage = memoryStorage();
  addCustomWords(parseCustomWords('wallet = ví', { level: 'A1' }).items, storage);
  addCustomWords(parseCustomWords('invoice = hoá đơn', { level: 'B1' }).items, storage);

  const left = clearCustomWordsForLevel('A1', storage);
  assert.deepEqual(left.map((item) => item.level), ['B1']);
  assert.equal(customWordsForLevel('A1', storage).length, 0);
  assert.equal(customWordsForLevel('B1', storage).length, 1);
});

test('without a storage the notebook is empty rather than a crash', () => {
  assert.deepEqual(readCustomWords(null), []);
  assert.equal(writeCustomWords([], null), false);
});
