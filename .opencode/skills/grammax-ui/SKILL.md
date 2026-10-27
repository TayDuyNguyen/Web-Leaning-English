---
name: Grammax UI Craft
description: Design, build, and review UI in the grammax app (lobby, Typing Game, word import, result panel) so it obeys DESIGN.md — editorial monochrome, flat tonal layering, disciplined signal orange — while applying Emil Kowalski's interaction and motion craft. Use for any component, CSS, hover/press state, transition, animation, focus, or visual polish work in this repository.
---

# Grammax UI Craft

UI work in this repo is constrained design, not open design. The system is already
decided; the craft is in executing it precisely and in the details users never name.

**Read first:** `DESIGN.md` (repo root) is the spec, and `test/design-tokens.test.js`
is the enforcement. This skill does not restate them — it tells you how to make
decisions where the spec is silent, and where general web design advice must lose.

## Authority order

1. `DESIGN.md` + `test/design-tokens.test.js` — hard constraints, CI-enforced.
2. This skill — the project's interpretation of craft within those constraints.
3. General design/animation guidance (including `emil-design-eng`) — only where 1 and 2 are silent.

When advice conflicts, the higher line wins. Never "improve" past a design rule.

## Hard rules you must not break

| Rule | What CI checks |
| --- | --- |
| Only tokens from `:root`; no new hex, no literal colours in components | stray hex in `styles.css` fails |
| No `box-shadow` (flat tonal layering; `box-shadow: none` is tolerated but pointless) | shadow regex fails |
| Signal orange is never a large background fill; one per screen, and it means "act now" or "wrong" | `background: var(--color-signal\|--color-incorrect)` fails |
| `--color-correct` appears only inside `.review-list` | selector check fails |
| CEFR tints only inside `.level-chip` | selector check fails |
| Body copy stays weight 300, leading 1.75–2.0 | `body` rule check fails |
| Depth comes from contrast, hairline borders, tonal steps — never blur, glow, gradient | manual + shadow test |
| Right/wrong feedback is a fill change, never a shake, glow, or flashy transition | manual review |

Adding *motion* tokens is allowed: the token test ignores `--ease-*` / `--duration-*`.
Adding a *colour* token is not.

## Where common advice loses here

| Advice you will be tempted to apply | What to do instead |
| --- | --- |
| Use a soft shadow to lift cards | Hairline border or the next tonal step (`surface` on `background`, `surface-dim` for wells) |
| Playful spring/bounce on interactions | Editorial restraint: `ease-out`, 120–200 ms, no overshoot |
| Framer Motion / GSAP / animation library | Not installed. CSS transitions, one `@keyframes` where needed, WAAPI only if JS control is unavoidable |
| Toast library (Sonner) for feedback | Inline status line with `aria-live`, like `.typing-hit` — no new dependency, no floating layer |
| "Make it pop" with colour | Hierarchy comes from scale and weight contrast. One loud thing per screen |
| Animate on every hover | Hover is not a feature. Animate press and state change; leave hover to the documented invert/fill |

## Motion decision framework (applied)

Answer in order: how often is it seen → what is it for → easing → duration.

| Surface | Frequency | Decision |
| --- | --- | --- |
| Keystrokes in the typing stage | hundreds/session | **No animation.** Input must feel instant |
| Word falling (`typing-fall`) | constant | **Linear**, unchanged. It is motion the player reads, not decoration |
| Word hit | occasional | Exit fast: fade + tiny scale, ≤160 ms. No colour change, no particles |
| Miss / lost life | occasional | Current treatment (opacity + signal border) is final. No shake |
| Pause veil, result panel | occasional | Enter 160–200 ms with opacity + ≤8 px translate, `ease-out` |
| Button press | tens/session | `scale(0.97)`, 100–140 ms, transform only |
| Button hover invert | tens/session | Hard flip by design. **Do not** transition background/colour on the primary button |
| List/grid of cards on mount | rare | Optional stagger 30–60 ms; decorative only, never block clicks |
| Keyboard-driven actions | hundreds/session | **Never animate.** Raycast has no open animation for a reason |

Durations: press 100–140 ms, small UI 150–200 ms, panel/veil 200–260 ms. Nothing
interactive goes past 300 ms. Exit is faster than enter. `ease-in` is banned for UI —
it delays the exact frame the user is watching.

## Motion tokens (add to `:root` when you first need them)

