import { Asset } from 'expo-media-library';
// import { useChangeBackgroundAnimation } from 'src/animationUtils';
import { AnimatedBox } from '../../animationUtils/animatedComponents';
import { SongItemControllers } from '../SongItemControllers';
import { SongItemInformation } from '../SongItemInformation';
import { SongItemProgress } from '../SongItemProgress';
// import { useMusicStore } from '@store';

type SongItemProps = {
  data: Asset;
  index: number;
};

export const SongItem = ({ data, index }: SongItemProps) => {
  // const id = useMusicStore(state => state.currentSong.id);
  // const sameId = id === data.id;
  // const { bgColor, animatedStyle } = useChangeBackgroundAnimation({ sameId });
  return (
    <AnimatedBox
      mx={3}
      p={1}
      h={45}
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      // bgColor={bgColor}
      // style={animatedStyle}
      borderColor="gray.600"
      borderBottomWidth={2}>
      {/* {sameId && <SongItemProgress />} */}

      {/* <SongItemInformation data={data} /> */}

      {/* <SongItemControllers data={data} index={index} /> */}
    </AnimatedBox>
  );
};
