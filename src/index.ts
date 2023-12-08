import { readFileSync } from "fs";

const ALL_CARDS = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"] as const;
type CardTuple = typeof ALL_CARDS; // readonly []
type Card = CardTuple[number]; // 2 | 3 | 4 | …

const getLines = (filename: string) => {
  const file = readFileSync(filename, "utf-8");
  const lines = file.split("\n");
  return lines.filter((l) => !!l);
};

const compareCard = (a: Card, b: Card): -1 | 0 | 1 => {
  if (ALL_CARDS.indexOf(a) < ALL_CARDS.indexOf(b)) return -1;
  if (ALL_CARDS.indexOf(a) > ALL_CARDS.indexOf(b)) return 1;
  return 0;
};

const compareHandButOnlyValues = (a: Card[], b: Card[]): -1 | 0 | 1 => {
  for (let i = 0; i < a.length; i++) {
    const aCard = a[i];
    const bCard = b[i];
    const comparison = compareCard(aCard, bCard);
    if (comparison === 0) continue;
    else return comparison;
  }
  return 0;
};

/*
 * Quality 6 - Four of a kind, where four cards have the same label and one card has a different label: AA8AA
 * Quality 5 - Full house, where three cards have the same label, and the remaining two cards share a different label: 23332
 */
const isFourOfAKindOrFullHouse = (a: Card[]): 5 | 6 => {
  let count1 = 1;
  let count2 = 0;
  for (const card of a.slice(1)) {
    if (card === a[0]) ++count1;
    else ++count2;
  }
  return count1 === 4 || count2 === 4 ? 6 : 5;
};

/*
 * Quality 4 - Three of a kind, where three cards have the same label, and the remaining two cards are each different from any other card in the hand: TTT98
 * Quality 3 - Two pair, where two cards share one label, two other cards share a second label, and the remaining card has a third label: 23432
 */
const isThreeOfAKindOrTwoPairs = (a: Card[]): 3 | 4 => {
  const aSorted = a.toSorted(compareCard);
  let count1 = 1;
  let count2 = 0;
  let count3 = 1;
  for (const card of aSorted.slice(1, 4)) {
    if (card === aSorted[0]) ++count1;
    else if (card === aSorted[4]) ++count3;
    else ++count2;
  }
  return count1 === 3 || count2 === 3 || count3 === 3 ? 4 : 3;
};

/**
 * Quality 7 - Five of a kind, where all five cards have the same label: AAAAA
 * Quality 6 - Four of a kind, where four cards have the same label and one card has a different label: AA8AA
 * Quality 5 - Full house, where three cards have the same label, and the remaining two cards share a different label: 23332
 * Quality 4 - Three of a kind, where three cards have the same label, and the remaining two cards are each different from any other card in the hand: TTT98
 * Quality 3 - Two pair, where two cards share one label, two other cards share a second label, and the remaining card has a third label: 23432
 * Quality 2 - One pair, where two cards share one label, and the other three cards have a different label from the pair and each other: A23A4
 * Quality 1 - High card, where all cards' labels are distinct: 23456
 */
const getQuality = (a: Card[]): 1 | 2 | 3 | 4 | 5 | 6 | 7 => {
  if (new Set(a).size === 1) return 7; // five of a kind
  if (new Set(a).size === 2) return isFourOfAKindOrFullHouse(a);
  if (new Set(a).size === 3) return isThreeOfAKindOrTwoPairs(a);
  if (new Set(a).size === 4) return 2; // one pair exactly
  if (new Set(a).size === 5) return 1; // high card
  throw new Error("invalid");
};

const compareHand = (a: Card[], b: Card[]): -1 | 0 | 1 => {
  const aQuality = getQuality(a);
  const bQuality = getQuality(b);
  if (aQuality < bQuality) return -1;
  if (aQuality > bQuality) return 1;
  return compareHandButOnlyValues(a, b);
};

const main = () => {
  const lines = getLines("./input.txt");
  const hands = lines.map((line) => line.substring(0, 5).split("") as Card[]);
  const sortedHands = hands.toSorted(compareHand).map((cards) => ({ cards, quality: getQuality(cards) }));
  console.log(sortedHands);
};

main();
