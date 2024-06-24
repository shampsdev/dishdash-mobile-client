import React from 'react'
import { View, Text } from 'react-native'
import { SwipeCardHader } from './swipe-card-header'
import { ICard } from '@/shared/interfaces/card.interface'

export const SwipeExtendedInfo = ({
  card,
  onInfoPress
}: {
  card: ICard,
  onInfoPress: () => void
}) => {
  return (
    <View className='h-full relative flex-col justify-center scale-x-[-1] bg-secondary rounded-3xl'>
      <SwipeCardHader
        onInfoPress={onInfoPress} 
        title={card.title}
      />

    <Text className='px-4 text-base mx-auto'>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </Text>
  </View>
  )
}
