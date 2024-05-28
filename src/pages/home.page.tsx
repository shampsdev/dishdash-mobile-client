import { Header } from '@/entities/header';
import { Radar } from '@/entities/radar';
import { View, Text, Button, Pressable, TouchableOpacity } from 'react-native';

export const HomePage = () => {
  return (
    <View className='flex-1'>
      <View className='flex-1 bg-whit items-center'>
        <Radar className='h-3/5 w-screen' />
        <View>
          <Text className='text-xl text-muted text-center'>Куда пойти сегодня?</Text>
          <Text className='text-3xl text-center font-normal'>
            Открывайте новые места для прогулок
          </Text>
        </View>
        <View className='flex-row gap-5 py-10'>
          <TouchableOpacity className='p-4 px-10 bg-secondary rounded-full'>
            <Text className='text-black text-lg'>Одному</Text>
          </TouchableOpacity>
          <TouchableOpacity className='p-4 bg-primary rounded-full'>
            <Text className='text-white text-lg'>С компанией</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
