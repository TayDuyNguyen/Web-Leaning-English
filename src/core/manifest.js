import { LEVELS } from './contentSchema.js';

export const REQUIRED_FIELDS = ['id', 'name', 'summary', 'contentTypes', 'levels', 'difficulties', 'skills'];

// The manifest is the only thing the app reads before a game's code is loaded,
// so a wrong one has to fail at build time in Node — not at click time in the
// browser, where the only symptom is a game silently missing from the lobby.
export function validateManifest(raw, { source }) {
  const problems = [];

  for (const field of REQUIRED_FIELDS) {
    if (raw?.[field] === undefined) problems.push(`${source}: missing "${field}"`);
  }

  const manifest = raw ?? {};
  if (typeof manifest.id === 'string' && !/^[a-z0-9-]+$/.test(manifest.id)) {
    problems.push(`${source}: id "${manifest.id}" must be lowercase letters, digits and dashes`);
  }
  for (const field of ['contentTypes', 'levels', 'skills']) {
    if (manifest[field] !== undefined && (!Array.isArray(manifest[field]) || manifest[field].length === 0)) {
      problems.push(`${source}: "${field}" must be a non-empty array`);
    }
  }
  const unknownLevels = Array.isArray(manifest.levels) ? manifest.levels.filter((l) => !LEVELS.includes(l)) : [];
  if (unknownLevels.length > 0) {
    problems.push(`${source}: levels [${unknownLevels.join(', ')}] are not in ${LEVELS.join('/')}`);
  }

  if (Array.isArray(manifest.difficulties)) {
    if (manifest.difficulties.length === 0) problems.push(`${source}: "difficulties" must list at least one`);
    const seen = new Set();
    for (const difficulty of manifest.difficulties) {
      if (typeof difficulty?.id !== 'string' || !difficulty.id) {
        problems.push(`${source}: every difficulty needs an "id"`);
        continue;
      }
      if (seen.has(difficulty.id)) problems.push(`${source}: duplicate difficulty "${difficulty.id}"`);
      seen.add(difficulty.id);
      if (difficulty.seconds !== undefined && (!Number.isInteger(difficulty.seconds) || difficulty.seconds < 0)) {
        problems.push(`${source}: difficulty "${difficulty.id}" seconds must be 0 or a positive integer`);
      }
      // minItems is what lets the lobby grey out a difficulty before a game's own
      // logic runs, so core never has to learn what "pairs" or "words" mean.
      if (difficulty.minItems !== undefined && (!Number.isInteger(difficulty.minItems) || difficulty.minItems < 1)) {
        problems.push(`${source}: difficulty "${difficulty.id}" minItems must be a positive integer`);
      }
    }
  } else if (manifest.difficulties !== undefined) {
    problems.push(`${source}: "difficulties" must be an array`);
  }

  if (problems.length > 0) {
    throw new Error(`${source}: ${problems.length} problem(s)\n  ${problems.join('\n  ')}`);
  }

  return {
    id: manifest.id,
    name: manifest.name,
    summary: manifest.summary,
    contentTypes: manifest.contentTypes,
    levels: manifest.levels,
    skills: manifest.skills,
    difficulties: manifest.difficulties.map((d) => ({ seconds: 0, minItems: 1, settings: {}, ...d })),
  };
}
