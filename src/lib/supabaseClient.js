import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
const supabaseAnonKey =
  (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

const hasPlaceholderConfig =
  supabaseUrl.includes('your-project-id') ||
  supabaseAnonKey.includes('your-placeholder') ||
  supabaseAnonKey === 'placeholder-key';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey && !hasPlaceholderConfig);

if (!isSupabaseConfigured) {
  console.warn(
    'Supabase URL hoặc khóa công khai chưa được cấu hình đúng trong file .env.'
  );
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);
