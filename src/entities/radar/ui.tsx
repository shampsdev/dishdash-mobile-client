import {
  Canvas,
  Circle,
  Image,
  LinearGradient,
  useImage,
  vec,
} from '@shopify/react-native-skia';
import React, { useEffect, useState } from 'react';
import { LayoutChangeEvent } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import {
  Easing,
  useDerivedValue,
  useSharedValue,
  withDecay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { Icon } from './icon';
import { Ring } from './ring';

export const Radar = ({ ...props }) => {
  const spin = useSharedValue(0);
  const scale = useSharedValue(1);
  const offset_anim = useSharedValue(0);

  useEffect(() => {
    spin.value = withRepeat(
      withTiming(5, { duration: 50000, easing: Easing.linear }, () => {
        console.log('eh');
      }),
      -1
    );
  }, []);

  const startAnimation = () => {
    scale.value = withRepeat(
      withTiming(1.1, { duration: 250, easing: Easing.ease }, (finished) => {
        if (finished) {
          scale.value = withTiming(1, { duration: 500, easing: Easing.ease });
        }
      }),
      -1,
      true
    );
  };

  const logo = useImage(require('./assets/icon_logo.png'));
  const icon1 = useImage(require('./assets/icon.png'));
  const icon2 = useImage(require('./assets/icon2.png'));
  const icon3 = useImage(require('./assets/icon3.png'));
  const icon4 = useImage(require('./assets/icon4.png'));
  const icon5 = useImage(require('./assets/icon5.png'));
  const icon6 = useImage(require('./assets/icon6.png'));

  const [center, setCenter] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const gesture = Gesture.Pan()
    .onChange((e) => {
      const deltaX =
        e.absoluteY > center.y ? e.changeX * 0.005 : -e.changeX * 0.005;
      const deltaY =
        e.absoluteX > center.x ? -e.changeY * 0.005 : e.changeY * 0.005;

      offset_anim.value += deltaX + deltaY;
    })
    .onEnd((e) => {
      const velocityX = e.velocityX * (e.absoluteY > center.y ? 0.005 : -0.005);
      const velocityY = e.velocityY * (e.absoluteX > center.x ? -0.005 : 0.005);

      const totalVelocity = velocityX + velocityY;

      const decayConfig = {
        velocity: totalVelocity * 1.2,
        deceleration: 0.996,
      };

      console.log(-totalVelocity);

      offset_anim.value = withDecay(decayConfig);
    });

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setCenter({ x: width / 2, y: height / 2 });
  };

  return (
    <GestureDetector gesture={gesture}>
      <Canvas
        className='flex-1'
        onTouch={() => startAnimation()}
        onLayout={handleLayout}
        {...props}
      >
        <Ring c={center} scale={scale} radius={80} />
        <Ring c={center} scale={scale} radius={155} />
        <Ring c={center} scale={scale} radius={230} />
        <Image
          x={useDerivedValue(() => center.x - 25 * scale.value)}
          y={useDerivedValue(() => center.y - 25 * scale.value)}
          image={logo}
          fit='contain'
          height={useDerivedValue(() => 50 * scale.value)}
          width={useDerivedValue(() => 50 * scale.value)}
        />
        <Icon
          scale={scale}
          icon={icon1}
          center={center}
          spin={spin}
          ring_offset={useDerivedValue(
            () => ((0 + offset_anim.value) * Math.PI) / 3
          )}
          offset={155}
          size={70}
        />
        <Icon
          scale={scale}
          icon={icon2}
          center={center}
          spin={spin}
          ring_offset={useDerivedValue(
            () => ((1 + offset_anim.value) * Math.PI) / 3
          )}
          offset={155}
          size={70}
        />
        <Icon
          scale={scale}
          icon={icon3}
          center={center}
          spin={spin}
          ring_offset={useDerivedValue(
            () => ((2 + offset_anim.value) * Math.PI) / 3
          )}
          offset={155}
          size={70}
        />
        <Icon
          scale={scale}
          icon={icon4}
          center={center}
          spin={spin}
          ring_offset={useDerivedValue(
            () => ((3 + offset_anim.value) * Math.PI) / 3
          )}
          offset={155}
          size={70}
        />
        <Icon
          scale={scale}
          icon={icon5}
          center={center}
          spin={spin}
          ring_offset={useDerivedValue(
            () => ((4 + offset_anim.value) * Math.PI) / 3
          )}
          offset={155}
          size={70}
        />
        <Icon
          scale={scale}
          icon={icon6}
          center={center}
          spin={spin}
          ring_offset={useDerivedValue(
            () => ((5 + offset_anim.value) * Math.PI) / 3
          )}
          offset={155}
          size={70}
        />
      </Canvas>
    </GestureDetector>
  );
};
