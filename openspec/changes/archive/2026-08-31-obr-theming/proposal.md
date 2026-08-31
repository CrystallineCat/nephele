# Proposal: obr-theming

## Why

The OR-style CSS adaptation hard-coded `color: white` (and white-alpha
decorations) in several places. Two consequences: the local dev
preview is white-on-white and unusable, and inside Owlbear Rodeo the
sheet ignores the user's theme — OR light mode would break it the
same way. The sheet should take its colors from the OBR theme when it
runs inside OR, and from legible built-in defaults when it runs
standalone.

## What Changes

- **Theme-aware colors.** All component colors come from CSS custom
  properties (`--text`, `--accent`, `--bg`) instead of hard-coded
  values. No color survives that doesn't flow through a variable.
- **OBR theme bridge.** A small module subscribes to the OBR theme
  API (`OBR.theme.getTheme()` + `OBR.theme.onChange()`, gated on
  `OBR.isAvailable` / `OBR.onReady`) and writes the theme's colors
  into the CSS variables; theme changes apply live, without reload.
- **Legible standalone preview.** Outside OR, dark built-in defaults
  apply, including a dark page background — the white-on-white
  preview is fixed.
- **Transparent background inside OR.** The sheet's background
  becomes transparent when running as an OR popover, so OR's
  semi-transparent popover surface shows through unchanged.
- **Opacity decorations become relative.** White-at-N%-opacity
  accents (dividers, kind label, quest border) rebase onto
  `color-mix()` of the active text/accent variables, so they track
  any theme automatically.

No breaking changes; no new dependencies (`@owlbear-rodeo/sdk` is
already installed). Editing model, persistence, and layout are
untouched.

## Capabilities

### New Capabilities

- `obr-theming`: how the sheet sources its colors — OBR theme API
  inside Owlbear Rodeo, built-in defaults standalone; live theme
  updates; transparent-vs-default background per environment.

### Modified Capabilities

(none — `openspec/specs/` is empty; this is the first capability)

## Impact

- **Code:** new bridge module (e.g. `src/obr.ts`) wired from
  `App.svelte`; color declarations rewritten in `Sheet.svelte` and
  `ThemeCard.svelte`; `:root` variable defaults added in
  `App.svelte`'s global styles.
- **Dependencies:** none added or removed.
- **Verification:** `npm run check` + `npm run build` clean; visual
  smoke test standalone (legible dark default) and in OR (follows OR
  theme, both modes; popover transparency preserved).
