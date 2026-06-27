import { defaultVocab } from '../data/default-vocab';
import {
  createGamePack,
  sanitizeGamePackCollection,
} from '../game-engines/gamePackUtils';
import {
  sanitizeGrammarList,
  sanitizeSentenceList,
  sanitizeVocabList,
} from '../game-engines/gameDataUtils';
import { isSupabaseConfigured, supabase } from './supabaseClient';

export const STORAGE_KEYS = {
  theme: 'toeic_theme',
  scores: 'toeic_master_scores',
  vocab: 'toeic_master_vocab',
  grammar: 'toeic_custom_grammar',
  sentences: 'toeic_custom_sentences',
  vocabPacks: 'toeic_vocab_packs_v2',
  grammarPacks: 'toeic_grammar_packs_v2',
  sentencePacks: 'toeic_sentence_packs_v2',
  timerLimit: 'toeic_game_timer_limit',
  playerLevel: 'vb_player_lvl',
  playerXp: 'vb_player_xp',
  cloudMigratedPrefix: 'toeic_cloud_migrated_',
};

export const DEFAULT_PROFILE = {
  theme: 'dark',
  playerLevel: 1,
  playerXp: 0,
  gameTimerLimit: 10,
};

function safeParseJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function parseInteger(value, fallback) {
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? fallback : parsed;
}

function isMissingRelationError(error) {
  const message = typeof error?.message === 'string' ? error.message.toLowerCase() : '';
  return message.includes('does not exist') || message.includes('relation') || message.includes('schema cache');
}

function ensureDefaultVocabPack(packs) {
  if (packs.length > 0) return packs;
  return [createGamePack('vocab', { name: 'Bộ từ vựng mặc định', items: defaultVocab })];
}

export function hasCloudSession(session) {
  return Boolean(isSupabaseConfigured && session?.user?.id);
}

export function getLocalProfile() {
  return {
    theme: localStorage.getItem(STORAGE_KEYS.theme) || DEFAULT_PROFILE.theme,
    playerLevel: parseInteger(localStorage.getItem(STORAGE_KEYS.playerLevel), DEFAULT_PROFILE.playerLevel),
    playerXp: parseInteger(localStorage.getItem(STORAGE_KEYS.playerXp), DEFAULT_PROFILE.playerXp),
    gameTimerLimit: parseInteger(localStorage.getItem(STORAGE_KEYS.timerLimit), DEFAULT_PROFILE.gameTimerLimit),
  };
}

export function saveLocalProfilePatch(patch) {
  if (Object.prototype.hasOwnProperty.call(patch, 'theme')) {
    localStorage.setItem(STORAGE_KEYS.theme, patch.theme);
  }
  if (Object.prototype.hasOwnProperty.call(patch, 'playerLevel')) {
    localStorage.setItem(STORAGE_KEYS.playerLevel, String(patch.playerLevel));
  }
  if (Object.prototype.hasOwnProperty.call(patch, 'playerXp')) {
    localStorage.setItem(STORAGE_KEYS.playerXp, String(patch.playerXp));
  }
  if (Object.prototype.hasOwnProperty.call(patch, 'gameTimerLimit')) {
    localStorage.setItem(STORAGE_KEYS.timerLimit, String(patch.gameTimerLimit));
  }
}

export function getLocalTopicScores() {
  return safeParseJson(STORAGE_KEYS.scores, {});
}

export function saveLocalTopicScores(scores) {
  localStorage.setItem(STORAGE_KEYS.scores, JSON.stringify(scores));
}

export function getLocalVocabList() {
  return sanitizeVocabList(safeParseJson(STORAGE_KEYS.vocab, []));
}

export function saveLocalVocabList(vocabList) {
  localStorage.setItem(STORAGE_KEYS.vocab, JSON.stringify(vocabList));
}

export function getLocalGrammarList() {
  return sanitizeGrammarList(safeParseJson(STORAGE_KEYS.grammar, []));
}

export function saveLocalGrammarList(grammarList) {
  localStorage.setItem(STORAGE_KEYS.grammar, JSON.stringify(grammarList));
}

export function getLocalSentenceList() {
  return sanitizeSentenceList(safeParseJson(STORAGE_KEYS.sentences, []));
}

export function saveLocalSentenceList(sentenceList) {
  localStorage.setItem(STORAGE_KEYS.sentences, JSON.stringify(sentenceList));
}

export function getLocalVocabPacks() {
  return ensureDefaultVocabPack(
    sanitizeGamePackCollection(
      'vocab',
      safeParseJson(STORAGE_KEYS.vocabPacks, []),
      getLocalVocabList()
    )
  );
}

export function saveLocalVocabPacks(packs) {
  localStorage.setItem(STORAGE_KEYS.vocabPacks, JSON.stringify(sanitizeGamePackCollection('vocab', packs, [])));
}

export function getLocalGrammarPacks() {
  return sanitizeGamePackCollection(
    'grammar',
    safeParseJson(STORAGE_KEYS.grammarPacks, []),
    getLocalGrammarList()
  );
}

