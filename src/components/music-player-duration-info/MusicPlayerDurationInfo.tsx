import { StyleSheet, Text, View } from 'react-native';
import { typography } from '@configs';
import { MusicPlayerStore } from '@store';
import { calculateCurrentTime, durationToTime } from '@utils';

interface MusicPlayerDurationInfoProps {
  songProgress: MusicPlayerStore['songProgress'];
  duration: number;
}

export function MusicPlayerDurationInfo(props: MusicPlayerDurationInfoProps) {
  const { songProgress, duration } = props;

  return (
    <View style={styles.container}>
      <Text style={[typography.base, typography.md]}>
        {calculateCurrentTime(duration, songProgress)}
      </Text>
      <Text style={[typography.base, typography.md]}>{durationToTime(duration)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
});
