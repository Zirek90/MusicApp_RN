import { create } from 'zustand';
import * as MediaLibrary from 'expo-media-library';
import { getExtension, getDirectory } from '@utils';
import { StorageService } from '@service';

const MIN_MUSIC_DURATION = 5;
const AVAILABLE_EXTENSIONS = ['mp3', 'wav', 'm4a'];

export interface Album {
  album: string;
  items: MediaLibrary.Asset[];
}

interface AlbumStore {
  albumList: Album[];
  fetchMusicAssets: () => Promise<void>;
}

export const useAlbumStore = create<AlbumStore>(set => ({
  albumList: [],

  fetchMusicAssets: async () => {
    const media = await MediaLibrary.getAssetsAsync({
      mediaType: MediaLibrary.MediaType.audio,
    });

    const fullMedia = await MediaLibrary.getAssetsAsync({
      first: media.totalCount,
      mediaType: MediaLibrary.MediaType.audio,
    });

    const validFiles = fullMedia.assets.filter(
      file =>
        file.duration > MIN_MUSIC_DURATION &&
        AVAILABLE_EXTENSIONS.includes(getExtension(file.filename)),
    );

    const sortedFiles = validFiles.sort((a, b) => a.filename.localeCompare(b.filename));

    const assignFilesToDirectories = (files: MediaLibrary.Asset[]) => {
      return files.reduce<Album[]>((acc, file) => {
        const directory = getDirectory(file.uri);
        const foundDirectory = acc.find(d => d.album === directory);

        if (foundDirectory) {
          return acc.map(item =>
            item.album === directory ? { ...item, items: [...item.items, file] } : item,
          );
        }
        return [...acc, { album: directory, items: [file] }];
      }, []);
    };

    set({ albumList: assignFilesToDirectories(sortedFiles) });
  },
}));
