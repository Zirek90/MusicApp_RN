import { durationToTime } from './duration-to-time';

export const calculateCurrentTime = (duation: number, progress: number) => {
  const currentTime = (duation * progress) / 100;
  return durationToTime(currentTime);
};
