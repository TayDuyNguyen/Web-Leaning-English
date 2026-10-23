import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { inflateRawSync } from 'node:zlib';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { loadRoadmap, validateRoadmap, LEVEL_ORDER } from '../scripts/roadmap-data.mjs';
import { renderWorkbook, toSerial } from '../scripts/build-roadmap.mjs';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const WORKBOOK = join(ROOT, 'English_Roadmap_From_Zero.xlsx');

const data = await loadRoadmap();
const { buffer, sheetNames } = renderWorkbook(data);

// ---------- data ----------

test('the roadmap data has no broken reference', () => {
  assert.deepEqual(validateRoadmap(data), []);
});

test('the plan is exactly 180 consecutive days from the configured start', () => {
  assert.equal(data.plan.length, data.config.dayCount);
  assert.equal(data.plan[0].date, data.config.startDate);
  for (let i = 1; i < data.plan.length; i += 1) {
    const gap = new Date(data.plan[i].date) - new Date(data.plan[i - 1].date);
    assert.equal(gap, 86_400_000, `day ${data.plan[i].day} is not one day after day ${data.plan[i - 1].day}`);
  }
  assert.equal(data.plan.at(-1).day, 180);
});

test('levels change on the day boundaries the original workbook used', () => {
  const firstOf = (level) => data.plan.find((row) => row.level === level).day;
  const lastOf = (level) => [...data.plan].reverse().find((row) => row.level === level).day;
  assert.deepEqual([firstOf('A0'), lastOf('A0')], [1, 28]);
  assert.deepEqual([firstOf('A1'), lastOf('A1')], [29, 70]);
  assert.deepEqual([firstOf('A2'), lastOf('A2')], [71, 112]);
  assert.deepEqual([firstOf('B1'), lastOf('B1')], [113, 180]);
});

// The original DAILY_PLAN had 26 seven-day blocks; the count is what makes the weekly
// test days and the four level exit tests possible.
test('every week ends in a test day and each level ends in an exit test', () => {
  assert.equal(data.weeks.length, 26);
  for (const week of data.weeks) {
    const lastDay = data.plan[week.dayTo - 1];
    assert.ok(lastDay.test, `week ${week.week} has no test on day ${week.dayTo}`);
    assert.equal(lastDay.lesson, 'Weekly review');
  }
  assert.deepEqual(data.stats.exitTests, ['A0@tuần 4', 'A1@tuần 10', 'A2@tuần 16', 'B1@tuần 26']);
});

test('every curriculum topic is scheduled, so no topic is taught zero times', () => {
  const scheduled = new Set(data.plan.map((row) => row.curriculumId).filter(Boolean));
  for (const topic of data.curriculum) {
    assert.ok(scheduled.has(topic.id), `${topic.id} never appears in the 180-day plan`);
  }
  assert.equal(scheduled.size, data.curriculum.length);
});

// The two grammar sheets in the original file both used G001…G004 for different points,
// so id collisions are the regression this rewrite exists to prevent.
test('grammar ids are unique and every point is used by a topic', () => {
  const ids = data.grammar.map((g) => g.id);
  assert.equal(new Set(ids).size, ids.length);
  const used = new Set(data.curriculum.flatMap((t) => t.grammar));
  for (const id of ids) assert.ok(used.has(id), `${id} is defined but no topic teaches it`);
});

test('no word is taught twice and nothing outside A0-B1 leaks in', () => {
  const seen = new Set();
  for (const row of data.plan) {
    for (const id of row.wordIds) {
      assert.ok(!seen.has(id), `word ${id} is scheduled twice`);
      seen.add(id);
    }
    assert.ok(LEVEL_ORDER.includes(row.level));
  }
  for (const word of data.pool) {
    assert.ok(LEVEL_ORDER.includes(word.level), `${word.id} has level ${word.level}`);
    assert.ok(seen.has(word.id), `${word.id} is in the pool but never scheduled`);
  }
});

// A day that lost words to the shortage must say so, or the learner silently gets a
// blank day that looks like their own fault.
test('days that ran out of vocabulary say how many words are missing', () => {
  for (const row of data.plan.filter((r) => r.wordsShort > 0)) {
    assert.equal(row.wordIds.length + row.wordsShort, data.weeks.find((w) => w.week === row.week).wordsPerDay);
  }
  assert.ok(data.stats.wordsNeeded > 0, 'expected the vocabulary pool to be short of 180 days');
});

