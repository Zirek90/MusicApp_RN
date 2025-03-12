import { StyleSheet, Text } from 'react-native';
import { COLORS } from '@global';
import { CurrentSong } from '@types';

interface MusicPlayerInfoProps {
  currentSong: CurrentSong | null;
}

export function MusicPlayerInfo(props: MusicPlayerInfoProps) {
  const { currentSong } = props;
  if (!currentSong) return null;

  return (
    <>
      <Text style={styles.songTitle}>{currentSong.filename || 'No Song Playing'}</Text>
      <Text style={styles.albumText}>{currentSong.albumName || 'Unknown Album'}</Text>
    </>
  );
}

const styles = StyleSheet.create({
  songTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  albumText: {
    fontSize: 16,
    color: COLORS.gray_secondary,
    marginBottom: 20,
  },
});
