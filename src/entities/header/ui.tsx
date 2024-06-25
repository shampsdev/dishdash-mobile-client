import { View, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Added } from './icon/added';
import { TouchableOpacity } from '@gorhom/bottom-sheet';
import { useDrawer } from '@/app/stores/drawer.store';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/app/navigation.interface';

export const MainHeader = ({ ...props }) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View
      className='flex pb-3 flex-row justify-between items-center w-[85%] mx-auto'
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
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('profile');
        }}
      >
        <Added />
      </TouchableOpacity>
    </View>
  );
};

export const SimpleHeader = ({ ...props }) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      className='flex pb-3 flex-row justify-between items-center w-[85%] mx-auto'
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

export const UsersHeader = ({ ...props }) => {
  const insets = useSafeAreaInsets();
  const { setOpen } = useDrawer();

  return (
    <View>
      <View
        className='flex pb-3 flex-row justify-between items-center w-[85%] mx-auto'
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
        <TouchableOpacity
          onPress={() => {
            setOpen(true);
          }}
        >
          <Added />
        </TouchableOpacity>
      </View>
    </View>
  );
};
