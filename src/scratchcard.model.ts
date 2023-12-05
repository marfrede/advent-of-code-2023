export class Scratchcard {
  private numbersPresent: number[] = [];
  private winningNumbers: number[] = [];
  private points: number;

  public constructor(line: string) {
    this.numbersPresent = this.readPresentNrs(line);
    this.winningNumbers = this.readWinningNrs(line);
    this.points = this.calcPoints();
  }

  public getPoints() {
    return this.points;
  }

  private calcPoints() {
    let points = 0;
    this.numbersPresent.forEach((numberPresent) => {
      if (this.winningNumbers.includes(numberPresent)) {
        points = points === 0 ? 1 : points + points;
      }
    });
    return points;
  }

  private readPresentNrs(line: string) {
    return this.readNumbers(line.substring(line.indexOf("|")));
  }

  private readWinningNrs(line: string) {
    return this.readNumbers(line.substring(line.indexOf(":"), line.indexOf("|")));
  }

  private readNumbers(input: string) {
    const numbersMatches = input.match(/\d+/g);
    return numbersMatches ? numbersMatches.map(Number) : [];
  }
}
