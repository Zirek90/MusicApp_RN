import React, { useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { FlatList, Pressable, View, Text, Image, StyleSheet } from 'react-native';
import { GradientWrapper } from '@components';
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
    <LinearGradient
      colors={[COLORS.gradient_primary, COLORS.gradient_secondary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.gradient}>
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
          <Text style={styles.albumTitle}>{item.albumName}</Text>
          <Text style={styles.albumCount}>{item.items?.length} songs</Text>
        </View>
      </Pressable>
    </LinearGradient>
  );

  return (
    <GradientWrapper>
      <Text style={styles.pageTitle}>Available Albums</Text>

      <FlatList
        data={albumList}
        keyExtractor={item => item.albumId!}
        renderItem={renderAlbumItem}
        contentContainerStyle={styles.listContainer}
      />
    </GradientWrapper>
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
  gradient: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  albumItem: {
    flexDirection: 'row',
    alignItems: 'center',
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
    color: COLORS.gray_secondary,
  },
});

export default AlbumScreen;
