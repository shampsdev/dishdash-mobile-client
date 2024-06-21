import { ChildrenProps } from '@shopify/react-native-skia';
import React, { createContext, useState, useContext } from 'react';

interface CardModeContextType {
  cardMode: "card" | "description";
  setCardMode: (mode: "card" | "description") => void;
}

const defaultValue: CardModeContextType = {
  cardMode: "card",
  setCardMode: () => {}
};

const CardModeContext = createContext<CardModeContextType>(defaultValue);

export const CardModeProvider = ({ children }: ChildrenProps) => {
  const [cardMode, setCardMode] = useState<"card" | "description">("card");

  return (
    <CardModeContext.Provider value={{ cardMode, setCardMode }}>
      {children}
    </CardModeContext.Provider>
  );
};

export const useCardMode = () => useContext(CardModeContext);
