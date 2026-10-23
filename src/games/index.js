import * as typingGameLogic from './typing-game/logic.js';
import TypingGame from './typing-game/index.jsx';

// The one place a new game has to be wired by hand. `scripts/build-registry.mjs`
// checks the manifest side; this map is checked against it by core/registry.js at
// startup, so a game registered but not wired here fails on load instead of
// showing a lobby card that throws when clicked.
export const gameModules = {
  'typing-game': { Component: TypingGame, logic: typingGameLogic },
};
