import { Audio } from 'expo-av';
import { StorageService } from '../storage-service';
import { SongStatus } from '@enums';
import { CurrentSong } from '@types';

export const MusicService = {
  play: async (
    uri: string,
    updatedSong: CurrentSong,
    setProgress: (progress: number) => void,
    setCurrentSong: (song: CurrentSong) => void,
    song: Audio.Sound | null,
    isReactivated: boolean = false,
    onEndCallback?: () => void,
  ) => {
    if (song) {
      await song.unloadAsync();
    }

    setCurrentSong(updatedSong);

    const { sound } = await Audio.Sound.createAsync({ uri }, { shouldPlay: true }, async status => {
      if (status.isLoaded) {
        const totalDuration = status.durationMillis! / 1000;
        const currentPosition = status.positionMillis / 1000;
        const progress = (currentPosition / totalDuration) * 100;

        // To avoid flickering effect
        if (!isReactivated || (isReactivated && progress !== 0)) {
          setProgress(progress);
        }

        if (status.didJustFinish && !status.isLooping) {
          setCurrentSong({ ...updatedSong, songStatus: SongStatus.STOP });
          onEndCallback?.();
        }
      }
    });

    if (isReactivated) {
      const savedProgress = await StorageService.get('songProgress');
      if (savedProgress) {
        const currentPosition = (savedProgress / 100) * updatedSong.duration;
        await sound.setPositionAsync(currentPosition * 1000);
      }
    }

    await sound.playAsync();
    return sound;
  },
  stop: async (soundObject: Audio.Sound) => {
    await soundObject.stopAsync();
    await soundObject.unloadAsync();
  },
  pause: async (soundObject: Audio.Sound) => {
    await soundObject.pauseAsync();
  },
  resume: async (soundObject: Audio.Sound) => {
    await soundObject.playAsync();
  },
  seekTo: async (soundObject: Audio.Sound, time: number) => {
    if (soundObject) {
      await soundObject.setPositionAsync(time * 1000);
    }
  },
};
