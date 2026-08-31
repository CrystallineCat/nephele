export type CharacterSheet = {
    name: string
    themes: CharacterTheme[]
}

export type Might = "origin" | "adventure" | "greatness"

export type Kind =
    // origin
    | "circumstance"
    | "devotion"
    | "past"
    | "people"
    | "personality"
    | "skill or trade"
    | "trait"
    // adventure
    | "duty"
    | "influence"
    | "knowledge"
    | "prodigious ability"
    | "relic"
    | "uncanny being"
    // greatness
    | "destiny"
    | "dominion"
    | "mastery"
    | "monstrosity"
    // variable
    | "companion"
    | "magic"
    | "possessions"

export type CharacterTheme = {
    might: Might
    kind: Kind
    tags: Tag[]
    quest: string
    counters: {
        improve: number
        abandon: number
        milestone: number
    }
}

export type Tag = {
    name: string
    isScratched: boolean
    isNegative: boolean
    isTitle: boolean
}

const tag = (
    name: string,
    isNegative: boolean = false,
    isTitle: boolean = false,
) => ({ name, isScratched: false, isTitle, isNegative })

const theme = (
    might: Might,
    kind: Kind,
    tags: string[],
    quest: string,
    counters: {
        improve?: number
        abandon?: number
        milestone?: number
    },
) => ({
    might,
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
    themes: [
        theme(
            "origin",
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
            "adventure",
            "personality",
            [
                "Kind",
                "make someone happy",
                "soothe fears",
                "don't want to take sides",
            ],
            "I must treat everyone with kindness!",
            { improve: 1 },
        ),
        theme(
            "greatness",
            "possessions",
            ["Moonlight Cafe", "exotic beverages", "cozy space", "small"],
            "Can I give small unfortunate creatures a home?",
            {},
        ),
        theme(
            "origin",
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
