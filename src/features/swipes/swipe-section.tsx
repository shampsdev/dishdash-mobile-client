import { SwipeCard } from '@/entities/swiped-card/swipe-card';
import React from 'react';
import { View } from 'react-native';
import { Match } from '../match/match';
import { useMatchStore } from '../match/useMatchStore';
import { MatchCard } from '../match/match-card';
import { useLobbyStore } from '@/app/stores/lobby.store';
import { useSocket } from '@/shared/providers/socket.provider';

export type SwipeType = 'like' | 'dislike';

export const SwipeSection = ({ ...props }) => {
  const { cards, setCards } = useLobbyStore();
  const { matchStatus } = useMatchStore();
  const { emit } = useSocket();

  const handleSwipe = (id: number, type: SwipeType) => {
    setTimeout(() => {
      const newCards = cards.filter((card) => card.ID !== id);
      setCards(newCards);
      emit('swipe', { swipeType: type });
    }, 100);
  };

  return (
    <View className='h-full relative justify-center'>
      {matchStatus === 'swiping' ? (
        <View className='h-3/4'>
          {cards.map((value, index) => (
            <SwipeCard
              key={index}
              index={index}
              card={value}
              onSwipe={handleSwipe}
            />
          ))}
        </View>
      ) : matchStatus === 'match' ? (
        <Match />
      ) : (
        <MatchCard />
      )}
    </View>
  );
};