/**
 * Browser smoke over the Chrome DevTools Protocol: no test-runner dependency, just
 * Node's built-in WebSocket (Node 22+) and a local Chrome/Chromium.
 *
 *   npm run build && npm run preview   # serves dist/ on :4173
 *   npm run smoke:ui
 *
 * It checks the behaviour that unit tests cannot reach: a cold deep link resolving
 * against asynchronously-loaded content, one history entry per topic visit, content
 * chunks staying out of the dashboard, and progress keyed by question number.
 *
 * Env: SMOKE_BASE_URL (default http://localhost:4173/), SMOKE_CHROME (browser path),
 *      SMOKE_CDP_PORT (default 9334).
 */
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const BASE = (process.env.SMOKE_BASE_URL || 'http://localhost:4173/').replace(/\/?$/, '/');
const PORT = Number(process.env.SMOKE_CDP_PORT || 9334);
const CALL_TIMEOUT = 15000;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const log = (line) => process.stdout.write(`${line}\n`);

const CHROME_CANDIDATES = {
  win32: [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  ],
  darwin: ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'],
  linux: ['/usr/bin/google-chrome', '/usr/bin/google-chrome-stable', '/usr/bin/chromium-browser', '/usr/bin/chromium'],
};

function findChrome() {
  if (process.env.SMOKE_CHROME) return process.env.SMOKE_CHROME;
  return CHROME_CANDIDATES[process.platform]?.find(existsSync);
}

const executable = findChrome();
if (!executable) {
  log(`No Chrome found for platform "${process.platform}". Set SMOKE_CHROME to the executable path.`);
  process.exit(2);
}

// A fragment change must not go through Page.navigate: same-document navigation never
// settles the CDP request, so the driver blocks forever. Steps that only need a new
// route assign location.hash directly; open() is reserved for real document loads.
async function open(url) {
  requests = [];
  await send('Page.navigate', { url });
  await send('Runtime.evaluate', {
    expression: `new Promise((resolve) => {
      if (document.readyState === 'complete') resolve(true);
      else window.addEventListener('load', () => resolve(true), { once: true });
      setTimeout(() => resolve(false), 5000);
    })`,
    awaitPromise: true,
    returnByValue: true,
  });
  await sleep(500);
}

async function ev(expression) {
  const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  if (r.exceptionDetails) {
    throw new Error(`page threw: ${r.exceptionDetails.exception?.description || r.exceptionDetails.text}`);
  }
  return r.result.value;
}

let ws;
let seq = 0;
let requests = [];
const pending = new Map();
const errors = [];
const warnings = [];

function send(method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = ++seq;
    const timer = setTimeout(() => {
      if (pending.delete(id)) reject(new Error(`CDP '${method}' timed out after ${CALL_TIMEOUT}ms`));
    }, CALL_TIMEOUT);
    pending.set(id, {
      resolve: (value) => { clearTimeout(timer); resolve(value); },
      reject: (error) => { clearTimeout(timer); reject(error); },
    });
    ws.send(JSON.stringify({ id, method, params }));
  }).catch((error) => {
    log(`  ! ${error.message}`);
    throw error;
  });
}

function onMessage(event) {
  const msg = JSON.parse(event.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    if (msg.error) reject(new Error(msg.error.message));
    else resolve(msg.result);
    return;
  }
  if (msg.method === 'Runtime.consoleAPICalled' && (msg.params.type === 'error' || msg.params.type === 'warning')) {
    const line = `${msg.params.type}: ${(msg.params.args || []).map((a) => a.value ?? a.description ?? '').join(' ')}`;
    (msg.params.type === 'error' ? errors : warnings).push(line);
  } else if (msg.method === 'Log.entryAdded' && msg.params.entry.level === 'error') {
    errors.push(`log: ${msg.params.entry.text}`);
  } else if (msg.method === 'Page.javascriptDialogOpening') {
    errors.push(`dialog: ${msg.params.message}`);
    send('Page.handleJavaScriptDialog', { accept: false }).catch(() => {});
  } else if (msg.method === 'Network.requestWillBeSent') {
    requests.push(msg.params.request.url);
  }
}

