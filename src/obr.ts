import OBR from "@owlbear-rodeo/sdk"
import type { Theme } from "@owlbear-rodeo/sdk"

/**
 * Wires the OBR theme into the sheet's CSS custom properties.
 * Standalone (outside Owlbear Rodeo) this is a no-op and the
 * `:root` defaults in App.svelte stand.
 */
export function initObrTheme(): void {
    if (!OBR.isAvailable) return

    OBR.onReady(() => {
        const apply = (theme: Theme) => {
            const root = document.documentElement.style
            root.setProperty("--text", theme.text.primary)
            root.setProperty("--accent", theme.primary.main)
            root.setProperty("--bg", "transparent")
        }
        OBR.theme.getTheme().then(apply)
        OBR.theme.onChange(apply)
    })
}
