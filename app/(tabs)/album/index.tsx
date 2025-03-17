import React, { useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Text, View, Pressable, Image } from 'native-base';
import { FlatList, StyleSheet } from 'react-native';
import { GradientWrapper } from '@components';
import { usePermissionContext } from '@context';
import { COLORS } from '@global';
import { useAlbumStore } from '@store';
import { Album } from '@types';
import { setupAudio } from '@utils';

function AlbumScreen() {
  const { albumList, fetchMusicAssets } = useAlbumStore();
  const { mediaPermissionGranted } = usePermissionContext();
  const router = useRouter();

  useEffect(() => {
    if (!mediaPermissionGranted) return;
    fetchMusicAssets();
    setupAudio();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediaPermissionGranted]);

  const renderAlbumItem = ({ item }: { item: Album }) => (
    <LinearGradient
      colors={[COLORS.gradient_primary, COLORS.gradient_secondary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.gradient}>
      <Pressable
        flexDirection="row"
        alignItems="center"
        onPress={() =>
          router.push({
            pathname: '/(tabs)/album/[albumId]',
            params: { albumId: item.albumId! },
          })
        }>
        <Image source={item.albumAvatar?.url} alt="avatar" w={10} h={10} borderRadius={10} mr={5} />
        <View flex={1}>
          <Text fontSize="xs" fontWeight={700}>
            {item.albumName}
          </Text>
          <Text fontSize="xs">{item.items?.length} songs</Text>
        </View>
      </Pressable>
    </LinearGradient>
  );

  return (
    <GradientWrapper>
      <Text fontSize="2xl" mx={5} my={2} fontWeight={700}>
        Albums
      </Text>

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
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 60, //* to make space for tab bar
  },
  gradient: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default AlbumScreen;
