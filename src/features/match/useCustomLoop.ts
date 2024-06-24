import { useEffect } from 'react';
import { Easing, useSharedValue, withTiming } from 'react-native-reanimated';
import { useMatchStore } from './useMatchStatus';

const useCustomLoop = (duration = 1000, promise?: () => void) => {
  const progress = useSharedValue(0);
  const { setCard, setMatchStatus } = useMatchStore(); 

  useEffect(() => {
    progress.value = withTiming(1, {
      duration,
      easing: Easing.linear,
    });
  }, [duration]);

  useEffect(() => {
    setTimeout(() => {
      setMatchStatus('matchCard');
    }, duration)
  }, [duration + 1000])

  return progress;
};

export default useCustomLoop;
