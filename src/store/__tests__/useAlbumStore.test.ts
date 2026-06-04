import * as MediaLibrary from 'expo-media-library/legacy';
import { useAlbumStore } from '../useAlbumStore';

jest.mock('expo-media-library/legacy', () => ({
  MediaType: { audio: 'audio' },
  getAssetsAsync: jest.fn(),
}));

const getAssetsAsync = MediaLibrary.getAssetsAsync as jest.Mock;

const asset = (overrides: Record<string, unknown>) => ({
  id: 'id',
  uri: 'file:///Music/AlbumA/song.mp3',
  filename: 'song.mp3',
  duration: 120,
  albumId: 'A',
  ...overrides,
});

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => undefined);
  useAlbumStore.setState({ albumList: [] });
});

afterEach(() => {
  jest.restoreAllMocks();
  getAssetsAsync.mockReset();
});

describe('useAlbumStore.fetchMusicAssets', () => {
  it('filters by duration and extension and groups by album', async () => {
    const assets = [
      asset({ id: '1', filename: '02.mp3', uri: 'file:///Music/AlbumA/02.mp3', albumId: 'A' }),
      asset({ id: '2', filename: '01.flac', uri: 'file:///Music/AlbumA/01.flac', albumId: 'A' }),
      asset({ id: '3', filename: 'short.mp3', albumId: 'A', duration: 10 }),
      asset({ id: '4', filename: 'clip.wav', uri: 'file:///Music/AlbumA/clip.wav', albumId: 'A' }),
      asset({ id: '5', filename: '01.mp3', uri: 'file:///Music/AlbumB/01.mp3', albumId: 'B' }),
    ];
    getAssetsAsync
      .mockResolvedValueOnce({ totalCount: assets.length })
      .mockResolvedValueOnce({ assets });

    await useAlbumStore.getState().fetchMusicAssets();
    const { albumList } = useAlbumStore.getState();

    expect(albumList).toHaveLength(2);
    const albumA = albumList.find(a => a.albumId === 'A');
    const albumB = albumList.find(a => a.albumId === 'B');
    expect(albumA?.items).toHaveLength(2);
    expect(albumB?.items).toHaveLength(1);
    expect(albumA?.albumName).toBe('AlbumA');
    expect(albumA?.albumAvatar?.name).toBeDefined();
  });

  it('sorts files by filename before grouping', async () => {
    const assets = [
      asset({ id: 'b', filename: 'b.mp3', uri: 'file:///Music/Mix/b.mp3', albumId: 'M' }),
      asset({ id: 'a', filename: 'a.mp3', uri: 'file:///Music/Mix/a.mp3', albumId: 'M' }),
    ];
    getAssetsAsync
      .mockResolvedValueOnce({ totalCount: assets.length })
      .mockResolvedValueOnce({ assets });

    await useAlbumStore.getState().fetchMusicAssets();
    const album = useAlbumStore.getState().albumList[0];

    expect(album?.items.map(item => item.filename)).toEqual(['a.mp3', 'b.mp3']);
  });

  it('leaves the list unchanged when the media query throws', async () => {
    getAssetsAsync.mockRejectedValueOnce(new Error('denied'));

    await useAlbumStore.getState().fetchMusicAssets();

    expect(useAlbumStore.getState().albumList).toEqual([]);
  });
});
