import { create } from "zustand"

type LoobbyProps = {
  lobbyID: number
  setLobbyID: (lobbyID: number) => void
}

export const useLobby = create<LoobbyProps>()((set) => ({
  lobbyID: 1,
  setLobbyID: () => set((state) => ({ lobbyID: state.lobbyID })),
}))