import { VotingCardSection } from '@/features/voting/voting-card-section'
import { Header } from '@/shared/ui/header'
import { ProgressBar } from '@/shared/ui/progress-bar-timer'
import React from 'react'
import { View } from 'react-native'

export const VotingPage = () => {
  return (
    <View className='w-[85%] mx-auto'>
      <VotingCardSection />
    </View>
  )
}
