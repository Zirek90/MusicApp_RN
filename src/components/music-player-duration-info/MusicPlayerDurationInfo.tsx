import { HStack, Text } from 'native-base';
import { COLORS } from '@global';
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
      <Text fontSize="md" color={COLORS.white}>
        {calculateCurrentTime(duration, songProgress)}
      </Text>
      <Text fontSize="md" color={COLORS.white}>
        {durationToTime(duration)}
      </Text>
    </HStack>
  );
}
