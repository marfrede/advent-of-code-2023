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

const isGamePossible = (game: Game, bag: Bag): boolean => {
  for (let handOfGame of game.hands) {
    if ((handOfGame.red ?? 0) > bag.red || (handOfGame.green ?? 0) > bag.green || (handOfGame.blue ?? 0) > bag.blue) {
      return false;
    }
  }
  return true;
};

const main = () => {
  const lines = getLines("./input.txt");
  const bag: Bag = { red: 12, green: 13, blue: 14 };
  let sum = 0;
  lines.forEach((line) => {
    if (line) {
      const game = readLineAsGame(line);
      if (isGamePossible(game, bag)) {
        sum += game.id;
      }
    }
  });
  console.log("sum: ", sum);
};

main();
