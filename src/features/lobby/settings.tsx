import {
  CategorySelector,
  CategorySelectorType,
} from '@/entities/lobby/category-selector';
import { CustomButton } from '@/shared/ui/custom-button';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList } from '../../../App';
import { useToast } from '@/entities/toast/hooks/useToast';

export const Settings = () => {
  const [categories, setCategories] = useState<CategorySelectorType[]>([
    {
      imgSrc: require('./assets/coffee.png'),
      title: 'Кофе',
      type: 'default',
    },
    {
      imgSrc: require('./assets/bar.png'),
      title: 'Бары',
      type: 'default',
    },
    {
      imgSrc: require('./assets/pizza.png'),
      title: 'Пицца',
      type: 'default',
    },
    {
      imgSrc: require('./assets/sushi.png'),
      title: 'Суши',
      type: 'default',
    },
    {
      imgSrc: require('./assets/pastry.png'),
      title: 'Кондитерская',
      type: 'default',
    }
  ]);

  const [price, setPrice] = useState(1000);
  const [distance, setDistance] = useState(5000);
  const insets = useSafeAreaInsets();

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const toast = useToast();

  const toggleCategoryType = (index: number) => {
    const newCategories = [...categories];
    newCategories[index].type =
      newCategories[index].type === 'default' ? 'active' : 'default';
    setCategories(newCategories);
  };

  const sendSettings = () => {
    const activeCategories = categories.filter((c) => c.type === 'active');
    // TODO: post send settings

    toast
      .message(500, {
        message: 'Loading swipes',
      })
      .finally(() => {
        navigation.push('swipes');
      });
  };

  return (
    <View className='flex-col h-full w-[85%] mx-auto'>
      <Text className='text-2xl font-medium pb-2'>Настройки</Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className='h-max rounded-b-[18]'
      >
        {categories.map((item, index) => (
          <CategorySelector
            key={index}
            category={{ ...item }}
            onPress={() => toggleCategoryType(index)}
          />
        ))}
      </ScrollView>
      <View>
        <View className='py-4'>
          <View className='flex-row justify-between mx-4'>
            <Text className='text-lg'>Средняя цена</Text>
            <Text className='text-lg'>{price} ₽</Text>
          </View>
          <Slider
            style={{ width: '100%', height: 32 }}
            minimumValue={0}
            maximumValue={10000}
            step={100}
            value={price}
            onValueChange={setPrice}
            minimumTrackTintColor='#000000'
            maximumTrackTintColor='#000000'
            thumbTintColor='black'
          />
          <View className='flex-row justify-between mx-4'>
            <Text className='text-gray-600'>0 ₽</Text>
            <Text className='text-gray-600'>10000 ₽</Text>
          </View>
        </View>
        <View className='py-4'>
          <View className='flex-row justify-between mx-4'>
            <Text className='text-lg'>Радиус поиска</Text>
            <Text className='text-lg'>{distance} м</Text>
          </View>
          <Slider
            style={{ width: '100%', height: 32 }}
            minimumValue={0}
            maximumValue={10000}
            step={100}
            value={distance}
            onValueChange={setDistance}
            minimumTrackTintColor='#000000'
            maximumTrackTintColor='#000000'
            thumbTintColor='black'
          />
          <View className='flex-row justify-between mx-4 mb-28'>
            <Text className='text-gray-600'>0 м</Text>
            <Text className='text-gray-600'>10000 м</Text>
          </View>
        </View>
      </View>

      <CustomButton
        style={{
          width: '100%',
          position: 'absolute',
          bottom: insets.bottom,
        }}
        type='primary'
        onPress={sendSettings}
      >
        Начать
      </CustomButton>
    </View>
  );
};
