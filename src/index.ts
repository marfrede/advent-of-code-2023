import { readFileSync } from "fs";
import { lcmMultiple } from "./least-common-multiple";

type Cycle = { finishLine: string; index: number; index2?: number } | undefined;

const getLines = (filename: string) => {
  const file = readFileSync(filename, "utf-8");
  const lines = file.split("\n");
  return lines.filter((l) => !!l);
};

const findStartingNodes = (lines: string[]): string[] => lines.filter((line) => line[2] === "A");

const getLeft = (line: string) => line.substring(7, 10);
const getRight = (line: string) => line.substring(12, 15);

const getNextLine = (lines: string[], waypoint: string) =>
  lines.find((line) => line.substring(0, 3) === waypoint) as string;

const getCycleValue = (instructions: string, allLines: string[], currentLine: string): number => {
  let cycle: Cycle = undefined;
  let i = 0;
  while (true) {
    const goLeft = instructions.charAt(i++ % instructions.length) === "L";
    currentLine = getNextLine(allLines, goLeft ? getLeft(currentLine) : getRight(currentLine));
    if (currentLine[2] === "Z") {
      if (cycle === undefined) {
        cycle = { finishLine: currentLine, index: i };
      } else {
        if (currentLine !== cycle.finishLine) {
          throw new Error("what??");
        } else {
          cycle.index2 = i;
          break;
        }
      }
    }
  }
  return cycle.index2 - cycle.index;
};

const main = () => {
  const allLines = getLines("./input.txt");
  const instructions = allLines[0];

  const startingNodes = findStartingNodes(allLines);
  const cycles = startingNodes.map((starter) => getCycleValue(instructions, allLines, starter));
  const result = lcmMultiple(cycles);
  console.log("result: ", result);
};

main();
