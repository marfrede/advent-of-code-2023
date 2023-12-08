import { appendFileSync, readFileSync, writeFileSync } from "fs";
import { Hand } from "./camel-card-hand.class";

const getLines = (filename: string) => {
  const file = readFileSync(filename, "utf-8");
  const lines = file.split("\n");
  return lines.filter((l) => !!l);
};

const main = () => {
  const lines = getLines("./input.txt");

  const hands: Hand[] = [];
  lines.forEach((line) => {
    const lineMatch = line.match(/(.{5})\s+(\d+)/);
    hands.push(new Hand(lineMatch!.at(1) as string, +(lineMatch!.at(2) as string)));
  });

  writeFileSync("./output.json", "[");
  hands
    .toSorted((a, b) => a.isStronger(b))
    .forEach((h, i) => appendFileSync("./output.json", JSON.stringify(h) + ",\n\n"));
  appendFileSync("./output.json", "]");

  let sum = 0;
  hands
    .toSorted((a, b) => a.isStronger(b))
    .forEach((hand, i) => {
      sum += hand.bid * (i + 1);
    });
  console.log("sum: ", sum);
};

main();
