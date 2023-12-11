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
  let moves = [curMove];
  while (matrix.get(curMove.pos) !== "S") {
    curMove = matrix.getNextPos(curMove);
    moves.push(curMove);
  }
  console.log("moves to farthest: ", moves.length / 2);
  const innerTiles = matrix.findAllInnerTiles(moves);
  console.log("\n\ninnerTiles: ", innerTiles);
  console.log("innerTiles length: ", innerTiles.length);
};

main();