test('review weeks add no new words', () => {
  for (const week of data.weeks.filter((w) => w.topics.length === 0)) {
    for (const row of data.plan.slice(week.dayFrom - 1, week.dayTo)) assert.equal(row.wordIds.length, 0);
  }
});

// ---------- workbook ----------

function readZip(buf) {
  const eocd = buf.lastIndexOf(Buffer.from([0x50, 0x4b, 0x05, 0x06]));
  const count = buf.readUInt16LE(eocd + 10);
  let off = buf.readUInt32LE(eocd + 16);
  const files = new Map();
  for (let i = 0; i < count; i += 1) {
    assert.equal(buf.readUInt32LE(off), 0x02014b50, 'central directory signature');
    const method = buf.readUInt16LE(off + 10);
    const compressedSize = buf.readUInt32LE(off + 20);
    const nameLen = buf.readUInt16LE(off + 28);
    const localOff = buf.readUInt32LE(off + 42);
    const name = buf.subarray(off + 46, off + 46 + nameLen).toString('utf8');
    const dataStart = localOff + 30 + buf.readUInt16LE(localOff + 26) + buf.readUInt16LE(localOff + 28);
    const raw = buf.subarray(dataStart, dataStart + compressedSize);
    files.set(name, method === 8 ? inflateRawSync(raw) : raw);
    off += 46 + nameLen + buf.readUInt16LE(off + 30) + buf.readUInt16LE(off + 32);
  }
  return files;
}

const zip = readZip(buffer);

test('the workbook is rebuilt byte-identical, so npm run roadmap:check means something', () => {
  assert.equal(buffer.equals(readFileSync(WORKBOOK)), true, 'English_Roadmap_From_Zero.xlsx is stale — run npm run roadmap');
});

test('the workbook holds the 10 sheets in order and opens on TODAY', () => {
  assert.deepEqual(sheetNames, ['README', 'TODAY', 'PLAN_180', 'VOCAB', 'DUE', 'GRAMMAR', 'CURRICULUM', 'EXERCISES', 'RESOURCES', 'PROGRESS']);
  const workbook = zip.get('xl/workbook.xml').toString('utf8');
  const names = [...workbook.matchAll(/<sheet name="([^"]+)"/g)].map((m) => m[1]);
  assert.deepEqual(names, sheetNames);
  assert.match(workbook, /fullCalcOnLoad="1"/);
});

test('the duplicated sheets of the old file are gone', () => {
  // The old workbook tracked words twice, grammar twice, resources twice, and kept a
  // 70-week plan next to a 180-day one.
  for (const gone of ['VOCABULARY', 'VOCAB_MASTER', 'GRAMMAR_MASTER', 'GRAMMAR_TRACKER', 'RESOURCE_MAP', 'WEEKLY_PLAN', 'SPACED_REPETITION', 'REVIEW_QUEUE', 'DASHBOARD', 'ROADMAP', 'CEFR_ROADMAP']) {
    assert.ok(!sheetNames.includes(gone), `${gone} came back`);
  }
});

test('each sheet has the rows its data says', () => {
  const rowCount = (n) => (zip.get(`xl/worksheets/sheet${n}.xml`).toString('utf8').match(/<row /g) || []).length;
  assert.equal(rowCount(3), data.plan.length + 1, 'PLAN_180 = header + 180 days');
  assert.equal(rowCount(10), data.plan.length + 1, 'PROGRESS = header + 180 days');
  assert.equal(rowCount(4), data.pool.length + 1, 'VOCAB');
  assert.equal(rowCount(5), data.pool.length + 1, 'DUE');
  assert.equal(rowCount(6), data.grammar.length + 1, 'GRAMMAR');
  assert.equal(rowCount(7), data.curriculum.length + 1, 'CURRICULUM');
  assert.equal(rowCount(8), data.exercises.length + 1, 'EXERCISES');
});

// Excel stores dates as serials with 1970-01-01 at 25569. A wrong sign puts the whole
// schedule 140 years early, and MATCH(TODAY(), …) then finds nothing without any error.
test('dates are written as real Excel serials', () => {
  assert.equal(toSerial('1970-01-01'), 25_569);
  assert.equal(toSerial('2000-01-01'), 36_526);
  const plan = zip.get('xl/worksheets/sheet3.xml').toString('utf8');
  assert.match(plan, new RegExp(`<c r="B2" s="2"><v>${toSerial(data.plan[0].date)}</v></c>`));
  assert.match(plan, new RegExp(`<c r="B181" s="2"><v>${toSerial(data.plan.at(-1).date)}</v></c>`));
});

