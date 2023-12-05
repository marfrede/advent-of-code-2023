import { readFileSync } from "fs";

const file = readFileSync("./input.txt", "utf-8");

const lines = file.split("\n");

let sum = 0;
lines.forEach((line) => {
  if (line) {
    const firstDigit = line.match(/(\d)/)?.at(1);
    const lastDigit = line.match(/(\d)(?!.*\d)/)?.at(1);
    const number = +`${firstDigit}${lastDigit}`;
    sum += number;
  }
});
console.log("sum: ", sum);
