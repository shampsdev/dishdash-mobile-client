// import React, { useEffect } from "react";
// import { Dimensions, View, StyleSheet } from "react-native";
// import { TextLine } from "./text-line";
// import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

// const { width } = Dimensions.get("window");

// export const Match = () => {
//   const positionX = useSharedValue(width);

//   const animatedStyles = useAnimatedStyle(() => ({
//     transform: [
//       { 
//         translateX: withTiming(width, { duration: 1000 })
//       }
//     ]
//   }));

//   return (
//     <View className='h-full justify-center'>
//       <Animated.View
//         style={[styles.box, animatedStyles]}
//       />
//       {/* <TextLine/> */}
//     </View>
//   )
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   box: {
//     height: 120,
//     width: 120,
//     backgroundColor: '#b58df1',
//   },
// });

import React, { useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withTiming, Easing, ReduceMotion } from "react-native-reanimated";
import { TextLine } from "./text-line";

const { width } = Dimensions.get("window");

export const Match = () => {
  const positionX = useSharedValue(-width);

  useEffect(() => {
    positionX.value = withTiming(
      width, {
      duration: 5000,
      easing: Easing.in(Easing.poly(3)),
      reduceMotion: ReduceMotion.System
    }
    )
  }, []);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      { translateX: positionX.value }
    ]
  }));

  return (
    <View className="h-full justify-center">
      <Animated.View style={[styles.box, animatedStyles]} />
      <TextLine/>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    height: '100%',
    width: width,
    backgroundColor: '#b58df1',
    position: 'absolute',
    top: 0,
  },
});

