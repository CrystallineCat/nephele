import type { Component } from "svelte"
import {
    Backpack,
    BicepsFlexed,
    BookOpen,
    Castle,
    Drama,
    Dna,
    Gem,
    Ghost,
    Hammer,
    HeartHandshake,
    Hourglass,
    Landmark,
    Megaphone,
    PawPrint,
    Shield,
    Skull,
    Star,
    Trophy,
    Users,
    WandSparkles,
} from "@lucide/svelte"

import type { Kind } from "./sheet.svelte"

export const KIND_ICONS: Record<Kind, Component> = {
    // origin
    circumstance: Landmark,
    devotion: HeartHandshake,
    past: Hourglass,
    people: Users,
    personality: Drama,
    "skill or trade": Hammer,
    trait: Dna,
    // adventure
    duty: Shield,
    influence: Megaphone,
    knowledge: BookOpen,
    "prodigious ability": BicepsFlexed,
    relic: Gem,
    "uncanny being": Ghost,
    // greatness
    destiny: Star,
    dominion: Castle,
    mastery: Trophy,
    monstrosity: Skull,
    // variable
    companion: PawPrint,
    magic: WandSparkles,
    possessions: Backpack,
}
