import { createClient } from '@supabase/supabase-js';
import { isSupabaseConfigured as evaluateSupabaseConfig } from './supabaseConfig';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
const supabaseAnonKey =
  (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

export const isSupabaseConfigured = evaluateSupabaseConfig(supabaseUrl, supabaseAnonKey);

if (!isSupabaseConfigured) {
  console.warn(
    'Supabase URL hoặc khóa công khai chưa được cấu hình đúng trong file .env.'
  );
}

// Callers gate on isSupabaseConfigured before touching the network; the fallbacks
// only exist so that `supabase` is never null for unauthenticated local-only mode.
export const supabase = createClient(
  isSupabaseConfigured ? supabaseUrl : 'https://placeholder.supabase.co',
  isSupabaseConfigured ? supabaseAnonKey : 'placeholder-key'
);
