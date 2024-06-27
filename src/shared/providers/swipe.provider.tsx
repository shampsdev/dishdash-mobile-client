import React, { useContext, useEffect } from 'react';
import { Image } from 'react-native';
import { useSocket } from './socket.provider';
import { useLobbyStore } from '@/app/stores/lobby.store';
import { useToast } from '@/entities/toast/hooks/useToast';
import { User } from '../interfaces/user.interface';
import { avatars } from '@/app/app.settings';
import { Settings } from '../interfaces/settings.interface';
import { RootStackParamList } from '@/app/navigation.interface';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { useMatchStore } from '@/features/match/useMatchStore';
import { Match } from '../interfaces/match.interface';
import { Card } from '../interfaces/card.interface';

interface ContextProps {
  startSwipes: () => void;
}

export const SwipeContext = React.createContext<ContextProps>({
  startSwipes: () => {},
});

interface SwipeProviderProps {
  children?: React.ReactNode;
}

export const SwipeProvider = ({ children }: SwipeProviderProps) => {
  const { subscribe, emit } = useSocket();
  const { addUser, removeUser, setSettings, setCards, cards } = useLobbyStore();
  const { setMatchCard, setMatchStatus } = useMatchStore();

  const toast = useToast();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const startSwipes = () => {
    emit('startSwipes');

    toast
      .message(500, {
        message: 'Loading swipes',
      })
      .finally(() => {
        navigation.navigate('swipes');
      });
  };

  useEffect(() => {
    subscribe('userJoined', (user: User) => {
      console.log(user);
      addUser(user);
      toast.message(700, {
        message: `Пользователь ${user.name} присоеденился`,
        icon: (
          <Image
            className='h-5 w-5 mr-2'
            source={avatars[Number(user.avatar)].src}
          />
        ),
      });
    });

    subscribe('userLeft', (user: User) => {
      removeUser(user.id);
      toast.message(700, {
        message: `Пользователь ${user.name} вышел`,
        icon: (
          <Image
            className='h-5 w-5 mr-2'
            source={avatars[Number(user.avatar)].src}
          />
        ),
      });
    });

    subscribe('settingsUpdate', (settings: Settings) => {
      setSettings(settings);
    });

    subscribe('card', (card: { card: Card }) => {
      console.log(card.card);
      setCards([...cards, card.card]);
    });

    subscribe('match', (match: Match) => {
      setMatchCard(match.card);
      setMatchStatus('matchCard');
    });

    subscribe('startSwipes', () => {
      startSwipes();
    });
  }, [subscribe, addUser, removeUser]);

  return (
    <SwipeContext.Provider
      value={{
        startSwipes,
      }}
    >
      {children}
    </SwipeContext.Provider>
  );
};

export const useSwipes = () => {
  return useContext(SwipeContext);
};
