import {
  Canvas,
  RoundedRect,
  Image,
  useImage,
  Group,
  Shadow,
} from '@shopify/react-native-skia';
import { useState } from 'react';
import { LayoutChangeEvent } from 'react-native';

export const SwipeSection = ({ ...props }) => {
  const [center, setCenter] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const [dimensions, setDimensions] = useState<{ w: number; h: number }>({
    w: 0,
    h: 0,
  });

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setCenter({ x: width / 2, y: height / 2 });
    setDimensions({ w: width, h: height });
  };

  const icon1 = useImage(require('./assets/fuck.jpg'));

  return (
    <Canvas className='flex-1' onLayout={handleLayout} {...props}>
      <Group>
        <RoundedRect
          x={center.x - (dimensions.w - 50) / 2}
          y={20}
          width={dimensions.w - 50}
          height={dimensions.h - 40}
          r={20}
          color='lightblue'
        ></RoundedRect>
        <Shadow dx={0} dy={3} blur={10} color='rgba(0, 0, 0, 0.1)' />
      </Group>
    </Canvas>
  );
};
