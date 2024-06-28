import { CategorySelector } from '@/entities/lobby/category-selector';
import { CustomButton } from '@/shared/ui/custom-button';
import Slider from '@react-native-community/slider';
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Header } from '@/shared/ui/header';
import { useBottomInsets } from '@/shared/hooks/getBottomInsets';
import axios from 'axios';
import { API_URL } from '@/app/app.settings';
import { useLobbyStore } from '@/app/stores/lobby.store';
import { useLobby } from '@/shared/hooks/useLobby';
import { Tag } from '@/shared/interfaces/tag.interface';

export const Settings = () => {
  const [tags, setTags] = useState<Tag[]>([]);

  const bottomInsets = useBottomInsets();
  const { settings } = useLobbyStore();
  const { updateSettings, startSwipes } = useLobby();

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get<Tag[]>(`${API_URL}api/v1/cards/tags`);
        setTags(response.data);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };

    fetchTags();
  }, []);

  const toggleCategoryType = (tagId: number) => {
    const found = settings.tags.find((x) => x.id == tagId);
    let updatedTags: Tag[] = [];
    if (found != undefined) {
      updatedTags = settings.tags.filter((x) => x.id != found.id);
    } else {
      updatedTags = [
        ...settings.tags,
        tags.find((x) => x.id == tagId) ?? tags[0],
      ];
    }

    updateSettings({
      priceMin: 0,
      priceMax: settings.priceMax,
      maxDistance: settings.maxDistance,
      tags: updatedTags,
    });
  };

  return (
    <View className='flex-col h-full w-[85%] mx-auto'>
      <Header>Настройки</Header>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className='h-max rounded-b-[18px]'
      >
        {tags.map((item) => (
          <CategorySelector
            key={item.id}
            type={settings.tags.includes(item) ? 'active' : 'default'}
            category={{ ...item }}
            onPress={() => {
              toggleCategoryType(item.id);
            }}
          />
        ))}
      </ScrollView>
      <View>
        <View className='py-4'>
          <View className='flex-row justify-between mx-4'>
            <Text className='text-lg'>Средняя цена</Text>
            <Text className='text-lg'>{settings.priceMax} ₽</Text>
          </View>
          <Slider
            style={{ width: '100%', height: 32 }}
            minimumValue={0}
            maximumValue={10000}
            step={100}
            value={settings.priceMax}
            onValueChange={(value: number) => {
              updateSettings({
                priceMin: 0,
                priceMax: value,
                maxDistance: settings.maxDistance,
                tags: settings.tags,
              });
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
            <Text className='text-lg'>{settings.maxDistance} м</Text>
          </View>
          <Slider
            style={{ width: '100%', height: 32 }}
            minimumValue={0}
            maximumValue={10000}
            step={100}
            value={settings.maxDistance}
            onValueChange={(value: number) => {
              updateSettings({
                priceMin: 0,
                priceMax: settings.priceMax,
                maxDistance: value,
                tags: settings.tags,
              });
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
        onPress={() => startSwipes()}
      >
        Начать
      </CustomButton>
    </View>
  );
};
