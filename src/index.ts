import { readFileSync } from "fs";
import { Bag, Game, Unpacking } from "./game.models";

const getLines = (filename: string) => {
  const file = readFileSync(filename, "utf-8");
  const lines = file.split("\n");
  return lines;
};

const readLineAsHand = (handStr: string): Unpacking => {
  let hand: Unpacking = {};
  for (let handMatch of handStr.matchAll(/(\d+)\s+(\w+)/g)) {
    const n = +handMatch[1];
    const color = handMatch[2] as keyof Unpacking;
    hand[color] = n;
  }
  return hand;
};

const readLineAsGame = (line: string): Game => {
  const game: Game = { id: +(line.match(/Game\s+(\d+):/)?.at(1) ?? "0"), hands: [] };
  let handsStr: string = line.substring(line.indexOf(": ") + 2);
  do {
    const handStr = handsStr.substring(0, handsStr.indexOf(";") !== -1 ? handsStr.indexOf(";") + 1 : undefined);
    game.hands.push(readLineAsHand(handStr));
    handsStr = handsStr.replace(handStr, "");
  } while (handsStr);
  return game;
};

const getMinimumBag = (game: Game): Bag => {
  const bag: Bag = { red: 0, green: 0, blue: 0 };
  for (let hand of game.hands) {
    bag.red = bag.red > (hand.red ?? 0) ? bag.red : hand.red ?? 0;
    bag.green = bag.green > (hand.green ?? 0) ? bag.green : hand.green ?? 0;
    bag.blue = bag.blue > (hand.blue ?? 0) ? bag.blue : hand.blue ?? 0;
  }
  return bag;
};

const getPowerOfBag = (bag: Bag): number => {
  return bag.red * bag.green * bag.blue;
};

const main = () => {
  const lines = getLines("./input.txt");
  let sum = 0;
  lines.forEach((line) => {
    if (line) {
      const game = readLineAsGame(line);
      const minBag = getMinimumBag(game);
      const power = getPowerOfBag(minBag);
      sum += power;
    }
  });
  console.log("sum: ", sum);
};

main();
