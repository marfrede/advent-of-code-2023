import { readFileSync } from "fs";

if (!Array.prototype.last && !Array.prototype.secondLast) {
  Array.prototype.last = function () {
    return this[this.length - 1];
  };
  Array.prototype.secondLast = function () {
    return this[this.length - 2];
  };
}

const getLines = (filename: string) => {
  const file = readFileSync(filename, "utf-8");
  const lines = file.split("\n");
  return lines.filter((l: string) => !!l);
};

const elementsAreAllTheSame = (array: number[]): boolean => {
  return array.every((num) => num === array[0]);
};

const createDiffArrays = (sequence: number[]): number[][] => {
  const diffArrays: number[][] = [sequence];
  while (!elementsAreAllTheSame(diffArrays.last())) {
    diffArrays.push([]);
    const seq = diffArrays.secondLast();
    for (let i = 0; i < seq.length; i++) {
      const num: number = seq[i];
      const nextNum: number | undefined = seq.at(i + 1);
      if (nextNum !== undefined) {
        diffArrays.last().push(nextNum - num);
      }
    }
  }
  return diffArrays;
};

const addNextElemToDiffArrays = (diffArrays: number[][]) => {
  let toAdd = diffArrays.last()[0];
  for (let i = diffArrays.length - 2; i >= 0; i--) {
    const diffArray = diffArrays[i];
    toAdd = diffArray.last() + toAdd;
    diffArray.push(toAdd);
  }
  return diffArrays;
};

const findNextElem = (sequence: number[]) => {
  const diffArrays = createDiffArrays(sequence);
  addNextElemToDiffArrays(diffArrays);
  return diffArrays[0].last();
};

const main = () => {
  const lines = getLines("./input.txt");

  const sum = lines.reduce((prevSum, line, i) => {
    const sequence: number[] = line.split(" ").map(Number);
    const nextElem = findNextElem(sequence);
    return prevSum + nextElem;
  }, 0);
  console.log("sum: ", sum);
};

main();
