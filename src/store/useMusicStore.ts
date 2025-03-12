import { Audio } from 'expo-av';
import { create } from 'zustand';
import { SongStatus } from '@enums';
import { MusicService } from '@service';
import { CurrentSong } from '@types';

export interface MusicPlayerStore {
  song: Audio.Sound | null;
  songProgress: number;
  currentSong: CurrentSong | null;
  handlePlay: (songData: CurrentSong, uri: string) => Promise<void>;
  handlePause: () => Promise<void>;
  handleResume: () => Promise<void>;
  handleStop: () => Promise<void>;
}

export const useMusicPlayerStore = create<MusicPlayerStore>((set, get) => ({
  song: null,
  songProgress: 0,
  isPlaying: false,
  currentSong: null,

  handlePlay: async (songData, uri) => {
    const { song, currentSong } = get();
    const { handleStop } = useMusicPlayerStore.getState();

    if (song && currentSong?.id !== songData.id) {
      await handleStop();
    }
    const newSound = await MusicService.play(
      uri,
      progress => set({ songProgress: progress }),
      updatedSong =>
        set({
          currentSong: {
            ...updatedSong,
            albumName: songData.albumName,
            isPlaying: true,
          },
        }),
      songData.duration,
      false,
    );

    set({
      song: newSound,
      currentSong: songData,
    });
  },
  handlePause: async () => {
    const { song, currentSong } = get();
    if (!song) return;
    await MusicService.pause(song);
    set({ currentSong: { ...currentSong!, songStatus: SongStatus.PAUSE, isPlaying: false } });
  },
  handleResume: async () => {
    const { song, currentSong } = get();
    if (song) {
      await MusicService.resume(song);
      set({ currentSong: { ...currentSong!, songStatus: SongStatus.PLAY, isPlaying: true } });
    }
  },
  handleStop: async () => {
    const { song } = get();
    if (song) {
      await MusicService.stop(song);
      set({ song: null, currentSong: null, songProgress: 0 });
    }
  },
}));
