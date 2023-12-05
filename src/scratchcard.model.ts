export class Scratchcard {
  private numbersPresent: number[] = [];
  private winningNumbers: number[] = [];
  private points: number;

  public constructor(line: string) {
    this.numbersPresent = this.readPresentNrs(line);
    this.winningNumbers = this.readWinningNrs(line);
    this.points = this.calcPoints();
    console.log("this: ", this);
  }

  public getPoints() {
    return this.points;
  }

  private calcPoints() {
    return this.numbersPresent.map((nrPres) => this.winningNumbers.includes(nrPres)).filter(Boolean).length;
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
