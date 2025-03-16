import { MaterialIcons } from '@expo/vector-icons';
import { View, Text } from 'native-base';
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
    <View maxW="80%" flexDirection="row" alignItems="center">
      <MaterialIcons name="music-note" size={20} color="white" />
      <Text numberOfLines={1} ellipsizeMode="tail" fontSize="xl" fontWeight={600} marginLeft={2}>
        {selectedAlbum?.albumName}
      </Text>
    </View>
  );
}
