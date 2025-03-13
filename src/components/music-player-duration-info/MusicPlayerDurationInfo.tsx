import { HStack, Text } from 'native-base';
import { MusicPlayerStore } from '@store';
import { calculateCurrentTime, durationToTime } from '@utils';

interface MusicPlayerDurationInfoProps {
  songProgress: MusicPlayerStore['songProgress'];
  duration: number;
}

export function MusicPlayerDurationInfo(props: MusicPlayerDurationInfoProps) {
  const { songProgress, duration } = props;

  return (
    <HStack justifyContent="space-between" w={'80%'}>
      <Text fontSize="md" color="white">
        {calculateCurrentTime(duration, songProgress)}
      </Text>
      <Text fontSize="md" color="white">
        {durationToTime(duration)}
      </Text>
    </HStack>
  );
}
