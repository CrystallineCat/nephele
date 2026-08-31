# Nephele

A deliberately simple Legend in the Mist character sheet. Built for
Owlbear Rodeo; runs as a popover extension (`public/manifest.json`).

## Development

- `npm run dev` — vite dev server
- `npm run check` — svelte-check (must pass clean)
- `npm run build` — production build
- `npm run format` — prettier

## LLM-use disclosure

This project is published for the TTRPG community, so its use of AI
tooling is stated plainly:

- **Written by hand:** sheet layout, visual design, game content, and
  the original component code (the upstream DummySheet code predates
  this fork and is likewise human-authored).
- **LLM-assisted (Kilo):** devops chores such as dependency upgrades and
  tooling configuration; maintenance of project documentation (this
  disclosure, `TODOS-HUMAN.md`, `AGENTS.md`); OpenSpec planning
  artifacts; exploratory discussion. Two mechanical changes were also
  carried out by the assistant under human direction: the one-time
  **Svelte 3 → 5 / Vite 4 → 8 toolchain migration** (the
  `upgrade-stack` change) and the **`clean-up` change** (2026-08-31:
  removal of dead code and unused dependencies, type-file
  consolidation, and replacement of emoji glyphs and the app icon with
  Lucide assets). Neither introduced features, game content, sheet
  layout, or visual design.
- **Not LLM-generated:** game content, sheet layout, visual design, and
  any rules text.

This section is kept up to date as usage changes. Last reviewed:
2026-08-31.
