import { BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet';
import { useCallback, useRef } from 'react';
import { Image, Pressable } from 'react-native';
import { ImageFile, avatars } from '@/app/app.settings';
import * as ImagePicker from 'expo-image-picker';

export const openBottomSheetModal = (
  ref: React.RefObject<BottomSheetModal>
) => {
  ref.current?.present();
};

export const closeBottomSheetModal = (
  ref: React.RefObject<BottomSheetModal>
) => {
  ref.current?.close();
};

export const ImageSelectorDrawer = ({
  setImage,
  bottomSheetSourceSelectRef,
}: {
  setImage: (imgSrc: ImageFile) => void;
  bottomSheetSourceSelectRef: React.RefObject<BottomSheetModal>;
}) => {
  const bottomSheetImagePickRef = useRef<BottomSheetModal>(null);

  const renderItem = useCallback(({ item }: { item: ImageFile }) => {
    return (
      <Pressable
        style={{
          flex: 1 / 3,
          backgroundColor: 'white',
          paddingVertical: 24,
          borderRadius: 24,
          alignItems: 'center',
        }}
        onPress={() => {
          setImage(item);
          closeBottomSheetModal(bottomSheetImagePickRef);
          closeBottomSheetModal(bottomSheetSourceSelectRef);
        }}
      >
        <Image source={item.src} style={{ width: 60, height: 60 }} />
      </Pressable>
    );
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.info(result);

    if (!result.canceled) {
      // setImage(result.assets[0].uri);

      closeBottomSheetModal(bottomSheetSourceSelectRef);
      closeBottomSheetModal(bottomSheetImagePickRef);
    }
  };

  return (
    <>
      {/* <BottomSheetModal
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
            onPress={() => {
              openBottomSheetModal(bottomSheetImagePickRef);
            }}
            className='p-6 bg-white rounded-xl'
          >
            <CustomText>Выбрать аватарку</CustomText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={pickImage}
            className='p-6 bg-white rounded-xl'
          >
            <CustomText>Выбрать из галереи</CustomText>
          </TouchableOpacity>
        </View>
      </BottomSheetModal> */}

      <BottomSheetModal
        name='image-picker'
        enablePanDownToClose
        snapPoints={['80%']}
        // ref={bottomSheetImagePickRef}
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
        <BottomSheetFlatList
          data={avatars}
          keyExtractor={(image: ImageFile) => image.src.toString()}
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
