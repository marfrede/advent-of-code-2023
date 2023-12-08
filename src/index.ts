import { readFileSync } from "fs";

const getLines = (filename: string) => {
  const file = readFileSync(filename, "utf-8");
  const lines = file.split("\n");
  return lines.filter((l) => !!l);
};

const findStartingNodes = (lines: string[]): string[] => lines.filter((line) => line[2] === "A");
const allWayPointsEndInZ = (lines: string[]): boolean => lines.every((line) => line[2] === "Z");

const getLefts = (lines: string[]): string[] => lines.map((line) => line.substring(7, 10));
const getRights = (lines: string[]): string[] => lines.map((line) => line.substring(12, 15));
const getNextLines = (allLines: string[], waypoints: string[]) => {
  return waypoints.map((waypoint) => {
    return allLines.find((line) => line.substring(0, 3) === waypoint) as string;
  });
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
    if (i % 1000000 === 0) console.log("iii: ", i);
  }

  console.log("sum: ", i);
};

main();
