import { useCallback, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { FlatList, Image, ListRenderItem, Pressable, StyleSheet, Text, View } from 'react-native';
import { GradientWrapper } from '@components';
import { typography } from '@configs';
import { usePermissionContext } from '@context';
import { COLORS } from '@global';
import { useAlbumStore } from '@store';
import { Album } from '@types';
import { setupAudio } from '@utils';

const GRADIENT_COLORS = [COLORS.gradient_primary, COLORS.gradient_secondary] as const;
const GRADIENT_START = { x: 0, y: 0 };
const GRADIENT_END = { x: 0.5, y: 1 };

interface AlbumRowProps {
  item: Album;
  onPress: (albumId: string) => void;
}

function AlbumRow({ item, onPress }: AlbumRowProps) {
  const handlePress = useCallback(() => onPress(item.albumId!), [item.albumId, onPress]);

  return (
    <LinearGradient
      colors={GRADIENT_COLORS}
      start={GRADIENT_START}
      end={GRADIENT_END}
      style={styles.gradient}>
      <Pressable style={styles.row} onPress={handlePress}>
        <Image source={item.albumAvatar?.url} style={styles.avatar} accessibilityLabel="avatar" />
        <View style={styles.info}>
          <Text style={[typography.base, typography.xs, typography.bold]}>{item.albumName}</Text>
          <Text style={[typography.base, typography.xs]}>{item.items?.length} songs</Text>
        </View>
      </Pressable>
    </LinearGradient>
  );
}

const keyExtractor = (item: Album) => item.albumId!;

function AlbumScreen() {
  const albumList = useAlbumStore(state => state.albumList);
  const fetchMusicAssets = useAlbumStore(state => state.fetchMusicAssets);
  const { mediaPermissionGranted } = usePermissionContext();
  const router = useRouter();

  useEffect(() => {
    if (!mediaPermissionGranted) return;
    fetchMusicAssets();
    setupAudio();
  }, [mediaPermissionGranted, fetchMusicAssets]);

  const handleSelectAlbum = useCallback(
    (albumId: string) => {
      router.push({ pathname: '/(tabs)/album/[albumId]', params: { albumId } });
    },
    [router],
  );

  const renderAlbumItem = useCallback<ListRenderItem<Album>>(
    ({ item }) => <AlbumRow item={item} onPress={handleSelectAlbum} />,
    [handleSelectAlbum],
  );

  return (
    <GradientWrapper>
      <Text style={[typography.base, typography.xxl, typography.bold, styles.title]}>Albums</Text>

      <FlatList
        data={albumList}
        keyExtractor={keyExtractor}
        renderItem={renderAlbumItem}
        contentContainerStyle={styles.listContainer}
      />
    </GradientWrapper>
  );
}

const styles = StyleSheet.create({
  title: {
    marginHorizontal: 20,
    marginVertical: 8,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 60,
  },
  gradient: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 10,
    marginRight: 20,
  },
  info: {
    flex: 1,
  },
});

export default AlbumScreen;
