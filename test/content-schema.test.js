import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

import {
  denormalizeTopic,
  normalizeTopic,
  toTopicViewModel,
} from '../src/lib/contentSchema.js';
import { grammarTopics } from '../src/data/topics.js';
import { contentModules } from '../src/data/content-modules.js';
import { tensesData } from '../src/data/chuyen-de-thi-dong-tu.js';
import { sequenceOfTensesData } from '../src/data/su-phoi-thi.js';

// A hand-built topic covering both formula shapes and both question types. Small
// enough that a failure says which rule broke rather than "something in 380 kB moved".
const META = {
  id: 'demo-topic',
  number: 7,
  name: 'Demo',
  englishName: 'Demo',
  category: 'Test',
  description: 'A topic',
  icon: '🧪',
  exercisesCount: 99,
};

const CONTENT = {
  tenses: [
    {
      id: 1,
      name: 'First lesson',
      usage: 'line one\nline two',
      formula: { ordinary: { affirmative: 'S + V', negative: 'S + do not + V' }, notes: ['note'] },
      signals: 'always, never',
    },
    { id: 2, name: 'Second lesson', usage: 'b', formula: { custom: true, rules: [{ title: 'r' }] }, signals: 'when' },
  ],
  exercises: [
    {
      name: 'Exercise 1',
      description: 'Fill the blanks.',
      questions: [
        { num: 1, type: 'fill', text: 'The earth (go) around the sun.', answer: 'goes', explanation: 'A fact.' },
        { num: 2, type: 'choice', text: 'Pick one.', options: { A: 'one', B: 'two' }, answer: 'B', explanation: 'B is right.' },
      ],
    },
    { name: 'Exercise 2', description: 'More.', questions: [{ num: 1, type: 'fill', text: 'x', answer: 'y' }] },
  ],
};

test('normalizeTopic produces one row per entity with 0-based positions', () => {
  const rows = normalizeTopic(META, CONTENT);

  assert.deepEqual(rows.topic, {
    id: 'demo-topic',
    number: 7,
    name: 'Demo',
    english_name: 'Demo',
    category: 'Test',
    description: 'A topic',
    icon: '🧪',
    // The catalogue advertises 99; the database records the 2 that exist.
    exercise_count: 2,
  });

  assert.deepEqual(
    rows.lessons.map((l) => [l.id, l.position, l.topic_id]),
    [
      ['demo-topic/theory/0', 0, 'demo-topic'],
      ['demo-topic/theory/1', 1, 'demo-topic'],
    ]
  );

  assert.deepEqual(
    rows.exercises.map((e) => [e.id, e.position]),
    [
      ['demo-topic/exercise/0', 0],
      ['demo-topic/exercise/1', 1],
    ]
  );

  assert.equal(rows.questions.length, 3);
  assert.deepEqual(
    rows.questions.map((q) => [q.id, q.exercise_id, q.position, q.question_number]),
    [
      ['demo-topic/exercise/0/q/1', 'demo-topic/exercise/0', 0, 1],
      ['demo-topic/exercise/0/q/2', 'demo-topic/exercise/0', 1, 2],
      ['demo-topic/exercise/1/q/1', 'demo-topic/exercise/1', 0, 1],
    ]
  );
});

test('question number survives ingestion verbatim, because progress is keyed by it', () => {
  const rows = normalizeTopic(META, CONTENT);
  assert.deepEqual(rows.questions.map((q) => q.question_number), [1, 2, 1]);
  assert.equal(rows.questions[1].options.A, 'one');
  assert.equal(rows.questions[2].explanation, null);
});

test('denormalizeTopic rebuilds the exact payload the UI renders', () => {
  const rows = normalizeTopic(META, CONTENT);
  const back = denormalizeTopic('demo-topic', rows.lessons, rows.exercises, rows.questions);

  assert.deepEqual(back, CONTENT);
  // deepStrictEqual ignores key order but not key presence: `options` must stay
  // absent on a fill question, since choice-vs-fill branches on q.type while the
  // renderer reads q.options.
  assert.equal('options' in back.exercises[0].questions[0], false);
  assert.equal('options' in back.exercises[0].questions[1], true);
});

