import { useDrawer } from '@/app/stores/drawer.store';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { useCallback, useEffect, useRef } from 'react';
import { Text, View } from 'react-native';

interface User {
  name: string;
}

export const UsersDrawer = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const data: User[] = [
    { name: 'Mike' },
    { name: 'Mitya' },
    { name: 'Vanya' },
    { name: 'Vika' },
    { name: 'Sanya' },
  ];

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

  const renderItem = useCallback(
    ({ item }: { item: User }) => (
      <View
        className='space-x-4'
        style={{
          borderWidth: 2,
          borderColor: '#efefef',
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          height: 64,
          borderRadius: 18,
          paddingHorizontal: 16,
          marginBottom: 12,
        }}
      >
        <Text style={{ fontSize: 18 }}>{item.name}</Text>
      </View>
    ),
    []
  );

  return (
    <BottomSheet
      enablePanDownToClose
      index={-1}
      snapPoints={['75%']}
      ref={bottomSheetRef}
      onChange={handleSheetChanges}
      style={{
        shadowOpacity: 0.1,
        shadowRadius: 30,
      }}
    >
      <View
        style={{
          width: '85%',
          marginHorizontal: 'auto',
          marginBottom: 12,
        }}
      >
        <Text className='text-3xl'>Участники</Text>
      </View>
      <BottomSheetFlatList
        data={data}
        keyExtractor={(user: User) => user.name}
        renderItem={renderItem}
        contentContainerStyle={{
          flex: 1,
          width: '85%',
          marginHorizontal: 'auto',
        }}
      />
    </BottomSheet>
  );
};
