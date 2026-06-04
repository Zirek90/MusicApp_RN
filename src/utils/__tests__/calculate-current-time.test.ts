import { calculateCurrentTime } from '../calculate-current-time';

describe('calculateCurrentTime', () => {
  it('returns the start time at zero progress', () => {
    expect(calculateCurrentTime(120, 0).trim()).toBe('0:00');
  });

  it('returns the midpoint at 50 percent progress', () => {
    expect(calculateCurrentTime(120, 50).trim()).toBe('1:00');
  });

  it('returns the full duration at 100 percent progress', () => {
    expect(calculateCurrentTime(200, 100).trim()).toBe('3:20');
  });
});
