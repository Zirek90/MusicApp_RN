import { Box } from 'native-base';
import { COLORS } from '@global';
import {
  MusicPlayerHeader,
  SongProgress,
  PlayerControllers,
  PlayerStatusBox,
  MusicPlayerPlayingGif,
} from '@components';

export const MusicPlayer = () => {
  return (
    <Box borderRadius={10} position="absolute" bottom={0} right={2} left={2}>
      <MusicPlayerPlayingGif />
      <PlayerStatusBox />
      <Box bgColor={COLORS.background_primary} p={1}>
        <MusicPlayerHeader />
        <SongProgress />
        <PlayerControllers />
      </Box>
    </Box>
  );
};
