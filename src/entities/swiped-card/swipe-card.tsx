import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated';

import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Card } from '@/shared/interfaces/card.interface';
import { SwipeShortInfo } from './swipe-short-info';
import { SwipeExtendedInfo } from './swipe-extended-info';
import { CardModeType } from './card-mode.interface';

export interface SwipeCardProps {
  card: Card;
  index: number;
  onSwipe: (id: number) => void;
}

const VALUE_FOR_SWIPING = 100;

export const SwipeCard = (props: SwipeCardProps) => {
  const [cardMode, setCardMode] = useState<CardModeType>('card'); 

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
        runOnJS(props.onSwipe)(props.card.id);
      } else if (valueX > VALUE_FOR_SWIPING) {
        rotate.value = withSpring(10);
        offsetX.value = withSpring(300);
        runOnJS(props.onSwipe)(props.card.id);
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

  const adjustRotation = () => {
    if (cardMode === 'card') {
      rotateY.value = 180;
    } else {
      rotateY.value = 0;
    }
  };

  const shadowStyle = props.index === 0 ? styles.activeCardShadow : {};

  const handlePress = () => {
    if (cardMode === 'card') {
      rotateY.value = withSpring(rotateY.value + 180, {}, (isFinished) => {
        if (isFinished) {
          runOnJS(adjustRotation)();
        }
      });
    } else {
      rotateY.value = withSpring(rotateY.value - 180, {}, (isFinished) => {
        if (isFinished) {
          runOnJS(adjustRotation)();
        }
      });
    }
    setCardMode(cardMode === 'card' ? 'description' : 'card');
  };

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
          {
            cardMode === "card"
              ?
              <SwipeShortInfo
                onInfoPress={handlePress}
                card={{ ...props.card }}
              />
              :
              <SwipeExtendedInfo
                onInfoPress={handlePress}
                card={{...props.card}}
              />
          }
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