test('a catalogued topic with no authored content is still a row, with no children', () => {
  const rows = normalizeTopic(META, null);

  assert.deepEqual(rows.lessons, []);
  assert.deepEqual(rows.exercises, []);
  assert.deepEqual(rows.questions, []);
  assert.equal(rows.topic.exercise_count, 0);
  assert.equal(denormalizeTopic('demo-topic', [], [], []), null);
});

test('ingestion refuses a topic whose questions share a number', () => {
  const broken = {
    ...CONTENT,
    exercises: [{ name: 'E', description: 'd', questions: [{ num: 1, type: 'fill', text: 'a', answer: '1' }, { num: 1, type: 'fill', text: 'b', answer: '2' }] }],
  };

  // Two rows with num 1 would both write to answers[1] in a learner's saved scores,
  // so one answer would silently overwrite the other.
  assert.throws(() => normalizeTopic(META, broken), /duplicate num 1/);
});

test('ingestion refuses a lesson id that is not its position + 1', () => {
  const broken = { ...CONTENT, tenses: [{ id: 5, name: 'x', usage: 'u', formula: {}, signals: 's' }] };
  assert.throws(() => normalizeTopic(META, broken), /positions must be 1-based and contiguous/);
});

test('ingestion refuses a question with no answer', () => {
  const broken = {
    ...CONTENT,
    exercises: [{ name: 'E', description: 'd', questions: [{ num: 1, type: 'fill', text: 'a' }] }],
  };
  assert.throws(() => normalizeTopic(META, broken), /has no answer/);
});

test('toTopicViewModel keeps the camelCase keys Dashboard already reads', () => {
  const view = toTopicViewModel(normalizeTopic(META, CONTENT).topic);

  assert.deepEqual(view, {
    id: 'demo-topic',
    number: 7,
    name: 'Demo',
    englishName: 'Demo',
    category: 'Test',
    description: 'A topic',
    icon: '🧪',
    exercisesCount: 2,
  });
});

test('real content survives ingestion at full size', async () => {
  // The headline number of Phase 1: every lesson, exercise and question in the
  // bundle reaches the database. A dropped row here is silent content loss in a
  // product that already advertises 271 exercises it does not have.
  const byTopicId = new Map();
  for (const entry of contentModules) {
    byTopicId.set(entry.topicId, await entry.load());
  }

  assert.deepEqual([...byTopicId.keys()].sort(), ['chuyen-de-thi-dong-tu', 'su-phoi-thi']);

  const tenses = normalizeTopic(grammarTopics.find((t) => t.id === 'chuyen-de-thi-dong-tu'), byTopicId.get('chuyen-de-thi-dong-tu'));
  assert.equal(tenses.lessons.length, 12);
  assert.equal(tenses.exercises.length, 21);
  assert.equal(tenses.questions.length, 500);

  const sequence = normalizeTopic(grammarTopics.find((t) => t.id === 'su-phoi-thi'), byTopicId.get('su-phoi-thi'));
  assert.equal(sequence.lessons.length, 9);
  assert.equal(sequence.exercises.length, 3);
  assert.equal(sequence.questions.length, 120);

  // 24 reachable exercises is the figure the roadmap measures against 271 advertised.
  assert.equal(tenses.exercises.length + sequence.exercises.length, 24);
  assert.equal(tenses.questions.length + sequence.questions.length, 620);

  // Round trip against the untouched source, both topics.
  assert.deepEqual(denormalizeTopic('chuyen-de-thi-dong-tu', tenses.lessons, tenses.exercises, tenses.questions), tensesData);
  assert.deepEqual(denormalizeTopic('su-phoi-thi', sequence.lessons, sequence.exercises, sequence.questions), sequenceOfTensesData);
});

