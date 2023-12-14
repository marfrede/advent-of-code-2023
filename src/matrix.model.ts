import { Start, Tile, isStart } from "./tile.model";

export interface Coord {
  x: number;
  y: number;
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

  public getStartPos(): Coord {
    const y = this.lines.findIndex((line) => line.includes("S"));
    const x = this.lines[y].indexOf("S");
    return { x, y };
  }

  public isConnected = (cur: Coord, next: Coord): boolean | Start => {
    console.log("\t\tcur: ", cur);
    console.log("\t\tnext: ", next);
    const surroundings = this.getSurroundings(cur);
    const nextTile: Tile = this.get(next);
    if (isStart(nextTile)) return "S";
    if (this.coordsAreEqual(surroundings.above, next)) return ["|", "7", "F"].includes(nextTile);
    if (this.coordsAreEqual(surroundings.below, next)) return ["|", "L", "J"].includes(nextTile);
    if (this.coordsAreEqual(surroundings.left, next)) return ["-", "L", "F"].includes(nextTile);
    if (this.coordsAreEqual(surroundings.right, next)) return ["-", "J", "7"].includes(nextTile);
    throw new Error("should not happen! 😳");
  };

  public getSurroundings(pos: Coord): Surroundings {
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

  private coordsAreEqual = (a: Coord | undefined, b: Coord | undefined) => {
    if (a === undefined || b === undefined) return false;
    return a.x === b.x && a.y === b.y;
  };
}
