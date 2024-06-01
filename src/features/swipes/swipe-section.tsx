import { useLobby } from '@/app/stores/useLobby';
import { SwipeCard } from '@/entities/swiped-card/swipe-card';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { HeartIcon } from './assets/icons/heart.icon';
import { CrossIcon } from './assets/icons/cross.icon';
import { ButtonIcon } from '@/shared/ui/button.icon';
import io from 'socket.io-client';
import { ICard } from '@/entities/swiped-card/card.interface';

const apiHost = "https://dishdash.ru";

interface Socket {
  on(event: string, callback: (...args: any[]) => void): this;
  emit(event: string, ...args: any[]): this;
  disconnect(): this;
}

export const SwipeSection = ({ ...props }) => {
  const { lobbyID } = useLobby();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [cards, setCards] = useState<ICard[]>([]);

  console.info(cards)

  // const [cards, setCards] = useState([
  //   {
  //     id: 1,
  //     title: 'Вольчек1',
  //     imgSrc: require('./assets/fuck.jpg')
  //   },
  //   {
  //     id: 2,
  //     title: 'Дворчик2',
  //     imgSrc: require('./assets/fuck.jpg')
  //   },
  //   {
  //     id: 3,
  //     title: 'Дворчик3',
  //     imgSrc: require('./assets/fuck.jpg')
  //   },
  //   {
  //     id: 4,
  //     title: 'Дворчик4',
  //     imgSrc: require('./assets/fuck.jpg')
  //   }
  // ]);

  useEffect(() => {
    const newSocket = io(apiHost, { 
      transports: ['websocket'],
      reconnectionAttempts: 5,
      timeout: 20000,
    });
    setSocket(newSocket);

    newSocket.on('connect', () => {
      newSocket.emit('joinLobby', JSON.stringify({ lobbyID }));
    });

    newSocket.on('card', (data) => {
      const cardData = data["card"];
      setCards((prevCards) => [...prevCards, cardData]);
      console.info(cards)
    });

    newSocket.on('match', (data) => {
      const matchData = data["card"];
      setCards((prevCards) => [...prevCards, matchData]);
      console.info(cards)
    });

    return () => {
      newSocket.disconnect();
    };
  }, [lobbyID]);


  const handleSwipe = (id: number) => {
    setTimeout(() => {
      setCards((prevCards) => prevCards.filter((card) => card.id !== id));
      socket?.emit('swipe', JSON.stringify({ swipeType: 'DISLIKE' }));
    }, 100)
  }

  const visibleCards = cards.slice(0, 3);

  return (
    <View className='h-full justify-between'>
      <View className='h-3/4'>
        { 
          visibleCards.map((value, index) => (
            <SwipeCard key={value.id} index={index} card={value} onSwipe={handleSwipe}/>
          )) 
        }
      </View>

      <View className='flex-row h-[20%] w-4/5 mx-auto justify-around'>
        <ButtonIcon styles={{
          backgroundColor: 'rgb(220, 220, 220)'
        }}>
          <CrossIcon color='black'/>
        </ButtonIcon>
        <ButtonIcon
          onPress={ () => {} }
          styles={{
            backgroundColor: 'black'
          }}
        >
          <HeartIcon color='white'/>
        </ButtonIcon>
      </View>
    </View>
  );
};
