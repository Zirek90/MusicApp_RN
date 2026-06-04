import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageService } from '../StorageService';

jest.mock('@react-native-async-storage/async-storage', () =>
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

beforeEach(async () => {
  await AsyncStorage.clear();
  jest.spyOn(console, 'error').mockImplementation(() => undefined);
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('StorageService', () => {
  it('round-trips a numeric value', async () => {
    await StorageService.set('songProgress', 42);
    expect(await StorageService.get('songProgress')).toBe(42);
  });

  it('round-trips a string value', async () => {
    await StorageService.set('activeAlbumId', 'album-1');
    expect(await StorageService.get('activeAlbumId')).toBe('album-1');
  });

  it('returns null for a missing key', async () => {
    expect(await StorageService.get('currentSong')).toBeNull();
  });

  it('removes a stored value', async () => {
    await StorageService.set('songProgress', 10);
    await StorageService.remove('songProgress');
    expect(await StorageService.get('songProgress')).toBeNull();
  });

  it('returns all known keys via getAll', async () => {
    await StorageService.set('songProgress', 5);
    await StorageService.set('activeAlbumId', 'a');

    const all = await StorageService.getAll();

    expect(all).toEqual({ currentSong: null, songProgress: 5, activeAlbumId: 'a' });
  });

  it('returns null on a JSON parse error instead of throwing', async () => {
    await AsyncStorage.setItem('currentSong', '{not valid json');
    expect(await StorageService.get('currentSong')).toBeNull();
  });
});
