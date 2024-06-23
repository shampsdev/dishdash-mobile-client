import { Profile } from '@/features/profile';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

export const ProfilePage = () => {
  return (
    <BottomSheetModalProvider>
      <Profile/>
    </BottomSheetModalProvider>
  );
};
