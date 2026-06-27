import test from 'node:test';
import assert from 'node:assert/strict';

import {
  buildVocabBattleChoices,
  resolveQuizRound,
} from '../src/game-engines/gameRules.js';
import {
  normalizeGrammarQuestion,
  normalizeSentenceQuestion,
  normalizeVocabEntry,
  sanitizeVocabList,
  tokenizeSentence,
} from '../src/game-engines/gameDataUtils.js';
import {
  cloneGamePack,
  createGamePack,
  sanitizeGamePackCollection,
  updatePackItems,
} from '../src/game-engines/gamePackUtils.js';

test('resolveQuizRound keeps the game running after a correct answer when hearts remain', () => {
  assert.deepEqual(
    resolveQuizRound({ isCorrect: true, isLastQuestion: true, remainingLives: 3 }),
    { gameOver: false, isVictory: false }
  );
});

test('resolveQuizRound keeps the game running after a wrong answer when hearts remain', () => {
  assert.deepEqual(
    resolveQuizRound({ isCorrect: false, isLastQuestion: true, remainingLives: 2 }),
    { gameOver: false, isVictory: false }
  );
});

test('resolveQuizRound returns defeat only when timeout or wrong answer makes hearts reach zero', () => {
  assert.deepEqual(
    resolveQuizRound({ isCorrect: false, isLastQuestion: false, remainingLives: 0 }),
    { gameOver: true, isVictory: false }
  );
});

test('resolveQuizRound continues game after a correct non-final answer', () => {
  assert.deepEqual(
    resolveQuizRound({ isCorrect: true, isLastQuestion: false, remainingLives: 2 }),
    { gameOver: false, isVictory: false }
  );
});

test('tokenizeSentence strips punctuation and preserves word order', () => {
  assert.deepEqual(
    tokenizeSentence("We study English, every day!"),
    ['We', 'study', 'English', 'every', 'day']
  );
});

test('normalizeVocabEntry rejects entries without three distinct distractors', () => {
  assert.equal(
    normalizeVocabEntry({
      word: 'meticulous',
      meaning: 'careful',
      options: ['careful', 'careful', 'slow'],
    }),
    null
  );
});

test('normalizeGrammarQuestion requires four distinct options and an answer inside options', () => {
  assert.equal(
    normalizeGrammarQuestion({
      question: 'By the time he came, we ____ dinner.',
      options: ['had had', 'had had', 'have had', 'were having'],
      answer: 'missing',
    }),
    null
  );
});

test('normalizeSentenceQuestion derives words from english text', () => {
  const normalized = normalizeSentenceQuestion({
    vietnamese: 'Chung toi hoc tieng Anh moi ngay.',
    english: 'We study English every day.',
  });

  assert.deepEqual(normalized.words, ['We', 'study', 'English', 'every', 'day']);
});

test('normalizers backfill correct and incorrect counters to zero', () => {
  const vocab = normalizeVocabEntry({
    word: 'meticulous',
    meaning: 'careful',
    options: ['slow', 'lazy', 'messy'],
  });
  const grammar = normalizeGrammarQuestion({
    question: 'By the time he came, we ____ dinner.',
    options: ['had had', 'have had', 'were having', 'had been having'],
    answer: 'had had',
  });
  const sentence = normalizeSentenceQuestion({
    vietnamese: 'Chung toi hoc tieng Anh moi ngay.',
    english: 'We study English every day.',
  });

  assert.equal(vocab.correctCount, 0);
  assert.equal(vocab.incorrectCount, 0);
  assert.equal(grammar.correctCount, 0);
  assert.equal(grammar.incorrectCount, 0);
  assert.equal(sentence.correctCount, 0);
  assert.equal(sentence.incorrectCount, 0);
});

test('sanitizeVocabList removes duplicate words case-insensitively', () => {
  const sanitized = sanitizeVocabList([
    { word: 'Meticulous', meaning: 'careful', options: ['slow', 'lazy', 'messy'] },
    { word: 'meticulous', meaning: 'careful', options: ['wrong1', 'wrong2', 'wrong3'] },
  ]);

  assert.equal(sanitized.length, 1);
});

