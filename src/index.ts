import { readFileSync } from "fs";
import { Matrix } from "./matrix";

const getLines = (filename: string): string[] => {
  const file = readFileSync(filename, "utf-8");
  const lines = file.split("\n");
  return lines;
};

const addToMapArray = (map: Map<string, number[]>, id: string, nr: number) => {
  if (map.has(id)) {
    map.get(id)?.push(nr);
  } else {
    map.set(id, [nr]);
  }
};

const main = () => {
  const matrix = new Matrix(getLines("./input.txt"));
  const gearToNumbersMap: Map<string, number[]> = new Map<string, number[]>();
  let number = 0;
  matrix.getMatrix().forEach((line, y) => {
    for (let x = 0; x < line.length; x++) {
      const char = line.charAt(x);
      if (isNaN(+char)) {
        if (number) {
          const gearPositions =
            x === 0 // last number found was in previous line
              ? matrix.getAdjacentGears(number, { x: line.length, y: y - 1 })
              : matrix.getAdjacentGears(number, { x, y });
          gearPositions.forEach((gearPos) => {
            addToMapArray(gearToNumbersMap, gearPos, number);
          });

          number = 0;
        }
        continue;
      }
      number = +`${number}${char}`;
    }
  });

  let sum = 0;
  for (let adjacentNumbers of gearToNumbersMap.values()) {
    if (adjacentNumbers.length === 2) {
      sum += adjacentNumbers[0] * adjacentNumbers[1];
    }
  }
  console.log("sum: ", sum);
};

main();
