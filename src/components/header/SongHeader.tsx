import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { typography } from '@configs';
import { COLORS } from '@global';
import { useAlbumStore } from '@store';
import { Album } from '@types';

interface SongHeaderProps {
  albumId: Album['albumId'];
}

export function SongHeader(props: SongHeaderProps) {
  const { albumId } = props;
  const albumList = useAlbumStore(state => state.albumList);
  const selectedAlbum = albumList.find(item => item.albumId === albumId);

  return (
    <View style={styles.container}>
      <MaterialIcons name="music-note" size={20} color={COLORS.white} />
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        style={[typography.base, typography.xl, typography.semibold, styles.title]}>
        {selectedAlbum?.albumName}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth: '80%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginLeft: 8,
  },
});
