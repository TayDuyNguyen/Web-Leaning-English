// Generates supabase/seed/content.sql from the bundled content in src/data/
// (roadmap M3). Re-run after editing any file under src/data/:
//
//     npm run seed:content     regenerate + report
//     npm run seed:check       fail if the committed artifact is stale (CI)
//
// The artifact is committed on purpose: it is the reviewable diff of what content
// enters the database, and applying it should not require running node.
//
// Deleting-then-inserting per topic (rather than upserting) is what makes this
// convergent — a question removed from src/data/ disappears from the database on the
// next apply instead of lingering as a row nothing authored. The FKs cascade, so one
// delete clears the topic's lessons, exercises and questions with it. User progress
// survives: topic_scores stores topic_id as plain text with no FK to here.

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { grammarTopics } from '../src/data/topics.js';
import { contentModules } from '../src/data/content-modules.js';
import { normalizeTopic } from '../src/lib/contentSchema.js';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const OUTPUT = join(ROOT, 'supabase', 'seed', 'content.sql');
const DOLLAR_TAG = '$seed$';

// Column order here is both the record definition and the insert list, so a new
// column lands in the same position on both sides of the statement.
const TABLES = [
  {
    name: 'topics',
    columns: 'id text, number integer, name text, english_name text, category text, description text, icon text, exercise_count integer',
  },
  {
    name: 'lessons',
    columns: 'id text, topic_id text, position integer, title text, usage_text text, formula jsonb, signals_text text',
  },
  {
    name: 'exercises',
    columns: 'id text, topic_id text, position integer, title text, description text',
  },
  {
    name: 'exercise_questions',
    columns:
      'id text, exercise_id text, position integer, question_number integer, question_type text, question_text text, answer text, explanation text, options jsonb',
  },
];

function namesOf(columns) {
  return columns.split(', ').map((entry) => entry.split(' ')[0]);
}

// Loads every authored topic. A content module that fails to import, or a topic id in
// content-modules.js that is not in the catalogue, is a hard error: a silently
// skipped topic would just look like unauthored content in the database.
async function collectRows() {
  const known = new Set(grammarTopics.map((topic) => topic.id));
  const byTopicId = new Map();

  for (const entry of contentModules) {
    if (!known.has(entry.topicId)) {
      throw new Error(`content-modules.js names topic "${entry.topicId}", which src/data/topics.js does not declare`);
    }
    if (byTopicId.has(entry.topicId)) {
      throw new Error(`content-modules.js lists topic "${entry.topicId}" twice`);
    }
    byTopicId.set(entry.topicId, await entry.load());
  }

  const rows = { topics: [], lessons: [], exercises: [], exercise_questions: [] };
  const seen = new Set();
  for (const meta of grammarTopics) {
    if (seen.has(meta.id)) {
      throw new Error(`src/data/topics.js declares topic id "${meta.id}" twice; the primary key would collide`);
    }
    seen.add(meta.id);
    const normalized = normalizeTopic(meta, byTopicId.get(meta.id) ?? null);
    rows.topics.push(normalized.topic);
    rows.lessons.push(...normalized.lessons);
    rows.exercises.push(...normalized.exercises);
    rows.exercise_questions.push(...normalized.questions);
  }
  return rows;
}

// Reports authored-data defects instead of repairing them: Phase 1 moves content, it
// does not quietly rewrite what a learner sees. `npm run seed:check` stays green on
// these so an existing bug cannot block an unrelated change.
function reportQuality(questions) {
  const choice = questions.filter((row) => row.question_type === 'choice');
  const orphaned = choice.filter((row) => {
    const letters = Object.keys(row.options || {});
    return letters.length >= 2 && !letters.includes(row.answer);
  });
  const thin = choice.filter((row) => Object.keys(row.options || {}).length < 2);
  const mislabeled = questions.filter((row) => row.question_type !== 'choice' && row.options);

  console.log(`\nContent quality in the choice engine (${choice.length} choice, ${questions.length - choice.length} fill)`);
  console.log(`  answer not among its options: ${orphaned.length}`);
  console.log(`  fewer than two options:       ${thin.length}`);
  console.log(`  options on a non-choice row:  ${mislabeled.length}`);
  if (orphaned.length + thin.length + mislabeled.length > 0) {
    console.log('  -> those questions cannot be answered correctly in the UI. Pre-existing content');
    console.log('     defects, not migration damage; see docs/product-roadmap.md blocker 1.');
  }

  return { orphaned: orphaned.length, thin: thin.length, mislabeled: mislabeled.length };
}