// A blank pulled through INDEX shows up as 0 in Excel, and a day with no words looks
// "ready" unless it says why — both are silence the learner cannot tell apart from
// their own fault, so both are asserted here.
test('days without new words or a test say so in words', () => {
  const plan = zip.get('xl/worksheets/sheet3.xml').toString('utf8');
  const reviewQuiet = data.plan.filter((r) => r.lesson === 'Weekly review' && r.wordsShort === 0).length;
  assert.equal((plan.match(/CHỜ NẠP TỪ: thiếu /g) || []).length, data.stats.shortDays);
  assert.equal((plan.match(/ngày ôn, không thêm từ/g) || []).length, reviewQuiet);
  assert.equal((plan.match(/<c r="R\d+" s="3" t="inlineStr"><is><t xml:space="preserve">—<\/t>/g) || []).length, data.plan.length - data.stats.testDays);
});

// The zip's DOS timestamp must be the same on the UTC CI runner and on a UTC+7 laptop,
// otherwise roadmap:check fails because of the machine's timezone instead of the data.
test('the archive stamps UTC, not the machine timezone', () => {
  const expectedTime = (9 << 11) | 0; // 09:00:00 from config.startDate
  const expectedDay = ((2026 - 1980) << 9) | (10 << 5) | 5;
  assert.equal(buffer.readUInt16LE(10), expectedTime);
  assert.equal(buffer.readUInt16LE(12), expectedDay);
});

// Excel rejects a sheet whose cells are out of order, and the generator writes cells by
// array index, so an off-by-one here would break the file silently.
test('sheet cells are in ascending order and nothing is undefined', () => {
  for (const [name, xml] of zip) {
    const text = xml.toString('utf8');
    if (!name.startsWith('xl/worksheets/')) continue;
    assert.ok(!/undefined|NaN/.test(text), `${name} contains undefined or NaN`);
    let previousRow = 0;
    for (const row of text.matchAll(/<row r="(\d+)">((?:.|\n)*?)<\/row>/g)) {
      const r = Number(row[1]);
      assert.ok(r > previousRow, `${name}: row ${r} is not after ${previousRow}`);
      previousRow = r;
      let previousCol = 0;
      for (const c of row[2].matchAll(/<c r="([A-Z]+)\d+"/g)) {
        let col = 0;
        for (const ch of c[1]) col = col * 26 + ch.charCodeAt(0) - 64;
        assert.ok(col > previousCol, `${name} row ${r}: cell ${c[1]}${r} is out of order`);
        previousCol = col;
      }
    }
  }
});

test('the today sheet answers "what do I study today" from formulas only', () => {
  const today = zip.get('xl/worksheets/sheet2.xml').toString('utf8');
  assert.match(today, /<f>TODAY\(\)<\/f>/);
  assert.match(today, /MATCH\(TODAY\(\),PLAN_180!\$B\$2:\$B\$181,0\)/);
  assert.match(today, /INDEX\(PLAN_180!\$H\$2:\$H\$181/);
  assert.match(today, /INDEX\(VOCAB!\$E\$2:\$E\$1500/);
  assert.match(today, /COUNTIF\(DUE!\$I\$2:\$I\$1500,&quot;ĐẾN HẠN&quot;\)/);
});

test('only the input columns are editable, everything else is generated', () => {
  const progress = zip.get('xl/worksheets/sheet10.xml').toString('utf8');
  const plan = zip.get('xl/worksheets/sheet3.xml').toString('utf8');
  const due = zip.get('xl/worksheets/sheet5.xml').toString('utf8');
  // PROGRESS pulls 4 columns from PLAN and computes Overall: 5 formulas per day, and
  // every other cell of that sheet is a yellow input.
  assert.equal((progress.match(/<f>/g) || []).length, data.plan.length * 5);
  // PLAN_180 is generated data; its only formula is the status mirror of PROGRESS.
  assert.equal((plan.match(/<f>/g) || []).length, data.plan.length);
  assert.equal((due.match(/<f>/g) || []).length, data.pool.length * 6, 'DUE: 3 lookups + interval + status + rank');
});
