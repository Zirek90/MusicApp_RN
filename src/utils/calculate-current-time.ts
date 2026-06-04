import { durationToTime } from './duration-to-time';

export const calculateCurrentTime = (duration: number, progress: number) => {
  const currentTime = (duration * progress) / 100;
  return durationToTime(currentTime);
};
