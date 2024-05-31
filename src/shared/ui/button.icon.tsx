import React, { ReactNode } from 'react'
import { Pressable, PressableStateCallbackType, ViewStyle } from 'react-native'

type ButtonIconProps = {
  children: ReactNode | ((state: PressableStateCallbackType) => ReactNode);
  styles?: ViewStyle;
  onPress?: () => void;
}

export const ButtonIcon = (props: ButtonIconProps) => {
  return (
    <Pressable style={[{
      width: 64,
      height: 64,
      padding: 16,
      borderRadius: 999,
    }, props.styles]}
      onPress={props.onPress}
    >
      { props.children }
    </Pressable>
  )
}
