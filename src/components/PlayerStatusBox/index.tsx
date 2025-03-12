import { Text } from 'native-base';
// import { AnimatedBox, useSlideUpAndDownAnimation } from 'src/animationUtils';
import { COLORS } from '@global';
import { useMusicStore } from '@store';

export const PlayerStatusBox = () => {
  const songStatus = useMusicStore(state => state.currentSong.songStatus);
  const albumTitle = useMusicStore(state => state.songDetails.album);
  // const height = useSlideUpAndDownAnimation({ status: songStatus });

  return null;
  // return (
  //   <AnimatedBox
  //     mx={25}
  //     borderTopRadius={10}
  //     bgColor={COLORS.background_primary}
  //     // style={{ height }xw}
  //     justifyContent="center"
  //     alignItems="center">
  //     <Text>Playing: album - {albumTitle}</Text>
  //   </AnimatedBox>
  // );
};