```css
--ease-out: cubic-bezier(0.23, 1, 0.32, 1);
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
--duration-press: 120ms;
--duration-ui: 180ms;
--duration-exit: 100ms;
```

Use `var(--ease-out)` / `var(--duration-ui)` rather than repeating literals; the
stylesheet is written to be parseable by regex, and named tokens keep it that way.

## Recipes that fit this codebase

**Press feedback** (any pressable element, including `.word-import-remove`):

```css
.primary-button { transition: transform var(--duration-press) var(--ease-out); }
.primary-button:active { transform: scale(0.97); }
```

**Enter a panel without a shadow**, using modern CSS instead of a mount flag:

```css
.result-panel {
  opacity: 1;
  transform: translateY(0);
  transition: opacity var(--duration-ui) var(--ease-out),
              transform var(--duration-ui) var(--ease-out);
  @starting-style { opacity: 0; transform: translateY(8px); }
}
```

**Word destroyed** — keep the existing `translateX(-50%)`, never drop it from the transform:

```css
.typing-word.is-hit {
  opacity: 0;
  transform: translateX(-50%) scale(0.96);
  transition: opacity var(--duration-exit) ease-out,
              transform var(--duration-exit) ease-out;
}
```

**Hover only where hover exists** (touch fires hover on tap):

```css
@media (hover: hover) and (pointer: fine) {
  .game-card:hover { /* tonal or invert change only */ }
}
```

**Reduced motion** — remove decorative movement, keep comprehension and gameplay:

```css
@media (prefers-reduced-motion: reduce) {
  .result-panel, .typing-veil { transition-duration: 0ms; }
  .primary-button:active { transform: none; }
  /* `typing-fall` stays: the words falling IS the game. Never disable it. */
}
```

## Performance

- Animate `transform` and `opacity` only. Animating `top`, `height`, `left`, `margin`
  runs layout on every frame.
- Never `transition: all` — name the properties.
- Updating a CSS variable on a parent recalculates every child. Set `transform`
  directly on the moving element instead.
- CSS animations beat JS under load; the typing stage shares the main thread with
  React, so keep JS-driven motion out of it.
- Stagger delays stay 30–80 ms and must never gate interaction.

## Accessibility

- Keyboard first: every new control is a real `<button>`/`<a>` and shows
  `:focus-visible` as a 2 px ink outline (see `.typing-stage:focus-visible`).
- Live text gets `role="status"` / `aria-live="polite"`, and the message must make
  sense out of context — `.typing-hit` announces `word — nghĩa`, so keep that shape.
- Motion respects `prefers-reduced-motion`; gameplay motion is exempt.
- Feedback never relies on colour alone: pair the fill with a word or glyph.
- `aria-hidden` on a focusable element traps screen-reader users. Don't.
- The stage's hidden `.typing-capture` input is intentional (phone keyboards emit no
  `keydown`); keep it 1×1, `opacity: 0`, and labelled.

## Reviewing UI work

Use a table, one row per issue — never a prose list of "before/after":

| Before | After | Why |
| --- | --- | --- |
| `transition: all 300ms` | `transition: opacity 180ms var(--ease-out)` | `all` animates layout properties; name the ones you mean |
| `transform: scale(0)` on entry | `opacity: 0; transform: scale(0.95)` | Nothing in the world appears from nothing |
| `ease-in` on a veil | `ease-out` | `ease-in` delays the frame the user is watching |
| `box-shadow: 0 4px 12px …` | hairline border / next tonal step | DESIGN.md forbids shadow; depth is contrast |
| Orange `background` on a CTA | ink fill, orange reserved for one alert/action | Signal is currency, one per screen |
| Green "success" text outside review | ink or metadata grey | `--color-correct` is graded-answer only, CI-enforced |

End with a verdict and the commands you ran:

```bash
npm test      # includes design-tokens contract
npm run lint
npm run build
```

## Known debt (fix only when you touch it)

- `.typing-word` animates `top` via `@keyframes typing-fall` — layout on every frame.
  Converting to `transform: translateY()` preserves the `animationend` the game
  listens for, but measure the stage height first; don't change gameplay timing blind.
- No motion tokens exist yet; the values above are the proposed baseline.
- Hover rules are not yet gated behind `(hover: hover) and (pointer: fine)`.
- The primary button's hover invert has no transition — this is correct. Don't "fix" it.
