import { readFileSync } from "fs";

const getLines = (filename: string) => {
  const file = readFileSync(filename, "utf-8");
  const lines = file.split("\n");
  return lines.filter((l) => !!l);
};

const interpretLines = (lines: string[]) => {
  const tRx = /Time:\s+/;
  const dRx = /Distance:\s+/;
  const times = lines[0].replace(tRx, "").split(/\s+/).map(Number);
  const distances = lines[1].replace(dRx, "").split(/\s+/).map(Number);
  return { times, distances };
};

const countWaysToBeatRecord = (time: number, distance: number): number => {
  let sum = 0;
  for (let timePressed = 0; timePressed < time; timePressed++) {
    const distanceTraveled = (time - timePressed) * timePressed;
    if (distanceTraveled > distance) sum++;
  }
  return sum;
};

const main = () => {
  const lines = getLines("./input.txt");
  const { times, distances } = interpretLines(lines);
  let product = 1;
  for (let i = 0; i < times.length; i++) {
    const time = times[i];
    const distanceRecord = distances[i];
    product = product * countWaysToBeatRecord(time, distanceRecord);
  }
  console.log("product: ", product);
};

main();
