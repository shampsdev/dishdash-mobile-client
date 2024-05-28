import { Radar } from '@/entities/radar';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationProps } from '../../App';
import { useNavigation } from '@react-navigation/native';

export const HomePage = () => {
  const navigator = useNavigation<NavigationProps>();

  return (
    <View className='flex-1'>
      <View className='flex-1 bg-whit items-center'>
        <Radar className='h-3/5 w-screen' />
        <View>
          <Text className='text-xl text-muted text-center'>
            Куда пойти сегодня?
          </Text>
          <Text className='text-3xl text-center font-normal'>
            Открывайте новые места для прогулок
          </Text>
        </View>
        <View className='flex-row gap-5 py-10'>
          <TouchableOpacity
            onPressOut={() => navigator.push('swipes')}
            className='p-4 px-10 bg-secondary rounded-full'
          >
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
