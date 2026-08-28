import { writable } from "svelte/store"
import { localStore } from "./localStore"
import type { DummySheet } from "./types/sheet.type"

const initialSheet: DummySheet = {
    id: 1,
    name: "Karima",
    themeCards: [
        {
            id: 1,
            tier: "origin",
            kind: "devotion",
            tags: {
                title: "Communities Engineer",
                positive: ["walk in their shoes", "there is another way"],
                negative: ["new at this"],
            },
            quest: "Can I advocate for the outcast?",
        },
        {
            id: 2,
            tier: "origin",
            kind: "personality",
            tags: {
                title: "Kind",
                positive: ["make someone happy", "soothe fears"],
                negative: ["don't want to take sides"],
            },
            quest: "I must treat everyone with kindness!",
        },
        {
            id: 3,
            tier: "origin",
            kind: "possession",
            tags: {
                title: "Moonlight Cafe",
                positive: ["exotic beverages", "cozy space"],
                negative: ["small"],
            },
            quest: "Can I give creatures a home?",
        },
        {
            id: 4,
            tier: "origin",
            kind: "magic",
            tags: {
                title: "Hospitality Magic",
                positive: ["cast off the outside", "reveal your joy"],
                negative: ["no privacy"],
            },
            quest: "What do my guests need?",
        },
    ],
}
const initialTheme = {
    primary: "255,255,255",
    secondary: "42,42,42",
    accent: "255,213,140",
    textShadow: "1px 1px 2px #000000",
}

export const editing = writable(false)
export const sheet = localStore("dummy-sheet", initialSheet)
