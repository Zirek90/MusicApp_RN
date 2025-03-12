import { Asset } from 'expo-media-library';

export type Album = {
  albumId?: string;
  album: string;
  items: Asset[];
};
