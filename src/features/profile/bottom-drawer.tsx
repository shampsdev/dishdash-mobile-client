import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetModal,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet';
import { useCallback, useRef, useEffect } from 'react';
import { Image, ImageSourcePropType, Text, View, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface User {
  name: string;
  src: ImageSourcePropType;
}

export const ImageSelectorDrawer = () => {
  const bottomSheetSourceSelectRef = useRef<BottomSheetModal>(null);
  const bottomSheetImagePickRef = useRef<BottomSheetModal>(null);

  const data: User[] = [
    { name: 'Mike', src: require('./assets/0.png') },
    { name: 'Mitya', src: require('./assets/1.png') },
    { name: 'Vanya', src: require('./assets/2.png') },
    { name: 'Vika', src: require('./assets/1.png') },
    { name: 'Sanya', src: require('./assets/0.png') },
  ];

  const renderItem = useCallback(({ item }: { item: User }) => {
    return (
      <View
        style={{
          flex: 1 / 3,
          backgroundColor: 'white',
          paddingBottom: 16,
          paddingTop: 25,
          borderRadius: 24,
          alignItems: 'center',
        }}
      >
        <Image source={item.src} style={{ width: 60, height: 60 }} />
        <Text style={{ marginTop: 8 }}>{item.name}</Text>
      </View>
    );
  }, []);

  const openSourceSelect = () => {
    bottomSheetSourceSelectRef.current?.present();
  };

  const openImagePicker = () => {
    bottomSheetImagePickRef.current?.present();
  };

  return (
    <>
      <Button title='Open Source Select' onPress={openSourceSelect} />

      <BottomSheetModal
        name='select-source'
        enablePanDownToClose
        snapPoints={['35%']}
        ref={bottomSheetSourceSelectRef}
        backgroundStyle={{
          backgroundColor: '#F5F5F5',
          borderRadius: 30,
        }}
        handleIndicatorStyle={{
          backgroundColor: '#D2D2D2',
          paddingHorizontal: 30,
          marginBottom: 40,
        }}
      >
        <View
          style={{
            width: '85%',
            marginHorizontal: 'auto',
            rowGap: 10,
          }}
        >
          <TouchableOpacity
            onPress={openImagePicker}
            className='p-6 bg-white rounded-xl'
          >
            <Text>Выбрать аватарку</Text>
          </TouchableOpacity>
          <TouchableOpacity className='p-6 bg-white rounded-xl'>
            <Text>Выбрать из галереи</Text>
          </TouchableOpacity>
        </View>
      </BottomSheetModal>

      <BottomSheetModal
        name='image-picker'
        enablePanDownToClose
        snapPoints={['90%']}
        ref={bottomSheetImagePickRef}
        backgroundStyle={{
          backgroundColor: '#F5F5F5',
          borderRadius: 30,
        }}
        handleIndicatorStyle={{
          backgroundColor: '#D2D2D2',
          paddingHorizontal: 30,
          marginBottom: 40,
        }}
      >
        <BottomSheetFlatList
          data={data}
          keyExtractor={(user: User) => user.name}
          renderItem={renderItem}
          contentContainerStyle={{
            width: '85%',
            marginHorizontal: 'auto',
            rowGap: 10,
          }}
          columnWrapperStyle={{
            columnGap: 10,
          }}
          numColumns={3}
        />
      </BottomSheetModal>
    </>
  );
};
