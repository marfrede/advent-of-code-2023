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
  let value = 0;
  const splittedAfterRocks = (col.match(/[^#]+#?|#/g) || []).map((s) => s ?? "");
  // const len = strings.reduce((sum, st) => sum + st.length, 0);

  let indexPointsLeft = COL_LEN;
  for (const lineBeforeRock of splittedAfterRocks) {
    if (lineBeforeRock.includes("O")) {
      const numberOfOs = (lineBeforeRock.match(/O/g) || []).length;
      console.log("\t\tstr: ", lineBeforeRock);
      console.log("\t\tnumberOfOs: ", numberOfOs);
      for (let i = 0; i < numberOfOs; i++) {
        value += indexPointsLeft - i;
        console.log("\t\t\tpoints: ", indexPointsLeft - i);
      }
    }
    indexPointsLeft = indexPointsLeft - lineBeforeRock.length;
  }
  console.log("\tstrings: ", splittedAfterRocks);
  console.log("\tpoints: ", value);
  // console.log("\tlen: ", len);
  return value;
};

const main = () => {
  const lines: string[] = getLines("./input.txt");
  const columns: string[] = convertToColumns(lines);
  COL_LEN = columns[0].length;
  const sum = columns.reduce((prevSum, col) => {
    console.log("col: ", col);
    return prevSum + getValueOfCol(col);
  }, 0);
  console.log("sum: ", sum);
};

main();
