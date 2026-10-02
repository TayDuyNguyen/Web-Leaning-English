import { createClient } from '@supabase/supabase-js';
import { readSupabaseConfig } from './supabaseConfig.js';

let cached;

export function supabaseClientFor(env) {
  const config = readSupabaseConfig(env);
  if (!config) return null;
  // One client per page load: the library keeps a connection pool and an auth
  // listener, and a second instance would fight the first over the stored session.
  cached ??= createClient(config.url, config.key, {
    auth: { persistSession: true, autoRefreshToken: true },
  });
  return cached;
}

export function resetSupabaseClientCache() {
  cached = undefined;
}
