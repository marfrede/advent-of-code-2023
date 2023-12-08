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

const compareHandValues = (a: Card[], b: Card[]) => {
  for (let i = 0; i < a.length; i++) {
    const aCard = a[i];
    const bCard = b[i];
    const comparison = compareCard(aCard, bCard);
    if (comparison === 0) continue;
    else return comparison;
  }
  return 0;
};

const main = () => {
  const lines = getLines("./input.txt");
  const hands = lines.map((line) => line.substring(0, 5).split("") as Card[]);
  console.log(hands.sort(compareHandValues));
};

main();
