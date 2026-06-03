import { useEffect } from 'react';
import { useSharedValue, withTiming, Easing } from 'react-native-reanimated';
import { SongStatus } from '@enums';

interface useSlideUpAndDownAnimationProps {
  status: SongStatus | null;
}

export const useSlideUpAndDownAnimation = ({ status }: useSlideUpAndDownAnimationProps) => {
  const height = useSharedValue(0);

  useEffect(() => {
    if (status !== SongStatus.PLAY) {
      height.value = withTiming(0, { duration: 1000, easing: Easing.linear });
    } else {
      height.value = withTiming(40, { duration: 1000, easing: Easing.linear });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return height;
};
