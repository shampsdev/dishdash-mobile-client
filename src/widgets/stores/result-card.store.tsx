import { ICard } from '@/shared/interfaces/card.interface'
import { create } from 'zustand'

type Store = {
  card: ICard | null;
  setResultCard: (card: ICard) => void;
}

export const useResultCardStore = create<Store>()((set) => ({
  card: null,
  setResultCard: (card: ICard) => set({ card }),
}))
