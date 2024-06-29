import React from 'react'
import { Pressable, View, Text } from 'react-native'
import InfoIcon from './assets/info.icon'

export const SwipeCardHader = ({ 
  title,
  onInfoPress
}: {
  title: string,
  onInfoPress?: () => void
}) => {
  
  return (
    <View
      style={{
        position: 'absolute',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 12,
        top: 10,
      }}
    >
      <View
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          paddingHorizontal: 10,
          paddingVertical: 6,
          borderRadius: 999,
        }}
      >
        <Text className='text-lg rounded-3xl'>{title}</Text>
      </View>

      <Pressable
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: 999
        }}
        onPress={
          onInfoPress
        }
      >
        <InfoIcon />
      </Pressable>
    </View>
  )
}
