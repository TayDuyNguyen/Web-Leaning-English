// Builds the 180-day plan the roadmap workbook is generated from.
//
// One source of truth: data/roadmap/*.json hold the content, this file turns them
// into 180 dated rows, and scripts/build-roadmap.mjs renders those rows into the
// workbook. Nothing in the .xlsx is meant to be edited as data — edit the JSON and
// re-run `npm run roadmap`.
//
// The vocabulary pool is deliberately merged with src/content/vocabulary/, because
// the same word taught in a game and tracked in the workbook must be one record,
// not two that drift apart.

import { readFile, readdir } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

export const LEVEL_ORDER = ['A0', 'A1', 'A2', 'B1'];

// The seven-day rhythm the original DAILY_PLAN sheet already used; day 7 is always
// review plus the weekly test, which is what makes the level exit tests possible.
export const LESSONS = Object.freeze([
  'New concept',
  'Guided practice',
  'Listening + shadowing',
  'Speaking drill',
  'Reading + vocabulary',
  'Writing + correction',
  'Weekly review',
]);

async function readJson(rel) {
  return JSON.parse(await readFile(join(ROOT, rel), 'utf8'));
}

async function readAppVocabulary() {
  const base = join(ROOT, 'src', 'content', 'vocabulary');
  const items = [];
  for (const level of await readdir(base)) {
    for (const file of (await readdir(join(base, level))).sort()) {
      if (!file.endsWith('.json')) continue;
      const raw = JSON.parse(await readFile(join(base, level, file), 'utf8'));
      for (const item of raw) {
        items.push({
          id: item.id,
          word: item.word,
          meaning_vi: item.meaning_vi,
          ipa: item.ipa ?? '',
          level: item.level,
          category: item.category ?? `${level}-ungrouped`,
          curriculum: item.curriculum ?? null,
          example: item.example ?? '',
          collocations: item.collocations ?? [],
          source: `src/content/vocabulary/${level}/${file}`,
        });
      }
    }
  }
  return items;
}

export async function loadRoadmap() {
  const [config, weeks, curriculum, grammar, resources, exercises, a0, curated] = await Promise.all([
    readJson('data/roadmap/config.json'),
    readJson('data/roadmap/weeks.json'),
    readJson('data/roadmap/curriculum.json'),
    readJson('data/roadmap/grammar.json'),
    readJson('data/roadmap/resources.json'),
    readJson('data/roadmap/exercises.json'),
    readJson('data/roadmap/vocabulary/a0.json'),
    readJson('data/roadmap/vocabulary/curated.json'),
  ]);

  const roadmapWords = [...a0, ...curated].map((item) => ({ ...item, source: 'data/roadmap' }));
  const appWords = await readAppVocabulary();

  const words = [];
  const droppedDuplicates = [];
  for (const item of [...roadmapWords, ...appWords]) {
    const key = item.word.toLowerCase();
    const clash = words.find((w) => w.word.toLowerCase() === key);
    if (clash) {
      droppedDuplicates.push({ word: item.word, kept: clash.id, dropped: item.id });
      continue;
    }
    words.push(item);
  }

  const topicsById = new Map(curriculum.map((t) => [t.id, t]));
  const pool = words
    .filter((w) => LEVEL_ORDER.includes(w.level))
    .sort((a, b) => {
      const byLevel = LEVEL_ORDER.indexOf(a.level) - LEVEL_ORDER.indexOf(b.level);
      if (byLevel !== 0) return byLevel;
      return String(a.curriculum ?? 'zz').localeCompare(String(b.curriculum ?? 'zz')) || a.id.localeCompare(b.id);
    });

  const plan = buildPlan({ config, weeks, topicsById, pool, exercises });
  const stats = summarize({ config, weeks, curriculum, grammar, words, droppedDuplicates, plan, pool });
  return { config, weeks, curriculum, grammar, resources, exercises, words, pool, droppedDuplicates, plan, stats };
}

