import React from 'react'
import Svg, { Path } from 'react-native-svg';

export const Cross = ({ ...props }) => {
  const pathLength = 30;

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
      <Path
        stroke-linecap='round'
        stroke-linejoin='round'
        d="M6 18 18 6M6 6l12 12"
        strokeDasharray={pathLength}
      />
    </Svg>
  );
}
