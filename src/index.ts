import { readFileSync } from "fs";

let COL_LEN: number;

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

const getValueOfCol = (col: string) => {
  const splittedAfterRocks = (col.match(/[^#]+#?|#/g) || []).map((s) => s ?? "");
  let value = 0;
  let indexPointsLeft = COL_LEN;
  for (const lineBeforeRock of splittedAfterRocks) {
    if (lineBeforeRock.includes("O")) {
      const numberOfOs = (lineBeforeRock.match(/O/g) || []).length;
      for (let i = 0; i < numberOfOs; i++) {
        value += indexPointsLeft - i;
      }
    }
    indexPointsLeft = indexPointsLeft - lineBeforeRock.length;
  }
  return value;
};

const main = () => {
  const lines: string[] = getLines("./input.txt");
  const columns: string[] = convertToColumns(lines);
  COL_LEN = columns[0].length;

  const sum = columns.reduce((prevSum, col) => prevSum + getValueOfCol(col), 0);
  console.log("sum: ", sum);
};

main();
