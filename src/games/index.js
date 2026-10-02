import * as wordMatchLogic from './word-match/logic.js';
import * as wordScrambleLogic from './word-scramble/logic.js';
import WordMatch from './word-match/index.jsx';
import WordScramble from './word-scramble/index.jsx';

// The one place a new game has to be wired by hand. `scripts/build-registry.mjs`
// checks the manifest side; this map is checked against it by core/registry.js at
// startup, so a game registered but not wired here fails on load instead of
// showing a lobby card that throws when clicked.
export const gameModules = {
  'word-match': { Component: WordMatch, logic: wordMatchLogic },
  'word-scramble': { Component: WordScramble, logic: wordScrambleLogic },
};
