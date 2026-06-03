import { create } from 'zustand';
import { useAlbumStore } from './useAlbumStore';
import { SongStatus } from '@enums';
import { useMusicPlayerStore } from './useMusicStore';

interface MusicManagerStore {
  activeAlbum: string | null;
  playSong: (albumName: string, songIndex: number) => void;
  nextSong: () => void;
  previousSong: () => void;
}

export const useMusicManagerStore = create<MusicManagerStore>((set, get) => ({
  activeAlbum: null,

  playSong: (albumName, songIndex) => {
    const album = useAlbumStore.getState().albumList.find(a => a.album === albumName);
    if (!album) return;

    const song = album.items[songIndex];
    if (!song) return;

    useMusicPlayerStore.getState().handlePlay(
      {
        id: song.id,
        filename: song.filename,
        songStatus: SongStatus.PLAY,
        duration: song.duration,
        index: songIndex,
      },
      song.uri,
    );

    set({ activeAlbum: albumName });
  },

  nextSong: () => {
    const { activeAlbum, playSong } = get();
    if (!activeAlbum) return;

    const album = useAlbumStore.getState().albumList.find(a => a.album === activeAlbum);
    if (!album) return;

    const currentIndex = useMusicPlayerStore.getState().currentSong?.index || 0;
    const nextIndex = (currentIndex + 1) % album.items.length;

    playSong(activeAlbum, nextIndex);
  },

  previousSong: () => {
    const { activeAlbum, playSong } = get();
    if (!activeAlbum) return;

    const album = useAlbumStore.getState().albumList.find(a => a.album === activeAlbum);
    if (!album) return;

    const currentIndex = useMusicPlayerStore.getState().currentSong?.index || 0;
    const prevIndex = currentIndex === 0 ? album.items.length - 1 : currentIndex - 1;

    playSong(activeAlbum, prevIndex);
  },
}));
