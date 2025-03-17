import { useMemo } from 'react';
import { View } from 'native-base';
import {
  MusicPlayerControllers,
  MusicPlayerInfo,
  MusicPlayerImage,
  MusicPlayerSlider,
  MusicPlayerDurationInfo,
  GradientWrapper,
} from '@components';
import { useAlbumStore, useMusicManagerStore, useMusicPlayerStore } from '@store';

function MusicPlayer() {
  const { albumList } = useAlbumStore();

  const nextSong = useMusicManagerStore(state => state.nextSong);
  const previousSong = useMusicManagerStore(state => state.previousSong);
  const isFirst = useMusicManagerStore(state => state.isFirst);
  const isLast = useMusicManagerStore(state => state.isLast);
  const activeAlbumId = useMusicManagerStore(state => state.activeAlbumId);

  const currentSong = useMusicPlayerStore(state => state.currentSong);
  const handlePause = useMusicPlayerStore(state => state.handlePause);
  const handleResume = useMusicPlayerStore(state => state.handleResume);
  const songProgress = useMusicPlayerStore(state => state.songProgress);
  const seekTo = useMusicPlayerStore(state => state.seekTo);

  const duration = currentSong?.duration ?? 0;
  const avatar = useMemo(() => {
    return albumList.find(item => item.albumId === activeAlbumId)?.albumAvatar?.url;
  }, [activeAlbumId, albumList]);

  return (
    <GradientWrapper>
      <View flex={1} alignItems="center" justifyContent="center">
        <MusicPlayerImage isPlaying={currentSong?.isPlaying || false} avatar={avatar!} />
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

export default MusicPlayer;
