import type { CharacterSheet } from "./types/sheet.type"

const tag = (
    name: string,
    isNegative: boolean = false,
    isTitle: boolean = false,
) => ({ name, isScratched: false, isTitle, isNegative })

const theme = (
    kind: string,
    tags: string[],
    quest: string,
    counters: {
        improve?: number
        abandon?: number
        milestone?: number
    },
) => ({
    tier: "origin" as "origin",
    kind,
    tags: [
        tag(tags[0], false, true),
        tag(tags[1]),
        tag(tags[2]),
        tag(tags[3], true),
    ],
    quest,
    counters: {
        improve: 0,
        abandon: 0,
        milestone: 0,
        ...counters,
    },
})

export const sheet: CharacterSheet = $state({
    name: "Karima",
    themeCards: [
        theme(
            "devotion",
            [
                "Communities Engineer",
                "walk in their shoes",
                "there is another way",
                "new at this",
            ],
            "Can I advocate for the marginalized?",
            {},
        ),
        theme(
            "personality",
            [
                "Kind",
                "make someone happy",
                "soothe fears",
                "I don't want to take sides",
            ],
            "I must treat everyone with kindness!",
            { improve: 1 },
        ),
        theme(
            "possession",
            ["Moonlight Cafe", "exotic beverages", "cozy space", "small"],
            "Can I give small unfortunate creatures a home?",
            {},
        ),
        theme(
            "magic",
            [
                "Hospitality Magic",
                "cast off the outside",
                "reveal your joy",
                "no privacy",
            ],
            "What do my guests need?",
            { improve: 1, abandon: 1 },
        ),
    ],
})
