import { useEffect } from 'react';
import { Image } from 'native-base';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { Platform, StyleSheet } from 'react-native';
import { COLORS } from '@global';
import { CurrentSong } from '@types';

interface MusicPlayerImageProps {
  isPlaying: CurrentSong['isPlaying'];
}

export function MusicPlayerImage(props: MusicPlayerImageProps) {
  const { isPlaying } = props;
  const elevationValue = useSharedValue(0);

  useEffect(() => {
    if (isPlaying) {
      elevationValue.value = withRepeat(
        withTiming(20, { duration: 1000 }),
        -1, // Infinite loop
        true, // Reverse back down
      );
    } else {
      elevationValue.value = withTiming(0, { duration: 300 });
    }
  }, [isPlaying]);

  const animatedStyle = useAnimatedStyle(() => ({
    elevation: elevationValue.value,
    shadowRadius: Platform.OS === 'ios' ? elevationValue.value : 0,
  }));

  return (
    <Animated.View style={[styles.shadowContainer, animatedStyle]}>
      <Image
        alt="album-image"
        source={require('../../assets/avatars/avatar_2.png')}
        style={styles.image}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  shadowContainer: {
    shadowColor: COLORS.yellow_primary,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    alignItems: 'center',
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
    borderWidth: 2,
    backgroundColor: COLORS.background_secondary,
    borderColor: COLORS.gray_secondary,
  },
});
