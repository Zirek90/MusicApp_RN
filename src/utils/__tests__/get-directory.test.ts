import { getDirectory } from '../get-directory';

describe('getDirectory', () => {
  it('returns the immediate parent folder name', () => {
    expect(getDirectory('file:///storage/emulated/0/Music/Rock/song.mp3')).toBe('Rock');
  });

  it('returns an empty string when there is no directory', () => {
    expect(getDirectory('song.mp3')).toBe('');
  });

  it('handles nested paths', () => {
    expect(getDirectory('/a/b/c/d/track.flac')).toBe('d');
  });
});
