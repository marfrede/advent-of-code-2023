import { readFileSync } from "fs";
import { DIGITS, STR_DIGITS } from "./digits";
import { mapStrToNumberDigit } from "./map-str-to-digit.helper";

const oneOfStrDigits = STR_DIGITS.join("|");

const getLines = (filename: string) => {
  const file = readFileSync(filename, "utf-8");
  const lines = file.split("\n");
  return lines;
};

const findFirstDigitInLine = (line: string): number => {
  const firstDigitRegex = RegExp("(\\d|" + oneOfStrDigits + ")");
  const firstDigitStr: string | undefined = line.match(firstDigitRegex)?.at(1);
  return mapStrToNumberDigit(firstDigitStr);
};

const findLastDigitInLine = (line: string): number => {
  let maxIndex: number = 0;
  let strDigitFound: string | undefined = undefined;
  const numberAndStringDigits: string[] = STR_DIGITS.concat(DIGITS.map((d) => "" + d));
  numberAndStringDigits.forEach((digit) => {
    const index = line.lastIndexOf(digit);
    if (index >= maxIndex) {
      maxIndex = index;
      strDigitFound = digit;
    }
  });
  return mapStrToNumberDigit(strDigitFound);
};

const main = () => {
  const lines = getLines("./input.txt");

  let sum = 0;
  lines.forEach((line, index) => {
    if (line) {
      const firstDigit: number = findFirstDigitInLine(line);
      const lastDigit: number = findLastDigitInLine(line);
      const number = +`${firstDigit}${lastDigit}`;
      sum += number;
    }
  });
  console.log("sum: ", sum);
};

main();
