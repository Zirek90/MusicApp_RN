import { memo, useCallback } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';
import { COLORS } from '@global';
import { MusicManagerStore, MusicPlayerStore } from '@store';

interface MusicPlayerControllersProps {
  previousSong: MusicManagerStore['previousSong'];
  nextSong: MusicManagerStore['nextSong'];
  isLast: MusicManagerStore['isLast'];
  isFirst: MusicManagerStore['isFirst'];
  currentSong: MusicPlayerStore['currentSong'];
  handlePause: MusicPlayerStore['handlePause'];
  handleResume: MusicPlayerStore['handleResume'];
}

export const MusicPlayerControllers = memo((props: MusicPlayerControllersProps) => {
  const { previousSong, nextSong, isFirst, isLast, currentSong, handlePause, handleResume } = props;
  const isPlaying = currentSong?.isPlaying ?? false;

  const handleTogglePlay = useCallback(() => {
    if (isPlaying) {
      handlePause();
    } else {
      handleResume(nextSong);
    }
  }, [isPlaying, handlePause, handleResume, nextSong]);

  return (
    <View style={styles.container}>
      <Pressable onPress={previousSong} disabled={isFirst} style={styles.sideButton}>
        <FontAwesome
          name="step-backward"
          size={20}
          color={isFirst ? COLORS.gray_primary : COLORS.black}
        />
      </Pressable>

      <Pressable onPress={handleTogglePlay} style={styles.mainButton}>
        <FontAwesome name={isPlaying ? 'pause' : 'play'} size={30} color={COLORS.black} />
      </Pressable>

      <Pressable onPress={nextSong} disabled={isLast} style={styles.sideButton}>
        <FontAwesome
          name="step-forward"
          size={20}
          color={isLast ? COLORS.gray_primary : COLORS.black}
        />
      </Pressable>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginVertical: 20,
  },
  sideButton: {
    backgroundColor: COLORS.yellow_primary,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainButton: {
    backgroundColor: COLORS.yellow_primary,
    borderRadius: 40,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

MusicPlayerControllers.displayName = 'MusicPlayerControllers';