export function saveLocalGrammarPacks(packs) {
  localStorage.setItem(STORAGE_KEYS.grammarPacks, JSON.stringify(sanitizeGamePackCollection('grammar', packs, [])));
}

export function getLocalSentencePacks() {
  return sanitizeGamePackCollection(
    'sentence',
    safeParseJson(STORAGE_KEYS.sentencePacks, []),
    getLocalSentenceList()
  );
}

export function saveLocalSentencePacks(packs) {
  localStorage.setItem(STORAGE_KEYS.sentencePacks, JSON.stringify(sanitizeGamePackCollection('sentence', packs, [])));
}

async function loadCloudProfile(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('theme, player_level, player_xp, game_timer_limit')
    .eq('id', userId)
    .maybeSingle();

  if (error) throw error;

  if (!data) {
    return { ...DEFAULT_PROFILE };
  }

  return {
    theme: data.theme || DEFAULT_PROFILE.theme,
    playerLevel: data.player_level ?? DEFAULT_PROFILE.playerLevel,
    playerXp: data.player_xp ?? DEFAULT_PROFILE.playerXp,
    gameTimerLimit: data.game_timer_limit ?? DEFAULT_PROFILE.gameTimerLimit,
  };
}

async function saveCloudProfilePatch(userId, patch) {
  const current = await loadCloudProfile(userId);
  const payload = {
    id: userId,
    theme: patch.theme ?? current.theme,
    player_level: patch.playerLevel ?? current.playerLevel,
    player_xp: patch.playerXp ?? current.playerXp,
    game_timer_limit: patch.gameTimerLimit ?? current.gameTimerLimit,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase.from('profiles').upsert(payload);
  if (error) throw error;
}

export async function loadProfile(session) {
  if (!hasCloudSession(session)) {
    return getLocalProfile();
  }
  return loadCloudProfile(session.user.id);
}

export async function saveProfilePatch(session, patch) {
  if (!hasCloudSession(session)) {
    saveLocalProfilePatch(patch);
    return;
  }
  await saveCloudProfilePatch(session.user.id, patch);
}

export async function loadTopicScores(session) {
  if (!hasCloudSession(session)) {
    return getLocalTopicScores();
  }

  const { data, error } = await supabase
    .from('topic_scores')
    .select('topic_id, scores_data')
    .eq('user_id', session.user.id);

  if (error) throw error;

  return (data || []).reduce((acc, item) => {
    acc[item.topic_id] = item.scores_data;
    return acc;
  }, {});
}

export async function saveTopicScores(session, scores) {
  if (!hasCloudSession(session)) {
    saveLocalTopicScores(scores);
    return;
  }

  const userId = session.user.id;
  const { error: deleteError } = await supabase.from('topic_scores').delete().eq('user_id', userId);
  if (deleteError) throw deleteError;

  const rows = Object.entries(scores).map(([topicId, scoresData]) => ({
    user_id: userId,
    topic_id: topicId,
    scores_data: scoresData,
    updated_at: new Date().toISOString(),
  }));

  if (rows.length === 0) return;

  const { error } = await supabase.from('topic_scores').insert(rows);
  if (error) throw error;
}

async function loadLegacyVocabRows(session) {
  const { data, error } = await supabase
    .from('custom_vocab')
    .select('client_id, word, meaning, options, mastery, correct_count, incorrect_count')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: true });

  if (error) throw error;

  return sanitizeVocabList((data || []).map((item) => ({
    id: item.client_id,
    word: item.word,
    meaning: item.meaning,
    options: item.options,
    mastery: item.mastery,
    correctCount: item.correct_count,
    incorrectCount: item.incorrect_count,
  })));
}

async function loadLegacyGrammarRows(session) {
  const { data, error } = await supabase
    .from('custom_grammar')
    .select('client_id, question, options, answer, explanation, mastery, correct_count, incorrect_count')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: true });

  if (error) throw error;

  return sanitizeGrammarList((data || []).map((item) => ({
    id: item.client_id,
    question: item.question,
    options: item.options,
    answer: item.answer,
    explanation: item.explanation,
    mastery: item.mastery,
    correctCount: item.correct_count,
    incorrectCount: item.incorrect_count,
  })));
}

async function loadLegacySentenceRows(session) {
  const { data, error } = await supabase
    .from('custom_sentences')
    .select('client_id, vietnamese, english, mastery, correct_count, incorrect_count')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: true });

  if (error) throw error;

  return sanitizeSentenceList((data || []).map((item) => ({
    id: item.client_id,
    vietnamese: item.vietnamese,
    english: item.english,
    mastery: item.mastery,
    correctCount: item.correct_count,
    incorrectCount: item.incorrect_count,
  })));
}

