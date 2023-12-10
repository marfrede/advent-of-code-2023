import { readFileSync } from "fs";
import { Matrix, Move } from "./matrix.model";

const getLines = (filename: string) => {
  const file = readFileSync(filename, "utf-8");
  const lines = file.split("\n");
  return lines.filter((l) => !!l);
};

const main = () => {
  const lines = getLines("./input.txt");
  const matrix: Matrix = new Matrix(lines);
  let curMove: Move = matrix.getSecondTile();
  let moves = 1;
  while (matrix.get(curMove.pos) !== "S") {
    curMove = matrix.getNextPos(curMove);
    moves++;
  }
  console.log("moves to farthest: ", moves / 2);
};

main();
