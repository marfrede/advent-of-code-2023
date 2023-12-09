import { readFileSync } from "fs";

const getLines = (filename: string) => {
  const file = readFileSync(filename, "utf-8");
  const lines = file.split("\n");
  return lines.filter((l) => !!l);
};

const findNextElem = (sequence: number[]) => {};

const main = () => {
  const lines = getLines("./input.txt");
  let sum = 0;
  lines.forEach((line) => {
    sum += 1;
    const sequence: number[] = line.split(" ").map(Number);
  });
  console.log("sum: ", sum);
};

main();
