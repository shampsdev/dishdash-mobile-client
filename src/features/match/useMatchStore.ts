import { Card } from '@/shared/interfaces/card.interface';
import { create } from 'zustand';

type MatchStatusType = 'match' | 'swiping' | 'matchCard';

type Store = {
  card: Card | null;
  matchStatus: MatchStatusType;
  setMatchStatus: (matchStatus: MatchStatusType) => void;
  setMatchCard: (card: Card | null) => void;
};

export const useMatchStore = create<Store>()((set) => ({
  matchStatus: 'swiping',
  setMatchStatus: (matchStatus: MatchStatusType) => set({ matchStatus }),
  card: null,
  setMatchCard: (card: Card | null) => set({ card }),
}));
