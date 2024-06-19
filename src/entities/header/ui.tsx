import { View, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const Header = ({ ...props }) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      className='flex px-4 pb-3 flex-row justify-between'
      style={{
        paddingTop: insets.top,
      }}
      {...props}
    >
      <Image
        source={require('./assets/logo.png')}
        style={{
          height: 34,
          width: 134,
          position: 'relative',
        }}
      />
    </View>
  );
};
