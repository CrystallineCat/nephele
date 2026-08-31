<script lang="ts">
import { Flame } from "@lucide/svelte"

import type { Tag, ThemeCard } from "../sheet.svelte"

interface Props {
    themeCard: ThemeCard
}

let { themeCard = $bindable() }: Props = $props()
</script>

<section class="theme-card">
    <table>
        {#each themeCard.tags as tag}
            {@render makeTagRow(tag)}
        {/each}
    </table>

    <section class="quest">
        {themeCard.quest}
        {@render makeCounter("abandon", "⟨", [3, 2, 1])}
        {@render makeCounter("improve", "⏺", [1, 2, 3])}
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
            {tag.name}
        </th>
        <td class="kind">
            {#if tag.isTitle}{themeCard.kind}{/if}
        </td>
        <td class="scratch">
            <button
                onclick={() => {
                    tag.isScratched = !tag.isScratched
                }}><Flame size="1em" /></button
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
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.1em;
    padding: 8px;
    position: relative;
    border-bottom: 1px solid oklch(100% none none / 0.12);
    color: white;

    button {
        border: none;
        background: none;
        font-size: inherit;
        color: white;

        &.counter {
            span {
                font-weight: bold;

                &:not(.active) {
                    opacity: 15%;
                }
            }
        }
    }

    td.kind {
        font-family: "Roboto", "Helvetica", "Arial", sans-serif;
        font-size: 80%;
        font-weight: normal;
        text-transform: capitalize;
        color: oklch(100% 75% 160deg);
        opacity: 50%;
    }

    table {
        margin-top: 8px;
        width: 100%;
        font-size: 90%;
    }

    th {
        text-align: left;
        font-weight: normal;
        padding: 1px 8px;
    }

    td.scratch {
        float: right;
        right: 8px;

        button {
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

    tr.title th {
        text-transform: capitalize;
        padding-bottom: 0.2em;
        font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    }

    tr:not(.title) th::before {
        content: "■";
        float: left;
        padding-right: 8px;
        opacity: 30%;
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
        font-size: 90%;
        border-left: 0.5ch solid oklch(67% 33% 160deg);
        padding-left: 12px;
        margin: 12px;
        font-style: italic;
        display: grid;
        grid-template-columns: auto repeat(3, min-content);
        align-items: center;
        height: 100%;
    }
}
</style>
