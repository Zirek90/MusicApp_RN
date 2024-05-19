import { Box } from 'native-base';
import { AlbumSongs, AlbumTitles } from '@components';

export const AlbumList = () => {
  return (
    <Box flex={1}>
      <AlbumTitles />
      <AlbumSongs />
    </Box>
  );
};
