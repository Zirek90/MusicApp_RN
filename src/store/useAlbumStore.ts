import * as MediaLibrary from 'expo-media-library/legacy';
import { create } from 'zustand';
import { AVAILABLE_EXTENSIONS, AVATAR_IMAGES, MIN_MUSIC_DURATION } from '@constants';
import { Album } from '@types';
import { getDirectory, getExtension } from '@utils';

interface AlbumStore {
  albumList: Album[];
  fetchMusicAssets: () => Promise<void>;
}

const isValidAudioFile = (file: MediaLibrary.Asset) =>
  Number(file.duration) > MIN_MUSIC_DURATION &&
  AVAILABLE_EXTENSIONS.includes(getExtension(file.filename));

const groupFilesIntoAlbums = (files: MediaLibrary.Asset[]): Album[] => {
  const albums: Album[] = [];
  const albumIndexById = new Map<Album['albumId'], number>();

  for (const file of files) {
    const existingIndex = albumIndexById.get(file.albumId);

    if (existingIndex !== undefined) {
      albums[existingIndex]!.items.push(file);
      continue;
    }

    const avatar = AVATAR_IMAGES[Math.min(albums.length, AVATAR_IMAGES.length - 1)]!;
    albumIndexById.set(file.albumId, albums.length);
    albums.push({
      albumName: getDirectory(file.uri),
      albumId: file.albumId,
      items: [file],
      albumAvatar: { url: avatar.url, name: avatar.name },
    });
  }

  return albums;
};

export const useAlbumStore = create<AlbumStore>(set => ({
  albumList: [],

  fetchMusicAssets: async () => {
    try {
      const media = await MediaLibrary.getAssetsAsync({
        mediaType: MediaLibrary.MediaType.audio,
      });

      const fullMedia = await MediaLibrary.getAssetsAsync({
        first: media.totalCount,
        mediaType: MediaLibrary.MediaType.audio,
      });

      const sortedFiles = fullMedia.assets
        .filter(isValidAudioFile)
        .sort((a, b) => a.filename.localeCompare(b.filename));

      set({ albumList: groupFilesIntoAlbums(sortedFiles) });
    } catch (error) {
      console.error('Error fetching music assets', error);
    }
  },
}));
