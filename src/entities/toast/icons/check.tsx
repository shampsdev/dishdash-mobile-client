import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Check = ({ ...props }) => {
  const pathLength = 30;
  const strokeDashoffset = useRef(new Animated.Value(25)).current;

  useEffect(() => {
    Animated.timing(strokeDashoffset, {
      toValue: 0,
      duration: 250, // Duration of the animation in milliseconds
      easing: Easing.out(Easing.linear),
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Svg
      fill='none'
      height='25'
      width='25'
      viewBox='0 0 24 24'
      strokeWidth='2'
      strokeLinecap='round'
      stroke='#D3D3D3'
      {...props}
    >
      <AnimatedPath
        stroke-linecap='round'
        stroke-linejoin='round'
        d='m4.5 12.75 6 6 9-13.5'
        strokeDasharray={pathLength}
        strokeDashoffset={strokeDashoffset}
      />
    </Svg>
  );
};
