import { useContext } from 'react';
import { SocketContext } from '../providers/socket.provider';

export const useSwipes = () => {
  const { joinLobby } = useContext(SocketContext);

  return {
    joinLobby,
  };
};
