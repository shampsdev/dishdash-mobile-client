
import { Header } from '@/entities/header';
import { HomePage } from '@/pages/home.page';
import { SwipePage } from '@/pages/swipes.page';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import useSocket from '@/features/swipes/hooks/useSocket';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native';
import { useState } from 'react';

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
  // const [input, setInput] = useState(JSON.stringify({lobbyID: 1}));
  // const { messages, sendMessage } = useSocket("echo");

  // const handleSubmit = () => {
  //   sendMessage(input);
  // };

  return (
//    <>
//      {/* <View className='flex-1 mt-10'>
//        <Pressable className='bg-red-300' onPress={handleSubmit}>
//          <Text>Send</Text>
//        </Pressable>
//        <View className='w-96 h-96 bg-blue-300'>
//        {
//          messages.map((text, index) => <Text key={index}>hello: { text }</Text>)
//        }
//        </View>
//      </View> */}
//      <HomePage/>
//    </>
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
        <Stack.Screen name='home' component={HomePage} />
        <Stack.Screen name='swipes' component={SwipePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
