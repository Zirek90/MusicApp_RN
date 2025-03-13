import { SongStatus } from '@enums';

export type CurrentSong = {
  id: string;
  filename: string;
  songStatus: SongStatus | null;
  duration: number;
  index: number;
  isLooping: boolean;
  isPlaying: boolean;
  albumName: string;
};
