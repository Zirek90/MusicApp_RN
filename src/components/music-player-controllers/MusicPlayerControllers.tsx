import { FontAwesome } from '@expo/vector-icons';
import { View, Pressable, StyleSheet } from 'react-native';
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
export function MusicPlayerControllers(props: MusicPlayerControllersProps) {
  const { previousSong, nextSong, isFirst, isLast, currentSong, handlePause, handleResume } = props;

  return (
    <View style={styles.controls}>
      <Pressable onPress={previousSong} disabled={isFirst} style={styles.controlButton}>
        <FontAwesome
          name="step-backward"
          size={20}
          color={isFirst ? COLORS.gray_primary : COLORS.black}
        />
      </Pressable>

      <Pressable
        onPress={() => (currentSong?.isPlaying ? handlePause() : handleResume(nextSong))}
        style={[styles.controlButton, styles.play]}>
        <FontAwesome
          name={currentSong?.isPlaying ? 'pause' : 'play'}
          size={30}
          color={COLORS.black}
        />
      </Pressable>

      <Pressable onPress={nextSong} disabled={isLast} style={styles.controlButton}>
        <FontAwesome
          name="step-forward"
          size={20}
          color={isLast ? COLORS.gray_primary : COLORS.black}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginVertical: 10,
  },
  controlButton: {
    backgroundColor: COLORS.yellow_primary,
    borderRadius: 30,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  play: {
    width: 60,
    height: 60,
  },
});
