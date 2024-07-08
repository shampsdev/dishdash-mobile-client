import { SwipeShortInfo } from '@/entities/swiped-card/swipe-short-info';
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useMatchStore } from './useMatchStore';
import { CustomButton } from '@/shared/ui/custom-button';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useLobby } from '@/shared/hooks/useLobby';

export const MatchCard = () => {
  const { card, id } = useMatchStore();
  const opacity = useSharedValue(0);
  const { vote } = useLobby();

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 1000 });
  }, []);

  const animatedStyles = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return card ? (
    <Animated.View
      style={animatedStyles}
      className='h-full w-[85%] mx-auto justify-around'
    >
      <Text className='py-2 text-2xl text-center font-semibold'>
        У вас мэтч!
      </Text>
      <SwipeShortInfo
        style={{
          height: '75%',
        }}
        card={card}
      />
      <View
        style={{
          columnGap: 12,
          marginBottom: 20,
        }}
        className='flex-row mx-auto'
      >
        <CustomButton
          onPress={() => {
            vote(id!, 1);
          }}
        >
          Результаты
        </CustomButton>
        <CustomButton
          type='primary'
          onPress={() => {
            vote(id!, 0);
          }}
        >
          Продолжить
        </CustomButton>
      </View>
    </Animated.View>
  ) : (
    card
  );
};
