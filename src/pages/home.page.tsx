import axios from 'axios';
import { Radar } from '@/entities/radar';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { API_URL } from '@/app/app.settings';
import { useNavigation } from '@react-navigation/native';
import { useToast } from '@/entities/toast/hooks/useToast';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/app/navigation.interface';
import * as Location from 'expo-location';
import { LocationObject } from 'expo-location';

import { useLobby } from '@/shared/hooks/useLobby';

export const HomePage = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [location, setLocation] = useState<LocationObject | null>(null);
  const { joinLobby } = useLobby();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const findLobby = async () => {
    try {
      const response = await axios.post(
        `${API_URL}api/v1/lobbies/find`,
        {
          dist: 10,
          location: {
            lat: location?.coords.latitude ?? 0,
            lon: location?.coords.longitude ?? 0,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = response.data;
      if (data.id) {
        joinLobby(data.id);
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
            const promise = findLobby();

            toast
              .promise(promise, {
                message: 'Looking for a lobby',
              })
              .finally(() => {
                setTimeout(() => {
                  navigation.navigate('lobby');
                }, 1000);
              });
          }}
          className='h-5/6 w-screen'
        />
      </View>
    </View>
  );
};
