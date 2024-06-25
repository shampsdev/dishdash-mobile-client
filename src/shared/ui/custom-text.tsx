import React from 'react'
import { TextProps, Text, TextStyle } from 'react-native'

export const CustomText = ({
  children,
  numberOfLines,
  adjustsFontSizeToFit,
  className,
  style,
  rest
}:
  {
    children: string,
    numberOfLines?: number;
    adjustsFontSizeToFit?: boolean;
    className?: string,
    style?: TextStyle,
    rest?: TextProps
  }) => {
  return (
    <Text
      adjustsFontSizeToFit={adjustsFontSizeToFit}
      numberOfLines={numberOfLines}
      className={className}
      style={[{
        fontFamily: 'Inter-Regular'
      }, style]}
      {...rest}
    >
      {children}
    </Text>
  )
}