test('buildVocabBattleChoices keeps the correct meaning exactly once', () => {
  const wordObj = {
    word: 'meticulous',
    meaning: 'careful',
    options: ['slow', 'lazy', 'messy'],
  };
  const vocabList = [
    wordObj,
    { word: 'rapid', meaning: 'fast', options: ['slow', 'careful', 'messy'] },
    { word: 'brief', meaning: 'short', options: ['long', 'careful', 'slow'] },
  ];

  const choices = buildVocabBattleChoices(wordObj, vocabList);
  const correctChoices = choices.filter((choice) => choice.correct);
  const meanings = choices.map((choice) => choice.meaning.toLowerCase());

  assert.equal(correctChoices.length, 1);
  assert.equal(correctChoices[0].meaning, 'careful');
  assert.equal(new Set(meanings).size, meanings.length);
});

test('sanitizeGamePackCollection wraps legacy flat data into one pack', () => {
  const packs = sanitizeGamePackCollection('grammar', [], [
    {
      question: 'By the time he came, we ____ dinner.',
      options: ['had had', 'have had', 'were having', 'had been having'],
      answer: 'had had',
    },
  ]);

  assert.equal(packs.length, 1);
  assert.equal(packs[0].items.length, 1);
});

test('newer packs are sorted to the top', () => {
  const older = createGamePack('sentence', {
    name: 'Bộ cũ',
    createdAt: '2026-01-01T00:00:00.000Z',
  });
  const newer = createGamePack('sentence', {
    name: 'Bộ mới',
    createdAt: '2026-06-01T00:00:00.000Z',
  });

  const packs = sanitizeGamePackCollection('sentence', [older, newer], []);
  assert.equal(packs[0].name, 'Bộ mới');
});

test('cloneGamePack creates a copied pack with a new id', () => {
  const original = createGamePack('vocab', {
    name: 'Bộ gốc',
    items: [{ word: 'meticulous', meaning: 'careful', options: ['slow', 'lazy', 'messy'] }],
  });
  const cloned = cloneGamePack('vocab', original);

  assert.notEqual(cloned.id, original.id);
  assert.match(cloned.name, /Bản sao/);
  assert.equal(cloned.items.length, 1);
});

test('updatePackItems only updates the targeted pack', () => {
  const packA = createGamePack('vocab', {
    name: 'Bộ A',
    items: [{ word: 'apple', meaning: 'táo', options: ['cam', 'lê', 'xoài'] }],
    createdAt: '2026-01-01T00:00:00.000Z',
  });
  const packB = createGamePack('vocab', {
    name: 'Bộ B',
    items: [{ word: 'banana', meaning: 'chuối', options: ['ổi', 'mít', 'dứa'] }],
    createdAt: '2026-06-01T00:00:00.000Z',
  });

  const updated = updatePackItems('vocab', [packA, packB], packB.id, [
    ...packB.items,
    { word: 'grape', meaning: 'nho', options: ['chanh', 'bưởi', 'mận'] },
  ]);

  const targeted = updated.find((pack) => pack.id === packB.id);
  const untouched = updated.find((pack) => pack.id === packA.id);

  assert.deepEqual(targeted.items.map((item) => item.word), ['banana', 'grape']);
  assert.deepEqual(untouched.items.map((item) => item.word), ['apple']);
});

test('different game pack kinds stay structurally isolated', () => {
  const grammarPacks = sanitizeGamePackCollection('grammar', [], [
    {
      question: 'By the time he came, we ____ dinner.',
      options: ['had had', 'have had', 'were having', 'had been having'],
      answer: 'had had',
    },
  ]);
  const sentencePacks = sanitizeGamePackCollection('sentence', [], [
    {
      vietnamese: 'Chúng tôi học tiếng Anh mỗi ngày.',
      english: 'We study English every day.',
    },
  ]);
  const vocabPacks = sanitizeGamePackCollection('vocab', [], [
    {
      word: 'meticulous',
      meaning: 'careful',
      options: ['slow', 'lazy', 'messy'],
    },
  ]);

  assert.ok('question' in grammarPacks[0].items[0]);
  assert.ok('english' in sentencePacks[0].items[0]);
  assert.ok('word' in vocabPacks[0].items[0]);
  assert.equal('question' in sentencePacks[0].items[0], false);
  assert.equal('word' in grammarPacks[0].items[0], false);
});
