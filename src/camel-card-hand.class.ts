import { Card, CardValue } from "./camel-card.class";

export class Hand {
  public bid: number;
  private cardsOrig: CardValue[];
  private cards: number[];
  private cardsSorted: number[];
  private value: number;

  public constructor(hand: string, bid: number) {
    this.bid = bid;
    const cardsOrig = hand.split("").map((char) => new Card(char));
    this.cardsOrig = cardsOrig.map((card) => card.figure);
    this.cards = cardsOrig.map((card) => card.value);
    this.cardsSorted = this.cards.toSorted((a, b) => a - b);
    this.value = this.getValue();
  }

  private getValue() {
    if (this.hasFiveOaK()) {
      return 7;
    }
    if (this.hasFourOaK()) {
      return 6;
    }
    if (this.hasFullHouse()) {
      return 5;
    }
    if (this.hasThreeOaK()) {
      return 4;
    }
    if (this.hasTwoPairs()) {
      return 3;
    }
    if (this.hasOnePair()) {
      return 2;
    }
    if (this.hasNoPair()) {
      return 1;
    }
    console.error(this);
    throw new Error("nothing!!!");
  }

  public isStronger(b: Hand): -1 | 0 | 1 {
    if (this.value > b.value) return 1;
    if (this.value < b.value) return -1;
    return this.compareSingleCards(b, 5);
  }

  public hasFiveOaK() {
    return this.setLen() === 1;
  }

  public hasFourOaK() {
    return this.setLen() === 2 && this.cardsSorted[3] != this.cardsSorted[4];
  }

  public hasFullHouse() {
    return this.setLen() === 2 && this.cardsSorted[3] === this.cardsSorted[4];
  }

  public hasThreeOaK(): boolean {
    if (!(this.setLen() === 3)) return false;
    const middle = this.cardsSorted[2];
    if (middle === this.cardsSorted[1]) {
      return middle === this.cardsSorted[0] || middle === this.cardsSorted[3];
    }
    return middle === this.cardsSorted[3] && middle === this.cardsSorted[4];
  }

  public hasTwoPairs() {
    if (!(this.setLen() === 3)) return false;
    return !this.hasThreeOaK();
  }

  public hasOnePair() {
    return this.setLen() === 4;
  }

  public hasNoPair() {
    return this.setLen() === 5;
  }

  private setLen() {
    return new Set(this.cards).size;
  }

  private compareSingleCards(b: Hand, depth: 1 | 2 | 3 | 4 | 5): -1 | 0 | 1 {
    for (let i = 0; i < depth; i++) {
      if (this.cards[i] > b.cards[i]) return 1;
      if (this.cards[i] < b.cards[i]) return -1;
    }
    return 0;
  }
}
