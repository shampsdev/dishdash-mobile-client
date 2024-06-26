import { API_URL, avatars } from '@/app/app.settings';
import { useAuth } from '@/app/stores/auth.store';
import { useToast } from '@/entities/toast/hooks/useToast';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { SimpleUser } from '../interfaces/simple-user.interface';
import { Image } from 'react-native';

interface ContextProps {
  joinLobby: (lobbyId: string) => void;
}

export const SocketContext = React.createContext<ContextProps>({
  joinLobby: () => {},
});

interface SocketProviderProps {
  children?: JSX.Element;
}

interface Socket {
  on(event: string, callback: (...args: any[]) => void): this;
  emit(event: string, ...args: any[]): this;
  disconnect(): this;
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { user } = useAuth();
  const toast = useToast();

  useEffect(() => {
    const newSocket = io(API_URL ?? '', {
      transports: ['websocket'],
      reconnectionAttempts: 5,
      timeout: 20000,
    });
    setSocket(newSocket);

    newSocket.on('userJoined', (data: SimpleUser) => {
      toast.message(500, {
        message: `${data.name} присоеденился`,
        icon: (
          <Image
            className='h-5 w-5 mr-2'
            source={avatars[Number(data.avatar) - 1].src}
          />
        ),
      });
    });

    // newSocket.on('card', (data) => {
    //   const cardData = data['card'];
    //   setCards((prevCards) => [...prevCards, cardData]);
    //   console.info(cards);
    //   console.info('card');
    // });

    // newSocket.on('match', (data) => {
    //   const matchData = data['card'];
    //   setCards((prevCards) => [...prevCards, matchData]);

    //   setCard(matchData);
    //   setMatchStatus('match');
    //   console.info(matchStatus);
    // });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const joinLobby = (lobbyId: string) => {
    socket?.emit(
      'joinLobby',
      JSON.stringify({
        lobbyId,
        userId: user?.id,
      })
    );
  };

  return (
    <SocketContext.Provider
      value={{
        joinLobby,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
