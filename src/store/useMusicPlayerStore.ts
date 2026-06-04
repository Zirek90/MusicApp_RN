import { AudioPlayer } from 'expo-audio';
import { create } from 'zustand';
import { SongStatus } from '@enums';
import { ForegroundServiceManager, MusicService, StorageService } from '@service';
import { CurrentSong } from '@types';

export interface MusicPlayerStore {
  player: AudioPlayer | null;
  songProgress: number;
  currentSong: CurrentSong | null;
  restorePlayerState: () => void;
  handlePlay: (
    songData: CurrentSong,
    uri: string,
    nextSong: () => void,
    reactivated?: boolean,
  ) => Promise<void>;
  handlePause: () => Promise<void>;
  handleResume: (nextSong: () => void) => Promise<void>;
  handleStop: () => Promise<void>;
  seekTo: (progress: number) => void;
}

export const useMusicPlayerStore = create<MusicPlayerStore>((set, get) => ({
  player: null,
  songProgress: 0,
  currentSong: null,

  restorePlayerState: async () => {
    const storedData = await StorageService.getAll();
    if (storedData?.currentSong) {
      set({
        currentSong: storedData.currentSong as CurrentSong,
        songProgress: Number(storedData.songProgress) || 0,
      });
    }
  },
  handlePlay: async (songData, uri, nextSong, reactivated = false) => {
    const { player } = get();

    const setProgress = (progress: number) => set({ songProgress: progress });
    const setCurrentSong = (updatedSong: CurrentSong) =>
      set(state => ({
        currentSong: {
          ...state.currentSong,
          ...updatedSong,
          uri,
          albumName: songData.albumName,
          isPlaying: true,
          songStatus: SongStatus.PLAY,
        },
      }));

    const newPlayer = await MusicService.play(
      uri,
      songData,
      setProgress,
      setCurrentSong,
      player,
      reactivated,
      nextSong,
    );

    ForegroundServiceManager.updateIsPlaying(true);
    set({ player: newPlayer, currentSong: { ...songData, isPlaying: true } });

    StorageService.set('currentSong', {
      ...songData,
      songStatus: SongStatus.PAUSE,
      isPlaying: false,
    });
  },
  handlePause: async () => {
    const { player, currentSong } = get();
    if (!player) return;
    await MusicService.pause(player);

    ForegroundServiceManager.updateIsPlaying(false);
    await ForegroundServiceManager.stopService();
    set({ currentSong: { ...currentSong!, songStatus: SongStatus.PAUSE, isPlaying: false } });
  },
  handleResume: async nextSong => {
    const { player, currentSong, handlePlay } = get();
    if (!currentSong) return;
    if (!player) {
      await handlePlay(currentSong, currentSong.uri, nextSong, true);
      return;
    }

    ForegroundServiceManager.updateIsPlaying(true);
    await MusicService.resume(player);
    set({ currentSong: { ...currentSong, songStatus: SongStatus.PLAY, isPlaying: true } });
  },
  handleStop: async () => {
    const { player } = get();
    if (player) {
      await MusicService.stop(player);
      ForegroundServiceManager.updateIsPlaying(false);
      await ForegroundServiceManager.stopService();

      set({ player: null, currentSong: null, songProgress: 0 });
      StorageService.remove('currentSong');
      StorageService.remove('songProgress');
    }
  },
  seekTo: progress => {
    const { player, currentSong } = get();
    if (!currentSong || !player) return;

    const newTime = (progress / 100) * currentSong.duration;
    MusicService.seekTo(player, newTime);

    set({ songProgress: progress });
    StorageService.set('songProgress', progress);
  },
}));
