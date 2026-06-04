import { Key, memo, useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { Image, ImageSourcePropType, Platform, StyleSheet } from 'react-native';
import { COLORS } from '@global';
import { CurrentSong } from '@types';

interface MusicPlayerImageProps {
  isPlaying: CurrentSong['isPlaying'];
  avatar: ImageSourcePropType;
}

export const MusicPlayerImage = memo((props: MusicPlayerImageProps) => {
  const { isPlaying, avatar } = props;
  const elevationValue = useSharedValue(0);

  useEffect(() => {
    elevationValue.value = isPlaying
      ? withRepeat(withTiming(30, { duration: 1000 }), -1, true)
      : withTiming(0, { duration: 300 });
  }, [isPlaying, elevationValue]);

  const animatedStyle = useAnimatedStyle(() => ({
    elevation: elevationValue.value,
    shadowRadius: Platform.OS === 'ios' ? elevationValue.value : 0,
  }));

  return (
    <Animated.View style={[styles.shadowContainer, animatedStyle]}>
      <Image
        style={styles.image}
        source={avatar}
        accessibilityLabel="album-image"
        key={avatar as Key}
      />
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  shadowContainer: {
    shadowColor: COLORS.white,
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
    borderWidth: 2,
    backgroundColor: COLORS.background_secondary,
    borderColor: COLORS.gray_secondary,
  },
});

MusicPlayerImage.displayName = 'MusicPlayerImage';
