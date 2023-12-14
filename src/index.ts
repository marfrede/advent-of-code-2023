import { readFileSync } from "fs";

const getLines = (filename: string) => {
  const file = readFileSync(filename, "utf-8");
  const lines = file.split("\n");
  return lines.filter((l) => !!l);
};

const main = () => {
  const lines = getLines("./input.txt");
  const sum = lines.reduce((prevSum, line, i) => {
    return prevSum + 1;
  }, 0);
  console.log("sum: ", sum);
};

main();
