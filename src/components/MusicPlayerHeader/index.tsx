import { useMemo } from 'react';
import { Avatar, HStack, Text, VStack } from 'native-base';
import { COLORS } from '@global';
import { useMusicStore } from '@store';
import { chooseAvatarImage } from '@utils';

export const MusicPlayerHeader = () => {
  const songDetails = useMusicStore(state => state.songDetails);
  console.log({ songDetails });
  const avatarImage = useMemo(() => chooseAvatarImage(), []);

  return (
    <HStack alignItems="center">
      <Avatar
        size="xl"
        bgColor={COLORS.background_content_primary}
        key={avatarImage.toString()}
        source={avatarImage}
      />
      <VStack ml={5} flexShrink={1}>
        <Text fontSize="xl">{songDetails.title}</Text>
        <Text>{songDetails.album}</Text>
      </VStack>
    </HStack>
  );
};
