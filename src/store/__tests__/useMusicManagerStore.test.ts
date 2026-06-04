import { SongStatus } from '@enums';
import { useAlbumStore } from '../useAlbumStore';
import { useMusicManagerStore } from '../useMusicManagerStore';
import { useMusicPlayerStore } from '../useMusicPlayerStore';

jest.mock('../useMusicPlayerStore', () => ({
  useMusicPlayerStore: { getState: jest.fn() },
}));

jest.mock('@service', () => ({
  ForegroundServiceManager: { updateSongData: jest.fn() },
  StorageService: { get: jest.fn(), set: jest.fn() },
}));

const playerGetState = useMusicPlayerStore.getState as unknown as jest.Mock;
const handlePlay = jest.fn();

const album = {
  albumId: 'A',
  albumName: 'AlbumA',
  albumAvatar: { url: 1, name: 'avatar_1.png' },
  items: [
    { id: 's0', uri: 'uri0', filename: '0.mp3', duration: 100 },
    { id: 's1', uri: 'uri1', filename: '1.mp3', duration: 200 },
  ],
};

beforeEach(() => {
  handlePlay.mockReset();
  playerGetState.mockReturnValue({ handlePlay, currentSong: null });
  useAlbumStore.setState({ albumList: [album as never] });
  useMusicManagerStore.setState({ activeAlbumId: null, isFirst: false, isLast: false });
});

describe('useMusicManagerStore', () => {
  it('playSong builds the current song and flags the first track', () => {
    useMusicManagerStore.getState().playSong('A', 0);

    expect(handlePlay).toHaveBeenCalledTimes(1);
    const [currentSong] = handlePlay.mock.calls[0];
    expect(currentSong).toMatchObject({ id: 's0', index: 0, songStatus: SongStatus.PLAY });

    const { activeAlbumId, isFirst, isLast } = useMusicManagerStore.getState();
    expect(activeAlbumId).toBe('A');
    expect(isFirst).toBe(true);
    expect(isLast).toBe(false);
  });

  it('playSong flags the last track', () => {
    useMusicManagerStore.getState().playSong('A', 1);
    const { isFirst, isLast } = useMusicManagerStore.getState();
    expect(isFirst).toBe(false);
    expect(isLast).toBe(true);
  });

  it('does nothing for an unknown album', () => {
    useMusicManagerStore.getState().playSong('missing', 0);
    expect(handlePlay).not.toHaveBeenCalled();
  });

  it('nextSong advances to the following index', () => {
    useMusicManagerStore.setState({ activeAlbumId: 'A' });
    playerGetState.mockReturnValue({ handlePlay, currentSong: { index: 0 } });

    useMusicManagerStore.getState().nextSong();

    const [currentSong] = handlePlay.mock.calls[0];
    expect(currentSong.index).toBe(1);
  });

  it('previousSong steps back to the prior index', () => {
    useMusicManagerStore.setState({ activeAlbumId: 'A' });
    playerGetState.mockReturnValue({ handlePlay, currentSong: { index: 1 } });

    useMusicManagerStore.getState().previousSong();

    const [currentSong] = handlePlay.mock.calls[0];
    expect(currentSong.index).toBe(0);
  });
});
