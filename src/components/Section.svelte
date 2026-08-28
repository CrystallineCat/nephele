<script lang="ts">
import Stats from "./Stats.svelte"

import type { ThemeCard } from "../types/sheet.type"
import Editable from "./Editable.svelte"

interface Props {
    themeCard: ThemeCard
}

let { themeCard = $bindable() }: Props = $props()
</script>

<section class="sheet">
    <h1>
        <Editable bind:text={themeCard.tags.title} />
    </h1>
    <!--<Stats bind:stats={section.stats} />-->

    <Editable bind:text={themeCard.quest} />
</section>

<style>
.sheet {
    padding: 1rem 0.5rem;
    border-width: 0.15rem;
    border-style: solid;
    border-image: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0),
            rgb(var(--accent)),
            rgba(0, 0, 0, 0)
        )
        1 100%;
    border-right: none;

    h1 {
        text-shadow: var(--shadow);
        color: rgb(var(--accent));
        font-size: 1.2rem;
        margin-top: 0;
        margin-bottom: 0;
    }
}
</style>
