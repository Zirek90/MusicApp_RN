import { create } from 'zustand';
import { Audio } from 'expo-av';
import { SongStatus } from '@enums';
import { MusicService } from '@service';

interface CurrentSong {
  id: string;
  filename: string;
  songStatus: SongStatus | null;
  duration: number;
  index: number;
}

interface MusicPlayerStore {
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
  currentSong: null,

  handlePlay: async (songData, uri) => {
    const { song, currentSong } = get();
    const { handleStop } = useMusicPlayerStore.getState();

    // Stop the current song if it's playing a different song
    if (song && currentSong?.id !== songData.id) {
      await handleStop(); // Stop the current song gracefully before starting a new one
    }

    const newSound = await MusicService.play(
      uri,
      progress => set({ songProgress: progress }), // Update song progress
      updatedSong => set({ currentSong: updatedSong }), // Ensure updatedSong is of type CurrentSong
      songData.duration, // Pass the song's duration
      false, // Not reactivated yet
    );

    set({
      song: newSound,
      currentSong: songData, // Set the new current song details
    });
  },

  handlePause: async () => {
    const { song, currentSong } = get();
    if (!song) return;
    await MusicService.pause(song);
    set({ currentSong: { ...currentSong!, songStatus: SongStatus.PAUSE } });
  },

  handleResume: async () => {
    const { song, currentSong } = get();
    if (song) {
      await MusicService.resume(song);
      set({ currentSong: { ...currentSong!, songStatus: SongStatus.PLAY } });
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