const results = [];
function check(name, pass, detail) {
  results.push({ name, pass });
  log(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? `\n        ${detail}` : ''}`);
}

async function step(name, fn) {
  try {
    await fn();
  } catch (error) {
    check(name, false, `harness error: ${error.message}`);
  }
}

const jsList = () => requests.filter((u) => u.endsWith('.js')).map((u) => u.split('/').pop()).join(', ');

async function attach(chrome) {
  for (let i = 0; i < 60; i++) {
    let page = null;
    try {
      const list = await (await fetch(`http://127.0.0.1:${PORT}/json`)).json();
      page = list.find((t) => t.type === 'page');
    } catch {
      // Chrome is still starting.
    }
    if (page) {
      await new Promise((resolve, reject) => {
        ws = new WebSocket(page.webSocketDebuggerUrl);
        ws.onopen = resolve;
        ws.onerror = () => reject(new Error('websocket failed'));
        ws.onmessage = onMessage;
      });
      return;
    }
    await sleep(250);
  }
  chrome.kill('SIGKILL');
  throw new Error('could not attach to Chrome');
}

// The build is served by `npm run preview`; failing here with a readable instruction
// beats a wall of timeouts against an empty port.
try {
  await fetch(BASE, { method: 'HEAD' });
} catch {
  log(`Nothing answering on ${BASE}. Run \`npm run build && npm run preview\` first.`);
  process.exit(2);
}

const chrome = spawn(executable, [
  '--headless=new',
  '--disable-gpu',
  '--no-first-run',
  '--no-default-browser-check',
  `--remote-debugging-port=${PORT}`,
  '--remote-allow-origins=*',
  `--user-data-dir=${join(tmpdir(), `grammax-smoke-${PORT}-${Date.now()}`)}`,
  'about:blank',
], { stdio: 'ignore' });

