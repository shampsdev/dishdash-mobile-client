import { MainHeader, UsersHeader } from '@/entities/header';
import { HomePage } from '@/pages/home.page';
import { SwipePage } from '@/pages/swipes.page';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import { ToastProvider } from '@/entities/toast/toast-provider';
import { LobbyPage } from '@/pages/lobby.page';
import { VotingPage } from '@/pages/vote.page';
import { Match } from '@/features/match/match';

export type RootStackParamList = {
  home: undefined;
  swipes: undefined;
  lobby: undefined;
  voting: undefined;
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
              animationEnabled: false,              
              cardStyle: { backgroundColor: '#fff' }
            }}
          >
            <Stack.Screen
              options={{ header: MainHeader }}
              name='home'
              component={HomePage}
            />
            <Stack.Screen
              options={{ header: UsersHeader }}
              name='lobby'
              component={LobbyPage}
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
          </Stack.Navigator>
        </NavigationContainer>
      </ToastProvider>
    </SafeAreaProvider>
  );
}
