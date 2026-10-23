// Generates English_Roadmap_From_Zero.xlsx from data/roadmap/*.json plus the app's
// vocabulary pool (see scripts/roadmap-data.mjs).
//
//     npm run roadmap         regenerate the workbook + report
//     npm run roadmap:check   fail if the committed workbook no longer matches the data
//
// The workbook is a view, not a source. The 180 plan rows, the word pool and the
// grammar list are rewritten on every run, while the columns a learner actually fills
// (Completed, six skill scores, mastery, review dates) are always written EMPTY — that
// is what keeps regeneration from destroying real progress data, which lives only in
// Excel.
//
// OOXML is emitted by hand and zipped with node:zlib. No Excel library is installed on
// purpose: `npm install` here rewrites package-lock.json in a way that breaks `npm ci`
// on the Linux CI runner.

import { readFile, writeFile } from 'node:fs/promises';
import { deflateRawSync } from 'node:zlib';
import { fileURLToPath } from 'node:url';
import { join, resolve } from 'node:path';

import { loadRoadmap } from './roadmap-data.mjs';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const OUTPUT = join(ROOT, 'English_Roadmap_From_Zero.xlsx');

const NS_MAIN = 'http://schemas.openxmlformats.org/spreadsheetml/2006/main';
const NS_REL = 'http://schemas.openxmlformats.org/package/2006/relationships';
const NS_DOC_REL = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships';

const STYLE_HEADER = 1;
const STYLE_DATE = 2;
const STYLE_WRAP = 3;
const STYLE_INPUT = 4;

const VOCAB_RANGE = 1500;
const DUE_RANGE = 1500;
const GRAMMAR_RANGE = 60;
const WORD_SLOTS = 14;
const DUE_SLOTS = 12;

// ---------- cell helpers ----------

const txt = (v) => ({ text: v });
const wrap = (v) => ({ text: v, style: STYLE_WRAP });
const head = (v) => ({ text: v, style: STYLE_HEADER });
const n = (v) => ({ value: v });
const dt = (iso) => (iso ? { serial: toSerial(iso), style: STYLE_DATE } : {});
const blank = () => ({ text: '', style: STYLE_INPUT });
const fx = (formula, style) => ({ formula, style });

// XML 1.0 only allows TAB, LF, CR and code points from 0x20 up; one stray control byte
// anywhere makes the whole sheet unreadable, so it is dropped rather than encoded.
function stripControl(value) {
  let out = '';
  for (const ch of value) {
    const code = ch.codePointAt(0);
    if (code === 0x09 || code === 0x0a || code === 0x0d || code >= 0x20) out += ch;
  }
  return out;
}

function esc(value) {
  return stripControl(
    String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
  );
}

function colName(index) {
  let n = index;
  let out = '';
  while (n > 0) {
    const rem = (n - 1) % 26;
    out = String.fromCharCode(65 + rem) + out;
    n = Math.floor((n - 1) / 26);
  }
  return out;
}

// Excel serial dates count days from 1899-12-30, so the Unix epoch sits at serial
// 25569 (= 01/01/1970). Getting the sign wrong lands every date 140 years early and
// MATCH(TODAY(), …) silently finds nothing.
export function toSerial(iso) {
  return Math.round(Date.parse(`${iso}T00:00:00Z`) / 86_400_000) + 25_569;
}

function cellXml(ref, spec) {
  if (!spec) return '';
  const style = spec.style ? ` s="${spec.style}"` : '';
  if (spec.formula !== undefined) return `<c r="${ref}"${style}><f>${esc(spec.formula)}</f></c>`;
  if (spec.serial !== undefined && spec.serial !== null) return `<c r="${ref}"${style}><v>${spec.serial}</v></c>`;
  if (spec.text !== undefined && spec.text !== '') {
    return `<c r="${ref}"${style} t="inlineStr"><is><t xml:space="preserve">${esc(spec.text)}</t></is></c>`;
  }
  if (spec.value !== undefined && spec.value !== null) return `<c r="${ref}"${style}><v>${esc(spec.value)}</v></c>`;
  return style ? `<c r="${ref}"${style}/>` : '';
}

