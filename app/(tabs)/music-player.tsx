import { StyleSheet, View } from 'react-native';
import {
  MusicPlayerControllers,
  MusicPlayerInfo,
  MusicPlayerImage,
  MusicPlayerSlider,
  MusicPlayerDurationInfo,
  GradientWrapper,
} from '@components';
import { useMusicManagerStore, useMusicPlayerStore } from '@store';

function MusicPlayer() {
  const { nextSong, previousSong, isFirst, isLast } = useMusicManagerStore();
  const { currentSong, handlePause, handleResume, songProgress, seekTo } = useMusicPlayerStore();
  const duration = currentSong?.duration ?? 0;

  return (
    <GradientWrapper>
      <View style={styles.container}>
        <MusicPlayerImage isPlaying={currentSong?.isPlaying || false} />
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
    </GradientWrapper>
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
