// Maps the URL hash to the top-level view id: 'topics' (dashboard), 'game' (arena)
// or a topic id. Both the initial state and the hashchange listener read this, so a
// cold load can no longer disagree with the listener and let the URL-sync effect
// overwrite a valid deep link.
export const DASHBOARD_TAB = 'topics';
export const GAME_TAB = 'game';
export const BATTLE_HASH = '#game/battle';

export function parseHashRoute(hash) {
  const value = typeof hash === 'string' ? hash : '';
  if (value === '#game' || value.startsWith('#game/')) return GAME_TAB;
  if (value.startsWith('#topic-')) {
    return value.slice('#topic-'.length).split('/')[0] || DASHBOARD_TAB;
  }
  return DASHBOARD_TAB;
}

// The canonical hash for a view. Topic views also carry a sub-route
// (`#topic-<id>/theory-0`), so this is a prefix rather than the whole URL.
export function hashForTab(activeTab) {
  if (activeTab === GAME_TAB) return '#game';
  if (activeTab === DASHBOARD_TAB) return '';
  return `#topic-${activeTab}`;
}

// True when `hash` already represents `activeTab`, sub-route included.
export function hashMatchesTab(hash, activeTab) {
  const target = hashForTab(activeTab);
  if (target === '') return hash === '' || hash === '#topics';
  if (target === '#game') return hash === '#game' || hash.startsWith('#game/');
  return hash.startsWith(target);
}

// Writes the URL for a route change. `replace` is for normalising the URL to match
// state the app already holds (mount-time defaults, guard reverts); those must not add
// a history entry, or browser back undoes a write the user never made. User-initiated
// navigation pushes.
export function writeHashRoute(hash, { replace = false } = {}) {
  if (window.location.hash === hash) return;
  if (!replace) {
    window.location.hash = hash;
    return;
  }
  const { pathname, search } = window.location;
  history.replaceState(history.state, '', hash === '' ? `${pathname}${search}` : `${pathname}${search}${hash}`);
}

export function topicHashPrefix(topicId) {
  return `#topic-${topicId}`;
}

const SUB_ROUTE = /^\/(theory|exercise)-(\d+)$/;

// Reads `theory-<n>` / `exercise-<n>` off a topic URL. Returns null for the bare
// prefix and for another topic's URL; the caller decides what a missing sub-route
// means, because only the mounted view knows its own default.
export function parseTopicSubRoute(hash, topicId) {
  const value = typeof hash === 'string' ? hash : '';
  const prefix = topicHashPrefix(topicId);
  if (!value.startsWith(prefix)) return null;
  const match = SUB_ROUTE.exec(value.slice(prefix.length));
  return match ? { type: match[1], id: Number(match[2]) } : null;
}
