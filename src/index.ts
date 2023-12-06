import { readFileSync } from "fs";
import { AlmanacMap } from "./map.model";

const getLines = (filename: string) => {
  const file = readFileSync(filename, "utf-8");
  const lines = file.split("\n");
  return lines.filter((l) => !!l);
};

const createAlmanacMaps = (lines: string[]): AlmanacMap[] => {
  const maps: AlmanacMap[] = [];
  let groupOfLines: string[] = [];
  lines.forEach((line) => {
    if (line[0].match(/[a-zA-Z]/) !== null) {
      if (groupOfLines.length) {
        maps.push(new AlmanacMap(groupOfLines));
      }
      return (groupOfLines = [line]);
    } else if (line[0].match(/\d/) !== null) {
      return groupOfLines.push(line);
    }
  });
  maps.push(new AlmanacMap(groupOfLines));
  return maps;
};

const readSeeds = (line: string) => {
  return line
    .replace(/seeds:\s+/, "")
    .split(/\s+/)
    .map(Number);
};

const mapSeedToLocation = (maps: AlmanacMap[], seed: number) => {
  let newSrc = seed;
  for (const map of maps) {
    newSrc = map.mapSourceToDestination(newSrc);
  }
  const location = newSrc;
  return location;
};

const mapThroughToLocationsReturnMinLocation = (maps: AlmanacMap[], seeds: number[]) => {
  let minLocation: number | undefined = undefined;
  for (const seed of seeds) {
    const location = mapSeedToLocation(maps, seed);
    minLocation = minLocation === undefined || location < minLocation ? location : minLocation;
  }
  return minLocation;
};

const main = () => {
  const lines: string[] = getLines("./input.txt");
  const maps: AlmanacMap[] = createAlmanacMaps(lines.slice(1));
  const seeds: number[] = readSeeds(lines[0]);

  const minLocation = mapThroughToLocationsReturnMinLocation(maps, seeds);
  console.log("minLocation: ", minLocation);
};

main();
