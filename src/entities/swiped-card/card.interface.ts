export type CardType = "BAR" | "CAFE" | "RESTAURANT";

export interface ICard {
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
