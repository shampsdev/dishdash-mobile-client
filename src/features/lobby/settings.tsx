import {
  CardTag,
  CategorySelector,
  TagSelectorsType,
} from '@/entities/lobby/category-selector';
import { CustomButton } from '@/shared/ui/custom-button';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useToast } from '@/entities/toast/hooks/useToast';
import { Header } from '@/shared/ui/header';
import { useBottomInsets } from '@/shared/hooks/getBottomInsets';
import { RootStackParamList } from '@/app/navigation.interface';
import { socket } from '@/app/socket';
import axios from 'axios';
import { API_URL } from '@/app/app.settings';

type ISettings = {
  priceMin: number,
  priceMax: number,
  maxDistance: number,
  tags: number[]
}

export const Settings = () => {
  const [tags, setTags] = useState<CardTag[]>([]);

  const [tagSelectorStates, setTagSelectorStates] = useState<TagSelectorsType[]>([]);
  const [price, setPrice] = useState(1000);
  const [distance, setDistance] = useState(5000);
  const bottomInsets = useBottomInsets();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const toast = useToast();

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get(`${API_URL}api/v1/cards/tags`);
        setTags(response.data);
        setTagSelectorStates(Array.from({ length: tags.length }, () => 'default'));
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };

    socket.subscribe('settingsUpdate', (data: ISettings) => {
      setPrice(data.priceMax);
      setDistance(data.maxDistance);
      
      data.tags.forEach((value) => {
        tagSelectorStates[value] = 'active';
      })

      setTagSelectorStates([...tagSelectorStates]);
    })

    fetchTags();
  }, []);

  const toggleCategoryType = (index: number) => {
    if (tagSelectorStates === undefined)
      return;

    tagSelectorStates[index] = tagSelectorStates[index] === 'default' ? 'active' : 'default';
    setTagSelectorStates([...tagSelectorStates]);

    updateSettings();
  };

  const sendSettings = () => {
    updateSettings();

    toast
      .message(500, {
        message: 'Loading swipes',
      })
      .finally(() => {
        navigation.push('swipes');
      });
  };

  const updateSettings = () => {
    socket.sendEvent('settingsUpdate', JSON.stringify({
      priceMin: 0,
      priceMax: price,
      maxDistance: distance,
      tags: getActiveTags(),
    }))
  }

  const getActiveTags = (): number[] => {
    const activeTagIds: number[] = [];

    tagSelectorStates.forEach((value, index) => {
      if (value === 'active') {
        activeTagIds.push(tags[index].id);
      } 
    })

    return activeTagIds;
  }

  return (
    <View className='flex-col h-full w-[85%] mx-auto'>
      <Header>Настройки</Header>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className='h-max rounded-b-[18px]'
      >
        {tags.map((item, index) => (
          <CategorySelector
            key={item.id}
            type={tagSelectorStates![index]}
            category={{ ...item }}
            onPress={() => {
              toggleCategoryType(index);
            }}
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
            onValueChange={(value: number) => {
              setPrice(value)
              updateSettings()
            }}
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
            onValueChange={(value: number) => {
              setDistance(value)
              updateSettings()
            }}
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
          position: 'absolute',
          width: '100%',
          bottom: bottomInsets,
        }}
        type='primary'
        onPress={sendSettings}
      >
        Начать
      </CustomButton>
    </View>
  );
};

