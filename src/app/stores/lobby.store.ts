import { create } from "zustand"

type LobbyProps = {
  lobbyID: number
  setLobbyID: (lobbyID: number) => void
}

export const useLobby = create<LobbyProps>()((set) => ({
  lobbyID: 1,
  setLobbyID: () => set((state) => ({ lobbyID: state.lobbyID })),
}))