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
      <Pressable onPress={previousSong} disabled={isFirst}>
        <FontAwesome
          name="step-backward"
          size={30}
          color={isFirst ? COLORS.gray_primary : COLORS.white}
        />
      </Pressable>

      <Pressable onPress={currentSong?.isPlaying ? handlePause : handleResume}>
        <FontAwesome
          name={currentSong?.isPlaying ? 'pause' : 'play'}
          size={36}
          color={COLORS.white}
        />
      </Pressable>

      <Pressable onPress={nextSong} disabled={isLast}>
        <FontAwesome
          name="step-forward"
          size={30}
          color={isLast ? COLORS.gray_primary : COLORS.white}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 200,
    marginVertical: 20,
  },
});
