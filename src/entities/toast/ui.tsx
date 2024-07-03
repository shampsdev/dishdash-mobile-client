import { useEffect, useRef, useState } from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Spinner } from './icons/spinner';
import { Check } from './icons/check';
import { Cross } from './icons/cross';

export interface ToastProps {
  message: string;
  icon?: JSX.Element;
}

export interface InternalToastProps {
  promise: Promise<void>;
}

interface Help {
  index: number;
}

export const Toast = ({
  message,
  promise,
  icon,
  index,
}: ToastProps & InternalToastProps & Help) => {
  const insets = useSafeAreaInsets();
  const slideAnim = useRef(new Animated.Value(-20)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const [resolved, setResolved] = useState<'resolve' | 'spinning' | 'reject'>('spinning');

  useEffect(() => {
    slideIn();
    promise.then(() => {
      setResolved('resolve');
    }).catch((() => {
      setResolved('reject');
    }))
    .finally(() => {
      setTimeout(() => {
        slideOut();
      }, 500);
    });
  }, []);

  const slideIn = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start();
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start();
  };

  const slideOut = () => {
    Animated.timing(slideAnim, {
      toValue: 20,
      duration: 500,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start();
    Animated.timing(opacityAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start();
  };

  return (
    <View
      style={{
        top: insets.top + 50 + 70 * index,
      }}
      className='absolute z-20 w-full'
    >
      <Animated.View
        onTouchStart={() => slideOut()}
        style={{
          top: slideAnim,
          opacity: opacityAnim,
        }}
        className='mx-5 px-5 h-14 bg-white rounded-full shadow-md items-center flex-row'
      >
        {icon ? (
          icon
        ) : (
          <View className='h-5 w-5 justify-center items-center mr-3'>
            {resolved === 'resolve' ? (
              <Check className='h-5 w-5 justify-center items-center' />
            ) : resolved === 'spinning' ? (
              <Spinner className='h-5 w-5 justify-center items-center' />
            ) : (
              <Cross className='h-5 w-5 justify-center items-center' />
            )}
          </View>
        )}
        <Text className='pr-6' adjustsFontSizeToFit={true} numberOfLines={2}>
          {message}
        </Text>
      </Animated.View>
    </View>
  );
};
