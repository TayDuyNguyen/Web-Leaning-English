// The single place the app asks for learning content: Supabase first, the bundled
// `src/data/` tree behind it (roadmap Phase 1). Views import this rather than a data
// file, so switching a topic's source is not a view change.
//
// Two rules that are easy to get wrong and are the reason this file exists:
//
//  1. The database is authoritative *when it answers*. A topic with no rows is a
//     topic with no content, not a reason to show the bundle — otherwise a partially
//     seeded database would silently serve stale lessons forever. The bundle is used
//     only when the query itself fails, which is the documented local-only path and
//     the state right after M2 before M3 has run.
//  2. Falling back must be visible. A deployment that quietly serves bundled content
//     while claiming to be cloud-backed is the failure mode this project has already
//     hit once (see the placeholder-key detection fixed in Phase 0), so the first
//     fallback logs what to do about it.

import { grammarTopics } from '../data/topics';
import { contentModules } from '../data/content-modules';
import { denormalizeTopic, toTopicViewModel } from './contentSchema';
import { isSupabaseConfigured, supabase } from './supabaseClient';

const TOPIC_COLUMNS = 'id, number, name, english_name, category, description, icon, exercise_count';
const LESSON_COLUMNS = 'id, topic_id, position, title, usage_text, formula, signals_text';
const EXERCISE_COLUMNS = 'id, topic_id, position, title, description';
const QUESTION_COLUMNS = 'id, exercise_id, position, question_number, question_type, question_text, answer, explanation, options';

// PostgREST answers "no such table" with PGRST205 before M2 is applied; 42P01 is the
// server-side code. The message test covers a proxy that rewrites the code.
function isMissingContentTables(error) {
  return (
    error?.code === 'PGRST205' ||
    error?.code === '42P01' ||
    /does not exist|schema cache|relation/i.test(typeof error?.message === 'string' ? error.message : '')
  );
}

let reportedFallback = null;

function reportFallback(reason, detail) {
  if (reportedFallback === reason) return;
  reportedFallback = reason;
  if (reason === 'missing-tables') {
    console.warn(
      'Supabase chưa có bảng nội dung (topics/lessons/exercises/exercise_questions). ' +
        'Chạy supabase/migrations/20260929000001_content_tables.sql rồi seed supabase/seed/content.sql. ' +
        'Ứng dụng đang dùng nội dung đóng gói trong bundle.'
    );
    return;
  }
  console.warn('Không đọc được nội dung từ Supabase, chuyển sang dữ liệu đóng gói:', detail);
}

function bundledLoaderFor(topicId) {
  return contentModules.find((entry) => entry.topicId === topicId)?.load ?? null;
}

async function loadBundledContent(topicId) {
  const load = bundledLoaderFor(topicId);
  if (!load) return null;
  const data = await load();
  return data ?? null;
}

/**
 * Every topic the dashboard lists. Ordered by catalogue number, which is the order
 * the grid has always used.
 */
export async function loadTopics() {
  if (!isSupabaseConfigured) {
    return grammarTopics;
  }

  const { data, error } = await supabase.from('topics').select(TOPIC_COLUMNS).order('number', { ascending: true });

  if (error) {
    reportFallback(isMissingContentTables(error) ? 'missing-tables' : 'error', error);
    return grammarTopics;
  }

  return (data || []).map(toTopicViewModel);
}

/**
 * One topic plus its content, for the study view. Both halves come from the same
 * source: a topic authored directly in the database has no entry in `topics.js`, and
 * pairing cloud content with a bundled header would strand it behind "not found".
 */
export async function loadTopic(topicId) {
  const [topic, content] = await Promise.all([loadTopicMeta(topicId), loadTopicContent(topicId)]);
  return { topic, content };
}

async function loadTopicMeta(topicId) {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase.from('topics').select(TOPIC_COLUMNS).eq('id', topicId).maybeSingle();

    if (!error) {
      return data ? toTopicViewModel(data) : null;
    }
    reportFallback(isMissingContentTables(error) ? 'missing-tables' : 'error', error);
  }

  const catalogued = grammarTopics.find((topic) => topic.id === topicId);
  return catalogued ?? null;
}

/**
 * One topic's theory and practice, in the `{ tenses, exercises }` shape the study
 * view already renders. `tenses` is the legacy name for a theory lesson and is kept
 * so this migration costs no render-code rewrite; Phase 4 can rename both trees.
 *
 * Returns null for "this topic has no content", which is also true for 28 of the 30
 * catalogued topics today.
 */
export async function loadTopicContent(topicId) {
  if (isSupabaseConfigured) {
    const content = await loadCloudContent(topicId);
    if (content !== undefined) return content;
  }
  return loadBundledContent(topicId);
}

// undefined means "the database could not be asked", so the caller falls back.
// null means "the database says this topic is empty", which is final.
async function loadCloudContent(topicId) {
  const [lessons, exercises] = await Promise.all([
    supabase.from('lessons').select(LESSON_COLUMNS).eq('topic_id', topicId),
    supabase.from('exercises').select(EXERCISE_COLUMNS).eq('topic_id', topicId),
  ]);

  const firstError = lessons.error || exercises.error;
  if (firstError) {
    reportFallback(isMissingContentTables(firstError) ? 'missing-tables' : 'error', firstError);
    return undefined;
  }

  const exerciseRows = exercises.data || [];
  let questionRows = [];

  if (exerciseRows.length > 0) {
    const questions = await supabase
      .from('exercise_questions')
      .select(QUESTION_COLUMNS)
      .in('exercise_id', exerciseRows.map((row) => row.id));

    if (questions.error) {
      reportFallback(isMissingContentTables(questions.error) ? 'missing-tables' : 'error', questions.error);
      return undefined;
    }
    questionRows = questions.data || [];
  }

  return denormalizeTopic(topicId, lessons.data || [], exerciseRows, questionRows);
}
