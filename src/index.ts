import { readFileSync } from "fs";
import { Matrix } from "./matrix";

const getLines = (filename: string): string[] => {
  const file = readFileSync(filename, "utf-8");
  const lines = file.split("\n");
  return lines;
};

const main = () => {
  let sum = 0;
  const matrix = new Matrix(getLines("./input.txt"));
  let number = 0;
  matrix.getMatrix().forEach((line, y) => {
    for (let x = 0; x < line.length; x++) {
      const char = line.charAt(x);
      if (isNaN(+char)) {
        if (number) {
          if (
            x === 0 // last number found was in previous line
              ? matrix.isNextToSymbol(number, { x: line.length, y: y - 1 })
              : matrix.isNextToSymbol(number, { x, y })
          ) {
            sum += number;
          }
          number = 0;
        }
        continue;
      }
      number = +`${number}${char}`;
    }
  });
  console.log("sum: ", sum);
};

main();
