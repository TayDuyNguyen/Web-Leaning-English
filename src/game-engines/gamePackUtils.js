import {
  sanitizeGrammarList,
  sanitizeSentenceList,
  sanitizeVocabList,
} from './gameDataUtils.js';

const PACK_CONFIG = {
  vocab: {
    prefix: 'vocab-pack',
    defaultName: 'Bộ từ vựng mới',
    legacyName: 'Bộ từ vựng cũ',
    sanitizeItems: sanitizeVocabList,
  },
  grammar: {
    prefix: 'grammar-pack',
    defaultName: 'Bộ ngữ pháp mới',
    legacyName: 'Bộ ngữ pháp cũ',
    sanitizeItems: sanitizeGrammarList,
  },
  sentence: {
    prefix: 'sentence-pack',
    defaultName: 'Bộ câu mới',
    legacyName: 'Bộ câu cũ',
    sanitizeItems: sanitizeSentenceList,
  },
};

function getPackConfig(kind) {
  const config = PACK_CONFIG[kind];
  if (!config) {
    throw new Error(`Loại bộ dữ liệu không hợp lệ: ${kind}`);
  }
  return config;
}

function cleanText(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function toIsoString(value, fallback) {
  const date = value ? new Date(value) : null;
  return date && !Number.isNaN(date.getTime()) ? date.toISOString() : fallback;
}

function buildPackId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function compareNewestFirst(left, right) {
  const leftCreated = Date.parse(left.createdAt || '') || 0;
  const rightCreated = Date.parse(right.createdAt || '') || 0;
  if (rightCreated !== leftCreated) return rightCreated - leftCreated;

  const leftUpdated = Date.parse(left.updatedAt || '') || 0;
  const rightUpdated = Date.parse(right.updatedAt || '') || 0;
  return rightUpdated - leftUpdated;
}

export function createGamePack(kind, overrides = {}) {
  const config = getPackConfig(kind);
  const createdAt = toIsoString(overrides.createdAt, new Date().toISOString());
  const updatedAt = toIsoString(overrides.updatedAt, createdAt);

  return {
    id: cleanText(overrides.id) || buildPackId(config.prefix),
    name: cleanText(overrides.name) || config.defaultName,
    items: config.sanitizeItems(Array.isArray(overrides.items) ? overrides.items : []),
    createdAt,
    updatedAt,
  };
}

export function cloneGamePack(kind, pack) {
  const baseName = cleanText(pack?.name) || getPackConfig(kind).defaultName;
  return createGamePack(kind, {
    name: `${baseName} (Bản sao)`,
    items: Array.isArray(pack?.items) ? pack.items : [],
  });
}

export function sanitizeGamePackCollection(kind, packs, legacyItems = []) {
  const config = getPackConfig(kind);
  const normalizedLegacyItems = config.sanitizeItems(legacyItems);

  if (!Array.isArray(packs) || packs.length === 0) {
    if (normalizedLegacyItems.length === 0) return [];
    return [
      createGamePack(kind, {
        name: config.legacyName,
        items: normalizedLegacyItems,
      }),
    ];
  }

  const seenIds = new Set();
  return packs
    .map((pack, index) => {
      const fallbackName = `${config.defaultName} ${index + 1}`;
      const createdAt = toIsoString(pack?.createdAt, new Date().toISOString());
      const normalized = createGamePack(kind, {
        id: cleanText(pack?.id) || `${config.prefix}-${index + 1}`,
        name: cleanText(pack?.name) || fallbackName,
        items: Array.isArray(pack?.items) ? pack.items : [],
        createdAt,
        updatedAt: toIsoString(pack?.updatedAt, createdAt),
      });

      if (seenIds.has(normalized.id)) {
        return createGamePack(kind, {
          ...normalized,
          id: buildPackId(config.prefix),
        });
      }

      seenIds.add(normalized.id);
      return normalized;
    })
    .sort(compareNewestFirst);
}

export function movePackToFront(packs, packId) {
  const current = packs.find((pack) => pack.id === packId);
  if (!current) return packs;

  const now = new Date().toISOString();
  return sanitizeGamePackCollection(
    inferPackKindFromId(packId),
    [
      { ...current, createdAt: now, updatedAt: now },
      ...packs.filter((pack) => pack.id !== packId),
    ],
    []
  );
}

function inferPackKindFromId(packId) {
  if (packId.startsWith('grammar-pack')) return 'grammar';
  if (packId.startsWith('sentence-pack')) return 'sentence';
  return 'vocab';
}

export function updatePackItems(kind, packs, packId, nextItems) {
  return sanitizeGamePackCollection(
    kind,
    packs.map((pack) =>
      pack.id === packId
        ? {
            ...pack,
            items: nextItems,
            updatedAt: new Date().toISOString(),
          }
        : pack
    ),
    []
  );
}
