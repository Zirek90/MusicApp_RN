import { create } from 'zustand';
import { useAlbumStore } from './useAlbumStore';
import { useMusicPlayerStore } from './useMusicStore';
import { SongStatus } from '@enums';
import { Album, CurrentSong } from '@types';

export interface MusicManagerStore {
  activeAlbumId: string | null;
  playSong: (albumId: Album['albumId'], songIndex: number) => void;
  nextSong: () => void;
  previousSong: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export const useMusicManagerStore = create<MusicManagerStore>((set, get) => ({
  activeAlbumId: null,
  isFirst: false,
  isLast: false,

  playSong: (albumId, songIndex) => {
    const album = useAlbumStore.getState().albumList.find(a => a.albumId === albumId);
    if (!album) return;

    const song = album.items[songIndex];
    if (!song) return;

    const currentSong: CurrentSong = {
      id: song.id,
      filename: song.filename,
      songStatus: SongStatus.PLAY,
      duration: song.duration,
      index: songIndex,
      isLooping: false,
      isPlaying: true,
      albumName: album.albumName,
    };

    useMusicPlayerStore.getState().handlePlay(currentSong, song.uri);

    set({
      activeAlbumId: album.albumId,
      isFirst: songIndex === 0,
      isLast: songIndex === album.items.length - 1,
    });
  },
  nextSong: () => {
    const { playSong, activeAlbumId } = get();
    if (!activeAlbumId) return;
    const currentSong = useMusicPlayerStore.getState().currentSong;
    if (!currentSong) return;

    const album = useAlbumStore.getState().albumList.find(a => a.albumId === activeAlbumId);
    if (!album) return;

    const currentIndex = currentSong.index;
    const nextIndex = currentIndex + 1;

    playSong(album.albumId, nextIndex);
  },
  previousSong: () => {
    const { activeAlbumId, playSong } = get();
    if (!activeAlbumId) return;
    const currentSong = useMusicPlayerStore.getState().currentSong;
    if (!currentSong) return;

    const album = useAlbumStore.getState().albumList.find(a => a.albumId === activeAlbumId);
    if (!album) return;

    const currentIndex = currentSong.index;
    const prevIndex = currentIndex - 1;

    playSong(album.albumId, prevIndex);
  },
}));
