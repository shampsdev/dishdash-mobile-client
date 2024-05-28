import { Header } from '@/entities/header';
import { HomePage } from '@/pages/home.page';
import { SwipePage } from '@/pages/swipes.page';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';

type RootStackParamList = {
  home: undefined;
  swipes: undefined;
};

export type NavigationProps = StackNavigationProp<RootStackParamList>;

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
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
        }}
      >
        <Stack.Screen name='home' component={HomePage} />
        <Stack.Screen name='swipes' component={SwipePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
