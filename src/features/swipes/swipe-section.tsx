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

//   {
//     id: 1,
//     title: 'Вольчек 1',
//     description: 'Lorem ipsum',
//     shortDescription: 'Lorem ipsum',
//     location: 'Петроградская 49',
//     address: 'Петроградская 49',
//     type: 'CAFE',
//     price: 900,
//     image:
//       'https://avatars.mds.yandex.net/i?id=334b3e7b14fc60313dd2da2c1925815b93b4ed80-12579803-images-thumbs&n=13',
//   },
//   {
//     id: 2,
//     title: 'Дворик 1',
//     description: 'Lorem ipsum',
//     shortDescription: 'Lorem ipsum',
//     location: 'Петроградская 49',
//     address: 'Петроградская 49',
//     type: 'CAFE',
//     price: 900,
//     image:
//       'https://avatars.mds.yandex.net/i?id=c875f729e9669aea8af1af136c58450f1a7872cb-9856874-images-thumbs&n=13',
//   },
//   {
//     id: 3,
//     title: 'Вольчек 1',
//     description: 'Lorem ipsum',
//     shortDescription: 'Lorem ipsum',
//     location: 'Петроградская 49',
//     address: 'Петроградская 49',
//     type: 'CAFE',
//     price: 900,
//     image:
//       'https://avatars.mds.yandex.net/i?id=334b3e7b14fc60313dd2da2c1925815b93b4ed80-12579803-images-thumbs&n=13',
//   },
//   {
//     id: 4,
//     title: 'Дворик 1',
//     description: 'Lorem ipsum',
//     shortDescription: 'Lorem ipsum',
//     location: 'Петроградская 49',
//     address: 'Петроградская 49',
//     type: 'CAFE',
//     price: 900,
//     image:
//       'https://avatars.mds.yandex.net/i?id=c875f729e9669aea8af1af136c58450f1a7872cb-9856874-images-thumbs&n=13',
//   },
// ]);
