export class Scratchcard {
  private id: number;
  private numbersPresent: number[];
  private winningNumbers: number[];
  private points: number;

  public constructor(line: string) {
    this.id = this.readCardId(line);
    this.numbersPresent = this.readPresentNrs(line);
    this.winningNumbers = this.readWinningNrs(line);
    this.points = this.calcPoints();
    // console.log("this: ", this);
  }

  public getId() {
    return this.id;
  }

  public getPoints() {
    return this.points;
  }

  private calcPoints() {
    return this.numbersPresent.map((nrPres) => this.winningNumbers.includes(nrPres)).filter(Boolean).length;
  }

  private readCardId(line: string) {
    const id = line.match(/\s+(\d+):/)?.at(1);
    if (!id || isNaN(+id)) {
      throw new Error("id not read");
    }
    return +id;
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
