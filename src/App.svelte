<script lang="ts">
import Sheet from "./components/Sheet.svelte"

import { sheet } from "./sheet.svelte"
</script>

<main>
    <Sheet {sheet} />
</main>

<style>
@import url("https://fonts.googleapis.com/css2?family=Comic+Neue:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Comic+Neue:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=Merriweather+Sans:ital,wght@0,300..800;1,300..800&display=swap");

:global(body) {
    font-family: "Comic Neue", cursive;
    hyphens: auto;
    text-wrap: pretty;
    width: 350px;
    padding: 0;
    margin: 0;
}
</style>
