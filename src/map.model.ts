export class AlmanacMap {
  private static indexCounter = 0;
  private index: number;
  private name: string;
  private mappings: number[][];

  public constructor(lines: string[]) {
    this.index = ++AlmanacMap.indexCounter;
    this.name = lines[0].slice(0, lines[0].length - 1);
    this.mappings = lines.slice(1).map((line) => line.split(/\s+/).map(Number));
  }

  public mapSourceToDestination(source: number): number {
    for (const mapping of this.mappings) {
      const [dest, src, range] = mapping;
      if (source >= src && source < src + range) {
        const diff = source - src;
        return dest + diff;
      }
    }
    return source;
  }
}
