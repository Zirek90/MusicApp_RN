import { HStack } from 'native-base';
import { Asset } from 'expo-media-library';
import { COLORS } from '@global';
import { SongStatus } from '@enums';
import { withMusicContext } from '@hoc';
import { PressableController } from '../PressableController';

type SongItemControllersProps = {
  data: Asset;
  index: number;
  id: string;
  songStatus: SongStatus | null;
  handlePlay: (
    songStatus: SongStatus,
    id: string,
    filename: string,
    uri: string,
    duration: number,
    index: number,
  ) => Promise<void>;
  handleResume: () => Promise<void>;
  handlePause: () => Promise<void>;
};

const SongItemControllersComponent = ({
  handlePlay,
  handleResume,
  handlePause,
  data,
  index,
  id,
  songStatus,
}: SongItemControllersProps) => {
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

export const SongItemControllers = withMusicContext(SongItemControllersComponent, {
  handlePlay: data => data.handlePlay,
  handleResume: data => data.handleResume,
  handlePause: data => data.handlePause,
  id: data => data.currentSong.id,
  songStatus: data => data.currentSong.songStatus,
});
