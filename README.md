# Grammax

**Game học tiếng Anh** — a Vietnamese-language English trainer built on React + Vite. Every game is an independent module reading from a shared content pool, and all of them write into one shared player profile. Progress lives in `localStorage` by default and moves to Supabase when a project is configured and a user is signed in.

![CI](https://github.com/TayDuyNguyen/Web-Leaning-English/actions/workflows/ci.yml/badge.svg)

---

## The three layers

```
content/   what is taught        vocabulary items graded A1–C1, one file per topic
   |
games/     how it is practised   each game reads the same items and asks differently
   |
player/    what happened         one reducer feeds XP, level, streak and word mastery
```

A game never stores knowledge of its own. `word-match` and `word-scramble` both draw from
`src/content/vocabulary/`, so one word is practised several ways in one session — which is the
difference between a game and a flashcard deck.

---

## What is playable today

| Game | Mechanic | Content it consumes |
| --- | --- | --- |
| **Word Match** | Pair each English word with its Vietnamese meaning; the round auto-submits once every pair is placed | `contentTypes: ["vocabulary"]` |
| **Word Scramble** | Reorder shuffled letters back into the word; submit enables once every box has text | `contentTypes: ["vocabulary"]` |
| **Fill Blank** | The headword is blanked out of its own example sentence; choose from four words drawn from the same topic | `contentTypes: ["vocabulary"]` |
| **Word Quiz** | Given the English word, choose its meaning from four; distractors prefer the same topic | `contentTypes: ["vocabulary"]` |

Each game declares its own difficulties in `manifest.json`, and each difficulty carries
`minItems` so the lobby can grey out a round the content pool cannot fill instead of starting
one that would throw.

| | Easy | Normal | Hard |
| --- | --- | --- | --- |
| Word Match | 3 pairs, no timer | 5 pairs, 30 s | 8 pairs, 20 s |
| Word Scramble | 4 words, no timer | 6 words, 45 s | 8 words, 30 s |
| Fill Blank | 4 questions, no timer | 6 questions, 40 s | 8 questions, 30 s |
| Word Quiz | 5 questions, no timer | 8 questions, 30 s | 12 questions, 20 s |

**Content authored so far: 74 vocabulary items** — A1 (26: `daily-life`, `travel`), A2 (24:
`daily-activities`, `describing-places`), B1 (24: `work-study`, `opinions-abstract`). B2 and C1
have no files yet; the lobby labels those levels "chưa có" rather than hiding them.

### Review mode

Because progress is stored as rows rather than one JSON blob, the lobby can ask "which words
does this learner keep missing" and turn the answer into a round. Toggling **Ôn tập** narrows
every game's pool to the twelve most-missed words, topped up with fresh words from the same
level when the list is shorter than the difficulty needs. No game knows this is happening —
the arena simply hands them a smaller pool.

---

## Design

[`DESIGN.md`](DESIGN.md) is the visual contract: Grammax Editorial Monochrome, adapted from
the Awwwards Swiss/editorial system. Warm light-grey canvas `#F8F8F8`, ink `#222222`, one
signal orange, Inter Tight throughout, 8px rhythm, and depth from tonal layering rather than
shadow.

It is machine-checked, not aspirational. `test/design-tokens.test.js` parses the DESIGN.md
frontmatter and asserts, in both directions, that every colour, radius and spacing token exists
in `src/app/styles.css` with the same value — and that the stylesheet invents none the document
does not name. Three semantic rules are enforced too: CEFR tints may only appear on level
chips, the `correct` green only on graded answers, and signal orange is never a background
fill. Change one file without the other and CI fails.

Two deliberate departures from the source system are documented in the file with their reasons:
one added hue (a quiz must distinguish right from wrong faster than ink on ink can), and the
category axis re-cut from content topics to CEFR levels.

---

## Adding a game

1. Create `src/games/<id>/` with `manifest.json`, `logic.js` and `index.jsx`. `logic.js` must
   export `createRound({ items, difficulty, seed })` and `gradeRound({ round, answers })`, and
   stay free of React so it runs under `node --test`.
2. `npm run registry` — regenerate `src/games/registry.js` from the manifests.
3. Add the component to `gameModules` in `src/games/index.js`.
4. Write tests.

No existing game is touched. `npm run registry:check` fails CI when a game directory exists but
is not in the registry, and `test/registry.test.js` fails when a registered game is missing
from the module map — the two ways a new game would otherwise vanish silently.

---

## Prerequisites

**Node.js `^20.19.0`, `^22.13.0`, or `>=24.0.0`** — enforced via `engines` in `package.json`.

Node 23 is deliberately excluded: ESLint 10 does not support it. Node 22.12 and below also
fail, despite satisfying Vite.

---

## Quick start

```bash
npm ci          # use npm ci, not npm install — see the warning below
npm run dev     # http://localhost:5173
```

> **Install with `npm ci`.** `npm install` on Windows rewrites `package-lock.json` and drops
> the `@emnapi/core` / `@emnapi/runtime` peer entries, which re-breaks `npm ci` on the Linux CI
> runner. If `git status` shows the lockfile after an npm command, revert it before committing.

**No `.env` is needed.** The app is local-first: with no credentials it plays, scores and
persists to `localStorage`, and the header reads "Lưu cục bộ".

---

## Scripts

| Command | Does |
| --- | --- |
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the built `dist/` locally |
| `npm run lint` | ESLint over `src`, `test` and `scripts` |
| `npm test` | Node's built-in test runner — no test framework installed |
| `npm run registry` | Regenerate `src/games/registry.js` from `src/games/*/manifest.json` |
| `npm run registry:check` | Fail if that artifact has drifted from the game directories |
| `npm run size` | Bundle report with budget checks (report-only; add `-- --strict` to enforce) |

---

## Project structure

```
├── .github/workflows/ci.yml    npm ci + lint + test + registry:check + build + size, Node 22/24
├── scripts/
│   ├── build-registry.mjs      src/games/*/manifest.json → src/games/registry.js
│   └── bundle-size.mjs         budget reporter
├── src/
│   ├── main.jsx                entry
│   ├── app/
│   │   ├── App.jsx             owns route, level, seed, review mode and the player store
│   │   ├── Arena.jsx           runs one round: builds it, times it, grades it, hands the
│   │   │                       GameResult to the player layer
│   │   ├── Lobby.jsx           renders the registry — no game is hard-coded here
│   │   ├── Account.jsx         sign in / sign up / sign out, honest about no-project
│   │   ├── hashRoute.js        pure route parsing
│   │   └── styles.css
│   ├── core/
│   │   ├── rng.js              seeded generator; a round must be replayable
│   │   ├── contentSchema.js    vocabulary validation + the folder→level rule
│   │   ├── manifest.js         game manifest validation
│   │   ├── registry.js         joins the generated registry to the module map
│   │   ├── scoring.js          GameResult shape, XP, level curve, streak
│   │   └── selection.js        review-mode pool shrinking (pure, so node can test it)
│   ├── content/
│   │   ├── index.js            glob loader + poolFor / reviewPool
│   │   └── vocabulary/<level>/<topic>.json
│   ├── games/
│   │   ├── registry.js         GENERATED — do not edit
│   │   ├── index.js            id → { Component, logic }
│   │   └── <id>/{manifest.json,logic.js,index.jsx}
│   └── player/
│       ├── reducer.js          one pure applyResult() shared by both stores
│       ├── localStore.js       localStorage
│       ├── cloudStore.js       Supabase
│       ├── supabaseConfig.js   pure credential validation
│       ├── supabaseClient.js   memoised client
│       └── index.js            picks a store, exposes authFor()
├── supabase/migrations/        player_stats, game_results, word_mastery + record_word_mastery()
└── test/                       *.test.js, run by `npm test`
```

Everything in `src/core/` and each game's `logic.js` imports no React and touches no DOM, which
is what lets `node --test` cover the rules without a browser.

---

## Routing

| URL | Screen |
| --- | --- |
| `#` | Lobby — profile, level picker, game list |
| `#play/<gameId>` | Arena, first difficulty |
| `#play/<gameId>/<difficultyId>` | Arena, chosen difficulty |

The round's random seed is React state, not part of the URL, so reloading a `#play/...` address
starts a fresh round instead of replaying the old one.

---

## Testing

```bash
npm test        # 109 tests
```

Logic-only, no framework: seeded RNG replay, scoring maths and the level curve, manifest
validation, vocabulary file integrity (unique ids, unique word text, unique meanings, and every
example containing its own headword), all four games' round construction and grading, pool
selection for review mode, registry synchronisation, the DESIGN.md token contract, the player
reducer, the local store and credential validation.

`npm run smoke:ui` was removed together with the UI it drove. Browser verification is manual
for now — see Known limitations.

---

## Known limitations

- **No Supabase project exists, so the cloud path is only half verified.** The account panel
  renders correctly in both the unconfigured and configured-but-signed-out states (checked in a
  browser, the latter against a throwaway env build), and `cloudStore` is written. What has
  **not** been exercised is a real sign-in, a real write, or the `record_word_mastery` RPC —
  none of that can be tested until a project is provisioned and the migration applied.
- **Nothing is deployed.** Vercel builds branch previews for this repo (configured in its
  dashboard — there is no `vercel.json` in the tree), behind SSO. CI has been green on `main`
  and `develop` since 2026-10-02.
- **Only four games, all vocabulary-shaped.** The previous build had TenseRush, SentenceBuilder
  and VocabBattle; they were dropped in the 2026-10-01 rebuild and have not been rewritten
  against the new contract. Grammar, listening, reading, pronunciation and VSTEP content do not
  exist yet, so `contentTypes` other than `vocabulary` are unwritten.
- **No browser-level automated test.** The bugs that mattered most in this rebuild — a
  parameter-name mismatch that scored every round zero, a profile that never refreshed after a
  save — passed all unit tests and were only visible by playing the app. Until component or
  e2e tests land, manual browser verification is load-bearing, not optional.
- **The seeded round is not addressable.** The round's seed is React state rather than part of
  the URL, so reloading a `#play/...` address starts a fresh round instead of replaying the one
  you were on.
- **CI must be verified in a Linux container, not on a laptop.** `npm ci` on Windows passes
  against a lockfile the runner rejects, because the two npm builds disagree about which
  optional peer dependencies exist.

Full plan, pre-deployment gates and risk register: **[docs/product-roadmap.md](docs/product-roadmap.md)**.

---

## The 2026-10-02 rebuild

`docs/product-roadmap.md` §4 argued against deleting the working app and rebuilding it. That
call was revisited and reversed: the course surface (`Dashboard`, `TopicStudy`) and 385 KB of
bundled grammar content were removed in favour of a game-first architecture, on the grounds
that a game module is this product's unit and the grammar course was 93% empty. The removed
work is preserved in git at commit `f07d08d`. The roadmap's measurements predate the change
and still describe the old app.

---

## License

Not specified.
