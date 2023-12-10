/*
 * | is a vertical pipe connecting north and south.
 * - is a horizontal pipe connecting east and west.
 * L is a 90-degree bend connecting north and east.
 * J is a 90-degree bend connecting north and west.
 * 7 is a 90-degree bend connecting south and west.
 * F is a 90-degree bend connecting south and east.
 */
export type Pipe = "|" | "-" | "L" | "J" | "7" | "F";

/* . is ground; there is no pipe in this tile. */
export type Ground = ".";

/* S is the starting position of the animal; there is a pipe on this tile, but your sketch doesn't show what shape the pipe has. */
export type Start = "S";

export type Tile = Pipe | Ground | Start;

export const isPipe = (t: Tile): t is Pipe => {
  return !["S", "."].includes(t);
};

export const isGround = (t: Tile): t is Ground => {
  return t === ".";
};

export const isStart = (t: Tile): t is Start => {
  return t === "S";
};
