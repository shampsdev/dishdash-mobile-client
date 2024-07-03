import { useDrawer } from '@/app/stores/drawer.store';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { useCallback, useEffect, useRef } from 'react';
import { Image, ImageSourcePropType, Text, View } from 'react-native';
import { CopyIcon } from './icon/copy';
import { CustomText } from '@/shared/ui/custom-text';
import { useLobbyStore } from '@/app/stores/lobby.store';
import { User } from '@/shared/interfaces/user.interface';
import { avatars } from '@/app/app.settings';

export const UsersDrawer = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const { users, lobbyId } = useLobbyStore();
  const { open, setOpen } = useDrawer();

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        setOpen(false);
      }
    },
    [setOpen]
  );

  useEffect(() => {
    if (open) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [open]);

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
        <Image
          source={avatars[Number(item.avatar)].src}
          style={{ width: 60, height: 60 }}
        />
        <CustomText style={{ marginTop: 8 }}>{item.name}</CustomText>
      </View>
    );
  }, []);

  return (
    <BottomSheet
      enablePanDownToClose
      index={-1}
      snapPoints={['75%']}
      ref={bottomSheetRef}
      onChange={handleSheetChanges}
      backgroundStyle={{
        backgroundColor: '#F5F5F5',
        borderRadius: 30,
      }}
      handleIndicatorStyle={{
        backgroundColor: '#D2D2D2',
        paddingHorizontal: 30,
      }}
    >
      <View
        style={{
          width: '85%',
          marginHorizontal: 'auto',
          marginBottom: 12,
          marginTop: 24,
        }}
      >
        <View className='pb-8 space-y-2'>
          <Text className='text-xl'>Скопировать ссылку</Text>
          <View className='p-4 px-6 bg-white rounded-full flex-row justify-between'>
            <CustomText
              className='text-[#7F7F7F]'
              adjustsFontSizeToFit
              numberOfLines={1}
            >
              {`https://dishdash.ru/${lobbyId}`}
            </CustomText>
            <View className='justify-center items-center'>
              <CopyIcon />
            </View>
          </View>
        </View>
        <Text className='text-xl'>Участники</Text>
      </View>
      <BottomSheetFlatList
        data={users}
        keyExtractor={(user: User) => user.id}
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
    </BottomSheet>
  );
};
