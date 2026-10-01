/**
 * Pure predicate deciding whether Supabase credentials are real enough to use.
 *
 * Kept free of `import.meta.env` so it can be unit tested under `node --test`.
 * Getting this wrong in the permissive direction is expensive: the app would
 * believe cloud sync is live and fire requests at a nonexistent host instead of
 * falling back to local-only storage, which is the documented offline path.
 */

const PLACEHOLDER_PATTERN = /your-|yoursite|placeholder|changeme|replace[-_]?me|example|dummy|sample|fake|todo|xxx/i;

// Minimum length of a real Supabase key: legacy anon JWTs are far longer, and the
// new `sb_publishable_...` format clears this comfortably. Catches `x`, `test`, `1`.
const MIN_KEY_LENGTH = 20;

function isLocalHostname(hostname) {
  return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1';
}

function isUsableUrl(value) {
  let parsed;
  try {
    parsed = new URL(value);
  } catch {
    return false;
  }

  if (parsed.protocol === 'https:') return !PLACEHOLDER_PATTERN.test(parsed.hostname);

  // `supabase start` serves the local instance over plain http.
  if (parsed.protocol === 'http:') {
    return isLocalHostname(parsed.hostname) && !PLACEHOLDER_PATTERN.test(parsed.hostname);
  }

  return false;
}

function isUsableKey(value) {
  if (!value) return false;
  if (PLACEHOLDER_PATTERN.test(value)) return false;
  return value.length >= MIN_KEY_LENGTH;
}

export function isSupabaseConfigured(rawUrl, rawKey) {
  const url = typeof rawUrl === 'string' ? rawUrl.trim() : '';
  const key = typeof rawKey === 'string' ? rawKey.trim() : '';
  return isUsableUrl(url) && isUsableKey(key);
}
