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
  const { nextSong, previousSong, isFirst, isLast, activeAlbumId } = useMusicManagerStore();
  const { currentSong, handlePause, handleResume, songProgress, seekTo } = useMusicPlayerStore();
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
