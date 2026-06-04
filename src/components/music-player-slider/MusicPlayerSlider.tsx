import { memo, useCallback, useEffect, useRef, useState } from 'react';
import Slider from '@react-native-community/slider';
import { StyleSheet, View } from 'react-native';
import { COLORS } from '@global';
import { MusicPlayerStore } from '@store';

interface MusicPlayerSliderProps {
  songProgress: MusicPlayerStore['songProgress'];
  seekTo: MusicPlayerStore['seekTo'];
}

export const MusicPlayerSlider = memo((props: MusicPlayerSliderProps) => {
  const { songProgress, seekTo } = props;
  const [localProgress, setLocalProgress] = useState(songProgress);
  const isDragging = useRef(false);

  useEffect(() => {
    if (!isDragging.current) {
      setLocalProgress(songProgress);
    }
  }, [songProgress]);

  const handleValueChange = useCallback((value: number) => {
    isDragging.current = true;
    setLocalProgress(value);
  }, []);

  const handleSlidingComplete = useCallback(
    (value: number) => {
      isDragging.current = false;
      seekTo(value);
    },
    [seekTo],
  );

  return (
    <View style={styles.container}>
      <Slider
        value={localProgress}
        minimumValue={0}
        maximumValue={100}
        minimumTrackTintColor={COLORS.yellow_primary}
        maximumTrackTintColor={COLORS.gray_primary}
        thumbTintColor={COLORS.yellow_primary}
        onValueChange={handleValueChange}
        onSlidingComplete={handleSlidingComplete}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '90%',
    paddingHorizontal: 20,
    marginVertical: 8,
  },
});

MusicPlayerSlider.displayName = 'MusicPlayerSlider';
