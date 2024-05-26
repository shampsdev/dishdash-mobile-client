import {
  Canvas,
  Circle,
  Image,
  LinearGradient,
  SkImage,
  SkPoint,
  canvas2Polar,
  polar2Canvas,
  useCanvasRef,
  useImage,
  vec,
} from '@shopify/react-native-skia';
import { useEffect, useState } from 'react';
import { LayoutChangeEvent } from 'react-native';
import {
  Easing,
  SharedValue,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

export const Radar = ({ ...props }) => {
  const logo = useImage(require('./assets/icon_logo.png'));

  const r = useSharedValue(0);
  useEffect(() => {
    r.value = withRepeat(
      withTiming(1, { duration: 100000, easing: Easing.linear }),
      -1
    );
  }, [r]);

  const icon1 = useImage(require('./assets/icon.png'));
  const icon2 = useImage(require('./assets/icon2.png'));
  const icon3 = useImage(require('./assets/icon3.png'));
  const icon4 = useImage(require('./assets/icon4.png'));
  const icon5 = useImage(require('./assets/icon5.png'));
  const icon6 = useImage(require('./assets/icon6.png'));

  const ref = useCanvasRef();

  const [center, setCenter] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setCenter({ x: width / 2, y: height / 2 });
  };

  return (
    <Canvas onLayout={handleLayout} style={{ flex: 1 }} ref={ref} {...props}>
      <Circle c={center} r={80} style='stroke' strokeWidth={1.6}>
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
      <Circle c={center} r={155} style='stroke' strokeWidth={1.6}>
        <LinearGradient
          start={vec(0, 0)}
          end={vec(256, 0)}
          colors={[
            'hsla(0, 0%, 93%, 1)',
            'hsla(0, 0%, 100%, 0.2)',
            'hsla(0, 0%, 93%, 1)',
            'hsla(0, 0%, 93%, 0.2)',
          ]}
        />
      </Circle>
      <Circle c={center} r={230} style='stroke' strokeWidth={1.6}>
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
      <Image
        x={center.x - 25}
        y={center.y - 25}
        image={logo}
        fit='contain'
        height={50}
        width={50}
      />
      <Icon icon={icon1} center={center} r={r} offset={0} />
      <Icon icon={icon2} center={center} r={r} offset={Math.PI/3} />
      <Icon icon={icon3} center={center} r={r} offset={2 * Math.PI/3} />
      <Icon icon={icon4} center={center} r={r} offset={3 * Math.PI/3} />
      <Icon icon={icon5} center={center} r={r} offset={4 * Math.PI/3} />
      <Icon icon={icon6} center={center} r={r} offset={5 * Math.PI/3} />
    </Canvas>
  );
};

interface IconProps {
  icon: SkImage | null;
  center: SkPoint;
  r: SharedValue<number>;
  offset: number;
}

const Icon = ({ icon, center, r, offset }: IconProps) => {
  const x = useDerivedValue(() => {
    const polar = canvas2Polar({ x: center.x - 155, y: center.y }, center);

    const { x } = polar2Canvas(
      {
        theta: -Math.PI * 2 * r.value + offset,
        radius: polar.radius,
      },
      center
    );

    return x - 35;
  });

  const y = useDerivedValue(() => {
    const polar = canvas2Polar({ x: center.x, y: center.y - 155 }, center);

    const { y } = polar2Canvas(
      {
        theta: -Math.PI * 2 * r.value + offset,
        radius: polar.radius,
      },
      center
    );

    return y - 35;
  });

  return (
    <Image x={x} y={y} image={icon} fit='contain' height={70} width={70} />
  );
};
