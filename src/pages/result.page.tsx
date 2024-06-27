import { UsersDrawer } from '@/entities/bottom-sheet';
import { ResultSection } from '@/features/result/result-section';
import React, { memo } from 'react';
import { View } from 'react-native';

export const ResultPage = memo(() => {
  return (
    <View className='h-full'>
      <ResultSection />
      <UsersDrawer />
    </View>
  );
});
