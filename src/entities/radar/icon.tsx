import { SkImage, SkPoint, Image } from '@shopify/react-native-skia';
import {
  SharedValue,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import { canvas2Polar, polar2Canvas } from 'react-native-redash';

interface IconProps {
  icon: SkImage | null;
  center: SkPoint;
  spin: SharedValue<number>;
  ring_offset: SharedValue<number>;
  scale?: SharedValue<number>;
  offset: number;
  size: number;
}

export const Icon = ({
  icon,
  center,
  spin,
  ring_offset,
  scale = useSharedValue(1),
  offset = 155,
  size,
}: IconProps) => {
  const x = useDerivedValue(() => {
    const polar = canvas2Polar({ x: center.x - offset, y: center.y }, center);

    const { x } = polar2Canvas(
      {
        theta: -Math.PI * 2 * spin.value + ring_offset.value,
        radius: polar.radius * scale.value,
      },
      center
    );

    return x - (size / 2) * scale.value;
  });

  const y = useDerivedValue(() => {
    const polar = canvas2Polar({ x: center.x, y: center.y - offset }, center);

    const { y } = polar2Canvas(
      {
        theta: -Math.PI * 2 * spin.value + ring_offset.value,
        radius: polar.radius * scale.value,
      },
      center
    );

    return y - (size / 2) * scale.value;
  });

  return (
    <Image
      x={x}
      y={y}
      image={icon}
      fit='contain'
      height={useDerivedValue(() => size * scale.value)}
      width={useDerivedValue(() => size * scale.value)}
    />
  );
};
