# Design: clean-up

## Context

See proposal.md — Why. Current state (verified 2026-08-31): the app is
`main.ts` → `App.svelte` → `Sheet.svelte` → `ThemeCard.svelte`, state in
`src/sheet.svelte.ts` (`$state` rune module, seed data fused with state).
`isEditing` is declared in `Sheet.svelte`, drilled three levels deep,
and never set to `true` — the entire edit pipeline is unreachable.
`Toggle.svelte` is imported but never rendered, and its CSS references
`--accent`/`--secondary` custom properties that nothing defines anymore.
`svelte-check` is currently green and must stay green.

## Goals / Non-Goals

**Goals:**

- After the change, `grep` finds no reference to `Editable`, `Toggle`,
  `isEditing`, `file-saver`, `sass`, or `types/` in `src/` or
  `package.json`.
- No upstream-shaped expression remains (proposal.md lists the
  inventory); the repo can carry a Nephele `LICENSE` with a clean
  conscience.
- `npm run check` and `npm run build` pass clean; the sheet looks and
  behaves pixel-identical in dev and in Owlbear Rodeo (minus the icon
  swap).

**Non-Goals:**

- No redesign of the sheet's look (that is the OR-theming change).
- No persistence, no editing architecture (parked in TODOS-HUMAN.md).
- No restructuring of `index.html`, `vite-env.d.ts`, or `App.svelte`'s
  location — those are Vite/Svelte conventions, not remnants (see
  Decisions).

## Decisions

### D1: Types fold into the state module, not a new home

`src/types/sheet.type.ts` moves into `src/sheet.svelte.ts` as exported
types (`CharacterSheet`, `ThemeCard`, `Tag`). The `.svelte.ts` module
owns the domain; one file, one home, no orphan directory.

Alternatives considered: a flat `src/types.ts` (keeps an artificial
seam for three small types); a `src/lib/` directory (premature for one
module — introduce it when the theming bridge or persistence needs a
non-component home).

Note: `ThemeCard` the _type_ and `ThemeCard.svelte` the _component_
share a name. That collision already exists today via the import in
`ThemeCard.svelte`; keeping the type named `ThemeCard` preserves the
domain vocabulary. If svelte-check complains, rename the type import
(`import type { ThemeCard as ThemeCardData }`) — do not rename the
domain type.

### D2: `@lucide/svelte` for icons

Svelte 5-native package (the similarly named `lucide-svelte` is the
Svelte 4 line), ISC license (MIT-compatible, safe for either LICENSE
outcome), tree-shaken inline-SVG components, fully typed, actively
maintained. Only the 🔥 scratch glyph is replaced; the counter symbols
⟨ ⏺ ⟩ are ordinary Unicode text in any font and stay. Dropping 🔥 lets
the `Noto Emoji` webfont import leave `App.svelte`.

The action-bar icon (`public/icon.svg`) comes from the same family:
`venetian-mask`, copied verbatim from the `lucide-static` package
(same monorepo, same ISC license, ships plain `.svg` files) — no
hand-created art. Caveat: the verbatim SVG uses
`stroke="currentColor"`, which resolves to black if OBR renders the
action icon via `<img>`, i.e. invisible on OBR's dark UI. If so, set
`stroke` to one fixed color in the copied file (a one-attribute value
choice, not art creation) and verify on both OBR themes.

Alternatives considered: `unplugin-icons` (opens all of Iconify; more
build magic than a four-component sheet justifies); hand-drawn SVGs
(another upstream-free option, but reinvents a solved wheel).

### D3: Conventions that look smelly but stay

`index.html` at repo root (Vite's entry point; the OBR manifest's
`popover: "/"` resolves to it), `src/vite-env.d.ts` (types for
`import.meta.env` and asset imports), `App.svelte` at `src/` root
(Svelte convention for the root component). Touching these buys
nothing and breaks tooling expectations. Recorded here so the cleanup
doesn't drift into churn.

### D4: LICENSE is MIT, lands in this change

MIT was decided on 2026-08-31. Implementation adds the MIT `LICENSE`
file as the final task, and the change does not archive without it —
relicensing is the point of the change, so shipping the removals
without the license file would be a hollow win.

### D5: README minimal, disclosure preserved

New README: project name, one-paragraph statement, dev commands,
LLM-use disclosure (reviewed date bumped). The DummySheet "How to
use" section describes deleted features and is removed, not archived.
Identity resolved 2026-08-31: the sheet is deliberately Legend in the
Mist — `manifest.json`'s description and the README statement say so
(the old "system-agnostic" convention is retired).

## Risks / Trade-offs

- [Icon swap alters sheet visuals slightly] → Lucide strokes match the
  thin line-art aesthetic; verify in OR before calling tasks done.
- [`skip_specs: true` means no behavioral contract is recorded] →
  Acceptable: behavior is definitionally unchanged. The verification
  gate is `npm run check` + `npm run build` + visual smoke test, listed
  in tasks.md.
- [Residual upstream expression in `Sheet.svelte` skeleton or the type
  shapes after edits] → Mitigation is the done-criterion itself: a file
  that survives only in rewritten form (new layout primitives, renamed
  props, folded types) carries no verbatim upstream lines; the
  implementer diffs each survivor against upstream once, consciously.
- [Removing `sass` breaks a forgotten `.scss` reference] → Verified
  none exist (`src/**/*.{scss,sass}` is empty); `npm run build` is the
  backstop.

## Migration Plan

Single PR-sized change, no deployment or rollback concerns. Order
matters only for keeping the tree green: delete dependents (Editable
usages) before deleting the component; remove deps from `package.json`
and regenerate `package-lock.json` in the same pass.
