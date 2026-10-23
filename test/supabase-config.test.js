import assert from 'node:assert/strict';
import test from 'node:test';

import { readSupabaseConfig } from '../src/player/supabaseConfig.js';

const REAL_URL = 'https://abcd1234.supabase.co';
const REAL_KEY = 'sb_publishable_D8pZ2xQ4vN7mKcJrTsYuWg';

test('no environment means local-only', () => {
  assert.equal(readSupabaseConfig(), null);
  assert.equal(readSupabaseConfig({}), null);
});

test('a half-filled environment is not treated as configured', () => {
  assert.equal(readSupabaseConfig({ VITE_SUPABASE_URL: REAL_URL }), null);
  assert.equal(readSupabaseConfig({ VITE_SUPABASE_PUBLISHABLE_KEY: REAL_KEY }), null);
});

// Copying .env.example verbatim is the first thing a new contributor does; treating
// its literals as real would point every request at a host that does not exist.
test('the shipped placeholders keep the app offline', () => {
  assert.equal(readSupabaseConfig({ VITE_SUPABASE_URL: 'https://your-project-id.supabase.co', VITE_SUPABASE_PUBLISHABLE_KEY: 'your-placeholder-publishable-key' }), null);
});

test('a real pair is accepted and trimmed', () => {
  assert.deepEqual(
    readSupabaseConfig({ VITE_SUPABASE_URL: `  ${REAL_URL}  `, VITE_SUPABASE_PUBLISHABLE_KEY: ` ${REAL_KEY} ` }),
    { url: REAL_URL, key: REAL_KEY }
  );
});

test('the legacy anon key works as a fallback', () => {
  assert.equal(readSupabaseConfig({ VITE_SUPABASE_URL: REAL_URL, VITE_SUPABASE_ANON_KEY: REAL_KEY }).key, REAL_KEY);
  assert.equal(
    readSupabaseConfig({ VITE_SUPABASE_URL: REAL_URL, VITE_SUPABASE_PUBLISHABLE_KEY: REAL_KEY, VITE_SUPABASE_ANON_KEY: 'other' }).key,
    REAL_KEY
  );
});

test('plain http and junk urls are rejected', () => {
  assert.equal(readSupabaseConfig({ VITE_SUPABASE_URL: 'http://abcd.supabase.co', VITE_SUPABASE_PUBLISHABLE_KEY: REAL_KEY }), null);
  assert.equal(readSupabaseConfig({ VITE_SUPABASE_URL: 'not a url', VITE_SUPABASE_PUBLISHABLE_KEY: REAL_KEY }), null);
});
