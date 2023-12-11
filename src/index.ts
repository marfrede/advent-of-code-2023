import { readFileSync } from "fs";

type Coord = { x: number; y: number };

const GAL = "#";
const xsWithoutGalaxy: number[] = [];
const ysWithoutGalaxy: number[] = [];
const galaxies: Coord[] = [];

const getLines = (filename: string) => {
  const file = readFileSync(filename, "utf-8");
  const lines = file.split("\n");
  return lines.filter((l) => !!l);
};

const readXsWithoutGalaxy = (universe: string[]) => {
  for (let x = 0; x < universe[0].length; x++) {
    let column: string = "";
    for (let y = 0; y < universe.length; y++) {
      const line: string = universe[y];
      const char = line[x];
      if (char === GAL) {
        galaxies.push({ x, y });
      }
      column += char;
    }
    if (!column.includes(GAL)) xsWithoutGalaxy.push(x);
  }
  return xsWithoutGalaxy;
};

const readYsWithoutGalaxy = (universe: string[]) => {
  for (let y = 0; y < universe.length; y++) {
    const line: string = universe[y];
    if (!line.includes("#")) ysWithoutGalaxy.push(y);
  }
  return ysWithoutGalaxy;
};

const calcDistance = (aGal: Coord, bGal: Coord) => {
  const minX = Math.min(aGal.x, bGal.x);
  const maxX = Math.max(aGal.x, bGal.x);
  const minY = Math.min(aGal.y, bGal.y);
  const maxY = Math.max(aGal.y, bGal.y);
  const distNoExpansion = maxX - minX + (maxY - minY);
  let dist = distNoExpansion;
  for (const xWithout of xsWithoutGalaxy) {
    if (minX < xWithout && maxX > xWithout) dist = dist + (1000000 - 1);
  }
  for (const yWithout of ysWithoutGalaxy) {
    if (minY < yWithout && maxY > yWithout) dist = dist + (1000000 - 1);
  }
  return dist;
};

const calcDistances = () => {
  let distanceSum = 0;
  for (let i = 0; i < galaxies.length; i++) {
    for (let j = 0; j < galaxies.length; j++) {
      if (i !== j && i > j) distanceSum += calcDistance(galaxies[i], galaxies[j]);
    }
  }
  return distanceSum;
};

const main = () => {
  const lines = getLines("./input.txt");
  readYsWithoutGalaxy(lines);
  readXsWithoutGalaxy(lines);
  const sum = calcDistances();
  console.log("sum: ", sum);
};

main();
