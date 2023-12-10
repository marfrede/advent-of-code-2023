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

const mapLocationToSeed = (maps: AlmanacMap[], destination: number) => {
  let newDest = destination;
  for (const map of maps.toReversed()) {
    newDest = map.mapDestinationToSource(newDest);
  }
  const source = newDest;
  return source;
};

const isSeedValid = (seedInPairs: number[], seed: number) => {
  for (let ix = 0; ix < seedInPairs.length; ix += 2) {
    const firstSeed = seedInPairs[ix];
    const range = seedInPairs[ix + 1];
    if (seed >= firstSeed && seed < firstSeed + range) return true;
  }
  return false;
};

const main = () => {
  const lines: string[] = getLines("./input.txt");
  const maps: AlmanacMap[] = createAlmanacMaps(lines.slice(1));
  const seedInPairs = lines[0]
    .replace(/seeds:\s+/, "")
    .split(/\s+/)
    .map(Number);

  let minLocation: number = 40000000; // skip to 40Mio and begin searching from here
  let seed = 0;
  do {
    seed = mapLocationToSeed(maps, ++minLocation);
    if (minLocation % 1000000 === 0) console.log("minLocation: ", minLocation.toLocaleString());
  } while (!isSeedValid(seedInPairs, seed));

  console.log("minLocation: ", minLocation);
};

main();
