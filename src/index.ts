import { readFileSync } from "fs";

const getLines = (filename: string) => {
  const file = readFileSync(filename, "utf-8");
  const lines = file.split("\n");
  return lines.filter((l) => !!l);
};

const main = () => {
  const lines = getLines("./input.txt");
  let sum = 0;
  lines.forEach((line) => {
    sum += 0;
  });
  console.log("sum: ", sum);
};

main();
