export type CardType = "BAR" | "CAFE" | "RESTAURANT";

export interface Card {
  id: number;
  title: string;
  shortDescription: string;
  description: string;
  image: string;
  location: string;
  address: string;
  type: CardType;
  price: number;
}
