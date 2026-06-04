import { getExtension } from '../get-extensions';

describe('getExtension', () => {
  it('extracts a simple extension', () => {
    expect(getExtension('song.mp3')).toBe('mp3');
  });

  it('extracts the last extension when there are multiple dots', () => {
    expect(getExtension('my.song.final.flac')).toBe('flac');
  });

  it('returns the whole string when there is no extension', () => {
    expect(getExtension('noextension')).toBe('noextension');
  });
});
