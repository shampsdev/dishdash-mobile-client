import { SwipeShortInfo } from '@/entities/swiped-card/swipe-short-info'
import React, { useEffect } from 'react'
import { View } from 'react-native'
import { useMatchStore } from './useMatchStatus'
import { CustomButton } from '@/shared/ui/custom-button'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native'
import { NavigationProps } from '@/app/navigation.interface'


export const MatchCard = () => {
  const { card, setMatchStatus, setCard } = useMatchStore();
  const opacity = useSharedValue(0);
  const navigation = useNavigation<NavigationProps>();

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 1000 })
  }, [])

  const animatedStyles = useAnimatedStyle(() => ({
    opacity: opacity.value
  }));

  return (
    card
      ?
      <Animated.View
        style={animatedStyles}
        className='h-3/4 w-[85%] mx-auto'
      >
        <SwipeShortInfo
          card={card}
        />

        {/* <CustomButton
          onPress={() => {
            setMatchStatus('swiping')
            setCard(null)
          }
          }
          type='primary'
          style={{
            width: '100%'
          }}
        >Круто!</CustomButton> */}

        <View style={{
          columnGap: 12,
        }} className='flex-row mx-auto'>
          <CustomButton
            onPress={() => {
              navigation.navigate('voting')
            }}
          >Результаты</CustomButton>
          <CustomButton
            type='primary'
            onPress={() => {
              setMatchStatus('swiping')
              setCard(null)
            }}
          >Продолжить</CustomButton>
        </View>
      </Animated.View>
      :
      card
  )
}
