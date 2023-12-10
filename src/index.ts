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
  console.log("second: ", curMove, matrix.get(curMove.pos));
  let moves = [curMove];
  while (matrix.get(curMove.pos) !== "S") {
    curMove = matrix.getNextPos(curMove);
    moves.push(curMove);
    console.log("curMove: ", curMove, matrix.get(curMove.pos));
  }
  console.log("moves to farthest: ", moves.length / 2);
  const directInnerTiles = matrix.getDirectInnerTiles(moves);
  console.log("\n\ndirectInnerTiles: ", directInnerTiles);
  console.log("directInnerTiles length: ", directInnerTiles.length);
};

main();
