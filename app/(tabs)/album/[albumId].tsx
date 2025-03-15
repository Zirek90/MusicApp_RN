import { LinearGradient } from 'expo-linear-gradient';
import { Asset } from 'expo-media-library';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, FlatList, Pressable, Image, StyleSheet } from 'react-native';
import { GradientWrapper } from '@components';
import { COLORS } from '@global';
import { useAlbumStore, useMusicManagerStore } from '@store';
import { durationToTime } from '@utils';

function AlbumDetailsScreen() {
  const { albumId } = useLocalSearchParams();
  const { albumList } = useAlbumStore();
  const router = useRouter();
  const { playSong } = useMusicManagerStore();

  const selectedAlbum = albumList.find(item => item.albumId === albumId);

  const renderSongItem = ({ item, index }: { item: Asset; index: number }) => (
    <LinearGradient
      colors={[COLORS.gradient_primary, COLORS.gradient_secondary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.gradient}>
      <Pressable
        style={styles.albumItem}
        onPress={() => {
          playSong(albumId as string, index);
          router.push('/(tabs)/music-player');
        }}>
        <Image
          source={require('../../../src/assets/avatars/avatar_1.png')}
          style={styles.albumImage}
        />
        <View style={styles.albumInfo}>
          <Text style={styles.albumTitle}>{item.filename}</Text>
          <Text style={styles.albumCount}>{durationToTime(item.duration)} min</Text>
        </View>
      </Pressable>
    </LinearGradient>
  );

  return (
    <GradientWrapper>
      <FlatList
        data={selectedAlbum?.items || []}
        keyExtractor={item => item.id}
        renderItem={renderSongItem}
        contentContainerStyle={styles.listContainer}
      />
    </GradientWrapper>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
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
    width: 40,
    height: 40,
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
    color: COLORS.white,
  },
});

export default AlbumDetailsScreen;
