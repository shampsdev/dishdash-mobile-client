import { UsersDrawer } from '@/entities/bottom-sheet';
import { SwipeSection } from '@/features/swipes';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const SwipePage = () => {
  return (
    <GestureHandlerRootView>
      <SwipeSection />
      <UsersDrawer />
    </GestureHandlerRootView>
  );
};
