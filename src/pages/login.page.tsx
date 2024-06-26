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

export const LoginPage = () => {
  const bottomInsets = useBottomInsets();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const toast = useToast();

  const { loginUser, user } = useAuth();

  const [name, setName] = useState<string>('');
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
      <CustomButton
        type='primary'
        style={{
          position: 'absolute',
          bottom: bottomInsets,
        }}
        onPress={() => {
          const promise = loginUser({
            name,
            avatar: avatar.src.toString(),
          });

          toast.promise(promise, {
            message: 'Создаем аккаунт',
          });

          navigation.navigate('home');
        }}
      >
        Начать
      </CustomButton>
    </BottomSheetModalProvider>
  );
};
