import { useEffect, useRef, useState } from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Spinner } from './icons/spinner';
import { Check } from './icons/check';

export interface ToastProps {
  message: string;
}

export interface InternalToastProps {
  promise: Promise<void>;
}

export const Toast = <T,>({
  message,
  promise,
}: ToastProps & InternalToastProps) => {
  const insets = useSafeAreaInsets();
  const slideAnim = useRef(new Animated.Value(-200)).current;

  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    slideIn();
    promise.then(() => {
      setResolved(true);
      setTimeout(() => slideOut(), 500);
    });
  }, []);

  const slideIn = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start();
  };

  const slideOut = () => {
    Animated.timing(slideAnim, {
      toValue: -200,
      duration: 500,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start();
  };

  return (
    <View
      style={{
        top: insets.top + 50,
      }}
      className='absolute z-20 w-full'
    >
      <Animated.View
        onTouchStart={() => slideOut()}
        style={{
          top: slideAnim,
        }}
        className='mx-5 px-5 h-14 bg-white rounded-full shadow-md items-center flex-row'
      >
        <View className='h-5 w-5 justify-center items-center mr-3'>
          {resolved ? (
            <Check className='h-5 w-5 justify-center items-center' />
          ) : (
            <Spinner className='h-5 w-5 justify-center items-center' />
          )}
        </View>

        <Text adjustsFontSizeToFit={true} numberOfLines={1}>
          {message}
        </Text>
      </Animated.View>
    </View>
  );
};
