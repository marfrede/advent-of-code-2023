export interface Bag {
  red: number;
  green: number;
  blue: number;
}

export type Unpacking = Partial<Bag>;

export interface Game {
  id: number;
  hands: Unpacking[];
}
