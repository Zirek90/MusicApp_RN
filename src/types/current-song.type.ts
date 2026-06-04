import { SongStatus } from '@enums';

export type CurrentSong = {
  id: string;
  uri: string;
  filename: string;
  songStatus: SongStatus | null;
  duration: number;
  index: number;
  isPlaying: boolean;
  albumName: string;
};
