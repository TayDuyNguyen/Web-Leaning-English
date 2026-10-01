import test from 'node:test';
import assert from 'node:assert/strict';

import { isSupabaseConfigured } from '../src/lib/supabaseConfig.js';

const REAL_URL = 'https://abcd1234.supabase.co';
const REAL_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.anonpayload.signature';
const PUBLISHABLE_KEY = 'sb_publishable_D8pZ2xQ4vN7mKcJrTsYuWg';

test('accepts a real https project with a real key', () => {
  assert.equal(isSupabaseConfigured(REAL_URL, REAL_KEY), true);
  assert.equal(isSupabaseConfigured(REAL_URL, PUBLISHABLE_KEY), true);
});

test('rejects missing or blank credentials', () => {
  assert.equal(isSupabaseConfigured('', REAL_KEY), false);
  assert.equal(isSupabaseConfigured(REAL_URL, ''), false);
  assert.equal(isSupabaseConfigured(undefined, undefined), false);
  assert.equal(isSupabaseConfigured(null, null), false);
  assert.equal(isSupabaseConfigured('   ', '   '), false);
});

test('rejects the exact values shipped in .env.example', () => {
  // Regression: the old detector looked for 'your-project-id' while .env.example
  // shipped 'your-project.supabase.co', so a verbatim copy read as configured.
  assert.equal(isSupabaseConfigured('https://your-project.supabase.co', 'your_publishable_key'), false);
});

test('rejects placeholder tokens in either field', () => {
  assert.equal(isSupabaseConfigured('https://placeholder.supabase.co', REAL_KEY), false);
  assert.equal(isSupabaseConfigured('https://example.supabase.co', REAL_KEY), false);
  assert.equal(isSupabaseConfigured(REAL_URL, 'placeholder-key'), false);
  assert.equal(isSupabaseConfigured(REAL_URL, 'your-placeholder'), false);
  assert.equal(isSupabaseConfigured(REAL_URL, 'changeme'), false);
  assert.equal(isSupabaseConfigured(REAL_URL, 'TODO_replace_me'), false);
});

test('rejects keys too short to be real', () => {
  assert.equal(isSupabaseConfigured(REAL_URL, 'x'), false);
  assert.equal(isSupabaseConfigured(REAL_URL, 'test'), false);
  assert.equal(isSupabaseConfigured(REAL_URL, '1234567890123456789'), false);
});

test('rejects malformed or non-url values', () => {
  assert.equal(isSupabaseConfigured('not-a-url', REAL_KEY), false);
  assert.equal(isSupabaseConfigured('supabase.co', REAL_KEY), false);
  assert.equal(isSupabaseConfigured('ftp://abcd1234.supabase.co', REAL_KEY), false);
});

test('rejects plain http for remote hosts but allows local development', () => {
  assert.equal(isSupabaseConfigured('http://abcd1234.supabase.co', REAL_KEY), false);
  assert.equal(isSupabaseConfigured('http://localhost:54321', REAL_KEY), true);
  assert.equal(isSupabaseConfigured('http://127.0.0.1:54321', REAL_KEY), true);
});

test('trims surrounding whitespace before validating', () => {
  assert.equal(isSupabaseConfigured(`  ${REAL_URL}\n`, `  ${REAL_KEY}  `), true);
});

test('ignores non-string inputs instead of throwing', () => {
  assert.equal(isSupabaseConfigured(12345, { url: REAL_URL }), false);
  assert.equal(isSupabaseConfigured({}, REAL_KEY), false);
});
