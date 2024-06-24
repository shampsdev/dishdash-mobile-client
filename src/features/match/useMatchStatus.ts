import { ICard } from "@/shared/interfaces/card.interface"
import { create } from "zustand"

type MatchStatusType = 'match' | 'swiping' | 'matchCard'; 

type Store = {
  card: ICard | null;
  matchStatus: MatchStatusType;
  setMatchStatus: (matchStatus: MatchStatusType) => void;
  setCard: (card: ICard | null) => void;
}

export const useMatchStore = create<Store>()((set) => ({
  matchStatus: 'swiping',
  setMatchStatus: (matchStatus: MatchStatusType) => set({ matchStatus }),
  card: {
    id: 1,
    title: 'hello',
    shortDescription: 'hello',
    description: 'hello',
    image: 'https://i.pinimg.com/736x/15/db/39/15db393d2d7b48cffdfa99e262210761.jpg',
    location: "{\"lat\":59.957489, \"lng\":30.308895}",
    address: 'Бездаградская',
    type: 'RESTAURANT',
    price: 900,
  },
  setCard: (card: ICard | null) => set({ card }),
}))