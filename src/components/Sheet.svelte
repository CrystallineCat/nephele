<script lang="ts">
import type { CharacterSheet } from "../sheet.svelte"

import Theme from "./Theme.svelte"

interface Props {
    sheet: CharacterSheet
}

let { sheet }: Props = $props()
</script>

<article class="sheet">
    <h1>{sheet.name}</h1>

    <main>
        {#each sheet.themes as _, i}
            <Theme theme={sheet.themes[i]} />
        {/each}
    </main>
</article>

<style>
.sheet {
    width: 100%;
    margin: 0;
    display: flex;
    flex-direction: column;

    h1 {
        margin: 0;
        color: var(--text);
        font-size: 1.125rem;
        line-height: 1.75;
        padding: 16px;
        border-bottom: 1px solid
            color-mix(in oklch, var(--text) 12%, transparent);
    }

    main {
        display: contents;
    }
}
</style>
