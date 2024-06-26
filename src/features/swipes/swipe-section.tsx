import { useLobby } from '@/app/stores/lobby.store';
import { SwipeCard } from '@/entities/swiped-card/swipe-card';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ICard } from '@/shared/interfaces/card.interface';
import { Match } from '../match/match';
import { useMatchStore } from '../match/useMatchStatus';
import { MatchCard } from '../match/match-card';
import { socket } from '@/app/socket';

export const SwipeSection = ({ ...props }) => {
  const [cards, setCards] = useState<ICard[]>([]);
  const { matchStatus, setMatchStatus, setMatchCard } = useMatchStore();

  useEffect(() => {
    const handleCardEvent = (data: any) => {
      const newCard: ICard = data["card"];
      setCards([newCard]);
    }

    const handleMatchEvent = (data: any) => {
      const matchCard: ICard = data["card"];
      setMatchCard(matchCard)
      setMatchStatus('matchCard')
    }

    socket.subscribe('card', handleCardEvent);
    socket.subscribe('match', handleMatchEvent);

    socket.sendEvent('startSwipes')
   }, []);

  const handleSwipe = (id: number) => {
    setTimeout(() => {
      setCards((prevCards) => prevCards.filter((card) => card.id !== id));
      socket.sendEvent('swipe', JSON.stringify({swipeType: 'like'}))
    }, 100);
  };

  const visibleCards = cards.slice(0, 3);

  return (
    <View className='h-full relative justify-center'>
      {matchStatus === 'swiping' ? (
        <View className='h-3/4'>
          {visibleCards.map((value, index) => (
            <SwipeCard
              key={value.id}
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