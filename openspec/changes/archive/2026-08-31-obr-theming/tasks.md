# Tasks: obr-theming

## 1. CSS variable contract

- [x] 1.1 In `App.svelte`'s global style: add `:root` defaults `--text: oklch(100% none none)`, `--accent: oklch(67% 33% 160deg)`, `--bg: oklch(20% none none)` (design D1, oklch convention), and `background: var(--bg)` on `body`
- [x] 1.2 `npm run dev` standalone now renders legibly (dark background, white text) — white-on-white is gone

## 2. OBR theme bridge

- [x] 2.1 Create `src/obr.ts` exporting `initObrTheme()` per design D2: guard on `OBR.isAvailable`; inside `OBR.onReady`, apply `await OBR.theme.getTheme()` and subscribe `OBR.theme.onChange`; each application sets `--text` ← `theme.text.primary`, `--accent` ← `theme.primary.main`, `--bg` ← `transparent` on `document.documentElement`
- [x] 2.2 Call `initObrTheme()` from `App.svelte`'s `onMount`
- [x] 2.3 `npm run check` passes clean

## 3. Component rewiring

- [x] 3.1 `Sheet.svelte`: h1 `color: white` → `var(--text)`; divider `oklch(100% none none / 0.12)` → `color-mix(in oklch, var(--text) 12%, transparent)`
- [x] 3.2 `ThemeCard.svelte`: card/button `color: white` → `var(--text)`; dividers → `color-mix`; quest border → `var(--accent)`; kind label → `var(--accent)` (keeping its existing 50% opacity); verify no remaining color literals
- [x] 3.3 `grep -rn "white\|oklch" src/components/` finds no theme-ignoring literals; `npm run check` + `npm run build` pass clean

## 4. Verification

- [x] 4.1 Standalone `npm run dev`: legible dark sheet, all interactions (scratch, counters) unchanged
- [x] 4.2 In Owlbear Rodeo: sheet follows the OR theme in both dark and light mode; switching themes updates the sheet live without reload; popover semi-transparency preserved (no sheet background visible)
- [x] 4.3 Strike the OR-theming entry in `TODOS-HUMAN.md`
