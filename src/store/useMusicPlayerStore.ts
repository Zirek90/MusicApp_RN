import { Audio } from 'expo-av';
import { create } from 'zustand';
import { useMusicManagerStore } from './useMusicManagerStore';
import { SongStatus } from '@enums';
import { MusicService, StorageService } from '@service';
import { CurrentSong } from '@types';

export interface MusicPlayerStore {
  song: Audio.Sound | null;
  songProgress: number;
  currentSong: CurrentSong | null;
  restorePlayerState: () => void;
  handlePlay: (songData: CurrentSong, uri: string, reactivated?: boolean) => Promise<void>;
  handlePause: () => Promise<void>;
  handleResume: () => Promise<void>;
  handleStop: () => Promise<void>;
  seekTo: (progress: number) => void;
}

export const useMusicPlayerStore = create<MusicPlayerStore>((set, get) => ({
  song: null,
  songProgress: 0,
  isPlaying: false,
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
  handlePlay: async (songData, uri, reactivated = false) => {
    const { song, currentSong, handleStop } = get();
    const { nextSong } = useMusicManagerStore.getState();

    if (song && currentSong?.id !== songData.id) {
      await handleStop();
    }

    const newSound = await MusicService.play(
      uri,
      songData,
      (progress: number) => set({ songProgress: progress }),
      (updatedSong: CurrentSong) => {
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
      },
      reactivated,
      nextSong,
    );

    set({
      song: newSound,
      currentSong: { ...songData, isPlaying: true },
    });
    StorageService.set('currentSong', {
      ...songData,
      songStatus: SongStatus.PAUSE,
      isPlaying: false,
    });
  },
  handlePause: async () => {
    const { song, currentSong } = get();
    if (!song) return;
    await MusicService.pause(song);
    set({ currentSong: { ...currentSong!, songStatus: SongStatus.PAUSE, isPlaying: false } });
  },
  handleResume: async () => {
    const { song, currentSong, handlePlay } = get();
    if (!currentSong) return;
    if (!song) {
      await handlePlay(currentSong, currentSong.uri, true);
      return;
    }

    await MusicService.resume(song);
    set({ currentSong: { ...currentSong!, songStatus: SongStatus.PLAY, isPlaying: true } });
  },
  handleStop: async () => {
    const { song } = get();
    if (song) {
      await MusicService.stop(song);
      set({ song: null, currentSong: null, songProgress: 0 });
      StorageService.remove('currentSong');
      StorageService.remove('songProgress');
    }
  },
  seekTo: progress => {
    const { song, currentSong } = get();
    if (!currentSong || !song) return;

    const newTime = (progress / 100) * currentSong.duration;
    MusicService.seekTo(song, newTime);

    set({ songProgress: progress });
    StorageService.set('songProgress', progress);
  },
}));
