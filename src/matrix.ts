export interface Coord {
  x: number;
  y: number;
}

export class Matrix {
  private lines: string[];

  public constructor(lines: string[]) {
    this.lines = lines;
  }

  public getMatrix() {
    return this.lines;
  }

  public getAdjacentGears(number: number, posInSameLineAfterNumber: Coord) {
    const { x: posX, y: posY } = posInSameLineAfterNumber;
    const len = `${number}`.length;
    const gearPositions: Set<string> = new Set<string>();
    for (let x = posX - len; x < posX; x++) {
      const surroundingPositions = this.getSurroundingPositions({ x, y: posY });
      for (let index = 0; index < surroundingPositions.length; index++) {
        const pos = surroundingPositions[index];
        if (this.isGear(pos)) {
          gearPositions.add(this.getPosId(pos));
        }
      }
    }
    return gearPositions;
  }

  private isGear(pos: Coord) {
    const gear = "*";
    return this.get(pos) === gear;
  }

  private getSurroundingPositions(pos: Coord): Coord[] {
    const { x, y } = pos;
    const above = [
      { x: x - 1, y: y - 1 },
      { x: x, y: y - 1 },
      { x: x + 1, y: y - 1 },
    ];
    const leftRight = [
      { x: x - 1, y: y },
      { x: x + 1, y: y },
    ];
    const below = [
      { x: x - 1, y: y + 1 },
      { x: x, y: y + 1 },
      { x: x + 1, y: y + 1 },
    ];
    return [...above, ...leftRight, ...below].filter((pos) => this.isCoordValid(pos));
  }

  private get(pos: Coord): string {
    if (!this.isCoordValid(pos)) {
      console.trace("pos: ", pos);
      throw new Error("Out of Bounds!");
    }
    const { x, y } = pos;
    return this.lines[y].charAt(x);
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

  private getPosId(pos: Coord) {
    return `${pos.x}, ${pos.y}`;
  }
}
