import { Card } from '@/shared/interfaces/card.interface'
import { create } from 'zustand'

type Store = {
  card: Card | null;
  setResultCard: (card: Card) => void;
}

export const useResultCardStore = create<Store>()((set) => ({
  card: null,
  setResultCard: (card: Card) => set({ card }),
}))
