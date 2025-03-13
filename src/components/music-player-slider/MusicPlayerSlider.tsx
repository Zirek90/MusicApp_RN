import { useState, useRef, useEffect } from 'react';
import { Box, Slider } from 'native-base';
import { MusicPlayerStore } from '@store';

interface MusicPlayerSliderProps {
  songProgress: MusicPlayerStore['songProgress'];
  seekTo: MusicPlayerStore['seekTo'];
}

export function MusicPlayerSlider(props: MusicPlayerSliderProps) {
  const { songProgress, seekTo } = props;
  const [localProgress, setLocalProgress] = useState(songProgress);
  const isDragging = useRef(false);

  useEffect(() => {
    if (!isDragging.current) {
      setLocalProgress(songProgress);
    }
  }, [songProgress]);

  function handleOnChange(value: number) {
    isDragging.current = true;
    setLocalProgress(value);
  }

  function handleOnChangeEnd(value: number) {
    isDragging.current = false;
    seekTo(value);
  }

  return (
    <Box px={5} my={2} w={'90%'}>
      <Slider
        value={localProgress}
        minValue={0}
        maxValue={100}
        colorScheme="emerald"
        onChange={handleOnChange}
        onChangeEnd={handleOnChangeEnd}>
        <Slider.Track>
          <Slider.FilledTrack />
        </Slider.Track>
        <Slider.Thumb />
      </Slider>
    </Box>
  );
}
