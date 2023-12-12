import { readFileSync } from "fs";

const getLines = (filename: string) => {
  const file = readFileSync(filename, "utf-8");
  const lines = file.split("\n");
  return lines.filter((l) => !!l);
};

const numbersMatchSprings = (springs: string, numbers: number[]): boolean => {
  const matches = [...springs.matchAll(/#+/g)];
  const lengthValid = numbers.length === matches.length;
  return lengthValid && matches.map((match, index) => match[0].length === numbers[index]).every((t) => t);
};

const incrementUnknownSprings = (springs: string, indexesIncrementable: number[]): string => {
  for (let i = indexesIncrementable.length - 1; i >= 0; i--) {
    const index = indexesIncrementable[i];
    if (springs.charAt(index) === ".") {
      springs = springs.substring(0, index) + "#" + springs.substring(index + 1);
      return springs;
    } else {
      springs = springs.substring(0, index) + "." + springs.substring(index + 1);
      continue;
    }
  }
  return springs;
};

const getQuestionMarkIndexes = (str: string) => {
  const unknownIndexes: number[] = [];
  [...str.matchAll(/\?+/g)].forEach((m) => {
    if (m["index"] !== undefined) {
      for (let i = 0; i < m[0].length; i++) {
        unknownIndexes.push(m["index"] + i);
      }
    }
  });
  return unknownIndexes;
};

const getNumberOfDifferentMatches = (springs: string, numbers: number[]): number => {
  let matches = 0;
  const unknownIndexes: number[] = getQuestionMarkIndexes(springs);
  const allDots = springs.replaceAll("?", ".");
  springs = allDots;
  do {
    springs = incrementUnknownSprings(springs, unknownIndexes);
    if (numbersMatchSprings(springs, numbers)) matches++;
  } while (springs !== allDots);
  return matches;
};

const main = () => {
  const lines = getLines("./input.txt");
  const sum = lines.reduce((prevSum, line) => {
    const numbers: number[] = line
      .substring(line.indexOf(" ") + 1)
      .split(",")
      .map(Number);
    const springs: string = line.substring(0, line.indexOf(" "));
    return prevSum + getNumberOfDifferentMatches(springs, numbers);
  }, 0);
  console.log("sum: ", sum);
};

main();
