export const LOBBY = { view: 'lobby' };

export function parseRoute(hash) {
  const parts = String(hash ?? '').replace(/^#/, '').split('/').filter(Boolean);
  if (parts[0] === 'play' && parts[1]) {
    return { view: 'play', game: parts[1], difficulty: parts[2] ?? null };
  }
  return LOBBY;
}

export function hashForRoute(route) {
  if (route.view === 'play') {
    return route.difficulty ? `#play/${route.game}/${route.difficulty}` : `#play/${route.game}`;
  }
  return '#';
}
