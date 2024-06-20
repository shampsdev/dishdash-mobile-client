import { Header } from '@/entities/header';
import { HomePage } from '@/pages/home.page';
import { SwipePage } from '@/pages/swipes.page';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import { Toast } from '@/entities/toast';
import { ToastProvider } from '@/entities/toast/toast-provider';

type RootStackParamList = {
  home: undefined;
  swipes: undefined;
};

export type NavigationProps = StackNavigationProp<RootStackParamList>;

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <ToastProvider>
        <NavigationContainer
          theme={{
            ...DefaultTheme,
            colors: {
              ...DefaultTheme.colors,
              background: 'white',
            },
          }}
        >
          <Stack.Navigator
            screenOptions={{
              header: Header,
              animationEnabled: false,
            }}
          >
            {/* <Stack.Screen name='home' component={HomePage} /> */}
            <Stack.Screen name='swipes' component={SwipePage} />
          </Stack.Navigator>
        </NavigationContainer>
      </ToastProvider>
    </SafeAreaProvider>
  );
}
