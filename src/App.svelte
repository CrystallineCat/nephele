<script lang="ts">
import { onMount } from "svelte"
import Sheet from "./components/Sheet.svelte"
import OBR from "@owlbear-rodeo/sdk"

import { sheet } from "./stores"

onMount(() => {
    if (OBR.isAvailable) {
        sheet.subscribe(function (sheet) {
            OBR.player.onChange((player) => {
                player.metadata["nephele"] = sheet
            })
            OBR.player.setMetadata({ nephele: sheet })
        })
    }
})
</script>

<main>
    <Sheet bind:sheet={$sheet} />
</main>

<style>
</style>
