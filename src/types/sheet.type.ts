export type CharacterSheet = {
    name: string
    themeCards: ThemeCard[]
}

export type ThemeCard = {
    tier: "origin" | "adventure" | "greatness"
    kind: string
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
