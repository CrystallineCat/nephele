<script lang="ts">
import type { Tag, ThemeCard } from "../types/sheet.type"
import Editable from "./Editable.svelte"

interface Props {
    themeCard: ThemeCard
    isEditing: boolean
}

let { themeCard = $bindable(), isEditing }: Props = $props()
</script>

<section class={{ "theme-card": true, editing: isEditing }}>
    <h1>
        <Editable bind:text={themeCard.kind} {isEditing} />
    </h1>

    <table>
        {#each themeCard.tags as tag}
            {@render makeTagRow(tag)}
        {/each}
    </table>

    <section class="quest">
        <Editable bind:text={themeCard.quest} {isEditing} />
    </section>
</section>

{#snippet makeTagRow(tag: Tag)}
    <tr
        class={{
            negative: tag.isNegative,
            title: tag.isTitle,
            scratch: tag.isScratched,
            empty: tag.name === "",
        }}
    >
        <th>
            <Editable bind:text={tag.name} {isEditing} />
        </th>
        <td>
            <button
                onclick={() => {
                    tag.isScratched = !tag.isScratched
                }}>🔥</button
            >
        </td>
    </tr>
{/snippet}

<style>
.theme-card {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.25rem;
    position: relative;
    border: 2px solid oklch(70% 25% 160deg);
    background: oklch(99% 1% 20deg);
    width: clamp(12rem, 50%, 18rem);

    h1 {
        text-align: center;
        margin: 0;
        font-family: "Merriweather Sans", sans-serif;
        font-size: 1rem;
        font-weight: bold;
        font-variant: small-caps;
        color: oklch(50% 50% 160deg);

        :global(div)::after {
            content: "🌿";
            font-family: "Noto Emoji";
            float: right;
        }
    }

    table {
        width: 100%;
    }

    th {
        text-align: center;
        font-weight: normal;
        padding: 0.05rem 1rem;
    }

    td {
        position: absolute;
        right: 1.5rem;
        width: 0;

        button {
            font-family: "Noto Emoji";
            opacity: 30%;
            border: none;
            background: none;
        }
    }

    tr.scratch {
        th {
            text-decoration: line-through;
        }

        button {
            opacity: 100%;
        }
    }

    &:not(.editing) tr.empty {
        display: none;
    }

    tr.title th {
        font-size: 1.2rem;
        padding-bottom: 0.25rem;
    }

    tr.negative th {
        :global(::before) {
            color: oklch(50% 50% 160deg);
            font-weight: bold;
            content: "⟨ ";
        }

        :global(::after) {
            color: oklch(50% 50% 160deg);
            font-weight: bold;
            content: " ⟩";
        }
    }

    .quest {
        border-top: 1px solid oklch(70% 25% 160deg);
        text-align: center;
        font-style: italic;
        margin: 0.5rem;
        padding-top: 0.75rem;
    }
}
</style>
