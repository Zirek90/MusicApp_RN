import { COLORS } from '@global';
import { useEffect } from 'react';
import { useAnimatedProps, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

interface useChangeBackgroundAnimationProps {
  sameId?: boolean;
}

export const useChangeBackgroundAnimation = ({ sameId }: useChangeBackgroundAnimationProps) => {
  const bgColor = useSharedValue(COLORS.background_content_secondary);

  useEffect(() => {
    if (!sameId) {
      return;
    }

    bgColor.value = withRepeat(withTiming(COLORS.background_primary, { duration: 3000 }), 0, true);

    return () => {
      bgColor.value = COLORS.background_content_secondary;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sameId]);

  const animatedStyle = useAnimatedProps(() => ({
    backgroundColor: bgColor.value,
  }));

  return { bgColor, animatedStyle };
};
