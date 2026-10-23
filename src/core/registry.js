import { games } from '../games/registry.js';
import { gameModules } from '../games/index.js';

export const registeredGames = games;

export function findGame(id) {
  const manifest = games.find((game) => game.id === id);
  if (!manifest) return null;

  const wired = gameModules[id];
  if (!wired) {
    throw new Error(
      `"${id}" is in src/games/registry.js but src/games/index.js does not wire a component for it. ` +
        'Add it to gameModules and run `npm run registry`.'
    );
  }
  return { manifest, ...wired };
}

export function pickDifficulty(manifest, difficultyId) {
  const difficulty =
    manifest.difficulties.find((entry) => entry.id === difficultyId) ?? manifest.difficulties[0];
  return difficulty;
}
