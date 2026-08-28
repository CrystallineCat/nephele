export type DummySheet = {
    id: number
    name: string
    themeCards: ThemeCard[]
}

export type ThemeCard = {
    id: number
    tier: "origin" | "adventure" | "greatness"
    kind: string
    tags: {
        title: string
        positive: string[]
        negative: string[]
    }
    quest: string
}