function sheetXml({ columns, rows, freeze = true, filter = null, validations = [] }) {
  const cols = columns.map((c, i) => `<col min="${i + 1}" max="${i + 1}" width="${c.width}" customWidth="1"/>`).join('');
  const body = rows
    .map((cells, index) => {
      const inner = cells.map((spec, i) => cellXml(`${colName(i + 1)}${index + 1}`, spec)).filter(Boolean).join('');
      return inner ? `<row r="${index + 1}">${inner}</row>` : '';
    })
    .join('');

  const pane = freeze ? `<pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/>` : '';
  const dv = validations.length
    ? `<dataValidations count="${validations.length}">${validations
        .map(
          (v) =>
            `<dataValidation type="list" allowBlank="1" showInputMessage="1" showErrorMessage="1" sqref="${v.sqref}">` +
            `<formula1>"${v.values.join(',')}"</formula1></dataValidation>`
        )
        .join('')}</dataValidations>`
    : '';

  return (
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>` +
    `<worksheet xmlns="${NS_MAIN}">` +
    `<sheetViews><sheetView workbookViewId="0">${pane}</sheetView></sheetViews>` +
    `<sheetFormatPr defaultRowHeight="15"/>` +
    `<cols>${cols}</cols>` +
    `<sheetData>${body}</sheetData>` +
    (filter ? `<autoFilter ref="${filter}"/>` : '') +
    dv +
    `<pageMargins left="0.4" right="0.4" top="0.6" bottom="0.6" header="0.3" footer="0.3"/>` +
    `</worksheet>`
  );
}

const STYLES_XML =
  `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>` +
  `<styleSheet xmlns="${NS_MAIN}">` +
  `<numFmts count="1"><numFmt numFmtId="20" formatCode="dd/mm/yyyy"/></numFmts>` +
  `<fonts count="2">` +
  `<font><sz val="11"/><color theme="1"/><name val="Calibri"/></font>` +
  `<font><b/><sz val="11"/><color rgb="FFFFFFFF"/><name val="Calibri"/></font>` +
  `</fonts>` +
  `<fills count="4">` +
  `<fill><patternFill patternType="none"/></fill>` +
  `<fill><patternFill patternType="gray125"/></fill>` +
  `<fill><patternFill patternType="solid"><fgColor rgb="FF222222"/><bgColor indexed="64"/></patternFill></fill>` +
  `<fill><patternFill patternType="solid"><fgColor rgb="FFFFF3CD"/><bgColor indexed="64"/></patternFill></fill>` +
  `</fills>` +
  `<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>` +
  `<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>` +
  `<cellXfs count="5">` +
  `<xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>` +
  `<xf numFmtId="0" fontId="1" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1"/>` +
  `<xf numFmtId="20" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/>` +
  `<xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0" applyAlignment="1"><alignment vertical="top" wrapText="1"/></xf>` +
  `<xf numFmtId="0" fontId="0" fillId="3" borderId="0" xfId="0" applyFill="1"/>` +
  `</cellXfs>` +
  `<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>` +
  `</styleSheet>`;

// ---------- sheets ----------

export function buildSheets(data) {
  const { config, curriculum, grammar, resources, exercises, plan, pool, stats } = data;
  const planLast = plan.length + 1;
  const grammarById = new Map(grammar.map((g) => [g.id, g]));
  const learnDate = new Map(plan.flatMap((row) => row.wordIds.map((id) => [id, row.date])));
  const grammarLabel = (ids) => (ids.length ? ids.map((id) => `${id} ${grammarById.get(id)?.topic ?? '?'}`).join('; ') : '—');

  const sheets = [];

  // ---- README ----
  const guide = [
    ['TODAY', 'Hôm nay học gì: ngày thứ mấy, chủ đề, từ mới, từ đến hạn ôn', 'Không gõ gì'],
    ['PLAN_180', '180 dòng lịch học, đã gắn ngày, chủ đề, ngữ pháp, danh sách từ', 'Không gõ gì'],
    ['PROGRESS', 'Sổ theo dõi mỗi ngày', 'Hoàn thành (Yes/No), 6 điểm kỹ năng, ghi chú'],
    ['VOCAB', 'Toàn bộ từ vựng của lộ trình', 'Không gõ gì'],
    ['DUE', 'Sổ ôn lặp lại (1-1-2-4-7-14 ngày)', 'Mastery 0-5, số lần đúng, ngày vừa ôn'],
    ['GRAMMAR', 'Ngữ pháp A0→B1', 'Mastery 0-5, ngày học gần nhất'],
    ['CURRICULUM', '35 chủ đề: mấy ngày trong lịch, đã xong bao nhiêu', 'Không gõ gì'],
    ['EXERCISES', 'Ngân hàng câu hỏi', 'Không gõ gì'],
    ['RESOURCES', '5 nguồn học miễn phí', 'Không gõ gì'],
  ];
  sheets.push({
    name: 'README',
    columns: [{ width: 24 }, { width: 64 }, { width: 50 }],
    freeze: false,
    rows: [
      [head('LỘ TRÌNH 180 NGÀY: MẤT GỐC → A0 → A1 → A2 → B1')],
      [],
      [txt(`Sinh từ data/roadmap/*.json + src/content/vocabulary/ · chạy \`npm run roadmap\` · Ngày bắt đầu: ${config.startDate}`)],
      [txt('Ô nền vàng là ô BẠN GÕ. Ô khác tự tính hoặc do script ghi — gõ vào đó sẽ bị lần chạy sau xoá.')],
      [],
      [head('Sheet'), head('Để làm gì'), head('Bạn gõ gì ở đó')],
      ...guide.map(([a, b, c]) => [txt(a), wrap(b), wrap(c)]),
      [],
      [head('Mỗi ngày')],
      ...[
        '1. Mở TODAY: xem chủ đề, từ mới và số từ ĐẾN HẠN ÔN.',
        '2. Học theo dòng của PLAN_180: Nghe / Nói / Đọc / Viết, tổng 60 phút.',
        '3. Tối về: PROGRESS → chọn Yes ở cột Hoàn thành, chấm 6 điểm kỹ năng 0–100.',
        '4. Ôn: DUE → gõ Mastery 0–5 và ngày vừa ôn; ngày ôn tới tự tính.',
        '5. Điểm dưới 70%: hôm sau làm lại chủ đề đó trước khi học cái mới.',
      ].map((line) => [txt(line)]),
      [],
      [head('Số liệu thật của lộ trình này')],
      [txt(`Ngày 1 = ${stats.startDate}, ngày ${stats.days} = ${stats.endDate}.`)],
      [txt(`Từ vựng đang có: ${stats.words.total} (${stats.words.byLevel}). Cần ${stats.wordsNeeded} từ nữa để phủ kín 180 ngày — bắt đầu hụt từ ngày ${stats.firstShortDay}.`)],
      [txt(`Ngữ pháp: ${stats.grammarPoints} điểm · Chủ đề: ${stats.curriculumTopics} · Ngày có test: ${stats.testDays} · Test chốt level: ${stats.exitTests.join(', ')}.`)],
      [txt('Đổi ngày bắt đầu: sửa data/roadmap/config.json rồi chạy npm run roadmap, cả 180 ngày tính lại.')],
    ],
  });

  // ---- TODAY ----
  const rows = [];
  const put = (cells) => {
    rows.push(cells);
    return rows.length;
  };
  put([head('HÔM NAY HỌC GÌ')]);
  put([]);
  put([txt('Hôm nay là ngày'), fx('TODAY()', STYLE_DATE)]);
  const rowIndex = put([txt(`Thứ tự trong lộ trình (1→${config.dayCount})`), fx(`IFERROR(MATCH(TODAY(),PLAN_180!$B$2:$B$${planLast},0),"—")`)]);
  const lookup = (col) => `IFERROR(INDEX(PLAN_180!$${col}$2:$${col}$${planLast},$B$${rowIndex}),"")`;
  [
    ['Level', 'D'],
    ['Tuần', 'C'],
    ['Giai đoạn của tuần', 'E'],
    ['Dạng bài hôm nay', 'F'],
    ['Chủ đề', 'H'],
    ['Ngữ pháp', 'I'],
    ['Nghe', 'L'],
    ['Nói', 'M'],
    ['Đọc', 'N'],
    ['Viết', 'O'],
    ['Số phút', 'Q'],
    ['Test hôm nay', 'R'],
  ].forEach(([label, col]) => put([txt(label), fx(lookup(col))]));
  put([]);
  const wordHeader = put([head('#'), head('Từ mới hôm nay'), head('Nghĩa tiếng Việt'), head('Ví dụ'), head('dòng')]);
  for (let i = 1; i <= WORD_SLOTS; i += 1) {
    const r = wordHeader + i;
    put([
      n(i),
      fx(`IFERROR(INDEX(VOCAB!$E$2:$E$${VOCAB_RANGE},$E${r}),"")`),
      fx(`IFERROR(INDEX(VOCAB!$F$2:$F$${VOCAB_RANGE},$E${r}),"")`),
      fx(`IFERROR(INDEX(VOCAB!$H$2:$H$${VOCAB_RANGE},$E${r}),"")`),
      fx(`IFERROR(MATCH($A${r},VOCAB!$L$2:$L$${VOCAB_RANGE},0),"")`),
    ]);
  }
  put([]);
  const dueHeader = put([head('#'), head('Từ đến hạn ôn'), head('Nghĩa tiếng Việt'), head('Ví dụ'), head('dòng')]);
  for (let i = 1; i <= DUE_SLOTS; i += 1) {
    const r = dueHeader + i;
    put([
      n(i),
      fx(`IFERROR(INDEX(DUE!$B$2:$B$${DUE_RANGE},$E${r}),"")`),
      fx(`IFERROR(INDEX(DUE!$C$2:$C$${DUE_RANGE},$E${r}),"")`),
      fx(`IFERROR(INDEX(DUE!$D$2:$D$${DUE_RANGE},$E${r}),"")`),
      fx(`IFERROR(MATCH($A${r},DUE!$J$2:$J$${DUE_RANGE},0),"")`),
    ]);
  }
  put([]);
  put([head('Tổng tiến độ')]);
  const rowDone = put([txt('Số ngày đã hoàn thành'), fx(`COUNTIF(PROGRESS!$E$2:$E$${planLast},"Yes")`), txt(`trên ${config.dayCount} ngày`)]);
  put([txt('Tỷ lệ hoàn thành'), fx(`IFERROR(ROUND(B${rowDone}/${config.dayCount}*100,0)&"%","—")`)]);
  put([txt('Điểm trung bình 6 kỹ năng'), fx(`IFERROR(ROUND(AVERAGE(PROGRESS!$L$2:$L$${planLast}),0),"chưa có điểm")`)]);
  put([txt('Số từ đến hạn ôn hôm nay'), fx(`COUNTIF(DUE!$I$2:$I$${DUE_RANGE},"ĐẾN HẠN")`)]);
  put([txt('Số điểm ngữ pháp đến hạn ôn'), fx(`COUNTIF(GRAMMAR!$K$2:$K$${GRAMMAR_RANGE},"ĐẾN HẠN")`)]);

  sheets.push({ name: 'TODAY', columns: [{ width: 30 }, { width: 24 }, { width: 26 }, { width: 44 }, { width: 8 }], rows, freeze: false });

  // ---- PLAN_180 ----
  sheets.push({
    name: 'PLAN_180',
    columns: [7, 12, 6, 7, 30, 20, 11, 26, 24, 42, 8, 22, 22, 22, 22, 14, 7, 32, 12, 24].map((width) => ({ width })),
    filter: `A1:T${planLast}`,
    rows: [
      [head('Ngày'), head('Ngày lịch'), head('Tuần'), head('Level'), head('Giai đoạn tuần'), head('Dạng bài'), head('CurriculumID'), head('Chủ đề'), head('Ngữ pháp'), head('Từ hôm nay (ID)'), head('Số từ'), head('Nghe'), head('Nói'), head('Đọc'), head('Viết'), head('Bài tập'), head('Phút'), head('Test'), head('Trạng thái'), head('Nguồn từ')],
      ...plan.map((row) => [
        n(row.day),
        dt(row.date),
        n(row.week),
        txt(row.level),
        wrap(row.focus),
        txt(row.lesson),
        txt(row.curriculumId || '—'),
        wrap(row.topic),
        wrap(grammarLabel(row.grammarIds)),
        wrap(row.wordIds.join(' · ') || '—'),
        n(row.wordIds.length),
        wrap(row.skills.listening),
        wrap(row.skills.speaking),
        wrap(row.skills.reading),
        wrap(row.skills.writing),
        txt(row.exerciseIds.join(', ') || '—'),
        n(row.minutes),
        // An INDEX of an empty cell reads as 0, so "no test today" has to be a dash in
        // the data, not an empty string the TODAY sheet would inherit.
        wrap(row.test || '—'),
        fx(`IF(PROGRESS!$E${row.sheetRow}="Yes","Xong","Chưa làm")`),
        wrap(row.wordsShort > 0 ? `CHỜ NẠP TỪ: thiếu ${row.wordsShort}` : row.lesson === 'Weekly review' ? 'ngày ôn, không thêm từ' : 'đủ từ'),
      ]),
    ],
  });

  // ---- VOCAB ----
  sheets.push({
    name: 'VOCAB',
    columns: [16, 7, 14, 11, 16, 24, 14, 36, 24, 30, 12, 10].map((width) => ({ width })),
    filter: `A1:L${pool.length + 1}`,
    rows: [
      [head('ID'), head('Level'), head('Nhóm'), head('Chủ đề'), head('Từ'), head('Nghĩa VI'), head('IPA'), head('Ví dụ'), head('Collocation'), head('Nguồn dữ liệu'), head('Ngày học'), head('Thứ tự hôm nay')],
      ...pool.map((word, i) => {
        const r = i + 2;
        return [
          txt(word.id),
          txt(word.level),
          txt(word.category),
          txt(word.curriculum || '—'),
          wrap(word.word),
          wrap(word.meaning_vi),
          txt(word.ipa),
          wrap(word.example),
          wrap(word.collocations.join(', ')),
          txt(word.source),
          dt(learnDate.get(word.id) || ''),
          fx(`IF($K${r}="","",IF($K${r}=TODAY(),COUNTIF($K$2:$K${r},TODAY()),""))`),
        ];
      }),
    ],
  });

  // ---- DUE ----
  sheets.push({
    name: 'DUE',
    columns: [16, 16, 24, 36, 11, 12, 15, 13, 12, 10, 30].map((width) => ({ width })),
    filter: `A1:K${pool.length + 1}`,
    validations: [{ sqref: `E2:F${pool.length + 1}`, values: ['0', '1', '2', '3', '4', '5'] }],
    rows: [
      [head('ID'), head('Từ'), head('Nghĩa VI'), head('Ví dụ'), head('Mastery 0-5'), head('Số lần đúng'), head('Ngày ôn gần nhất'), head('Ngày ôn tới'), head('Trạng thái'), head('Thứ tự đến hạn'), head('Ghi chú')],
      ...pool.map((word, i) => {
        const r = i + 2;
        return [
          txt(word.id),
          fx(`IFERROR(VLOOKUP($A${r},VOCAB!$A$2:$L$${VOCAB_RANGE},5,FALSE),"")`),
          fx(`IFERROR(VLOOKUP($A${r},VOCAB!$A$2:$L$${VOCAB_RANGE},6,FALSE),"")`),
          fx(`IFERROR(VLOOKUP($A${r},VOCAB!$A$2:$L$${VOCAB_RANGE},8,FALSE),"")`),
          blank(),
          blank(),
          blank(),
          fx(`IF($G${r}="","",$G${r}+IF($E${r}=0,1,IF($E${r}=1,1,IF($E${r}=2,2,IF($E${r}=3,4,IF($E${r}=4,7,14))))))`),
          fx(`IF($G${r}="","Mới",IF($H${r}<=TODAY(),"ĐẾN HẠN","Lịch"))`),
          fx(`IF($I${r}="ĐẾN HẠN",COUNTIF($I$2:$I${r},"ĐẾN HẠN"),"")`),
          blank(),
        ];
      }),
    ],
  });

  // ---- GRAMMAR ----
  sheets.push({
    name: 'GRAMMAR',
    columns: [9, 7, 28, 34, 32, 32, 30, 11, 15, 13, 12, 10, 14].map((width) => ({ width })),
    filter: `A1:M${grammar.length + 1}`,
    validations: [{ sqref: `H2:H${grammar.length + 1}`, values: ['0', '1', '2', '3', '4', '5'] }],
    rows: [
      [head('ID'), head('Level'), head('Chủ đề'), head('Công thức'), head('Ví dụ'), head('Lỗi hay gặp'), head('Bài luyện'), head('Mastery 0-5'), head('Ngày học gần nhất'), head('Ngày ôn tới'), head('Trạng thái'), head('Thứ tự đến hạn'), head('Số ngày trong lịch')],
      ...grammar.map((point, i) => {
        const r = i + 2;
        return [
          txt(point.id),
          txt(point.level),
          wrap(point.topic),
          wrap(point.pattern),
          wrap(point.example),
          wrap(point.mistake),
          wrap(point.drill),
          blank(),
          blank(),
          fx(`IF($I${r}="","",$I${r}+IF($H${r}=0,3,IF($H${r}=1,4,IF($H${r}=2,7,IF($H${r}=3,14,IF($H${r}=4,21,30))))))`),
          fx(`IF($I${r}="","Chưa học",IF($J${r}<=TODAY(),"ĐẾN HẠN","Lịch"))`),
          fx(`IF($K${r}="ĐẾN HẠN",COUNTIF($K$2:$K${r},"ĐẾN HẠN"),"")`),
          fx(`SUMPRODUCT(--ISNUMBER(SEARCH($A${r},PLAN_180!$I$2:$I$${planLast})))`),
        ];
      }),
    ],
  });

  // ---- CURRICULUM ----
  sheets.push({
    name: 'CURRICULUM',
    columns: [10, 7, 15, 26, 14, 24, 22, 24, 20, 24, 8, 12, 13].map((width) => ({ width })),
    filter: `A1:M${curriculum.length + 1}`,
    rows: [
      [head('ID'), head('Level'), head('Module'), head('Chủ đề'), head('Ngữ pháp'), head('Từ vựng trọng tâm'), head('Nghe'), head('Nói'), head('Đọc'), head('Viết'), head('Ưu tiên'), head('Số ngày trong lịch'), head('Số ngày đã xong')],
      ...curriculum.map((topic, i) => {
        const r = i + 2;
        return [
          txt(topic.id),
          txt(topic.level),
          txt(topic.module),
          wrap(topic.topic),
          txt(grammarLabel(topic.grammar)),
          wrap(topic.vocabFocus),
          wrap(topic.listening),
          wrap(topic.speaking),
          wrap(topic.reading),
          wrap(topic.writing),
          txt(topic.priority),
          fx(`COUNTIF(PLAN_180!$G$2:$G$${planLast},$A${r})`),
          fx(`COUNTIFS(PLAN_180!$G$2:$G$${planLast},$A${r},PROGRESS!$E$2:$E$${planLast},"Yes")`),
        ];
      }),
    ],
  });

  // ---- EXERCISES ----
  sheets.push({
    name: 'EXERCISES',
    columns: [8, 7, 13, 18, 12, 14, 46, 40, 10].map((width) => ({ width })),
    filter: `A1:I${exercises.length + 1}`,
    rows: [
      [head('ID'), head('Level'), head('Kỹ năng'), head('Chủ đề'), head('CurriculumID'), head('Dạng'), head('Câu hỏi / Nhiệm vụ'), head('Đáp án'), head('Độ khó')],
      ...exercises.map((e) => [txt(e.id), txt(e.level), txt(e.skill), wrap(e.topic), txt(e.curriculum || '—'), txt(e.type), wrap(e.question), wrap(e.answer), txt(e.difficulty)]),
    ],
  });

  // ---- RESOURCES ----
  sheets.push({
    name: 'RESOURCES',
    columns: [8, 26, 10, 30, 26, 14, 14, 42, 40, 34].map((width) => ({ width })),
    freeze: false,
    rows: [
      [head('ID'), head('Nguồn'), head('Level'), head('Kỹ năng'), head('Chủ đề'), head('Kiểu'), head('Miễn phí'), head('URL'), head('Dùng khi nào'), head('Ghi chú')],
      ...resources.map((r) => [txt(r.id), wrap(r.source), txt(r.levels), wrap(r.skills), wrap(r.topic), txt(r.type), txt(r.free), txt(r.url), wrap(r.use), wrap(r.note)]),
    ],
  });

  // ---- PROGRESS ----
  sheets.push({
    name: 'PROGRESS',
    columns: [12, 7, 7, 26, 13, 13, 12, 12, 12, 11, 11, 11, 34].map((width) => ({ width })),
    filter: `A1:M${planLast}`,
    validations: [{ sqref: `E2:E${planLast}`, values: ['Yes', 'No'] }],
    rows: [
      [head('Ngày lịch'), head('Ngày'), head('Level'), head('Chủ đề'), head('Hoàn thành'), head('Vocabulary %'), head('Grammar %'), head('Listening %'), head('Speaking %'), head('Reading %'), head('Writing %'), head('Overall %'), head('Ghi chú')],
      ...plan.map((row) => {
        const r = row.sheetRow;
        return [
          fx(`PLAN_180!$B${r}`, STYLE_DATE),
          fx(`PLAN_180!$A${r}`),
          fx(`PLAN_180!$D${r}`),
          fx(`PLAN_180!$H${r}`),
          blank(),
          blank(),
          blank(),
          blank(),
          blank(),
          blank(),
          blank(),
          fx(`IF(COUNT($F${r}:$K${r})=0,"",ROUND(AVERAGE($F${r}:$K${r}),0))`),
          blank(),
        ];
      }),
    ],
  });

  return sheets;
}

// ---------- zip ----------

const CRC_TABLE = (() => {
  const table = new Int32Array(256);
  for (let i = 0; i < 256; i += 1) {
    let c = i;
    for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[i] = c;
  }
  return table;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i += 1) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function zipSync(entries, stamp) {
  // UTC fields, not local ones: the runner is UTC and a laptop is not, and a differing
  // DOS timestamp in the archive would make roadmap:check fail on CI for no real reason.
  const time = ((stamp.getUTCHours() << 11) | (stamp.getUTCMinutes() << 5) | (stamp.getUTCSeconds() >> 1)) & 0xffff;
  const day = (((stamp.getUTCFullYear() - 1980) << 9) | ((stamp.getUTCMonth() + 1) << 5) | stamp.getUTCDate()) & 0xffff;
  const locals = [];
  const central = [];
  let offset = 0;

  for (const entry of entries) {
    const name = Buffer.from(entry.name, 'utf8');
    const raw = Buffer.from(entry.data, 'utf8');
    const deflated = deflateRawSync(raw, { level: 9 });
    const useDeflate = deflated.length < raw.length;
    const data = useDeflate ? deflated : raw;
    const crc = crc32(raw);
    const method = useDeflate ? 8 : 0;

    const local = Buffer.alloc(30 + name.length);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(0x0800, 6);
    local.writeUInt16LE(method, 8);
    local.writeUInt16LE(time, 10);
    local.writeUInt16LE(day, 12);
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(data.length, 18);
    local.writeUInt32LE(raw.length, 22);
    local.writeUInt16LE(name.length, 26);
    name.copy(local, 30);
    locals.push(local, data);

    const dir = Buffer.alloc(46 + name.length);
    dir.writeUInt32LE(0x02014b50, 0);
    dir.writeUInt16LE(20, 4);
    dir.writeUInt16LE(20, 6);
    dir.writeUInt16LE(0x0800, 8);
    dir.writeUInt16LE(method, 10);
    dir.writeUInt16LE(time, 12);
    dir.writeUInt16LE(day, 14);
    dir.writeUInt32LE(crc, 16);
    dir.writeUInt32LE(data.length, 20);
    dir.writeUInt32LE(raw.length, 24);
    dir.writeUInt16LE(name.length, 28);
    dir.writeUInt32LE(offset, 42);
    name.copy(dir, 46);
    central.push(dir);

    offset += local.length + data.length;
  }

  const body = Buffer.concat(locals);
  const dirBuf = Buffer.concat(central);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(entries.length, 8);
  end.writeUInt16LE(entries.length, 10);
  end.writeUInt32LE(dirBuf.length, 12);
  end.writeUInt32LE(body.length, 16);
  return Buffer.concat([body, dirBuf, end]);
}

// ---------- packaging ----------

function contentTypesXml(sheetCount) {
  const overrides = Array.from({ length: sheetCount }, (_, i) => `<Override PartName="/xl/worksheets/sheet${i + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join('');
  return (
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>` +
    `<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">` +
    `<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>` +
    `<Default Extension="xml" ContentType="application/xml"/>` +
    `<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>` +
    `<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>` +
    `<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>` +
    `<Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>` +
    overrides +
    `</Types>`
  );
}

function workbookXml(sheets) {
  return (
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>` +
    `<workbook xmlns="${NS_MAIN}" xmlns:r="${NS_DOC_REL}">` +
    `<bookViews><workbookView activeTab="1"/></bookViews>` +
    `<sheets>${sheets.map((s, i) => `<sheet name="${esc(s.name)}" sheetId="${i + 1}" r:id="rId${i + 1}"/>`).join('')}</sheets>` +
    // fullCalcOnLoad: every TODAY()-driven cell must re-evaluate when the file opens,
    // otherwise the workbook shows the values computed on the day it was generated.
    `<calcPr calcId="191029" fullCalcOnLoad="1"/>` +
    `</workbook>`
  );
}

function workbookRelsXml(sheets) {
  const rels = sheets
    .map((_, i) => `<Relationship Id="rId${i + 1}" Type="${NS_DOC_REL}/worksheet" Target="worksheets/sheet${i + 1}.xml"/>`)
    .join('');
  const styles = `<Relationship Id="rId${sheets.length + 1}" Type="${NS_DOC_REL}/styles" Target="styles.xml"/>`;
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="${NS_REL}">${rels}${styles}</Relationships>`;
}

function rootRelsXml() {
  return (
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>` +
    `<Relationships xmlns="${NS_REL}">` +
    `<Relationship Id="rId1" Type="${NS_DOC_REL}/officeDocument" Target="xl/workbook.xml"/>` +
    `<Relationship Id="rId2" Type="${NS_DOC_REL}/metadata/core-properties" Target="docProps/core.xml"/>` +
    `<Relationship Id="rId3" Type="${NS_DOC_REL}/extended-properties" Target="docProps/app.xml"/>` +
    `</Relationships>`
  );
}

function coreXml({ days, startDate }) {
  const iso = `${startDate}T00:00:00Z`;
  return (
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>` +
    `<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">` +
    `<dc:title>English Roadmap 180 — Mất gốc → B1</dc:title>` +
    `<dc:subject>180 ngày A0 A1 A2 B1</dc:subject>` +
    `<dc:creator>scripts/build-roadmap.mjs</dc:creator>` +
    `<dcterms:created xsi:type="dcterms:W3CDTF">${iso}</dcterms:created>` +
    `<dcterms:modified xsi:type="dcterms:W3CDTF">${iso}</dcterms:modified>` +
    `<cp:description>Sinh từ data/roadmap/*.json — ${days} ngày học.</cp:description>` +
    `</cp:coreProperties>`
  );
}

function appXml(sheets) {
  return (
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>` +
    `<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">` +
    `<Application>Grammax roadmap builder</Application>` +
    `<TitlesOfParts><vt:vector size="${sheets.length}" baseType="lpstr">${sheets.map((s) => `<vt:lpstr>${esc(s.name)}</vt:lpstr>`).join('')}</vt:vector></TitlesOfParts>` +
    `</Properties>`
  );
}

export function renderWorkbook(data) {
  const sheets = buildSheets(data);
  const entries = [
    { name: '[Content_Types].xml', data: contentTypesXml(sheets.length) },
    { name: '_rels/.rels', data: rootRelsXml() },
    { name: 'docProps/core.xml', data: coreXml({ startDate: data.config.startDate, days: data.stats.days }) },
    { name: 'docProps/app.xml', data: appXml(sheets) },
    { name: 'xl/workbook.xml', data: workbookXml(sheets) },
    { name: 'xl/_rels/workbook.xml.rels', data: workbookRelsXml(sheets) },
    { name: 'xl/styles.xml', data: STYLES_XML },
    ...sheets.map((sheet, i) => ({ name: `xl/worksheets/sheet${i + 1}.xml`, data: sheetXml(sheet) })),
  ];
  return { buffer: zipSync(entries, new Date(`${data.config.startDate}T09:00:00Z`)), sheetNames: sheets.map((s) => s.name) };
}

async function main() {
  const data = await loadRoadmap();
  const { buffer, sheetNames } = renderWorkbook(data);

  console.log(`Sheets        ${sheetNames.join(', ')}`);
  console.log(`Days          ${data.stats.days} (${data.stats.startDate} → ${data.stats.endDate})`);
  console.log(`Words         ${data.stats.words.total} · ${data.stats.words.byLevel}`);
  console.log(`Grammar       ${data.stats.grammarPoints} points · Topics ${data.stats.curriculumTopics} · Test days ${data.stats.testDays}`);
  console.log(`Coverage      đủ từ tới ngày ${data.stats.coveredDay}; ${data.stats.shortDays} ngày còn thiếu ${data.stats.wordsNeeded} từ (hụt từ ngày ${data.stats.firstShortDay})`);
  console.log(`Size          ${buffer.length} byte`);

  if (process.argv.includes('--check')) {
    const existing = await readFile(OUTPUT).catch(() => null);
    if (!existing) {
      console.error('\nroadmap:check failed — English_Roadmap_From_Zero.xlsx does not exist. Run `npm run roadmap`.');
      process.exit(1);
    }
    if (!existing.equals(buffer)) {
      console.error('\nroadmap:check failed — the workbook no longer matches data/roadmap/. Run `npm run roadmap` and commit it.\n');
      process.exit(1);
    }
    console.log('\nroadmap:check ok — workbook matches data/roadmap/.');
    return;
  }

  await writeFile(OUTPUT, buffer);
  console.log('\nwrote English_Roadmap_From_Zero.xlsx');
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
