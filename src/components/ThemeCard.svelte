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
        {@render makeCounter("improve", "⏺", [1, 2, 3])}
        <Editable bind:text={themeCard.kind} {isEditing} />
    </h1>

    <table>
        {#each themeCard.tags as tag}
            {@render makeTagRow(tag)}
        {/each}
    </table>

    <section class="quest">
        {@render makeCounter("abandon", "⟨", [3, 2, 1])}
        <Editable bind:text={themeCard.quest} {isEditing} />
        {@render makeCounter("milestone", "⟩", [1, 2, 3])}
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

{#snippet makeCounter(
    name: "improve" | "abandon" | "milestone",
    symbol: string,
    order: number[],
)}
    <button
        class={[name, "counter"]}
        onclick={() =>
            (themeCard.counters[name] = (themeCard.counters[name] + 1) % 4)}
        >{#each order as i}<span
                class={{ active: themeCard.counters[name] >= i }}>{symbol}</span
            >{/each}</button
    >
{/snippet}

<style>
.theme-card {
    display: flex;
    flex-direction: column;
    gap: 0.1em;
    padding: 0.25em;
    position: relative;
    border: 2px solid oklch(70% 25% 160deg);
    background: oklch(99% 1% 20deg);

    button {
        border: none;
        background: none;
        font-size: inherit;

        &.counter {
            font-size: 1.25em;

            span {
                &:not(.active) {
                    opacity: 15%;
                }

                &.active {
                    font-weight: bold;
                }
            }
        }
    }

    h1 {
        text-align: center;
        margin: 0;
        font-family: "Merriweather Sans", sans-serif;
        font-size: inherit;
        font-weight: normal;
        font-variant: small-caps;
        text-transform: capitalize;
        color: oklch(50% 50% 160deg);

        :global(div)::after {
            content: "🌿";
            font-family: "Noto Emoji";
            float: right;
        }

        button {
            float: left;
            width: 0;
            color: inherit;
        }
    }

    table {
        width: 100%;
    }

    th {
        text-align: center;
        font-weight: normal;
        padding: 0.05em 1em;
    }

    td {
        position: absolute;
        right: 3ch;
        width: 0;

        button {
            font-family: "Noto Emoji";
            opacity: 15%;
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
        font-size: 1.1em;
        font-weight: bold;
        text-transform: capitalize;
        padding-bottom: 0.2em;
    }

    tr.negative th {
        :global(::before) {
            content: "⟪";
            padding-right: 0.2ch;
            opacity: 50%;
        }

        :global(::after) {
            content: "⟫";
            padding-left: 0.2ch;
            opacity: 50%;
        }
    }

    .quest {
        border-top: 1px solid oklch(70% 25% 160deg);
        text-align: center;
        font-style: italic;
        margin: 0.5em -0.25em;
        padding-top: 1em;
        display: grid;
        grid-template-columns: min-content auto min-content;
        height: 100%;

        :global(.editable) {
            height: min-content;
            place-self: center;
        }
    }
}
</style>
