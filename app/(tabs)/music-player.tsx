import { StyleSheet, View } from 'react-native';
import {
  BackgroundWrapper,
  MusicPlayerControllers,
  MusicPlayerInfo,
  MusicPlayerImage,
  MusicPlayerSlider,
  MusicPlayerDurationInfo,
} from '@components';
import { useMusicManagerStore, useMusicPlayerStore } from '@store';

function MusicPlayer() {
  const { nextSong, previousSong, isFirst, isLast } = useMusicManagerStore();
  const { currentSong, handlePause, handleResume, songProgress, seekTo } = useMusicPlayerStore();
  const duration = currentSong?.duration ?? 0;

  return (
    <BackgroundWrapper>
      <View style={styles.container}>
        <MusicPlayerImage />
        <MusicPlayerInfo currentSong={currentSong} />
        <MusicPlayerControllers
          nextSong={nextSong}
          previousSong={previousSong}
          isFirst={isFirst}
          isLast={isLast}
          currentSong={currentSong}
          handlePause={handlePause}
          handleResume={handleResume}
        />
        <MusicPlayerSlider songProgress={songProgress} seekTo={seekTo} />
        <MusicPlayerDurationInfo songProgress={songProgress} duration={duration} />
      </View>
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MusicPlayer;
