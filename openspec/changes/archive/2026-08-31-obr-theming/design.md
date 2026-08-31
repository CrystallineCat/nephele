# Design: obr-theming

## Context

See proposal.md — Why. The sheet currently hard-codes colors:
`color: white` in `Sheet.svelte` (h1) and `ThemeCard.svelte` (card,
buttons), white-alpha decorations (`oklch(100% none none / 0.12)`
dividers), and a fixed green accent (`oklch(67% 33% 160deg)` quest
border, `oklch(100% 75% 160deg)` kind label). `@owlbear-rodeo/sdk`
v3.1.0 is installed; its `Theme` type (verified in
`node_modules`) is `{ mode: "DARK"|"LIGHT", text: { primary,
secondary, disabled }, background: { default, paper },
primary/secondary: { light, main, dark, contrastText } }`, exposed
via `OBR.theme.getTheme(): Promise<Theme>` and
`OBR.theme.onChange(cb): unsubscribe`. `OBR.isAvailable: boolean`
detects the OR iframe context. Colors arrive as CSS color strings
(rgba), assignable to custom properties as-is.

## Goals / Non-Goals

**Goals:**

- Every rendered color flows through a CSS custom property on `:root`;
  components contain no theme-ignoring color literals.
- Inside OR: variables track `OBR.theme` live; background transparent.
- Standalone: dark built-in defaults, opaque background, legible
  (white-on-white fixed).

**Non-Goals:**

- No user-selectable theme inside the sheet, no settings UI.
- No use of `theme.background.*` — inside OR the popover surface is
  the background; standalone uses our own default.
- No restyling: spacing, typography, and layout are untouched; only
  color values change.
- Not a generic theming engine — exactly three variables (see D1).

## Decisions

### D1: Three CSS variables are the whole contract

`--text`, `--accent`, `--bg` on `:root`. Defaults live in
`App.svelte`'s existing global `<style>` block:

- `--text: oklch(100% none none)` — matches the current hard-coded
  look (project convention: all colors are oklch; greyscale uses
  `oklch(<L> none none)`, never color names)
- `--accent: oklch(67% 33% 160deg)` — the current quest-border green
- `--bg: oklch(20% none none)` — new; standalone legibility, a dark
  neutral close to OR's dark popover tone. Any dark value satisfies
  the spec.

`body` gets `background: var(--bg)`. Components reference
`var(--text)` / `var(--accent)`; opacity decorations rebase onto
`color-mix(in oklch, var(--text) N%, transparent)` (dividers at 12%)
or keep the existing `opacity: N%` pattern where the element already
inherits the right color (scratch button at 15%, kind label at 50%).
The quest border becomes `var(--accent)`.

Alternatives considered: per-component variables (more surface than a
four-component sheet needs); `light-dark()` CSS function (keys off
system preference, not the OR theme — wrong source of truth).

### D2: One bridge module owns the OBR theme

New `src/obr.ts` exports `initObrTheme()`:

1. Guard on `OBR.isAvailable`; standalone → return immediately, the
   `:root` defaults stand.
2. `OBR.onReady(() => …)` → apply `await OBR.theme.getTheme()`, then
   `OBR.theme.onChange(apply)` for live updates.
3. `apply(theme)` sets: `--text` ← `theme.text.primary`, `--accent` ←
   `theme.primary.main`, `--bg` ← `transparent`.

Called from `App.svelte`'s `onMount` (document is guaranteed; the
idiomatic Svelte side-effect point). The popover lives until closed,
so the `onChange` unsubscribe is effectively never needed — no
teardown is wired.

Alternatives considered: calling the bridge from `main.ts` top-level
(works, but mixes environment wiring into the entry point);
distributing `getTheme()` calls into components (duplicated
subscriptions, no single contract).

### D3: No "inside OR" class

An earlier sketch considered an `.obr` class on `<main>` to gate
background transparency. D2 makes it unnecessary: the bridge writes
`--bg: transparent` inside OR, so the class's only job is already a
variable. Components stay environment-agnostic.

## Risks / Trade-offs

- [OR light mode exposes a missed white literal] → Verification
  includes switching OR to light mode; `grep` for `white` / `oklch`
  in components is a task-level gate.
- [`color-mix()` browser support] → Baseline 2023, universally
  available in 2026 Chromium (OR's embedded browser) and modern
  dev browsers; no fallback needed.
- [Theme colors arrive mid-render and flash default dark inside OR]
  → Acceptable: popover opens fast and the defaults are dark, so a
  one-frame flash is barely visible against OR's dark surface; a
  `visibility` gate would complicate `App.svelte` for near-zero gain.
- [Future colors get added as literals again] → The spec's
  Theme-aware-colors requirement is the contract; review/grep catches
  regressions.

## Migration Plan

No deployment or data concerns. Implement bridge → variables →
component rewiring in one pass; the tree stays green throughout
(pure value substitutions). Rollback is `git revert`.
