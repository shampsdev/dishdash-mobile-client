import { Card } from '@/shared/interfaces/card.interface';
import { Vote } from '@/shared/interfaces/vote.interface';
import { create } from 'zustand';

interface Store {
  cards: Card[];
  votes: Vote[];
  addVote: (vote: Vote) => void;
  setCards: (cards: Card[]) => void;
}

export const useFinalVoteStore = create<Store>()((set) => ({
  cards: [],
  votes: [],
  setCards: (cards: Card[]) => set(() => ({ cards })),
  addVote: (vote: Vote) => set((state) => ({ votes: [...state.votes, vote] })),
}));
