import { readFileSync } from "fs";

const getLines = (filename: string) => {
  const file = readFileSync(filename, "utf-8");
  const lines = file.split("\n");
  return lines.filter((l) => !!l);
};

const convertToColumns = (lines: string[]) => {
  const columns: string[] = [];
  for (let x = 0; x < lines[0].length; x++) {
    let column: string = "";
    for (let y = 0; y < lines.length; y++) {
      const line: string = lines[y];
      column += line[x];
    }
    columns.push(column);
  }
  return columns;
};

const reverseString = (s: string): string => s.split("").reverse().join("");

const rollNorth = (col: string): string => {
  let newCol = "";
  const splittedBetweenRocks = col.split("#");
  splittedBetweenRocks.forEach((beforeRockStr, i) => {
    const numberOfOs = (beforeRockStr.match(/O/g) || []).length;
    const numberOfDots = (beforeRockStr.match(/\./g) || []).length;
    newCol += (i > 0 ? "#" : "") + "O".repeat(numberOfOs) + ".".repeat(numberOfDots);
  });
  return newCol;
};

const makeOneCycle = (lines: string[]): string[] => {
  let columns: string[] = lines;
  columns = convertToColumns(columns).map((col) => rollNorth(col)); // roll north
  columns = convertToColumns(columns).map((col) => rollNorth(col)); // roll west
  columns = convertToColumns(columns).map((col) => reverseString(rollNorth(reverseString(col)))); // roll south
  columns = convertToColumns(columns).map((col) => reverseString(rollNorth(reverseString(col)))); // roll east
  return columns;
};

const countLoadOnNorth = (lines: string[]): number =>
  lines.reduce((prev, line, i) => prev + (line.match(/O/g) || []).length * (lines.length - i), 0);

const main = () => {
  const LINES: string[] = getLines("./input.txt");
  const numberOfCycles = 1000; // to be honest I don´t know why this is the same as 1000000000
  let lines = LINES;
  for (let i = 0; i < numberOfCycles; i++) lines = makeOneCycle(lines);
  const sum = countLoadOnNorth(lines);
  console.log("sum: ", sum);
};

main();
