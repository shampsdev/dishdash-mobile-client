import { Header } from '@/entities/header';
import { SwipeSection } from '@/entities/swipes';
import { Canvas } from '@shopify/react-native-skia';
import { View } from 'react-native';

export const SwipePage = () => {
  return (
    <View className='flex-1'>
      <SwipeSection className='h-3/5 w-screen' />
    </View>
  );
};
