import { View, Image, TextInput, Text, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { AddIcon } from './icon/add';
import { ImageSelectorDrawer, openBottomSheetModal } from './bottom-drawer';
import { useRef, useState } from 'react';
import { CustomText } from '@/shared/ui/custom-text';
import { CustomButton } from '@/shared/ui/custom-button';
import { useBottomInsets } from '@/shared/hooks/getBottomInsets';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

export const Profile = () => {
  const [name, setName] = useState<string>('');
  const [image, setImage] = useState<any>(require('./assets/0.png'));
  const bottomSheetSourceSelectRef = useRef<BottomSheetModal>(null);
  const bottomInsets = useBottomInsets();

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{
        rowGap: 14
      }} 
      className='flex relative justify-center items-center h-full w-full'
    >
      <View>
        <View className='bg-secondary h-[25vh] w-[25vh] rounded-full justify-center items-center'>
          <Image
            className='h-2/3 w-2/3'
            source={image}
          />
          <Pressable
            onPress={() => {
              openBottomSheetModal(bottomSheetSourceSelectRef) 
            }}
            className='bg-black h-[6vh] w-[6vh] rounded-full absolute bottom-0 right-4 justify-center items-center'
          >
            <AddIcon />
          </Pressable>
        </View>
        <ImageSelectorDrawer
          bottomSheetSourceSelectRef={bottomSheetSourceSelectRef}
          setImage={setImage}
        />
      </View>

      <CustomText className='text-2xl'
      >Ваше имя</CustomText>
      <TextInput
        className='font-inter w-[85%] h-16 px-6 border-[#EFEFEF] text-2xl rounded-xl border-2'
        onChangeText={(input) => setName(input)}
        value={name}
      />
      <CustomButton
        type='primary'
        style={{
          position: 'absolute',
          bottom: bottomInsets
        }}
      >
        Начать
      </CustomButton>
    </KeyboardAvoidingView>
  );
};
