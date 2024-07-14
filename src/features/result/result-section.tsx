import { useBottomInsets } from '@/shared/hooks/getBottomInsets';
import { CustomButton } from '@/shared/ui/custom-button';
import { CustomText } from '@/shared/ui/custom-text';
import { useResultCardStore } from '@/app/stores/result-card.store';
import React from 'react';
import { View, Image, StyleSheet, Linking, Alert } from 'react-native';
import { MapPointIcon } from './assets/map-point.icon';
import { ScrollView } from 'react-native-gesture-handler';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/app/navigation.interface';
import MapView from 'react-native-maps';

const openGoogleMaps = async (
  destinationLatitude: number,
  destinationLongitude: number
) => {
  let location = await Location.getCurrentPositionAsync({});

  const url = `https://www.google.com/maps/dir/?api=1&origin=${location.coords.latitude},${location.coords.longitude}&destination=${destinationLatitude},${destinationLongitude}&travelmode=driving`;

  Linking.canOpenURL(url)
    .then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert('Error', "Google Maps is not installed or can't be opened");
      }
    })
    .catch((err) => console.error('An error occurred', err));
};

const openYandexMaps = async (
  destinationLatitude: number,
  destinationLongitude: number
) => {
  let location = await Location.getCurrentPositionAsync({});

  const url = `https://yandex.ru/maps/?rtext=${location.coords.latitude},${location.coords.longitude}~${destinationLatitude},${destinationLongitude}&rtt=auto`;

  Linking.canOpenURL(url)
    .then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Yandex Maps cannot be opened');
      }
    })
    .catch((err) => console.error('An error occurred', err));
};

export const ResultSection = () => {
  const { card } = useResultCardStore();
  const bottomInsets = useBottomInsets();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return card ? (
    <View
      style={{
        rowGap: 16,
      }}
      className='h-full relative items-center'
    >
      <ScrollView className='h-min' style={styles.textContainer}>
        <View className='w-[85%] mx-auto' style={styles.shadow}>
          <Image
            className='w-full min-h-[240px] h-[33vh] rounded-2xl'
            src={card.Image}
          />
          <View className='w-full p-4 bg-white -translate-y-10 rounded-2xl'>
            <CustomText className='font-semibold text-xl pb-2'>
              {card.Title}
            </CustomText>
            <View className='flex-row space-x-1'>
              <MapPointIcon width={24} height={24} />
              <CustomText className='text-[#7F7F7F] text-lg'>
                {card.Address}
              </CustomText>
            </View>
          </View>
        </View>
        <View className='w-[85%] mx-auto pb-6'>
          <CustomText className='text-xl pb-2'>Коротко о месте</CustomText>
          <CustomText>{card.Description}</CustomText>
        </View>
        <MapView
          onTouchStart={async () =>
            await openGoogleMaps(card.Location.lat, card.Location.lon)
          }
          scrollEnabled={false}
          initialRegion={{
            latitude: card.Location.lat,
            longitude: card.Location.lon,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
          }}
          style={{
            height: '30%',
            width: '85%',
            marginHorizontal: 'auto',
            borderRadius: 14,
          }}
        />
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          columnGap: 16,
          bottom: bottomInsets,
        }}
        className='flex-row'
      >
        <CustomButton
          onPress={() => {
            navigation.navigate('home');
          }}
        >
          Выйти
        </CustomButton>
      </View>
    </View>
  ) : (
    card
  );
};

const styles = StyleSheet.create({
  textContainer: {
    width: '100%',
    borderRadius: 18,
    paddingTop: 12,
    paddingBottom: 24,
  },
  shadow: {
    shadowColor: 'black',
    elevation: 8,
    shadowRadius: 10,
    shadowOffset: { width: 10, height: 5 },
    shadowOpacity: 0.2,
  },
});
