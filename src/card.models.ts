export const NO_JOKER_CARDS = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "Q", "K", "A"] as const;
type NoJokerCardTuple = typeof NO_JOKER_CARDS; // readonly array
export type NoJokerCard = NoJokerCardTuple[number]; // 2 | 3 | 4 | …

export const ALL_CARDS = ["J", ...NO_JOKER_CARDS] as const;
type CardTuple = typeof ALL_CARDS; // readonly array
export type Card = CardTuple[number]; // 2 | 3 | 4 | …

export type Quality = 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type Hand = { cards: Card[]; bid: number; quality: Quality };
