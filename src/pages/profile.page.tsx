import { ImageFile, avatars } from '@/app/app.settings';
import { RootStackParamList } from '@/app/navigation.interface';
import { useAuth } from '@/app/stores/auth.store';
import { useToast } from '@/entities/toast/hooks/useToast';
import { Profile } from '@/features/profile';
import { useBottomInsets } from '@/shared/hooks/getBottomInsets';
import { CustomButton } from '@/shared/ui/custom-button';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useState } from 'react';
import { View } from 'react-native';

export const ProfilePage = () => {
  const bottomInsets = useBottomInsets();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const { user, updateUser } = useAuth();
  const toast = useToast();

  const [name, setName] = useState<string>(user?.name ?? '');
  const [avatar, setAvatar] = useState<ImageFile>(
    user?.avatar != undefined ? avatars[Number(user.avatar) - 1] : avatars[0]
  );

  return (
    <BottomSheetModalProvider>
      <Profile
        name={name}
        setName={setName}
        avatar={avatar}
        setAvatar={setAvatar}
      />
      <View
        style={{
          position: 'absolute',
          width: '100%',
          bottom: bottomInsets,
        }}
      >
        <CustomButton
          type='primary'
          onPress={() => {
            const promise = updateUser({
              id: user?.id ?? '',
              name,
              avatar: avatar.src.toString(),
            });

            toast
              .promise(promise, {
                message: 'Обновляем пользователя',
              })
              .finally(() => {
                navigation.navigate('home');
              });
          }}
          style={{
            marginHorizontal: 'auto',
          }}
        >
          Обратно
        </CustomButton>
      </View>
    </BottomSheetModalProvider>
  );
};
