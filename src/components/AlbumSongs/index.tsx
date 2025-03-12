import { useCallback } from 'react';
import { Asset } from 'expo-media-library';
import { Box, FlatList, Heading } from 'native-base';
import { SongItem } from '../SongItem';
import { useAlbumStore } from '@store';

const SONG_HEIGHT = 45;

export const AlbumSongs = () => {
  const { activeAlbum, currentlyPlayedAlbum } = useAlbumStore();
  const albumSource = activeAlbum || currentlyPlayedAlbum;

  const getSongLayout = useCallback(
    (_: ArrayLike<Asset> | null | undefined, index: number) => ({
      length: SONG_HEIGHT,
      offset: SONG_HEIGHT * index,
      index,
    }),
    [],
  );

  const renderSongItem = useCallback(
    ({ item, index }: { item: Asset; index: number }) => <SongItem data={item} index={index} />,
    [],
  );

  const songKeyExtractor = useCallback((item: Asset) => item.id, []);

  if (!albumSource) return null;

  return (
    <Box flex={1}>
      <Heading my={3}>{albumSource.album}</Heading>
      <FlatList
        data={albumSource.items}
        keyExtractor={songKeyExtractor}
        renderItem={renderSongItem}
        getItemLayout={getSongLayout}
        removeClippedSubviews // Unmount components when outside of window
        updateCellsBatchingPeriod={100} // Increase time between renders
        maxToRenderPerBatch={10}
      />
    </Box>
  );
};
