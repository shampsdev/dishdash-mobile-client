import { SwipeShortInfo } from '@/entities/swiped-card/swipe-short-info';
import React, { useEffect } from 'react';
import { View } from 'react-native';
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
    <Animated.View style={animatedStyles} className='h-3/4 w-[85%] mx-auto'>
      <SwipeShortInfo card={card} />

      <View
        style={{
          columnGap: 12,
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
