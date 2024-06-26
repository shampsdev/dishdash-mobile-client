import { create } from 'zustand';
import { User } from '@/shared/interfaces/user.interface';
import axios from 'axios';
import { API_URL } from '@/app/app.settings';
import { useLocalStorage } from '@/shared/hooks/useLocalStorage';

type AuthProps = {
  authenticated: boolean;
  user?: User;
  loginUser: (user: Omit<User, 'id' | 'createdAt'>) => Promise<void>;
  logoutUser: () => void;
  updateUser: (user: Omit<User, 'createdAt'>) => Promise<void>;
};

export const useAuth = create<AuthProps>((set, get) => {
  const { storeData, getData } = useLocalStorage();

  const rehydrate = async () => {
    const storedState = await getData<AuthProps>('auth');
    if (storedState) {
      set(storedState);
    }
  };

  rehydrate();

  return {
    authenticated: false,
    user: undefined,
    loginUser: async (user) => {
      try {
        const res = await axios.post<User>(`${API_URL}api/v1/users`, user);
        const newState = {
          authenticated: true,
          user: res.data,
        };
        set(newState);
        await storeData('auth', newState);
      } catch (error) {
        console.error('Login failed:', error);
      }
    },
    logoutUser: async () => {
      const newState = {
        authenticated: false,
        user: undefined,
      };
      set(newState);
      await storeData('auth', newState);
    },
    updateUser: async (userData: Omit<User, 'createdAt'>) => {
      try {
        const res = await axios.put<User>(`${API_URL}api/v1/users`, userData, {
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
          },
        });
        const newState = {
          ...get(),
          user: res.data,
        };
        set(newState);
        await storeData('auth', newState);
      } catch (error) {
        console.error('Update failed:', error);
      }
    },
  };
});
