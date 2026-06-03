import { Asset } from 'expo-media-library';
import { SongItemProgress } from '../SongItemProgress';
import { SongItemControllers } from '../SongItemControllers';
import { SongItemInformation } from '../SongItemInformation';
import { AnimatedBox } from '../../animationUtils/animatedComponents';
import { useChangeBackgroundAnimation } from 'src/animationUtils';
import { useMusicStore } from 'src/store';

type SongItemProps = {
  data: Asset;
  index: number;
};

export const SongItem = ({ data, index }: SongItemProps) => {
  const id = useMusicStore(state => state.currentSong.id);
  const sameId = id === data.id;
  const { bgColor, animatedStyle } = useChangeBackgroundAnimation({ sameId });
  return (
    <AnimatedBox
      mx={3}
      p={1}
      h={45}
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      bgColor={bgColor}
      style={animatedStyle}
      borderColor="gray.600"
      borderBottomWidth={2}>
      {sameId && <SongItemProgress />}

      <SongItemInformation data={data} />

      <SongItemControllers data={data} index={index} />
    </AnimatedBox>
  );
};
