import { View, Image } from 'react-native';
import { AddIcon } from './icon/add';
import { ImageSelectorDrawer } from './bottom-drawer';

export const Profile = () => {
  return (
    <View className='flex justify-center items-center h-full w-full'>
      <View className='bg-secondary h-[25vh] w-[25vh] rounded-full justify-center items-center'>
        <Image
          className='h-2/3 w-2/3'
          source={require('./assets/profile.png')}
        ></Image>
        <View className='bg-black h-[6vh] w-[6vh] rounded-full absolute bottom-0 right-4 justify-center items-center'>
          <AddIcon />
        </View>
      </View>
      <ImageSelectorDrawer />
    </View>
  );
};
