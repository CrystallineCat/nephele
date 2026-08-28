import { writable } from "svelte/store"
import { localStore } from "./localStore"

const initialSheet = {
    id: 1,
    name: "Example Sheet",
    sections: [
        {
            id: 1,
            name: "Character",
            stats: [
                {
                    id: 1,
                    name: "Name",
                    value: "Karima",
                },
            ],
        },
        {
            id: 2,
            name: "Devotion",
            stats: [
                {
                    id: 1,
                    name: "Title",
                    value: "Communities Engineer",
                },
                {
                    id: 2,
                    name: "Skill 1",
                    value: "walk in their shoes",
                },
                {
                    id: 3,
                    name: "Skill 2",
                    value: "there is another way",
                },
                {
                    id: 4,
                    name: "Weakness",
                    value: "new at this",
                },
                {
                    id: 5,
                    name: "Quest",
                    value: "Can I advocate for the outcast?",
                },
            ],
        },
        {
            id: 3,
            name: "Personality",
            stats: [
                {
                    id: 1,
                    name: "Title",
                    value: "Kind",
                },
                {
                    id: 2,
                    name: "Skill 1",
                    value: "make someone happy",
                },
                {
                    id: 3,
                    name: "Skill 2",
                    value: "soothe fears",
                },
                {
                    id: 4,
                    name: "Weakness",
                    value: "don't want to take sides",
                },
                {
                    id: 5,
                    name: "Quest",
                    value: "I must treat everyone with kindness!",
                },
            ],
        },
        {
            id: 4,
            name: "Possession",
            stats: [
                {
                    id: 1,
                    name: "Title",
                    value: "Moonlight Cafe",
                },
                {
                    id: 2,
                    name: "Skill 1",
                    value: "exotic beverages",
                },
                {
                    id: 3,
                    name: "Skill 2",
                    value: "cozy space",
                },
                {
                    id: 4,
                    name: "Weakness",
                    value: "small",
                },
                {
                    id: 5,
                    name: "Quest",
                    value: "Can I give creatures a home?",
                },
            ],
        },
        {
            id: 5,
            name: "Magic",
            stats: [
                {
                    id: 1,
                    name: "Title",
                    value: "Hospitality Magic",
                },
                {
                    id: 2,
                    name: "Skill 1",
                    value: "cast off the outside",
                },
                {
                    id: 3,
                    name: "Skill 2",
                    value: "reveal your joy",
                },
                {
                    id: 4,
                    name: "Weakness",
                    value: "no privacy",
                },
                {
                    id: 5,
                    name: "Quest",
                    value: "What do my guests need?",
                },
            ],
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
