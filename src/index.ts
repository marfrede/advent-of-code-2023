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

const mapSeedToLocation = (maps: AlmanacMap[], seed: number) => {
  let newSrc = seed;
  for (const map of maps) {
    newSrc = map.mapSourceToDestination(newSrc);
  }
  const location = newSrc;
  return location;
};

const main = () => {
  const lines: string[] = getLines("./input.txt");
  const maps: AlmanacMap[] = createAlmanacMaps(lines.slice(1));
  const seedInPairs = lines[0]
    .replace(/seeds:\s+/, "")
    .split(/\s+/)
    .map(Number);

  let minLocation: number | undefined = undefined;
  for (let ix = 0; ix < seedInPairs.length; ix += 2) {
    const firstSeed = seedInPairs[ix];
    const range = seedInPairs[ix + 1];
    for (let seed = firstSeed; seed < firstSeed + range; seed++) {
      const location = mapSeedToLocation(maps, seed);
      minLocation = minLocation === undefined || location < minLocation ? location : minLocation;
    }
  }

  console.log("minLocation: ", minLocation);
};

main();
