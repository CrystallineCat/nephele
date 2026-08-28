import OBR from "@owlbear-rodeo/sdk"
import type { Player } from "@owlbear-rodeo/sdk"
import { sheet } from "../stores"

import { writable, get } from "svelte/store"


export const isGM = writable(false)
export const PartyStore = writable<Player[]>([])
export const currentPlayerName = writable<string>("")
export const currentPlayerId = writable<string>("")
export const viewingPlayerId = writable<string>("")

export async function init() {
    OBR.onReady(async () => {
        PartyStore.set(await OBR.party.getPlayers())
        currentPlayerName.set(await OBR.player.getName())
        currentPlayerId.set(await OBR.player.getId())
        viewingPlayerId.set(await OBR.player.getId())
        isGM.set((await OBR.player.getRole()) === "GM")
        if (get(isGM)) {
            initGM()
        } else {
            initPlayer()
        }
    })
    OBR.player.onChange((player) => {
        currentPlayerName.set(player.name)
        currentPlayerId.set(player.id)
    })
}

async function initGM() {
    OBR.party.onChange((party) => {
        PartyStore.set(party)
    })
}

async function initPlayer() {
    sheet.subscribe(function (sheet) {
        OBR.player.onChange((player) => {
            player.metadata["nephele"] = sheet
        })
        OBR.player.setMetadata({ nephele: sheet })
    })
}