function buildPlan({ config, weeks, topicsById, pool, exercises }) {
  const start = new Date(`${config.startDate}T00:00:00Z`);
  const cursors = new Map(LEVEL_ORDER.map((level) => [level, pool.filter((w) => w.level === level)]));
  const rows = [];

  for (const week of weeks) {
    for (let day = week.dayFrom; day <= week.dayTo; day += 1) {
      const dayInWeek = day - week.dayFrom;
      const isReviewDay = dayInWeek === 6 || day === config.dayCount;
      const topics = week.topics.map((id) => topicsById.get(id));
      const topic = topics.length === 0 || isReviewDay ? null : topics[Math.min(Math.floor((dayInWeek * topics.length) / 6), topics.length - 1)];
      const remaining = cursors.get(week.level) ?? [];
      const wanted = isReviewDay ? 0 : week.wordsPerDay;
      const todaysWords = remaining.slice(0, wanted);
      if (remaining.length > 0) cursors.set(week.level, remaining.slice(todaysWords.length));

      // A review day reuses every exercise the week touched; a study day only the ones
      // written for its own topic, so a test never asks about material not yet shown.
      const exerciseIds = isReviewDay
        ? exercises.filter((e) => week.topics.includes(e.curriculum)).map((e) => e.id)
        : exercises.filter((e) => topic && e.curriculum === topic.id).map((e) => e.id);

      rows.push({
        day,
        sheetRow: rows.length + 2,
        date: new Date(start.getTime() + (day - 1) * 86_400_000).toISOString().slice(0, 10),
        week: week.week,
        level: week.level,
        focus: week.focus,
        lesson: isReviewDay ? LESSONS[6] : LESSONS[dayInWeek],
        curriculumId: topic ? topic.id : '',
        topic: topic ? topic.topic : isReviewDay ? `Ôn tổng hợp tuần ${week.week}` : '—',
        grammarIds: topic ? [...topic.grammar] : [],
        wordIds: todaysWords.map((w) => w.id),
        wordsShort: Math.max(0, wanted - todaysWords.length),
        skills: topic
          ? { listening: topic.listening, speaking: topic.speaking, reading: topic.reading, writing: topic.writing }
          : { listening: 'Ôn theo sheet DUE', speaking: 'Nói lại 5 câu của tuần', reading: 'Đọc lại văn bản tuần', writing: 'Viết lại đoạn đã sửa' },
        exerciseIds,
        minutes: config.minutesPerDay,
        test: isReviewDay ? (week.exitTest ? `Test chốt ${week.exitTest} (mục tiêu ${config.exitRule[week.exitTest]})` : `Test tuần ${week.week}`) : '',
      });
    }
  }
  return rows;
}

function summarize({ config, weeks, curriculum, grammar, words, droppedDuplicates, plan, pool }) {
  const byLevel = (list) => LEVEL_ORDER.map((level) => `${level} ${list.filter((item) => item.level === level).length}`).join(' · ');
  const shortDays = plan.filter((row) => row.wordsShort > 0);
  return {
    days: plan.length,
    weeks: weeks.length,
    curriculumTopics: curriculum.length,
    grammarPoints: grammar.length,
    words: { total: words.length, inPool: pool.length, byLevel: byLevel(words) },
    duplicatesDropped: droppedDuplicates.length,
    testDays: plan.filter((row) => row.test).length,
    reviewWeeks: weeks.filter((w) => w.topics.length === 0).length,
    exitTests: weeks.filter((w) => w.exitTest).map((w) => `${w.exitTest}@tuần ${w.week}`),
    coveredDay: plan.filter((row) => row.wordIds.length > 0).slice(-1)[0]?.day ?? 0,
    shortDays: shortDays.length,
    wordsNeeded: shortDays.reduce((sum, row) => sum + row.wordsShort, 0),
    firstShortDay: shortDays[0]?.day ?? null,
    startDate: config.startDate,
    endDate: plan[plan.length - 1]?.date ?? '',
  };
}

