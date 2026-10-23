const PLACEHOLDER_URL = 'https://your-project-id.supabase.co';
const PLACEHOLDER_KEY = 'your-placeholder-publishable-key';

function filled(value) {
  return typeof value === 'string' && value.trim() !== '';
}

function looksRealUrl(value) {
  return /^https:\/\/[a-z0-9.-]+\.[a-z]{2,}([/:]|$)/i.test(value.trim());
}

// `.env.example` ships with deliberate placeholders, and copying it verbatim is the
// single most common thing a new contributor does. Treating those literals as
// "configured" would send every request to a nonexistent host and the app would
// look broken rather than offline.
export function readSupabaseConfig(env = {}) {
  const url = filled(env.VITE_SUPABASE_URL) ? env.VITE_SUPABASE_URL.trim() : '';
  const key = filled(env.VITE_SUPABASE_PUBLISHABLE_KEY)
    ? env.VITE_SUPABASE_PUBLISHABLE_KEY.trim()
    : filled(env.VITE_SUPABASE_ANON_KEY)
      ? env.VITE_SUPABASE_ANON_KEY.trim()
      : '';

  if (!url || !key) return null;
  if (url === PLACEHOLDER_URL || key === PLACEHOLDER_KEY) return null;
  if (!looksRealUrl(url)) return null;

  return { url, key };
}
