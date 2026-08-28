<script lang="ts">
// Import stores
import { theme } from "../stores"
import type { Snippet } from "svelte"

interface Props {
    children?: Snippet
}

let { children }: Props = $props()
</script>

<section
    style="--primary: {$theme.primary}; --accent:{$theme.accent}; --secondary:{$theme.secondary}; --shadow:{$theme.textShadow}"
>
    {@render children?.()}
</section>

<style lang="scss">
section {
    height: 100%;
}
</style>
