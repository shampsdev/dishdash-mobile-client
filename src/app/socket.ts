import { API_URL } from '@/app/app.settings';
import io from 'socket.io-client';

class Socket {
  private socket = io(API_URL, {
    transports: ['websocket'],
    reconnectionAttempts: 5,
    timeout: 20000,
  })

  public subscribe = (event: string, callback: (...args: any[]) => void) => {
    this.socket.on(event, callback);
  };
  
  public sendEvent = (event: string, data?: string) => {
    this.socket.emit(event, data)
  }
}

export const socket = new Socket();
