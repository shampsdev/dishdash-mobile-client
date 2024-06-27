import { MainHeader, SimpleHeader, UsersHeader } from '@/entities/header';
import { HomePage } from '@/pages/home.page';
import { SwipePage } from '@/pages/swipes.page';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import { ToastProvider } from '@/entities/toast/toast-provider';
import { VotingPage } from '@/pages/vote.page';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import { ResultPage } from '@/pages/result.page';
import { RootStackParamList } from '@/app/navigation.interface';
import { ProfilePage } from '@/pages/profile.page';
import { LobbyPage } from '@/pages/lobby.page';
import { useAuth } from '@/app/stores/auth.store';
import { LoginPage } from '@/pages/login.page';
import { SocketProvider } from '@/shared/providers/socket.provider';
import { SwipeProvider } from '@/shared/providers/swipe.provider';

SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    FormaDJRCyrillicText: require('./assets/fonts/FormaDJRCyrillicText.ttf'),
    'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
  });

  const { authenticated } = useAuth();

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <ToastProvider>
        <SocketProvider>
          <NavigationContainer
            theme={{
              ...DefaultTheme,
              colors: {
                ...DefaultTheme.colors,
                background: 'white',
              },
            }}
          >
            <SwipeProvider>
              <Stack.Navigator
                screenOptions={{
                  animationEnabled: false,
                  cardStyle: { backgroundColor: '#fff' },
                }}
              >
                {!authenticated && (
                  <Stack.Screen
                    options={{ header: SimpleHeader }}
                    name='login'
                    component={LoginPage}
                  />
                )}
                <Stack.Screen
                  options={{ header: MainHeader }}
                  name='home'
                  component={HomePage}
                />
                <Stack.Screen
                  options={{ header: SimpleHeader }}
                  name='profile'
                  component={ProfilePage}
                />
                <Stack.Screen
                  options={{ header: UsersHeader }}
                  name='lobby'
                  component={LobbyPage}
                />
                <Stack.Screen
                  options={{ header: UsersHeader }}
                  name='swipes'
                  component={SwipePage}
                />
                <Stack.Screen
                  options={{ header: UsersHeader }}
                  name='voting'
                  component={VotingPage}
                />
                <Stack.Screen
                  options={{ header: UsersHeader }}
                  name='result'
                  component={ResultPage}
                />
              </Stack.Navigator>
            </SwipeProvider>
          </NavigationContainer>
        </SocketProvider>
      </ToastProvider>
    </SafeAreaProvider>
  );
}
