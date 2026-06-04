import { create } from 'zustand';
import { useAlbumStore } from './useAlbumStore';
import { useMusicPlayerStore } from './useMusicPlayerStore';
import { SongStatus } from '@enums';
import { ForegroundServiceManager, StorageService } from '@service';
import { Album, CurrentSong } from '@types';

export interface MusicManagerStore {
  activeAlbumId: string | null;
  restoreManagerState: () => void;
  playSong: (albumId: Album['albumId'], songIndex: number) => void;
  nextSong: () => void;
  previousSong: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const getAlbumById = (albumId: Album['albumId']) =>
  useAlbumStore.getState().albumList.find(album => album.albumId === albumId);

const getActiveSong = () => useMusicPlayerStore.getState().currentSong;

export const useMusicManagerStore = create<MusicManagerStore>((set, get) => ({
  activeAlbumId: null,
  isFirst: false,
  isLast: false,

  restoreManagerState: async () => {
    const activeAlbumId = await StorageService.get('activeAlbumId');
    if (activeAlbumId) {
      set({ activeAlbumId });
    }
  },
  playSong: async (albumId, songIndex) => {
    const { nextSong } = get();
    const album = getAlbumById(albumId);
    if (!album) return;

    const song = album.items[songIndex];
    if (!song) return;

    const currentSong: CurrentSong = {
      id: song.id,
      uri: song.uri,
      filename: song.filename,
      songStatus: SongStatus.PLAY,
      duration: song.duration,
      index: songIndex,
      isPlaying: true,
      albumName: album.albumName,
    };

    useMusicPlayerStore.getState().handlePlay(currentSong, song.uri, nextSong);
    set({
      activeAlbumId: album.albumId,
      isFirst: songIndex === 0,
      isLast: songIndex === album.items.length - 1,
    });

    if (album.albumAvatar) {
      ForegroundServiceManager.updateSongData(
        song.filename,
        album.albumName,
        album.albumAvatar.name,
      );
    }
    StorageService.set('activeAlbumId', album.albumId);
  },
  nextSong: () => {
    const { playSong, activeAlbumId } = get();
    if (!activeAlbumId) return;

    const currentSong = getActiveSong();
    if (!currentSong) return;

    const album = getAlbumById(activeAlbumId);
    if (!album) return;

    playSong(album.albumId, currentSong.index + 1);
  },
  previousSong: () => {
    const { playSong, activeAlbumId } = get();
    if (!activeAlbumId) return;

    const currentSong = getActiveSong();
    if (!currentSong) return;

    const album = getAlbumById(activeAlbumId);
    if (!album) return;

    playSong(album.albumId, currentSong.index - 1);
  },
}));
