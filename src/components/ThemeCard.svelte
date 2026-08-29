<script lang="ts">
import type { Tag, ThemeCard } from "../types/sheet.type"
import Editable from "./Editable.svelte"

interface Props {
    themeCard: ThemeCard
    isEditing: boolean
}

let { themeCard = $bindable(), isEditing }: Props = $props()
</script>

<section class="theme-card">
    <table>
        {#each themeCard.tags as tag}
            {@render makeTagRow(tag)}
        {/each}
    </table>

    <Editable bind:text={themeCard.quest} {isEditing} />
</section>

{#snippet makeTagRow(tag: Tag)}
    <tr
        class={{
            negative: tag.isNegative,
            title: tag.isTitle,
            empty: tag.name === "",
        }}
    >
        <th>
            <Editable bind:text={tag.name} {isEditing} />
        </th>
        <td>
            {#if tag.name !== "" || isEditing}
                <input type="checkbox" bind:checked={tag.isScratched} />
            {/if}
        </td>
    </tr>
{/snippet}

<style>
.theme-card {
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
