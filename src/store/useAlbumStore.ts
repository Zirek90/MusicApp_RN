import * as MediaLibrary from 'expo-media-library';
import { create } from 'zustand';
import { AVATAR_IMAGES } from '@constants';
import { Album } from '@types';
import { getExtension, getDirectory } from '@utils';

const MIN_MUSIC_DURATION = 5;
const AVAILABLE_EXTENSIONS = ['mp3', 'wav', 'm4a'];

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

    const assignFilesToAlbums = (files: MediaLibrary.Asset[]) => {
      return files.reduce<Album[]>((acc, file) => {
        const directory = getDirectory(file.uri);
        const foundAlbum = acc.find(album => album.albumId === file.albumId);

        if (foundAlbum) {
          return acc.map(album =>
            album.albumId === file.albumId ? { ...album, items: [...album.items, file] } : album,
          );
        }

        // Assign avatar to albums - If more albums than avatars, use the last avatar
        const avatarIndex = Math.min(acc.length, AVATAR_IMAGES.length - 1);
        const albumAvatar = AVATAR_IMAGES[avatarIndex];

        return [
          ...acc,
          { albumName: directory, albumId: file.albumId, items: [file], albumAvatar },
        ];
      }, []);
    };

    set({ albumList: assignFilesToAlbums(sortedFiles) });
  },
}));
