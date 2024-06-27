import { ICard } from '@/shared/interfaces/card.interface';
import { User } from '@/shared/interfaces/user.interface';
import { create } from 'zustand';

type LobbyProps = {
  lobbyID: string;
  users: User[];
  cards: ICard[]; 
  setCards: (cards: ICard[]) => void;
  setLobbyID: (lobbyID: string) => void;
  joinLobby: (lobbyID: string) => void;
};

export const useLobby = create<LobbyProps>()((set) => ({
  lobbyID: '',
  users: [],
  cards: [],
  setCards: () => set((state) => ({ cards: state.cards })),
  joinLobby: () => set((state) => ({ lobbyID: state.lobbyID })),
  setLobbyID: () => set((state) => ({ lobbyID: state.lobbyID })),
}));
