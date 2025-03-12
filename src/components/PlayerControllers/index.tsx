import { HStack } from 'native-base';
import { PressableController } from '../PressableController';
import { SongStatus } from '@enums';
import { COLORS } from '@global';
import { useMusicStore } from '@store';

export const PlayerControllers = () => {
  const handleResume = useMusicStore(state => state.handleResume);
  const handlePause = useMusicStore(state => state.handlePause);
  const handleLoop = useMusicStore(state => state.handleLoop);
  const handlePrevious = useMusicStore(state => state.handlePrevious);
  const handleNext = useMusicStore(state => state.handleNext);
  const songStatus = useMusicStore(state => state.currentSong.songStatus);
  const isLooping = useMusicStore(state => state.currentSong.isLooping);

  return (
    <HStack justifyContent="space-between" alignItems="center" px={1}>
      <HStack alignItems="center">
        <PressableController
          size={25}
          color={isLooping ? COLORS.active : COLORS.inactive}
          name="repeat"
          handleAction={handleLoop}
        />
        <PressableController
          size={45}
          color="grey"
          name="skip-previous-circle-outline"
          handleAction={handlePrevious}
        />
      </HStack>
      <HStack>
        <PressableController
          size={60}
          color={songStatus === SongStatus.PAUSE ? COLORS.hold : COLORS.inactive}
          name="pause-circle-outline"
          handleAction={handlePause}
        />
        <PressableController
          size={60}
          color={songStatus === SongStatus.PLAY ? COLORS.active : COLORS.inactive}
          name="play-circle-outline"
          handleAction={() => handleResume()}
        />
      </HStack>
      <HStack alignItems="center">
        <PressableController
          size={45}
          color="grey"
          name="skip-next-circle-outline"
          handleAction={handleNext}
        />
        <PressableController size={25} color="grey" name="playlist-plus" handleAction={() => {}} />
      </HStack>
    </HStack>
  );
};
