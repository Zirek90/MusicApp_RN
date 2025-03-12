import { useCallback } from 'react';
import { Box, FlatList, Pressable, Text } from 'native-base';
import { COLORS } from '@global';
import { useAlbumStore } from '@store';
import { Album } from '@types';

export const AlbumTitles = () => {
  const { albumList, activeAlbum, currentlyPlayedAlbum, setActiveAlbum } = useAlbumStore();
  const albumSource = activeAlbum || currentlyPlayedAlbum;

  const renderAlbumItem = useCallback(
    ({ item }: { item: Album }) => {
      const isActive = item.album === albumSource?.album;
      return (
        <Pressable
          p={2}
          bgColor={isActive ? COLORS.white : 'transparent'}
          onPress={() => setActiveAlbum(item)}>
          <Text fontSize="sm" color={isActive ? COLORS.black : COLORS.white}>
            {item.album}
          </Text>
        </Pressable>
      );
    },
    [albumSource, setActiveAlbum],
  );

  const albumKeyExtractor = useCallback((item: Album) => item.album, []);

  return (
    <Box bgColor={COLORS.background_content_primary}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={albumList}
        keyExtractor={albumKeyExtractor}
        renderItem={renderAlbumItem}
      />
    </Box>
  );
};
