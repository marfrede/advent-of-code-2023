import { readFileSync } from "fs";

export type DIGIT = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type DIGIT_U = DIGIT | undefined;

let lines: string[] = [];

export const initLines = (filename: string) => {
  const file = readFileSync(filename, "utf-8");
  lines = file.split("\n").filter((l) => !!l);
};

export const get = (x: number, y: number): DIGIT_U =>
  y >= 0 && x >= 0 && y <= lines.length && x <= lines[0].length ? (+lines[y].charAt(x) as DIGIT) : undefined;

export const getSurrounding = (x: number, y: number): [DIGIT_U, DIGIT_U, DIGIT_U, DIGIT_U] => {
  const above = get(x, y - 1);
  const right = get(x + 1, y);
  const below = get(x, y + 1);
  const left = get(x - 1, y);
  return [above, right, below, left];

export const getMinSurrounding = (x: number, y: number): [DIGIT, number, number] => {
  const value = Math.min(...(getSurrounding(x, y).filter((f) => f !== undefined) as number[])) as DIGIT;
  return [value, ];
};

export const getMinSurroundingForDepth = (x: number, y: number, depth: number = 1): DIGIT => {
  return getMinSurrounding(x, y);
};
