import React from 'react';
import { View } from 'react-native';
import { Settings } from '@/features/lobby/settings';
import { UsersDrawer } from '@/entities/bottom-sheet';

export const LobbyPage = () => {
  return (
    <View>
      <Settings />
      <UsersDrawer />
    </View>
  );
};