async function replaceCloudPackCollection(table, kind, session, packs) {
  const userId = session.user.id;
  const sanitized = sanitizeGamePackCollection(kind, packs, []);

  const { error: deleteError } = await supabase.from(table).delete().eq('user_id', userId);
  if (deleteError) {
    if (isMissingRelationError(deleteError)) {
      throw new Error('Supabase chưa có bảng lưu nhiều bộ dữ liệu. Hãy chạy file supabase/schema.sql mới nhất.');
    }
    throw deleteError;
  }

  if (sanitized.length === 0) return;

  const { error } = await supabase.from(table).insert(
    sanitized.map((pack) => ({
      user_id: userId,
      client_id: pack.id,
      name: pack.name,
      items: pack.items,
      created_at: pack.createdAt,
      updated_at: pack.updatedAt,
    }))
  );

  if (error) {
    if (isMissingRelationError(error)) {
      throw new Error('Supabase chưa có bảng lưu nhiều bộ dữ liệu. Hãy chạy file supabase/schema.sql mới nhất.');
    }
    throw error;
  }
}

async function loadCloudPackCollection(table, kind, session, legacyLoader, ensureDefault = false) {
  try {
    const { data, error } = await supabase
      .from(table)
      .select('client_id, name, items, created_at, updated_at')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    const packs = sanitizeGamePackCollection(
      kind,
      (data || []).map((row) => ({
        id: row.client_id,
        name: row.name,
        items: row.items,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      })),
      []
    );

    return ensureDefault ? ensureDefaultVocabPack(packs) : packs;
  } catch (error) {
    if (!isMissingRelationError(error)) {
      throw error;
    }

    const legacyItems = await legacyLoader(session);
    const packs = sanitizeGamePackCollection(kind, [], legacyItems);
    return ensureDefault ? ensureDefaultVocabPack(packs) : packs;
  }
}

export async function loadVocabPacks(session) {
  if (!hasCloudSession(session)) {
    return getLocalVocabPacks();
  }
  return loadCloudPackCollection('custom_vocab_packs', 'vocab', session, loadLegacyVocabRows, true);
}

export async function saveVocabPacks(session, packs) {
  const sanitized = ensureDefaultVocabPack(sanitizeGamePackCollection('vocab', packs, []));
  if (!hasCloudSession(session)) {
    saveLocalVocabPacks(sanitized);
    return;
  }
  await replaceCloudPackCollection('custom_vocab_packs', 'vocab', session, sanitized);
}

export async function loadGrammarPacks(session) {
  if (!hasCloudSession(session)) {
    return getLocalGrammarPacks();
  }
  return loadCloudPackCollection('custom_grammar_packs', 'grammar', session, loadLegacyGrammarRows);
}

export async function saveGrammarPacks(session, packs) {
  const sanitized = sanitizeGamePackCollection('grammar', packs, []);
  if (!hasCloudSession(session)) {
    saveLocalGrammarPacks(sanitized);
    return;
  }
  await replaceCloudPackCollection('custom_grammar_packs', 'grammar', session, sanitized);
}

export async function loadSentencePacks(session) {
  if (!hasCloudSession(session)) {
    return getLocalSentencePacks();
  }
  return loadCloudPackCollection('custom_sentence_packs', 'sentence', session, loadLegacySentenceRows);
}

export async function saveSentencePacks(session, packs) {
  const sanitized = sanitizeGamePackCollection('sentence', packs, []);
  if (!hasCloudSession(session)) {
    saveLocalSentencePacks(sanitized);
    return;
  }
  await replaceCloudPackCollection('custom_sentence_packs', 'sentence', session, sanitized);
}

export function getCloudMigrationKey(userId) {
  return `${STORAGE_KEYS.cloudMigratedPrefix}${userId}`;
}

export async function migrateLocalDataToCloud(session) {
  if (!hasCloudSession(session)) return;

  await saveProfilePatch(session, getLocalProfile());
  await saveTopicScores(session, getLocalTopicScores());
  await saveVocabPacks(session, getLocalVocabPacks());
  await saveGrammarPacks(session, getLocalGrammarPacks());
  await saveSentencePacks(session, getLocalSentencePacks());
}

export function hasMeaningfulLocalData() {
  const profile = getLocalProfile();
  const hasProfileChanges =
    profile.theme !== DEFAULT_PROFILE.theme ||
    profile.playerLevel !== DEFAULT_PROFILE.playerLevel ||
    profile.playerXp !== DEFAULT_PROFILE.playerXp ||
    profile.gameTimerLimit !== DEFAULT_PROFILE.gameTimerLimit;

  const rawVocabPacks = safeParseJson(STORAGE_KEYS.vocabPacks, []);
  const rawGrammarPacks = safeParseJson(STORAGE_KEYS.grammarPacks, []);
  const rawSentencePacks = safeParseJson(STORAGE_KEYS.sentencePacks, []);
  const hasLegacyFlatData =
    getLocalVocabList().length > 0 || getLocalGrammarList().length > 0 || getLocalSentenceList().length > 0;

  return (
    hasProfileChanges ||
    Object.keys(getLocalTopicScores()).length > 0 ||
    hasLegacyFlatData ||
    sanitizeGamePackCollection('vocab', rawVocabPacks, []).some((pack) => pack.items.length > 0) ||
    sanitizeGamePackCollection('grammar', rawGrammarPacks, []).some((pack) => pack.items.length > 0) ||
    sanitizeGamePackCollection('sentence', rawSentencePacks, []).some((pack) => pack.items.length > 0)
  );
}
