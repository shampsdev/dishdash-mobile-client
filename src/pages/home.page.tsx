import { Radar } from '@/entities/radar';
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';
import { API_HOST } from '@/app/app.settings';
import { useLobby } from '@/app/stores/useLobby';
import { NavigationProps } from '../../App';
import { useNavigation } from '@react-navigation/native';
import { useToast } from '@/entities/toast/hooks/useToast';
import { Added } from '@/entities/toast/icons/added';

const locationData = {
  lat: 59.957441,
  lng: 30.308091,
};

export const HomePage = () => {
  const navigator = useNavigation<NavigationProps>();

  const { lobbyID, setLobbyID } = useLobby();

  const createLobby = async () => {
    const jsonData = {
      location: JSON.stringify(locationData),
    };

    try {
      const response = await axios.post(`${API_HOST}/api/v1/lobby`, jsonData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = response.data;
      console.info(data);
      if (data.id) {
        setLobbyID(lobbyID);
        navigator.push('swipes');
      } else {
        console.error('Response did not contain an "id" field');
      }
    } catch (error) {
      console.error('There was a problem with your axios operation:', error);
    }
  };

  const toast = useToast();

  useEffect(() => {
    const promise1 = new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2500);
    }).finally(() => {
      toast.message(500, {
        message: 'hello',
      });
    });
    const promise2 = new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 5000);
    });

    toast.promise(promise1, {
      message: 'This is a very long message that should take 2 lines',
    });

    toast.promise(promise2, {
      message: 'Message 2',
    });
  }, []);

  return (
    <View className='flex-1'>
      <View className='flex-1 bg-whit items-center'>
        <Radar className='h-5/6 w-screen' />
      </View>
    </View>
  );
};
