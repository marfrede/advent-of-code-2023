import { readFileSync } from "fs";
import { aaaLine } from "./input-helper";

const getLines = (filename: string) => {
  const file = readFileSync(filename, "utf-8");
  const lines = file.split("\n");
  return lines.filter((l) => !!l);
};

const getLeft = (line: string) => line.match(/\((\w+),/)?.at(1) as string;
const getRight = (line: string) => line.match(/,\s+(\w+)\)/)?.at(1) as string;
const getNextLine = (lines: string[], waypoint: string) =>
  lines.find((line) => line.substring(0, 3) === waypoint) as string;

const main = () => {
  const lines = getLines("./input.txt");
  const instructions = lines[0];

  let i = 0;
  const beginning = lines[aaaLine];

  let currentLine = beginning;
  while (currentLine.substring(0, 3) !== "ZZZ") {
    const goLeft = instructions.charAt(i++ % instructions.length) === "L";
    currentLine = getNextLine(lines, goLeft ? getLeft(currentLine) : getRight(currentLine));
  }

  console.log("sum: ", i);
};

main();
