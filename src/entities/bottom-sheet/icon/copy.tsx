import * as React from 'react';
import Svg, { Mask, Rect, Path } from 'react-native-svg';

export const CopyIcon = ({ ...props }) => {
  return (
    <Svg width={15} height={15} viewBox='0 0 10 10' fill='none' {...props}>
      <Mask id='a' fill='#fff'>
        <Rect
          x={2.42188}
          y={2.4209}
          width={7.57897}
          height={7.57897}
          rx={0.473685}
        />
      </Mask>
      <Rect
        x={2.42188}
        y={2.4209}
        width={7.57897}
        height={7.57897}
        rx={0.473685}
        stroke='#7F7F7F'
        strokeWidth={1.89474}
        mask='url(#a)'
      />
      <Path
        d='M8.105 1H1.474A.474.474 0 001 1.474v6.631'
        stroke='#7F7F7F'
        strokeWidth={0.947371}
        strokeLinecap='round'
      />
    </Svg>
  );
};
