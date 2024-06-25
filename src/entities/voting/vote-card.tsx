import { ICard } from '@/shared/interfaces/card.interface'
import React, { useEffect, useRef } from 'react'
import { Image, View, Text, Animated, Pressable } from 'react-native'

const players = [
  {
    img: require('./assets/bear.png'),
  },
  {
    img: require('./assets/bear.png'),
  },
  {
    img: require('./assets/bear.png'),
  }
]

export type VoteCardType = 'active' | 'default';

export const VoteCard = ({
  type = 'default',
  onPress,
  card,
}: {
  type?: VoteCardType,
  onPress: () => void,
  card: ICard,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: type === 'active' ? 1 : 0,
      duration: 100,
      useNativeDriver: false,
    }).start();
  }, [type]);

  const borderColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#efefef', '#1f212e'],
  });

  return (
    <Pressable
      className='m-2'
      onPress={onPress}
    >
      <Animated.View
        className='bg-secondary border-2'
        style={{
          width: 160,
          overflow: 'hidden',
          borderRadius: 12,
          borderColor: borderColor,
        }}
      >
        <Image
          className='h-40 w-full'
          borderBottomLeftRadius={12}
          borderBottomRightRadius={12}
          src={card.image}
        />

        <View
          style={{
            position: 'absolute',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            paddingHorizontal: 4,
            top: 4,
          }}
        >
          <View
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              paddingHorizontal: 8,
              paddingVertical: 3,
              borderRadius: 999,
            }}
          >
            <Text className='rounded-3xl'>{card.title}</Text>
          </View>
        </View>

        <View className='bottom-0 justify-center px-2 h-12 rounded-b-3xl bg-[#F4F4F4] w-full'>
          <View className='flex-row'>
            {
              players.map((value, index) => (
                <Image
                  style={{
                    transform: [{ translateX: -12 * index }],
                  }}
                  className='h-8 w-8 rounded-full'
                  source={value.img}
                  key={index}
                />
              ))
            }
          </View>
        </View>
      </Animated.View>
    </Pressable>
  )
}
