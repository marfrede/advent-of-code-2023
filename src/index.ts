import { readFileSync } from "fs";
import { Scratchcard } from "./scratchcard.model";

const getLines = (filename: string) => {
  const file = readFileSync(filename, "utf-8");
  const lines = file.split("\n");
  return lines;
};

const main = () => {
  const lines = getLines("./input.txt");
  const scratchCards = lines.map((line) => new Scratchcard(line));
  let sum = 0;
  scratchCards.forEach((scratchCard) => {
    sum += scratchCard.getPoints();
  });
  console.log("sum: ", sum);
};

main();
