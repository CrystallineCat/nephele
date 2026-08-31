<script lang="ts">
import { onMount } from "svelte"

import Sheet from "./components/Sheet.svelte"

import { initObrTheme } from "./obr"
import { sheet } from "./sheet.svelte"

onMount(initObrTheme)
</script>

<main>
    <Sheet {sheet} />
</main>

<style>
@import url("https://fonts.googleapis.com/css2?family=Comic+Neue:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Comic+Neue:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=Merriweather+Sans:ital,wght@0,300..800;1,300..800&display=swap");

:global(:root) {
    --text: oklch(100% none none);
    --accent: oklch(67% 33% 160deg);
    --bg: oklch(20% none none);
}

:global(body) {
    font-family: "Comic Neue", cursive;
    hyphens: auto;
    text-wrap: pretty;
    width: 350px;
    padding: 0;
    margin: 0;
    background: var(--bg);
}
</style>
