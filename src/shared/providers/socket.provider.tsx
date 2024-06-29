import { API_URL } from '@/app/app.settings';
import React, { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

interface ContextProps {
  subscribe: (event: string, callback: (...args: any[]) => void) => void;
  emit: (event: string, ...args: any[]) => void;
}

export const SocketContext = React.createContext<ContextProps>({
  subscribe: () => {},
  emit: () => {},
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

  useEffect(() => {
    const newSocket: Socket = io(API_URL ?? '', {
      transports: ['websocket'],
      reconnectionAttempts: 5,
      timeout: 20000,
    });
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const subscribe = (event: string, callback: (...args: any[]) => void) => {
    socket?.on(event, callback);
  };

  const emit = (event: string, data: any) => {
    socket?.emit(event, JSON.stringify(data));
  };

  return (
    <SocketContext.Provider
      value={{
        subscribe,
        emit,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
