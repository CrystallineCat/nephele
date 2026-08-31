# Tasks: clean-up

## 1. Dead edit pipeline

- [x] 1.1 In `Sheet.svelte`: replace `<Editable bind:text={sheet.name} {isEditing} />` with `{sheet.name}`, remove the unused `Toggle` import, remove `isEditing` state and both prop pass-downs
- [x] 1.2 In `ThemeCard.svelte`: replace `<Editable bind:text={themeCard.quest} {isEditing} />` with `{themeCard.quest}`, remove the `isEditing` prop and the `editing` class binding
- [x] 1.3 Delete `src/components/Editable.svelte` and `src/components/Toggle.svelte`
- [x] 1.4 `npm run check` passes clean

## 2. Types fold

- [x] 2.1 Move `CharacterSheet`, `ThemeCard`, `Tag` from `src/types/sheet.type.ts` into `src/sheet.svelte.ts` as exported types
- [x] 2.2 Update type imports in `Sheet.svelte` and `ThemeCard.svelte` (alias `ThemeCard` the type per design D1 if svelte-check flags the collision)
- [x] 2.3 Delete `src/types/`; `npm run check` passes clean

## 3. Icons

- [x] 3.1 `npm install @lucide/svelte` (the Svelte 5-native package — NOT `lucide-svelte`)
- [x] 3.2 In `ThemeCard.svelte`: replace the 🔥 button content with the Lucide `Flame` icon (sized/stroked to match the current 15%-opacity idle, 100% scratched states)
- [x] 3.3 Remove the `Noto Emoji` webfont import from `App.svelte` and the `font-family: "Noto Emoji"` rule from `ThemeCard.svelte`
- [x] 3.4 `npm run check` passes; scratch toggle visually verified in `npm run dev`

## 4. Dependencies

- [x] 4.1 `npm uninstall file-saver @types/file-saver sass` (removes from package.json and regenerates package-lock.json in one pass)
- [x] 4.2 `npm run build` passes clean

## 5. Assets

- [x] 5.1 `npm install -D lucide-static`, then copy `node_modules/lucide-static/icons/venetian-mask.svg` verbatim to `public/icon.svg` (no hand-created art; design D2). If OBR renders it black-on-dark (`stroke="currentColor"` via `<img>`), set one fixed stroke color in the copied file and re-verify on both OBR themes
- [x] 5.2 Delete `public/hero.png`

## 6. Docs and licensing

- [x] 6.1 Rewrite `README.md` minimal: project name, one-paragraph statement, dev commands, LLM-use disclosure with bumped review date (design D5)
- [x] 6.2 Rewrite `public/manifest.json` description to a minimal LitM one ("A simple Legend in the Mist character sheet" — identity decided 2026-08-31)
- [x] 6.3 Strike resolved entries in `TODOS-HUMAN.md` (clean-up change, icon decision, license decision)
- [x] 6.4 Add MIT `LICENSE` file (decided 2026-08-31, design D4); do not archive the change without this file

## 7. Verification

- [x] 7.1 `grep -ri "editable\|toggle\|isEditing\|file-saver\|sass" src/ package.json` finds nothing (excluding `node_modules`)
- [x] 7.2 `npm run check` and `npm run build` pass clean
- [x] 7.3 Visual smoke test: `npm run dev` renders the sheet as before; in Owlbear Rodeo the sheet looks identical except the new scratch icon and new action-bar icon
- [x] 7.4 Diff each surviving upstream-shaped file (`Sheet.svelte`, type definitions, `index.html`, `main.ts`) against upstream DummySheet once, consciously: no verbatim upstream lines remain (design Risks)
