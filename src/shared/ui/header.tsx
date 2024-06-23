import { Text } from 'react-native'
import React from 'react'

export const Header = ({ children }: {
  children: string
}) => (
  <Text className='text-2xl font-medium pb-2'>{children}</Text>
)
