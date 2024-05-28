import { Header } from '@/entities/header';
import { HomePage } from '@/pages/home.page';
import { SwipePage } from '@/pages/swipes.page';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          contentStyle: {
            backgroundColor: 'transparent',
          },
          header: Header
        }}
      >
        <Stack.Screen name='home' component={HomePage} />
        <Stack.Screen name='swipes' component={SwipePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
