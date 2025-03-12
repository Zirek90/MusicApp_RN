import { Audio } from 'expo-av';
import { StorageService } from '../StorageService';
import { CurrentSong } from '@types';
import { calculateProgress, calculateSongPosition } from '@utils';

export const MusicService = {
  play: async (
    uri: string,
    setProgress: (v: number) => void,
    setCurrentSong: (v: CurrentSong) => void, // Ensure setCurrentSong expects a CurrentSong
    currentSongDuration: number,
    isReactivated: boolean = false,
  ) => {
    // Reset the song state to not finished when the song starts playing
    const newCurrentSong: CurrentSong = {
      id: '',
      filename: '',
      isLooping: false,
      songStatus: null,
      isSongDone: false,
      duration: currentSongDuration,
      index: 0,
    };
    setCurrentSong(newCurrentSong); // Directly set the updated song details

    const { sound } = await Audio.Sound.createAsync(
      { uri },
      { shouldPlay: false },
      async status => {
        if (status.isLoaded) {
          if (!status.positionMillis && isReactivated) {
            return; // Skip flickering effect when reactivating
          }

          const totalDuration = status.durationMillis! / 1000;
          const currentPosition = status.positionMillis / 1000;
          const timeLeft = calculateProgress(totalDuration, currentPosition);
          setProgress(timeLeft); // Update the progress state
          StorageService.set('songProgress', timeLeft); // Store progress

          if (status.didJustFinish && !status.isLooping) {
            // Mark the song as finished when it finishes playing
            setCurrentSong({
              ...newCurrentSong, // Keep other details intact (optional)
              isSongDone: true, // Set the song as done
            });
          }
        }
      },
    );

    // Handle song reactivation (set the position when reactivating)
    if (isReactivated) {
      const progress = await StorageService.get('songProgress');
      if (progress) {
        const currentPosition = calculateSongPosition(progress, currentSongDuration);
        await sound.setPositionAsync(currentPosition); // Set position to resume
      }
    }

    // Play the song
    await sound.playAsync();
    return sound;
  },

  // Stop method to stop and unload the sound
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

  loop: async (soundObject: Audio.Sound) => {
    const currentSong = await soundObject.getStatusAsync();
    if (currentSong.isLoaded) {
      const isLooping = currentSong.isLooping;
      await soundObject.setStatusAsync({ isLooping: !isLooping });
    }
  },
};
