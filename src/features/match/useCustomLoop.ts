import { useEffect } from 'react';
import { Easing, useSharedValue, withDelay, withRepeat, withTiming } from 'react-native-reanimated';

const useCustomLoop = (duration = 1000) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(2000, withRepeat(
      withTiming(1, {
        duration,
        easing: Easing.linear,
      }),
      -1,
      false,
    ));
  }, [duration]);

  return progress;
};

export default useCustomLoop;
