<script lang="ts">
import { editing } from "../stores"
import { currentPlayerId, viewingPlayerId } from "../services/OBRHelper"

import RemoveStat from "./RemoveStat.svelte"
import AddStat from "./AddStat.svelte"
import type { DummySheetStats } from "../types/sheet.type"

interface Props {
    stats: DummySheetStats[]
}

let { stats = $bindable() }: Props = $props()

let newStatId = $derived(
    stats.length > 0 ? Math.max(...stats.map((t) => t.id)) + 1 : 1,
)
let editable = $derived($currentPlayerId === $viewingPlayerId)

function addStat() {
    stats = [
        ...stats,
        {
            id: newStatId,
            name: "New Field",
            value: "-",
        },
    ]
}
function removeStat(stat: DummySheetStats) {
    stats = stats.filter((t) => t.id !== stat.id)
}
</script>

<table>
    <tbody>
        {#each stats as stat (stat.id)}
            <tr>
                {#if editable && $editing}
                    <td contenteditable="true" bind:innerText={stat.name}></td>
                {:else}
                    <td>{stat.name}</td>
                {/if}
                {#if editable}
                    <td contenteditable="true" bind:innerText={stat.value}></td>
                {:else}
                    <td>{stat.value}</td>
                {/if}

                {#if editable && $editing}
                    <td style="width:0.5rem;"
                        ><RemoveStat {stat} {removeStat} /></td
                    >
                {/if}
            </tr>
        {/each}
    </tbody>
</table>
{#if $editing}
    <AddStat {addStat} />
{/if}

<style>
table {
    border-collapse: collapse;
    width: 100%;
}
tr:nth-last-child(2n + 1) {
    background: rgba(var(--accent), 0.05);
}
td {
    white-space: pre-wrap;
    text-shadow: var(--shadow);
    padding: 0 0.5rem;
    color: rgba(var(--primary), 0.85);
    vertical-align: top;
    width: auto;
    &:not(:first-child) {
        text-align: right;
    }
    &:hover {
        color: rgba(var(--primary), 1);
    }
}
</style>
