<script lang="ts">
// Import stores
import { theme } from "../stores"
import { editing } from "../stores"

let shadowChecked = $state($theme.textShadow === "1px 1px 2px #000000")
let primaryHex = $derived(rgbToHex($theme.primary))
let secondaryHex = $derived(rgbToHex($theme.secondary))
let accentHex = $derived(rgbToHex($theme.accent))

function updateColor(ev: Event) {
    const target = ev.target as HTMLInputElement
    const color = target.value
    const name = target.name
    let rgb = parseInt(color.slice(1), 16)
    let r = (rgb & 0xff0000) >> 16
    let g = (rgb & 0x00ff00) >> 8
    let b = (rgb & 0x0000ff) >> 0
    ;($theme as Record<string, string>)[name] = r + "," + g + "," + b
}

function rgbToHex(rgb: string) {
    let hex = "#"
    rgb.split(",").forEach(function (part) {
        let c = parseInt(part)
        let s = c.toString(16)
        s = s.length === 1 ? "0" + s : s
        hex = hex + s
    })
    return hex
}

function updateShadow() {
    if (!shadowChecked) {
        $theme.textShadow = "1px 1px 2px #000000"
    } else {
        $theme.textShadow = "none"
    }
}
</script>

{#if $editing}
    <input
        type="color"
        name="primary"
        value={primaryHex}
        oninput={updateColor}
    />
    <input
        type="color"
        name="secondary"
        value={secondaryHex}
        oninput={updateColor}
    />
    <input type="color" name="accent" value={accentHex} oninput={updateColor} />
    <input
        type="checkbox"
        name="shadow"
        bind:checked={shadowChecked}
        oninput={updateShadow}
    />
{/if}

<style lang="scss">
input[type="color"] {
    border: none;
    background: none;
    height: 2rem;
    width: 2rem;
    cursor: pointer;
}
input[type="checkbox"] {
    border: none;
    background: var(--secondary);
    height: 1.5rem;
    width: 1.5rem;
    cursor: pointer;
    &:checked {
        background: var(--accent);
    }
}
</style>
