import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export const ProgressBar = ({ duration }: {
  duration: number
}) => {
  const [remainingTime, setRemainingTime] = useState(duration);
  const progress = useSharedValue(1);

  useEffect(() => {
    progress.value = withTiming(0, {
      duration: duration * 1000,
      easing: Easing.linear,
    });

    const interval = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [duration]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${progress.value * 100}%`,
    };
  });

  return (
    <View className='mb-6'>
      <Text className='w-full text-right text-base font-semibold pb-2'>{remainingTime} сек</Text>
      <View className='bg-secondary rounded-full overflow-hidden h-2'>
        <Animated.View style={[styles.progressBar, animatedStyle]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  progressBar: {
    height: '100%',
    backgroundColor: 'black',
  },
});
