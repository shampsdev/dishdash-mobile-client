import { UsersDrawer } from '@/entities/bottom-sheet'
import { VotingCardSection } from '@/features/voting/voting-card-section'
import React from 'react'
import { View } from 'react-native'

export const VotingPage = () => {
  return (
    <View className='w-[85%] mx-auto'>
      <VotingCardSection />
      <UsersDrawer />
    </View>
  )
}
