import {
  AnimatedProp,
  Circle,
  LinearGradient,
  SkPoint,
  vec,
} from '@shopify/react-native-skia';
import { SharedValue, useDerivedValue } from 'react-native-reanimated';

interface RingProps {
  c: AnimatedProp<SkPoint | undefined>;
  scale: SharedValue<number>;
  radius: number;
}

export const Ring = ({ c: center, scale, radius }: RingProps) => {
  return (
    <Circle
      c={center}
      r={useDerivedValue(() => radius * scale.value)}
      style='stroke'
      strokeWidth={1.6}
    >
      <LinearGradient
        start={vec(0, 0)}
        end={vec(256, 0)}
        colors={[
          'hsla(0, 0%, 93%, 1)',
          'hsla(0, 0%, 100%, 0.2)',
          'hsla(0, 0%, 93%, 1)',
          'hsla(0, 0%, 100%, 0.2)',
        ]}
      />
    </Circle>
  );
};
