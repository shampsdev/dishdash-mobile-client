import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  Pressable,
  ViewStyle,
  ImageProps,
  ImageBackground,
} from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { ICard } from './card.interface';

const categories = ['Кофе', 'Развлечения', 'Чай', 'Новые ощущения'];

export interface SwipeCardProps {
  card: ICard;
  index: number;
  onSwipe: (id: number) => void;
}

const VALUE_FOR_SWIPING = 100;

export const SwipeCard = (props: SwipeCardProps) => {
  const offsetX = useSharedValue(0);
  const rotate = useSharedValue(0);

  const pan = Gesture.Pan()
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

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      { translateX: offsetX.value },
      { rotate: `${rotate.value}deg` },
    ],
    // marginBottom: -props.index * 10,
    zIndex: -props.index,
  }));

  const shadowStyle = props.index === 0 ? styles.activeCardShadow : {};

  return (
    <View style={styles.container}>
      <GestureDetector gesture={pan}>
        <Animated.View
          style={[
            animatedStyles,
            {
              width: '80%',
              height: '100%',
            },
            shadowStyle,
          ]}
        >
          <View className='relative h-3/4'>
            <ImageBackground
              className='h-full'
              imageStyle={{
                borderRadius: 24,
              }}
              source={{ uri: props.card.image }}
            />

            <View
              style={{
                position: 'absolute',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                paddingHorizontal: 12,
                top: 10,
              }}
            >
              <View
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  paddingHorizontal: 10,
                  paddingVertical: 6,
                  borderRadius: 999,
                }}
              >
                <Text className='text-lg rounded-3xl'>{props.card.title}</Text>
              </View>

              <Pressable
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: 999,
                  width: 40,
                  height: 40,
                }}
              />
            </View>
          </View>
          <View
            style={{
              shadowColor: 'gray',
              elevation: 8,
              shadowRadius: 4,
              shadowOffset: { width: 10, height: 5 },
              shadowOpacity: 0.5,
            }}
            className='w-full py-2 h-44 bg-white -translate-y-9 rounded-3xl items-center'
          >
            <View className='flex-row flex-wrap max-w-[96%] gap-1'>
              {categories.map((category, index) => (
                <View
                  className='bg-gray-300 px-4 py-2 rounded-full'
                  key={index}
                >
                  <Text>{category}</Text>
                </View>
              ))}
            </View>

            <Text className='p-3'>{props.card.shortDescription}</Text>
          </View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeCardShadow: {
    shadowColor: 'black',
    elevation: 8,
    shadowRadius: 4,
    shadowOffset: { width: 10, height: 5 },
    shadowOpacity: 0.5,
  },
});
