import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Pressable,
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
import InfoIcon from './assets/info.icon';

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
    ],
    // marginBottom: -props.index * 10,
    zIndex: -props.index,
  }));

  const descriptionPan = Gesture.Pan()
    .onUpdate((event) => {

    })
    .onEnd(() => {

    });

  const descriptionAnimatedStyles = useAnimatedStyle(() => ({

  }))

  const [cardMode, setCardMode] = useState<"card" | "description">("description");

  const shadowStyle = props.index === 0 ? styles.activeCardShadow : {};

  return (
    <View style={styles.container}>
      <GestureDetector gesture={swipePan}>
        <Animated.View
          style={[
            swipeAnimatedStyles,
            {
              width: '85%'
            },
            shadowStyle,
          ]}
        >
          {cardMode === "card"
            ?
            <>
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
                      borderRadius: 999
                    }}
                    onPress={() => {
                      console.log('hello')
                    }}
                  >
                    <InfoIcon />
                  </Pressable>
                </View>
              </View>
              <View
                style={{
                  shadowColor: 'gray',
                  elevation: 8,
                  shadowRadius: 4,
                  shadowOffset: { width: 10, height: 5 },
                  paddingHorizontal: 8,
                  shadowOpacity: 0.5,
                }}
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

                <Text className='w-full p-2'>{props.card.shortDescription}</Text>
              </View>
            </>
            :
            <>
              <View className='h-full relative flex-col justify-center bg-secondary rounded-3xl'>
                <View
                    style={{
                      display: 'flex',
                      position: 'absolute',
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
                        borderRadius: 999
                      }}
                      onPress={() => {
                        console.log('hello')
                      }}
                    >
                      <InfoIcon />
                    </Pressable>
                </View>

                <Text className='px-4 text-base mx-auto'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </Text>
              </View>
            </>
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
    shadowRadius: 4,
    shadowOffset: { width: 10, height: 5 },
    shadowOpacity: 0.5,
  },
});
