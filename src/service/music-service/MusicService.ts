import { AudioPlayer, AudioStatus, createAudioPlayer } from 'expo-audio';
import { StorageService } from '../storage-service';
import { SongStatus } from '@enums';
import { CurrentSong } from '@types';

type Subscription = { remove: () => void };

const subscriptions = new WeakMap<AudioPlayer, Subscription>();

const detachListener = (player: AudioPlayer) => {
  const subscription = subscriptions.get(player);
  if (subscription) {
    subscription.remove();
    subscriptions.delete(player);
  }
};

export const MusicService = {
  play: async (
    uri: string,
    updatedSong: CurrentSong,
    setProgress: (progress: number) => void,
    setCurrentSong: (song: CurrentSong) => void,
    existingPlayer: AudioPlayer | null,
    isReactivated: boolean = false,
    onEndCallback?: () => void,
  ): Promise<AudioPlayer> => {
    setCurrentSong(updatedSong);

    let player: AudioPlayer;
    if (existingPlayer) {
      detachListener(existingPlayer);
      existingPlayer.replace({ uri });
      player = existingPlayer;
    } else {
      player = createAudioPlayer({ uri });
    }

    const handleStatus = (status: AudioStatus) => {
      if (!status.isLoaded) return;

      const totalDuration = status.duration;
      const progress = totalDuration > 0 ? (status.currentTime / totalDuration) * 100 : 0;

      if (!isReactivated || progress !== 0) {
        setProgress(progress);
      }

      if (status.didJustFinish && !status.loop) {
        setCurrentSong({ ...updatedSong, songStatus: SongStatus.STOP });
        onEndCallback?.();
      }
    };

    subscriptions.set(player, player.addListener('playbackStatusUpdate', handleStatus));

    if (isReactivated) {
      const savedProgress = await StorageService.get('songProgress');
      if (savedProgress) {
        const currentPosition = (savedProgress / 100) * updatedSong.duration;
        await player.seekTo(currentPosition);
      }
    }

    player.play();
    return player;
  },
  stop: async (player: AudioPlayer) => {
    detachListener(player);
    player.pause();
    player.remove();
  },
  pause: async (player: AudioPlayer) => {
    player.pause();
  },
  resume: async (player: AudioPlayer) => {
    player.play();
  },
  seekTo: async (player: AudioPlayer, time: number) => {
    if (player) {
      await player.seekTo(time);
    }
  },
};
