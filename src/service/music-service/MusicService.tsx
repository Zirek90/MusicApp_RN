import { Audio } from 'expo-av';
import { StorageService } from '../storage-service';
import { SongStatus } from '@enums';
import { useMusicPlayerStore } from '@store';
import { CurrentSong } from '@types';

export const MusicService = {
  play: async (
    uri: string,
    currentSong: CurrentSong,
    setProgress: (progress: number) => void,
    setCurrentSong: (song: CurrentSong) => void,
    isReactivated: boolean = false,
    onEndCallback?: () => void,
  ) => {
    const updatedSong: CurrentSong = {
      ...currentSong,
      songStatus: SongStatus.PLAY,
    };
    setCurrentSong(updatedSong);

    const { sound } = await Audio.Sound.createAsync({ uri }, { shouldPlay: true }, async status => {
      if (status.isLoaded) {
        const totalDuration = status.durationMillis! / 1000;
        const currentPosition = status.positionMillis / 1000;
        const progress = (currentPosition / totalDuration) * 100;

        setProgress(progress);
        StorageService.set('songProgress', progress);

        if (status.didJustFinish && !status.isLooping) {
          setCurrentSong({ ...updatedSong, songStatus: SongStatus.STOP });
          onEndCallback?.();
        }
      }
    });

    if (isReactivated) {
      const savedProgress = await StorageService.get('songProgress');
      if (savedProgress) {
        const currentPosition = (savedProgress / 100) * currentSong.duration;
        await sound.setPositionAsync(currentPosition * 1000);
      }
    }

    await sound.playAsync();
    return sound;
  },
  stop: async (soundObject: Audio.Sound) => {
    await soundObject.stopAsync();
    await soundObject.unloadAsync();
    useMusicPlayerStore.setState(state => ({
      currentSong: state.currentSong
        ? { ...state.currentSong, songStatus: SongStatus.STOP, isPlaying: false }
        : null,
      song: null,
    }));
  },
  pause: async (soundObject: Audio.Sound) => {
    await soundObject.pauseAsync();
    useMusicPlayerStore.setState(state => ({
      currentSong: state.currentSong
        ? { ...state.currentSong, songStatus: SongStatus.PAUSE, isPlaying: false }
        : null,
    }));
  },
  resume: async (soundObject: Audio.Sound) => {
    await soundObject.playAsync();
    useMusicPlayerStore.setState(state => ({
      currentSong: state.currentSong
        ? { ...state.currentSong, songStatus: SongStatus.PLAY, isPlaying: true }
        : null,
    }));
  },
  seekTo: async (soundObject: Audio.Sound, time: number) => {
    if (soundObject) {
      await soundObject.setPositionAsync(time * 1000);
    }
  },
};
