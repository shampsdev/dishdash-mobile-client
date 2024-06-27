export type CardType = "BAR" | "CAFE" | "RESTAURANT";

export interface Card {
  ID: number;
  Title: string;
  ShortDescription: string;
  Description: string;
  Image: string;
  Location: string;
  Address: string;
  Type: CardType;
  Price: number;
}
