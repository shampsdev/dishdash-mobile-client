import { socket } from '@/app/socket';
import { useAuth } from '@/app/stores/auth.store';

export const useCustomLobby = () => {
  const { user } = useAuth();

  const joinLobby = (lobbyId: string) => {
    console.info("!!!");
    console.info("User", user);
    console.info("Lobby", lobbyId);
  
    socket.sendEvent(
      'joinLobby',
      JSON.stringify({
        lobbyId,
        userId: user?.id,
      })
    );
  };

  return {
    joinLobby
  }  
}
