# Nephele

A dummy-simple sheet for storing character data.
If you're constantly changing systems, and you don't have time to wait for a nice dev to implement your character sheet, then DummySheet is for you. Open it up, edit your sheet, and get to playing.

## LLM-use disclosure

This project is published for the TTRPG community, so its use of AI
tooling is stated plainly:

- **Written by hand:** all application code — HTML, CSS/Sass,
  TypeScript, and Svelte components. (The upstream DummySheet code
  predates this fork and is likewise human-authored.)
- **LLM-assisted (Kilo):** devops chores such as dependency upgrades and
  tooling configuration; maintenance of project documentation (this
  disclosure, `TODOS-HUMAN.md`, `AGENTS.md`); OpenSpec planning
  artifacts; exploratory discussion. In addition, the one-time
  **Svelte 3 → 5 / Vite 4 → 8 toolchain migration** (the `upgrade-stack`
  change: dependency bumps, config updates, and a mechanical
  legacy-syntax → runes rewrite of the existing components) was carried
  out by the assistant. No new features, game content, sheet layout, or
  visual design were introduced by the LLM — the migrated code is
  behaviorally identical to the hand-written original.
- **Not LLM-generated:** game content, sheet layout, visual design, and
  any rules text.

This section is kept up to date as usage changes. Last reviewed:
2026-08-28.

## How to use

- Edit the right columns by clicking on them.
- The `EDIT` button lets you edit the left columns, sections, and just about everything else.
- You can also change the theme by clicking on the colour boxes, if you want something cheerier.
- `EXPORT` your character to a convenient JSON file...
- ... and you can `IMPORT` it back again.
- The GM can view other players' sheets by looking through the tabs at the top.
- Have a fun time.
