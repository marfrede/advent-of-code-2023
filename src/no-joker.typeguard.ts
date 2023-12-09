import { Card, NO_JOKER_CARDS, NoJokerCard } from "./card.models";

export const isNoJoker = (card: Card): card is NoJokerCard => NO_JOKER_CARDS.includes(card as NoJokerCard);
export const hasNoJoker = (cards: Card[]): cards is NoJokerCard[] => cards.every((card) => isNoJoker(card));
