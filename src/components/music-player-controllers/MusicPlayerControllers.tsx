import { FontAwesome } from '@expo/vector-icons';
import { View, Pressable } from 'native-base';
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
    <View flexDirection="row" justifyContent="space-between" alignItems="center" w="80%" my={5}>
      <Pressable
        onPress={previousSong}
        disabled={isFirst}
        backgroundColor={COLORS.yellow_primary}
        borderRadius={30}
        w={10}
        h={10}
        justifyContent="center"
        alignItems="center">
        <FontAwesome
          name="step-backward"
          size={20}
          color={isFirst ? COLORS.gray_primary : COLORS.black}
        />
      </Pressable>

      <Pressable
        onPress={() => (currentSong?.isPlaying ? handlePause() : handleResume(nextSong))}
        backgroundColor={COLORS.yellow_primary}
        borderRadius={50}
        w={20}
        h={20}
        justifyContent="center"
        alignItems="center">
        <FontAwesome
          name={currentSong?.isPlaying ? 'pause' : 'play'}
          size={30}
          color={COLORS.black}
        />
      </Pressable>

      <Pressable
        onPress={nextSong}
        disabled={isLast}
        backgroundColor={COLORS.yellow_primary}
        borderRadius={30}
        w={10}
        h={10}
        justifyContent="center"
        alignItems="center">
        <FontAwesome
          name="step-forward"
          size={20}
          color={isLast ? COLORS.gray_primary : COLORS.black}
        />
      </Pressable>
    </View>
  );
}
