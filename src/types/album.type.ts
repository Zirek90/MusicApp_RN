import { Asset } from 'expo-media-library';
import { ImageSourcePropType } from 'react-native';

export type Album = {
  albumId?: string;
  albumName: string;
  albumAvatar?: {
    url: ImageSourcePropType | undefined;
    name: string;
  };
  items: Asset[];
};
