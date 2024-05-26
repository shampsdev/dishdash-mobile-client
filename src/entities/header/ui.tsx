import { View, Image } from 'react-native';

export const Header = () => {
  return (
    <View className='flex'>
      <Image
        source={require('./assets/logo.png')}
        style={{
          height: 34,
          width: 134,
          position: 'relative',
        }}
        className='m-5'
      />
    </View>
  );
};
