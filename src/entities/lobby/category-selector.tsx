import React, { useEffect, useRef, useState } from 'react';
import { Image, Text, Pressable, Animated, ImageSourcePropType } from 'react-native';
import { tagImages } from '@/features/lobby/tag-images';
import { Tag } from '@/shared/interfaces/tag.interface';

export type TagSelectorsType = 'default' | 'active';

export const CategorySelector = ({
  category,
  type,
  onPress
}: {
  category: Tag;
  type: TagSelectorsType;
  onPress: () => void;
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [image, setImage] = useState<ImageSourcePropType>();

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: type === 'active' ? 1 : 0,
      duration: 100,
      useNativeDriver: true,
    }).start();

    const tagImage = tagImages.find((value) => value.title === category.icon);
    if (tagImage) {
      setImage(tagImage.src);
    }
  }, [type, category.icon]);

  const borderColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#efefef', '#1f212e'],
  });

  return (
    <Pressable onPress={onPress}>
      <Animated.View
        style={{
          borderWidth: 2,
          borderColor: borderColor,
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          height: 64,
          borderRadius: 18,
          paddingHorizontal: 16,
          marginBottom: 12,
        }}
      >
        {image ? <Image source={image} style={{ width: 40, height: 40 }} /> : null}
        <Text style={{ fontSize: 18, marginLeft: 8 }}>{category.name}</Text>
      </Animated.View>
    </Pressable>
  );
};
