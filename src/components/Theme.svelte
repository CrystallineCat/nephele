<script lang="ts">
import { KIND_ICONS } from "../theme-icons"
import type { Tag, CharacterTheme } from "../sheet.svelte"
import { ChevronDown, ChevronsDown } from "@lucide/svelte"

interface Props {
    theme: CharacterTheme
}

let { theme }: Props = $props()

const KindIcon = $derived(KIND_ICONS[theme.kind])
</script>

<section class={[theme.might, "theme"]}>
    <b class="kind">
        {theme.kind}

        {@render renderCounter("abandon", "⟨", [3, 2, 1])}
        {@render renderCounter("improve", "⏺", [1, 2, 3])}
        {@render renderCounter("milestone", "⟩", [1, 2, 3])}
    </b>

    <ul>
        {#each theme.tags as tag}
            {@render renderTag(tag)}
        {/each}
    </ul>
</section>

{#snippet renderTag(tag: Tag)}
    <li
        class={{
            negative: tag.isNegative,
            title: tag.isTitle,
            scratch: tag.isScratched,
        }}
    >
        {#if tag.isTitle}
            <h2><KindIcon size="1em" /> {tag.name}</h2>

            <p class="quest">{theme.quest}</p>
        {:else}
            {#if tag.isNegative}<ChevronsDown size="1em" />{/if}
            {tag.name}
        {/if}
    </li>
{/snippet}

{#snippet renderCounter(
    name: "improve" | "abandon" | "milestone",
    symbol: string,
    order: number[],
)}
    <button
        class={[name, "counter"]}
        onclick={() => (theme.counters[name] = (theme.counters[name] + 1) % 4)}
        >{#each order as i}<span class={{ active: theme.counters[name] >= i }}
                >{symbol}</span
            >{/each}</button
    >
{/snippet}

<style>
.theme {
    display: flex;
    flex-direction: column;
    gap: 0.4px;
    color: var(--text);
    border-left: 0.5ch solid var(--accent);
    margin: 8px;
    padding: 2px 8px;

    button {
        border: none;
        background: none;
        font-size: inherit;
        color: inherit;

        &.counter {
            span {
                font-weight: bold;

                &:not(.active) {
                    opacity: 25%;
                }
            }
        }
    }

    :global(svg) {
        vertical-align: -0.15em;
    }

    b {
        font-size: 80%;
        text-transform: capitalize;
        font-variant: small-caps;
        font-weight: normal;
        color: var(--accent);
        padding-block: 2px;
        display: grid;
        grid-template-columns: 1fr min-content min-content min-content;
        gap: 0;
    }

    ul {
        margin: 0;
        padding: 0;

        li {
            &.title {
                display: block;

                h2 {
                    margin: 0;
                    padding: 0;
                    font-size: 100%;
                    font-weight: normal;

                    :global(svg) {
                        color: var(--accent);
                    }
                }

                .quest {
                    font-size: 80%;
                    margin: 0;
                    padding: 4px;
                    font-style: italic;

                    &::before {
                        content: "» ";
                        font-size: 120%;
                        color: var(--accent);
                    }

                    &::after {
                        content: " «";
                        font-size: 120%;
                        color: var(--accent);
                    }

                    opacity: 90%;
                }
            }

            &:not(.title) {
                font-size: 67%;
                display: inline-block;
                padding: 2px 6px;
                border: 1px solid;
                border-radius: 6px;
                margin: 2px;
                opacity: 75%;
            }

            &.negative {
                :global(svg) {
                    margin-inline: -0.3ch;
                }
            }

            &.scratch {
                text-decoration: line-through;
            }
        }
    }
}
</style>