export function validateRoadmap({ config, weeks, curriculum, grammar, resources, exercises, words, plan }) {
  const problems = [];
  const push = (message) => problems.push(message);

  const weekSpan = weeks.reduce((sum, w) => sum + (w.dayTo - w.dayFrom + 1), 0);
  if (weekSpan !== config.dayCount) push(`weeks cover ${weekSpan} days but config.dayCount is ${config.dayCount}`);
  if (plan.length !== config.dayCount) push(`plan has ${plan.length} rows, expected ${config.dayCount}`);

  let cursor = 1;
  for (const week of weeks) {
    if (week.dayFrom !== cursor) push(`week ${week.week} starts at day ${week.dayFrom}, expected ${cursor}`);
    cursor = week.dayTo + 1;
    for (const id of week.topics) {
      if (!curriculum.some((t) => t.id === id)) push(`week ${week.week} references unknown topic "${id}"`);
      const topic = curriculum.find((t) => t.id === id);
      if (topic && topic.level !== week.level) push(`week ${week.week} (${week.level}) uses topic "${id}" of level ${topic.level}`);
    }
  }

  const grammarIds = new Set();
  for (const point of grammar) {
    if (grammarIds.has(point.id)) push(`duplicate grammar id "${point.id}"`);
    grammarIds.add(point.id);
    if (!LEVEL_ORDER.includes(point.level)) push(`grammar ${point.id}: level "${point.level}" is outside ${LEVEL_ORDER.join('/')}`);
  }
  for (const topic of curriculum) {
    if (!topic.id.startsWith(`${topic.level}-`)) push(`topic ${topic.id}: id prefix does not match its level "${topic.level}"`);
    for (const id of topic.grammar) if (!grammarIds.has(id)) push(`topic ${topic.id} references unknown grammar "${id}"`);
  }

  const seenIds = new Set();
  const seenWords = new Set();
  for (const word of words) {
    if (seenIds.has(word.id)) push(`duplicate word id "${word.id}"`);
    seenIds.add(word.id);
    const key = word.word.toLowerCase();
    if (seenWords.has(key)) push(`word "${word.word}" appears twice in the merged pool`);
    seenWords.add(key);
    if (!LEVEL_ORDER.includes(word.level)) push(`word ${word.id}: level "${word.level}" is outside ${LEVEL_ORDER.join('/')}`);
    if (!word.meaning_vi) push(`word ${word.id}: missing Vietnamese meaning`);
    if (word.level === 'A0' && !word.ipa) push(`word ${word.id}: A0 words must carry IPA`);
    if (word.example && !word.example.toLowerCase().includes(key)) push(`word ${word.id}: example does not contain "${word.word}"`);
    if (word.curriculum && !curriculum.some((t) => t.id === word.curriculum)) push(`word ${word.id} references unknown topic "${word.curriculum}"`);
  }

  for (const exercise of exercises) {
    if (exercise.curriculum && !curriculum.some((t) => t.id === exercise.curriculum)) {
      push(`exercise ${exercise.id} references unknown topic "${exercise.curriculum}"`);
    }
  }
  for (const source of resources) if (!source.url) push(`resource ${source.id}: missing URL`);

  const assigned = new Set();
  let previous;
  for (const row of plan) {
    if (previous && row.date !== nextIsoDate(previous)) push(`day ${row.day}: date ${row.date} does not follow ${previous}`);
    previous = row.date;
    if (row.curriculumId && !curriculum.some((t) => t.id === row.curriculumId)) push(`day ${row.day}: unknown topic "${row.curriculumId}"`);
    for (const id of row.wordIds) {
      if (assigned.has(id)) push(`word "${id}" is scheduled twice (day ${row.day})`);
      assigned.add(id);
      if (!words.some((w) => w.id === id)) push(`day ${row.day} references unknown word "${id}"`);
    }
  }
  return problems;
}

function nextIsoDate(iso) {
  return new Date(new Date(`${iso}T00:00:00Z`).getTime() + 86_400_000).toISOString().slice(0, 10);
}
