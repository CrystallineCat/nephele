# TODOS-HUMAN

Open decisions and deferred questions for the human to pick up between
experiment phases. AI sessions maintain this file (see AGENTS.md).

## Now

(nothing open)

## Parked

(nothing parked)

## Resolved

- ~~**Baseline svelte-check errors.**~~ Resolved by the `upgrade-stack`
  change (2026-08-28): the Svelte 3 → 5 runes migration + svelte-check
  2 → 4 cleared all 5 upstream errors. `npm run check` is now green
  (0 errors, 0 warnings), so the check gate is trustworthy going forward.
