import React, { useEffect, useRef } from 'react';
import { Image, Text, Pressable, Animated } from 'react-native';

export type CategorySelectorType = {
  imgSrc: any;
  title: string;
  type?: 'active' | 'default';
};

export const CategorySelector = ({
  category,
  onPress
}: {
  category: CategorySelectorType;
  onPress: () => void;
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: category.type === 'active' ? 1 : 0,
      duration: 100,
      useNativeDriver: false,
    }).start();
  }, [category.type]);

  const borderColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#ccc', '#000'],
  });

  return (
    <Pressable onPress={onPress}>
      <Animated.View
        className='space-x-4'
        style={{
          borderWidth: 2,
          borderColor: borderColor,
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          height: 64,
          borderRadius: 24,
          paddingHorizontal: 16,
        }}
      >
        <Image source={category.imgSrc} />
        <Text style={{ fontSize: 18 }}>{category.title}</Text>
      </Animated.View>
    </Pressable>
  );
};
