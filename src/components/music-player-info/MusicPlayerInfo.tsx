import { Text } from 'native-base';
import { COLORS } from '@global';
import { CurrentSong } from '@types';

interface MusicPlayerInfoProps {
  currentSong: CurrentSong | null;
}

export function MusicPlayerInfo(props: MusicPlayerInfoProps) {
  const { currentSong } = props;

  if (!currentSong)
    return (
      <Text fontSize="3xl" fontWeight={600}>
        No song currently played
      </Text>
    );

  return (
    <>
      <Text fontSize="2xl" fontWeight={600}>
        {currentSong.filename || 'No Song Playing'}
      </Text>
      <Text fontSize="lg" color={COLORS.gray_secondary} fontWeight={600} mb={5}>
        {currentSong.albumName || 'Unknown Album'}
      </Text>
    </>
  );
}
