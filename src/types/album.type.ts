import { Asset } from 'expo-media-library';

export type Album = {
  albumId?: string;
  albumName: string;
  items: Asset[];
};
