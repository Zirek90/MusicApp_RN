import { SongStatus } from '@enums';
import { withMusicContext } from '@hoc';
import { Image } from 'native-base';

interface MusicPlayerPlayingGifComponentProps {
  songStatus: SongStatus;
}

const MusicPlayerPlayingGifComponent = ({ songStatus }: MusicPlayerPlayingGifComponentProps) => {
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

export const MusicPlayerPlayingGif = withMusicContext(MusicPlayerPlayingGifComponent, {
  songStatus: data => data.currentSong.songStatus,
});
