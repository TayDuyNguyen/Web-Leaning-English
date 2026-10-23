import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';

// DESIGN.md is not decoration. This test makes it a contract: every colour, radius and
// spacing token declared in the frontmatter must exist in the stylesheet under the
// matching custom-property name, with the same value — and the stylesheet may not
// invent tokens the design document does not name. Change one file without the other
// and CI goes red, which is the only way a design system survives contact with four
// games and a deadline.

const design = readFileSync(new URL('../DESIGN.md', import.meta.url), 'utf8');
const css = readFileSync(new URL('../src/app/styles.css', import.meta.url), 'utf8');

const frontmatter = design.match(/^---\n([\s\S]*?)\n---\n/);
assert.ok(frontmatter, 'DESIGN.md must open with a --- delimited frontmatter block');

const tokens = {};
let section = null;
for (const line of frontmatter[1].split('\n')) {
  const heading = line.match(/^([a-z][a-z-]*):$/);
  if (heading) {
    section = heading[1];
    tokens[section] ??= {};
    continue;
  }
  const entry = line.match(/^ {2}([a-z0-9-]+):\s*"?([^"]*?)"?\s*$/);
  if (entry && section) tokens[section][entry[1]] = entry[2];
}

const cssVars = new Map(
  [...css.matchAll(/^\s*(--[\w-]+):\s*([^;]+);/gm)].map(([, name, value]) => [name, value.trim().toLowerCase()])
);

const norm = (value) => String(value).trim().toLowerCase();

function assertTokenGroup(group, prefix) {
  const declared = tokens[group];
  assert.ok(declared && Object.keys(declared).length > 0, `DESIGN.md declares no "${group}" tokens`);

  const missing = [];
  for (const [key, value] of Object.entries(declared)) {
    const name = `--${prefix}-${key}`;
    if (!cssVars.has(name)) missing.push(`${name} (absent, DESIGN.md says ${value})`);
    else if (cssVars.get(name) !== norm(value)) missing.push(`${name} is ${cssVars.get(name)} but DESIGN.md says ${norm(value)}`);
  }
  assert.deepEqual(missing, [], `stylesheet drifted from DESIGN.md.${group}`);

  const extra = [...cssVars.keys()].filter((name) => name.startsWith(`--${prefix}-`) && !Object.hasOwn(declared, name.slice(prefix.length + 3)));
  assert.deepEqual(extra, [], `stylesheet defines ${group} tokens that DESIGN.md does not name: ${extra.join(', ')}`);
}

test('every DESIGN.md colour exists in the stylesheet with the same value', () => {
  assertTokenGroup('colors', 'color');
});

test('every DESIGN.md radius exists in the stylesheet with the same value', () => {
  assertTokenGroup('rounded', 'rounded');
});

test('every DESIGN.md spacing value exists in the stylesheet with the same value', () => {
  assertTokenGroup('spacing', 'space');
});

test('every DESIGN.md typography value is actually used somewhere in the stylesheet', () => {
  const unused = Object.entries(tokens.typography ?? {})
    .filter(([, value]) => !css.toLowerCase().includes(norm(value)))
    .map(([key, value]) => `${key}: ${value}`);
  assert.deepEqual(unused, [], 'these type tokens are documented but never appear in the CSS');
});

test('the stylesheet is monochrome apart from the two documented hues', () => {
  // DESIGN.md permits ink, the signal orange and the single added green. Anything else is
  // a new colour sneaking in through a component rather than through the design document.
  const allowed = new Set(Object.values(tokens.colors).map(norm));
  const hexes = [...css.matchAll(/#([0-9a-f]{6})\b/gi)].map(([, hex]) => `#${hex.toLowerCase()}`);
  const strays = [...new Set(hexes.filter((hex) => !allowed.has(hex)))];
  assert.deepEqual(strays, [], `colours in the stylesheet that DESIGN.md does not define: ${strays.join(', ')}`);
});

test('no drop shadows, per the flat tonal rule', () => {
  assert.ok(!/box-shadow\s*:\s*(?!none)/.test(css), 'this system conveys depth with contrast and hairlines, never shadow');
});

test('body copy stays at weight 300', () => {
  const bodyBlock = css.match(/body\s*\{[^}]*\}/)?.[0] ?? '';
  assert.match(bodyBlock, /font-weight:\s*300/, 'raising body weight destroys the display/body contrast the system depends on');
});

// Flat "selector { body }" parse — the stylesheet is written one rule per line-group
// precisely so these design rules can be checked without a CSS parser dependency.
const rules = [...css.matchAll(/([^{}]+)\{([^}]*)\}/g)].map(([, selector, body]) => ({
  selector: selector.trim().replace(/\s+/g, ' '),
  body,
}));

test('CEFR level tints appear only on level chips', () => {
  // DESIGN.md: tints are chips and washes, never a button fill, never a status colour.
  // A green checkmark borrowing the A2 tint is exactly how a palette quietly decays.
  const offenders = rules
    .filter((rule) => rule.body.includes('var(--color-level-') && !/level-chip/.test(rule.selector))
    .map((rule) => rule.selector);
  assert.deepEqual(offenders, [], `level tints used outside .level-chip: ${offenders.join(', ')}`);
});

test('the correct green is reserved for graded answers', () => {
  const offenders = rules
    .filter((rule) => rule.body.includes('var(--color-correct)') && !/review-list/.test(rule.selector))
    .map((rule) => rule.selector);
  assert.deepEqual(offenders, [], `--color-correct used outside the review list: ${offenders.join(', ')}`);
});

test('the signal colour is not used as a large fill', () => {
  // Signal orange is one-action-per-screen currency. The only sanctioned fills are the
  // wrong-answer mark and the save warning, both small.
  const offenders = rules
    .filter((rule) => /background:\s*var\(--color-(signal|incorrect)\)/.test(rule.body))
    .map((rule) => rule.selector);
  assert.deepEqual(offenders, [], `signal orange used as a background in: ${offenders.join(', ')}`);
});
