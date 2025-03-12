import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { FlatList, Pressable, View, Text, Image, StyleSheet } from 'react-native';
import { BackgroundWrapper } from '@components';
import { COLORS } from '@global';
import { useAlbumStore } from '@store';
import { Album } from '@types';
import { setupAudio } from '@utils';

function AlbumScreen() {
  const { albumList, fetchMusicAssets } = useAlbumStore();
  const router = useRouter();

  useEffect(() => {
    fetchMusicAssets();
    setupAudio();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderAlbumItem = ({ item }: { item: Album }) => (
    <Pressable
      style={styles.albumItem}
      onPress={() =>
        router.push({
          pathname: '/(tabs)/album/[albumId]',
          params: { albumId: item.albumId! },
        })
      }>
      <Image
        source={require('../../../src/assets/avatars/avatar_1.png')}
        style={styles.albumImage}
      />
      <View style={styles.albumInfo}>
        <Text style={styles.albumTitle}>{item.album}</Text>
        <Text style={styles.albumCount}>{item.items?.length} songs</Text>
      </View>
    </Pressable>
  );

  return (
    <BackgroundWrapper>
      <Text style={styles.pageTitle}>Available Albums</Text>

      <FlatList
        data={albumList}
        keyExtractor={item => item.albumId!}
        renderItem={renderAlbumItem}
        contentContainerStyle={styles.listContainer}
      />
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  pageTitle: {
    fontSize: 24,
    fontWeight: 700,
    color: COLORS.white,
    margin: 20,
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  albumItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.yellow,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  albumImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 15,
  },
  albumInfo: {
    flex: 1,
  },
  albumTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: COLORS.white,
  },
  albumCount: {
    fontSize: 13,
    color: COLORS.gray_primary,
  },
});

export default AlbumScreen;
