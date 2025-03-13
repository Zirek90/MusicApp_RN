import { MaterialIcons } from '@expo/vector-icons';
import { Text } from 'native-base';
import { StyleSheet, View } from 'react-native';
import { COLORS } from '@global';
import { useAlbumStore } from '@store';
import { Album } from '@types';

interface SongHeaderProps {
  albumId: Album['albumId'];
}

export function SongHeader(props: SongHeaderProps) {
  const { albumId } = props;
  const { albumList } = useAlbumStore();
  const selectedAlbum = albumList.find(item => item.albumId === albumId);

  return (
    <View style={styles.header}>
      <MaterialIcons name="music-note" size={20} color="white" />
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.headerText}>
        {selectedAlbum?.albumName}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    maxWidth: '80%',
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerText: {
    marginLeft: 10,
    color: COLORS.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
