import { Card } from '@/shared/interfaces/card.interface';
import { Settings } from '@/shared/interfaces/settings.interface';
import { User } from '@/shared/interfaces/user.interface';
import { create } from 'zustand';

type LobbyProps = {
  lobbyId: string;
  users: User[];
  cards: Card[];
  settings: Settings;
  setCards: (cards: Card[]) => void;
  setLobbyId: (lobbyId: string) => void;
  joinLobby: (lobbyId: string) => void;
  setUsers: (users: User[]) => void;
  addUser: (user: User) => void;
  removeUser: (userId: string) => void;
  setSettings: (settings: Settings) => void;
};

export const useLobbyStore = create<LobbyProps>((set) => ({
  lobbyId: '',
  users: [],
  cards: [],
  settings: {
    priceMin: 0,
    priceMax: 1000,
    maxDistance: 100,
    tags: [],
  },
  setCards: (cards) => set({ cards }),
  setLobbyId: (lobbyId) => set({ lobbyId }),
  joinLobby: (lobbyId) => set({ lobbyId }),
  setUsers: (users) => set({ users }),
  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
  removeUser: (userId) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== userId),
    })),
  setSettings: (settings) => set({ settings }),
}));
