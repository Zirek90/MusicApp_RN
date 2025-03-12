import { StyleSheet, View } from 'react-native';
import { MusicPlayerImage } from '../../src/components/music-player-image';
import { BackgroundWrapper, MusicPlayerControllers, MusicPlayerInfo } from '@components';
import { COLORS } from '@global';
import { useMusicManagerStore, useMusicPlayerStore } from '@store';

function MusicPlayer() {
  const { nextSong, previousSong, isFirst, isLast } = useMusicManagerStore();
  const { currentSong, handlePause, handleResume, songProgress } = useMusicPlayerStore();

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

        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${songProgress}%` }]} />
        </View>
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
  progressBarContainer: {
    width: '80%',
    height: 5,
    backgroundColor: COLORS.gray_secondary,
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: COLORS.yellow,
  },
});

export default MusicPlayer;