function payloadOf(rows) {
  // One record per line keeps a 600-row artifact diffable; dollar quoting keeps it
  // free of escaping rules, since content carries apostrophes, quotes and newlines.
  const payload = `[\n${rows.map((row) => JSON.stringify(row)).join(',\n')}\n]`;
  if (payload.includes(DOLLAR_TAG)) {
    throw new Error(`content contains the "${DOLLAR_TAG}" dollar-quote tag; pick another tag before seeding`);
  }
  return `\n${payload}\n`;
}

function renderTable(table, rows) {
  if (rows.length === 0) return `-- public.${table.name}: no rows`;
  return [
    `insert into public.${table.name} (${namesOf(table.columns).join(', ')})`,
    `select x.* from jsonb_to_recordset(${DOLLAR_TAG}${payloadOf(rows)}${DOLLAR_TAG}::jsonb)`,
    `  as x(${table.columns});`,
  ].join('\n');
}

function renderSql(rows) {
  // Topic ids travel as JSON, never as SQL literals, because one of them
  // ("từ-vựng-toeic-chu-de-kinh-doanh") is not ASCII and the seeder must not have an
  // opinion about how that gets quoted.
  const deleteIds = payloadOf(rows.topics.map((topic) => topic.id));
  const header = [
    '-- ---------------------------------------------------------------------------',
    '-- M3 — learning content seed. GENERATED by scripts/seed-content.mjs.',
    '--',
    '-- Do not edit by hand: change src/data/ and run `npm run seed:content`. CI runs',
    '-- `npm run seed:check`, which fails when this file no longer matches its source.',
    '--',
    '-- Source of truth:',
    ...contentModules.map((entry) => `--   topic "${entry.topicId}" <- src/data/${entry.topicId}.js`),
    '--   catalogue metadata                           <- src/data/topics.js',
    '--',
    '-- Idempotent and convergent: re-applying is safe, and content deleted from',
    '-- src/data/ disappears from the database rather than lingering.',
    '-- ---------------------------------------------------------------------------',
    '',
    'begin;',
    '',
    '-- Cascade: removes each topic\'s lessons, exercises and questions with it.',
    '-- Scoped to this payload: a topic deleted from src/data/ is an authoring decision',
    '-- for Phase 7, not something a content seed should silently drop.',
    `delete from public.topics`,
    `where id in (select t.id from jsonb_array_elements_text(${DOLLAR_TAG}${deleteIds}${DOLLAR_TAG}::jsonb) as t(id));`,
    '',
  ].join('\n');

  const body = TABLES.map((table) => renderTable(table, rows[table.name])).join('\n\n');

  return `${header}\n${body}\n\ncommit;\n`;
}

async function main() {
  const args = process.argv.slice(2);
  const check = args.includes('--check');
  const toStdout = args.includes('--stdout');

  const rows = await collectRows();
  reportQuality(rows.exercise_questions);

  const sql = renderSql(rows);

  console.log('\nRows to seed');
  for (const table of TABLES) {
    console.log(`  public.${table.name.padEnd(19)} ${String(rows[table.name].length).padStart(5)}`);
  }

  if (toStdout) {
    process.stdout.write(sql);
    return;
  }

  if (check) {
    let existing = null;
    try {
      existing = await readFile(OUTPUT, 'utf8');
    } catch {
      // Fall through to the missing-artifact error below.
    }
    if (existing === null) {
      console.error('\nseed:check failed — supabase/seed/content.sql does not exist. Run `npm run seed:content`.');
      process.exit(1);
    }
    if (existing !== sql) {
      console.error(
        '\nseed:check failed — supabase/seed/content.sql no longer matches src/data/.' +
          '\n  Run `npm run seed:content` and commit the regenerated file.\n'
      );
      process.exit(1);
    }
    console.log('\nseed:check ok — supabase/seed/content.sql matches src/data/.\n');
    return;
  }

  await mkdir(dirname(OUTPUT), { recursive: true });
  await writeFile(OUTPUT, sql, 'utf8');
  console.log(`\nwrote ${sql.length.toLocaleString('en-US')} bytes to supabase/seed/content.sql`);
  console.log('Apply after M1 + M2: paste into the Supabase SQL editor, or `supabase db push`.\n');
}

main().catch((error) => {
  console.error(`\nseed failed: ${error.message}\n`);
  process.exit(1);
});
