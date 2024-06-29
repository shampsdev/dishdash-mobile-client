import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Card } from '@/shared/interfaces/card.interface';
import { SwipeShortInfo } from './swipe-short-info';
import { SwipeType } from '@/features/swipes';

export interface SwipeCardProps {
  card: Card;
  index: number;
  onSwipe: (id: number, type: SwipeType) => void;
}

const VALUE_FOR_SWIPING = 100;

export const SwipeCard = (props: SwipeCardProps) => {
  const offsetX = useSharedValue(0);
  const rotate = useSharedValue(0);
  const rotateY = useSharedValue(0);

  const swipePan = Gesture.Pan()
    .onUpdate((event) => {
      offsetX.value = event.translationX;
      rotate.value = event.translationX * 0.1;
    })
    .onEnd(() => {
      const valueX = offsetX.value;

      if (valueX < -VALUE_FOR_SWIPING) {
        rotate.value = withSpring(-10);
        offsetX.value = withSpring(-300);
        runOnJS(props.onSwipe)(props.card.ID, 'dislike');
      } else if (valueX > VALUE_FOR_SWIPING) {
        rotate.value = withSpring(10);
        offsetX.value = withSpring(300);
        runOnJS(props.onSwipe)(props.card.ID, 'like');
      } else {
        offsetX.value = withSpring(0);
        rotate.value = withSpring(0);
      }
    });

  const swipeAnimatedStyles = useAnimatedStyle(() => ({
    transform: [
      { translateX: offsetX.value },
      { rotate: `${rotate.value}deg` },
      { rotateY: `${rotateY.value}deg` },
    ],
    zIndex: -props.index,
  }));


  const shadowStyle = props.index === 0 ? styles.activeCardShadow : {};

  return (
    <View style={styles.container}>
      <GestureDetector gesture={swipePan}>
        <Animated.View
          style={[
            swipeAnimatedStyles,
            {
              width: '85%',
            },
            shadowStyle,
          ]}
        >
          <SwipeShortInfo card={props.card} />
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
  },
  activeCardShadow: {
    shadowColor: 'black',
    elevation: 8,
    shadowRadius: 10,
    shadowOffset: { width: 10, height: 5 },
    shadowOpacity: 0.2,
  },
});
