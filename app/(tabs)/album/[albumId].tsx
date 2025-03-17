import { LinearGradient } from 'expo-linear-gradient';
import { Asset } from 'expo-media-library';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Text, View, Pressable, Image } from 'native-base';
import { FlatList, StyleSheet } from 'react-native';
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
        flexDirection="row"
        alignItems="center"
        onPress={() => {
          playSong(albumId as string, index);
          router.push('/(tabs)/music-player');
        }}>
        <Image
          source={selectedAlbum?.albumAvatar?.url}
          alt="avatar"
          w={10}
          h={10}
          borderRadius={10}
          mr={5}
        />
        <View flex={1}>
          <Text fontSize="xs" fontWeight={700}>
            {item.filename}
          </Text>
          <Text fontSize="xs">{durationToTime(item.duration)} min</Text>
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
    paddingBottom: 60, //* to make space for tab bar
  },
  gradient: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default AlbumDetailsScreen;
