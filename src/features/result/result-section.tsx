import { useBottomInsets } from '@/shared/hooks/getBottomInsets';
import { CustomButton } from '@/shared/ui/custom-button';
import { CustomText } from '@/shared/ui/custom-text';
import { useResultCardStore } from '@/widgets/stores/result-card.store';
import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { MapPointIcon } from './assets/map-point.icon';
import { ScrollView } from 'react-native-gesture-handler';

export const ResultSection = () => {
  const { card } = useResultCardStore();
  const bottomInsets = useBottomInsets()

  return (
    card
      ?
      <View style={{
        rowGap: 16,
      }} className='h-full w-[85%] mx-auto relative items-center'>
        <Image
          className='w-full min-h-[240px] h-[33vh] rounded-2xl'
          src={card.image}
        />
        <View className='w-full'>
          <CustomText className='font-semibold text-2xl'>{card.title}</CustomText>
          <View className='flex-row space-x-1'>
            <MapPointIcon
              width={24}
              height={24}
            />
            <CustomText className='text-[#7F7F7F] text-xl'>{card.address}</CustomText>
          </View>
        </View>
        <ScrollView className='h-min' style={styles.textContainer}>
          <CustomText>
            {card.description}
          </CustomText>
        </ScrollView>
        <View
          style={{
            position: 'absolute',
            columnGap: 16,
            bottom: bottomInsets
          }} className='flex-row'
        >
          <CustomButton>Выйти</CustomButton>
          <CustomButton type='primary'>На карте</CustomButton>
        </View>
      </View>
      :
      card
  )
}

const styles = StyleSheet.create({
  textContainer: {
    shadowColor: 'black',
    elevation: 8,
    shadowRadius: 10,
    shadowOffset: { width: 10, height: 5 },
    shadowOpacity: 0.2,
    width: '100%',
    borderRadius: 18,
    padding: 12,
  }
})