import { HStack, Text } from 'native-base';
import { Asset } from 'expo-media-library';
import { durationToTime, trimString } from '@utils';

type SongItemInformationProps = {
  data: Asset;
};

export const SongItemInformation = ({ data }: SongItemInformationProps) => {
  return (
    <HStack alignItems="center">
      <Text ml={2}>
        {trimString(data.filename)} - ({durationToTime(data.duration)})
      </Text>
    </HStack>
  );
};
