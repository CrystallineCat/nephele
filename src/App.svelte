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
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Comic+Neue:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap");

:global(:root) {
    --text: oklch(95% none none);
    --lightness: 67%;
    --accent: oklch(var(--lightness) 33% 300deg);
    --accent-origin: oklch(var(--lightness) 33% 160deg);
    --accent-adventure: oklch(var(--lightness) 33% 40deg);
    --accent-greatness: oklch(var(--lightness) 33% 280deg);
    --bg: oklch(20% none none);
}

:global(.origin) {
    --accent: var(--accent-origin);
}

:global(.adventure) {
    --accent: var(--accent-adventure);
}

:global(.greatness) {
    --accent: var(--accent-greatness);
}

:global(body) {
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    hyphens: auto;
    text-wrap: pretty;
    width: 350px;
    padding: 0;
    margin: 0;
    background: var(--bg);
    line-height: 1.2;
}
</style>
