import { durationToTime } from '../duration-to-time';

describe('durationToTime', () => {
  it('formats zero seconds', () => {
    expect(durationToTime(0).trim()).toBe('0:00');
  });

  it('pads seconds below ten', () => {
    expect(durationToTime(65).trim()).toBe('1:05');
  });

  it('does not pad seconds of ten or more', () => {
    expect(durationToTime(70).trim()).toBe('1:10');
  });

  it('handles durations over an hour worth of minutes', () => {
    expect(durationToTime(3725).trim()).toBe('62:05');
  });

  it('floors fractional seconds', () => {
    expect(durationToTime(59.9).trim()).toBe('0:59');
  });
});
