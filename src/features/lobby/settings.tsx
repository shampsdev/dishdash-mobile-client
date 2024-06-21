import { CategorySelector, CategorySelectorType } from '@/entities/lobby/category-selector';
import { CustomButton } from '@/shared/ui/custom-button';
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const Settings = () => {
  const [categories, setCategories] = useState<CategorySelectorType[]>([
    {
      imgSrc: require('./assets/pizza.png'),
      title: 'Пицца',
      type: 'default'
    },
    {
      imgSrc: require('./assets/pizza.png'),
      title: 'Кофе',
      type: 'default'
    },
    {
      imgSrc: require('./assets/pizza.png'),
      title: 'Кофе',
      type: 'default'
    },
    {
      imgSrc: require('./assets/pizza.png'),
      title: 'Кофе',
      type: 'default'
    },
    {
      imgSrc: require('./assets/pizza.png'),
      title: 'Кофе',
      type: 'default'
    },
    {
      imgSrc: require('./assets/pizza.png'),
      title: 'Кофе',
      type: 'default'
    },
    {
      imgSrc: require('./assets/pizza.png'),
      title: 'Кофе',
      type: 'default'
    },
    {
      imgSrc: require('./assets/pizza.png'),
      title: 'Кофе',
      type: 'default'
    },
  ]);

  const insets = useSafeAreaInsets();

  const toggleCategoryType = (index: number) => {
    const newCategories = [...categories];
    newCategories[index].type = newCategories[index].type === 'default' ? 'active' : 'default';
    setCategories(newCategories);
  };

  return (
    <View style={{ rowGap: 12 }} className='flex-col h-full w-[85%] mx-auto '>
      <Text className='text-2xl font-medium'>Настройки</Text>
      <></>
      {categories.map((category, index) => (
        <CategorySelector
          key={index}
          category={{ ...category }}
          onPress={() => toggleCategoryType(index)}
        />
      ))}

      <CustomButton
        style={{
          width: '100%',
          position: 'absolute',
          bottom: insets.bottom + 48,
        }}
      >Начать</CustomButton>
    </View>
  );
};
