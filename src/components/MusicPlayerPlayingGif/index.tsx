import { SongStatus } from '@enums';
import { Image } from 'native-base';
import { useMusicStore } from 'src/store';

export const MusicPlayerPlayingGif = () => {
  const songStatus = useMusicStore(state => state.currentSong.songStatus);

  if (songStatus !== SongStatus.PLAY) {
    return;
  }
  return (
    <Image
      alignSelf="center"
      alt="audio playing gif"
      source={require('../../../assets/gif/dancing-bunny.gif')}
    />
  );
};