test('every catalogued topic ingests and keeps its identity', async () => {
  const authored = new Map();
  for (const entry of contentModules) {
    authored.set(entry.topicId, await entry.load());
  }

  assert.equal(grammarTopics.length, 30);
  for (const meta of grammarTopics) {
    const rows = normalizeTopic(meta, authored.get(meta.id) ?? null);
    assert.equal(rows.topic.id, meta.id);
    assert.equal(rows.topic.number, meta.number);
    assert.equal(toTopicViewModel(rows.topic).name, meta.name);
    // 28 topics are declared with an exercisesCount nobody authored yet.
    assert.equal(rows.topic.exercise_count, authored.has(meta.id) ? meta.exercisesCount : 0);
  }
});

// --- The committed seed artifact ------------------------------------------------
// CI has no Postgres, so these checks read supabase/seed/content.sql as data: the
// payload must parse, must be internally referentially sound, and must agree with
// what normalizeTopic produces from src/data/ right now.

async function readSeedSql() {
  return readFile(new URL('../supabase/seed/content.sql', import.meta.url), 'utf8');
}

function extractPayloads(sql) {
  const blocks = [];
  const pattern = /\$seed\$([\s\S]*?)\$seed\$::jsonb/g;
  let match = pattern.exec(sql);
  while (match) {
    blocks.push(JSON.parse(match[1]));
    match = pattern.exec(sql);
  }
  return blocks;
}

test('the seed artifact is a transaction that deletes then inserts, in dependency order', async () => {
  const sql = await readSeedSql();

  assert.match(sql, /^begin;$/m);
  assert.match(sql, /^commit;$/m);
  assert.ok(sql.indexOf('delete from public.topics') < sql.indexOf('insert into public.topics'), 'delete must precede insert');

  const order = ['topics', 'lessons', 'exercises', 'exercise_questions'].map((t) => sql.indexOf(`insert into public.${t} (`));
  assert.deepEqual([...order].sort((a, b) => a - b), order, 'parents must be inserted before their children');
});

test('the seed artifact payload matches src/data/ and is referentially sound', async () => {
  const sql = await readSeedSql();
  const [topicIds, topics, lessons, exercises, questions] = extractPayloads(sql);

  const rows = { topics: [], lessons: [], exercises: [], exercise_questions: [] };
  for (const meta of grammarTopics) {
    const authored = contentModules.find((entry) => entry.topicId === meta.id);
    const normalized = normalizeTopic(meta, null);
    if (authored) {
      const rebuilt = normalizeTopic(meta, await authored.load());
      rows.topics.push(rebuilt.topic);
      rows.lessons.push(...rebuilt.lessons);
      rows.exercises.push(...rebuilt.exercises);
      rows.exercise_questions.push(...rebuilt.questions);
    } else {
      rows.topics.push(normalized.topic);
    }
  }

  assert.deepEqual(topicIds.sort(), rows.topics.map((t) => t.id).sort());
  assert.deepEqual(topics, rows.topics);
  assert.deepEqual(lessons, rows.lessons);
  assert.deepEqual(exercises, rows.exercises);
  assert.deepEqual(questions, rows.exercise_questions);

  const knownTopics = new Set(rows.topics.map((t) => t.id));
  const knownExercises = new Set(rows.exercises.map((e) => e.id));
  for (const lesson of lessons) assert.ok(knownTopics.has(lesson.topic_id), `lesson ${lesson.id} points at a missing topic`);
  for (const exercise of exercises) assert.ok(knownTopics.has(exercise.topic_id), `exercise ${exercise.id} points at a missing topic`);
  for (const question of questions) assert.ok(knownExercises.has(question.exercise_id), `question ${question.id} points at a missing exercise`);

  assert.equal(new Set(topics.map((t) => t.id)).size, 30);
  assert.equal(new Set(questions.map((q) => q.id)).size, 620);
});
