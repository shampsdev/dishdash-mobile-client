import { Header } from '@/entities/header';
import { Radar } from '@/entities/radar';
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { CustomButton } from '@/features/ui/custom-button'

export const HomePage = () => {
  return (
    <View className='flex-1 mt-10'>
      <Header />
      <View className='flex-1 bg-whit items-center'>
        <Radar className='h-3/5 w-screen' />
        <View>
          <Text className='text-xl text-muted text-center'>Куда пойти сегодня?</Text>
          <Text className='text-3xl text-center font-normal'>
            Открывайте новые места для прогулок
          </Text>
        </View>
        <View className='flex-row gap-5 py-10'>
          <CustomButton>Одному</CustomButton>
          <CustomButton type='primary'>С компанией</CustomButton>
        </View>
      </View>
    </View>
  );
};
