import { Box, HStack, Text, Slider } from 'native-base';
import { durationToTime } from '@utils';
import { INITIAL_MUSIC_POSITION } from '@constants';
import { useSongProgress } from './hook';
import { useMusicStore } from 'src/store';

export const SongProgress = () => {
  const songProgress = useMusicStore(state => state.songProgress);
  const handleSongProgress = useMusicStore(state => state.handleSongProgress);
  const duration = useMusicStore(state => state.currentSong.duration);
  const { currentValue, setIsDragActive, handleSliderChange, currentTimePositionRef } =
    useSongProgress({ songProgress, handleSongProgress, duration });

  return (
    <Box px={5} my={2}>
      <Slider
        value={currentValue}
        colorScheme="emerald"
        onTouchStart={() => setIsDragActive(true)}
        onChange={handleSliderChange}
        onChangeEnd={v => handleSliderChange(v, true)}>
        <Slider.Track>
          <Slider.FilledTrack />
        </Slider.Track>
        <Slider.Thumb />
      </Slider>
      <HStack justifyContent="space-between">
        <Text fontSize="lg">{currentTimePositionRef.current}</Text>
        <Text fontSize="lg">{duration ? durationToTime(duration) : INITIAL_MUSIC_POSITION}</Text>
      </HStack>
    </Box>
  );
};
