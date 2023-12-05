import { readFileSync } from "fs";
import { Scratchcard } from "./scratchcard.model";

const getLines = (filename: string) => {
  const file = readFileSync(filename, "utf-8");
  const lines = file.split("\n");
  return lines.filter((l) => !!l);
};

const main = () => {
  const lines = getLines("./input.txt");

  // create map with initial cards
  const scratchCards = new Map<number, { card: Scratchcard; copies: number }>();
  lines.forEach((line) => {
    const scratchCard = new Scratchcard(line);
    scratchCards.set(scratchCard.getId(), { card: scratchCard, copies: 1 });
  });

  let copiesTotal = 0; // count copies
  while (Array.from(scratchCards.values()).find((card) => card.copies > 0)) {
    // while card with copies exist (copies are being reduced)
    const cardsWithCopies = Array.from(scratchCards.values()).filter((elem) => elem.copies > 0);
    cardsWithCopies.forEach(({ card }) => {
      scratchCards.get(card.getId())!.copies--;
      const points = card.getPoints();
      for (let i = 1; i < 1 + points; i++) {
        scratchCards.get(card.getId() + i)!.copies++;
      }
      copiesTotal++;
    });
  }

  console.log("copiesTotal", copiesTotal);
};

main();
