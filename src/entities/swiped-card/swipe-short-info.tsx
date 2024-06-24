import React from 'react'
import { ImageBackground, View, Text, ViewStyle } from 'react-native'
import { SwipeCardHader } from './swipe-card-header'
import { ICard } from '@/shared/interfaces/card.interface';

const categories = ['Кофе', 'Развлечения', 'Чай', 'Новые ощущения'];

export const SwipeShortInfo = ({
  card,
  onInfoPress,
  style
}: {
  card: ICard,
  onInfoPress?: () => void,
  style?: ViewStyle
}) => {
  return (
    <View style={style} className='h-full'>
      <View className='relative h-3/4'>
        <ImageBackground
          className='h-full'
          imageStyle={{
            borderRadius: 24,
          }}
          source={{ uri: card.image }} />

        <SwipeCardHader
          onInfoPress={onInfoPress}
          title={card.title} 
        />
      </View>
      <View
        className='py-2 h-44 bg-white -translate-y-10 rounded-3xl items-center'
      >
        <View className='flex-row flex-wrap w-full gap-1'>
          {categories.map((category, index) => (
            <View
              className='bg-gray-300 px-4 py-2 rounded-full'
              key={index}
            >
              <Text>{category}</Text>
            </View>
          ))}
        </View>

        <Text className='w-full p-2'>{card.shortDescription}</Text>
      </View>
    </View>
  )
}