try {
  await attach(chrome);
  await send('Page.enable');
  await send('Runtime.enable');
  await send('Network.enable');
  log(`attached to Chrome on ${PORT}, testing ${BASE}\n`);

  // 1. cold dashboard render off the async content source
  await step('dashboard', async () => {
    await open(BASE);
    const dash = await ev(`(() => ({
      cards: document.querySelectorAll('.topic-card').length,
      loading: document.body.textContent.includes('Đang tải chuyên đề'),
      first: (document.querySelector('.topic-card h3') || {}).textContent,
    }))()`);
    check('dashboard lists all 30 catalogued topics', dash.cards === 30, JSON.stringify(dash));
    check('dashboard resolves the loading state', dash.loading === false, JSON.stringify(dash));
    check('dashboard pulls no lesson content', !requests.some((u) => /chuyen-de-thi-dong-tu|su-phoi-thi/.test(u)),
      `js: ${jsList()}`);
  });

  // 2. cold deep link into a late exercise, content arriving asynchronously
  await step('deep link', async () => {
    await open(`${BASE}#topic-chuyen-de-thi-dong-tu/exercise-4`);
    const deep = await ev(`(() => ({
      heading: (document.querySelector('.exercise-header h2') || {}).textContent,
      url: location.hash,
      active: (document.querySelector('.nav-item--active') || {}).textContent?.trim(),
      practice: !!document.querySelector('#practicePanel'),
      loading: document.body.textContent.includes('Đang tải nội dung'),
    }))()`);
    check('deep link opens Exercise 5 instead of bouncing to theory-0',
      deep.heading === 'Exercise 5' && deep.url === '#topic-chuyen-de-thi-dong-tu/exercise-4' && deep.practice && !deep.loading,
      JSON.stringify(deep));
    check('the lesson chunk is fetched only when the topic opens',
      requests.some((u) => u.includes('chuyen-de-thi-dong-tu')),
      `js: ${jsList()}`);
  });

  // 3. answering scores, and progress keyed by question_number survives a reload
  await step('scoring', async () => {
    await ev(`location.hash = '#topic-chuyen-de-thi-dong-tu/exercise-0'; 1`);
    await sleep(700);
    const scored = await ev(`(async () => {
      const card = [...document.querySelectorAll('.question-card')]
        .find((c) => c.querySelector('input.input-text:not([disabled])') && c.querySelector('.btn-check-q'));
      if (!card) return { error: 'no unanswered text question card' };
      const input = card.querySelector('input.input-text');
      const asked = card.querySelector('.question-num').textContent;
      const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
      setter.call(input, 'goes');
      input.dispatchEvent(new Event('input', { bubbles: true }));
      await new Promise((r) => setTimeout(r, 120));
      const btn = card.querySelector('.btn-check-q');
      const disabledBefore = btn.disabled;
      btn.click();
      await new Promise((r) => setTimeout(r, 400));
      return {
        asked,
        disabledBefore,
        status: (document.querySelector('.explanation__status') || {}).textContent,
        chip: (document.querySelector('.score-chip') || {}).textContent,
      };
    })()`);
    check('typing enables Check, a correct answer marks it and scores 1/15',
      scored.disabledBefore === false && /Chính xác/.test(scored.status || '') && /1 \/ 15/.test(scored.chip || ''),
      JSON.stringify(scored));

    await open(`${BASE}#topic-chuyen-de-thi-dong-tu/exercise-0`);
    const restored = await ev(`(() => {
      const card = [...document.querySelectorAll('.question-card')]
        .find((c) => c.querySelector('.explanation__status'));
      return {
        chip: (document.querySelector('.score-chip') || {}).textContent,
        locked: !!card && !!card.querySelector('input.input-text[disabled]'),
        status: card ? card.querySelector('.explanation__status').textContent : null,
      };
    })()`);
    check('score and the answered question reload from storage, input locked',
      /1 \/ 15/.test(restored.chip || '') && restored.locked === true && /Chính xác/.test(restored.status || ''),
      JSON.stringify(restored));
  });

  // 4. the back button: one entry per visit, one press to escape
  await step('history', async () => {
    await open(BASE);
    const hist = await ev(`(async () => {
      const before = history.length;
      document.querySelector('.topic-card').click();
      await new Promise((r) => setTimeout(r, 800));
      const afterVisit = history.length;
      const urlInTopic = location.hash;
      const sidebarInTopic = !!document.querySelector('.sidebar');
      history.back();
      await new Promise((r) => setTimeout(r, 600));
      return { before, afterVisit, urlInTopic, sidebarInTopic, hash: location.hash,
               sidebarAfter: !!document.querySelector('.sidebar'),
               dashboard: !!document.querySelector('#dashboardView') };
    })()`);
    check('one history entry per topic visit', hist.afterVisit - hist.before === 1, JSON.stringify(hist));
    check('a single Back returns to the dashboard',
      hist.dashboard === true && hist.sidebarAfter === false && hist.hash === '', JSON.stringify(hist));
  });

  // 5. a topic with no content degrades cleanly
  await step('missing topic', async () => {
    await open(`${BASE}#topic-cau-bi-dong`);
    const missing = await ev(`(() => (document.querySelector('.container') || {}).textContent?.trim())()`);
    check('unpopulated topic shows the not-found message',
      /Không tìm thấy dữ liệu chuyên đề này/.test(missing || ''), JSON.stringify(missing));
  });

  // 6. the second topic comes from its own chunk
  await step('second topic', async () => {
    await open(`${BASE}#topic-su-phoi-thi/theory-2`);
    const second = await ev(`(() => ({
      title: (document.querySelector('.theory-header h2') || {}).textContent,
      sections: document.querySelectorAll('.sidebar__list li').length,
      url: location.hash,
      loading: document.body.textContent.includes('Đang tải nội dung'),
    }))()`);
    check('second topic renders theory section 3 from its own lazy chunk',
      second.title === 'Phối thì với SINCE' && requests.some((u) => u.includes('su-phoi-thi')) && !second.loading,
      JSON.stringify(second));
  });

  // Local-only mode (no .env) is expected to warn about Supabase once per load.
  check('zero console errors for the whole run', errors.length === 0, errors.slice(0, 5).join(' | '));
  log(`\nconsole warnings: ${warnings.length ? [...new Set(warnings)].join(' | ') : 'none'}`);
} finally {
  chrome.kill('SIGKILL');
}

const failed = results.filter((r) => !r.pass).length;
log(`\n${results.length - failed}/${results.length} smoke checks passed`);
process.exit(failed ? 1 : 0);
