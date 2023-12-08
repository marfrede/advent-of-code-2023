import { readFileSync } from "fs";

const getLines = (filename: string) => {
  const file = readFileSync(filename, "utf-8");
  const lines = file.split("\n");
  return lines.filter((l) => !!l);
};

const findStartingNodes = (lines: string[]): string[] => lines.filter((line) => line[2] === "A");
const allWayPointsEndInZ = (lines: string[]): boolean => lines.every((line) => line[2] === "Z");

const getLefts = (lines: string[]): string[] => lines.map((line) => line.match(/\((\w+),/)?.at(1) as string);
const getRights = (lines: string[]): string[] => lines.map((line) => line.match(/,\s+(\w+)\)/)?.at(1) as string);
const getNextLines = (allLines: string[], waypoints: string[]) => {
  return waypoints.map((waypoint) => allLines.find((line) => line.substring(0, 3) === waypoint) as string);
};

const main = () => {
  const allLines = getLines("./input.txt");
  const instructions = allLines[0];

  let i = 0;
  const beginnings: string[] = findStartingNodes(allLines);

  let currentLines: string[] = beginnings;
  while (allWayPointsEndInZ(currentLines) !== true) {
    const goLeft = instructions.charAt(i++ % instructions.length) === "L";
    currentLines = getNextLines(allLines, goLeft ? getLefts(currentLines) : getRights(currentLines));
    if (i % 100000 === 0) console.log("i: ", i);
  }

  console.log("sum: ", i);
};

main();
