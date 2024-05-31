import { API_HOST } from '@/app/app.settings';
import { useEffect, useState, useCallback } from 'react';
import io from 'socket.io-client';

interface Socket {
  on(event: string, callback: (...args: any[]) => void): this;
  emit(event: string, ...args: any[]): this;
  disconnect(): this;
}

const useSocket = (event: string) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(API_HOST, {
      transports: ['websocket'],
      reconnectionAttempts: 5,
      timeout: 20000,
    });

    newSocket.on('connect', () => {
      console.info('Connected to server');
    });

    newSocket.on('disconnect', () => {
      console.warn('Disconnected from server');
    });

    newSocket.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });

    newSocket.on('reconnect_attempt', () => {
      console.info('Attempting to reconnect');
    });

    newSocket.on('reconnect_failed', () => {
      console.error('Reconnection failed');
    });

    newSocket.on(event, (msg) => {
      console.info(`Received message from ${event}:`, msg);
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [event]);

  const sendMessage = useCallback((msg: string) => {
    if (socket) {
      console.info(`sending ${msg} to ${event}`);
      socket.emit(event, msg);
    }
  }, [socket, event]);

  return { messages, sendMessage };
};

export default useSocket;
