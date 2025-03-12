import { Asset } from 'expo-media-library';
import { HStack } from 'native-base';
import { PressableController } from '../PressableController';
import { SongStatus } from '@enums';
import { COLORS } from '@global';
import { useMusicStore } from '@store';

type SongItemControllersProps = {
  data: Asset;
  index: number;
};

export const SongItemControllers = ({ data, index }: SongItemControllersProps) => {
  const handlePlay = useMusicStore(state => state.handlePlay);
  const handleResume = useMusicStore(state => state.handleResume);
  const handlePause = useMusicStore(state => state.handlePause);
  const id = useMusicStore(state => state.currentSong.id);
  const songStatus = useMusicStore(state => state.currentSong.songStatus);
  const sameId = id === data.id;
  const isPauseActive = sameId && songStatus === SongStatus.PAUSE;
  const isPlayingActive = sameId && songStatus === SongStatus.PLAY;

  const handlePlaySong = () => {
    handlePlay(SongStatus.PLAY, data.id, data.filename, data.uri, data.duration, index);
  };

  const handleContent = () => {
    if (sameId) {
      return (
        <>
          {songStatus && (
            <PressableController
              color={isPauseActive ? COLORS.hold : COLORS.inactive}
              name="pause"
              handleAction={handlePause}
            />
          )}
          <PressableController
            color={isPlayingActive ? COLORS.active : COLORS.inactive}
            name="play"
            handleAction={handleResume}
          />
        </>
      );
    } else {
      return (
        <PressableController color={COLORS.inactive} name="play" handleAction={handlePlaySong} />
      );
    }
  };

  return <HStack>{handleContent()}</HStack>;
};
