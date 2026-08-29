import { writable } from "svelte/store"
import { localStore } from "./localStore"
import type { CharacterSheet } from "./types/sheet.type"

const tag = (
    name: string,
    isNegative: boolean = false,
    isTitle: boolean = false,
) => ({ name, isScratched: false, isTitle, isNegative })

const tags = (names: string[]) => [
    tag(names[0], false, true),
    tag(names[1]),
    tag(names[2]),
    tag(""),
    tag(""),
    tag(names[3], true),
    tag("", true),
]

const initialSheet: CharacterSheet = {
    name: "Karima",
    themeCards: [
        {
            tier: "origin",
            kind: "devotion",
            tags: tags([
                "Communities Engineer",
                "walk in their shoes",
                "there is another way",
                "new at this",
            ]),
            quest: "Can I advocate for the outcast?",
        },
        {
            tier: "origin",
            kind: "personality",
            tags: tags([
                "Kind",
                "make someone happy",
                "soothe fears",
                "don't want to take sides",
            ]),
            quest: "I must treat everyone with kindness!",
        },
        {
            tier: "origin",
            kind: "possession",
            tags: tags([
                "Moonlight Cafe",
                "exotic beverages",
                "cozy space",
                "small",
            ]),
            quest: "Can I give creatures a home?",
        },
        {
            tier: "origin",
            kind: "magic",
            tags: tags([
                "Hospitality Magic",
                "cast off the outside",
                "reveal your joy",
                "no privacy",
            ]),
            quest: "What do my guests need?",
        },
    ],
}

export const editing = writable(false)
export const sheet = localStore("dummy-sheet", initialSheet)
