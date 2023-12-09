import { readFileSync } from "fs";

if (!Array.prototype.last) {
  Array.prototype.last = function () {
    return this[this.length - 1];
  };
}

const getLines = (filename: string) => {
  const file = readFileSync(filename, "utf-8");
  const lines = file.split("\n");
  return lines.filter((l: string) => !!l);
};

const findNextElem = (sequence: number[]) => {};

const main = () => {
  const lines = getLines("./input.txt");

  const sum = lines.reduce((prevSum, line) => {
    return prevSum + 1;
    const sequence: number[] = line.split(" ").map(Number);
  }, 0);
  console.log("sum: ", sum);
};

main();
