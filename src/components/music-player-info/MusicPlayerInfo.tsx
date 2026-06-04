import { memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { typography } from '@configs';
import { COLORS } from '@global';
import { CurrentSong } from '@types';

interface MusicPlayerInfoProps {
  currentSong: CurrentSong | null;
}

export const MusicPlayerInfo = memo((props: MusicPlayerInfoProps) => {
  const { currentSong } = props;

  if (!currentSong) {
    return (
      <Text style={[typography.base, typography.xxxl, typography.semibold]}>
        No song currently played
      </Text>
    );
  }

  return (
    <>
      <Text style={[typography.base, typography.xl, typography.semibold, styles.title]}>
        {currentSong.filename || 'No Song Playing'}
      </Text>
      <Text style={[typography.base, typography.lg, typography.semibold, styles.album]}>
        {currentSong.albumName || 'Unknown Album'}
      </Text>
    </>
  );
});

const styles = StyleSheet.create({
  title: { marginTop: 8 },
  album: { color: COLORS.gray_secondary, marginBottom: 20 },
});

MusicPlayerInfo.displayName = 'MusicPlayerInfo';
