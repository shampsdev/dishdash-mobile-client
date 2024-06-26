import { create } from 'zustand';

type LobbyProps = {
  lobbyID: string;
  setLobbyID: (lobbyID: string) => void;
};

export const useLobby = create<LobbyProps>()((set) => ({
  lobbyID: '',
  setLobbyID: () => set((state) => ({ lobbyID: state.lobbyID })),
}));
