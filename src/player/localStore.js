import { applyResult, emptyProfile, PROFILE_VERSION } from './reducer.js';

const KEY = 'grammax.player.v1';

function parse(raw) {
  if (!raw) return emptyProfile();
  try {
    const parsed = JSON.parse(raw);
    // A profile written by an older version is dropped rather than migrated: this
    // build has no real users yet, and carrying every past shape forever is how a
    // toy store turns into a migration layer.
    return parsed?.version === PROFILE_VERSION ? parsed : emptyProfile();
  } catch {
    return emptyProfile();
  }
}

export function createLocalStore(storage) {
  async function read() {
    return parse(storage.getItem(KEY));
  }

  async function write(profile) {
    storage.setItem(KEY, JSON.stringify(profile));
    return profile;
  }

  async function record(result, today) {
    return write(applyResult(await read(), result, today));
  }

  return { kind: 'local', storageKey: KEY, read, write, record };
}
