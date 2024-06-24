import React from "react";
import { View } from "react-native";
import { TextLine } from "./text-line";

export const Match = ({ promise }: {
  promise?: () => void
}) => {
  return (
    <View
      className="h-full w-full absolute left-0 top-0"
    >
      <TextLine
        promise={promise}
      />
    </View>
  );
};


