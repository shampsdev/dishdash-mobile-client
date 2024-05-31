import { useLobby } from '@/app/stores/useLobby';
import { SwipeCard } from '@/entities/swiped-card/swipe-card';
import React, { useState } from 'react';
import { View } from 'react-native';

export const SwipeSection = ({ ...props }) => {
  const { lobbyID } = useLobby();

  const [cards, setCards] = useState([
    {
      id: 1,
      title: 'Вольчек1',
      imgSrc: require('./assets/fuck.jpg')
    },
    {
      id: 2,
      title: 'Дворчик2',
      imgSrc: require('./assets/fuck.jpg')
    },
    {
      id: 3,
      title: 'Дворчик3',
      imgSrc: require('./assets/fuck.jpg')
    },
    {
      id: 4,
      title: 'Дворчик4',
      imgSrc: require('./assets/fuck.jpg')
    }
  ]);

  const handleSwipe = (id: number) => {
    setTimeout(() => {
      setCards((prevCards) => prevCards.filter((card) => card.id !== id));
    }, 100)
  }

  const visibleCards = cards.slice(0, 3);

  return (
    <View className='flex-1'>
      { 
        visibleCards.map((value, index) => (
          <SwipeCard key={value.id} index={index} card={value} onSwipe={handleSwipe}/>
        )) 
      }
    </View>
  );
};
