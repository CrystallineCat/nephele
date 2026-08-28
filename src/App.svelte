<script lang="ts">
import { onMount } from "svelte"
import GmBinderTabs from "./components/GMBinderTabs.svelte"
import Sheet from "./components/Sheet.svelte"
import OBR from "@owlbear-rodeo/sdk"

import { sheet } from "./stores"
import * as OBRHelper from "./services/OBRHelper"
import { writable } from "svelte/store"

const isGM = writable(true) // FIXME OBRHelper

onMount(() => {
    if (OBR.isAvailable) {
        OBRHelper.init()
    }
})
</script>

<main>
    {#if $isGM}
        <GmBinderTabs />
    {/if}
    <Sheet bind:sheet={$sheet} />
</main>

<style>
</style>
