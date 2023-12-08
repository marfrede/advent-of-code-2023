const CARD_VALUES = [2, 3, 4, 5, 6, 7, 8, 9, "T", "J", "Q", "K", "A"] as const;
type CardValueTuple = typeof CARD_VALUES; // readonly [2, 3, …]
export type CardValue = CardValueTuple[number]; // 2 | 3 | …

export class Card {
  public figure: CardValue;
  public value: number;

  public constructor(char: string) {
    this.figure = isNaN(+char) ? (char as CardValue) : (+char as CardValue);
    this.value = CARD_VALUES.indexOf(this.figure) + 2;
  }

  public isStronger(b: Card): -1 | 0 | 1 {
    return this.value > b.value ? 1 : this.value === b.value ? 0 : -1;
  }
}
