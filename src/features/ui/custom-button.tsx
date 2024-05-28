import { Pressable, Text, PressableProps } from 'react-native';
import React from 'react';

interface ButtonProps extends PressableProps {
  type?: 'default' | 'primary';
  children: React.ReactNode;
}

export const CustomButton: React.FC<ButtonProps> = ({ type = 'default', children, ...rest }) => {
  let buttonStyles = 'p-4 w-40 rounded-full ';
  let textStyle = 'text-lg text-center ';
  
  switch (type) {
    case 'primary':
      buttonStyles += 'bg-primary';
      textStyle += 'text-white';
      break;
    case 'default':
    default:
      buttonStyles += 'bg-secondary';
      textStyle += 'text-black';
      break;
  }

  return (
    <Pressable
      className={buttonStyles} 
      {...rest}
    >
      <Text className={textStyle}>{children}</Text>
    </Pressable>
  );
};
