import { Tile } from "./tile.model";

export type Direction = "up" | "down" | "left" | "right";

export interface Coord {
  x: number;
  y: number;
}

export interface Move {
  pos: Coord;
  didGo: Direction;
}

export interface Surroundings {
  above: Coord | undefined;
  right: Coord | undefined;
  below: Coord | undefined;
  left: Coord | undefined;
}

export class Matrix {
  private lines: string[];

  public constructor(lines: string[]) {
    this.lines = lines;
  }

  public get(pos: Coord): Tile {
    if (!this.isCoordValid(pos)) {
      console.trace("pos: ", pos);
      throw new Error("Out of Bounds!");
    }
    const { x, y } = pos;
    return this.lines[y].charAt(x) as Tile;
  }

  public getSecondTile = (): Move => {
    const starter = this.getStartPos();
    const surroundings = this.getSurroundings(starter);
    if (surroundings.above && ["|", "7", "F"].includes(this.get(surroundings.above)))
      return { pos: surroundings.above, didGo: "up" };
    if (surroundings.below && ["|", "L", "J"].includes(this.get(surroundings.below)))
      return { pos: surroundings.below, didGo: "down" };
    if (surroundings.left && ["-", "L", "F"].includes(this.get(surroundings.left)))
      return { pos: surroundings.left, didGo: "left" };
    if (surroundings.right && ["-", "J", "7"].includes(this.get(surroundings.right)))
      return { pos: surroundings.right, didGo: "right" };
    throw new Error("invalid");
  };

  public getNextPos = (lastMove: Move): Move => {
    const { pos: curPos, didGo } = lastMove;
    const curTile = this.get(curPos);
    const surroundings = this.getSurroundings(curPos);
    if (curTile === ".") throw new Error("I got lost...");
    switch (didGo) {
      case "down":
        if (curTile === "J") return { pos: surroundings.left as Coord, didGo: "left" };
        if (curTile === "L") return { pos: surroundings.right as Coord, didGo: "right" };
        if (curTile === "|") return { pos: surroundings.below as Coord, didGo: "down" };
        break;
      case "up":
        if (curTile === "7") return { pos: surroundings.left as Coord, didGo: "left" };
        if (curTile === "F") return { pos: surroundings.right as Coord, didGo: "right" };
        if (curTile === "|") return { pos: surroundings.above as Coord, didGo: "up" };
        break;
      case "left":
        if (curTile === "L") return { pos: surroundings.above as Coord, didGo: "up" };
        if (curTile === "F") return { pos: surroundings.below as Coord, didGo: "down" };
        if (curTile === "-") return { pos: surroundings.left as Coord, didGo: "left" };
        break;
      case "right":
        if (curTile === "J") return { pos: surroundings.above as Coord, didGo: "up" };
        if (curTile === "7") return { pos: surroundings.below as Coord, didGo: "down" };
        if (curTile === "-") return { pos: surroundings.right as Coord, didGo: "right" };
        break;
    }
    throw new Error("stop it");
  };

  private getStartPos(): Coord {
    const y = this.lines.findIndex((line) => line.includes("S"));
    const x = this.lines[y].indexOf("S");
    return { x, y };
  }

  private getSurroundings(pos: Coord): Surroundings {
    const { x, y } = pos;
    const above = { x: x, y: y - 1 };
    const left = { x: x - 1, y: y };
    const right = { x: x + 1, y: y };
    const below = { x: x, y: y + 1 };
    return {
      above: this.isCoordValid(above) ? above : undefined,
      right: this.isCoordValid(right) ? right : undefined,
      below: this.isCoordValid(below) ? below : undefined,
      left: this.isCoordValid(left) ? left : undefined,
    };
  }

  private isCoordValid(pos: Coord): boolean {
    if (pos.y < 0 || pos.y >= this.lines.length) {
      return false;
    }
    if (pos.x < 0 || pos.x >= this.lines[pos.y].length) {
      return false;
    }
    return true;
  }
}
