# GrammaX — Product Roadmap & Pre-Deployment Plan

> **Document status:** living plan — **measurements below are frozen at 2026-09-29 and describe
> the app that was replaced on 2026-10-02.** See the note at the end of this file.
> **Repo:** `TayDuyNguyen/Web-Leaning-English` · working branch `develop`
> **Measured:** 2026-09-28 baseline against commit `c55cced`; re-measured 2026-09-29 after Phase 1
> **Supersedes:** `deployment.md` (a ChatGPT-generated product brief; see §2 for its factual corrections)
> **Stack decision:** approved rewrite to TypeScript + Tailwind + shadcn/ui (see §3–§4)
>
> **⚠ Superseded in part.** §1, §2, the §4 warning against a rewrite and the Phase 0–1 rows of
> §5 describe the course-first app (`Dashboard`, `TopicStudy`, `src/data/`, three game engines,
> `seed:check`). That app was deleted on 2026-10-02 and replaced by the content → games →
> player architecture documented in `README.md`. The numbers here are still useful as history
> and as the record of *why* the change was made; they are no longer measurements of the tree.
> What has not changed: the gate logic in §6, the risk register in §7, and the fact that no
> Supabase project exists.

---

## 1. Where the project actually stands

These are measured values, not estimates.

| Metric | Measured | Note |
| --- | --- | --- |
| Framework | React 19.2 + Vite 8.0 | JSX only, no `tsconfig.json` |
| Application code (excl. content) | **5,805 lines** across 29 `.js`/`.jsx` files | Real surface area of the rewrite |
| Stylesheets | **3,291 lines** in `src/index.css` | Hand-rolled design system, BEM-ish |
| Routing | Hash-based, hand-written: `hooks/useHashRouting.js` + `lib/routes.js`, sub-routes owned by each view | No router library |
| Hardcoded learning content | **379,504 bytes** in `src/data/` | Still the source of truth; no longer in the entry chunk (see Phase 1) |
| Topics catalogued vs. populated | **30 declared, 2 populated** | 24 of 271 advertised exercises reachable |
| Production bundle | **3 chunks** — entry 531.20 kB / **147.94 kB gzip**, + 188.67 kB and 70.50 kB lazy content chunks | Was a single 785.82 kB / 213.10 kB gzip chunk |
| Production CSS | 67.34 kB / 12.58 kB gzip | |
| Tests | **53/53 pass** (`node --test`: `game-logic`, `supabase-config`, `routes`, `content-schema`) | Pure logic only — no component tests |
| Browser smoke | **12/12 checks** against the production build (`npm run smoke:ui`) | Chrome DevTools Protocol, no test-runner dependency |
| Lint | **0 errors, 0 warnings** (`eslint .`) | |
| Supabase tables | 8 (`schema.sql`, 170 lines) | All RLS-scoped to own user |
| Content tables in DB | **migration authored, not yet applied** | `20260929000001_content_tables.sql` validated by executing it on Postgres 17 |
| Content seed artifact | **30 topics / 21 lessons / 24 exercises / 620 questions** (`supabase/seed/content.sql`, 339,745 bytes, generated) | `npm run seed:check` fails CI on drift from `src/data/` |
| `.env` | absent | App runs correctly in local-only mode |
| CI/CD | `.github/workflows/ci.yml` (lint + test + `seed:check` + build + size) | **Ran for the first time on 2026-10-01 — red on `4e8b44a`, cause found and fixed.** Both triggers (push `36833494089`, PR #1 `36834479634`) failed in `Install from lockfile` in all 4 matrix jobs, 1–3 s per failure: the committed lock was missing the `@emnapi/core` / `@emnapi/runtime` peer entries that npm now auto-installs (see §7). Green status still needs the fix pushed |
| Hosting today | Vercel project `web-leaning-english` (`tayduynguyens-projects`), configured in the dashboard — there is no `vercel.json` in the repo | Deployed a **preview of this branch** (commit `4e8b44a`) to `web-leaning-english-git-feature-s-…vercel.app`; preview access is behind Vercel SSO protection. GitHub Pages is **not** configured (Pages API 404), although three internal `pages build and deployment` runs exist on `main` from June 2026 |
| Known dead data | `src/data/default-vocab.js` = `export const defaultVocab = []` | Empty since creation in `61f5c7e` |

**Verified working in a browser** (headless Chrome, production build served by `vite preview`, zero console errors): dashboard, theme toggle, topic search + category filters, theory/exercise views for Chuyên đề 1 (12 theory sections, 21 exercises), Tense Rush (scoring, combo, hearts, timer, explanation), Sentence Builder, Data Manager, auth modal with graceful "Supabase chưa được cấu hình" degradation, and Vocab Battle's empty-pack guard. The dashboard grid, deep links, back-button behaviour, and Chuyên đề 1's theory/exercise rendering with answer scoring are now automated as the 12 checks behind `npm run smoke:ui`, reproducible from a clean profile; theme toggle, search and category filters, the three game engines, Data Manager and the auth modal are still manual.

### Phase 1 landed on 2026-09-29 — content out of the entry chunk, DB-first source

Work happened against the user's constraint that **no Supabase project exists yet**, so everything cloud-dependent is authored and locally validated but not applied.

| Deliverable | State |
| --- | --- |
| `supabase/migrations/20260929000001_content_tables.sql` (M2) | **Written and executed** on a throwaway Postgres 17 container: anon `select` allowed, anon `insert/update/delete` denied by both RLS and `revoke`, FK `on delete cascade` verified, `unique (topic_id, position)` and `unique (exercise_id, question_number)` enforced |
| `src/lib/contentSchema.js` | **Pure** — no imports, no env, no network — so the Node seeder and the browser cannot disagree about a topic's shape |
| `scripts/seed-content.mjs` (M3) + `supabase/seed/content.sql` | Generated, committed as the reviewable artifact, idempotent (delete-then-insert per topic, parent before child), re-runnable to a fixed point |
| `src/lib/contentSource.js` | Supabase-first, bundle as fallback: the DB is authoritative **when it answers**, and an empty result from the DB is a real answer. Only a failed query falls back, and the fallback is visible |
| `Dashboard.jsx` / `TopicStudy.jsx` | Render from the content source; both have an explicit loading state and no longer import any `src/data` content module directly |
| `test/content-schema.test.js` | 12 cases, including a byte-level round-trip (`normalizeTopic` → `denormalizeTopic` deep-equals the source) and drift checks that re-parse the committed seed artifact |

Two proofs matter most. **Losslessness:** `denormalizeTopic` reconstructs `tensesData` and `sequenceOfTensesData` deep-equal to the originals, and the DB rebuilt from the seed returns 174,819 and 62,351 characters identical to source. **No behaviour change:** the 12 browser checks pass with no `.env`, including the three Phase 0 routing guarantees, which are now at risk from asynchronous content (a deep link must still land on `exercise-4` rather than bounce to `theory-0`, and the URL must not be written before the view resolves).

`src/data/topics.js` remains the topic catalogue (30 rows, no content) and is seeded as such, so the dashboard's advertised counts keep coming from one place while the DB grows its own.

### Content defects found by the seeder

Pre-existing, not migration damage — the seeder only surfaced them by counting:

1. **21 of 386 multiple-choice questions can never be answered correctly**: 20 have an `answer` that is not among their `options`, 1 has fewer than two options. `TopicStudy.jsx` compares the selected letter to `q.answer`, so these are dead questions in the shipped content.
2. **One topic id carries diacritics** — `từ-vựng-toeic-chu-de-kinh-doanh` (`topics.js:234`), while its sibling vocabulary topics use ASCII slugs like `tu-vung-toeic-chu-de-van-phong`. It is a `text` primary key that matches the existing `topic_scores.topic_id text`, so it works, but it is a URL-encoding hazard in deep links and it made raw-SQL id interpolation unsafe: ids now travel as JSON inside the seed payload, never as SQL literals. Renaming it would orphan stored progress, so it is left alone deliberately.

### Routing defects found and fixed while baselining

The hand-written router mirrored state into the URL from effects, and the URL was also the input to that state. Three distinct failures came out of that, all now closed:

1. **Cold-load deep links did nothing.** `App.jsx` read the hash only for `#game`, so loading `#topic-<id>` started on the dashboard, and the URL-sync effect then overwrote the link (`#topic-x` → `#`). Refreshing a lesson, or sending someone a link to one, silently dropped them on the home screen. The mapping lives in `src/lib/routes.js:parseHashRoute` now, shared by the initial state and the `hashchange` listener.
2. **Browser back needed two presses.** Entering a topic pushed **two** history entries — the navigation wrote `#topic-x`, then `TopicStudy` wrote `#topic-x/theory-0`. The first press undid a write the user never made (`history.length` grew 2 → 4 → 6 across two topic visits). Writes are now explicit about intent through `writeHashRoute(hash, { replace })`: user navigation pushes, normalisation of state the app already holds replaces. `history.length` grows one per visit, and back steps through lessons as expected.
3. **The quit confirmation asked twice.** `Header.jsx` called `canQuit()` and then invoked the navigation callback, which called `canQuit()` again; while Vocab Battle's lock was set, one click produced two identical dialogs. The guard now runs once, inside `useHashRouting`'s `navigate`.

Covered by `test/routes.test.js` (16 cases over the pure helpers) and by `scripts/smoke-ui.mjs`, which re-proves all three after Phase 1 made content load asynchronously. Two gaps stay open on purpose: `GameArena.jsx` still assigns `window.location.hash` directly (its writes are user-initiated, so they push correctly — the three guard-revert writes at lines 172/181/189 push where they should replace), and the smoke script is not yet in CI.

### The three structural blockers

1. **The catalogue is 93% empty.** `topics.js` declares 30 topics totalling 271 exercises, but `src/data/content-modules.js` declares content for only 2 of them — **24 exercises are actually reachable**. The dashboard advertises the other 28 with real-looking counts ("Câu Bị Động — 0/12 Bài tập"), and clicking one lands on *"Không tìm thấy dữ liệu chuyên đề này."* It fails cleanly rather than crashing, but the product does not currently contain what its own UI claims. No amount of architecture fixes this; it needs authored content.
2. **Content lives in the bundle.** `src/data/chuyen-de-thi-dong-tu.js` alone is 269,673 bytes. Nothing can be authored, edited, A/B tested or AI-generated without a redeploy. This blocks the entire Admin section of the roadmap and every AI feature — and it is what makes blocker 1 slow to fix. **Phase 1 built the way out** (M2 tables, M3 seed, `contentSource.js`), but the escape is not taken until a Supabase project exists to apply them to.
3. **Progress is an opaque blob.** `topic_scores.scores_data jsonb` (`schema.sql:32`) stores whole-topic state as one unqueryable value. Error Notebook, Progress Analytics, Spaced Repetition, Adaptive Learning Path and "AI knows your weak points" are all **architecturally impossible** until this becomes relational rows. This is the single highest-leverage change in the document.

Blockers 1 and 2 are the same problem viewed two ways: because content is buried in a JS bundle, adding the missing 28 topics means hand-editing source files and redeploying. Phase 1 removed that constraint in code — content now loads through one seam that prefers the database — but **the 28 unpopulated topics are still unwritten**, and they are a content problem no schema can solve.

---

## 2. Corrections to `deployment.md`

The source brief was written against an assumed empty repo. Before it is used as a plan, these claims must be fixed:

| Claim in `deployment.md` | Reality |
| --- | --- |
| "đã có deployment Vercel" | **False when written, true now.** On 2026-09-28 the repo had no `vercel.json`, no `.github/`, no CI of any kind and nothing deployed. As of 2026-10-01 a Vercel project exists and builds branch previews — configured dashboard-side, so there is still no Vercel file in the tree. |
| "2. Authentication" in the build order | **Already done.** `AuthContext.jsx` + `userStorage.js` provide sign-in/sign-up/session/RLS-scoped sync. |
| "4. Vocabulary + Grammar" as new work | **Overstated in both directions.** 30 grammar topics are catalogued but only **2 have content** (`src/data/content-modules.js`), so 24 of 271 advertised exercises are reachable. The vocabulary engine is complete but ships with zero words. |
| "3. Learning content" as new work | Content exists but is **misplaced** — in the bundle rather than the database. |
| "~30 tables" schema | Actual DB has 8 tables, none for content. The 30-table list is a target, not a description. |
| TypeScript / Tailwind / shadcn / feature-based folders | None present. This is a rewrite proposal, not a current-state description. |
| `:chatgpt-content-reference{index="N"}` markers, `\*\*` escapes, `&#x20;` | Export artifacts. The file needs cleanup regardless of what else is decided. |

---

## 3. Target architecture

| Layer | Current | Target | Migration risk |
| --- | --- | --- | --- |
| Language | JSX | **TypeScript** (`allowJs: true` → `checkJs` → per-file rename) | Low — incremental |
| Build | Vite 8 (Rolldown) | Vite 8 — **keep** | None |
| Styling | 3,291 lines `index.css` | **Tailwind v4 + shadcn/ui** | **High** — full visual re-implementation |
| Routing | hand-written hash | **react-router v7**, real paths (`/learn/grammar/:topicId`) | Medium — breaks existing bookmarks; needs redirect map |
| Server state | ad-hoc `useState` + `userStorage` | **TanStack Query** | Medium |
| Client state | React context | **Zustand** for theme/session/game state | Low |
| Content source | `src/data/*.js` behind `lib/contentSource.js` (Phase 1) — DB-first, bundle fallback | **Supabase tables** + seed scripts — schema and seed already written (§6.3 M2/M3) | Medium — see §6.3 |
| AI | none | Supabase Edge Functions → Gemini/OpenAI | Medium — key must stay server-side |
| Unit tests | `node --test` | **Vitest** | Low |
| e2e tests | none | **Playwright** | New work |

---

## 4. Rewrite strategy — parallel strangler, not big-bang

The rewrite was approved, so the cost is stated plainly.

**Do not delete the working app and rebuild it.** ← *This argument was revisited on 2026-10-01 and the rebuild happened anyway; see Phase 8 in §5 and the note at the end of this file. The reasoning below is kept because most of it still holds — the assets it names were real, and the reason the reversal was tolerable is precisely that they were recoverable from git and the pure rules had been kept pure.* The current tree holds 5,805 lines of app code, 3,291 lines of CSS encoding real design decisions, 53 passing logic tests, and three game engines whose rules were clearly debugged (`gameRules.js` is pure and tested for exactly that reason). A big-bang rewrite discards all four assets simultaneously. Phase 0 added CI and Phase 1 added `seed:check` to it, but the pipeline still has **no browser step** — `npm run smoke:ui` covers 12 UI behaviours locally and is not yet running in CI, so nothing catches a UI regression automatically until Playwright or that script joins the pipeline.

**Recommended shape:** build the TypeScript + Tailwind + shadcn tree alongside the existing one under `src/app/`, migrate one feature at a time behind a real router, and delete each legacy file only once its replacement passes Playwright. Both trees ship from one Vite app during the transition; the redirect map in §6.3 keeps old hash URLs alive.

**Honest cost, assuming one developer:**

| Scope | Rough effort |
| --- | --- |
| Big-bang rewrite to the §3 stack, feature-parity with today | **6–10 weeks**, and near-certain loss of some CSS polish + game-rule edge cases |
| Parallel strangler to the same destination | **9–14 weeks**, but the site stays live and correct throughout |
| Phases 1–2 of §5 (content + progress in DB) | **2–3 weeks**, independent of the stack decision |

The parallel path costs roughly a month more and is the only one that does not require re-deriving `gameRules.js` from scratch. The extra ~2 weeks for the strangler is cheapest spent on Playwright coverage of the three game engines *before* any CSS is touched.

**Sequencing rule:** land §5 Phase 1 and Phase 2 (data layer) **before** the Tailwind/shadcn work. Rewriting the UI twice — once against bundled data, once against fetched data — is the main avoidable cost here.

---

## 5. Roadmap phases

| # | Phase | Goal | Key deliverables | Depends on | Exit criteria | Effort |
| --- | --- | --- | --- | --- | --- | --- |
| 0 | **Baseline & hygiene** | Make the repo trustworthy to build on | ✅ Real `README.md` · ✅ `.env.example` documented · ✅ moved brief → `docs/product-roadmap.md` · ✅ CI workflow (lint + test + build + size, PR + push) · ✅ `App.jsx` forward reference · ✅ Supabase placeholder detection (was read as "configured") · ✅ deep-link cold load · ⬜ delete or populate `default-vocab.js` · ✅ split `App.jsx` 248 → 98 lines into `useHashRouting`, `useTheme`, `useTopicScores`, `useQuitGuard`, `useCloudHydration` · ✅ back-button double-push | — | Green CI on a PR; `npm run dev` documented; bundle warning still present but understood | 3–5 d |
| 1 | **Content to database** | Stop shipping lessons in JS | ✅ Migrations for `topics`, `lessons`, `exercises`, `exercise_questions` · ✅ anonymous-read RLS + writes revoked from `anon`/`authenticated` · ✅ seed scripts ingesting `src/data/*.js` (+ `seed:check` in CI) · ✅ `topics.js` kept as fallback · ✅ content moved out of the entry chunk into per-topic lazy chunks · ⬜ apply M2/M3 to a real project (needs G7) | 0 | ✅ bundle < 300 kB gzip (first-load **147.94 kB**) · ⬜ Dashboard + TopicStudy render from Supabase — code is ready and verified against the fallback path only · ⬜ content editable without deploy | 1–2 wk |
| 2 | **Relational progress** | Unlock every personalization feature | `lesson_progress(topic_id, lesson_id, state, correct_count, incorrect_count, updated_at)`; dual-write against legacy `topic_scores`; backfill script; `user_mistakes` | 1 | "Show my weakest grammar topic" is one `SELECT`; no data loss for existing users | 1–2 wk |
| 3 | **Core loop** | Answer "what do I study today?" | Daily Mission + streak, daily goal, review queue (spaced repetition), progress dashboard with charts | 2 | A user can complete a day, see a streak, and return | 2–3 wk |
| 4 | **Stack rewrite** | Land the approved §3 target | TS throughout; react-router with real paths + hash redirect map; Tailwind + shadcn; TanStack Query; Zustand; Vitest; Playwright e2e | 1, 2 | Legacy `src/` files deleted; e2e green on all 3 games + topic study; visual parity reviewed | 6–10 wk |
| 5 | **Skills** | Listening, Reading, Speaking, Writing | Audio storage + transcripts; reading with tap-for-definition; writing submission | 3, 4 | 4-skill modules live | 4–8 wk |
| 6 | **AI layer** | Intelligence on top of real data | Edge Functions `ai-tutor`, `generate-exercise`, `analyze-speaking`; `ai_conversations`, `ai_messages`, `ai_feedback`, `ai_generated_exercises` | 2, 3, 5 | AI answers cite the user's actual `user_mistakes` rows | 3–5 wk |
| 7 | **Admin** | Content authoring at scale | `/admin/*` CRUD over Phase 1 tables, moderation, analytics | 1, 2 | Non-developers publish lessons | 3–4 wk |
| 8 | **Game-first rebuild** | Make the game module, not the course, the unit of the product | ✅ content → games → player layers · ✅ game contract (`manifest.json` + pure `logic.js` + `index.jsx`) · ✅ generated `registry.js` with a CI drift gate · ✅ 4 vocabulary games over one shared word pool · ✅ relational player (`player_stats`, `game_results`, `word_mastery` + incrementing RPC) · ✅ review mode (rounds drawn from most-missed words) · ✅ wall-clock round timer · ✅ account panel · ⬜ grammar/listening/reading/pronunciation/VSTEP content types · ⬜ apply the migration to a real project | — | 4 games playable end-to-end in a browser with shared progress; adding a 5th touches no existing game | landed 2026-10-02 |

Phases 1–2 are deliberately ahead of the rewrite: they are stack-neutral, they unblock everything, and they are the parts of the product the current stack cannot express.

---

## 6. Pre-deployment plan

**Nothing reaches production until every Blocker row is `pass`.** This section is the gate.

> **Current standing (2026-10-01, after Phase 1):** of 16 hard blockers — **9 pass** (G1, G2, G3, G4, G6, G11, G12, G13, plus G5 now that content is code-split), **0 fail**, **7 pending** (G7, G8, G9, G10, G20, G21, G22). Six of those need a provisioned Supabase project and a hosting account, neither of which exists yet. G22 is different in kind: CI has now run, went red on a lockfile drift (§7), and the fix is written and container-verified — it only needs a push. Phase 1 is the first work whose remaining exit criteria are **gated on infrastructure rather than on code**.

### 6.1 Gate table

| # | Gate | Blocker? | How to verify | Owner | Status |
| --- | --- | --- | --- | --- | --- |
| G1 | Deps install clean from lockfile | **Yes** | `rm -rf node_modules && npm ci && npm run build` | | `pass` (measured 2026-09-28 — 145 packages, exit 0, `npm ls --depth=0` clean) |
| G2 | Lint passes | **Yes** | `npm run lint` → exit 0 | | `pass` (measured 2026-09-28) |
| G3 | Unit tests pass | **Yes** | `npm test` → 53/53 | | `pass` (re-measured 2026-09-29 — was 41/41; +12 `content-schema` cases covering round-trip fidelity and seed-artifact drift) |
| G4 | Production build succeeds | **Yes** | `npm run build` → `dist/` | | `pass` (measured, 341 ms) |
| G5 | Bundle size within budget | **Yes** | JS gzip < 250 kB, or an explicit code-splitting plan filed | | **`pass with note`** (2026-09-29) — code-splitting implemented: 1 chunk → 3, first-load JS 213.10 → **147.94 kB gzip**, total JS 211.96 kB. Note: the entry chunk is still 518.75 KiB raw, so `npm run size` reports its own 500 KiB `single-chunk-js-raw` budget as exceeded; that check stays report-only until Phase 4 splits the app itself |
| G6 | `.env` values set in host, not committed | **Yes** | `.gitignore` already covers `.env` / `.env.*` with a `!.env.example` exception; `git grep` over the tracked tree returns no real credentials | | `pass` (verified 2026-09-28) |
| G7 | Supabase project provisioned | **Yes** | `VITE_SUPABASE_URL` reachable; `isSupabaseConfigured === true` in browser console | | `pending` |
| G8 | Migrations applied in order (§6.3) | **Yes** | `supabase migration list` shows no local/remote drift; `select table_name from information_schema.tables where table_schema = 'public'` returns every expected table | | `pending` — M2 and M3 are written and were **executed against a throwaway Postgres 17** (RLS, FK cascade, unique constraints and seed idempotency all verified there), but nothing has been applied to a real project |
| G9 | RLS verified by a second tenant | **Yes** | Sign in as user B; confirm A's rows are unreadable and unupdatable | | `pending` — for content tables the anon-write denial is already proven locally; the per-user check still needs two real accounts |
| G10 | Auth email delivery works | **Yes** | Real sign-up on staging → confirmation link arrives | | `pending` |
| G11 | No secrets in client bundle | **Yes** | No `service_role` or `SECRET_KEY` matches anywhere in `dist/assets/*.js`; only the publishable/anon key appears | | `pass` (re-checked 2026-09-29 after adding the 339 kB seed artifact: no secret-shaped string in `dist/assets`, only `placeholder.supabase.co` / `placeholder-key`). **Re-run after G7** — this gate is only meaningful once real keys exist |
| G12 | Local-only path still works | **Yes** | Deploy with no `.env`; app renders, warning shown, no crash | | `pass` (measured) — since Phase 1 this also covers the **content** fallback: with no project to answer, every topic renders from the bundle and `npm run smoke:ui` is green |
| G13 | Empty-vocab-pack guard works | **Yes** | Start Vocab Battle with 0 words → guard message, no crash | | `pass` (measured) |
| G14 | Old hash URLs redirect | Yes (Phase 4+) | `/#game`, `/#topic-<id>` land on correct new routes | | `n/a` until Phase 4 |
| G15 | Mobile layout at 375 px | Yes | Playwright screenshot at 375×667 reviewed by eye | | `pending` |
| G16 | Dark + light theme both checked | Yes | Toggle and screenshot both states | | `pass` (measured, dark) |
| G17 | Accessibility pass | Yes | Keyboard-only navigation of the topic grid (`role="button"` cards at `Dashboard.jsx:122` already have `onKeyDown`); axe scan 0 serious | | `pending` |
| G18 | Error monitoring wired | No | Sentry (or host equivalent) captures a thrown test error | | `pending` |
| G19 | Analytics / real user monitoring | No | Host RUM or Supabase analytics reporting traffic | | `pending` |
| G20 | Rollback rehearsed | **Yes** | Previous release identified and one-click restorable | | `pending` |
| G21 | Database backup point taken | **Yes** | PITR window or a manual dump before G8 | | `pending` |
| G22 | CI green on the release commit | **Yes** | lint + test + build job passing on the exact SHA | | `fail` on `4e8b44a`, **fix verified locally, not yet pushed**. `npm ci` died in 1–3 s in all 4 jobs before any other step. Root cause: `@napi-rs/wasm-runtime@1.1.5` declares peerDependencies `@emnapi/core@^1.7.1` / `@emnapi/runtime@^1.7.1`; npm resolves that caret to the newest publish (1.11.3, landed after this lock was written) and demands lock entries for it, which do not exist → `EUSAGE … Missing: @emnapi/core@1.11.3 from lock file`. Reproduced in a `node:22` container on **both** npm 10.9.9 and npm 11.21.0; `npm install --package-lock-only` adds exactly those two entries and `npm ci` then passes on both. Not a flake, not the Actions version, not the network |
| G23 | No vulnerable runtime dependencies | No — build-time only today | `npm audit` and `npm ls --all --omit=dev`; a package is only blocking if it appears in the production tree. Becomes a **Yes** blocker the moment Edge Functions add server-side deps | | `pass with note` (measured 2026-09-28) — 5 advisories (1 moderate, 4 high: `postcss`, `browserslist`, `baseline-browser-mapping`, `nanoid`, `brace-expansion`), all transitive dev deps, all with fixes available, **none in the production tree** |

### 6.2 Environment & secrets matrix

| Variable | Where it goes | Public? | Notes |
| --- | --- | --- | --- |
| `VITE_SUPABASE_URL` | Build-time env, host dashboard | Yes | Safe in bundle |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Build-time env, host dashboard | Yes | Publishable key only |
| `VITE_SUPABASE_ANON_KEY` | — | — | Legacy alias, still read at `supabaseClient.js:5`; drop once all projects migrated |
| Supabase `service_role` key | **Edge Functions / server only** | **Never** | Must not appear in `dist/` — see G11 |
| `database.url` (direct Postgres) | CI/migration tooling only | **Never** | Not exposed to the site or to local dev |
| Gemini / OpenAI API key | **Edge Function secret only** | **Never** | Phase 6; never client-side |
| Sentry DSN | Build + runtime env | Semi | Client DSN is public by design |

> Client code reads `VITE_*` only. Anything without that prefix is server-side by construction.

### 6.3 Database migration order

Apply strictly in this sequence. Each step is reversible only by the backup taken at G21.

| Step | Target | Type | Destructive? | Notes |
| --- | --- | --- | --- | --- |
| M0 | Backup / PITR restore point | — | — | Prerequisite for every row below |
| M1 | Existing 8 tables (`schema.sql`) | create | No | Idempotent — uses `create table if not exists` and `drop policy if exists` |
| M2 | `topics`, `lessons`, `exercises`, `exercise_questions` | create | No | **Written, executed on scratch Postgres 17.** Text PKs to match the existing `topic_scores.topic_id text`; `on delete cascade` down the chain; `unique (topic_id, position)` and `unique (exercise_id, question_number)`; four `*_select_public` policies for `anon, authenticated`; plus `revoke insert, update, delete, truncate, references, trigger … from anon, authenticated` so writes need the service role even if a policy is ever added by mistake |
| M3 | Seed content from `src/data/*.js` | insert | No | **Generated and committed** (`supabase/seed/content.sql`, 30/21/24/620 rows). Idempotent per topic — one transaction, delete-then-insert, parents before children; verified to converge to a fixed point on re-run. `npm run seed:check` fails CI if the artifact drifts from `src/data/` |
| M4 | `lesson_progress` | create | No | Phase 2; replaces the `scores_data` blob |
| M5 | Dual-write `topic_scores` + `lesson_progress` | code | No | Ship behind no flag; both tables written |
| M6 | Backfill `lesson_progress` from existing `topic_scores` | insert | No | Verify row counts before continuing |
| M7 | `user_mistakes`, `review_cards`, `review_sessions` | create | No | Phase 3 |
| M8 | `learning_paths`, `learning_path_lessons` | create | No | Phase 3 |
| M9 | Drop `topic_scores` | **drop** | **Yes** | Only after M6 is verified and no code path reads it |
| M10 | `ai_conversations`, `ai_messages`, `ai_feedback`, `ai_generated_exercises` | create | No | Phase 6 |

**Rules:** one migration per PR; never combine a destructive step with a feature; `drop table` requires a second reviewer.

### 6.4 Post-deploy smoke checklist

Run against the live URL within 15 minutes of publishing.

| # | Check | Expected |
| --- | --- | --- |
| S1 | `/` renders | Topic grid, hero, filters, search present |
| S2 | Console | **Zero** errors |
| S3 | Theme toggle | `html` class flips, both themes legible |
| S4 | Open a topic → theory + exercise | Content loads, progress bar updates |
| S5 | Complete one exercise | Score persists across refresh |
| S6 | `#game` → Tense Rush → answer | +points, combo badge, explanation shown |
| S7 | `#game` → Sentence Builder | Tiles render, `Kiểm Tra` disabled while empty |
| S8 | `#game` → Vocab Battle with 0 words | Guard message, no crash |
| S9 | Sign up on production | Confirmation email arrives (G10) |
| S10 | Sign in as a second account | Cannot read the first account's data (G9) |
| S11 | Sign out | Reverts to local-only storage without error |
| S12 | Data Manager → create pack | Appears in the pack selector |
| S13 | Mobile 375 px | No horizontal overflow |
| S14 | Error monitor | Test event received (G18) |

**Already automated** by `npm run smoke:ui` against the production build from a clean profile: S1, S2, and most of S4–S5 (a topic opens from a cold deep link, one answer scores, and the score plus the locked input survive a reload through local-only storage). Everything from S6 onward still needs a human or Playwright, and S9–S11 need a provisioned project.

---

## 7. Risk register

| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| Big-bang rewrite loses game-rule edge cases | High | High | Strangler path (§4); Playwright on `gameRules.js` **before** any CSS work |
| `topic_scores` → `lesson_progress` migration loses user data | Medium | High | M0 backup, M5 dual-write, M6 verify counts, M9 last |
| 3,291 lines of CSS re-implemented in Tailwind look worse | High | Medium | Screenshot-diff each page in S1–S13 before merging |
| Bundle stays >500 kB after Phase 1 | ~~Medium~~ → **lowered** | Medium | **Partly handled:** content is now 2 lazy chunks and first-load JS is 147.94 kB gzip. The entry chunk is still 518.75 KiB raw — that needs route-level `React.lazy` in Phase 4, with the budget enforced at G5 |
| Bundled fallback masks a broken or stale database | New — Medium | High | `contentSource.js` separates "query failed" from "database says empty" and makes the fallback visible. Still needs a live-project test: edit one `exercises.title`, confirm the app serves the edit |
| AI features built before Phase 2, so AI has no signal | Medium | High | Hard sequencing rule in §5 |
| No CI means silent regressions on deploy | ~~Current~~ → **mitigated in Phase 0** | High | `.github/workflows/ci.yml` (lint + test + build + size, Node 22/24 matrix). **First real run 2026-10-01 was red at `npm ci` in all 4 jobs** — the workflow's own green-ness is now the thing that needs proving |
| A caret peer range silently rots the lockfile, and a local `npm ci` cannot detect it | **Materialised 2026-10-01** — High | Medium | `@napi-rs/wasm-runtime`'s peer range `@emnapi/core@^1.7.1` resolved to a version published *after* the lock was written, so `npm ci` failed with `EUSAGE` on the runner while passing on the Windows/npm 11.6.2 workstation that wrote the lock. Mitigation: regenerate with `npm install --package-lock-only` when peers drift, and treat a **Linux container on each supported Node major** (`docker run node:22 … npm ci`) as the real gate, not the laptop |
| Router writes the URL from effects; state and URL can disagree | Was **High** — measured | Medium | **Closed in Phase 0** for the dashboard/topic levels (`useHashRouting`, `writeHashRoute` push-vs-replace, 12 unit cases + browser smoke). `GameArena.jsx` still assigns `location.hash` directly; a Phase 4 router library should absorb it |
| Speaking/Listening blocked on content licensing | Medium | Medium | Source audio before writing the module |
| Single-developer bus factor on `src/data/` content | High | Medium | Phase 1 + Phase 7 Admin |

---

## 8. Immediate next actions

1. **G7 → G8** — provision the Supabase project, apply M1 then M2, load `supabase/seed/content.sql`. This is the only step that turns Phase 1 from "written and locally validated" into "true", and it unblocks the two remaining exit criteria (render from Supabase; edit without deploy).
2. **Prove the DB path with a real edit** — change one `exercises.title` in the project and confirm the app serves it. If it does not, the fallback in `contentSource.js` is hiding a broken query, which is the failure mode that matters most.
3. **Fix the 21 dead choice questions** before seeding a production project — 20 answers missing from their own options, 1 question with fewer than two options. Cheap to fix in `src/data/`, then `npm run seed:content`.
4. **Author the 28 missing topics.** Phase 1 made this a content problem instead of a deploy problem; it did not write any content. Roughly 247 of the 271 advertised exercises are still unreachable.
5. **M4–M6 (Phase 2, `lesson_progress`)** — the highest-leverage remaining change, and the prerequisite for Phases 3, 6 and 7.
6. **Push the G22 fix and watch it go green** — the lockfile now carries the two `@emnapi` peer entries, verified by `npm ci` in a `node:22` container on npm 10.9.9 and 11.21.0. Blocked on credentials, not code: the machine's git credential authenticates as an account without write access to this repo. After that, the browser smoke still needs a Chrome binary and a `vite preview` step on the runner before `smoke:ui` can join the workflow.
7. Then, and only then, Tailwind + shadcn.

---

## Appendix — reference material

### Current (post-rebuild)

- Architecture, games, content and player layers: `README.md`
- Game contract and one worked example each: `src/games/*/manifest.json`, `src/games/*/logic.js`
- Generated game registry + CI gate: `src/games/registry.js`, `scripts/build-registry.mjs`
- Pure core (no React): `src/core/rng.js`, `src/core/scoring.js`, `src/core/manifest.js`, `src/core/selection.js`
- Player stores over one reducer: `src/player/reducer.js`, `src/player/localStore.js`, `src/player/cloudStore.js`
- Migration awaiting a project: `supabase/migrations/20261002000001_player_layer.sql`
- Upstream GitHub: <https://github.com/TayDuyNguyen/Web-Leaning-English>

### Removed by the 2026-10-01 rebuild

These paths appear throughout §1–§7 above and no longer exist in the tree. They are recoverable
from git at commit `f07d08d`.

`src/pages/Dashboard.jsx`, `src/pages/TopicStudy.jsx`, `src/game-engines/*`, `src/data/*`,
`src/lib/*`, `src/hooks/*`, `src/contexts/*`, `supabase/schema.sql`,
`supabase/migrations/20260929000001_content_tables.sql`, `supabase/seed/content.sql`,
`scripts/seed-content.mjs`, `scripts/smoke-ui.mjs`.

### Still referenced, still valid

- Source brief (superseded): `deployment.md`
- Design system (machine-checked): `DESIGN.md`, enforced by `test/design-tokens.test.js`
- Earlier design reference, now superseded by `DESIGN.md`: `www.codecademy.com-DESIGN.md`

---

## Note on the 2026-10-01 rebuild

§4 argued against deleting the working app. The argument was sound on its own terms and was
still overridden, for one reason: the thing it protected — a course surface over 30 topics — was
93% empty, so the app's own UI was advertising content it did not have. A game module is what
this product actually ships, so the architecture was re-cut around games instead of lessons.

What made the reversal affordable is exactly what §4 said to preserve: the pure rules lived
outside React and were testable, and git kept every deleted line recoverable. The three game
engines were still lost, and rewriting them against the new contract is now open work (Phase 8
row, "⬜" list).
