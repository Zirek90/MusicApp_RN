import { ImageSourcePropType } from 'react-native';
import { AVATAR_IMAGES } from '@constants';

export const chooseAvatarImage = (): ImageSourcePropType => {
  return AVATAR_IMAGES[Math.floor(Math.random() * AVATAR_IMAGES.length)];
};
