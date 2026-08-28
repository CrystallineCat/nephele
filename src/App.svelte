<script lang="ts">
import { onMount } from "svelte"
import Sheet from "./components/Sheet.svelte"
import OBR from "@owlbear-rodeo/sdk"

import { sheet } from "./stores"
import * as OBRHelper from "./services/OBRHelper"

onMount(() => {
    if (OBR.isAvailable) {
        OBRHelper.init()
    }
})
</script>

<main>
    <Sheet bind:sheet={$sheet} />
</main>

<style>
</style>
