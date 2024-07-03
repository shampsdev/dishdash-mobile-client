import { useSocket } from '@/shared/providers/socket.provider';
import { useLobbyStore } from '@/app/stores/lobby.store';
import { useAuth } from '@/app/stores/auth.store';
import { Settings } from '../interfaces/settings.interface';
import { useSwipes } from '../providers/swipe.provider';

export const useLobby = () => {
  const { emit } = useSocket();
  const { setLobbyId, setUsers, setSettings } = useLobbyStore();
  const { user } = useAuth();
  const { startSwipes } = useSwipes();

  const joinLobby = (lobbyId: string) => {
    console.info(`joined lobby with id: ${lobbyId}`);
    setLobbyId(lobbyId);
    emit('joinLobby', {
      userId: user?.id,
      lobbyId,
    });
  };

  const updateSettings = (settings: Settings) => {
    setSettings(settings);
    emit('settingsUpdate', settings);
  };

  const vote = (id: number, option: number) => {
    emit('vote', {
      id,
      option,
    });
  };

  return {
    joinLobby,
    updateSettings,
    setUsers,
    startSwipes,
    vote,
  };
};
