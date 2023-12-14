import { readFileSync } from "fs";

const readFields = (filename: string) => {
  const file = readFileSync(filename, "utf-8");
  const lines = file.split("\n");
  const fields: string[][] = [];

  let fieldIndex = 0;
  fields[0] = [];
  for (const line of lines) {
    if (line) {
      fields[fieldIndex].push(line);
    } else {
      fields[++fieldIndex] = [];
    }
  }

  return fields;
};

const convertToColumns = (field: string[]) => {
  const columns: string[] = [];
  for (let x = 0; x < field[0].length; x++) {
    let column: string = "";
    for (let y = 0; y < field.length; y++) {
      const line: string = field[y];
      column += line[x];
    }
    columns.push(column);
  }
  return columns;
};

const findVerticalMirror = (field: string[]): number | false => {
  const asColumns = convertToColumns(field);
  const mirror = findHorizontalMirror(asColumns);
  return mirror === false ? false : mirror;
};

const findHorizontalMirror = (field: string[]): number | false => {
  let stackLength: number = 1;
  let compareWithIndex = -1;
  let equalCounter = 0;
  let lastWasEqual = false;
  for (let i = 1; i < field.length; i++) {
    const linePrev = field[i + compareWithIndex];
    const lineThis = field[i];
    if (linePrev !== lineThis) {
      // unequal
      stackLength++;
      // console.log(i, i + compareWithIndex, "  unequal  ", stackLength, compareWithIndex);
      compareWithIndex = -1;
      lastWasEqual = false;
    } else {
      // equal
      equalCounter++;
      stackLength--;
      if (i + compareWithIndex === 0) {
        // from zero index to here are all equal ignore the rest
        return equalCounter;
      }
      // console.log(i, i + compareWithIndex, "    EQUAL  ", stackLength, compareWithIndex);
      compareWithIndex = compareWithIndex - 2;
      lastWasEqual = true;
    }
  }
  //if lastEqual === true form last to equalCounter all are the same
  return lastWasEqual ? field.length - equalCounter : false;
};

const main = () => {
  const fields = readFields("./input.txt");
  const sum = fields.reduce((preSum, curField) => {
    const hMirror = findHorizontalMirror(curField);
    const vMirror = findVerticalMirror(curField);
    if (vMirror === false && hMirror === false) {
      throw new Error("bad!");
    }
    if (hMirror === false) {
      return preSum + (vMirror as number);
    }
    if (vMirror === false) {
      return preSum + (hMirror as number) * 100;
    }
    if (hMirror > vMirror) {
      return preSum + (hMirror as number) * 100;
    } else {
      return preSum + (vMirror as number);
    }
  }, 0);
  console.log("sum: ", sum);
};

main();
