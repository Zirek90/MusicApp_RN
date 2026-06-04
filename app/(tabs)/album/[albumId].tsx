import { useCallback } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Asset } from 'expo-media-library/legacy';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  FlatList,
  Image,
  ImageSourcePropType,
  ListRenderItem,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { GradientWrapper } from '@components';
import { typography } from '@configs';
import { COLORS } from '@global';
import { useAlbumStore, useMusicManagerStore } from '@store';
import { durationToTime } from '@utils';

const GRADIENT_COLORS = [COLORS.gradient_primary, COLORS.gradient_secondary] as const;
const GRADIENT_START = { x: 0, y: 0 };
const GRADIENT_END = { x: 0.5, y: 1 };

interface SongRowProps {
  item: Asset;
  index: number;
  avatar: ImageSourcePropType | undefined;
  onPress: (index: number) => void;
}

function SongRow({ item, index, avatar, onPress }: SongRowProps) {
  const handlePress = useCallback(() => onPress(index), [index, onPress]);

  return (
    <LinearGradient
      colors={GRADIENT_COLORS}
      start={GRADIENT_START}
      end={GRADIENT_END}
      style={styles.gradient}>
      <Pressable style={styles.row} onPress={handlePress}>
        <Image source={avatar} style={styles.avatar} accessibilityLabel="avatar" />
        <View style={styles.info}>
          <Text style={[typography.base, typography.xs, typography.bold]}>{item.filename}</Text>
          <Text style={[typography.base, typography.xs]}>{durationToTime(item.duration)} min</Text>
        </View>
      </Pressable>
    </LinearGradient>
  );
}

const keyExtractor = (item: Asset) => item.id;

function AlbumDetailsScreen() {
  const { albumId } = useLocalSearchParams<{ albumId: string }>();
  const albumList = useAlbumStore(state => state.albumList);
  const playSong = useMusicManagerStore(state => state.playSong);
  const router = useRouter();

  const selectedAlbum = albumList.find(item => item.albumId === albumId);
  const avatar = selectedAlbum?.albumAvatar?.url;

  const handleSelectSong = useCallback(
    (index: number) => {
      playSong(albumId, index);
      router.push('/(tabs)/music-player');
    },
    [albumId, playSong, router],
  );

  const renderSongItem = useCallback<ListRenderItem<Asset>>(
    ({ item, index }) => (
      <SongRow item={item} index={index} avatar={avatar} onPress={handleSelectSong} />
    ),
    [avatar, handleSelectSong],
  );

  return (
    <GradientWrapper>
      <FlatList
        data={selectedAlbum?.items ?? []}
        keyExtractor={keyExtractor}
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

export default AlbumDetailsScreen;
