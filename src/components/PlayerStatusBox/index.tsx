import { AnimatedBox, useSlideUpAndDownAnimation } from 'src/animationUtils';
import { withMusicContext } from '@hoc';
import { SongStatus } from '@enums';
import { COLORS } from '@global';
import { Text } from 'native-base';

interface PlayerStatusBoxProps {
  songStatus: SongStatus;
  albumTitle: string;
}

export const PlayerStatusBoxComponent = ({ songStatus, albumTitle }: PlayerStatusBoxProps) => {
  const height = useSlideUpAndDownAnimation({ status: songStatus });

  return (
    <AnimatedBox
      mx={25}
      borderTopRadius={10}
      bgColor={COLORS.background_primary}
      style={{ height }}
      justifyContent="center"
      alignItems="center">
      <Text>Playing: album - {albumTitle}</Text>
    </AnimatedBox>
  );
};

export const PlayerStatusBox = withMusicContext(PlayerStatusBoxComponent, {
  songStatus: data => data.currentSong.songStatus,
  albumTitle: data => data.songDetails.album,
});
