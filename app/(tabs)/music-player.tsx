import { Box } from 'native-base';
import {
  BackgroundWrapper,
  MusicPlayerHeader,
  MusicPlayerPlayingGif,
  PlayerControllers,
  PlayerStatusBox,
  SongProgress,
} from '@components';
import { COLORS } from '@global';

const MusicPlayer = () => {
  return (
    <BackgroundWrapper>
      {/* <Box borderRadius={10} position="absolute" bottom={0} right={2} left={2}>
        <MusicPlayerPlayingGif />
        <PlayerStatusBox />
        <Box bgColor={COLORS.background_primary} p={1}>
          <MusicPlayerHeader />
          <SongProgress />
          <PlayerControllers />
        </Box>
      </Box> */}
    </BackgroundWrapper>
  );
};

export default MusicPlayer;
