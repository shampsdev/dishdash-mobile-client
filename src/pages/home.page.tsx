import axios from 'axios';
import { Radar } from '@/entities/radar';
import React from 'react';
import { View } from 'react-native';
import { API_HOST } from '@/app/app.settings';
import { useLobby } from '@/app/stores/useLobby';
import { NavigationProps, RootStackParamList } from '../../App';
import { useNavigation } from '@react-navigation/native';
import { useToast } from '@/entities/toast/hooks/useToast';
import { StackNavigationProp } from '@react-navigation/stack';

const locationData = {
  lat: 59.957441,
  lng: 30.308091,
};

export const HomePage = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const { lobbyID, setLobbyID } = useLobby();

  const createLobby = async () => {
    try {
      const response = await axios.post(
        `${API_HOST}/api/v1/lobby`,
        JSON.stringify(locationData),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = response.data;
      console.info(data);
      if (data.id) {
        setLobbyID(lobbyID);
        navigation.navigate('lobby');
      } else {
        throw Error('Response did not contain an "id" field');
      }
    } catch (error) {
      throw Error(`There was a problem with your axios operation: ${error}`);
    }
  };

  const toast = useToast();

  return (
    <View className='flex-1'>
      <View className='flex-1 bg-whit items-center'>
        <Radar
          onSpin={() => {
            // const promise = createLobby();

            toast
              .message(1000, {
                message: 'Looking for a lobby',
              })
              .finally(() => {
                navigation.navigate('lobby');
              });
          }}
          className='h-5/6 w-screen'
        />
      </View>
    </View>
  );
};
