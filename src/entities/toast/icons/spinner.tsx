import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing, StyleSheet, Text } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

export const Spinner = ({ ...props }) => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container} {...props}>
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <Svg height='25' width='25' viewBox='0 0 50 50'>
          <Circle
            cx='25'
            cy='25'
            r='20'
            fill='none'
            stroke={'#D3D3D3'}
            strokeWidth='4.5'
            strokeLinecap='round'
            strokeDasharray='126.679'
            strokeDashoffset='25.336'
          />
        </Svg>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
