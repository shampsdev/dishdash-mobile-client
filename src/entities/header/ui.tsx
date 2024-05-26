import { View, Image } from 'react-native';

export const Header = ({ ...props }) => {
  return (
    <View className='flex' {...props}>
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
