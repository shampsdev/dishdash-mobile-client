import { Header } from '@/entities/header';
import { SwipeSection } from '@/features/swipes';
import { SafeAreaView, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const SwipePage = () => {
  return (
    <GestureHandlerRootView>
      <SafeAreaView>
        <SwipeSection/>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};
